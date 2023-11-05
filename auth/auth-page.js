import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getFirestore, collection, getDocs, addDoc, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";
import {
    getAuth, createUserWithEmailAndPassword,
    signInWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile,
    sendEmailVerification, updatePassword, updateEmail
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyDU95mBEwswXTrehr6-awwFxPNMOqnEscM",
    authDomain: "peak-suprstate-384109.firebaseapp.com",
    projectId: "peak-suprstate-384109",
    storageBucket: "peak-suprstate-384109.appspot.com",
    messagingSenderId: "764256186835",
    appId: "1:764256186835:web:ecdecc4c9b5bd4bb1e7f26",
    measurementId: "G-QG56KL9Y1R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const database = getFirestore();






const currentPage = window.location.pathname;
if (currentPage == '/auth/register.html') {
    document.querySelector('.register').addEventListener('click', register)
    document.getElementById('password').addEventListener('keydown', (e) => {
        if (e.key === "Enter") {
            register()
        }

    })
    document.querySelector('.login-btn').addEventListener('click', () => {
        window.location.href = 'login.html'
    });

}



function register() {
    // Get all input fields
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (validate_email(email) == false || validate_password(password) == false) {
        alert('Email & Password Are Required');
        return;
    }
    if (validate_field(username) == false) {
        alert('Name is required');
        return;
    }

    var regex = /^[A-Za-z]+$/;
    if (!regex.test(username)) {
        alert("Username must be one word with no numbers, space or special characters.");
        return;
    }

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            const uid = user.uid;
            updateProfile(user, {
                displayName: username
            })
            const userRef = doc(database, 'users', uid); // Create a Firestore document reference

            const user_data = {
                email: email,
                username: username,
                last_login: Date.now()
            };

            setDoc(userRef, user_data)
                .then(() => {
                    alert('Account Created');
                    window.location.href = '/'
                })
                .catch((error) => {
                    console.error('Error adding user data to Firestore:', error);
                });

        })
        .catch((error) => {
            console.log(error);
        });
}

// ...




if (currentPage == '/auth/login.html') {
    document.querySelector('.login-btn').addEventListener('click', login);
    document.querySelector('.register-btn').addEventListener('click', () => {
        window.location.href = 'register.html'
    });

}
function login() {
    // Get the user's input for email and password
    const email = document.getElementById('login_email').value;
    const password = document.getElementById('login_password').value;
    console.log('loging initiated')

    if (validate_email(email) === false || validate_password(password) === false) {
        alert('Invalid email or password');
        return;
    }

    const auth = getAuth();

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Successfully logged in
            const user = userCredential.user;
            console.log('User logged in:', user);
            window.location.href = '/';
        })
        .catch((error) => {
            // Handle login errors
            console.error(error);
            alert('Login failed. Please check your email and password.');
        });
}



function validate_email(input_email) {
    const expression = /^[^@]+@\w+(\.\w+)+\w$/;
    return expression.test(input_email);
}


function validate_password(password) {
    if (password.length < 6) {
        return false
    } else {
        return true
    }
}

function validate_field(field) {
    if (field == null) {
        return false
    }
    if (field.length <= 0) {
        return false
    } else {
        return true
    }
}


// Function to check if a user is logged in
function checkUserAuthStatus(callback) {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is logged in
            callback(true);

        } else {
            // User is not logged in
            callback(false);
        }
    });
}

checkUserAuthStatus((isUserLoggedIn) => {
    const currentPage = window.location.pathname;

    if (!isUserLoggedIn && currentPage == '/') {
        window.location.href = 'auth/login.html';
    }
});



if (currentPage == '/' || currentPage == '/index.html') {

    document.querySelector('.logout').addEventListener('click', logout);
    document.querySelector('.profile').addEventListener('click', () => {
        window.location.href = 'profile.html'

    })
    let isProfileMenuVisible = false;
    document.querySelector('.profile-icon-container')
        .addEventListener('click', () => {
            const profileMenu = document.querySelector('.profile-popup')
            if (isProfileMenuVisible) {
                profileMenu.style.height = "0px"
            } else {
                profileMenu.style.height = "7rem"
            }
            isProfileMenuVisible = !isProfileMenuVisible;

        })

}

// Log the user out
function logout() {
    console.log("Attempting logout")
    signOut(auth)
        .then(() => {
            // User has been logged out
            console.log("User logged out");
            window.location.href = '/auth/login.html';
        })
        .catch((error) => {
            // Handle logout errors
            console.error("Logout error:", error);
        });
}




function validateForm() {
    var usernameInput = document.getElementById("username");
    var usernameValue = usernameInput.value;

    // Regular expression to match a single word with caps (no numbers or special characters)
    var regex = /^[A-Za-z]+$/;

    if (!regex.test(usernameValue)) {
        alert("Username must be one word with no numbers, space or special characters.");
        return false; // Prevent form submission
    }

    return true; // Allow form submission
}


//Update User Profile | Fetch User Details and display
if (currentPage == '/profile.html') {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const userUid = user.uid;
            console.log(`User is signed in with UID: ${userUid}`);
            const displayName = user.displayName
            const email = user.email;
            const photoURL = user.photoURL;
            const emailVerified = user.emailVerified;
            console.log(displayName, email, photoURL, emailVerified)
            const profileForm = document.querySelector('#profile-details')
            profileForm.username.value = displayName
            profileForm.email.value = email

        }
    })
    document.querySelector('#submit-profile-update')
        .addEventListener('click', (e) => {
            const profileForm = document.querySelector('#profile-details')
            e.preventDefault()
            validateForm()
            updateProfile(auth.currentUser, {
                displayName: profileForm.username.value,
            }).then(() => {
                alert('Username updated')
            }).catch((error) => {
                console.log(error)
            });
            updateEmail(auth.currentUser, profileForm.email.value).then(() => {
                alert('Email updated')
            }).catch((error) => {
                console.log(error)
            });
        })
}


