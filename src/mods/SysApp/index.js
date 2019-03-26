import {createElement, Component, render,findDOMNode} from 'rax';
import Text from 'rax-text';
import View from 'rax-view';
import Image from 'rax-image';
import Binding from 'weex-bindingx';
import {isWeex} from 'universal-env';
import {observer, inject} from 'mobx-rax';
import AppItem from '../AppItem';

import styles from './style.css';

function getEl(el) {
  return isWeex ? findDOMNode(el).ref : findDOMNode(el);
}

const DARK = '#cd5c5c';
const LIGHT = '#607D8B';


@inject('appsStore', 'sysAppStore')
@observer
class App extends Component {
  doAnim = () => {
    this.changeBtn();
    this.moveApps();
  }

  changeBtn = () => {
    const main_btn = getEl(this.refs.main_btn);
    const main_image = getEl(this.refs.main_image);
    const {sysAppStore} = this.props;
    const currentColor = sysAppStore.isExpanded ? DARK : LIGHT;
    const targetColor = sysAppStore.isExpanded ? LIGHT : DARK;
    const currentDeg = sysAppStore.isExpanded ? 45 : 0;
    const targetDeg = sysAppStore.isExpanded ? -45 : 45;

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
    const {appsStore, sysAppStore} = this.props;
    const {sysApps} = appsStore;

    sysApps.map((item, index) => {
      const elm = getEl(this.refs[`app${index}`]);
      const currentY = sysAppStore.isExpanded ? -120 * (index + 1) : 0;
      const targetY = sysAppStore.isExpanded ? 120 * (index + 1) : -120 * (index + 1);

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
  }

  clickBtn = () => {
    this.doAnim();

    const {sysAppStore} = this.props;
    sysAppStore.toggleExpanded();
  }

  render() {
    const {appsStore, sysAppStore} = this.props;
    const {sysApps} = appsStore;
    // this.doAnim();
    // alert('render');

    return (
      <View style={styles.container}>
        {sysApps && sysApps.map((app, index) => {
          return (
            <View style={[styles.btn]} ref={`app${index}`} onClick={this.clickBtn}>
              <AppItem
                data={app}
                hideTitle={true}
                sysAppStore={sysAppStore}
                containerStyle={{
                  width: styles.btn.width,
                  height: styles.btn.height,
                  marginBottom: 0,
                }}
              />
            </View>
          )
        })}

        <View style={[styles.btn, {backgroundColor: DARK}]} ref="main_btn" onClick={this.clickBtn}>
          <Image style={[styles.image]} ref="main_image" source={{uri:'https://gw.alicdn.com/tfs/TB1PZ25antYBeNjy1XdXXXXyVXa-128-128.png'}} />
        </View>

      </View>
    );
  }


}

export default App;
