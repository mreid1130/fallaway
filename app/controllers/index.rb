get '/' do 
	if session[:player_id]
		@logged_in = logged_in?
		@current_player = current_player
		erb :index
	else
		erb :index
	end
end

post '/players/new' do
	player = Player.new(params)
	if player.save
		session[:player_id] = player.id 
	else
		return "Error"
	end
	redirect '/'
end

post '/players' do 
	@player = Player.find_by(username: params[:username])
	p '*' * 100
	p @player
	if @player && @player.authenticate(params[:password_hash])
		session[:player_id] = @player.id
		redirect '/'
	else
		redirect '/'
	end
end

get '/logout' do
	session[:player_id]=nil
	redirect '/'
end
