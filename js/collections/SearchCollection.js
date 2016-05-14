define(['backbone', 'js/models/SearchModel'],
    function (Backbone, SearchModel) {
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