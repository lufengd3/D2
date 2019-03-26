import {createElement, Component} from 'rax';
import Text from 'rax-text';
import View from 'rax-view';
import ScrollView from 'rax-scrollview';
import Touchable from 'rax-touchable';
import AppItem from '../AppItem';
import WallPaperButton from '../WallpaperButton';
import styles from './style.css';
import {inject} from 'mobx-rax';

@inject('appsStore')
class AppPanel extends Component {

  render() {
    const {appsStore} = this.props;
    const {pinyinApps} = appsStore;

    return (
      <ScrollView style={[styles.container, this.props.style]}>
        {pinyinApps.map((appGroup) => {
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
