import React from 'react';
import ReactDOM from 'react-dom';
import AnimeList from './../components/anime_list.jsx';
import { shallow } from 'enzyme';
jest.unmock('./../components/anime_list.jsx');

describe('AnimeListComponent', () => {
  it('アニメ情報一覧が表示されること', () => {
    const anime_list = shallow(<AnimeList url='api/animes'></AnimeList>);

    anime_list.setState(
      { animes: [{ id: 1, title: 'タイトル' }, { id: 2, title: 'タイトル2' }] }
    );
    expect(anime_list.find('Anime').length).toEqual(2)
  });
});
