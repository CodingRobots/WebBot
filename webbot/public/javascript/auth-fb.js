(function() {
  var act_on_login, check_auth, force_login, globals, access_token, good_token;

  globals = typeof exports !== "undefined" && exports !== null ? exports : this;

  globals.appID = "247360712014477";

  globals.logged_in_callback = function(obj) {
    if (obj.error != null) {
      return alert("Some auth problem with facebook.  Failing.");
    } else {
      return;
    }
  };

  act_on_login = function(access_token) {
    var path, query, script, url;
    setCookie("auth_cookie",access_token);
    globals.access_token = access_token;
    path = "https://graph.facebook.com/me?";
    query = $.param({
      access_token: getCookie("auth_cookie"),
      callback: 'logged_in_callback'
    });
    url = path + query;
    script = document.createElement('script');
    script.src = url;
    return document.body.appendChild(script);
  };

  force_login = function() {
    if(getCookie("auth_cookie")==null)
    {
      var path, query, url;
      path = 'https://www.facebook.com/dialog/oauth?';
      query = $.param({
        client_id: globals.appID,
        redirect_uri: 'http://' + window.location.hostname,
        response_type: 'token'
      });
      url = path + query;
      return window.location = url;
    }
    else
    {
      redirect('/robots');
    }
  };

  check_auth = function()
  {
    if(getCookie("auth_cookie")==null)
    {
		var access_token;
		if (window.location.hash.length === 0) {
		  return force_login();
		} else {
		  access_token = window.location.hash.substring(14).split('&')[0];
		  setCookie('auth_cookie', access_token);
		  return act_on_login(access_token);
		}
    }
    else
    {
      return act_on_login(getCookie("auth_cookie"));
    }

  };


  setCookie = function(c_name,value)
  {
    $.cookie(c_name, value, { expires: 1 });
  };

  getCookie = function(c_name)
  {
    return $.cookie(c_name);
  };

  $(document).ready(check_auth);

}).call(this);
