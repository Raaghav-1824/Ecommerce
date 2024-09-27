import React from 'react';
import { useState , useEffect } from 'react';

const useFetchProducts = (url) => {
    const [products , setProducts] = useState([]);
    const [isLoading , setIsLoading] = useState(true);
    const [error, setError] = useState(null);

  
    useEffect(()=>{
        const fetchData = async () => {
            try {
                const res = await fetch(url);
                const data =  await res.json();
                setProducts(data);
                setIsLoading(false);

            } catch (error) {
               setError(error); 
               setIsLoading(false);
            }
        }
        fetchData();

    } ,[url])
    
    return {products, isLoading, error };
}

// data fetch using promise

//     useEffect(()=>{
//         const fetchData = () =>{
//             fetch(url).then((response) =>{
//                 if(!response.ok){
//                     throw new Error(`HTTP error! status: ${response.status}`);
//                 }
//                 return response.json()
//             }).then((data)=>{
//                 setProducts(data);
//                 setIsLoading(false);
//             }).catch((error)=>{
//                 setError(error); 
//                 setIsLoading(false);
//             })
//         }

//         fetchData();

//     } ,[url])
    
//     return {products, isLoading, error };
// }


export default useFetchProducts