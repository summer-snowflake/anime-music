class AddPreviousNameToSeasons < ActiveRecord::Migration[5.1]
  def change
    add_column :seasons, :previous_name, :string
  end
end
