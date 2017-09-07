class CreateTaggedSeasons < ActiveRecord::Migration[5.1]
  def change
    create_table :tagged_seasons do |t|
      t.integer :season_id, null: false
      t.integer :tag_id, null: false

      t.timestamps
    end
  end
end
