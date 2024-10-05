import { Grid, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { getRouteCategory } from '@/lib/const/routes';

interface Category {
  id: string;
  name: string;
}

interface CategoryListProps {
  categories: Category[];
}

export function CategoryList({ categories }: CategoryListProps) {
  return (
    <Grid container spacing={2}>
      {categories.map((category) => (
        <Grid item key={category.id}>
          <Button component={Link} to={getRouteCategory(category.id)} variant="outlined">{category.name}</Button>
        </Grid>
      ))}
    </Grid>
  );
}