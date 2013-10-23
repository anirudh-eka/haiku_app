class Poem < ActiveRecord::Base
  belongs_to :poet
  has_many :snaps

  validates_presence_of :content, message: "What is a poem without words?"
  validates_length_of :content, maximum: 140, message: "Words are like light, enough can give you sight, too much can make you blind"
  validate :snap_count_cannot_be_negative
  
  def snap_count_cannot_be_negative
    errors.add(:snap_count, "snap_count can't be negative") if snap_count < 0
  end
end