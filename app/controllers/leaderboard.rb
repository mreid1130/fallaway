get '/leaderboard' do
	@ordered_score = Player.order('high_score DESC').limit(10)
	@ordered_enemies = Player.order('high_badguys DESC').limit(10)
	@ordered_asteroids = Player.order('high_asteroids DESC').limit(10)
	@ordered_walls = Player.order('high_walls DESC').limit(10)

	erb :leaderboard
end