import {createElement, Component} from 'rax';
import Text from 'rax-text';
import Touchable from 'rax-touchable';
import styles from './style.css';

function reload() {
  location.reload();
}

function Mod() {
  return (
    <Touchable style={styles.container} onPress={reload}>
      <Text>Refresh</Text>
    </Touchable>
  );
}

export default Mod;
