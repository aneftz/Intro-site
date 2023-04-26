"use strict";

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

!function (e, t) {
  "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) && "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) ? exports._vantaEffect = t() : e._vantaEffect = t();
}("undefined" != typeof self ? self : void 0, function () {
  return function () {
    "use strict";

    var e = {
      d: function d(t, i) {
        for (var n in i) {
          e.o(i, n) && !e.o(t, n) && Object.defineProperty(t, n, {
            enumerable: !0,
            get: i[n]
          });
        }
      },
      o: function o(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
      },
      r: function r(e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
          value: "Module"
        }), Object.defineProperty(e, "__esModule", {
          value: !0
        });
      }
    },
        t = {};

    function i() {
      return "undefined" != typeof navigator ? /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 600 : null;
    }

    e.r(t), e.d(t, {
      "default": function _default() {
        return P;
      }
    }), Number.prototype.clamp = function (e, t) {
      return Math.min(Math.max(this, e), t);
    };

    function n(e) {
      for (; e.children && e.children.length > 0;) {
        n(e.children[0]), e.remove(e.children[0]);
      }

      e.geometry && e.geometry.dispose(), e.material && (Object.keys(e.material).forEach(function (t) {
        e.material[t] && null !== e.material[t] && "function" == typeof e.material[t].dispose && e.material[t].dispose();
      }), e.material.dispose());
    }

    var o = "object" == (typeof window === "undefined" ? "undefined" : _typeof(window));
    var s = o && window.THREE || {};
    o && !window.VANTA && (window.VANTA = {});
    var r = o && window.VANTA || {};
    r.register = function (e, t) {
      return r[e] = function (e) {
        return new t(e);
      };
    }, r.version = "0.5.24";

    var a = function a() {
      return Array.prototype.unshift.call(arguments, "[VANTA]"), console.error.apply(this, arguments);
    };

    r.VantaBase =
    /*#__PURE__*/
    function () {
      function _class() {
        var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, _class);

        if (!o) return !1;
        r.current = this, this.windowMouseMoveWrapper = this.windowMouseMoveWrapper.bind(this), this.windowTouchWrapper = this.windowTouchWrapper.bind(this), this.windowGyroWrapper = this.windowGyroWrapper.bind(this), this.resize = this.resize.bind(this), this.animationLoop = this.animationLoop.bind(this), this.restart = this.restart.bind(this);
        var t = "function" == typeof this.getDefaultOptions ? this.getDefaultOptions() : this.defaultOptions;
        if (this.options = Object.assign({
          mouseControls: !0,
          touchControls: !0,
          gyroControls: !1,
          minHeight: 200,
          minWidth: 200,
          scale: 1,
          scaleMobile: 1
        }, t), (e instanceof HTMLElement || "string" == typeof e) && (e = {
          el: e
        }), Object.assign(this.options, e), this.options.THREE && (s = this.options.THREE), this.el = this.options.el, null == this.el) a('Instance needs "el" param!');else if (!(this.options.el instanceof HTMLElement)) {
          var _e = this.el;
          if (this.el = (i = _e, document.querySelector(i)), !this.el) return void a("Cannot find element", _e);
        }
        var i, n;
        this.prepareEl(), this.initThree(), this.setSize();

        try {
          this.init();
        } catch (e) {
          return a("Init error", e), this.renderer && this.renderer.domElement && this.el.removeChild(this.renderer.domElement), void (this.options.backgroundColor && (console.log("[VANTA] Falling back to backgroundColor"), this.el.style.background = (n = this.options.backgroundColor, "number" == typeof n ? "#" + ("00000" + n.toString(16)).slice(-6) : n)));
        }

        this.initMouse(), this.resize(), this.animationLoop();
        var l = window.addEventListener;
        l("resize", this.resize), window.requestAnimationFrame(this.resize), this.options.mouseControls && (l("scroll", this.windowMouseMoveWrapper), l("mousemove", this.windowMouseMoveWrapper)), this.options.touchControls && (l("touchstart", this.windowTouchWrapper), l("touchmove", this.windowTouchWrapper)), this.options.gyroControls && l("deviceorientation", this.windowGyroWrapper);
      }

      _createClass(_class, [{
        key: "setOptions",
        value: function setOptions() {
          var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
          Object.assign(this.options, e), this.triggerMouseMove();
        }
      }, {
        key: "prepareEl",
        value: function prepareEl() {
          var e, t;
          if ("undefined" != typeof Node && Node.TEXT_NODE) for (e = 0; e < this.el.childNodes.length; e++) {
            var _t = this.el.childNodes[e];

            if (_t.nodeType === Node.TEXT_NODE) {
              var _e2 = document.createElement("span");

              _e2.textContent = _t.textContent, _t.parentElement.insertBefore(_e2, _t), _t.remove();
            }
          }

          for (e = 0; e < this.el.children.length; e++) {
            t = this.el.children[e], "static" === getComputedStyle(t).position && (t.style.position = "relative"), "auto" === getComputedStyle(t).zIndex && (t.style.zIndex = 1);
          }

          "static" === getComputedStyle(this.el).position && (this.el.style.position = "relative");
        }
      }, {
        key: "applyCanvasStyles",
        value: function applyCanvasStyles(e) {
          var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
          Object.assign(e.style, {
            position: "absolute",
            zIndex: 0,
            top: 0,
            left: 0,
            background: ""
          }), Object.assign(e.style, t), e.classList.add("vanta-canvas");
        }
      }, {
        key: "initThree",
        value: function initThree() {
          s.WebGLRenderer ? (this.renderer = new s.WebGLRenderer({
            alpha: !0,
            antialias: !0
          }), this.el.appendChild(this.renderer.domElement), this.applyCanvasStyles(this.renderer.domElement), isNaN(this.options.backgroundAlpha) && (this.options.backgroundAlpha = 1), this.scene = new s.Scene()) : console.warn("[VANTA] No THREE defined on window");
        }
      }, {
        key: "getCanvasElement",
        value: function getCanvasElement() {
          return this.renderer ? this.renderer.domElement : this.p5renderer ? this.p5renderer.canvas : void 0;
        }
      }, {
        key: "getCanvasRect",
        value: function getCanvasRect() {
          var e = this.getCanvasElement();
          return !!e && e.getBoundingClientRect();
        }
      }, {
        key: "windowMouseMoveWrapper",
        value: function windowMouseMoveWrapper(e) {
          var t = this.getCanvasRect();
          if (!t) return !1;
          var i = e.clientX - t.left,
              n = e.clientY - t.top;
          i >= 0 && n >= 0 && i <= t.width && n <= t.height && (this.mouseX = i, this.mouseY = n, this.options.mouseEase || this.triggerMouseMove(i, n));
        }
      }, {
        key: "windowTouchWrapper",
        value: function windowTouchWrapper(e) {
          var t = this.getCanvasRect();
          if (!t) return !1;

          if (1 === e.touches.length) {
            var _i = e.touches[0].clientX - t.left,
                _n = e.touches[0].clientY - t.top;

            _i >= 0 && _n >= 0 && _i <= t.width && _n <= t.height && (this.mouseX = _i, this.mouseY = _n, this.options.mouseEase || this.triggerMouseMove(_i, _n));
          }
        }
      }, {
        key: "windowGyroWrapper",
        value: function windowGyroWrapper(e) {
          var t = this.getCanvasRect();
          if (!t) return !1;
          var i = Math.round(2 * e.alpha) - t.left,
              n = Math.round(2 * e.beta) - t.top;
          i >= 0 && n >= 0 && i <= t.width && n <= t.height && (this.mouseX = i, this.mouseY = n, this.options.mouseEase || this.triggerMouseMove(i, n));
        }
      }, {
        key: "triggerMouseMove",
        value: function triggerMouseMove(e, t) {
          void 0 === e && void 0 === t && (this.options.mouseEase ? (e = this.mouseEaseX, t = this.mouseEaseY) : (e = this.mouseX, t = this.mouseY)), this.uniforms && (this.uniforms.iMouse.value.x = e / this.scale, this.uniforms.iMouse.value.y = t / this.scale);
          var i = e / this.width,
              n = t / this.height;
          "function" == typeof this.onMouseMove && this.onMouseMove(i, n);
        }
      }, {
        key: "setSize",
        value: function setSize() {
          this.scale || (this.scale = 1), i() && this.options.scaleMobile ? this.scale = this.options.scaleMobile : this.options.scale && (this.scale = this.options.scale), this.width = Math.max(this.el.offsetWidth, this.options.minWidth), this.height = Math.max(this.el.offsetHeight, this.options.minHeight);
        }
      }, {
        key: "initMouse",
        value: function initMouse() {
          (!this.mouseX && !this.mouseY || this.mouseX === this.options.minWidth / 2 && this.mouseY === this.options.minHeight / 2) && (this.mouseX = this.width / 2, this.mouseY = this.height / 2, this.triggerMouseMove(this.mouseX, this.mouseY));
        }
      }, {
        key: "resize",
        value: function resize() {
          this.setSize(), this.camera && (this.camera.aspect = this.width / this.height, "function" == typeof this.camera.updateProjectionMatrix && this.camera.updateProjectionMatrix()), this.renderer && (this.renderer.setSize(this.width, this.height), this.renderer.setPixelRatio(window.devicePixelRatio / this.scale)), "function" == typeof this.onResize && this.onResize();
        }
      }, {
        key: "isOnScreen",
        value: function isOnScreen() {
          var e = this.el.offsetHeight,
              t = this.el.getBoundingClientRect(),
              i = window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop,
              n = t.top + i;
          return n - window.innerHeight <= i && i <= n + e;
        }
      }, {
        key: "animationLoop",
        value: function animationLoop() {
          this.t || (this.t = 0), this.t2 || (this.t2 = 0);
          var e = performance.now();

          if (this.prevNow) {
            var _t2 = (e - this.prevNow) / (1e3 / 60);

            _t2 = Math.max(.2, Math.min(_t2, 5)), this.t += _t2, this.t2 += (this.options.speed || 1) * _t2, this.uniforms && (this.uniforms.iTime.value = .016667 * this.t2);
          }

          return this.prevNow = e, this.options.mouseEase && (this.mouseEaseX = this.mouseEaseX || this.mouseX || 0, this.mouseEaseY = this.mouseEaseY || this.mouseY || 0, Math.abs(this.mouseEaseX - this.mouseX) + Math.abs(this.mouseEaseY - this.mouseY) > .1 && (this.mouseEaseX += .05 * (this.mouseX - this.mouseEaseX), this.mouseEaseY += .05 * (this.mouseY - this.mouseEaseY), this.triggerMouseMove(this.mouseEaseX, this.mouseEaseY))), (this.isOnScreen() || this.options.forceAnimate) && ("function" == typeof this.onUpdate && this.onUpdate(), this.scene && this.camera && (this.renderer.render(this.scene, this.camera), this.renderer.setClearColor(this.options.backgroundColor, this.options.backgroundAlpha)), this.fps && this.fps.update && this.fps.update(), "function" == typeof this.afterRender && this.afterRender()), this.req = window.requestAnimationFrame(this.animationLoop);
        }
      }, {
        key: "restart",
        value: function restart() {
          if (this.scene) for (; this.scene.children.length;) {
            this.scene.remove(this.scene.children[0]);
          }
          "function" == typeof this.onRestart && this.onRestart(), this.init();
        }
      }, {
        key: "init",
        value: function init() {
          "function" == typeof this.onInit && this.onInit();
        }
      }, {
        key: "destroy",
        value: function destroy() {
          "function" == typeof this.onDestroy && this.onDestroy();
          var e = window.removeEventListener;
          e("touchstart", this.windowTouchWrapper), e("touchmove", this.windowTouchWrapper), e("scroll", this.windowMouseMoveWrapper), e("mousemove", this.windowMouseMoveWrapper), e("deviceorientation", this.windowGyroWrapper), e("resize", this.resize), window.cancelAnimationFrame(this.req);
          var t = this.scene;
          t && t.children && n(t), this.renderer && (this.renderer.domElement && this.el.removeChild(this.renderer.domElement), this.renderer = null, this.scene = null), r.current === this && (r.current = null);
        }
      }]);

      return _class;
    }();

    var l = r.VantaBase;

    var h = "object" == (typeof window === "undefined" ? "undefined" : _typeof(window)) && window.THREE,
        _ref = h || {},
        c = _ref.Camera,
        d = _ref.ClampToEdgeWrapping,
        u = _ref.DataTexture,
        p = _ref.FloatType,
        m = _ref.Mesh,
        f = _ref.NearestFilter,
        v = _ref.PlaneBufferGeometry,
        y = _ref.RGBAFormat,
        g = _ref.Scene,
        w = _ref.ShaderMaterial,
        b = _ref.WebGLRenderTarget;

    var x = function x(e, t, i, n) {
      var _n2;

      n && (_n2 = n, c = _n2.Camera, d = _n2.ClampToEdgeWrapping, u = _n2.DataTexture, p = _n2.FloatType, m = _n2.Mesh, f = _n2.NearestFilter, v = _n2.PlaneBufferGeometry, y = _n2.RGBAFormat, g = _n2.Scene, w = _n2.ShaderMaterial, b = _n2.WebGLRenderTarget, _n2), this.variables = [], this.currentTextureIndex = 0;
      var o = p,
          s = new g(),
          r = new c();
      r.position.z = 1;
      var a = {
        passThruTexture: {
          value: null
        }
      },
          l = T("uniform sampler2D passThruTexture;\n\nvoid main() {\n\n\tvec2 uv = gl_FragCoord.xy / resolution.xy;\n\n\tgl_FragColor = texture2D( passThruTexture, uv );\n\n}\n", a),
          h = new m(new v(2, 2), l);

      function x(i) {
        i.defines.resolution = "vec2( " + e.toFixed(1) + ", " + t.toFixed(1) + " )";
      }

      function T(e, t) {
        var i = new w({
          uniforms: t = t || {},
          vertexShader: "void main()\t{\n\n\tgl_Position = vec4( position, 1.0 );\n\n}\n",
          fragmentShader: e
        });
        return x(i), i;
      }

      s.add(h), this.setDataType = function (e) {
        return o = e, this;
      }, this.addVariable = function (e, t, i) {
        var n = {
          name: e,
          initialValueTexture: i,
          material: this.createShaderMaterial(t),
          dependencies: null,
          renderTargets: [],
          wrapS: null,
          wrapT: null,
          minFilter: f,
          magFilter: f
        };
        return this.variables.push(n), n;
      }, this.setVariableDependencies = function (e, t) {
        e.dependencies = t;
      }, this.init = function () {
        if (!i.capabilities.isWebGL2 && !i.extensions.get("OES_texture_float")) return "No OES_texture_float support for float textures.";
        if (0 === i.capabilities.maxVertexTextures) return "No support for vertex shader textures.";

        for (var n = 0; n < this.variables.length; n++) {
          var o = this.variables[n];
          o.renderTargets[0] = this.createRenderTarget(e, t, o.wrapS, o.wrapT, o.minFilter, o.magFilter), o.renderTargets[1] = this.createRenderTarget(e, t, o.wrapS, o.wrapT, o.minFilter, o.magFilter), this.renderTexture(o.initialValueTexture, o.renderTargets[0]), this.renderTexture(o.initialValueTexture, o.renderTargets[1]);
          var s = o.material,
              r = s.uniforms;
          if (null !== o.dependencies) for (var a = 0; a < o.dependencies.length; a++) {
            var l = o.dependencies[a];

            if (l.name !== o.name) {
              for (var h = !1, c = 0; c < this.variables.length; c++) {
                if (l.name === this.variables[c].name) {
                  h = !0;
                  break;
                }
              }

              if (!h) return "Variable dependency not found. Variable=" + o.name + ", dependency=" + l.name;
            }

            r[l.name] = {
              value: null
            }, s.fragmentShader = "\nuniform sampler2D " + l.name + ";\n" + s.fragmentShader;
          }
        }

        return this.currentTextureIndex = 0, null;
      }, this.compute = function () {
        for (var e = this.currentTextureIndex, t = 0 === this.currentTextureIndex ? 1 : 0, i = 0, n = this.variables.length; i < n; i++) {
          var o = this.variables[i];
          if (null !== o.dependencies) for (var s = o.material.uniforms, r = 0, a = o.dependencies.length; r < a; r++) {
            var l = o.dependencies[r];
            s[l.name].value = l.renderTargets[e].texture;
          }
          this.doRenderTarget(o.material, o.renderTargets[t]);
        }

        this.currentTextureIndex = t;
      }, this.getCurrentRenderTarget = function (e) {
        return e.renderTargets[this.currentTextureIndex];
      }, this.getAlternateRenderTarget = function (e) {
        return e.renderTargets[0 === this.currentTextureIndex ? 1 : 0];
      }, this.addResolutionDefine = x, this.createShaderMaterial = T, this.createRenderTarget = function (i, n, s, r, a, l) {
        return new b(i = i || e, n = n || t, {
          wrapS: s = s || d,
          wrapT: r = r || d,
          minFilter: a = a || f,
          magFilter: l = l || f,
          format: y,
          type: o,
          stencilBuffer: !1,
          depthBuffer: !1
        });
      }, this.createTexture = function () {
        var i = new Float32Array(e * t * 4);
        return new u(i, e, t, y, p);
      }, this.renderTexture = function (e, t) {
        a.passThruTexture.value = e, this.doRenderTarget(l, t), a.passThruTexture.value = null;
      }, this.doRenderTarget = function (e, t) {
        var n = i.getRenderTarget();
        h.material = e, i.setRenderTarget(t), i.render(s, r), h.material = l, i.setRenderTarget(n);
      };
    };

    var T = "object" == (typeof window === "undefined" ? "undefined" : _typeof(window)) && window.THREE;
    var M = !i();
    var z = 32,
        S = z * z;

    var C = 800,
        V = function V() {
      var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var t = new T.BufferGeometry(),
          i = [];

      function n(t, n, o) {
        var s = 1.5 * (e.birdSize || 1);
        i.push(new T.Vector3(t * s, n * s, o * s));
      }

      n(5, 0, 0), n(-5, -1, 1), n(-5, 0, 0), n(-5, -2, -1), n(0, 2, -6), n(0, 2, 6), n(2, 0, 0), n(-3, 0, 0), t.setFromPoints(i);
      var o = [];
      return o.push(0, 2, 1), o.push(4, 7, 6), o.push(5, 6, 7), t.setIndex(o), t;
    };

    var R = function R(e) {
      _classCallCheck(this, R);

      var t,
          i,
          n = new T.Vector3(),
          o = 500,
          s = 500,
          r = 200,
          a = .1,
          l = e;
      this.position = new T.Vector3(), this.velocity = new T.Vector3(), t = new T.Vector3(), this.setGoal = function (e) {
        i = e;
      }, this.setWorldSize = function (e, t, i) {
        o = e, s = t, r = i;
      }, this.run = function (e) {
        n.set(-o, this.position.y, this.position.z), (n = this.avoid(n)).multiplyScalar(5), t.add(n), n.set(o, this.position.y, this.position.z), (n = this.avoid(n)).multiplyScalar(5), t.add(n), n.set(this.position.x, -s, this.position.z), (n = this.avoid(n)).multiplyScalar(5), t.add(n), n.set(this.position.x, s, this.position.z), (n = this.avoid(n)).multiplyScalar(5), t.add(n), n.set(this.position.x, this.position.y, -r), (n = this.avoid(n)).multiplyScalar(5), t.add(n), n.set(this.position.x, this.position.y, r), (n = this.avoid(n)).multiplyScalar(5), t.add(n), Math.random() > .5 && this.flock(e), this.move();
      }, this.flock = function (e) {
        i && t.add(this.reach(i, .005)), t.add(this.alignment(e)), t.add(this.cohesion(e)), t.add(this.separation(e));
      }, this.move = function () {
        this.velocity.add(t);
        var e = this.velocity.length();
        e > 2.5 && this.velocity.divideScalar(e / 2.5), this.position.add(this.velocity), t.set(0, 0, 0);
      }, this.checkBounds = function () {
        this.position.x > o && (this.position.x = -o), this.position.x < -o && (this.position.x = o), this.position.y > s && (this.position.y = -s), this.position.y < -s && (this.position.y = s), this.position.z > r && (this.position.z = -r), this.position.z < -r && (this.position.z = r);
      }, this.avoid = function (e) {
        var t = new T.Vector3();
        return t.copy(this.position), t.sub(e), t.multiplyScalar(1 / this.position.distanceToSquared(e)), t;
      }, this.repulse = function (e) {
        var i = this.position.distanceTo(e);

        if (i < 150) {
          var n = new T.Vector3();
          n.subVectors(this.position, e), n.multiplyScalar(.5 / i), t.add(n);
        }
      }, this.reach = function (e, t) {
        var i = new T.Vector3();
        return i.subVectors(e, this.position), i.multiplyScalar(t), i;
      }, this.alignment = function (e) {
        var t,
            i,
            n = new T.Vector3(),
            o = 0;
        var s = 100 * l.alignment / 20;

        for (var r = 0, h = e.length; r < h; r++) {
          Math.random() > .6 || (i = (t = e[r]).position.distanceTo(this.position)) > 0 && i <= s && (n.add(t.velocity), o++);
        }

        if (o > 0) {
          n.divideScalar(o);
          var c = n.length();
          c > a && n.divideScalar(c / a);
        }

        return n;
      }, this.cohesion = function (e) {
        var t,
            i,
            n = new T.Vector3(),
            o = new T.Vector3(),
            s = 0;
        var r = 100 * l.cohesion / 20;

        for (var h = 0, c = e.length; h < c; h++) {
          Math.random() > .6 || (i = (t = e[h]).position.distanceTo(this.position)) > 0 && i <= r && (n.add(t.position), s++);
        }

        s > 0 && n.divideScalar(s), o.subVectors(n, this.position);
        var d = o.length();
        return d > a && o.divideScalar(d / a), o;
      }, this.separation = function (e) {
        var t,
            i,
            n = new T.Vector3(),
            o = new T.Vector3();
        var s = 100 * l.separation / 20;

        for (var r = 0, a = e.length; r < a; r++) {
          Math.random() > .6 || (i = (t = e[r]).position.distanceTo(this.position)) > 0 && i <= s && (o.subVectors(this.position, t.position), o.normalize(), o.divideScalar(i), n.add(o));
        }

        return n;
      };
    };

    var E =
    /*#__PURE__*/
    function (_l) {
      _inherits(E, _l);

      _createClass(E, null, [{
        key: "initClass",
        value: function initClass() {
          this.prototype.defaultOptions = {
            backgroundColor: 465199,
            color1: 16711680,
            color2: 53759,
            colorMode: "varianceGradient",
            birdSize: 1,
            wingSpan: 30,
            speedLimit: 5,
            separation: 20,
            alignment: 20,
            cohesion: 20,
            quantity: 5
          };
        }
      }]);

      function E(e) {
        var _this;

        _classCallCheck(this, E);

        T = e.THREE || T, _this = _possibleConstructorReturn(this, _getPrototypeOf(E).call(this, e));
        return _this;
      }

      _createClass(E, [{
        key: "initComputeRenderer",
        value: function initComputeRenderer() {
          this.gpuCompute = new x(z, z, this.renderer, T);
          var e = this.gpuCompute.createTexture(),
              t = this.gpuCompute.createTexture();
          !function (e) {
            var t = e.image.data;
            var i = 0;
            var n = t.length;

            (function () {
              var e = [];

              for (; i < n;) {
                var _n3 = Math.random() * C - 400,
                    _o = Math.random() * C - 400,
                    _s = Math.random() * C - 400;

                t[i + 0] = _n3, t[i + 1] = _o, t[i + 2] = _s, t[i + 3] = 1, e.push(i += 4);
              }
            })();
          }(e), function (e) {
            var t = e.image.data;
            var i = 0;
            var n = t.length;

            (function () {
              var e = [];

              for (; i < n;) {
                var _n4 = Math.random() - .5,
                    _o2 = Math.random() - .5,
                    _s2 = Math.random() - .5;

                t[i + 0] = 10 * _n4, t[i + 1] = 10 * _o2, t[i + 2] = 10 * _s2, t[i + 3] = 1, e.push(i += 4);
              }
            })();
          }(t), this.velocityVariable = this.gpuCompute.addVariable("textureVelocity", "uniform float time;\nuniform float testing;\nuniform float delta; // about 0.016\nuniform float separationDistance; // 20\nuniform float alignmentDistance; // 40\nuniform float cohesionDistance;\nuniform float speedLimit;\nuniform float freedomFactor;\nuniform vec3 predator;\n\nconst float width = resolution.x;\nconst float height = resolution.y;\n\nconst float PI = 3.141592653589793;\nconst float PI_2 = PI * 2.0;\n// const float VISION = PI * 0.55;\n\nfloat zoneRadius = 40.0;\nfloat zoneRadiusSquared = 1600.0;\n\nfloat separationThresh = 0.45;\nfloat alignmentThresh = 0.65;\n\nconst float UPPER_BOUNDS = BOUNDS;\nconst float LOWER_BOUNDS = -UPPER_BOUNDS;\n\nfloat rand(vec2 co){\n  return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);\n}\n\nvoid main() {\n\n  zoneRadius = separationDistance + alignmentDistance + cohesionDistance;\n  separationThresh = separationDistance / zoneRadius;\n  alignmentThresh = ( separationDistance + alignmentDistance ) / zoneRadius;\n  zoneRadiusSquared = zoneRadius * zoneRadius;\n\n\n  vec2 uv = gl_FragCoord.xy / resolution.xy;\n  vec3 birdPosition, birdVelocity;\n\n  vec3 selfPosition = texture2D( texturePosition, uv ).xyz;\n  vec3 selfVelocity = texture2D( textureVelocity, uv ).xyz;\n\n  float dist;\n  vec3 dir; // direction\n  float distSquared;\n\n  float separationSquared = separationDistance * separationDistance;\n  float cohesionSquared = cohesionDistance * cohesionDistance;\n\n  float f;\n  float percent;\n\n  vec3 velocity = selfVelocity;\n\n  float limit = speedLimit;\n\n  dir = predator * UPPER_BOUNDS - selfPosition;\n  dir.z = 0.;\n  // dir.z *= 0.6;\n  dist = length( dir );\n  distSquared = dist * dist;\n\n  float preyRadius = 150.0;\n  float preyRadiusSq = preyRadius * preyRadius;\n\n  // move birds away from predator\n  if (dist < preyRadius) {\n\n    f = ( distSquared / preyRadiusSq - 1.0 ) * delta * 100.;\n    velocity += normalize( dir ) * f;\n    limit += 5.0;\n  }\n\n  // if (testing == 0.0) {}\n  // if ( rand( uv + time ) < freedomFactor ) {}\n\n  // Attract flocks to the center\n  vec3 central = vec3( 0., 0., 0. );\n  dir = selfPosition - central;\n  dist = length( dir );\n\n  dir.y *= 2.5;\n  velocity -= normalize( dir ) * delta * 5.;\n\n  for (float y=0.0;y<height;y++) {\n    for (float x=0.0;x<width;x++) {\n\n      vec2 ref = vec2( x + 0.5, y + 0.5 ) / resolution.xy;\n      birdPosition = texture2D( texturePosition, ref ).xyz;\n\n      dir = birdPosition - selfPosition;\n      dist = length(dir);\n\n      if (dist < 0.0001) continue;\n\n      distSquared = dist * dist;\n\n      if (distSquared > zoneRadiusSquared ) continue;\n\n      percent = distSquared / zoneRadiusSquared;\n\n      if ( percent < separationThresh ) { // low\n\n        // Separation - Move apart for comfort\n        f = (separationThresh / percent - 1.0) * delta;\n        velocity -= normalize(dir) * f;\n\n      } else if ( percent < alignmentThresh ) { // high\n\n        // Alignment - fly the same direction\n        float threshDelta = alignmentThresh - separationThresh;\n        float adjustedPercent = ( percent - separationThresh ) / threshDelta;\n\n        birdVelocity = texture2D( textureVelocity, ref ).xyz;\n\n        f = ( 0.5 - cos( adjustedPercent * PI_2 ) * 0.5 + 0.5 ) * delta;\n        velocity += normalize(birdVelocity) * f;\n\n      } else {\n\n        // Attraction / Cohesion - move closer\n        float threshDelta = 1.0 - alignmentThresh;\n        float adjustedPercent = ( percent - alignmentThresh ) / threshDelta;\n\n        f = ( 0.5 - ( cos( adjustedPercent * PI_2 ) * -0.5 + 0.5 ) ) * delta;\n\n        velocity += normalize(dir) * f;\n\n      }\n    }\n  }\n\n  // this make tends to fly around than down or up\n  // if (velocity.y > 0.) velocity.y *= (1. - 0.2 * delta);\n\n  // Speed Limits\n  if ( length( velocity ) > limit ) {\n    velocity = normalize( velocity ) * limit;\n  }\n\n  gl_FragColor = vec4( velocity, 1.0 );\n\n}", t), this.positionVariable = this.gpuCompute.addVariable("texturePosition", "uniform float time;\nuniform float delta;\n\nvoid main() {\n\n  vec2 uv = gl_FragCoord.xy / resolution.xy;\n  vec4 tmpPos = texture2D( texturePosition, uv );\n  vec3 position = tmpPos.xyz;\n  vec3 velocity = texture2D( textureVelocity, uv ).xyz;\n\n  float phase = tmpPos.w;\n\n  phase = mod( ( phase + delta +\n    length( velocity.xz ) * delta * 3. +\n    max( velocity.y, 0.0 ) * delta * 6. ), 62.83 );\n\n  gl_FragColor = vec4( position + velocity * delta * 15. , phase );\n\n}", e), this.gpuCompute.setVariableDependencies(this.velocityVariable, [this.positionVariable, this.velocityVariable]), this.gpuCompute.setVariableDependencies(this.positionVariable, [this.positionVariable, this.velocityVariable]), this.positionUniforms = this.positionVariable.material.uniforms, this.velocityUniforms = this.velocityVariable.material.uniforms, this.positionUniforms.time = {
            value: 0
          }, this.positionUniforms.delta = {
            value: 0
          }, this.velocityUniforms.time = {
            value: 1
          }, this.velocityUniforms.delta = {
            value: 0
          }, this.velocityUniforms.testing = {
            value: 1
          }, this.velocityUniforms.separationDistance = {
            value: 1
          }, this.velocityUniforms.alignmentDistance = {
            value: 1
          }, this.velocityUniforms.cohesionDistance = {
            value: 1
          }, this.velocityUniforms.speedLimit = {
            value: 1
          }, this.velocityUniforms.freedomFactor = {
            value: 1
          }, this.velocityUniforms.predator = {
            value: new T.Vector3()
          }, this.velocityVariable.material.defines.BOUNDS = C.toFixed(2), this.velocityVariable.wrapS = T.RepeatWrapping, this.velocityVariable.wrapT = T.RepeatWrapping, this.positionVariable.wrapS = T.RepeatWrapping, this.positionVariable.wrapT = T.RepeatWrapping;
          var i = this.gpuCompute.init();
          null !== i && console.error(i);
        }
      }, {
        key: "initGpgpuBirds",
        value: function initGpgpuBirds() {
          var e = function (e) {
            var t = new T.BufferGeometry();
            e.quantity && (z = Math.pow(2, e.quantity), S = z * z);
            var i = 3 * S,
                n = 3 * i,
                o = new T.BufferAttribute(new Float32Array(3 * n), 3),
                s = new T.BufferAttribute(new Float32Array(3 * n), 3),
                r = new T.BufferAttribute(new Float32Array(2 * n), 2),
                a = new T.BufferAttribute(new Float32Array(n), 1);
            t.setAttribute || (t.setAttribute = t.addAttribute), t.setAttribute("position", o), t.setAttribute("birdColor", s), t.setAttribute("reference", r), t.setAttribute("birdVertex", a);
            var l = 0;

            var h = function h() {
              for (var _e3 = 0; _e3 < arguments.length; _e3++) {
                o.array[l++] = arguments[_e3];
              }
            },
                c = e.wingSpan || 20,
                d = e.birdSize || 1;

            for (var _e4 = 0; _e4 < S; _e4++) {
              h(0, -0, -20 * d, 0, 4 * d, -20 * d, 0, 0, 30 * d), h(0, 0, -15 * d, -c * d, 0, 0, 0, 0, 15 * d), h(0, 0, 15 * d, c * d, 0, 0, 0, 0, -15 * d);
            }

            var u = {};

            for (l = 0; l < 3 * i; l++) {
              var _t3 = ~~(l / 3),
                  _i2 = _t3 % z / z,
                  _n5 = ~~(_t3 / z) / z,
                  _o3 = ~~(l / 9) / S,
                  _h = _o3.toString(),
                  _c = -1 != e.colorMode.indexOf("Gradient");

              var _d = void 0;

              _d = !_c && u[_h] ? u[_h] : e.effect.getNewCol(_o3), _c || u[_h] || (u[_h] = _d), s.array[3 * l + 0] = _d.r, s.array[3 * l + 1] = _d.g, s.array[3 * l + 2] = _d.b, r.array[2 * l] = _i2, r.array[2 * l + 1] = _n5, a.array[l] = l % 9;
            }

            return t.scale(.2, .2, .2);
          }(Object.assign({}, this.options, {
            effect: this
          }));

          this.birdUniforms = {
            color: {
              value: new T.Color(16720384)
            },
            texturePosition: {
              value: null
            },
            textureVelocity: {
              value: null
            },
            time: {
              value: 1
            },
            delta: {
              value: 0
            },
            birdSize: {
              value: this.options.birdSize
            }
          };
          var t = new T.ShaderMaterial({
            uniforms: this.birdUniforms,
            vertexShader: "attribute vec2 reference;\nattribute float birdVertex;\n\nattribute vec3 birdColor;\n\nuniform sampler2D texturePosition;\nuniform sampler2D textureVelocity;\n\nvarying vec4 vColor;\nvarying float z;\n\nuniform float time;\nuniform float birdSize;\n\nvoid main() {\n\n  vec4 tmpPos = texture2D( texturePosition, reference );\n  vec3 pos = tmpPos.xyz;\n  vec3 velocity = normalize(texture2D( textureVelocity, reference ).xyz);\n\n  vec3 newPosition = position;\n\n  if ( birdVertex == 4.0 || birdVertex == 7.0 ) {\n    // flap wings\n    newPosition.y = sin( tmpPos.w ) * 5. * birdSize;\n  }\n\n  newPosition = mat3( modelMatrix ) * newPosition;\n\n  velocity.z *= -1.;\n  float xz = length( velocity.xz );\n  float xyz = 1.;\n  float x = sqrt( 1. - velocity.y * velocity.y );\n\n  float cosry = velocity.x / xz;\n  float sinry = velocity.z / xz;\n\n  float cosrz = x / xyz;\n  float sinrz = velocity.y / xyz;\n\n  mat3 maty =  mat3(\n    cosry, 0, -sinry,\n    0    , 1, 0     ,\n    sinry, 0, cosry\n  );\n\n  mat3 matz =  mat3(\n    cosrz , sinrz, 0,\n    -sinrz, cosrz, 0,\n    0     , 0    , 1\n  );\n  newPosition =  maty * matz * newPosition;\n  newPosition += pos;\n  z = newPosition.z;\n\n  vColor = vec4( birdColor, 1.0 );\n  gl_Position = projectionMatrix *  viewMatrix  * vec4( newPosition, 1.0 );\n}",
            fragmentShader: "varying vec4 vColor;\nvarying float z;\nuniform vec3 color;\nvoid main() {\n  // Fake colors for now\n  float rr = 0.2 + ( 1000. - z ) / 1000. * vColor.x;\n  float gg = 0.2 + ( 1000. - z ) / 1000. * vColor.y;\n  float bb = 0.2 + ( 1000. - z ) / 1000. * vColor.z;\n  gl_FragColor = vec4( rr, gg, bb, 1. );\n}",
            side: T.DoubleSide
          }),
              i = new T.Mesh(e, t);
          return i.rotation.y = Math.PI / 2, i.matrixAutoUpdate = !1, i.updateMatrix(), this.scene.add(i);
        }
      }, {
        key: "getNewCol",
        value: function getNewCol(e) {
          var t = this.options,
              i = null != t.color1 ? t.color1 : 4456448,
              n = null != t.color2 ? t.color2 : 6684672,
              o = new T.Color(i),
              s = new T.Color(n);
          var r, a;

          if (a = -1 != t.colorMode.indexOf("Gradient") ? Math.random() : e, 0 == t.colorMode.indexOf("variance")) {
            var _e5 = (o.r + Math.random() * s.r).clamp(0, 1),
                _t4 = (o.g + Math.random() * s.g).clamp(0, 1),
                _i3 = (o.b + Math.random() * s.b).clamp(0, 1);

            r = new T.Color(_e5, _t4, _i3);
          } else r = 0 == t.colorMode.indexOf("mix") ? new T.Color(i + a * n) : o.lerp(s, a);

          return r;
        }
      }, {
        key: "onInit",
        value: function onInit() {
          this.camera = new T.PerspectiveCamera(75, this.width / this.height, 1, 3e3), this.camera.position.z = 350, this.fog = new T.Fog(16777215, 100, 1e3), this.mouseX = this.mouseY = 0;
          var e = this.birds = [],
              t = this.boids = [],
              i = this.options;
          var n, o;
          if (M) try {
            this.initComputeRenderer(), this.valuesChanger = this.valuesChanger.bind(this), this.valuesChanger(), this.initGpgpuBirds();
          } catch (e) {
            console.error("[vanta.js] birds init error: ", e);
          } else {
            var _l2 = 6 * Math.pow(2, i.quantity);

            for (var s = 0; s < _l2; s++) {
              n = t[s] = new R(i), n.position.x = 400 * Math.random() - 200, n.position.y = 400 * Math.random() - 200, n.position.z = 400 * Math.random() - 200, n.velocity.x = 2 * Math.random() - 1, n.velocity.y = 2 * Math.random() - 1, n.velocity.z = 2 * Math.random() - 1, n.setWorldSize(500, 500, 300);

              var _h2 = -1 != i.colorMode.indexOf("Gradient"),
                  _c2 = V(i),
                  _d2 = _c2.attributes.position.length,
                  _u = new T.BufferAttribute(new Float32Array(_d2), 3);

              if (_h2) for (var r = 0; r < _c2.index.array.length; r += 3) {
                for (var a = 0; a <= 2; a++) {
                  var _e6 = _c2.index.array[r + a],
                      _t5 = this.getNewCol();

                  _u.array[3 * _e6] = _t5.r, _u.array[3 * _e6 + 1] = _t5.g, _u.array[3 * _e6 + 2] = _t5.b;
                }
              } else {
                var _e7 = this.getNewCol(s / _l2);

                for (r = 0; r < _u.array.length; r += 3) {
                  _u.array[r] = _e7.r, _u.array[r + 1] = _e7.g, _u.array[r + 2] = _e7.b;
                }
              }
              _c2.setAttribute("color", _u), o = e[s] = new T.Mesh(_c2, new T.MeshBasicMaterial({
                color: 16777215,
                side: T.DoubleSide,
                vertexColors: T.VertexColors
              })), o.phase = Math.floor(62.83 * Math.random()), o.position.x = t[s].position.x, o.position.y = t[s].position.y, o.position.z = t[s].position.z, this.scene.add(o);
            }
          }
        }
      }, {
        key: "valuesChanger",
        value: function valuesChanger() {
          this.velocityUniforms && (this.velocityUniforms.separationDistance.value = this.options.separation, this.velocityUniforms.alignmentDistance.value = this.options.alignment, this.velocityUniforms.speedLimit.value = this.options.speedLimit, this.velocityUniforms.cohesionDistance.value = this.options.cohesion);
        }
      }, {
        key: "onUpdate",
        value: function onUpdate() {
          this.now = performance.now(), this.last || (this.last = this.now);
          var e = (this.now - this.last) / 1e3;
          if (e > 1 && (e = 1), this.last = this.now, M) this.positionUniforms.time.value = this.now, this.positionUniforms.delta.value = e, this.velocityUniforms.time.value = this.now, this.velocityUniforms.delta.value = e, this.birdUniforms.time.value = this.now, this.birdUniforms.delta.value = e, this.velocityUniforms.predator.value.set(this.mouseX, -this.mouseY, 0), this.mouseX = 1e4, this.mouseY = 1e4, this.gpuCompute.compute(), this.birdUniforms.texturePosition.value = this.gpuCompute.getCurrentRenderTarget(this.positionVariable).texture, this.birdUniforms.textureVelocity.value = this.gpuCompute.getCurrentRenderTarget(this.velocityVariable).texture;else {
            var _e8 = this.birds,
                _n6 = this.boids;

            var _o4, _s3;

            for (var t = 0, i = _e8.length; t < i; t++) {
              _o4 = _n6[t], _o4.run(_n6), _s3 = _e8[t], _s3.rotation.y = Math.atan2(-_o4.velocity.z, _o4.velocity.x), _s3.rotation.z = Math.asin(_o4.velocity.y / _o4.velocity.length()), _s3.phase = (_s3.phase + (Math.max(0, _s3.rotation.z) + .1)) % 62.83;
              var _i4 = 16,
                  _r = 13;
              _s3.geometry.attributes.position.array[_i4] = _s3.geometry.attributes.position.array[_r] = 5 * Math.sin(_s3.phase) * this.options.birdSize, _s3.geometry.attributes.position.needsUpdate = !0, _s3.geometry.computeVertexNormals(), _s3.position.x = _n6[t].position.x, _s3.position.y = _n6[t].position.y, _s3.position.z = _n6[t].position.z;
            }
          }
        }
      }, {
        key: "onMouseMove",
        value: function onMouseMove(e, t) {
          if (this.mouseX = e - .5, this.mouseY = t - .5, !M) {
            var _e9 = this.boids;

            var _t6;

            for (var i = new T.Vector3(this.mouseX * this.width, -this.mouseY * this.height, 0), n = 0, o = _e9.length; n < o; n++) {
              _t6 = _e9[n], i.z = _t6.position.z, _t6.repulse(i);
            }
          }
        }
      }, {
        key: "onDestroy",
        value: function onDestroy() {}
      }, {
        key: "onResize",
        value: function onResize() {}
      }]);

      return E;
    }(l);

    E.initClass();
    var P = r.register("BIRDS", E);
    return t;
  }();
});