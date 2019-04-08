import {observable, action} from 'mobx';
import pinyin from 'tiny-pinyin';
import {isWeex} from 'universal-env';
import throttle from 'lodash.throttle';
import {sortArrByObjectValue} from '../utils/index';

const TOP_COUNT = 10;
const LAUNCHER_PACKAGE_NAME = 'me.lufeng.d1';

class ObservableAppsStore {
  // 字母表排序全部应用
  @observable pinyinApps = [];
  // 核心应用
  @observable sysApps = [];
  // 高频应用
  @observable importantApps = [];

  constructor() {
    this.readApps();
    this.addPackageListener();
  }

  readApps() {
    this.readAllApps();
    this.readImportantApps();
  }

  addPackageListener() {
    const globalEvent = require('@weex-module/globalEvent');

    globalEvent.addEventListener('launcher.changed', () => {
      this.readApps();
    });
  }

  readAllApps() {
    const PkgManager = require('@weex-module/PackageManager');
    const data = PkgManager.getApps('all');

    if (data && data.length) {
      const apps = this.processAppsInfo(data);

      this.updateAllApps(apps);
    }
  }

  @action
  readImportantApps = () => {
    const PkgManager = require('@weex-module/PackageManager');
    const importantAppsData = PkgManager.getApps('important');

    if (importantAppsData && importantAppsData.length) {
      const apps = this.processAppsInfo(importantAppsData);
      this.importantApps = this.sortAppsByActiveScore(apps);

      // 全部 apps 也需要使用频率数据，默认不展示不常用的 app
      // const allImportantApps = this.filterOldApps(apps)
      // this.updateAllApps(allImportantApps);
    }
  }

  updateAllApps(apps) {
    this.pinyinApps = this.sortAppsByPinyin(apps);
    this.filterSysApps(apps);
  }

  processAppsInfo(data) {
    const apps = [];

    data.map((item) => {
      if (item.appName.match('手机')) {
        item.appName = item.appName.replace('手机', '');
      }

      if (item.packageName !== LAUNCHER_PACKAGE_NAME) {
        apps.push(item);
      }
    });

    return apps;
  }

  sortAppsByPinyin(data) {
    if (pinyin.isSupported()) {
      const appMap = {};

      // 生成拼音并按拼音分组
      data.map((item, index) => {
        const appNamePinyin = pinyin.convertToPinyin(item.appName);
        const firstChar = appNamePinyin[0].toUpperCase();
        item['pinyin'] = appNamePinyin;

        if (!appMap[firstChar]) {
          appMap[firstChar] = [item];
        } else {
          appMap[firstChar].push(item);
        }
      });

      // 对象转数组
      let appArr = [];
      for (let firstChar in appMap) {
        // 同一首字母的 app 进行排序
        const sortedApps = sortArrByObjectValue(appMap[firstChar], 'pinyin');
        appArr.push([firstChar, sortedApps]);
      }

      // app 首字母排序
      appArr = appArr.sort((a, b) => {
        return String(a[0]).charCodeAt(0) - String(b[0]).charCodeAt(0);
      });

      return appArr;
    }
  }

  // TODO: usagestatus 取出来的数据，有多个重复的 apps，时间不对
  filterOldApps(data) {
    const appNames = {};
    const apps = [];

    data.map((item, index) => {
      if (!appNames[item.appName]) {
        appNames[item.appName] = 1;

        // 如果有使用时间，超过15天未使用的不显示
        const duration = 15 * 24 * 3600 * 1000;
        if (Date.now() - item.lastTimeUsed < duration) {
          apps.push(item);
        }
      }
    });

    return apps;
  }

  filterSysApps(data) {
    const apps = [];
    const locale = require('@weex-module/locale');
    locale.getLanguage((e) => {
      const lang = e.match('zh') ? 'zh' : 'en';
      const appNameWhiteList = this.getAppNameWhiteList(lang);

      data.map((item) => {
        const index = appNameWhiteList.indexOf(item.appName.toLowerCase());
        if (index > -1) {
          apps[index] = item;
        }
      });

      // 如果 whitelist 里的应用不存在，过滤掉，否则会有下标数据 undefine
      this.sysApps = apps.filter(item => item);
    });
  }

  getAppNameWhiteList(lang) {
    if (lang === 'zh') {
      return [
        '电话',
        '相机',
        '浏览器',
        '设置'
      ];
    } else {
      return [
        'phone',
        'camera',
        'browser',
        'settings'
      ];
    }
  }

  sortAppsByActiveScore(data) {
    const sortedData = sortArrByObjectValue(data, 'activeScore');
    const result = sortedData.slice(0, TOP_COUNT);

    return result;
  }

}

const appsStore = new ObservableAppsStore();

export default appsStore;