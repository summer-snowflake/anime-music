AdminAnimeRow = React.createClass
  render: ->
    R.tr
      className: 'row'
      R.td
        className: 'title'
        this.props.children
      R.td
        className: 'summary'
        this.props.anime.summary
      R.td
        className: 'wiki-url'
        this.props.anime.wiki_url

module.exports = AdminAnimeRow
