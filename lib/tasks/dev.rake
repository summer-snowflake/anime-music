namespace :db do
  namespace :seed do
    desc 'Import test data'
    task dev: :environment do
      singer1 = FactoryGirl.create(:singer, name: '喜多修平')
      singer2 = FactoryGirl.create(:singer, name: 'Aimer')
      anime = FactoryGirl.create(:anime, title: '夏目友人帳', summary: '両親を亡くした少年・夏目には秘密が。それは、妖怪が見える事。強い妖力を持っていた祖母・レイコの遺品である妖怪達の契約書『友人帳』を手にして以来、あやかしから狙われる羽目に。封印を解き、自分の死後、友人帳を譲る事を約束した用心棒・ニャンコ先生と共に、妖怪達へ契約した名前を返したりと、忙しい日々を過ごしていて…', wiki_url: 'https://ja.wikipedia.org/wiki/%E5%A4%8F%E7%9B%AE%E5%8F%8B%E4%BA%BA%E5%B8%B3', picture: '')
      season1 = FactoryGirl.create(:season, anime: anime, name: '', start_on: '2008-07-08', end_on: '2008-09-30')
      melody1 = FactoryGirl.create(:melody, anime: anime, season: season1, singer: singer1, kind: :op, title: '一斉の声', lyric_writer: '椎名慶治', composer: 'TAKUYA', adapter: 'TAKUYA, h-wonder', memo: '')
      season5 = FactoryGirl.create(:season, anime: anime, name: '伍', start_on: '2016-10-04')
      melody5 = FactoryGirl.create(:melody, anime: anime, season: season5, singer: singer2, kind: :ed, title: '茜さす', lyric_writer: 'aimerrhythm', composer: '釣俊輔', adapter: '玉井健二, 釣俊輔', memo: '')

      actor1 = FactoryGirl.create(:actor)
      actor2 = FactoryGirl.create(:actor)
      appearance = FactoryGirl.create(:appearance, anime: anime, actor: actor1)
      appearance = FactoryGirl.create(:appearance, anime: anime, actor: actor2)

      
      advertisement = FactoryGirl.create(:advertisement, anime: anime, actor: nil, body: '<a href="https://www.amazon.co.jp/%E5%A4%8F%E7%9B%AE%E5%8F%8B%E4%BA%BA%E5%B8%B3-1-%E8%8A%B1%E3%81%A8%E3%82%86%E3%82%81COMICS-%E7%B7%91%E5%B7%9D-%E3%82%86%E3%81%8D/dp/4592171586/ref=as_li_ss_il?ie=UTF8&linkCode=li2&tag=kaekasui-22&linkId=c4fe2575166aed8c65087533aed1ad3c" target="_blank"><img border="0" src="//ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=4592171586&Format=_SL160_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&tag=kaekasui-22" ></a><img src="https://ir-jp.amazon-adsystem.com/e/ir?t=kaekasui-22&l=li2&o=9&a=4592171586" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />')
      advertisement = FactoryGirl.create(:advertisement, anime: anime, actor: nil, body: '<a href="https://www.amazon.co.jp/%E5%A4%8F%E7%9B%AE%E5%8F%8B%E4%BA%BA%E5%B8%B3-%E4%B8%BB%E5%A9%A6%E3%81%A8%E7%94%9F%E6%B4%BB%E7%94%9F%E6%B4%BB%E3%82%B7%E3%83%AA%E3%83%BC%E3%82%BA-PASH%EF%BC%81%E7%B7%A8%E9%9B%86%E9%83%A8/dp/4391632780/ref=as_li_ss_il?s=books&ie=UTF8&qid=1479137643&sr=1-13&keywords=%E5%A4%8F%E7%9B%AE%E5%8F%8B%E4%BA%BA%E5%B8%B3&linkCode=li2&tag=kaekasui-22&linkId=db3b5e92415d1bc77dbe986b6bd133fb" target="_blank"><img border="0" src="//ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=4391632780&Format=_SL160_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&tag=kaekasui-22" ></a><img src="https://ir-jp.amazon-adsystem.com/e/ir?t=kaekasui-22&l=li2&o=9&a=4391632780" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />')
    end
  end
end
