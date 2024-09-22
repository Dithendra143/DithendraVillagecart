from django.urls import path
from . import views
from rest_framework_simplejwt.views import (TokenObtainPairView)

urlpatterns = [
    path('products/', views.getProducts, name='products'),
    path('category/', views.getCategories, name='category'),
    path('category/<str:pk>/products/', views.get_products_by_category, name='products_by_category'),
    path('product/<str:pk>/', views.getProduct, name='product'),
    path('mySmartBasket/', views.smart_basket_products, name='SmartBasketproducts'),
    path('myFeatureBasket/', views.feature_basket_products, name='FeatureBasketproducts'),
    path('myBestSellerBasket/', views.bestSeller_basket_products, name='BestSellerBasketproducts'),
]
