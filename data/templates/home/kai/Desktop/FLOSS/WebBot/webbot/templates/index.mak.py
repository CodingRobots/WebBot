# -*- encoding:utf-8 -*-
from mako import runtime, filters, cache
UNDEFINED = runtime.UNDEFINED
__M_dict_builtin = dict
__M_locals_builtin = locals
_magic_number = 7
_modified_time = 1329952663.941882
_template_filename = '/home/kai/Desktop/FLOSS/WebBot/webbot/templates/index.mak'
_template_uri = '/home/kai/Desktop/FLOSS/WebBot/webbot/templates/index.mak'
_source_encoding = 'utf-8'
from webhelpers.html import escape
_exports = ['sidebar_bottom', 'title']


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
        __M_writer = context.writer()
        # SOURCE LINE 1
        __M_writer(u'\n\n')
        # SOURCE LINE 5
        __M_writer(u'\n\n<div id="info">\n  <p>WebBotWar is a social HTML 5 frontend to\n  <a href="http://code.google.com/p/pybotwar/">pybotwar</a>, a python\n  implementation of <a href="http://robocode.sourceforge.net/">Robocode</a>.</p>\n  <ol id="getting_started_steps">\n    <li class="getting_started">\n      <h3>Code your data model</h3>\n      <p> Design your data model, Create the database, and Add some bootstrap data.</p>\n    </li>\n    <li class="getting_started">\n      <h3>Design your URL architecture</h3>\n      <p> Decide your URLs, Program your controller methods, Design your\n          templates, and place some static files (CSS and/or JavaScript). </p>\n    </li>\n    <li class="getting_started">\n      <h3>Distribute your app</h3>\n      <p> Test your source, Generate project documents, Build a distribution.</p>\n    </li>\n  </ol>\n</div>\n\n')
        # SOURCE LINE 28
        __M_writer(u'\n')
        return ''
    finally:
        context.caller_stack._pop_frame()


def render_sidebar_bottom(context):
    context.caller_stack._push_frame()
    try:
        __M_writer = context.writer()
        return ''
    finally:
        context.caller_stack._pop_frame()


def render_title(context):
    context.caller_stack._push_frame()
    try:
        __M_writer = context.writer()
        # SOURCE LINE 3
        __M_writer(u'\n  Welcome to TurboGears 2.1, standing on the shoulders of giants, since 2007\n')
        return ''
    finally:
        context.caller_stack._pop_frame()


