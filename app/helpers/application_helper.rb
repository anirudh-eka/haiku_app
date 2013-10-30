module ApplicationHelper
  def user_authentication
    redirect_to root_url unless logged_in? 
  end
  def logged_in?
    session[:poet_id] ? true : false
  end
  def current_user
    return Poet.find(session[:poet_id]) if logged_in?
    nil
  end
end
