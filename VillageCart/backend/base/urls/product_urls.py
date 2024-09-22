from django.urls import path
from base.views import product_views as views
from rest_framework_simplejwt.views import TokenObtainPairView

urlpatterns = [
    path('', views.getProducts, name='products'),  # List all products
    path('category/', views.getCategories, name='category'),  # List all categories
    path('category/<str:pk>/', views.get_products_by_category, name='products_by_category'),  # Products by category
    path('mySmartBasket/', views.smart_basket_products, name='SmartBasketproducts'),  # Smart Basket products
    path('myFeatureBasket/', views.feature_basket_products, name='FeatureBasketproducts'),  # Featured products
    path('myBestSellerBasket/', views.bestSeller_basket_products, name='BestSellerBasketproducts'),  # Best sellers
    path('<str:pk>/', views.getProduct, name='product'),  # Individual product details
]
