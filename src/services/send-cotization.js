import axios from 'axios';

export const sendCotization = async (data) => {
    try {
        const response = await axios.post(import.meta.env.VITE_API_URL+'create-cotization', data,
            { headers: { 'Content-Type': 'multipart/form-data' } }
        );
        return response.data;
    } catch (error) {
        console.error('Error sending cotization:', error);
        return null;
    }    
}