define([
   'backbone',
    'underscore'
], function (Backbone, _) {
    var FieldValuesCollection = Backbone.Collection.extend({
        url: '/search/values',

        parse : function (response) {
            return response.values;
        }
    });

    return FieldValuesCollection;
});
