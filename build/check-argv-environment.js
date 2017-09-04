var chalk = require('chalk')
var argv = require('yargs').argv
var config = require('../config')
var environments = config.environments

/**
 * Check if an environment parameter has been specified
 * Launch error if unknow environment
 * Set default environment if no parameter
 * 
 * @param {string} context - The context of building  ['dev', 'build']
 * @return {string} environment - The name of the environment
 */
module.exports = function (context) {
  var environment = ''
  var defaultEnvironment = config[context].defaultEnvironment

  if('env' in argv){
    // if wrong environment
    if (!(argv.env in environments)) {
      console.error(chalk.red('Unsupported environment [--env='+argv.env+']'))
      // Don't do nothing anymore and exit !
      process.exit(1)
    } else {
      environment = argv.env
    }
  } else {
    console.warn(chalk.yellow('No environment specified'))
    console.log(chalk.blue('Switch to default environment ['+ defaultEnvironment +']'))
    environment = defaultEnvironment
  }

  return environment
}
