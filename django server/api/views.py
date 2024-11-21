from rest_framework.response import Response
from rest_framework.decorators import api_view

@api_view(['GET'])
def get(request):
    return Response({"name" : "hello"})


@api_view(['POST'])
def post(request):
    return Response(request.data)