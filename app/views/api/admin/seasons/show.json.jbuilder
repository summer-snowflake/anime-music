# frozen_string_literal: true

json.id @season.id
json.phase @season.phase
json.anime_title @season.decorate.anime_title
json.previous_name @season.previous_name
json.behind_name @season.behind_name
json.disabled @season.disabled
json.start_on @season.start_on
json.end_on @season.end_on
json.period @season.decorate.period
