class AddProviderUidToPoets < ActiveRecord::Migration
  def change
    add_column :poets, :provider, :string
    add_column :poets, :uid, :integer
  end
end
