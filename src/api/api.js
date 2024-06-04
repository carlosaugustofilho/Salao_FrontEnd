const API_URL = 'https://localhost:7213/api';

const api = {
    post: async (endpoint, data) => {
        console.log(`POST ${API_URL}${endpoint}`, data);
        try {
            const response = await fetch(`${API_URL}${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(data),
            });
            const responseText = await response.text();
            console.log('Resposta do servidor:', responseText);
            if (!response.ok) {
                console.error(`Erro HTTP! Status: ${response.status}`, responseText);
                throw new Error(`HTTP error! Status: ${response.status} - ${responseText}`);
            }
            if (responseText) {
                return JSON.parse(responseText);  
            } else {
                throw new Error('Resposta do servidor está vazia');
            }
        } catch (error) {
            console.error(`Erro ao fazer POST para ${API_URL}${endpoint}:`, error);
            throw error;
        }
    },

    get: async (endpoint) => {
        console.log(`GET ${API_URL}${endpoint}`);
        try {
            const response = await fetch(`${API_URL}${endpoint}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            const responseText = await response.text();
            console.log('Resposta do servidor:', responseText);
            if (!response.ok) {
                console.error(`Erro HTTP! Status: ${response.status}`, responseText);
                throw new Error(`HTTP error! Status: ${response.status} - ${responseText}`);
            }
            if (responseText) {
                return JSON.parse(responseText);  
            } else {
                throw new Error('Resposta do servidor está vazia');
            }
        } catch (error) {
            console.error(`Erro ao fazer GET para ${API_URL}${endpoint}:`, error);
            throw error;
        }
    },

    logout: async () => {
        console.log(`POST ${API_URL}/Usuario/Logout`);
        try {
            const response = await fetch(`${API_URL}/Usuario/Logout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}` // Adiciona o token de autenticação
                }
            });
            if (!response.ok) {
                const responseText = await response.text();
                console.error(`Erro HTTP! Status: ${response.status}`, responseText);
                throw new Error(`HTTP error! Status: ${response.status} - ${responseText}`);
            }
        } catch (error) {
            console.error(`Erro ao fazer POST para ${API_URL}/Usuario/Logout:`, error);
            throw error;
        }
    }
};

export default api;
