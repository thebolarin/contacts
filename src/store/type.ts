export interface ContactI {
    _id: string,
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    createdAt: Date,
}

export interface ContactEditHistoryI {
    data: {
        firstName: string,
        lastName: string,
        email: string,
        phoneNumber: string,
    },
    _id: string,
    createdAt: Date
}