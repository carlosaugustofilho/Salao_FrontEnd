import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FaCalendarAlt, FaClock } from 'react-icons/fa';

function FormularioAgendamentoBarbeiro({ adicionarHorario, barbeiro }) {
    const [barbeiroId, setBarbeiroId] = useState('');
    const [data, setData] = useState('');
    const [horaInicio, setHoraInicio] = useState('');
    const [horaFim, setHoraFim] = useState('');

    useEffect(() => {
        if (barbeiro) {
            ///setBarbeiroId(barbeiro.barbeiroId.toString()); // Certifique-se de que o barbeiroId é utilizado
            console.log('Barbeiro ID:', barbeiro.barbeiroId);
            console.log('Barbeiro Nome:', barbeiro.nome);
        }
    }, [barbeiro]);
    

    const handleSubmit = (e) => {
        e.preventDefault();
        if (barbeiroId && data && horaInicio && horaFim) {
            const horario = {
                barbeiroId: parseInt(barbeiroId, 10),
                data: new Date(data).toISOString(),
                horaInicio: `${horaInicio}:00`,
                horaFim: `${horaFim}:00`
            };
            console.log('Dados enviados:', horario);
            adicionarHorario(horario);
            setBarbeiroId(barbeiro.usuarioId.toString());
            setData('');
            setHoraInicio('');
            setHoraFim('');
        }
    };

    return (
        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-md-8 col-sm-12">
                    <div className="card p-4 shadow">
                        <h1 className="text-center mb-4">Registrar Horários Disponíveis</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="barbeiroId">Barbeiro ID</label>
                                <input
                                    type="text"
                                    id="barbeiroId"
                                    className="form-control"
                                    value={barbeiroId}
                                    onChange={(e) => setBarbeiroId(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="data">
                                    Data <FaCalendarAlt />
                                </label>
                                <input
                                    type="date"
                                    id="data"
                                    className="form-control"
                                    value={data}
                                    onChange={(e) => setData(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="horaInicio">
                                    Hora Início <FaClock />
                                </label>
                                <input
                                    type="time"
                                    id="horaInicio"
                                    className="form-control"
                                    value={horaInicio}
                                    onChange={(e) => setHoraInicio(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="horaFim">
                                    Hora Fim <FaClock />
                                </label>
                                <input
                                    type="time"
                                    id="horaFim"
                                    className="form-control"
                                    value={horaFim}
                                    onChange={(e) => setHoraFim(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary mt-3 w-100">Adicionar Horário</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

FormularioAgendamentoBarbeiro.propTypes = {
    adicionarHorario: PropTypes.func.isRequired,
    barbeiro: PropTypes.shape({
        usuarioId: PropTypes.number.isRequired,
        nome: PropTypes.string.isRequired,
    }).isRequired,
};

export default FormularioAgendamentoBarbeiro;
