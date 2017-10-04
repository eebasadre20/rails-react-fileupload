# json.array! @posts, partial: 'posts/post', as: :post

json.array! @posts do | post |
  puts "Edsil Here"
  json.id       post.id
  json.title    post.title
  json.content  post.content
  json.uploaded_image {
    post.images.each do | uploaded |
      json.image_id  uploaded.id        
      json.thumbnail uploaded.image.url(:thumb)
      json.medium    uploaded.image.url(:medium)
      json.large     uploaded.image.url(:large)
    end
  }
end