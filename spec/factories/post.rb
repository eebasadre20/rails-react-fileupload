FactoryGirl.define do
  factory :post do
    title 'TenderLove'
    content 'I love my cats'
    image_base64 'sampleBase64'

    after(:create) do | post |
      create( :picture, imageable: post )
    end
  end
end