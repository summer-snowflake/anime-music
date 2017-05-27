# frozen_string_literal: true

require 'net/http'
require 'uri'
require 'json'

simplecov_file = File.read('coverage/.last_run.json')
covered_percent = JSON.parse(simplecov_file)['result']['covered_percent']
circle_build_num = ENV['CIRCLE_BUILD_NUM']
artifact_url = "https://#{circle_build_num}-71275953-gh.circle-artifacts.com"
artifact_file = '/0/home/ubuntu/anime-music/coverage/index.html#_AllFiles'
api_base_url = 'https://api.github.com'
sha1 = ENV['CIRCLE_SHA1']

api_url = "#{api_base_url}/repos/summer-snowflake/anime-music/statuses/#{sha1}"
simplecov_description = "#{covered_percent}% covered"
github_status = covered_percent >= 90 ? 'success' : 'failure'
simplecov_target_url = "#{artifact_url}#{artifact_file}"

uri = URI.parse(api_url)
request = Net::HTTP::Post.new(uri)
request.content_type = 'application/json'
request['Authorization'] = "token #{ENV['GITHUB_API_TOKEN']}"
request['Accept'] = 'application/vnd.github.v3+json'
request.body = JSON.dump(
  'description' => simplecov_description,
  'state' => github_status,
  'context' => 'simplecov',
  'target_url' => simplecov_target_url
)
req_options = {
  use_ssl: uri.scheme == 'https'
}

response = Net::HTTP.start(uri.hostname, uri.port, req_options) do |http|
  http.request(request)
end

p response
p JSON.parse(response.body)
