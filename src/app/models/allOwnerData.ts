export interface AllOwnerData {
    documentType: string,
    document: string,
    firstName: string,
    lastName: string,
    over60: string,
    headOfHousehold: string,
    unemployed: string,
    properties: Property[];
}

export interface Property {
    idProperty: number;
    city: string;
    address: string;
    stratum: number;
    requestDate: string;
    deadlineDate: string;
    netPayment: number;
    status: string;
}