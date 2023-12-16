import { FormEvent, useEffect, useState } from "react";
import { TfiPencilAlt } from "react-icons/tfi";
import { Contact } from "../interfaces/contacts/contacts";
import RemoveContact from "./RemoveContact";
import { MdLocalPhone } from "react-icons/md";
import { MdDone } from "react-icons/md";
import Input from "./Input";
import { FormFields } from "./AddNewContact";
import MaskedInput from "react-text-mask";
import useEditContact from "../api/mutations/useEditContact";

interface EditContactProps{
    contact: Contact,
    handleFetchData: () => void
}

export default function ContactItem({ contact, handleFetchData }: EditContactProps){

    const [isEditing, setIsEditing] = useState<boolean>(false)
    const [formFields, setFormFields] = useState<FormFields>({
        firstName: contact?.firstName || '',
        lastName: contact?.lastName || '',
        phoneNumber: contact?.phoneNumber || ''
    })

    const { editContact } = useEditContact()

    function handleFormFields(event: React.ChangeEvent<HTMLInputElement>){
        const { name, value } = event.target
        setFormFields({...formFields, [name]: value})
    }

    async function handleSaveEdit(event: FormEvent){
        event.preventDefault()
        setIsEditing(prevState => !prevState)

        const payload = {
            id: contact?.id,
            data: {
                firstName: formFields.firstName,
                lastName: formFields?.lastName,
                phoneNumber: formFields.phoneNumber.replace(/[_]/g, '')
            }
        }

        await editContact(payload)
        handleFetchData()
    }

    function resumeText(value: string){
        if(value.length > 15){
            value = value.substring(0, 15) + '...'
        }

        return value
    }

    useEffect(() => {
        setFormFields(contact)
    }, [contact])

    return (
        <>
            {!isEditing ? (
                <li className="contacts-list-item">
                    <div className="user-infos">
                        <span className="user-name">
                            {`${resumeText(contact?.firstName)} ${resumeText(contact?.lastName || '')}`}
                            <button type="button" className="btn-edit" onClick={() => setIsEditing(true)}>
                                <TfiPencilAlt />
                            </button>
                        </span>
                        <small className="user-phone"><MdLocalPhone />
                            { contact.phoneNumber }
                        </small>
                    </div>

                    <RemoveContact id={contact.id} refetchContacts={handleFetchData} />
                </li>
            ) : (
                <li className={`contacts-list-item ${isEditing ? 'editing' : ''}`}>
                    <form className="form-edit" onSubmit={handleSaveEdit}>
                        <div className="user-infos">
                            <div className="wrapper">
                                <Input type="text" id="firstName" value={formFields?.firstName} placeholder={formFields?.firstName} name="firstName" callBack={(event) => handleFormFields(event)} isRequired />
                                <Input type="text" id="lastName" value={formFields?.lastName} placeholder={formFields?.lastName || 'Last name...'} name="lastName" callBack={(event) => handleFormFields(event)} />
                            </div>

                            <small className="user-phone"><MdLocalPhone />
                                <MaskedInput mask={['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]} className="input-field" placeholder={formFields?.phoneNumber} name="phoneNumber" id="phoneNumber" value={formFields.phoneNumber} onChange={handleFormFields} required />
                            </small>
                        </div>

                        <button type="submit" className="btn btn-done" disabled={!formFields?.firstName || !formFields?.phoneNumber}><MdDone fontSize={'22px'} /></button>
                    </form>
                </li>
            )}
        </>
    )
}