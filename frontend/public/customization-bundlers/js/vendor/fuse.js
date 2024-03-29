!(function (e, t) {
  "object" == typeof exports && "undefined" != typeof module
    ? (module.exports = t())
    : "function" == typeof define && define.amd
    ? define(t)
    : ((e = e || self).Fuse = t());
})(this, function () {
  "use strict";
  function e(t) {
    return (e =
      "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
        ? function (e) {
            return typeof e;
          }
        : function (e) {
            return e &&
              "function" == typeof Symbol &&
              e.constructor === Symbol &&
              e !== Symbol.prototype
              ? "symbol"
              : typeof e;
          })(t);
  }
  function t(e, t) {
    if (!(e instanceof t))
      throw new TypeError("Cannot call a class as a function");
  }
  function n(e, t) {
    for (var n = 0; n < t.length; n++) {
      var r = t[n];
      (r.enumerable = r.enumerable || !1),
        (r.configurable = !0),
        "value" in r && (r.writable = !0),
        Object.defineProperty(e, r.key, r);
    }
  }
  function r(e, t, r) {
    return t && n(e.prototype, t), r && n(e, r), e;
  }
  function i(e, t, n) {
    return (
      t in e
        ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[t] = n),
      e
    );
  }
  function o(e, t) {
    var n = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var r = Object.getOwnPropertySymbols(e);
      t &&
        (r = r.filter(function (t) {
          return Object.getOwnPropertyDescriptor(e, t).enumerable;
        })),
        n.push.apply(n, r);
    }
    return n;
  }
  function c(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = null != arguments[t] ? arguments[t] : {};
      t % 2
        ? o(Object(n), !0).forEach(function (t) {
            i(e, t, n[t]);
          })
        : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : o(Object(n)).forEach(function (t) {
            Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
          });
    }
    return e;
  }
  function a(e, t) {
    if ("function" != typeof t && null !== t)
      throw new TypeError("Super expression must either be null or a function");
    (e.prototype = Object.create(t && t.prototype, {
      constructor: { value: e, writable: !0, configurable: !0 },
    })),
      t && u(e, t);
  }
  function s(e) {
    return (s = Object.setPrototypeOf
      ? Object.getPrototypeOf
      : function (e) {
          return e.__proto__ || Object.getPrototypeOf(e);
        })(e);
  }
  function u(e, t) {
    return (u =
      Object.setPrototypeOf ||
      function (e, t) {
        return (e.__proto__ = t), e;
      })(e, t);
  }
  function h(e, t) {
    return !t || ("object" != typeof t && "function" != typeof t)
      ? (function (e) {
          if (void 0 === e)
            throw new ReferenceError(
              "this hasn't been initialised - super() hasn't been called"
            );
          return e;
        })(e)
      : t;
  }
  function f(e) {
    var t = (function () {
      if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
      if (Reflect.construct.sham) return !1;
      if ("function" == typeof Proxy) return !0;
      try {
        return (
          Date.prototype.toString.call(
            Reflect.construct(Date, [], function () {})
          ),
          !0
        );
      } catch (e) {
        return !1;
      }
    })();
    return function () {
      var n,
        r = s(e);
      if (t) {
        var i = s(this).constructor;
        n = Reflect.construct(r, arguments, i);
      } else n = r.apply(this, arguments);
      return h(this, n);
    };
  }
  function l(e) {
    return (
      (function (e) {
        if (Array.isArray(e)) return d(e);
      })(e) ||
      (function (e) {
        if ("undefined" != typeof Symbol && Symbol.iterator in Object(e))
          return Array.from(e);
      })(e) ||
      (function (e, t) {
        if (!e) return;
        if ("string" == typeof e) return d(e, t);
        var n = Object.prototype.toString.call(e).slice(8, -1);
        "Object" === n && e.constructor && (n = e.constructor.name);
        if ("Map" === n || "Set" === n) return Array.from(e);
        if (
          "Arguments" === n ||
          /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
        )
          return d(e, t);
      })(e) ||
      (function () {
        throw new TypeError(
          "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
        );
      })()
    );
  }
  function d(e, t) {
    (null == t || t > e.length) && (t = e.length);
    for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
    return r;
  }
  function v(e) {
    return Array.isArray
      ? Array.isArray(e)
      : "[object Array]" === Object.prototype.toString.call(e);
  }
  function g(e) {
    return "string" == typeof e;
  }
  function y(e) {
    return "number" == typeof e;
  }
  function p(e) {
    return null != e;
  }
  function m(e) {
    return !e.trim().length;
  }
  var k = function (e) {
      return "Invalid value for key ".concat(e);
    },
    M = function (e) {
      return "Pattern length exceeds max of ".concat(e, ".");
    },
    x = Object.prototype.hasOwnProperty,
    b = (function () {
      function e(n) {
        var r = this;
        t(this, e), (this._keys = []), (this._keyMap = {});
        var i = 0;
        n.forEach(function (e) {
          var t = S(e);
          (i += t.weight),
            r._keys.push(t),
            (r._keyMap[t.id] = t),
            (i += t.weight);
        }),
          this._keys.forEach(function (e) {
            e.weight /= i;
          });
      }
      return (
        r(e, [
          {
            key: "get",
            value: function (e) {
              return this._keyMap[e];
            },
          },
          {
            key: "keys",
            value: function () {
              return this._keys;
            },
          },
          {
            key: "toJSON",
            value: function () {
              return JSON.stringify(this._keys);
            },
          },
        ]),
        e
      );
    })();
  function S(e) {
    var t = null,
      n = null,
      r = null,
      i = 1;
    if (g(e) || v(e)) (r = e), (t = _(e)), (n = w(e));
    else {
      if (!x.call(e, "name"))
        throw new Error(
          (function (e) {
            return "Missing ".concat(e, " property in key");
          })("name")
        );
      var o = e.name;
      if (((r = o), x.call(e, "weight") && (i = e.weight) <= 0))
        throw new Error(
          (function (e) {
            return "Property 'weight' in key '".concat(
              e,
              "' must be a positive integer"
            );
          })(o)
        );
      (t = _(o)), (n = w(o));
    }
    return { path: t, id: n, weight: i, src: r };
  }
  function _(e) {
    return v(e) ? e : e.split(".");
  }
  function w(e) {
    return v(e) ? e.join(".") : e;
  }
  var L = c(
      {},
      {
        isCaseSensitive: !1,
        includeScore: !1,
        keys: [],
        shouldSort: !0,
        sortFn: function (e, t) {
          return e.score === t.score
            ? e.idx < t.idx
              ? -1
              : 1
            : e.score < t.score
            ? -1
            : 1;
        },
      },
      {},
      { includeMatches: !1, findAllMatches: !1, minMatchCharLength: 1 },
      {},
      { location: 0, threshold: 0.6, distance: 100 },
      {},
      {
        useExtendedSearch: !1,
        getFn: function (e, t) {
          var n = [],
            r = !1;
          return (
            (function e(t, i, o) {
              if (i[o]) {
                var c = t[i[o]];
                if (!p(c)) return;
                if (o === i.length - 1 && (g(c) || y(c)))
                  n.push(
                    (function (e) {
                      return null == e
                        ? ""
                        : (function (e) {
                            if ("string" == typeof e) return e;
                            var t = e + "";
                            return "0" == t && 1 / e == -1 / 0 ? "-0" : t;
                          })(e);
                    })(c)
                  );
                else if (v(c)) {
                  r = !0;
                  for (var a = 0, s = c.length; a < s; a += 1)
                    e(c[a], i, o + 1);
                } else i.length && e(c, i, o + 1);
              } else n.push(t);
            })(e, g(t) ? t.split(".") : t, 0),
            r ? n : n[0]
          );
        },
        ignoreLocation: !1,
        ignoreFieldNorm: !1,
      }
    ),
    O = /[^ ]+/g;
  function A() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 3,
      t = new Map();
    return {
      get: function (n) {
        var r = n.match(O).length;
        if (t.has(r)) return t.get(r);
        var i = parseFloat((1 / Math.sqrt(r)).toFixed(e));
        return t.set(r, i), i;
      },
      clear: function () {
        t.clear();
      },
    };
  }
  var I = (function () {
    function e() {
      var n =
          arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
        r = n.getFn,
        i = void 0 === r ? L.getFn : r;
      t(this, e),
        (this.norm = A(3)),
        (this.getFn = i),
        (this.isCreated = !1),
        this.setIndexRecords();
    }
    return (
      r(e, [
        {
          key: "setSources",
          value: function () {
            var e =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : [];
            this.docs = e;
          },
        },
        {
          key: "setIndexRecords",
          value: function () {
            var e =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : [];
            this.records = e;
          },
        },
        {
          key: "setKeys",
          value: function () {
            var e = this,
              t =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : [];
            (this.keys = t),
              (this._keysMap = {}),
              t.forEach(function (t, n) {
                e._keysMap[t.id] = n;
              });
          },
        },
        {
          key: "create",
          value: function () {
            var e = this;
            !this.isCreated &&
              this.docs.length &&
              ((this.isCreated = !0),
              g(this.docs[0])
                ? this.docs.forEach(function (t, n) {
                    e._addString(t, n);
                  })
                : this.docs.forEach(function (t, n) {
                    e._addObject(t, n);
                  }),
              this.norm.clear());
          },
        },
        {
          key: "add",
          value: function (e) {
            var t = this.size();
            g(e) ? this._addString(e, t) : this._addObject(e, t);
          },
        },
        {
          key: "removeAt",
          value: function (e) {
            this.records.splice(e, 1);
            for (var t = e, n = this.size(); t < n; t += 1)
              this.records[t].i -= 1;
          },
        },
        {
          key: "getValueForItemAtKeyId",
          value: function (e, t) {
            return e[this._keysMap[t]];
          },
        },
        {
          key: "size",
          value: function () {
            return this.records.length;
          },
        },
        {
          key: "_addString",
          value: function (e, t) {
            if (p(e) && !m(e)) {
              var n = { v: e, i: t, n: this.norm.get(e) };
              this.records.push(n);
            }
          },
        },
        {
          key: "_addObject",
          value: function (e, t) {
            var n = this,
              r = { i: t, $: {} };
            this.keys.forEach(function (t, i) {
              var o = n.getFn(e, t.path);
              if (p(o))
                if (v(o))
                  !(function () {
                    for (
                      var e = [], t = [{ nestedArrIndex: -1, value: o }];
                      t.length;

                    ) {
                      var c = t.pop(),
                        a = c.nestedArrIndex,
                        s = c.value;
                      if (p(s))
                        if (g(s) && !m(s)) {
                          var u = { v: s, i: a, n: n.norm.get(s) };
                          e.push(u);
                        } else
                          v(s) &&
                            s.forEach(function (e, n) {
                              t.push({ nestedArrIndex: n, value: e });
                            });
                    }
                    r.$[i] = e;
                  })();
                else if (!m(o)) {
                  var c = { v: o, n: n.norm.get(o) };
                  r.$[i] = c;
                }
            }),
              this.records.push(r);
          },
        },
        {
          key: "toJSON",
          value: function () {
            return { keys: this.keys, records: this.records };
          },
        },
      ]),
      e
    );
  })();
  function C(e, t) {
    var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
      r = n.getFn,
      i = void 0 === r ? L.getFn : r,
      o = new I({ getFn: i });
    return o.setKeys(e.map(S)), o.setSources(t), o.create(), o;
  }
  function j(e, t) {
    var n = e.matches;
    (t.matches = []),
      p(n) &&
        n.forEach(function (e) {
          if (p(e.indices) && e.indices.length) {
            var n = { indices: e.indices, value: e.value };
            e.key && (n.key = e.key.src),
              e.idx > -1 && (n.refIndex = e.idx),
              t.matches.push(n);
          }
        });
  }
  function E(e, t) {
    t.score = e.score;
  }
  function $(e) {
    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
      n = t.errors,
      r = void 0 === n ? 0 : n,
      i = t.currentLocation,
      o = void 0 === i ? 0 : i,
      c = t.expectedLocation,
      a = void 0 === c ? 0 : c,
      s = t.distance,
      u = void 0 === s ? L.distance : s,
      h = t.ignoreLocation,
      f = void 0 === h ? L.ignoreLocation : h,
      l = r / e.length;
    if (f) return l;
    var d = Math.abs(a - o);
    return u ? l + d / u : d ? 1 : l;
  }
  function R() {
    for (
      var e =
          arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [],
        t =
          arguments.length > 1 && void 0 !== arguments[1]
            ? arguments[1]
            : L.minMatchCharLength,
        n = [],
        r = -1,
        i = -1,
        o = 0,
        c = e.length;
      o < c;
      o += 1
    ) {
      var a = e[o];
      a && -1 === r
        ? (r = o)
        : a ||
          -1 === r ||
          ((i = o - 1) - r + 1 >= t && n.push([r, i]), (r = -1));
    }
    return e[o - 1] && o - r >= t && n.push([r, o - 1]), n;
  }
  var F = 32;
  function P(e) {
    for (var t = {}, n = 0, r = e.length; n < r; n += 1) {
      var i = e.charAt(n);
      t[i] = (t[i] || 0) | (1 << (r - n - 1));
    }
    return t;
  }
  var N = (function () {
      function e(n) {
        var r = this,
          i =
            arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
          o = i.location,
          c = void 0 === o ? L.location : o,
          a = i.threshold,
          s = void 0 === a ? L.threshold : a,
          u = i.distance,
          h = void 0 === u ? L.distance : u,
          f = i.includeMatches,
          l = void 0 === f ? L.includeMatches : f,
          d = i.findAllMatches,
          v = void 0 === d ? L.findAllMatches : d,
          g = i.minMatchCharLength,
          y = void 0 === g ? L.minMatchCharLength : g,
          p = i.isCaseSensitive,
          m = void 0 === p ? L.isCaseSensitive : p,
          k = i.ignoreLocation,
          M = void 0 === k ? L.ignoreLocation : k;
        if (
          (t(this, e),
          (this.options = {
            location: c,
            threshold: s,
            distance: h,
            includeMatches: l,
            findAllMatches: v,
            minMatchCharLength: y,
            isCaseSensitive: m,
            ignoreLocation: M,
          }),
          (this.pattern = m ? n : n.toLowerCase()),
          (this.chunks = []),
          this.pattern.length)
        ) {
          var x = function (e, t) {
              r.chunks.push({ pattern: e, alphabet: P(e), startIndex: t });
            },
            b = this.pattern.length;
          if (b > F) {
            for (var S = 0, _ = b % F, w = b - _; S < w; )
              x(this.pattern.substr(S, F), S), (S += F);
            if (_) {
              var O = b - F;
              x(this.pattern.substr(O), O);
            }
          } else x(this.pattern, 0);
        }
      }
      return (
        r(e, [
          {
            key: "searchIn",
            value: function (e) {
              var t = this.options,
                n = t.isCaseSensitive,
                r = t.includeMatches;
              if ((n || (e = e.toLowerCase()), this.pattern === e)) {
                var i = { isMatch: !0, score: 0 };
                return r && (i.indices = [[0, e.length - 1]]), i;
              }
              var o = this.options,
                c = o.location,
                a = o.distance,
                s = o.threshold,
                u = o.findAllMatches,
                h = o.minMatchCharLength,
                f = o.ignoreLocation,
                d = [],
                v = 0,
                g = !1;
              this.chunks.forEach(function (t) {
                var n = t.pattern,
                  i = t.alphabet,
                  o = t.startIndex,
                  y = (function (e, t, n) {
                    var r =
                        arguments.length > 3 && void 0 !== arguments[3]
                          ? arguments[3]
                          : {},
                      i = r.location,
                      o = void 0 === i ? L.location : i,
                      c = r.distance,
                      a = void 0 === c ? L.distance : c,
                      s = r.threshold,
                      u = void 0 === s ? L.threshold : s,
                      h = r.findAllMatches,
                      f = void 0 === h ? L.findAllMatches : h,
                      l = r.minMatchCharLength,
                      d = void 0 === l ? L.minMatchCharLength : l,
                      v = r.includeMatches,
                      g = void 0 === v ? L.includeMatches : v,
                      y = r.ignoreLocation,
                      p = void 0 === y ? L.ignoreLocation : y;
                    if (t.length > F) throw new Error(M(F));
                    for (
                      var m,
                        k = t.length,
                        x = e.length,
                        b = Math.max(0, Math.min(o, x)),
                        S = u,
                        _ = b,
                        w = d > 1 || g,
                        O = w ? Array(x) : [];
                      (m = e.indexOf(t, _)) > -1;

                    ) {
                      var A = $(t, {
                        currentLocation: m,
                        expectedLocation: b,
                        distance: a,
                        ignoreLocation: p,
                      });
                      if (((S = Math.min(A, S)), (_ = m + k), w))
                        for (var I = 0; I < k; ) (O[m + I] = 1), (I += 1);
                    }
                    _ = -1;
                    for (
                      var C = [], j = 1, E = k + x, P = 1 << (k - 1), N = 0;
                      N < k;
                      N += 1
                    ) {
                      for (var D = 0, z = E; D < z; ) {
                        $(t, {
                          errors: N,
                          currentLocation: b + z,
                          expectedLocation: b,
                          distance: a,
                          ignoreLocation: p,
                        }) <= S
                          ? (D = z)
                          : (E = z),
                          (z = Math.floor((E - D) / 2 + D));
                      }
                      E = z;
                      var K = Math.max(1, b - z + 1),
                        q = f ? x : Math.min(b + z, x) + k,
                        W = Array(q + 2);
                      W[q + 1] = (1 << N) - 1;
                      for (var J = q; J >= K; J -= 1) {
                        var T = J - 1,
                          V = n[e.charAt(T)];
                        if (
                          (w && (O[T] = +!!V),
                          (W[J] = ((W[J + 1] << 1) | 1) & V),
                          N &&
                            (W[J] |= ((C[J + 1] | C[J]) << 1) | 1 | C[J + 1]),
                          W[J] & P &&
                            (j = $(t, {
                              errors: N,
                              currentLocation: T,
                              expectedLocation: b,
                              distance: a,
                              ignoreLocation: p,
                            })) <= S)
                        ) {
                          if (((S = j), (_ = T) <= b)) break;
                          K = Math.max(1, 2 * b - _);
                        }
                      }
                      if (
                        $(t, {
                          errors: N + 1,
                          currentLocation: b,
                          expectedLocation: b,
                          distance: a,
                          ignoreLocation: p,
                        }) > S
                      )
                        break;
                      C = W;
                    }
                    var Q = { isMatch: _ >= 0, score: Math.max(0.001, j) };
                    if (w) {
                      var U = R(O, d);
                      U.length ? g && (Q.indices = U) : (Q.isMatch = !1);
                    }
                    return Q;
                  })(e, n, i, {
                    location: c + o,
                    distance: a,
                    threshold: s,
                    findAllMatches: u,
                    minMatchCharLength: h,
                    includeMatches: r,
                    ignoreLocation: f,
                  }),
                  p = y.isMatch,
                  m = y.score,
                  k = y.indices;
                p && (g = !0), (v += m), p && k && (d = [].concat(l(d), l(k)));
              });
              var y = { isMatch: g, score: g ? v / this.chunks.length : 1 };
              return g && r && (y.indices = d), y;
            },
          },
        ]),
        e
      );
    })(),
    D = (function () {
      function e(n) {
        t(this, e), (this.pattern = n);
      }
      return (
        r(
          e,
          [{ key: "search", value: function () {} }],
          [
            {
              key: "isMultiMatch",
              value: function (e) {
                return z(e, this.multiRegex);
              },
            },
            {
              key: "isSingleMatch",
              value: function (e) {
                return z(e, this.singleRegex);
              },
            },
          ]
        ),
        e
      );
    })();
  function z(e, t) {
    var n = e.match(t);
    return n ? n[1] : null;
  }
  var K = (function (e) {
      a(i, e);
      var n = f(i);
      function i(e) {
        return t(this, i), n.call(this, e);
      }
      return (
        r(
          i,
          [
            {
              key: "search",
              value: function (e) {
                var t = e === this.pattern;
                return {
                  isMatch: t,
                  score: t ? 0 : 1,
                  indices: [0, this.pattern.length - 1],
                };
              },
            },
          ],
          [
            {
              key: "type",
              get: function () {
                return "exact";
              },
            },
            {
              key: "multiRegex",
              get: function () {
                return /^="(.*)"$/;
              },
            },
            {
              key: "singleRegex",
              get: function () {
                return /^=(.*)$/;
              },
            },
          ]
        ),
        i
      );
    })(D),
    q = (function (e) {
      a(i, e);
      var n = f(i);
      function i(e) {
        return t(this, i), n.call(this, e);
      }
      return (
        r(
          i,
          [
            {
              key: "search",
              value: function (e) {
                var t = -1 === e.indexOf(this.pattern);
                return {
                  isMatch: t,
                  score: t ? 0 : 1,
                  indices: [0, e.length - 1],
                };
              },
            },
          ],
          [
            {
              key: "type",
              get: function () {
                return "inverse-exact";
              },
            },
            {
              key: "multiRegex",
              get: function () {
                return /^!"(.*)"$/;
              },
            },
            {
              key: "singleRegex",
              get: function () {
                return /^!(.*)$/;
              },
            },
          ]
        ),
        i
      );
    })(D),
    W = (function (e) {
      a(i, e);
      var n = f(i);
      function i(e) {
        return t(this, i), n.call(this, e);
      }
      return (
        r(
          i,
          [
            {
              key: "search",
              value: function (e) {
                var t = e.startsWith(this.pattern);
                return {
                  isMatch: t,
                  score: t ? 0 : 1,
                  indices: [0, this.pattern.length - 1],
                };
              },
            },
          ],
          [
            {
              key: "type",
              get: function () {
                return "prefix-exact";
              },
            },
            {
              key: "multiRegex",
              get: function () {
                return /^\^"(.*)"$/;
              },
            },
            {
              key: "singleRegex",
              get: function () {
                return /^\^(.*)$/;
              },
            },
          ]
        ),
        i
      );
    })(D),
    J = (function (e) {
      a(i, e);
      var n = f(i);
      function i(e) {
        return t(this, i), n.call(this, e);
      }
      return (
        r(
          i,
          [
            {
              key: "search",
              value: function (e) {
                var t = !e.startsWith(this.pattern);
                return {
                  isMatch: t,
                  score: t ? 0 : 1,
                  indices: [0, e.length - 1],
                };
              },
            },
          ],
          [
            {
              key: "type",
              get: function () {
                return "inverse-prefix-exact";
              },
            },
            {
              key: "multiRegex",
              get: function () {
                return /^!\^"(.*)"$/;
              },
            },
            {
              key: "singleRegex",
              get: function () {
                return /^!\^(.*)$/;
              },
            },
          ]
        ),
        i
      );
    })(D),
    T = (function (e) {
      a(i, e);
      var n = f(i);
      function i(e) {
        return t(this, i), n.call(this, e);
      }
      return (
        r(
          i,
          [
            {
              key: "search",
              value: function (e) {
                var t = e.endsWith(this.pattern);
                return {
                  isMatch: t,
                  score: t ? 0 : 1,
                  indices: [e.length - this.pattern.length, e.length - 1],
                };
              },
            },
          ],
          [
            {
              key: "type",
              get: function () {
                return "suffix-exact";
              },
            },
            {
              key: "multiRegex",
              get: function () {
                return /^"(.*)"\$$/;
              },
            },
            {
              key: "singleRegex",
              get: function () {
                return /^(.*)\$$/;
              },
            },
          ]
        ),
        i
      );
    })(D),
    V = (function (e) {
      a(i, e);
      var n = f(i);
      function i(e) {
        return t(this, i), n.call(this, e);
      }
      return (
        r(
          i,
          [
            {
              key: "search",
              value: function (e) {
                var t = !e.endsWith(this.pattern);
                return {
                  isMatch: t,
                  score: t ? 0 : 1,
                  indices: [0, e.length - 1],
                };
              },
            },
          ],
          [
            {
              key: "type",
              get: function () {
                return "inverse-suffix-exact";
              },
            },
            {
              key: "multiRegex",
              get: function () {
                return /^!"(.*)"\$$/;
              },
            },
            {
              key: "singleRegex",
              get: function () {
                return /^!(.*)\$$/;
              },
            },
          ]
        ),
        i
      );
    })(D),
    Q = (function (e) {
      a(i, e);
      var n = f(i);
      function i(e) {
        var r,
          o =
            arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
          c = o.location,
          a = void 0 === c ? L.location : c,
          s = o.threshold,
          u = void 0 === s ? L.threshold : s,
          h = o.distance,
          f = void 0 === h ? L.distance : h,
          l = o.includeMatches,
          d = void 0 === l ? L.includeMatches : l,
          v = o.findAllMatches,
          g = void 0 === v ? L.findAllMatches : v,
          y = o.minMatchCharLength,
          p = void 0 === y ? L.minMatchCharLength : y,
          m = o.isCaseSensitive,
          k = void 0 === m ? L.isCaseSensitive : m;
        return (
          t(this, i),
          ((r = n.call(this, e))._bitapSearch = new N(e, {
            location: a,
            threshold: u,
            distance: f,
            includeMatches: d,
            findAllMatches: g,
            minMatchCharLength: p,
            isCaseSensitive: k,
          })),
          r
        );
      }
      return (
        r(
          i,
          [
            {
              key: "search",
              value: function (e) {
                return this._bitapSearch.searchIn(e);
              },
            },
          ],
          [
            {
              key: "type",
              get: function () {
                return "fuzzy";
              },
            },
            {
              key: "multiRegex",
              get: function () {
                return /^"(.*)"$/;
              },
            },
            {
              key: "singleRegex",
              get: function () {
                return /^(.*)$/;
              },
            },
          ]
        ),
        i
      );
    })(D),
    U = (function (e) {
      a(i, e);
      var n = f(i);
      function i(e) {
        return t(this, i), n.call(this, e);
      }
      return (
        r(
          i,
          [
            {
              key: "search",
              value: function (e) {
                for (
                  var t, n = 0, r = [], i = this.pattern.length;
                  (t = e.indexOf(this.pattern, n)) > -1;

                )
                  (n = t + i), r.push([t, n - 1]);
                var o = !!r.length;
                return { isMatch: o, score: o ? 1 : 0, indices: r };
              },
            },
          ],
          [
            {
              key: "type",
              get: function () {
                return "include";
              },
            },
            {
              key: "multiRegex",
              get: function () {
                return /^'"(.*)"$/;
              },
            },
            {
              key: "singleRegex",
              get: function () {
                return /^'(.*)$/;
              },
            },
          ]
        ),
        i
      );
    })(D),
    B = [K, U, W, J, V, T, q, Q],
    G = B.length,
    H = / +(?=([^\"]*\"[^\"]*\")*[^\"]*$)/;
  function X(e) {
    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
    return e.split("|").map(function (e) {
      for (
        var n = e
            .trim()
            .split(H)
            .filter(function (e) {
              return e && !!e.trim();
            }),
          r = [],
          i = 0,
          o = n.length;
        i < o;
        i += 1
      ) {
        for (var c = n[i], a = !1, s = -1; !a && ++s < G; ) {
          var u = B[s],
            h = u.isMultiMatch(c);
          h && (r.push(new u(h, t)), (a = !0));
        }
        if (!a)
          for (s = -1; ++s < G; ) {
            var f = B[s],
              l = f.isSingleMatch(c);
            if (l) {
              r.push(new f(l, t));
              break;
            }
          }
      }
      return r;
    });
  }
  var Y = new Set([Q.type, U.type]),
    Z = (function () {
      function e(n) {
        var r =
            arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
          i = r.isCaseSensitive,
          o = void 0 === i ? L.isCaseSensitive : i,
          c = r.includeMatches,
          a = void 0 === c ? L.includeMatches : c,
          s = r.minMatchCharLength,
          u = void 0 === s ? L.minMatchCharLength : s,
          h = r.findAllMatches,
          f = void 0 === h ? L.findAllMatches : h,
          l = r.location,
          d = void 0 === l ? L.location : l,
          v = r.threshold,
          g = void 0 === v ? L.threshold : v,
          y = r.distance,
          p = void 0 === y ? L.distance : y;
        t(this, e),
          (this.query = null),
          (this.options = {
            isCaseSensitive: o,
            includeMatches: a,
            minMatchCharLength: u,
            findAllMatches: f,
            location: d,
            threshold: g,
            distance: p,
          }),
          (this.pattern = o ? n : n.toLowerCase()),
          (this.query = X(this.pattern, this.options));
      }
      return (
        r(
          e,
          [
            {
              key: "searchIn",
              value: function (e) {
                var t = this.query;
                if (!t) return { isMatch: !1, score: 1 };
                var n = this.options,
                  r = n.includeMatches;
                e = n.isCaseSensitive ? e : e.toLowerCase();
                for (
                  var i = 0, o = [], c = 0, a = 0, s = t.length;
                  a < s;
                  a += 1
                ) {
                  var u = t[a];
                  (o.length = 0), (i = 0);
                  for (var h = 0, f = u.length; h < f; h += 1) {
                    var d = u[h],
                      v = d.search(e),
                      g = v.isMatch,
                      y = v.indices,
                      p = v.score;
                    if (!g) {
                      (c = 0), (i = 0), (o.length = 0);
                      break;
                    }
                    if (((i += 1), (c += p), r)) {
                      var m = d.constructor.type;
                      Y.has(m) ? (o = [].concat(l(o), l(y))) : o.push(y);
                    }
                  }
                  if (i) {
                    var k = { isMatch: !0, score: c / i };
                    return r && (k.indices = o), k;
                  }
                }
                return { isMatch: !1, score: 1 };
              },
            },
          ],
          [
            {
              key: "condition",
              value: function (e, t) {
                return t.useExtendedSearch;
              },
            },
          ]
        ),
        e
      );
    })(),
    ee = [];
  function te(e, t) {
    for (var n = 0, r = ee.length; n < r; n += 1) {
      var i = ee[n];
      if (i.condition(e, t)) return new i(e, t);
    }
    return new N(e, t);
  }
  var ne = "$and",
    re = "$or",
    ie = "$path",
    oe = "$val",
    ce = function (e) {
      return !(!e[ne] && !e[re]);
    },
    ae = function (e) {
      return !!e[ie];
    },
    se = function (t) {
      return !v(t) && "object" === e(t) && !ce(t);
    },
    ue = function (e) {
      return i(
        {},
        ne,
        Object.keys(e).map(function (t) {
          return i({}, t, e[t]);
        })
      );
    };
  function he(e, t) {
    var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
      r = n.auto,
      i = void 0 === r || r,
      o = function e(n) {
        var r = Object.keys(n),
          o = ae(n);
        if (!o && r.length > 1 && !ce(n)) return e(ue(n));
        if (se(n)) {
          var c = o ? n[ie] : r[0],
            a = o ? n[oe] : n[c];
          if (!g(a)) throw new Error(k(c));
          var s = { keyId: w(c), pattern: a };
          return i && (s.searcher = te(a, t)), s;
        }
        var u = { children: [], operator: r[0] };
        return (
          r.forEach(function (t) {
            var r = n[t];
            v(r) &&
              r.forEach(function (t) {
                u.children.push(e(t));
              });
          }),
          u
        );
      };
    return ce(e) || (e = ue(e)), o(e);
  }
  var fe = (function () {
    function e(n) {
      var r =
          arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
        i = arguments.length > 2 ? arguments[2] : void 0;
      t(this, e),
        (this.options = c({}, L, {}, r)),
        this.options.useExtendedSearch,
        (this._keyStore = new b(this.options.keys)),
        this.setCollection(n, i);
    }
    return (
      r(e, [
        {
          key: "setCollection",
          value: function (e, t) {
            if (((this._docs = e), t && !(t instanceof I)))
              throw new Error("Incorrect 'index' type");
            this._myIndex =
              t ||
              C(this.options.keys, this._docs, { getFn: this.options.getFn });
          },
        },
        {
          key: "add",
          value: function (e) {
            p(e) && (this._docs.push(e), this._myIndex.add(e));
          },
        },
        {
          key: "remove",
          value: function () {
            for (
              var e =
                  arguments.length > 0 && void 0 !== arguments[0]
                    ? arguments[0]
                    : function () {
                        return !1;
                      },
                t = [],
                n = 0,
                r = this._docs.length;
              n < r;
              n += 1
            ) {
              var i = this._docs[n];
              e(i, n) && (this.removeAt(n), (n -= 1), t.push(i));
            }
            return t;
          },
        },
        {
          key: "removeAt",
          value: function (e) {
            this._docs.splice(e, 1), this._myIndex.removeAt(e);
          },
        },
        {
          key: "getIndex",
          value: function () {
            return this._myIndex;
          },
        },
        {
          key: "search",
          value: function (e) {
            var t =
                arguments.length > 1 && void 0 !== arguments[1]
                  ? arguments[1]
                  : {},
              n = t.limit,
              r = void 0 === n ? -1 : n,
              i = this.options,
              o = i.includeMatches,
              c = i.includeScore,
              a = i.shouldSort,
              s = i.sortFn,
              u = i.ignoreFieldNorm,
              h = g(e)
                ? g(this._docs[0])
                  ? this._searchStringList(e)
                  : this._searchObjectList(e)
                : this._searchLogical(e);
            return (
              le(h, { ignoreFieldNorm: u }),
              a && h.sort(s),
              y(r) && r > -1 && (h = h.slice(0, r)),
              de(h, this._docs, { includeMatches: o, includeScore: c })
            );
          },
        },
        {
          key: "_searchStringList",
          value: function (e) {
            var t = te(e, this.options),
              n = this._myIndex.records,
              r = [];
            return (
              n.forEach(function (e) {
                var n = e.v,
                  i = e.i,
                  o = e.n;
                if (p(n)) {
                  var c = t.searchIn(n),
                    a = c.isMatch,
                    s = c.score,
                    u = c.indices;
                  a &&
                    r.push({
                      item: n,
                      idx: i,
                      matches: [{ score: s, value: n, norm: o, indices: u }],
                    });
                }
              }),
              r
            );
          },
        },
        {
          key: "_searchLogical",
          value: function (e) {
            var t = this,
              n = he(e, this.options),
              r = function e(n, r, i) {
                if (!n.children) {
                  var o = n.keyId,
                    c = n.searcher,
                    a = t._findMatches({
                      key: t._keyStore.get(o),
                      value: t._myIndex.getValueForItemAtKeyId(r, o),
                      searcher: c,
                    });
                  return a && a.length ? [{ idx: i, item: r, matches: a }] : [];
                }
                switch (n.operator) {
                  case ne:
                    for (
                      var s = [], u = 0, h = n.children.length;
                      u < h;
                      u += 1
                    ) {
                      var f = e(n.children[u], r, i);
                      if (!f.length) return [];
                      s.push.apply(s, l(f));
                    }
                    return s;
                  case re:
                    for (
                      var d = [], v = 0, g = n.children.length;
                      v < g;
                      v += 1
                    ) {
                      var y = e(n.children[v], r, i);
                      if (y.length) {
                        d.push.apply(d, l(y));
                        break;
                      }
                    }
                    return d;
                }
              },
              i = this._myIndex.records,
              o = {},
              c = [];
            return (
              i.forEach(function (e) {
                var t = e.$,
                  i = e.i;
                if (p(t)) {
                  var a = r(n, t, i);
                  a.length &&
                    (o[i] ||
                      ((o[i] = { idx: i, item: t, matches: [] }), c.push(o[i])),
                    a.forEach(function (e) {
                      var t,
                        n = e.matches;
                      (t = o[i].matches).push.apply(t, l(n));
                    }));
                }
              }),
              c
            );
          },
        },
        {
          key: "_searchObjectList",
          value: function (e) {
            var t = this,
              n = te(e, this.options),
              r = this._myIndex,
              i = r.keys,
              o = r.records,
              c = [];
            return (
              o.forEach(function (e) {
                var r = e.$,
                  o = e.i;
                if (p(r)) {
                  var a = [];
                  i.forEach(function (e, i) {
                    a.push.apply(
                      a,
                      l(t._findMatches({ key: e, value: r[i], searcher: n }))
                    );
                  }),
                    a.length && c.push({ idx: o, item: r, matches: a });
                }
              }),
              c
            );
          },
        },
        {
          key: "_findMatches",
          value: function (e) {
            var t = e.key,
              n = e.value,
              r = e.searcher;
            if (!p(n)) return [];
            var i = [];
            if (v(n))
              n.forEach(function (e) {
                var n = e.v,
                  o = e.i,
                  c = e.n;
                if (p(n)) {
                  var a = r.searchIn(n),
                    s = a.isMatch,
                    u = a.score,
                    h = a.indices;
                  s &&
                    i.push({
                      score: u,
                      key: t,
                      value: n,
                      idx: o,
                      norm: c,
                      indices: h,
                    });
                }
              });
            else {
              var o = n.v,
                c = n.n,
                a = r.searchIn(o),
                s = a.isMatch,
                u = a.score,
                h = a.indices;
              s && i.push({ score: u, key: t, value: o, norm: c, indices: h });
            }
            return i;
          },
        },
      ]),
      e
    );
  })();
  function le(e, t) {
    var n = t.ignoreFieldNorm,
      r = void 0 === n ? L.ignoreFieldNorm : n;
    e.forEach(function (e) {
      var t = 1;
      e.matches.forEach(function (e) {
        var n = e.key,
          i = e.norm,
          o = e.score,
          c = n ? n.weight : null;
        t *= Math.pow(
          0 === o && c ? Number.EPSILON : o,
          (c || 1) * (r ? 1 : i)
        );
      }),
        (e.score = t);
    });
  }
  function de(e, t) {
    var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
      r = n.includeMatches,
      i = void 0 === r ? L.includeMatches : r,
      o = n.includeScore,
      c = void 0 === o ? L.includeScore : o,
      a = [];
    return (
      i && a.push(j),
      c && a.push(E),
      e.map(function (e) {
        var n = e.idx,
          r = { item: t[n], refIndex: n };
        return (
          a.length &&
            a.forEach(function (t) {
              t(e, r);
            }),
          r
        );
      })
    );
  }
  return (
    (fe.version = "6.4.0"),
    (fe.createIndex = C),
    (fe.parseIndex = function (e) {
      var t =
          arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
        n = t.getFn,
        r = void 0 === n ? L.getFn : n,
        i = e.keys,
        o = e.records,
        c = new I({ getFn: r });
      return c.setKeys(i), c.setIndexRecords(o), c;
    }),
    (fe.config = L),
    (fe.parseQuery = he),
    (function () {
      ee.push.apply(ee, arguments);
    })(Z),
    fe
  );
});
