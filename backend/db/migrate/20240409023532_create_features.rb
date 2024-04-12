class CreateFeatures < ActiveRecord::Migration[7.1]
  def change
    create_table :features do |t|
      t.string :featureId
      t.decimal :magnitude
      t.string :place
      t.integer :time
      t.string :url
      t.integer :tsunami
      t.string :magType
      t.string :title
      t.decimal :longitude
      t.decimal :latitude

      t.timestamps
    end
  end
end
