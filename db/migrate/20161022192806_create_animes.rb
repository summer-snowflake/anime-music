class CreateAnimes < ActiveRecord::Migration[5.0]
  def change
    create_table :animes do |t|
      t.string :title, null: false
      t.string :summary
      t.string :wiki_url
      t.string :picture

      t.timestamps
    end
  end
end
