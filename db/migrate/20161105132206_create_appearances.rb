class CreateAppearances < ActiveRecord::Migration[5.0]
  def change
    create_table :appearances do |t|
      t.references :anime, null: false, index: true
      t.references :actor, null: false, index: true

      t.timestamps
    end
  end
end
