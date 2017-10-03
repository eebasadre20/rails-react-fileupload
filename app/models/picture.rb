class Picture < ApplicationRecord
  belongs_to :imageable, polymorphic: true, optional: true
  has_attached_file :avatar, styles: {
    thumb: '100x100>',
    square: '200x200#',
    medium: '300x300>'
  }

  validates_attachment_content_type :image , 
    :content_type => ['image/jpeg', 'image/jpg', 'image/png','image/x-png', 'image/gif']
end
