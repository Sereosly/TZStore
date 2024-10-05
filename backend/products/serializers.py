from rest_framework import serializers
from .models import Product, Category, Favorite


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']

class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer()

    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'price', 'image', 'category']

class FavoriteSerializer(serializers.ModelSerializer):
    product = ProductSerializer()

    class Meta:
        model = Favorite
        fields = ['id', 'product', 'user']
