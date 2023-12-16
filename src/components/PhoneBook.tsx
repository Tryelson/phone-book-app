import Header from "./Header";
import { IoSearchSharp } from "react-icons/io5";

import '../styles/components/PhoneBook.css'
import AddNewContact from "./AddNewContact";
import useGetAllContacts from "../api/queries/useGetAllContacts";
import { ChangeEvent, useEffect, useState } from "react";
import { Contact } from "../interfaces/contacts/contacts";
import ContactItem from "./ContactItem";

export default function PhoneBook(){

    const [openModal, setOpenModal] = useState<boolean>(false)
    const [isFiltering, setIsFiltering] = useState<boolean>(false)

    const [contactsList, setContactsList] = useState<Contact[]>([])
    const [filteredList, setFilteredList] = useState<Contact[]>([])
    const { fetchData } = useGetAllContacts()

    async function handleFetchData(){
        const response = await fetchData()

        if(response?.success){
            setContactsList(response.contacts)
            setFilteredList(response.contacts)
        }
    }

    function handleFilterContacts(event: ChangeEvent<HTMLInputElement>){
        setIsFiltering(true)
        if(event.target.value){
            const localContacts = contactsList.filter(contact => contact.firstName.toUpperCase().includes(event.target.value.toUpperCase()) || contact.lastName?.toUpperCase().includes(event.target.value.toUpperCase()))
    
            setContactsList(localContacts)
        } else {
            setContactsList(filteredList)
            setIsFiltering(false)
        }
    }

    useEffect(() => {
        handleFetchData()
    }, [])

    useEffect(() => {
        setOpenModal(false)
    }, [openModal])

    return (
        <div className="phone-book-content">
            <div className="container">
                <Header />

                <div className="content-wrapper">
                    <div className="box-subtitle">
                        <h2 className="subtitle">Contacts</h2>
                        <AddNewContact refetchContacts={handleFetchData} openModal={openModal} />
                    </div>

                    <div className="box-search">
                        <IoSearchSharp color="#7c7c7c" />
                        <input type="text" className="input-field" placeholder="Search for contact by last name..." onChange={(event) => handleFilterContacts(event)} />
                    </div>

                    {contactsList.length > 0 && (
                        <ul className="contacts-list">
                            {contactsList.map((contact, index) => {
                                return (
                                    <ContactItem key={contact.id} contact={contact} handleFetchData={handleFetchData} />
                                )
                            })}
                        </ul>
                    )}

                    {!contactsList.length && isFiltering && (
                        <div className="empty-list-warning">
                            <p className="message-warning">Any results found!</p>
                        </div>
                    )}

                    {!contactsList.length && !isFiltering && (
                        <div className="empty-list-warning">
                            <p className="message-warning">Your contacts list is empty, <button className="btn" type="button" onClick={() => setOpenModal(true)}>click here</button> to add a new one!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}