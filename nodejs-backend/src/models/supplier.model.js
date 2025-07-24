
    module.exports = function (app) {
        const modelName = 'supplier';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            suppliersName: { type:  String , minLength: 2, maxLength: 1000, index: true, trim: true },
suppliersTin: { type:  String , minLength: 2, maxLength: 1000, index: true, trim: true },
suppliersSstRegistrationNumber: { type:  String , minLength: 2, maxLength: 1000, index: true, trim: true },
identifierType: { type:  String , minLength: 2, maxLength: 1000, index: true, trim: true },
identifierNumber: { type:  String , minLength: 2, maxLength: 1000, index: true, trim: true },
suppliersMsicCode: { type:  String , minLength: 2, maxLength: 1000, index: true, trim: true },
suppliersTourismTaxRegistrationNumber: { type:  String , minLength: 2, maxLength: 1000, index: true, trim: true },
suppliersBusinessActivityDescription: { type:  String , minLength: 2, maxLength: 1000, index: true, trim: true },
suppliersEMail: { type:  String , minLength: 2, maxLength: 1000, index: true, trim: true },
theFirstSuppliersContactNumber: { type:  String , minLength: 2, maxLength: 1000, index: true, trim: true },
suppliersContactNumber: { type:  String , minLength: 2, maxLength: 1000, index: true, trim: true },
countryName: { type:  String , minLength: 2, maxLength: 1000, index: true, trim: true },
stateName: { type:  String , minLength: 2, maxLength: 1000, index: true, trim: true },
cityName: { type:  String , minLength: 2, maxLength: 1000, index: true, trim: true },
postalZone: { type: Number, required: false, min: 0, max: 10000000 },
suppliersBankAccountNumber: { type: Number, required: false, min: 0, max: 39382983989222 },
paymentTerms: { type:  String , minLength: 2, maxLength: 1000, index: true, trim: true },
prePaymentAmount: { type: Number, required: false, min: 0, max: 10000000 },
prePaymentDate: { type: Date, required: false },
prePaymentReferenceNumber: { type:  String , minLength: 2, maxLength: 1000, index: true, trim: true },

            
            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true }
          },
          {
            timestamps: true
        });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };