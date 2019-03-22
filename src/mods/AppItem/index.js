import {createElement, Component, findDOMNode} from 'rax';
import Text from 'rax-text';
import View from 'rax-view';
import Touchable from 'rax-touchable';
import styles from './style.css';

const PkgManager = require('@weex-module/PackageManager');

class Mod extends Component {

  state = {
    menuVisable: false,
    top: 0,
    left: 0
  };

  launch = () => {
    const {data} = this.props;

    PkgManager.runApp(data.packageName);
  }

  showMenu = () => {
    const vibrator = require('@weex-module/vibrator');
    vibrator.run(60);

    const dom = require('@weex-module/dom');
    dom.getComponentRect(findDOMNode(this.refs.itemContainer), (res) => {
      if (res.size) {
        const left = res.size.left || 0;
        const top = res.size.top || 0;
        const menuHeight = styles.menuContainer.height;

        this.setState({
          menuVisable: true,
          top: top - menuHeight,
          left: left + 30
        });
      }
    });

    // const modal = require('@weex-module/modal');
    // modal.confirm({
    //     message: `卸载 ${data.appName} ?`,
    // }, (value) => {
    //     if (value.toLowerCase() === 'ok') {
    //       this.uninstallApp(data.packageName);
    //     }
    // });
  }

  hideMenu = () => {
    this.setState({
      menuVisable: false
    });
  }

  uninstallApp = (packageName) => {
    this.hideMenu();

    const {data} = this.props;

    PkgManager.uninstallApp(data.packageName);
  }

  showAppInfo = () => {
    this.hideMenu();

    const {data} = this.props;

    PkgManager.showAppInfo(data.packageName);
  }

  render() {
    const {data} = this.props;
    const {menuVisable, top, left} = this.state;

    if (!data || !data.appName) {
      return null;
    }

    const menuContainerStyle = {
      ...styles.menuContainer,
      top,
      left
    };

    return [
      <Touchable style={styles.container} onPress={this.launch} onLongPress={this.showMenu} ref="itemContainer">
        <appicon name={data.packageName} style={styles.appicon} />
        <Text style={styles.appName} numberOfLines={1}>{data.appName}</Text>
      </Touchable>,
      menuVisable ?
      <View>
        <Touchable style={styles.transparentBG} onPress={this.hideMenu} />
        <View style={menuContainerStyle}>
          <Touchable onPress={this.uninstallApp}>
            <Text>Uninstall</Text>
          </Touchable>
          <Touchable onPress={this.showAppInfo}>
            <Text>App Info</Text>
          </Touchable>
        </View>
      </View>
      : null
    ];
  }
}

export default Mod;
