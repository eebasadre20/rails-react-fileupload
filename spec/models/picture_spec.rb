require 'rails_helper'

describe Picture do
  it { should belong_to(:imageable) }
  it { should have_attached_file(:image) }
  it { should validate_attachment_content_type(:image).
        allowing('image/jpeg','image/png','image/x-png') }
  it { should validate_attachment_size(:image).
        less_than(2.megabytes) }
end