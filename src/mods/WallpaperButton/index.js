import {createElement, Component} from 'rax';
import Text from 'rax-text';
import View from 'rax-view';
import Touchable from 'rax-touchable';
import Toast from 'universal-toast';
import {isWeex} from 'universal-env';
import styles from './style.css';

// const BASE_URL = "https://source.unsplash.com/random/750x1800/";
const BASE_URL = "http://lufeng.me/p";

class WallPaperButton extends Component {
  static moduleHeight = styles.bottomBar.height;

  state = {
    loading: false,
  };
  changeWallPaperText = '换壁纸';

  updateWallPaper = () => {
    this.setState({
      loading: true
    });

    fetch(BASE_URL)
      .then(res => res.json())
      .then((data) => {
        this.setState({
          loading: false
        });

        if (data.success && data.url) {
          this.setWallPaper(data.url);
        } else {
          throw new Error('Need URL');
        }
      }).catch((e) => {
        this.setState({
          loading: false
        });

        console.error(e);
        Toast.show(e.message);
      });
  }

  setWallPaper = (url = '') => {
    const WallPaper = require('@weex-module/WallPaper');
    WallPaper.update(url);
  }

  render() {
    const {loading} = this.state;

    return (
      <View style={styles.bottomBar}>
        <Touchable onPress={this.updateWallPaper} style={styles.buttonContainer}>
          <Text style={styles.buttonText}>{this.changeWallPaperText} {loading ? '...' : ''}</Text>
        </Touchable>
        {/* {updateImg ?
          <Touchable onPress={updateImg} style={styles.updateButtonContainer}>
            <Text style={styles.buttonText}>Next</Text>
          </Touchable>
        : null} */}
      </View>
    );
  }
}

export default WallPaperButton;
