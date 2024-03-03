import React from 'react';
import SideNav, {NavItem, NavIcon, NavText} from '@trendmicro/react-sidenav'
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import {useNavigate} from 'react-router-dom';

const SideMenu = () => {
    const navigate = useNavigate();
    return <SideNav className="sideNav-Menu" onSelect={selected => {
        navigate(`/${selected}`)
    }}>
        <SideNav.Toggle/>
        <SideNav.Nav defaultSelected="home">
            <NavItem eventKey="home">
                <NavIcon><i className="fa fa-fw fa-home" style={{fontSize: '1.5em'}}/></NavIcon>
                <NavText>Home</NavText>
            </NavItem>

            <NavItem eventKey="user">
                <NavIcon><i className="fa fa-fw fa-user" style={{fontSize: '1.5em'}}/></NavIcon>
                <NavText>User</NavText>
            </NavItem>
            <NavItem eventKey="account">
                <NavIcon><i className="fa fa-fw fa-briefcase" style={{fontSize: '1.5em'}}/></NavIcon>
                <NavText>Account</NavText>
                <NavItem eventKey="deposit">
                    <NavText>Deposit</NavText>
                </NavItem>
                <NavItem eventKey="withdrawal">
                    <NavText>Withdrawal</NavText>
                </NavItem>
                <NavItem eventKey="balance">
                    <NavText>Balance</NavText>
                </NavItem>
            </NavItem>
            <NavItem eventKey="report">
                <NavIcon><i className="fa fa-fw fa-line-chart" style={{fontSize: '1.5em'}}/></NavIcon>
                <NavText>Reports</NavText>
            </NavItem>
        </SideNav.Nav>
    </SideNav>
}

export default SideMenu;