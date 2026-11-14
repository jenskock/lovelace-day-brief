/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const W = globalThis, te = W.ShadowRoot && (W.ShadyCSS === void 0 || W.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, se = Symbol(), le = /* @__PURE__ */ new WeakMap();
let Ae = class {
  constructor(e, s, i) {
    if (this._$cssResult$ = !0, i !== se) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = s;
  }
  get styleSheet() {
    let e = this.o;
    const s = this.t;
    if (te && e === void 0) {
      const i = s !== void 0 && s.length === 1;
      i && (e = le.get(s)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), i && le.set(s, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const We = (t) => new Ae(typeof t == "string" ? t : t + "", void 0, se), Se = (t, ...e) => {
  const s = t.length === 1 ? t[0] : e.reduce((i, n, a) => i + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n) + t[a + 1], t[0]);
  return new Ae(s, t, se);
}, Ie = (t, e) => {
  if (te) t.adoptedStyleSheets = e.map((s) => s instanceof CSSStyleSheet ? s : s.styleSheet);
  else for (const s of e) {
    const i = document.createElement("style"), n = W.litNonce;
    n !== void 0 && i.setAttribute("nonce", n), i.textContent = s.cssText, t.appendChild(i);
  }
}, ce = te ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let s = "";
  for (const i of e.cssRules) s += i.cssText;
  return We(s);
})(t) : t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Be, defineProperty: Ke, getOwnPropertyDescriptor: Ge, getOwnPropertyNames: Ve, getOwnPropertySymbols: Ze, getPrototypeOf: qe } = Object, x = globalThis, he = x.trustedTypes, Je = he ? he.emptyScript : "", G = x.reactiveElementPolyfillSupport, R = (t, e) => t, I = { toAttribute(t, e) {
  switch (e) {
    case Boolean:
      t = t ? Je : null;
      break;
    case Object:
    case Array:
      t = t == null ? t : JSON.stringify(t);
  }
  return t;
}, fromAttribute(t, e) {
  let s = t;
  switch (e) {
    case Boolean:
      s = t !== null;
      break;
    case Number:
      s = t === null ? null : Number(t);
      break;
    case Object:
    case Array:
      try {
        s = JSON.parse(t);
      } catch {
        s = null;
      }
  }
  return s;
} }, ie = (t, e) => !Be(t, e), ue = { attribute: !0, type: String, converter: I, reflect: !1, useDefault: !1, hasChanged: ie };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), x.litPropertyMetadata ?? (x.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let T = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, s = ue) {
    if (s.state && (s.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((s = Object.create(s)).wrapped = !0), this.elementProperties.set(e, s), !s.noAccessor) {
      const i = Symbol(), n = this.getPropertyDescriptor(e, i, s);
      n !== void 0 && Ke(this.prototype, e, n);
    }
  }
  static getPropertyDescriptor(e, s, i) {
    const { get: n, set: a } = Ge(this.prototype, e) ?? { get() {
      return this[s];
    }, set(r) {
      this[s] = r;
    } };
    return { get: n, set(r) {
      const l = n == null ? void 0 : n.call(this);
      a == null || a.call(this, r), this.requestUpdate(e, l, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? ue;
  }
  static _$Ei() {
    if (this.hasOwnProperty(R("elementProperties"))) return;
    const e = qe(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(R("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(R("properties"))) {
      const s = this.properties, i = [...Ve(s), ...Ze(s)];
      for (const n of i) this.createProperty(n, s[n]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const s = litPropertyMetadata.get(e);
      if (s !== void 0) for (const [i, n] of s) this.elementProperties.set(i, n);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [s, i] of this.elementProperties) {
      const n = this._$Eu(s, i);
      n !== void 0 && this._$Eh.set(n, s);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const s = [];
    if (Array.isArray(e)) {
      const i = new Set(e.flat(1 / 0).reverse());
      for (const n of i) s.unshift(ce(n));
    } else e !== void 0 && s.push(ce(e));
    return s;
  }
  static _$Eu(e, s) {
    const i = s.attribute;
    return i === !1 ? void 0 : typeof i == "string" ? i : typeof e == "string" ? e.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var e;
    this._$ES = new Promise((s) => this.enableUpdating = s), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (e = this.constructor.l) == null || e.forEach((s) => s(this));
  }
  addController(e) {
    var s;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(e), this.renderRoot !== void 0 && this.isConnected && ((s = e.hostConnected) == null || s.call(e));
  }
  removeController(e) {
    var s;
    (s = this._$EO) == null || s.delete(e);
  }
  _$E_() {
    const e = /* @__PURE__ */ new Map(), s = this.constructor.elementProperties;
    for (const i of s.keys()) this.hasOwnProperty(i) && (e.set(i, this[i]), delete this[i]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Ie(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    var e;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (e = this._$EO) == null || e.forEach((s) => {
      var i;
      return (i = s.hostConnected) == null ? void 0 : i.call(s);
    });
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    var e;
    (e = this._$EO) == null || e.forEach((s) => {
      var i;
      return (i = s.hostDisconnected) == null ? void 0 : i.call(s);
    });
  }
  attributeChangedCallback(e, s, i) {
    this._$AK(e, i);
  }
  _$ET(e, s) {
    var a;
    const i = this.constructor.elementProperties.get(e), n = this.constructor._$Eu(e, i);
    if (n !== void 0 && i.reflect === !0) {
      const r = (((a = i.converter) == null ? void 0 : a.toAttribute) !== void 0 ? i.converter : I).toAttribute(s, i.type);
      this._$Em = e, r == null ? this.removeAttribute(n) : this.setAttribute(n, r), this._$Em = null;
    }
  }
  _$AK(e, s) {
    var a, r;
    const i = this.constructor, n = i._$Eh.get(e);
    if (n !== void 0 && this._$Em !== n) {
      const l = i.getPropertyOptions(n), o = typeof l.converter == "function" ? { fromAttribute: l.converter } : ((a = l.converter) == null ? void 0 : a.fromAttribute) !== void 0 ? l.converter : I;
      this._$Em = n;
      const c = o.fromAttribute(s, l.type);
      this[n] = c ?? ((r = this._$Ej) == null ? void 0 : r.get(n)) ?? c, this._$Em = null;
    }
  }
  requestUpdate(e, s, i, n = !1, a) {
    var r;
    if (e !== void 0) {
      const l = this.constructor;
      if (n === !1 && (a = this[e]), i ?? (i = l.getPropertyOptions(e)), !((i.hasChanged ?? ie)(a, s) || i.useDefault && i.reflect && a === ((r = this._$Ej) == null ? void 0 : r.get(e)) && !this.hasAttribute(l._$Eu(e, i)))) return;
      this.C(e, s, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, s, { useDefault: i, reflect: n, wrapped: a }, r) {
    i && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(e) && (this._$Ej.set(e, r ?? s ?? this[e]), a !== !0 || r !== void 0) || (this._$AL.has(e) || (this.hasUpdated || i || (s = void 0), this._$AL.set(e, s)), n === !0 && this._$Em !== e && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(e));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (s) {
      Promise.reject(s);
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
      const n = this.constructor.elementProperties;
      if (n.size > 0) for (const [a, r] of n) {
        const { wrapped: l } = r, o = this[a];
        l !== !0 || this._$AL.has(a) || o === void 0 || this.C(a, void 0, r, o);
      }
    }
    let e = !1;
    const s = this._$AL;
    try {
      e = this.shouldUpdate(s), e ? (this.willUpdate(s), (i = this._$EO) == null || i.forEach((n) => {
        var a;
        return (a = n.hostUpdate) == null ? void 0 : a.call(n);
      }), this.update(s)) : this._$EM();
    } catch (n) {
      throw e = !1, this._$EM(), n;
    }
    e && this._$AE(s);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    var s;
    (s = this._$EO) == null || s.forEach((i) => {
      var n;
      return (n = i.hostUpdated) == null ? void 0 : n.call(i);
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
    this._$Eq && (this._$Eq = this._$Eq.forEach((s) => this._$ET(s, this[s]))), this._$EM();
  }
  updated(e) {
  }
  firstUpdated(e) {
  }
};
T.elementStyles = [], T.shadowRootOptions = { mode: "open" }, T[R("elementProperties")] = /* @__PURE__ */ new Map(), T[R("finalized")] = /* @__PURE__ */ new Map(), G == null || G({ ReactiveElement: T }), (x.reactiveElementVersions ?? (x.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const M = globalThis, de = (t) => t, B = M.trustedTypes, pe = B ? B.createPolicy("lit-html", { createHTML: (t) => t }) : void 0, Ce = "$lit$", w = `lit$${Math.random().toFixed(9).slice(2)}$`, ke = "?" + w, Ye = `<${ke}>`, C = document, L = () => C.createComment(""), U = (t) => t === null || typeof t != "object" && typeof t != "function", ne = Array.isArray, Qe = (t) => ne(t) || typeof (t == null ? void 0 : t[Symbol.iterator]) == "function", V = `[ 	
\f\r]`, z = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, fe = /-->/g, me = />/g, E = RegExp(`>|${V}(?:([^\\s"'>=/]+)(${V}*=${V}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), _e = /'/g, ge = /"/g, Te = /^(?:script|style|textarea|title)$/i, Xe = (t) => (e, ...s) => ({ _$litType$: t, strings: e, values: s }), m = Xe(1), O = Symbol.for("lit-noChange"), f = Symbol.for("lit-nothing"), ye = /* @__PURE__ */ new WeakMap(), A = C.createTreeWalker(C, 129);
function Ne(t, e) {
  if (!ne(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return pe !== void 0 ? pe.createHTML(e) : e;
}
const et = (t, e) => {
  const s = t.length - 1, i = [];
  let n, a = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", r = z;
  for (let l = 0; l < s; l++) {
    const o = t[l];
    let c, h, u = -1, d = 0;
    for (; d < o.length && (r.lastIndex = d, h = r.exec(o), h !== null); ) d = r.lastIndex, r === z ? h[1] === "!--" ? r = fe : h[1] !== void 0 ? r = me : h[2] !== void 0 ? (Te.test(h[2]) && (n = RegExp("</" + h[2], "g")), r = E) : h[3] !== void 0 && (r = E) : r === E ? h[0] === ">" ? (r = n ?? z, u = -1) : h[1] === void 0 ? u = -2 : (u = r.lastIndex - h[2].length, c = h[1], r = h[3] === void 0 ? E : h[3] === '"' ? ge : _e) : r === ge || r === _e ? r = E : r === fe || r === me ? r = z : (r = E, n = void 0);
    const y = r === E && t[l + 1].startsWith("/>") ? " " : "";
    a += r === z ? o + Ye : u >= 0 ? (i.push(c), o.slice(0, u) + Ce + o.slice(u) + w + y) : o + w + (u === -2 ? l : y);
  }
  return [Ne(t, a + (t[s] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), i];
};
class H {
  constructor({ strings: e, _$litType$: s }, i) {
    let n;
    this.parts = [];
    let a = 0, r = 0;
    const l = e.length - 1, o = this.parts, [c, h] = et(e, s);
    if (this.el = H.createElement(c, i), A.currentNode = this.el.content, s === 2 || s === 3) {
      const u = this.el.content.firstChild;
      u.replaceWith(...u.childNodes);
    }
    for (; (n = A.nextNode()) !== null && o.length < l; ) {
      if (n.nodeType === 1) {
        if (n.hasAttributes()) for (const u of n.getAttributeNames()) if (u.endsWith(Ce)) {
          const d = h[r++], y = n.getAttribute(u).split(w), p = /([.?@])?(.*)/.exec(d);
          o.push({ type: 1, index: a, name: p[2], strings: y, ctor: p[1] === "." ? st : p[1] === "?" ? it : p[1] === "@" ? nt : K }), n.removeAttribute(u);
        } else u.startsWith(w) && (o.push({ type: 6, index: a }), n.removeAttribute(u));
        if (Te.test(n.tagName)) {
          const u = n.textContent.split(w), d = u.length - 1;
          if (d > 0) {
            n.textContent = B ? B.emptyScript : "";
            for (let y = 0; y < d; y++) n.append(u[y], L()), A.nextNode(), o.push({ type: 2, index: ++a });
            n.append(u[d], L());
          }
        }
      } else if (n.nodeType === 8) if (n.data === ke) o.push({ type: 2, index: a });
      else {
        let u = -1;
        for (; (u = n.data.indexOf(w, u + 1)) !== -1; ) o.push({ type: 7, index: a }), u += w.length - 1;
      }
      a++;
    }
  }
  static createElement(e, s) {
    const i = C.createElement("template");
    return i.innerHTML = e, i;
  }
}
function D(t, e, s = t, i) {
  var r, l;
  if (e === O) return e;
  let n = i !== void 0 ? (r = s._$Co) == null ? void 0 : r[i] : s._$Cl;
  const a = U(e) ? void 0 : e._$litDirective$;
  return (n == null ? void 0 : n.constructor) !== a && ((l = n == null ? void 0 : n._$AO) == null || l.call(n, !1), a === void 0 ? n = void 0 : (n = new a(t), n._$AT(t, s, i)), i !== void 0 ? (s._$Co ?? (s._$Co = []))[i] = n : s._$Cl = n), n !== void 0 && (e = D(t, n._$AS(t, e.values), n, i)), e;
}
class tt {
  constructor(e, s) {
    this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = s;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(e) {
    const { el: { content: s }, parts: i } = this._$AD, n = ((e == null ? void 0 : e.creationScope) ?? C).importNode(s, !0);
    A.currentNode = n;
    let a = A.nextNode(), r = 0, l = 0, o = i[0];
    for (; o !== void 0; ) {
      if (r === o.index) {
        let c;
        o.type === 2 ? c = new F(a, a.nextSibling, this, e) : o.type === 1 ? c = new o.ctor(a, o.name, o.strings, this, e) : o.type === 6 && (c = new rt(a, this, e)), this._$AV.push(c), o = i[++l];
      }
      r !== (o == null ? void 0 : o.index) && (a = A.nextNode(), r++);
    }
    return A.currentNode = C, n;
  }
  p(e) {
    let s = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(e, i, s), s += i.strings.length - 2) : i._$AI(e[s])), s++;
  }
}
class F {
  get _$AU() {
    var e;
    return ((e = this._$AM) == null ? void 0 : e._$AU) ?? this._$Cv;
  }
  constructor(e, s, i, n) {
    this.type = 2, this._$AH = f, this._$AN = void 0, this._$AA = e, this._$AB = s, this._$AM = i, this.options = n, this._$Cv = (n == null ? void 0 : n.isConnected) ?? !0;
  }
  get parentNode() {
    let e = this._$AA.parentNode;
    const s = this._$AM;
    return s !== void 0 && (e == null ? void 0 : e.nodeType) === 11 && (e = s.parentNode), e;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(e, s = this) {
    e = D(this, e, s), U(e) ? e === f || e == null || e === "" ? (this._$AH !== f && this._$AR(), this._$AH = f) : e !== this._$AH && e !== O && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : Qe(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== f && U(this._$AH) ? this._$AA.nextSibling.data = e : this.T(C.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var a;
    const { values: s, _$litType$: i } = e, n = typeof i == "number" ? this._$AC(e) : (i.el === void 0 && (i.el = H.createElement(Ne(i.h, i.h[0]), this.options)), i);
    if (((a = this._$AH) == null ? void 0 : a._$AD) === n) this._$AH.p(s);
    else {
      const r = new tt(n, this), l = r.u(this.options);
      r.p(s), this.T(l), this._$AH = r;
    }
  }
  _$AC(e) {
    let s = ye.get(e.strings);
    return s === void 0 && ye.set(e.strings, s = new H(e)), s;
  }
  k(e) {
    ne(this._$AH) || (this._$AH = [], this._$AR());
    const s = this._$AH;
    let i, n = 0;
    for (const a of e) n === s.length ? s.push(i = new F(this.O(L()), this.O(L()), this, this.options)) : i = s[n], i._$AI(a), n++;
    n < s.length && (this._$AR(i && i._$AB.nextSibling, n), s.length = n);
  }
  _$AR(e = this._$AA.nextSibling, s) {
    var i;
    for ((i = this._$AP) == null ? void 0 : i.call(this, !1, !0, s); e !== this._$AB; ) {
      const n = de(e).nextSibling;
      de(e).remove(), e = n;
    }
  }
  setConnected(e) {
    var s;
    this._$AM === void 0 && (this._$Cv = e, (s = this._$AP) == null || s.call(this, e));
  }
}
class K {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, s, i, n, a) {
    this.type = 1, this._$AH = f, this._$AN = void 0, this.element = e, this.name = s, this._$AM = n, this.options = a, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = f;
  }
  _$AI(e, s = this, i, n) {
    const a = this.strings;
    let r = !1;
    if (a === void 0) e = D(this, e, s, 0), r = !U(e) || e !== this._$AH && e !== O, r && (this._$AH = e);
    else {
      const l = e;
      let o, c;
      for (e = a[0], o = 0; o < a.length - 1; o++) c = D(this, l[i + o], s, o), c === O && (c = this._$AH[o]), r || (r = !U(c) || c !== this._$AH[o]), c === f ? e = f : e !== f && (e += (c ?? "") + a[o + 1]), this._$AH[o] = c;
    }
    r && !n && this.j(e);
  }
  j(e) {
    e === f ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class st extends K {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === f ? void 0 : e;
  }
}
class it extends K {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== f);
  }
}
class nt extends K {
  constructor(e, s, i, n, a) {
    super(e, s, i, n, a), this.type = 5;
  }
  _$AI(e, s = this) {
    if ((e = D(this, e, s, 0) ?? f) === O) return;
    const i = this._$AH, n = e === f && i !== f || e.capture !== i.capture || e.once !== i.once || e.passive !== i.passive, a = e !== f && (i === f || n);
    n && this.element.removeEventListener(this.name, this, i), a && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var s;
    typeof this._$AH == "function" ? this._$AH.call(((s = this.options) == null ? void 0 : s.host) ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class rt {
  constructor(e, s, i) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = s, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    D(this, e);
  }
}
const Z = M.litHtmlPolyfillSupport;
Z == null || Z(H, F), (M.litHtmlVersions ?? (M.litHtmlVersions = [])).push("3.3.3");
const at = (t, e, s) => {
  const i = (s == null ? void 0 : s.renderBefore) ?? e;
  let n = i._$litPart$;
  if (n === void 0) {
    const a = (s == null ? void 0 : s.renderBefore) ?? null;
    i._$litPart$ = n = new F(e.insertBefore(L(), a), a, void 0, s ?? {});
  }
  return n._$AI(t), n;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const S = globalThis;
class N extends T {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var s;
    const e = super.createRenderRoot();
    return (s = this.renderOptions).renderBefore ?? (s.renderBefore = e.firstChild), e;
  }
  update(e) {
    const s = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = at(s, this.renderRoot, this.renderOptions);
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
    return O;
  }
}
var Ee;
N._$litElement$ = !0, N.finalized = !0, (Ee = S.litElementHydrateSupport) == null || Ee.call(S, { LitElement: N });
const q = S.litElementPolyfillSupport;
q == null || q({ LitElement: N });
(S.litElementVersions ?? (S.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Oe = (t) => (e, s) => {
  s !== void 0 ? s.addInitializer(() => {
    customElements.define(t, e);
  }) : customElements.define(t, e);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ot = { attribute: !0, type: String, converter: I, reflect: !1, hasChanged: ie }, lt = (t = ot, e, s) => {
  const { kind: i, metadata: n } = s;
  let a = globalThis.litPropertyMetadata.get(n);
  if (a === void 0 && globalThis.litPropertyMetadata.set(n, a = /* @__PURE__ */ new Map()), i === "setter" && ((t = Object.create(t)).wrapped = !0), a.set(s.name, t), i === "accessor") {
    const { name: r } = s;
    return { set(l) {
      const o = e.get.call(this);
      e.set.call(this, l), this.requestUpdate(r, o, t, !0, l);
    }, init(l) {
      return l !== void 0 && this.C(r, void 0, t, l), l;
    } };
  }
  if (i === "setter") {
    const { name: r } = s;
    return function(l) {
      const o = this[r];
      e.call(this, l), this.requestUpdate(r, o, t, !0, l);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function re(t) {
  return (e, s) => typeof s == "object" ? lt(t, e, s) : ((i, n, a) => {
    const r = n.hasOwnProperty(a);
    return n.constructor.createProperty(a, i), r ? Object.getOwnPropertyDescriptor(n, a) : void 0;
  })(t, e, s);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function b(t) {
  return re({ ...t, state: !0, attribute: !1 });
}
const ct = "1.2.0", De = "Day Brief", Pe = "day-brief-card", ze = "day-brief-card-editor", Re = `
Du bist ein Home-Dashboard-Redakteur für einen Haushalt in Münster.

AUFGABE
Schreibe GENAU 2 bis 4 kurze Sätze auf Deutsch als Tagesbriefing.
Passe Ton und Inhalt an die Tageszeit an (Morgen / Vormittag / Nachmittag / Abend / Nacht).

MUSS enthalten (wenn Daten da sind)
1) Wetter in Alltagssprache + konkrete Kleidungsempfehlung
2) Wichtige Termine heute (nur Namen/Zeiten, keine Floskeln)
3) Solar kurz (Erzeugung/Verbrauch/Autarkie), falls Werte verfügbar
4) Müll/Abfall nur wenn relevant (z.B. Abholung bald oder heute)

DARF NICHT
- Englisch schreiben
- Geräte steuern, Tools aufrufen, Rückfragen stellen
- Entity-IDs, Rohzustände oder "Nicht verfügbar" wiederholen
- Lange Aufzählungen oder Bulletpoints
- Über Dinge spekulieren, die nicht in den DATEN stehen

STIL
Warm, klar, praktisch. Wie eine kurze Nachricht an die Familie.
`.trim();
function $e(t) {
  if (!t)
    return null;
  if (typeof t == "string") {
    const e = /^\d{4}-\d{2}-\d{2}$/.test(t);
    return { iso: t, allDay: e };
  }
  return t.dateTime ? { iso: t.dateTime, allDay: !1 } : t.date ? { iso: t.date, allDay: !0 } : null;
}
function ht(t, e) {
  var s, i, n;
  return ((i = (s = t.entities) == null ? void 0 : s[e]) == null ? void 0 : i.name) ?? (typeof ((n = t.states[e]) == null ? void 0 : n.attributes.friendly_name) == "string" ? t.states[e].attributes.friendly_name : e.replace(/^calendar\./, "").replace(/_/g, " "));
}
async function ut(t, e, s) {
  const i = [...new Set(e.filter(Boolean))];
  if (i.length === 0)
    return { events: [], errors: [] };
  const n = [];
  let a = {};
  try {
    const l = await t.callService(
      "calendar",
      "get_events",
      {
        duration: { hours: s }
      },
      { entity_id: i },
      !0,
      !0
    ), o = l && "response" in l ? l.response : void 0;
    o && typeof o == "object" && (a = o);
  } catch (l) {
    return n.push(
      l instanceof Error ? l.message : "Failed to load calendar events"
    ), { events: [], errors: n };
  }
  const r = [];
  for (const l of i) {
    const o = a[l];
    if (!o) {
      n.push(`No response for ${l}`);
      continue;
    }
    if (o.error) {
      n.push(`${l}: ${o.error}`);
      continue;
    }
    const c = ht(t, l);
    for (const h of o.events ?? []) {
      const u = $e(h.start), d = $e(h.end);
      !u || !d || r.push({
        summary: h.summary || "Busy",
        description: h.description,
        location: h.location,
        start: u.iso,
        end: d.iso,
        all_day: u.allDay || d.allDay,
        calendar_id: l,
        calendar_name: c
      });
    }
  }
  return r.sort((l, o) => l.start.localeCompare(o.start)), { events: r, errors: n };
}
function dt(t, e, s) {
  if (t.all_day)
    return "All day";
  const i = new Date(t.start);
  return Number.isNaN(i.getTime()) ? t.start : new Intl.DateTimeFormat(e, {
    hour: "numeric",
    minute: "2-digit",
    timeZone: s
  }).format(i);
}
function pt(t, e) {
  var s, i;
  return ((i = (s = t.entities) == null ? void 0 : s[e.entity_id]) == null ? void 0 : i.name) ?? (typeof e.attributes.friendly_name == "string" ? e.attributes.friendly_name : e.entity_id);
}
function ft(t, e) {
  if (t.formatEntityState)
    try {
      return t.formatEntityState(e);
    } catch {
    }
  const s = typeof e.attributes.unit_of_measurement == "string" ? e.attributes.unit_of_measurement : void 0;
  return s ? `${e.state} ${s}` : e.state;
}
function mt(t, e) {
  const s = [...new Set(e.filter(Boolean))], i = [], n = [];
  for (const a of s) {
    const r = t.states[a];
    if (!r) {
      n.push(a);
      continue;
    }
    i.push({
      entity_id: a,
      name: pt(t, r),
      state: ft(t, r),
      unit: typeof r.attributes.unit_of_measurement == "string" ? r.attributes.unit_of_measurement : void 0,
      domain: a.split(".")[0] ?? "unknown"
    });
  }
  return { entities: i, missing: n };
}
function _t(t, e) {
  var a, r, l;
  const s = t.states[e];
  if (!s)
    return null;
  const i = s.attributes, n = ((r = (a = t.entities) == null ? void 0 : a[e]) == null ? void 0 : r.name) ?? (typeof i.friendly_name == "string" ? i.friendly_name : e);
  return {
    entity_id: e,
    condition: s.state,
    temperature: typeof i.temperature == "number" ? i.temperature : void 0,
    temperature_unit: typeof i.temperature_unit == "string" ? i.temperature_unit : (l = t.config.unit_system) == null ? void 0 : l.temperature,
    humidity: typeof i.humidity == "number" ? i.humidity : void 0,
    wind_speed: typeof i.wind_speed == "number" ? i.wind_speed : void 0,
    wind_speed_unit: typeof i.wind_speed_unit == "string" ? i.wind_speed_unit : void 0,
    friendly_name: n,
    forecast: []
  };
}
async function gt(t, e, s, i) {
  const n = await t.connection.subscribeMessage(
    (a) => {
      i(Array.isArray(a.forecast) ? a.forecast : []);
    },
    {
      type: "weather/subscribe_forecast",
      entity_id: e,
      forecast_type: s
    }
  );
  return () => {
    n();
  };
}
function be(t) {
  return !t || t === "unknown" || t === "unavailable" ? "Weather unavailable" : t.replace(/_/g, " ");
}
function ee(t, e) {
  if (typeof t != "number" || Number.isNaN(t))
    return "—";
  const s = Number.isInteger(t) ? String(t) : t.toFixed(1);
  if (!e)
    return `${s}°`;
  const i = e.includes("°") ? e : `°${e}`;
  return `${s}${i}`;
}
function ve(t, e) {
  return t === e ? !1 : !t || !e ? !0 : t.state !== e.state || t.last_updated !== e.last_updated || t.attributes.temperature !== e.attributes.temperature || t.attributes.humidity !== e.attributes.humidity;
}
const j = /* @__PURE__ */ new Map(), yt = {
  "clear-night": "klar (Nacht)",
  cloudy: "bewölkt",
  fog: "neblig",
  hail: "Hagel",
  lightning: "Gewitter",
  "lightning-rainy": "Gewitterregen",
  partlycloudy: "teilweise bewölkt",
  pouring: "stark regnerisch",
  rainy: "regnerisch",
  snowy: "schneeig",
  "snowy-rainy": "Schneeregen",
  sunny: "sonnig",
  windy: "windig",
  "windy-variant": "windig und bewölkt",
  exceptional: "außergewöhnliches Wetter"
};
function $t(t) {
  let e = 0;
  for (let s = 0; s < t.length; s += 1)
    e = (e << 5) - e + t.charCodeAt(s), e |= 0;
  return String(e);
}
function bt(t) {
  return t.toLowerCase().startsWith("de");
}
function vt(t, e) {
  const s = Number(
    new Intl.DateTimeFormat("en-GB", {
      hour: "numeric",
      hour12: !1,
      timeZone: e
    }).format(t)
  );
  return s < 5 ? "nacht" : s < 10 ? "morgen" : s < 12 ? "vormittag" : s < 17 ? "nachmittag" : s < 22 ? "abend" : "nacht";
}
function wt(t, e) {
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
function xt(t, e) {
  return !t || t === "unknown" || t === "unavailable" ? e ? "Wetter unklar" : "Weather unavailable" : e ? yt[t] ?? t.replace(/_/g, " ") : t.replace(/_/g, " ");
}
function Et(t, e) {
  if (!t || typeof t.temperature != "number")
    return null;
  const s = t.temperature, i = ["rainy", "pouring", "snowy-rainy", "lightning-rainy"].includes(
    t.condition
  ), n = t.condition === "snowy";
  return e ? n ? "Winterkleidung und feste Schuhe" : s <= 3 ? i ? "dicke Jacke und Regenschutz" : "dicke Jacke" : s <= 10 ? i ? "warme Jacke und Regenschirm" : "warme Jacke" : s <= 16 ? i ? "Übergangsjacke und Schirm" : "Übergangsjacke" : s <= 22 ? i ? "leichte Jacke und Schirm" : "leichte Kleidung" : i ? "luftige Kleidung und Schirm" : "leichte sommerliche Kleidung" : n ? "winter clothes and sturdy shoes" : s <= 3 ? i ? "heavy coat and rain gear" : "heavy coat" : s <= 10 ? i ? "warm jacket and umbrella" : "warm jacket" : s <= 16 ? i ? "light jacket and umbrella" : "light jacket" : s <= 22 ? i ? "light layer and umbrella" : "light clothes" : i ? "summer clothes and umbrella" : "summer clothes";
}
function At(t) {
  const e = t.trim().toLowerCase();
  return e === "unavailable" || e === "unknown" || e === "none" || e === "nicht verfügbar" || e === "unbekannt";
}
function St(t) {
  const e = [], s = [], i = [], n = [], a = [], r = [];
  for (const l of t) {
    if (At(l.state))
      continue;
    const o = l.entity_id.toLowerCase(), c = l.name.toLowerCase();
    l.domain === "person" || o.startsWith("person.") ? e.push(l) : o.includes("abfall") || o.includes("muell") || o.includes("mull") || o.includes("trash") || c.includes("abfall") || c.includes("müll") || c.includes("tonne") ? i.push(l) : o.includes("solar") || o.includes("solaredge") || o.includes("autark") || o.includes("produziert") || o.includes("exportiert") || o.includes("verbrauch") || o.includes("power_production") || c.includes("solar") || c.includes("autark") || c.includes("leistung") ? s.push(l) : o.includes("sun_up") || o.includes("sun_down") || c.includes("sonnenaufgang") || c.includes("sonnenuntergang") ? n.push(l) : o.includes("warn") || c.includes("warn") || c.includes("warnung") ? a.push(l) : r.push(l);
  }
  return { people: e, solar: s, trash: i, sun: n, alerts: a, other: r };
}
function Ct(t, e) {
  const s = t.all_day ? e ? "ganztägig" : "all day" : t.start, i = t.calendar_name ? ` (${t.calendar_name})` : "";
  return `- ${s}: ${t.summary ?? (e ? "Belegt" : "Busy")}${i}`;
}
function k(t) {
  return `- ${t.name}: ${t.state}`;
}
function v(t, e, s) {
  return [`[${t}]`, e.length ? e.join(`
`) : s].join(`
`);
}
function kt(t) {
  var y;
  const {
    german: e,
    dayLabel: s,
    partLabel: i,
    weather: n,
    weatherLine: a,
    clothing: r,
    events: l,
    people: o,
    solar: c,
    trash: h,
    alerts: u
  } = t, d = [];
  if (e) {
    if (d.push(`Guten ${i} — ${s}.`), n && d.push(
      r ? `Draußen ${a}. Empfehlung: ${r}.` : `Draußen ${a}.`
    ), l.length === 0)
      d.push("Heute stehen keine Termine an.");
    else {
      const p = l.slice(0, 3).map((_) => _.summary).filter(Boolean).join(", ");
      d.push(
        l.length === 1 ? `Termin: ${p}.` : `${l.length} Termine, u.a. ${p}.`
      );
    }
    if (c.length && d.push(
      `Solar: ${c.slice(0, 3).map((p) => `${p.name} ${p.state}`).join(", ")}.`
    ), h.length && d.push(
      `Müll: ${h.map((p) => `${p.name} ${p.state}`).join(", ")}.`
    ), u.length) {
      const p = u.filter((_) => _.state !== "0" && _.state !== "ok");
      p.length && d.push(
        `Hinweis: ${p.map((_) => `${_.name} ${_.state}`).join(", ")}.`
      );
    }
    o.length && d.push(
      `Zuhause/Status: ${o.map((p) => `${p.name} ${p.state}`).join(", ")}.`
    );
  } else
    d.push(`Good ${i} — ${s}.`), n && d.push(
      r ? `Outside: ${a}. Wear: ${r}.` : `Outside: ${a}.`
    ), d.push(
      l.length === 0 ? "No meetings scheduled." : `${l.length} event(s), starting with ${((y = l[0]) == null ? void 0 : y.summary) ?? "Busy"}.`
    ), c.length && d.push(
      `Solar: ${c.slice(0, 3).map((p) => `${p.name} ${p.state}`).join(", ")}.`
    ), h.length && d.push(
      `Trash: ${h.map((p) => `${p.name} ${p.state}`).join(", ")}.`
    );
  return d.join(" ");
}
function Tt(t) {
  const {
    weather: e,
    events: s,
    entities: i,
    now: n,
    locale: a,
    timeZone: r,
    summaryPrompt: l
  } = t, o = bt(a), c = vt(n, r), h = wt(c, o), u = new Intl.DateTimeFormat(a, {
    weekday: "long",
    month: "long",
    day: "numeric",
    timeZone: r
  }).format(n), d = new Intl.DateTimeFormat(a, {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: r
  }).format(n), y = e ? `${xt(e.condition, o)}, ${ee(
    e.temperature,
    e.temperature_unit
  )}${typeof e.humidity == "number" ? o ? `, Luftfeuchtigkeit ${e.humidity}%` : `, humidity ${e.humidity}%` : ""}` : o ? "Wetter nicht verfügbar" : "Weather unavailable", p = Et(e, o), _ = St(i), Le = s.length === 0 ? [] : s.slice(0, 12).map((Fe) => Ct(Fe, o)), Ue = (l == null ? void 0 : l.trim()) || Re, He = [
    v(
      o ? "ZEIT" : "TIME",
      [
        o ? `Datum: ${u}` : `Date: ${u}`,
        o ? `Uhrzeit: ${d}` : `Time: ${d}`,
        o ? `Tageszeit: ${h}` : `Time of day: ${h}`
      ],
      ""
    ),
    v(
      o ? "WETTER" : "WEATHER",
      [
        y,
        p ? o ? `Kleidungshinweis: ${p}` : `Clothing hint: ${p}` : ""
      ].filter(Boolean),
      o ? "Keine Wetterdaten." : "No weather data."
    ),
    v(
      o ? "TERMINE" : "AGENDA",
      Le,
      o ? "Keine Termine." : "No meetings."
    ),
    v(
      o ? "PERSONEN" : "PEOPLE",
      _.people.map(k),
      o ? "Keine Personendaten." : "No people data."
    ),
    v(
      "SOLAR",
      _.solar.map(k),
      o ? "Keine Solarwerte (oder nicht verfügbar)." : "No solar data."
    ),
    v(
      o ? "MUELL" : "TRASH",
      _.trash.map(k),
      o ? "Keine Mülldaten." : "No trash data."
    ),
    v(
      o ? "SONNE" : "SUN",
      _.sun.map(k),
      o ? "Keine Sonnenzeiten." : "No sun times."
    ),
    v(
      o ? "WARNUNGEN" : "ALERTS",
      _.alerts.map(k),
      o ? "Keine Warnungen." : "No alerts."
    ),
    v(
      o ? "SONSTIGES" : "OTHER",
      _.other.map(k),
      o ? "Nichts weiteres." : "Nothing else."
    )
  ], oe = [
    Ue,
    "",
    o ? "DATEN (nur diese Fakten verwenden; fehlende/ungültige Werte weglassen):" : "DATA (use only these facts; skip missing/invalid values):",
    He.join(`

`),
    "",
    o ? "ANTWORT: Nur der fertige deutsche Fließtext, nichts sonst." : "RESPONSE: Only the finished brief text, nothing else."
  ].join(`
`), je = kt({
    german: o,
    dayLabel: u,
    partLabel: h,
    weather: e,
    weatherLine: y,
    clothing: p,
    events: s,
    people: _.people,
    solar: _.solar,
    trash: _.trash,
    alerts: _.alerts
  });
  return {
    hash: $t(oe),
    prompt: oe,
    local: je
  };
}
function Me(t) {
  if (!t) {
    j.clear();
    return;
  }
  j.delete(t);
}
function Nt(t, e) {
  const s = j.get(t);
  return s ? s.hash !== e || s.expiresAt < Date.now() ? (j.delete(t), null) : s : null;
}
function J(t, e, s, i, n) {
  j.set(t, {
    hash: e,
    text: s,
    source: i,
    expiresAt: Date.now() + Math.max(1, n) * 6e4
  });
}
async function Ot(t, e, s) {
  var a, r, l, o, c, h;
  const i = await t.callWS({
    type: "conversation/process",
    text: s,
    language: ((a = t.locale) == null ? void 0 : a.language) ?? t.config.language ?? "en",
    agent_id: e
  });
  return ((r = i.response) == null ? void 0 : r.response_type) === "error" ? null : ((h = (c = (o = (l = i.response) == null ? void 0 : l.speech) == null ? void 0 : o.plain) == null ? void 0 : c.speech) == null ? void 0 : h.trim()) || null;
}
async function Dt(t) {
  const { hass: e, mode: s, agentId: i, digest: n, cacheKey: a, cacheMinutes: r, force: l } = t;
  if (l)
    Me(a);
  else {
    const o = Nt(a, n.hash);
    if (o)
      return { text: o.text, source: o.source };
  }
  if (s === "local")
    return J(a, n.hash, n.local, "local", r), { text: n.local, source: "local" };
  try {
    const o = await Ot(e, i, n.prompt);
    if (o)
      return J(a, n.hash, o, "ai", r), { text: o, source: "ai" };
  } catch {
  }
  return J(a, n.hash, n.local, "local", r), { text: n.local, source: "local" };
}
const Pt = Se`
  :host {
    display: block;
  }

  ha-card {
    --day-brief-pad: 20px;
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
    margin-bottom: 16px;
  }

  .header-row {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 12px;
  }

  .eyebrow {
    margin: 0;
    font-size: 0.75rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--secondary-text-color);
  }

  .title {
    margin: 0;
    font-size: 1.6rem;
    font-weight: 600;
    line-height: 1.2;
    color: var(--primary-text-color);
  }

  .clock {
    margin: 6px 0 0;
    font-size: 2.4rem;
    font-weight: 600;
    font-variant-numeric: tabular-nums;
    letter-spacing: 0.02em;
    line-height: 1;
    color: var(--primary-text-color);
  }

  .refresh-btn {
    flex: 0 0 auto;
    width: 36px;
    height: 36px;
    border: none;
    border-radius: 50%;
    background: color-mix(in srgb, var(--primary-text-color) 8%, transparent);
    color: var(--primary-text-color);
    font-size: 1.25rem;
    line-height: 1;
    cursor: pointer;
  }

  .refresh-btn:hover {
    background: color-mix(in srgb, var(--primary-color, #03a9f4) 18%, transparent);
  }

  .refresh-btn:disabled {
    opacity: 0.5;
    cursor: default;
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
    margin: 0 0 20px;
    font-size: 1.05rem;
    line-height: 1.45;
    color: var(--primary-text-color);
  }

  .brief[data-source="ai"]::before {
    content: "";
  }

  .meta {
    display: inline-flex;
    gap: 8px;
    align-items: center;
    margin-bottom: 16px;
    font-size: 0.75rem;
    color: var(--secondary-text-color);
  }

  .dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--primary-color, #03a9f4);
  }

  .dot.local {
    background: var(--disabled-text-color, #9e9e9e);
  }

  .sections {
    display: grid;
    gap: 18px;
  }

  .section-title {
    margin: 0 0 8px;
    font-size: 0.8rem;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--secondary-text-color);
  }

  .weather-row {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 12px;
  }

  .condition {
    margin: 0;
    font-size: 1.15rem;
    font-weight: 500;
    text-transform: capitalize;
    color: var(--primary-text-color);
  }

  .temp {
    margin: 0;
    font-size: 1.75rem;
    font-weight: 600;
    color: var(--primary-text-color);
  }

  .weather-meta {
    margin: 6px 0 0;
    font-size: 0.85rem;
    color: var(--secondary-text-color);
  }

  .forecast {
    display: flex;
    gap: 10px;
    margin-top: 12px;
    overflow-x: auto;
    padding-bottom: 2px;
  }

  .forecast-item {
    min-width: 64px;
    padding: 8px 10px;
    border-radius: 10px;
    background: color-mix(
      in srgb,
      var(--primary-text-color) 6%,
      transparent
    );
  }

  .forecast-day,
  .forecast-cond {
    display: block;
    font-size: 0.75rem;
    color: var(--secondary-text-color);
    text-transform: capitalize;
  }

  .forecast-temp {
    display: block;
    margin-top: 4px;
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--primary-text-color);
  }

  .events {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    gap: 10px;
  }

  .event {
    display: grid;
    grid-template-columns: 72px 1fr;
    gap: 10px;
    align-items: start;
  }

  .event-time {
    font-size: 0.85rem;
    font-variant-numeric: tabular-nums;
    color: var(--secondary-text-color);
  }

  .event-body {
    min-width: 0;
  }

  .event-title {
    margin: 0;
    font-size: 0.95rem;
    font-weight: 500;
    color: var(--primary-text-color);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .event-cal {
    margin: 2px 0 0;
    font-size: 0.75rem;
    color: var(--secondary-text-color);
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
    font-size: 0.75rem;
    color: var(--secondary-text-color);
  }

  .context-chevron {
    font-size: 0.75rem;
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
    font-size: 0.9rem;
    color: var(--primary-text-color);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .entity-state {
    flex: 0 0 auto;
    font-size: 0.9rem;
    font-weight: 500;
    color: var(--secondary-text-color);
    text-align: right;
  }

  .empty,
  .error-chip {
    margin: 0;
    font-size: 0.9rem;
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
var zt = Object.defineProperty, Rt = Object.getOwnPropertyDescriptor, $ = (t, e, s, i) => {
  for (var n = i > 1 ? void 0 : i ? Rt(e, s) : e, a = t.length - 1, r; a >= 0; a--)
    (r = t[a]) && (n = (i ? r(e, s, n) : r(n)) || n);
  return i && n && zt(e, s, n), n;
};
const Y = "daily", Q = 24, we = 30, X = "auto", Mt = 5 * 6e4;
let g = class extends N {
  constructor() {
    super(...arguments), this._weather = null, this._forecast = [], this._events = [], this._entities = [], this._summary = "", this._summarySource = "loading", this._errors = [], this._loadingEvents = !1, this._refreshing = !1, this._contextOpen = !1, this._now = /* @__PURE__ */ new Date(), this._fetchGeneration = 0, this._onVisibility = () => {
      document.visibilityState === "visible" ? (this._now = /* @__PURE__ */ new Date(), this._startClock(), this._refreshData(!1)) : this._stopClock();
    };
  }
  static getStubConfig() {
    return {
      weather_entity: "weather.home",
      calendars: ["calendar.home"],
      entities: [],
      forecast_type: "daily",
      summary_mode: "auto"
    };
  }
  static async getConfigElement() {
    return await Promise.resolve().then(() => Wt), document.createElement(ze);
  }
  setConfig(t) {
    if (!t)
      throw new Error("Invalid configuration");
    this._config = {
      forecast_type: Y,
      horizon_hours: Q,
      summary_mode: X,
      cache_minutes: we,
      calendars: [],
      entities: [],
      ...t
    };
  }
  getCardSize() {
    return 5;
  }
  connectedCallback() {
    super.connectedCallback(), this._startRefreshLoop(), this._startClock(), document.addEventListener("visibilitychange", this._onVisibility);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._stopRefreshLoop(), this._stopClock(), this._teardownForecast(), document.removeEventListener("visibilitychange", this._onVisibility);
  }
  updated(t) {
    !this._config || !this.hass || ((t.has("hass") || t.has("_config")) && (this._syncWeatherFromHass(), this._syncEntitiesFromHass(), this._ensureForecastSubscription()), t.has("_config") && this.isConnected && this._refreshData(!0));
  }
  shouldUpdate(t) {
    var e, s, i, n, a, r, l, o;
    if (t.has("_config") || t.has("_weather") || t.has("_forecast") || t.has("_entities") || t.has("_events") || t.has("_summary") || t.has("_summarySource") || t.has("_errors") || t.has("_loadingEvents") || t.has("_refreshing") || t.has("_contextOpen") || t.has("_now"))
      return !0;
    if (t.has("hass")) {
      const c = t.get("hass");
      if ((e = this._config) != null && e.weather_entity && ve(
        (s = c == null ? void 0 : c.states) == null ? void 0 : s[this._config.weather_entity],
        (n = (i = this.hass) == null ? void 0 : i.states) == null ? void 0 : n[this._config.weather_entity]
      ))
        return !0;
      for (const h of ((a = this._config) == null ? void 0 : a.entities) ?? [])
        if (ve((r = c == null ? void 0 : c.states) == null ? void 0 : r[h], (o = (l = this.hass) == null ? void 0 : l.states) == null ? void 0 : o[h]))
          return !0;
    }
    return !1;
  }
  _startRefreshLoop() {
    this._stopRefreshLoop(), this._refreshData(!0), this._refreshTimer = window.setInterval(() => {
      this._refreshData(!1);
    }, Mt);
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
    var s, i, n;
    const t = ((i = (s = this.hass) == null ? void 0 : s.locale) == null ? void 0 : i.language) ?? "en", e = (n = this.hass) == null ? void 0 : n.config.time_zone;
    return new Intl.DateTimeFormat(t, {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: e
    }).format(this._now);
  }
  _cacheKey() {
    return [
      this._config.weather_entity ?? "",
      ...this._config.calendars ?? [],
      ...this._config.entities ?? [],
      this._config.summary_mode ?? X,
      this._config.agent_id ?? "",
      this._config.summary_prompt ?? ""
    ].join("|");
  }
  _syncWeatherFromHass() {
    const t = this._config.weather_entity;
    if (!t) {
      this._weather = null;
      return;
    }
    const e = _t(this.hass, t);
    if (!e) {
      this._weather = null, this._pushError(`Weather entity not found: ${t}`);
      return;
    }
    this._weather = { ...e, forecast: this._forecast };
  }
  _syncEntitiesFromHass() {
    const { entities: t, missing: e } = mt(
      this.hass,
      this._config.entities ?? []
    );
    this._entities = t;
    for (const s of e)
      this._pushError(`Entity not found: ${s}`);
  }
  async _ensureForecastSubscription() {
    const t = this._config.weather_entity, e = this._config.forecast_type ?? Y;
    if (!(this._unsubForecast && this._lastWeatherEntity === t && this._lastForecastType === e)) {
      if (this._teardownForecast(), this._lastWeatherEntity = t, this._lastForecastType = e, !t || e === "none" || !this.hass) {
        this._forecast = [];
        return;
      }
      try {
        this._unsubForecast = await gt(
          this.hass,
          t,
          e,
          (s) => {
            this._forecast = s.slice(0, 6), this._weather && (this._weather = { ...this._weather, forecast: this._forecast });
          }
        );
      } catch (s) {
        this._forecast = [], this._pushError(
          s instanceof Error ? `Forecast: ${s.message}` : "Forecast unavailable"
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
      this._refreshing = !0, Me(this._cacheKey());
      try {
        await this._refreshData(!0, !0);
      } finally {
        this._refreshing = !1;
      }
    }
  }
  async _refreshData(t, e = !1) {
    if (!this.hass || !this._config)
      return;
    const s = ++this._fetchGeneration, i = [];
    this._loadingEvents = !0, this._syncWeatherFromHass(), this._syncEntitiesFromHass();
    const n = this._config.calendars ?? [], a = this._config.horizon_hours ?? Q, { events: r, errors: l } = await ut(
      this.hass,
      n,
      a
    );
    if (s === this._fetchGeneration) {
      this._events = r, i.push(...l), this._loadingEvents = !1, this._config.weather_entity ? this.hass.states[this._config.weather_entity] || i.push(`Weather entity not found: ${this._config.weather_entity}`) : i.push("No weather_entity configured");
      for (const o of this._config.entities ?? [])
        this.hass.states[o] || i.push(`Entity not found: ${o}`);
      this._errors = [...new Set(i)].slice(-6), await this._refreshSummary(t, e);
    }
  }
  async _refreshSummary(t, e = !1) {
    var o;
    if (!this.hass || !this._config)
      return;
    const s = this._config.summary_mode ?? X, i = this._config.cache_minutes ?? we, n = ((o = this.hass.locale) == null ? void 0 : o.language) ?? "en", a = this.hass.config.time_zone, r = Tt({
      weather: this._weather,
      events: this._events,
      entities: this._entities,
      now: /* @__PURE__ */ new Date(),
      locale: n,
      timeZone: a,
      summaryPrompt: this._config.summary_prompt
    }), l = this._cacheKey();
    (t || e || !this._summary || this._summarySource === "loading") && (this._summarySource = "loading");
    try {
      const c = await Dt({
        hass: this.hass,
        mode: s,
        agentId: this._config.agent_id,
        digest: r,
        cacheKey: l,
        cacheMinutes: i,
        force: e
      });
      this._summary = c.text, this._summarySource = c.source;
    } catch {
      this._summary = r.local, this._summarySource = "local";
    }
  }
  _dayTitle() {
    var s, i, n;
    if (this._config.title)
      return this._config.title;
    const t = ((i = (s = this.hass) == null ? void 0 : s.locale) == null ? void 0 : i.language) ?? "en", e = (n = this.hass) == null ? void 0 : n.config.time_zone;
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
    const e = ((a = this.hass.locale) == null ? void 0 : a.language) ?? "en", s = this.hass.config.time_zone, i = this._config.forecast_type ?? Y, n = new Date(t.datetime);
    return i === "hourly" ? new Intl.DateTimeFormat(e, {
      hour: "numeric",
      timeZone: s
    }).format(n) : new Intl.DateTimeFormat(e, {
      weekday: "short",
      timeZone: s
    }).format(n);
  }
  render() {
    var i, n, a;
    if (!this._config)
      return f;
    const t = ((n = (i = this.hass) == null ? void 0 : i.locale) == null ? void 0 : n.language) ?? "en", e = ((a = this.hass) == null ? void 0 : a.config.time_zone) ?? "UTC", s = this._weather;
    return m`
      <ha-card>
        <div class="header">
          <div class="header-row">
            <div>
              <p class="eyebrow">Today</p>
              <h2 class="title">${this._dayTitle()}</h2>
              <p class="clock" aria-live="polite">${this._clockLabel()}</p>
            </div>
            <button
              class="refresh-btn"
              type="button"
              title="Refresh brief"
              aria-label="Refresh brief"
              ?disabled=${this._refreshing}
              @click=${this._onManualRefresh}
            >
              <span class=${this._refreshing ? "spin" : ""}>↻</span>
            </button>
          </div>
        </div>

        <p
          class="brief ${this._summarySource === "loading" || this._refreshing ? "loading" : ""}"
          data-source=${this._summarySource}
        >
          ${this._summarySource === "loading" && !this._summary ? "Preparing your day brief…" : this._summary}
        </p>

        ${this._summary && this._summarySource !== "loading" ? m`
              <div class="meta">
                <span
                  class="dot ${this._summarySource === "local" ? "local" : ""}"
                ></span>
                <span
                  >${this._summarySource === "ai" ? "AI brief" : "Local brief"}</span
                >
              </div>
            ` : f}

        <div class="sections">
          <section>
            <h3 class="section-title">Weather</h3>
            ${s ? m`
                  <div class="weather-row">
                    <p class="condition">
                      ${be(s.condition)}
                    </p>
                    <p class="temp">
                      ${ee(
      s.temperature,
      s.temperature_unit
    )}
                    </p>
                  </div>
                  <p class="weather-meta">
                    ${s.friendly_name ?? s.entity_id}
                    ${typeof s.humidity == "number" ? m` · ${s.humidity}% humidity` : f}
                  </p>
                  ${this._forecast.length ? m`
                        <div class="forecast">
                          ${this._forecast.map(
      (r) => m`
                              <div class="forecast-item">
                                <span class="forecast-day"
                                  >${this._forecastLabel(r)}</span
                                >
                                <span class="forecast-cond"
                                  >${be(
        r.condition ?? ""
      )}</span
                                >
                                <span class="forecast-temp"
                                  >${ee(
        r.temperature,
        s.temperature_unit
      )}</span
                                >
                              </div>
                            `
    )}
                        </div>
                      ` : f}
                ` : m`<p class="empty">Configure a weather entity to begin.</p>`}
          </section>

          <section>
            <h3 class="section-title">Meetings</h3>
            ${this._loadingEvents && this._events.length === 0 ? m`<p class="empty loading">Loading calendars…</p>` : this._events.length === 0 ? m`<p class="empty">
                    No meetings in the next
                    ${this._config.horizon_hours ?? Q} hours.
                  </p>` : m`
                    <ul class="events">
                      ${this._events.map(
      (r) => m`
                          <li class="event">
                            <span class="event-time"
                              >${dt(
        r,
        t,
        e
      )}</span
                            >
                            <div class="event-body">
                              <p class="event-title">${r.summary}</p>
                              ${r.calendar_name ? m`<p class="event-cal">
                                    ${r.calendar_name}${r.location ? ` · ${r.location}` : ""}
                                  </p>` : f}
                            </div>
                          </li>
                        `
    )}
                    </ul>
                  `}
          </section>

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
                    <span class="section-title">Context</span>
                    <span class="context-meta"
                      >${this._entities.length}
                      ${this._entities.length === 1 ? "entity" : "entities"}</span
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
                      ` : f}
                </section>
              ` : f}
        </div>

        ${this._errors.length ? m`
              <div class="errors">
                ${this._errors.map(
      (r) => m`<span class="error-chip">${r}</span>`
    )}
              </div>
            ` : f}
      </ha-card>
    `;
  }
};
g.styles = Pt;
$([
  re({ attribute: !1 })
], g.prototype, "hass", 2);
$([
  b()
], g.prototype, "_config", 2);
$([
  b()
], g.prototype, "_weather", 2);
$([
  b()
], g.prototype, "_forecast", 2);
$([
  b()
], g.prototype, "_events", 2);
$([
  b()
], g.prototype, "_entities", 2);
$([
  b()
], g.prototype, "_summary", 2);
$([
  b()
], g.prototype, "_summarySource", 2);
$([
  b()
], g.prototype, "_errors", 2);
$([
  b()
], g.prototype, "_loadingEvents", 2);
$([
  b()
], g.prototype, "_refreshing", 2);
$([
  b()
], g.prototype, "_contextOpen", 2);
$([
  b()
], g.prototype, "_now", 2);
g = $([
  Oe(Pe)
], g);
window.customCards = window.customCards || [];
window.customCards.push({
  type: Pe,
  name: De,
  description: "AI-first day brief with weather, calendars, extra entities, and a short narrative.",
  preview: !0,
  documentationURL: "https://github.com/jenskock/lovelace-day-brief"
});
console.info(
  `%c ${De} %c ${ct} `,
  "color:#fff;background:#03a9f4;font-weight:700",
  "color:#03a9f4;background:transparent;font-weight:700"
);
var Lt = Object.defineProperty, Ut = Object.getOwnPropertyDescriptor, ae = (t, e, s, i) => {
  for (var n = i > 1 ? void 0 : i ? Ut(e, s) : e, a = t.length - 1, r; a >= 0; a--)
    (r = t[a]) && (n = (i ? r(e, s, n) : r(n)) || n);
  return i && n && Lt(e, s, n), n;
};
const Ht = [
  "daily",
  "hourly",
  "twice_daily",
  "none"
], jt = ["auto", "ai", "local"];
function Ft(t, e) {
  t.dispatchEvent(
    new CustomEvent("config-changed", {
      detail: { config: e },
      bubbles: !0,
      composed: !0
    })
  );
}
function xe(t) {
  return [
    ...new Set(
      t.split(/[\n,]/).map((e) => e.trim()).filter(Boolean)
    )
  ];
}
let P = class extends N {
  setConfig(t) {
    this._config = {
      ...t,
      calendars: [...t.calendars ?? []],
      entities: [...t.entities ?? []]
    };
  }
  _update(t) {
    if (!this._config)
      return;
    const e = {
      ...this._config,
      ...t
    };
    this._config = e, Ft(this, e);
  }
  _value(t) {
    return t.target.value;
  }
  _onWeather(t) {
    this._update({ weather_entity: this._value(t) || void 0 });
  }
  _onCalendars(t) {
    this._update({ calendars: xe(this._value(t)) });
  }
  _onEntities(t) {
    this._update({ entities: xe(this._value(t)) });
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
  _onCache(t) {
    const e = Number(this._value(t));
    this._update({
      cache_minutes: Number.isFinite(e) && e > 0 ? e : 30
    });
  }
  _onTitle(t) {
    this._update({ title: this._value(t) || void 0 });
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
      return f;
    const t = this._config.calendars ?? [], e = this._config.entities ?? [], s = this._weatherEntities(), i = this._calendarEntities();
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
            ${s.map(
      (n) => m`<option
                  value=${n}
                  ?selected=${n === this._config.weather_entity}
                >
                  ${n}
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
      (n) => m`
                      <label class="check">
                        <input
                          type="checkbox"
                          .checked=${t.includes(n)}
                          @change=${() => this._toggleCalendar(n)}
                        />
                        <span>${n}</span>
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
            placeholder="person.jens_2&#10;sensor.abfallrestmuell&#10;binary_sensor.haustur"
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
          Forecast type
          <select
            .value=${this._config.forecast_type ?? "daily"}
            @change=${this._onForecast}
          >
            ${Ht.map(
      (n) => m`<option
                  value=${n}
                  ?selected=${(this._config.forecast_type ?? "daily") === n}
                >
                  ${n}
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
            ${jt.map(
      (n) => m`<option
                  value=${n}
                  ?selected=${(this._config.summary_mode ?? "auto") === n}
                >
                  ${n}
                </option>`
    )}
          </select>
        </label>

        <label>
          System prompt
          <textarea
            rows="5"
            placeholder=${Re}
            .value=${this._config.summary_prompt ?? ""}
            @change=${this._onPrompt}
          ></textarea>
          <span class="hint"
            >Leer = starkes deutsches Standard-Prompt. Wetter, Termine, Solar,
            Müll und Entities werden strukturiert angehängt.</span
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
      </div>
    `;
  }
};
P.styles = Se`
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
ae([
  re({ attribute: !1 })
], P.prototype, "hass", 2);
ae([
  b()
], P.prototype, "_config", 2);
P = ae([
  Oe(ze)
], P);
const Wt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get DayBriefCardEditor() {
    return P;
  }
}, Symbol.toStringTag, { value: "Module" }));
export {
  g as DayBriefCard
};
//# sourceMappingURL=day-brief.js.map
