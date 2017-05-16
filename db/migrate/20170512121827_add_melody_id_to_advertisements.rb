class AddMelodyIdToAdvertisements < ActiveRecord::Migration[5.1]
  def change
    add_reference :advertisements, :melody, index: true, foreign_key: true
  end
end
