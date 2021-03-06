CarrierWave::SanitizedFile.sanitize_regexp = /[^[:word:]\.\-\+]/

if Rails.env.production?
  CarrierWave.configure do |config|
    config.fog_credentials = {
      provider: 'AWS',
      aws_access_key_id: ENV['AWS_ACCESS_KEY'],
      aws_secret_access_key: ENV['AWS_SECRET_ACCESS_KEY'],
      region: ENV['AWS_REGION']
    }
    config.cache_storage = :fog
    config.fog_public = true
    config.fog_directory = ENV['AWS_FOG_DIRECTORY']
  end
end
