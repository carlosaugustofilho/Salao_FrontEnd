import { useState, useEffect } from 'react';
import scheduleService from '../api/scheduleService';

const useHorarios = (barbeiroId) => {
    const [horarios, setHorarios] = useState([]);

    useEffect(() => {
        if (barbeiroId) {
            fetchHorarios(barbeiroId);
        }
    }, [barbeiroId]);

    const fetchHorarios = async (barbeiroId) => {
        try {
            const horariosDisponiveis = await scheduleService.listarHorarios(barbeiroId);
            setHorarios(horariosDisponiveis);
        } catch (error) {
            console.error('Erro ao buscar horários:', error);
        }
    };

    const handleAgendar = async (id) => {
        try {
            await scheduleService.atualizarStatusHorario(id, 0);
            fetchHorarios(barbeiroId); 
        } catch (error) {
            console.error('Erro ao atualizar status do horário:', error);
        }
    };

    const adicionarHorario = async (horario) => {
        try {
            await scheduleService.adicionarHorario(horario);
            fetchHorarios(horario.barbeiroId);
        } catch (error) {
            console.error('Erro ao adicionar horário:', error);
        }
    };

    const removerHorario = async (id) => {
        try {
            await scheduleService.removerHorario(id);
            fetchHorarios(barbeiroId);
        } catch (error) {
            console.error('Erro ao remover horário:', error);
        }
    };

    return { horarios, handleAgendar, adicionarHorario, removerHorario };
};

export default useHorarios;
