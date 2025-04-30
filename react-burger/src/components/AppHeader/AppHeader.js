import React from 'react';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import headerStyles from './AppHeader.module.css'




const Menu = () => {
    return (
        <ul style={{ display: 'flex', alignItems: 'center' }}>
            <li className={headerStyles.flexBox} style={{ marginRight: '20px' }}>
                <BurgerIcon className='mr-2' />
                <span className="text text_type_main-default">Конструктор</span>
            </li>
            <li className={headerStyles.flexBox} style={{color: '#8585AD'}}>
                <ListIcon className='mr-2' type="secondary" />
                <span className="text text_type_main-default">Лента заказов</span>
            </li>
        </ul>
    );
}

const Profile = () => {
    return (
        <div className={headerStyles.flexBox} style={{ color: '#8585AD' }}>
            <ProfileIcon className='mr-2' type="secondary" />
            <span className="text text_type_main-default">Личный кабинет</span>
        </div>
    );
}

class AppHeader extends React.Component {
    
    render () {
        return (
            <header style={{ display: 'flex', justifyContent: 'space-between' }} className="pl-5 pr-5 pb-4 pt-4">
                <Menu />
                <Logo className='mr-25' />
                <Profile />
            </header>
        );
    }
    
}

export default AppHeader;