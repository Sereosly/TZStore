import {useState} from 'react';
import {AppBar, Toolbar, Button, Link as LinkUI, Link, Stack} from '@mui/material';
import {AuthModal} from "../authModal/AuthModal.tsx";
import {RegisterModal} from "../registerModal/RegisterModal.tsx";
import {getRouteHome} from '../../lib/const/routes.ts';
import {$api} from '@/lib/api/api.ts';
import {useUser} from '@/lib/context/UserProvider.tsx';

export function Header() {
    const [authOpen, setAuthOpen] = useState(false);
    const [registerOpen, setRegisterOpen] = useState(false);
    const {userInited, toggleUserInited} = useUser()

    const onAuthClick = () => {
        setAuthOpen(prev => !prev);
    }

    const onRegisterClick = () => setRegisterOpen(prev => !prev);

    const onLogout = async () => {
        try {
            const response = await $api.post('/logout/', {}, {
                withCredentials: true,
            });
            console.log('Logged out:', response.data);

        toggleUserInited(false)
        console.log(response)
    }
catch
    (e)
    {
        console.log(e)
    }
}

return (
    <>
        <AppBar position="static">
            <Toolbar>
                <LinkUI component={Link} href={getRouteHome()} color='#FFF' underline='none'>
                    TZStore
                </LinkUI>
                <Stack direction='row' gap='20px' ml='auto'>
                    {userInited ?
                        <>
                            <Button color='#FFF' onClick={() => {
                            }}>
                                Профиль
                            </Button>
                            <Button color='#FFF' onClick={onLogout}>
                                Выйти
                            </Button>
                        </>
                        :
                        <>
                            <Button color='#FFF' onClick={onAuthClick}>
                                Войти
                            </Button>
                            <Button color='#FFF' onClick={onRegisterClick}>
                                Зарегистрироваться
                            </Button>
                        </>
                    }
                </Stack>
            </Toolbar>
        </AppBar>
        <AuthModal open={authOpen} onClose={onAuthClick}/>
        <RegisterModal open={registerOpen} onClose={onRegisterClick}/>
    </>
);
}