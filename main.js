var hash = window.location.hash,
  img = $ ('.radar-img'),
  ldg = $ ('.loading'),
  stxt = $ ('.status-text'),
  tw = $ ('.twitter-block'),
  loadtw = $ ('.loadtwitter'),
  mdcnt = $ ('.modal .modal-content'),
  //togglessl = $(".togglessl"),
  anilink = $ ('.animated-radar'),
  twnotice = $ ('.traffic-notice'),
  unitnotice = $ ('.radar-unit-notice'),
  weatherBlock = $ ('.weather-block');

if (hash == '') {
  window.history.replaceState ({}, '', '/#home');
  stxt.load ('../content/home.html?v=8.5.1');
  weatherBlock.show ();
  gtag ('config', 'UA-78233854-2', {
    page_path: '/#home',
  });
}

$ (document).ready (function () {
  twnotice.hide ();

  if (location.protocol === 'http:') {
    $ ('.imganiold').show ();
    $ ('.gif-badge').hide ();
  }

  $ ('.loadradar').click (function (e) {
    e.preventDefault ();
    var data = $ (this).data (),
      radarName = data.title,
      aniRadarName = data.anititle,
      radarId = $ (this).attr ('id'),
      d = new Date (),
      date =
        d.getFullYear () +
        '' +
        (d.getMonth () + 1) +
        '' +
        d.getDate () +
        '' +
        d.getHours (),
      minute5 = d.getMinutes () - d.getMinutes () % 5,
      minute10 = d.getMinutes () - d.getMinutes () % 10,
      time5 = date + minute5,
      time20 = date + minute10;
    if (minute10 > 20) {
      time20 = date + '20';
    }
    window.history.replaceState ({}, '', '/#' + radarId);
    gtag ('config', 'UA-78233854-2', {
      page_path: '/#' + radarId,
    });
    $ ('.nav-extended').css ('top', '0');
    anilink.hide ();
    weatherBlock.hide ();
    tw.hide ();
    twnotice.hide ();
    img.removeAttr ('src');
    img.show ();
    if (location.protocol === 'https:') {
      if (data.cache == '20') {
        img.attr (
          'src',
          'https://rainradarcontent.pkn.sh/i/' +
            time20 +
            '/' +
            data.img +
            '?rainradar=8.5.1'
        );
        //img.attr("src", "https://images.weserv.nl?url=" + data.img + "?rainradar=8.5.1" + time20);
      } else if (data.imganiold === 'yes') {
        img.attr ('src', 'https://static.pkn.sh/blank.gif');
      } else {
        img.attr (
          'src',
          'https://rainradarcontent.pkn.sh/i/' +
            time5 +
            '/' +
            data.img +
            '?rainradar=8.5.1'
        );
        //img.attr("src", "https://images.weserv.nl?url=" + data.img + "?rainradar=8.5.1" + time5);
        if (data.imgani === 'yes') {
          anilink.html (
            '<a class="waves-effect waves-light blue btn-large" href="http://nossl.radar.openbase.co/#' +
              radarId +
              'ani"><img class="animated-radar-button" src="/img/play.png"/> ดูเรดาร์' +
              aniRadarName +
              'แบบเคลื่อนไหว</a>'
          );
          anilink.show ();
        }
        unitnotice.show ();
      }
    } else {
      img.attr ('src', data.imgprefix + data.img + '?ct=' + time5);
    }
    if (data.type == 'info') {
      stxt.html ('<h5>' + data.title + '</h5>ข้อมูลจาก' + data.src);
      document.title = data.title + ' | RainRadar';
    } else {
      stxt.html ('<h5>เรดาร์' + radarName + '</h5>ภาพเรดาร์จาก' + data.src);
      document.title = 'เรดาร์' + radarName + ' | RainRadar';
    }
    ldg.show ();
    img.on ('load', function () {
      ldg.hide ();
      if (data.imganiold === 'yes' && location.protocol === 'https:') {
        stxt.html (
          '<h5>RainRadar เปลี่ยนรูปแบบการโหลดภาพเคลื่อนไหว</h5>กรุณาเลือกเรดาร์ที่ต้องการดูใหม่ครั้ง'
        );
      }
    });
    img.on ('error', function () {
      ldg.hide ();
      unitnotice.hide ();
      img.hide ();
      if (data.type === 'info') {
        stxt.html (
          '<h5>' +
            data.title +
            '</h5>ไม่สามารถโหลดข้อมูลได้<br>กรุณาลองใหม่อีกครั้งในอีก 5-10 นาที หรือเลือกดูภาพเรดาร์แทน'
        );
      } else {
        stxt.html (
          '<h5>เรดาร์' +
            radarName +
            '</h5>ไม่สามารถโหลดภาพเรดาร์<br>กรุณาลองใหม่อีกครั้งในอีก 5-10 นาที หรือเลือกดูเรดาร์อื่น'
        );
      }
    });
  });

  $ ('.modal-trigger').click (function () {
    modalHash = window.location.hash;
    var data = $ (this).data ();
    $ ('.modal').attr ('alt', data.identity);
    window.history.replaceState ({}, '', '/#' + data.identity);
    gtag ('config', 'UA-78233854-2', {
      page_path: '/#' + data.identity,
    });
    mdcnt.load (data.url, function (response, status) {
      if (status == 'error') {
        mdcnt.html ('ไม่สามารถโหลดข้อมูล');
      }
    });
  });

  $ ('#modal').modal ({
    opacity: 0.6,
    in_duration: 425,
    out_duration: 250,
    startingTop: '0%',
    endingTop: '8%',
    complete: function () {
      mdcnt.html ('กำลังโหลดข้อมูล กรุณารอสักครู่');
      if (
        modalHash.match (
          /help|about|termsandprivacy|ddslinks|radarclosed|weatheralert|aqi|enableweather/
        )
      ) {
        window.history.replaceState ({}, '', '/#home');
        stxt.load ('../content/home.html?v=8.5.1');
        weatherBlock.show ();
        gtag ('config', 'UA-78233854-2', {
          page_path: '/#home',
        });
      } else if (modalHash === '#home') {
        window.history.replaceState ({}, '', '#home');
        gtag ('config', 'UA-78233854-2', {
          page_path: '/#home',
        });
      } else {
        window.history.replaceState ({}, '', modalHash);
        gtag ('config', 'UA-78233854-2', {
          page_path: '/' + modalHash,
        });
      }
    },
  });

  $ ('.dropdown-menu').dropdown ({
    inDuration: 325,
    outDuration: 200,
    constrain_width: false,
    hover: false,
    gutter: 0,
    belowOrigin: true,
    alignment: 'left',
  });

  loadtw.click (function () {
    document.title = 'ข้อมูลการจราจร | RainRadar';
    window.history.replaceState ({}, '', '/#traffic');
    gtag ('config', 'UA-78233854-2', {
      page_path: '/#traffic',
    });
    window.scrollTo (0, 0);
    $ ('.nav-extended').css ('top', '0');
    if (loadtw.data ('click') == 0) {
      img.removeAttr ('src');
      unitnotice.hide ();
      img.hide ();
      ldg.hide ();
      anilink.hide ();
      weatherBlock.hide ();
      stxt.html ('<h5>ข้อมูลการจราจรจากทวิตเตอร์</h5>');
      ldg.show ();
      twnotice.show ();

      window.twttr = (function (d, s, id) {
        var js, fjs = d.getElementsByTagName (s)[0], t = window.twttr || {};
        if (d.getElementById (id)) return t;
        js = d.createElement (s);
        js.id = id;
        js.src = 'https://platform.twitter.com/widgets.js';
        fjs.parentNode.insertBefore (js, fjs);

        t._e = [];
        t.ready = function (f) {
          t._e.push (f);
        };

        return t;
      }) (document, 'script', 'twitter-wjs');

      twttr.ready (function (twttr) {
        twttr.events.bind ('rendered', function (event) {
          loadtw.data ('click', 1);
          ldg.hide ();
          tw.show ();
          stxt.html (
            '<h5>ข้อมูลการจราจรจากทวิตเตอร์</h5>อัปเดตอัตโนมัติ เมื่อมีข้อมูลใหม่จะแสดงทันที'
          );
        });
      });
    } else {
      img.removeAttr ('src');
      unitnotice.hide ();
      img.hide ();
      anilink.hide ();
      weatherBlock.hide ();
      stxt.html (
        '<h5>ข้อมูลการจราจรจากทวิตเตอร์</h5>อัปเดตอัตโนมัติ เมื่อมีข้อมูลใหม่จะแสดงทันที'
      );
      ldg.hide ();
      tw.show ();
    }
  });

  $ ('#home').click (function (e) {
    e.preventDefault ();
    window.history.replaceState ({}, '', '/#home');
    gtag ('config', 'UA-78233854-2', {
      page_path: '/#home',
    });
    $ ('.nav-extended').css ('top', '0');
    img.removeAttr ('src');
    anilink.hide ();
    stxt.html ('');
    ldg.hide ();
    unitnotice.hide ();
    img.hide ();
    tw.hide ();
    twnotice.hide ();
    stxt.load ('../content/home.html?v=8.5.1');
    weatherBlock.show ();
  });

  // Load image by url
  $ (hash).click ();

  // Open modal by url
  if (
    hash.match (
      /help|about|termsandprivacy|ddslinks|radarclosed|weatheralert|aqi|enableweather/
    )
  ) {
    $ ('#modal').modal ('open');
  }

  // Get status
  $.getJSON (
    'https://api.sheety.co/ff305574-1482-4f55-b34b-5b987844a6d9',
    function (data) {
      if (data[0].display != true) {
        console.log ('Good news! No incident report!');
      } else {
        content =
          '<p><b class="service-status-title">' + data[0].title + '</b>';
        content += '<br/>' + data[0].content + '<br/>';
        content += data[0].link_text + '</p>';
        $ (content).appendTo ('.service-status-block');
        $ ('.service-status-container').attr ('href', data[0].link);
        $ ('.service-status-container').css ('display', 'block');
      }
    }
  );

  // Hide navbar when scroll down
  var didScroll;
  var lastScrollTop = 0;
  var delta = 5;
  var navbarHeight = $ ('.nav-extended').outerHeight ();
  var wrapperHeight = $ ('.nav-wrapper').outerHeight ();

  $ (window).scroll (function (event) {
    didScroll = true;
  });

  setInterval (function () {
    if (didScroll) {
      hasScrolled ();
      didScroll = false;
    }
  }, 200);

  function hasScrolled () {
    var st = $ (this).scrollTop ();

    // Make sure they scroll more than delta
    if (Math.abs (lastScrollTop - st) <= delta) return;

    // If they scrolled down and are past the navbar, add class .nav-up.
    // This is necessary so you never see what is "behind" the navbar.
    if (st > lastScrollTop && st > navbarHeight) {
      // Scroll Down
      $ ('.nav-extended').css ('top', -wrapperHeight);
    } else {
      // Scroll Up
      if (st + $ (window).height () < $ (document).height ()) {
        $ ('.nav-extended').css ('top', '0');
      }
    }

    lastScrollTop = st;
  }
});

// Weather

var deniedText =
  'คุณปฏิเสธสิทธิ์ในการเข้าถึงตำแหน่ง <a class="white-text" href="https://go.pkn.sh/r5vc7GjF" target="_blank">คลิกที่นี่เพื่อดูวิธีอนุญาตสิทธิ์อีกครั้ง</a>';

function handlePermission () {
  if (navigator.geolocation) {
    navigator.permissions
      .query ({name: 'geolocation'})
      .then (function (result) {
        console.log ('geo: ' + result.state);
        if (result.state == 'granted') {
          getLocation ();
        } else if (result.state == 'prompt') {
          // Do nothing
        } else if (result.state == 'denied') {
          $ ('.weather-placeholder').html (deniedText);
        }
        result.onchange = function () {
          console.log ('geo: ' + result.state);
        };
      });
  } else {
    weatherBlock.remove ();
    console.log ('this browser not support geolocation api.');
  }
}

handlePermission ();

function enableWeather () {
  $ ('#modal, .modal-overlay').hide ();
  getLocation ();
}

function getLocation () {
  $ ('.weather-placeholder').remove ();
  $ ('.weather-loading').show ();
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition (loadWeather, geoError, {
      timeout: 10000,
    });
  } else {
    $ ('#modal').modal ('close');
    alert ('เบราว์เซอร์ของคุณไม่รองรับการระบุตำแหน่ง');
    $ ('.weather-loading').html ('เบราว์เซอร์ของคุณไม่รองรับการระบุตำแหน่ง');
  }
}

function loadWeather (position) {
  var lat = position.coords.latitude;
  var long = position.coords.longitude;
  $ ('#modal').modal ('close');
  fetch (
    'https://api.pkn.sh/weather/data/2.5/weather?lat=' +
      lat +
      '&lon=' +
      long +
      '&units=metric&APPID=8aa6ba4495812c798eebe9e6ac17ecc9&lang=th'
  )
    .then (function (resp) {
      return resp.json ();
    }) // Convert data to json
    .then (function (data) {
      drawWeather (data); // Call drawWeather
    })
    .catch (function () {
      // catch any errors
    });
}

function geoError (error) {
  $ ('#modal').modal ('close');
  if (error.code == error.PERMISSION_DENIED) {
    alert ('คุณปฏิเสธสิทธิ์ในการเข้าถึงตำแหน่ง คุณสมบัตินี้จะไม่ทำงาน');
    $ ('.weather-loading').html (deniedText);
  } else {
    alert ('เกิดข้อผิดพลาดขณะระบุตำแหน่ง กรุณารีเฟรชหน้าเว็บแล้วลองอีกครั้ง');
    $ ('.weather-loading').html (
      'เกิดข้อผิดพลาดขณะระบุตำแหน่ง กรุณารีเฟรชหน้าเว็บแล้วลองอีกครั้ง'
    );
  }
}

function drawWeather (d) {
  var weatherTimestamp = dayjs.unix (d.dt).format ('HH:mm');
  $ ('.description').html (d.weather[0].description);
  $ ('.temp').html (d.main.temp + '&deg;C');
  $ ('.temp-min').html ('ต่ำสุด ' + d.main.temp_min + '&deg;C');
  $ ('.temp-max').html ('สูงสุด ' + d.main.temp_max + '&deg;C');
  $ ('.weather-container .block-header').html ('สภาพอากาศใน ' + d.name);
  $ ('.weather-icon').attr (
    'src',
    'https://static.pkn.sh/rainradar/weather-icons/' +
      d.weather[0].icon +
      '.svg'
  );
  $ ('.weather-timestamp').html ('อัปเดตล่าสุด ' + weatherTimestamp + ' น.');
  $ ('.weather-link').attr ('href', 'https://openweathermap.org/city/' + d.id);
  $ ('.weather-loading').hide ();
  $ ('.weather-content').show ();
}
