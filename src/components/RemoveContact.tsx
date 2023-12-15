import { FaRegTrashAlt } from "react-icons/fa";
import Modal from "./Modal";
import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import useDeleteContact from "../api/mutations/useDeleteContact";
import { toast } from "react-toastify";

interface RemoveContactProps{
    id: string,
    refetchContacts: () => void
}

export default function RemoveContact({ id, refetchContacts }: RemoveContactProps){

    const [showModal, setShowModal] = useState(false)
    const { deleteContact, isLoading, isError } = useDeleteContact()

    function onShowModal(){
        setShowModal(prevState => !prevState)
    }

    async function onRemoveContact(){
        const response = await deleteContact(id)

        if(response?.success){
            toast.success(response?.message)
            refetchContacts()
        } else {
            toast.success(response?.message)
        }

        onShowModal()
    }
    
    return (
        <>
            <button type="button" className="btn btn-danger" onClick={onShowModal}><FaRegTrashAlt fontSize={'14px'} /></button>

            <Modal show={showModal} handleShowModal={onShowModal}>
                <div className="box-modal-title">
                    <h2 className="modal-title">Remove Contact</h2>
                    <button type="button" className="btn-close" onClick={onShowModal}><IoMdClose fontSize={'0.9375rem'} /></button>
                </div>

                <div className="modal-body">
                    <p className="warning-message">Are you sure you want to delete this contact?</p>

                    <div className="btns-wrapper">
                        {!isLoading ? (
                            <button type="button" className="btn btn-danger" onClick={onRemoveContact}>Delete Contact</button>
                        ) : (
                            <button type="button" className="btn btn-danger" disabled>Delete Contact</button>
                        )}

                        <button type="button" className="btn btn-secondary" onClick={onShowModal}>Cancel</button>
                    </div>
                </div>
            </Modal>
        </>
    )
}