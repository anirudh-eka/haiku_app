class AddDefaultToSnapCountToPoems < ActiveRecord::Migration
  def change
    change_column :poems, :snap_count, :integer, default: 0
  end
end
