class AddCreatedByAndUpdatedByToSeasons < ActiveRecord::Migration[5.1]
  def change
    add_column :seasons, :created_by, :integer
    add_column :seasons, :updated_by, :integer
  end
end
