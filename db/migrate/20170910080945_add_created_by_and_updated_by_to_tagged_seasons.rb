class AddCreatedByAndUpdatedByToTaggedSeasons < ActiveRecord::Migration[5.1]
  def change
    add_column :tagged_seasons, :created_by, :integer
    add_column :tagged_seasons, :updated_by, :integer
  end
end
