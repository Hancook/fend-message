var argv = require('yargs').argv
module.exports = {
  NODE_ENV: '"production"',
  RENAME_ENTRY_ROUTE: !argv.no_rename_entry,
  API_BASE_URL: argv.api_base_url,
  ENV_PROD_PROFILE: argv.env_prod_profile,
  VERSION: argv.version,
}
