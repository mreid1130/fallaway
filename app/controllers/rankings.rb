get '/rankings' do
	@ordered_total_enemies = Player.order('total_badguys DESC').limit(10)
	@ordered_total_asteroids = Player.order('total_asteroids DESC').limit(10)
	@ordered_total_walls = Player.order('total_walls DESC').limit(10)

	erb :ranking
end