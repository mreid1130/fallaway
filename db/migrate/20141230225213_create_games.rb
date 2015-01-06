class CreateGames < ActiveRecord::Migration
  def change
  	create_table :games do |t|
  		t.belongs_to :player
  		t.integer :score, default: 0
  		t.integer :asteroids, default: 0
  		t.integer :walls, default: 0
  		t.integer :badguys, default: 0

  		t.timestamps
  	end
  end
end
