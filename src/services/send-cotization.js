import axios from 'axios';

export const sendCotization = async (data) => {
    try {
        const response = await axios.post('http://127.0.0.1:8000/api/create-cozitation', data);
        return response.data;
    } catch (error) {
        console.error('Error sending cotization:', error);
        return null;
    }    
}