
import { faker } from "@faker-js/faker";
export default (user,count,shippingRecipientsAddressCountryNameIds,shippingRecipientsAddressStateNameIds,shippingRecipientsIdentifierTypeIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
shippingRecipientsName: faker.lorem.sentence(1),
shippingRecipientsAddressCountryName: shippingRecipientsAddressCountryNameIds[i % shippingRecipientsAddressCountryNameIds.length],
shippingRecipientsAddressStateName: shippingRecipientsAddressStateNameIds[i % shippingRecipientsAddressStateNameIds.length],
shippingRecipientsAddressCityName: faker.lorem.sentence(1),
shippingRecipientsAddressPostalZone: faker.lorem.sentence(1),
shippingRecipientsTin: faker.lorem.sentence(1),
shippingRecipientsIdentifierType: shippingRecipientsIdentifierTypeIds[i % shippingRecipientsIdentifierTypeIds.length],
businessRegistrationNumberIdentificationNumberPassportNumber: faker.lorem.sentence(1),
billReferenceNumber: faker.lorem.sentence(1),
referenceNumberOfCustomsFormNo19Etc: faker.lorem.sentence(1),
incoterms: faker.lorem.sentence(1),
freeTradeAgreementFtaInformation: faker.lorem.sentence(1),
authorisationNumberForCertifiedExporter: faker.lorem.sentence(1),
referenceNumberOfCustomsFormNo2: faker.lorem.sentence(1),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
