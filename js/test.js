// 페이지 이동 함수 (signin-signup)
const signUpBtn = document.getElementById("signUp");
const signInBtn = document.getElementById("signIn");
const container = document.querySelector(".container");

signUpBtn.addEventListener("click", () => {
  container.classList.add("right-panel-active");
});
signInBtn.addEventListener("click", () => {
  container.classList.remove("right-panel-active");
});



// 로딩시 로그인 확인
const main_url = "http://127.0.0.1:8000"

window.onload = async function signincheck(){
    const payload = localStorage.getItem('payload')

    if (payload){
    const response = await fetch (`${main_url}/users/signin/`, {
        headers : {
            Authorization : localStorage.getItem('access')
        },
        method:"GET"
    })
    window.location.replace("main.html")
    }
} 


// 회원가입 valid 함수
function password_valid(password, password2) {
    if (password != password2) {
        alert("비밀번호가 일치하지 않습니다.");
        return false;
    }
    else {
        return true;
    }
}

// 회원가입
async function handleSignup(){    
    
    var username = document.getElementById("username").value
    var password = document.getElementById("password").value
    var password1 = document.getElementById("password1").value

    if (password_valid(password, password1)) {
        const response = await fetch(`${main_url}/users/signup/`, {
            headers:{
                'content-type' : 'application/json',
            },
            method:'POST',
            body: JSON.stringify({
                "username":username,
                "password":password,
                "password1":password1,
            })
        })
        if (response.status == 400){
            response_json = await response.json()
            let addHtml = response_json.message;
            document.getElementById('signup_message').innerHTML = addHtml;
            setTimeout(() => {
                document.getElementById('signup_message').remove()
            }, 2000)
            var username = document.getElementById("username")
            var password = document.getElementById("password")
            var password1 = document.getElementById("password1")
        
            username.value = null;
            password.value = null;
            password1.value = null;
        }
        else{
            window.location.replace("api.html")
        }
        
    }
    else {
        alert('다시 시도해주세요')
        window.location.reload()
    }
}


// 로그인
async function handleSignin(){
    var username = document.getElementById("in_username").value
    var password = document.getElementById("in_password").value

    const response = await fetch(`${main_url}/users/signin/`, {
        headers: {
            'content-type' : 'application/json',
        },
        method : 'POST',
        body : JSON.stringify({
            "username" : username,
            "password": password
        })
    })
    if (response.status == 400){
        alert('입력한 정보가 정확하지 않습니다. 다시 시도해주세요.')
        window.location.reload()

        response_json = await response.json()
        let addHtml = response_json.message;
        document.getElementById('signin_message').innerHTML = addHtml;
        setTimeout(() => {
            document.getElementById('signin_message').remove()
        }, 2000)
        var username = document.getElementById("username")
        var password = document.getElementById("password")
    
        username.value = null;
        password.value = null;
    }
    else{
        const response_json = await response.json()

        localStorage.setItem('access',response_json.access);
        localStorage.setItem('refresh', response_json.refresh);

        const base64Url = response_json.access.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g,'/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c){
            return '%' + ('00'+ c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        
        localStorage.setItem('payload', jsonPayload);

        window.location.replace("main.html")
    }
}

// 로그아웃
function handleLogout(){
    localStorage.clear()
    window.location.replace("api.html")
}

// google

function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};



function handleCredentialResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    const responsePayload = parseJwt(response.credential);
    console.log("Email: " + responsePayload.email); 
  }
  window.onload = function () {
    google.accounts.id.initialize({
      client_id: "1037687433426-vfv76m65kac9pfu1a33jujp9ua2k1jhl.apps.googleusercontent.com",
      callback: handleCredentialResponse
    });
    google.accounts.id.renderButton(
      document.getElementById("buttonDiv"),
      { theme: "outline", size: "large" }  // customization attributes
    );
    google.accounts.id.prompt(); // also display the One Tap dialog
    }

const GoogleStrategy = require('passport-google-oauth20').Strategy;

const config = {
    clientID: 'clientID',
    clientSecret: 'clientSecret',
    callbackURL: 'callbackUrl',
};


    


window.gapi.load('auth2', () => {
    const auth2 = window.gapi.auth2.init({ client_id })
    auth2.signIn().then(console.log)
  })


function onSignin(googleUser){
    var profile = googleUser.getBasicProfile();
    console.log('ID: '+ profile.getName());
    console.log('Email: '+ profile.getEmail());
}

function signOut(){
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function(){
        console.log('로그아웃 완료');
    });
}
