import React from 'react';
import { Grid } from '@mui/material';
import { ProductCard } from '../productCard/ProductCard.tsx';

const products = [
  { id: 1, name: "Продукт 1", price: 1000, imageUrl: "/placeholder.svg?height=300&width=300" },
  { id: 2, name: "Продукт 2", price: 2000, imageUrl: "/placeholder.svg?height=300&width=300" },
  { id: 3, name: "Продукт 3", price: 3000, imageUrl: "/placeholder.svg?height=300&width=300" },
  { id: 4, name: "Продукт 4", price: 4000, imageUrl: "/placeholder.svg?height=300&width=300" },
];

export function ProductGrid() {
  return (
    <Grid container spacing={3}>
      {products.map((product) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
          <ProductCard {...product} />
        </Grid>
      ))}
    </Grid>
  );
}