define([
   'backbone',
    'underscore'
], function (Backbone, _) {
    var FieldValuesCollection = Backbone.Collection.extend({
        url: '/search/values',

        initialize: function (maxNumberOfValues) {
            this.max = maxNumberOfValues;
        },

        parse : function (response) {
            return response.values;
        }
    });

    return FieldValuesCollection;
});
