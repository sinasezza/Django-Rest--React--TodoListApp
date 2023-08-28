from django.db import models


class Task(models.Model):
	title = models.CharField(max_length=200)
	description = models.TextField(null=True,blank=True)
	created_on = models.DateTimeField(auto_now_add=True)
	last_modified = models.DateTimeField(auto_now=True)
	completed = models.BooleanField(default=False,null=True,blank=True)
	
	def __str__(self) -> str:
		return self.title
 