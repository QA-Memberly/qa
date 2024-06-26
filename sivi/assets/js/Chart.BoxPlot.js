!(function (t, e) {
  "object" == typeof exports && "undefined" != typeof module
    ? e(exports, require("chart.js"))
    : "function" == typeof define && define.amd
    ? define(["exports", "chart.js"], e)
    : e(((t = t || self).ChartBoxPlot = {}), t.Chart);
})(this, function (t, e) {
  "use strict";
  function r(t, e, r) {
    return (
      e in t
        ? Object.defineProperty(t, e, {
            value: r,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (t[e] = r),
      t
    );
  }
  function i(t, e) {
    var r = Object.keys(t);
    if (Object.getOwnPropertySymbols) {
      var i = Object.getOwnPropertySymbols(t);
      e &&
        (i = i.filter(function (e) {
          return Object.getOwnPropertyDescriptor(t, e).enumerable;
        })),
        r.push.apply(r, i);
    }
    return r;
  }
  function o(t) {
    for (var e = 1; e < arguments.length; e++) {
      var o = null != arguments[e] ? arguments[e] : {};
      e % 2
        ? i(Object(o), !0).forEach(function (e) {
            r(t, e, o[e]);
          })
        : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(o))
        : i(Object(o)).forEach(function (e) {
            Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(o, e));
          });
    }
    return t;
  }
  function n(t, e) {
    return (
      (function (t) {
        if (Array.isArray(t)) return t;
      })(t) ||
      (function (t, e) {
        if ("undefined" == typeof Symbol || !(Symbol.iterator in Object(t)))
          return;
        var r = [],
          i = !0,
          o = !1,
          n = void 0;
        try {
          for (
            var a, l = t[Symbol.iterator]();
            !(i = (a = l.next()).done) &&
            (r.push(a.value), !e || r.length !== e);
            i = !0
          );
        } catch (t) {
          (o = !0), (n = t);
        } finally {
          try {
            i || null == l.return || l.return();
          } finally {
            if (o) throw n;
          }
        }
        return r;
      })(t, e) ||
      (function (t, e) {
        if (!t) return;
        if ("string" == typeof t) return a(t, e);
        var r = Object.prototype.toString.call(t).slice(8, -1);
        "Object" === r && t.constructor && (r = t.constructor.name);
        if ("Map" === r || "Set" === r) return Array.from(t);
        if (
          "Arguments" === r ||
          /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
        )
          return a(t, e);
      })(t, e) ||
      (function () {
        throw new TypeError(
          "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
        );
      })()
    );
  }
  function a(t, e) {
    (null == e || e > t.length) && (e = t.length);
    for (var r = 0, i = new Array(e); r < e; r++) i[r] = t[r];
    return i;
  }
  function l(t) {
    return (1 / Math.sqrt(2 * Math.PI)) * Math.exp(-0.5 * t * t);
  }
  function s(t, e) {
    return t - e;
  }
  function u(t) {
    var e = (function (t, e) {
      var r = (t = t.slice().sort(s)).length - 1;
      return e.map(function (e) {
        if (0 === e) return t[0];
        if (1 === e) return t[r];
        var i = 1 + e * r,
          o = Math.floor(i),
          n = i - o,
          a = t[o - 1];
        return 0 === n ? a : a + n * (t[o] - a);
      });
    })(t, [0.25, 0.75]);
    return e[1] - e[0];
  }
  function c(t) {
    var e = u(t) / 1.34;
    return (
      1.06 *
      Math.min(
        Math.sqrt(
          (function (t) {
            var e = t.length;
            if (e < 1) return NaN;
            if (1 === e) return 0;
            for (
              var r = (function (t) {
                  var e = t.length;
                  if (0 === e) return NaN;
                  for (var r = 0, i = -1; ++i < e; ) r += (t[i] - r) / (i + 1);
                  return r;
                })(t),
                i = -1,
                o = 0;
              ++i < e;

            ) {
              var n = t[i] - r;
              o += n * n;
            }
            return o / (e - 1);
          })(t)
        ),
        e
      ) *
      Math.pow(t.length, -0.2)
    );
  }
  function h(t) {
    var e = t.length - 1,
      r = function (r) {
        var i = 1 + r * e,
          o = Math.floor(i),
          n = i - o,
          a = t[o - 1];
        return 0 === n ? a : a + n * (t[o] - a);
      };
    return { min: t[0], q1: r(0.25), median: r(0.5), q3: r(0.75), max: t[e] };
  }
  function f(t) {
    var e = t.length,
      r = Math.floor((e + 3) / 2) / 2,
      i = function (e) {
        return 0.5 * (t[Math.floor(e) - 1] + t[Math.ceil(e) - 1]);
      };
    return {
      min: t[0],
      q1: i(r),
      median: i((e + 1) / 2),
      q3: i(e + 1 - r),
      max: t[e - 1],
    };
  }
  function m(t, e) {
    var r =
        arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1.5,
      i = t.q3 - t.q1,
      o = "number" == typeof r && r > 0,
      n = o ? Math.max(t.min, t.q1 - r * i) : t.min,
      a = o ? Math.min(t.max, t.q3 + r * i) : t.max;
    if (Array.isArray(e)) {
      for (var l = 0; l < e.length; l++) {
        var s = e[l];
        if (s >= n) {
          n = s;
          break;
        }
      }
      for (var u = e.length - 1; u >= 0; u--) {
        var c = e[u];
        if (c <= a) {
          a = c;
          break;
        }
      }
    }
    return { whiskerMin: n, whiskerMax: a };
  }
  var d = { coef: 1.5, quantiles: 7 };
  function v(t) {
    var e = null == t || "number" != typeof t.coef ? d.coef : t.coef,
      r = null == t ? null : t.quantiles;
    return {
      coef: e,
      quantiles:
        "function" == typeof r ? r : "hinges" === r || "fivenum" === r ? f : h,
    };
  }
  function p(t, e) {
    if (0 === t.length) return {};
    (t = t.filter(function (t) {
      return "number" == typeof t && !isNaN(t);
    })).sort(function (t, e) {
      return t - e;
    });
    var r = (0, v(e).quantiles)(t);
    return (
      (r.kde = (function () {
        var t = l,
          e = [],
          r = c;
        function i(i, o) {
          var n = r.call(this, e);
          return i.map(function (r) {
            for (var i = -1, o = 0, a = e.length; ++i < a; )
              o += t((r - e[i]) / n);
            return [r, o / n / a];
          });
        }
        return (
          (i.kernel = function (e) {
            return arguments.length ? ((t = e), i) : t;
          }),
          (i.sample = function (t) {
            return arguments.length ? ((e = t), i) : e;
          }),
          (i.bandwidth = function (t) {
            return arguments.length
              ? ((r =
                  "function" == typeof (e = t)
                    ? e
                    : function () {
                        return e;
                      }),
                i)
              : r;
            var e;
          }),
          i
        );
      })().sample(t)),
      r
    );
  }
  function g(t, e) {
    if (!t) return null;
    if (
      "number" == typeof t.median &&
      "number" == typeof t.q1 &&
      "number" == typeof t.q3
    ) {
      if (void 0 === t.whiskerMin) {
        var r = v(e).coef,
          i = m(
            t,
            Array.isArray(t.items)
              ? t.items.slice().sort(function (t, e) {
                  return t - e;
                })
              : null,
            r
          ),
          o = i.whiskerMin,
          n = i.whiskerMax;
        (t.whiskerMin = o), (t.whiskerMax = n);
      }
      return t;
    }
    return Array.isArray(t)
      ? (void 0 === t.__stats &&
          (t.__stats = (function (t, e) {
            if (0 === t.length)
              return {
                min: NaN,
                max: NaN,
                median: NaN,
                q1: NaN,
                q3: NaN,
                whiskerMin: NaN,
                whiskerMax: NaN,
                outliers: [],
              };
            (t = t.filter(function (t) {
              return "number" == typeof t && !isNaN(t);
            })).sort(function (t, e) {
              return t - e;
            });
            var r = v(e),
              i = r.quantiles,
              o = r.coef,
              n = i(t),
              a = m(n, t, o),
              l = a.whiskerMin,
              s = a.whiskerMax;
            return (
              (n.outliers = t.filter(function (t) {
                return t < l || t > s;
              })),
              (n.whiskerMin = l),
              (n.whiskerMax = s),
              n
            );
          })(t, e)),
        t.__stats)
      : void 0;
  }
  function b(t, e) {
    return t
      ? "number" != typeof t.median ||
        ("function" != typeof t.kde && !Array.isArray(t.coords))
        ? Array.isArray(t)
          ? (void 0 === t.__kde && (t.__kde = p(t, e)), t.__kde)
          : void 0
        : t
      : null;
  }
  function x(t, e) {
    if (!t) return t;
    if ("number" == typeof t || "string" == typeof t) return Number(t);
    var r = g(t, e);
    return r ? r.median : t;
  }
  var y = { ticks: o({ minStats: "min", maxStats: "max" }, d) };
  function _(t) {
    var e = this,
      r = this.chart,
      i = this.isHorizontal(),
      o = this.options.ticks,
      n = o.minStats,
      a = o.maxStats;
    (this.min = null),
      (this.max = null),
      r.data.datasets.forEach(function (o, l) {
        var s = r.getDatasetMeta(l);
        r.isDatasetVisible(l) &&
          (function (t) {
            return i ? t.xAxisID === e.id : t.yAxisID === e.id;
          })(s) &&
          o.data.forEach(function (r, i) {
            if (null != r && !s.data[i].hidden) {
              var o,
                l,
                u = (function (t, e, r, i) {
                  return "number" == typeof t[e] && "number" == typeof t[r]
                    ? t
                    : Array.isArray(t) && 0 !== t.length
                    ? g(t, i)
                    : void 0;
                })(r, n, a, e.options.ticks);
              if (u) (o = u[n]), (l = u[a]);
              else {
                var c = +e.getRightValue(r);
                if (isNaN(c)) return;
                o = l = c;
              }
              (null === e.min || o < e.min) && (e.min = o),
                (null === e.max || l > e.max) && (e.max = l),
                t && t(u);
            }
          });
      });
  }
  var w = o(
      o({}, e.defaults.global.elements.rectangle),
      {},
      {
        borderWidth: 1,
        outlierRadius: 2,
        outlierColor: e.defaults.global.elements.rectangle.backgroundColor,
        lowerColor: e.defaults.global.elements.rectangle.lowerColor,
        medianColor: null,
        itemRadius: 0,
        itemStyle: "circle",
        itemBackgroundColor:
          e.defaults.global.elements.rectangle.backgroundColor,
        itemBorderColor: e.defaults.global.elements.rectangle.borderColor,
        hitPadding: 2,
        outlierHitRadius: 4,
        tooltipDecimals: 2,
      }
    ),
    k = e.Element.extend({
      isVertical: function () {
        return void 0 !== this._view.width;
      },
      draw: function () {},
      _drawItems: function (t, r, i, o) {
        if (!(t.itemRadius <= 0 || !r.items || r.items.length <= 0)) {
          i.save(),
            (i.strokeStyle = t.itemBorderColor),
            (i.fillStyle = t.itemBackgroundColor);
          var n,
            a =
              (void 0 === (n = 1e3 * this._datasetIndex + this._index) &&
                (n = Date.now()),
              function () {
                return (n = (9301 * n + 49297) % 233280) / 233280;
              });
          o
            ? r.items.forEach(function (r) {
                e.canvasHelpers.drawPoint(
                  i,
                  t.itemStyle,
                  t.itemRadius,
                  t.x - t.width / 2 + a() * t.width,
                  r
                );
              })
            : r.items.forEach(function (r) {
                e.canvasHelpers.drawPoint(
                  i,
                  t.itemStyle,
                  t.itemRadius,
                  r,
                  t.y - t.height / 2 + a() * t.height
                );
              }),
            i.restore();
        }
      },
      _drawOutliers: function (t, e, r, i) {
        t.outlierRadius <= 0 ||
          !e.outliers ||
          0 === e.outliers.length ||
          ((r.fillStyle = t.outlierColor),
          r.beginPath(),
          i
            ? e.outliers.forEach(function (e) {
                r.arc(t.x, e, t.outlierRadius, 0, 2 * Math.PI);
              })
            : e.outliers.forEach(function (e) {
                r.arc(e, t.y, t.outlierRadius, 0, 2 * Math.PI);
              }),
          r.fill(),
          r.closePath());
      },
      _getBounds: function () {
        return { left: 0, top: 0, right: 0, bottom: 0 };
      },
      _getHitBounds: function () {
        var t = this._view.hitPadding,
          e = this._getBounds();
        return {
          left: e.left - t,
          top: e.top - t,
          right: e.right + t,
          bottom: e.bottom + t,
        };
      },
      height: function () {
        return 0;
      },
      inRange: function (t, e) {
        return (
          !!this._view &&
          (this._boxInRange(t, e) || this._outlierIndexInRange(t, e) >= 0)
        );
      },
      inLabelRange: function (t, e) {
        if (!this._view) return !1;
        var r = this._getHitBounds();
        return this.isVertical()
          ? t >= r.left && t <= r.right
          : e >= r.top && e <= r.bottom;
      },
      inXRange: function (t) {
        var e = this._getHitBounds();
        return t >= e.left && t <= e.right;
      },
      inYRange: function (t) {
        var e = this._getHitBounds();
        return t >= e.top && t <= e.bottom;
      },
      _outlierIndexInRange: function (t, e) {
        var r = this._view,
          i = r.outlierHitRadius,
          o = this._getOutliers(),
          n = this.isVertical();
        if ((n && Math.abs(t - r.x) > i) || (!n && Math.abs(e - r.y) > i))
          return -1;
        for (var a = n ? e : t, l = 0; l < o.length; l++)
          if (Math.abs(o[l] - a) <= i) return l;
        return -1;
      },
      _boxInRange: function (t, e) {
        var r = this._getHitBounds();
        return t >= r.left && t <= r.right && e >= r.top && e <= r.bottom;
      },
      getCenterPoint: function () {
        var t = this._view;
        return { x: t.x, y: t.y };
      },
      getArea: function () {
        return 0;
      },
      _getOutliers: function () {
        return [];
      },
      tooltipPosition: function (t, e) {
        if (!t) return this.getCenterPoint();
        delete e._tooltipOutlier;
        var r = this._view,
          i = this._outlierIndexInRange(t.x, t.y);
        return i < 0
          ? this.getCenterPoint()
          : ((e._tooltipOutlier = i),
            this.isVertical()
              ? { x: r.x, y: this._getOutliers()[i] }
              : { x: this._getOutliers()[i], y: r.y });
      },
    });
  e.defaults.global.elements.boxandwhiskers = o({}, w);
  var q = (e.elements.BoxAndWhiskers = k.extend({
    transition: function (t) {
      var r = e.Element.prototype.transition.call(this, t),
        i = this._model,
        o = this._start,
        n = this._view;
      return i && 1 !== t
        ? null == o.boxplot
          ? r
          : (i.boxplot === n.boxplot &&
              (n.boxplot = e.helpers.clone(n.boxplot)),
            (function (t, e, r, i) {
              for (var o = 0, n = Object.keys(r); o < n.length; o++) {
                var a = n[o],
                  l = r[a],
                  s = t[a];
                if (s !== l)
                  if ("number" != typeof l) {
                    if (Array.isArray(l))
                      for (
                        var u = e[a], c = Math.min(l.length, s.length), h = 0;
                        h < c;
                        ++h
                      )
                        u[h] = s[h] + (l[h] - s[h]) * i;
                  } else e[a] = s + (l - s) * i;
              }
            })(o.boxplot, n.boxplot, i.boxplot, t),
            r)
        : r;
    },
    draw: function () {
      var t = this._chart.ctx,
        e = this._view,
        r = e.boxplot,
        i = this.isVertical();
      t.save(),
        (t.fillStyle = e.backgroundColor),
        (t.strokeStyle = e.borderColor),
        (t.lineWidth = e.borderWidth),
        this._drawBoxPlot(e, r, t, i),
        this._drawOutliers(e, r, t, i),
        t.restore(),
        this._drawItems(e, r, t, i);
    },
    _drawBoxPlot: function (t, e, r, i) {
      i ? this._drawBoxPlotVert(t, e, r) : this._drawBoxPlotHoriz(t, e, r);
    },
    _drawBoxPlotVert: function (t, e, r) {
      var i = t.x,
        o = t.width,
        n = i - o / 2;
      e.q3 > e.q1
        ? r.fillRect(n, e.q1, o, e.q3 - e.q1)
        : r.fillRect(n, e.q3, o, e.q1 - e.q3),
        r.save(),
        t.medianColor && (r.strokeStyle = t.medianColor),
        r.beginPath(),
        r.moveTo(n, e.median),
        r.lineTo(n + o, e.median),
        r.closePath(),
        r.stroke(),
        null != e.segment &&
          (t.segmentColor && (r.strokeStyle = t.segmentColor),
          r.beginPath(),
          r.moveTo(n, e.segment),
          r.lineTo(n + o, e.segment),
          r.closePath()),
        t.lowerColor &&
          ((r.fillStyle = t.lowerColor),
          e.q3 > e.q1
            ? r.fillRect(n, e.median, o, e.q3 - e.median)
            : r.fillRect(n, e.median, o, e.q1 - e.median)),
        r.closePath(),
        r.stroke(),
        r.restore(),
        e.q3 > e.q1
          ? r.strokeRect(n, e.q1, o, e.q3 - e.q1)
          : r.strokeRect(n, e.q3, o, e.q1 - e.q3),
        r.beginPath(),
        r.moveTo(n, e.whiskerMin),
        r.lineTo(n + o, e.whiskerMin),
        r.moveTo(i, e.whiskerMin),
        r.lineTo(i, e.q1),
        r.moveTo(n, e.whiskerMax),
        r.lineTo(n + o, e.whiskerMax),
        r.moveTo(i, e.whiskerMax),
        r.lineTo(i, e.q3),
        r.closePath(),
        r.stroke();
    },
    _drawBoxPlotHoriz: function (t, e, r) {
      var i = t.y,
        o = t.height,
        n = i - o / 2;
      e.q3 > e.q1
        ? r.fillRect(e.q1, n, e.q3 - e.q1, o)
        : r.fillRect(e.q3, n, e.q1 - e.q3, o),
        r.save(),
        t.medianColor && (r.strokeStyle = t.medianColor),
        r.beginPath(),
        r.moveTo(e.median, n),
        r.lineTo(e.median, n + o),
        r.closePath(),
        r.stroke(),
        r.restore(),
        e.q3 > e.q1
          ? r.strokeRect(e.q1, n, e.q3 - e.q1, o)
          : r.strokeRect(e.q3, n, e.q1 - e.q3, o),
        r.beginPath(),
        r.moveTo(e.whiskerMin, n),
        r.lineTo(e.whiskerMin, n + o),
        r.moveTo(e.whiskerMin, i),
        r.lineTo(e.q1, i),
        r.moveTo(e.whiskerMax, n),
        r.lineTo(e.whiskerMax, n + o),
        r.moveTo(e.whiskerMax, i),
        r.lineTo(e.q3, i),
        r.closePath(),
        r.stroke();
    },
    _getBounds: function () {
      var t = this._view,
        e = this.isVertical(),
        r = t.boxplot;
      if (!r) return { left: 0, top: 0, right: 0, bottom: 0 };
      if (e) {
        var i = t.x,
          o = t.width,
          n = i - o / 2;
        return {
          left: n,
          top: r.whiskerMax,
          right: n + o,
          bottom: r.whiskerMin,
        };
      }
      var a = t.y,
        l = t.height,
        s = a - l / 2;
      return { left: r.whiskerMin, top: s, right: r.whiskerMax, bottom: s + l };
    },
    height: function () {
      var t = this._view;
      return t.base - Math.min(t.boxplot.q1, t.boxplot.q3);
    },
    getArea: function () {
      var t = this._view,
        e = Math.abs(t.boxplot.q3 - t.boxplot.q1);
      return this.isVertical() ? e * t.width : e * t.height;
    },
    _getOutliers: function () {
      return (this._view.boxplot && this._view.boxplot.outliers) || [];
    },
  }));
  e.defaults.global.elements.violin = o({ points: 100 }, w);
  var M = (e.elements.Violin = k.extend({
      transition: function (t) {
        var r = e.Element.prototype.transition.call(this, t),
          i = this._model,
          o = this._start,
          n = this._view;
        return i && 1 !== t
          ? null == o.violin
            ? r
            : (i.violin === n.violin && (n.violin = e.helpers.clone(n.violin)),
              (function (t, e, r, i) {
                for (var o = 0, n = Object.keys(r); o < n.length; o++) {
                  var a = n[o],
                    l = r[a],
                    s = t[a];
                  if (s !== l)
                    if ("number" != typeof l) {
                      if ("coords" === a)
                        for (
                          var u = e[a], c = Math.min(l.length, s.length), h = 0;
                          h < c;
                          ++h
                        )
                          (u[h].v = s[h].v + (l[h].v - s[h].v) * i),
                            (u[h].estimate =
                              s[h].estimate +
                              (l[h].estimate - s[h].estimate) * i);
                    } else e[a] = s + (l - s) * i;
                }
              })(o.violin, n.violin, i.violin, t),
              r)
          : r;
      },
      draw: function () {
        var t = this._chart.ctx,
          r = this._view,
          i = r.violin,
          o = this.isVertical();
        t.save(),
          (t.fillStyle = r.backgroundColor),
          (t.strokeStyle = r.borderColor),
          (t.lineWidth = r.borderWidth);
        var n = i.coords;
        if (
          (e.canvasHelpers.drawPoint(t, "rectRot", 5, r.x, r.y),
          t.stroke(),
          t.beginPath(),
          o)
        ) {
          var a = r.x,
            l = r.width / 2 / i.maxEstimate;
          t.moveTo(a, i.min),
            n.forEach(function (e) {
              var r = e.v,
                i = e.estimate;
              t.lineTo(a - i * l, r);
            }),
            t.lineTo(a, i.max),
            t.moveTo(a, i.min),
            n.forEach(function (e) {
              var r = e.v,
                i = e.estimate;
              t.lineTo(a + i * l, r);
            }),
            t.lineTo(a, i.max);
        } else {
          var s = r.y,
            u = r.height / 2 / i.maxEstimate;
          t.moveTo(i.min, s),
            n.forEach(function (e) {
              var r = e.v,
                i = e.estimate;
              t.lineTo(r, s - i * u);
            }),
            t.lineTo(i.max, s),
            t.moveTo(i.min, s),
            n.forEach(function (e) {
              var r = e.v,
                i = e.estimate;
              t.lineTo(r, s + i * u);
            }),
            t.lineTo(i.max, s);
        }
        t.stroke(),
          t.fill(),
          t.closePath(),
          this._drawOutliers(r, i, t, o),
          t.restore(),
          this._drawItems(r, i, t, o);
      },
      _getBounds: function () {
        var t = this._view,
          e = this.isVertical(),
          r = t.violin;
        if (e) {
          var i = t.x,
            o = t.width,
            n = i - o / 2;
          return { left: n, top: r.max, right: n + o, bottom: r.min };
        }
        var a = t.y,
          l = t.height,
          s = a - l / 2;
        return { left: r.min, top: s, right: r.max, bottom: s + l };
      },
      height: function () {
        var t = this._view;
        return t.base - Math.min(t.violin.min, t.violin.max);
      },
      getArea: function () {
        var t = this._view,
          e = Math.abs(t.violin.max - t.violin.min);
        return this.isVertical() ? e * t.width : e * t.height;
      },
      _getOutliers: function () {
        return this._view.violin.outliers || [];
      },
    })),
    P = { scales: { yAxes: [{ type: "arrayLinear" }] } },
    S = { scales: { xAxes: [{ type: "arrayLinear" }] } };
  function N(t) {
    var e = this._chart.config.options.tooltipDecimals;
    return null == e || "number" != typeof e || e < 0
      ? t
      : Number.parseFloat(t).toFixed(e);
  }
  var V = [
      "outlierRadius",
      "itemRadius",
      "itemStyle",
      "itemBackgroundColor",
      "itemBorderColor",
      "outlierColor",
      "medianColor",
      "segmentColor",
      "hitPadding",
      "outlierHitRadius",
      "lowerColor",
    ],
    T = [!1, !1, !1, !0, !0, !0, !0, !0, !1, !1, !0],
    O = {
      _elementOptions: function () {
        return {};
      },
      updateElement: function (t, r, i) {
        var o = this.getDataset(),
          n = t.custom || {},
          a = this._elementOptions();
        e.controllers.bar.prototype.updateElement.call(this, t, r, i);
        var l = e.helpers.options.resolve,
          s = {
            chart: this.chart,
            dataIndex: r,
            dataset: o,
            datasetIndex: this.index,
          };
        V.forEach(function (e) {
          t._model[e] = l([n[e], o[e], a[e]], s, r);
        });
      },
      _calculateCommonModel: function (t, e, r, i) {
        r.outliers &&
          (t.outliers = r.outliers.map(function (t) {
            return i.getPixelForValue(Number(t));
          })),
          Array.isArray(e)
            ? (t.items = e.map(function (t) {
                return i.getPixelForValue(Number(t));
              }))
            : r.items &&
              (t.items = r.items.map(function (t) {
                return i.getPixelForValue(Number(t));
              }));
      },
      setHoverStyle: function (t) {
        e.controllers.bar.prototype.setHoverStyle.call(this, t);
        var r = this.chart.data.datasets[t._datasetIndex],
          i = t._index,
          o = t.custom || {},
          n = t._model,
          a = e.helpers.getHoverColor,
          l = e.helpers.options.resolve;
        V.forEach(function (e, s) {
          t.$previousStyle[e] = n[e];
          var u = "hover".concat(e.charAt(0).toUpperCase()).concat(e.slice(1)),
            c = T[s] && null != n[e] ? a(n[e]) : n[e];
          t._model[e] = l([o[u], r[u], c], void 0, i);
        });
      },
    };
  var A = {
    tooltips: {
      position: "boxplot",
      callbacks: {
        label: function (t, e) {
          for (
            var r = g(
                e.datasets[t.datasetIndex].data[t.index],
                this._chart
                  .getDatasetMeta(t.datasetIndex)
                  .controller._getValueScale().options.ticks
              ),
              i = null == this._tooltipOutlier ? -1 : this._tooltipOutlier,
              o = this._options.callbacks.boxplotLabel,
              n = arguments.length,
              a = new Array(n > 2 ? n - 2 : 0),
              l = 2;
            l < n;
            l++
          )
            a[l - 2] = arguments[l];
          return o.apply(this, [t, e, r, i].concat(a));
        },
        boxplotLabel: function (t, e, r, i) {
          var o = e.datasets[t.datasetIndex].label || "",
            n = ""
              .concat(o, " ")
              .concat("string" == typeof t.xLabel ? t.xLabel : t.yLabel);
          if (!r) return "".concat(n, " (NaN)");
          if (i >= 0) {
            var a = r.outliers[i];
            return "".concat(n, " (outlier: ").concat(N.call(this, a), ")");
          }
          return ""
            .concat(n, " (min: ")
            .concat(N.call(this, r.min), ", q1: ")
            .concat(N.call(this, r.q1), ", median: ")
            .concat(N.call(this, r.median), ", q3: ")
            .concat(N.call(this, r.q3), ", max: ")
            .concat(N.call(this, r.max), ")");
        },
      },
    },
  };
  (e.defaults.boxplot = e.helpers.merge({}, [e.defaults.bar, P, A])),
    (e.defaults.horizontalBoxplot = e.helpers.merge({}, [
      e.defaults.horizontalBar,
      S,
      A,
    ])),
    e.defaults.global.datasets &&
      e.defaults.global.datasets.bar &&
      (e.defaults.global.datasets.boxplot = o(
        {},
        e.defaults.global.datasets.bar
      )),
    e.defaults.global.datasets &&
      e.defaults.global.datasets.horizontalBar &&
      (e.defaults.global.datasets.horizontalBoxplot = o(
        {},
        e.defaults.global.datasets.horizontalBar
      ));
  var B = o(
      o({}, O),
      {},
      {
        dataElementType: e.elements.BoxAndWhiskers,
        _elementOptions: function () {
          return this.chart.options.elements.boxandwhiskers;
        },
        _updateElementGeometry: function (t, r, i) {
          for (
            var o,
              n = arguments.length,
              a = new Array(n > 3 ? n - 3 : 0),
              l = 3;
            l < n;
            l++
          )
            a[l - 3] = arguments[l];
          (o = e.controllers.bar.prototype._updateElementGeometry).call.apply(
            o,
            [this, t, r, i].concat(a)
          ),
            (t._model.boxplot = this._calculateBoxPlotValuesPixels(
              this.index,
              r
            ));
        },
        _calculateBoxPlotValuesPixels: function (t, e) {
          var r = this._getValueScale(),
            i = this.chart.data.datasets[t].data[e];
          if (!i) return null;
          var o = g(i, r.options.ticks),
            n = {};
          return (
            Object.keys(o).forEach(function (t) {
              "outliers" !== t &&
                "items" !== t &&
                (n[t] = r.getPixelForValue(Number(o[t])));
            }),
            this._calculateCommonModel(n, i, o, r),
            n
          );
        },
      }
    ),
    C = (e.controllers.boxplot = e.controllers.bar.extend(B)),
    I = (e.controllers.horizontalBoxplot =
      e.controllers.horizontalBar.extend(B));
  var R = {
    tooltips: {
      callbacks: {
        label: function (t, e) {
          for (
            var r = b(
                e.datasets[t.datasetIndex].data[t.index],
                this._chart
                  .getDatasetMeta(t.datasetIndex)
                  .controller._getValueScale().options.ticks
              ),
              i = this._options.callbacks.violinLabel,
              o = arguments.length,
              n = new Array(o > 2 ? o - 2 : 0),
              a = 2;
            a < o;
            a++
          )
            n[a - 2] = arguments[a];
          return i.apply(this, [t, e, r].concat(n));
        },
        violinLabel: function (t, e) {
          var r = e.datasets[t.datasetIndex].label || "",
            i = t.value,
            o = ""
              .concat(r, " ")
              .concat("string" == typeof t.xLabel ? t.xLabel : t.yLabel);
          return "".concat(o, " (").concat(N.call(this, i), ")");
        },
      },
    },
  };
  (e.defaults.violin = e.helpers.merge({}, [e.defaults.bar, P, R])),
    (e.defaults.horizontalViolin = e.helpers.merge({}, [
      e.defaults.horizontalBar,
      S,
      R,
    ])),
    e.defaults.global.datasets &&
      e.defaults.global.datasets.bar &&
      (e.defaults.global.datasets.violin = o(
        {},
        e.defaults.global.datasets.bar
      )),
    e.defaults.global.datasets &&
      e.defaults.global.datasets.horizontalBar &&
      (e.defaults.global.datasets.horizontalViolin = o(
        {},
        e.defaults.global.datasets.horizontalBar
      ));
  var E = o(
      o({}, O),
      {},
      {
        dataElementType: e.elements.Violin,
        _elementOptions: function () {
          return this.chart.options.elements.violin;
        },
        _updateElementGeometry: function (t, r, i) {
          for (
            var o,
              n = arguments.length,
              a = new Array(n > 3 ? n - 3 : 0),
              l = 3;
            l < n;
            l++
          )
            a[l - 3] = arguments[l];
          (o = e.controllers.bar.prototype._updateElementGeometry).call.apply(
            o,
            [this, t, r, i].concat(a)
          );
          var s = t.custom || {},
            u = this._elementOptions();
          t._model.violin = this._calculateViolinValuesPixels(
            this.index,
            r,
            void 0 !== s.points ? s.points : u.points
          );
        },
        _calculateViolinValuesPixels: function (t, e, r) {
          var i = this._getValueScale(),
            o = this.chart.data.datasets[t].data[e],
            n = b(o, i.options.ticks);
          if (
            (!Array.isArray(o) && "number" == typeof o && !Number.isNaN) ||
            null == n
          )
            return {
              min: o,
              max: o,
              median: o,
              coords: [{ v: o, estimate: Number.NEGATIVE_INFINITY }],
              maxEstimate: Number.NEGATIVE_INFINITY,
            };
          for (
            var a = [], l = (n.max - n.min) / r, s = n.min;
            s <= n.max && l > 0;
            s += l
          )
            a.push(s);
          a[a.length - 1] !== n.max && a.push(n.max);
          var u =
              n.coords ||
              n.kde(a).map(function (t) {
                return { v: t[0], estimate: t[1] };
              }),
            c = {
              min: i.getPixelForValue(n.min),
              max: i.getPixelForValue(n.max),
              median: i.getPixelForValue(n.median),
              coords: u.map(function (t) {
                var e = t.v,
                  r = t.estimate;
                return { v: i.getPixelForValue(e), estimate: r };
              }),
              maxEstimate: u.reduce(function (t, e) {
                return Math.max(t, e.estimate);
              }, Number.NEGATIVE_INFINITY),
            };
          return this._calculateCommonModel(c, o, n, i), c;
        },
      }
    ),
    j =
      ((e.controllers.violin = e.controllers.bar.extend(E)),
      (e.controllers.horizontalViolin = e.controllers.horizontalBar.extend(E))),
    L = e.helpers.merge({}, [y, e.scaleService.getScaleDefaults("linear")]),
    D = e.scaleService.getScaleConstructor("linear").extend({
      getRightValue: function (t) {
        return e.LinearScaleBase.prototype.getRightValue.call(
          this,
          x(t, this.options.ticks)
        );
      },
      _parseValue: function (t) {
        return e.LinearScaleBase.prototype._parseValue.call(
          this,
          x(t, this.options.ticks)
        );
      },
      determineDataLimits: function () {
        _.call(this), this.handleTickRangeOptions();
      },
    });
  e.scaleService.registerScaleType("arrayLinear", D, L);
  var z = e.helpers,
    H = z.merge({}, [y, e.scaleService.getScaleDefaults("logarithmic")]),
    F = e.scaleService.getScaleConstructor("logarithmic").extend({
      getRightValue: function (t) {
        return e.LinearScaleBase.prototype.getRightValue.call(
          this,
          x(t, this.options.ticks)
        );
      },
      _parseValue: function (t) {
        return e.LinearScaleBase.prototype._parseValue.call(
          this,
          x(t, this.options.ticks)
        );
      },
      determineDataLimits: function () {
        var t = this,
          e = this.options.ticks;
        (this.minNotZero = null),
          _.call(this, function (r) {
            var i = r[e.minStats];
            0 !== i &&
              (null === t.minNotZero || i < t.minNotZero) &&
              (t.minNotZero = i);
          }),
          (this.min = z.valueOrDefault(e.min, this.min - 0.05 * this.min)),
          (this.max = z.valueOrDefault(e.max, this.max + 0.05 * this.max)),
          this.min === this.max &&
            (0 !== this.min && null !== this.min
              ? ((this.min = Math.pow(10, Math.floor(z.log10(this.min)) - 1)),
                (this.max = Math.pow(10, Math.floor(z.log10(this.max)) + 1)))
              : ((this.min = 1), (this.max = 10)));
      },
    });
  e.scaleService.registerScaleType("arrayLogarithmic", F, H),
    (e.Tooltip.positioners.boxplot = function (t, e) {
      var r = this;
      if (!t.length) return !1;
      var i = n(
          t.reduce(
            function (t, i) {
              var o = n(t, 3),
                a = o[0],
                l = o[1],
                s = o[2];
              if (i && i.hasValue()) {
                var u = i.tooltipPosition(e, r);
                return [a + u.x, l + u.y, s + 1];
              }
              return [a, l, s];
            },
            [0, 0, 0]
          ),
          3
        ),
        o = i[0],
        a = i[1],
        l = i[2];
      return { x: o / l, y: a / l };
    }),
    (t.ArrayLinearScale = D),
    (t.ArrayLogarithmicScale = F),
    (t.BoxAndWhiskers = q),
    (t.BoxPlot = C),
    (t.HorizontalBoxPlot = I),
    (t.HorizontalViolin = j),
    (t.Violin = M),
    Object.defineProperty(t, "__esModule", { value: !0 });
});
