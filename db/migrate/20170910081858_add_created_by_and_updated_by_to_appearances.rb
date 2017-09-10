class AddCreatedByAndUpdatedByToAppearances < ActiveRecord::Migration[5.1]
  def change
    add_column :appearances, :created_by, :integer
    add_column :appearances, :updated_by, :integer
  end
end
