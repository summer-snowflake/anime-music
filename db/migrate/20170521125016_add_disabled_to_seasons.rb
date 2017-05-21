class AddDisabledToSeasons < ActiveRecord::Migration[5.1]
  def change
    add_column :seasons, :disabled, :boolean, null: false, default: false
  end
end
