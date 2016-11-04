class CreateMelodies < ActiveRecord::Migration[5.0]
  def change
    create_table :melodies do |t|
      t.references :anime,    index: true
      t.references :season,   index: true
      t.integer    :kind,     null: false
      t.string     :title,    null: false
      t.references :singer,   index: true
      t.string     :music
      t.string     :lyric_writer
      t.string     :composer
      t.string     :adapter
      t.text       :memo
      t.date       :start_on
      t.date       :end_on

      t.timestamps
    end
  end
end
