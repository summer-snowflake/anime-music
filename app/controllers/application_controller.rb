class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

 #def default_render(*args)
 #   options = args.extract_options!
 #   if args.present?
 #     render args, options.merge(formats: :json)
 #   else
 #     render options.merge(formats: :json)
 #   end
 #end
end
