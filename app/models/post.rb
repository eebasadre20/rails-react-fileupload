class Post < ApplicationRecord
  has_many :images, as: :imageable, dependent: :destroy, class_name: 'Picture'
  accepts_nested_attributes_for :images, allow_destroy: true
end
