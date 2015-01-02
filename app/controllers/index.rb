get '/' do 
	if session[:player_id]
		erb :index
	else
		erb :login
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
	if @player && @player.authenticate(params[:password])
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
