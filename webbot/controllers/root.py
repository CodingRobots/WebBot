# -*- coding: utf-8 -*-
"""Main Controller"""

from tg import expose, flash, require, url, lurl, request, redirect
from tg.i18n import ugettext as _, lazy_ugettext as l_
from webbot import model
from repoze.what import predicates
from webbot.controllers.secure import SecureController
from webbot.model import DBSession, metadata
from tgext.admin.tgadminconfig import TGAdminConfig
from tgext.admin.controller import AdminController

from webbot.lib.base import BaseController
from webbot.controllers.error import ErrorController
from random import randrange
import subprocess
import uuid
from time import clock, sleep
from pymongo import Connection
import os

from sqlalchemy import desc
from datetime import datetime, timedelta
import random

__all__ = ['RootController']

# Add this function OUTSIDE of the RootController
def log_message(msg):
    model.DBSession.add(model.Message(msg=msg))

class RootController(BaseController):
    """
    The root controller for the webbot application.

    All the other controllers and WSGI applications should be mounted on this
    controller. For example::

        panel = ControlPanelController()
        another_app = AnotherWSGIApplication()

    Keep in mind that WSGI applications shouldn't be mounted directly: They
    must be wrapped around with :class:`tg.controllers.WSGIAppController`.

    """
    secc = SecureController()
    admin = AdminController(model, DBSession, config_type=TGAdminConfig)

    error = ErrorController()
    @expose('webbot.templates.upload')
    def code(self):
        return dict(page='code')

    @expose()
    def upload_code(self,**kw):
        upload = kw['code'].file
        name = kw['code'].filename
        print "Uploded:",name
        local_file = open("pybotwar/robots/%s" % name,'w')
        local_file.write(upload.read())
        local_file.close()
        redirect("/")

    # Add these methods INSIDE the RootController
    @expose()
    def do_logout(self, name):
        query = model.Login.query.filter_by(name=name)
        
        if query.count() == 0:
            # wtf...  when would this happen?
            log_message("'%s' (who DNE) tried to logout." % name)
            redirect('http://ritfloss.rtfd.org/')
        
        user = query.first()
        log_message("'%s' logged out." % user.name)
        model.DBSession.delete(user)
        redirect('http://ritfloss.rtfd.org/')

    @expose()
    def do_login(self, name, access_token):
        query = model.Login.query.filter_by(name=name)
        
        if query.count() == 0:
            user = model.Login(name=name)
            model.DBSession.add(user)
        elif query.count() > 1:
            # wtf...  when would this happen?
            user = query.first()
        else:
            user = query.one()

        user.access_token = access_token
#        log_message("%s logged in" % user.name)

        #redirect(url('/'))

    @expose('webbot.templates.index')
    def index(self):
        """Handle the front-page."""
        return dict(page='index')

    @expose('webbot.templates.bots')
    def game(self, game_id=''):
        """Handle displaying the game."""
        return dict(game_id=game_id, robot_infos=self.robo_data(game_id))

    @expose('webbot.templates.list')
    def robots(self):
        """List all the available robots."""
        robo_list = [u'Ninja', u'Pirate', u'Robot', u'Wizard', u'Velociraptor',
                     u'robot06', u'robot07', u'robot08']
        return dict(robots=robo_list)

    @expose('webbot.templates.gamelist')
    def games(self):
        """List all the available games."""
        game_list = DBSession.query(model.Game).all()
        print(game_list[0])
        return dict(games=game_list)

    @expose('json')
    def robo_data(self, game_id):
        """Returns the current state of the game as JSON."""
        # loc is the current location of the robot in
        #   (x, y, robot_orientation, turret_orientation)
        # format

        if os.environ.get('OPENSHIFT_NOSQL_DB_TYPE') == 'mongodb':
            conn = Connection(os.environ.get('OPENSHIFT_NOSQL_DB_URL'))
        else:
            conn = Connection()
        db = conn.pybot

        return db[game_id].find_one()

    @expose('webbot.templates.environ')
    def environ(self):
        """This method showcases TG's access to the wsgi environment."""
        return dict(environment=request.environ)

    @expose('webbot.templates.data')
    @expose('json')
    def data(self, **kw):
        """This method showcases how you can use the same controller for a data page and a display page"""
        return dict(params=kw)
    @expose('webbot.templates.authentication')
    def auth(self):
        """Display some information about auth* on this application."""
        return dict(page='auth')

    @expose('webbot.templates.index')
    @require(predicates.has_permission('manage', msg=l_('Only for managers')))
    def manage_permission_only(self, **kw):
        """Illustrate how a page for managers only works."""
        return dict(page='managers stuff')

    @expose('webbot.templates.index')
    @require(predicates.is_user('editor', msg=l_('Only for the editor')))
    def editor_user_only(self, **kw):
        """Illustrate how a page exclusive for the editor works."""
        return dict(page='editor stuff')

    @expose('webbot.templates.login')
    def login(self, came_from=lurl('/')):
        """Start the user login."""
        login_counter = request.environ['repoze.who.logins']
        if login_counter > 0:
            flash(_('Wrong credentials'), 'warning')
        return dict(page='login', login_counter=str(login_counter),
                    came_from=came_from)

    @expose()
    def start_game(self, **kwargs):
        robots = ''
        for key in kwargs.keys(): robots += key + ' '
        robots = robots[:-1]
        game_id = str(uuid.uuid3(uuid.NAMESPACE_DNS, robots + str(clock())))

        # Try to detect OpenShiftiness
        base = os.environ.get('OPENSHIFT_REPO_DIR')
        if not base:
            base = '../../'

        subprocess.Popen(['python', 'main.py', '-g', '-I', game_id, '-R', robots],
                         cwd=base+'pybotwar')

        new_game = model.Game(id=game_id, name=robots)
        DBSession.add(new_game)
        sleep(1)
        redirect('/game?game_id=%s' % (game_id))

    @expose()
    def post_login(self, came_from=lurl('/')):
        """
        Redirect the user to the initially requested page on successful
        authentication or redirect her back to the login page if login failed.

        """
        if not request.identity:
            login_counter = request.environ['repoze.who.logins'] + 1
            redirect('/login',
                params=dict(came_from=came_from, __logins=login_counter))
        userid = request.identity['repoze.who.userid']
        flash(_('Welcome back, %s!') % userid)
        redirect(came_from)

    @expose()
    def post_logout(self, came_from=lurl('/')):
        """
        Redirect the user to the initially requested page on logout and say
        goodbye as well.

        """
        flash(_('We hope to see you soon!'))
        redirect(came_from)
