var loopback = require('loopback');
var boot = require('loopback-boot');


var app = module.exports = loopback();

app.start = function() {
  // start the web server
  return app.listen(process.env.PORT || 5000);
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});
