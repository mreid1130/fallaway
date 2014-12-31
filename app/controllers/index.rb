get '/' do 
	if session[:player_id]
		erb :index
	else
		erb :login
	end
end

post '/signup' do
	player = Player.new(params)
	if player.save
		session[:player_id] = player.id 
	else
		return "Error"
	end
	redirect '/'
end

post '/login' do 
	@player = Player.find_by_email(params[:email])
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
