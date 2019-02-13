import {createElement, Component} from 'rax';
import Text from 'rax-text';
import View from 'rax-view';
import Touchable from 'rax-touchable';
import {isWeex} from 'universal-env';
import styles from './style.css';

const bg = "https://source.unsplash.com/random";

class WallPaperButton extends Component {
  static moduleHeight = styles.bottomBar.height;

  constructor(props) {
    super(props);

    this.text = 'Save';
    this.pressHandler = 'savePicture';

    if (isWeex) {
      const androidPattern = /android/i;

      if (androidPattern.test(navigator.platform)) {
        this.text = 'Like';
        this.pressHandler = 'setWallPaper';
      }
    }

  }

  setWallPaper = () => {
    const {url} = this.props;

    if (!url) {
      alert('No image chooesed');
      return;
    }

    const WallPaper = require('@weex-module/WallPaper');
    WallPaper.update(url);
  }

  savePicture = (e) => {
    alert('save pic to local');
  }

  render() {
    const {updateImg} = this.props;

    return (
      <View style={styles.bottomBar}>
        <Touchable onPress={this[this.pressHandler]} style={styles.buttonContainer}>
          <Text style={styles.buttonText}>{this.text}</Text>
        </Touchable>
        {updateImg ?
          <Touchable onPress={updateImg} style={styles.updateButtonContainer}>
            <Text style={styles.buttonText}>Next</Text>
          </Touchable>
        : null}
      </View>
    );
  }
}

export default WallPaperButton;
