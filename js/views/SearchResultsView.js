define([
    'backbone',
    'underscore',
    'text!js/templates/SearchResultsTemplate.html',
    'js/views/SearchResultView',
    'js/collections/SearchCollection'
], function (Backbone, _, SearchResultsTemplate,SearchResultView, SearchCollection) {
    var SearchResultsView = Backbone.View.extend({

        el: '.results',

        events: {
            'click .numberOfResults' : 'triggerNumberOfResults'
        },

        initialize: function (options) {
            var self = this;
            self.template = _.template(SearchResultsTemplate);
            self.collection = new SearchCollection();
            self.search(options);
        },

        render: function () {
            var self = this;
            self.$el.html(self.template({
                totalCountFiltered: self.collection.totalCountFiltered,
                duration : self.collection.duration,

            }));

            var numberOfPage = $('#number-of-page').val();
            $('.numberOfResults-' + numberOfPage).addClass('underline');

            self.$results = self.$('.search-results');
            _.each(self.collection.models, function (result) {
                var view = new SearchResultView(result);
                self.$results.append(view.render().el);
            });
        },

        triggerNumberOfResults: function (ev) {
            var self = this;
            ev.preventDefault();
            var previous = $('#number-of-page').val();
            var numberOfResults = self.$(ev.currentTarget).data('number');
            $('#number-of-page').val(numberOfResults);

            $('.numberOfResults-' + previous).removeClass('underline');
            $('.numberOfResults-' + numberOfResults).addClass('underline');

            var encodeQuery = encodeURIComponent($('#menu-search-bar').val());

            self.search({
                query: encodeQuery,
                numberOfPage : numberOfResults
            });

        },

        search: function(options) {
            var self = this;
            self.collection.fetch({
                data: {
                    q: options.query,
                    numberOfResults : options.numberOfPage
                },
                success: function (model, response) {
                    self.collection.duration = response.duration;
                    self.collection.totalCountFiltered = response.totalCountFiltered;
                    self.render();
                }
            });
        }

    });

    return SearchResultsView;
});
