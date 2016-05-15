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
        var LeftNavbarsView = Backbone.View.extend({

            el: '.left-navbars',

            events: {
            },

            initialize: function () {
                var self = this;
                self.template = _.template(LeftNavbars);
                self.collapseTemplate = _.template(CollapseTemplate);
                self.collection = new FieldValuesCollection(5);
                self.render();
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

            render: function () {
                this.$el.html(this.template);
                $('.collapse').collapse();
            },

            renderCollapseSection: function (models, name) {
                var self = this;
                $('#'+ name + '-collapse .panel-body').append(self.collapseTemplate({
                    name: name,
                    entities: models
                }));
            }
        });
        return LeftNavbarsView;
    }
);