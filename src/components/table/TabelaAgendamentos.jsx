import React from 'react';
import PropTypes from 'prop-types';

function TabelaAgendamentos({ horarios, removerHorario }) {
    console.log('Horários para exibição na tabela:', horarios);

    return (
        <div className="row mt-4">
            <div className="col-12">
                <div className="table-responsive">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Data</th>
                                <th>Hora Início</th>
                                <th>Hora Fim</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {horarios.map((horario) => (
                                <tr key={horario.id}>
                                    <td>{new Date(horario.data).toLocaleDateString()}</td>
                                    <td>{horario.horaInicio}</td>
                                    <td>{horario.horaFim}</td>
                                    <td>
                                        <button 
                                            className="btn btn-danger"
                                            onClick={() => removerHorario(horario.id)}
                                        >
                                            Remover
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {horarios.length === 0 && (
                                <tr>
                                    <td colSpan="4" className="text-center">Nenhum horário disponível...</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

TabelaAgendamentos.propTypes = {
    horarios: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        data: PropTypes.string.isRequired,
        horaInicio: PropTypes.string.isRequired,
        horaFim: PropTypes.string.isRequired,
    })).isRequired,
    removerHorario: PropTypes.func.isRequired,
};

export default TabelaAgendamentos;
