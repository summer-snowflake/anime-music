class ChangeTypeSummaryToAnimes < ActiveRecord::Migration[5.1]
  def change
    change_column :animes, :summary, :text
  end
end
