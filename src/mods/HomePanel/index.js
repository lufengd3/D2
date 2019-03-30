import {createElement, Component} from 'rax';
import View from 'rax-view';
import Time from '../Time';
import GuessAppWidget from '../GuessAppWidget';
import SysApp from '../SysApp';
import styles from './style.css';

class FastPanel extends Component {
  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <Time />
        <SysApp />
        <GuessAppWidget />
      </View>
    );
  }
}

export default FastPanel;
