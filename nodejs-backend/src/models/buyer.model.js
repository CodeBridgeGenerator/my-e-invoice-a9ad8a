
    module.exports = function (app) {
        const modelName = 'buyer';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            buyersName: { type:  String , required: true, minLength: 2, maxLength: 1000, index: true, trim: true },
buyersTin: { type:  String , minLength: 2, maxLength: 1000, index: true, trim: true },
buyersSstRegistrationNumber: { type:  String , minLength: 2, maxLength: 1000, index: true, trim: true },
identifierType: { type: Schema.Types.ObjectId, ref: "identify_type" },
businessRegistrationNumberIdentificationNumberPassportNumber: { type:  String , minLength: 2, maxLength: 1000, index: true, trim: true },
buyersEMail: { type:  String , minLength: 2, maxLength: 1000, index: true, trim: true },
buyersAddressCountryName: { type: Schema.Types.ObjectId, ref: "country_code" },
buyersAddressStateName: { type: Schema.Types.ObjectId, ref: "state_code" },
buyersAddressCityName: { type:  String , minLength: 2, maxLength: 1000, index: true, trim: true },
buyersAddressPostalZone: { type: Number, required: false, min: 0, max: 10000000 },
theFirstBuyersContactNumber: { type: Schema.Types.ObjectId, ref: "phone_number_prefix" },
buyersContactNumber: { type: Number, required: false, min: 0, max: 3656768789 },
invoiceCurrency: { type: Schema.Types.ObjectId, ref: "currency_code" },
currencyExchangeRate: { type: Number, required: false, min: 0, max: 10000000 },
frequencyOfBilling: { type: Schema.Types.ObjectId, ref: "frequency_of_billing" },
billingPeriodStartDate: { type: Date, required: false },
billingPeriodEndDate: { type: Date, required: false },
paymentMode: { type: Schema.Types.ObjectId, ref: "payment_mode" },

            
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