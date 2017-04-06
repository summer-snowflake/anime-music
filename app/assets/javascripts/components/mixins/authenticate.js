import { Component } from 'react'
import { browserHistory } from 'react-router'
import { origin } from './../../origin.js'

export default class Authenticate extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null
    }
    this.loadUserFromServer = this.loadUserFromServer.bind(this)
  }

  auth() {

  }

  componentDidMount() {
//    this.loadUserFromServer()
  }

  loadUserFromServer() {
    fetch(origin + 'api/user', {
      headers: {'Authorization': 'Token token=' + localStorage.getItem('access_token')}
    })
      .then((res) => {
        if(res.status == '401') {
          browserHistory.push('/login')
        } else {
          res.json().then((json) => {
            this.setState({user: json})
            //if(!json.admin) {
            //  browserHistory.push('/login')
            //}
          })
        }
      })  
      .catch((error) => {
        console.error(error)
      })
  }
}
