define([
    'backbone',
    'underscore',
    'text!js/templates/SearchResultTemplate.html',
    'resizeImage'
], function (Backbone, _, SearchResultTemplate, resize) {
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
                result: self.result.attributes,
                resize: resize
            }));

            return self;
        }
    });

    return SearchResultView;
});