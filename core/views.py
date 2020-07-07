import json
import os

import requests
from django.http import JsonResponse
from django.shortcuts import render
from django.views.generic import TemplateView, View

from FCM import settings

from .forms import NotificationForm
from .models import BrowserToken

SERVER_KEY = 'AAAA0DWbfOI:APA91bErDiwUoOMbvrQ3jOEAlTOj3_o9Zt6d4GBS8N_z17ZgVeyKiSOnnMPTx4RfWa9k5gQRdXcL6LAUOzwb-NbCIKVMyZS_dOPX5zIAn44aw9XreTb0s-AUH1Nr0wkSJK9jp3pwv_6y'


class Index(TemplateView):
    template_name = 'index.html'


class BrowserTokenCreateView(View):
    def post(self, request, *args, **kwargs):
        if request.is_ajax():
            token = request.POST.get('browser_token')
            BrowserToken.objects.create(token=token)
            return JsonResponse({'message': 'Token was saved successfully'})
        return JsonResponse({'message': 'Not an ajax request. Cannot save token!'})


class SendNotificationView(View):
    form = NotificationForm

    def send_notification(self, title, body, client_token):
        url = "https://fcm.googleapis.com/fcm/send"
        headers = {
            'Authorization': f'key={SERVER_KEY}',
            'Content-type': "application/json",
        }
        logo = os.path.join(settings.BASE_DIR, '/static/img/firebase-logo.png')
        msg = {
            "title": title,
            "body": body,
            "icon": logo,
            "click_action": "http://localhost:8000",
        }
        client_token = client_token

        webpush = {
            "fcm_options": {
                "link": "http://localhost:8000"
            }
        }

        payload = {
            'data': msg,
            'webpush': webpush,
            'to': client_token,
        }

        print(payload)

        payload = json.dumps(payload)
        response = requests.request("POST", url, headers=headers, data=payload)
        print(response.text.encode('utf8'))

    def get(self, request, *args, **kwargs):
        form = self.form()
        return render(request, 'send_notification.html', {'form': form})

    def post(self, request, *args, **kwargs):
        form = self.form(request.POST)
        if form.is_valid():
            title = request.POST.get('title')
            body = request.POST.get('body')
            tokens = list(BrowserToken.objects.values_list('token', flat=True))
            for t in tokens:
                self.send_notification(title, body, t)
            return render(request, 'send_notification.html', {'form': form})
        return render(request, 'send_notification.html', {'form': form})
