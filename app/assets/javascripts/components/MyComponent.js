import React from 'react'
import { renderReact } from 'hypernova-react'

//function MyComponent(props) {
//  return React.createElement('div', {
//    onClick: function () {
//      alert('Click handlers work.');
//    },
//  }, 'Hello, ' + props.name + '!');
//}

//function MyComponent(props) {
  //return (
  //  <div>Hello</div>
  //)
  ////return React.createElement('div', null, 'Hello,' + props.name)
//}


export default class MyComponentjsa extends React.Component {
  render() {
    return (
      <div>
        Hello, {this.props.name}
      </div>
    )
  }
}

renderReact('MyComponentjsa', MyComponentjs);
