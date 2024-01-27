'use strict';

(function () {

    var graph = new joint.dia.Graph;
    var paper = new joint.dia.Paper({
        el: document.getElementById('myDiagram'),
        model: graph,
        width: "100%",
        height: "95vh",
        gridSize: 1,
        async: true,
        frozen: true,
        cellViewNamespace: joint.shapes,
        sorting: joint.dia.Paper.sorting.APPROX,
        defaultAnchor: { name: 'modelCenter' },
        defaultConnectionPoint: { name: 'anchor' }
    });


    // Create a custom element.
    // ------------------------

    joint.shapes.html = {};
    joint.shapes.html.Element = joint.shapes.basic.Rect.extend({
        defaults: joint.util.deepSupplement({
            type: 'html.Element',
            attrs: {
                rect: { stroke: 'none', 'fill-opacity': 0 }
            }
        }, joint.shapes.basic.Rect.prototype.defaults)
    });

    // Create a custom view for that element that displays an HTML div above it.
    // -------------------------------------------------------------------------

    joint.shapes.html.ElementView = joint.dia.ElementView.extend({

        template: [
            '<div class="html-element">',
            // '<button class="delete">x</button>',
            '<label></label>',
            '<ul></ul>',
            '<span></span>', '<br/>',
            '</div>'
        ].join(''),

        initialize: function () {
            _.bindAll(this, 'updateBox');
            joint.dia.ElementView.prototype.initialize.apply(this, arguments);

            this.$box = $(_.template(this.template)());
            // Prevent paper from handling pointerdown.
            this.$box.find('input,select').on('mousedown click', function (evt) {
                evt.stopPropagation();
            });
            // This is an example of reacting on the input change and storing the input data in the cell model.
            this.$box.find('input').on('change', _.bind(function (evt) {
                this.model.set('input', $(evt.target).val());
            }, this));
            this.$box.find('select').on('change', _.bind(function (evt) {
                this.model.set('select', $(evt.target).val());
            }, this));
            this.$box.find('select').val(this.model.get('select'));
            this.$box.find('.delete').on('click', _.bind(this.model.remove, this.model));
            // Update the box position whenever the underlying model changes.
            this.model.on('change', this.updateBox, this);
            // Remove the box when the model gets removed from the graph.
            this.model.on('remove', this.removeBox, this);

            this.updateBox();
        },
        render: function () {
            joint.dia.ElementView.prototype.render.apply(this, arguments);
            this.paper.$el.prepend(this.$box);
            this.updateBox();
            return this;
        },
        updateBox: function () {
            // Set the position and dimension of the box so that it covers the JointJS element.
            var bbox = this.model.getBBox();
            // Example of updating the HTML with a data stored in the cell model.
            this.$box.find('label').text(this.model.get('label'));
            this.$box.find('ul').text(this.model.get('ul'));
            this.$box.find('span').text(this.model.get('select'));
            this.$box.css({
                width: bbox.width,
                height: bbox.height,
                left: bbox.x,
                top: bbox.y,
                transform: 'rotate(' + (this.model.get('angle') || 0) + 'deg)'
            });
        },
        removeBox: function (evt) {
            this.$box.remove();
        }
    });

    // Create JointJS elements and add them to the graph as usual.
    // -----------------------------------------------------------

    var el1 = new joint.shapes.html.Element({
        position: { x: 80, y: 80 },
        size: { width: 150, height: 200 },
        label: 'salam',
        ul: 'test test2 test3 salam in yek field toolanie',
        select: 'one'
    });
    var el2 = new joint.shapes.html.Element({
        position: { x: 370, y: 160 },
        size: { width: 150, height: 200 },
        label: 'Me_too',
        select: 'two'
    });
    var l = new joint.dia.Link({
        source: { id: el1.id },
        target: { id: el2.id },
        attrs: { '.connection': { 'stroke-width': 5, stroke: '#34495E' } }
    });

    const createLink = (source, target, text = "", type = "relation") => {
        var link = new joint.shapes.standard.Link();
        link.source(source);
        link.target(target);
        link.addTo(graph);
        link.toBack();

        // link.connector('jumpover', { size: 10 });
        link.labels([{
            attrs: {
                text: {
                    text: text
                }
            }
        }]);
        if (type == "relation") {
            link.attr({
                line: {
                    stroke: '#000000',
                    strokeWidth: 2,
                    sourceMarker: null,
                    targetMarker: null
                }
            })
            // link.router('orthogonal');
        } else {
            link.attr({
                line: {
                    stroke: '#3498DB77',
                    strokeWidth: 1,
                    strokeDasharray: '5 5',
                    strokeDashoffset: 7.5,
                    sourceMarker: null,
                    targetMarker: null
                }
            })
        }
    }

    const createShape = (text, type = 'standard.Rectangle', underline = 'none') => {

        if (type == 'standard.Rectangle') {
            var rect = new joint.shapes.standard.Rectangle();
            rect.resize(100, 50);
            rect.attr({
                body: {
                    fill: '#E67E22',
                    stroke: '#D35400'
                },
                label: {
                    text: text,
                    'text-decoration': underline,
                    fill: 'white'
                }
            });
            rect.addTo(graph);
            // rect.toBack();
            return rect;
        } else if (type == 'standard.Ellipse') {
            var rect = new joint.shapes.standard.Ellipse();
            rect.resize(80, 30);
            rect.attr({
                body: {
                    fill: '#8ab4f8',
                    stroke: '#8abaf8'
                },
                label: {
                    text: text,
                    'text-decoration': underline,
                    fill: 'white'
                }
            });
            rect.addTo(graph);
            return rect;
        }
    }


    const createEntity = (entityName, attributes = [{}], primaryKey = null) => {
        var entity = new joint.shapes.html.Element({
            position: { x: 80, y: 80 },
            size: { width: 150, height: 180 },
            label: entityName,
            ul: attributes.join(' '),
        });
        graph.addCells([entity]);
        return entity;
        // attributes &&
        //     attributes.constructor === Array &&
        //     attributes.forEach(function (single) {
        //         let attribute;
        //         if (primaryKey == single) {
        //             attribute = createShape(single, 'standard.Ellipse', 'underline');
        //         } else {
        //             attribute = createShape(single, 'standard.Ellipse');
        //         }
        //         createLink(entity, attribute, "", "attrLink");
        //     })
        // return entity;
    }

    const linkEntity = (source, target, text) => {
        // createLink(source, target, text);
        var link = new joint.dia.Link({
            source: { id: source.id },
            target: { id: target.id },
            attrs: {
                line: {
                    stroke: '#3498DB',
                    strokeWidth: 3,
                    strokeDasharray: '5 5',
                    strokeDashoffset: 7.5,
                    sourceMarker: {
                        'type': 'path',
                        'stroke': 'none',
                        'fill': '#3498DB',
                        'd': 'M 20 -10 0 0 20 10 Z \
                        M 40 -10 20 0 40 10 Z'
                    },
                    targetMarker: {
                        'type': 'path',
                        'stroke': 'none',
                        'fill': '#3498DB',
                        'd': 'M 7.5 -10 2.5 -10 2.5 10 7.5 10 Z \
                        M 17.5 -10 12.5 -10 12.5 10 17.5 10 Z \
                        M 40 -10 20 0 40 10 Z'
                    }
                }, '.connection': { 'stroke-width': 2, stroke: '#34495E', }
            }
        });
        graph.addCells([link]);
    }


    const contact = createEntity("contact", ["id", "user_id", "first_name", "last_name", "phone_number", "join_date", "leave_date"], "id");
    const user = createEntity("user", ["id", "username", "password", "subscription", "email", "expire_date"], "id");
    const campaign = createEntity("campaign", ["id", "user_id", "name", "description", "type",], "id");
    const step = createEntity("step", ["id", "campaign_id", "text", "name", "description"], "id");
    const execution = createEntity("execution", ["id", "step_id", "contact_id", "execution_date", "status"], "id")
    const options = createEntity("options", ["id", "user_id", "key", "value"], "id");
    const group = createEntity("group", ["id", "user_id", "name", "description"], "id")


    linkEntity(contact, user, "1-N");
    linkEntity(campaign, user, "1-N");
    linkEntity(campaign, step, "1-N");
    linkEntity(campaign, contact, "N-M");
    linkEntity(options, user, "1-N");
    linkEntity(execution, contact, "1-N");
    linkEntity(execution, step, "1-N");
    linkEntity(group, contact, "N-M");






    var graphLayout = new joint.layout.ForceDirected({
        graph: graph,
        width: 1500,
        height: 1500,
        gravityCenter: { x: 800, y: 300 },
        charge: 10000,
        linkDistance: 250,
    });

    graphLayout.start();

    paper.unfreeze();

    let animateSteps = 5;
    let count = 0;

    startAnimate();
    function startAnimate() {
        count = 0;
        for (let index = 0; index < 5000; index++) {
            animate();

        }
    }
    function animate() {
        count++;
        if (count <= animateSteps) {
            joint.util.nextFrame(animate);
        }
        graphLayout.step();
    }

    $('#btn-layout').on('click', startAnimate);
})();