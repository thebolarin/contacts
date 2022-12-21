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

export interface Props {
    id: any,
    selectedContact: any
    onSubmit: any,
    contact: any
    isOpen: boolean,
    onClose: any,
    title: any
    children: any, 
    footerChildren: any
  }