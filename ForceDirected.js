'use strict';

(function () {
    var cells = [];


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


    const createLink = (source, target, type = "standard.Link") => {
        cells.push({ type: type, source: { id: source }, target: { id: target }, z: -1, attrs: { line: { targetMarker: null } } });
    }

    const createShape = (id, text, type = 'standard.Rectangle') => {
        if (type == 'standard.Rectangle') {
            cells.push({ id: id, type: 'standard.Rectangle', size: { width: 100, height: 50 }, attrs: { label: { text: text, fill: 'white' }, body: { fill: '#E67E22', stroke: '#D35400' } }, z: 2 })
        } else if (type == 'standard.Ellipse') {
            cells.push({ id: id, type: 'standard.Ellipse', size: { width: 100, height: 50 }, attrs: { label: { text: text, fill: 'white' }, body: { fill: '#8ab4f8', stroke: '#8abaf8' } }, z: 2 })
        }
    }


    const createEntity = (entityName, attributes = [{}]) => {
        createShape(entityName, entityName, 'standard.Rectangle');

        attributes &&
            attributes.constructor === Array &&
            attributes.forEach(function (single) {
                createShape(entityName + single, single, 'standard.Ellipse');
                createLink(entityName, entityName + single);
            })

    }

    const linkEntity = (source, target) => {
        createLink(source, target);
    }

    createEntity("contact", ["id", "phone_number", "join_date", "user_id", "leave_date"]);
    createEntity("user", ["id", "username", "password", "subscription", "email"]);
    createEntity("campaign",["id","user_id","name","description","type"]);
    createEntity("step",["id","campaign_id","text","name","description"]);
    // createEntity("contact_group")
    linkEntity("contact", "user");
    linkEntity("campaign","user");
    linkEntity("campaign","step")



    graph.fromJSON({ cells: cells });

    var graphLayout = new joint.layout.ForceDirected({
        graph: graph,
        width: 1500,
        height: 1500,
        gravityCenter: { x: 700, y: 300 },
        charge: 1000,
        linkDistance: 200,
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