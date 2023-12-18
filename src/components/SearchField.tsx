import { useEffect, useState } from "react"

interface SearchFieldProps{
    handleFilterContacts: ({ search }: string) => void
}

export default function SearchField({ handleFilterContacts }: SearchFieldProps){
    const [searchText, setSearchText] = useState<string>('')

    useEffect(() => {
        handleFilterContacts(searchText)
    }, [searchText])

    return (
        <input type="text" className="input-field" placeholder="Search for contact by last name..." onChange={(event) => setSearchText(event.target.value)} />
    )
}