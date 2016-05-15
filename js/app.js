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
        uri: 'node_modules/lil-uri/uri.min',
        resizeImage: 'node_modules/resize-image/index'
    }
});

require(
    ['jquery', 'backbone', 'js/router','uri', 'underscore'],
    function ($, Backbone, Router,uri,_) {
        $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
            if (!originalOptions.url.match('^js/templates')) {
                var url  = uri(options.url);
                var p = _.isEmpty(url.search()) ? '?' : '&'
                options.url = uri()
                    .path('https://cloudplatform.coveo.com/rest' + url.build() + p + 'access_token=6318103b-f9da-437c-854b-9e6f1f44e27b')
                    .build();
            }
            options.crossDomain ={
                crossDomain: true
            };
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
