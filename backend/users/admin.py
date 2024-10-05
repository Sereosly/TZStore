from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import User
from .models import Favorite

class FavoriteInline(admin.TabularInline):
    model = Favorite
    extra = 1

class UserAdmin(BaseUserAdmin):
    inlines = (FavoriteInline,)

admin.site.unregister(User)
admin.site.register(User, UserAdmin)
