import React from 'react';

var Anime = React.createClass({
  render: function() {
    return (
      <div className='panel panel-default anime-title'>
        <div className='panel-body'>
          { this.props.children }
        </div>
      </div>
    );
  }
});

module.exports = Anime;
