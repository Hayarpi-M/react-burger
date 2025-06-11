import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import headerStyles from './AppHeader.module.css'




const Menu = () => {
    return (
        <ul className={headerStyles.flexBox}>
            <NavLink to="/" className={({ isActive }) =>
                        `${headerStyles.flexBox} ${headerStyles.constructIcon} ${isActive ? headerStyles.activeLink : headerStyles.inactiveLink}`
                    } >
                <BurgerIcon className='mr-2' type={window.location.pathname === "/" ? "primary" : "secondary"}/>
                <span className="text text_type_main-default">Конструктор</span>
            </NavLink>
            <NavLink to="/orders" className={({ isActive }) =>
                        `${headerStyles.flexBox} ${headerStyles.colorPurple} ${isActive ? headerStyles.activeLink : headerStyles.inactiveLink}`
                    }>
                <ListIcon className='mr-2' type={window.location.pathname.startsWith("/order") ? "primary" : "secondary"} />
                <span className="text text_type_main-default">Лента заказов</span>
            </NavLink>
        </ul>
    );
}

const Profile = () => {
    return (
        <NavLink to="/profile" className={({ isActive }) =>
                `${headerStyles.flexBox} ${headerStyles.colorPurple} ${isActive ? headerStyles.activeLink : headerStyles.inactiveLink}`
            }>
            <ProfileIcon className='mr-2' type={window.location.pathname.startsWith("/profile") ? "primary" : "secondary"} />
            <span className="text text_type_main-default">Личный кабинет</span>
        </NavLink>
    );
}

class AppHeader extends React.Component {
    
    render () {
        return (
            <header className={`${headerStyles.headerWrapper} pl-5 pr-5 pb-4 pt-4`} >
                <Menu />
                <Logo className='mr-25' />
                <Profile />
            </header>
        );
    }
    
}

export default AppHeader;