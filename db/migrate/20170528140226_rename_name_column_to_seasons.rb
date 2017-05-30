class RenameNameColumnToSeasons < ActiveRecord::Migration[5.1]
  def change
    rename_column :seasons, :name, :behind_name
  end
end
