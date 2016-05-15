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
            'click .numberOfResults' : 'triggerNumberOfResults',
            'click #search-previousPage' : 'previousPage',
            'click #search-nextPage' : 'nextPage'
        },

        initialize: function (options) {
            var self = this;
            self.template = _.template(SearchResultsTemplate);
            self.collection = new SearchCollection();
            self.search(options);
            self.$numberOfResultsByPage = $('#number-of-results-page');
            self.$resultsIndex = $('#results-index');
        },

        render: function () {
            var self = this;

            var numberOfPage = $('#number-of-results-page').val();
            var summaryInfo = self.getNumberOfPage();
            self.$el.html(self.template({
                totalCountFiltered: self.totalCountFiltered,
                duration : self.duration,
                numberMaxOfPage: summaryInfo.numberMaxOfPage,
                currentPageNumber: summaryInfo.currentPageNumber
            }));


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
            var previous = $('#number-of-results-page').val();
            var numberOfResults = self.$(ev.currentTarget).data('number');
            $('#number-of-results-page').val(numberOfResults);
            $('#results-index').val("0");

            $('.numberOfResults-' + previous).removeClass('underline');
            $('.numberOfResults-' + numberOfResults).addClass('underline');


            self.search({
                query: self.getEncodeQuery(),
                numberOfResultsByPage : self.$numberOfResultsByPage.val()
            });

        },

        search: function(options) {
            var self = this;
            self.$('.search-loader').addClass('loader');
            self.collection.fetch({
                data: {
                    q: options.query,
                    numberOfResults : options.numberOfResultsByPage,
                    firstResult : _.isUndefined(options.firstIndex) ? 0 : options.firstIndex
                },
                success: function (model, response) {
                    self.duration = response.duration;
                    self.totalCountFiltered = response.totalCountFiltered;
                    self.render();
                    self.$('.search-loader').removeClass('loader');
                }
            });
        },

        getNumberOfPage: function() {
            var self = this;
            var obj = {};
            obj.numberMaxOfPage = Math.ceil(self.totalCountFiltered/self.$numberOfResultsByPage.val());
            obj.currentPageNumber = (self.$resultsIndex.val() /self.$numberOfResultsByPage.val()) + 1;

            return obj;
        },

        nextPage: function () {
            var self = this;
            var currentPageNumber = parseInt(self.$resultsIndex.val()) + parseInt(self.$numberOfResultsByPage.val());
            if(currentPageNumber > parseInt(self.totalCountFiltered)) {
                currentPageNumber = self.totalCountFiltered;
            }
            self.updateResultsIndex(currentPageNumber);

            var options = self.buildSearchQuery();

            self.search(options);
        },

        previousPage: function () {
            var self = this;
            var currentPageNumber = parseInt(self.$resultsIndex.val()) - parseInt(self.$numberOfResultsByPage.val());
            if(currentPageNumber <= 0) {
                currentPageNumber = 0;
            }
            self.updateResultsIndex(currentPageNumber);

            var options = self.buildSearchQuery();

            self.search(options);

        },

        updateResultsIndex: function (newIndex) {
            this.$resultsIndex.val(newIndex);
        },

        getEncodeQuery: function () {
            return encodeURIComponent($('#menu-search-bar').val());
        },

        buildSearchQuery: function () {
            var self = this;
            var options = {};

            options.query = self.getEncodeQuery();
            options.numberOfResultsByPage = self.$numberOfResultsByPage.val();
            options.firstIndex = self.$resultsIndex.val();

            return options;
        }



    });

    return SearchResultsView;
});
