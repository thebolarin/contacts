export interface IContact {
    _id: string,
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    createdAt: Date,
}

export interface IContactEditHistory {
    data: {
        firstName: string,
        lastName: string,
        email: string,
        phoneNumber: string,
    },
    _id: string,
    createdAt: Date
}