FactoryGirl.define do
  factory :poem do |f|
    f.title "unknown"
    f.content "Scarecrow in the hillock\n Paddy field --\n How unaware! How useful!"
    f.snap_count 1
  end
end