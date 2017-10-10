# frozen_string_literal: true

require 'json'

class BrakemanReport
  def run
    run_brakeman
    filename = './brakeman/output.json'
    @json = JSON.parse(File.read(filename))
  end

  def warned?
    warning_count != 0
  end

  def generate_report
    return unless warned?
    xml = Builder::XmlMarkup.new
    xml.instruct! :xml, version: '1.0', encoding: 'UTF-8'
    xml = build_content(xml)

    path = File.join(ENV['CIRCLE_TEST_REPORTS'], 'brakeman')
    Dir.mkdir(path) unless Dir.exist?(path)
    File.write File.join(path, 'brakeman.xml'), xml.target!
  end

  private

  attr_reader :json

  def build_content(xml)
    xml.testsuite testsuite_params do
      xml.properties
      warnings.each do |w|
        xml.testcase testcase_params(w) do
          xml.failure message: w['message'], type: w['warning_type'] do
            xml.cdata! w.pretty_inspect
          end
        end
      end
    end
  end

  def testsuite_params
    { name: 'brakeman', tests: test_count, errors: warning_count,
      time: duration, timestamp: Time.now.xmlschema }
  end

  def testcase_params(w)
    { classname: 'brakeman.security_warnings', name: w['message'],
      file: w['file'], time: 0 }
  end

  def run_brakeman
    dir = './brakeman'
    system('bin/bundle', 'exec', 'brakeman',
           '-o', "#{dir}/output.html",
           '-o', "#{dir}/output.json")
  end

  def test_count
    numbers = %w[number_of_controllers number_of_models number_of_templates]
    numbers.inject(0) do |sum, key|
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

reporter = BrakemanReport.new
reporter.run

if reporter.warned?
  reporter.generate_report
  puts 'Error: Security errors have been detected.'
  exit 1
end
