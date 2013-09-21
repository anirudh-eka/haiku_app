class Poem < ActiveRecord::Base
   belongs_to :poet
   has_many :snaps

   validates_presence_of :content, message: "What is a poem without words?"
   validates_length_of :content, maximum: 140, message: "Words are like light, enough can give you sight, too much can make you blind"
end