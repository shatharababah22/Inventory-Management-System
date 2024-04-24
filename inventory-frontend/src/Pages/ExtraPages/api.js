import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

const useAuthenticatedFetch = (url, options = {}) => {
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true); 

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('authToken');
            if (!token) {
                navigate("/adminlogin");
                return; 
            }

            try {
                const response = await axios.get(url, {
                    ...options,
                    headers: {
                        Authorization: `Bearer ${token}`,
                        ...options.headers
                    }
                });
                setData(response.data);
                setError(null);
            } catch (error) {
                setError(error);
                if (error.response && error.response.status === 419) {
           
                    navigate("/adminlogin");
                }
            } finally {
                setIsLoading(false); 
            }
        };

        fetchData(); 

    }, []); 

    return { data, error, isLoading }; 
};

export default useAuthenticatedFetch;
