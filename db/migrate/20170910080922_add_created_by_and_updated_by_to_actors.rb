class AddCreatedByAndUpdatedByToActors < ActiveRecord::Migration[5.1]
  def change
    add_column :actors, :created_by, :integer
    add_column :actors, :updated_by, :integer
  end
end
