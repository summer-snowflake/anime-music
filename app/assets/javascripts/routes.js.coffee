routes =
  React.createElement(
    Route
    { path: '/admin' }
    React.createElement(
      Route
      { path: 'animes' }
      null
    )
  )

ReactDOM.render(React.createElement(Router, null, routes), document.body)
