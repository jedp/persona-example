(function() {
  var currentLoggedInUser = null;

  function getCSRF() {
    return $('#_csrf').val();
  }

  function refreshAuthUI(data) {
    data = data || {};
    currentLoggedInUser = data.email;
    var html = data.html || "";

    if (html) $("#content").html(html);
    $("#persona li").hide();
    if (currentLoggedInUser) {
      $("#loggedin #email").text(currentLoggedInUser);
      $("#loggedin").show();
    } else {
      $("#loggedin #email").text("");
      $("#loggedout").show();
    }
    $("#login").removeAttr('disabled').css('opacity', '1');
  }

  // Check the login status
  $.get('/auth/status', function(data) {
    console.log(JSON.stringify(data));
    navigator.id.watch({
      loggedInUser: currentLoggedInUser,

      onlogin: function(assertion) {
        console.log("onlogin called");
        $("#persona li").hide();
        $("#loading").text('Ok, hang on while I do some stuff ...').show();
        $.post(
          '/auth/login',
          {assertion: assertion, _csrf: getCSRF()},
          function success(data, status, xhr) {
            try {
              if (status !== 'success') throw data;
              if (data.status !== 'okay') throw data.reason;
              refreshAuthUI(data);
            } catch (err) {
              alert(err);
            }
          }
        );
      },

      onlogout: function() {
        console.log("onlogout called");
        $.post(
          '/auth/logout',
          {_csrf: getCSRF()},
          function success(data, status, xhr) {
            try {
              refreshAuthUI(data);
            } catch (err) {
              alert(err);
            }
          }
        );
      },
      onready: function() {
        console.log("onready called");
        refreshAuthUI(data);
      }
    });

    $("#login").click(function(evt) {
      console.log("login button clicked");
      evt.preventDefault();

      $("#login").attr('disabled', 'true').css('opacity', 0.3);
      navigator.id.request({
        termsOfService: '/tos.txt',
        privacyPolicy: '/pp.txt',
        siteName: 'Persona Demonstration',
        oncancel: function() {
          $("#login").removeAttr('disabled').css('opacity', '1');
        }
      });
    });

    $("#logout").click(function(evt) {
      console.log("logout button clicked");
      evt.preventDefault();
      navigator.id.logout();
    });
  });
})();
