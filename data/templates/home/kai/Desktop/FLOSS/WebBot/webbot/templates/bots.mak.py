# -*- encoding:utf-8 -*-
from mako import runtime, filters, cache
UNDEFINED = runtime.UNDEFINED
__M_dict_builtin = dict
__M_locals_builtin = locals
_magic_number = 7
_modified_time = 1329952695.596183
_template_filename = '/home/kai/Desktop/FLOSS/WebBot/webbot/templates/bots.mak'
_template_uri = '/home/kai/Desktop/FLOSS/WebBot/webbot/templates/bots.mak'
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
        robot_infos = context.get('robot_infos', UNDEFINED)
        enumerate = context.get('enumerate', UNDEFINED)
        __M_writer = context.writer()
        # SOURCE LINE 1
        __M_writer(u'\n\n<link rel="stylesheet" href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.9/themes/base/jquery-ui.css" type="text/css" media="all" />\n<link rel="stylesheet" href="/css/bots.css" type="text/css" media="all" />\n<script src="http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.5.min.js" type="text/javascript"></script>\n<script src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.9/jquery-ui.min.js" type="text/javascript"></script>\n<script>\n')
        # SOURCE LINE 8
        for index, robot in enumerate(robot_infos):
            # SOURCE LINE 9
            __M_writer(u'\t\t$(function() {\n\t\t\t$( "#pb')
            # SOURCE LINE 10
            __M_writer(escape(index))
            __M_writer(u'" ).progressbar({\n\t\t\t\tvalue: 100\n\t\t\t});\n\t\t});\n')
            pass
        # SOURCE LINE 15
        __M_writer(u"</script>\n\n\n<div id='canvas_box'>\n  <canvas height=500 width=600/>\n</div>\n<div id='bots_box'>\n  <h1>WebBotWar</h1>\n")
        # SOURCE LINE 23
        for index, robot in enumerate(robot_infos):
            # SOURCE LINE 24
            __M_writer(u"    <div id='robo_info_")
            __M_writer(escape(index))
            __M_writer(u"' class='robo_info'>\n\t  <span class='name'>Robot ")
            # SOURCE LINE 25
            __M_writer(escape(index))
            __M_writer(u"</span>\n\t  <img src='images/r0")
            # SOURCE LINE 26
            __M_writer(escape('%d' % (index+1)))
            __M_writer(u'.png\'></img>\n\t  <div class=\'progbar\' id="pb')
            # SOURCE LINE 27
            __M_writer(escape(index))
            __M_writer(u'"></div>\n    </div>\n')
            pass
        # SOURCE LINE 30
        __M_writer(u'  <div>\n    <h2>Time Remaining: <span id=\'timeleft\'>X:XX</span></h2>\n  </div>\n</div>\n<div style="clear:both"/>\n')
        return ''
    finally:
        context.caller_stack._pop_frame()


