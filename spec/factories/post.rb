FactoryGirl.define do
  factory :post do
    title 'TenderLove'
    content 'I love my cats'

    after(:create) do | post |
      binding.pry
      create( :picture, imageable: post )
    end
  end
end