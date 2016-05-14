define(
    [
        'backbone',
        'underscore',
        'text!js/templates/MenuTemplate.html',
    ],
    function ( Backbone, _ , MenuTemplate) {
        var MenuView = Backbone.View.extend({
            el: '.menu',
            events: {
            },
            initialize: function () {
                this.template = _.template(MenuTemplate);
            },
            render: function () {
                this.$el.html(this.template);
            }
        });
        return new MenuView();
    }
);