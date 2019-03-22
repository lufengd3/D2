import {createElement, Component, render,findDOMNode} from 'rax';
import Text from 'rax-text';
import View from 'rax-view';
import Image from 'rax-image';
import Binding from 'weex-bindingx';
import {isWeex} from 'universal-env';

import styles from './style.css';

function getEl(el) {
  return isWeex ? findDOMNode(el).ref : findDOMNode(el);
}

class App extends Component {

  isExpanded = false;

  expand() {
    let main_btn = getEl(this.refs.main_btn);
    let main_image = getEl(this.refs.main_image);
    let b1= getEl(this.refs.b1);
    let b2= getEl(this.refs.b2);
    let b3= getEl(this.refs.b3);

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
            origin:'linear(t,0,45,100)'
          }
        },
        {
           element:main_btn,
           property:'background-color',
           expression:{
           	 origin:"evaluateColor('#ff0000','#607D8B',min(t,100)/100)"
           }
        }
      ]
    });

    Binding.bind({
    	eventType:'timing',
        exitExpression:{
           origin: 't>800'
        },
        props:[
          {
          	element:b1,
            property:'transform.translateY',
            expression:{
            	origin:"easeOutBounce(t,0,0-150,800)"
            }
          },
          {
          	element:b2,
            property:'transform.translateY',
            expression:{
            	origin:"t<=100?0:easeOutBounce(t-100,0,0-300,700)"
            }
          },
          {
          	element:b3,
            property:'transform.translateY',
            expression:{
            	origin:"t<=200?0:easeOutBounce(t-200,0,0-450,600)"
            }
          }
        ]
    })

  }

  collapse(){
    let main_btn = getEl(this.refs.main_btn);
    let main_image = getEl(this.refs.main_image);
    let b1= getEl(this.refs.b1);
    let b2= getEl(this.refs.b2);
    let b3= getEl(this.refs.b3);
   	Binding.bind({
      eventType:'timing',
      exitExpression:{
        origin:'t>800'
      },
      props:[
        {
          element: main_image,
          property:'transform.rotateZ',
          expression:{
            origin:'easeOutQuint(t,45,0-45,800)'
          }
        },
        {
           element:main_btn,
           property:'background-color',
           expression:{
           	 origin:"evaluateColor('#607D8B','#ff0000',min(t,800)/800)"
           }
        }
      ]

    });

    Binding.bind({
    	eventType:'timing',
        exitExpression:{
           origin: 't>800'
        },
        props:[
         {
        	element:b1,
            property:'transform.translateY',
            expression:{
            	origin:"easeOutQuint(t,-150,150,800)"
         	}
         },

         {
          	element:b2,
            property:'transform.translateY',
            expression:{
            	origin:"t<=100?(0-300):easeOutQuint(t-100,0-300,300,700)"
            }
          },
         {
          	element:b3,
            property:'transform.translateY',
            expression:{
            	origin:"t<=200?(0-450):easeOutQuint(t-200,0-450,450,600)"
            }
         }
        ]
    })

  }


  clickBtn(){

    if(this.isExpanded) {
    	this.collapse();
    } else {
    	this.expand();
    }

    this.isExpanded = !this.isExpanded;


  }

  render() {
    return (
      <View style={styles.container}>


        <View style={[styles.btn,{backgroundColor:'#6A1B9A'}]} ref="b1" onClick={()=>{this.clickBtn()}}>
          <Text style={[styles.text]}>
            A
          </Text>
        </View>

        <View style={[styles.btn,{backgroundColor:'#0277BD'}]} ref="b2" onClick={()=>{this.clickBtn()}}>
          <Text style={[styles.text]}>
            B
          </Text>
        </View>

        <View style={[styles.btn,{backgroundColor:'#FF9800'}]} ref="b3" onClick={()=>{this.clickBtn()}}>
          <Text style={[styles.text]}>
            C
          </Text>
        </View>

        <View style={[styles.btn]} ref="main_btn" onClick={()=>{this.clickBtn()}}>
          <Image style={[styles.image]} ref="main_image" source={{uri:'https://gw.alicdn.com/tfs/TB1PZ25antYBeNjy1XdXXXXyVXa-128-128.png'}} />
        </View>

      </View>
    );
  }


}

export default App;
