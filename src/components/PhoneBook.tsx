import '../styles/components/PhoneBook.css'
import Header from "./Header";
import { IoSearchSharp } from "react-icons/io5";

import AddNewContact from "./AddNewContact";
import useGetAllContacts from "../api/queries/useGetAllContacts";
import { useEffect, useMemo, useState } from "react";
import { Contact } from "../interfaces/contacts/contacts";
import ContactItem from "./ContactItem";
import LoadingContactItem from './LoadingContactItem';
import SearchField from './SearchField';


export default function PhoneBook(){

    const [openModal, setOpenModal] = useState<boolean>(false)
    const [isFiltering, setIsFiltering] = useState<boolean>(false)
    
    const { fetchData, isLoading, isError } = useGetAllContacts()
    const [contactsList, setContactsList] = useState<Contact[] | []>([])
    const [filteredList, setFilteredList] = useState<Contact[] | []>([])

    async function handleFetchData(){
        const response = await fetchData()

        if(response?.success){
            let formattedContacts = response.contacts.map(contact => {
                if(contact.lastName){
                    return {...contact, fullName: `${contact.firstName} ${contact.lastName}`}
                } else {
                    return {...contact, fullName: contact.firstName}
                }
            })

            setContactsList(formattedContacts)
            setFilteredList(formattedContacts)
        }
    }

    function handleFilterContacts(search: string){
        setIsFiltering(true)

        if(search){
            const localContacts = contactsList.filter(contact => contact.fullName.toUpperCase().includes(search.toUpperCase()) || contact.phoneNumber?.toUpperCase().includes(search.toUpperCase()))

            setContactsList(localContacts)
        } else {
            setContactsList(filteredList)
            setIsFiltering(false)
        }
    }

    useMemo(() => {
        handleFetchData();
    }, [])

    useEffect(() => {
        setOpenModal(false);
    }, [openModal]);

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
                        <SearchField handleFilterContacts={handleFilterContacts} />
                    </div>

                    {!isError ? (
                        <>
                            {contactsList.length > 0 && (
                                <ul className="contacts-list">
                                    {contactsList.map((contact, index) => {
                                        return (
                                            <ContactItem key={contact.id} contact={contact} handleFetchData={handleFetchData} />
                                        )
                                    })}
                                </ul>
                            )}
        
                            {!contactsList.length && isLoading && (
                                <ul className="contacts-list">
                                    <LoadingContactItem />
                                    <LoadingContactItem />
                                    <LoadingContactItem />
                                    <LoadingContactItem />
                                    <LoadingContactItem />
                                    <LoadingContactItem />
                                    <LoadingContactItem />
                                </ul>
                            )}
        
                            {!contactsList.length && isFiltering && (
                                <div className="empty-list-warning">
                                    <p className="message-warning">Any results found!</p>
                                </div>
                            )}
                        </>
                    ) : (
                        <>
                            {!contactsList.length && !isFiltering && !isLoading && (
                                <div className="empty-list-warning">
                                    <p className="message-warning">Your contacts list is empty, <button className="btn" type="button" onClick={() => setOpenModal(true)}>click here</button> to add a new one!</p>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}