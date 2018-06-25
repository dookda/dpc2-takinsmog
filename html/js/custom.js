 /*jslint browser: true*/
 /*global $, jQuery, alert*/

 $(document).ready(function () {

     "use strict";

     var body = $("body");

     $(function () {
         $(".preloader").fadeOut();
         $('#side-menu').metisMenu();
     });

     /* ===== Theme Settings ===== */

     $(".open-close").on("click", function () {
         body.toggleClass("show-sidebar").toggleClass("hide-sidebar");
         $(".sidebar-head .open-close i").toggleClass("ti-menu");
     });



     /* ===========================================================
         Loads the correct sidebar on window load.
         collapses the sidebar on window resize.
         Sets the min-height of #page-wrapper to window size.
     =========================================================== */

     $(function () {
         var set = function () {
                 var topOffset = 60,
                     width = (window.innerWidth > 0) ? window.innerWidth : this.screen.width,
                     height = ((window.innerHeight > 0) ? window.innerHeight : this.screen.height) - 1;
                 if (width < 768) {
                     $('div.navbar-collapse').addClass('collapse');
                     topOffset = 100; /* 2-row-menu */
                 } else {
                     $('div.navbar-collapse').removeClass('collapse');
                 }

                 /* ===== This is for resizing window ===== */

                 if (width < 1170) {
                     body.addClass('content-wrapper');
                     $(".sidebar-nav, .slimScrollDiv").css("overflow-x", "visible").parent().css("overflow", "visible");
                 } else {
                     body.removeClass('content-wrapper');
                 }

                 height = height - topOffset;
                 if (height < 1) {
                     height = 1;
                 }
                 if (height > topOffset) {
                     $("#page-wrapper").css("min-height", (height) + "px");
                 }
             },
             url = window.location,
             element = $('ul.nav a').filter(function () {
                 return this.href === url || url.href.indexOf(this.href) === 0;
             }).addClass('active').parent().parent().addClass('in').parent();
         if (element.is('li')) {
             element.addClass('active');
         }
         $(window).ready(set);
         $(window).bind("resize", set);
     });


     /* ===== Tooltip Initialization ===== */

     $(function () {
         $('[data-toggle="tooltip"]').tooltip();
     });

     /* ===== Popover Initialization ===== */

     $(function () {
         $('[data-toggle="popover"]').popover();
     });

     /* ===== Task Initialization ===== */

     $(".list-task li label").on("click", function () {
         $(this).toggleClass("task-done");
     });
     $(".settings_box a").on("click", function () {
         $("ul.theme_color").toggleClass("theme_block");
     });

     /* ===== Collepsible Toggle ===== */

     $(".collapseble").on("click", function () {
         $(".collapseblebox").fadeToggle(350);
     });

     /* ===== Sidebar ===== */

     $('.slimscrollright').slimScroll({
         height: '100%',
         position: 'right',
         size: "5px",
         color: '#dcdcdc'
     });
     $('.slimscrollsidebar').slimScroll({
         height: '100%',
         position: 'right',
         size: "6px",
         color: 'rgba(0,0,0,0.3)'
     });
     $('.chat-list').slimScroll({
         height: '100%',
         position: 'right',
         size: "0px",
         color: '#dcdcdc'
     });

     /* ===== Resize all elements ===== */

     body.trigger("resize");

     /* ===== Visited ul li ===== */

     $('.visited li a').on("click", function (e) {
         $('.visited li').removeClass('active');
         var $parent = $(this).parent();
         if (!$parent.hasClass('active')) {
             $parent.addClass('active');
         }
         e.preventDefault();
     });

     /* ===== Login and Recover Password ===== */

     $('#to-recover').on("click", function () {
         $("#loginform").slideUp();
         $("#recoverform").fadeIn();
     });

     /* ================================================================= 
         Update 1.5
         this is for close icon when navigation open in mobile view
     ================================================================= */

     $(".navbar-toggle").on("click", function () {
         $(".navbar-toggle i").toggleClass("ti-menu").addClass("ti-close");
     });


     ///// map
     const mapnuUrl = 'http://map.nu.ac.th/geoserver-hgis/ows?';

     // ---map
     // first-search map
     var map = L.map('map', {
         center: [16.611229, 98.768188],
         zoom: 8
     });
     const fgrod = L.tileLayer('http://{s}.google.com/vt/lyrs=r&x={x}&y={y}&z={z}', {
         maxZoom: 20,
         subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
     });
     const fghyb = L.tileLayer('http://{s}.google.com/vt/lyrs=y,m&x={x}&y={y}&z={z}', {
         maxZoom: 20,
         subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
     });
     const fgter = L.tileLayer('http://{s}.google.com/vt/lyrs=t,m&x={x}&y={y}&z={z}', {
         maxZoom: 20,
         subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
     });
     const pro = L.tileLayer.wms(mapnuUrl, {
         layers: 'hgis:dpc9_province_4326',
         format: 'image/png',
         transparent: true,
         CQL_FILTER: 'prov_code=63',
         zIndex: 3
     });
     const amp = L.tileLayer.wms(mapnuUrl, {
         layers: 'hgis:dpc9_amphoe_4326',
         format: 'image/png',
         transparent: true,
         CQL_FILTER: 'prov_code=63',
         zIndex: 3
     });
     const tam = L.tileLayer.wms(mapnuUrl, {
         layers: 'hgis:dpc9_tambon_4326',
         format: 'image/png',
         transparent: true,
         CQL_FILTER: 'prov_code=63',
         zIndex: 3
     });

     var vill = L.tileLayer.wms("http://map.nu.ac.th/gs-alr2/ows?", {
         layers: 'alr:ln9p_vill',
         format: 'image/png',
         transparent: true,
         CQL_FILTER: 'prov_code=63'
     });

     var hotspot = L.tileLayer.wms("http://cgi.uru.ac.th/gs-hotspot/ows?", {
         layers: 'hp:hotspot_tk',
         format: 'image/png',
         transparent: true
     });

     var fmapBaseMaps = {
         'แผนที่ถนน': fgrod,
         'แผนที่ผสม': fghyb,
         'แผนที่ภูมิประเทศ': fgter.addTo(map)
     };
     var fmapOverlayMaps = {
         'ขอบเขตจังหวัด': pro.addTo(map),
         'ขอบเขตอำเภอ': amp.addTo(map),
         'ขอบเขตตำบล': tam.addTo(map),
         'หมู่บ้าน': vill,
         'Hotspot': hotspot.addTo(map)
     };
     L.control.layers(fmapBaseMaps, fmapOverlayMaps).addTo(map);

     var marker;
     const json = 'http://air4thai.pcd.go.th/services/getNewAQI_JSON.php?stationID=76t';

     $.getJSON(json, (dat) => {
         console.log(dat);
         $('#location').text(dat.nameTH + ' ' + dat.areaTH);
         $('#AQI').text(dat.LastUpdate.AQI.aqi);
         $('#CO').text(dat.LastUpdate.CO.value);
         $('#NO2').text(dat.LastUpdate.NO2.value);
         $('#O3').text(dat.LastUpdate.O3.value);
         $('#PM10').text(dat.LastUpdate.PM10.value);
         $('#PM25').text(dat.LastUpdate.PM25.value);
         $('#SO2').text(dat.LastUpdate.SO2.value);
         $('#aqi').text(dat.LastUpdate.date);

         var aqiTxt, ic;
         if (dat.LastUpdate.AQI.aqi > 200) {
             aqiTxt = 'มีผบกระทบต่อสุขภาพ';
             ic = L.icon({
                 iconUrl: './images/aqi5.png',
                 iconSize: [32, 37],
                 iconAnchor: [12, 37],
                 popupAnchor: [5, -36]
             });
         } else if (dat.LastUpdate.AQI.aqi > 101) {
             aqiTxt = 'เริ่มมีผลกระทบต่อสุขภาพ';
             ic = L.icon({
                 iconUrl: './images/aqi4.png',
                 iconSize: [32, 37],
                 iconAnchor: [12, 37],
                 popupAnchor: [5, -36]
             });
         } else if (dat.LastUpdate.AQI.aqi > 51) {
             aqiTxt = 'ปานกลาง';
             ic = L.icon({
                 iconUrl: './images/aqi3.png',
                 iconSize: [32, 37],
                 iconAnchor: [12, 37],
                 popupAnchor: [5, -36]
             });
         } else if (dat.LastUpdate.AQI.aqi > 26) {
             aqiTxt = 'ดี';
             ic = L.icon({
                 iconUrl: './images/aqi2.png',
                 iconSize: [32, 37],
                 iconAnchor: [12, 37],
                 popupAnchor: [5, -36]
             });
         } else {
             aqiTxt = 'ดีมาก';
             ic = L.icon({
                 iconUrl: './images/aqi1.png',
                 iconSize: [32, 37],
                 iconAnchor: [12, 37],
                 popupAnchor: [5, -36]
             });
         }
         marker = L.marker([dat.lat, dat.long], {
                 draggable: false,
                 icon: ic
             })
             .addTo(map)
             .bindPopup("<h6>สถานีตรวจวัดคุณภาพอากาศ " + dat.nameTH + "</h6>" +
                 "<br/><span id='kanit13'>สถานที่:</span> " + dat.areaTH +
                 "<br/><span id='kanit13'>ค่า AQI:</span> " + dat.LastUpdate.AQI.aqi +
                 "<br/><span id='kanit13'>ระดับคุณภาพอากาศ (AQI):</span> " + aqiTxt
             )
             .openPopup();
         //  map.setView(L.latLng(dat.lat, dat.long), 18);
     })

     function setCurrentView(dat) {
         if (marker !== undefined) {
             map.removeLayer(marker);
             addMarker(dat);
         } else {
             addMarker(dat);
         }
     }

     function addMarker(dat) {
         marker = L.marker([dat.lat, dat.lon], {
                 draggable: false
             })
             .addTo(map)
             .bindPopup("<h6>" + dat.t_name + "</h6>" +
                 "<br/><span id='kanit13'>จุดเด่น:</span> " + dat.t_identity +
                 "<br/><span id='kanit13'>ประเภททัพยากร:</span> " + dat.t_type +
                 "<br/><span id='kanit13'>ระดับศักยภาพ:</span> " + dat.t_potent + ' ดาว' +
                 "<br/><span id='kanit13'>พิกัด:</span> " + dat.lon + "," + dat.lat +
                 "<br/><span id='kanit13'>การเข้าถึง:</span> " + dat.t_ac +
                 "<br/><span id='kanit13'>ความน่าสนใจ:</span> " + dat.t_in +
                 "<br/><span id='kanit13'>ความสามารถในการรองรับ:</span> " + dat.t_cc +
                 "<br/><span id='kanit13'>ศักยภาพ:</span> " + dat.t_sq +
                 "<br/><span id='kanit13'>คุณภาพบริการ:</span>" + dat.t_la +
                 "<br/><span id='kanit13'>--:</span> " + dat.t_re +
                 "<br/><span id='kanit13'>อื่นๆ:</span> " + dat.t_etc
             )
             .openPopup();
         map.setView(L.latLng(dat.lat, dat.lon), 18);
     }

     function setDefaultView() {
         if (marker !== undefined) {
             map.removeLayer(marker);
         }
         map.setView(L.latLng(16.69, 100.09), 8);
     }



 });