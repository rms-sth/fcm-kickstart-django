import json
import requests

SERVER_KEY = 'AAAA0DWbfOI:APA91bErDiwUoOMbvrQ3jOEAlTOj3_o9Zt6d4GBS8N_z17ZgVeyKiSOnnMPTx4RfWa9k5gQRdXcL6LAUOzwb-NbCIKVMyZS_dOPX5zIAn44aw9XreTb0s-AUH1Nr0wkSJK9jp3pwv_6y'


def send_notification():
    url = "https://fcm.googleapis.com/fcm/send"

    headers = {
        'Authorization': f'key={SERVER_KEY}',
        'Content-type': "application/json",
    }

    msg = {
        "title": "Portugal vs. Denmark",
        "body": "5 to 1",
        "icon": "firebase-logo.png",
        "click_action": "http://localhost:8000",
    }

    client_token = 'eEv7nnjyky_D0nMTiF2E4l:APA91bGl51ePfPqyJAE1i_fqG5TMAyv7pe5AbnEUtVw2uGEVMaC8QlUWacP4WSadPBreY9QMfUYePOczEL-XXXKQWgniyyK8DZU1Qxqz29AQ_0D82u0-hD_UGKtpsSlTmshTwFzCJ7tz'

    payload = {
        'notification': msg,
        'to': client_token,
    }

    payload = json.dumps(payload)

    response = requests.request("POST", url, headers=headers, data=payload)

    print(response.text.encode('utf8'))


send_notification()


# url = "https://fcm.googleapis.com/fcm/send"

# payload = "{\r\n    \"notification\": {\r\n        \"title\": \"Portugal vs. Denmark\",\r\n        \"body\": \"5 to 1\",\r\n        \"icon\": \"firebase-logo.png\",\r\n        \"click_action\": \"http://localhost:8081\"\r\n    },\r\n    \"to\": \"eEv7nnjyky_D0nMTiF2E4l:APA91bGl51ePfPqyJAE1i_fqG5TMAyv7pe5AbnEUtVw2uGEVMaC8QlUWacP4WSadPBreY9QMfUYePOczEL-XXXKQWgniyyK8DZU1Qxqz29AQ_0D82u0-hD_UGKtpsSlTmshTwFzCJ7tz\"\r\n}"
# headers = {
#     'Authorization': 'key=AAAA0DWbfOI:APA91bErDiwUoOMbvrQ3jOEAlTOj3_o9Zt6d4GBS8N_z17ZgVeyKiSOnnMPTx4RfWa9k5gQRdXcL6LAUOzwb-NbCIKVMyZS_dOPX5zIAn44aw9XreTb0s-AUH1Nr0wkSJK9jp3pwv_6y',
#     'Content-Type': 'application/json'
# }

# response = requests.request("POST", url, headers=headers, data=payload)

# print(response.text.encode('utf8'))
