import axios from 'axios';

export const imagesApi = async (text, page, perPage) => {
    const key = '34332505-45396fda10b41948f3d74cbb9';
    const response = await axios.get(`https://pixabay.com/api/?q=${text}&page=${page}&key=${key}&image_type=photo&orientation=horizontal&per_page=${perPage}`);
    return response.data;
}