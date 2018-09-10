import axios from 'axios';

export const getMovies = async (url) => {
    try{
        const response = await axios.get(url);
        return response.data;
    }
    catch(err) {
        return err;
    }
}