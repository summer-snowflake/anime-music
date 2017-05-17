CarrierWave::SanitizedFile.sanitize_regexp = /[\/\\]/

CarrierWave.configure do |config|
  config.fog_credentials = {
    provider: 'AWS',
    aws_access_key_id: ENV['AWS_ACCESS_KEY'],
    aws_secret_access_key: ENV['AWS_SECRET_ACCESS_KEY'],
    region: ENV['AWS_REGION']
  }
  config.fog_directory = ENV['AWS_FOG_DIRECTORY']
  config.asset_host = ENV['AWS_FOG_ASSET_HOST']
end
