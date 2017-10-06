require 'rails_helper'

describe Post do 
  context 'valid' do
    let!( :valid_post ) { Post.new( title: 'TenderLove', content: 'I love my cats' ) }
    it 'is not valid without a title' do
      expect( valid_post ).to be_valid
    end

    it 'is not valid without a content' do
      expect( valid_post ).to be_valid
    end
  end

  context 'invalid' do
    it 'is not valid without a title' do
      post = Post.new( title: nil )
      expect( post ).to_not be_valid
    end

    it 'is not valid without a content' do
      post = Post.new( content: nil )
      expect( post ).to_not be_valid
    end
  end
 
end