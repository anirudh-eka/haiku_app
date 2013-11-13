class Poem < ActiveRecord::Base
  belongs_to :poet
  has_many :snaps

  validates_presence_of :content, message: "What is a poem without words?"
  validates_length_of :content, maximum: 140, message: "Words are like light, enough can give you sight, too much can make you blind"
  validates_length_of :title, maximum: 40
  validate :snap_count_cannot_be_negative
  
  def snap_count_cannot_be_negative
    errors.add(:snap_count, "snap_count can't be negative") if snap_count < 0
  end

  private
  def timestamp_attributes_for_create
    super << :positive_update
  end

  def timestamp_attributes_for_update
    return snap_count_changed_positively? ? super << :positive_update : super
  end
 
  def snap_count_changed_positively?
    return snap_count_changed? ? snap_count > snap_count_was : false
  end
end