define(
    [
        'backbone',
        'jquery',
        'js/views/MenuView',
        'js/views/LeftNavbarsView',
        'js/views/SearchResultsView',
    ],
    function (Backbone,$,MenuView,LeftNavbars, SearchResultsView) {
        var Router = Backbone.Router.extend({
            routes: {
                'search/:query' : 'searchFor',
                '': 'home'
            },

            initializeView: function (View, optionsView, optionsRender) {
                if (this.currentView) {
                    this.currentView.destroyView();
                }

                this.currentView = new View(optionsView);
                this.currentView.render(optionsRender);
            },
            home: function () {
                this.searchFor();
            },

            searchFor: function(query) {
                var numberOfPage = $('#number-of-page').val();
                this.initializeView(SearchResultsView,{
                    query : query,
                    numberOfPage : numberOfPage
                },{});
            }
        });

        var initialize = function () {
            var router = new Router();
            Backbone.history.start();
            MenuView.render();
            router.leftNav = new LeftNavbars();

        };

        return {
            initialize: initialize
        }
    }
);
