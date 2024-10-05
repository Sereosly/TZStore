from django.db import models  # Для работы с моделями
from django.contrib.auth.models import User  # Импорт модели пользователя

# Модель для категории товаров
class Category(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

# Модель для товаров
class Product(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='products')  # Связь с категорией
    name = models.CharField(max_length=255)
    description = models.TextField()
    image = models.ImageField(upload_to='product_images/', blank=True, null=True)  # Поле для изображений
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.name

# Модель для избранных товаров
class Favorite(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)  # Связь с пользователем
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='product_favorites')


    def __str__(self):
        return f"{self.user.username} -> {self.product.name}"
