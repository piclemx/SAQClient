define([
    'backbone'
], function (Backbone) {
        var SearchCollection = Backbone.Collection.extend({
            url: '/search',

            parse: function (response) {
                return response.results;
            }
        });

        return SearchCollection;
    }
);