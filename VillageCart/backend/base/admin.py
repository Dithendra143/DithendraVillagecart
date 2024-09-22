from django.contrib import admin
from .models import Product, Review, Order, OrderItem, ShippingAddress,Category,ProductImage,ProductInventory,Variation,ProfileUser


# Register your models here.

admin.site.register(Category)
admin.site.register(Product)
admin.site.register(Review)
admin.site.register(Order)
admin.site.register(OrderItem)
admin.site.register(ShippingAddress)
admin.site.register(ProductImage)
admin.site.register(ProductInventory)
admin.site.register(Variation)
admin.site.register(ProfileUser)
