class Snap < ActiveRecord::Base
   belongs_to :poet
   belongs_to :poem

   #validates_uniqueness_of :poet_id, :poem_id
end