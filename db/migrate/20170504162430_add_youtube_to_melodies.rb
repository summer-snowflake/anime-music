class AddYoutubeToMelodies < ActiveRecord::Migration[5.0]
  def change
    add_column :melodies, :youtube, :text
  end
end
