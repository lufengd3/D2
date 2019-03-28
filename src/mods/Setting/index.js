
import {createElement, Component} from 'rax';
import View from 'rax-view';
import Text from 'rax-text';
import Image from 'rax-image'
import Touchable from 'rax-touchable';
import Modal from 'rax-modal';
import emitter from 'tiny-emitter/instance';
import {observer, inject} from 'mobx-rax';
import Toast from 'universal-toast';
import styles from './style.css';
import {emitterChannel} from '../../constant';

@inject('settingStore')
@observer
class Mod extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentWillMount() {
    this.initWarningTime();
  }

  initWarningTime = () => {
    this.setState({
      warningModeStartTime: null,
      warningModeEndTime: null
    });
  }

  showModal = () => {
    emitter.emit(emitterChannel.APP_LAUNCH);

    this.refs.modal.show();
  }

  hideModal = () => {
    this.refs.modal.hide();
  }

  pickTime = (key, value) => {
    const picker = require('@weex-module/picker');

    picker.pickTime({value}, e => {
      if (e.result === 'success') {
        const state = {};
        state[key] = e.data;

        this.setState(state);
      }
    })
  }

  saveTime = () => {
    this.hideModal();
    
    const {settingStore} = this.props;
    const {warningModeStartTime, warningModeEndTime} = this.state;
    if (warningModeStartTime) {
      settingStore.update('warningModeStartTime', warningModeStartTime);
    }
    if (warningModeEndTime) {
      settingStore.update('warningModeEndTime', warningModeEndTime);
    }

    this.notifyUpdateEvent();
    this.initWarningTime();
  }

  notifyUpdateEvent = () => {
    const {settingStore} = this.props;
    const warningModeStartTime = this.state.warningModeStartTime || settingStore.warningModeStartTime;
    const warningModeEndTime = this.state.warningModeEndTime || settingStore.warningModeEndTime;

    Toast.show(`休息时间设置为 ${warningModeStartTime} - ${warningModeEndTime}`);
    emitter.emit(emitterChannel.SETTING_UPDATEED);
  }

  render() {
    const {settingStore} = this.props;
    const warningModeStartTime = this.state.warningModeStartTime || settingStore.warningModeStartTime;
    const warningModeEndTime = this.state.warningModeEndTime || settingStore.warningModeEndTime;

    return (
      <View>

        <Touchable onPress={this.showModal}>
          <Image style={styles.image} source={{uri:'http://pozkwhz9d.bkt.clouddn.com/setting-128.png'}} />
        </Touchable>
        
        <Modal ref="modal" contentStyle={styles.modal} duration={160} delay={0}>
          <Text style={styles.title}>设置休息时间</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.labelText}>开始时间</Text>
            <Touchable style={styles.timeInput} onPress={() => {
              this.pickTime('warningModeStartTime', warningModeStartTime);
            }}>
              <Text>{warningModeStartTime}</Text>
            </Touchable>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.labelText}>结束时间</Text>
            <Touchable style={styles.timeInput} onPress={() => {
              this.pickTime('warningModeEndTime', warningModeEndTime);
            }}>
              <Text style>{warningModeEndTime}</Text>
            </Touchable>
          </View>

          <View style={styles.btnContainer}>
            <Touchable onPress={this.hideModal}>
              <Text style={styles.cancleText}>取消</Text>
            </Touchable>
            <Touchable onPress={this.saveTime}>
              <Text style={styles.saveText}>确定</Text>
            </Touchable>
          </View>
        </Modal>

      </View>
    );
  }
}

export default Mod;
