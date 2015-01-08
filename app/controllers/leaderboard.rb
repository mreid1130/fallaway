get '/leaderboard' do
	@fallspace_ordered_score = Player.order('high_fallspace_score DESC').limit(10)
	@fallspace_ordered_enemies = Player.order('high_badguys DESC').limit(10)
	@fallspace_ordered_asteroids = Player.order('high_asteroids DESC').limit(10)
	@fallspace_ordered_walls = Player.order('high_walls DESC').limit(10)

	@footballurrito_ordered_score = Player.order('high_footballurrito_score DESC').limit(10)
	@footballurrito_ordered_burritos = Player.order('high_burritos DESC').limit(10)
	@footballurrito_ordered_opponents = Player.order('high_opponents DESC').limit(10)

	erb :leaderboard
end