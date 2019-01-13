import {createElement, Component} from 'rax';
import Text from 'rax-text';
import View from 'rax-view';
import styles from './style.css';

class Mod extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    time: ''
  };

  componentWillMount() {
    this.updateTime();
    this.interval = setInterval(this.updateTime, 1000);
  }

  componentWillUnmount() {
    this.interval && clearInterval(this.interval);
  }

  updateTime = () => {
    const date = new Date();
    const h = this.padding(date.getHours());
    const m = this.padding(date.getMinutes());
    const s = this.padding(date.getSeconds());

    this.setState({
      time: `${h}:${m}:${s}`
    });
  }

  padding = (n = 0) => {
    return n.toString().length === 1 ? '0' + n : n;
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.time}>{this.state.time}</Text>
      </View>
    );
  }
}

export default Mod;
