from django.db import models


class BrowserToken(models.Model):
    token = models.CharField(max_length=500, blank=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return f'{self.token}'
