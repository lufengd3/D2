import {createElement, Component} from 'rax';
import View from 'rax-view';
import Image from 'rax-image';
import Toast from 'universal-toast';
import {isWeex} from 'universal-env';
import WallPaperButton from './mods/WallpaperButton';
import AppPanel from './mods/AppPanel';
import Refresh from './mods/Refresh';
import styles from './App.css';

// const BASE_URL = "https://source.unsplash.com/random/750x1800/";
const BASE_URL = "http://lufeng.me/p";

class App extends Component {
  state = {
    width: 750,
    height: isWeex ? 1 : 'auto',
    imgUrl: ''
  };

  componentWillMount() {
    this.updateImg();
  }

  componentDidMount() {
    if (isWeex) {
      const dom = require('@weex-module/dom');

      setTimeout(() => {
        dom.getComponentRect('viewport', (e) => {
          if (e && e.size && e.size.height) {
            this.setState({
              height: e.size.height
            });
          }
        });
      }, 300);
    }
  }

  updateImg = () => {
    // Toast.show('Update Image...');

    fetch(BASE_URL)
      .then(res => res.json())
      .then((data) => {
        if (data.success && data.url) {
          this.setState({
            imgUrl: data.url
          });
        } else {
          throw new Error('Need URL');
        }
      }).catch((e) => {
        console.error(e);
        this.setState({
          imgUrl: BASE_URL
        });
      });
  }

  render() {
    const {width, height, imgUrl} = this.state;

    return (
      <View style={styles.app}>
        <Image source={{uri: imgUrl}} resizeMode="cover" style={{width, height, position: 'absolute', top: 0, left: 0}} />
        <View style={{width, height, position: 'absolute', top: 0, left: 0, backgroundColor: 'rgba(30, 30, 30, 0.1'}} />
        <AppPanel />
        <WallPaperButton url={imgUrl} updateImg={this.updateImg}></WallPaperButton>
        <Refresh />
      </View>
    );
  }
}

export default App;
