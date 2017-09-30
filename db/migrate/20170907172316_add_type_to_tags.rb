class AddTypeToTags < ActiveRecord::Migration[5.1]
  def change
    add_column :tags, :type, :string, null: false, default: ''
    add_index :tags, :type
  end
end
