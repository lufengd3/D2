import {createElement, Component} from 'rax';
import View from 'rax-view';
import Text from 'rax-text';
import GuessApp from '../GuessApp';
import styles from './style.css';

class FastPanel extends Component {
  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <GuessApp />
      </View>
    );
  }
}

export default FastPanel;
