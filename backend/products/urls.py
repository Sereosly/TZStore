from django.urls import path
from .views import ProductListView, ProductDetailView, CategoryListView, FavoriteListView, AddFavoriteView, RandomProductListView, ProductsByCategoryView

urlpatterns = [
    path('products/', ProductListView.as_view(), name='product-list'),
    path('products/<int:pk>/', ProductDetailView.as_view(), name='product-detail'),
    path('products/random/', RandomProductListView.as_view(), name='product-random-api'),
    path('categories/', CategoryListView.as_view(), name='category-list'),
    path('favorites/', FavoriteListView.as_view(), name='favorite-list'),
    path('favorites/add/', AddFavoriteView.as_view(), name='add-favorite'),
    path('category/<int:category_id>/', ProductsByCategoryView.as_view(), name='products-by-category'),
]
