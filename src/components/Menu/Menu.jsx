import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const Menu = ({ onLogout, user }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        onLogout();
        localStorage.removeItem('token');
        navigate('/login');
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Bem-vindo, {user.nome}</Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    onClick={toggleMenu}
                    aria-controls="navbarNav"
                    aria-expanded={menuOpen}
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={`collapse navbar-collapse ${menuOpen ? 'show' : ''}`} id="navbarNav">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Página Inicial</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/horariosdisponiveis">Horários Disponíveis</Link>
                        </li>
                        {user.papelId !== 1 && (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/horarios">Registrar Horários Disponíveis</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/agendamentos">Agendamentos</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/clientes">Clientes</Link>
                                </li>
                            </>
                        )}
                        <li className="nav-item">
                            <button className="btn btn-outline-light nav-link" onClick={handleLogout}>
                                Logout
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

Menu.propTypes = {
    onLogout: PropTypes.func.isRequired,
    user: PropTypes.shape({
        nome: PropTypes.string.isRequired,
        papelId: PropTypes.number.isRequired,
    }).isRequired,
};

export default Menu;
