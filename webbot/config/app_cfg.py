# -*- coding: utf-8 -*-
"""
Global configuration file for TG2-specific settings in webbot.

This file complements development/deployment.ini.

Please note that **all the argument values are strings**. If you want to
convert them into boolean, for example, you should use the
:func:`paste.deploy.converters.asbool` function, as in::
    
    from paste.deploy.converters import asbool
    setting = asbool(global_conf.get('the_setting'))
 
"""

import os

from tg.configuration import AppConfig
from pylons import config

import webbot
from webbot import model
from webbot.lib import app_globals, helpers 

class OpenShiftConfig(AppConfig):

    def after_init_config(self):
        if os.environ.get('OPENSHIFT_APP_NAME'):
            self.sa_auth.cookie_secret = os.environ['OPENSHIFT_APP_UUID']
            config['cookie_secret'] = os.environ['OPENSHIFT_APP_UUID']
            config['beaker.session.secret'] = os.environ['OPENSHIFT_APP_UUID']
            config['cache_dir'] = os.environ['OPENSHIFT_DATA_DIR']
            config['beaker.session.key'] = os.environ['OPENSHIFT_APP_NAME']
            config['beaker.cache.data_dir'] = \
                    os.path.join(os.environ['OPENSHIFT_DATA_DIR'], 'cache')
            config['beaker.session.data_dir'] = \
                    os.path.join(os.environ['OPENSHIFT_DATA_DIR'], 'sessions')
            config['templating.mako.compiled_templates_dir'] = \
                    os.path.join(os.environ['OPENSHIFT_DATA_DIR'], 'templates')
            if os.environ.get('OPENSHIFT_DB_URL'):
                config['sqlalchemy.url'] = \
                    '%(OPENSHIFT_DB_URL)s%(OPENSHIFT_APP_NAME)s' % os.environ

base_config = OpenShiftConfig()
base_config.renderers = []

base_config.package = webbot

#Enable json in expose
base_config.renderers.append('json')
#Set the default renderer
base_config.default_renderer = 'mako'
base_config.renderers.append('mako')
#Configure the base SQLALchemy Setup
base_config.use_sqlalchemy = True
base_config.model = webbot.model
base_config.DBSession = webbot.model.DBSession
# Configure the authentication backend

# YOU MUST CHANGE THIS VALUE IN PRODUCTION TO SECURE YOUR APP 
base_config.sa_auth.cookie_secret = "ChangeME" 

base_config.auth_backend = 'sqlalchemy'
base_config.sa_auth.dbsession = model.DBSession

# what is the class you want to use to search for users in the database
base_config.sa_auth.user_class = model.User
# what is the class you want to use to search for groups in the database
base_config.sa_auth.group_class = model.Group
# what is the class you want to use to search for permissions in the database
base_config.sa_auth.permission_class = model.Permission

# override this if you would like to provide a different who plugin for
# managing login and logout of your application
base_config.sa_auth.form_plugin = None

# override this if you are using a different charset for the login form
base_config.sa_auth.charset = 'utf-8'

# You may optionally define a page where you want users to be redirected to
# on login:
base_config.sa_auth.post_login_url = '/post_login'

# You may optionally define a page where you want users to be redirected to
# on logout:
base_config.sa_auth.post_logout_url = '/post_logout'
