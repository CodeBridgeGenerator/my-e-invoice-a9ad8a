
import { faker } from "@faker-js/faker";
export default (user,count) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
suppliersName: faker.lorem.sentence(1),
suppliersTin: faker.lorem.sentence(1),
suppliersSstRegistrationNumber: faker.lorem.sentence(1),
identifierType: faker.lorem.sentence(1),
identifierNumber: faker.lorem.sentence(1),
suppliersMsicCode: faker.lorem.sentence(1),
suppliersTourismTaxRegistrationNumber: faker.lorem.sentence(1),
suppliersBusinessActivityDescription: faker.lorem.sentence(1),
suppliersEMail: faker.lorem.sentence(1),
theFirstSuppliersContactNumber: faker.lorem.sentence(1),
suppliersContactNumber: faker.lorem.sentence(1),
countryName: faker.lorem.sentence(1),
stateName: faker.lorem.sentence(1),
cityName: faker.lorem.sentence(1),
postalZone: faker.lorem.sentence(1),
suppliersBankAccountNumber: faker.lorem.sentence(1),
paymentTerms: faker.lorem.sentence(1),
prePaymentAmount: faker.lorem.sentence(1),
prePaymentDate: faker.lorem.sentence(1),
prePaymentReferenceNumber: faker.lorem.sentence(1),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
