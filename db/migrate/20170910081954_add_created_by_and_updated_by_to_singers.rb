class AddCreatedByAndUpdatedByToSingers < ActiveRecord::Migration[5.1]
  def change
    add_column :singers, :created_by, :integer
    add_column :singers, :updated_by, :integer
  end
end
