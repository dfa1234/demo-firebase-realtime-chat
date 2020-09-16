import React, {FC, useState} from 'react';
import {createBrowserHistory} from 'history';
import {Box} from "../utils/Box";
import {StyledThemeProvider} from '../utils/StyledThemeProvider';
import styled from "styled-components";
import {useTheme} from "@material-ui/core";
import {MaterialThemeProvider} from '../utils/MaterialThemeProvider';
import {Route, Router, Switch} from 'react-router-dom';
import {RoomSelection} from "./RoomSelection";
import {Chat} from "./Chat";
import logo from './logo.png';

const history = createBrowserHistory();


export const App: FC = () => {
    return (
        <MaterialThemeProvider>
            <StyledThemeProvider>
                <RoutedApp/>
            </StyledThemeProvider>
        </MaterialThemeProvider>
    );
}

const RoutedApp: FC = () => {
    const theme = useTheme();

    // would be better in a global context or even better a state manager like redux
    const [login, setLogin] = useState();

    return <MainWrapper backgroundColor={theme.palette.background.default} color={theme.palette.text.primary}>
        <LogoWrapper>
            <Logo src={logo} alt="Chat Project Logo" />
            <Title>Chat project Texel</Title>
        </LogoWrapper>
        <Router history={history}>
            <Switch>
                <Route path="/chat/:roomId">
                    <Chat login={login} />
                </Route>
                <Route path="/">
                    <RoomSelection login={(l:string)=> setLogin(l)}/>
                </Route>
            </Switch>
        </Router>
        <Footer>
            For any question: <a
            href="mailto:dpower@outlook.co.il">dpower@outlook.co.il</a>
        </Footer>
    </MainWrapper>
}

const Footer = styled(Box)({
    fontSize: 14,
    fontFamily: 'sans-serif',
    paddingTop: 64,
    color: 'gray',
    bottom: 0,
    right: 0,
    left: 0,
    paddingBottom: '20px',
    textAlign: 'center',
    width: '100%'
})

const MainWrapper = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent:'center',
    height: '100%',
    minHeight: '100vh',
    width: '100%'
})

const LogoWrapper = styled.span({
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    width: '180px',
    justifyContent: 'space-around'
})

const Title = styled.h1({
    color: 'gray',
    fontFamily: 'sans-serif',
    margin:0,
    fontSize: 18,
    minWidth: 160
})

const Logo = styled.img({
    width: 60
})
