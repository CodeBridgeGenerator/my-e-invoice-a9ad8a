const { PaymentMode } = require('./paymentMode.class');
const createModel = require('../../models/paymentMode.model');
const hooks = require('./paymentMode.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ["$populate"],
    multi: ["create"],
  };

  // Initialize our service with any options it requires
  app.use('/paymentMode', new PaymentMode(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('paymentMode');

  // Get the schema of the collections 
  app.get("/paymentModeSchema", function (request, response) {
    const schema = createModel(app).schema.tree;
    const result = Object.keys(schema).map(key => {
      return {
        field: key,
        properties: schema[key]
      };
    });
    return response.status(200).json(result);
  });

  service.hooks(hooks);
};