define([
    'backbone',
    'underscore',
    'text!js/templates/SearchResultTemplate.html'
], function (Backbone, _, SearchResultTemplate) {
    var SearchResultView = Backbone.View.extend({
        className: 'col-sm-6 col-md-4 result',

        initialize: function (result) {
            this.template = _.template(SearchResultTemplate);
            this.result = result;
        },

        render: function () {
            var self = this;
            this.$el.html(self.template({
                raw: self.result.attributes.raw,
                result: self.result.attributes
            }));

            return self;
        }
    });

    return SearchResultView;
});