from .utils import get_pt_values,get_poylgon_values
from django.http import JsonResponse, Http404, HttpResponse
import json
import traceback

def get_ts(request):

    return_obj = {}

    if request.method == 'POST':

        s_var = request.POST["variable"]
        interaction = request.POST["interaction"]
        interval = request.POST["interval"]
        if interaction == 'Point':
            geom_data = request.POST["geom_data"]
            try:
                graph = get_pt_values(s_var,geom_data,interval)
                return_obj["data"] = graph
                return_obj["success"] = "success"
            except Exception as e:
                print(traceback.format_exc())

                return_obj["error"] = "Error processing request: "+ str(traceback.format_exc())

        if interaction == 'Polygon':
            geom_data = request.POST["geom_data"]
            # try:
            graph = get_poylgon_values(s_var,geom_data,interval)
            return_obj["data"] = graph
            return_obj["success"] = "success"
            # except Exception as e:
            #     return_obj["error"] = "Error processing request: "+ str(e)


    return JsonResponse(return_obj)