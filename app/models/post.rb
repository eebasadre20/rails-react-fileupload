class Post < ApplicationRecord
  has_many :images, as: :imageable, dependent: :destroy, class_name: 'Picture'
  accepts_nested_attributes_for :images, allow_destroy: true
  attr_accessor :image_base64, :image_id

  validates :title, presence: true
  validates :content, presence: true
  validates :image_base64, presence: true, on: :create
end
