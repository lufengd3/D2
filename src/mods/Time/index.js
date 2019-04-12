import {createElement, Component} from 'rax';
import Text from 'rax-text';
import View from 'rax-view';
import Touchable from 'rax-touchable';
import {inject, observer} from 'mobx-rax';
import AppItem from '../AppItem';
import styles from './style.css';

@inject('appsStore')
@observer
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

    const formatOptions = {
      weekday: 'long',
      timeZone: 'UTC'
    };
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

  openClock = () => {
    const {appsStore} = this.props;
    const {clockPackageName} = appsStore;

    AppItem.launch(clockPackageName);
  }

  openCalendar = () => {
    const {appsStore} = this.props;
    const {calendarPackageName} = appsStore;

    AppItem.launch(calendarPackageName);
  }

  render() {
    const {time, sec, date, weekday} = this.state;

    return (
      <View style={styles.container}>
        <Touchable style={styles.timeContainer} onPress={this.openClock}>
          <Text style={styles.time}>{time}</Text>
          <Text style={styles.time}>{sec}</Text>
        </Touchable>
        <Touchable style={styles.timeContainer} onPress={this.openCalendar}>
          <Text style={styles.date}>{date}</Text>
          <Text style={styles.weekday}>{weekday}</Text>
        </Touchable>
      </View>
    );
  }
}

export default Mod;
