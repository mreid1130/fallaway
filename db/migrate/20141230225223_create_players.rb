class CreatePlayers < ActiveRecord::Migration
  def change
  	create_table :players do |t|
  		t.string :username
  		t.string :password_hash
  		t.string :email
  		t.integer :high_fallspace_score, default: 0
  		t.integer :high_asteroids, default: 0
  		t.integer :high_walls, default: 0
  		t.integer :high_badguys, default: 0
  		t.integer :total_asteroids, default: 0
  		t.integer :total_walls, default: 0
  		t.integer :total_badguys, default: 0
      t.integer :high_footballurrito_score, default: 0
      t.integer :high_burritos, default: 0
      t.integer :high_opponents, default: 0
      t.integer :total_burritos, default: 0
      t.integer :total_opponents, default: 0

  		t.timestamps
  	end
  end
end
