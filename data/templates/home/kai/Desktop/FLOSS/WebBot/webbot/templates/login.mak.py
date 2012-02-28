# -*- encoding:utf-8 -*-
from mako import runtime, filters, cache
UNDEFINED = runtime.UNDEFINED
__M_dict_builtin = dict
__M_locals_builtin = locals
_magic_number = 7
_modified_time = 1330011717.301614
_template_filename = '/home/kai/Desktop/FLOSS/WebBot/webbot/templates/login.mak'
_template_uri = '/home/kai/Desktop/FLOSS/WebBot/webbot/templates/login.mak'
_source_encoding = 'utf-8'
from webhelpers.html import escape
_exports = ['title']


def _mako_get_namespace(context, name):
    try:
        return context.namespaces[(__name__, name)]
    except KeyError:
        _mako_generate_namespaces(context)
        return context.namespaces[(__name__, name)]
def _mako_generate_namespaces(context):
    pass
def _mako_inherit(template, context):
    _mako_generate_namespaces(context)
    return runtime._inherit_from(context, u'local:templates.master', _template_uri)
def render_body(context,**pageargs):
    context.caller_stack._push_frame()
    try:
        __M_locals = __M_dict_builtin(pageargs=pageargs)
        tg = context.get('tg', UNDEFINED)
        login_counter = context.get('login_counter', UNDEFINED)
        came_from = context.get('came_from', UNDEFINED)
        dict = context.get('dict', UNDEFINED)
        __M_writer = context.writer()
        # SOURCE LINE 1
        __M_writer(u'\n')
        # SOURCE LINE 2
        __M_writer(u'\n<div id="loginform">\n<form action="')
        # SOURCE LINE 4
        __M_writer(escape(tg.url('/login_handler', params=dict(came_from=came_from.encode('utf-8'), __logins=login_counter.encode('utf-8')))))
        __M_writer(u'" method="POST" class="loginfields">\n    <h2><span>Login</span></h2>\n    <label for="login">Username:</label><input type="text" id="login" name="login" class="text"></input><br/>\n    <label for="password">Password:</label><input type="password" id="password" name="password" class="text"></input>\n    <label id="labelremember" for="loginremember">remember me</label><input type="checkbox" id="loginremember" name="remember" value="2252000"/>\n    <input type="submit" id="submit" value="Login" />\n</form>\n</div>')
        return ''
    finally:
        context.caller_stack._pop_frame()


def render_title(context):
    context.caller_stack._push_frame()
    try:
        __M_writer = context.writer()
        # SOURCE LINE 2
        __M_writer(u'Login Form')
        return ''
    finally:
        context.caller_stack._pop_frame()


