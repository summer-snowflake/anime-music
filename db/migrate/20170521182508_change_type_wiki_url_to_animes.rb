class ChangeTypeWikiUrlToAnimes < ActiveRecord::Migration[5.1]
  def up
    change_column :animes, :wiki_url, :text
  end

  def down
    change_column :animes, :wiki_url, :string
  end
end
