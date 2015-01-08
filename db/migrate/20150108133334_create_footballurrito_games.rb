class CreateFootballurritoGames < ActiveRecord::Migration
  def change
    create_table :footballurritogames do |t|
      t.belongs_to :player
      t.integer :score, default: 0
      t.integer :burritos, default: 0
      t.integer :opponents, default: 0

      t.timestamps
    end
  end
end
