helpers do
  def current_user
    @current_user ||= Player.find(session[:player_id]) if session[:player_id]
  end

  def logged_in?
    !!current_user
  end
end