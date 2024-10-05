import React, { useState } from 'react';
import { Dialog, Box, TextField, Button, Typography, Stack } from '@mui/material';
import { login } from '@/lib/api/authApi';
import {useUser} from "@/lib/context/UserProvider.tsx";

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
}


export function AuthModal({ open, onClose }: AuthModalProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const {
    toggleUserInited
  } = useUser()

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await login({ username, password });
      console.log(response)

      onClose();
      toggleUserInited(true)
    } catch (e) {
      console.log(e)
    }
  };

  return (
    <Dialog open={open} onClose={onClose} scroll="body">
      <Box padding='20px'>
        <Typography variant="h6" >
          Вход
        </Typography>
        <Stack component='form' gap='20px' mt='15px' onSubmit={handleSubmit}>
          <TextField
            label="Имя пользователя"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Пароль"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" variant="contained">
            Войти
          </Button>
        </Stack>
      </Box>
    </Dialog>
  );
}