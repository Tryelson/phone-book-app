export interface Contact{
    id: string,
    firstName: string,
    lastName?: string,
    fullName: string,
    phoneNumber: string
}[] || undefined

export interface FetchDataResponse {
    success: boolean,
    contacts: Contact[];
  }