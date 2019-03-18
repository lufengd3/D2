import {createElement, Component} from 'rax';
import View from 'rax-view';
import Image from 'rax-image';
import Slider from 'rax-slider';
import {isWeex} from 'universal-env';
import WallPaperButton from './mods/WallpaperButton';
import HomePanel from './mods/HomePanel';
import FastPanel from './mods/FastPanel';
import AppPanel from './mods/AppPanel';
import Refresh from './mods/Refresh';
import styles from './App.css';

class App extends Component {
  state = {
    width: 750,
    height: screen.height * (750 / screen.width),
  };

  componentDidMount() {
    if (isWeex) {
      const dom = require('@weex-module/dom');

      dom.getComponentRect('viewport', (e) => {
        if (e && e.size && e.size.height) {
          this.setState({
            height: e.size.height
          });
        }
      });
    }
  }

  render() {
    const {width, height} = this.state;

    return (
      <View style={styles.app} id={'appcontainer'}>
        <View style={{width, height, position: 'absolute', top: 0, left: 0, backgroundColor: 'rgba(30, 30, 30, 0.1'}} />
        <Slider
          index={1}
          style={styles.slider}
          loop={false}
          showsPagination={false}
          width={width}
          height={height}
        >

          <View style={styles.sliderItemContainer}>
            <FastPanel />
          </View>

          <View style={styles.sliderItemContainer}>
            <HomePanel />
          </View>

          <View style={styles.sliderItemContainer}>
            {/* <Image source={{uri: imgUrl}} resizeMode="cover" style={{width, height, position: 'absolute', top: 0, left: 0}} /> */}
            <AppPanel style={{width, height}} />
            <WallPaperButton />
            <Refresh />
          </View>

        </Slider>
      </View>
    );
  }
}

export default App;
