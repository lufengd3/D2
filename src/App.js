import {createElement, Component, setNativeProps, findDOMNode} from 'rax';
import View from 'rax-view';
import Image from 'rax-image';
import Slider from 'rax-slider';
import {observer, inject} from 'mobx-rax';
import emitter from 'tiny-emitter/instance';
import HomePanel from './mods/HomePanel';
import FastPanel from './mods/FastPanel';
import AppPanel from './mods/AppPanel';
import Refresh from './mods/Refresh';
import styles from './App.css';
import {emitterChannel} from './constant';
import {getNumberByTime, rgbaToHex} from './utils';

@inject('containerStore', 'appsStore', 'settingStore', 'systemStore')
@observer
class App extends Component {
  appearCount = 0;

  componentDidMount() {
    const {containerStore} = this.props;

    containerStore.updateSize();

    setNativeProps(findDOMNode(document.body), {
      onViewAppear: () => {
        emitter.emit(emitterChannel.PAGE_APPEAR);
        this.handlePageAppear();
        this.appearCount++;
      },
      onViewDisappear: () => {
        emitter.emit(emitterChannel.PAGE_APPEAR);

        this.handlePageDisappear();
      }
    });

    emitter.on(emitterChannel.SETTING_UPDATEED, this.checkWarningMode);
  }

  handlePageAppear = () => {
    setTimeout(this.checkWarningMode, 1000);

    if (this.appearCount) {
      const {appsStore, systemStore} = this.props;
      appsStore.readImportantApps();
      systemStore.updateHardwareStatus();
    }

  }

  handlePageDisappear = () => {
  }

  checkWarningMode = () => {
    const {containerStore, settingStore} = this.props;
    const {warningModeStartTime, warningModeEndTime} = settingStore;
    const date = new Date();
    const h = date.getHours();
    const m = date.getMinutes();
    const currentTime = getNumberByTime(`${h}:${m}`);
    const startTime = getNumberByTime(warningModeStartTime);
    const endTime = getNumberByTime(warningModeEndTime);

    if ((startTime <= endTime && currentTime >= startTime && currentTime < endTime)
      || (startTime > endTime && (currentTime >= startTime || currentTime < endTime))
    ) {
      containerStore.warningMode = true;
    } else {
      containerStore.warningMode = false;
    }
  }

  // 注意：不要传 rgb
  updateNavigationBarColor = (color = '') => {
    if (!color) return;

    if (color.match(/rgba/i)) {
      // rgb 30 === 1e
      // alpha 20% === 33
      color = rgbaToHex(color);
    }

    const appWindow = require('@weex-module/AppWindow');
    appWindow.updateNavgationBarColor(color);
  }

  render() {
    const {containerStore} = this.props;
    const {width, height, warningMode} = containerStore;
    const itemStyle = {width, height};
    const maskStyle = {
      ...styles.mask,
      width,
      height: height + 4,
      backgroundColor: warningMode ? '#ff0000' : 'rgba(30, 30, 30, 0.2)'
    };
    this.updateNavigationBarColor(maskStyle.backgroundColor);

    return (
      <View style={styles.app} id={'appcontainer'}>
        <View style={maskStyle} />
        <Slider
          index={1}
          style={styles.slider}
          loop={true}
          showsPagination={false}
          width={width}
          height={height}
        >

          <View style={styles.sliderItemContainer}>
            {containerStore.warningMode ? null : <FastPanel style={itemStyle} />}
          </View>

          <View style={styles.sliderItemContainer}>
            <HomePanel style={itemStyle} />
          </View>

          <View style={styles.sliderItemContainer}>
            {containerStore.warningMode ? null : <AppPanel style={itemStyle} />}
            {/* <Refresh /> */}
          </View>

        </Slider>
      </View>
    );
  }
}

export default App;
