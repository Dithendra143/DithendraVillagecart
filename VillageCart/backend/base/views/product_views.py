from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from base.models import Product, Category
from base.serializers import ProductSerializer, categoriesSerializer
from django.shortcuts import get_object_or_404



@api_view(['GET'])
def getCategories(request):
    categories = Category.objects.all()
    serializer = categoriesSerializer(categories, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_products_by_category(request, pk):
    # Use get_object_or_404 to handle category not found
    category = get_object_or_404(Category, _id=pk)
    
    products = Product.objects.filter(category=category)
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def smart_basket_products(request):
    try:
        products = Product.objects.filter(is_smartBasket=True)
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)
    except Exception as e:
        print("no products")
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    

@api_view(['GET'])
def feature_basket_products(request):
    try:
        products = Product.objects.filter(is_featured=True)
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)
    except Exception as e:
        print("no products")
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
def bestSeller_basket_products(request):
    try:
        products = Product.objects.filter(is_featured=True)
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)
    except Exception as e:
        print("no products")
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
def getProducts(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getProduct(request, pk):
    # Use get_object_or_404 to handle product not found
    product = get_object_or_404(Product, _id=pk)
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)