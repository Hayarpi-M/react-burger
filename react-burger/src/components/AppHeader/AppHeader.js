import React from 'react';
import { Link } from 'react-router-dom';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import headerStyles from './AppHeader.module.css'




const Menu = () => {
    return (
        <ul className={headerStyles.flexBox}>
            <li className={`${headerStyles.flexBox} ${headerStyles.marginR20}`} >
                <BurgerIcon className='mr-2' />
                <span className="text text_type_main-default">Конструктор</span>
            </li>
            <li className={`${headerStyles.flexBox} ${headerStyles.colorPurple}`}>
                <ListIcon className='mr-2' type="secondary" />
                <span className="text text_type_main-default">Лента заказов</span>
            </li>
        </ul>
    );
}

const Profile = () => {
    return (
        <Link to="/profile" className={`${headerStyles.flexBox} ${headerStyles.colorPurple}`}>
            <ProfileIcon className='mr-2' type="secondary" />
            <span className="text text_type_main-default">Личный кабинет</span>
        </Link>
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