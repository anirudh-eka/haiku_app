class Poet < ActiveRecord::Base
   has_many :poems
   has_many :snaps

  def self.create_with_omniauth(auth)
    create! do |poet|
      poet.provider = auth["provider"]
      poet.uid = auth["uid"]
      poet.username = auth["info"]["name"]
    end
  end
end