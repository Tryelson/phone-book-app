import { useEffect, useState } from "react";
import Modal from "./Modal";
import { IoMdClose } from "react-icons/io";
import { FaPlus } from "react-icons/fa";
import Label from "./Label";
import Input from "./Input";
import useCreateNewContact from "../api/mutations/useCreateNewContact";
import MaskedInput from 'react-text-mask';
import { toast } from "react-toastify";

interface AddNewContactProps{
    refetchContacts: () => void,
    openModal: boolean
}

export interface FormFields{
    firstName: string,
    lastName?: string,
    phoneNumber: string
}

export default function AddNewContact({ refetchContacts, openModal }: AddNewContactProps){
    const [showModal, setShowModal] = useState<boolean>(false)
    const [formFields, setFormFields] = useState<FormFields>({
        firstName: '',
        phoneNumber: ''
    })

    const { createNewContact, isLoading, isError } = useCreateNewContact()

    function onShowModal(){
        setShowModal(prevState => !prevState)
    }

    function handleFormFields(event: React.ChangeEvent<HTMLInputElement>){
        const { name, value } = event.target
        setFormFields({...formFields, [name]: value})
    }

    async function handleSendForm(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault()
        const payload = {...formFields, phoneNumber: formFields.phoneNumber.replace(/[_]/g, '')}

        const response = await createNewContact(payload)

        if(response?.success){
            toast.success('New contact successfully created!')
            refetchContacts()
        } else {
            toast.error(response.message)
        }

        onShowModal()
        setFormFields({firstName: '', phoneNumber: ''})
    }

    useEffect(() => {
        if(openModal){
            setShowModal(openModal)
        }
    }, [openModal])

    return (
        <>
            <button type="button" className="btn btn-primary" onClick={onShowModal}><FaPlus />Add Contact</button>

            <Modal show={showModal} handleShowModal={onShowModal}>
                <div className="box-modal-title">
                    <h2 className="modal-title">Add New Contact</h2>
                    <button type="button" className="btn-close" onClick={onShowModal}><IoMdClose fontSize={'0.9375rem'} /></button>
                </div>

                <form className="modal-body" onSubmit={handleSendForm}>
                    <div className="field-wrapper">
                        <Label name="First Name:" htmlFor="firstName" isRequired />
                        <Input type="text" id="firstName" name="firstName" placeholder="Jon" callBack={handleFormFields} isRequired />
                    </div>

                    <div className="field-wrapper">
                        <Label name="Last Name:" htmlFor="lastName" />
                        <Input type="text" id="lastName" name="lastName" placeholder="Doe" callBack={handleFormFields} />
                    </div>

                    <div className="field-wrapper">
                        <Label name="Phone Number" htmlFor="phoneNumber" isRequired />
                        <MaskedInput
                            mask={['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                            className="input-field"
                            placeholder="(99) 99999-9999"
                            name="phoneNumber"
                            id="phoneNumber"
                            value={formFields.phoneNumber}
                            onChange={handleFormFields}
                            required
                        />
                    </div>

                    <div className="btns-wrapper">
                        {!isLoading ? (
                            <button type="submit" className="btn btn-primary">Save Contact</button>
                        ) : (
                            <button type="submit" className="btn btn-primary" disabled>Saving...</button>
                        )}

                        <button type="button" className="btn btn-secondary" onClick={onShowModal}>Cancel</button>
                    </div>
                </form>
            </Modal>
        </>
    )
}