class Snap < ActiveRecord::Base
   belongs_to :poet
   belongs_to :poem
end