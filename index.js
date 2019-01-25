const request = require('request');

module.exports = app => {

  app.on('pull_request.opened', async context => {
     // Pull off the neccessary data from the payload in order to get the files in the PR 
     const owner = context.payload.repository.owner.login;
     const repo = context.payload.repository.name;
     const number = context.payload.number;

     // List the files in this pull request so we can start to read them
     // Check the diffs for this pull request and read the changed lines
     const diffUrl = `https://github.com/${owner}/${repo}/pull/${context.payload.pull_request.number}.diff`;
     request(diffUrl, { json: false }, (err, res, body) => {
      if (err) {
        app.log(err);
        return;
      }
      app.log(body);
     });

  });

}

//Here's the script for testing the pull_request Webhook:
// node_modules/.bin/probot receive -e pull_request.opened -p test/fixtures/advanced.pull.request.json ./index.js

