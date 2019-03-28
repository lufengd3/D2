import {createElement, Component, setNativeProps, findDOMNode} from 'rax';
import View from 'rax-view';
import Image from 'rax-image';
import Slider from 'rax-slider';
import emitter from 'tiny-emitter/instance';
import HomePanel from './mods/HomePanel';
import FastPanel from './mods/FastPanel';
import AppPanel from './mods/AppPanel';
import Refresh from './mods/Refresh';
import styles from './App.css';
import {emitterChannel} from './constant';
import {observer, inject} from 'mobx-rax';

@inject('containerStore', 'appsStore')
@observer
class App extends Component {

  componentDidMount() {
    const {containerStore} = this.props;

    containerStore.updateSize();

    setNativeProps(findDOMNode(document.body), {
      onViewAppear: () => {
        emitter.emit(emitterChannel.PAGE_APPEAR);
        this.handlePageAppear();
      },
      onViewDisappear: () => {
        emitter.emit(emitterChannel.PAGE_APPEAR);

        this.handlePageDisappear();
      }
    });
  }

  handlePageAppear() {
    this.checkWarningMode();

    const {appsStore} = this.props;
    appsStore.readImportantApps();

  }

  handlePageDisappear() {
  }

  checkWarningMode() {
    const {containerStore} = this.props;
    const h = new Date().getHours();

    if (h >= 0 && h < 6) {
      containerStore.warningMode = true;
    } else {
      containerStore.warningMode = false;
    }
  }

  render() {
    const {containerStore} = this.props;
    const {width, height, warningMode} = containerStore;
    const itemStyle = {width, height};
    const maskStyle = {
      ...styles.mask,
      width,
      height,
      backgroundColor: warningMode ? 'red' : styles.mask.backgroundColor
    };

    return (
      <View style={styles.app} id={'appcontainer'}>
        <View style={maskStyle} />
        <Slider
          // index={1}
          style={styles.slider}
          loop={false}
          showsPagination={false}
          width={width}
          height={height}
        >

          <View style={styles.sliderItemContainer}>
            <FastPanel style={itemStyle} />
          </View>

          <View style={styles.sliderItemContainer}>
            <HomePanel style={itemStyle} />
          </View>

          <View style={styles.sliderItemContainer}>
            <AppPanel style={itemStyle} />
            {/* <Refresh /> */}
          </View>

        </Slider>
      </View>
    );
  }
}

export default App;
