class CreateTokens < ActiveRecord::Migration[5.0]
  def change
    create_table :tokens do |t|
      t.string      :name, null: false
      t.belongs_to  :tokenizable, null: false, polymorphic: true
      t.string      :token, null: false
      t.text        :data, null: true
      t.datetime    :expires_at, null: true
      t.datetime    :created_at, null: false
    end

    # add_index :tokens, [:tokenizable_type, :tokenizable_id]
    change_column_null :tokens, :tokenizable_type, false
    add_index :tokens, :token
    add_index :tokens, :expires_at
    add_index :tokens, [:tokenizable_id, :tokenizable_type, :name], unique: true
  end
end
