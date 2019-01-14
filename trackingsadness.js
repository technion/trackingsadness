function uuidv4() {
  // https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

var a = {};
var b = function() {
  return this;
};
var c = function(a) {
  return a || (a = {}), { generateGuid: uuidv4 };
};

var d = (function(a) {
  function _getISODate() {
    return (
      Date.prototype.toISOString ||
        (function() {
          function a(a) {
            var b = String(a);
            return 1 === b.length && (b = "0" + b), b;
          }
          Date.prototype.toISOString = function() {
            var b = this.getUTCFullYear() + "-" + a(this.getUTCMonth() + 1);
            return (
              (b +=
                "-" + a(this.getUTCDate()) + "T" + a(this.getUTCHours()) + ":"),
              (b +=
                a(this.getUTCMinutes()) + ":" + a(this.getUTCSeconds()) + "."),
              (b +=
                String((this.getUTCMilliseconds() / 1e3).toFixed(3)).slice(
                  2,
                  5
                ) + "Z")
            );
          };
        })(),
      new Date().toISOString()
    );
  }
  function _rand(a, b) {
    var c = arguments.length;
    if (0 === c) (a = 0), (b = 2147483647);
    else if (1 === c)
      throw new Error("Warning: rand() expects exactly 2 parameters, 1 given");
    return Math.floor(Math.random() * (b - a + 1)) + a;
  }
  function _createRequestUrl(a, b) {
    var c = w;
    return (
      (c.queryString = e(a, "tccl.")),
      (c.host = b),
      c.toString().length > 2048 &&
        (c.queryString = c.queryString.substring(0, 2047 - c.host.length)),
      c
    );
  }
  function e(a, b) {
    var c = "",
      d = "";
    for (var e in a)
      if (a.hasOwnProperty(e) && "" !== e && 0 !== e.indexOf(b)) {
        var f = "";
        if (null !== (f = a[e])) {
          if (void 0 === f || "undefined" === f || "" === f) continue;
          try {
            d = decodeURIComponent(f);
          } catch (a) {
            d = f;
          }
          (c += "" !== c ? "&" : ""), (c += e + "=" + encodeURIComponent(d));
        }
      }
    return c;
  }
  function f(a) {
    //protocol-less
    return "//img." + a;
  }
  function _getBeaconEndpoint(a, b) {
    return f(a) + b;
  }
  function _getDataLayerValues(a, b) {
    for (var c = new _eventObject(), d = 0; d < a.length; d++)
      for (var e in a[d])
        if (a[d].hasOwnProperty(e)) {
          if (b && 0 === e.indexOf("tccl.")) continue;
          c.set(e, a[d][e]);
        }
    return c;
  }
  function _eventObject() {
    (this.properties = {}),
      (this.id = ""),
      (this.properties.cts = new Date().getTime()),
      (this.get = function(a) {
        if (this.properties.hasOwnProperty(a)) return this.properties[a];
      }),
      (this.set = function(a, b) {
        this.properties[a] = b;
      }),
      (this.setEventType = function(a) {
        this.set("event_type", a);
      }),
      (this.getEventType = function() {
        return this.get("event_type");
      }),
      (this.getProperties = function() {
        return this.properties;
      }),
      (this.merge = function(a) {
        for (var b in a) a.hasOwnProperty(b) && this.set(b, a[b]);
      }),
      (this.isSet = function(a) {
        if (this.properties.hasOwnProperty(a)) return !0;
      });
  }
  function _getUserAgent() {
    return a.window.navigator.userAgent;
  }
  function _getHostname() {
    return a.window.location.hostname;
  }
  function _getPageName(b) {
    return (
      b || (b = a.window.location.pathname),
      "string" != typeof b || void 0 === b || "" === b
        ? "notspecified"
        : (b.lastIndexOf("/") === b.length - 1 &&
            (b = b.substring(0, b.length - 1)),
          0 !== b.indexOf("/") && (b = "/" + b),
          b)
    );
  }
  function _getReferrer(b) {
    return _debug("referrer:" + a.doc.referrer), a.doc.referrer.substr(0, b);
  }
  function _getCurrentUtcTimestamp() {
    return Math.round(new Date().getTime());
  } /* eslint-disable no-console */
  function _debug() {
    // or true
    (a.debugMode || !1) && console && console.log.apply && console.firebug;
  }
  function _isArray(a) {
    return "object" == typeof a && a instanceof Array;
  }
  function _setCookie(a, b, c, d, e, f, g) {
    var h = new Date();
    h.setTime(h.getTime() + 60 * d * 1e3);
    var i =
      b +
      "=" +
      encodeURI(c) +
      (d ? "; expires=" + h.toGMTString() : "") +
      (d ? "; max-age=" + 60 * d : "") +
      (e ? "; path=" + e : "") +
      (f ? "; domain=" + f : "") +
      (g ? "; secure" : "");
    a.cookie = i;
  }
  function _findCookie(a, b, c, d, e) {
    (c = []), "string" == typeof (d = a.cookie) && (c = d.split("; "));
    var f = {};
    for (e = c.length - 1; e >= 0; e--) {
      var g = c[e].indexOf("="),
        h = c[e].substring(0, g);
      if (h === b) {
        var i = c[e].substring(g + 1);
        f[h] = i ? decodeURIComponent(i) : "null value";
        break;
      }
    }
    return f[b];
  }
  function _getCookieValues(a, b) {
    // return the value of the cookie if found.
    var c = this.findCookie(a, b),
      d = {};
    if (c && "null value" !== c)
      for (var e = c.split("&"), f = e.length - 1; f >= 0; f--) {
        var g = e[f].split("=");
        d[g[0]] = g[1];
      }
    return d;
  }
  function _getCookieValue(a, b, c) {
    var d = this.getCookieValues(a, b);
    if (d.hasOwnProperty(c)) return d[c];
  }
  function _checkCookiesEnabled(a, b) {
    var c = !!b.cookieEnabled;
    return (
      void 0 !== b.cookieEnabled ||
        c ||
        (_setCookie(a, "testcookie"),
        (c = a.cookie.indexOf("testcookie") !== -1)),
      c
    );
  }
  function _usrinToString(a) {
    if ("object" == typeof a && p(a)) {
      for (var b = "", c = 0; c < a.length; c++)
        c > 0 && (b += "^"), p(a[c]) && (b += a[c][0] + "," + a[c][1]);
      if ("" !== b) return b;
    }
  } // eslint-disable-line no-unused-vars
  a || (a = {}),
    a.window || (a.window = window),
    a.doc || (a.doc = document),
    a.debugMode || (a.debugMode = !1);
  var w = {
    host: "",
    queryString: "",
    toString: function() {
      var a = this.host.indexOf("?") === -1 ? "?" : "&";
      return this.host + a + this.queryString;
    }
  };
  return {
    getDataLayerValues: _getDataLayerValues,
    getUserAgent: _getUserAgent,
    getHostname: _getHostname,
    getPageName: _getPageName,
    eventObject: _eventObject,
    createRequestUrl: _createRequestUrl,
    getReferrer: _getReferrer,
    getISODate: _getISODate,
    rand: _rand,
    getBeaconEndpoint: _getBeaconEndpoint,
    getCurrentUtcTimestamp: _getCurrentUtcTimestamp,
    debug: _debug,
    isArray: _isArray,
    getCookieValues: _getCookieValues,
    getCookieValue: _getCookieValue,
    checkCookiesEnabled: _checkCookiesEnabled,
    setCookie: _setCookie,
    findCookie: _findCookie,
    usrinToString: _usrinToString
  };
})();

var e = function(a) {
  function b() {
    //only send perf data once
    if (
      !a.perfSent &&
      ((a.perfSent = !0), a.performance && a.performance.timing)
    )
      try {
        return (
          (e.tce = a.performance.timing.connectEnd || 0),
          (e.tcs = a.performance.timing.connectStart || 0),
          (e.tdc = a.performance.timing.domComplete || 0),
          (e.tdclee = a.performance.timing.domContentLoadedEventEnd || 0),
          (e.tdcles = a.performance.timing.domContentLoadedEventStart || 0),
          (e.tdi = a.performance.timing.domInteractive || 0),
          (e.tdl = a.performance.timing.domLoading || 0),
          (e.tdle = a.performance.timing.domainLookupEnd || 0),
          (e.tdls = a.performance.timing.domainLookupStart || 0),
          (e.tfs = a.performance.timing.fetchStart || 0),
          (e.tns = a.performance.timing.navigationStart || 0),
          (e.trqs = a.performance.timing.requestStart || 0),
          (e.tre = a.performance.timing.responseEnd || 0),
          (e.trps = a.performance.timing.responseStart || 0),
          (e.tles = a.performance.timing.loadEventStart || 0),
          (e.tlee = a.performance.timing.loadEventEnd || 0),
          a.performance.navigation &&
            a.performance.navigation.type &&
            (e.nt = a.performance.navigation.type || 0),
          d(e),
          c(e),
          e
        );
      } catch (a) {
        return d(a), e;
      }
  }
  function c(b) {
    a.window._trfq &&
      b &&
      // cmdName, timingData,
      a.window._trfq.push(["cmdLogPerf", b]);
  } /* eslint-disable no-console */
  function d(b) {
    try {
      a.debugMode && a.window.console && console.log;
    } catch (a) {}
  } // eslint-disable-line no-unused-vars
  a || (a = {}),
    a.window || (a.window = window),
    a.debugMode || (a.debugMode = !1),
    a.document || (a.document = document),
    a.delay || (a.delay = 200),
    a.maxDelay || (a.maxDelay = 7e3),
    (a.perfSent = !1);

  //Perf library fallback
  //Check to see if the document is loaded
  // supported in moz, chrome, and IE11
  // supported in IE (until 11)
  //Last chance timeout in the case of a slow dom load
  return (
    void 0 === a.createEvent && (a.createEvent = !0),
    a.performance ||
      (a.window && a.window.performance
        ? (a.performance = a.window.performance)
        : d("Error loading performance lib")),
    void 0 !== a.document.readyState && "complete" === a.document.readyState
      ? setTimeout(b, a.delay)
      : a.createEvent &&
        (a.document && a.document.addEventListener
          ? a.window.addEventListener("load", function() {
              setTimeout(b, a.delay);
            })
          : a.document &&
            a.document.attachEvent &&
            a.document.attachEvent("onreadystatechange", function() {
              "complete" === document.readyState && setTimeout(b, a.delay);
            })),
    setTimeout(function() {
      a.perfSent || b();
    }, a.maxDelay),
    a.debugMode,
    { getPerformanceData: b }
  );
};
var trackrun = function(a) {
  // eslint-disable-line no-unused-vars
  a || (a = {}),
    (a.debugMode = a.debugMode || !1),
    (a.window = a.window || window),
    (a.doc = a.doc || document),
    (a.utility = a.utility || d), // eslint-disable-line no-undef
    a.perf || (a.perf = e), // eslint-disable-line no-undef
    a.guid || (a.guid = new c()), // eslint-disable-line no-undef
    (a.baseHost = "test-secureserver.net"),
    (a.tcnPath = "/t/1/tl/event"),
    (a.version = "1.0.6"),
    (a.trfdData = []);
  var b = function(a) {
      function b(b) {
        var c = new a.utility.eventObject();
        c.merge(b), c.set("ht", "perf"), e(c, "perf", function() {});
      }
      function c(b, c, d, f) {
        var g = new a.utility.eventObject(),
          h = "pageview";
        g.set("ht", h),
          g.set("eid", c),
          b && g.set("dp", b),
          d && g.set("usrin", a.utility.usrinToString(d)),
          f && g.merge(f),
          e(g, h, function() {});
      }
      function d(b, c, d, f) {
        var g = new a.utility.eventObject(),
          h = "pageevent";
        g.set("ht", h),
          g.set("ea", b),
          g.set("eid", c),
          d && g.set("usrin", a.utility.usrinToString(d)),
          f && g.merge(f),
          // generic log events are still making image requests
          e(g, h, function() {});
      }
      function e(b, c, d) {
        // adds session data and page based data
        var e = g(),
          i = e.visitor,
          j = e.visit;
        // attach the generic data used on all events.
        b.set("dh", a.utility.getHostname()),
          b.set("dr", a.utility.getReferrer(1e3)),
          b.set("ua", a.utility.getUserAgent()),
          b.set("vci", l),
          b.set("cv", h),
          b.set("z", a.utility.rand()),
          b.set("vg", j),
          b.set("vtg", i),
          b.set("ap", m.ap ? m.ap : "not_set"),
          b.set("trfd", JSON.stringify(m)),
          b.get("dp") || b.set("dp", a.utility.getPageName());
        // convert to plain vanilla js object
        var k = b.getProperties();
        // for now the default is to use an image request, but leave room here for deciding based on config
        ("pageevent" !== c && "perf" !== c && "pageview" !== c) || f(k, d);
      }
      // Should take all the properties and attach them as the query string.
      function f(b, c) {
        // pass in the only url we have now, but eventually it should be looked up
        // based on request type (img, post, etc)
        var d = a.utility.createRequestUrl(b, k),
          e = new Image(1, 1);
        (e.onload = "function" == typeof c ? c : function() {}),
          (e.class = "trafficImage"),
          (e.src = d.toString()),
          c();
      }
      function g() {
        var b = a.utility.findCookie(a.doc, "_tccl_visitor"),
          c = a.utility.findCookie(a.doc, "_tccl_visit");
        // create cookie or reset the expiration time
        // create cookie or reset the expiration time
        return (
          b || c
            ? (b || (b = a.guid.generateGuid()),
              c || (c = a.guid.generateGuid()))
            : (b = c = a.guid.generateGuid()),
          a.utility.setCookie(a.doc, "_tccl_visitor", b, 525600, "/", null),
          a.utility.setCookie(a.doc, "_tccl_visit", c, 30, "/", null),
          { visitor: b, visit: c }
        );
      }
      var h = a.hasOwnProperty("version") ? a.version : "not.set",
        i = a.hasOwnProperty("baseHost") ? a.baseHost : "godaddy.com",
        j = a.hasOwnProperty("imgSitePath") ? a.imgSitePath : "/t/1/tl/event",
        k = a.utility.getBeaconEndpoint(i, j),
        l = a.utility.rand(),
        m = a.hasOwnProperty("trfdData") ? a.trfdData : {};
      return a.debugMode, { cmdLogEvent: d, cmdLogPerf: b, cmdLogPage: c };
    },
    f = function() {
      var b = a.utility.debug;
      b("TrackerQueue object created.");
      var c = [];
      (this.push = function(c, d) {
        // parse the command array
        var e = Array.prototype.slice.call(c, 1),
          f = c[0];
        b("tracker queue object name %s", h),
          b("tracker queue object method name %s", f),
          a.window[h][f] && a.window[h][f].apply(a.window[h], e),
          d && "function" == typeof d && d();
      }),
        (this.loadCommands = function(a) {
          c = a;
        }),
        (this.process = function() {
          var a = this,
            b = function() {
              c.length > 0 && a.process();
            };
          c.length > 0 && this.push(c.shift(), b);
        });
    };
  void 0 !== a.window._trfd ? (a.trfd = a.window._trfd) : (a.trfd = []);
  var g = a.utility.getDataLayerValues(a.trfd, !1);
  // set up args array to pass into tracker
  (a.baseHost = g.get("tccl.baseHost")),
    (a.trfdData = g.getProperties()),
    // Turn on perf logging based on trfd config
    (a.perfOn = !g["tccl.perfOn"] || g["tccl.perfOn"]),
    // if perf logging is turned on add the perf lib
    a.perfOn &&
      "function" == typeof a.perf &&
      (a.window.perfhandler = a.perf());
  // This is the assigned tracker name (technically supports more than one)
  var h = (a.globalTrackerName = "TCCTracker"),
    i = new f();
  // is tracker object created?
  void 0 === a.window[h] && (a.window[h] = new b(a));
  // set or create the local traffic array
  var j = a.window._trfq || [];
  a.utility.isArray(j) &&
    // add items from the global command array to the Tracker.
    i.loadCommands(j),
    (window._trfq = i),
    window._trfq.process();
};
b.true = a;
trackrun({});
