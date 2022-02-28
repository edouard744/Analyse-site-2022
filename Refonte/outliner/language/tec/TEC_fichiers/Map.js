

TravelplanResult =
{
    allMarkers: [],
    mapDivId: "",
    originDestinationBounds: {},
    kmls: [],
    kml: function(routeID, kmlLayer) { this.routeID = routeID, this.kmlLayer = kmlLayer },
    kmlTarriffZones: {},
    start_Marker: {},
    end_Marker: {},
    startStepMarker: {},
    endStepMarker: {},
    stepIcon: {},
    StopMarker: {},
    StopTecMarker: {},
    StopNearby: {},
    map: {},
    poteaux: {},
    cambios: {},
    pos: {},
    perturbations: {},
    roadMaps: {},
    perturbationPage: "",
    DotedLineSymbol: { path: 'M 0,-0.5 0,1', strokeOpacity: 1, scale: 3 },
    zoomExtends: function() {
        var bounds = new google.maps.LatLngBounds();
        if (TravelplanResult.allMarkers && TravelplanResult.allMarkers.length > 0) {
            for (var i = 0; i < TravelplanResult.allMarkers.length; i++) {
                if (TravelplanResult.allMarkers[i] &&
                    typeof TravelplanResult.allMarkers[i].getPosition == 'function' &&
                    TravelplanResult.allMarkers[i].getPosition() &&
                    TravelplanResult.allMarkers[i].getPosition().lat() &&
                    TravelplanResult.allMarkers[i].getPosition().lng()) {
                    bounds.extend(TravelplanResult.allMarkers[i].getPosition());
                }
            }
            TravelplanResult.map.fitBounds(bounds);
        }
    },
    Step: function(type, polyline, bounds, stepNumber, startPoint, endPoint) {
        this.type = type;
        this.bounds = bounds;
        this.polyline = polyline;
        this.stepNumber = stepNumber;
        this.startPoint = startPoint;
        this.endPoint = endPoint;
    },
    Stop: function(index, coordinate, stopMarker) {
        this.index = index;
        this.coordinate = coordinate;
        this.stopMarker = stopMarker;
    },
    loadAPI: function(callback, nbrAttempt = 0) {
        //load api js google maps
        if (nbrAttempt > 50) {
            throw ("Could not load google map");
        }
        if (typeof google === "undefined" || !google) {
            setTimeout(function () { TravelplanResult.loadAPI(callback, ++nbrAttempt) }, 250);
        } else {
            if (google.maps) {
                if (typeof callback === 'function') {
                    callback();
                }
            } else {
                google.load('maps',
                    '3',
                    {
                        other_params: "key=AIzaSyA0eVl1xxBCCbyrdV_D6wBrVceQ-GrjdK0&libraries=places", //TECKEY
                        "callback": callback
                    });
            }
        }
    },
    GetBounds: function(points) {
        var bounds = new google.maps.LatLngBounds();
        for (var i = 0; i < points.length; i++) {
            bounds.extend(new google.maps.LatLng({ lat: points[i].Latitude, lng: points[i].Longitude }));
        }
        return bounds;
    },
    PutStep: function(roadMapIndex, stepIndex) {
        TravelplanResult.map.fitBounds(TravelplanResult.roadMaps[roadMapIndex]["Steps"][stepIndex].bounds);
        TravelplanResult.startStepMarker.setPosition(TravelplanResult.roadMaps[roadMapIndex]["Steps"][stepIndex]
            .startPoint);
        TravelplanResult.endStepMarker.setPosition(TravelplanResult.roadMaps[roadMapIndex]["Steps"][stepIndex]
            .endPoint);
        TravelplanResult.startStepMarker.setLabel(
            (TravelplanResult.roadMaps[roadMapIndex]["Steps"][stepIndex].stepNumber % 10).toString());
        TravelplanResult.endStepMarker.setLabel(
            (TravelplanResult.roadMaps[roadMapIndex]["Steps"][stepIndex].stepNumber % 10 + 1).toString());
        TravelplanResult.startStepMarker.setOpacity(1);
        TravelplanResult.endStepMarker.setOpacity(1);
    },
    resetMap: function() {
        //Delete markers
        for (var i = 0; i < TravelplanResult.allMarkers.length; i++) {
            if (TravelplanResult.allMarkers[i] != undefined && TravelplanResult.allMarkers[i].setMap != undefined) {
                TravelplanResult.allMarkers[i].setMap(null);
            }
        }

        //Delete controls
        TravelplanResult.map.controls[google.maps.ControlPosition.TOP_RIGHT].clear();
        TravelplanResult.map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].clear();
        TravelplanResult.map.controls[google.maps.ControlPosition.TOP_LEFT].clear();
        TravelplanResult.map.controls[google.maps.ControlPosition.LEFT_BOTTOM].clear();
        $("#googleMap-Custom-Controls").remove();

        //Delete kmls
        $.each(TravelplanResult.kmls,
            function(index, value) {
                value.kml.setMap(null);
            });

        if (!jQuery.isEmptyObject(TravelplanResult.kmlTarriffZones)) {
            TravelplanResult.kmlTarriffZones.setMap(null);
        }

        //Reset arrays
        TravelplanResult.allMarkers = [];
        TravelplanResult.originDestinationBounds = {};
        TravelplanResult.kmls = [];
        TravelplanResult.kmlTarriffZones = {};
        TravelplanResult.start_Marker = {};
        TravelplanResult.end_Marker = {};
        TravelplanResult.startStepMarker = {};
        TravelplanResult.endStepMarker = {};
        TravelplanResult.stepIcon = {};
        TravelplanResult.StopMarker = {};
        TravelplanResult.StopTecMarker = {};
        TravelplanResult.StopNearby = {};
        TravelplanResult.poteaux = {};
        TravelplanResult.cambios = {};
        TravelplanResult.pos = {};
        TravelplanResult.self = {};
        TravelplanResult.perturbations = {};
        TravelplanResult.roadMaps = {};
        TravelplanResult.perturbationPage = "";
    },
    initMap: function (mapSelector, controls, initKmls, callback) {
        TravelplanResult.loadAPI(function() {
            if (jQuery.isEmptyObject(TravelplanResult.map)) {
                TravelplanResult.map = new google.maps.Map(document.getElementById(mapSelector),
                    {
                        zoom: 12,
                        disableDefaultUI: true
                    });
            } else {
                var mapNode = TravelplanResult.map.getDiv();
                $("#" + mapSelector).replaceWith(mapNode);
                //window.globalMap.setOptions(mapOptions);
                TravelplanResult.resetMap();
                google.maps.event.trigger(TravelplanResult.map, "resize");
            }

            // Marker A and B 

            TravelplanResult.start_Marker = new google.maps.Marker({
                icon: "Content/Slicing/assets/images/icons/a-pin.png",
                map: TravelplanResult.map,
            });
            TravelplanResult.allMarkers.push(TravelplanResult.start_Marker);

            TravelplanResult.end_Marker = new google.maps.Marker({
                icon: "Content/Slicing/assets/images/icons/b-pin.png",
                map: TravelplanResult.map,
            });
            TravelplanResult.allMarkers.push(TravelplanResult.end_Marker);

            var originLat = parseFloat($(".OriginLat").val());
            var originLng = parseFloat($(".OriginLng").val());
            var destinationLat = parseFloat($(".DestinationLat").val());
            var destinationLng = parseFloat($(".DestinationLng").val());

            if (!isNaN(originLat) && !isNaN(originLng)) {
                var originLatLng = new google.maps.LatLng(originLat, originLng);
                TravelplanResult.map.setCenter(originLatLng);
                TravelplanResult.start_Marker.setPosition(originLatLng);

                if (!isNaN(destinationLat) && !isNaN(destinationLng)) {
                    var destinationLatLng = new google.maps.LatLng(destinationLat, destinationLng);
                    TravelplanResult.end_Marker.setPosition(destinationLatLng);

                    TravelplanResult.originDestinationBounds = new google.maps.LatLngBounds(originLatLng);
                    TravelplanResult.originDestinationBounds.extend(destinationLatLng);
                    TravelplanResult.map.fitBounds(TravelplanResult.originDestinationBounds);
                }
            }
            // Marker for steps
            TravelplanResult.stepIcon =
            {
                anchor: new google.maps.Point(12.5, 33.396),
                labelOrigin: new google.maps.Point(12.5, 12.5),
                path:
                    "M 12.5,3.9496153e-4 A 12.499271,12.186682 0 0 0 8.4519118e-8,12.188494 12.499271,12.186682 0 0 0 7.9560985,23.526802 L 12.5,33.395988 17.037497,23.541779 A 12.499271,12.186682 0 0 0 25,12.188494 12.499271,12.186682 0 0 0 12.5,3.9496153e-4 Z",
                strokeColor: "#ff0000",
                strokeWeight: 1,
                fillColor: "#ffffff",
                scale: 1,
                fillOpacity: 1
            };

            TravelplanResult.startStepMarker = new google.maps.Marker({
                icon: TravelplanResult.stepIcon,
                opacity: 0,
                zIndex: 99,
                optimized: false,
                map: TravelplanResult.map
            });

            TravelplanResult.allMarkers.push(TravelplanResult.startStepMarker);

            TravelplanResult.endStepMarker = new google.maps.Marker({
                icon: TravelplanResult.stepIcon,
                opacity: 0,
                zIndex: 99,
                optimized: false,
                map: TravelplanResult.map
            });

            TravelplanResult.allMarkers.push(TravelplanResult.endStepMarker);

            // Fill roadMaps object
            $(".RoadMaps").each(function(index) {
                var roadMapIndex = $(this).attr("data-index");
                TravelplanResult.roadMaps[roadMapIndex] = {};

                //ADD Point A and B
                TravelplanResult.roadMaps[roadMapIndex].startPoint =
                    new google.maps.LatLng($(this).find("input.OriginLat").val(),
                        $(this).find("input.OriginLng").val());
                TravelplanResult.roadMaps[roadMapIndex].endPoint =
                    new google.maps.LatLng($(this).find("input.DestinationLat").val(),
                        $(this).find("input.DestinationLng").val());
                if ($(this).find(".MainPointLatLng").val() != undefined) {
                    //ADD Polyline Main Itinerary
                    var mainPoints = $.parseJSON($(this).find(".MainPointLatLng").val());
                    var bounds = [];
                    for (var i = 0; i < mainPoints.length; i++) {
                        bounds.push(
                            new google.maps.LatLng({ lat: mainPoints[i].Latitude, lng: mainPoints[i].Longitude }));
                    }

                    TravelplanResult.roadMaps[roadMapIndex]["border"] = new google.maps.Polyline({
                        path: bounds,
                        geodesic: true,
                        strokeColor: '#A5B0B7',
                        strokeOpacity: 1,
                        strokeWeight: 8,
                        geodesic: true,
                        map: TravelplanResult.map
                    });
                    TravelplanResult.allMarkers.push(TravelplanResult.roadMaps[roadMapIndex]["border"]);

                    TravelplanResult.roadMaps[roadMapIndex]["main"] = new TravelplanResult.Step("main",
                        new google.maps.Polyline({
                            path: bounds,
                            strokeOpacity: 1,
                            strokeWeight: 6,
                            strokeColor: '#ffffff',
                            //icons: [{
                            //    icon: { path: google.maps.SymbolPath.CIRCLE, scale: 3, strokeOpacity: 0, fillColor: "#A5B0B7", fillOpacity: 1 },
                            //    offset: '0px',
                            //    repeat: '50px'
                            //}],
                            geodesic: true,
                            map: TravelplanResult.map
                        }),
                        TravelplanResult.GetBounds(mainPoints),
                        0,
                        null,
                        null);
                    TravelplanResult.allMarkers.push(TravelplanResult.roadMaps[roadMapIndex]["main"].polyline);
                }
                //ADD Correspondance's Point
                $(this).find(".ItineraryStop").each(function(stop) {
                    TravelplanResult.StopTecMarker[roadMapIndex] = {};
                    //TravelplanResult.StopTecMarker[roadMapIndex] = {};
                    var stopID = $(this).attr("data-stopid");
                    var title = $(this).attr("data-title");
                    var type = $(this).attr("data-type");
                    var lat = parseFloat($(this).attr("data-lat"));
                    var lng = parseFloat($(this).attr("data-lng"));
                    var latLng = new google.maps.LatLng(lat, lng);
                    if (latLng, type, title, stopID) {
                        switch (type) {
                        case "SNCB":
                            TravelplanResult.StopTecMarker[roadMapIndex][stopID] = new google.maps.Marker({
                                position: latLng,
                                title: title,
                                zIndex: 1,
                                icon: "Content/Slicing/assets/images/icons/map-icon-bus.png",
                                map: TravelplanResult.map,
                            });
                            break;
                        case "DELIJN":
                            break;
                        case "STIB":
                            break;
                        case "TECHA":
                        case "TECLU":
                        case "TECNA":
                        case "TECCH":
                        case "TECLV":
                        case "TECBW":
                            TravelplanResult.StopTecMarker[roadMapIndex][stopID] = new google.maps.Marker({
                                position: latLng,
                                title: title,
                                zIndex: 1,
                                icon: "Content/Slicing/assets/images/icons/map-icon-tec.png",
                                map: TravelplanResult.map,
                            });
                            break;
                        default:
                            break;
                        }
                        TravelplanResult.allMarkers.push(TravelplanResult.StopTecMarker[roadMapIndex][stopID]);
                    }
                });

                TravelplanResult.roadMaps[roadMapIndex]["Steps"] = {};
                //ADD Polyline Step Main Itinerary
                $(this).find(".ItineraryStep").each(function(step) {
                    var value = $(this).find(".StepLatlng").attr("value");
                    var stepIndex = $(this).attr("data-stepnumber");
                    var ownerSiteName = $(this).attr("data-ownersitename");

                    if (value != undefined && value.length > 0 && ownerSiteName !== "Wait") {
                        var stepPoints = $.parseJSON($(this).find(".StepLatlng").attr("value"));
                        var points = [];
                        for (var i = 0; i < stepPoints.length; i++) {
                            points.push(new google.maps.LatLng({
                                lat: stepPoints[i].Latitude,
                                lng: stepPoints[i].Longitude
                            }));
                        }
                        var polyline = null;
                        if (ownerSiteName === "Walk") {
                            polyline = new google.maps.Polyline({
                                path: points,
                                strokeOpacity: 0,
                                strokeWeight: 6,
                                strokeColor: '#000000',
                                zIndex: 2,
                                icons: [
                                    {
                                        icon: TravelplanResult.DotedLineSymbol,
                                        offset: '0px',
                                        repeat: '15px'
                                    }
                                ],
                                geodesic: true
                            });
                        } else {
                            var border = new google.maps.Polyline({
                                path: points,
                                geodesic: true,
                                strokeColor: '#A5B0B7',
                                strokeOpacity: 1,
                                strokeWeight: 8,
                                geodesic: true,
                            });
                            polyline = new google.maps.Polyline({
                                path: points,
                                strokeOpacity: 1,
                                strokeWeight: 6,
                                strokeColor: '#ffffff',
                                //icons: [{
                                //    icon: { path: google.maps.SymbolPath.CIRCLE, scale: 3, strokeOpacity: 0, fillColor: "#A5B0B7", fillOpacity: 1 },
                                //    offset: '0px',
                                //    repeat: '50px'
                                //}],
                                geodesic: true,
                            });
                        }
                        var startPoint =
                            new google.maps.LatLng({ lat: stepPoints[0].Latitude, lng: stepPoints[0].Longitude });
                        var endPoint = new google.maps.LatLng({
                            lat: stepPoints[stepPoints.length - 1].Latitude,
                            lng: stepPoints[stepPoints.length - 1].Longitude
                        });
                        TravelplanResult.roadMaps[roadMapIndex]["Steps"][stepIndex] =
                            new TravelplanResult.Step(ownerSiteName,
                                polyline,
                                TravelplanResult.GetBounds(stepPoints),
                                stepIndex,
                                startPoint,
                                endPoint);
                        if (polyline != null) {
                            if (border != null) {
                                border.setMap(TravelplanResult.map);
                                TravelplanResult.allMarkers.push(border);
                            }
                            TravelplanResult.roadMaps[roadMapIndex]["Steps"][stepIndex].polyline.setMap(TravelplanResult
                                .map);
                            TravelplanResult.allMarkers.push(polyline);
                        }
                    }
                });
                //ADD STOPS
                TravelplanResult.StopMarker = {};
                $(this).find(".ItineraryStop").each(function() {
                    var stopLat = parseFloat($(this).find(".StopLat").attr("value"));
                    var stopLng = parseFloat($(this).find(".StopLng").attr("value"));
                    var stopID = $(this).find(".StopLng").data("id");
                    TravelplanResult.StopMarker[stopID] = new google.maps.Marker({
                        position: { lat: stopLat, lng: stopLng },
                        title: stopID,
                        icon: "Content/Slicing/assets/images/icons/map-icon-tec.png"
                    });
                    TravelplanResult.allMarkers.push(TravelplanResult.StopMarker[stopID]);
                });
                //ADD POTEAUX
                TravelplanResult.poteaux = {};
                $(".Poteau").each(function() {
                    var lat = parseFloat($(this).data("lat"));
                    var lng = parseFloat($(this).data("lng"));
                    var poteauID = $(this).data("id");
                    TravelplanResult.map.setCenter(new google.maps.LatLng(lat, lng));
                    TravelplanResult.poteaux[poteauID] = new google.maps.Marker({
                        position: { lat: lat, lng: lng },
                        title: poteauID,
                        icon: "Content/Slicing/assets/images/icons/map-icon-tec.png",
                        map: TravelplanResult.map
                    });
                    TravelplanResult.allMarkers.push(TravelplanResult.poteaux[poteauID]);
                });

                //ADD StopNearby
                TravelplanResult.StopNearby = {};
                $(".Stop").each(function() {
                    var lat = parseFloat($(this).data("lat"));
                    var lng = parseFloat($(this).data("lng"));
                    var stopID = $(this).data("id");
                    var title = $(this).data("title");
                    //TravelplanResult.map.setCenter(new google.maps.LatLng(lat, lng));
                    TravelplanResult.StopMarker[stopID] = new google.maps.Marker({
                        position: { lat: lat, lng: lng },
                        title: title,
                        map: TravelplanResult.map,
                        icon: "Content/Slicing/assets/images/icons/map-icon-tec.png"
                    });
                    TravelplanResult.allMarkers.push(TravelplanResult.StopMarker[stopID]);
                    google.maps.event.addListener(TravelplanResult.StopMarker[stopID],
                        'click',
                        function() {
                            var nearbyPopup = new Popup({ template: "Stop_" + stopID });
                            nearbyPopup.show();
                        });
                });

                //ADD Cambio
                TravelplanResult.cambios = {};
                $(".Cambio").each(function() {
                    var lat = parseFloat($(this).data("lat"));
                    var lng = parseFloat($(this).data("lng"));
                    var cambioID = $(this).data("id");
                    var title = $(this).data("title");

                    //TravelplanResult.map.setCenter(new google.maps.LatLng(lat, lng));
                    TravelplanResult.cambios[cambioID] = new google.maps.Marker({
                        position: { lat: lat, lng: lng },
                        title: title,
                        icon: "Content/Slicing/assets/images/buy-tickets-options/Map/TypePointOfSaleMap_002.png",
                        map: TravelplanResult.map
                    });
                    TravelplanResult.allMarkers.push(TravelplanResult.cambios[cambioID]);
                    google.maps.event.addListener(TravelplanResult.cambios[cambioID],
                        'click',
                        function() {
                            //console.log("Cambio_" + cambioID)
                            var nearbyPopup = new Popup({ template: "Cambio_" + cambioID });
                            nearbyPopup.show();
                        });
                });

                //ADD POS
                TravelplanResult.pos = {};
                $(".Pos").each(function() {
                    var lat = parseFloat($(this).data("lat"));
                    var lng = parseFloat($(this).data("lng"));
                    var title = $(this).data("title");
                    var posID = $(this).data("id");
                    var type = $(this).data("type");
                    //TravelplanResult.map.setCenter(new google.maps.LatLng(lat, lng));
                    TravelplanResult.pos[posID] = new google.maps.Marker({
                        position: { lat: lat, lng: lng },
                        title: title,
                        icon: "Content/Slicing/assets/images/buy-tickets-options/Map/TypePointOfSaleMap_00" +
                            type +
                            ".png",
                        map: TravelplanResult.map
                    });
                    TravelplanResult.allMarkers.push(TravelplanResult.pos[posID]);
                    google.maps.event.addListener(TravelplanResult.pos[posID],
                        'click',
                        function() {
                            var nearbyPopup = new Popup({ template: "POS_" + posID });
                            nearbyPopup.show();
                        });
                });

                //ADD SELF
                TravelplanResult.self = {};
                $(".Self").each(function() {
                    var lat = parseFloat($(this).data("lat"));
                    var lng = parseFloat($(this).data("lng"));
                    var title = $(this).data("title");
                    var selfID = $(this).data("id");
                    var type = $(this).data("type");
                    //TravelplanResult.map.setCenter(new google.maps.LatLng(lat, lng));
                    TravelplanResult.self[selfID] = new google.maps.Marker({
                        position: { lat: lat, lng: lng },
                        title: title,
                        icon: "Content/Slicing/assets/images/buy-tickets-options/Map/TypePointOfSaleMap_00" +
                            type +
                            ".png",
                        map: TravelplanResult.map
                    });
                    TravelplanResult.allMarkers.push(TravelplanResult.self[selfID]);
                    google.maps.event.addListener(TravelplanResult.self[selfID],
                        'click',
                        function() {
                            if (typeof selfreporting.selectSelf === "function") {
                                selfreporting.selectSelf(selfID);
                            }
                        });
                });

                //ADD Perturbations
                TravelplanResult.perturbations = {};
                $(".Perturbation").each(function() {
                    var lat = parseFloat($(this).data("lat"));
                    var lng = parseFloat($(this).data("lng"));
                    var stopID = $(this).data("id");
                    var title = $(this).data("title");
                    TravelplanResult.pos[stopID] = new google.maps.Marker({
                        position: { lat: lat, lng: lng },
                        title: title,
                        icon: "Content/Slicing/assets/images/icons/map-icon-danger.png",
                        map: TravelplanResult.map
                    });
                    TravelplanResult.allMarkers.push(TravelplanResult.pos[stopID]);
                });

                //ADD Line Layers
                if ($(this).find(".LineKML")) {
                    $(".LineKML").each(function() {
                        var lineKML = $(this).val();
                        TravelplanResult.kmls.push({
                            id: $(this).attr("id"),
                            kml: new google.maps.KmlLayer({
                                url: lineKML,
                                map: initKmls ? TravelplanResult.map : null,
                            })
                        })
                        //TravelplanResult.kmls[$(this).attr("id")] = new google.maps.KmlLayer({
                        //    url: lineKML,
                        //    //map: TravelplanResult.map
                        //});
                    });
                }
                TravelplanResult.kmlTarriffZones = {},
                    TravelplanResult.kmlTarriffZones = new google.maps.KmlLayer({
                        url: "https://www.letec.be/Portals/0/Network/Zones.kmz",
                        preserveViewport: true
                    });
            });


            $("#journeyDetail button[name='show-on-map']").off("click").on("click").click(function() {
                var el = $(this);
                showHideMapPopup(TravelplanResult.map);
                setNavigationStep(el);
            });

            $("#map-popup button[name='show-on-map']").off("click").on("click").click(function() {
                var el = $(this);
                setNavigationStep(el);
            });

            $(".itinerary").unbind("mouseover").mouseover(function() {
                var index = $(this).attr("data-index");
                TravelplanResult.start_Marker.setPosition(TravelplanResult.roadMaps[index].startPoint);
                TravelplanResult.end_Marker.setPosition(TravelplanResult.roadMaps[index].endPoint);
                TravelplanResult.roadMaps[index]["main"].polyline.setOptions({
                    strokeColor: "#E3001A",
                    strokeOpacity: 1,
                    //icons: [{
                    //    icon: { path: google.maps.SymbolPath.CIRCLE, scale: 3, strokeOpacity: 0, fillColor: "#ffffff", fillOpacity: 1 },
                    //    offset: '0px',
                    //    repeat: '50px'
                    //}],
                    zIndex: 2
                });
            }).unbind("mouseout").mouseout(function() {
                var index = $(this).attr("data-index");
                if (index) {
                    TravelplanResult.roadMaps[index]["main"].polyline.setOptions({
                        strokeColor: "#ffffff",
                        strokeOpacity: 1,
                        //icons: [{
                        //    icon: { path: google.maps.SymbolPath.CIRCLE, scale: 3, strokeOpacity: 0, fillColor: "#A5B0B7", fillOpacity: 1 },
                        //    offset: '0px',
                        //    repeat: '50px'
                        //}],
                        zIndex: 1
                    });
                }
            });

            //$(".stop-detail-row").mouseover(function ()
            //{
            //    var poteauID = $(this).attr("data-poteauid");
            //    if(poteauID && TravelplanResult.poteaux[poteauID])
            //        TravelplanResult.poteaux[poteauID].setAnimation(google.maps.Animation.BOUNCE);
            //}).mouseout(function ()
            //{
            //    var poteauID = $(this).attr("data-poteauid");
            //    if (poteauID && TravelplanResult.poteaux[poteauID].getAnimation() !== null)
            //        TravelplanResult.poteaux[poteauID].setAnimation(null);
            //});

            $(".stop-detail-row").off("click").on("click",
                function() {
                    var isOpen = $(this).attr("data-is-open");
                    var routeID = $(this).attr("data-routeid");
                    var poteauID = $(this).attr("data-poteauid");

                    //Vide tous les kmls présent
                    $.each(TravelplanResult.kmls,
                        function(index, value) {
                            value.kml.setMap(null);
                        });
                    $.each(TravelplanResult.poteaux,
                        function(index, poteau) {
                            poteau.setMap(TravelplanResult.map);
                        });

                    if (routeID && !isOpen) {
                        $(this).attr("data-is-open", true);
                        var kmlBorder = search("lineKMLBorder_" + routeID, "id", TravelplanResult.kmls);
                        var kmlFill = search("lineKMLFill_" + routeID, "id", TravelplanResult.kmls);

                        if (kmlBorder && kmlFill) {
                            kmlBorder.kml.setMap(TravelplanResult.map);
                            kmlFill.kml.setMap(TravelplanResult.map);
                        }
                        if (poteauID) {
                            $.each(TravelplanResult.poteaux,
                                function(index, poteau) {
                                    poteau.setMap(null);
                                });
                            TravelplanResult.poteaux[poteauID].setMap(TravelplanResult.map);
                        }
                    } else {
                        $(this).removeAttr("data-is-open");
                    }
                });


            $(".route-detail-row").mouseover(function() {
                var stopID = $(this).attr("data-id");
                if (stopID && TravelplanResult.StopMarker[stopID]) {
                    TravelplanResult.StopMarker[stopID].setMap(TravelplanResult.map);
                    TravelplanResult.map.setCenter(TravelplanResult.StopMarker[stopID].getPosition());
                }
            }).mouseout(function() {
                var stopID = $(this).attr("data-id");
                if (stopID && TravelplanResult.StopMarker[stopID])
                    TravelplanResult.StopMarker[stopID].setMap(null);

            });
            if (controls) {
                if (controls.initPayingZonesControl)
                    initSeePayingZonesInMap(TravelplanResult.map);

                if (controls.initMapPopupControl)
                    initMapPopupControl(TravelplanResult.map);

                if (controls.initFullScreenControl && !!iOS)
                    initFullscreenControl(TravelplanResult.map);
            }
           
            // Callback est utilisé pour le self reporting afin de pouvoir charger les élements de la map juste après son initialisation
            // On ne peut donc pas utiliser le zoomExtends dans ce cas là.
            if (callback != null) {
                callback();
            } else {
                //Bounds markers on the map.
                TravelplanResult.zoomExtends();
            }
        });
    }
};

function setNavigationStep(el)
{
    var steps = [];
    for (var propertyName in TravelplanResult.roadMaps[$(el).data('roadmapindex')].Steps) {
        steps.push(propertyName);
    }
    if ($(el).data('ismobile') == true) {
        if ($(el).data('stepnumber') === "" && $(el).data('direction') == "next") {
            TravelplanResult.PutStep($(el).data('roadmapindex'), steps[0]);
            $(".js-prev-step").data("stepnumber", 0);
            $(".js-next-step").data("stepnumber", 0);
        }
        else {
            if ($(el).data('direction') == "next" && $(el).data('stepnumber') + 1 <= steps.length) {
                TravelplanResult.PutStep($(el).data('roadmapindex'), steps[$(el).data('stepnumber') + 1]);
                $(".js-prev-step").data("stepnumber", $(el).data('stepnumber') + 1);
                $(".js-next-step").data("stepnumber", $(el).data('stepnumber') + 1);
            }
            if ($(el).data('direction') == "previous" && $(el).data('stepnumber') - 1 >= 0) {
                TravelplanResult.PutStep($(el).data('roadmapindex'), steps[$(el).data('stepnumber') - 1]);
                $(".js-prev-step").data("stepnumber", $(el).data('stepnumber') - 1);
                $(".js-next-step").data("stepnumber", $(el).data('stepnumber') - 1);
            }
        }
    }
    else {
        TravelplanResult.PutStep($(el).data('roadmapindex'), $(el).data('stepnumber'));
        $(".js-prev-step").data("stepnumber", $(el).data('stepnumber'));
        $(".js-next-step").data("stepnumber", $(el).data('stepnumber'));
    }
}

function initMapPopupControl(map) {

    var fullScreenControl = $("#full_screen_button").get(0);
    var reduceScreenControl = $("#reduce_screen_button").get(0);
    var mobileNavButton = $("#mobileNavButton").get(0);
    $(reduceScreenControl).hide();
    $(mobileNavButton).hide();

    map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(fullScreenControl);
    map.controls[google.maps.ControlPosition.TOP_RIGHT].push(reduceScreenControl);
    map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(mobileNavButton);

    $(".screen-control").off("click").on('click', function () {
        showHideMapPopup(map);
    });
}

function showHideMapPopup(map)
{
    var fullScreenControl = map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].getAt(0);
    var reduceScreenControl = map.controls[google.maps.ControlPosition.TOP_RIGHT].getAt(0);
    var mobileNavButton = map.controls[google.maps.ControlPosition.BOTTOM_CENTER].getAt(0);
    
    $(fullScreenControl).hide();
    $(reduceScreenControl).hide();
    $(mobileNavButton).hide();
    //map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].clear();
    //map.controls[google.maps.ControlPosition.TOP_RIGHT].clear();

    if ($(map.getDiv()).hasClass("fullscreen")) {
        $(fullScreenControl).show();
        //map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(fullScreenControl);
        $("#reduceContainer").append(map.getDiv());
        $(map.getDiv()).removeClass();
        $(map.getDiv()).addClass("map-wrapper googleMap");
        $("#map-popup").removeClass("is-visible");

        //Paying zones button add class
        $("#paying-zones").removeClass();
        $("#paying-zones").addClass("map-controls");
        var payingZone = map.controls[google.maps.ControlPosition.TOP_LEFT].getAt(0);
        map.controls[google.maps.ControlPosition.TOP_LEFT].clear();
        map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(payingZone);
    }
    else {
        $(reduceScreenControl).show();
        $(mobileNavButton).show();
        //map.controls[google.maps.ControlPosition.TOP_RIGHT].push(reduceScreenControl);
        $("#map-popup").append(map.getDiv());
        $(map.getDiv()).removeClass();
        $(map.getDiv()).addClass("map-popup-right-column");
        $(map.getDiv()).addClass("fullscreen");
        $("#map-popup").addClass("is-visible");

        //Paying zones button add class
        $("#paying-zones").removeClass();
        $("#paying-zones").addClass("map-popup-controls");
        var payingZone = map.controls[google.maps.ControlPosition.LEFT_BOTTOM].getAt(0);
        map.controls[google.maps.ControlPosition.LEFT_BOTTOM].clear();
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(payingZone);
    }

}

function initSeePayingZonesInMap(map) {
    var seePayingZonesInMapButton = document.getElementById('see-paying-zones-in-map');
    map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(document.getElementById("paying-zones"));
    if (seePayingZonesInMapButton)
    {
        seePayingZonesInMapButton.addEventListener('click', function ()
        {
            if (TravelplanResult.kmlTarriffZones && TravelplanResult.originDestinationBounds) {
                if ($(this).is(":checked")) {
                    TravelplanResult.kmlTarriffZones.setMap(map);
                }
                else {
                    TravelplanResult.kmlTarriffZones.setMap(null);
                }
            }
        });
    }
}

function initFullscreenControl(map) {
    map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(document.getElementById("full_screen_control"));

    var elementToSendFullscreen = map.getDiv().firstChild;
    var fullscreenControl = document.getElementById('full_screen_button');

    if (fullscreenControl) {
        fullscreenControl.onclick = function () {
            if (isFullscreen(elementToSendFullscreen)) {
                exitFullscreen();
            } else {
                requestFullscreen(elementToSendFullscreen);
            }
        };

        document.onwebkitfullscreenchange =
            document.onmsfullscreenchange =
            document.onmozfullscreenchange =
            document.onfullscreenchange = function () {
                if (isFullscreen(elementToSendFullscreen)) {
                    fullscreenControl.innerText = fullscreenControl.getAttribute('data-translate-reduce');
                } else {
                    fullscreenControl.innerText = fullscreenControl.getAttribute('data-translate-enlarge');
                }
            };
    }
}
function isFullscreen(element) {
    return (document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement) == element;
}
function requestFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.webkitRequestFullScreen) {
        element.webkitRequestFullScreen();
    } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    } else if (element.msRequestFullScreen) {
        element.msRequestFullScreen();
    }
}
function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.msCancelFullScreen) {
        document.msCancelFullScreen();
    }
}

function search(nameKey, prop, myArray) {
    for (var i = 0; i < myArray.length; i++) {
        if (myArray[i][prop] === nameKey) {
            return myArray[i];
        }
    }
}