# frozen_string_literal: true

module ApplicationHelper
  def default_meta_tags
    site = Settings.site
    og = site.og.merge(title: site.title,
                       url: request.original_url,
                       image: image_url(Settings.site_image_path),
                       site_name: site.site,
                       description: site.description)
    site['og'] = og
    site.merge(canonical: request.original_url, reverse: true)
  end
end
