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


     var tk_conjet = L.tileLayer.wms("http://cgi.uru.ac.th/gs-hotspot/hp/ows?", {
         layers: 'hp:tk_conjet_4326',
         format: 'image/png',
         transparent: true
     });


     var imageUrl = 'http://rain.tvis.in.th/output/';

     var radar_phs = L.imageOverlay(imageUrl + 'PHS.png', [
         [19.094393, 102.475537],
         [14.411350, 97.983591]
     ]);





     //  var breezometerTiles = L.tileLayer('https://tiles.breezometer.com/{z}/{x}/{y}.png?key='+apiKey, {
     //      tms: false,
     //      opacity: 0.65,
     //      maxNativeZoom: 8
     //  });

     var report = L.tileLayer.wms("http://cgi.uru.ac.th/gs-hotspot/ows?", {
         layers: 'hp:mobile_report',
         format: 'image/png',
         transparent: true
     });

     var fmapBaseMaps = {
         'แผนที่ถนน': fgrod,
         'แผนที่ผสม': fghyb,
         'แผนที่ภูมิประเทศ': fgter.addTo(map)
     };

     var fmapOverlayMaps = {
         'ขอบเขตการปกครอง': {
             'ขอบเขตจังหวัด': pro.addTo(map),
             'ขอบเขตอำเภอ': amp.addTo(map),
             'ขอบเขตตำบล': tam.addTo(map),
             'หมู่บ้าน': vill,
         },
         'Determinants': {
             'สถานีตรวจวัดปริมาณน้ำฝน': radar_phs.addTo(map)
         },
         'Behaviors': {
             'Behaviors': vill
         },
         'Program response': {
             'Program response': vill
         },
         'Morbidity / Mortality': {
             'กลุ่มโรคทางเดินหายใจ': vill,
             'กลุ่มโรคหัวใจและหลอดเลือด': vill,
             'กลุ่มโรคตาอักเสบ': tk_conjet.addTo(map),
             'กลุ่มโรคผิวหนังอักเสบ': vill
         },
         'Event-base': {
             'Hotspot': hotspot.addTo(map),
             'รายงานสถานการณ์': report,
         },
     };

     L.control.groupedLayers(fmapBaseMaps, fmapOverlayMaps).addTo(map);

     var marker;
     var markerReport;
     const json = 'https://cors.io/?http://air4thai.pcd.go.th/services/getNewAQI_JSON.php?stationID=76t';
     const jsonReport = 'http://cgi.uru.ac.th/gs-hotspot/hp/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=hp:mobile_report&maxFeatures=50&outputFormat=application%2Fjson';



     $.getJSON(jsonReport, (dat) => {

         markerReport = L.geoJSON(dat, {
             pointToLayer: (feature, latlng) => {
                 var ic = L.icon({
                     iconUrl: 'http://www.cgi.uru.ac.th/marker/marker2/fireworks.png',
                     //  iconSize: [32, 37],
                     iconAnchor: [12, 37],
                     popupAnchor: [5, -36]
                 });
                 return marker = new L.marker(latlng, {
                     icon: ic,
                     iconName: 'da'
                 })
             },
             onEachFeature: function onEachFeature(feature, layer) {
                 if (feature.properties) {
                     layer.bindPopup("<h6>จุดรายงาน " + feature.properties.pname + "</h6>" +
                         "<br/><span id='kanit13'>สถานที่:</span> " + feature.properties.pdesc +
                         "<br/><span id='kanit13'>คำอธิบาย:</span> " + feature.properties.pdesc +
                         "<br/><span id='kanit13'>รูปภาพ:</span><br/><img height='240px' src='" + feature.properties.photo + "'>" +
                         "<br/><span id='kanit13'>วันที่รายงาน:</span> " + feature.properties.pdate, {
                             maxWidth: "auto"
                         })
                 }
             }
         }).addTo(map);
     })



     $.getJSON(json, (dat) => {
         //  console.log(dat);
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
                 "<br/><span id='kanit13'>ระดับคุณภาพอากาศ (AQI):</span> " + aqiTxt +
                 "<br/><span id='kanit13'>CO:</span> " + dat.LastUpdate.CO.value +
                 "<br/><span id='kanit13'>NO2:</span> " + dat.LastUpdate.NO2.value +
                 "<br/><span id='kanit13'>O3:</span> " + dat.LastUpdate.O3.value +
                 "<br/><span id='kanit13'>PM10:</span> " + dat.LastUpdate.PM10.value +
                 "<br/><span id='kanit13'>PM25:</span> " + dat.LastUpdate.PM25.value +
                 "<br/><span id='kanit13'>SO2:</span> " + dat.LastUpdate.SO2.value +
                 "<br/>แหล่งที่มาของข้อมูล: สำนักจัดการคุณภาพอากาศและเสียง กรมควบคุมมลพิษ <br/>http://air4thai.pcd.go.th"
             )
          .openPopup();
          map.setView(L.latLng(dat.lat, dat.long), 18);
     })

     var centroid = [
         [17.207897, 99.110072, "ต.วังหมัน", "อ.สามเงา"],
         [17.494354, 98.151046, "ต.แม่สอง", "อ.ท่าสองยาง"],
         [16.756627, 98.586039, "ต.แม่ปะ", "อ.แม่สอด"],
         [17.170085, 98.359473, "ต.แม่หละ", "อ.ท่าสองยาง"],
         [17.222578, 99.036252, "ต.สามเงา", "อ.สามเงา"],
         [17.438565, 98.720907, "ต.บ้านนา", "อ.สามเงา"],
         [16.788082, 99.102284, "ต.หนองบัวใต้", "อ.เมืองตาก"],
         [16.747769, 98.862215, "ต.ด่านแม่ละเมา", "อ.แม่สอด"],
         [16.503548, 98.911822, "ต.คีรีราษฎร์", "อ.พบพระ"],
         [16.669374, 98.55677, "ต.แม่ตาว", "อ.แม่สอด"],
         [16.971001, 98.5241, "ต.แม่ระมาด", "อ.แม่ระมาด"],
         [16.219776, 98.96358, "ต.โมโกร", "อ.อุ้มผาง"],
         [15.727263, 98.715614, "ต.แม่จัน", "อ.อุ้มผาง"],
         [15.641409, 98.965803, "ต.แม่ละมุ้ง", "อ.อุ้มผาง"],
         [16.066114, 98.833609, "ต.แม่กลอง", "อ.อุ้มผาง"],
         [16.880314, 98.64571, "ต.แม่กาษา", "อ.แม่สอด"],
         [17.187785, 99.021978, "ต.ย่านรี", "อ.สามเงา"],
         [17.073029, 99.105133, "ต.ตากออก", "อ.บ้านตาก"],
         [16.901413, 99.36814, "ต.วังประจบ", "อ.เมืองตาก"],
         [16.030189, 98.750528, "ต.หนองหลวง", "อ.อุ้มผาง"],
         [16.728876, 98.508561, "ต.ท่าสายลวด", "อ.แม่สอด"],
         [16.693095, 99.100245, "ต.นาโบสถ์", "กิ่งอ.วังเจ้า"],
         [16.911735, 99.206574, "ต.น้ำรึม", "อ.เมืองตาก"],
         [17.074881, 98.48395, "ต.ขะเนจื้อ", "อ.แม่ระมาด"],
         [16.691745, 98.647306, "ต.พระธาตุผาแดง", "อ.แม่สอด"],
         [16.856752, 99.252736, "ต.ตลุกกลางทุ่ง", "อ.เมืองตาก"],
         [16.434766, 98.787521, "ต.รวมไทยพัฒนา", "อ.พบพระ"],
         [17.028325, 99.160272, "ต.สมอโคน", "อ.บ้านตาก"],
         [17.052095, 98.787032, "ต.สามหมื่น", "อ.แม่ระมาด"],
         [17.194415, 98.565941, "ต.แม่ตื่น", "อ.แม่ระมาด"],
         [17.371677, 98.220214, "ต.แม่อุสุ", "อ.ท่าสองยาง"],
         [17.356325, 99.023186, "ต.ยกกระบัตร", "อ.สามเงา"],
         [17.707009, 97.973987, "ต.แม่วะหลวง", "อ.ท่าสองยาง"],
         [16.87576, 99.122329, "ต.เทศบาลเมืองตาก", "อ.เมืองตาก"],
         [16.761917, 98.765933, "ต.พะวอ", "อ.แม่สอด"],
         [16.623425, 98.648971, "ต.แม่กุ", "อ.แม่สอด"],
         [17.007504, 98.65866, "ต.พระธาตุ", "อ.แม่ระมาด"],
         [17.001098, 99.068236, "ต.ตากตก", "อ.บ้านตาก"],
         [16.788551, 98.96661, "ต.แม่ท้อ", "อ.เมืองตาก"],
         [16.92442, 99.051036, "ต.หนองบัวเหนือ", "อ.เมืองตาก"],
         [17.086327, 98.918182, "ต.ท้องฟ้า", "อ.บ้านตาก"],
         [17.657956, 97.884765, "ต.ท่าสองยาง", "อ.ท่าสองยาง"],
         [17.233401, 99.218679, "ต.แม่สลิด", "อ.บ้านตาก"],
         [16.714963, 98.573635, "ต.แม่สอด", "อ.แม่สอด"],
         [16.513293, 98.713815, "ต.ช่องแคบ", "อ.พบพระ"],
         [17.110254, 99.010564, "ต.เกาะตะเภา", "อ.บ้านตาก"],
         [16.906687, 98.554657, "ต.แม่จะเรา", "อ.แม่ระมาด"],
         [16.867326, 99.076535, "ต.ป่ามะม่วง", "อ.เมืองตาก"],
         [17.278252, 99.157408, "ต.วังจันทร์", "อ.สามเงา"],
         [16.019282, 98.954547, "ต.อุ้มผาง", "อ.อุ้มผาง"],
         [16.5714, 98.663573, "ต.มหาวัน", "อ.แม่สอด"],
         [16.983196, 98.970354, "ต.ทุ่งกระเชาะ", "อ.บ้านตาก"],
         [17.059096, 99.290556, "ต.โป่งแดง", "อ.เมืองตาก"],
         [16.335712, 98.716172, "ต.วาเล่ย์", "อ.พบพระ"],
         [16.785793, 99.231409, "ต.วังหิน", "อ.เมืองตาก"],
         [16.401883, 98.696912, "ต.พบพระ", "อ.พบพระ"],
         [16.578884, 99.131876, "ต.เชียงทอง", "กิ่งอ.วังเจ้า"],
         [16.748321, 99.184204, "ต.ประดาง", "กิ่งอ.วังเจ้า"],
         [17.265889, 98.272423, "ต.แม่ต้าน", "อ.ท่าสองยาง"],
         [16.947625, 99.149449, "ต.ไม้งาม", "อ.เมืองตาก"],

     ]

     centroid.forEach((e) => {
         loadAQI(e[0], e[1], e[2], e[3]);
     });

     var apiKey1 = '4c889c5549a249d79f5588d5263b9f96';
     var apiKey2 = 'e2208e48ec6c47adb1d9bce89b3d0e52';

     function loadAQI(lat, lon, tam, amp) {
         var json = 'https://api.breezometer.com/baqi/?lat=' + lat + '&lon=' + lon + '&key=19e9831172e8429d8234c562781f76c5';

         $.getJSON(json, (dat) => {
             $('#dateTime').text(dat.datetime);
             const aqi = dat.country_aqi; // breezometer_aqi or country_aqi
             //  var myCustomColour = dat.country_color; //breezometer_color or country_color
             var aqiTxt;
             var myCustomColour;

             //  console.log(dat)
             if (aqi > 200) {
                 aqiTxt = 'มีผบกระทบต่อสุขภาพ';
                 myCustomColour = '#ed1c24'

             } else if (aqi > 101) {
                 aqiTxt = 'เริ่มมีผลกระทบต่อสุขภาพ';
                 myCustomColour = '#f26622'
             } else if (aqi > 51) {
                 aqiTxt = 'ปานกลาง';
                 myCustomColour = '#fff468'
             } else if (aqi > 26) {
                 aqiTxt = 'ดี';
                 myCustomColour = '#3bb54a'
             } else {
                 aqiTxt = 'ดีมาก';
                 myCustomColour = '#00aeef'
             }

             const markerHtmlStyles = `
              background-color: ${myCustomColour};
              width: 3rem;
              height: 3rem;
              display: block;
              left: -1.5rem;
              top: -1.5rem;
              position: relative;
              border-radius: 3rem 3rem 0;
              transform: rotate(45deg);
              border: 1px solid #FFFFFF`;

             const ic = L.divIcon({
                 className: "my-custom-pin",
                 iconAnchor: [0, 24],
                 labelAnchor: [-6, 0],
                 popupAnchor: [0, -36],
                 html: `<span style="${markerHtmlStyles}" />`
             });

             L.marker([lat, lon], {
                 draggable: false,
                 icon: ic
             }).bindPopup(
                 '<h6>ค่า AQI: ' + aqi + '</h6>' +
                 //  '</br>pollutants : ' + dat.country_description +
                 '</br>สถานที่ : ' + tam + ' ' + amp
             ).addTo(map)
         })
     }



     $.getJSON(json, (dat) => {
         //  console.log(dat);
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
                 "<br/><span id='kanit13'>ระดับคุณภาพอากาศ (AQI):</span> " + aqiTxt +
                 "<br/><span id='kanit13'>CO:</span> " + dat.LastUpdate.CO.value +
                 "<br/><span id='kanit13'>NO2:</span> " + dat.LastUpdate.NO2.value +
                 "<br/><span id='kanit13'>O3:</span> " + dat.LastUpdate.O3.value +
                 "<br/><span id='kanit13'>PM10:</span> " + dat.LastUpdate.PM10.value +
                 "<br/><span id='kanit13'>PM25:</span> " + dat.LastUpdate.PM25.value +
                 "<br/><span id='kanit13'>SO2:</span> " + dat.LastUpdate.SO2.value +
                 "<br/>แหล่งที่มาของข้อมูล: สำนักจัดการคุณภาพอากาศและเสียง กรมควบคุมมลพิษ <br/>http://air4thai.pcd.go.th"
             )
         //  .openPopup();
         //  map.setView(L.latLng(dat.lat, dat.long), 18);
     })

     //  function setCurrentView(dat) {
     //      if (marker !== undefined) {
     //          map.removeLayer(marker);
     //          addMarker(dat);
     //      } else {
     //          addMarker(dat);
     //      }
     //  }

     //  function addMarker(dat) {
     //      marker = L.marker([dat.lat, dat.lon], {
     //              draggable: false
     //          })
     //          .addTo(map)
     //          .bindPopup("<h6>" + dat.t_name + "</h6>" +
     //              "<br/><span id='kanit13'>จุดเด่น:</span> " + dat.t_identity +
     //              "<br/><span id='kanit13'>ประเภททัพยากร:</span> " + dat.t_type +
     //              "<br/><span id='kanit13'>ระดับศักยภาพ:</span> " + dat.t_potent + ' ดาว' +
     //              "<br/><span id='kanit13'>พิกัด:</span> " + dat.lon + "," + dat.lat +
     //              "<br/><span id='kanit13'>การเข้าถึง:</span> " + dat.t_ac +
     //              "<br/><span id='kanit13'>ความน่าสนใจ:</span> " + dat.t_in +
     //              "<br/><span id='kanit13'>ความสามารถในการรองรับ:</span> " + dat.t_cc +
     //              "<br/><span id='kanit13'>ศักยภาพ:</span> " + dat.t_sq +
     //              "<br/><span id='kanit13'>คุณภาพบริการ:</span>" + dat.t_la +
     //              "<br/><span id='kanit13'>--:</span> " + dat.t_re +
     //              "<br/><span id='kanit13'>อื่นๆ:</span> " + dat.t_etc
     //          )
     //          .openPopup();
     //      map.setView(L.latLng(dat.lat, dat.lon), 18);
     //  }

     //  function setDefaultView() {
     //      if (marker !== undefined) {
     //          map.removeLayer(marker);
     //      }
     //      map.setView(L.latLng(16.69, 100.09), 8);
     //  }



 });