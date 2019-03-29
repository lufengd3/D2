import {createElement, Component} from 'rax';
import View from 'rax-view';
import Text from 'rax-text';
import Touchable from 'rax-touchable';
import Image from 'rax-image';
import styles from './style.css';
import {inject, observer} from 'mobx-rax';

// const REFRESH_ICON = 'http://pozkwhz9d.bkt.clouddn.com/refresh-128-2.png';

@inject('systemStore')
@observer
class GuessAppWidget extends Component {
  render() {
    const {systemStore} = this.props;
    const {
      availableMemory,
      totalMemory,
      availableStorage,
      totalStorage
    } = systemStore.hardwareStatus;
    const memoryUsedPercentage = (1 - availableMemory / totalMemory).toFixed(4);
    const sotrageUsedPercentage = (1 - availableStorage / totalStorage).toFixed(4);
    // 702 - 24 * 4
    const memoryBarWidth = 654 * memoryUsedPercentage;
    const storageBarWidth = 654 * sotrageUsedPercentage;

    return (
      <View style={styles.container}>
        <View style={[styles.groupContainer, {marginBottom: 24}]}>
          <Text style={styles.title}>系统状态</Text>
          {/* {importantApps.length ? null : <Touchable onPress={this.handlePress}>
            <Image source={{uri: REFRESH_ICON}} style={styles.refreshIcon} />
          </Touchable>} */}
        </View>

        <View style={styles.groupContainer}>
          <View style={[styles.statusBar, {width: memoryBarWidth}]}>
            <Text style={styles.text}>内存: {totalMemory - availableMemory} / {totalMemory} MB</Text>
          </View>
          <Text style={styles.percentageText}>已使用 {memoryUsedPercentage * 100}%</Text>
        </View>

        <View style={styles.groupContainer}>
          <View style={[styles.statusBar, {width: storageBarWidth}]}>
            <Text style={styles.text}>存储: {totalStorage - availableStorage} / {totalStorage} GB</Text>
          </View>
          <Text style={styles.percentageText}>已使用 {sotrageUsedPercentage * 100}%</Text>
        </View>

      </View>

    );
  }
}

export default GuessAppWidget;
