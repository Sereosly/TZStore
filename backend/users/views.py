from rest_framework import generics, permissions, viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.authentication import TokenAuthentication
from django.contrib.auth.models import User
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.authentication import BaseAuthentication
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import authenticate
from .serializers import UserRegistrationSerializer

class UserCreate(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserRegistrationSerializer

class UserDetail(generics.RetrieveUpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserRegistrationSerializer
    permission_classes = (permissions.IsAuthenticated,)

class CurrentUserView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = (permissions.AllowAny,)

    def get(self, request):
        access_token = request.COOKIES.get('access_token')
        if access_token:
            return Response({'message': 'Hello, world!', 'access_token': access_token})
        else:
            return Response({'message': 'Access token not found'}, status=401)

class CustomLoginView(APIView):

    permission_classes = (permissions.AllowAny,)
    def post(self, request):
        try:
            username = request.data.get('username')
            password = request.data.get('password')

            user = authenticate(request, username=username, password=password)
            if user is not None:
                refresh = RefreshToken.for_user(user)
                response = Response()

                response.set_cookie(
                    key='access_token',
                    value=str(refresh.access_token),
                    httponly=True,
                    secure=False,
                    samesite='Lax'
                )

                response.set_cookie(
                    key='refresh_token',
                    value=str(refresh),
                    httponly=True,
                    secure=False,
                    samesite='Lax'
                )

                response.data = {
                    'message': 'Successfully logged in',
                }
                return response
            else:
                return Response({'detail': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class CookieAuthentication(BaseAuthentication):
    permission_classes = (permissions.AllowAny,)
    def authenticate(self, request):
        access_token = request.COOKIES.get('access_token')
        if not access_token:
            return None  # Не аутентифицирован
        try:
            # Верификация токена
            user = User.objects.get(id=decode_jwt(access_token))  # Пример верификации
        except Exception as e:
            raise AuthenticationFailed('Invalid token')

        return (user, None)

class LogoutViewSet(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = (permissions.AllowAny, )
    def post(self, request):
        response = Response({'message': 'Successfully logged out'}, status=status.HTTP_200_OK)
        response.delete_cookie('access_token')
        response.delete_cookie('refresh_token')

        return response