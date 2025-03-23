import { defineConfig } from 'cypress';
import fs from 'fs';
import * as cypressOtp from 'cypress-otp';

export default defineConfig({
  retries: 2,
  chromeWebSecurity: false,
  video: true,
  projectId: 'vq1sx1',
  e2e: {
    reporter: "mochawesome",
    //reporter: 'junit',
    reporterOptions: {
      mochaFile: 'reports/e2e-test-results-[hash].xml',
      reportDir: "reports",
      overwrite: false,
      html: true,
      json: true,
      reportFilename: "test-results",
    },
    experimentalOriginDependencies: true,
    setupNodeEvents(on, config) {
      on('after:spec', (spec: Cypress.Spec, results: CypressCommandLine.RunResult) => {
        if (results && results.video) {
          // Do we have failures for any retry attempts?
          const failures = results.tests.some(test => test.attempts.some(attempt => attempt.state === 'failed'));
          if (!failures) {
            // delete the video if the spec passed and no tests retried
            fs.unlinkSync(results.video);
          }
        }
      });
      on('task', {
        generateOTP: cypressOtp
      });
      // implement node event listeners here

      //this logic in this section was stolen from here https://glebbahmutov.com/blog/load-cypress-env-settings/
      //In short: There is a settings file for each target environment. qa.settings.json is used by default... you might have prod.settings.json, uat.settings.json too. It's all good.
      // In the code we will use the following syntax to get one of the values from the file:   cosnt myVariable = Cypress.env('someKey')

      const environmentName = config.env.environmentName || 'qa'; //get the command line parameter called environmentName (default to QA)
      const filenameForTargetEnv = `./${environmentName}.settings.json`;
      //changing env run (npx cypress open --env environmentName=dev choose a env from the settings files.

      const settings = require(filenameForTargetEnv); // get the setting for the target environment into an object.

      if (settings.env.baseUrl) {
        //if there's a baseURL in the specified config (for this env) use it.
        config.baseUrl = settings.env.baseUrl;
      }

      if (settings.env) {
        //jam the settings found in the file for this env into the cypress env settings.
        config.env = {
          ...config.env,
          ...settings.env
        };
      }
      //from here down is new work from tim who added the notion of datasets.
      //if no dataSet is specified, use the default of whatever the enviornment is.
      if (!config.env.dataSet) {
        console.log(
          'no dataSet specified, guessing "%s" since that matches your environmentName setting.',
          environmentName
        );
        config.env.dataSet = environmentName;
      }

      //some information for the console never hurts.
      console.log('=========================================================================================');
      console.log('Loaded settings for environment %s', environmentName);
      console.log('Using dataSet %s', config.env.dataSet);
      console.log('=========================================================================================');

      // IMPORTANT: return the merged config object
      // for Cypress to use it
      return config;
    }
  }
});
