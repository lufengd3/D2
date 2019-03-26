import {createElement, Component, render,findDOMNode} from 'rax';
import Text from 'rax-text';
import View from 'rax-view';
import Touchable from 'rax-touchable';
import Image from 'rax-image';
import Binding from 'weex-bindingx';
import {isWeex} from 'universal-env';
import {observer, inject} from 'mobx-rax';
import emitter from 'tiny-emitter/instance';
import AppItem from '../AppItem';
import WallPaperButton from '../WallpaperButton';

import styles from './style.css';

function getEl(el) {
  return isWeex ? findDOMNode(el).ref : findDOMNode(el);
}

const DARK = '#cd5c5c';
const LIGHT = '#607D8B';


@inject('appsStore')
@observer
class App extends Component {
  state = {
    isExpanded: false
  };

  componentDidMount() {
    emitter.on('closeSysAppPanel', () => {
      if (this.state.isExpanded) {
        this.clickBtn();
      }
    });
  }

  doAnim = () => {
    this.changeBtn();
    this.moveApps();
  }

  changeBtn = () => {
    const main_btn = getEl(this.refs.main_btn);
    const main_image = getEl(this.refs.main_image);
    const {isExpanded} = this.state;
    const currentColor = isExpanded ? DARK : LIGHT;
    const targetColor = isExpanded ? LIGHT : DARK;
    const currentDeg = isExpanded ? 45 : 0;
    const targetDeg = isExpanded ? -45 : 45;

    Binding.bind({
      eventType:'timing',
      exitExpression:{
        origin:'t>100'
      },
      props:[
        {
          element: main_image,
          property:'transform.rotateZ',
          expression:{
            origin: `linear(t, ${currentDeg}, ${targetDeg}, 100)`
          }
        },
        {
           element:main_btn,
           property:'background-color',
           expression:{
           	 origin:`evaluateColor('${currentColor}','${targetColor}',min(t,100)/100)`
           }
        }
      ]
    });
  }

  moveApps = () => {
    const appBindingProps = [];
    const {appsStore} = this.props;
    const {sysApps} = appsStore;
    const {isExpanded} = this.state;

    // 移动上面一列系统应用
    sysApps.map((item, index) => {
      const elm = getEl(this.refs[`app${index}`]);
      const currentY = isExpanded ? -120 * (index + 1) : 0;
      const targetY = isExpanded ? 120 * (index + 1) : -120 * (index + 1);

      appBindingProps.push({
          element: elm,
          property: 'transform.translateY',
          expression:{
            origin: `easeOutBounce(t, ${currentY}, ${targetY}, 500)`
          }
      });
    });

    Binding.bind({
    	eventType:'timing',
        exitExpression:{
           origin: 't>500'
        },
        props: appBindingProps
    });

    // 移动左右应用
    const leftApp = getEl(this.refs.leftApp);
    const rightApp = getEl(this.refs.rightApp);
    const currentX = isExpanded ? -120 : 0;
    const targetX = isExpanded ? 120 : -120;
      
    Binding.bind({
    	eventType:'timing',
        exitExpression:{
           origin: 't>500'
        },
        props: [{
          element: leftApp,
          property: 'transform.translateX',
          expression:{
            origin: `easeOutBounce(t, ${currentX}, ${targetX}, 500)`
          }
        }, {
          element: rightApp,
          property: 'transform.translateX',
          expression:{
            origin: `easeOutBounce(t, ${-currentX}, ${-targetX}, 500)`
          }
        }]
    });
  }

  clickBtn = () => {
    this.doAnim();

    this.setState({
      isExpanded: !this.state.isExpanded
    });
  }

  render() {
    const {appsStore} = this.props;
    const {sysApps} = appsStore;

    return (
      <View style={styles.container}>
        {this.state.isExpanded ? <Touchable style={styles.transparentBG} onTouchStart={this.clickBtn} onPress={this.clickBtn} /> : null}
        {sysApps && sysApps.map((app, index) => {
          return (
            <Touchable style={[styles.btn]} ref={`app${index}`}>
              <AppItem
                data={app}
                hideTitle={true}
                containerStyle={{
                  width: styles.btn.width,
                  height: styles.btn.height,
                  marginBottom: 0,
                }}
              />
            </Touchable>
          )
        })}

        <Touchable style={[styles.btn]} ref={'leftApp'}>
          <WallPaperButton />
        </Touchable>

        <Touchable style={[styles.btn]} ref={'rightApp'}>
          <Image style={[styles.image]} source={{uri:'http://pozkwhz9d.bkt.clouddn.com/setting.png'}} />
        </Touchable>

        <Touchable style={[styles.btn, {backgroundColor: DARK}]} ref="main_btn" onPress={this.clickBtn}>
          <Image style={[styles.image]} ref="main_image" source={{uri:'https://gw.alicdn.com/tfs/TB1PZ25antYBeNjy1XdXXXXyVXa-128-128.png'}} />
        </Touchable>

      </View>
    );
  }


}

export default App;
