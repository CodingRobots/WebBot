(function() {
  var globals, poll;

  globals = typeof exports !== "undefined" && exports !== null ? exports : this;

  globals.polling_interval = 3000;

  poll = function() {
    var last, name, toks;
    toks = window.location.href.split('/');
    last = toks[4];
    name = last.split('#')[0];
    return $.ajax({
      url: '/waiting/' + name + '.json',
      error: function(err) {
        console.log("Got an error");
        return console.log(err);
      },
      success: function(json) {
        $("#users li").remove();
        $(json['users']).each(function(i, user) {
          return $("#users ul").append("<li>" + user.name + "</li>");
        });
        $("#messages li").remove();
        $(json['messages']).each(function(i, msg) {
          return $("#messages ul").append("<li>" + msg.msg + "</li>");
        });
        return setTimeout(poll, globals.polling_interval);
      }
    });
  };

  $(document).ready(setTimeout(poll, globals.polling_interval));

  $(document).bind('before-unload', function() {
    var last, name, toks;
    toks = window.location.href.split('/');
    last = toks[4];
    name = last.split('#')[0];
    return $.ajax({
      url: '/do_logout/' + name
    });
  });

}).call(this);
