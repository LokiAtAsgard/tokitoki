import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getFirestore, doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBAudSrlFFYf-2hklnNujgIQnWq5oqVtgY",
    authDomain: "chat-app-df5eb.firebaseapp.com",
    projectId: "chat-app-df5eb",
    storageBucket: "chat-app-df5eb.appspot.com",
    messagingSenderId: "41928173902",
    appId: "1:41928173902:web:54ca9cc87f3fa8c3b0961f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Back to Chat Button
document.getElementById("back-to-chat-btn").addEventListener("click", () => {
    window.location.href = "tokitoki.html";
});

// Load current user's profile
onAuthStateChanged(auth, async (user) => {
    if (user) {
        const profileRef = doc(db, "profiles", user.uid);
        const profileSnap = await getDoc(profileRef);

        if (profileSnap.exists()) {
            const profileData = profileSnap.data();
            document.getElementById("username").value = profileData.username || "";
            document.getElementById("bio").value = profileData.bio || "";
            document.getElementById("photoURL").value = profileData.photoURL || "";
        } else {
            console.log("No profile found for this user.");
        }
    } else {
        alert("Please sign in to edit your profile.");
        window.location.href = "index.html"; // Redirect to login page if not signed in
    }
});

// Save changes to profile
document.getElementById("profile-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    const user = auth.currentUser;

    if (user) {
        const profileRef = doc(db, "profiles", user.uid);
        await updateDoc(profileRef, {
            username: document.getElementById("username").value,
            bio: document.getElementById("bio").value,
            photoURL: document.getElementById("photoURL").value
        });
        alert("Profile updated successfully!");
    }
});