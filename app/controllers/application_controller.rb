class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  skip_before_action :verify_authenticity_token

  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response

  def render_unprocessable_entity_response(exception)
    render json: exception.record.errors.messages, status: :unprocessable_entity
  end

  def render_not_found_response(exception)
    render json: { error: "Couldn't find any record." }, status: :not_found
  end
  
end
