class AddGravatarToPlayer < ActiveRecord::Migration
	def change
		add_column :players, :gravatar, :string
	end
end
