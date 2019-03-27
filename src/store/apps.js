import {observable} from 'mobx';
import pinyin from 'tiny-pinyin';
import {isWeex} from 'universal-env';
import {sortArrByObjectValue} from '../utils/index';

const TOP_COUNT = 10;

class ObservableAppsStore {
  // 字母表排序全部应用
  @observable pinyinApps = [];
  // 核心应用
  @observable sysApps = [];
  // 高频应用
  @observable importantApps = [];

  constructor() {
    this.readApps();
  }

  readApps() {
    if (isWeex) {
      const PkgManager = require('@weex-module/PackageManager');

      const data = PkgManager.getApps('all');
      if (data && data.length) {
        const apps = this.processAppsInfo(data);
        this.pinyinApps = this.sortAppsByPinyin(apps);
        this.filterSysApps(apps);
      }

      const dataWithFrequency = PkgManager.getApps('frequency');
      if (dataWithFrequency && dataWithFrequency.length) {
        const apps = this.processAppsInfo(dataWithFrequency);
        this.importantApps = this.sortAppsByFrequency(apps);
      }
    }
  }

  processAppsInfo(data) {
    return data.map((item) => {
      if (item.appName.match('手机')) {
        item.appName = item.appName.replace('手机', '');
      }

      return item;
    });
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
      ];
    } else {
      return [
        'phone',
        'camera',
        'browser',
      ];
    }
  }

  sortAppsByFrequency(data) {
    const result = sortArrByObjectValue(data, 'launchCount');

    return result.slice(0, TOP_COUNT);
  }

}

const appsStore = new ObservableAppsStore();

export default appsStore;