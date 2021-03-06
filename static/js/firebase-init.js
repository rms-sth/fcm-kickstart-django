// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAHi5ifT8seQu4NNKq7kSluakNWPYTqnI4",
    authDomain: "my-project-1544361602181.firebaseapp.com",
    databaseURL: "https://my-project-1544361602181.firebaseio.com",
    projectId: "my-project-1544361602181",
    storageBucket: "my-project-1544361602181.appspot.com",
    messagingSenderId: "894252580066",
    appId: "1:894252580066:web:bac9633a7efffdc738f2bb",
    measurementId: "G-447QMJDDVF"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

// Retrieve Firebase Messaging object.
const messaging = firebase.messaging();
// Add the public key generated from the console here.
messaging.usePublicVapidKey("BLo8KCWBfGsIXtie4oJL9rR2eS9MiTrBykf2eliygIODtswXAFlzuuaBwr4N8c8ZADYA9Ek8rNVeWMni6rzIJrk");

// IDs of divs that display Instance ID token UI or request permission UI.
const tokenDivId = 'token_div';
const permissionDivId = 'permission_div';

// loading firebase-messaging-sw.js 
loadServiceWorker();

function loadServiceWorker() {
    navigator.serviceWorker.register('/static/js/firebase-messaging-sw.js')
        .then(function (registration) {
            console.log('Service worker successfully registered.');
            console.log(registration);
            messaging.useServiceWorker(registration);

            // If SW successfully registered then register client token
            getRegisteredToken();

        }).catch(function (err) {
            console.error('Unable to register service worker.', err);
        });
}

function getRegisteredToken() {
    // Get Instance ID token. Initially this makes a network call, once retrieved
    // subsequent calls to getToken will return from cache.
    messaging.getToken().then((currentToken) => {
        if (currentToken) {
            sendTokenToServer(currentToken);
            updateUIForPushEnabled(currentToken);
            console.log(currentToken);
        } else {
            // Show permission request.
            updateUIForPushPermissionRequired();
            setTokenSentToServer(false);
            console.log('No Instance ID token available. Request permission to generate one.');
        }
    }).catch((err) => {
        showToken('Error retrieving Instance ID token. ', err);
        setTokenSentToServer(false);
        console.log('An error occurred while retrieving token. ', err);
    });
}

function resetUI() {
    clearMessages();
    showToken('loading new token...');
    getRegisteredToken();
}

// [START refresh_token]
// Callback fired if Instance ID token is updated.
messaging.onTokenRefresh(() => {
    messaging.getToken().then((refreshedToken) => {
        console.log('Token refreshed.');
        // Indicate that the new Instance ID token has not yet been sent to the
        // app server.
        setTokenSentToServer(false);
        // Send Instance ID token to app server.
        sendTokenToServer(refreshedToken);
        // [START_EXCLUDE]
        // Display new Instance ID token and clear UI of all previous messages.
        resetUI();
        // [END_EXCLUDE]
    }).catch((err) => {
        console.log('Unable to retrieve refreshed token ', err);
        showToken('Unable to retrieve refreshed token ', err);
    });
});
// [END refresh_token]



// [START receive_message]
// Handle incoming messages. Called when:
// - a message is received while the app has focus
// - the user clicks on an app notification created by a service worker
//   `messaging.setBackgroundMessageHandler` handler.
messaging.onMessage((payload) => {
    console.log('Message received. ', payload);
    // [START_EXCLUDE]
    let title = payload.data.title;
    let body = payload.data.body;
    let icon = payload.data.icon;

    const options = {
        title: title,
        body: body,
        icon: icon,
        image: icon,
        data: {
            time: new Date(Date.now()).toString(),
            click_action: payload.data.click_action
        }
    };

    var myNotification = new Notification(title, options)
    // open notification in new window
    myNotification.addEventListener("click", event => {
        let action_click = event.target.data.click_action;
        event.target.close();
        event.waitUntil(window.open(action_click));
    });
    // Update the UI to include the received message.
    appendMessage(payload);
    // [END_EXCLUDE]
});
// [END receive_message]

function myFunction(options) {
    console.log(options, '2222222222222')
    console.log(options.data.click_action, '2222222222222')
    let action_click = options.data.click_action;
    // event.notification.close();
    // event.waitUntil(clients.openWindow(action_click));
    clients.openWindow(action_click)
}


// Send the Instance ID token your application server, so that it can:
// - send messages back to this app
// - subscribe/unsubscribe the token from topics
function sendTokenToServer(currentToken) {
    if (!isTokenSentToServer()) {
        console.log('Sending token to server...');
        // TODO(developer): Send the current token to your server.
        // saving token in backend
        saveTokenToServer(currentToken); // look index.html for more info..
        // setting token sent in frontend
        setTokenSentToServer(true);
    } else {
        console.log('Token already sent to server so won\'t send it again ' +
            'unless it changes');
    }
}

function isTokenSentToServer() {
    return window.localStorage.getItem('sentToServer') === '1';
}

function setTokenSentToServer(sent) {
    window.localStorage.setItem('sentToServer', sent ? '1' : '0');
}

function showHideDiv(divId, show) {
    const div = document.querySelector('#' + divId);
    if (show) {
        div.style = 'display: visible';
    } else {
        div.style = 'display: none';
    }
}

function requestPermission() {
    console.log('Requesting permission...');
    // [START request_permission]
    Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
            console.log('Notification permission granted.');
            // TODO(developer): Retrieve an Instance ID token for use with FCM.
            // [START_EXCLUDE]
            // In many cases once an app has been granted notification permission,
            // it should update its UI reflecting this.
            resetUI();
            // [END_EXCLUDE]
        } else {
            console.log('Unable to get permission to notify.');
        }
    });
    // [END request_permission]
}

function deleteToken() {
    // Delete Instance ID token.
    // [START delete_token]
    messaging.getToken().then((currentToken) => {
        messaging.deleteToken(currentToken).then(() => {
            console.log('Token deleted.');
            setTokenSentToServer(false);
            // [START_EXCLUDE]
            // Once token is deleted update UI.
            resetUI();
            // [END_EXCLUDE]
        }).catch((err) => {
            console.log('Unable to delete token. ', err);
        });
        // [END delete_token]
    }).catch((err) => {
        console.log('Error retrieving Instance ID token. ', err);
        showToken('Error retrieving Instance ID token. ', err);
    });

}

// Add a message to the messages element.
function appendMessage(payload) {
    const messagesElement = document.querySelector('#messages');
    const dataHeaderELement = document.createElement('h5');
    const dataElement = document.createElement('pre');
    dataElement.style = 'overflow-x:hidden;';
    dataHeaderELement.textContent = 'Received message:';
    dataElement.textContent = JSON.stringify(payload, null, 2);
    messagesElement.appendChild(dataHeaderELement);
    messagesElement.appendChild(dataElement);
}

// Clear the messages element of all children.
function clearMessages() {
    const messagesElement = document.querySelector('#messages');
    while (messagesElement.hasChildNodes()) {
        messagesElement.removeChild(messagesElement.lastChild);
    }
}

function updateUIForPushEnabled(currentToken) {
    showHideDiv(tokenDivId, true);
    showHideDiv(permissionDivId, false);
    showToken(currentToken);
}

function updateUIForPushPermissionRequired() {
    showHideDiv(tokenDivId, false);
    showHideDiv(permissionDivId, true);
}

function showToken(currentToken) {
    // Show token in console and UI.
    const tokenElement = document.querySelector('#token');
    tokenElement.textContent = currentToken;
}
