class AddIndexToSnaps < ActiveRecord::Migration
  def change
    add_index :snaps, [:poem_id, :poet_id], :unique => true
  end
end
