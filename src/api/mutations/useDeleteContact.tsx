import { useState } from "react";

const useDeleteContact = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState<Error | null>(null);
  
    async function deleteContact(id: string){
        setIsLoading(true)
        try {
            const response = await fetch(`http://localhost:3001/contacts/${id}`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'DELETE',
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
  
    return { deleteContact, isLoading, isError };
  };
  
  export default useDeleteContact;