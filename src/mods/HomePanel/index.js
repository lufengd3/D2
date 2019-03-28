import {createElement, Component} from 'rax';
import View from 'rax-view';
import Text from 'rax-text';
import Touchable from 'rax-touchable';
import Time from '../Time';
import Dock from '../Dock';
import SysApp from '../SysApp';
import styles from './style.css';

class FastPanel extends Component {
  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <Time />
        <Dock />
        <SysApp />
      </View>
    );
  }
}

export default FastPanel;
