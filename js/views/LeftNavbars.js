define(
    [
        'backbone',
        'jquery',
        'underscore',
        'bootstrap',
        'text!js/templates/LeftNavbars.html',
    ],
    function ( Backbone, $, _ , bootstap, LeftNavbars) {
        var LeftNavbarsView = Backbone.View.extend({
            el: '.left-navbars',
            events: {
            },
            initialize: function () {
                this.template = _.template(LeftNavbars);
            },
            render: function () {
                this.$el.html(this.template);
                $('.collapse').collapse();
            }
        });
        return new LeftNavbarsView();
    }
);