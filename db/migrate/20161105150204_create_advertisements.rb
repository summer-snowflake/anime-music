class CreateAdvertisements < ActiveRecord::Migration[5.0]
  def change
    create_table :advertisements do |t|
      t.references :anime, index: true
      t.references :actor, index: true
      t.text :body, null: false

      t.timestamps
    end
  end
end
