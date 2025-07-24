const { TaxType } = require('./taxType.class');
const createModel = require('../../models/taxType.model');
const hooks = require('./taxType.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ["$populate"],
    multi: ["create"],
  };

  // Initialize our service with any options it requires
  app.use('/taxType', new TaxType(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('taxType');

  // Get the schema of the collections 
  app.get("/taxTypeSchema", function (request, response) {
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