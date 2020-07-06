importScripts('https://www.gstatic.com/firebasejs/7.15.5/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.15.5/firebase-messaging.js');

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

const messaging = firebase.messaging();

// messaging.setBackgroundMessageHandler(function (payload) {
//     console.log('[firebase-messaging-sw.js] Received background message ', payload);
//     // Customize notification here
//     const notificationTitle = 'Background Message Title';
//     const notificationOptions = {
//         body: 'Background Message body.',
//         icon: '/firebase-logo.png'
//     };

//     return self.registration.showNotification(notificationTitle,
//         notificationOptions);
// });

// // Get Instance ID token. Initially this makes a network call, once retrieved
// // subsequent calls to getToken will return from cache.
// messaging.getToken().then((currentToken) => {
//     if (currentToken) {
//         sendTokenToServer(currentToken);
//         updateUIForPushEnabled(currentToken);
//     } else {
//         // Show permission request.
//         console.log('No Instance ID token available. Request permission to generate one.');
//         // Show permission UI.
//         updateUIForPushPermissionRequired();
//         setTokenSentToServer(false);
//     }
// }).catch((err) => {
//     console.log('An error occurred while retrieving token. ', err);
//     showToken('Error retrieving Instance ID token. ', err);
//     setTokenSentToServer(false);
// });