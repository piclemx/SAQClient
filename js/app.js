requirejs.config({
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        },
        bootstrap: {
            deps: ['jquery']
        },
        jquery: {
            exports: '$'
        },
        'jquery.cookie': {
            deps: ['jquery']
        },
        'jquery.fancybox': {
            deps: ['jquery']
        },
        'jquery.highlight': {
            deps: ['jquery']
        },
        slick: {
            deps: ['jquery']
        }
    },
    paths: {
        jquery: 'node_modules/jquery/dist/jquery',
        'jquery.cookie': 'node_modules/jquery.cookie/jquery.cookie',
        'jquery.fancybox': 'node_modules/fancybox/dist/js/jquery.fancybox.pack',
        'jquery.highlight': 'node_modules/jquery-highlight/jquery.highlight',
        slick: 'node_modules/slick-carousel/slick/slick.min',
        bootstrap: 'node_modules/bootstrap/dist/js/bootstrap.min',
        underscore: 'node_modules/underscore/underscore',
        backbone: 'node_modules/backbone/backbone',
        text: 'node_modules/text/text',
    }
});

require(
    ['jquery', 'backbone', 'js/router'],
    function ($, Backbone, Router) {
        $.ajaxSetup({
            data: { "access_token": "6318103b-f9da-437c-854b-9e6f1f44e27b" }
        });

        $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
            if (!originalOptions.url.match('^js/templates')) {
                options.url = 'https://cloudplatform.coveo.com/rest' + options.url;
            }
        });
        Backbone.View.prototype.destroyView = function () {
            this.undelegateEvents();
            this.$el.empty();
        };

        $.fn.serializeObject = function () {
            var o = {};
            var a = this.serializeArray();
            $.each(a, function () {
                if (o[this.name] !== undefined) {
                    if (!o[this.name].push) {
                        o[this.name] = [o[this.name]];
                    }
                    o[this.name].push(this.value || '');
                } else {
                    o[this.name] = this.value || '';
                }
            });
            return o;
        };

        Router.initialize();
    }
);
