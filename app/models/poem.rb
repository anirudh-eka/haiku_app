class Poem < ActiveRecord::Base
   belongs_to :poet
   has_many :snaps

   validates_presence_of :content
   validates :content, length: { maximum: 140 }
end