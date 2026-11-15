/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ee = globalThis, be = ee.ShadowRoot && (ee.ShadyCSS === void 0 || ee.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, ve = Symbol(), Ce = /* @__PURE__ */ new WeakMap();
let Ze = class {
  constructor(e, n, i) {
    if (this._$cssResult$ = !0, i !== ve) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = n;
  }
  get styleSheet() {
    let e = this.o;
    const n = this.t;
    if (be && e === void 0) {
      const i = n !== void 0 && n.length === 1;
      i && (e = Ce.get(n)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), i && Ce.set(n, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const xt = (t) => new Ze(typeof t == "string" ? t : t + "", void 0, ve), Qe = (t, ...e) => {
  const n = t.length === 1 ? t[0] : e.reduce((i, s, a) => i + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + t[a + 1], t[0]);
  return new Ze(n, t, ve);
}, St = (t, e) => {
  if (be) t.adoptedStyleSheets = e.map((n) => n instanceof CSSStyleSheet ? n : n.styleSheet);
  else for (const n of e) {
    const i = document.createElement("style"), s = ee.litNonce;
    s !== void 0 && i.setAttribute("nonce", s), i.textContent = n.cssText, t.appendChild(i);
  }
}, De = be ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let n = "";
  for (const i of e.cssRules) n += i.cssText;
  return xt(n);
})(t) : t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: At, defineProperty: kt, getOwnPropertyDescriptor: Et, getOwnPropertyNames: Tt, getOwnPropertySymbols: Nt, getPrototypeOf: Ct } = Object, M = globalThis, Le = M.trustedTypes, Dt = Le ? Le.emptyScript : "", ce = M.reactiveElementPolyfillSupport, Y = (t, e) => t, te = { toAttribute(t, e) {
  switch (e) {
    case Boolean:
      t = t ? Dt : null;
      break;
    case Object:
    case Array:
      t = t == null ? t : JSON.stringify(t);
  }
  return t;
}, fromAttribute(t, e) {
  let n = t;
  switch (e) {
    case Boolean:
      n = t !== null;
      break;
    case Number:
      n = t === null ? null : Number(t);
      break;
    case Object:
    case Array:
      try {
        n = JSON.parse(t);
      } catch {
        n = null;
      }
  }
  return n;
} }, xe = (t, e) => !At(t, e), Oe = { attribute: !0, type: String, converter: te, reflect: !1, useDefault: !1, hasChanged: xe };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), M.litPropertyMetadata ?? (M.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let R = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, n = Oe) {
    if (n.state && (n.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((n = Object.create(n)).wrapped = !0), this.elementProperties.set(e, n), !n.noAccessor) {
      const i = Symbol(), s = this.getPropertyDescriptor(e, i, n);
      s !== void 0 && kt(this.prototype, e, s);
    }
  }
  static getPropertyDescriptor(e, n, i) {
    const { get: s, set: a } = Et(this.prototype, e) ?? { get() {
      return this[n];
    }, set(r) {
      this[n] = r;
    } };
    return { get: s, set(r) {
      const o = s == null ? void 0 : s.call(this);
      a == null || a.call(this, r), this.requestUpdate(e, o, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? Oe;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Y("elementProperties"))) return;
    const e = Ct(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Y("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Y("properties"))) {
      const n = this.properties, i = [...Tt(n), ...Nt(n)];
      for (const s of i) this.createProperty(s, n[s]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const n = litPropertyMetadata.get(e);
      if (n !== void 0) for (const [i, s] of n) this.elementProperties.set(i, s);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [n, i] of this.elementProperties) {
      const s = this._$Eu(n, i);
      s !== void 0 && this._$Eh.set(s, n);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const n = [];
    if (Array.isArray(e)) {
      const i = new Set(e.flat(1 / 0).reverse());
      for (const s of i) n.unshift(De(s));
    } else e !== void 0 && n.push(De(e));
    return n;
  }
  static _$Eu(e, n) {
    const i = n.attribute;
    return i === !1 ? void 0 : typeof i == "string" ? i : typeof e == "string" ? e.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var e;
    this._$ES = new Promise((n) => this.enableUpdating = n), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (e = this.constructor.l) == null || e.forEach((n) => n(this));
  }
  addController(e) {
    var n;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(e), this.renderRoot !== void 0 && this.isConnected && ((n = e.hostConnected) == null || n.call(e));
  }
  removeController(e) {
    var n;
    (n = this._$EO) == null || n.delete(e);
  }
  _$E_() {
    const e = /* @__PURE__ */ new Map(), n = this.constructor.elementProperties;
    for (const i of n.keys()) this.hasOwnProperty(i) && (e.set(i, this[i]), delete this[i]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return St(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    var e;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (e = this._$EO) == null || e.forEach((n) => {
      var i;
      return (i = n.hostConnected) == null ? void 0 : i.call(n);
    });
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    var e;
    (e = this._$EO) == null || e.forEach((n) => {
      var i;
      return (i = n.hostDisconnected) == null ? void 0 : i.call(n);
    });
  }
  attributeChangedCallback(e, n, i) {
    this._$AK(e, i);
  }
  _$ET(e, n) {
    var a;
    const i = this.constructor.elementProperties.get(e), s = this.constructor._$Eu(e, i);
    if (s !== void 0 && i.reflect === !0) {
      const r = (((a = i.converter) == null ? void 0 : a.toAttribute) !== void 0 ? i.converter : te).toAttribute(n, i.type);
      this._$Em = e, r == null ? this.removeAttribute(s) : this.setAttribute(s, r), this._$Em = null;
    }
  }
  _$AK(e, n) {
    var a, r;
    const i = this.constructor, s = i._$Eh.get(e);
    if (s !== void 0 && this._$Em !== s) {
      const o = i.getPropertyOptions(s), c = typeof o.converter == "function" ? { fromAttribute: o.converter } : ((a = o.converter) == null ? void 0 : a.fromAttribute) !== void 0 ? o.converter : te;
      this._$Em = s;
      const h = c.fromAttribute(n, o.type);
      this[s] = h ?? ((r = this._$Ej) == null ? void 0 : r.get(s)) ?? h, this._$Em = null;
    }
  }
  requestUpdate(e, n, i, s = !1, a) {
    var r;
    if (e !== void 0) {
      const o = this.constructor;
      if (s === !1 && (a = this[e]), i ?? (i = o.getPropertyOptions(e)), !((i.hasChanged ?? xe)(a, n) || i.useDefault && i.reflect && a === ((r = this._$Ej) == null ? void 0 : r.get(e)) && !this.hasAttribute(o._$Eu(e, i)))) return;
      this.C(e, n, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, n, { useDefault: i, reflect: s, wrapped: a }, r) {
    i && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(e) && (this._$Ej.set(e, r ?? n ?? this[e]), a !== !0 || r !== void 0) || (this._$AL.has(e) || (this.hasUpdated || i || (n = void 0), this._$AL.set(e, n)), s === !0 && this._$Em !== e && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(e));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (n) {
      Promise.reject(n);
    }
    const e = this.scheduleUpdate();
    return e != null && await e, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var i;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [a, r] of this._$Ep) this[a] = r;
        this._$Ep = void 0;
      }
      const s = this.constructor.elementProperties;
      if (s.size > 0) for (const [a, r] of s) {
        const { wrapped: o } = r, c = this[a];
        o !== !0 || this._$AL.has(a) || c === void 0 || this.C(a, void 0, r, c);
      }
    }
    let e = !1;
    const n = this._$AL;
    try {
      e = this.shouldUpdate(n), e ? (this.willUpdate(n), (i = this._$EO) == null || i.forEach((s) => {
        var a;
        return (a = s.hostUpdate) == null ? void 0 : a.call(s);
      }), this.update(n)) : this._$EM();
    } catch (s) {
      throw e = !1, this._$EM(), s;
    }
    e && this._$AE(n);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    var n;
    (n = this._$EO) == null || n.forEach((i) => {
      var s;
      return (s = i.hostUpdated) == null ? void 0 : s.call(i);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(e) {
    return !0;
  }
  update(e) {
    this._$Eq && (this._$Eq = this._$Eq.forEach((n) => this._$ET(n, this[n]))), this._$EM();
  }
  updated(e) {
  }
  firstUpdated(e) {
  }
};
R.elementStyles = [], R.shadowRootOptions = { mode: "open" }, R[Y("elementProperties")] = /* @__PURE__ */ new Map(), R[Y("finalized")] = /* @__PURE__ */ new Map(), ce == null || ce({ ReactiveElement: R }), (M.reactiveElementVersions ?? (M.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const V = globalThis, Me = (t) => t, ne = V.trustedTypes, Ue = ne ? ne.createPolicy("lit-html", { createHTML: (t) => t }) : void 0, Xe = "$lit$", L = `lit$${Math.random().toFixed(9).slice(2)}$`, et = "?" + L, Lt = `<${et}>`, H = document, q = () => H.createComment(""), J = (t) => t === null || typeof t != "object" && typeof t != "function", Se = Array.isArray, Ot = (t) => Se(t) || typeof (t == null ? void 0 : t[Symbol.iterator]) == "function", le = `[ 	
\f\r]`, G = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ze = /-->/g, Pe = />/g, U = RegExp(`>|${le}(?:([^\\s"'>=/]+)(${le}*=${le}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), He = /'/g, Re = /"/g, tt = /^(?:script|style|textarea|title)$/i, Mt = (t) => (e, ...n) => ({ _$litType$: t, strings: e, values: n }), m = Mt(1), W = Symbol.for("lit-noChange"), g = Symbol.for("lit-nothing"), Ie = /* @__PURE__ */ new WeakMap(), z = H.createTreeWalker(H, 129);
function nt(t, e) {
  if (!Se(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Ue !== void 0 ? Ue.createHTML(e) : e;
}
const Ut = (t, e) => {
  const n = t.length - 1, i = [];
  let s, a = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", r = G;
  for (let o = 0; o < n; o++) {
    const c = t[o];
    let h, d, u = -1, l = 0;
    for (; l < c.length && (r.lastIndex = l, d = r.exec(c), d !== null); ) l = r.lastIndex, r === G ? d[1] === "!--" ? r = ze : d[1] !== void 0 ? r = Pe : d[2] !== void 0 ? (tt.test(d[2]) && (s = RegExp("</" + d[2], "g")), r = U) : d[3] !== void 0 && (r = U) : r === U ? d[0] === ">" ? (r = s ?? G, u = -1) : d[1] === void 0 ? u = -2 : (u = r.lastIndex - d[2].length, h = d[1], r = d[3] === void 0 ? U : d[3] === '"' ? Re : He) : r === Re || r === He ? r = U : r === ze || r === Pe ? r = G : (r = U, s = void 0);
    const _ = r === U && t[o + 1].startsWith("/>") ? " " : "";
    a += r === G ? c + Lt : u >= 0 ? (i.push(h), c.slice(0, u) + Xe + c.slice(u) + L + _) : c + L + (u === -2 ? o : _);
  }
  return [nt(t, a + (t[n] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), i];
};
class Z {
  constructor({ strings: e, _$litType$: n }, i) {
    let s;
    this.parts = [];
    let a = 0, r = 0;
    const o = e.length - 1, c = this.parts, [h, d] = Ut(e, n);
    if (this.el = Z.createElement(h, i), z.currentNode = this.el.content, n === 2 || n === 3) {
      const u = this.el.content.firstChild;
      u.replaceWith(...u.childNodes);
    }
    for (; (s = z.nextNode()) !== null && c.length < o; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const u of s.getAttributeNames()) if (u.endsWith(Xe)) {
          const l = d[r++], _ = s.getAttribute(u).split(L), y = /([.?@])?(.*)/.exec(l);
          c.push({ type: 1, index: a, name: y[2], strings: _, ctor: y[1] === "." ? Pt : y[1] === "?" ? Ht : y[1] === "@" ? Rt : oe }), s.removeAttribute(u);
        } else u.startsWith(L) && (c.push({ type: 6, index: a }), s.removeAttribute(u));
        if (tt.test(s.tagName)) {
          const u = s.textContent.split(L), l = u.length - 1;
          if (l > 0) {
            s.textContent = ne ? ne.emptyScript : "";
            for (let _ = 0; _ < l; _++) s.append(u[_], q()), z.nextNode(), c.push({ type: 2, index: ++a });
            s.append(u[l], q());
          }
        }
      } else if (s.nodeType === 8) if (s.data === et) c.push({ type: 2, index: a });
      else {
        let u = -1;
        for (; (u = s.data.indexOf(L, u + 1)) !== -1; ) c.push({ type: 7, index: a }), u += L.length - 1;
      }
      a++;
    }
  }
  static createElement(e, n) {
    const i = H.createElement("template");
    return i.innerHTML = e, i;
  }
}
function F(t, e, n = t, i) {
  var r, o;
  if (e === W) return e;
  let s = i !== void 0 ? (r = n._$Co) == null ? void 0 : r[i] : n._$Cl;
  const a = J(e) ? void 0 : e._$litDirective$;
  return (s == null ? void 0 : s.constructor) !== a && ((o = s == null ? void 0 : s._$AO) == null || o.call(s, !1), a === void 0 ? s = void 0 : (s = new a(t), s._$AT(t, n, i)), i !== void 0 ? (n._$Co ?? (n._$Co = []))[i] = s : n._$Cl = s), s !== void 0 && (e = F(t, s._$AS(t, e.values), s, i)), e;
}
class zt {
  constructor(e, n) {
    this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = n;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(e) {
    const { el: { content: n }, parts: i } = this._$AD, s = ((e == null ? void 0 : e.creationScope) ?? H).importNode(n, !0);
    z.currentNode = s;
    let a = z.nextNode(), r = 0, o = 0, c = i[0];
    for (; c !== void 0; ) {
      if (r === c.index) {
        let h;
        c.type === 2 ? h = new X(a, a.nextSibling, this, e) : c.type === 1 ? h = new c.ctor(a, c.name, c.strings, this, e) : c.type === 6 && (h = new It(a, this, e)), this._$AV.push(h), c = i[++o];
      }
      r !== (c == null ? void 0 : c.index) && (a = z.nextNode(), r++);
    }
    return z.currentNode = H, s;
  }
  p(e) {
    let n = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(e, i, n), n += i.strings.length - 2) : i._$AI(e[n])), n++;
  }
}
class X {
  get _$AU() {
    var e;
    return ((e = this._$AM) == null ? void 0 : e._$AU) ?? this._$Cv;
  }
  constructor(e, n, i, s) {
    this.type = 2, this._$AH = g, this._$AN = void 0, this._$AA = e, this._$AB = n, this._$AM = i, this.options = s, this._$Cv = (s == null ? void 0 : s.isConnected) ?? !0;
  }
  get parentNode() {
    let e = this._$AA.parentNode;
    const n = this._$AM;
    return n !== void 0 && (e == null ? void 0 : e.nodeType) === 11 && (e = n.parentNode), e;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(e, n = this) {
    e = F(this, e, n), J(e) ? e === g || e == null || e === "" ? (this._$AH !== g && this._$AR(), this._$AH = g) : e !== this._$AH && e !== W && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : Ot(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== g && J(this._$AH) ? this._$AA.nextSibling.data = e : this.T(H.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var a;
    const { values: n, _$litType$: i } = e, s = typeof i == "number" ? this._$AC(e) : (i.el === void 0 && (i.el = Z.createElement(nt(i.h, i.h[0]), this.options)), i);
    if (((a = this._$AH) == null ? void 0 : a._$AD) === s) this._$AH.p(n);
    else {
      const r = new zt(s, this), o = r.u(this.options);
      r.p(n), this.T(o), this._$AH = r;
    }
  }
  _$AC(e) {
    let n = Ie.get(e.strings);
    return n === void 0 && Ie.set(e.strings, n = new Z(e)), n;
  }
  k(e) {
    Se(this._$AH) || (this._$AH = [], this._$AR());
    const n = this._$AH;
    let i, s = 0;
    for (const a of e) s === n.length ? n.push(i = new X(this.O(q()), this.O(q()), this, this.options)) : i = n[s], i._$AI(a), s++;
    s < n.length && (this._$AR(i && i._$AB.nextSibling, s), n.length = s);
  }
  _$AR(e = this._$AA.nextSibling, n) {
    var i;
    for ((i = this._$AP) == null ? void 0 : i.call(this, !1, !0, n); e !== this._$AB; ) {
      const s = Me(e).nextSibling;
      Me(e).remove(), e = s;
    }
  }
  setConnected(e) {
    var n;
    this._$AM === void 0 && (this._$Cv = e, (n = this._$AP) == null || n.call(this, e));
  }
}
class oe {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, n, i, s, a) {
    this.type = 1, this._$AH = g, this._$AN = void 0, this.element = e, this.name = n, this._$AM = s, this.options = a, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = g;
  }
  _$AI(e, n = this, i, s) {
    const a = this.strings;
    let r = !1;
    if (a === void 0) e = F(this, e, n, 0), r = !J(e) || e !== this._$AH && e !== W, r && (this._$AH = e);
    else {
      const o = e;
      let c, h;
      for (e = a[0], c = 0; c < a.length - 1; c++) h = F(this, o[i + c], n, c), h === W && (h = this._$AH[c]), r || (r = !J(h) || h !== this._$AH[c]), h === g ? e = g : e !== g && (e += (h ?? "") + a[c + 1]), this._$AH[c] = h;
    }
    r && !s && this.j(e);
  }
  j(e) {
    e === g ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class Pt extends oe {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === g ? void 0 : e;
  }
}
class Ht extends oe {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== g);
  }
}
class Rt extends oe {
  constructor(e, n, i, s, a) {
    super(e, n, i, s, a), this.type = 5;
  }
  _$AI(e, n = this) {
    if ((e = F(this, e, n, 0) ?? g) === W) return;
    const i = this._$AH, s = e === g && i !== g || e.capture !== i.capture || e.once !== i.once || e.passive !== i.passive, a = e !== g && (i === g || s);
    s && this.element.removeEventListener(this.name, this, i), a && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var n;
    typeof this._$AH == "function" ? this._$AH.call(((n = this.options) == null ? void 0 : n.host) ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class It {
  constructor(e, n, i) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = n, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    F(this, e);
  }
}
const he = V.litHtmlPolyfillSupport;
he == null || he(Z, X), (V.litHtmlVersions ?? (V.litHtmlVersions = [])).push("3.3.3");
const Wt = (t, e, n) => {
  const i = (n == null ? void 0 : n.renderBefore) ?? e;
  let s = i._$litPart$;
  if (s === void 0) {
    const a = (n == null ? void 0 : n.renderBefore) ?? null;
    i._$litPart$ = s = new X(e.insertBefore(q(), a), a, void 0, n ?? {});
  }
  return s._$AI(t), s;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const P = globalThis;
class I extends R {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var n;
    const e = super.createRenderRoot();
    return (n = this.renderOptions).renderBefore ?? (n.renderBefore = e.firstChild), e;
  }
  update(e) {
    const n = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Wt(n, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var e;
    super.connectedCallback(), (e = this._$Do) == null || e.setConnected(!0);
  }
  disconnectedCallback() {
    var e;
    super.disconnectedCallback(), (e = this._$Do) == null || e.setConnected(!1);
  }
  render() {
    return W;
  }
}
var Je;
I._$litElement$ = !0, I.finalized = !0, (Je = P.litElementHydrateSupport) == null || Je.call(P, { LitElement: I });
const ue = P.litElementPolyfillSupport;
ue == null || ue({ LitElement: I });
(P.litElementVersions ?? (P.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const it = (t) => (e, n) => {
  n !== void 0 ? n.addInitializer(() => {
    customElements.define(t, e);
  }) : customElements.define(t, e);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ft = { attribute: !0, type: String, converter: te, reflect: !1, hasChanged: xe }, jt = (t = Ft, e, n) => {
  const { kind: i, metadata: s } = n;
  let a = globalThis.litPropertyMetadata.get(s);
  if (a === void 0 && globalThis.litPropertyMetadata.set(s, a = /* @__PURE__ */ new Map()), i === "setter" && ((t = Object.create(t)).wrapped = !0), a.set(n.name, t), i === "accessor") {
    const { name: r } = n;
    return { set(o) {
      const c = e.get.call(this);
      e.set.call(this, o), this.requestUpdate(r, c, t, !0, o);
    }, init(o) {
      return o !== void 0 && this.C(r, void 0, t, o), o;
    } };
  }
  if (i === "setter") {
    const { name: r } = n;
    return function(o) {
      const c = this[r];
      e.call(this, o), this.requestUpdate(r, c, t, !0, o);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function Ae(t) {
  return (e, n) => typeof n == "object" ? jt(t, e, n) : ((i, s, a) => {
    const r = s.hasOwnProperty(a);
    return s.constructor.createProperty(a, i), r ? Object.getOwnPropertyDescriptor(s, a) : void 0;
  })(t, e, n);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function x(t) {
  return Ae({ ...t, state: !0, attribute: !1 });
}
const Bt = "1.6.9", st = "Day Brief", rt = "day-brief-card", at = "day-brief-card-editor", ot = `
Du bist ein Home-Dashboard-Redakteur für eine Familien-Tageskarte.

ZIEL
Schreibe GENAU 3 kurze Sätze auf Deutsch. Immer dieselbe Reihenfolge. Wenig Variation.

FESTE STRUKTUR (immer so)
Satz 1: Begrüßung passend zur Tageszeit + Wetter jetzt mit Temperatur + kurze Kleidungsempfehlung.
Satz 2: Nur das Wichtigste für HEUTE: Termine und/oder Müll-Aktion (siehe Regel unten). Wenn beides fehlt: Morgenwetter kurz (nur wenn nass/schneit).
Satz 3: Ein warmer Abschluss. Haustier aus [HAUSHALT] höchstens einmal kurz erwähnen, sonst ein kurzer Familienwunsch.

SCHULE — KRITISCH
- Schule gilt NUR für Personen aus [STUNDENPLAN] (z.B. Ella). Nie für Jenny/Jens oder Kalendernamen.
- [SCHULTAG]=nein oder „Heute kein Unterricht“ → HEUTE keine Schule erwähnen.
- Am Wochenende: keine Schule für heute. Wenn [STUNDENPLAN] einen nächsten Schultag nennt (z.B. Montag für Ella), darfst du das kurz sagen — mit dem richtigen Namen.
- Kalender-Einträge wie „Schule bis …“ sind NUR Titel. Den Kalendernamen (z.B. Jenny) NICHT als Schüler/in verwenden.

MÜLL — HÖCHSTE PRIORITÄT
- Lies [MUELL] und [MUELL-AKTION] genau.
- Wenn Abholung MORGEN ist (oder „in 1 Tag“ / days=1): Du MUSST heute Abend zum Rausstellen auffordern.
- Wenn Abholung HEUTE ist (days=0): Du MUSST sagen, dass die Tonne(n) draußen sein müssen / schon raus sollten.
- Nenne die konkreten Tonnen aus den Daten (Restmüll, Bio, Papier, Wertstoff …).
- Markiere die Müll-Aktion immer fett mit Markdown: **Restmüll heute Abend rausstellen**
- Müll ohne baldige Abholung (ab 2+ Tagen) weglassen.

MARKDOWN
- Erlaubt: **fett** für das Wichtigste (Müll-Aktion, kritische Warnung, Geburtstag).
- Keine Links, keine Listen, keine Überschriften, kein anderer Markdown.

SONST NUR WENN DATEN DA SIND (kurz einbauen, Struktur nicht sprengen)
- Nur heutige Termine aus [TERMINE] (Kalendertag heute; nicht Schule einer falschen Person zuordnen)
- Geburtstage in den nächsten 14 Tagen aus [GEBURTSTAGE] (Alter nennen wenn bekannt)
- Morgens an echten Schultagen: kurz [STUNDENPLAN] (jetzt / als Nächstes) für die genannte Schülerin
- Offene Fenster bei Kälte
- Geräte nur bei Handlungsbedarf
- Solar/Heizöl nur wenn auffällig

Fakten nur aus den Datenblöcken. Keine erfundenen Personen, Tiere, Fächer oder Termine.

VERBOTEN
- Englisch
- Tools, Geräte steuern, Rückfragen
- Entity-IDs oder „Nicht verfügbar“
- Bulletpoints oder lange Aufzählungen
- Begrüßung weglassen
- Jenny/Erwachsene zur Schule schicken
- Am Sonntag behaupten, heute sei Schultag

STIL
Warm, ruhig, praktisch. Wie eine kurze feste Morgen-/Abendnotiz an die Familie — nicht wie freies Storytelling.
`.trim();
function We(t) {
  if (!t)
    return null;
  if (typeof t == "string") {
    const e = /^\d{4}-\d{2}-\d{2}$/.test(t);
    return { iso: t, allDay: e };
  }
  return t.dateTime ? { iso: t.dateTime, allDay: !1 } : t.date ? { iso: t.date, allDay: !0 } : null;
}
function Kt(t, e) {
  var n, i, s;
  return ((i = (n = t.entities) == null ? void 0 : n[e]) == null ? void 0 : i.name) ?? (typeof ((s = t.states[e]) == null ? void 0 : s.attributes.friendly_name) == "string" ? t.states[e].attributes.friendly_name : e.replace(/^calendar\./, "").replace(/_/g, " "));
}
async function Gt(t, e, n) {
  const i = [...new Set(e.filter(Boolean))];
  if (i.length === 0)
    return { events: [], errors: [] };
  const s = [];
  let a = {};
  try {
    const o = await t.callService(
      "calendar",
      "get_events",
      {
        duration: { hours: n }
      },
      { entity_id: i },
      !0,
      !0
    ), c = o && "response" in o ? o.response : void 0;
    c && typeof c == "object" && (a = c);
  } catch (o) {
    return s.push(
      o instanceof Error ? o.message : "Failed to load calendar events"
    ), { events: [], errors: s };
  }
  const r = [];
  for (const o of i) {
    const c = a[o];
    if (!c) {
      s.push(`No response for ${o}`);
      continue;
    }
    if (c.error) {
      s.push(`${o}: ${c.error}`);
      continue;
    }
    const h = Kt(t, o);
    for (const d of c.events ?? []) {
      const u = We(d.start), l = We(d.end);
      !u || !l || r.push({
        summary: d.summary || "Busy",
        description: d.description,
        location: d.location,
        start: u.iso,
        end: l.iso,
        all_day: u.allDay || l.allDay,
        calendar_id: o,
        calendar_name: h
      });
    }
  }
  return r.sort((o, c) => o.start.localeCompare(c.start)), { events: r, errors: s };
}
function ie(t, e) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: e,
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(t);
}
function ct(t, e) {
  if (t.all_day) {
    const i = /^(\d{4}-\d{2}-\d{2})/.exec(t.start);
    if (i)
      return i[1];
  }
  const n = new Date(t.start);
  return Number.isNaN(n.getTime()) ? t.start.slice(0, 10) : ie(n, e);
}
function Yt(t, e, n) {
  const i = ie(e, n);
  return t.filter((s) => ct(s, n) === i);
}
function Vt(t, e, n, i) {
  const s = ie(i, n), a = new Date(i.getTime() + 2160 * 60 * 1e3), r = ie(a, n);
  if (t === s)
    return e.toLowerCase().startsWith("de") ? "Heute" : "Today";
  if (t === r)
    return e.toLowerCase().startsWith("de") ? "Morgen" : "Tomorrow";
  const o = /* @__PURE__ */ new Date(`${t}T12:00:00`);
  return Number.isNaN(o.getTime()) ? t : new Intl.DateTimeFormat(e, {
    weekday: "long",
    day: "numeric",
    month: "short",
    timeZone: n
  }).format(o);
}
function qt(t, e, n, i) {
  const s = /* @__PURE__ */ new Map();
  for (const a of t) {
    const r = ct(a, n), o = s.get(r);
    o ? o.push(a) : s.set(r, [a]);
  }
  return [...s.entries()].sort(([a], [r]) => a.localeCompare(r)).map(([a, r]) => ({
    key: a,
    label: Vt(a, e, n, i),
    events: r
  }));
}
function Jt(t, e, n) {
  if (t.all_day)
    return e.toLowerCase().startsWith("de") ? "Ganztägig" : "All day";
  const i = new Date(t.start);
  return Number.isNaN(i.getTime()) ? t.start : new Intl.DateTimeFormat(e, {
    hour: "numeric",
    minute: "2-digit",
    timeZone: n
  }).format(i);
}
function Zt(t, e) {
  var n, i;
  return ((i = (n = t.entities) == null ? void 0 : n[e.entity_id]) == null ? void 0 : i.name) ?? (typeof e.attributes.friendly_name == "string" ? e.attributes.friendly_name : e.entity_id);
}
function Qt(t, e) {
  if (t.formatEntityState)
    try {
      return t.formatEntityState(e);
    } catch {
    }
  const n = typeof e.attributes.unit_of_measurement == "string" ? e.attributes.unit_of_measurement : void 0;
  return n ? `${e.state} ${n}` : e.state;
}
function Xt(t, e) {
  const n = [...new Set(e.filter(Boolean))], i = [], s = [];
  for (const a of n) {
    const r = t.states[a];
    if (!r) {
      s.push(a);
      continue;
    }
    i.push({
      entity_id: a,
      name: Zt(t, r),
      state: Qt(t, r),
      unit: typeof r.attributes.unit_of_measurement == "string" ? r.attributes.unit_of_measurement : void 0,
      domain: a.split(".")[0] ?? "unknown"
    });
  }
  return { entities: i, missing: s };
}
const Fe = "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA";
class en {
  constructor() {
    this.active = !1;
  }
  isActive() {
    return this.active;
  }
  start() {
    if (this.active)
      return !0;
    try {
      const e = document.createElement("audio");
      return e.setAttribute("playsinline", "true"), e.loop = !0, e.volume = 0.01, e.src = Fe, e.play(), this.audio = e, this.active = !0, this.timer = window.setInterval(() => {
        this.nudge();
      }, 5e4), !0;
    } catch {
      return this.stop(), !1;
    }
  }
  nudge() {
    if (this.audio)
      try {
        this.audio.src = `${Fe}#${Date.now()}`, this.audio.currentTime = 0, this.audio.play();
      } catch {
      }
  }
  stop() {
    this.timer && (window.clearInterval(this.timer), this.timer = void 0), this.audio && (this.audio.pause(), this.audio.removeAttribute("src"), this.audio.load(), this.audio = void 0), this.active = !1;
  }
}
class tn {
  constructor() {
    this.active = !1;
  }
  isActive() {
    return this.active;
  }
  async start(e) {
    var s;
    if (this.stop(), typeof navigator > "u" || !navigator.mediaDevices || typeof navigator.mediaDevices.getUserMedia != "function")
      return { status: "unsupported", error: "no mediaDevices API" };
    let n;
    try {
      n = await navigator.mediaDevices.getUserMedia({
        audio: !0,
        video: !1
      });
    } catch (a) {
      const r = a instanceof DOMException ? a.name : "";
      return r === "NotAllowedError" || r === "SecurityError" ? { status: "denied", error: r } : r === "NotFoundError" || r === "OverconstrainedError" ? { status: "error", error: "no microphone device" } : { status: "error", error: r || "getUserMedia failed" };
    }
    const i = ((s = n.getAudioTracks()[0]) == null ? void 0 : s.label) || void 0;
    try {
      const a = window.AudioContext ?? window.webkitAudioContext;
      if (!a)
        return this._stopStream(n), { status: "unsupported", error: "no AudioContext" };
      const r = new a(), o = r.createMediaStreamSource(n), c = r.createAnalyser();
      c.fftSize = 512, o.connect(c);
      const h = new Uint8Array(c.fftSize);
      this.stream = n, this.audioCtx = r, this.active = !0;
      const d = () => {
        if (!this.active)
          return;
        c.getByteTimeDomainData(h);
        let u = 0;
        for (let _ = 0; _ < h.length; _++) {
          const y = (h[_] - 128) / 128;
          u += y * y;
        }
        const l = Math.sqrt(u / h.length);
        e(Math.min(1, l * 3)), this.raf = requestAnimationFrame(d);
      };
      return this.raf = requestAnimationFrame(d), { status: "listening", deviceLabel: i };
    } catch (a) {
      return this.stop(), {
        status: "error",
        error: a instanceof Error ? a.message : "audio analysis failed"
      };
    }
  }
  stop() {
    this.active = !1, this.raf !== void 0 && (cancelAnimationFrame(this.raf), this.raf = void 0), this.audioCtx && (this.audioCtx.close().catch(() => {
    }), this.audioCtx = void 0), this.stream && (this._stopStream(this.stream), this.stream = void 0);
  }
  _stopStream(e) {
    for (const n of e.getTracks())
      n.stop();
  }
}
function nn(t) {
  return t.replace(/\*\*([^*]+)\*\*/g, "$1").replace(/\*([^*]+)\*/g, "$1");
}
function sn(t) {
  const e = t.trim();
  if (!e)
    return g;
  const n = e.split(/\n{2,}/);
  return m`${n.map((i, s) => {
    const a = rn(i.trim().replace(/\n/g, " "));
    return m`${s > 0 ? m`<br /><br />` : g}${a}`;
  })}`;
}
function rn(t) {
  const e = [], n = /\*\*([^*]+)\*\*/g;
  let i = 0, s;
  for (; (s = n.exec(t)) !== null; )
    s.index > i && e.push(t.slice(i, s.index)), e.push(m`<strong>${s[1]}</strong>`), i = s.index + s[0].length;
  return i < t.length && e.push(t.slice(i)), m`${e}`;
}
function se(t) {
  return (t ?? "en").toLowerCase().startsWith("de");
}
const lt = {
  "clear-night": "Klar (Nacht)",
  cloudy: "Bewölkt",
  fog: "Neblig",
  hail: "Hagel",
  lightning: "Gewitter",
  "lightning-rainy": "Gewitterregen",
  partlycloudy: "Teilweise bewölkt",
  pouring: "Starkregen",
  rainy: "Regnerisch",
  snowy: "Schnee",
  "snowy-rainy": "Schneeregen",
  sunny: "Sonnig",
  windy: "Windig",
  "windy-variant": "Windig und bewölkt",
  exceptional: "Außergewöhnliches Wetter"
}, an = {
  "clear-night": "Clear night",
  cloudy: "Cloudy",
  fog: "Fog",
  hail: "Hail",
  lightning: "Lightning",
  "lightning-rainy": "Thunderstorms",
  partlycloudy: "Partly cloudy",
  pouring: "Pouring rain",
  rainy: "Rainy",
  snowy: "Snowy",
  "snowy-rainy": "Wintry mix",
  sunny: "Sunny",
  windy: "Windy",
  "windy-variant": "Windy and cloudy",
  exceptional: "Severe weather"
};
function je(t, e) {
  return !t || t === "unknown" || t === "unavailable" ? se(e) ? "Wetter unklar" : "Weather unavailable" : (se(e) ? lt : an)[t] ?? t.replace(/_/g, " ");
}
const on = {
  today: "Heute",
  weather: "Wetter",
  calendar: "Kalender",
  cameras: "Kameras",
  context: "Kontext",
  humidity: "Luftfeuchtigkeit",
  preparing: "Tagesbrief wird erstellt…",
  refresh: "Brief aktualisieren",
  speak: "Brief vorlesen",
  loading_calendars: "Kalender werden geladen…",
  no_events: "Nichts in den nächsten {hours} Stunden.",
  configure_weather: "Wetter-Entity konfigurieren, um zu starten.",
  no_feed: "Kein Bild",
  entity: "Entity",
  entities: "Entities",
  keep_awake: "Wach halten",
  keep_awake_on: "Wachhalten an",
  weather_missing: "Wetter-Entity nicht gefunden: {id}",
  entity_missing: "Entity nicht gefunden: {id}",
  camera_live: "Live",
  camera_snapshot: "Snapshot",
  mic_test: "Mikrofon-Test",
  mic_start: "Mikrofon testen",
  mic_stop: "Stoppen",
  mic_listening: "Mikrofon aktiv",
  mic_denied: "Zugriff verweigert — Browser-Berechtigung fehlt",
  mic_unsupported: "Kein Mikrofonzugriff in diesem Browser verfügbar",
  mic_error: "Mikrofonfehler"
}, cn = {
  today: "Today",
  weather: "Weather",
  calendar: "Calendar",
  cameras: "Cameras",
  context: "Context",
  humidity: "humidity",
  preparing: "Preparing your day brief…",
  refresh: "Refresh brief",
  speak: "Read summary aloud",
  loading_calendars: "Loading calendars…",
  no_events: "Nothing in the next {hours} hours.",
  configure_weather: "Configure a weather entity to begin.",
  no_feed: "No feed",
  entity: "entity",
  entities: "entities",
  keep_awake: "Keep awake",
  keep_awake_on: "Keep awake on",
  weather_missing: "Weather entity not found: {id}",
  entity_missing: "Entity not found: {id}",
  camera_live: "Live",
  camera_snapshot: "Snapshot",
  mic_test: "Microphone test",
  mic_start: "Test microphone",
  mic_stop: "Stop",
  mic_listening: "Microphone active",
  mic_denied: "Access denied — browser permission missing",
  mic_unsupported: "No microphone access available in this browser",
  mic_error: "Microphone error"
};
function f(t, e, n) {
  let s = (se(t) ? on : cn)[e];
  if (n)
    for (const [a, r] of Object.entries(n))
      s = s.split(`{${a}}`).join(String(r));
  return s;
}
const ln = lt;
function hn(t) {
  const e = /^(\d{4})-(\d{2})-(\d{2})$/.exec(t.trim());
  if (!e)
    return null;
  const n = Number(e[1]), i = Number(e[2]), s = Number(e[3]);
  return !n || i < 1 || i > 12 || s < 1 || s > 31 ? null : { year: n, month: i, day: s };
}
function un(t, e) {
  const n = new Intl.DateTimeFormat("en-CA", {
    timeZone: e,
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).formatToParts(t), i = (s) => {
    var a;
    return Number(((a = n.find((r) => r.type === s)) == null ? void 0 : a.value) ?? 0);
  };
  return { year: i("year"), month: i("month"), day: i("day") };
}
function de(t, e, n) {
  return Date.UTC(t, e - 1, n) / 864e5;
}
function dn(t, e, n, i = 14) {
  const s = un(e, n), a = de(s.year, s.month, s.day), r = [];
  for (const o of t) {
    const c = hn(o.date);
    if (!c || !o.name.trim())
      continue;
    let h = s.year, d = de(h, c.month, c.day);
    d < a && (h += 1, d = de(h, c.month, c.day));
    const u = d - a;
    u < 0 || u > i || r.push({
      name: o.name.trim(),
      date: `${String(c.month).padStart(2, "0")}-${String(c.day).padStart(2, "0")}`,
      daysUntil: u,
      ageTurning: h - c.year
    });
  }
  return r.sort((o, c) => o.daysUntil - c.daysUntil);
}
function pn(t, e) {
  return e ? t.daysUntil === 0 ? `- ${t.name}: heute (${t.ageTurning})` : t.daysUntil === 1 ? `- ${t.name}: morgen (${t.ageTurning})` : `- ${t.name}: in ${t.daysUntil} Tagen (${t.ageTurning})` : t.daysUntil === 0 ? `- ${t.name}: today (turns ${t.ageTurning})` : t.daysUntil === 1 ? `- ${t.name}: tomorrow (turns ${t.ageTurning})` : `- ${t.name}: in ${t.daysUntil} days (turns ${t.ageTurning})`;
}
function mn(t) {
  var n, i;
  const e = [];
  for (const s of t.split(`
`)) {
    const a = s.trim();
    if (!a)
      continue;
    const r = /^(.+?)[\s,|:;-]+(\d{4}-\d{2}-\d{2})$/.exec(a) ?? /^(\d{4}-\d{2}-\d{2})[\s,|:;-]+(.+)$/.exec(a);
    if (!r)
      continue;
    const o = ((n = r[1]) == null ? void 0 : n.trim()) ?? "", c = ((i = r[2]) == null ? void 0 : i.trim()) ?? "";
    /^\d{4}-\d{2}-\d{2}$/.test(o) ? e.push({ name: c, date: o }) : e.push({ name: o, date: c });
  }
  return e;
}
function fn(t) {
  return t.map((e) => `${e.name}: ${e.date}`).join(`
`);
}
const Be = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday"
], Ke = {
  monday: "Montag",
  tuesday: "Dienstag",
  wednesday: "Mittwoch",
  thursday: "Donnerstag",
  friday: "Freitag",
  saturday: "Samstag",
  sunday: "Sonntag"
}, gn = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday"
];
function _n(t, e) {
  switch (new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    timeZone: e
  }).format(t)) {
    case "Mon":
      return "monday";
    case "Tue":
      return "tuesday";
    case "Wed":
      return "wednesday";
    case "Thu":
      return "thursday";
    case "Fri":
      return "friday";
    case "Sat":
      return "saturday";
    case "Sun":
      return "sunday";
    default:
      return "monday";
  }
}
function yn(t, e) {
  var a, r;
  const n = new Intl.DateTimeFormat("en-GB", {
    timeZone: e,
    hour: "2-digit",
    minute: "2-digit",
    hour12: !1
  }).formatToParts(t), i = Number(((a = n.find((o) => o.type === "hour")) == null ? void 0 : a.value) ?? 0), s = Number(
    ((r = n.find((o) => o.type === "minute")) == null ? void 0 : r.value) ?? 0
  );
  return i * 60 + s;
}
function Ge(t) {
  const e = /^(\d{1,2}):(\d{2})$/.exec(t.trim());
  if (!e)
    return null;
  const n = Number(e[1]), i = Number(e[2]);
  return n > 23 || i > 59 ? null : n * 60 + i;
}
function $n(t, e, n) {
  if (!t.valid_from)
    return !0;
  const i = /^(\d{4})-(\d{2})-(\d{2})$/.exec(t.valid_from.trim());
  if (!i)
    return !0;
  const s = new Intl.DateTimeFormat("en-CA", {
    timeZone: n,
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).formatToParts(e), a = (c) => {
    var h;
    return Number(((h = s.find((d) => d.type === c)) == null ? void 0 : h.value) ?? 0);
  }, r = a("year") * 1e4 + a("month") * 100 + a("day"), o = Number(i[1]) * 1e4 + Number(i[2]) * 100 + Number(i[3]);
  return r >= o;
}
function wn(t, e, n) {
  const i = _n(e, n), s = [...t[i] ?? []].sort(
    (a, r) => a.start.localeCompare(r.start)
  );
  return { weekday: i, lessons: s };
}
function bn(t, e, n) {
  const i = yn(e, n);
  let s, a;
  for (const r of t) {
    const o = Ge(r.start), c = Ge(r.end);
    o === null || c === null || (i >= o && i < c ? s = r : i < o && !a && (a = r));
  }
  return { current: s, next: a };
}
function vn(t, e) {
  const n = Be.indexOf(e);
  for (let i = 1; i <= 7; i += 1) {
    const s = Be[(n + i) % 7];
    if (!gn.includes(s))
      continue;
    const a = [...t[s] ?? []].sort(
      (r, o) => r.start.localeCompare(o.start)
    );
    if (a.length)
      return { weekday: s, lessons: a };
  }
  return null;
}
function Ye(t) {
  var n;
  if (!t.length)
    return null;
  const e = [...t].sort((i, s) => i.end.localeCompare(s.end));
  return ((n = e[e.length - 1]) == null ? void 0 : n.end) ?? null;
}
function xn(t, e, n, i) {
  var r;
  const s = [];
  let a = !1;
  for (const o of t) {
    if (!((r = o.name) != null && r.trim()) || !$n(o, e, n))
      continue;
    const { weekday: c, lessons: h } = wn(o, e, n), d = i ? Ke[c] : c;
    if (s.push(
      i ? `Schüler/in: ${o.name} · heute ${d}` : `Student: ${o.name} · today ${d}`
    ), o.note && s.push(i ? `Hinweis: ${o.note}` : `Note: ${o.note}`), h.length === 0) {
      s.push(
        i ? `Heute kein Unterricht für ${o.name}.` : `No lessons today for ${o.name}.`
      );
      const y = vn(o, c);
      if (y) {
        const k = i ? Ke[y.weekday] : y.weekday, T = Ye(y.lessons);
        s.push(
          i ? `Nächster Schultag: ${k} für ${o.name}${T ? ` (bis ${T})` : ""}.` : `Next school day: ${k} for ${o.name}${T ? ` (until ${T})` : ""}.`
        ), s.push(
          i ? `Plan ${k}:` : `${k} plan:`
        );
        for (const E of y.lessons.slice(0, 8))
          s.push(`- ${E.start}-${E.end}: ${E.subject}`);
      }
      continue;
    }
    a = !0;
    const { current: u, next: l } = bn(h, e, n), _ = Ye(h);
    _ && s.push(
      i ? `Schule heute bis ${_} (${o.name}).` : `School today until ${_} (${o.name}).`
    ), u && s.push(
      i ? `Jetzt: ${u.start}-${u.end} ${u.subject}` : `Now: ${u.start}-${u.end} ${u.subject}`
    ), l && s.push(
      i ? `Als Nächstes: ${l.start}-${l.end} ${l.subject}` : `Next: ${l.start}-${l.end} ${l.subject}`
    ), s.push(i ? "Heutiger Plan:" : "Today's schedule:");
    for (const y of h)
      s.push(`- ${y.start}-${y.end}: ${y.subject}`);
  }
  return { lines: s, hasLessonsToday: a };
}
function Sn(t, e) {
  var a, r, o;
  const n = t.states[e];
  if (!n)
    return null;
  const i = n.attributes, s = ((r = (a = t.entities) == null ? void 0 : a[e]) == null ? void 0 : r.name) ?? (typeof i.friendly_name == "string" ? i.friendly_name : e);
  return {
    entity_id: e,
    condition: n.state,
    temperature: typeof i.temperature == "number" ? i.temperature : void 0,
    temperature_unit: typeof i.temperature_unit == "string" ? i.temperature_unit : (o = t.config.unit_system) == null ? void 0 : o.temperature,
    humidity: typeof i.humidity == "number" ? i.humidity : void 0,
    wind_speed: typeof i.wind_speed == "number" ? i.wind_speed : void 0,
    wind_speed_unit: typeof i.wind_speed_unit == "string" ? i.wind_speed_unit : void 0,
    friendly_name: s,
    forecast: []
  };
}
async function An(t, e, n, i) {
  const s = await t.connection.subscribeMessage(
    (a) => {
      i(Array.isArray(a.forecast) ? a.forecast : []);
    },
    {
      type: "weather/subscribe_forecast",
      entity_id: e,
      forecast_type: n
    }
  );
  return () => {
    s();
  };
}
function re(t, e) {
  if (typeof t != "number" || Number.isNaN(t))
    return "—";
  const n = Number.isInteger(t) ? String(t) : t.toFixed(1);
  if (!e)
    return `${n}°`;
  const i = e.includes("°") ? e : `°${e}`;
  return `${n}${i}`;
}
function pe(t, e) {
  return t === e ? !1 : !t || !e ? !0 : t.state !== e.state || t.last_updated !== e.last_updated || t.attributes.temperature !== e.attributes.temperature || t.attributes.humidity !== e.attributes.humidity;
}
const ht = /* @__PURE__ */ new Set([
  "rainy",
  "pouring",
  "snowy",
  "snowy-rainy",
  "lightning-rainy",
  "hail"
]), Q = /* @__PURE__ */ new Map();
function kn(t) {
  let e = 0;
  for (let n = 0; n < t.length; n += 1)
    e = (e << 5) - e + t.charCodeAt(n), e |= 0;
  return String(e);
}
function En(t) {
  return se(t);
}
function Tn(t, e) {
  const n = Number(
    new Intl.DateTimeFormat("en-GB", {
      hour: "numeric",
      hour12: !1,
      timeZone: e
    }).format(t)
  );
  return n < 5 ? "nacht" : n < 10 ? "morgen" : n < 12 ? "vormittag" : n < 17 ? "nachmittag" : n < 22 ? "abend" : "nacht";
}
function Nn(t, e) {
  if (!e)
    switch (t) {
      case "morgen":
        return "morning";
      case "vormittag":
        return "late morning";
      case "nachmittag":
        return "afternoon";
      case "abend":
        return "evening";
      case "nacht":
        return "night";
      default:
        return t;
    }
  switch (t) {
    case "morgen":
      return "Morgen";
    case "vormittag":
      return "Vormittag";
    case "nachmittag":
      return "Nachmittag";
    case "abend":
      return "Abend";
    case "nacht":
      return "Nacht";
    default:
      return t;
  }
}
function Ve(t, e) {
  if (!e)
    switch (t) {
      case "morgen":
        return "Good morning, family!";
      case "vormittag":
        return "Hi family!";
      case "nachmittag":
        return "Good afternoon, family!";
      case "abend":
        return "Good evening, family!";
      case "nacht":
        return "Hey family — still up?";
      default:
        return t;
    }
  switch (t) {
    case "morgen":
      return "Guten Morgen, Familie!";
    case "vormittag":
      return "Moin, Familie!";
    case "nachmittag":
      return "Hallo Familie!";
    case "abend":
      return "Guten Abend, Familie!";
    case "nacht":
      return "Hey Familie — noch wach?";
    default:
      return t;
  }
}
function ut(t, e) {
  return !t || t === "unknown" || t === "unavailable" ? e ? "Wetter unklar" : "Weather unavailable" : e ? ln[t] ?? t.replace(/_/g, " ") : t.replace(/_/g, " ");
}
function Cn(t, e) {
  if (!t || typeof t.temperature != "number")
    return null;
  const n = t.temperature, i = ["rainy", "pouring", "snowy-rainy", "lightning-rainy"].includes(
    t.condition
  ), s = t.condition === "snowy";
  return e ? s ? "Winterkleidung und feste Schuhe" : n <= 3 ? i ? "dicke Jacke und Regenschutz" : "dicke Jacke" : n <= 10 ? i ? "warme Jacke und Regenschirm" : "warme Jacke" : n <= 16 ? i ? "Übergangsjacke und Schirm" : "Übergangsjacke" : n <= 22 ? i ? "leichte Jacke und Schirm" : "leichte Kleidung" : i ? "luftige Kleidung und Schirm" : "leichte sommerliche Kleidung" : s ? "winter clothes and sturdy shoes" : n <= 3 ? i ? "heavy coat and rain gear" : "heavy coat" : n <= 10 ? i ? "warm jacket and umbrella" : "warm jacket" : n <= 16 ? i ? "light jacket and umbrella" : "light jacket" : n <= 22 ? i ? "light layer and umbrella" : "light clothes" : i ? "summer clothes and umbrella" : "summer clothes";
}
function dt(t) {
  const e = t.trim().toLowerCase();
  return e === "unavailable" || e === "unknown" || e === "none" || e === "nicht verfügbar" || e === "unbekannt";
}
function Dn(t) {
  const e = t.state.trim().toLowerCase();
  return !(/* @__PURE__ */ new Set([
    "docked",
    "idle",
    "home",
    "off",
    "unavailable",
    "unknown",
    "charging",
    "paused",
    "standby"
  ])).has(e);
}
function Ln(t) {
  const e = t.state.trim().toLowerCase();
  return e === "on" || e === "open" || e === "opened";
}
function On(t) {
  const e = [], n = [], i = [], s = [], a = [], r = [], o = [], c = [], h = [];
  for (const d of t) {
    if (dt(d.state))
      continue;
    const u = d.entity_id.toLowerCase(), l = d.name.toLowerCase();
    d.domain === "person" || u.startsWith("person.") ? e.push(d) : u.includes("abfall") || u.includes("muell") || u.includes("mull") || u.includes("trash") || l.includes("abfall") || l.includes("müll") || l.includes("tonne") ? i.push(d) : u.includes("solar") || u.includes("solaredge") || u.includes("autark") || u.includes("produziert") || u.includes("exportiert") || u.includes("verbrauch") || u.includes("power_production") || l.includes("solar") || l.includes("autark") || l.includes("leistung") ? n.push(d) : u.includes("sun_up") || u.includes("sun_down") || l.includes("sonnenaufgang") || l.includes("sonnenuntergang") ? s.push(d) : u.includes("warn") || l.includes("warn") || l.includes("warnung") ? a.push(d) : u.includes("fenster") || u.includes("window") || l.includes("fenster") || l.includes("window") ? Ln(d) && r.push(d) : u.includes("heizoel") || u.includes("heizöl") || u.includes("oil") || l.includes("heizöl") || l.includes("heizoel") ? o.push(d) : d.domain === "vacuum" || d.domain === "lawn_mower" || u.includes("vacuum") || u.includes("lawn_mower") || l.includes("mäher") || l.includes("maeh") || l.includes("sauger") ? Dn(d) && c.push(d) : h.push(d);
  }
  return {
    people: e,
    solar: n,
    trash: i,
    sun: s,
    alerts: a,
    windows: r,
    heating: o,
    appliances: c,
    other: h
  };
}
function Mn(t, e, n, i) {
  const s = (n ?? "").toLowerCase();
  if (!(s.includes("schule") || s.includes("school") || s.includes("schultag")))
    return !1;
  const r = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    timeZone: e
  }).format(t);
  return !["Sat", "Sun"].includes(r) && (i === "morgen" || i === "vormittag");
}
function Un(t, e) {
  return t.filter((n) => {
    const i = (n.summary ?? "").toLowerCase();
    return i.includes("geburtstag") || i.includes("birthday") || i.includes("bday");
  }).slice(0, 5).map((n) => pt(n, e));
}
function zn(t) {
  const e = (t ?? "").toLowerCase();
  return e.includes("schule") || e.includes("unterricht") || e.includes("school") || /\bganztag\b/.test(e);
}
function pt(t, e) {
  const n = t.all_day ? e ? "ganztägig" : "all day" : t.start, i = t.calendar_name ? ` (${t.calendar_name})` : "", s = t.summary ?? (e ? "Belegt" : "Busy");
  return zn(t.summary) ? e ? `- ${n}: ${s}${i} — Schultitel; Schüler/in NUR aus [STUNDENPLAN], nicht aus Kalendername` : `- ${n}: ${s}${i} — school title; student ONLY from [SCHEDULE], not calendar name` : `- ${n}: ${s}${i}`;
}
function D(t) {
  return `- ${t.name}: ${t.state}`;
}
function Pn(t, e, n) {
  const i = t.trim().toLowerCase();
  if (!i || dt(i))
    return null;
  if (/^(heute|today|0)$/.test(i))
    return 0;
  if (/^(morgen|tomorrow)$/.test(i) || /\bin 1 day\b/.test(i))
    return 1;
  const s = i.match(/\b(?:in\s+)?(\d+)\s*(?:tag|tage|days?)\b/);
  if (s)
    return Number(s[1]);
  if (/^\d+(\.\d+)?$/.test(i))
    return Math.round(Number(i));
  const a = Date.parse(t.trim());
  if (!Number.isNaN(a)) {
    const r = new Date(a), o = new Intl.DateTimeFormat("en-CA", {
      timeZone: n,
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    }).format(e), c = new Intl.DateTimeFormat("en-CA", {
      timeZone: n,
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    }).format(r), h = Date.parse(`${o}T00:00:00Z`), d = Date.parse(`${c}T00:00:00Z`);
    return Math.round((d - h) / 864e5);
  }
  return null;
}
function $e(t, e, n, i) {
  const s = [];
  for (const a of t) {
    const r = Pn(a.state, e, n);
    r !== null && (r === 0 ? s.push(
      i ? `AKTION HEUTE: ${a.name} — Abholung heute → Tonne muss draußen sein.` : `ACTION TODAY: ${a.name} — pickup today → bin must be out.`
    ) : r === 1 && s.push(
      i ? `AKTION HEUTE ABEND: ${a.name} — Abholung morgen → HEUTE RAUSSTELLEN.` : `ACTION TONIGHT: ${a.name} — pickup tomorrow → PUT OUT TODAY.`
    ));
  }
  return !s.length && t.length && s.push(
    i ? "Keine Abholung heute/morgen erkannt — Müll im Brief weglassen." : "No pickup today/tomorrow detected — omit trash from the brief."
  ), s;
}
function S(t, e, n) {
  return [`[${t}]`, e.length ? e.join(`
`) : n].join(`
`);
}
function mt(t, e, n) {
  return t.datetime ? new Intl.DateTimeFormat(e, {
    weekday: "short",
    timeZone: n
  }).format(new Date(t.datetime)) : "?";
}
function Hn(t, e, n, i, s) {
  return t.slice(0, 6).map((a) => {
    const r = mt(a, n, i), o = ut(a.condition ?? "", s), c = re(
      a.temperature,
      e == null ? void 0 : e.temperature_unit
    ), h = a.condition && ht.has(a.condition) ? s ? " · nass" : " · wet" : "";
    return `- ${r}: ${o}, ${c}${h}`;
  });
}
function Rn(t, e, n, i) {
  const s = t.slice(0, 6).filter((r) => r.condition && ht.has(r.condition));
  if (s.length === 0)
    return null;
  const a = s.map((r) => mt(r, e, n)).join(", ");
  return i ? `Regen/Schnee erwartet: ${a}` : `Rain/snow expected: ${a}`;
}
function In(t) {
  var B;
  const {
    german: e,
    dayLabel: n,
    part: i,
    now: s,
    timeZone: a,
    weather: r,
    weatherLine: o,
    clothing: c,
    rainLine: h,
    schoolDay: d,
    birthdays: u,
    events: l,
    people: _,
    solar: y,
    trash: k,
    alerts: T,
    windows: E,
    heating: N,
    appliances: b
  } = t, $ = [];
  if (e) {
    if ($.push(`${Ve(i, !0)} ${n}.`), r && $.push(
      c ? `Draußen ${o}. Empfehlung: ${c}.` : `Draußen ${o}.`
    ), h && $.push(`${h}.`), d && (i === "morgen" || i === "vormittag") && $.push("Schultag — morgens an die Schule denken."), u.length) {
      const p = u[0];
      $.push(
        p.daysUntil === 0 ? `Heute hat ${p.name} Geburtstag (${p.ageTurning})!` : `Bald Geburtstag: ${p.name} in ${p.daysUntil} Tag(en).`
      );
    }
    if (l.length === 0)
      $.push("Heute stehen keine Termine an.");
    else {
      const p = l.slice(0, 3).map((A) => A.summary).filter(Boolean).join(", ");
      $.push(
        l.length === 1 ? `Termin: ${p}.` : `${l.length} Termine, u.a. ${p}.`
      );
    }
    y.length && $.push(
      `Solar: ${y.slice(0, 3).map((p) => `${p.name} ${p.state}`).join(", ")}.`
    );
    {
      const A = $e(k, s, a, !0).filter((C) => C.startsWith("AKTION"));
      A.length && $.push(
        A.map((C) => C.replace(/^AKTION (HEUTE(?: ABEND)?: )/, "")).join(" ")
      );
    }
    if (E.length && $.push(
      `Fenster offen: ${E.map((p) => p.name).join(", ")}.`
    ), N.length && $.push(
      `Heizöl: ${N.map((p) => `${p.name} ${p.state}`).join(", ")}.`
    ), b.length && $.push(
      `Geräte: ${b.map((p) => `${p.name} ${p.state}`).join(", ")}.`
    ), T.length) {
      const p = T.filter((A) => A.state !== "0" && A.state !== "ok");
      p.length && $.push(
        `Hinweis: ${p.map((A) => `${A.name} ${A.state}`).join(", ")}.`
      );
    }
    _.length && $.push(
      `Zuhause/Status: ${_.map((p) => `${p.name} ${p.state}`).join(", ")}.`
    );
  } else {
    if ($.push(`${Ve(i, !1)} ${n}.`), r && $.push(
      c ? `Outside: ${o}. Wear: ${c}.` : `Outside: ${o}.`
    ), h && $.push(`${h}.`), d && (i === "morgen" || i === "vormittag") && $.push("School day — keep the morning routine in mind."), u.length) {
      const p = u[0];
      $.push(
        p.daysUntil === 0 ? `Today is ${p.name}'s birthday (${p.ageTurning})!` : `Birthday soon: ${p.name} in ${p.daysUntil} day(s).`
      );
    }
    $.push(
      l.length === 0 ? "No meetings scheduled." : `${l.length} event(s), starting with ${((B = l[0]) == null ? void 0 : B.summary) ?? "Busy"}.`
    ), y.length && $.push(
      `Solar: ${y.slice(0, 3).map((p) => `${p.name} ${p.state}`).join(", ")}.`
    );
    {
      const A = $e(k, s, a, !1).filter((C) => C.startsWith("ACTION"));
      A.length && $.push(
        A.map(
          (C) => C.replace(/^ACTION (TODAY|TONIGHT): /, "")
        ).join(" ")
      );
    }
    E.length && $.push(`Open windows: ${E.map((p) => p.name).join(", ")}.`), N.length && $.push(
      `Heating oil: ${N.map((p) => `${p.name} ${p.state}`).join(", ")}.`
    ), b.length && $.push(
      `Devices needing attention: ${b.map((p) => `${p.name} ${p.state}`).join(", ")}.`
    );
  }
  return $.join(" ");
}
function Wn(t) {
  const {
    weather: e,
    forecast: n = (e == null ? void 0 : e.forecast) ?? [],
    events: i,
    entities: s,
    birthdays: a = [],
    schedules: r = [],
    now: o,
    locale: c,
    timeZone: h,
    summaryPrompt: d,
    contextNotes: u
  } = t, l = En(c), _ = Tn(o, h), y = Nn(_, l), k = new Intl.DateTimeFormat(c, {
    weekday: "long",
    month: "long",
    day: "numeric",
    timeZone: h
  }).format(o), T = new Intl.DateTimeFormat(c, {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: h
  }).format(o), E = e ? `${ut(e.condition, l)}, ${re(
    e.temperature,
    e.temperature_unit
  )}${typeof e.humidity == "number" ? l ? `, Luftfeuchtigkeit ${e.humidity}%` : `, humidity ${e.humidity}%` : ""}` : l ? "Wetter nicht verfügbar" : "Weather unavailable", N = Cn(e, l), b = On(s), $ = Hn(
    n,
    e,
    c,
    h,
    l
  ), B = Rn(n, c, h, l), p = dn(a, o, h, 14), A = Yt(i, o, h), C = [
    ...p.map((K) => pn(K, l)),
    ...Un(i, l)
  ], gt = Mn(o, h, u, _), { lines: _t, hasLessonsToday: yt } = xn(
    r,
    o,
    h,
    l
  ), Ee = gt || yt, $t = A.length === 0 ? [] : A.slice(0, 12).map((K) => pt(K, l)), wt = (d == null ? void 0 : d.trim()) || ot, Te = u == null ? void 0 : u.trim(), bt = [
    S(
      l ? "ZEIT" : "TIME",
      [
        l ? `Datum: ${k}` : `Date: ${k}`,
        l ? `Uhrzeit: ${T}` : `Time: ${T}`,
        l ? `Tageszeit: ${y}` : `Time of day: ${y}`
      ],
      ""
    ),
    ...Te ? [
      S(
        l ? "HAUSHALT" : "HOUSEHOLD",
        Te.split(`
`).map((K) => K.trim()).filter(Boolean),
        ""
      )
    ] : [],
    S(
      l ? "SCHULTAG" : "SCHOOL_DAY",
      [
        Ee ? l ? "ja — heute Unterricht laut Stundenplan" : "yes — lessons today per schedule" : l ? "nein — heute kein Unterricht (Wochenende oder kein Plan)" : "no — no lessons today (weekend or empty plan)"
      ],
      ""
    ),
    S(
      l ? "STUNDENPLAN" : "SCHEDULE",
      _t,
      l ? "Kein Stundenplan konfiguriert." : "No schedule configured."
    ),
    S(
      l ? "WETTER" : "WEATHER",
      [
        E,
        N ? l ? `Kleidungshinweis: ${N}` : `Clothing hint: ${N}` : "",
        B ?? ""
      ].filter(Boolean),
      l ? "Keine Wetterdaten." : "No weather data."
    ),
    S(
      l ? "VORHERSAGE" : "FORECAST",
      $,
      l ? "Keine Vorhersage." : "No forecast."
    ),
    S(
      l ? "GEBURTSTAGE" : "BIRTHDAYS",
      C,
      l ? "Keine Geburtstage in den nächsten 14 Tagen." : "No birthdays in the next 14 days."
    ),
    S(
      l ? "TERMINE" : "AGENDA",
      $t,
      l ? "Keine Termine heute (nur heutiger Kalendertag, nicht die nächsten 24h)." : "No events today (calendar day only, not the next 24h)."
    ),
    S(
      l ? "PERSONEN" : "PEOPLE",
      b.people.map(D),
      l ? "Keine Personendaten." : "No people data."
    ),
    S(
      "SOLAR",
      b.solar.map(D),
      l ? "Keine Solarwerte (oder nicht verfügbar)." : "No solar data."
    ),
    S(
      l ? "MUELL" : "TRASH",
      b.trash.map(D),
      l ? "Keine Mülldaten." : "No trash data."
    ),
    S(
      l ? "MUELL-AKTION" : "TRASH-ACTION",
      $e(b.trash, o, h, l),
      l ? "Keine Müll-Aktion heute/morgen." : "No trash action today/tomorrow."
    ),
    S(
      l ? "SONNE" : "SUN",
      b.sun.map(D),
      l ? "Keine Sonnenzeiten." : "No sun times."
    ),
    S(
      l ? "FENSTER" : "WINDOWS",
      b.windows.map(D),
      l ? "Keine offenen Fenster." : "No open windows."
    ),
    S(
      l ? "HEIZOEL" : "HEATING_OIL",
      b.heating.map(D),
      l ? "Kein Heizöl-Sensor." : "No heating-oil sensor."
    ),
    S(
      l ? "GERAETE" : "APPLIANCES",
      b.appliances.map(D),
      l ? "Keine Geräte mit Handlungsbedarf." : "No appliances needing attention."
    ),
    S(
      l ? "WARNUNGEN" : "ALERTS",
      b.alerts.map(D),
      l ? "Keine Warnungen." : "No alerts."
    ),
    S(
      l ? "SONSTIGES" : "OTHER",
      b.other.map(D),
      l ? "Nichts weiteres." : "Nothing else."
    )
  ], Ne = [
    wt,
    "",
    l ? "DATEN (nur diese Fakten verwenden; fehlende/ungültige Werte weglassen):" : "DATA (use only these facts; skip missing/invalid values):",
    bt.join(`

`),
    "",
    l ? "ANTWORT: Nur der fertige deutsche Fließtext (Markdown **fett** erlaubt), nichts sonst." : "RESPONSE: Only the finished brief text (Markdown **bold** allowed), nothing else."
  ].join(`
`), vt = In({
    german: l,
    dayLabel: k,
    part: _,
    now: o,
    timeZone: h,
    weather: e,
    weatherLine: E,
    clothing: N,
    rainLine: B,
    schoolDay: Ee,
    birthdays: p,
    events: A,
    people: b.people,
    solar: b.solar,
    trash: b.trash,
    alerts: b.alerts,
    windows: b.windows,
    heating: b.heating,
    appliances: b.appliances
  });
  return {
    hash: kn(Ne),
    prompt: Ne,
    local: vt
  };
}
function ft(t) {
  if (!t) {
    Q.clear();
    return;
  }
  Q.delete(t);
}
function Fn(t, e) {
  const n = Q.get(t);
  return n ? n.hash !== e || n.expiresAt < Date.now() ? (Q.delete(t), null) : n : null;
}
function me(t, e, n, i, s) {
  Q.set(t, {
    hash: e,
    text: n,
    source: i,
    expiresAt: Date.now() + Math.max(1, s) * 6e4
  });
}
async function jn(t, e, n) {
  var a, r, o, c, h, d;
  const i = await t.callWS({
    type: "conversation/process",
    text: n,
    language: ((a = t.locale) == null ? void 0 : a.language) ?? t.config.language ?? "en",
    agent_id: e
  });
  return ((r = i.response) == null ? void 0 : r.response_type) === "error" ? null : ((d = (h = (c = (o = i.response) == null ? void 0 : o.speech) == null ? void 0 : c.plain) == null ? void 0 : h.speech) == null ? void 0 : d.trim()) || null;
}
async function Bn(t) {
  const { hass: e, mode: n, agentId: i, digest: s, cacheKey: a, cacheMinutes: r, force: o } = t;
  if (o)
    ft(a);
  else {
    const c = Fn(a, s.hash);
    if (c)
      return { text: c.text, source: c.source };
  }
  if (n === "local")
    return me(a, s.hash, s.local, "local", r), { text: s.local, source: "local" };
  try {
    const c = await jn(e, i, s.prompt);
    if (c)
      return me(a, s.hash, c, "ai", r), { text: c, source: "ai" };
  } catch {
  }
  return me(a, s.hash, s.local, "local", r), { text: s.local, source: "local" };
}
let O = null, ae = null;
function Kn() {
  if (!(typeof window > "u"))
    try {
      const t = new Audio();
      ae = t, t.play().catch(() => {
      });
    } catch {
    }
}
function we() {
  typeof window < "u" && "speechSynthesis" in window && window.speechSynthesis.cancel(), O && (O.pause(), O.removeAttribute("src"), O.load(), O = null), ae = null;
}
function Gn(t) {
  if (t instanceof Error)
    return t.message;
  if (typeof t == "string")
    return t;
  if (t && typeof t == "object") {
    const e = t;
    if (typeof e.message == "string" && e.message.trim())
      return e.code ? `${e.code}: ${e.message}` : e.message;
    if (typeof e.error == "string" && e.error.trim())
      return e.error;
    if (typeof e.body == "string" && e.body.trim())
      return e.body;
    try {
      return JSON.stringify(t);
    } catch {
      return "unknown TTS error";
    }
  }
  return "unknown TTS error";
}
async function Yn(t) {
  const e = ae ?? new Audio();
  ae = null, O = e, await new Promise((n, i) => {
    const s = () => {
      r(), n();
    }, a = () => {
      r(), i(new Error("audio element failed to load TTS stream"));
    }, r = () => {
      e.removeEventListener("playing", s), e.removeEventListener("error", a);
    };
    e.addEventListener("playing", s), e.addEventListener("error", a), e.src = t, e.play().catch(() => {
    });
  }), await new Promise((n, i) => {
    e.onended = () => n(), e.onerror = () => i(new Error("audio element failed during TTS playback"));
  }), O === e && (O = null);
}
async function Vn(t) {
  const e = t.text.trim();
  if (!e)
    return;
  const n = t.language ?? "en";
  if (t.ttsEntity) {
    try {
      if (typeof t.hass.callApi != "function")
        throw new Error("hass.callApi is unavailable");
      const i = await t.hass.callApi(
        "POST",
        "tts_get_url",
        {
          engine_id: t.ttsEntity,
          message: e,
          language: n,
          cache: !0
        }
      ), s = i.path || i.url;
      if (!s)
        throw new Error("tts_get_url returned no path");
      const a = s.startsWith("http://") || s.startsWith("https://") ? (() => {
        try {
          const r = new URL(s);
          return r.pathname.startsWith("/api/tts_proxy/") ? r.pathname + r.search : s;
        } catch {
          return s;
        }
      })() : s;
      await Yn(a);
    } catch (i) {
      throw new Error(Gn(i));
    }
    t.mediaPlayer && await t.hass.callService(
      "tts",
      "speak",
      {
        media_player_entity_id: t.mediaPlayer,
        message: e,
        cache: !0
      },
      { entity_id: t.ttsEntity },
      !0,
      !1
    );
    return;
  }
  if (t.mediaPlayer) {
    await t.hass.callService(
      "tts",
      "speak",
      {
        media_player_entity_id: t.mediaPlayer,
        message: e,
        cache: !0
      },
      void 0,
      !0,
      !1
    );
    return;
  }
  if (typeof window < "u" && "speechSynthesis" in window) {
    we();
    const i = new SpeechSynthesisUtterance(e);
    i.lang = n, i.rate = 1, window.speechSynthesis.speak(i);
    return;
  }
  throw new Error("No TTS available");
}
const qn = Qe`
  :host {
    display: block;
  }

  ha-card {
    --day-brief-pad: 22px;
    padding: var(--day-brief-pad);
    background: linear-gradient(
      165deg,
      var(--ha-card-background, var(--card-background-color, #fff)) 0%,
      color-mix(
          in srgb,
          var(--primary-color, #03a9f4) 8%,
          var(--ha-card-background, var(--card-background-color, #fff))
        )
        100%
    );
    overflow: hidden;
  }

  .header {
    margin-bottom: 14px;
  }

  .header-row {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 12px;
  }

  .header-actions {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .eyebrow {
    margin: 0;
    font-size: 0.85rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--secondary-text-color);
  }

  .title {
    margin: 0;
    font-size: 2rem;
    font-weight: 650;
    line-height: 1.15;
    color: var(--primary-text-color);
  }

  .clock {
    margin: 8px 0 0;
    font-size: 3rem;
    font-weight: 650;
    font-variant-numeric: tabular-nums;
    letter-spacing: 0.02em;
    line-height: 1;
    color: var(--primary-text-color);
  }

  .icon-btn {
    flex: 0 0 auto;
    width: 42px;
    height: 42px;
    border: none;
    border-radius: 50%;
    background: color-mix(in srgb, var(--primary-text-color) 8%, transparent);
    color: var(--primary-text-color);
    font-size: 1.2rem;
    line-height: 1;
    cursor: pointer;
  }

  .icon-btn:hover {
    background: color-mix(in srgb, var(--primary-color, #03a9f4) 18%, transparent);
  }

  .icon-btn:disabled {
    opacity: 0.5;
    cursor: default;
  }

  .icon-btn.active {
    background: color-mix(in srgb, var(--primary-color, #03a9f4) 22%, transparent);
  }

  .spin {
    display: inline-block;
    animation: day-brief-spin 0.8s linear infinite;
  }

  @keyframes day-brief-spin {
    to {
      transform: rotate(360deg);
    }
  }

  .brief {
    margin: 0 0 14px;
    font-size: 1.35rem;
    line-height: 1.45;
    color: var(--primary-text-color);
  }

  .brief strong {
    font-weight: 700;
    color: var(--primary-text-color);
  }

  .split {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    gap: 14px;
    align-items: stretch;
  }

  @media (max-width: 720px) {
    .split {
      grid-template-columns: 1fr;
    }
  }

  .panel {
    min-width: 0;
    padding: 16px;
    border-radius: 18px;
    background: color-mix(
      in srgb,
      var(--primary-text-color) 1.5%,
      var(--ha-card-background, var(--card-background-color, #fff))
    );
    border: 1px solid
      color-mix(in srgb, var(--primary-text-color) 5%, transparent);
    box-shadow: none;
  }

  .section-title {
    margin: 0 0 12px;
    font-size: 0.78rem;
    font-weight: 650;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: color-mix(
      in srgb,
      var(--primary-text-color) 25%,
      var(--secondary-text-color)
    );
  }

  .weather-hero {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 12px;
  }

  .condition {
    margin: 0;
    font-size: 1.35rem;
    font-weight: 600;
    line-height: 1.2;
    text-transform: capitalize;
    color: var(--primary-text-color);
  }

  .weather-place {
    margin: 4px 0 0;
    font-size: 0.9rem;
    color: color-mix(
      in srgb,
      var(--primary-text-color) 20%,
      var(--secondary-text-color)
    );
  }

  .temp {
    margin: 0;
    font-size: 3.1rem;
    font-weight: 650;
    letter-spacing: -0.04em;
    line-height: 0.9;
    color: var(--primary-text-color);
  }

  .chips {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 14px;
  }

  .chip {
    padding: 4px 10px;
    border-radius: 999px;
    font-size: 0.82rem;
    color: color-mix(
      in srgb,
      var(--primary-text-color) 25%,
      var(--secondary-text-color)
    );
    background: color-mix(in srgb, var(--primary-text-color) 4%, transparent);
  }

  .forecast {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(58px, 1fr));
    gap: 8px;
    margin-top: 16px;
  }

  .forecast-item {
    min-width: 0;
    padding: 8px 6px;
    border-radius: 12px;
    text-align: center;
    background: color-mix(in srgb, var(--primary-text-color) 3.5%, transparent);
    border: 1px solid
      color-mix(in srgb, var(--primary-text-color) 3%, transparent);
  }

  .forecast-day,
  .forecast-cond {
    display: block;
    font-size: 0.75rem;
    color: color-mix(
      in srgb,
      var(--primary-text-color) 20%,
      var(--secondary-text-color)
    );
    text-transform: capitalize;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .forecast-temp {
    display: block;
    margin: 4px 0 2px;
    font-size: 0.95rem;
    font-weight: 650;
    color: var(--primary-text-color);
  }

  .events {
    list-style: none;
    margin: 0;
    padding: 0;
    max-height: 320px;
    overflow: auto;
  }

  .event-day {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .event-day + .event-day {
    margin-top: 12px;
    padding-top: 10px;
    border-top: 1px solid
      color-mix(in srgb, var(--primary-text-color) 8%, transparent);
  }

  .event-day-label {
    margin: 0 0 6px;
    font-size: 0.78rem;
    font-weight: 650;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: color-mix(
      in srgb,
      var(--primary-text-color) 30%,
      var(--secondary-text-color)
    );
  }

  .event-day-list {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .event {
    display: grid;
    grid-template-columns: 78px minmax(0, 1fr);
    gap: 10px;
    align-items: start;
    padding: 8px 0;
    border-top: 1px solid
      color-mix(in srgb, var(--primary-text-color) 4%, transparent);
  }

  .event-day-list .event:first-child {
    padding-top: 0;
    border-top: none;
  }

  .event-time {
    font-size: 1rem;
    font-variant-numeric: tabular-nums;
    color: color-mix(
      in srgb,
      var(--primary-text-color) 25%,
      var(--secondary-text-color)
    );
  }

  .event-body {
    min-width: 0;
  }

  .event-title {
    margin: 0;
    font-size: 1.15rem;
    font-weight: 550;
    color: var(--primary-text-color);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .event-cal {
    margin: 3px 0 0;
    font-size: 0.9rem;
    color: color-mix(
      in srgb,
      var(--primary-text-color) 20%,
      var(--secondary-text-color)
    );
  }

  .context-toggle {
    display: flex;
    align-items: center;
    gap: 8px;
    width: 100%;
    margin: 0;
    padding: 0;
    border: none;
    background: transparent;
    cursor: pointer;
    color: inherit;
    font: inherit;
    text-align: left;
  }

  .context-toggle .section-title {
    margin: 0;
  }

  .context-meta {
    margin-left: auto;
    font-size: 0.85rem;
    color: var(--secondary-text-color);
  }

  .context-chevron {
    font-size: 0.85rem;
    color: var(--secondary-text-color);
  }

  .entity-list {
    list-style: none;
    margin: 10px 0 0;
    padding: 0;
    display: grid;
    gap: 8px;
  }

  .entity-row {
    display: flex;
    justify-content: space-between;
    gap: 12px;
    align-items: baseline;
  }

  .entity-name {
    font-size: 1.05rem;
    color: var(--primary-text-color);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .entity-state {
    flex: 0 0 auto;
    font-size: 1.05rem;
    font-weight: 500;
    color: var(--secondary-text-color);
    text-align: right;
  }

  .cameras,
  .context {
    margin-top: 16px;
  }

  .camera-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 10px;
  }

  @media (min-width: 900px) {
    .camera-grid {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }
  }

  .camera-tile {
    position: relative;
    display: block;
    margin: 0;
    padding: 0;
    border: none;
    border-radius: 12px;
    overflow: hidden;
    background: color-mix(in srgb, var(--primary-text-color) 8%, transparent);
    cursor: pointer;
    aspect-ratio: 16 / 10;
  }

  .camera-feed {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .camera-missing {
    display: grid;
    place-items: center;
    width: 100%;
    height: 100%;
    font-size: 0.85rem;
    color: var(--secondary-text-color);
  }

  .camera-label {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 8px 10px 6px;
    font-size: 0.75rem;
    font-weight: 500;
    color: #fff;
    text-align: left;
    background: linear-gradient(
      transparent,
      color-mix(in srgb, #000 65%, transparent)
    );
  }

  .camera-badge {
    position: absolute;
    top: 6px;
    right: 6px;
    padding: 2px 8px;
    border-radius: 999px;
    font-size: 0.65rem;
    font-weight: 650;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: #fff;
    background: color-mix(in srgb, #000 55%, transparent);
  }

  .mic-panel {
    margin-top: 16px;
  }

  .mic-row {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .mic-btn {
    flex: 0 0 auto;
    padding: 8px 16px;
    border: none;
    border-radius: 999px;
    background: color-mix(in srgb, var(--primary-color, #03a9f4) 18%, transparent);
    color: var(--primary-text-color);
    font: inherit;
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
  }

  .mic-btn:hover {
    background: color-mix(in srgb, var(--primary-color, #03a9f4) 28%, transparent);
  }

  .mic-level {
    flex: 1 1 auto;
    height: 10px;
    border-radius: 999px;
    background: color-mix(in srgb, var(--primary-text-color) 8%, transparent);
    overflow: hidden;
  }

  .mic-level-fill {
    height: 100%;
    width: 0;
    border-radius: 999px;
    background: var(--primary-color, #03a9f4);
    transition: width 90ms linear;
  }

  .mic-status {
    margin: 8px 0 0;
    font-size: 0.85rem;
    color: var(--secondary-text-color);
  }

  .mic-status.denied,
  .mic-status.error {
    color: var(--error-color, #db4437);
  }

  .footer-bar {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 14px;
  }

  .keep-awake {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    margin: 0;
    padding: 4px 10px;
    border: 1px solid color-mix(in srgb, var(--primary-text-color) 6%, transparent);
    border-radius: 999px;
    background: transparent;
    color: var(--secondary-text-color);
    font-size: 0.75rem;
    cursor: pointer;
    opacity: 0.7;
  }

  .keep-awake:hover {
    opacity: 1;
  }

  .keep-awake.on {
    border-color: color-mix(in srgb, var(--primary-color, #03a9f4) 35%, transparent);
    color: var(--secondary-text-color);
    opacity: 0.55;
  }

  .keep-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--disabled-text-color, #9e9e9e);
  }

  .keep-awake.on .keep-dot {
    background: var(--primary-color, #03a9f4);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--primary-color, #03a9f4) 18%, transparent);
  }

  .empty,
  .error-chip {
    margin: 0;
    font-size: 1rem;
    color: var(--secondary-text-color);
  }

  .errors {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-top: 16px;
  }

  .error-chip {
    padding: 4px 8px;
    border-radius: 999px;
    background: color-mix(in srgb, var(--error-color, #db4437) 15%, transparent);
    color: var(--error-color, #db4437);
    font-size: 0.75rem;
  }

  .loading {
    opacity: 0.7;
  }
`;
var Jn = Object.defineProperty, Zn = Object.getOwnPropertyDescriptor, v = (t, e, n, i) => {
  for (var s = i > 1 ? void 0 : i ? Zn(e, n) : e, a = t.length - 1, r; a >= 0; a--)
    (r = t[a]) && (s = (i ? r(e, n, s) : r(s)) || s);
  return i && s && Jn(e, n, s), s;
};
const fe = "daily", ge = 24, qe = 15, _e = "auto", Qn = 15 * 6e4;
let w = class extends I {
  constructor() {
    super(...arguments), this._weather = null, this._forecast = [], this._events = [], this._entities = [], this._summary = "", this._summarySource = "loading", this._errors = [], this._loadingEvents = !1, this._refreshing = !1, this._contextOpen = !1, this._now = /* @__PURE__ */ new Date(), this._speaking = !1, this._keepAwakeOn = !1, this._cameraMode = {}, this._cameraTick = 0, this._micStatus = "idle", this._micDevice = "", this._micLevel = 0, this._fetchGeneration = 0, this._keepAwake = new en(), this._mic = new tn(), this._lastMicLevelAt = 0, this._onVisibility = () => {
      document.visibilityState === "visible" ? (this._now = /* @__PURE__ */ new Date(), this._startClock(), this._refreshData(!1)) : this._stopClock();
    };
  }
  static getStubConfig() {
    return {
      weather_entity: "weather.home",
      calendars: ["calendar.home"],
      entities: [],
      cameras: [],
      forecast_type: "daily",
      summary_mode: "auto"
    };
  }
  static async getConfigElement() {
    return await Promise.resolve().then(() => si), document.createElement(at);
  }
  setConfig(t) {
    if (!t)
      throw new Error("Invalid configuration");
    this._config = {
      forecast_type: fe,
      horizon_hours: ge,
      summary_mode: _e,
      cache_minutes: qe,
      calendars: [],
      entities: [],
      cameras: [],
      birthdays: [],
      schedules: [],
      ...t
    };
  }
  getCardSize() {
    return 5;
  }
  connectedCallback() {
    super.connectedCallback(), this._startRefreshLoop(), this._startClock(), this._startCameraStillLoop(), document.addEventListener("visibilitychange", this._onVisibility);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._stopRefreshLoop(), this._stopClock(), this._stopCameraStillLoop(), this._teardownForecast(), this._keepAwake.stop(), this._keepAwakeOn = !1, this._mic.stop(), this._micStatus = "idle", this._micLevel = 0, we(), document.removeEventListener("visibilitychange", this._onVisibility);
  }
  updated(t) {
    !this._config || !this.hass || ((t.has("hass") || t.has("_config")) && (this._syncWeatherFromHass(), this._syncEntitiesFromHass(), this._ensureForecastSubscription()), t.has("_config") && this.isConnected && this._refreshData(!0));
  }
  shouldUpdate(t) {
    var e, n, i, s, a, r, o, c, h, d, u, l;
    if (t.has("_config") || t.has("_weather") || t.has("_forecast") || t.has("_entities") || t.has("_events") || t.has("_summary") || t.has("_summarySource") || t.has("_errors") || t.has("_loadingEvents") || t.has("_refreshing") || t.has("_contextOpen") || t.has("_now") || t.has("_speaking") || t.has("_keepAwakeOn") || t.has("_cameraMode") || t.has("_cameraTick") || t.has("_micStatus") || t.has("_micDevice") || t.has("_micLevel"))
      return !0;
    if (t.has("hass")) {
      const _ = t.get("hass");
      if ((e = this._config) != null && e.weather_entity && pe(
        (n = _ == null ? void 0 : _.states) == null ? void 0 : n[this._config.weather_entity],
        (s = (i = this.hass) == null ? void 0 : i.states) == null ? void 0 : s[this._config.weather_entity]
      ))
        return !0;
      for (const y of ((a = this._config) == null ? void 0 : a.entities) ?? [])
        if (pe((r = _ == null ? void 0 : _.states) == null ? void 0 : r[y], (c = (o = this.hass) == null ? void 0 : o.states) == null ? void 0 : c[y]))
          return !0;
      for (const y of ((h = this._config) == null ? void 0 : h.cameras) ?? [])
        if (pe((d = _ == null ? void 0 : _.states) == null ? void 0 : d[y], (l = (u = this.hass) == null ? void 0 : u.states) == null ? void 0 : l[y]))
          return !0;
    }
    return !1;
  }
  _startRefreshLoop() {
    this._stopRefreshLoop(), this._refreshData(!0), this._refreshTimer = window.setInterval(() => {
      this._refreshData(!1);
    }, Qn);
  }
  _stopRefreshLoop() {
    this._refreshTimer && (window.clearInterval(this._refreshTimer), this._refreshTimer = void 0);
  }
  _startClock() {
    this._stopClock(), this._now = /* @__PURE__ */ new Date(), this._clockTimer = window.setInterval(() => {
      this._now = /* @__PURE__ */ new Date();
    }, 1e3);
  }
  _stopClock() {
    this._clockTimer && (window.clearInterval(this._clockTimer), this._clockTimer = void 0);
  }
  _clockLabel() {
    var n, i, s;
    const t = ((i = (n = this.hass) == null ? void 0 : n.locale) == null ? void 0 : i.language) ?? "en", e = (s = this.hass) == null ? void 0 : s.config.time_zone;
    return new Intl.DateTimeFormat(t, {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: e
    }).format(this._now);
  }
  _cameraName(t) {
    var n, i, s, a;
    const e = (n = this.hass) == null ? void 0 : n.states[t];
    return ((a = (s = (i = this.hass) == null ? void 0 : i.entities) == null ? void 0 : s[t]) == null ? void 0 : a.name) ?? (typeof (e == null ? void 0 : e.attributes.friendly_name) == "string" ? e.attributes.friendly_name : t.replace(/^camera\./, "").replace(/_/g, " "));
  }
  _cameraToken(t) {
    var n, i;
    const e = (i = (n = this.hass) == null ? void 0 : n.states[t]) == null ? void 0 : i.attributes.access_token;
    return typeof e == "string" && e ? e : null;
  }
  _cameraStreamSrc(t) {
    const e = this._cameraToken(t);
    return e ? `/api/camera_proxy_stream/${t}?token=${encodeURIComponent(e)}` : null;
  }
  _cameraStillSrc(t) {
    const e = this._cameraToken(t);
    return e ? `/api/camera_proxy/${t}?token=${encodeURIComponent(e)}&t=${this._cameraTick}` : null;
  }
  _onCameraError(t) {
    const n = (this._cameraMode[t] ?? "stream") === "stream" ? "still" : "error";
    this._cameraMode = { ...this._cameraMode, [t]: n };
  }
  _startCameraStillLoop() {
    this._stopCameraStillLoop(), this._cameraStillTimer = window.setInterval(() => {
      Object.values(this._cameraMode).includes("still") && (this._cameraTick = this._cameraTick + 1);
    }, 5e3);
  }
  _stopCameraStillLoop() {
    this._cameraStillTimer && (window.clearInterval(this._cameraStillTimer), this._cameraStillTimer = void 0);
  }
  async _onMicToggle(t) {
    if (t.stopPropagation(), this._mic.isActive()) {
      this._mic.stop(), this._micStatus = "idle", this._micDevice = "", this._micLevel = 0;
      return;
    }
    const e = await this._mic.start((n) => {
      const i = Date.now();
      if (i - this._lastMicLevelAt < 100)
        return;
      this._lastMicLevelAt = i;
      const s = Math.round(n * 20) / 20;
      s !== this._micLevel && (this._micLevel = s);
    });
    this._micStatus = e.status, this._micDevice = e.deviceLabel ?? "", e.status !== "listening" && (this._micLevel = 0);
  }
  _micStatusText(t) {
    switch (this._micStatus) {
      case "listening":
        return this._micDevice ? `${f(t, "mic_listening")} · ${this._micDevice}` : f(t, "mic_listening");
      case "denied":
        return f(t, "mic_denied");
      case "unsupported":
        return f(t, "mic_unsupported");
      case "error":
        return f(t, "mic_error");
      default:
        return "";
    }
  }
  _openMoreInfo(t) {
    this.dispatchEvent(
      new CustomEvent("hass-more-info", {
        detail: { entityId: t },
        bubbles: !0,
        composed: !0
      })
    );
  }
  _cacheKey() {
    return [
      this._config.weather_entity ?? "",
      ...this._config.calendars ?? [],
      ...this._config.entities ?? [],
      this._config.summary_mode ?? _e,
      this._config.agent_id ?? "",
      this._config.summary_prompt ?? "",
      this._config.context_notes ?? "",
      JSON.stringify(this._config.birthdays ?? []),
      JSON.stringify(this._config.schedules ?? [])
    ].join("|");
  }
  _syncWeatherFromHass() {
    var n, i;
    const t = this._config.weather_entity;
    if (!t) {
      this._weather = null;
      return;
    }
    const e = Sn(this.hass, t);
    if (!e) {
      this._weather = null, this._pushError(
        f((i = (n = this.hass) == null ? void 0 : n.locale) == null ? void 0 : i.language, "weather_missing", { id: t })
      );
      return;
    }
    this._weather = { ...e, forecast: this._forecast };
  }
  _syncEntitiesFromHass() {
    var n, i;
    const { entities: t, missing: e } = Xt(
      this.hass,
      this._config.entities ?? []
    );
    this._entities = t;
    for (const s of e)
      this._pushError(
        f((i = (n = this.hass) == null ? void 0 : n.locale) == null ? void 0 : i.language, "entity_missing", { id: s })
      );
  }
  async _ensureForecastSubscription() {
    const t = this._config.weather_entity, e = this._config.forecast_type ?? fe;
    if (!(this._unsubForecast && this._lastWeatherEntity === t && this._lastForecastType === e)) {
      if (this._teardownForecast(), this._lastWeatherEntity = t, this._lastForecastType = e, !t || e === "none" || !this.hass) {
        this._forecast = [];
        return;
      }
      try {
        this._unsubForecast = await An(
          this.hass,
          t,
          e,
          (n) => {
            this._forecast = n.slice(0, 6), this._weather && (this._weather = { ...this._weather, forecast: this._forecast });
          }
        );
      } catch (n) {
        this._forecast = [], this._pushError(
          n instanceof Error ? `Forecast: ${n.message}` : "Forecast unavailable"
        );
      }
    }
  }
  _teardownForecast() {
    this._unsubForecast && (this._unsubForecast(), this._unsubForecast = void 0);
  }
  _pushError(t) {
    this._errors.includes(t) || (this._errors = [...this._errors, t].slice(-4));
  }
  async _onManualRefresh(t) {
    if (t.stopPropagation(), !this._refreshing) {
      this._refreshing = !0, ft(this._cacheKey());
      try {
        await this._refreshData(!0, !0);
      } finally {
        this._refreshing = !1;
      }
    }
  }
  async _onSpeak(t) {
    if (t.stopPropagation(), !(!this._summary || this._summarySource === "loading")) {
      if (this._speaking) {
        we(), this._speaking = !1;
        return;
      }
      Kn(), this._speaking = !0;
      try {
        await Vn({
          hass: this.hass,
          text: nn(this._summary),
          // Engine locale catalog; spoken language comes from the text.
          language: "en",
          ttsEntity: this._config.tts_entity,
          mediaPlayer: this._config.tts_media_player
        });
      } catch (e) {
        const n = e instanceof Error || typeof e == "object" && e && "message" in e && typeof e.message == "string" ? e.message : "TTS failed";
        this._pushError(`TTS: ${n}`);
      } finally {
        this._speaking = !1;
      }
    }
  }
  _onKeepAwake(t) {
    if (t.stopPropagation(), this._keepAwakeOn) {
      this._keepAwake.stop(), this._keepAwakeOn = !1;
      return;
    }
    this._keepAwakeOn = this._keepAwake.start();
  }
  async _refreshData(t, e = !1) {
    var c, h;
    if (!this.hass || !this._config)
      return;
    const n = ++this._fetchGeneration, i = [];
    this._loadingEvents = !0, this._syncWeatherFromHass(), this._syncEntitiesFromHass();
    const s = this._config.calendars ?? [], a = this._config.horizon_hours ?? ge, { events: r, errors: o } = await Gt(
      this.hass,
      s,
      a
    );
    if (n === this._fetchGeneration) {
      this._events = r, i.push(...o), this._loadingEvents = !1, this._config.weather_entity ? this.hass.states[this._config.weather_entity] || i.push(
        f((c = this.hass.locale) == null ? void 0 : c.language, "weather_missing", {
          id: this._config.weather_entity
        })
      ) : i.push("No weather_entity configured");
      for (const d of this._config.entities ?? [])
        this.hass.states[d] || i.push(
          f((h = this.hass.locale) == null ? void 0 : h.language, "entity_missing", { id: d })
        );
      this._errors = [...new Set(i)].slice(-6), await this._refreshSummary(t, e);
    }
  }
  async _refreshSummary(t, e = !1) {
    var c;
    if (!this.hass || !this._config)
      return;
    const n = this._config.summary_mode ?? _e, i = this._config.cache_minutes ?? qe, s = ((c = this.hass.locale) == null ? void 0 : c.language) ?? "en", a = this.hass.config.time_zone, r = Wn({
      weather: this._weather,
      forecast: this._forecast,
      events: this._events,
      entities: this._entities,
      birthdays: this._config.birthdays,
      schedules: this._config.schedules,
      now: /* @__PURE__ */ new Date(),
      locale: s,
      timeZone: a,
      summaryPrompt: this._config.summary_prompt,
      contextNotes: this._config.context_notes
    }), o = this._cacheKey();
    (t || e || !this._summary || this._summarySource === "loading") && (this._summarySource = "loading");
    try {
      const h = await Bn({
        hass: this.hass,
        mode: n,
        agentId: this._config.agent_id,
        digest: r,
        cacheKey: o,
        cacheMinutes: i,
        force: e
      });
      this._summary = h.text, this._summarySource = h.source;
    } catch {
      this._summary = r.local, this._summarySource = "local";
    }
  }
  _dayTitle() {
    var n, i, s;
    if (this._config.title)
      return this._config.title;
    const t = ((i = (n = this.hass) == null ? void 0 : n.locale) == null ? void 0 : i.language) ?? "en", e = (s = this.hass) == null ? void 0 : s.config.time_zone;
    return new Intl.DateTimeFormat(t, {
      weekday: "long",
      month: "long",
      day: "numeric",
      timeZone: e
    }).format(this._now);
  }
  _forecastLabel(t) {
    var a;
    if (!t.datetime)
      return "";
    const e = ((a = this.hass.locale) == null ? void 0 : a.language) ?? "en", n = this.hass.config.time_zone, i = this._config.forecast_type ?? fe, s = new Date(t.datetime);
    return i === "hourly" ? new Intl.DateTimeFormat(e, {
      hour: "numeric",
      timeZone: n
    }).format(s) : new Intl.DateTimeFormat(e, {
      weekday: "short",
      timeZone: n
    }).format(s);
  }
  render() {
    var i, s, a;
    if (!this._config)
      return g;
    const t = ((s = (i = this.hass) == null ? void 0 : i.locale) == null ? void 0 : s.language) ?? "en", e = ((a = this.hass) == null ? void 0 : a.config.time_zone) ?? "UTC", n = this._weather;
    return m`
      <ha-card>
        <div class="header">
          <div class="header-row">
            <div>
              <p class="eyebrow">${f(t, "today")}</p>
              <h2 class="title">${this._dayTitle()}</h2>
              <p class="clock" aria-live="polite">${this._clockLabel()}</p>
            </div>
            <div class="header-actions">
              <button
                class="icon-btn"
                type="button"
                title=${f(t, "refresh")}
                aria-label=${f(t, "refresh")}
                ?disabled=${this._refreshing}
                @click=${this._onManualRefresh}
              >
                <span class=${this._refreshing ? "spin" : ""}>↻</span>
              </button>
              <button
                class="icon-btn ${this._speaking ? "active" : ""}"
                type="button"
                title=${f(t, "speak")}
                aria-label=${f(t, "speak")}
                ?disabled=${!this._summary || this._summarySource === "loading"}
                @click=${this._onSpeak}
              >
                ♪
              </button>
            </div>
          </div>
        </div>

        <div
          class="brief ${this._summarySource === "loading" || this._refreshing ? "loading" : ""}"
        >
          ${this._summarySource === "loading" && !this._summary ? f(t, "preparing") : sn(this._summary)}
        </div>

        <div class="split">
          <section class="panel">
            <h3 class="section-title">${f(t, "weather")}</h3>
            ${n ? m`
                  <div class="weather-hero">
                    <div>
                      <p class="condition">
                        ${je(n.condition, t)}
                      </p>
                      <p class="weather-place">
                        ${n.friendly_name ?? n.entity_id}
                      </p>
                    </div>
                    <p class="temp">
                      ${re(
      n.temperature,
      n.temperature_unit
    )}
                    </p>
                  </div>
                  ${typeof n.humidity == "number" || typeof n.wind_speed == "number" ? m`
                        <div class="chips">
                          ${typeof n.humidity == "number" ? m`<span class="chip"
                                >${n.humidity}%
                                ${f(t, "humidity")}</span
                              >` : g}
                          ${typeof n.wind_speed == "number" ? m`<span class="chip"
                                >${n.wind_speed}
                                ${n.wind_speed_unit ?? ""}</span
                              >` : g}
                        </div>
                      ` : g}
                  ${this._forecast.length ? m`
                        <div class="forecast">
                          ${this._forecast.map(
      (r) => m`
                              <div class="forecast-item">
                                <span class="forecast-day"
                                  >${this._forecastLabel(r)}</span
                                >
                                <span class="forecast-temp"
                                  >${re(
        r.temperature,
        n.temperature_unit
      )}</span
                                >
                                <span class="forecast-cond"
                                  >${je(
        r.condition ?? "",
        t
      )}</span
                                >
                              </div>
                            `
    )}
                        </div>
                      ` : g}
                ` : m`<p class="empty">${f(t, "configure_weather")}</p>`}
          </section>

          <section class="panel">
            <h3 class="section-title">${f(t, "calendar")}</h3>
            ${this._loadingEvents && this._events.length === 0 ? m`<p class="empty loading">${f(t, "loading_calendars")}</p>` : this._events.length === 0 ? m`<p class="empty">
                    ${f(t, "no_events", {
      hours: this._config.horizon_hours ?? ge
    })}
                  </p>` : m`
                    <ul class="events">
                      ${qt(
      this._events,
      t,
      e,
      /* @__PURE__ */ new Date()
    ).map(
      (r) => m`
                          <li class="event-day" aria-label=${r.label}>
                            <p class="event-day-label">${r.label}</p>
                            <ul class="event-day-list">
                              ${r.events.map(
        (o) => m`
                                  <li class="event">
                                    <span class="event-time"
                                      >${Jt(
          o,
          t,
          e
        )}</span
                                    >
                                    <div class="event-body">
                                      <p class="event-title">
                                        ${o.summary}
                                      </p>
                                      ${o.calendar_name ? m`<p class="event-cal">
                                            ${o.calendar_name}${o.location ? ` · ${o.location}` : ""}
                                          </p>` : g}
                                    </div>
                                  </li>
                                `
      )}
                            </ul>
                          </li>
                        `
    )}
                    </ul>
                  `}
          </section>
        </div>

        ${(this._config.cameras ?? []).length ? m`
              <section class="cameras">
                <h3 class="section-title">${f(t, "cameras")}</h3>
                <div class="camera-grid">
                  ${(this._config.cameras ?? []).map((r) => {
      var d;
      const o = this._cameraMode[r] ?? "stream", c = (d = this.hass) == null ? void 0 : d.states[r], h = o === "still" ? this._cameraStillSrc(r) : this._cameraStreamSrc(r);
      return m`
                      <button
                        class="camera-tile"
                        type="button"
                        @click=${() => this._openMoreInfo(r)}
                      >
                        ${o !== "error" && h ? m`
                              <img
                                class="camera-feed"
                                src=${h}
                                alt=${this._cameraName(r)}
                                @error=${() => this._onCameraError(r)}
                              />
                              <span class="camera-badge"
                                >${o === "still" ? f(t, "camera_snapshot") : f(t, "camera_live")}</span
                              >
                            ` : m`<div class="camera-missing">
                              ${f(t, "no_feed")}${c != null && c.state ? ` · ${c.state}` : ""}
                            </div>`}
                        <span class="camera-label"
                          >${this._cameraName(r)}</span
                        >
                      </button>
                    `;
    })}
                </div>
              </section>
            ` : g}

        ${this._config.mic_test ? m`
              <section class="panel mic-panel">
                <h3 class="section-title">${f(t, "mic_test")}</h3>
                <div class="mic-row">
                  <button class="mic-btn" type="button" @click=${this._onMicToggle}>
                    ${this._micStatus === "listening" ? f(t, "mic_stop") : f(t, "mic_start")}
                  </button>
                  <div
                    class="mic-level"
                    role="meter"
                    aria-label=${f(t, "mic_test")}
                  >
                    <div
                      class="mic-level-fill"
                      style=${`width: ${Math.round(this._micLevel * 100)}%`}
                    ></div>
                  </div>
                </div>
                ${this._micStatus !== "idle" ? m`<p class="mic-status ${this._micStatus}">
                      ${this._micStatusText(t)}
                    </p>` : g}
              </section>
            ` : g}

        ${this._entities.length ? m`
              <section class="context">
                <button
                  class="context-toggle"
                  type="button"
                  aria-expanded=${this._contextOpen ? "true" : "false"}
                  @click=${() => {
      this._contextOpen = !this._contextOpen;
    }}
                >
                  <span class="section-title">${f(t, "context")}</span>
                  <span class="context-meta"
                    >${this._entities.length}
                    ${this._entities.length === 1 ? f(t, "entity") : f(t, "entities")}</span
                  >
                  <span class="context-chevron" aria-hidden="true"
                    >${this._contextOpen ? "▾" : "▸"}</span
                  >
                </button>
                ${this._contextOpen ? m`
                      <ul class="entity-list">
                        ${this._entities.map(
      (r) => m`
                            <li class="entity-row">
                              <span class="entity-name">${r.name}</span>
                              <span class="entity-state">${r.state}</span>
                            </li>
                          `
    )}
                      </ul>
                    ` : g}
              </section>
            ` : g}

        ${this._errors.length ? m`
              <div class="errors">
                ${this._errors.map(
      (r) => m`<span class="error-chip">${r}</span>`
    )}
              </div>
            ` : g}

        ${this._config.keep_awake !== !1 ? m`
              <div class="footer-bar">
                <button
                  class="keep-awake ${this._keepAwakeOn ? "on" : ""}"
                  type="button"
                  title=${this._keepAwakeOn ? "Keep-awake active (tap to stop)" : "Tap once to keep Echo Show / Silk open"}
                  @click=${this._onKeepAwake}
                >
                  <span class="keep-dot"></span>
                  <span
                    >${this._keepAwakeOn ? f(t, "keep_awake_on") : f(t, "keep_awake")}</span
                  >
                </button>
              </div>
            ` : g}
      </ha-card>
    `;
  }
};
w.styles = qn;
v([
  Ae({ attribute: !1 })
], w.prototype, "hass", 2);
v([
  x()
], w.prototype, "_config", 2);
v([
  x()
], w.prototype, "_weather", 2);
v([
  x()
], w.prototype, "_forecast", 2);
v([
  x()
], w.prototype, "_events", 2);
v([
  x()
], w.prototype, "_entities", 2);
v([
  x()
], w.prototype, "_summary", 2);
v([
  x()
], w.prototype, "_summarySource", 2);
v([
  x()
], w.prototype, "_errors", 2);
v([
  x()
], w.prototype, "_loadingEvents", 2);
v([
  x()
], w.prototype, "_refreshing", 2);
v([
  x()
], w.prototype, "_contextOpen", 2);
v([
  x()
], w.prototype, "_now", 2);
v([
  x()
], w.prototype, "_speaking", 2);
v([
  x()
], w.prototype, "_keepAwakeOn", 2);
v([
  x()
], w.prototype, "_cameraMode", 2);
v([
  x()
], w.prototype, "_cameraTick", 2);
v([
  x()
], w.prototype, "_micStatus", 2);
v([
  x()
], w.prototype, "_micDevice", 2);
v([
  x()
], w.prototype, "_micLevel", 2);
w = v([
  it(rt)
], w);
window.customCards = window.customCards || [];
window.customCards.push({
  type: rt,
  name: st,
  description: "AI-first day brief with weather, calendars, extra entities, and a short narrative.",
  preview: !0,
  documentationURL: "https://github.com/jenskock/lovelace-day-brief"
});
console.info(
  `%c ${st} %c ${Bt} `,
  "color:#fff;background:#03a9f4;font-weight:700",
  "color:#03a9f4;background:transparent;font-weight:700"
);
var Xn = Object.defineProperty, ei = Object.getOwnPropertyDescriptor, ke = (t, e, n, i) => {
  for (var s = i > 1 ? void 0 : i ? ei(e, n) : e, a = t.length - 1, r; a >= 0; a--)
    (r = t[a]) && (s = (i ? r(e, n, s) : r(s)) || s);
  return i && s && Xn(e, n, s), s;
};
const ti = [
  "daily",
  "hourly",
  "twice_daily",
  "none"
], ni = ["auto", "ai", "local"];
function ii(t, e) {
  t.dispatchEvent(
    new CustomEvent("config-changed", {
      detail: { config: e },
      bubbles: !0,
      composed: !0
    })
  );
}
function ye(t) {
  return [
    ...new Set(
      t.split(/[\n,]/).map((e) => e.trim()).filter(Boolean)
    )
  ];
}
let j = class extends I {
  setConfig(t) {
    this._config = {
      ...t,
      calendars: [...t.calendars ?? []],
      entities: [...t.entities ?? []],
      cameras: [...t.cameras ?? []],
      birthdays: [...t.birthdays ?? []]
    };
  }
  _update(t) {
    if (!this._config)
      return;
    const e = {
      ...this._config,
      ...t
    };
    this._config = e, ii(this, e);
  }
  _value(t) {
    return t.target.value;
  }
  _onWeather(t) {
    this._update({ weather_entity: this._value(t) || void 0 });
  }
  _onCalendars(t) {
    this._update({ calendars: ye(this._value(t)) });
  }
  _onEntities(t) {
    this._update({ entities: ye(this._value(t)) });
  }
  _onCameras(t) {
    this._update({ cameras: ye(this._value(t)) });
  }
  _onForecast(t) {
    this._update({ forecast_type: this._value(t) });
  }
  _onHorizon(t) {
    const e = Number(this._value(t));
    this._update({
      horizon_hours: Number.isFinite(e) && e > 0 ? e : 24
    });
  }
  _onAgent(t) {
    this._update({ agent_id: this._value(t) || void 0 });
  }
  _onMode(t) {
    this._update({ summary_mode: this._value(t) });
  }
  _onPrompt(t) {
    const e = this._value(t).trim();
    this._update({ summary_prompt: e || void 0 });
  }
  _onContextNotes(t) {
    const e = this._value(t).trim();
    this._update({ context_notes: e || void 0 });
  }
  _onBirthdays(t) {
    const e = mn(this._value(t));
    this._update({ birthdays: e.length ? e : void 0 });
  }
  _onCache(t) {
    const e = Number(this._value(t));
    this._update({
      cache_minutes: Number.isFinite(e) && e > 0 ? e : 30
    });
  }
  _onTitle(t) {
    this._update({ title: this._value(t) || void 0 });
  }
  _onTtsEntity(t) {
    this._update({ tts_entity: this._value(t) || void 0 });
  }
  _onTtsMediaPlayer(t) {
    this._update({ tts_media_player: this._value(t) || void 0 });
  }
  _onKeepAwake(t) {
    const e = t.target.checked;
    this._update({ keep_awake: e });
  }
  _onMicTest(t) {
    const e = t.target.checked;
    this._update({ mic_test: e });
  }
  _weatherEntities() {
    return this.hass ? Object.keys(this.hass.states).filter((t) => t.startsWith("weather.")).sort() : [];
  }
  _calendarEntities() {
    return this.hass ? Object.keys(this.hass.states).filter((t) => t.startsWith("calendar.")).sort() : [];
  }
  _toggleCalendar(t) {
    const e = new Set(this._config.calendars ?? []);
    e.has(t) ? e.delete(t) : e.add(t), this._update({ calendars: [...e].sort() });
  }
  render() {
    if (!this._config)
      return g;
    const t = this._config.calendars ?? [], e = this._config.entities ?? [], n = this._weatherEntities(), i = this._calendarEntities();
    return m`
      <div class="form">
        <label>
          Title
          <input
            type="text"
            .value=${this._config.title ?? ""}
            placeholder="Day Brief"
            @change=${this._onTitle}
          />
        </label>

        <label>
          Weather entity
          <select
            .value=${this._config.weather_entity ?? ""}
            @change=${this._onWeather}
          >
            <option value="">Select weather…</option>
            ${n.map(
      (s) => m`<option
                  value=${s}
                  ?selected=${s === this._config.weather_entity}
                >
                  ${s}
                </option>`
    )}
          </select>
        </label>

        <fieldset>
          <legend>Calendars</legend>
          ${i.length === 0 ? m`
                <textarea
                  rows="3"
                  placeholder="calendar.personal, calendar.work"
                  .value=${t.join(`
`)}
                  @change=${this._onCalendars}
                ></textarea>
              ` : m`
                <div class="checks">
                  ${i.map(
      (s) => m`
                      <label class="check">
                        <input
                          type="checkbox"
                          .checked=${t.includes(s)}
                          @change=${() => this._toggleCalendar(s)}
                        />
                        <span>${s}</span>
                      </label>
                    `
    )}
                </div>
              `}
        </fieldset>

        <label>
          Extra entities
          <textarea
            rows="4"
            placeholder="person.alex&#10;sensor.trash&#10;binary_sensor.window"
            .value=${e.join(`
`)}
            @change=${this._onEntities}
          ></textarea>
          <span class="hint"
            >One entity per line. Included in the brief and shown under
            Context.</span
          >
        </label>

        <label>
          Cameras
          <textarea
            rows="4"
            placeholder="camera.front_door&#10;camera.driveway&#10;camera.garden&#10;camera.garage"
            .value=${(this._config.cameras ?? []).join(`
`)}
            @change=${this._onCameras}
          ></textarea>
          <span class="hint"
            >Live feeds at the bottom (2×2 / 4 across on wide screens). Falls back
            to refreshed snapshots when a camera has no stream.</span
          >
        </label>

        <label>
          Forecast type
          <select
            .value=${this._config.forecast_type ?? "daily"}
            @change=${this._onForecast}
          >
            ${ti.map(
      (s) => m`<option
                  value=${s}
                  ?selected=${(this._config.forecast_type ?? "daily") === s}
                >
                  ${s}
                </option>`
    )}
          </select>
        </label>

        <label>
          Horizon hours
          <input
            type="number"
            min="1"
            max="168"
            .value=${String(this._config.horizon_hours ?? 24)}
            @change=${this._onHorizon}
          />
        </label>

        <label>
          Conversation agent id
          <input
            type="text"
            .value=${this._config.agent_id ?? ""}
            placeholder="conversation.openai"
            @change=${this._onAgent}
          />
        </label>

        <label>
          Summary mode
          <select
            .value=${this._config.summary_mode ?? "auto"}
            @change=${this._onMode}
          >
            ${ni.map(
      (s) => m`<option
                  value=${s}
                  ?selected=${(this._config.summary_mode ?? "auto") === s}
                >
                  ${s}
                </option>`
    )}
          </select>
        </label>

        <label>
          Household / context notes
          <textarea
            rows="3"
            placeholder="Family members, pets, school notes…"
            .value=${this._config.context_notes ?? ""}
            @change=${this._onContextNotes}
          ></textarea>
        </label>

        <label>
          Birthdays
          <textarea
            rows="3"
            placeholder="Alex: 1990-04-30&#10;Sam: 2018-12-28"
            .value=${fn(this._config.birthdays ?? [])}
            @change=${this._onBirthdays}
          ></textarea>
          <span class="hint">One per line: Name: YYYY-MM-DD</span>
        </label>

        <label>
          System prompt
          <textarea
            rows="5"
            placeholder=${ot}
            .value=${this._config.summary_prompt ?? ""}
            @change=${this._onPrompt}
          ></textarea>
          <span class="hint"
            >Leer = starkes deutsches Standard-Prompt. Wetter, Vorhersage,
            Termine, Solar, Müll und Entities werden strukturiert
            angehängt.</span
          >
        </label>

        <label>
          Cache minutes
          <input
            type="number"
            min="1"
            max="1440"
            .value=${String(this._config.cache_minutes ?? 30)}
            @change=${this._onCache}
          />
        </label>

        <label>
          TTS engine entity
          <input
            type="text"
            .value=${this._config.tts_entity ?? ""}
            placeholder="tts.openai_tts_gpt_4o_mini_tts"
            @change=${this._onTtsEntity}
          />
          <span class="hint"
            >Use OpenAI TTS (HACS) via Requesty for best quality. Empty =
            browser speech.</span
          >
        </label>

        <label>
          Also play on media_player (optional)
          <input
            type="text"
            .value=${this._config.tts_media_player ?? ""}
            placeholder="media_player.sonos_wohnzimmer"
            @change=${this._onTtsMediaPlayer}
          />
        </label>

        <label class="check">
          <input
            type="checkbox"
            .checked=${this._config.keep_awake !== !1}
            @change=${this._onKeepAwake}
          />
          <span>Show Echo keep-awake control</span>
        </label>

        <label class="check">
          <input
            type="checkbox"
            .checked=${this._config.mic_test === !0}
            @change=${this._onMicTest}
          />
          <span>Show microphone test panel</span>
        </label>
      </div>
    `;
  }
};
j.styles = Qe`
    .form {
      display: grid;
      gap: 14px;
      padding: 4px 0 12px;
    }

    label,
    fieldset {
      display: grid;
      gap: 6px;
      font-size: 0.85rem;
      color: var(--primary-text-color);
    }

    fieldset {
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 8px;
      padding: 10px 12px;
      margin: 0;
    }

    legend {
      padding: 0 4px;
      color: var(--secondary-text-color);
    }

    .hint {
      font-size: 0.75rem;
      color: var(--secondary-text-color);
    }

    input,
    select,
    textarea {
      width: 100%;
      box-sizing: border-box;
      padding: 8px 10px;
      border-radius: 8px;
      border: 1px solid var(--divider-color, #cfcfcf);
      background: var(--card-background-color, #fff);
      color: var(--primary-text-color);
      font: inherit;
    }

    textarea {
      resize: vertical;
      font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
      font-size: 0.8rem;
      line-height: 1.4;
    }

    .checks {
      display: grid;
      gap: 6px;
      max-height: 180px;
      overflow: auto;
    }

    .check {
      display: flex;
      align-items: center;
      gap: 8px;
      grid-template-columns: none;
    }

    .check input {
      width: auto;
    }
  `;
ke([
  Ae({ attribute: !1 })
], j.prototype, "hass", 2);
ke([
  x()
], j.prototype, "_config", 2);
j = ke([
  it(at)
], j);
const si = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get DayBriefCardEditor() {
    return j;
  }
}, Symbol.toStringTag, { value: "Module" }));
export {
  w as DayBriefCard
};
//# sourceMappingURL=day-brief.js.map
