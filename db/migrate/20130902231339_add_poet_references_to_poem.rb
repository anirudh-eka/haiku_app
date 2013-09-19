class AddPoetReferencesToPoem < ActiveRecord::Migration
  def change
    add_column :poems, :poet_id, :integer
  end
end
