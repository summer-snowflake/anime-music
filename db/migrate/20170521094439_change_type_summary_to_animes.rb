class ChangeTypeSummaryToAnimes < ActiveRecord::Migration[5.1]
  def up
    change_column :animes, :summary, :text
  end

  def down
    change_column :animes, :summary, :string
  end
end
