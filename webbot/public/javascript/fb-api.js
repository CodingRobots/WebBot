(function() {
  var act_on_login, check_auth, force_login, globals, access_token, good_token;

  globals = typeof exports !== "undefined" && exports !== null ? exports : this;

  globals.appID = "176005359167385";

  globals.logged_in_callback = function(obj) {
    if (obj.error != null) {
      return alert("Some auth problem with facebook.  Failing.");
    } else {
      globals.data = obj;
      return handle_page();
    }
  };

  get_friends = function(access_token) {
    fql_query_url = 'https://graph.facebook.com/'
      + 'fql?q=SELECT+uid2+FROM+friend+WHERE+uid1=me()'
      + '&access_token=' + globals.access_token;
    $.get(fql_query_url, function(fql_query_result) {
        $.post('/make_friends', {'data': fql_query_result, 'uid': data['id']});
    });
    return;
  }

  act_on_login = function(access_token) {
    var path, query, script, url;
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
  };

  check_auth = function() {
    if(getCookie("auth_cookie")==null) {
        var access_token;
        if (window.location.hash.length === 0) {
          return force_login();
        } else {
          response = window.location.hash.substring(1).split('&');
          access_token = response[0].split('=')[1];
          expire = response[1].split('=')[1] * 1000 + new Date().getTime();
          expire = new Date(expire);
          setCookie('auth_cookie', access_token, expire);
          return act_on_login(access_token);
        }
    }
    else {
      return act_on_login(getCookie("auth_cookie"));
    }
  };

  handle_page = function() {
      get_friends(access_token);
      $('#login > a').text("Hello, "+globals.data['name']);
      $(':input:hidden').val(globals.data['id']);
      $('.uid').attr('href', function(index, attr) {
          return attr + '?userid=' + globals.data['id'];
      });
  };


  setCookie = function(c_name, value, expire) {
    $.cookie(c_name, value, { expires: expire });
  };

  getCookie = function(c_name) {
    return $.cookie(c_name);
  };

  $(document).ready(check_auth);

}).call(this);
