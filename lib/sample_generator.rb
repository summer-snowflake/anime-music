# frozen_string_literal: true

module SampleGenerator
  def create_anime
    @anime = FactoryGirl.create(
      :anime,
      title: '夏目友人帳', picture: '',
      wiki_url: 'https://ja.wikipedia.org/wiki/%E5%A4%8F%E7%9B%AE%E5%8F%8B%E4%BA%BA%E5%B8%B3',
      summary: '両親を亡くした少年・夏目には秘密が。\
        それは、妖怪が見える事。強い妖力を持っていた祖母・レイコの遺品である\
        妖怪達の契約書『友人帳』を手にして以来、あやかしから狙われる羽目に。\
        封印を解き、自分の死後、友人帳を譲る事を約束した用心棒・ニャンコ先生と共に、\
        妖怪達へ契約した名前を返したりと、忙しい日々を過ごしていて…'
    )
  end

  def create_melody1
    singer1 = FactoryGirl.create(:singer, name: '喜多修平')
    season1 = FactoryGirl.create(
      :season, anime: @anime, name: '',
               start_on: '2008-07-08', end_on: '2008-09-30'
    )

    FactoryGirl.create(
      :melody, anime: @anime, season: season1, singer: singer1, kind: :op,
               title: '一斉の声', lyric_writer: '椎名慶治', composer: 'TAKUYA',
               adapter: 'TAKUYA, h-wonder', memo: ''
    )
  end

  def create_melody2
    singer2 = FactoryGirl.create(:singer, name: 'Aimer')
    season5 = FactoryGirl.create(
      :season, anime: @anime, name: '伍', start_on: '2016-10-04'
    )

    FactoryGirl.create(
      :melody,
      anime: @anime, season: season5, singer: singer2, kind: :ed,
      title: '茜さす', lyric_writer: 'aimerrhythm', composer: '釣俊輔',
      adapter: '玉井健二, 釣俊輔', memo: ''
    )
  end

  def create_appearances
    actor1 = FactoryGirl.create(:actor)
    actor2 = FactoryGirl.create(:actor)
    FactoryGirl.create(:appearance, anime: @anime, actor: actor1)
    FactoryGirl.create(:appearance, anime: @anime, actor: actor2)
  end

  def create_advertisements
    FactoryGirl.create(
      :advertisement,
      anime: @anime, actor: nil, body: '<a href="http://amzn.to/2nzyIRy" />'
    )
    FactoryGirl.create(
      :advertisement,
      anime: @anime, actor: nil, body: '<a href="http://amzn.to/2nzyIRy" />'
    )
  end
end
