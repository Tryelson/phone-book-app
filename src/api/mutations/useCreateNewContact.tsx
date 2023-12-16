import { useState } from "react";

const useCreateNewContact = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState<Error | null>(null);
  
    async function createNewContact(payload: any){
        setIsLoading(true)
        try {
            const response = await fetch('https://phone-book-app-api.onrender.com/contacts', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(payload)
            });

            const data = await response.json();
            return data        
        } catch (error) {
            if(error instanceof Error){
                setIsError(error);
                return error
            }
        } finally {
            setIsLoading(false);
        }
    };
  
    return { createNewContact, isLoading, isError };
  };
  
  export default useCreateNewContact;