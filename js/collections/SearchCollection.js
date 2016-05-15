define([
    'backbone',
    'underscore',
    'js/models/SearchModel'
], function (Backbone, _, SearchModel) {
        var SearchCollection = Backbone.Collection.extend({

            model: SearchModel,

            url: '/search',

            parse: function (response) {
                return response.results;
            }
        });

        return SearchCollection;
    }
);