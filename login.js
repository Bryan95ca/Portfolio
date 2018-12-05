let currentUser = {};

//create new users. Users information will be sent and kept inside firebase.
function CreateNewUser(email, password) {
firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    let errorCode = error.code;
    let errorMessage = error.message;
    console.log(errorMessage)
    alert(errorMessage)

   });
}

//existing users. Will be logged and kept in firebase.
function SignIn(email, password){
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        let errorCode = error.code;
        let errorMessage = error.message;
        console.log(errorMessage)
        alert(errorMessage) //change alert message style (pop-up).
        // ...
      });
}

//signal to firebase to signout user.
$("#signOut").click(function(){
    firebase.auth().signOut();
    alert("logged out")
});

//input---will save to firebase Creating new User
$("#newAccount").click(function(){
    let email = $("#email").val();
    let password = $("#password").val();
    console.log("New user:" + email + " " + password);
    CreateNewUser(email, password);
});
//input--re-sign in. information will be saved in firebase -- Login exisiting User
$("#signIn").click(function(){
    let email = $("#email").val();
    let password = $("#password").val();
    console.log("Existing User:" + email + " " + password);
    SignIn(email, password);
});
//logged in
firebase.auth().onAuthStateChanged(function(user){
    if (user){
        let email = user.email;
        currentUser = user;
        writeUserData(user);
        console.log(currentUser.email + " has logged in")
    } else {

    }
});

//blog page, info will be input through page and sent through database. Print info to different page with collapsed information.
$("#submitButton").click(function(){
//print blog post -- write to firebase database
let blogger = {
    id: $("#title").val(),
    owner: currentUser.uid,
    opinion: $("#argueOption :selected").val(),
    detail: $("#textArea").val(),
    URL: $("#TextArea2").val(),
    File: $("#fileUpload").val()
}
addBlogToDatabase(blogger);
});
//print blog post and send sava data to firebase
function addBlogToDatabase(box){
    let database = firebase.database();
    firebase.database().ref("blog/" + box.id).set(box);
}


//print blog post and send sava data to firebase
function addBlogToDatabase(box){
    let database = firebase.database();
    firebase.database().ref("blog/" + box.id).set(box);
}

//users data to database -- user branch
function writeUserData(user) {
    let database = firebase.database();
    firebase.database().ref('users/' + user.uid).set({
    email: user.email,
    });
}

//authentication. -- user information and verification
firebase.auth().onAuthStateChanged(function(user) {
    if (user) { // User is signed in.
      
      let displayName = user.displayName;
      let email = user.email;
      let emailVerified = user.emailVerified;
      let photoURL = user.photoURL;
      let isAnonymous = user.isAnonymous;
      let uid = user.uid;
      let providerData = user.providerData;
      console.log(user) 
    } else {
      // User is signed out.
    }
  });


  /*

  service cloud.firestore {
      match /databases/{database}/documents {

        match /{document=**} -- apply rules match /products/"u.id(98asdf8932)--grab specific data from user, match/products/{productId} -- wild card/best method"
        //read rules
        allow get; -- specific document
        allow list; --group of document
        

        //write rules
        allow create; -- create data
        allow update; --update data
        allow delete; --delete data

        match /products/{productsId} {
            allow read;
            allow delete: if request.auth != null; --will allow users to read data and delete if they are logged in //doesnt read very well
            allow write: if isOwner(userId) && emailVerified(); --if user has verfied email**
        }
    }
  }

  //functions//

  function emailVerified(){
      return request.auth.token.email_verified -- if user has verified email**
  }
  function isOwner(userId){
      return request.auth.uid == userId
  }

  function isSignedIn(){
      return request.auth != null
  }
  */
  

  /*
  .read access to data
  .write control data create edit delete
  .validate - format data

  {
      "rules":{
          "posts": {
              "$uid": {
                  ".read": "$uid === auth.uid",
                  ".write": "$uid === auth.uid"
              }
          }
      }
  } -- users control data they make

    {
      "rules":{
          "posts": {
              "$uid": {
                  ".write": "root.child('users').child('moderator'.val()=== true"
              }
          }
      }
  } -- users who have have been flagged as mods to write data in database -- root to traverse where to point is.

    {
      "rules":{
          "posts": {
              "$uid": {
                  ".validate": "newData.isString()
                  && newData.val().length > 0
                  && newData.val() <= 140"
              }
          }
      }
  } -- validate integrity and format of data.

      {
      "rules":{
          "posts": {
              "$uid": {
                  "timestamp": {
                  ".validate": "newData.val() <= now"
                }
              }
          }
      }
  } -- validate if something falls within a certain timestamp

        {
      "rules":{
          "posts": {
              "$uid": {
                ".validate": "newData".hasChildren(['username', 'timestamp'])
              }
          }
      }
  } -- new data has certain child elements, and passing array of attributes to check

        {
      "rules":{
          "posts": {
              "$uid": {
                ".write": "!data.exists()"
              }
          }
      }
  } -- if data exist . can control if user can contorl or delete data


  */