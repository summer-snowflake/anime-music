# frozen_string_literal: true

class MelodyDecorator < Draper::Decorator
  delegate_all

  def info
    line = ''
    info_array.each {|key, value| line += (value.join('、') + ': ' + key + '<br />')}
    line
  end

  private

  def info_array
    reverse_hash = {}
    [singer.try!(:name), lyric_writer, composer, adapter].each_with_index do |key_name, index|
      if reverse_hash.key?(key_name)
        reverse_hash[key_name] << human_name_array[index]
      else
        reverse_hash.store(key_name, [human_name_array[index]])
      end
    end
    reverse_hash.reject{|hash| hash.blank?}
  end

  def human_name_array
    [I18n.t('activerecord.attributes.melody.singer_id'),
     I18n.t('activerecord.attributes.melody.rylic_writer'),
     I18n.t('activerecord.attributes.melody.composer'),
     I18n.t('activerecord.attributes.melody.adapter')]
  end
end
