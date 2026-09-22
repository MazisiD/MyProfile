import { initializeApp } from 'firebase/app';
import { initializeFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { environment } from '../../environments/environment';

// Single shared Firebase app instance used by ContentService and AuthService.
const firebaseApp = initializeApp(environment.firebase);

// ignoreUndefinedProperties: optional model fields (liveUrl, sourceUrl,
// demoVideoUrl, etc.) are often `undefined` in memory for docs that never set
// them. The default Firestore client throws on `undefined` values in
// setDoc/updateDoc, silently failing the *entire* write - this option makes
// it skip those fields instead of erroring out.
export const firestore = initializeFirestore(firebaseApp, { ignoreUndefinedProperties: true });
export const auth = getAuth(firebaseApp);

// True once the placeholder values in environment.ts have been replaced with
// a real Firebase project config. Used to skip live listeners/auth checks
// (e.g. during unit tests or before the site owner has set up Firebase),
// avoiding pointless network calls against a non-existent project.
export const isFirebaseConfigured = environment.firebase.apiKey !== 'YOUR_API_KEY';

