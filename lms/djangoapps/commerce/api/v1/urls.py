""" API v1 URLs. """
from django.conf import settings
from django.conf.urls import patterns, url, include

from commerce.api.v1 import views

COMMERCE_CONFIGURATION_URLS = patterns(
    '',
    url(r'^$', views.CommerceConfigurationView.as_view(), name='commerce_configuration')
)

COURSE_URLS = patterns(
    '',
    url(r'^$', views.CourseListView.as_view(), name='list'),
    url(r'^{}/$'.format(settings.COURSE_ID_PATTERN), views.CourseRetrieveUpdateView.as_view(), name='retrieve_update'),
)

ORDER_URLS = patterns(
    '',
    url(r'^(?P<number>[-\w]+)/$', views.OrderView.as_view(), name='detail'),
)

urlpatterns = patterns(
    '',
    url(r'^commerce_configuration/', include(COMMERCE_CONFIGURATION_URLS, namespace='commerce_configuration')),
    url(r'^courses/', include(COURSE_URLS, namespace='courses')),
    url(r'^orders/', include(ORDER_URLS, namespace='orders')),
)
