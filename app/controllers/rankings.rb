get '/rankings' do
	@fallspace_ordered_total_enemies = Player.order('total_badguys DESC').limit(10)
	@fallspace_ordered_total_asteroids = Player.order('total_asteroids DESC').limit(10)
	@fallspace_ordered_total_walls = Player.order('total_walls DESC').limit(10)

	@footballurrito_ordered_total_burritos = Player.order('total_burritos DESC').limit(10)
	@footballurrito_ordered_total_opponents = Player.order('total_opponents DESC').limit(10)

	erb :ranking
end