require 'builder'

class BrakemanReport
  def run
    run_brakeman
    @json = JSON.parse File.read(File.join(Rails.root, 'brakeman', 'output.json'))
  end

  def warned?
    warning_count != 0
  end

  def generate_report
    return unless warned?

    xml = Builder::XmlMarkup.new
    xml.instruct! :xml, version: '1.0', encoding: 'UTF-8'
    xml.testsuite name: 'brakeman', tests: test_count, errors: warning_count, time: duration, timestamp: Time.now.xmlschema do
      xml.properties

      warnings.each do |w|
        xml.testcase classname: 'brakeman.security_warnings', name: w['message'], file: w['file'], time: 0 do
          xml.failure message: w['message'], type: w['warning_type'] do
            xml.cdata! w.pretty_inspect
          end
        end
      end
    end

    path = File.join(ENV['CIRCLE_TEST_REPORTS'], 'brakeman')
    Dir.mkdir(path) unless Dir.exist?(path)
    File.write File.join(path, 'brakeman.xml'), xml.target!
  end

  private

  attr_reader :json

  def run_brakeman
    dir = File.join Rails.root, 'brakeman'
    system('bin/bundle', 'exec', 'brakeman', '-o', "#{dir}/output.html", '-o', "#{dir}/output.json")
  end

  def test_count
    %w(number_of_controllers number_of_models number_of_templates).inject(0) do |sum, key|
      sum + json['scan_info'][key]
    end
  end

  def warning_count
    json['scan_info']['security_warnings']
  end

  def duration
    json['scan_info']['duration']
  end

  def warnings
    json['warnings']
  end
end
