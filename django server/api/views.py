from rest_framework.response import Response
from rest_framework.decorators import api_view
import json
@api_view(['POST'])
def post(request):

    data = json.loads(request.body.decode("utf-8"))
    message = data["message"]
    
    return Response({"output" : message})

