# frozen_string_literal: true

class MelodyDecorator < Draper::Decorator
  delegate_all

  def info
    line = ''
    info_array.each do |key, value|
      line += (value.join('、') + ': ' + key + '<br />')
    end
    line
  end

  private

  def info_array
    reverse_hash = {}
    name_array = [singer.try!(:name), lyric_writer, composer, adapter]
    name_array.each_with_index do |key_name, index|
      if reverse_hash.key?(key_name)
        reverse_hash[key_name] << human_name_array[index]
      else
        reverse_hash.store(key_name, [human_name_array[index]])
      end
    end
    reverse_hash.reject { |key, _value| key.blank? }
  end

  def human_name_array
    [I18n.t('activerecord.attributes.melody.singer_id'),
     I18n.t('activerecord.attributes.melody.rylic_writer'),
     I18n.t('activerecord.attributes.melody.composer'),
     I18n.t('activerecord.attributes.melody.adapter')]
  end
end
