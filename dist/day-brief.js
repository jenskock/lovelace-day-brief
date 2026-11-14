/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const q = globalThis, he = q.ShadowRoot && (q.ShadyCSS === void 0 || q.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, ue = Symbol(), $e = /* @__PURE__ */ new WeakMap();
let Ue = class {
  constructor(e, n, s) {
    if (this._$cssResult$ = !0, s !== ue) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = n;
  }
  get styleSheet() {
    let e = this.o;
    const n = this.t;
    if (he && e === void 0) {
      const s = n !== void 0 && n.length === 1;
      s && (e = $e.get(n)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), s && $e.set(n, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const st = (t) => new Ue(typeof t == "string" ? t : t + "", void 0, ue), Pe = (t, ...e) => {
  const n = t.length === 1 ? t[0] : e.reduce((s, i, a) => s + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + t[a + 1], t[0]);
  return new Ue(n, t, ue);
}, it = (t, e) => {
  if (he) t.adoptedStyleSheets = e.map((n) => n instanceof CSSStyleSheet ? n : n.styleSheet);
  else for (const n of e) {
    const s = document.createElement("style"), i = q.litNonce;
    i !== void 0 && s.setAttribute("nonce", i), s.textContent = n.cssText, t.appendChild(s);
  }
}, be = he ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let n = "";
  for (const s of e.cssRules) n += s.cssText;
  return st(n);
})(t) : t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: rt, defineProperty: at, getOwnPropertyDescriptor: ot, getOwnPropertyNames: ct, getOwnPropertySymbols: lt, getPrototypeOf: ht } = Object, T = globalThis, ve = T.trustedTypes, ut = ve ? ve.emptyScript : "", ee = T.reactiveElementPolyfillSupport, j = (t, e) => t, Y = { toAttribute(t, e) {
  switch (e) {
    case Boolean:
      t = t ? ut : null;
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
} }, de = (t, e) => !rt(t, e), we = { attribute: !0, type: String, converter: Y, reflect: !1, useDefault: !1, hasChanged: de };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), T.litPropertyMetadata ?? (T.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let H = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, n = we) {
    if (n.state && (n.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((n = Object.create(n)).wrapped = !0), this.elementProperties.set(e, n), !n.noAccessor) {
      const s = Symbol(), i = this.getPropertyDescriptor(e, s, n);
      i !== void 0 && at(this.prototype, e, i);
    }
  }
  static getPropertyDescriptor(e, n, s) {
    const { get: i, set: a } = ot(this.prototype, e) ?? { get() {
      return this[n];
    }, set(r) {
      this[n] = r;
    } };
    return { get: i, set(r) {
      const l = i == null ? void 0 : i.call(this);
      a == null || a.call(this, r), this.requestUpdate(e, l, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? we;
  }
  static _$Ei() {
    if (this.hasOwnProperty(j("elementProperties"))) return;
    const e = ht(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(j("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(j("properties"))) {
      const n = this.properties, s = [...ct(n), ...lt(n)];
      for (const i of s) this.createProperty(i, n[i]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const n = litPropertyMetadata.get(e);
      if (n !== void 0) for (const [s, i] of n) this.elementProperties.set(s, i);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [n, s] of this.elementProperties) {
      const i = this._$Eu(n, s);
      i !== void 0 && this._$Eh.set(i, n);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const n = [];
    if (Array.isArray(e)) {
      const s = new Set(e.flat(1 / 0).reverse());
      for (const i of s) n.unshift(be(i));
    } else e !== void 0 && n.push(be(e));
    return n;
  }
  static _$Eu(e, n) {
    const s = n.attribute;
    return s === !1 ? void 0 : typeof s == "string" ? s : typeof e == "string" ? e.toLowerCase() : void 0;
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
    for (const s of n.keys()) this.hasOwnProperty(s) && (e.set(s, this[s]), delete this[s]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return it(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    var e;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (e = this._$EO) == null || e.forEach((n) => {
      var s;
      return (s = n.hostConnected) == null ? void 0 : s.call(n);
    });
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    var e;
    (e = this._$EO) == null || e.forEach((n) => {
      var s;
      return (s = n.hostDisconnected) == null ? void 0 : s.call(n);
    });
  }
  attributeChangedCallback(e, n, s) {
    this._$AK(e, s);
  }
  _$ET(e, n) {
    var a;
    const s = this.constructor.elementProperties.get(e), i = this.constructor._$Eu(e, s);
    if (i !== void 0 && s.reflect === !0) {
      const r = (((a = s.converter) == null ? void 0 : a.toAttribute) !== void 0 ? s.converter : Y).toAttribute(n, s.type);
      this._$Em = e, r == null ? this.removeAttribute(i) : this.setAttribute(i, r), this._$Em = null;
    }
  }
  _$AK(e, n) {
    var a, r;
    const s = this.constructor, i = s._$Eh.get(e);
    if (i !== void 0 && this._$Em !== i) {
      const l = s.getPropertyOptions(i), o = typeof l.converter == "function" ? { fromAttribute: l.converter } : ((a = l.converter) == null ? void 0 : a.fromAttribute) !== void 0 ? l.converter : Y;
      this._$Em = i;
      const u = o.fromAttribute(n, l.type);
      this[i] = u ?? ((r = this._$Ej) == null ? void 0 : r.get(i)) ?? u, this._$Em = null;
    }
  }
  requestUpdate(e, n, s, i = !1, a) {
    var r;
    if (e !== void 0) {
      const l = this.constructor;
      if (i === !1 && (a = this[e]), s ?? (s = l.getPropertyOptions(e)), !((s.hasChanged ?? de)(a, n) || s.useDefault && s.reflect && a === ((r = this._$Ej) == null ? void 0 : r.get(e)) && !this.hasAttribute(l._$Eu(e, s)))) return;
      this.C(e, n, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, n, { useDefault: s, reflect: i, wrapped: a }, r) {
    s && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(e) && (this._$Ej.set(e, r ?? n ?? this[e]), a !== !0 || r !== void 0) || (this._$AL.has(e) || (this.hasUpdated || s || (n = void 0), this._$AL.set(e, n)), i === !0 && this._$Em !== e && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(e));
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
    var s;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [a, r] of this._$Ep) this[a] = r;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [a, r] of i) {
        const { wrapped: l } = r, o = this[a];
        l !== !0 || this._$AL.has(a) || o === void 0 || this.C(a, void 0, r, o);
      }
    }
    let e = !1;
    const n = this._$AL;
    try {
      e = this.shouldUpdate(n), e ? (this.willUpdate(n), (s = this._$EO) == null || s.forEach((i) => {
        var a;
        return (a = i.hostUpdate) == null ? void 0 : a.call(i);
      }), this.update(n)) : this._$EM();
    } catch (i) {
      throw e = !1, this._$EM(), i;
    }
    e && this._$AE(n);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    var n;
    (n = this._$EO) == null || n.forEach((s) => {
      var i;
      return (i = s.hostUpdated) == null ? void 0 : i.call(s);
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
H.elementStyles = [], H.shadowRootOptions = { mode: "open" }, H[j("elementProperties")] = /* @__PURE__ */ new Map(), H[j("finalized")] = /* @__PURE__ */ new Map(), ee == null || ee({ ReactiveElement: H }), (T.reactiveElementVersions ?? (T.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const W = globalThis, xe = (t) => t, J = W.trustedTypes, Se = J ? J.createPolicy("lit-html", { createHTML: (t) => t }) : void 0, Re = "$lit$", A = `lit$${Math.random().toFixed(9).slice(2)}$`, Me = "?" + A, dt = `<${Me}>`, z = document, I = () => z.createComment(""), B = (t) => t === null || typeof t != "object" && typeof t != "function", pe = Array.isArray, pt = (t) => pe(t) || typeof (t == null ? void 0 : t[Symbol.iterator]) == "function", te = `[ 	
\f\r]`, F = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Ee = /-->/g, Ae = />/g, N = RegExp(`>|${te}(?:([^\\s"'>=/]+)(${te}*=${te}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Te = /'/g, ke = /"/g, Fe = /^(?:script|style|textarea|title)$/i, mt = (t) => (e, ...n) => ({ _$litType$: t, strings: e, values: n }), f = mt(1), U = Symbol.for("lit-noChange"), g = Symbol.for("lit-nothing"), Ce = /* @__PURE__ */ new WeakMap(), D = z.createTreeWalker(z, 129);
function je(t, e) {
  if (!pe(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Se !== void 0 ? Se.createHTML(e) : e;
}
const ft = (t, e) => {
  const n = t.length - 1, s = [];
  let i, a = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", r = F;
  for (let l = 0; l < n; l++) {
    const o = t[l];
    let u, h, c = -1, m = 0;
    for (; m < o.length && (r.lastIndex = m, h = r.exec(o), h !== null); ) m = r.lastIndex, r === F ? h[1] === "!--" ? r = Ee : h[1] !== void 0 ? r = Ae : h[2] !== void 0 ? (Fe.test(h[2]) && (i = RegExp("</" + h[2], "g")), r = N) : h[3] !== void 0 && (r = N) : r === N ? h[0] === ">" ? (r = i ?? F, c = -1) : h[1] === void 0 ? c = -2 : (c = r.lastIndex - h[2].length, u = h[1], r = h[3] === void 0 ? N : h[3] === '"' ? ke : Te) : r === ke || r === Te ? r = N : r === Ee || r === Ae ? r = F : (r = N, i = void 0);
    const _ = r === N && t[l + 1].startsWith("/>") ? " " : "";
    a += r === F ? o + dt : c >= 0 ? (s.push(u), o.slice(0, c) + Re + o.slice(c) + A + _) : o + A + (c === -2 ? l : _);
  }
  return [je(t, a + (t[n] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), s];
};
class G {
  constructor({ strings: e, _$litType$: n }, s) {
    let i;
    this.parts = [];
    let a = 0, r = 0;
    const l = e.length - 1, o = this.parts, [u, h] = ft(e, n);
    if (this.el = G.createElement(u, s), D.currentNode = this.el.content, n === 2 || n === 3) {
      const c = this.el.content.firstChild;
      c.replaceWith(...c.childNodes);
    }
    for (; (i = D.nextNode()) !== null && o.length < l; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const c of i.getAttributeNames()) if (c.endsWith(Re)) {
          const m = h[r++], _ = i.getAttribute(c).split(A), w = /([.?@])?(.*)/.exec(m);
          o.push({ type: 1, index: a, name: w[2], strings: _, ctor: w[1] === "." ? _t : w[1] === "?" ? yt : w[1] === "@" ? $t : X }), i.removeAttribute(c);
        } else c.startsWith(A) && (o.push({ type: 6, index: a }), i.removeAttribute(c));
        if (Fe.test(i.tagName)) {
          const c = i.textContent.split(A), m = c.length - 1;
          if (m > 0) {
            i.textContent = J ? J.emptyScript : "";
            for (let _ = 0; _ < m; _++) i.append(c[_], I()), D.nextNode(), o.push({ type: 2, index: ++a });
            i.append(c[m], I());
          }
        }
      } else if (i.nodeType === 8) if (i.data === Me) o.push({ type: 2, index: a });
      else {
        let c = -1;
        for (; (c = i.data.indexOf(A, c + 1)) !== -1; ) o.push({ type: 7, index: a }), c += A.length - 1;
      }
      a++;
    }
  }
  static createElement(e, n) {
    const s = z.createElement("template");
    return s.innerHTML = e, s;
  }
}
function P(t, e, n = t, s) {
  var r, l;
  if (e === U) return e;
  let i = s !== void 0 ? (r = n._$Co) == null ? void 0 : r[s] : n._$Cl;
  const a = B(e) ? void 0 : e._$litDirective$;
  return (i == null ? void 0 : i.constructor) !== a && ((l = i == null ? void 0 : i._$AO) == null || l.call(i, !1), a === void 0 ? i = void 0 : (i = new a(t), i._$AT(t, n, s)), s !== void 0 ? (n._$Co ?? (n._$Co = []))[s] = i : n._$Cl = i), i !== void 0 && (e = P(t, i._$AS(t, e.values), i, s)), e;
}
class gt {
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
    const { el: { content: n }, parts: s } = this._$AD, i = ((e == null ? void 0 : e.creationScope) ?? z).importNode(n, !0);
    D.currentNode = i;
    let a = D.nextNode(), r = 0, l = 0, o = s[0];
    for (; o !== void 0; ) {
      if (r === o.index) {
        let u;
        o.type === 2 ? u = new V(a, a.nextSibling, this, e) : o.type === 1 ? u = new o.ctor(a, o.name, o.strings, this, e) : o.type === 6 && (u = new bt(a, this, e)), this._$AV.push(u), o = s[++l];
      }
      r !== (o == null ? void 0 : o.index) && (a = D.nextNode(), r++);
    }
    return D.currentNode = z, i;
  }
  p(e) {
    let n = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(e, s, n), n += s.strings.length - 2) : s._$AI(e[n])), n++;
  }
}
class V {
  get _$AU() {
    var e;
    return ((e = this._$AM) == null ? void 0 : e._$AU) ?? this._$Cv;
  }
  constructor(e, n, s, i) {
    this.type = 2, this._$AH = g, this._$AN = void 0, this._$AA = e, this._$AB = n, this._$AM = s, this.options = i, this._$Cv = (i == null ? void 0 : i.isConnected) ?? !0;
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
    e = P(this, e, n), B(e) ? e === g || e == null || e === "" ? (this._$AH !== g && this._$AR(), this._$AH = g) : e !== this._$AH && e !== U && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : pt(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== g && B(this._$AH) ? this._$AA.nextSibling.data = e : this.T(z.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var a;
    const { values: n, _$litType$: s } = e, i = typeof s == "number" ? this._$AC(e) : (s.el === void 0 && (s.el = G.createElement(je(s.h, s.h[0]), this.options)), s);
    if (((a = this._$AH) == null ? void 0 : a._$AD) === i) this._$AH.p(n);
    else {
      const r = new gt(i, this), l = r.u(this.options);
      r.p(n), this.T(l), this._$AH = r;
    }
  }
  _$AC(e) {
    let n = Ce.get(e.strings);
    return n === void 0 && Ce.set(e.strings, n = new G(e)), n;
  }
  k(e) {
    pe(this._$AH) || (this._$AH = [], this._$AR());
    const n = this._$AH;
    let s, i = 0;
    for (const a of e) i === n.length ? n.push(s = new V(this.O(I()), this.O(I()), this, this.options)) : s = n[i], s._$AI(a), i++;
    i < n.length && (this._$AR(s && s._$AB.nextSibling, i), n.length = i);
  }
  _$AR(e = this._$AA.nextSibling, n) {
    var s;
    for ((s = this._$AP) == null ? void 0 : s.call(this, !1, !0, n); e !== this._$AB; ) {
      const i = xe(e).nextSibling;
      xe(e).remove(), e = i;
    }
  }
  setConnected(e) {
    var n;
    this._$AM === void 0 && (this._$Cv = e, (n = this._$AP) == null || n.call(this, e));
  }
}
class X {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, n, s, i, a) {
    this.type = 1, this._$AH = g, this._$AN = void 0, this.element = e, this.name = n, this._$AM = i, this.options = a, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = g;
  }
  _$AI(e, n = this, s, i) {
    const a = this.strings;
    let r = !1;
    if (a === void 0) e = P(this, e, n, 0), r = !B(e) || e !== this._$AH && e !== U, r && (this._$AH = e);
    else {
      const l = e;
      let o, u;
      for (e = a[0], o = 0; o < a.length - 1; o++) u = P(this, l[s + o], n, o), u === U && (u = this._$AH[o]), r || (r = !B(u) || u !== this._$AH[o]), u === g ? e = g : e !== g && (e += (u ?? "") + a[o + 1]), this._$AH[o] = u;
    }
    r && !i && this.j(e);
  }
  j(e) {
    e === g ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class _t extends X {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === g ? void 0 : e;
  }
}
class yt extends X {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== g);
  }
}
class $t extends X {
  constructor(e, n, s, i, a) {
    super(e, n, s, i, a), this.type = 5;
  }
  _$AI(e, n = this) {
    if ((e = P(this, e, n, 0) ?? g) === U) return;
    const s = this._$AH, i = e === g && s !== g || e.capture !== s.capture || e.once !== s.once || e.passive !== s.passive, a = e !== g && (s === g || i);
    i && this.element.removeEventListener(this.name, this, s), a && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var n;
    typeof this._$AH == "function" ? this._$AH.call(((n = this.options) == null ? void 0 : n.host) ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class bt {
  constructor(e, n, s) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = n, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    P(this, e);
  }
}
const ne = W.litHtmlPolyfillSupport;
ne == null || ne(G, V), (W.litHtmlVersions ?? (W.litHtmlVersions = [])).push("3.3.3");
const vt = (t, e, n) => {
  const s = (n == null ? void 0 : n.renderBefore) ?? e;
  let i = s._$litPart$;
  if (i === void 0) {
    const a = (n == null ? void 0 : n.renderBefore) ?? null;
    s._$litPart$ = i = new V(e.insertBefore(I(), a), a, void 0, n ?? {});
  }
  return i._$AI(t), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const O = globalThis;
class L extends H {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = vt(n, this.renderRoot, this.renderOptions);
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
    return U;
  }
}
var Le;
L._$litElement$ = !0, L.finalized = !0, (Le = O.litElementHydrateSupport) == null || Le.call(O, { LitElement: L });
const se = O.litElementPolyfillSupport;
se == null || se({ LitElement: L });
(O.litElementVersions ?? (O.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const We = (t) => (e, n) => {
  n !== void 0 ? n.addInitializer(() => {
    customElements.define(t, e);
  }) : customElements.define(t, e);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const wt = { attribute: !0, type: String, converter: Y, reflect: !1, hasChanged: de }, xt = (t = wt, e, n) => {
  const { kind: s, metadata: i } = n;
  let a = globalThis.litPropertyMetadata.get(i);
  if (a === void 0 && globalThis.litPropertyMetadata.set(i, a = /* @__PURE__ */ new Map()), s === "setter" && ((t = Object.create(t)).wrapped = !0), a.set(n.name, t), s === "accessor") {
    const { name: r } = n;
    return { set(l) {
      const o = e.get.call(this);
      e.set.call(this, l), this.requestUpdate(r, o, t, !0, l);
    }, init(l) {
      return l !== void 0 && this.C(r, void 0, t, l), l;
    } };
  }
  if (s === "setter") {
    const { name: r } = n;
    return function(l) {
      const o = this[r];
      e.call(this, l), this.requestUpdate(r, o, t, !0, l);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function me(t) {
  return (e, n) => typeof n == "object" ? xt(t, e, n) : ((s, i, a) => {
    const r = i.hasOwnProperty(a);
    return i.constructor.createProperty(a, s), r ? Object.getOwnPropertyDescriptor(i, a) : void 0;
  })(t, e, n);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function v(t) {
  return me({ ...t, state: !0, attribute: !1 });
}
const St = "1.4.0", Ie = "Day Brief", Be = "day-brief-card", Ge = "day-brief-card-editor", Ke = `
Du bist ein Home-Dashboard-Redakteur.

AUFGABE
Schreibe GENAU 2 bis 4 kurze Sätze auf Deutsch als Tagesbriefing.
Beginne IMMER mit einer kurzen, freundlichen Begrüßung passend zur Tageszeit.
Wenn ein Haustier im Haushalt genannt ist, darfst du es einmal kurz und warm mitnehmen.

MUSS enthalten (wenn Daten da sind)
1) Freundliche Begrüßung
2) Wetter jetzt + Kleidungsempfehlung
3) Regen-/Schneeprognose der nächsten Tage, falls nass
4) Wichtige Termine heute
5) Geburtstage in den nächsten 14 Tagen herzlich erwähnen (Alter nennen, wenn bekannt)
6) An Schultagen morgens kurz den Schulalltag mitdenken, falls [SCHULTAG] = ja
7) Solar kurz, falls Werte verfügbar
8) Müll nur wenn relevant
9) Offene Fenster bei Kälte kurz erwähnen
10) Heizöl nur wenn der Wert auffällig/niedrig wirkt
11) Staubsauger/Mäher nur wenn Handlungsbedarf (nicht idle/docked)

HAUSHALT
Nutze [HAUSHALT] und [GEBURTSTAGE] nur als Faktenquelle.
Erfinde keine Personen, Tiere oder Termine.

DARF NICHT
- Englisch schreiben
- Geräte steuern, Tools aufrufen, Rückfragen stellen
- Entity-IDs oder "Nicht verfügbar" wiederholen
- Lange Listen oder Bulletpoints
- Spekulieren ohne Daten
- Die Begrüßung weglassen

STIL
Warm, freundlich, klar, praktisch. Wie eine kurze liebe Nachricht an die Familie.
`.trim();
function Ne(t) {
  if (!t)
    return null;
  if (typeof t == "string") {
    const e = /^\d{4}-\d{2}-\d{2}$/.test(t);
    return { iso: t, allDay: e };
  }
  return t.dateTime ? { iso: t.dateTime, allDay: !1 } : t.date ? { iso: t.date, allDay: !0 } : null;
}
function Et(t, e) {
  var n, s, i;
  return ((s = (n = t.entities) == null ? void 0 : n[e]) == null ? void 0 : s.name) ?? (typeof ((i = t.states[e]) == null ? void 0 : i.attributes.friendly_name) == "string" ? t.states[e].attributes.friendly_name : e.replace(/^calendar\./, "").replace(/_/g, " "));
}
async function At(t, e, n) {
  const s = [...new Set(e.filter(Boolean))];
  if (s.length === 0)
    return { events: [], errors: [] };
  const i = [];
  let a = {};
  try {
    const l = await t.callService(
      "calendar",
      "get_events",
      {
        duration: { hours: n }
      },
      { entity_id: s },
      !0,
      !0
    ), o = l && "response" in l ? l.response : void 0;
    o && typeof o == "object" && (a = o);
  } catch (l) {
    return i.push(
      l instanceof Error ? l.message : "Failed to load calendar events"
    ), { events: [], errors: i };
  }
  const r = [];
  for (const l of s) {
    const o = a[l];
    if (!o) {
      i.push(`No response for ${l}`);
      continue;
    }
    if (o.error) {
      i.push(`${l}: ${o.error}`);
      continue;
    }
    const u = Et(t, l);
    for (const h of o.events ?? []) {
      const c = Ne(h.start), m = Ne(h.end);
      !c || !m || r.push({
        summary: h.summary || "Busy",
        description: h.description,
        location: h.location,
        start: c.iso,
        end: m.iso,
        all_day: c.allDay || m.allDay,
        calendar_id: l,
        calendar_name: u
      });
    }
  }
  return r.sort((l, o) => l.start.localeCompare(o.start)), { events: r, errors: i };
}
function Tt(t, e, n) {
  if (t.all_day)
    return "All day";
  const s = new Date(t.start);
  return Number.isNaN(s.getTime()) ? t.start : new Intl.DateTimeFormat(e, {
    hour: "numeric",
    minute: "2-digit",
    timeZone: n
  }).format(s);
}
function kt(t, e) {
  var n, s;
  return ((s = (n = t.entities) == null ? void 0 : n[e.entity_id]) == null ? void 0 : s.name) ?? (typeof e.attributes.friendly_name == "string" ? e.attributes.friendly_name : e.entity_id);
}
function Ct(t, e) {
  if (t.formatEntityState)
    try {
      return t.formatEntityState(e);
    } catch {
    }
  const n = typeof e.attributes.unit_of_measurement == "string" ? e.attributes.unit_of_measurement : void 0;
  return n ? `${e.state} ${n}` : e.state;
}
function Nt(t, e) {
  const n = [...new Set(e.filter(Boolean))], s = [], i = [];
  for (const a of n) {
    const r = t.states[a];
    if (!r) {
      i.push(a);
      continue;
    }
    s.push({
      entity_id: a,
      name: kt(t, r),
      state: Ct(t, r),
      unit: typeof r.attributes.unit_of_measurement == "string" ? r.attributes.unit_of_measurement : void 0,
      domain: a.split(".")[0] ?? "unknown"
    });
  }
  return { entities: s, missing: i };
}
function Dt(t) {
  const e = /^(\d{4})-(\d{2})-(\d{2})$/.exec(t.trim());
  if (!e)
    return null;
  const n = Number(e[1]), s = Number(e[2]), i = Number(e[3]);
  return !n || s < 1 || s > 12 || i < 1 || i > 31 ? null : { year: n, month: s, day: i };
}
function Ot(t, e) {
  const n = new Intl.DateTimeFormat("en-CA", {
    timeZone: e,
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).formatToParts(t), s = (i) => {
    var a;
    return Number(((a = n.find((r) => r.type === i)) == null ? void 0 : a.value) ?? 0);
  };
  return { year: s("year"), month: s("month"), day: s("day") };
}
function ie(t, e, n) {
  return Date.UTC(t, e - 1, n) / 864e5;
}
function zt(t, e, n, s = 14) {
  const i = Ot(e, n), a = ie(i.year, i.month, i.day), r = [];
  for (const l of t) {
    const o = Dt(l.date);
    if (!o || !l.name.trim())
      continue;
    let u = i.year, h = ie(u, o.month, o.day);
    h < a && (u += 1, h = ie(u, o.month, o.day));
    const c = h - a;
    c < 0 || c > s || r.push({
      name: l.name.trim(),
      date: `${String(o.month).padStart(2, "0")}-${String(o.day).padStart(2, "0")}`,
      daysUntil: c,
      ageTurning: u - o.year
    });
  }
  return r.sort((l, o) => l.daysUntil - o.daysUntil);
}
function Ht(t, e) {
  return e ? t.daysUntil === 0 ? `- ${t.name}: heute (${t.ageTurning})` : t.daysUntil === 1 ? `- ${t.name}: morgen (${t.ageTurning})` : `- ${t.name}: in ${t.daysUntil} Tagen (${t.ageTurning})` : t.daysUntil === 0 ? `- ${t.name}: today (turns ${t.ageTurning})` : t.daysUntil === 1 ? `- ${t.name}: tomorrow (turns ${t.ageTurning})` : `- ${t.name}: in ${t.daysUntil} days (turns ${t.ageTurning})`;
}
function Lt(t) {
  var n, s;
  const e = [];
  for (const i of t.split(`
`)) {
    const a = i.trim();
    if (!a)
      continue;
    const r = /^(.+?)[\s,|:;-]+(\d{4}-\d{2}-\d{2})$/.exec(a) ?? /^(\d{4}-\d{2}-\d{2})[\s,|:;-]+(.+)$/.exec(a);
    if (!r)
      continue;
    const l = ((n = r[1]) == null ? void 0 : n.trim()) ?? "", o = ((s = r[2]) == null ? void 0 : s.trim()) ?? "";
    /^\d{4}-\d{2}-\d{2}$/.test(l) ? e.push({ name: o, date: l }) : e.push({ name: l, date: o });
  }
  return e;
}
function Ut(t) {
  return t.map((e) => `${e.name}: ${e.date}`).join(`
`);
}
function Pt(t, e) {
  var a, r, l;
  const n = t.states[e];
  if (!n)
    return null;
  const s = n.attributes, i = ((r = (a = t.entities) == null ? void 0 : a[e]) == null ? void 0 : r.name) ?? (typeof s.friendly_name == "string" ? s.friendly_name : e);
  return {
    entity_id: e,
    condition: n.state,
    temperature: typeof s.temperature == "number" ? s.temperature : void 0,
    temperature_unit: typeof s.temperature_unit == "string" ? s.temperature_unit : (l = t.config.unit_system) == null ? void 0 : l.temperature,
    humidity: typeof s.humidity == "number" ? s.humidity : void 0,
    wind_speed: typeof s.wind_speed == "number" ? s.wind_speed : void 0,
    wind_speed_unit: typeof s.wind_speed_unit == "string" ? s.wind_speed_unit : void 0,
    friendly_name: i,
    forecast: []
  };
}
async function Rt(t, e, n, s) {
  const i = await t.connection.subscribeMessage(
    (a) => {
      s(Array.isArray(a.forecast) ? a.forecast : []);
    },
    {
      type: "weather/subscribe_forecast",
      entity_id: e,
      forecast_type: n
    }
  );
  return () => {
    i();
  };
}
function De(t) {
  return !t || t === "unknown" || t === "unavailable" ? "Weather unavailable" : t.replace(/_/g, " ");
}
function Q(t, e) {
  if (typeof t != "number" || Number.isNaN(t))
    return "—";
  const n = Number.isInteger(t) ? String(t) : t.toFixed(1);
  if (!e)
    return `${n}°`;
  const s = e.includes("°") ? e : `°${e}`;
  return `${n}${s}`;
}
function Oe(t, e) {
  return t === e ? !1 : !t || !e ? !0 : t.state !== e.state || t.last_updated !== e.last_updated || t.attributes.temperature !== e.attributes.temperature || t.attributes.humidity !== e.attributes.humidity;
}
const Ve = /* @__PURE__ */ new Set([
  "rainy",
  "pouring",
  "snowy",
  "snowy-rainy",
  "lightning-rainy",
  "hail"
]), K = /* @__PURE__ */ new Map(), Mt = {
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
function Ft(t) {
  let e = 0;
  for (let n = 0; n < t.length; n += 1)
    e = (e << 5) - e + t.charCodeAt(n), e |= 0;
  return String(e);
}
function jt(t) {
  return t.toLowerCase().startsWith("de");
}
function Wt(t, e) {
  const n = Number(
    new Intl.DateTimeFormat("en-GB", {
      hour: "numeric",
      hour12: !1,
      timeZone: e
    }).format(t)
  );
  return n < 5 ? "nacht" : n < 10 ? "morgen" : n < 12 ? "vormittag" : n < 17 ? "nachmittag" : n < 22 ? "abend" : "nacht";
}
function It(t, e) {
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
function ze(t, e) {
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
function Ze(t, e) {
  return !t || t === "unknown" || t === "unavailable" ? e ? "Wetter unklar" : "Weather unavailable" : e ? Mt[t] ?? t.replace(/_/g, " ") : t.replace(/_/g, " ");
}
function Bt(t, e) {
  if (!t || typeof t.temperature != "number")
    return null;
  const n = t.temperature, s = ["rainy", "pouring", "snowy-rainy", "lightning-rainy"].includes(
    t.condition
  ), i = t.condition === "snowy";
  return e ? i ? "Winterkleidung und feste Schuhe" : n <= 3 ? s ? "dicke Jacke und Regenschutz" : "dicke Jacke" : n <= 10 ? s ? "warme Jacke und Regenschirm" : "warme Jacke" : n <= 16 ? s ? "Übergangsjacke und Schirm" : "Übergangsjacke" : n <= 22 ? s ? "leichte Jacke und Schirm" : "leichte Kleidung" : s ? "luftige Kleidung und Schirm" : "leichte sommerliche Kleidung" : i ? "winter clothes and sturdy shoes" : n <= 3 ? s ? "heavy coat and rain gear" : "heavy coat" : n <= 10 ? s ? "warm jacket and umbrella" : "warm jacket" : n <= 16 ? s ? "light jacket and umbrella" : "light jacket" : n <= 22 ? s ? "light layer and umbrella" : "light clothes" : s ? "summer clothes and umbrella" : "summer clothes";
}
function Gt(t) {
  const e = t.trim().toLowerCase();
  return e === "unavailable" || e === "unknown" || e === "none" || e === "nicht verfügbar" || e === "unbekannt";
}
function Kt(t) {
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
function Vt(t) {
  const e = t.state.trim().toLowerCase();
  return e === "on" || e === "open" || e === "opened";
}
function Zt(t) {
  const e = [], n = [], s = [], i = [], a = [], r = [], l = [], o = [], u = [];
  for (const h of t) {
    if (Gt(h.state))
      continue;
    const c = h.entity_id.toLowerCase(), m = h.name.toLowerCase();
    h.domain === "person" || c.startsWith("person.") ? e.push(h) : c.includes("abfall") || c.includes("muell") || c.includes("mull") || c.includes("trash") || m.includes("abfall") || m.includes("müll") || m.includes("tonne") ? s.push(h) : c.includes("solar") || c.includes("solaredge") || c.includes("autark") || c.includes("produziert") || c.includes("exportiert") || c.includes("verbrauch") || c.includes("power_production") || m.includes("solar") || m.includes("autark") || m.includes("leistung") ? n.push(h) : c.includes("sun_up") || c.includes("sun_down") || m.includes("sonnenaufgang") || m.includes("sonnenuntergang") ? i.push(h) : c.includes("warn") || m.includes("warn") || m.includes("warnung") ? a.push(h) : c.includes("fenster") || c.includes("window") || m.includes("fenster") || m.includes("window") ? Vt(h) && r.push(h) : c.includes("heizoel") || c.includes("heizöl") || c.includes("oil") || m.includes("heizöl") || m.includes("heizoel") ? l.push(h) : h.domain === "vacuum" || h.domain === "lawn_mower" || c.includes("vacuum") || c.includes("lawn_mower") || m.includes("mäher") || m.includes("maeh") || m.includes("sauger") ? Kt(h) && o.push(h) : u.push(h);
  }
  return {
    people: e,
    solar: n,
    trash: s,
    sun: i,
    alerts: a,
    windows: r,
    heating: l,
    appliances: o,
    other: u
  };
}
function qt(t, e, n, s) {
  const i = (n ?? "").toLowerCase();
  if (!(i.includes("schule") || i.includes("school") || i.includes("schultag")))
    return !1;
  const r = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    timeZone: e
  }).format(t);
  return !["Sat", "Sun"].includes(r) && (s === "morgen" || s === "vormittag");
}
function Yt(t, e) {
  return t.filter((n) => {
    const s = (n.summary ?? "").toLowerCase();
    return s.includes("geburtstag") || s.includes("birthday") || s.includes("bday");
  }).slice(0, 5).map((n) => qe(n, e));
}
function qe(t, e) {
  const n = t.all_day ? e ? "ganztägig" : "all day" : t.start, s = t.calendar_name ? ` (${t.calendar_name})` : "";
  return `- ${n}: ${t.summary ?? (e ? "Belegt" : "Busy")}${s}`;
}
function E(t) {
  return `- ${t.name}: ${t.state}`;
}
function y(t, e, n) {
  return [`[${t}]`, e.length ? e.join(`
`) : n].join(`
`);
}
function Ye(t, e, n) {
  return t.datetime ? new Intl.DateTimeFormat(e, {
    weekday: "short",
    timeZone: n
  }).format(new Date(t.datetime)) : "?";
}
function Jt(t, e, n, s, i) {
  return t.slice(0, 6).map((a) => {
    const r = Ye(a, n, s), l = Ze(a.condition ?? "", i), o = Q(
      a.temperature,
      e == null ? void 0 : e.temperature_unit
    ), u = a.condition && Ve.has(a.condition) ? i ? " · nass" : " · wet" : "";
    return `- ${r}: ${l}, ${o}${u}`;
  });
}
function Qt(t, e, n, s) {
  const i = t.slice(0, 6).filter((r) => r.condition && Ve.has(r.condition));
  if (i.length === 0)
    return null;
  const a = i.map((r) => Ye(r, e, n)).join(", ");
  return s ? `Regen/Schnee erwartet: ${a}` : `Rain/snow expected: ${a}`;
}
function Xt(t) {
  var Z;
  const {
    german: e,
    dayLabel: n,
    part: s,
    weather: i,
    weatherLine: a,
    clothing: r,
    rainLine: l,
    schoolDay: o,
    birthdays: u,
    events: h,
    people: c,
    solar: m,
    trash: _,
    alerts: w,
    windows: k,
    heating: C,
    appliances: S
  } = t, p = [];
  if (e) {
    if (p.push(`${ze(s, !0)} ${n}.`), i && p.push(
      r ? `Draußen ${a}. Empfehlung: ${r}.` : `Draußen ${a}.`
    ), l && p.push(`${l}.`), o && (s === "morgen" || s === "vormittag") && p.push("Schultag — morgens an die Schule denken."), u.length) {
      const d = u[0];
      p.push(
        d.daysUntil === 0 ? `Heute hat ${d.name} Geburtstag (${d.ageTurning})!` : `Bald Geburtstag: ${d.name} in ${d.daysUntil} Tag(en).`
      );
    }
    if (h.length === 0)
      p.push("Heute stehen keine Termine an.");
    else {
      const d = h.slice(0, 3).map((x) => x.summary).filter(Boolean).join(", ");
      p.push(
        h.length === 1 ? `Termin: ${d}.` : `${h.length} Termine, u.a. ${d}.`
      );
    }
    if (m.length && p.push(
      `Solar: ${m.slice(0, 3).map((d) => `${d.name} ${d.state}`).join(", ")}.`
    ), _.length && p.push(
      `Müll: ${_.map((d) => `${d.name} ${d.state}`).join(", ")}.`
    ), k.length && p.push(
      `Fenster offen: ${k.map((d) => d.name).join(", ")}.`
    ), C.length && p.push(
      `Heizöl: ${C.map((d) => `${d.name} ${d.state}`).join(", ")}.`
    ), S.length && p.push(
      `Geräte: ${S.map((d) => `${d.name} ${d.state}`).join(", ")}.`
    ), w.length) {
      const d = w.filter((x) => x.state !== "0" && x.state !== "ok");
      d.length && p.push(
        `Hinweis: ${d.map((x) => `${x.name} ${x.state}`).join(", ")}.`
      );
    }
    c.length && p.push(
      `Zuhause/Status: ${c.map((d) => `${d.name} ${d.state}`).join(", ")}.`
    );
  } else {
    if (p.push(`${ze(s, !1)} ${n}.`), i && p.push(
      r ? `Outside: ${a}. Wear: ${r}.` : `Outside: ${a}.`
    ), l && p.push(`${l}.`), o && (s === "morgen" || s === "vormittag") && p.push("School day — keep the morning routine in mind."), u.length) {
      const d = u[0];
      p.push(
        d.daysUntil === 0 ? `Today is ${d.name}'s birthday (${d.ageTurning})!` : `Birthday soon: ${d.name} in ${d.daysUntil} day(s).`
      );
    }
    p.push(
      h.length === 0 ? "No meetings scheduled." : `${h.length} event(s), starting with ${((Z = h[0]) == null ? void 0 : Z.summary) ?? "Busy"}.`
    ), m.length && p.push(
      `Solar: ${m.slice(0, 3).map((d) => `${d.name} ${d.state}`).join(", ")}.`
    ), _.length && p.push(
      `Trash: ${_.map((d) => `${d.name} ${d.state}`).join(", ")}.`
    ), k.length && p.push(`Open windows: ${k.map((d) => d.name).join(", ")}.`), C.length && p.push(
      `Heating oil: ${C.map((d) => `${d.name} ${d.state}`).join(", ")}.`
    ), S.length && p.push(
      `Devices needing attention: ${S.map((d) => `${d.name} ${d.state}`).join(", ")}.`
    );
  }
  return p.join(" ");
}
function en(t) {
  const {
    weather: e,
    forecast: n = (e == null ? void 0 : e.forecast) ?? [],
    events: s,
    entities: i,
    birthdays: a = [],
    now: r,
    locale: l,
    timeZone: o,
    summaryPrompt: u,
    contextNotes: h
  } = t, c = jt(l), m = Wt(r, o), _ = It(m, c), w = new Intl.DateTimeFormat(l, {
    weekday: "long",
    month: "long",
    day: "numeric",
    timeZone: o
  }).format(r), k = new Intl.DateTimeFormat(l, {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: o
  }).format(r), C = e ? `${Ze(e.condition, c)}, ${Q(
    e.temperature,
    e.temperature_unit
  )}${typeof e.humidity == "number" ? c ? `, Luftfeuchtigkeit ${e.humidity}%` : `, humidity ${e.humidity}%` : ""}` : c ? "Wetter nicht verfügbar" : "Weather unavailable", S = Bt(e, c), p = Zt(i), Z = Jt(
    n,
    e,
    l,
    o,
    c
  ), d = Qt(n, l, o, c), x = zt(a, r, o, 14), Qe = [
    ...x.map((M) => Ht(M, c)),
    ...Yt(s, c)
  ], ge = qt(r, o, h, m), Xe = s.length === 0 ? [] : s.slice(0, 12).map((M) => qe(M, c)), et = (u == null ? void 0 : u.trim()) || Ke, _e = h == null ? void 0 : h.trim(), tt = [
    y(
      c ? "ZEIT" : "TIME",
      [
        c ? `Datum: ${w}` : `Date: ${w}`,
        c ? `Uhrzeit: ${k}` : `Time: ${k}`,
        c ? `Tageszeit: ${_}` : `Time of day: ${_}`
      ],
      ""
    ),
    ..._e ? [
      y(
        c ? "HAUSHALT" : "HOUSEHOLD",
        _e.split(`
`).map((M) => M.trim()).filter(Boolean),
        ""
      )
    ] : [],
    y(
      c ? "SCHULTAG" : "SCHOOL_DAY",
      [
        ge ? c ? "ja — Wochentag und Schulkontext" : "yes — weekday with school context" : c ? "nein" : "no"
      ],
      ""
    ),
    y(
      c ? "WETTER" : "WEATHER",
      [
        C,
        S ? c ? `Kleidungshinweis: ${S}` : `Clothing hint: ${S}` : "",
        d ?? ""
      ].filter(Boolean),
      c ? "Keine Wetterdaten." : "No weather data."
    ),
    y(
      c ? "VORHERSAGE" : "FORECAST",
      Z,
      c ? "Keine Vorhersage." : "No forecast."
    ),
    y(
      c ? "GEBURTSTAGE" : "BIRTHDAYS",
      Qe,
      c ? "Keine Geburtstage in den nächsten 14 Tagen." : "No birthdays in the next 14 days."
    ),
    y(
      c ? "TERMINE" : "AGENDA",
      Xe,
      c ? "Keine Termine." : "No meetings."
    ),
    y(
      c ? "PERSONEN" : "PEOPLE",
      p.people.map(E),
      c ? "Keine Personendaten." : "No people data."
    ),
    y(
      "SOLAR",
      p.solar.map(E),
      c ? "Keine Solarwerte (oder nicht verfügbar)." : "No solar data."
    ),
    y(
      c ? "MUELL" : "TRASH",
      p.trash.map(E),
      c ? "Keine Mülldaten." : "No trash data."
    ),
    y(
      c ? "SONNE" : "SUN",
      p.sun.map(E),
      c ? "Keine Sonnenzeiten." : "No sun times."
    ),
    y(
      c ? "FENSTER" : "WINDOWS",
      p.windows.map(E),
      c ? "Keine offenen Fenster." : "No open windows."
    ),
    y(
      c ? "HEIZOEL" : "HEATING_OIL",
      p.heating.map(E),
      c ? "Kein Heizöl-Sensor." : "No heating-oil sensor."
    ),
    y(
      c ? "GERAETE" : "APPLIANCES",
      p.appliances.map(E),
      c ? "Keine Geräte mit Handlungsbedarf." : "No appliances needing attention."
    ),
    y(
      c ? "WARNUNGEN" : "ALERTS",
      p.alerts.map(E),
      c ? "Keine Warnungen." : "No alerts."
    ),
    y(
      c ? "SONSTIGES" : "OTHER",
      p.other.map(E),
      c ? "Nichts weiteres." : "Nothing else."
    )
  ], ye = [
    et,
    "",
    c ? "DATEN (nur diese Fakten verwenden; fehlende/ungültige Werte weglassen):" : "DATA (use only these facts; skip missing/invalid values):",
    tt.join(`

`),
    "",
    c ? "ANTWORT: Nur der fertige deutsche Fließtext, nichts sonst." : "RESPONSE: Only the finished brief text, nothing else."
  ].join(`
`), nt = Xt({
    german: c,
    dayLabel: w,
    part: m,
    weather: e,
    weatherLine: C,
    clothing: S,
    rainLine: d,
    schoolDay: ge,
    birthdays: x,
    events: s,
    people: p.people,
    solar: p.solar,
    trash: p.trash,
    alerts: p.alerts,
    windows: p.windows,
    heating: p.heating,
    appliances: p.appliances
  });
  return {
    hash: Ft(ye),
    prompt: ye,
    local: nt
  };
}
function Je(t) {
  if (!t) {
    K.clear();
    return;
  }
  K.delete(t);
}
function tn(t, e) {
  const n = K.get(t);
  return n ? n.hash !== e || n.expiresAt < Date.now() ? (K.delete(t), null) : n : null;
}
function re(t, e, n, s, i) {
  K.set(t, {
    hash: e,
    text: n,
    source: s,
    expiresAt: Date.now() + Math.max(1, i) * 6e4
  });
}
async function nn(t, e, n) {
  var a, r, l, o, u, h;
  const s = await t.callWS({
    type: "conversation/process",
    text: n,
    language: ((a = t.locale) == null ? void 0 : a.language) ?? t.config.language ?? "en",
    agent_id: e
  });
  return ((r = s.response) == null ? void 0 : r.response_type) === "error" ? null : ((h = (u = (o = (l = s.response) == null ? void 0 : l.speech) == null ? void 0 : o.plain) == null ? void 0 : u.speech) == null ? void 0 : h.trim()) || null;
}
async function sn(t) {
  const { hass: e, mode: n, agentId: s, digest: i, cacheKey: a, cacheMinutes: r, force: l } = t;
  if (l)
    Je(a);
  else {
    const o = tn(a, i.hash);
    if (o)
      return { text: o.text, source: o.source };
  }
  if (n === "local")
    return re(a, i.hash, i.local, "local", r), { text: i.local, source: "local" };
  try {
    const o = await nn(e, s, i.prompt);
    if (o)
      return re(a, i.hash, o, "ai", r), { text: o, source: "ai" };
  } catch {
  }
  return re(a, i.hash, i.local, "local", r), { text: i.local, source: "local" };
}
const rn = Pe`
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

  .cameras {
    margin-top: 4px;
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
var an = Object.defineProperty, on = Object.getOwnPropertyDescriptor, b = (t, e, n, s) => {
  for (var i = s > 1 ? void 0 : s ? on(e, n) : e, a = t.length - 1, r; a >= 0; a--)
    (r = t[a]) && (i = (s ? r(e, n, i) : r(i)) || i);
  return s && i && an(e, n, i), i;
};
const ae = "daily", oe = 24, He = 15, ce = "auto", cn = 15 * 6e4;
let $ = class extends L {
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
      cameras: [],
      forecast_type: "daily",
      summary_mode: "auto"
    };
  }
  static async getConfigElement() {
    return await Promise.resolve().then(() => mn), document.createElement(Ge);
  }
  setConfig(t) {
    if (!t)
      throw new Error("Invalid configuration");
    this._config = {
      forecast_type: ae,
      horizon_hours: oe,
      summary_mode: ce,
      cache_minutes: He,
      calendars: [],
      entities: [],
      cameras: [],
      birthdays: [],
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
    var e, n, s, i, a, r, l, o;
    if (t.has("_config") || t.has("_weather") || t.has("_forecast") || t.has("_entities") || t.has("_events") || t.has("_summary") || t.has("_summarySource") || t.has("_errors") || t.has("_loadingEvents") || t.has("_refreshing") || t.has("_contextOpen") || t.has("_now"))
      return !0;
    if (t.has("hass")) {
      const u = t.get("hass");
      if ((e = this._config) != null && e.weather_entity && Oe(
        (n = u == null ? void 0 : u.states) == null ? void 0 : n[this._config.weather_entity],
        (i = (s = this.hass) == null ? void 0 : s.states) == null ? void 0 : i[this._config.weather_entity]
      ))
        return !0;
      for (const h of ((a = this._config) == null ? void 0 : a.entities) ?? [])
        if (Oe((r = u == null ? void 0 : u.states) == null ? void 0 : r[h], (o = (l = this.hass) == null ? void 0 : l.states) == null ? void 0 : o[h]))
          return !0;
    }
    return !1;
  }
  _startRefreshLoop() {
    this._stopRefreshLoop(), this._refreshData(!0), this._refreshTimer = window.setInterval(() => {
      this._refreshData(!1);
    }, cn);
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
    var n, s, i;
    const t = ((s = (n = this.hass) == null ? void 0 : n.locale) == null ? void 0 : s.language) ?? "en", e = (i = this.hass) == null ? void 0 : i.config.time_zone;
    return new Intl.DateTimeFormat(t, {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: e
    }).format(this._now);
  }
  _cameraName(t) {
    var n, s, i, a;
    const e = (n = this.hass) == null ? void 0 : n.states[t];
    return ((a = (i = (s = this.hass) == null ? void 0 : s.entities) == null ? void 0 : i[t]) == null ? void 0 : a.name) ?? (typeof (e == null ? void 0 : e.attributes.friendly_name) == "string" ? e.attributes.friendly_name : t.replace(/^camera\./, "").replace(/_/g, " "));
  }
  _cameraSrc(t) {
    var s;
    const e = (s = this.hass) == null ? void 0 : s.states[t];
    if (!e)
      return null;
    const n = e.attributes.access_token;
    return typeof n != "string" || !n ? null : `/api/camera_proxy_stream/${t}?token=${encodeURIComponent(n)}`;
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
      this._config.summary_mode ?? ce,
      this._config.agent_id ?? "",
      this._config.summary_prompt ?? "",
      this._config.context_notes ?? "",
      JSON.stringify(this._config.birthdays ?? [])
    ].join("|");
  }
  _syncWeatherFromHass() {
    const t = this._config.weather_entity;
    if (!t) {
      this._weather = null;
      return;
    }
    const e = Pt(this.hass, t);
    if (!e) {
      this._weather = null, this._pushError(`Weather entity not found: ${t}`);
      return;
    }
    this._weather = { ...e, forecast: this._forecast };
  }
  _syncEntitiesFromHass() {
    const { entities: t, missing: e } = Nt(
      this.hass,
      this._config.entities ?? []
    );
    this._entities = t;
    for (const n of e)
      this._pushError(`Entity not found: ${n}`);
  }
  async _ensureForecastSubscription() {
    const t = this._config.weather_entity, e = this._config.forecast_type ?? ae;
    if (!(this._unsubForecast && this._lastWeatherEntity === t && this._lastForecastType === e)) {
      if (this._teardownForecast(), this._lastWeatherEntity = t, this._lastForecastType = e, !t || e === "none" || !this.hass) {
        this._forecast = [];
        return;
      }
      try {
        this._unsubForecast = await Rt(
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
      this._refreshing = !0, Je(this._cacheKey());
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
    const n = ++this._fetchGeneration, s = [];
    this._loadingEvents = !0, this._syncWeatherFromHass(), this._syncEntitiesFromHass();
    const i = this._config.calendars ?? [], a = this._config.horizon_hours ?? oe, { events: r, errors: l } = await At(
      this.hass,
      i,
      a
    );
    if (n === this._fetchGeneration) {
      this._events = r, s.push(...l), this._loadingEvents = !1, this._config.weather_entity ? this.hass.states[this._config.weather_entity] || s.push(`Weather entity not found: ${this._config.weather_entity}`) : s.push("No weather_entity configured");
      for (const o of this._config.entities ?? [])
        this.hass.states[o] || s.push(`Entity not found: ${o}`);
      this._errors = [...new Set(s)].slice(-6), await this._refreshSummary(t, e);
    }
  }
  async _refreshSummary(t, e = !1) {
    var o;
    if (!this.hass || !this._config)
      return;
    const n = this._config.summary_mode ?? ce, s = this._config.cache_minutes ?? He, i = ((o = this.hass.locale) == null ? void 0 : o.language) ?? "en", a = this.hass.config.time_zone, r = en({
      weather: this._weather,
      forecast: this._forecast,
      events: this._events,
      entities: this._entities,
      birthdays: this._config.birthdays,
      now: /* @__PURE__ */ new Date(),
      locale: i,
      timeZone: a,
      summaryPrompt: this._config.summary_prompt,
      contextNotes: this._config.context_notes
    }), l = this._cacheKey();
    (t || e || !this._summary || this._summarySource === "loading") && (this._summarySource = "loading");
    try {
      const u = await sn({
        hass: this.hass,
        mode: n,
        agentId: this._config.agent_id,
        digest: r,
        cacheKey: l,
        cacheMinutes: s,
        force: e
      });
      this._summary = u.text, this._summarySource = u.source;
    } catch {
      this._summary = r.local, this._summarySource = "local";
    }
  }
  _dayTitle() {
    var n, s, i;
    if (this._config.title)
      return this._config.title;
    const t = ((s = (n = this.hass) == null ? void 0 : n.locale) == null ? void 0 : s.language) ?? "en", e = (i = this.hass) == null ? void 0 : i.config.time_zone;
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
    const e = ((a = this.hass.locale) == null ? void 0 : a.language) ?? "en", n = this.hass.config.time_zone, s = this._config.forecast_type ?? ae, i = new Date(t.datetime);
    return s === "hourly" ? new Intl.DateTimeFormat(e, {
      hour: "numeric",
      timeZone: n
    }).format(i) : new Intl.DateTimeFormat(e, {
      weekday: "short",
      timeZone: n
    }).format(i);
  }
  render() {
    var s, i, a;
    if (!this._config)
      return g;
    const t = ((i = (s = this.hass) == null ? void 0 : s.locale) == null ? void 0 : i.language) ?? "en", e = ((a = this.hass) == null ? void 0 : a.config.time_zone) ?? "UTC", n = this._weather;
    return f`
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

        ${this._summary && this._summarySource !== "loading" ? f`
              <div class="meta">
                <span
                  class="dot ${this._summarySource === "local" ? "local" : ""}"
                ></span>
                <span
                  >${this._summarySource === "ai" ? "AI brief" : "Local brief"}</span
                >
              </div>
            ` : g}

        <div class="sections">
          <section>
            <h3 class="section-title">Weather</h3>
            ${n ? f`
                  <div class="weather-row">
                    <p class="condition">
                      ${De(n.condition)}
                    </p>
                    <p class="temp">
                      ${Q(
      n.temperature,
      n.temperature_unit
    )}
                    </p>
                  </div>
                  <p class="weather-meta">
                    ${n.friendly_name ?? n.entity_id}
                    ${typeof n.humidity == "number" ? f` · ${n.humidity}% humidity` : g}
                  </p>
                  ${this._forecast.length ? f`
                        <div class="forecast">
                          ${this._forecast.map(
      (r) => f`
                              <div class="forecast-item">
                                <span class="forecast-day"
                                  >${this._forecastLabel(r)}</span
                                >
                                <span class="forecast-cond"
                                  >${De(
        r.condition ?? ""
      )}</span
                                >
                                <span class="forecast-temp"
                                  >${Q(
        r.temperature,
        n.temperature_unit
      )}</span
                                >
                              </div>
                            `
    )}
                        </div>
                      ` : g}
                ` : f`<p class="empty">Configure a weather entity to begin.</p>`}
          </section>

          <section>
            <h3 class="section-title">Meetings</h3>
            ${this._loadingEvents && this._events.length === 0 ? f`<p class="empty loading">Loading calendars…</p>` : this._events.length === 0 ? f`<p class="empty">
                    No meetings in the next
                    ${this._config.horizon_hours ?? oe} hours.
                  </p>` : f`
                    <ul class="events">
                      ${this._events.map(
      (r) => f`
                          <li class="event">
                            <span class="event-time"
                              >${Tt(
        r,
        t,
        e
      )}</span
                            >
                            <div class="event-body">
                              <p class="event-title">${r.summary}</p>
                              ${r.calendar_name ? f`<p class="event-cal">
                                    ${r.calendar_name}${r.location ? ` · ${r.location}` : ""}
                                  </p>` : g}
                            </div>
                          </li>
                        `
    )}
                    </ul>
                  `}
          </section>

          ${this._entities.length ? f`
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
                  ${this._contextOpen ? f`
                        <ul class="entity-list">
                          ${this._entities.map(
      (r) => f`
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

          ${(this._config.cameras ?? []).length ? f`
                <section class="cameras">
                  <h3 class="section-title">Cameras</h3>
                  <div class="camera-grid">
                    ${(this._config.cameras ?? []).map((r) => {
      const l = this._cameraSrc(r);
      return f`
                        <button
                          class="camera-tile"
                          type="button"
                          @click=${() => this._openMoreInfo(r)}
                        >
                          ${l ? f`<img
                                class="camera-feed"
                                src=${l}
                                alt=${this._cameraName(r)}
                              />` : f`<div class="camera-missing">No feed</div>`}
                          <span class="camera-label"
                            >${this._cameraName(r)}</span
                          >
                        </button>
                      `;
    })}
                  </div>
                </section>
              ` : g}
        </div>

        ${this._errors.length ? f`
              <div class="errors">
                ${this._errors.map(
      (r) => f`<span class="error-chip">${r}</span>`
    )}
              </div>
            ` : g}
      </ha-card>
    `;
  }
};
$.styles = rn;
b([
  me({ attribute: !1 })
], $.prototype, "hass", 2);
b([
  v()
], $.prototype, "_config", 2);
b([
  v()
], $.prototype, "_weather", 2);
b([
  v()
], $.prototype, "_forecast", 2);
b([
  v()
], $.prototype, "_events", 2);
b([
  v()
], $.prototype, "_entities", 2);
b([
  v()
], $.prototype, "_summary", 2);
b([
  v()
], $.prototype, "_summarySource", 2);
b([
  v()
], $.prototype, "_errors", 2);
b([
  v()
], $.prototype, "_loadingEvents", 2);
b([
  v()
], $.prototype, "_refreshing", 2);
b([
  v()
], $.prototype, "_contextOpen", 2);
b([
  v()
], $.prototype, "_now", 2);
$ = b([
  We(Be)
], $);
window.customCards = window.customCards || [];
window.customCards.push({
  type: Be,
  name: Ie,
  description: "AI-first day brief with weather, calendars, extra entities, and a short narrative.",
  preview: !0,
  documentationURL: "https://github.com/jenskock/lovelace-day-brief"
});
console.info(
  `%c ${Ie} %c ${St} `,
  "color:#fff;background:#03a9f4;font-weight:700",
  "color:#03a9f4;background:transparent;font-weight:700"
);
var ln = Object.defineProperty, hn = Object.getOwnPropertyDescriptor, fe = (t, e, n, s) => {
  for (var i = s > 1 ? void 0 : s ? hn(e, n) : e, a = t.length - 1, r; a >= 0; a--)
    (r = t[a]) && (i = (s ? r(e, n, i) : r(i)) || i);
  return s && i && ln(e, n, i), i;
};
const un = [
  "daily",
  "hourly",
  "twice_daily",
  "none"
], dn = ["auto", "ai", "local"];
function pn(t, e) {
  t.dispatchEvent(
    new CustomEvent("config-changed", {
      detail: { config: e },
      bubbles: !0,
      composed: !0
    })
  );
}
function le(t) {
  return [
    ...new Set(
      t.split(/[\n,]/).map((e) => e.trim()).filter(Boolean)
    )
  ];
}
let R = class extends L {
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
    this._config = e, pn(this, e);
  }
  _value(t) {
    return t.target.value;
  }
  _onWeather(t) {
    this._update({ weather_entity: this._value(t) || void 0 });
  }
  _onCalendars(t) {
    this._update({ calendars: le(this._value(t)) });
  }
  _onEntities(t) {
    this._update({ entities: le(this._value(t)) });
  }
  _onCameras(t) {
    this._update({ cameras: le(this._value(t)) });
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
    const e = Lt(this._value(t));
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
    const t = this._config.calendars ?? [], e = this._config.entities ?? [], n = this._weatherEntities(), s = this._calendarEntities();
    return f`
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
      (i) => f`<option
                  value=${i}
                  ?selected=${i === this._config.weather_entity}
                >
                  ${i}
                </option>`
    )}
          </select>
        </label>

        <fieldset>
          <legend>Calendars</legend>
          ${s.length === 0 ? f`
                <textarea
                  rows="3"
                  placeholder="calendar.personal, calendar.work"
                  .value=${t.join(`
`)}
                  @change=${this._onCalendars}
                ></textarea>
              ` : f`
                <div class="checks">
                  ${s.map(
      (i) => f`
                      <label class="check">
                        <input
                          type="checkbox"
                          .checked=${t.includes(i)}
                          @change=${() => this._toggleCalendar(i)}
                        />
                        <span>${i}</span>
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
            >Live feeds at the bottom (2×2 / 4 across on wide screens).</span
          >
        </label>

        <label>
          Forecast type
          <select
            .value=${this._config.forecast_type ?? "daily"}
            @change=${this._onForecast}
          >
            ${un.map(
      (i) => f`<option
                  value=${i}
                  ?selected=${(this._config.forecast_type ?? "daily") === i}
                >
                  ${i}
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
            ${dn.map(
      (i) => f`<option
                  value=${i}
                  ?selected=${(this._config.summary_mode ?? "auto") === i}
                >
                  ${i}
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
            .value=${Ut(this._config.birthdays ?? [])}
            @change=${this._onBirthdays}
          ></textarea>
          <span class="hint">One per line: Name: YYYY-MM-DD</span>
        </label>

        <label>
          System prompt
          <textarea
            rows="5"
            placeholder=${Ke}
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
      </div>
    `;
  }
};
R.styles = Pe`
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
fe([
  me({ attribute: !1 })
], R.prototype, "hass", 2);
fe([
  v()
], R.prototype, "_config", 2);
R = fe([
  We(Ge)
], R);
const mn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get DayBriefCardEditor() {
    return R;
  }
}, Symbol.toStringTag, { value: "Module" }));
export {
  $ as DayBriefCard
};
//# sourceMappingURL=day-brief.js.map
