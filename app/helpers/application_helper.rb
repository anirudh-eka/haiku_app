module ApplicationHelper
  
  def logged_in?
    session[:user_id] ? true : false
  end
end
