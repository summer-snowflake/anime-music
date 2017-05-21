class AddTagNameToAdvertisements < ActiveRecord::Migration[5.1]
  def change
    add_column :advertisements, :tag_name, :string
  end
end
