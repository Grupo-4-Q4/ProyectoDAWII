import axios from "axios";

const api= axios.create({
    baseURL:'http://localhost:5000'
})

export default api;


/*import axios from 'axios'

export const getUsuario = async ()=>{

    const response = await axios.get('http://localhost:5000/usuario');
    return response.data

}*/