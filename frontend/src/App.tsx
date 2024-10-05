import {useEffect} from 'react';
import {Route, Routes} from 'react-router-dom';
import {Container, Stack} from '@mui/material';
import {CategoryPage} from './pages/categoryPage/index.ts';
import {HomePage} from './pages/home/index.ts';
import {UserPage} from './pages/userPage/index.ts';
import {Header} from './components/header/Header.tsx';
import {useUser} from './lib/context/UserProvider.tsx';
import {getRouteHome, getRouteUser, getRouteCategory} from './lib/const/routes.ts';
import {$api} from './lib/api/api.ts';


const initAuth = async (toggleUserInited: (value: boolean) => void) => {
    try {
        const response = await $api.get('/users/auth/', {
            withCredentials: true
        });

        if (response.data) {
            toggleUserInited(true);
        }

        if (response.data)
            toggleUserInited(true)

        console.log('response', response)
        return true
    } catch (e) {
        console.log(e)
    }
}

function App() {
    const {userInited, toggleUserInited} = useUser()

    useEffect(() => {
        if (userInited) return
        initAuth(toggleUserInited)
    }, [])


    return (
        <Stack className="app">
            <Header/>
            <Container maxWidth="lg">
                {/*Ниже идут плохие парни(лучше так не делать, но я только учусь)*/}
                <Routes>
                    <Route path={getRouteHome()} element={<HomePage/>}/>
                    <Route path={getRouteUser()} element={<UserPage/>}/>
                    <Route path={getRouteCategory(':id')} element={<CategoryPage/>}/>
                </Routes>
            </Container>
        </Stack>
    );
}

export default App;