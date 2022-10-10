var myApp = {};
myApp.makeRequest = function (method, url) {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                resolve(xhr.response);
            } else {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            }
        };
        xhr.onerror = function () {
            reject({
                status: this.status,
                statusText: xhr.statusText
            });
        };
        xhr.send();
    });
};

myApp.getCookie = function (name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
};
myApp.makeRequestWithCookieCSRFToken = function (method, url, data) {
    return new Promise(function (resolve, reject) {
        let csrftokenCookie = myApp.getCookie('csrftoken');
        let csrftoken = jQuery("[name=csrfmiddlewaretoken]").val();
        let dataStr = ''
        for (var key in data) {
            dataStr += key.toString() + '=' + (data[key]).toString() + '&'
        }
        dataStr += 'csrfmiddlewaretoken' + '=' + csrftoken.toString()
        let xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        xhr.setRequestHeader('X-CSRFToken', csrftokenCookie);
        xhr.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                resolve(xhr.response);
            } else {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            }
        };
        xhr.onerror = function () {
            reject({
                status: this.status,
                statusText: xhr.statusText
            });
        };
        xhr.send(dataStr);
    });
};

myApp.createElement = function (type, className) {
    var element = document.createElement(type);
    if (className) {
        let classList = className.split(" ")
        element.classList.add(...classList);
    }
    return element
};
myApp.createDiv = function (ClassName) {
    var div = myApp.createElement('div', ClassName);
    return div;
};
myApp.createSpan = function (ClassName) {
    var span = myApp.createElement('span', ClassName);
    return span;
};
myApp.createA = function (ClassName) {
    var a = myApp.createElement('a', ClassName);
    return a;
};
myApp.createButton = function (ClassName) {
    var a = myApp.createElement('button', ClassName);
    return a;
};
myApp.createI = function (ClassName) {
    var i = myApp.createElement('i', ClassName);
    return i;
};
myApp.createImg = function (ClassName) {
    var img = myApp.createElement('img', ClassName);
    return img;
};
myApp.createInput = function (ClassName) {
    var i = myApp.createElement('input', ClassName);
    return i;
};
myApp.createSelect = function (ClassName) {
    var i = myApp.createElement('select', ClassName);
    return i;
};
myApp.createOption = function (ClassName) {
    var i = myApp.createElement('option', ClassName);
    return i;
};
myApp.createH = function (HeadingNumber, ClassName) {
    var i = myApp.createElement('h' + HeadingNumber.toString(), ClassName);
    return i;
};
myApp.createLabel = function (ClassName) {
    var i = myApp.createElement('label', ClassName);
    return i;
}
myApp.createInput = function (ClassName) {
    var i = myApp.createElement('input', ClassName);
    return i;
}
myApp.createB = function (ClassName) {
    var i = myApp.createElement('b', ClassName);
    return i;
}
myApp.createBr = function (ClassName) {
    var i = myApp.createElement('br', ClassName);
    return i;
}
myApp.createHr = function (ClassName) {
    var i = myApp.createElement('hr', ClassName);
    return i;
}
myApp.createP = function (ClassName) {
    var i = myApp.createElement('p', ClassName);
    return i;
}
myApp.createStrong = function (ClassName) {
    var i = myApp.createElement('strong', ClassName);
    return i;
}
myApp.InlineRadio = function (ID, name, InnerText, checked, LayerId) {
    let OuterDiv = myApp.createDiv('custom-control custom-radio custom-control-inline')

    let RadioInput = myApp.createInput('custom-control-input');
    RadioInput.setAttribute('type', 'radio');
    RadioInput.setAttribute('id', ID);
    RadioInput.setAttribute('value', LayerId);
    RadioInput.setAttribute('LayerId', LayerId);
    RadioInput.setAttribute('name', name);
    RadioInput.checked = checked;

    let LavelTag = myApp.createLabel('custom-control-label');
    LavelTag.setAttribute('for', ID);
    LavelTag.innerText = InnerText;

    OuterDiv.append(RadioInput);
    OuterDiv.append(LavelTag);

    return OuterDiv
};
myApp.layerswitcher = function () {
    myApp.LayerSwitcherButton = myApp.createDiv('ol-unselectable ol-control');
    myApp.LayerSwitcherButton.setAttribute("id", "layer-switcher");
    let button = myApp.createButton();
    button.setAttribute("type", "button");
    button.setAttribute("title", "Layers");
    let img = myApp.createImg();
    img.setAttribute("src", "/static/" + TethysAppName + "/images/layers.svg");
    img.setAttribute("style", "height: 20px; width: 20px;");

    button.append(img);
    myApp.LayerSwitcherButton.append(button);

    let olOverlaycontainer = document.querySelector('div.ol-overlaycontainer-stopevent');
    olOverlaycontainer.append(myApp.LayerSwitcherButton);

    myApp.layerSwitcherDiv = myApp.createDiv()
    myApp.layerSwitcherDiv.setAttribute('id', 'layer');

    // base map start
    let upperDiv = myApp.createDiv();
    let headingBaseMap = myApp.createH('6', 'centering font-weight-bold');
    headingBaseMap.innerText = 'Base Maps';

    let RadioDiv1 = myApp.InlineRadio("inlineRadio1", "inLineRadioBaseMap", "None", false, "none");
    let RadioDiv2 = myApp.InlineRadio("inlineRadio2", "inLineRadioBaseMap", "OSM", true, 'osm');
    let RadioDiv3 = myApp.InlineRadio("inlineRadio3", "inLineRadioBaseMap", "Satellite", false, 'satellite');

    upperDiv.append(headingBaseMap);
    upperDiv.append(RadioDiv1);
    upperDiv.append(RadioDiv2);
    upperDiv.append(RadioDiv3);

    myApp.layerSwitcherDiv.append(upperDiv)
    olOverlaycontainer.append(myApp.layerSwitcherDiv);

};
myApp.myMap = function () {


    var bounds = [7891884.212992651, 1804466.716251087, 11713689.442648297, 4095581.1198630673]// var zoomToExtentControl = new ol.control.ZoomToExtent({
    //     extent: bounds
    // });


    //for adjusting View
    //     ol.proj.transform(myApp.map.getView().getCenter(), 'EPSG:3857', 'EPSG:4326')


    // let bbox=myApp.map.getView().calculateExtent()
    // let longMinLatMin=ol.proj.transform([bbox[0],bbox[1]], 'EPSG:3857', 'EPSG:4326')
    // let longMaxLatMax=ol.proj.transform([bbox[2],bbox[3]], 'EPSG:3857', 'EPSG:4326')


    // myApp.view = new ol.View({
    //     center: ol.proj.transform([84.87911057853935, 28.33233423278891], 'EPSG:4326', 'EPSG:3857'),
    //     zoom: 5.1069803526158335,
    //     extent: [6702855.884774126, 1769255.1930753174, 12194542.852403797, 4812621.833531793]
    // });

    myApp.view = new ol.View({
        center: ol.proj.transform([84.87911057853935, 28.33233423278891], 'EPSG:4326', 'EPSG:3857'),
        zoom: 5.1069803526158335,
        // extent: [6702855.884774126, 1769255.1930753174, 12194542.852403797, 4812621.833531793]
    });
    var OSMLayer = new ol.layer.Tile({
        id: "osm",
        title: "Open Street Map",
        visible: true,
        opacity: 0.7,
        source: new ol.source.OSM(),
        mask: 0
    });
    var bingLayer = new ol.layer.Tile({
        id: "satellite",
        visible: false,
        source: new ol.source.BingMaps({
            key: 'ApTJzdkyN1DdFKkRAE6QIDtzihNaf6IWJsT-nQ_2eMoO4PN__0Tzhl2-WgJtXFSp',
            imagerySet: 'AerialWithLabels'
        })
    });

    myApp.BaseLayerList = [OSMLayer, bingLayer];
    var HighLightedLayerSource = new ol.source.Vector();

    // myApp.mousePositionControl = new ol.control.MousePosition({
    //     coordinateFormat: function (a) {
    //         var b = `Latitude:${a[1].toFixed(5)}, Longitude:${a[0].toFixed(5)}`;
    //         return b;
    //     },
    //     // coordinateFormat: ol.coordinate.createStringXY(5),
    //     projection: 'EPSG:4326',
    //     // comment the following two lines to have the mouse position
    //     // be placed within the map.
    //     className: 'well',
    //     target: document.getElementById('mouse-position-div'),
    //     undefinedHTML: '',
    // });
    myApp.HighLightedLayer = new ol.layer.Vector({
        id: "highlightedlayer",
        title: "highlightedlayer",
        style: new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: '#000000',
                width: 1.5
            }),
            fill: new ol.style.Fill({
                color: 'rgba(200, 214, 229,0)'
                // color:'#1abc9c'
            })
        }),
        source: HighLightedLayerSource,
        mask: 0
    });
    myApp.HighLightedLayer.setZIndex(99);
    var fullScreenMode = new ol.control.FullScreen();

    var layers = [];
    layers.push(OSMLayer);
    layers.push(bingLayer);
    // layers.push(myApp.HighLightedLayer);
    myApp.map = new ol.Map({
        target: 'map-container',
        layers: layers,
        renderer: 'canvas',
        controls: ol.control.defaults({
            attribution: false
        }).extend([
            // myApp.mousePositionControl,
        ]),
        // controls: ol.control.defaults({
        //     attribution: false
        // }),
        view: myApp.view,
        loadTilesWhileAnimating: true,
    });
    myApp.map.getView().fit(bounds);
    // myApp.map.getView().setZoom(myApp.map.getView().getZoom() - 5);


//    map interaction start
    // Draw source ******************************************************************************
    myApp.Drawsource = new ol.source.Vector({wrapX: false});
    let drawStyle = new ol.style.Style({
        image: new ol.style.Icon({
            src: '/static/hiwat/images/location-icon.png',
            // fill: new ol.style.Fill({color: '#53A9EB'}),
            // stroke: new ol.style.Stroke({color: 'white', width: 1}),
            rotateWithView: true,
            anchor: [.5, 0.90],
            anchorXUnits: 'fraction', anchorYUnits: 'fraction',
            opacity: 1
        })
    });

    myApp.DrawPointLayer = new ol.layer.Vector({
        id: 'DrawPointLayer',
        title: 'DrawPointLayer',
        source: myApp.Drawsource,
        style: drawStyle
    });
    myApp.DrawPolygonLayer = new ol.layer.Vector({
        id: 'DrawPolygonLayer',
        title: 'DrawPolygonLayer',
        source: myApp.Drawsource,
        style: new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: 'blue',
                width: 3
            }),
            fill: new ol.style.Fill({
                color: 'rgba(0, 0, 255, 0)'
            })
        }),
        zIndex: 99
    });
    myApp.map.addLayer(myApp.DrawPointLayer);
    myApp.map.addLayer(myApp.DrawPolygonLayer);

    var container = document.getElementById('popup');

    /**
     * Create an overlay to anchor the popup to the map.
     */

    myApp.locationOverlay = new ol.Overlay({
        element: container,
        autoPan: true,
        autoPanAnimation: {
            duration: 250
        }
    });

    myApp.locationOverlay.setPosition(undefined);
    myApp.map.addOverlay(myApp.locationOverlay);


    myApp.drawPoint = new ol.interaction.Draw({
        source: myApp.Drawsource,
        type: 'Point',
        style: drawStyle
    });
    myApp.drawPoint.on('drawend', function (e) {
        $('#ChartModel').modal('show');
        myApp.PointDrawEventObjet = e;
        let lastFeature = e.feature;
        var co = lastFeature.getGeometry().getCoordinates();
        var format = new ol.format.WKT();
        point = format.writeGeometry(lastFeature.getGeometry());
        myApp.map.removeInteraction(myApp.drawPoint);
        myApp.pointPixel = myApp.map.getPixelFromCoordinate(co);
        myApp.PointCoordinate = co;
        var coordinate = co;

        setTimeout(async function () {

            myApp.Drawsource.clear();
            myApp.DrawPointLayer.setVisible(true);
            myApp.DrawPointLayer.setVisible(true);
            myApp.locationOverlay.setPosition(coordinate);
            var groupAndVar = myApp.getCurrentSelectedLayerId().split('___');
            var strCoordinates = ol.proj.transform(coordinate, 'EPSG:3857', 'EPSG:4326').join(',');
            var Param = {
                variable: groupAndVar[1],
                interval: groupAndVar[0],
                interaction: "Point",
                geom_data: strCoordinates
            }
            var response = await myApp.makeRequestWithCookieCSRFToken('POST', '/apps/hiwat/get-ts/', Param);
            var ParseResponse = JSON.parse(response);
            var chartTitle = $('#var_table option[value="' + groupAndVar[1] + '"]').text() + ' values at ' + ParseResponse.data.geom.join(',');
            var unit = $('#var_table option[value="' + groupAndVar[1] + '"]').attr('unit');
            var seriesName = $('#var_table option[value="' + groupAndVar[1] + '"]').attr('chartTitle');
            var HcObject = myApp.datetimeChartObj(chartTitle, '', ParseResponse.data.plot, seriesName, unit, 'Date', 'rgb(124, 181, 236)');
            $('#timeSeriesPlot').highcharts(HcObject);
        }, 60);


    });
    myApp.drawPoint.on('drawstart', function (e) {
        myApp.Drawsource.clear();
    });

    myApp.drawPolygon = new ol.interaction.Draw({
        freehandCondition: ol.events.condition.never,
        source: myApp.Drawsource,
        type: 'Polygon',
    });

    myApp.drawPolygon.on('drawend', async function (e) {
        $('#ChartModel').modal('show');
        myApp.map.removeInteraction(myApp.drawPolygon);
        let lastFeature = e.feature;
        var format = new ol.format.GeoJSON();
        myApp.map.removeInteraction(myApp.drawPolygon);

        var Polygon = format.writeGeometry(lastFeature.getGeometry(), {
            dataProjection: 'EPSG:4326',
            featureProjection: 'EPSG:3857'
        });
        var groupAndVar = myApp.getCurrentSelectedLayerId().split('___');
        var Param = {
            variable: groupAndVar[1],
            interval: groupAndVar[0],
            interaction: "Polygon",
            geom_data: Polygon
        }
        var response = await myApp.makeRequestWithCookieCSRFToken('POST', '/apps/hiwat/get-ts/', Param);
        var ParseResponse = JSON.parse(response);
        var chartTitle = $('#var_table option[value="' + groupAndVar[1] + '"]').text() + ' values at ' + ParseResponse.data.geom.join(',');
        var unit = $('#var_table option[value="' + groupAndVar[1] + '"]').attr('unit');
        var seriesName = $('#var_table option[value="' + groupAndVar[1] + '"]').attr('chartTitle');
        var HcObject = myApp.datetimeChartObj(chartTitle, '', ParseResponse.data.plot, seriesName, unit, 'Date', 'rgb(124, 181, 236)');
        $('#timeSeriesPlot').highcharts(HcObject);
    });

    myApp.drawPolygon.on('drawstart', function (e) {
        myApp.Drawsource.clear();
        myApp.locationOverlay.setPosition(undefined);
    });


//    map interaction end


}
myApp.layerswitcher = function () {
    myApp.LayerSwitcherButton = myApp.createDiv('ol-unselectable ol-control');
    myApp.LayerSwitcherButton.setAttribute("id", "layer-switcher");
    let button = myApp.createButton();
    button.setAttribute("type", "button");
    button.setAttribute("title", "Layers");
    let img = myApp.createImg();
    img.setAttribute("src", "/static/hiwat/images/layers.svg");
    img.setAttribute("style", "height: 20px; width: 20px;");

    button.append(img);
    myApp.LayerSwitcherButton.append(button);

    let olOverlaycontainer = document.querySelector('div.ol-overlaycontainer-stopevent');
    olOverlaycontainer.append(myApp.LayerSwitcherButton);

    myApp.layerSwitcherDiv = myApp.createDiv()
    myApp.layerSwitcherDiv.setAttribute('id', 'layer');

    //base map start
    let upperDiv = myApp.createDiv();
    let headingBaseMap = myApp.createH('6', 'centering font-weight-bold');
    headingBaseMap.innerText = 'Base Maps';

    let RadioDiv1 = myApp.InlineRadio("inlineRadio1", "inLineRadioBaseMap", "None", false, "none");
    let RadioDiv2 = myApp.InlineRadio("inlineRadio2", "inLineRadioBaseMap", "OSM", true, 'osm');
    let RadioDiv3 = myApp.InlineRadio("inlineRadio3", "inLineRadioBaseMap", "Satellite", true, 'satellite');

    upperDiv.append(headingBaseMap);
    upperDiv.append(RadioDiv1);
    upperDiv.append(RadioDiv2);
    upperDiv.append(RadioDiv3);

    //base map end

    let lowerDiv = myApp.createDiv("layerSwitcherLowerdiv");

    let OtherLayersH4 = myApp.createH(6, 'centering font-weight-bold');
    OtherLayersH4.innerText = 'Layers';
    let layerCollectionDiv = myApp.createDiv("layerCollection");


    lowerDiv.append(OtherLayersH4);
    lowerDiv.append(layerCollectionDiv);
    myApp.layerSwitcherDiv.append(upperDiv);
    // myApp.layerSwitcherDiv.append(lowerDiv);
    olOverlaycontainer.append(myApp.layerSwitcherDiv)

    var radiobtn = document.getElementById("inlineRadio2");
    radiobtn.checked = true;


    // $('#satellite-Slider').slider({
    //     tooltip: 'always', step: 1, min: 0, max: 100,
    //     formatter: function (value) {
    //         return value + " %";
    //     }
    // });
};

myApp.DrawUI = function () {
    let DrawSection = myApp.createDiv('draw-section');
    DrawSection.setAttribute("id", "draw-section");
    let DrawPannel = myApp.createDiv('draw-pannel');
    let polygonAnchor = myApp.createA('ol-draw-polygon');
    polygonAnchor.setAttribute("title", "Draw a polygon");
    let pointAnchor = myApp.createA('ol-draw-point');
    pointAnchor.setAttribute("title", "Draw a point");

    DrawPannel.append(polygonAnchor);
    DrawPannel.append(pointAnchor);

    DrawSection.append(DrawPannel)

    let olOverlaycontainer = document.querySelector('div.ol-overlaycontainer-stopevent');
    olOverlaycontainer.append(DrawSection);

    let deleteFeature = myApp.createDiv('clear-features');
    let deleteFeaturePannel = myApp.createDiv('clear-feature');
    let clearFeatureAnchor = myApp.createA('clear-layer');
    clearFeatureAnchor.setAttribute("title", "Clear AOI");
    deleteFeaturePannel.append(clearFeatureAnchor);
    deleteFeature.append(deleteFeaturePannel);
    olOverlaycontainer.append(deleteFeature);

    polygonAnchor.addEventListener("click", () => {
        console.log("polygon");
        myApp.map.removeInteraction(myApp.drawPoint);
        myApp.map.addInteraction(myApp.drawPolygon);
    }, true);

    pointAnchor.addEventListener("click", () => {
        console.log("point");
        myApp.map.removeInteraction(myApp.drawPolygon);
        myApp.map.addInteraction(myApp.drawPoint);
    }, true);

    clearFeatureAnchor.addEventListener("click", () => {
        // myApp.map.removeInteraction(myApp.drawPolygon);
        // myApp.map.addInteraction(myApp.drawPoint);
        myApp.map.removeInteraction(myApp.drawPolygon);
        myApp.map.removeInteraction(myApp.drawPoint);
        myApp.Drawsource.clear();
        myApp.locationOverlay.setPosition(undefined);

        console.log("point");
    }, true);
}
myApp.BindControls = function () {
    myApp.LayerSwitcherButton.addEventListener("click", () => {
        if (getComputedStyle(myApp.layerSwitcherDiv)["display"] === "block") {
            myApp.layerSwitcherDiv.style.animation = 'MoveLeft 0.4s';
            setTimeout(function () {
                myApp.layerSwitcherDiv.style.display = 'none';
            }, 300)
        } else {
            myApp.layerSwitcherDiv.style.display = 'block';
            myApp.layerSwitcherDiv.style.animation = 'MoveRight 0.4s';
        }
    }, true);

    $("input[type='radio'][name='inLineRadioBaseMap']").change(function () {
        var value = $(this).attr('LayerId');
        myApp.BaseLayerList.forEach(function (item) {
            let lyId = item.getProperties()['id'];
            if (lyId === value) {
                item.setVisible(true);
            } else {
                item.setVisible(false);
            }
        })
    });

    $("#interval_table").change(function () {
        var curValue = $(this).val()
        myApp.setSelectedVariableFromCategory(curValue);
        myApp.changeCurrentLayer();
    });

    $("#var_table").change(function () {
        myApp.changeCurrentLayer();
    });
    $('.toggle-nav').click(function (e) {
        setTimeout(function () {
            myApp.map.updateSize();
        }, 100);
    });
    $('#currentOpacity').change(function (e) {
        var currVal = parseInt($(this).val()) / 100;
        $('#opacityVal').html(currVal);
        var layerId = myApp.getCurrentSelectedLayerId();
        myApp.HIWATLayersCollection.forEach(function (curLayer) {
            var prop = curLayer.getProperties();
            if (prop.id === layerId) {
                curLayer.setOpacity(currVal);
            } else {
                curLayer.setVisible(false);
            }
        });
    });
    $('#OpentsCurve').click(function () {
        $('#ChartModel').modal('show');
    });
    // $('#select_country_for_dri').change(function () {
    //     myApp.changeCountryForDistrictExtent();
    // });
    $('#select_district_of_country').change(function () {
        let curval = $(this).val();
        let selAr = districtExtentData.filter(function (x) {
            return x[2] === curval
        });
        let llStr = selAr[0][3].split(',')[0].split(" ")
        let urStr = selAr[0][3].split(',')[1].split(" ")
        let newBbox = [parseInt(llStr[0]), parseInt(llStr[1]), parseInt(urStr[0]), parseInt(urStr[1])]
        myApp.map.getView().fit(newBbox, myApp.map.getSize());


    });
};

myApp.HIWATLayersCollection = [];
myApp.populateVariables = async function () {
    document.getElementById("interval_table").disabled = true;
    document.getElementById("var_table").disabled = true;
    document.getElementById("currentOpacity").disabled = true;
    // var_options.forEach(function (curObj) {
    for (var curObj of var_options) {
        $('#var_table').append(`<option category="${curObj.category}" value="${curObj.id}" unit="${curObj.units}" chartTitle="${curObj.display_name}">${curObj.display_name} (${curObj.units})</option>`);
        var wmsURL = myApp.AllDataOrIntervalType[curObj.category]['thredds_urls']
        var showControlPanel = myApp.AllDataOrIntervalType[curObj.category]['hasTimeControlLayer']
        var colorScaleRange = curObj.min.toString() + ',' + curObj.max.toString();
        var legendUrl = wmsURL + `?REQUEST=GetLegendGraphic&PALETTE=default&LAYERS=${curObj.id}&STYLES=default-scalar/x-Rainbow&COLORSCALERANGE=${colorScaleRange}&BELOWMINCOLOR=0x000000&height=300&width=25`
        var Newlayer = new ol.layer.TimeDimensionTile({
            id: curObj.category + '___' + curObj.id,
            title: `${curObj.display_name} (${curObj.units})`,
            visible: false,
            opacity: 0.7,
            legendPath: legendUrl,
            ThreddsDataServerVersion: 5,
            serverType: 'TDS',
            timeSeries: false,
            // alignTimeSlider: 'left',
            // timeSliderSize: 'small',
            showlegend: true,
            showControlPanel: showControlPanel,
            source: {
                url: wmsURL,
                params: {
                    'LAYERS': curObj.id,
                    'STYLES': 'default-scalar/x-Rainbow',
                    'COLORSCALERANGE': colorScaleRange,
                    'transparent': true,
                    'BELOWMINCOLOR': '0x000000'
                }
            },
            zIndex: 11,
        });
        await Newlayer.init().then(function (val) {
            myApp.map.addThreddsLayer(val);
            myApp.HIWATLayersCollection.push(Newlayer);
        }, (error) => console.error(error));
    }
    document.getElementById("interval_table").disabled = false;
    document.getElementById("var_table").disabled = false;
    document.getElementById("currentOpacity").disabled = false;
}

myApp.setSelectedVariableFromCategory = function (categoryId) {
    var kk = 0
    for (var i of document.getElementById('var_table').children) {
        var CurrentCategory = i.getAttribute('category');
        var hasNodisplayClass = i.classList.contains('option-no-display');
        if (CurrentCategory == categoryId) {
            if (kk == 0) {
                document.getElementById('var_table').value = i.getAttribute('value');
            }
            if (hasNodisplayClass) {
                i.classList.remove('option-no-display');
            }
            kk++;
        } else {
            if (!hasNodisplayClass) {
                i.classList.add('option-no-display');
            }
        }
    }
};
myApp.changeLegend = function (legendUrl) {
    $('#legendImage').html(`<img src="${legendUrl}" alt="legend">`)
}
myApp.InitialConfiguration = function () {
    $('#interval_table').val('hourly');
    let currentSelValue = document.getElementById('interval_table').value;
    myApp.setSelectedVariableFromCategory(currentSelValue);
    myApp.changeCurrentLayer();
}

myApp.changeCurrentLayer = function () {
    var layerId = myApp.getCurrentSelectedLayerId();
    myApp.HIWATLayersCollection.forEach(function (curLayer) {
        var prop = curLayer.getProperties();
        if (prop.id === layerId) {
            curLayer.setVisible(true);
            $('#currentOpacity').val(prop.opacity * 100);
            $('#opacityVal').html(prop.opacity);
            // myApp.changeLegend(prop.legendPath);
        } else {
            curLayer.setVisible(false);
        }
    });
}
myApp.datetimeChartObj = function (title, subTitle, SeriesData, SeriesName, YaxisLabel, XaxisLabel, plotColor) {
    let data = {
            chart: {
                marginLeft: 65,
                /* marginRight: 0, */
                /* spacingLeft: 0, */
                /* spacingRight: 0 */
            },
            title: {
                text: title,
                fontSize: '10px',
                useHTML: true
            },
            subtitle: {
                text: subTitle,
                fontSize: '8px'
            },
            series: [{
                name: SeriesName,
                data: SeriesData
            }],
            xAxis: {
                type: 'datetime',
                title: {
                    text: XaxisLabel,
                    // align: 'high',
                }
            },
            yAxis: {
                title: {
                    text: `<span style="display:inline-block; -webkit-transform: rotate(270deg); -moz-transform: rotate(270deg); -ms-transform: rotate(270deg); -o-transform: rotate(270deg); filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=3);">${YaxisLabel}</span>`,
                    useHTML: true,
                    rotation: 0,
                    // align: 'high',
                    offset: 0,
                    x: -50
                }
            },
            legend: {
                enabled: false
            },
            credits: {
                enabled: false
            },
            plotOptions: {
                series: {
                    color: plotColor
                }
            },
            exporting: {
                buttons: {
                    contextButton: {
                        menuItems: ["printChart",
                            "separator",
                            "downloadPNG",
                            "downloadJPEG",
                            "downloadPDF",
                            "downloadSVG",
                            "separator",
                            "downloadCSV",
                            "downloadXLS",
                            //"viewData",
                            "openInCloud"]
                    }
                },
                // chartOptions: {
                //     title: {
                //         text: title,
                //         fontSize: '10px',
                //         useHTML: true
                //     }, yAxis: {
                //         title: {
                //             text: `<span style="display:inline-block; -webkit-transform: rotate(90deg); -moz-transform: rotate(90deg); -ms-transform: rotate(90deg); -o-transform: rotate(90deg); filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=3);">${YaxisLabel}</span>`,
                //             useHTML: true,
                //             rotation: 250
                //         }
                //     },
                // },
                allowHTML: true,
                // fallbackToExportServer: false,
                // libURL: 'http://localhost:8000/static/airqualitywatch/js/Highcharts/lib/'
            }
        }
    ;
    console.log(JSON.stringify(data));
    return data
};


myApp.getCurrentSelectedLayerId = function () {
    var catogoriPlusId = $('#interval_table').val() + '___' + $('#var_table').val();
    return catogoriPlusId
}

myApp.geocoding = function () {
    // Current selection
    var sLayer = new ol.layer.Vector({
        source: new ol.source.Vector(),
        style: [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: [0, 0, 0, 0],
                opacity: 1,
                width: 3
            }),
            fill: new ol.style.Fill({
                color: '#e5e5ff00'
            })
        }), new ol.style.Style({
            image: new ol.style.Icon({
                anchor: [0.5, 46],
                anchorXUnits: 'fraction',
                anchorYUnits: 'pixels',
                src: '/static/hkhbasins/images/markers_default.png',
                size: ol.size.toSize([40, 45]),
                // offset:[20,20]
            }),
            stroke: new ol.style.Stroke({
                color: [0, 0, 255, 1.0],
                opacity: 1,
                width: 3,
                lineDash: [4, 8, 4, 8]
            }),
            fill: new ol.style.Fill({
                color: '#e5e5ff20'
            })
        })]
    });
    myApp.map.addLayer(sLayer);

    // Set the search control
    var search = new ol.control.SearchNominatim(
        {	//target: $(".options").get(0),
            polygon: true,
            reverse: false,
            position: true,	// Search, with priority to geo position
            maxHistory: -1,
            className: 'OSMBasedGeocodinghiwat'
        });
    // search.set('copy', false)
    myApp.map.addControl(search);

    // Select feature when click on the reference index
    search.on('select', function (e) {	// console.log(e);
        sLayer.getSource().clear();
        // Check if we get a geojson to describe the search
        if (e.search.geojson) {
            var format = new ol.format.GeoJSON();
            var f = format.readFeature(e.search.geojson, {
                dataProjection: "EPSG:4326",
                featureProjection: myApp.map.getView().getProjection()
            });
            sLayer.getSource().addFeature(f);
            var view = myApp.map.getView();
            var resolution = view.getResolutionForExtent(f.getGeometry().getExtent(), myApp.map.getSize());
            var zoom = view.getZoomForResolution(resolution);
            var center = ol.extent.getCenter(f.getGeometry().getExtent());
            // redraw before zoom
            setTimeout(function () {
                view.animate({
                    center: center,
                    zoom: Math.min(zoom, 16)
                });
            }, 100);
        } else {
            myApp.map.getView().animate({
                center: e.coordinate,
                zoom: Math.max(myApp.map.getView().getZoom(), 16)
            });
        }
    });
};

// myApp.populateDistrict = function () {
//     let strHTML = '';
//     for (let i of districtExtentData) {
//         strHTML = strHTML + `<option value="${i[2]}" country="${i[0]}">${i[2]}</option>`
//     }
//     $('#select_district_of_country').html(strHTML);
//     myApp.changeCountryForDistrictExtent();
// };

// myApp.changeCountryForDistrictExtent = function () {
//     let curCountry = $('#select_country_for_dri').val();
//     $(`#select_district_of_country option:not([country='${curCountry}'])`).hide();
//     $(`#select_district_of_country option[country='${curCountry}']`).show();
//     let selectData = districtExtentData.filter(function (x) {
//         return x[0] === curCountry
//     })[0];
//     $(`#select_district_of_country`).val(selectData[2]);
// };

myApp.init = async function () {
    myApp.myMap();
    myApp.layerswitcher();
    myApp.DrawUI();
    await myApp.populateVariables();
    myApp.InitialConfiguration();
    myApp.geocoding();
    // myApp.populateDistrict()
}

//WMS and Has control Layer
myApp.AllDataOrIntervalType = {
    day1: {hasTimeControlLayer: false, thredds_urls: thredds_urls['day1']},
    day2: {hasTimeControlLayer: false, thredds_urls: thredds_urls['day2']},
    det: {hasTimeControlLayer: true, thredds_urls: thredds_urls['det']},
    hourly: {hasTimeControlLayer: true, thredds_urls: thredds_urls['hourly']},
}

$(document).ready(async function () {
    await myApp.init();
    myApp.BindControls();

});
