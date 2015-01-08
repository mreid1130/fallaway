get '/' do
	redirect '/fallspace'
end

get '/fallspace' do
	@fallspace = true
 erb :fallspace
end

get '/footballurrito' do
	@footballurrito = true
 erb :footballurrito
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

post '/players/fallspace/update' do
	if session[:player_id]

		@player = Player.find(session[:player_id])

		# set old player FallSpace score totals to variable
		old_asteroids = @player.total_asteroids
		old_walls = @player.total_walls
		old_badguys = @player.total_badguys

		# # Check player's old high scores and updates them in database if the current game score sets a high score
		# if params[:asteroids].to_i > @player.high_asteroids
		# 	@player.update_attribute(:high_asteroids, params[:asteroids].to_i)
		# end

		# if params[:walls].to_i  > @player.high_walls
		# 	@player.update_attribute(:high_walls, params[:walls].to_i)
		# end

		# if params[:kills].to_i  > @player.high_badguys
		# 	@player.update_attribute(:high_badguys, params[:kills].to_i)
		# end

		# if params[:score].to_i  > @player.high_score
		# 	@player.update_attribute(:high_score, params[:score].to_i)
		# end

		# Updates players FallSpace total scores
		@player.update_attribute(:total_asteroids, old_asteroids+params[:asteroids].to_i)
		@player.update_attribute(:total_walls, old_walls+params[:walls].to_i)
		@player.update_attribute(:total_badguys, old_badguys+params[:kills].to_i)

		Fallspacegame.create(score: params[:score], asteroids: params[:asteroids], walls: params[:walls], badguys: params[:kills], player_id: @player.id)

		@player.update_attribute(:high_score, @player.fallspacegames.scores.order("value DESC").first)
		@player.update_attribute(:high_asteroids, @player.fallspacegames.asteroids.order("value DESC").first)
		@player.update_attribute(:high_walls, @player.fallspacegames.walls.order("value DESC").first)
		@player.update_attribute(:high_badguys, @player.fallspacegames.badguys.order("value DESC").first)

	end
end

post '/players/footballurrito/update' do
	if session[:player_id]

		@player = Player.find(session[:player_id])

		old_burritos = @player.total_burritos
		old_opponents = @player.total_opponents

		@player.update_attribute(:total_burritos, old_burritos+params[:burritos].to_i)
		@player.update_attribute(:total_opponents, old_opponents+params[:opponents].to_i)

		Footballurritogame.create(score: params[:score], opponents: params[:opponents], burritos: params[:burritos], player_id: @player.id)

		@player.update_attribute(:high_score, @player.footballurritogames.scores.order("value DESC").first)
		@player.update_attribute(:high_burritos, @player.footballurritogames.burritos.order("value DESC").first)
		@player.update_attribute(:high_opponents, @player.footballurritogames.opponents.order("value DESC").first)
	end

end

get '/players/:id' do
	@player = Player.find(params[:id])
	erb :profile
end
