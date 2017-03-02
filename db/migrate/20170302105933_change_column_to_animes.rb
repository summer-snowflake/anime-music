class ChangeColumnToAnimes < ActiveRecord::Migration[5.0]
  def up
    change_column :animes, :summary, :string, null: false, default: ''
  end

  def down
    change_column :animes, :summary, :string, null: true, default: nil
  end
end
