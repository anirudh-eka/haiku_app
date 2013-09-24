class AddSnapCountToPoems < ActiveRecord::Migration
  def change
    add_column :poems, :snap_count, :integer
  end
end
