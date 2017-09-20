/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();




//---------------------------------------------------------------
// Variables
//---------------------------------------------------------------

var topics = [
  {title: "Melbourne Restaurant", posts: 14, author: "Chloe877", date: "12/03/2017"},
    {title: "Coffee Mate", posts: 10, author: "Alex_03", date: "05/03/2017"},
    {title: "Travel", posts: 5, author: "GT1610", date: "19/02/2017"}
];


//---------------------------------------------------------------
// Function
//---------------------------------------------------------------

function showLoginPage() {

// Create the page

    var page = $("<div class= 'LoginPage'></div>");
    page.append("<h1 class= 'header2'>&nbsp;Login Page</h1><hr><br>");


// Add the username field


    var usernameLine = $("<p>Username:</p>");
    var usernameBox = $("<input type= 'text' id = 'username1'></input>");
    var passwordLine = $("<p>Password:</p>");
    var passwordBox = $("<input type= 'text' id = 'Password1'></input>");


    page.append(usernameLine);
    usernameLine.append(usernameBox);
    page.append(passwordLine);
    passwordLine.append(passwordBox);

// Add the login button

var loginBtn = $("<button>Login</button>");
page.append(loginBtn);

loginBtn.on("click", function(){

  try{
    var email = document.getElementById("username1").value;
    if(document.getElementById("username1").value == "") throw "the username can not be empty";
    if(document.getElementById("Password1").value == "") throw "the password can not be empty";


  }
  catch(err){
    var a = 10;
    alert(err);
  }

  if (a != 10)
  showForumTopics();

});



    $("#maincontent").html(page);

}

function showRegistrationPage() {

  // Create the page


    var page = $("<div class='RegistrationPage'></div>");
    page.append("<h1 class= 'header3'>Registration Page</h1><hr><br>");

    // Add the username field


        var usernameLine = $("<p>Username:</p>");
        var usernameBox = $("<input type= 'text' id = 'username2'></input>");
        var passwordLine = $("<p>Password:</p>");
        var passwordBox = $("<input type= 'text' id = 'password2'></input>");
        var emailLine = $("<p>Email:</p>");
        var emailBox = $("<input type= 'text' id = 'email'></input>");
        var phoneLine = $("<p>Phone:</p>");
        var phoneBox = $("<input type= 'text' id = 'phone'></input>");


        page.append(usernameLine);
        usernameLine.append(usernameBox);
        page.append(passwordLine);
        passwordLine.append(passwordBox);
        page.append(emailLine);
        emailLine.append(emailBox);
        page.append(phoneLine);
        phoneLine.append(phoneBox);

        var RegisterBtn = $("<button>Register</button>");
        page.append(RegisterBtn);

        RegisterBtn.on("click", function(){



          function validateEmail(email) {
          var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return re.test(email);
        }




          try{
            var email = document.getElementById("email").value;
            if(document.getElementById("username2").value == "") throw "the username can not be empty";
            if(document.getElementById("phone").value == "") throw "the phone can not be empty";
            if(document.getElementById("password2").value == "") throw "the Password can not be empty";
            if (validateEmail(email)){}
            else throw "the email adress was not valid";

          }
          catch(err){
          var  x = 1
            alert(err);
          }

         if (x != 1)
          showLoginPage();

        });

    $("#maincontent").html(page);

}

function createTopicOnClick(node, topic){
  node.on("click", function() {
    showSingleTopic(topic);
  });
}

/**
    This function shows the lists of all forum topics.
    In Project 1, we are using static data.
    This function shows all topicsthat are in the "topics" variable.
*/
function addTopic() {
  var page = $("<div class='PostPage'></div>");
  page.append("<h1 class ='header4'>&nbsp;Add a Topic</h1><hr><br>");

  var topictitleLine = $("<p>Title:</p>");
  var topictitleBox = $("<input type= 'text' id = 'tittle'></input>");
  var topicpostLine = $("<p>Post:</p>");
  var topicpostBox = $("<form id= 'acForm' ><textarea id = 'textarea'></textarea></form>");


  page.append(topictitleLine);
  topictitleLine.append(topictitleBox);
  page.append(topicpostLine);
  topicpostLine.append(topicpostBox);



  var postBtn = $("<button>post</button>");
  page.append(postBtn);

  postBtn.on("click", function(){
    try{
      if (document.getElementById("tittle").value == "") throw "the tittle can not be empty"
      if (document.getElementById("textarea").value == "") throw "the content can not be empty"
    }

    catch(err){
      var p = 5
      alert(err);
    }

    if(p != 5){
    alert("We" + " " + "appreciate" + " " + "of" + " " + "your" + " " + "feedbacks");
    showForumTopics();
  }



  });

  $("#maincontent").html(page);
}


function showForumTopics() {
    var page = $("<div></div>");
    page.append("<h1 class ='header1'>&nbsp;ForumSystem Topics</h1><hr><br>");

    var topicTable = $("<table class = 'topicsTable' ><tr><th>Title</th><th>Posts</th><th>Author</th><th>Date</th></tr></table>");

        // Loop through all topics in the global variable "topics"
        for (index in topics) {
        	/*console.log(topics[index].title);*/
        	var row = $("<tr></tr>");
            row.append("<td>" + topics[index].title + " </td>");
            row.append("<td>" + topics[index].posts + " </td>");
            row.append("<td>" + topics[index].author + " </td>");
            row.append("<td>" + topics[index].date + " </td>");

          createTopicOnClick(row, topics[index]);
          topicTable.append(row);

      }

      page.append(topicTable);

      // Finally, add the page to our web app
    $("#maincontent").html(page);

}

function showSingleTopic(topicDetails){

    alert("Welcome" + " " + "to" + " " + topicDetails.title + " " + "Topics");

    var page = $("<div></div>");

    page.append("<h1 class='header5'> " +topicDetails.title+ " </h1><hr><br>");

//============================================================================================
//can not be used!!!!!!!!!!!!!!!! url:http://demos.jquerymobile.com/1.4.5/filterable/
//============================================================================================
    page.append("<form class='ui-filterable'><input id='filterBasic-input' data-type='search'></form><ul data-role='listview' data-input='#filterBasic-input' data-filter='true'><li>Acura</li><li>Audi</li><li>BMW</li><li>Cadillac</li><li>Ferrari</li></ul>");

    var postBtn2 = $("<button id='postBtn2' class='buttongroup'>New Post<img src ='img/plus.png' width='20px' height='20px'/></button>");

    page.append(postBtn2);

    postBtn2.on("click",function(){
      addTopic();
    });

    $("#maincontent").html(page);

}




/*
function showFacebook() {
  $ ('facebookBtn').click(function(){
    window.location.href= 'http://www.facebook.com';
    return false;

  });

}*/

/*$('#facebookBtn').click(function(){ window.location = 'http://www.facebook.com'});*/



//-----------------------------------------
// Web Application Load
//-----------------------------------------

$(document).ready(function(){
  $("#loginBtn").on("click", showLoginPage);
  $("#registerBtn").on("click", showRegistrationPage);
  $("#homeBtn").on("click", showForumTopics);
  // $("#postBtn").on("click", addTopic);



  /*$("#facebookBtn").on("click", showFacebook);*/


    //now show the forum topics
    showForumTopics();
});
