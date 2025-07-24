
import { faker } from "@faker-js/faker";
export default (user,count,identifierTypeIds,buyersAddressCountryNameIds,buyersAddressStateNameIds,theFirstBuyersContactNumberIds,invoiceCurrencyIds,frequencyOfBillingIds,paymentModeIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
buyersName: faker.lorem.sentence(1),
buyersTin: faker.lorem.sentence(1),
buyersSstRegistrationNumber: faker.lorem.sentence(1),
identifierType: identifierTypeIds[i % identifierTypeIds.length],
businessRegistrationNumberIdentificationNumberPassportNumber: faker.lorem.sentence(1),
buyersEMail: faker.lorem.sentence(1),
buyersAddressCountryName: buyersAddressCountryNameIds[i % buyersAddressCountryNameIds.length],
buyersAddressStateName: buyersAddressStateNameIds[i % buyersAddressStateNameIds.length],
buyersAddressCityName: faker.lorem.sentence(1),
buyersAddressPostalZone: faker.lorem.sentence(1),
theFirstBuyersContactNumber: theFirstBuyersContactNumberIds[i % theFirstBuyersContactNumberIds.length],
buyersContactNumber: faker.lorem.sentence(1),
invoiceCurrency: invoiceCurrencyIds[i % invoiceCurrencyIds.length],
currencyExchangeRate: faker.lorem.sentence(1),
frequencyOfBilling: frequencyOfBillingIds[i % frequencyOfBillingIds.length],
billingPeriodStartDate: faker.lorem.sentence(1),
billingPeriodEndDate: faker.lorem.sentence(1),
paymentMode: paymentModeIds[i % paymentModeIds.length],

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
