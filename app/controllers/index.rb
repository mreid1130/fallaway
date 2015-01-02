get '/' do 

	if session[:player_id]
		@current_player = session[:player_id]
	end

	erb :index
end

post '/update-stats' do

end

post '/players/new' do

	player = Player.new(params)
	if player.save
		session[:player_id] = player.id
	end
	redirect '/'

end

post '/players' do 
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
