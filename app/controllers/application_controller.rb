class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception


  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end

  def check_logged_in!
    redirect_to root_url, { flash: { error: 'You must be signed in to do that!' } } unless current_user
  end
end
