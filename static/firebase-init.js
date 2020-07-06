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


navigator.serviceWorker.register('/static/firebase-messaging-sw.js')
    .then(function (registration) {
        console.log('Service worker successfully registered.');
        console.log(registration);
        messaging.useServiceWorker(registration);

        // Get Instance ID token. Initially this makes a network call, once retrieved
        // subsequent calls to getToken will return from cache.
        messaging.getToken().then((currentToken) => {
            if (currentToken) {
                // sendTokenToServer(currentToken);
                // updateUIForPushEnabled(currentToken);
                console.log(currentToken);
            } else {
                // Show permission request.
                // updateUIForPushPermissionRequired();
                // setTokenSentToServer(false);
                console.log('No Instance ID token available. Request permission to generate one.');
            }
        }).catch((err) => {
            // showToken('Error retrieving Instance ID token. ', err);
            // setTokenSentToServer(false);
            console.log('An error occurred while retrieving token. ', err);
        });
    }).catch(function (err) {
        console.error('Unable to register service worker.', err);
    });
