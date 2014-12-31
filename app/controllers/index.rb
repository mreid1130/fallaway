get '/' do 
	if session[:user_id]
		erb :index
	else
		erb :login
	end
end

post '/signup' do

end

post '/login' do 

end
