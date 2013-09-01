class Poem < ActiveRecord::Base
   belongs_to :poet
   has_many :snaps
end