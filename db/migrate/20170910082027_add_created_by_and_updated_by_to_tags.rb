class AddCreatedByAndUpdatedByToTags < ActiveRecord::Migration[5.1]
  def change
    add_column :tags, :created_by, :integer
    add_column :tags, :updated_by, :integer
  end
end
