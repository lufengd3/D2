import {createElement, Component} from 'rax';
import View from 'rax-view';
import Text from 'rax-text';
import AppItem from '../AppItem';
import styles from './style.css';
import {inject, observer} from 'mobx-rax';

@inject('appsStore')
@observer
class GuessApp extends Component {
  render() {
    const {appsStore} = this.props;
    const {importantApps} = appsStore;

    return (
      <View style={styles.appItemContainer}>
        {importantApps.map((appInfo) => {
          return <AppItem data={appInfo} />
        })}
      </View>
    );
  }
}

export default GuessApp;