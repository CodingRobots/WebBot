# -*- encoding:utf-8 -*-
from mako import runtime, filters, cache
UNDEFINED = runtime.UNDEFINED
__M_dict_builtin = dict
__M_locals_builtin = locals
_magic_number = 7
_modified_time = 1329952894.591883
_template_filename = '/home/kai/Desktop/FLOSS/WebBot/webbot/templates/list.mak'
_template_uri = '/home/kai/Desktop/FLOSS/WebBot/webbot/templates/list.mak'
_source_encoding = 'utf-8'
from webhelpers.html import escape
_exports = []


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
        robots = context.get('robots', UNDEFINED)
        __M_writer = context.writer()
        # SOURCE LINE 1
        __M_writer(u'\n\n<p>Here are all the robots you can play with:</p>\n\n<div>\n')
        # SOURCE LINE 6
        for robot in robots:
            # SOURCE LINE 7
            __M_writer(u'    <div>\n\t  <span>')
            # SOURCE LINE 8
            __M_writer(escape(robot))
            __M_writer(u" Robot</span>\n\t  <input type='button'>Pick Me!</img>\n    </div>\n")
            pass
        # SOURCE LINE 12
        __M_writer(u'</div>\n')
        return ''
    finally:
        context.caller_stack._pop_frame()


