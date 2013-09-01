class CreatePoets < ActiveRecord::Migration
  def change
    create_table :poets do |t|
      t.string :name
      t.string :oauth_token
      t.string :oauth_secret
      t.string :prof_image_url

      t.timestamps
    end
  end
end
