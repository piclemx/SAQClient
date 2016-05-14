define(
    [
        'backbone',
        'js/views/MenuView'
    ],
    function (Backbone,MenuView) {
        var Router = Backbone.Router.extend({
            routes: {
            },

            initializeView: function (View, optionsView, optionsRender) {
                if (this.currentView) {
                    this.currentView.destroyView();
                }

                this.currentView = new View(optionsView);
                this.currentView.render(optionsRender);
            },
            home: function () {
                //this.initializeView(HomeView);
            }
        });

        var initialize = function () {
            var router = new Router();
            Backbone.history.start();
            MenuView.render();
        };

        return {
            initialize: initialize
        }
    }
);
