FactoryGirl.define do
  factory :poet do |f|
      f.name "Matsu Basho"
      f.prof_image_url "http://upload.wikimedia.org/wikipedia/commons/a/a7/MatsuoBashoChusonji.jpg"
      f.provider "twitter"
      f.oauth_token 123492307589491
      f.oauth_secret 87349183894 
      f.uid 123456789
    end
end
