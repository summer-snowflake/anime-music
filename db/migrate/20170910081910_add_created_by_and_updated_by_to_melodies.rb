class AddCreatedByAndUpdatedByToMelodies < ActiveRecord::Migration[5.1]
  def change
    add_column :melodies, :created_by, :integer
    add_column :melodies, :updated_by, :integer
  end
end
