class Poet < ActiveRecord::Base
   has_many :poems
   has_many :snaps
end