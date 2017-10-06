include ActionDispatch::TestProcess 

FactoryGirl.define do
  factory :picture do
    image { fixture_file_upload( Rails.root.join( 'spec/factories/images/sponge-bob.jpg' ), 'image/jpeg') }
    association :imageable, factory: :post
  end
end