from rest_framework.response import Response
from rest_framework.decorators import api_view
import json
from model.model import get_output


@api_view(['POST'])
def post(request):
    data = json.loads(request.body.decode("utf-8"))
    message = data["message"]
    output = get_output(message)
    return Response({"output" : output})

