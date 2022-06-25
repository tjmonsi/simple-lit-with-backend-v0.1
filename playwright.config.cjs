// @ts-check
/** @type {PlaywrightTestConfig} */
const config = {
  webServer: {
    command: 'npm run start:test',
    port: 8080,
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI
  }
};
module.exports = config;
