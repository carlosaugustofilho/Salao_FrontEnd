import React from 'react';
import { Outlet } from 'react-router-dom';
import Menu from './Menu';
import scheduleService from '../api/scheduleService';

const Layout = () => {
    const handleLogout = async () => {
        try {
            await scheduleService.logout();
        } catch (error) {
            console.error('Erro ao fazer logout:', error);
        }
    };

    return (
        <>
            <Menu onLogout={handleLogout} />
            <div className="container mt-4">
                <Outlet />
            </div>
        </>
    );
};

export default Layout;
