import api from './api';

const scheduleService = {
    adicionarHorario: async (horario) => {
        const endpoint = '/barbeiro/AdicionarHorario';
        return api.post(endpoint, horario);
    },
    listarHorarios: async (barbeiroId) => {
        const endpoint = `/barbeiro/ListarHorariosDisponiveis?barbeiroId=${barbeiroId}`;
        return api.get(endpoint);
    },
    listarHorariosPorData: async (barbeiroId, data) => {
        const endpoint = `/barbeiro/ListarHorariosDisponiveisPorData?barbeiroId=${barbeiroId}&data=${data}`;
        return api.get(endpoint);
    },
    login: async (email, senha) => {
        const endpoint = '/Usuario/Login';
        const response = await api.post(endpoint, { email, senha });
        return response;
    },
    register: async (nome, email, senha, tipo) => {
        const endpoint = '/Usuario/Register';
        return api.post(endpoint, { nome, email, senha, tipo });
    },
    listarHorariosDisponiveis: async (barbeiroId) => {
        const endpoint = `/Cliente/Barbeiro/${barbeiroId}/HorariosDisponiveis`;
        return api.get(endpoint);
    },
    agendarHorario: async (agendamentoRequest) => {
        const endpoint = '/Cliente/AgendarHorarioCliente';
        console.log('POST endpoint:', endpoint);
        console.log('POST data:', agendamentoRequest);
        return api.post(endpoint, agendamentoRequest);
    },
   
};


export default scheduleService;
