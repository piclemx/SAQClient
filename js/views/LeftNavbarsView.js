define(
    [
        'backbone',
        'jquery',
        'underscore',
        'bootstrap',
        'text!js/templates/LeftNavbars.html',
        'text!js/templates/CollapseTemplate.html',
        'js/collections/FieldValuesCollection'
    ],
    function ( Backbone, $, _ , bootstap, LeftNavbars, CollapseTemplate, FieldValuesCollection) {
        var advancedOptions = {
            categories: '@tpcategorie==',
            country: '@tppays==',
            millesimes: '@tpmillesime=='
        };
        var LeftNavbarsView = Backbone.View.extend({

            el: '.left-navbars',

            events: {
                'change .advance-search-checkbox' : 'handleAdvencedQuery'
            },

            initialize: function () {
                var self = this;
                self.template = _.template(LeftNavbars);
                self.collapseTemplate = _.template(CollapseTemplate);
                self.collection = new FieldValuesCollection();
                self.$advencedQuery= $('#advencedQuery');
                self.values = {
                    categories :[],
                    country : [],
                    millesimes: []
                };
            },

            render: function () {
                var self = this;
                this.$el.html(self.template);
                self.$('.collapse').collapse();

                self.categories = self.collection.fetch({
                    data : {
                        field: '@tpcategorie',
                        maximumNumberOfValues: 5
                    },
                    success: function (data) {
                        self.renderCollapseSection(data.models, 'categories');
                    }
                });
                self.countries = self.collection.fetch({
                    data: {
                        field: '@tppays',
                        maximumNumberOfValues: 5
                    },
                    success: function (data) {
                        self.renderCollapseSection(data.models, 'country');
                    }
                });

                self.millesimes = self.collection.fetch({
                    data: {
                        field: '@tpmillesime',
                        maximumNumberOfValues: 5
                    },
                    success: function (data) {
                        self.renderCollapseSection(data.models, 'millesimes');
                    }
                });
            },

            renderCollapseSection: function (models, name) {
                var self = this;
                $('#'+ name + '-collapse .panel-body').append(self.collapseTemplate({
                    name: name,
                    entities: models
                }));
            },

            handleAdvencedQuery: function (ev) {
                ev.preventDefault();
                var self = this;
                var checkbox = $(ev.currentTarget);
                var value = checkbox.val();
                var field = checkbox.data('name');

                if(checkbox.is(':checked')) {
                    self.values[field].push(value)
                } else {
                    self.values[field] = _.without(self.values[field],value);
                }

                var aq = "";
                _.each(self.values, function (section, name) {
                    if(!_.isEmpty(section)) {
                        aq += "(" + advancedOptions[name] + "(" +section.map(function (elem) {
                                return '"' + elem + '"';
                            }).join() + "))";
                    }
                });

                var queryEncode = encodeURIComponent($('#menu-search-bar').val());

                self.$advencedQuery.val(aq);

                var ret = Backbone.history.navigate('/search/'+ (_.isNull(queryEncode) || _.isUndefined(queryEncode) ? "" : queryEncode), {trigger: true, replace: true});
                if(_.isUndefined(ret)) {
                    Backbone.history.loadUrl('/search/'+ (_.isNull(queryEncode) || _.isUndefined(queryEncode) ? "" : queryEncode));
                }

            }
        });
        return new LeftNavbarsView();
    }
);