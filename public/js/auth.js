(function() {
  var currentLoggedInUser = null;

  function getCSRF() {
    var csrf = $('#_csrf').val();
    console.log("csrf is: " + csrf);
    return csrf;
  }

  function refreshAuthUI(email) {
    currentLoggedInUser = email;
    $("#header li").hide();
    if (email) {
      $("#loggedin #email").text(email);
      $("#loggedin").show();
    } else {
      $("#loggedin #email").text("");
      $("#loggedout").show();
    }
    $("button").removeAttr('disabled').css('opacity', '1');
  }

  // Check the login status
  $.get('/auth/status', function(data) {
    navigator.id.watch({
      loggedInUser: currentLoggedInUser,

      onlogin: function(assertion) {
        $("#header li").hide();
        $("#loading").text('Ok, hang on while I do some stuff ...').show();
        $.post(
          '/auth/login',
          {assertion: assertion, _csrf: getCSRF()},
          function success(data, status, xhr) {
            try {
              if (status !== 'success') throw data;
              if (data.status !== 'okay') throw data.reason;
              refreshAuthUI(data.email);
            } catch (err) {
              alert(err);
            }
          }
        );
      },

      onlogout: function() {
        refreshAuthUI(null);
      },
      onready: function() {
        refreshAuthUI(data.email);
      }
    });

    $("#login").click(function(evt) {
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
      evt.preventDefault();
      navigator.id.logout();
    });
  });
})();
