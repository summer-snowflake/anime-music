class AddCreatedByAndUpdatedByToAnimes < ActiveRecord::Migration[5.1]
  def change
    add_column :animes, :created_by, :integer
    add_column :animes, :updated_by, :integer
  end
end
