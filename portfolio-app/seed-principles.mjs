// One-off script to seed the default "Principles" ticker content into
// Firestore content/skills. Reads admin credentials from env vars only -
// never hardcode credentials here. Delete this file after running once.
//
// Usage (PowerShell):
//   $env:ADMIN_EMAIL="you@example.com"; $env:ADMIN_PASSWORD="..."; node seed-principles.mjs

import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBUWDGS9hX6TH5n4e5Gb44Y6H82IuAyK_c',
  authDomain: 'portifolio-aff79.firebaseapp.com',
  projectId: 'portifolio-aff79',
  storageBucket: 'portifolio-aff79.firebasestorage.app',
  messagingSenderId: '988463836068',
  appId: '1:988463836068:web:2276936c1d2850e802ef31'
};

const principles = [
  { icon: '🎯', title: 'Solve the real problem', desc: 'Understand what actually needs fixing before writing a line of code.' },
  { icon: '🧩', title: 'Ship small, learn fast', desc: 'Break work into the smallest slice that can be tested and shipped.' },
  { icon: '🔍', title: 'Own your mistakes', desc: 'Surface and correct errors quickly and transparently.' },
  { icon: '🏗️', title: 'Design for change', desc: 'Favor clear boundaries and simple abstractions over clever ones.' },
  { icon: '🤝', title: 'Communicate clearly', desc: 'Write for the next engineer, including future me.' },
  { icon: '📈', title: 'Measure, then improve', desc: 'Use data to guide decisions, not gut feel.' }
];

async function main() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  if (!email || !password) {
    console.error('Set ADMIN_EMAIL and ADMIN_PASSWORD env vars before running.');
    process.exit(1);
  }

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const firestore = getFirestore(app);

  await signInWithEmailAndPassword(auth, email, password);

  const skillsRef = doc(firestore, 'content', 'skills');
  const snap = await getDoc(skillsRef);
  const existing = snap.exists() ? snap.data() : {};

  await updateDoc(skillsRef, { ...existing, principles });

  console.log(`Saved ${principles.length} principles to content/skills.`);
  process.exit(0);
}

main().catch(err => {
  console.error('Failed:', err);
  process.exit(1);
});
