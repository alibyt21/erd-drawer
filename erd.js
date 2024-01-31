"use strict";

(function () {
    var graph = new joint.dia.Graph();
    var paper = new joint.dia.Paper({
        el: document.getElementById("myDiagram"),
        model: graph,
        width: "100%",
        height: "95vh",
        gridSize: 1,
        async: true,
        frozen: true,
        sorting: joint.dia.Paper.sorting.APPROX,
        defaultAnchor: { name: "modelCenter" },
        defaultConnectionPoint: { name: "anchor" },
    });

    const createLink = (source, target, text = "", type = "relation") => {
        var link = new joint.shapes.standard.Link();
        link.source(source);
        link.target(target);
        link.addTo(graph);
        link.toBack();

        // link.connector('jumpover', { size: 10 });
        link.labels([
            {
                attrs: {
                    text: {
                        text: text,
                    },
                },
            },
        ]);
        if (type == "relation") {
            link.attr({
                line: {
                    stroke: "#000000",
                    strokeWidth: 2,
                    sourceMarker: null,
                    targetMarker: null,
                },
            });
            // link.router('orthogonal');
        } else {
            link.attr({
                line: {
                    stroke: "#3498DB77",
                    strokeWidth: 1,
                    strokeDasharray: "5 5",
                    strokeDashoffset: 7.5,
                    sourceMarker: null,
                    targetMarker: null,
                },
            });
        }
    };

    const createShape = (
        text,
        type = "standard.Rectangle",
        underline = "none"
    ) => {
        if (type == "standard.Rectangle") {
            var rect = new joint.shapes.standard.Rectangle();
            rect.resize(100, 50);
            rect.attr({
                body: {
                    fill: "#E67E22",
                    stroke: "#D35400",
                },
                label: {
                    text: text,
                    "text-decoration": underline,
                    fill: "white",
                },
            });
            rect.addTo(graph);
            // rect.toBack();
            return rect;
        } else if (type == "standard.Ellipse") {
            var rect = new joint.shapes.standard.Ellipse();
            rect.resize(80, 30);
            rect.attr({
                body: {
                    fill: "#8ab4f8",
                    stroke: "#8abaf8",
                },
                label: {
                    text: text,
                    "text-decoration": underline,
                    fill: "white",
                },
            });
            rect.addTo(graph);
            return rect;
        }
    };

    const createEntity = (entityName, attributes = [{}], primaryKey = null) => {
        const entity = createShape(entityName, "standard.Rectangle");

        attributes &&
            attributes.constructor === Array &&
            attributes.forEach(function (single) {
                let attribute;
                if (primaryKey == single) {
                    attribute = createShape(
                        single,
                        "standard.Ellipse",
                        "underline"
                    );
                } else {
                    attribute = createShape(single, "standard.Ellipse");
                }
                createLink(entity, attribute, "", "attrLink");
            });
        return entity;
    };

    const linkEntity = (source, target, text) => {
        createLink(source, target, text);
    };

    const contact = createEntity(
        "contact",
        [
            "id",
            "user_id",
            "first_name",
            "last_name",
            "email",
            "username",
            "phone",
            "join_date",
            "leave_date",
        ],
        "id"
    );
    const user = createEntity(
        "user",
        ["id", "email", "password", "subscription", "type", "expire_date"],
        "id"
    );
    const campaign = createEntity(
        "campaign",
        ["id", "user_id", "name", "description", "type"],
        "id"
    );
    const step = createEntity(
        "step",
        [
            "id",
            "campaign_id",
            "type",
            "name",
            "description",
            "order",
            "step_time",
            "text",
        ],
        "id"
    );
    const execution = createEntity(
        "execution",
        ["id", "step_id", "contact_id", "execution_time", "status"],
        "id"
    );
    const options = createEntity(
        "options",
        ["id", "user_id", "key", "value"],
        "id"
    );
    const group = createEntity(
        "group",
        ["id", "user_id", "name", "description"],
        "id"
    );
    const message = createEntity(
        "message",
        [
            "id",
            "step_id",
            "message_id",
            "name",
            "type",
            "order",
            "text",
            "pattern",
        ],
        "id"
    );

    linkEntity(contact, user, "1-N");
    linkEntity(campaign, user, "1-N");
    linkEntity(campaign, step, "1-N");
    linkEntity(campaign, contact, "N-M");
    linkEntity(options, user, "1-N");
    linkEntity(execution, contact, "1-N");
    linkEntity(execution, step, "1-N");
    linkEntity(group, contact, "N-M");
    linkEntity(step, message,"1-N");
    linkEntity(group,user,"1-N");

    var graphLayout = new joint.layout.ForceDirected({
        graph: graph,
        width: 1500,
        height: 1500,
        gravityCenter: { x: 800, y: 300 },
        charge: 1300,
        linkDistance: 10,
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

    $("#btn-layout").on("click", startAnimate);

    // joint.shapes.basic.DecoratedRect = joint.shapes.basic.Generic.extend({

    //     markup: '<g class="rotatable"><g class="scalable"><rect/></g><image/><text/></g>',

    //     defaults: joint.util.deepSupplement({

    //         type: 'basic.DecoratedRect',
    //         size: { width: 100, height: 60 },
    //         attrs: {
    //             'rect': { fill: '#FFFFFF', stroke: 'black', width: 100, height: 60 },
    //             'text': { 'font-size': 14, text: '', 'ref-x': .5, 'ref-y': .5, ref: 'rect', 'y-alignment': 'middle', 'x-alignment': 'middle', fill: 'black' },
    //             'text2': { 'font-size': 24, text: 'some text', 'ref-x': .7, 'ref-y': .7, ref: 'rect', 'y-alignment': 'middle', 'x-alignment': 'middle', fill: 'black' },

    //             'image': { 'ref-x': 2, 'ref-y': 2, ref: 'rect', width: 16, height: 16 }
    //         }

    //     }, joint.shapes.basic.Generic.prototype.defaults)
    // });

    // var decoratedRect = new joint.shapes.basic.DecoratedRect({
    //     position: { x: 150, y: 80 },
    //     size: { width: 100, height: 60 },
    //     attrs: {
    //         text: { text: 'My Element' },
    //         text2: { text: 'hello world' },

    //         image: { 'xlink:href': 'https://assets-global.website-files.com/63061d4ee85b5a18644f221c/64db4e708003b5f97676b7b1_react.png' }
    //     }
    // });
    // graph.addCell(decoratedRect);
})();
