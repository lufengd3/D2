import {createElement, Component} from 'rax';
import Text from 'rax-text';
import View from 'rax-view';
import styles from './style.css';

class Mod extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    time: '',
    sec: '',
    date: '',
    weekday: ''
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
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const formatOptions = { weekday: 'long'};
    const weekday = new Intl.DateTimeFormat('zh-CN', formatOptions).format(date);

    this.setState({
      time: `${h}:${m}`,
      sec: `:${s}`,
      date: `${month}月${day}日`,
      weekday,
    });
  }

  padding = (n = 0) => {
    return n.toString().length === 1 ? '0' + n : n;
  }

  render() {
    const {time, sec, date, weekday} = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.timeContainer}>
          <Text style={styles.time}>{time}</Text>
          <Text style={styles.time}>{sec}</Text>
        </View>
        <View style={styles.timeContainer}>
          <Text style={styles.date}>{date}</Text>
          <Text style={styles.weekday}>{weekday}</Text>
        </View>
      </View>
    );
  }
}

export default Mod;
