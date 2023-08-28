from rest_framework.decorators import api_view
from rest_framework.response import Response
from . import models , serializers


# ---------------------------------------------

@api_view(['GET',])
def api_overview(request):
    api_urls = {
        'Task List' : 'api/task-list/',
        'Task Detail' : 'api/task-detail/<str:pk>',
        'Task Create' : 'api/task-create/',
        'Task Update' : 'api/task-update/<str:pk>',
        'Task Delete' : 'api/task-delete/<str:pk>',
    }
    return Response(api_urls)


# ---------------------------------------------

@api_view(['GET',])
def task_list(request):
    tasks = models.Task.objects.all().order_by('-pk')
    serializer = serializers.TaskSerializer(tasks,many=True)
    return Response(serializer.data)

# ---------------------------------------------

@api_view(['GET'])
def task_detail(request, pk):
	tasks = models.Task.objects.get(id=pk)
	serializer = serializers.TaskSerializer(tasks, many=False)
	return Response(serializer.data)


# ---------------------------------------------

@api_view(['POST'])
def task_create(request):
	serializer = serializers.TaskSerializer(data=request.data)

	if serializer.is_valid():
		serializer.save()

	return Response(serializer.data)

# ---------------------------------------------

@api_view(['POST'])
def task_update(request, pk):
	task = models.Task.objects.get(id=pk)
	serializer = serializers.TaskSerializer(instance=task, data=request.data)

	if serializer.is_valid():
		serializer.save()

	return Response(serializer.data)

# ---------------------------------------------

@api_view(['DELETE'])
def task_delete(request, pk):
	task = models.Task.objects.get(id=pk)
	task.delete()

	return Response('Item succsesfully delete!')
