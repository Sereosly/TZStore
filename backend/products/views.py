from rest_framework import generics, permissions
from rest_framework.response import Response
from .models import Product, Category, Favorite
from .serializers import ProductSerializer, CategorySerializer, FavoriteSerializer
from django.contrib.auth.models import User


class ProductListView(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class ProductDetailView(generics.RetrieveAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class RandomProductListView(generics.RetrieveAPIView):

    permission_classes = [permissions.AllowAny]
    def get(self, request, *args, **kwargs):
        products = Product.objects.order_by('?')[:10]  # Выбираем 10 случайных продуктов
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)


class CategoryListView(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class FavoriteListView(generics.ListAPIView):
    serializer_class = FavoriteSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Favorite.objects.filter(user=self.request.user)


class AddFavoriteView(generics.CreateAPIView):
    serializer_class = FavoriteSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        product_id = self.request.data.get('product')
        product = Product.objects.get(id=product_id)
        serializer.save(user=self.request.user, product=product)


class ProductsByCategoryView(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = ProductSerializer

    def get_queryset(self):
        category_id = self.kwargs.get('category_id')  # Получаем category_id из URL
        # Используем select_related, если хотите включить данные о категории
        return Product.objects.filter(category_id=category_id).select_related('category')
