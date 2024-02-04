'use strict';

(function () {

    let data = [
        {
            source_entity_title: "داده پایه کسب و کار (مرجع)",
            dest_entity_title: "داده پایه کسب و کار",
            source_entity_code: "401",
            dest_entity_code: "308",
            lineage_type: "source_to_mdm"
        },
        {
            source_entity_title: "مدارک تحصیلی مرجع - دانشگاه آزاد",
            dest_entity_title: "مدارک تحصیلی",
            source_entity_code: "3052",
            dest_entity_code: "3001",
            lineage_type: "source_to_mdm"
        },
        {
            source_entity_title: "اطلاعات ترمی دانشجو مرجع",
            dest_entity_title: "اطلاعات ترمی دانشجو",
            source_entity_code: "1001",
            dest_entity_code: "621",
            lineage_type: "source_to_mdm"
        },
        {
            source_entity_title: "رشته های تحصیلی دانشگاهی مرجع",
            dest_entity_title: "رشته های تحصیلی دانشگاهی",
            source_entity_code: "613",
            dest_entity_code: "609",
            lineage_type: "source_to_mdm"
        },
        {
            source_entity_title: "مدارک تحصیلی مرجع _ حوزه علمیه خواهران",
            dest_entity_title: "مدارک تحصیلی",
            source_entity_code: "3055",
            dest_entity_code: "3001",
            lineage_type: "source_to_mdm"
        },
        {
            source_entity_title: "اطلاعات نهایی تماس فرد",
            dest_entity_title: "اطلاعات نهایی تماس فرد مخزن",
            source_entity_code: "2005",
            dest_entity_code: "110",
            lineage_type: "source_to_mdm"
        },
        {
            source_entity_title: "دانشگاه ها",
            dest_entity_title: "ویوی رشته دانشگاه های بین الملل",
            source_entity_code: "608",
            dest_entity_code: "616",
            lineage_type: "mdm_2_destination"
        },
        {
            source_entity_title: "دانشگاه های خارجی (مرجع)",
            dest_entity_title: "دانشگاه های خارجی جدید",
            source_entity_code: "599",
            dest_entity_code: "601",
            lineage_type: "source_to_mdm"
        },
        {
            source_entity_title: "نوع پذیرش",
            dest_entity_title: "زیر داده پایه کسب و کار",
            source_entity_code: "603",
            dest_entity_code: "307",
            lineage_type: "source_to_mdm"
        },
        {
            source_entity_title: "مدارک تحصیلی مرجع _ حوزه علمیه خواهران [Duplicate]",
            dest_entity_title: "مدارک تحصیلی",
            source_entity_code: "3069",
            dest_entity_code: "3001",
            lineage_type: "source_to_mdm"
        },
        {
            source_entity_title: "فرد",
            dest_entity_title: "فرد مخزن",
            source_entity_code: "2001",
            dest_entity_code: "103",
            lineage_type: "source_to_mdm"
        },
        {
            source_entity_title: "زیر داده پایه کسب و کار (مرجع) دو",
            dest_entity_title: "زیر داده پایه کسب و کار",
            source_entity_code: "3066",
            dest_entity_code: "307",
            lineage_type: "source_to_mdm"
        },
        {
            source_entity_title: "مدارک تحصیلی مرجع - وزارت بهداشت",
            dest_entity_title: "مدارک تحصیلی",
            source_entity_code: "3053",
            dest_entity_code: "3001",
            lineage_type: "source_to_mdm"
        },
        {
            source_entity_title: "اطلاعات کلی فارغ التحصیل مرجع",
            dest_entity_title: "اطلاعات کلی فارغ التحصیل تستی",
            source_entity_code: "618",
            dest_entity_code: "617",
            lineage_type: "source_to_mdm"
        },
        {
            source_entity_title: "مدارک تحصیلی",
            dest_entity_title: "مدارک تحصیلی تست",
            source_entity_code: "3001",
            dest_entity_code: "3062",
            lineage_type: "mdm_2_destination"
        },
        {
            source_entity_title: "مدارک تحصیلی مرجع _ جامعه الزهرا",
            dest_entity_title: "مدارک تحصیلی",
            source_entity_code: "3056",
            dest_entity_code: "3001",
            lineage_type: "source_to_mdm"
        },
        {
            source_entity_title: "رشته های تحصیلی دانشگاهی",
            dest_entity_title: "رشته های تحصیلی دانشگاهی مقصد",
            source_entity_code: "609",
            dest_entity_code: "614",
            lineage_type: "mdm_2_destination"
        },
        {
            source_entity_title: "زیر داده پایه کسب و کار (مرجع) [Duplicate]",
            dest_entity_title: "زیر داده پایه کسب و کار",
            source_entity_code: "604",
            dest_entity_code: "307",
            lineage_type: "source_to_mdm"
        },
        {
            source_entity_title: "دانشگاه ها",
            dest_entity_title: "دانشگاه های مقصد",
            source_entity_code: "608",
            dest_entity_code: "611",
            lineage_type: "mdm_2_destination"
        },
        {
            source_entity_title: "مدارک تحصیلی مرجع - وزارت علوم",
            dest_entity_title: "مدارک تحصیلی",
            source_entity_code: "3051",
            dest_entity_code: "3001",
            lineage_type: "source_to_mdm"
        },
        {
            source_entity_title: "رشته",
            dest_entity_title: "رشته مقصد",
            source_entity_code: "606",
            dest_entity_code: "612",
            lineage_type: "mdm_2_destination"
        },
        {
            source_entity_title: "مدارک تحصیلی مرجع _  حوزه علمیه [Duplicate]",
            dest_entity_title: "مدارک تحصیلی",
            source_entity_code: "3067",
            dest_entity_code: "3001",
            lineage_type: "source_to_mdm"
        },
        {
            source_entity_title: "دانشجو",
            dest_entity_title: "دانشجو مخزن",
            source_entity_code: "2002",
            dest_entity_code: "106",
            lineage_type: "source_to_mdm"
        },
        {
            source_entity_title: "دانشگاه های خارجی جدید",
            dest_entity_title: "دانشگاه خارجی مقصد",
            source_entity_code: "601",
            dest_entity_code: "605",
            lineage_type: "mdm_2_destination"
        },
        {
            source_entity_title: "مدارک تحصیلی مرجع _  حوزه علمیه [Duplicate]",
            dest_entity_title: "مدارک تحصیلی",
            source_entity_code: "3068",
            dest_entity_code: "3001",
            lineage_type: "source_to_mdm"
        },
        {
            source_entity_title: "اطلاعات فارغ التحصیلی مرجع",
            dest_entity_title: "اطلاعات فارغ التحصیلی",
            source_entity_code: "1000",
            dest_entity_code: "620",
            lineage_type: "source_to_mdm"
        },
        {
            source_entity_title: "دانشگاه خارجی مرجع جدید",
            dest_entity_title: "دانشگاه های خارجی جدید",
            source_entity_code: "602",
            dest_entity_code: "601",
            lineage_type: "source_to_mdm"
        },
        {
            source_entity_title: "مدارک تحصیلی مرجع _  حوزه علمیه",
            dest_entity_title: "مدارک تحصیلی",
            source_entity_code: "3054",
            dest_entity_code: "3001",
            lineage_type: "source_to_mdm"
        },
        {
            source_entity_title: "اطلاعات پذیرش نهایی",
            dest_entity_title: "اطلاعات پذیرش نهایی مخزن",
            source_entity_code: "2003",
            dest_entity_code: "107",
            lineage_type: "source_to_mdm"
        },
        {
            source_entity_title: "پرسنل",
            dest_entity_title: "پرسنل مخزن",
            source_entity_code: "2006",
            dest_entity_code: "109",
            lineage_type: "source_to_mdm"
        },
        {
            source_entity_title: "دانشگاه ها",
            dest_entity_title: "دانشگاه های مقصد [Duplicate]",
            source_entity_code: "608",
            dest_entity_code: "615",
            lineage_type: "mdm_2_destination"
        },
        {
            source_entity_title: "اطلاعات تکمیلی فرد",
            dest_entity_title: "اطلاعات تکمیلی فرد مخزن",
            source_entity_code: "2004",
            dest_entity_code: "108",
            lineage_type: "source_to_mdm"
        },
        {
            source_entity_title: "زیر داده پایه کسب و کار (مرجع)",
            dest_entity_title: "زیر داده پایه کسب و کار",
            source_entity_code: "400",
            dest_entity_code: "307",
            lineage_type: "source_to_mdm"
        },
        {
            source_entity_title: "علمی کاربردی مرجع",
            dest_entity_title: "فارغ التحصیل های علمی کاربردی",
            source_entity_code: "991",
            dest_entity_code: "990",
            lineage_type: "source_to_mdm"
        },
        {
            source_entity_title: "زیر داده پایه کسب و کار تست",
            dest_entity_title: "زیر داده پایه کسب و کار",
            source_entity_code: "309",
            dest_entity_code: "307",
            lineage_type: "source_to_mdm"
        },
        {
            source_entity_title: "زیر کاتالوگ (مرجع)",
            dest_entity_title: "زیر داده پایه کسب وکار",
            source_entity_code: "402",
            dest_entity_code: "307",
            lineage_type: "source_to_mdm"
        },
        {
            source_entity_title: "دانشگاه های مرجع",
            dest_entity_title: "دانشگاه ها",
            source_entity_code: "610",
            dest_entity_code: "608",
            lineage_type: "source_to_mdm"
        },
        {
            source_entity_title: "مدارک تحصیلی",
            dest_entity_title: "مدارک تحصیلی ( مقصد )",
            source_entity_code: "3001",
            dest_entity_code: "3065",
            lineage_type: "mdm_2_destination"
        },
        {
            source_entity_title: "رشته مرجع",
            dest_entity_title: "رشته",
            source_entity_code: "607",
            dest_entity_code: "606",
            lineage_type: "source_to_mdm"
        }
    ]
    var namespace = joint.shapes;
    var graph = new joint.dia.Graph;
    var paper = new joint.dia.Paper({
        el: document.getElementById('myDiagram'),
        model: graph,
        width: "100%",
        height: "95vh",
        gridSize: 1,
        async: true,
        sorting: joint.dia.Paper.sorting.APPROX,
        // defaultAnchor: { name: 'modelCenter' },
        defaultConnectionPoint: { name: 'rectangle' }
    });

    let firstPos = 0;
    const createRect = (text, type) => {
        var rect = new joint.shapes.standard.Rectangle();
        rect.resize(320, 30);
        firstPos = firstPos + 35;
        rect.attr({
            body: {
                fill: '#E67E22',
                stroke: '#D35400'
            },
            label: {
                text: text,
                fill: 'white'
            }
        });
        if (type == "source") {
            rect.position(200, firstPos);
        } else if (type == "mdm") {
            rect.position(1000, firstPos);
        } else if (type == "destination") {
            rect.position(1800, firstPos);
        }
        rect.addTo(graph);
        // rect.toBack();
        return rect;
    }

    const createSourceEntity = () => {
        let sourceArray = []
        firstPos = 0
        data.forEach(function (single) {
            if (single['lineage_type'] == "source_to_mdm") {
                if (!sourceArray.includes(single["source_entity_code"])) {
                    sourceArray.push({
                        code: single["source_entity_code"],
                        title: single["source_entity_title"],
                        pointer: createRect(single["source_entity_title"], "source")
                    })
                }
            }
        })
        return sourceArray;
    }

    const createMdmEntity = () => {
        let mdmArray = []
        firstPos = 0
        data.forEach(function (single) {
            if (single['lineage_type'] == "source_to_mdm") {
                if (!mdmArray.includes(single["dest_entity_code"])) {
                    mdmArray.push({
                        code: single["dest_entity_code"],
                        title: single["dest_entity_title"],
                        pointer: createRect(single["dest_entity_title"], "mdm")
                    })
                }
            }
        })
        return mdmArray;
    }

    const createDestinationEntity = () => {
        let destinationArray = []
        firstPos = 0
        data.forEach(function (single) {
            if (single['lineage_type'] == "mdm_2_destination") {
                if (!destinationArray.includes(single["dest_entity_code"])) {
                    destinationArray.push({
                        code: single["dest_entity_code"],
                        title: single["dest_entity_title"],
                        pointer: createRect(single["dest_entity_title"], "destination")
                    })
                }
            }
        })
        return destinationArray;
    }



    const createLink = (source, target, text = "", type = "relation") => {
        var link = new joint.shapes.standard.Link();
        // link.set('connector', { name: 'normal' });
        // link.set('connector', { name: 'smooth' });
        // link.set({ name: 'rounded', args: { radius: 5 } });

        link.source(source, {
            anchor: {
                name: 'right',
            }
        });
        link.target(target, {
            anchor: {
                name: 'left',
            }
        });
        link.attr({
            line: {
                stroke: 'gray',
                strokeWidth: 2,
                sourceMarker: {
                    'type': 'path',
                    'stroke': 'black',
                    'fill': 'gray',
                    'd': 'M 10 -5 0 0 10 5 Z'
                },
                targetMarker: {
                    'type': 'path',
                    'stroke': 'black',
                    'fill': 'red',
                    'd': 'M 10 -5 0 0 10 5 Z'
                }
            }
        });
        // link.connector('jumpover', { size: 10 });
        link.labels([{
            attrs: {
                text: {
                    text: text
                }
            }
        }]);

        link.addTo(graph);

    }

    const makeDiagram = () => {
        let sourceArray = createSourceEntity();
        let mdmArray = createMdmEntity();
        let destinationArray = createDestinationEntity();

        data.forEach(function (single) {
            if (single['lineage_type'] == "source_to_mdm") {
                let sourceIndex = sourceArray.findIndex((element) => element.code == single['source_entity_code']);
                let mdmIndex = mdmArray.findIndex((element) => element.code == single['dest_entity_code']);
                createLink(sourceArray[sourceIndex].pointer, mdmArray[mdmIndex].pointer);
            } else if (single['lineage_type'] == "mdm_2_destination") {
                let mdmIndex = mdmArray.findIndex((element) => element.code == single['source_entity_code']);
                let destinationIndex = destinationArray.findIndex((element) => element.code == single['dest_entity_code']);
                createLink(mdmArray[mdmIndex].pointer, destinationArray[destinationIndex].pointer);
            }
        })
    }



    makeDiagram();

})();