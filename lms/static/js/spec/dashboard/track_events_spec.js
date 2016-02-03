(function (define) {
    'use strict';
    define([
        'jquery',
        'js/dashboard/track_events'
    ],
    function($) {

        describe('edx.dashboard.trackEvents', function() {
            beforeEach(function() {
                // Stub the analytics event tracker
                window.analytics = jasmine.createSpyObj('analytics', ['track', 'page', 'trackLink']);
                loadFixtures('js/fixtures/dashboard/dashboard.html');
                window.edx.dashboard.trackEvents();
            });

            it('sends analytics events when the user interacts with dashboard', function() {
                expect(window.analytics.trackLink.callCount).toBe(7);

                var expectedArray = [
                    [$('.course-title > a'),
                    'edx.bi.dashboard.course_title.clicked',
                    window.edx.dashboard.generateTrackProperties],
                    [$('.cover'),
                    'edx.bi.dashboard.course_image.clicked',
                    window.edx.dashboard.generateTrackProperties],
                    [$('.enter-course'),
                    'edx.bi.dashboard.enter_course.clicked',
                    window.edx.dashboard.generateTrackProperties],
                    [$('.wrapper-action-more'),
                    'edx.bi.dashboard.course_options_dropdown.clicked',
                    window.edx.dashboard.generateTrackProperties],
                    [$('.verified-info'),
                    'edx.bi.dashboard.verified_info_link.clicked',
                    window.edx.dashboard.generateTrackProperties],
                    [$('.btn-find-courses'),
                    'edx.bi.dashboard.find_courses_button.clicked',
                    {
                        category: 'dashboard',
                        label: null
                    }],
                    [$('.xseries-action .btn'),
                    'edx.bi.dashboard.xseries_cta_message.clicked',
                    window.edx.dashboard.generateProgramProperties]
                ];

                for (var cnt=0; cnt< expectedArray.length; cnt ++){
                    expect(window.analytics.trackLink.argsForCall[cnt]).toEqual(expectedArray[cnt]);
                };
            });

            it('sends an analytics event when xseries messages are present in the DOM on page load', function() {
                window.edx.dashboard.xseriesTrackMessages();
                expect(window.analytics.track).toHaveBeenCalledWith(
                    'edx.bi.dashboard.xseries_cta_message.viewed',
                    {
                        category: 'dashboard',
                        course_id: 'CTB3365DWx',
                        program_id: 'xseries007'
                    }
                );
            });
        });
    });
}).call(this, window.define);
