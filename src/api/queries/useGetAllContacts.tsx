import { useEffect, useState } from "react";
import { Contact } from "../../interfaces/contacts/contacts";

const useGetAllContacts = () => {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
  
    async function fetchData(){
      try {
        const response = await fetch('http://localhost:3001/contacts');
        const data = await response.json();

        if(data?.success){
          setContacts(data.contacts);
          return data
        }

      } catch (error) {
        if(error instanceof Error){
            setError(error);
        }
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      fetchData();
    }, []);
  
    return { contacts, loading, error, fetchData };
  };
  
  export default useGetAllContacts;