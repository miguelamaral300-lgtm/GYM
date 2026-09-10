# Project 80

A daily protocol tracker. Day score out of 100, what's-left list, times, macros,
habits, full training log with plate maths, streaks, and weight trend toward
80 kg at the same waist.

Runs as a static site. Works offline. Installs to a phone home screen.
Data syncs across devices through Firebase (optional — without it, everything
still works and saves in the browser).

---

## 1. Publish it (2 minutes)

1. Upload every file in this folder to the root of the repo
   (GitHub → **Add file** → **Upload files** → drag them all in → **Commit**).
2. Repo → **Settings** → **Pages**.
3. Under **Source** pick **Deploy from a branch**; branch **main**, folder **/ (root)**. Save.
4. Wait ~1 minute. Your URL is:

   `https://miguelamaral300-lgtm.github.io/GYM/`

That URL already works — it will save to whichever browser you open it in.

## 2. Add it to your phone

Open the URL on your phone, then:

- **iPhone (Safari)** — Share → **Add to Home Screen**
- **Android (Chrome)** — ⋮ → **Add to Home screen** / **Install app**

It opens full-screen with its own icon and works with no signal.

## 3. Turn on cross-device sync (optional but worth it)

Without this, your phone and laptop keep separate data.

### a. Get your Firebase config

console.firebase.google.com → your project → ⚙ **Project settings** →
**Your apps** → Web app → **SDK setup and configuration** → **Config**.

No web app yet? Click the `</>` icon on that page and create one. Call it "Project 80".

Paste the six values into **`firebase-config.js`** and re-upload that one file.

These values are not secret. Firebase web config is meant to ship in public
client code — your data is protected by the rules in step (c), not by hiding keys.

### b. Enable Google sign-in

Firebase console → **Build** → **Authentication** → **Get started** →
**Sign-in method** → enable **Google** → Save.

Then **Authentication** → **Settings** → **Authorised domains** → **Add domain** →
`miguelamaral300-lgtm.github.io`

### c. Create the database and lock it down

Firebase console → **Build** → **Firestore Database** → **Create database** →
production mode → pick a region near you (europe-west2 for London).

Then the **Rules** tab. Replace everything with this and **Publish**:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{uid}/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == uid;
    }
  }
}
```

That means only you, signed in, can read or write your own data. Nobody else,
including anyone who finds the public URL.

### d. Sign in

Open the app, tap **Sign in to sync** at the bottom, choose your Google account.
The footer will show "Synced as <your email>". Do the same on your phone.

---

## Files

| File | What it is |
|---|---|
| `index.html` | The whole app — markup, styles, logic |
| `firebase-config.js` | The only file you edit. Your Firebase values |
| `manifest.webmanifest` | Makes it installable as an app |
| `sw.js` | Service worker — offline support |
| `icon-192.png`, `icon-512.png` | Home screen icons |

## Updating it later

Upload a new `index.html`, and bump `CACHE = "p80-v3"` in `sw.js` to `p80-v4`
so phones fetch the new version instead of the cached one.

## Scoring

Ten core items at 7 points, six extras at 5 — 100 total.

**Core:** wake by 07:15 · morning walk · office by 08:15 · 3 eggs ·
morning supplements · protein target · no caffeine after noon ·
trained or played · magnesium + glycine · bed by 23:15

**Extras:** 2.5 L water · hard stop 18:30 · evening walk + breathing ·
read at night · phone out of the bedroom · weighed in

A day of 60+ keeps the streak alive. A week is "won" with two sessions and
protein on five days — the minimum viable week.
