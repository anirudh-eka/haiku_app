class AddPositiveUpdateToPoems < ActiveRecord::Migration
  def change
    add_column :poems, :positive_update, :timestamp
  end
end
