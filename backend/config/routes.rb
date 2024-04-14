Rails.application.routes.draw do
  namespace :api do
    # get 'comments/create'
    resources :features do
      resources :comments, only: [:create, :index]
    end
  end  
end
