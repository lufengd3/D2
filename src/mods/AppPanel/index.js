import {createElement, Component} from 'rax';
import Text from 'rax-text';
import View from 'rax-view';
import ScrollView from 'rax-scrollview';
import Touchable from 'rax-touchable';
import {isWeex} from 'universal-env';
import pinyinlite from 'pinyinlite';
import pinyin from 'tiny-pinyin';
import {sortObjectArrByValue} from '../../utils/index';
import Time from '../Time';
import AppItem from '../AppItem';
import WallPaperButton from '../WallpaperButton';
import styles from './style.css';

class AppPanel extends Component {
  state = {
    appData: []
  }

  componentWillMount() {
    if (isWeex) {
      const PkgManager = require('@weex-module/PackageManager');
      const data = PkgManager.getApps('all');

      if (data && data.length) {
        if (pinyin.isSupported()) {
          this.sortApps(data);
        } else {
          this.setState({
            appData: ['#', data]
          });
        }
      }
    }
  }

  sortApps = (data) => {
    const appMap = {};
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

    let appArr = [];
    for (let firstChar in appMap) {
      const sortedApps = sortObjectArrByValue(appMap[firstChar], 'pinyin');
      appArr.push([firstChar, sortedApps]);
    }

    appArr = appArr.sort((a, b) => {
      return String(a[0]).charCodeAt(0) - String(b[0]).charCodeAt(0);
    })

    this.setState({
      appData: appArr
    });
  }

  render() {
    const {appData} = this.state;

    return (
      <ScrollView style={[styles.container, this.props.style]}>
      {/* <ScrollView style={[styles.container, containerStyle, {height: containerStyle.height - WallPaperButton.moduleHeight}]}> */}
        <Time />
        {appData.map((appGroup) => {
          return (
            <View style={styles.appGroup}>
              <Text style={styles.groupTitle}>{appGroup[0]}</Text>
              <View style={styles.appItemContainer}>
                {appGroup[1].map((appInfo) => {
                  return <AppItem data={appInfo} />
                })}
              </View>
            </View>
          )
        })}
      </ScrollView>
    );
  }
}

export default AppPanel;
