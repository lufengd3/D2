import {createElement, Component, findDOMNode} from 'rax';
import Text from 'rax-text';
import View from 'rax-view';
import Touchable from 'rax-touchable';
import Toast from 'universal-toast';
import {isWeex} from 'universal-env';
import Image from 'rax-image';
import Binding from 'weex-bindingx';
import styles from './style.css';

function getEl(el) {
  return isWeex ? findDOMNode(el).ref : findDOMNode(el);
}

// const BASE_URL = "https://source.unsplash.com/random/750x1800/";
const BASE_URL = "http://lufeng.me/p";

class WallPaperButton extends Component {

  updateWallPaper = () => {
    this.doAnim();

    fetch(BASE_URL)
      .then(res => res.json())
      .then((data) => {
        if (data.success && data.url) {
          this.setWallPaper(data.url);
        } else {
          throw new Error('Need URL');
        }

        this.cancleAnim();
      }).catch((e) => {
        this.cancleAnim();
        console.error(e);
        Toast.show(e.message);
      });
  }

  doAnim = () => {
    const icon = getEl(this.refs.icon);

    this.rotateBinding = Binding.bind({
      eventType:'timing',
      exitExpression:{
        origin:'t>3000'
      },
      props:[
        {
          element: icon,
          property:'transform.rotateZ',
          expression:{
            origin: 't/6%360'
          }
        }
      ]
    });
  }

  // TODO: 停止后又开始转
  cancleAnim = () => {
    if (this.rotateBinding) {
      Binding.unbind(this.rotateBinding);
    }
  }

  setWallPaper = (url = '') => {
    const WallPaper = require('@weex-module/WallPaper');
    WallPaper.update(url);
  }

  render() {
    return (
      <Touchable onPress={this.updateWallPaper} style={styles.buttonContainer}>
        <Image ref="icon" style={styles.image} source={{uri:'http://pozkwhz9d.bkt.clouddn.com/update.png'}} />
      </Touchable>
    );
  }
}

export default WallPaperButton;
