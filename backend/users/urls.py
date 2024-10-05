from django.urls import path
from .views import UserCreate, UserDetail, LogoutViewSet, CustomLoginView, CurrentUserView
from rest_framework_simplejwt.views import TokenObtainPairView

urlpatterns = [
    path('users/register/', UserCreate.as_view(), name='register'),
    path('users/login/', CustomLoginView.as_view(), name='login'),
    path('profile/<username>/', UserDetail.as_view(), name='profile'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('users/auth/', CurrentUserView.as_view(), name='user_auth'),
    path('logout/', LogoutViewSet.as_view(), name='logout'),
]