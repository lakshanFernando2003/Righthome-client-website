const helmet = require('helmet');
const { securityConfig } = require('../../src/config/security');

const securityMiddleware = (app) => {
  app.use(
    helmet.contentSecurityPolicy({
      directives: securityConfig.cspDirectives
    })
  );

  app.use(helmet.xssFilter());
  app.use(helmet.noSniff());
  app.use(helmet.frameguard({ action: 'deny' }));
};

module.exports = securityMiddleware;
