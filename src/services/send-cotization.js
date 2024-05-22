import axios from 'axios';

export const sendCotization = async (data) => {
    try {
        const apiUrl = new URL('create-cotization', import.meta.env.VITE_API_URL).href;
        console.log('Sending cotization to:', apiUrl);
        const response = await axios.post(apiUrl, data,
            { headers: { 'Content-Type': 'multipart/form-data' } }
        );
        return response.data;
    } catch (error) {
        console.error('Error sending cotization:', error);
        return null;
    }    
}