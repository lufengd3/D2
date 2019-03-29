import {createElement, Component} from 'rax';
import View from 'rax-view';
import Text from 'rax-text';
import GuessAppWidget from '../GuessAppWidget';
import SystemStatusWidget from '../SystemStatusWidget';
import styles from './style.css';

class FastPanel extends Component {
  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <SystemStatusWidget />
        <GuessAppWidget />
      </View>
    );
  }
}

export default FastPanel;
