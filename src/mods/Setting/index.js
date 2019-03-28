
import {createElement, Component} from 'rax';
import View from 'rax-view';
import Text from 'rax-text';
import Image from 'rax-image'
import Touchable from 'rax-touchable';
import styles from './style.css';

class Mod extends Component {
  state = {
    dialogVisiable: false
  }

  toogleDialog = () => {
    // this.setState({
    //   dialogVisiable: !this.state.dialogVisiable
    // });
  }

  renderDialog = () => {
    if (!this.state.dialogVisiable) return null;

    return (
      <View style={styles.dialogContainer}>Hello</View>
    );
  }

  render() {
    const dialog = this.renderDialog();

    return [
      <Touchable onPress={this.toogleDialog}>
        <Image style={styles.image} source={{uri:'http://pozkwhz9d.bkt.clouddn.com/setting.png'}} />
      </Touchable>,
      dialog
    ];
  }
}

export default Mod;
