class AddDraftToMelodies < ActiveRecord::Migration[5.1]
  def change
    add_column :melodies, :draft, :boolean, null: false, default: false
  end
end
