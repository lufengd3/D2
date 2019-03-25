import {observable} from 'mobx';
import pinyin from 'tiny-pinyin';
import {isWeex} from 'universal-env';
import {sortArrByObjectValue} from '../utils/index';

class ObservableAppsStore {
  // 全部应用
  @observable apps = [];
  // 字母表排序全部应用
  @observable pinyinApps = [];
  // 主屏应用
  @observable homeApps = [];

  constructor() {
    this.readApps();
  }

  readApps() {
    if (isWeex) {
      const PkgManager = require('@weex-module/PackageManager');
      const data = PkgManager.getApps('all');

      if (data && data.length) {
        this.apps = this.processAppsInfo(data);
        this.pinyinApps = this.sortAppsByPinyin(data);
        this.homeApps = this.filterHomeApps(data);
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
        const firstChar = appNamePinyin[0];
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

  filterHomeApps(data) {
    const apps = [];

    data.map((item) => {
      if (
        item.appName.match('短信')
        || item.appName.match('电话')
        || item.appName.match('相机')
        || item.appName.match('浏览器')
      ) {
        apps.push(item);
      }
    });

    return apps;
  }

}

const appsStore = new ObservableAppsStore();

export default appsStore;