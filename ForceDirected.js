'use strict';

(function () {


    var graph = new joint.dia.Graph;
    var paper = new joint.dia.Paper({
        el: document.getElementById('paper'),
        model: graph,
        width: 1500,
        height: 1500,
        gridSize: 1,
        async: true,
        frozen: true,
        sorting: joint.dia.Paper.sorting.APPROX,
        defaultAnchor: { name: 'modelCenter' },
        defaultConnectionPoint: { name: 'anchor' }
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

    const createShape = (text, type = 'standard.Rectangle') => {
        if (type == 'standard.Rectangle') {
            var rect = new joint.shapes.standard.Rectangle();
            rect.resize(100, 50);
            rect.attr({
                body: {
                    fill: '#E67E22', stroke: '#D35400'
                },
                label: {
                    text: text,
                    fill: 'white'
                }
            });
            rect.addTo(graph);
            rect.toBack();
            return rect;
        } else if (type == 'standard.Ellipse') {
            var rect = new joint.shapes.standard.Ellipse();
            rect.resize(80, 30);
            rect.attr({
                body: {
                    fill: '#8ab4f8', stroke: '#8abaf8'
                },
                label: {
                    text: text,
                    fill: 'white'
                }
            });
            rect.addTo(graph);
            return rect;
        }
    }


    const createEntity = (entityName, attributes = [{}]) => {
        const entity = createShape(entityName, 'standard.Rectangle');

        attributes &&
            attributes.constructor === Array &&
            attributes.forEach(function (single) {
                const attribute = createShape(single, 'standard.Ellipse');
                createLink(entity, attribute, "", "attrLink");
            })
        return entity;
    }

    const linkEntity = (source, target, text) => {
        createLink(source, target, text);
    }

    const contact = createEntity("contact", ["id", "user_id", "first_name", "last_name", "phone_number", "join_date", "leave_date"]);
    const user = createEntity("user", ["id", "username", "password", "subscription", "email", "expire_date"]);
    const campaign = createEntity("campaign", ["id", "user_id", "name", "description", "type",]);
    const campaign_contact = createEntity("campaign_contact", ["id", "contanct_id", "campaing_id"]);
    const step = createEntity("step", ["id", "campaign_id", "text", "name", "description"]);
    const options = createEntity("options",["id","user_id","key","value"]);


    linkEntity(contact, user, "1-N");
    linkEntity(campaign, user, "1-1");
    linkEntity(campaign, step, "N-M")
    linkEntity(campaign_contact, campaign, "N-M")
    linkEntity(campaign_contact, contact, "N-M")
    linkEntity(options,user,"1-N");





    var graphLayout = new joint.layout.ForceDirected({
        graph: graph,
        width: 1500,
        height: 1500,
        gravityCenter: { x: 700, y: 300 },
        charge: 1000,
        linkDistance: 100,
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