class RemoveUidToPoets < ActiveRecord::Migration
  def change
    remove_column :poets, :uid
  end
end
