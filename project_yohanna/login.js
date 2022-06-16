function loginHandler() {
    //get the username and password from the html
    var username = document.getElementById("email-login").value;
    var password = document.getElementById("password-login").value;

    if ((username.length != 0) && (password.length != 0)) { //check inputs

        //GET request
        $.ajax({
            url: "login.php",
            type: "GET",
            data: { //send username and password
                username: username,
                password: password
            },
            datatype: 'JSON',

            success: function(res) { //on success of login in php
                var res = JSON.parse(res);

                if (res.valid === true) { //check response
                    console.log("Succesfully logged in");
                    alert(res["username"]);
                    //store the values in the sessionStorage to be used later
                    sessionStorage.setItem("username", res["username"]);
                    sessionStorage.setItem("firstname", res["firstname"]);
                    sessionStorage.setItem("lastname", res["lastname"]);
                    window.location.href = "home.html";
                } else {
                    alert("username/password incorrect");
                }

            },
            failure: function(res) {
                console.log("Failed to login");


            }
        });


    } else { //if there's no input
        alert("Fields could not be null");
    }

}

function signupHandler() { //if sign up button is pressed, redirect to sign up page
    window.location.href = "signup.html";
}

$(document).ready(function() {
    username = sessionStorage.getItem("username"); //session storage is used for storing variables
    //if loged in remove the sign up and login from the nav bar
    if ((username != null) && (typeof username !== 'undefined')) {
        firstname = sessionStorage.getItem("firstname");
        lastname = sessionStorage.getItem("lastname");
        //remove login and sign up
        document.getElementById("login1").removeChild(document.getElementById("n1"));
        //print the name in the nav bar instead
        document.getElementById("signup1").removeChild(document.getElementById("n2"));
        var name = document.createElement("a");
        name.setAttribute("class", "navBarBlockA");
        name.innerText = firstname + " " + lastname;
        name.style.float = "right";

        document.getElementById("signup1").appendChild(name);

    }
})