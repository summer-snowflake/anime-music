require 'brakeman_report'
namespace :brakeman do
  desc 'Run brakeman and generate security report in JUnit XML format'
  task :run do
    reporter = BrakemanReport.new
    reporter.run

    if reporter.warned?
      reporter.generate_report
      puts 'Error: Security errors have been detected.'
      exit 1 # NOTE: CircleCIがテスト失敗したと分かるようにnon-zeroのステータスで終了
    end
  end
end
