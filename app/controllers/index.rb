get '/' do 

	if session[:player_id]
		@logged_in = logged_in?
		@current_player = current_player
	end

	erb :index
end

post '/players/new' do

	player = Player.new(params)

	if player.save
		session[:player_id] = player.id 
	end

	redirect '/'
end

post '/players' do 

	@player = Player.find_by(username: params[:username])

	if @player && @player.authenticate(params[:password_hash])
		session[:player_id] = @player.id
	end

		redirect '/'
end

get '/logout' do

	session[:player_id]=nil

	redirect '/'
	
end
