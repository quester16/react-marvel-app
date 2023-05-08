import {useCallback, useState} from "react";

export const useHttps = () => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const request = useCallback(async (url, method = 'GET', headers = {'Content-type': 'application/json'}, body = null ) => {

        setLoading(true)

        try {
            const response = await fetch(url, {method, body, headers});

            if(!response.ok) {
                throw new Error(`could not fetch this ${url}, which was ${method} request, and status ${request.status}`);
            }

            const data = await response.json();
            setLoading(false)

            return data

        } catch (e){
            setLoading(false)
            setError(e.message)
            throw e
        }

    }, [])

    const cleanError = useCallback(() => setError(null), [])

    return {loading, request, error, cleanError}
}