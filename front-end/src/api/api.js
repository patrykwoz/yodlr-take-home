import axios from 'axios';

const BASE_URL = import.meta.env.REACT_APP_BASE_URL || 'http://localhost:3000';

class YodlrApi {
    static async login(data) {
        const response = await axios.post(`${BASE_URL}/users/login`, data);
        return response.data;
    }

    static async getUsers() {
        const response = await axios.get(`${BASE_URL}/users`);
        return response.data;
    }

    static async getUser(id) {
        const response = await axios.get(`${BASE_URL}/users/${id}`);
        return response.data;
    }

    static async createUser(data) {
        const response = await axios.post(`${BASE_URL}/users`, data);
        return response.data;
    }

    static async updateUser(id, data) {
        const response = await axios.put(`${BASE_URL}/users/${id}`, data);
        return response.data;
    }

    static async deleteUser(id) {
        const response = await axios.delete(`${BASE_URL}/users/${id}`);
        return response.data;
    }

    static async handleState(id, data) {
        const response = await axios.post(`${BASE_URL}/users/${id}/state`, data);
        return response.data;
    }
}

export default YodlrApi;
