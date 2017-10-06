require 'rails_helper'

describe Post do 
  it { should have_many(:images).dependent(:destroy) }
  it { should validate_presence_of( :title ) }
  it { should validate_presence_of( :content) }
end