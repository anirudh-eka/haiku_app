class RemoveOauthTokenAndOauthSecretFromPoets < ActiveRecord::Migration
  def change
    remove_column :poets, :oauth_token, :string
    remove_column :poets, :oauth_secret, :string
  end
end
