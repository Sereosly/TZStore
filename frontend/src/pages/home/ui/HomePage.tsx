import { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import Slider from 'react-slick';
import { ProductCard, ProductCardProps } from '../../../components/productCard/ProductCard';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { sliderSettings } from '../const/homeConst';
import { $api } from '@/lib/api/api';
import { CategoryList } from './categoryList/CategoryList';

interface Category {
  id: string;
  name: string;
}

export function HomePage() {
  const [products, setProducts] = useState<ProductCardProps[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsResponse = await $api.get<Product[]>('/products/random/');

        setProducts(productsResponse.data);

        const categoriesResponse = await $api.get<Category[]>('/categories/');

        setCategories(categoriesResponse.data);

        console.log('1 ', productsResponse.data)
        console.log('1 ', categoriesResponse.data)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Typography variant="h4" component="h1" gutterBottom>
        Популярные товары
      </Typography>
      <Slider {...sliderSettings}>
        {products.map((product) => (
          <div key={product.id} style={{ padding: '0 10px' }}>
            <ProductCard {...product} />
          </div>
        ))}
      </Slider>
      <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4 }}>
        Категории
      </Typography>
      <CategoryList categories={categories} />
    </div>
  );
}