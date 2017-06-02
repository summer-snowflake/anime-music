import React from 'react'
import { render } from 'react-dom'
import { Router, browserHistory } from 'react-router'
import routes from './routes.js'
import { origin } from './origin.js'

window.onerror = function(errorMsg, fileName, lineNumber) {
    var errorInfo = {
      'error_msg'    : errorMsg,           // エラーメッセージ
      'file_name'    : fileName,           // エラーが発生したスクリプトのファイル名
      'line_number'  : lineNumber,         // エラーが発生した行
      'url_disp_page': location.href,      // エラー発生時に閲覧していた URL
      'user_agent'   : navigator.userAgent // エラーが発生したクライアントのユーザエージェント
    }
    fetch(origin + 'api/notification', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Token token=' + localStorage.getItem('access_token')
      },
      body: JSON.stringify(errorInfo)
    })
}

render(<Router history={browserHistory} routes={routes} />, document.getElementById('content'))
