class Picture < ApplicationRecord
  belongs_to :imageable, polymorphic: true, optional: true
  has_attached_file :image, 
    default_style: :medium,
    styles: { medium: "300x300>", thumb: "100x100>" },
    url: ':s3_domain_url',
    path: ':rails_root/public/system/:class/:attachment/:id_partition/:style/:filename'

  validates_attachment :image, 
    content_type: { content_type: ['image/jpeg','image/png','image/x-png', 'image/gif'] }
  
    # Changing to exact bytes value because using the 2.megabytes will throw rspec error.
    validates_attachment_size :image, :less_than => 2097152, 
      :message => 'Uploaded image exceeded allowable image size of 2MB.',
      unless:  Proc.new { | attachment | attachment.image_file_name.blank? }
end
