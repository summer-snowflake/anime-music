import Anime from './anime.jsx';

var AnimeList = React.createClass({
  loadAnimesFromServer() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      success: (res) => {
        this.setState({animes: res.animes});
      },
      error: (xhr, status, err) => {
        console.error(this.props.url, status, err.toString());
      }
    });
  },

  componentDidMount() {
    this.loadAnimesFromServer();
  },

  getInitialState() {
    return { animes: [] };
  },

  render() {
    return (
      <div className='anime-list'>
        {this.state.animes.map((anime) =>
          <Anime key={anime.id} anime={anime}>{anime.title}</Anime>
        )}
      </div>
    );
  }
});

module.exports = AnimeList;
