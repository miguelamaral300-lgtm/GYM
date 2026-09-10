/* ---------------------------------------------------------------
   Project 80 — Firebase connection
   ---------------------------------------------------------------
   Paste your Firebase web config below, replacing the YOUR_... values.

   Where to find it:
     console.firebase.google.com
       -> your project
       -> gear icon (Project settings)
       -> scroll to "Your apps" -> Web app -> "SDK setup and configuration"
       -> choose "Config" and copy the values.

   If you have no web app registered yet, click the </> icon on that
   page to create one first. Nickname it "Project 80".

   These values are NOT secret. Firebase web config is designed to ship
   in public client code — your data is protected by the Firestore
   security rules in README.md, not by hiding these keys.
--------------------------------------------------------------- */
window.FIREBASE_CONFIG = {
  apiKey:            "YOUR_API_KEY",
  authDomain:        "YOUR_PROJECT.firebaseapp.com",
  projectId:         "YOUR_PROJECT_ID",
  storageBucket:     "YOUR_PROJECT.firebasestorage.app",
  messagingSenderId: "YOUR_SENDER_ID",
  appId:             "YOUR_APP_ID"
};
