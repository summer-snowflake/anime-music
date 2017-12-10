class AddStatusToSeasons < ActiveRecord::Migration[5.1]
  def change
    # NOTE: default 0 is :unpublished
    add_column :seasons, :status, :integer, null: false, default: 0
  end
end
