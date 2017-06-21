# frozen_string_literal: true

json.id @advertisement.id
json.body @advertisement.body.try(:html_safe)
