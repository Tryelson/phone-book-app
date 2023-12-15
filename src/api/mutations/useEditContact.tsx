import { useState } from "react";

const useEditContact = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState<Error | null>(null);
  
    async function editContact(payload: any){
        setIsLoading(true)
        try {
            const response = await fetch(`http://localhost:3001/contacts/${payload.id}`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'PATCH',
                body: JSON.stringify(payload.data)
            });

            const data = await response.json();
            return data        
        } catch (error) {
            if(error instanceof Error){
                setIsError(error);
            }
        } finally {
            setIsLoading(false);
        }
    };
  
    return { editContact, isLoading, isError };
  };
  
  export default useEditContact;