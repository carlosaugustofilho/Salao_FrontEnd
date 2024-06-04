import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function FormularioPesquisa({ buscarPorData }) {
    const [dataInicio, setDataInicio] = useState(null);
    const [dataFim, setDataFim] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (dataInicio && dataFim) {
            buscarPorData(dataInicio.toISOString().split('T')[0], dataFim.toISOString().split('T')[0]);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form-inline">
            <div className="form-group">
                <label htmlFor="dataInicio">De:</label>
                <DatePicker
                    selected={dataInicio}
                    onChange={(date) => setDataInicio(date)}
                    dateFormat="dd/MM/yyyy"
                    className="form-control"
                    placeholderText="dd/mm/aaaa"
                    required
                />
            </div>
            <div className="form-group ml-2">
                <label htmlFor="dataFim">Até:</label>
                <DatePicker
                    selected={dataFim}
                    onChange={(date) => setDataFim(date)}
                    dateFormat="dd/MM/yyyy"
                    className="form-control"
                    placeholderText="dd/mm/aaaa"
                    required
                />
            </div>
            <button type="submit" className="btn btn-success ml-2">Buscar</button>
        </form>
    );
}

FormularioPesquisa.propTypes = {
    buscarPorData: PropTypes.func.isRequired,
};

export default FormularioPesquisa;
