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

var posta = 14

window.baseUrl = " http://introtoapps.com/datastore.php?=list&appid=216328682"

window.forumtopics = [];
window.userarray = [];

var topics = [
  {title: "Melbourne Restaurant", posts: posta, author: "Chloe877", date: "12/03/2017"},
    {title: "Travel", posts: 10, author: "Alex_03", date: "05/03/2017"},
    {title: "Career advise", posts: 5, author: "Martin_GOD", date: "19/02/2017"}
];


//---------------------------------------------------------------
// Function
//---------------------------------------------------------------

function showForumTopics() {
    var page = $("<div></div>");
    page.append("<h1 class ='header1'>&nbsp;Melbourne help center</h1><hr><br>");

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

function showLoginPage() {

// Create the page

    var page = $("<div class= 'LoginPage'></div>");
    page.append("<h1 class= 'header2'>&nbsp;Login Page</h1><hr><br>");


// Add the username field


    var usernameLine = $("<p>Username:</p>");
    var usernameBox = $("<input type= 'text' id = 'username1'></input>");
    var passwordLine = $("<p>Password:</p>");
    var passwordBox = $("<input type= 'password' id = 'Password1'></input>");



    page.append(usernameLine);
    usernameLine.append(usernameBox);
    page.append(passwordLine);
    passwordLine.append(passwordBox);

// Add the login button

var loginBtn = $("<button>Login</button>");
page.append(loginBtn);

var rememberBtn = $("<button>Remember the username</button>");
page.append(rememberBtn);
rememberBtn.on("click", function(){
     localStorage.username = document.getElementById("username1").value;
})


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

  if (a != 10){
      //&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
      var userid = document.getElementById("username1").value;
      var userpassword1 = document.getElementById("Password1").value;
      var userpassword = sha256(userpassword1);
      alert(userpassword);

      var url = baseUrl + "&action=load&objectid=" + encodeURIComponent(userid) + ".user";
      $.ajax({
          url:url,
          cache:false
      })
      .done(function( data ){
          alert(data);
      window.userarray = JSON.parse(data);
      if(userarray.password != userpassword) {alert("the password was wrong!")}
      if(userarray.password == userpassword) {alert("Welcome!")
        showForumTopics()}



    })
  //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  // var username0 = document.getElementById("username1").value;
  //
  // var loadreturnvalue = new XMLHttpRequest();
  //
  // loadreturnvalue.open("get", encodeURI("http://introtoapps.com/datastore.php?action=load&appid=216328682&objectid=" + username0), false);
  //
  // loadreturnvalue.send(null);
  //￥￥￥￥￥￥￥￥￥￥￥￥￥￥￥￥￥￥￥￥￥￥￥￥￥￥￥￥￥￥￥￥￥￥￥￥￥￥￥￥￥￥￥￥￥￥
}
});



    $("#maincontent").html(page);
    if (localStorage.getItem("username") != null){
    document.getElementById("username1").value = localStorage.username;
    }

}

//===============================================================
//data base function============================================
//=================================================================


function createUser(_username,_password){
  var userObject = {
    username:_username,
    password:_password,
  };

  var data = JSON.stringify(userObject);

  alert(data);

  var url = baseUrl + "&action=save&objectid=" + encodeURIComponent(_username) + ".user&data="
  + encodeURIComponent(data);

  alert(url);

  $.ajax({
    url:url,
    cache:false
  })
  .done(function( data ){
    alert(data);
  })
  .fail(function( jqXHR, textStatus ) {
alert( "Request failed: " + textStatus );
});

}

//=============================================================
// create forum topic database function
//==============================================================


function createForum(_title,_post){
  var forumObject = {
    title:_title,
    post:_post,
  };

  var data = JSON.stringify(forumObject);

  alert(data);

  var url = baseUrl + "&action=append&objectid=forumtopics&data=" + encodeURIComponent(data);

  alert(url);

  $.ajax({
    url:url,
    cache:false
  })
  .done(function( data ){
    alert(data);
  })
  .fail(function( jqXHR, textStatus ) {
alert( "Request failed: " + textStatus );
});

}


function showRegistrationPage() {

  // Create the page


    var page = $("<div class='RegistrationPage'></div>");
    page.append("<h1 class= 'header3'>Registration Page</h1><hr><br>");

    // Add the username field


        var usernameLine = $("<p>Username:</p>");
        var usernameBox = $("<input type= 'text' id = 'username2'></input>");
        var passwordLine = $("<p>Password:</p>");
        var passwordBox = $("<input type= 'password' id = 'password2'></input>");
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

         if (x != 1){
             var username3 = document.getElementById("username2").value;
             var password3 = document.getElementById("password2").value;
             var password4 = sha256(password3);
          showLoginPage();

          createUser(username3,password4);
}
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
    posta = posta+1;
    topics[0].posts = posta;
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
    var title1 = document.getElementById("tittle").value;
    var post1 = document.getElementById("textarea").value;
    createForum(title1,post1);
    showForumTopics();
  }



  });

  $("#maincontent").html(page);
}


function showSingleTopic(topicDetails){

  if(topicDetails.title == "Melbourne Restaurant"){
      alert("Welcome" + " " + "to" + " " + topicDetails.title + " " + "Topics");

      var page = $("<div></div>");

      page.append("<h1 class='header5'> " +topicDetails.title+ " </h1><hr><br>");
      var postBtn2 = $("<button id='postBtn2' class='buttongroup'>New Post<img src ='img/plus.png' width='20px' height='20px'/></button>");

      page.append(postBtn2);

  //============================================================================================
  //can not be used!!!!!!!!!!!!!!!! url:http://demos.jquerymobile.com/1.4.5/filterable/
  //============================================================================================
  //page.append("<form class='ui-filterable'><input id='filterBasic-input' data-type='search'></form><ul data-role='listview' data-input='#filterBasic-input' data-filter='true'><li>Acura</li><li>Audi</li><li>BMW</li><li>Cadillac</li><li>Ferrari</li></ul>");

      page.append("<ons-list-item><div class='left'><img class='list-item__thumbnail' src='img/tral.png'></div><div class='center'><span class='list-item__title'>Subway</span><span class='list-item__subtitle'>On the Internet</span></div><div class='right'><ons-button modifier='quiet' id='replybtn1'>reply</ons-button></div></ons-list-item>")

      page.append("<ons-list-item><div class='left'><img class='list-item__thumbnail' src='img/tral.png'></div><div class='center'><span class='list-item__title'>China bar</span><span class='list-item__subtitle'>On the Internet</span></div><div class='right'><ons-button modifier='quiet' id='replybtn2'>reply</ons-button></div></ons-list-item>")

      page.append("<ons-list-item><div class='left'><img class='list-item__thumbnail' src='img/tral.png'></div><div class='center'><span class='list-item__title'>coffee bar</span><span class='list-item__subtitle'>On the Internet</span></div><div class='right'><ons-button modifier='quiet' id='replybtn3'>reply</ons-button></div></ons-list-item>")
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$S
//use the data base to load the data
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
        var url = baseUrl + "&action=load&objectid=forumtopics";

        $.ajax({
            url:url,
            cache:false
                })

                .done(function( data ){
                    try{
                        alert("aaa" + data);
                        window.forumtopics = JSON.parse(data);
                        alert("www" + window.forumtopics);
                        //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
                        //use data persistence to remember the index
                        //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
                        if(localStorage.index == null)
                            localStorage.index = 0;
                        var a=0;
                        for (var index = localStorage.index; index < forumtopics.length; index++){
                            var topic = forumtopics[index].title;
                            alert(topic);
                            a++;
                            page.append("<ons-list-item><div class='left'><img class='list-item__thumbnail' src='img/tral.png'></div><div class='center'><span class='list-item__title'>" + topic + "</span><span class='list-item__subtitle'>On the Internet</span></div><div class='right'><ons-button modifier='quiet' id='replybtn3'>reply</ons-button></div></ons-list-item>")

                    }

                    localStorage.index = index-a;
                }
                    catch(e){
                        alert(e);}
                    })

                    .fail(function( jqXHR, textStatus ) {
                        alert( "Request failed: " + textStatus );
                    });





      postBtn2.on("click",function(){
        addTopic();
      });

      $("#maincontent").html(page);

      document.getElementById("replybtn1").onclick=function(){addTopic();};
      document.getElementById("replybtn2").onclick=function(){addTopic();};
      document.getElementById("replybtn3").onclick=function(){addTopic();};

  };


  if(topicDetails.title == "Career advise"){
      alert("Welcome" + " " + "to" + " " + topicDetails.title + " " + "Topics");

      var page = $("<div></div>");

      page.append("<h1 class='header5'> " +topicDetails.title+ " </h1><hr><br>");

      var postBtn2 = $("<button id='postBtn2' class='buttongroup'>New Post<img src ='img/plus.png' width='20px' height='20px'/></button>");

      page.append(postBtn2);

  //============================================================================================
  //can not be used!!!!!!!!!!!!!!!! url:http://demos.jquerymobile.com/1.4.5/filterable/
  //============================================================================================
  //page.append("<form class='ui-filterable'><input id='filterBasic-input' data-type='search'></form><ul data-role='listview' data-input='#filterBasic-input' data-filter='true'><li>Acura</li><li>Audi</li><li>BMW</li><li>Cadillac</li><li>Ferrari</li></ul>");

      page.append("<ons-list-item><div class='left'><img class='list-item__thumbnail' src='img/tral.png'></div><div class='center'><span class='list-item__title'>Student course</span><span class='list-item__subtitle'>On the Internet</span></div><div class='right'><ons-button modifier='quiet' id='replybtn1'>reply</ons-button></div></ons-list-item>")

      page.append("<ons-list-item><div class='left'><img class='list-item__thumbnail' src='img/tral.png'></div><div class='center'><span class='list-item__title'>Car rent</span><span class='list-item__subtitle'>On the Internet</span></div><div class='right'><ons-button modifier='quiet' id='replybtn2'>reply</ons-button></div></ons-list-item>")

      page.append("<ons-list-item><div class='left'><img class='list-item__thumbnail' src='img/tral.png'></div><div class='center'><span class='list-item__title'>House rent</span><span class='list-item__subtitle'>On the Internet</span></div><div class='right'><ons-button modifier='quiet' id='replybtn3'>reply</ons-button></div></ons-list-item>")

      //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$S
      //use the data base to load the data
      //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
              var url = baseUrl + "&action=load&objectid=forumtopics";

              $.ajax({
                  url:url,
                  cache:false
                      })

                      .done(function( data ){
                          try{
                              alert("aaa" + data);
                              window.forumtopics = JSON.parse(data);
                              alert("www" + window.forumtopics);
                              //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
                              //use data persistence to remember the index
                              //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
                              if(localStorage.index == null)
                                  localStorage.index = 0;
                              var a=0;
                              for (var index = localStorage.index; index < forumtopics.length; index++){
                                  var topic = forumtopics[index].title;
                                  alert(topic);
                                  a++;
                                  page.append("<ons-list-item><div class='left'><img class='list-item__thumbnail' src='img/tral.png'></div><div class='center'><span class='list-item__title'>" + topic + "</span><span class='list-item__subtitle'>On the Internet</span></div><div class='right'><ons-button modifier='quiet' id='replybtn3'>reply</ons-button></div></ons-list-item>")

                          }

                          localStorage.index = index-a;
                      }
                          catch(e){
                              alert(e);}
                          })

                          .fail(function( jqXHR, textStatus ) {
                              alert( "Request failed: " + textStatus );
                          });





      postBtn2.on("click",function(){
        addTopic();
      });

      $("#maincontent").html(page);

      document.getElementById("replybtn1").onclick=function(){addTopic();};
      document.getElementById("replybtn2").onclick=function(){addTopic();};
      document.getElementById("replybtn3").onclick=function(){addTopic();};

  };



if(topicDetails.title == "Travel"){
    alert("Welcome" + " " + "to" + " " + topicDetails.title + " " + "Topics");

    var page = $("<div></div>");

    var postBtn2 = $("<button id='postBtn2' class='buttongroup'>New Post<img src ='img/plus.png' width='20px' height='20px'/></button>");

    page.append(postBtn2);

    page.append("<h1 class='header5'> " +topicDetails.title+ " </h1><hr><br>");

//============================================================================================
//can not be used!!!!!!!!!!!!!!!! url:http://demos.jquerymobile.com/1.4.5/filterable/
//============================================================================================
//page.append("<form class='ui-filterable'><input id='filterBasic-input' data-type='search'></form><ul data-role='listview' data-input='#filterBasic-input' data-filter='true'><li>Acura</li><li>Audi</li><li>BMW</li><li>Cadillac</li><li>Ferrari</li></ul>");

    page.append("<ons-list-item><div class='left'><img class='list-item__thumbnail' src='img/tral.png'></div><div class='center'><span class='list-item__title'>Bus</span><span class='list-item__subtitle'>On the Internet</span></div><div class='right'><ons-button modifier='quiet' id='replybtn1'>reply</ons-button></div></ons-list-item>")

    page.append("<ons-list-item><div class='left'><img class='list-item__thumbnail' src='img/tral.png'></div><div class='center'><span class='list-item__title'>Taxi</span><span class='list-item__subtitle'>On the Internet</span></div><div class='right'><ons-button modifier='quiet' id='replybtn2'>reply</ons-button></div></ons-list-item>")

    page.append("<ons-list-item><div class='left'><img class='list-item__thumbnail' src='img/tral.png'></div><div class='center'><span class='list-item__title'>Tram</span><span class='list-item__subtitle'>On the Internet</span></div><div class='right'><ons-button modifier='quiet' id='replybtn3'>reply</ons-button></div></ons-list-item>")

    //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$S
    //use the data base to load the data
    //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
            var url = baseUrl + "&action=load&objectid=forumtopics";

            $.ajax({
                url:url,
                cache:false
                    })

                    .done(function( data ){
                        try{
                            alert("aaa" + data);
                            window.forumtopics = JSON.parse(data);
                            alert("www" + window.forumtopics);
                            //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
                            //use data persistence to remember the index
                            //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
                            if(localStorage.index == null)
                                localStorage.index = 0;
                            var a=0;
                            for (var index = localStorage.index; index < forumtopics.length; index++){
                                var topic = forumtopics[index].title;
                                alert(topic);
                                a++;
                                page.append("<ons-list-item><div class='left'><img class='list-item__thumbnail' src='img/tral.png'></div><div class='center'><span class='list-item__title'>" + topic + "</span><span class='list-item__subtitle'>On the Internet</span></div><div class='right'><ons-button modifier='quiet' id='replybtn3'>reply</ons-button></div></ons-list-item>")

                        }

                        localStorage.index = index-a;
                    }
                        catch(e){
                            alert(e);}
                        })

                        .fail(function( jqXHR, textStatus ) {
                            alert( "Request failed: " + textStatus );
                        });





    postBtn2.on("click",function(){
      addTopic();
    });

    $("#maincontent").html(page);

    document.getElementById("replybtn1").onclick=function(){addTopic();};
    document.getElementById("replybtn2").onclick=function(){addTopic();};
    document.getElementById("replybtn3").onclick=function(){addTopic();};

};
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
