class CreatePoems < ActiveRecord::Migration
  def change
    create_table :poems do |t|
    	t.string :title
      t.text :content

      t.timestamps
    end
  end
end
