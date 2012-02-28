# -*- encoding:utf-8 -*-
from mako import runtime, filters, cache
UNDEFINED = runtime.UNDEFINED
__M_dict_builtin = dict
__M_locals_builtin = locals
_magic_number = 7
_modified_time = 1330012197.361774
_template_filename = u'/home/kai/Desktop/FLOSS/WebBot/webbot/templates/master.mak'
_template_uri = u'/home/kai/Desktop/FLOSS/WebBot/webbot/templates/master.mak'
_source_encoding = 'utf-8'
from webhelpers.html import escape
_exports = ['footer', 'body_class', 'header', 'meta', 'title', 'main_menu', 'content_wrapper']


def render_body(context,**pageargs):
    context.caller_stack._push_frame()
    try:
        __M_locals = __M_dict_builtin(pageargs=pageargs)
        tg = context.get('tg', UNDEFINED)
        self = context.get('self', UNDEFINED)
        __M_writer = context.writer()
        # SOURCE LINE 1
        __M_writer(u'<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"\n                      "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">\n<html>\n<head>\n    ')
        # SOURCE LINE 5
        __M_writer(escape(self.meta()))
        __M_writer(u'\n    <title>')
        # SOURCE LINE 6
        __M_writer(escape(self.title()))
        __M_writer(u'</title>\n    \t<script type="text/javascript" src="http://code.jquery.com/jquery-1.7.1.min.js"></script>\n\t<script type="text/javascript" src="')
        # SOURCE LINE 8
        __M_writer(escape(tg.url('/javascript/auth-fb.js')))
        __M_writer(u'"></script>\n    <link rel="stylesheet" type="text/css" media="screen" href="')
        # SOURCE LINE 9
        __M_writer(escape(tg.url('/css/style.css')))
        __M_writer(u'" />\n    <link rel="stylesheet" type="text/css" media="screen" href="')
        # SOURCE LINE 10
        __M_writer(escape(tg.url('/css/admin.css')))
        __M_writer(u'" />\n</head>\n<body class="')
        # SOURCE LINE 12
        __M_writer(escape(self.body_class()))
        __M_writer(u'">\n  ')
        # SOURCE LINE 13
        __M_writer(escape(self.header()))
        __M_writer(u'\n  ')
        # SOURCE LINE 14
        __M_writer(escape(self.main_menu()))
        __M_writer(u'\n  ')
        # SOURCE LINE 15
        __M_writer(escape(self.content_wrapper()))
        __M_writer(u'\n  ')
        # SOURCE LINE 16
        __M_writer(escape(self.footer()))
        __M_writer(u'\n</body>\n\n')
        # SOURCE LINE 35
        __M_writer(u'\n\n\n')
        # SOURCE LINE 39
        __M_writer(u'\n')
        # SOURCE LINE 42
        __M_writer(u'\n\n')
        # SOURCE LINE 44
        __M_writer(u'\n\n')
        # SOURCE LINE 53
        __M_writer(u'\n')
        # SOURCE LINE 65
        __M_writer(u'\n')
        # SOURCE LINE 83
        __M_writer(u'\n</html>\n')
        return ''
    finally:
        context.caller_stack._pop_frame()


def render_footer(context):
    context.caller_stack._push_frame()
    try:
        tg = context.get('tg', UNDEFINED)
        __M_writer = context.writer()
        # SOURCE LINE 54
        __M_writer(u'\n  <div class="flogo">\n    <img src="')
        # SOURCE LINE 56
        __M_writer(escape(tg.url('/images/under_the_hood_blue.png')))
        __M_writer(u'" alt="TurboGears" />\n    <p><a href="http://www.turbogears.org/">Powered by TurboGears 2</a></p>\n  </div>\n  <div class="foottext">\n    <p>TurboGears is a open source front-to-back web development\n      framework written in Python. Copyright (c) 2005-2009 </p>\n  </div>\n  <div class="clearingdiv"></div>\n</div>\n')
        return ''
    finally:
        context.caller_stack._pop_frame()


def render_body_class(context):
    context.caller_stack._push_frame()
    try:
        __M_writer = context.writer()
        # SOURCE LINE 38
        __M_writer(u'\n')
        return ''
    finally:
        context.caller_stack._pop_frame()


def render_header(context):
    context.caller_stack._push_frame()
    try:
        __M_writer = context.writer()
        # SOURCE LINE 46
        __M_writer(u'\n  <div id="header">\n    <h1>\n        WebBotWar\n        <span class="subtitle">The Python web robot fighting game</span>\n    </h1>\n  </div>\n')
        return ''
    finally:
        context.caller_stack._pop_frame()


def render_meta(context):
    context.caller_stack._push_frame()
    try:
        __M_writer = context.writer()
        # SOURCE LINE 40
        __M_writer(u'\n  <meta content="text/html; charset=UTF-8" http-equiv="content-type"/>\n')
        return ''
    finally:
        context.caller_stack._pop_frame()


def render_title(context):
    context.caller_stack._push_frame()
    try:
        __M_writer = context.writer()
        # SOURCE LINE 44
        __M_writer(u'  ')
        return ''
    finally:
        context.caller_stack._pop_frame()


def render_main_menu(context):
    context.caller_stack._push_frame()
    try:
        tg = context.get('tg', UNDEFINED)
        request = context.get('request', UNDEFINED)
        page = context.get('page', UNDEFINED)
        game_id = context.get('game_id', UNDEFINED)
        __M_writer = context.writer()
        # SOURCE LINE 66
        __M_writer(u'\n  <ul id="mainmenu">\n    <li class="first"><a href="')
        # SOURCE LINE 68
        __M_writer(escape(tg.url('/')))
        __M_writer(u'" class="')
        __M_writer(escape(('', 'active')[page=='index']))
        __M_writer(u'">Welcome</a></li>\n        <li><a href="')
        # SOURCE LINE 69
        __M_writer(escape(tg.url('/robots')))
        __M_writer(u'" class="')
        __M_writer(escape(('', 'active')))
        __M_writer(u'">Robots!</a></li>\n        <li><a href="')
        # SOURCE LINE 70
        __M_writer(escape(tg.url('/game%s' % ('?id=%s' % game_id if game_id else ''))))
        __M_writer(u'" class="')
        __M_writer(escape(('', 'active')))
        __M_writer(u'">Game</a></li>\n\n')
        # SOURCE LINE 72
        if tg.auth_stack_enabled:
            # SOURCE LINE 73
            __M_writer(u'      <span>\n')
            # SOURCE LINE 74
            if not request.identity:
                # SOURCE LINE 75
                __M_writer(u'            <li id="login" class="loginlogout"><a href="')
                __M_writer(escape(tg.url('/login')))
                __M_writer(u'">Login</a></li>\n')
                # SOURCE LINE 76
            else:
                # SOURCE LINE 77
                __M_writer(u'            <li id="login" class="loginlogout"><a href="')
                __M_writer(escape(tg.url('/logout_handler')))
                __M_writer(u'">Logout</a></li>\n            <li id="admin" class="loginlogout"><a href="')
                # SOURCE LINE 78
                __M_writer(escape(tg.url('/admin')))
                __M_writer(u'">Admin</a></li>\n')
                pass
            # SOURCE LINE 80
            __M_writer(u'      </span>\n')
            pass
        # SOURCE LINE 82
        __M_writer(u'  </ul>\n')
        return ''
    finally:
        context.caller_stack._pop_frame()


def render_content_wrapper(context):
    context.caller_stack._push_frame()
    try:
        tg = context.get('tg', UNDEFINED)
        self = context.get('self', UNDEFINED)
        page = context.get('page', UNDEFINED)
        __M_writer = context.writer()
        # SOURCE LINE 19
        __M_writer(u'\n    <div id="content">\n    <div>\n')
        # SOURCE LINE 22
        if page:
            # SOURCE LINE 23
            __M_writer(u'      <div class="currentpage">\n       Now Viewing: <span>')
            # SOURCE LINE 24
            __M_writer(escape(page))
            __M_writer(u'</page>\n      </div>\n')
            pass
        # SOURCE LINE 27
        __M_writer(u'      ')

        flash=tg.flash_obj.render('flash', use_js=False)
        
        
        # SOURCE LINE 29
        __M_writer(u'\n')
        # SOURCE LINE 30
        if flash:
            # SOURCE LINE 31
            __M_writer(u'        ')
            __M_writer(flash )
            __M_writer(u'\n')
            pass
        # SOURCE LINE 33
        __M_writer(u'      ')
        __M_writer(escape(self.body()))
        __M_writer(u'\n    </div>\n')
        return ''
    finally:
        context.caller_stack._pop_frame()


