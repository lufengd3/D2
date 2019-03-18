import {createElement, Component} from 'rax';
import View from 'rax-view';
import Text from 'rax-text';
import Touchable from 'rax-touchable';
import styles from './style.css';

class FastPanel extends Component {
  render() {
    return (
      <View>
        <Text style={{color: '#fff'}}>
          FastPanel
        </Text>
      </View>
    );
  }
}

export default FastPanel;
