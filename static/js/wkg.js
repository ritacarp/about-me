


function ValidateEmail(mail)
{
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
  {
    //alert("ValidateEmail:  Email is valid")
    return (true)
  }

  //alert("You have entered an invalid email address!")
  return (false)
}

/*
function ValidatePhone(phone)
{
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(phone))
  {
    //alert("ValidatePhone:  Phone number is valid")
    return (true)
  }

  //alert("Invalid email address!!!")
  return (false)
}
*/
function ValidatePhone(phone) {
  var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  return phoneno.test(phone)
}






  var widgetID;

  var onloadCallback = function() {
    //alert("Included:  grecaptcha is ready!");
    widgetID = grecaptcha.render("captchaWidget",{"sitekey": "6LemSvYUAAAAAMVWLXdsLdKv780kPJ6d36fLEjq-", "theme": "dark"})
    //widgetID = grecaptcha.render("captchaWidget",{"sitekey": "6LePj_gUAAAAAEzv8_fvntvoWRnUw6o8B_T7zavi", "theme": "dark"})
  };




var correctCaptcha = function(response) {
    alert(response);
};



$(document).ready(function(){

	//alert("Included:   Document is ready");

   $("button#checkForm").on("click", function() {
       var msg = ""

       var fullName = $.trim($("input#name").val())
       var emailAddr = $.trim($("input#emailAddress").val())
       var phoneNumber = $.trim($("input#phone").val())
       var focusField

       //Business
       var favorite = [];
       $.each($("input[name='business']:checked"), function(){
                favorite.push($(this).val());
       });

       var allBusiness = favorite.join(", ")
       $("#allBusiness").val(allBusiness)
       //alert("Rita's favorite businesses are: " +  $("#allBusiness").val());


       //Interested In
       favorite = [];
       $.each($("input[name='interested']:checked"), function(){
                favorite.push($(this).val());
       });

       var allInterested = favorite.join(", ")
       $("#allInterested").val(allInterested)
       //alert("Rita is interested in: " +  $("#allInterested").val());

       //Colors
       favorite = [];
       $.each($("input[name='color']:checked"), function(){
                favorite.push($(this).val());
       });

       var allColor = favorite.join(", ")
       $("#allColors").val(allColor)
       //alert("Rita is color in: " +  $("#allColors").val());


       //alert("Checking name")
       if ( fullName == '' || fullName == 'Your Full Name') {
         msg = msg + "Full Name is required\n"
         if (!focusField) { focusField = "input#name" }
       }
       else
       {
          $("input#name").val(fullName)
       }

       //alert("Checking email")
       if ( emailAddr == '' || emailAddr == 'Valid Email Address') {
         msg = msg + "Email Address is required\n"
         if (!focusField) { focusField = "input#emailAddress" }
       }
       else {
          //alert("Calling ValidateEmail with emailAddr " + emailAddr)
          isValidEmail = ValidateEmail(emailAddr)
          if (! isValidEmail) {
             msg = msg + "Please enter a valid email address\n"
             if (!focusField) { focusField = "input#emailAddress" }
          }
          else
          {
             $("input#emailAddress").val(emailAddr)
          }
       }


       //alert("Checking phone number")
       if ( phoneNumber == '' || phoneNumber == 'Best number to reach you') {
         msg = msg + "Phone Number is required\n"
       }
       else {
          //alert("Checking isValidPhoneNumber")
          isValidPhoneNumber = ValidatePhone(phoneNumber)
          if (! isValidPhoneNumber) {
             msg = msg + "Please enter a valid phone number\n"
             if (!focusField) { focusField = "input#phone" }
          }
          else
          {
             $("input#phone").val(phoneNumber)
          }
       }

       var v = grecaptcha.getResponse();
       if(v.length == 0) {
          document.getElementById('captchaDiv').innerHTML="You can't leave Captcha Code empty";
          msg = msg + "You can't leave Captcha Code empty\n"
          //grecaptcha.reset(widgetID)
       }
       else
       {
          //document.getElementById('captchaWidget').innerHTML="Captcha completed";
          //msg = msg + "Captcha completed\n"
       }


       //alert("Done checking")

       if (msg != "") {
          alert(msg)
          if (focusField) { $(focusField).focus() }
          return false;
       }
       else
       {
          //alert("Hurray")
          return true;
       }

   });


});


