class PostsController < ApplicationController
  before_action :set_post, only: [:show, :edit, :update, :destroy]
  

  def index
    @posts = Post.all
  end

  def show
  end

  def new
    @post = Post.new
    @post.images.new
  end

  def edit
  end

  def create
    Post.transaction do
      @post = Post.create!(post_params)
      @post.images.create!( image: encode_base64(post_params) ) 

      render json: @post, status: :created
    end
  end

  def update
    Post.transaction do
      @post.update!( post_params )

      if params[:post][:image_base64].present? && params[:post][:image_id].present?
        uploaded_image = @post.images.find_by!( id: params[:post][:image_id])
        uploaded_image.update!( imageable: @post, image: encode_base64(post_params) )
      end

      render json: @post, status: :ok
    end
  end

  def destroy
    @post.destroy
    respond_to do |format|
      format.html { redirect_to posts_url, notice: 'Post was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_post
      @post = Post.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def post_params
      params.require(:post).permit(:title, :content, :image_base64, :image_id, images_attributes: [:id, :image])
    end

    def encode_base64( data )
      if data && data[:image_base64].present?
        #data[:upload] = generate_file_from_base64(data)
        png_file = data[:image_base64]
        png_file.gsub!(/(data:image\/jpeg;base64,|data:image\/png;base64,)/, "" )
        png_file = Base64.decode64( png_file )
        file = Tempfile.new( [SecureRandom.uuid,'.jpeg'], "#{Rails.root}/tmp")
        file.binmode
        file.write png_file
        file.rewind
        data[:upload] = file
      end
      data[:upload]
    end
end
