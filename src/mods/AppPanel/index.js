import {createElement, Component} from 'rax';
import Text from 'rax-text';
import View from 'rax-view';
import ScrollView from 'rax-scrollview';
import Touchable from 'rax-touchable';
import {isWeex} from 'universal-env';
import Time from '../Time';
import AppItem from '../AppItem';
import WallPaperButton from '../WallpaperButton';
import styles from './style.css';

class AppPanel extends Component {
  state = {
    apps: []
  }

  componentWillMount() {
    if (isWeex) {
      const PkgManager = require('@weex-module/PackageManager');
      const data = PkgManager.getApps('all');

      this.setState({
        apps: data
      })
    }
  }

  render() {
    const {apps} = this.state;

    return (
      <ScrollView style={[styles.container, {bottom: WallPaperButton.moduleHeight}]}>
        <Time />
        <View style={styles.appItemContainer}>
          {apps.map((app) => {
            // return <appicon packageName={app.packageName} />;
            return <AppItem data={app} />
          })}
        </View>
      </ScrollView>
    );
  }
}

export default AppPanel;
