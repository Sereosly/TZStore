import { useEffect, useState } from 'react';
import { Typography, Grid } from '@mui/material';
import { $api } from '@/lib/api/api.ts';
import { ProductCard } from '@/components/productCard/ProductCard';

interface Product {
  id: number;
  name: string;
  price: number;
  image_url: string;
}

export function UserPage() {
  const [username, setUsername] = useState('');
  const [favorites, setFavorites] = useState<Product[]>([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Здесь будет запрос к API для получения данных пользователя
        const userResponse = await $api.get('/user/');
        setUsername(userResponse.data.username);

        const favoritesResponse = await $api.get('/user/favorites/');
        setFavorites(favoritesResponse.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div>
      <Typography variant="h4" component="h1" gutterBottom>
        Профиль пользователя: {username}
      </Typography>
      <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
        Избранные товары
      </Typography>
      <Grid container spacing={3}>
        {favorites.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <ProductCard {...product} isFavorite={true} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}