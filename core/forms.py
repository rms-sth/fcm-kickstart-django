from django import forms


class NotificationForm(forms.Form):
    title = forms.CharField(max_length=20)
    body = forms.CharField(widget=forms.Textarea)
