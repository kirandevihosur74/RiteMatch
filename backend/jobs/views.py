from django.shortcuts import render

from django.http.response import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http.response import JsonResponse
from .models import JobPosting
from .serializers import JobsSerializer


class JobsView(APIView):

    def get_job(self, pk):
        try:
            job = JobPosting.objects.get(jobUrl=pk)
            return job
        except JobPosting.DoesNotExist:
            raise Http404

    def get(self, request, pk=None):
        if pk:
            data = self.get_job(pk)
            serializer = JobsSerializer(data)
        else:
            data = JobPosting.objects.all()
            serializer = JobsSerializer(data, many=True)
        return Response(serializer.data)

    def post(self, request):
        data = request.data
        serializer = JobsSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Job Added Successfully", safe=False)
        return JsonResponse("Failed to Add Job", safe=False)

    def put(self, request, pk=None):
        job_to_update = JobPosting.objects.get(jobUrl=pk)
        serializer = JobsSerializer(instance=job_to_update, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Job updated Successfully", safe=False)
        return JsonResponse("Failed To Update Job")

    def delete(self, request, pk):
        job_to_delete = JobPosting.objects.get(jobUrl=pk)
        job_to_delete.delete()
        return JsonResponse("Job Deleted Successfully", safe=False)




