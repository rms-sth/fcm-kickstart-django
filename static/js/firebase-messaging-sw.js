importScripts('https://www.gstatic.com/firebasejs/7.15.5/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.15.5/firebase-messaging.js');
importScripts('https://www.gstatic.com/firebaseinit.js');


// [START initialize_firebase_in_sw]
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


// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();
// [END initialize_firebase_in_sw]


// If you would like to customize notifications that are received in the
// background (Web app is closed or not in browser focus) then you should
// implement this optional method.
// [START background_handler]
messaging.setBackgroundMessageHandler(function (payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    const notificationTitle = 'Background Message Title';
    const notificationOptions = {
        body: 'Background Message body.',
        icon: '/firebase-logo.png'
    };

    return self.registration.showNotification(notificationTitle,
        notificationOptions);
});
// [END background_handler]