import axios from 'axios';

export const sendCotization = async (data) => {
    try {

        const response = await axios.post(import.meta.env.VITE_API_URL+'create-cotization', data,
            { headers: { 'Content-Type': 'multipart/form-data',
                'api_key': import.meta.env.VITE_API_KEY
             } }
        );
        return response.data;
    } catch (error) {
        console.error('Error sending cotization:', error);
        return null;
    }    
}
export const getClientDataByDNIID = async (data) => {
    try {
        const response = await axios.post(import.meta.env.VITE_API_URL+'get-client-data', data);
        return response.data;
    } catch (error) {
        console.error('Error getting client data:', error);
        return null;
    }    
}