from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from django.contrib.auth.models import User
from base.serializers import ProductSerializer, UserSerializer, UserSerializerWithToken
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.hashers import make_password
from rest_framework import status
from django.core.cache import cache  # For OTP caching
import random
from twilio.rest import Client  # Twilio integration
from base.models import ProfileUser  # Your custom profile model

# Twilio credentials
TWILIO_ACCOUNT_SID = 'AC208519ad2eb9b25d6932d8d42586f993'
TWILIO_AUTH_TOKEN = '13f6fc123dac62cd0919fbd16f8734e3'
TWILIO_PHONE_NUMBER = '+19124915914'

client = Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)

# Custom Token Serializer
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        serializer = UserSerializerWithToken(self.user).data
        for k, v in serializer.items():
            data[k] = v
        return data

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

# Register User (after OTP verification)
@api_view(['POST'])
def registerUser(request):
    data = request.data
    mobile_number = data.get('mobileNumber')
    otp_input = data.get('otp')

    # Verify OTP
    otp_stored = cache.get(f"otp_{mobile_number}")
    if otp_stored and otp_stored == int(otp_input):
        try:
            # Create the user
            user = User.objects.create(
                first_name=data['name'],
                username=data['email'],
                email=data['email'],
                password=make_password(data['password']),
            )

            # Create the ProfileUser with the mobile number
            ProfileUser.objects.create(
                user=user,
                mobileNumber=mobile_number,
                is_mobile_verified=True  # Mark the mobile number as verified
            )

            # Serialize the user with token
            serializer = UserSerializerWithToken(user, many=False)
            return Response(serializer.data)

        except User.DoesNotExist:
            message = {'detail': 'User with this email already exists'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            message = {'detail': str(e)}
            return Response(message, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    else:
        return Response({'detail': 'Invalid OTP or OTP expired'}, status=status.HTTP_400_BAD_REQUEST)

# Update User Profile
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUserProfile(request):
    user = request.user
    serializer = UserSerializerWithToken(user, many=False)

    data = request.data
    user.first_name = data['name']
    user.username = data['email']
    user.email = data['email']

    if data['password'] != '':
        user.password = make_password(data['password'])

    user.save()

    return Response(serializer.data)

# Get User Profile
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user = request.user
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)

# Get All Users (Admin only)
@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUsers(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)

# Send OTP for Mobile Number Verification
@api_view(['POST'])
def send_otp(request):
    mobile_number = request.data.get('mobileNumber')

    if not mobile_number:
        return Response({'detail': 'Mobile number is required'}, status=status.HTTP_400_BAD_REQUEST)

    # Generate OTP
    otp = random.randint(100000, 999999)

    # Store OTP in cache with a timeout (e.g., 5 minutes)
    cache.set(f"otp_{mobile_number}", otp, timeout=300)

    # Send OTP via SMS using Twilio
    try:
        message = client.messages.create(
            body=f"Your OTP is {otp}",
            from_=TWILIO_PHONE_NUMBER,
            to=mobile_number
        )
        return Response({'detail': 'OTP sent'}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({'detail': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# Verify OTP for Mobile Number
@api_view(['POST'])
def verify_otp(request):
    mobile_number = request.data.get('mobileNumber')
    otp_input = request.data.get('otp')

    # Retrieve OTP from cache
    otp_stored = cache.get(f"otp_{mobile_number}")

    if otp_stored and otp_stored == int(otp_input):
        return Response({'detail': 'OTP verified'}, status=status.HTTP_200_OK)
    else:
        return Response({'detail': 'Invalid OTP'}, status=status.HTTP_400_BAD_REQUEST)
