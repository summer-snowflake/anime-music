class CreateMelodyImages < ActiveRecord::Migration[5.1]
  def change
    create_table :melody_images do |t|
      t.references :melody, null: false, index: true
      t.string :picture

      t.timestamps
    end
  end
end
