define([
    'backbone'
], function (Backbone) {
    var SearchModel = Backbone.Model.extend({
        urlRoot: '/search'
    });

    return SearchModel;
});