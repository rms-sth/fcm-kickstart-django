from django.shortcuts import render
from django.views.generic import TemplateView, View
from .models import BrowserToken
from django.http import JsonResponse


class Index(TemplateView):
    template_name = 'index.html'


class BrowserTokenCreateView(View):
    def post(self, request, *args, **kwargs):
        if request.is_ajax():
            token = request.POST.get('browser_token')
            BrowserToken.objects.create(token=token)
            return JsonResponse({'message': 'Token was saved successfully'})
        return JsonResponse({'message': 'Not an ajax request. Cannot save token!'})
