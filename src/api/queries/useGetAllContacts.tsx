import { useState } from "react";
import { FetchDataResponse } from "../../interfaces/contacts/contacts";

const useGetAllContacts = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState<Error | null>(null);
  
    async function fetchData(): Promise<FetchDataResponse>{
      try {
        const response = await fetch('https://phone-book-app-api.onrender.com/contacts');
        const data = await response.json();

        if(data?.success){
          return data
        }

      } catch (error) {
        if(error instanceof Error){
          setIsError(error);
          return { success: false, contacts: [] }
        }
      } finally {
        setIsLoading(false);
      }

      return { success: false, contacts: [] }
    };
  
    return { isLoading, isError, fetchData };
  };
  
  export default useGetAllContacts;