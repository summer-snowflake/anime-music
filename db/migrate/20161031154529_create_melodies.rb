class CreateMelodies < ActiveRecord::Migration[5.0]
  def change
    create_table :melodies do |t|
      t.integer :anime_id,   null: false
      t.integer :season_id, null: false
      t.integer :kind,       null: false
      t.string  :title
      t.integer :singer_id
      t.string  :music
      t.string  :lyric_writer
      t.string  :composer
      t.string  :adapter
      t.text    :memo
      t.date    :start_on,   null: false
      t.date    :end_on

      t.timestamps
    end
  end
end
