export interface ContractData {
   contractor: Contractor;
   client: Client;
   contractDetails: ContractDetails;
}

export interface Contractor {
   contractorGender: string;
   contractorFirstName: string;
   contractorLastName: string;
   contractorStreet: string;
   contractorStreetNumber: string;
   contractorCity: string;
   contractorPostalCode: string;
}

export interface Client {
   clientGender: string;
   clientFirstName: string;
   clientLastName: string;
   clientStreet: string;
   clientStreetNumber: string;
   clientCity: string;
   clientPostalCode: string;
}

export interface ContractDetails {
   serviceStartDate: string;
   endDate: string;
   activity: string;
   totalAmount: string;
   venue: string;
   jurisdiction: string;
   contractSignatureDate: string;
   terminationPeriod: string;
   terminationPeriodUnit: string;
   penaltyAmount: string;
   liabilityLimit: string;
}