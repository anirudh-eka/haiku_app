class Snap < ActiveRecord::Base
   belongs_to :poet
   belongs_to :poem

   validates_uniqueness_of :poem_id, :scope => [:poet_id]
end