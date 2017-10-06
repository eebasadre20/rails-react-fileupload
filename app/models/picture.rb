class Picture < ApplicationRecord
  belongs_to :imageable, polymorphic: true, optional: true
  has_attached_file :image, 
    default_style: :medium,
    styles: { medium: "300x300>", thumb: "100x100>" },
    url: ':s3_domain_url',
    path: '/:class/:attachment/:id_partition/:style/:filename'

  validates_attachment_content_type :image, 
    :content_type => ['image/jpeg','image/png','image/x-png', 'image/gif']
  validates_attachment_size :upload, :less_than => 2000.kilobytes, :message => 'Uploaded image exceeded allowable image size of 2MB.'
end
