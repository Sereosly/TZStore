import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Grid2, Stack } from '@mui/material';
import { ProductCard } from '@/components/productCard/ProductCard';
import { $api } from '@/lib/api/api';

interface Category {
  id: number;
  name: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
  image_url: string;
  category:Category

}

export function CategoryPage() {
  const { id } = useParams<{ id: string }>();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const response = await $api.get(`/category/${id}/`);
        console.log(response.data)
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching category data:', error);
      }
    };

    fetchCategoryData();
  }, [id]);

  if(!products.length){
   return(
    <Typography variant="h1">
        Идика ты нахуй от сюда, нет такой категории
      </Typography>
    )
  }

  return (
    <Stack gap='40px'>
      <Typography variant="h4">
        Категория: {products[0].category.name}
      </Typography>
      
      <Grid2 container spacing={3}>
        {products.map((product) => (
          <Grid2 key={product.id}>
            <ProductCard {...product} />
          </Grid2>
        ))}
      </Grid2>
    </Stack>
  );
}