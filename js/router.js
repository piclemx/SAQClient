define(
    [
        'backbone',
        'jquery',
        'underscore',
        'js/views/MenuView',
        'js/views/LeftNavbarsView',
        'js/views/SearchResultsView',
    ],
    function (Backbone,$,_,MenuView,LeftNavbars, SearchResultsView) {
        var Router = Backbone.Router.extend({
            routes: {
                'search/:query' : 'searchFor',
                'search/' : 'searchFor',
                '': 'home'
            },

            initializeView: function (View, optionsView, optionsRender,render) {
                var self = this;
                if (self.currentView) {
                    self.currentView.destroyView();
                }

                self.currentView = new View(optionsView);
                if(render){
                    self.currentView.render(optionsRender);
                }
            },
            home: function () {
                this.searchFor();
            },

            searchFor: function(query) {
                var numberOfResultsByPage = $('#number-of-results-page').val();
                query = _.isNull(query) ? "" : query;
                this.initializeView(SearchResultsView,{
                    query : query,
                    numberOfResultsByPage : numberOfResultsByPage
                },{},false);
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
