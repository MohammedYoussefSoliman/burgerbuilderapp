import {useState, useEffect} from 'react';


export default (httpClient) => {

    const [error, setError] = useState(null);

        const confirmedErrorHandler = () => {
            setError(null)
        }

        const reqInt = httpClient.interceptors.request.use( req => {
            setError(null)
            return req
        });
        const resInt = httpClient.interceptors.response.use(res => res, error => {
            setError(error)
        });

        useEffect(()=>{
            return ()=> {
                console.log('unmounted', reqInt, resInt)
                httpClient.interceptors.request.eject(reqInt);
                httpClient.interceptors.response.eject(resInt);
            }
        },[])


    return [error, confirmedErrorHandler]
}