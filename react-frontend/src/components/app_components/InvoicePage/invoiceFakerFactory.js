
import { faker } from "@faker-js/faker";
export default (user,count,invoiceTypeIds,taxTypeIds,taxType1Ids) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
invoiceType: invoiceTypeIds[i % invoiceTypeIds.length],
invoiceDateAndTime: faker.lorem.sentence(""),
originalEInvoiceReferenceNumber: faker.lorem.sentence(""),
no: faker.lorem.sentence(""),
classification: faker.lorem.sentence(""),
subtotal: faker.lorem.sentence(""),
countryOfOrigin: faker.lorem.sentence(""),
totalExcludingTax: faker.lorem.sentence(""),
taxType: taxTypeIds[i % taxTypeIds.length],
taxRate: faker.lorem.sentence(""),
taxAmount: faker.lorem.sentence(""),
detailsOfExemption: faker.lorem.sentence(""),
amountExempted: faker.lorem.sentence(""),
discountRate: faker.lorem.sentence(""),
discountAmount: faker.lorem.sentence(""),
description1: faker.lorem.sentence(""),
feeChargeRate: faker.lorem.sentence(""),
feeChargeAmount: faker.lorem.sentence(""),
taxType1: taxType1Ids[i % taxType1Ids.length],
totalTaxableAmountPerTaxType: faker.lorem.sentence(""),
totalTaxAmountPerTaxType: faker.lorem.sentence(""),
detailsOfTaxExemption: faker.lorem.sentence(""),
amountExemptedFromTax: faker.lorem.sentence(""),
discountAmount1: faker.lorem.sentence(""),
description3: faker.lorem.sentence(""),
feeAmount: faker.lorem.sentence(""),
description4: faker.lorem.sentence(""),
invoiceNumber: faker.lorem.sentence(""),
consolidated: faker.datatype.boolean(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
