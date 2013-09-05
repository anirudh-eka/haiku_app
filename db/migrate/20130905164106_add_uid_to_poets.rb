class AddUidToPoets < ActiveRecord::Migration
  def change
    add_column :poets, :uid, :string
  end
end
