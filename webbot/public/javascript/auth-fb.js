(function() {
  var act_on_login, check_auth, force_login, globals, access_token, good_token;

  globals = typeof exports !== "undefined" && exports !== null ? exports : this;

  globals.appID = "247360712014477";

  globals.logged_in_callback = function(obj) {
    console.log(obj);
    if (obj.error != null) {
      return alert("Some auth problem with facebook.  Failing.");
    } else {
      return window.location = '/do_login?' + $.param({
        name: obj.name,
        access_token: globals.access_token
      });
    }
  };

  act_on_login = function(access_token) {
    var path, query, script, url;
    globals.access_token = access_token;
    path = "https://graph.facebook.com/me?";
    console.log(access_token);
    query = $.param({
      access_token: access_token,
      callback: 'logged_in_callback'
    });
    url = path + query;
    script = document.createElement('script');
    script.src = url;
    return document.body.appendChild(script);
  };

  force_login = function() {
    var path, query, url;
    path = 'https://www.facebook.com/dialog/oauth?';
    query = $.param({
      client_id: globals.appID,
      redirect_uri: window.location.href,
      response_type: 'token'
    });
    url = path + query;
    setCookie("auth_cookie",query);
    return window.location = url;
  };

  check_auth = function()
  {
    access_token = getCookie("auth_cookie");
    if(access_token != null && access_token != "")
    {
        good_token = access_token;
//        good_token = window.location.hash.substring(14).split('&')[0];
        return act_on_login(good_token);
    }
    else
    {
      return force_login();
    }
  };

  setCookie = function(c_name,value)
  {
    document.cookie=c_name + "=" + value;
  };

  getCookie = function(c_name)
  {
    var i,x,y,ARRcookies=document.cookie.split(";");
    for (i=0;i<ARRcookies.length;i++)
    {
      x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
      y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
      x=x.replace(/^\s+|\s+$/g,"");
      if (x==c_name)
      {
        return unescape(y);
      }
    }
  };

  $(document).ready(check_auth);

}).call(this);
