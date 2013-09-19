class AddOauthTokenAndSecretToPoets < ActiveRecord::Migration
  def change
    add_column :poets, :oauth_token, :string
    add_column :poets, :oauth_secret, :string 
  end
end
