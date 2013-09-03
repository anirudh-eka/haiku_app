class Poet < ActiveRecord::Base
   has_many :poems
   has_many :snaps

   validates_presence_of :name
   validates :name, length: { maximum: 20 }

  def self.create_with_omniauth(auth)
    create! do |poet|
      poet.provider = auth["provider"]
      poet.uid = auth["uid"]
      poet.name = auth["info"]["name"]
    end
  end
end