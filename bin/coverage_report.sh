STATUSES_API_URL="https://api.github.com/repos/ClinicalPlatform/Qualizm/statuses/${CIRCLE_SHA1}"

COVERED_PERCENT=`ruby -rjson -e "puts JSON.parse(File.read('coverage/.last_run.json'))['result']['covered_percent']"`

SIMPLECOV_TARGET_URL="https://$CIRCLE_BUILD_NUM-71275953-gh.circle-artifacts.com/0/$CIRCLE_ARTIFACTS/coverage/index.html"
SIMPLECOV_DESCRIPTION="${COVERED_PERCENT}% covered"

curl  -H "Authorization: token $GH_STATUS_TOKEN" \
      -H "Content-Type: application/json" \
      -H "Accept: application/vnd.github.v3+json" \
      -d "{\"description\": \"$SIMPLECOV_DESCRIPTION\", \"state\": \"success\", \"context\": \"simplecov\", \"target_url\": \"$SIMPLECOV_TARGET_URL\"}" \
      $STATUSES_API_URL
