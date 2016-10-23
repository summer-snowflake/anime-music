class CreateSeasons < ActiveRecord::Migration[5.0]
  def change
    create_table :seasons do |t|
      t.integer :anime_id, null: false
      t.string :name, null: false
      t.date :start_on
      t.date :end_on

      t.timestamps
    end
  end
end
