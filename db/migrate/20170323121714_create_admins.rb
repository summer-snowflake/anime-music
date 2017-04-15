class CreateAdmins < ActiveRecord::Migration[5.0]
  def change
    create_table :admins do |t|
      t.references :user, index: true, null: false

      t.timestamps
    end
  end
end
