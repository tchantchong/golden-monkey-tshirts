import axios from 'axios';

const ProductService = axios.create({
    baseURL: "http://localhost:7777/api"
});

export default ProductService;