source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '3.1.0'

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem "rails", "~> 7.0.2", ">= 7.0.2.4"
# Use postgresql as the database for Active Record
gem 'pg', '>= 0.18', '< 2.0'
# Use Puma as the app server
gem 'puma', '~> 5.0'
# Use SCSS for stylesheets
# gem 'sass-rails', '>= 6'
# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder'
# Use Redis adapter to run Action Cable in production
# gem 'redis', '~> 4.0'
# Use Active Model has_secure_password
gem 'active_storage_validations'
gem 'aws-sdk-s3'
gem 'bcrypt'
gem "cssbundling-rails"
gem 'faker'
gem 'friendly_id'
gem 'image_processing'
gem "jsbundling-rails"
gem 'kaminari'
gem 'net-http'
gem 'pry-rails'
gem 'seedbank'
gem 'sprockets-rails'
gem 'stimulus-rails'
gem 'turbo-rails'
gem 'valid_email2'


# Use Active Storage variant
# gem 'image_processing', '~> 1.2'

# Reduces boot times through caching; required in config/boot.rb
gem 'bootsnap', require: false

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'debug', platforms: [:mri, :mingw, :x64_mingw]
end

group :development do
  # Access an interactive console on exception pages or by calling 'console' anywhere in the code.
  gem 'web-console'
  gem 'better_errors'
  gem 'binding_of_caller'
  gem 'annotate'
end

group :test do
  # Use system testing [https://guides.rubyonrails.org/testing.html#system-testing]
  gem "capybara"
  gem "selenium-webdriver"
  gem "webdrivers"
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem "tzinfo-data", platforms: %i[ mingw mswin x64_mingw jruby ]