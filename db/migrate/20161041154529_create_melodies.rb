class CreateMelodies < ActiveRecord::Migration[5.0]
  def change
    create_table :melodies do |t|
      t.references :season,   null: false, index: true
      t.integer    :kind,     null: false
      t.string     :title
      t.references :singer,   index: true
      t.string     :music
      t.string     :lyric_writer
      t.string     :composer
      t.string     :adapter
      t.text       :memo
      t.date       :start_on, null: false
      t.date       :end_on

      t.timestamps
    end
  end
end
