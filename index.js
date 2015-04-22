var createDomain = require('domain').create
var count = 1;
var domainMiddleware = module.exports = function(req, res, next) {
  var domain = createDomain();
  domain.id = new Date().getTime() + (count++);
  domain.add(req);
  domain.add(res);
  domain.run(function() {
    next();
  });
  domain.on('error', function(e) {
    next(e);
  });
};

