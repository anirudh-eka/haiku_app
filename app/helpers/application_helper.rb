module ApplicationHelper

  def logged_in?
    session[:poet_id] ? true : false
  end
end
