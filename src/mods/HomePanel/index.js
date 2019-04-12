import {createElement, Component} from 'rax';
import View from 'rax-view';
import {inject, observer} from 'mobx-rax';
import Time from '../Time';
import GuessAppWidget from '../GuessAppWidget';
import SysApp from '../SysApp';
import styles from './style.css';

@inject('containerStore')
@observer
class HomePanel extends Component {
  render() {
    const {containerStore} = this.props;
    const {warningMode} = containerStore;

    return (
      <View style={[styles.container, this.props.style]}>
        <Time />
        <SysApp />
        {warningMode ? null : <GuessAppWidget />}
      </View>
    );
  }
}

export default HomePanel;
