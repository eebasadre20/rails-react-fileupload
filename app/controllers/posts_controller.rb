class PostsController < ApplicationController
  before_action :set_post, only: [:show, :edit, :update, :destroy]

  # GET /posts
  # GET /posts.json
  def index
    @posts = Post.all
  end

  # GET /posts/1
  # GET /posts/1.json
  def show
  end

  # GET /posts/new
  def new
    @post = Post.new
    @post.images.new
  end

  # GET /posts/1/edit
  def edit
  end

  # POST /posts
  # POST /posts.json
  def create
    @post = Post.new(post_params)

    respond_to do |format|
      if @post.save
        Picture.create!( imageable: @post, image: encode_base64(post_params) )
        format.html { redirect_to @post, notice: 'Post was successfully created.' }
        format.json { render :show, status: :created, location: @post }
      else
        format.html { render :new }
        format.json { render json: @post.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /posts/1
  # PATCH/PUT /posts/1.json
  def update
    respond_to do |format|
      Post.transaction do
        @post.update!( post_params )
        uploaded_image = @post.images.find_by!( id: params[:post][:image_id])
        uploaded_image.update!( imageable: @post, image: encode_base64(post_params) )

        format.json { render :show, status: :ok, location: @post }
      end
    end
  rescue ActiveRecord::Rollback, ActiveRecord::RecordNotFound, ActiveRecord::RecordInvalid => e
    format.json { render json: { message: e.message } , status: :unprocessable_entity }
      # if @post.update(post_params)
      #   uploaded_image = @post.images.find_by( id: params[:post][:image_id])
      #   uploaded_image.update( imageable: @post, image: encode_base64(post_params) )
      #   # format.html { redirect_to @post, notice: 'Post was successfully updated.' }
      #   format.json { render :show, status: :ok, location: @post }
      # else
      #   format.html { render :edit }
      #   format.json { render json: @post.errors, status: :unprocessable_entity }
      # end
  end

  # DELETE /posts/1
  # DELETE /posts/1.json
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
        png_file.slice! "data:image/jpeg;base64,"
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
