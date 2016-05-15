define(
    [
        'backbone',
        'underscore',
        'jquery',
        'text!js/templates/MenuTemplate.html'
    ],
    function (Backbone, _ , $, MenuTemplate) {
        var MenuView = Backbone.View.extend({
            el: '.menu',

            events: {
                'click .btn-menu-search': 'triggerSearch'
            },

            initialize: function () {
                var self = this;
                self.template = _.template(MenuTemplate);

            },

            render: function () {
                var self = this;
                self.$el.html(self.template);
            },

            triggerSearch: function(ev) {
                ev.preventDefault();
                Backbone.history.navigate('/search/'+ encodeURIComponent($('#menu-search-bar').val()), {trigger: true});
            }
        });
        return new MenuView();
    }
);