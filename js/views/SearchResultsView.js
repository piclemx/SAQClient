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
            'click #search-nextPage' : 'nextPage',
            'click .sort-option': 'handleSort'
        },

        initialize: function (options) {
            var self = this;
            self.template = _.template(SearchResultsTemplate);
            self.collection = new SearchCollection();
            self.$numberOfResultsByPage = $('#number-of-results-page');
            self.$resultsIndex = $('#results-index');
            self.$sortWith = $('#sort');
            self.$sortOrder= $('#sort-order');
            self.search(options);
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

            var sortWith = self.$sortWith.val();
            var sortOrder = self.$sortOrder.val();

            var $sort = $('.sort-option.' + sortWith +'-sort');
            if(!_.isEqual(sortWith,'revelance')) {
                if(_.isEqual(sortOrder,'ascending') || _.isEqual(sortOrder,'Ascending')) {
                    $sort.addClass('glyphicon glyphicon-sort-by-attributes');
                } else {
                    $sort.addClass('glyphicon glyphicon-sort-by-attributes-alt');
                }
            }
            $sort.removeClass('btn-link');



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

            var options = self.buildSearchQuery();
            self.search(options);

        },

        search: function(options) {
            var self = this;
            self.$('.search-loader').addClass('loader');
            self.collection.fetch({
                data: {
                    q: decodeURIComponent(options.query),
                    aq: _.isUndefined(options.aq) ? "" : options.aq,
                    numberOfResults : options.numberOfResultsByPage,
                    firstResult : _.isUndefined(options.firstIndex) ? 0 : options.firstIndex,
                    sortCriteria: _.isUndefined(options.sortCriteria) ? "" : options.sortCriteria
                },
                success: function (model, response) {
                    self.duration = response.duration;
                    self.totalCountFiltered = response.totalCountFiltered;
                    self.render();
                    self.$('.search-loader').removeClass('loader');
                },
                error: function (error) {
                    console.log(error);
                }
            });
        },

        getNumberOfPage: function() {
            var self = this;
            var obj = {};
            obj.numberMaxOfPage = Math.ceil(self.totalCountFiltered/self.$numberOfResultsByPage.val());
            if(parseInt(self.totalCountFiltered) === 0) {
                obj.currentPageNumber = 0;
            } else {
                obj.currentPageNumber = (self.$resultsIndex.val() /self.$numberOfResultsByPage.val()) + 1;
            }


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
            options.sortCriteria = self.getSortInfo();

            return options;
        },

        handleSort: function (ev) {
            var self = this;
            ev.preventDefault();

            var field = $(ev.currentTarget).data('field');
            var sortName = $(ev.currentTarget).data('sort-name');

            var currentSort = self.$sortWith.val();
            var currentSortOrder = self.$sortOrder.val();
            var options = {};

            if(_.isEqual(sortName,currentSort) && !_.isEqual(sortName,'revelance')) {
                if(_.isEqual(sortName,'date') && _.isEqual(currentSortOrder,'Ascending')) {
                    options.sortOrder = 'Descending';
                } else if (_.isEqual(sortName,'date') && _.isEqual(currentSortOrder,'Descending')) {
                    options.sortOrder = 'Ascending';
                } else if (_.isEqual(currentSortOrder,'ascending')) {
                    options.sortOrder = 'descending';
                } else {
                    options.sortOrder = 'ascending';
                }
            } else {
                options.sortOrder = "";
            }

            options.field = field;
            options.sortWith = sortName;

            self.$sortOrder.val(options.sortOrder);
            self.$sortWith.val(options.sortWith);

            self.$sortWith.data('field', options.field);


            var query = self.buildSearchQuery();

            self.search(query);

        },

        getSortInfo: function () {
            var self = this;
            var sortCriteria = "";
            var sort = self.$sortWith.val();
            var field = self.$sortWith.data('field');
            var sortOrder = self.$sortOrder.val();

            if(_.isEqual(sort, 'date') && !_.isEmpty(sortOrder)) {
                sortCriteria = field + sortOrder;
            } else if (_.isEqual(sort,'date') && _.isEmpty(sortOrder)) {
                sortCriteria = field + "Ascending";
                self.$sortOrder.val("Ascending");
            } else if (!_.isEqual(sort,'revelance') && _.isEmpty(sortOrder)) {
                sortCriteria = field + " " + 'ascending';
                self.$sortOrder.val("ascending");
            } else if (!_.isEqual(sort,'revelance') && !_.isEmpty(sortOrder)) {
                sortCriteria = field + " " + sortOrder;
            } else {
                sortCriteria = field;
            }

            return sortCriteria;

        }
    });

    return SearchResultsView;
});
