class Poet < ActiveRecord::Base
   has_many :poems, dependent: :destroy
   has_many :snaps

   validates_presence_of :name, :provider, :uid
   validates :name, length: { maximum: 20 }

  def self.create_with_omniauth(auth)
    create! do |poet|
      poet.provider = auth["provider"]
      poet.oauth_token = auth['credentials']['token']
      poet.oauth_secret = auth['credentials']['secret']
      poet.name = auth["info"]["name"]
      poet.uid = auth["uid"]
    end
  end
end