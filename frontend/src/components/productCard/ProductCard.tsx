import { useState } from 'react';
import { Card, CardContent, CardMedia, Typography, IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

export interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  image_url: string;
  description: string;
  isFavorite?: boolean;
}

export function ProductCard({ id, name, price, image_url, isFavorite = false, description }: ProductCardProps) {
  const [favorite, setFavorite] = useState(isFavorite);

  const handleFavoriteClick = () => {
    // Здесь будет логика добавления/удаления из избранного
    setFavorite(!favorite);
    console.log(`Product ${id} ${favorite ? 'removed from' : 'added to'} favorites`);
  };

  return (
    <Card>
      <CardMedia
        component="img"
        height="140"
        image={image_url}
        alt={name}
      />
      <CardContent>
        <Typography gutterBottom variant="h6">
          {name}
        </Typography>
        <Typography display='block' variant="caption" whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis" title={description}>
          {description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {price} ₽
        </Typography>
        <IconButton aria-label="add to favorites" onClick={handleFavoriteClick} sx={{ mt: 1 }}>
          {favorite ? <FavoriteIcon color="secondary" /> : <FavoriteBorderIcon />}
        </IconButton>
      </CardContent>
    </Card >
  );
}