class AddPictureToMelodies < ActiveRecord::Migration[5.1]
  def change
    add_column :melodies, :picture, :string
  end
end
