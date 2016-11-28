require 'hypernova'

# frozen_string_literal: true
class Admin::TopController < Admin::BaseController
  around_filter :hypernova_render_support

  def index
  end
end
