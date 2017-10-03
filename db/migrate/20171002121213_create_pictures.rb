class CreatePictures < ActiveRecord::Migration[5.1]
  def change
    create_table :pictures do |t|
      t.references :imageable, polymorphic: true, index: true
      t.attachment :image

      t.timestamps
    end
  end
end