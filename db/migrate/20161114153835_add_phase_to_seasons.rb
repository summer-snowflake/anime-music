class AddPhaseToSeasons < ActiveRecord::Migration[5.0]
  def change
    add_column :seasons, :phase, :integer, default: 0
  end
end
