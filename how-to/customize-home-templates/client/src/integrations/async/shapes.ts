export interface Contact {
    id: string;
    firstName: string;
    lastName: string;
}

export interface ContactFull extends Contact {
    email: string;
}

export interface ContactsResult {
    data: Contact[]
}

export interface AsyncSettings {
    rootUrl: string
}

