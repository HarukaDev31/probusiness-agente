import axios from 'axios';

export const sendCotization = async (data) => {
    try {

        const response = await axios.post(import.meta.env.VITE_API_URL+'create-cotization', data,
            { headers: { 'Content-Type': 'multipart/form-data',
                'API-Key': import.meta.env.VITE_API_KEY
             } }
        );
        return response.data;
    } catch (error) {
        throw new Error('Error Tamaño de archivos excedido, por favor intente con un archivo más pequeño:', error);
        return null;
    }    
}
export const getClientDataByDNIID = async (data) => {
    try {
        const response = await axios.post(import.meta.env.VITE_API_URL+'get-client-data', data,{
            headers: { 'Content-Type': 'application/json','API-Key': import.meta.env.VITE_API_KEY}
        });
        return response.data;
    } catch (error) {
        throw new Error('Cliente no encontrado:', error);
        return null;
    }    
}
export const setTradingOrder = async (data) => {
    try {
        const response = await axios.post(import.meta.env.VITE_API_URL+'set-trading-order', data,{
            headers: { 'Content-Type': 'multipart/form-data','API-Key': import.meta.env.VITE_API_KEY}
        });
        return response.data;
    }
    catch (error) {
        throw new Error('Error al crear la orden de trading:', error);
        return null;
    }
}
export const getPaises = async () => {
    try {
        const response = await axios.get(import.meta.env.VITE_API_URL+'get-paises',{
            headers: { 'Content-Type': 'application/json','API-Key': import
            .meta.env.VITE_API_KEY}
        });
        return response.data;
    }
    catch (error) {
        throw new Error('Error al obtener los paises:', error);
        return null;
    }
}