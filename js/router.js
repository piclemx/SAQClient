define(
    [
        'backbone',
        'js/views/MenuView',
        'js/views/LeftNavbars',
        'js/collections/SearchCollection'
    ],
    function (Backbone,MenuView,LeftNavbars, SearchCollection) {
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
            LeftNavbars.render();
            var collection = new SearchCollection();

            collection.fetch().done(function (data) {
                console.log(data);  
                console.log(collection);
            });
        };

        return {
            initialize: initialize
        }
    }
);
