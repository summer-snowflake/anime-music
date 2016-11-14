class AlterNameToSeasons < ActiveRecord::Migration[5.0]
  def change
    change_column :seasons, :name, :string, null: true
  end
end
