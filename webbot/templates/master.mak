<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
                      "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
    ${self.meta()}
    <title>${self.title()}</title>
    <link rel="stylesheet" type="text/css" media="screen" href="${tg.url('/css/style.css')}" />
    <link rel="stylesheet" type="text/css" media="screen" href="${tg.url('/css/admin.css')}" />
</head>
<body class="${self.body_class()}">
  ${self.header()}
  ${self.main_menu()}
  ${self.content_wrapper()}
  ${self.footer()}
</body>

<%def name="content_wrapper()">
    <div id="content">
    <div>
      <%
      flash=tg.flash_obj.render('flash', use_js=False)
      %>
      % if flash:
        ${flash | n}
      % endif
      ${self.body()}
    </div>
</%def>

<%def name="body_class()">
</%def>
<%def name="meta()">
  <meta content="text/html; charset=UTF-8" http-equiv="content-type"/>
</%def>

<%def name="title()">  </%def>

<%def name="header()">
  <div id="header">
    <h1>
        WebBotWar
        <span class="subtitle">The Python web robot fighting game</span>
    </h1>
  </div>
</%def>
<%def name="footer()">
  <div class="flogo">
    <img src="${tg.url('/images/under_the_hood_blue.png')}" alt="TurboGears" />
    <p><a href="http://www.turbogears.org/">Powered by TurboGears 2</a></p>
  </div>
  <div class="foottext">
    <p>TurboGears is a open source front-to-back web development
      framework written in Python. Copyright (c) 2005-2009 </p>
  </div>
  <div class="clearingdiv"></div>
</div>
</%def>
<%def name="main_menu()">
  <ul id="mainmenu">
    <li class="first"><a href="${tg.url('/')}" class="${('', 'active')[page=='index']}">Welcome</a></li>
        <li><a href="${tg.url('/robots')}" class="${('', 'active')}">Robots!</a></li>
        <li><a href="${tg.url('/game%s' % ('?id=%s' % game_id if game_id else ''))}" class="${('', 'active')}">Game</a></li>

    % if tg.auth_stack_enabled:
      <span>
          % if not request.identity:
            <li id="login" class="loginlogout"><a href="${tg.url('/login')}">Login</a></li>
          % else:
            <li id="login" class="loginlogout"><a href="${tg.url('/logout_handler')}">Logout</a></li>
            <li id="admin" class="loginlogout"><a href="${tg.url('/admin')}">Admin</a></li>
          % endif
      </span>
    % endif
  </ul>
</%def>
</html>
