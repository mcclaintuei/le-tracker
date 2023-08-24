
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const auth = firebase.auth()
const database = firebase.database()

//Register Function
function register() {
    //Get all input fields
    full_name = document.getElementById('full_name').value
    email = document.getElementById('email').value
    password = document.getElementById('password').value

    if (validate_email(email) == false || validate_password(password) == false) {
        alert('Email & Password Are Required')
        return
        //End Code
    }
    if (validate_field(full_name) == false) {
        alert('Name is requred')
        return
    }

    auth.createUserWithEmailAndPassword(email, password)
    .then(function(){
        
        const user = auth.currentUser

        //Add user to database
        const database_ref = database.ref()

        //Create user data
        const user_data = {
            email : email,
            full_name : full_name,
            last_login : Date.now()
        }

        database_ref.child('users/' + user.uid).set(user_data)


        alert('User Created')

    }).catch(function(error){

    })

}

function validate_email(email) {
    expression = /^[^@]+@\w+(\.\w+)+\w$/
    if (expression.test(email) == true) {
        return true
    } else {
        return false
    }
}

function validate_password(password) {
    if (password < 6) {
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