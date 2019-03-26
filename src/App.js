import {createElement, Component} from 'rax';
import View from 'rax-view';
import Image from 'rax-image';
import Slider from 'rax-slider';
// import {isWeex} from 'universal-env';
import HomePanel from './mods/HomePanel';
import FastPanel from './mods/FastPanel';
import AppPanel from './mods/AppPanel';
import Refresh from './mods/Refresh';
import styles from './App.css';
import {observer, inject} from 'mobx-rax';

@inject('containerStore')
@observer
class App extends Component {

  componentDidMount() {
    const {containerStore} = this.props;

    containerStore.updateSize();
  }

  render() {
    const {containerStore} = this.props;
    const {width, height} = containerStore;

    return (
      <View style={styles.app} id={'appcontainer'}>
        <View style={{width, height, position: 'absolute', top: 0, left: 0, backgroundColor: 'rgba(30, 30, 30, 0.2)'}} />
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
            <HomePanel style={{width, height}} />
          </View>

          <View style={styles.sliderItemContainer}>
            {/* <Image source={{uri: imgUrl}} resizeMode="cover" style={{width, height, position: 'absolute', top: 0, left: 0}} /> */}
            <AppPanel style={{width, height}} />
            {/* <Refresh /> */}
          </View>

        </Slider>
      </View>
    );
  }
}

export default App;
