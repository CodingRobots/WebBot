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

__all__ = ['RootController']


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

    @expose('webbot.templates.index')
    def index(self):
        """Handle the front-page."""
        return dict(page='index')

    @expose('webbot.templates.bots')
    def robots(self):
        """Handle the 'about' page."""
        id='1234567890'
        return dict(id=id, robot_infos=self.robo_data(id))

    @expose('json')
    def robo_data(self, game_id):
        """Returns the current state of the game as JSON."""
        # loc is the current location of the robot in
        #   (x, y, robot_orientation, turret_orientation)
        # format
        robots = [{'name': 'robo1',
                   'health': 100,
                   'loc': (5, 5, 1, 2),
                   },
                  {'name': 'robo2',
                   'health': 25,
                   'loc': (5, 5, 1, 2),
                   },
                  {'name': 'robo3',
                   'health': 30,
                   'loc': (5, 5, 1, 2),
                   },
                  {'name': 'robo4',
                   'health': 70,
                   'loc': (5, 5, 1, 2),
                   },
                  {'name': 'robo5',
                   'health': 65,
                   'loc': (5, 5, 1, 2),
                   },
                  ]
        bullets = [{'loc': (5, 5)},
                   {'loc': (5, 10)},
                   ]
        explosions = [{'loc': (30, 50), 'size': 3},
                      {'loc': (70, 30), 'size': 5},
                      ]
        walls = [{'loc': (1, 1), 'length': 100, 'direction': 'v'},
                 {'loc': (1, 1), 'length': 100, 'direction': 'h'},
                 ]
        time = 'x:xx'
        return dict(robot_infos=robots, bullets=bullets, explosions=explosions,
                    walls=walls, time=time)


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
