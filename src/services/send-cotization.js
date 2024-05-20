import axios from 'axios';

export const sendCotization = async (data) => {
    try {
        const response = await axios.post('http://127.0.0.1:8000/api/create-cotization', data,
            { headers: { 'Content-Type': 'multipart/form-data' } }
        );
        return response.data;
    } catch (error) {
        console.error('Error sending cotization:', error);
        return null;
    }    
}