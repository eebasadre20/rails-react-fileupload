require 'rails_helper'

describe Post do 
  let!(:post) { create(:post) }

  subject { described_class.new(
    title: 'TenderLove',
    content: 'I love my cats'
  ) }
  
  context 'valid' do
    it 'is valid with valid attributes' do
      expect( subject ).to be_valid
    end
  end

  context 'invalid' do
    it 'is not valid without a title' do
      subject.title = nil
      expect( subject ).to_not be_valid
    end

    it 'is not valid without a content' do
      subject.content = nil
      expect( subject ).to_not be_valid
    end
  end
 
end