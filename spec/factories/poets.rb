FactoryGirl.define do
  factory :poet do |f|
      f.name "Matsu Basho"
      f.prof_image_url "http://upload.wikimedia.org/wikipedia/commons/a/a7/MatsuoBashoChusonji.jpg"
      f.provider "twitter" 
      f.uid 123456789
    end
end