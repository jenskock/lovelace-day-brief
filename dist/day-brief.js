/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const F = globalThis, Q = F.ShadowRoot && (F.ShadyCSS === void 0 || F.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, X = Symbol(), it = /* @__PURE__ */ new WeakMap();
let $t = class {
  constructor(t, e, r) {
    if (this._$cssResult$ = !0, r !== X) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (Q && t === void 0) {
      const r = e !== void 0 && e.length === 1;
      r && (t = it.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), r && it.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Pt = (s) => new $t(typeof s == "string" ? s : s + "", void 0, X), vt = (s, ...t) => {
  const e = s.length === 1 ? s[0] : t.reduce((r, i, n) => r + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + s[n + 1], s[0]);
  return new $t(e, s, X);
}, Ot = (s, t) => {
  if (Q) s.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const r = document.createElement("style"), i = F.litNonce;
    i !== void 0 && r.setAttribute("nonce", i), r.textContent = e.cssText, s.appendChild(r);
  }
}, nt = Q ? (s) => s : (s) => s instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const r of t.cssRules) e += r.cssText;
  return Pt(e);
})(s) : s;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Dt, defineProperty: Nt, getOwnPropertyDescriptor: Ut, getOwnPropertyNames: zt, getOwnPropertySymbols: Mt, getPrototypeOf: kt } = Object, v = globalThis, ot = v.trustedTypes, Rt = ot ? ot.emptyScript : "", W = v.reactiveElementPolyfillSupport, D = (s, t) => s, L = { toAttribute(s, t) {
  switch (t) {
    case Boolean:
      s = s ? Rt : null;
      break;
    case Object:
    case Array:
      s = s == null ? s : JSON.stringify(s);
  }
  return s;
}, fromAttribute(s, t) {
  let e = s;
  switch (t) {
    case Boolean:
      e = s !== null;
      break;
    case Number:
      e = s === null ? null : Number(s);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(s);
      } catch {
        e = null;
      }
  }
  return e;
} }, tt = (s, t) => !Dt(s, t), at = { attribute: !0, type: String, converter: L, reflect: !1, useDefault: !1, hasChanged: tt };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), v.litPropertyMetadata ?? (v.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let E = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = at) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const r = Symbol(), i = this.getPropertyDescriptor(t, r, e);
      i !== void 0 && Nt(this.prototype, t, i);
    }
  }
  static getPropertyDescriptor(t, e, r) {
    const { get: i, set: n } = Ut(this.prototype, t) ?? { get() {
      return this[e];
    }, set(o) {
      this[e] = o;
    } };
    return { get: i, set(o) {
      const a = i == null ? void 0 : i.call(this);
      n == null || n.call(this, o), this.requestUpdate(t, a, r);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? at;
  }
  static _$Ei() {
    if (this.hasOwnProperty(D("elementProperties"))) return;
    const t = kt(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(D("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(D("properties"))) {
      const e = this.properties, r = [...zt(e), ...Mt(e)];
      for (const i of r) this.createProperty(i, e[i]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [r, i] of e) this.elementProperties.set(r, i);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, r] of this.elementProperties) {
      const i = this._$Eu(e, r);
      i !== void 0 && this._$Eh.set(i, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const r = new Set(t.flat(1 / 0).reverse());
      for (const i of r) e.unshift(nt(i));
    } else t !== void 0 && e.push(nt(t));
    return e;
  }
  static _$Eu(t, e) {
    const r = e.attribute;
    return r === !1 ? void 0 : typeof r == "string" ? r : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var t;
    this._$ES = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (t = this.constructor.l) == null || t.forEach((e) => e(this));
  }
  addController(t) {
    var e;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(t), this.renderRoot !== void 0 && this.isConnected && ((e = t.hostConnected) == null || e.call(t));
  }
  removeController(t) {
    var e;
    (e = this._$EO) == null || e.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), e = this.constructor.elementProperties;
    for (const r of e.keys()) this.hasOwnProperty(r) && (t.set(r, this[r]), delete this[r]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Ot(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    var t;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$EO) == null || t.forEach((e) => {
      var r;
      return (r = e.hostConnected) == null ? void 0 : r.call(e);
    });
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t;
    (t = this._$EO) == null || t.forEach((e) => {
      var r;
      return (r = e.hostDisconnected) == null ? void 0 : r.call(e);
    });
  }
  attributeChangedCallback(t, e, r) {
    this._$AK(t, r);
  }
  _$ET(t, e) {
    var n;
    const r = this.constructor.elementProperties.get(t), i = this.constructor._$Eu(t, r);
    if (i !== void 0 && r.reflect === !0) {
      const o = (((n = r.converter) == null ? void 0 : n.toAttribute) !== void 0 ? r.converter : L).toAttribute(e, r.type);
      this._$Em = t, o == null ? this.removeAttribute(i) : this.setAttribute(i, o), this._$Em = null;
    }
  }
  _$AK(t, e) {
    var n, o;
    const r = this.constructor, i = r._$Eh.get(t);
    if (i !== void 0 && this._$Em !== i) {
      const a = r.getPropertyOptions(i), c = typeof a.converter == "function" ? { fromAttribute: a.converter } : ((n = a.converter) == null ? void 0 : n.fromAttribute) !== void 0 ? a.converter : L;
      this._$Em = i;
      const l = c.fromAttribute(e, a.type);
      this[i] = l ?? ((o = this._$Ej) == null ? void 0 : o.get(i)) ?? l, this._$Em = null;
    }
  }
  requestUpdate(t, e, r, i = !1, n) {
    var o;
    if (t !== void 0) {
      const a = this.constructor;
      if (i === !1 && (n = this[t]), r ?? (r = a.getPropertyOptions(t)), !((r.hasChanged ?? tt)(n, e) || r.useDefault && r.reflect && n === ((o = this._$Ej) == null ? void 0 : o.get(t)) && !this.hasAttribute(a._$Eu(t, r)))) return;
      this.C(t, e, r);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: r, reflect: i, wrapped: n }, o) {
    r && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, o ?? e ?? this[t]), n !== !0 || o !== void 0) || (this._$AL.has(t) || (this.hasUpdated || r || (e = void 0), this._$AL.set(t, e)), i === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (e) {
      Promise.reject(e);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var r;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [n, o] of this._$Ep) this[n] = o;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [n, o] of i) {
        const { wrapped: a } = o, c = this[n];
        a !== !0 || this._$AL.has(n) || c === void 0 || this.C(n, void 0, o, c);
      }
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), (r = this._$EO) == null || r.forEach((i) => {
        var n;
        return (n = i.hostUpdate) == null ? void 0 : n.call(i);
      }), this.update(e)) : this._$EM();
    } catch (i) {
      throw t = !1, this._$EM(), i;
    }
    t && this._$AE(e);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var e;
    (e = this._$EO) == null || e.forEach((r) => {
      var i;
      return (i = r.hostUpdated) == null ? void 0 : i.call(r);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
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
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$Eq && (this._$Eq = this._$Eq.forEach((e) => this._$ET(e, this[e]))), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
E.elementStyles = [], E.shadowRootOptions = { mode: "open" }, E[D("elementProperties")] = /* @__PURE__ */ new Map(), E[D("finalized")] = /* @__PURE__ */ new Map(), W == null || W({ ReactiveElement: E }), (v.reactiveElementVersions ?? (v.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const N = globalThis, ct = (s) => s, j = N.trustedTypes, lt = j ? j.createPolicy("lit-html", { createHTML: (s) => s }) : void 0, bt = "$lit$", $ = `lit$${Math.random().toFixed(9).slice(2)}$`, wt = "?" + $, Ht = `<${wt}>`, x = document, U = () => x.createComment(""), z = (s) => s === null || typeof s != "object" && typeof s != "function", et = Array.isArray, Ft = (s) => et(s) || typeof (s == null ? void 0 : s[Symbol.iterator]) == "function", B = `[ 	
\f\r]`, O = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ht = /-->/g, dt = />/g, b = RegExp(`>|${B}(?:([^\\s"'>=/]+)(${B}*=${B}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), ut = /'/g, pt = /"/g, At = /^(?:script|style|textarea|title)$/i, Lt = (s) => (t, ...e) => ({ _$litType$: s, strings: t, values: e }), p = Lt(1), C = Symbol.for("lit-noChange"), u = Symbol.for("lit-nothing"), ft = /* @__PURE__ */ new WeakMap(), w = x.createTreeWalker(x, 129);
function xt(s, t) {
  if (!et(s) || !s.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return lt !== void 0 ? lt.createHTML(t) : t;
}
const jt = (s, t) => {
  const e = s.length - 1, r = [];
  let i, n = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = O;
  for (let a = 0; a < e; a++) {
    const c = s[a];
    let l, h, d = -1, f = 0;
    for (; f < c.length && (o.lastIndex = f, h = o.exec(c), h !== null); ) f = o.lastIndex, o === O ? h[1] === "!--" ? o = ht : h[1] !== void 0 ? o = dt : h[2] !== void 0 ? (At.test(h[2]) && (i = RegExp("</" + h[2], "g")), o = b) : h[3] !== void 0 && (o = b) : o === b ? h[0] === ">" ? (o = i ?? O, d = -1) : h[1] === void 0 ? d = -2 : (d = o.lastIndex - h[2].length, l = h[1], o = h[3] === void 0 ? b : h[3] === '"' ? pt : ut) : o === pt || o === ut ? o = b : o === ht || o === dt ? o = O : (o = b, i = void 0);
    const y = o === b && s[a + 1].startsWith("/>") ? " " : "";
    n += o === O ? c + Ht : d >= 0 ? (r.push(l), c.slice(0, d) + bt + c.slice(d) + $ + y) : c + $ + (d === -2 ? a : y);
  }
  return [xt(s, n + (s[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), r];
};
class M {
  constructor({ strings: t, _$litType$: e }, r) {
    let i;
    this.parts = [];
    let n = 0, o = 0;
    const a = t.length - 1, c = this.parts, [l, h] = jt(t, e);
    if (this.el = M.createElement(l, r), w.currentNode = this.el.content, e === 2 || e === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (i = w.nextNode()) !== null && c.length < a; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const d of i.getAttributeNames()) if (d.endsWith(bt)) {
          const f = h[o++], y = i.getAttribute(d).split($), R = /([.?@])?(.*)/.exec(f);
          c.push({ type: 1, index: n, name: R[2], strings: y, ctor: R[1] === "." ? Wt : R[1] === "?" ? Bt : R[1] === "@" ? Vt : I }), i.removeAttribute(d);
        } else d.startsWith($) && (c.push({ type: 6, index: n }), i.removeAttribute(d));
        if (At.test(i.tagName)) {
          const d = i.textContent.split($), f = d.length - 1;
          if (f > 0) {
            i.textContent = j ? j.emptyScript : "";
            for (let y = 0; y < f; y++) i.append(d[y], U()), w.nextNode(), c.push({ type: 2, index: ++n });
            i.append(d[f], U());
          }
        }
      } else if (i.nodeType === 8) if (i.data === wt) c.push({ type: 2, index: n });
      else {
        let d = -1;
        for (; (d = i.data.indexOf($, d + 1)) !== -1; ) c.push({ type: 7, index: n }), d += $.length - 1;
      }
      n++;
    }
  }
  static createElement(t, e) {
    const r = x.createElement("template");
    return r.innerHTML = t, r;
  }
}
function T(s, t, e = s, r) {
  var o, a;
  if (t === C) return t;
  let i = r !== void 0 ? (o = e._$Co) == null ? void 0 : o[r] : e._$Cl;
  const n = z(t) ? void 0 : t._$litDirective$;
  return (i == null ? void 0 : i.constructor) !== n && ((a = i == null ? void 0 : i._$AO) == null || a.call(i, !1), n === void 0 ? i = void 0 : (i = new n(s), i._$AT(s, e, r)), r !== void 0 ? (e._$Co ?? (e._$Co = []))[r] = i : e._$Cl = i), i !== void 0 && (t = T(s, i._$AS(s, t.values), i, r)), t;
}
class It {
  constructor(t, e) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = e;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: e }, parts: r } = this._$AD, i = ((t == null ? void 0 : t.creationScope) ?? x).importNode(e, !0);
    w.currentNode = i;
    let n = w.nextNode(), o = 0, a = 0, c = r[0];
    for (; c !== void 0; ) {
      if (o === c.index) {
        let l;
        c.type === 2 ? l = new k(n, n.nextSibling, this, t) : c.type === 1 ? l = new c.ctor(n, c.name, c.strings, this, t) : c.type === 6 && (l = new qt(n, this, t)), this._$AV.push(l), c = r[++a];
      }
      o !== (c == null ? void 0 : c.index) && (n = w.nextNode(), o++);
    }
    return w.currentNode = x, i;
  }
  p(t) {
    let e = 0;
    for (const r of this._$AV) r !== void 0 && (r.strings !== void 0 ? (r._$AI(t, r, e), e += r.strings.length - 2) : r._$AI(t[e])), e++;
  }
}
class k {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, e, r, i) {
    this.type = 2, this._$AH = u, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = r, this.options = i, this._$Cv = (i == null ? void 0 : i.isConnected) ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e = this._$AM;
    return e !== void 0 && (t == null ? void 0 : t.nodeType) === 11 && (t = e.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e = this) {
    t = T(this, t, e), z(t) ? t === u || t == null || t === "" ? (this._$AH !== u && this._$AR(), this._$AH = u) : t !== this._$AH && t !== C && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Ft(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== u && z(this._$AH) ? this._$AA.nextSibling.data = t : this.T(x.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var n;
    const { values: e, _$litType$: r } = t, i = typeof r == "number" ? this._$AC(t) : (r.el === void 0 && (r.el = M.createElement(xt(r.h, r.h[0]), this.options)), r);
    if (((n = this._$AH) == null ? void 0 : n._$AD) === i) this._$AH.p(e);
    else {
      const o = new It(i, this), a = o.u(this.options);
      o.p(e), this.T(a), this._$AH = o;
    }
  }
  _$AC(t) {
    let e = ft.get(t.strings);
    return e === void 0 && ft.set(t.strings, e = new M(t)), e;
  }
  k(t) {
    et(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let r, i = 0;
    for (const n of t) i === e.length ? e.push(r = new k(this.O(U()), this.O(U()), this, this.options)) : r = e[i], r._$AI(n), i++;
    i < e.length && (this._$AR(r && r._$AB.nextSibling, i), e.length = i);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var r;
    for ((r = this._$AP) == null ? void 0 : r.call(this, !1, !0, e); t !== this._$AB; ) {
      const i = ct(t).nextSibling;
      ct(t).remove(), t = i;
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 && (this._$Cv = t, (e = this._$AP) == null || e.call(this, t));
  }
}
class I {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, r, i, n) {
    this.type = 1, this._$AH = u, this._$AN = void 0, this.element = t, this.name = e, this._$AM = i, this.options = n, r.length > 2 || r[0] !== "" || r[1] !== "" ? (this._$AH = Array(r.length - 1).fill(new String()), this.strings = r) : this._$AH = u;
  }
  _$AI(t, e = this, r, i) {
    const n = this.strings;
    let o = !1;
    if (n === void 0) t = T(this, t, e, 0), o = !z(t) || t !== this._$AH && t !== C, o && (this._$AH = t);
    else {
      const a = t;
      let c, l;
      for (t = n[0], c = 0; c < n.length - 1; c++) l = T(this, a[r + c], e, c), l === C && (l = this._$AH[c]), o || (o = !z(l) || l !== this._$AH[c]), l === u ? t = u : t !== u && (t += (l ?? "") + n[c + 1]), this._$AH[c] = l;
    }
    o && !i && this.j(t);
  }
  j(t) {
    t === u ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Wt extends I {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === u ? void 0 : t;
  }
}
class Bt extends I {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== u);
  }
}
class Vt extends I {
  constructor(t, e, r, i, n) {
    super(t, e, r, i, n), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = T(this, t, e, 0) ?? u) === C) return;
    const r = this._$AH, i = t === u && r !== u || t.capture !== r.capture || t.once !== r.once || t.passive !== r.passive, n = t !== u && (r === u || i);
    i && this.element.removeEventListener(this.name, this, r), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e;
    typeof this._$AH == "function" ? this._$AH.call(((e = this.options) == null ? void 0 : e.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class qt {
  constructor(t, e, r) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = r;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    T(this, t);
  }
}
const V = N.litHtmlPolyfillSupport;
V == null || V(M, k), (N.litHtmlVersions ?? (N.litHtmlVersions = [])).push("3.3.3");
const Zt = (s, t, e) => {
  const r = (e == null ? void 0 : e.renderBefore) ?? t;
  let i = r._$litPart$;
  if (i === void 0) {
    const n = (e == null ? void 0 : e.renderBefore) ?? null;
    r._$litPart$ = i = new k(t.insertBefore(U(), n), n, void 0, e ?? {});
  }
  return i._$AI(s), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const A = globalThis;
class S extends E {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var e;
    const t = super.createRenderRoot();
    return (e = this.renderOptions).renderBefore ?? (e.renderBefore = t.firstChild), t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Zt(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var t;
    super.connectedCallback(), (t = this._$Do) == null || t.setConnected(!0);
  }
  disconnectedCallback() {
    var t;
    super.disconnectedCallback(), (t = this._$Do) == null || t.setConnected(!1);
  }
  render() {
    return C;
  }
}
var yt;
S._$litElement$ = !0, S.finalized = !0, (yt = A.litElementHydrateSupport) == null || yt.call(A, { LitElement: S });
const q = A.litElementPolyfillSupport;
q == null || q({ LitElement: S });
(A.litElementVersions ?? (A.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Et = (s) => (t, e) => {
  e !== void 0 ? e.addInitializer(() => {
    customElements.define(s, t);
  }) : customElements.define(s, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Yt = { attribute: !0, type: String, converter: L, reflect: !1, hasChanged: tt }, Gt = (s = Yt, t, e) => {
  const { kind: r, metadata: i } = e;
  let n = globalThis.litPropertyMetadata.get(i);
  if (n === void 0 && globalThis.litPropertyMetadata.set(i, n = /* @__PURE__ */ new Map()), r === "setter" && ((s = Object.create(s)).wrapped = !0), n.set(e.name, s), r === "accessor") {
    const { name: o } = e;
    return { set(a) {
      const c = t.get.call(this);
      t.set.call(this, a), this.requestUpdate(o, c, s, !0, a);
    }, init(a) {
      return a !== void 0 && this.C(o, void 0, s, a), a;
    } };
  }
  if (r === "setter") {
    const { name: o } = e;
    return function(a) {
      const c = this[o];
      t.call(this, a), this.requestUpdate(o, c, s, !0, a);
    };
  }
  throw Error("Unsupported decorator location: " + r);
};
function st(s) {
  return (t, e) => typeof e == "object" ? Gt(s, t, e) : ((r, i, n) => {
    const o = i.hasOwnProperty(n);
    return i.constructor.createProperty(n, r), o ? Object.getOwnPropertyDescriptor(i, n) : void 0;
  })(s, t, e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function g(s) {
  return st({ ...s, state: !0, attribute: !1 });
}
const Kt = "1.0.0", St = "Day Brief", Ct = "day-brief-card", Tt = "day-brief-card-editor";
function _t(s) {
  if (!s)
    return null;
  if (typeof s == "string") {
    const t = /^\d{4}-\d{2}-\d{2}$/.test(s);
    return { iso: s, allDay: t };
  }
  return s.dateTime ? { iso: s.dateTime, allDay: !1 } : s.date ? { iso: s.date, allDay: !0 } : null;
}
function Jt(s, t) {
  var e, r, i;
  return ((r = (e = s.entities) == null ? void 0 : e[t]) == null ? void 0 : r.name) ?? (typeof ((i = s.states[t]) == null ? void 0 : i.attributes.friendly_name) == "string" ? s.states[t].attributes.friendly_name : t.replace(/^calendar\./, "").replace(/_/g, " "));
}
async function Qt(s, t, e) {
  const r = [...new Set(t.filter(Boolean))];
  if (r.length === 0)
    return { events: [], errors: [] };
  const i = [];
  let n = {};
  try {
    const a = await s.callService(
      "calendar",
      "get_events",
      {
        duration: { hours: e }
      },
      { entity_id: r },
      !0,
      !0
    ), c = a && "response" in a ? a.response : void 0;
    c && typeof c == "object" && (n = c);
  } catch (a) {
    return i.push(
      a instanceof Error ? a.message : "Failed to load calendar events"
    ), { events: [], errors: i };
  }
  const o = [];
  for (const a of r) {
    const c = n[a];
    if (!c) {
      i.push(`No response for ${a}`);
      continue;
    }
    if (c.error) {
      i.push(`${a}: ${c.error}`);
      continue;
    }
    const l = Jt(s, a);
    for (const h of c.events ?? []) {
      const d = _t(h.start), f = _t(h.end);
      !d || !f || o.push({
        summary: h.summary || "Busy",
        description: h.description,
        location: h.location,
        start: d.iso,
        end: f.iso,
        all_day: d.allDay || f.allDay,
        calendar_id: a,
        calendar_name: l
      });
    }
  }
  return o.sort((a, c) => a.start.localeCompare(c.start)), { events: o, errors: i };
}
function Xt(s, t, e) {
  if (s.all_day)
    return "All day";
  const r = new Date(s.start);
  return Number.isNaN(r.getTime()) ? s.start : new Intl.DateTimeFormat(t, {
    hour: "numeric",
    minute: "2-digit",
    timeZone: e
  }).format(r);
}
function te(s, t) {
  var n, o, a;
  const e = s.states[t];
  if (!e)
    return null;
  const r = e.attributes, i = ((o = (n = s.entities) == null ? void 0 : n[t]) == null ? void 0 : o.name) ?? (typeof r.friendly_name == "string" ? r.friendly_name : t);
  return {
    entity_id: t,
    condition: e.state,
    temperature: typeof r.temperature == "number" ? r.temperature : void 0,
    temperature_unit: typeof r.temperature_unit == "string" ? r.temperature_unit : (a = s.config.unit_system) == null ? void 0 : a.temperature,
    humidity: typeof r.humidity == "number" ? r.humidity : void 0,
    wind_speed: typeof r.wind_speed == "number" ? r.wind_speed : void 0,
    wind_speed_unit: typeof r.wind_speed_unit == "string" ? r.wind_speed_unit : void 0,
    friendly_name: i,
    forecast: []
  };
}
async function ee(s, t, e, r) {
  const i = await s.connection.subscribeMessage(
    (n) => {
      r(Array.isArray(n.forecast) ? n.forecast : []);
    },
    {
      type: "weather/subscribe_forecast",
      entity_id: t,
      forecast_type: e
    }
  );
  return () => {
    i();
  };
}
function G(s) {
  return !s || s === "unknown" || s === "unavailable" ? "Weather unavailable" : s.replace(/_/g, " ");
}
function K(s, t) {
  if (typeof s != "number" || Number.isNaN(s))
    return "—";
  const e = Number.isInteger(s) ? String(s) : s.toFixed(1);
  return t ? `${e}°${t}` : `${e}°`;
}
function se(s, t) {
  return s === t ? !1 : !s || !t ? !0 : s.state !== t.state || s.last_updated !== t.last_updated || s.attributes.temperature !== t.attributes.temperature || s.attributes.humidity !== t.attributes.humidity;
}
const J = /* @__PURE__ */ new Map();
function re(s) {
  let t = 0;
  for (let e = 0; e < s.length; e += 1)
    t = (t << 5) - t + s.charCodeAt(e), t |= 0;
  return String(t);
}
function ie(s) {
  const t = s.all_day ? "all day" : s.start, e = s.calendar_name ? ` (${s.calendar_name})` : "";
  return `- ${t}: ${s.summary ?? "Busy"}${e}`;
}
function ne(s, t, e, r, i) {
  var h;
  const n = new Intl.DateTimeFormat(r, {
    weekday: "long",
    month: "long",
    day: "numeric",
    timeZone: i
  }).format(e), o = s ? `${G(s.condition)}, ${K(
    s.temperature,
    s.temperature_unit
  )}${typeof s.humidity == "number" ? `, humidity ${s.humidity}%` : ""}` : "Weather unavailable", a = t.length === 0 ? "No meetings scheduled." : t.slice(0, 12).map(ie).join(`
`), c = [
    `Today is ${n}.`,
    `Weather: ${o}.`,
    t.length === 0 ? "Your calendars look clear." : `You have ${t.length} event${t.length === 1 ? "" : "s"} ahead${(h = t[0]) != null && h.summary ? `, starting with ${t[0].summary}` : ""}.`
  ], l = [
    "Summarize only. Do not control devices, call tools, or ask follow-up questions.",
    "Write 1-3 short sentences for a home dashboard day brief.",
    `Date: ${n}`,
    `Weather: ${o}`,
    "Agenda:",
    a
  ].join(`
`);
  return {
    hash: re(`${n}|${o}|${a}`),
    prompt: l,
    local: c.join(" ")
  };
}
function oe(s, t) {
  const e = J.get(s);
  return e ? e.hash !== t || e.expiresAt < Date.now() ? (J.delete(s), null) : e : null;
}
function H(s, t, e, r, i) {
  J.set(s, {
    hash: t,
    text: e,
    source: r,
    expiresAt: Date.now() + Math.max(1, i) * 6e4
  });
}
async function ae(s, t, e) {
  var n, o, a, c, l, h;
  const r = await s.callWS({
    type: "conversation/process",
    text: e,
    language: ((n = s.locale) == null ? void 0 : n.language) ?? s.config.language ?? "en",
    agent_id: t
  });
  return ((o = r.response) == null ? void 0 : o.response_type) === "error" ? null : ((h = (l = (c = (a = r.response) == null ? void 0 : a.speech) == null ? void 0 : c.plain) == null ? void 0 : l.speech) == null ? void 0 : h.trim()) || null;
}
async function ce(s) {
  const { hass: t, mode: e, agentId: r, digest: i, cacheKey: n, cacheMinutes: o } = s, a = oe(n, i.hash);
  if (a)
    return { text: a.text, source: a.source };
  if (e === "local")
    return H(n, i.hash, i.local, "local", o), { text: i.local, source: "local" };
  try {
    const c = await ae(t, r, i.prompt);
    if (c)
      return H(n, i.hash, c, "ai", o), { text: c, source: "ai" };
  } catch {
  }
  return e === "ai" ? (H(n, i.hash, i.local, "local", o), { text: i.local, source: "local" }) : (H(n, i.hash, i.local, "local", o), { text: i.local, source: "local" });
}
const le = vt`
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
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin-bottom: 16px;
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
var he = Object.defineProperty, de = Object.getOwnPropertyDescriptor, m = (s, t, e, r) => {
  for (var i = r > 1 ? void 0 : r ? de(t, e) : t, n = s.length - 1, o; n >= 0; n--)
    (o = s[n]) && (i = (r ? o(t, e, i) : o(i)) || i);
  return r && i && he(t, e, i), i;
};
const Z = "daily", Y = 24, mt = 30, gt = "auto", ue = 5 * 6e4;
let _ = class extends S {
  constructor() {
    super(...arguments), this._weather = null, this._forecast = [], this._events = [], this._summary = "", this._summarySource = "loading", this._errors = [], this._loadingEvents = !1, this._fetchGeneration = 0, this._onVisibility = () => {
      document.visibilityState === "visible" && this._refreshData(!1);
    };
  }
  static getStubConfig() {
    return {
      weather_entity: "weather.home",
      calendars: ["calendar.home"],
      forecast_type: "daily",
      summary_mode: "auto"
    };
  }
  static async getConfigElement() {
    return await Promise.resolve().then(() => ye), document.createElement(Tt);
  }
  setConfig(s) {
    if (!s)
      throw new Error("Invalid configuration");
    this._config = {
      forecast_type: Z,
      horizon_hours: Y,
      summary_mode: gt,
      cache_minutes: mt,
      calendars: [],
      ...s
    };
  }
  getCardSize() {
    return 5;
  }
  connectedCallback() {
    super.connectedCallback(), this._startRefreshLoop(), document.addEventListener("visibilitychange", this._onVisibility);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._stopRefreshLoop(), this._teardownForecast(), document.removeEventListener("visibilitychange", this._onVisibility);
  }
  updated(s) {
    !this._config || !this.hass || ((s.has("hass") || s.has("_config")) && (this._syncWeatherFromHass(), this._ensureForecastSubscription()), s.has("_config") && this.isConnected && this._refreshData(!0));
  }
  shouldUpdate(s) {
    var t, e, r, i;
    if (s.has("_config") || s.has("_weather") || s.has("_forecast") || s.has("_events") || s.has("_summary") || s.has("_summarySource") || s.has("_errors") || s.has("_loadingEvents"))
      return !0;
    if (s.has("hass") && ((t = this._config) != null && t.weather_entity)) {
      const n = s.get("hass");
      return se(
        (e = n == null ? void 0 : n.states) == null ? void 0 : e[this._config.weather_entity],
        (i = (r = this.hass) == null ? void 0 : r.states) == null ? void 0 : i[this._config.weather_entity]
      );
    }
    return !1;
  }
  _startRefreshLoop() {
    this._stopRefreshLoop(), this._refreshData(!0), this._refreshTimer = window.setInterval(() => {
      this._refreshData(!1);
    }, ue);
  }
  _stopRefreshLoop() {
    this._refreshTimer && (window.clearInterval(this._refreshTimer), this._refreshTimer = void 0);
  }
  _syncWeatherFromHass() {
    const s = this._config.weather_entity;
    if (!s) {
      this._weather = null;
      return;
    }
    const t = te(this.hass, s);
    if (!t) {
      this._weather = null, this._pushError(`Weather entity not found: ${s}`);
      return;
    }
    this._weather = { ...t, forecast: this._forecast };
  }
  async _ensureForecastSubscription() {
    const s = this._config.weather_entity, t = this._config.forecast_type ?? Z;
    if (!(this._unsubForecast && this._lastWeatherEntity === s && this._lastForecastType === t)) {
      if (this._teardownForecast(), this._lastWeatherEntity = s, this._lastForecastType = t, !s || t === "none" || !this.hass) {
        this._forecast = [];
        return;
      }
      try {
        this._unsubForecast = await ee(
          this.hass,
          s,
          t,
          (e) => {
            this._forecast = e.slice(0, 6), this._weather && (this._weather = { ...this._weather, forecast: this._forecast });
          }
        );
      } catch (e) {
        this._forecast = [], this._pushError(
          e instanceof Error ? `Forecast: ${e.message}` : "Forecast unavailable"
        );
      }
    }
  }
  _teardownForecast() {
    this._unsubForecast && (this._unsubForecast(), this._unsubForecast = void 0);
  }
  _pushError(s) {
    this._errors.includes(s) || (this._errors = [...this._errors, s].slice(-4));
  }
  async _refreshData(s) {
    if (!this.hass || !this._config)
      return;
    const t = ++this._fetchGeneration, e = [];
    this._loadingEvents = !0;
    const r = this._config.calendars ?? [], i = this._config.horizon_hours ?? Y, { events: n, errors: o } = await Qt(
      this.hass,
      r,
      i
    );
    t === this._fetchGeneration && (this._events = n, e.push(...o), this._loadingEvents = !1, this._config.weather_entity ? this.hass.states[this._config.weather_entity] || e.push(`Weather entity not found: ${this._config.weather_entity}`) : e.push("No weather_entity configured"), this._errors = e, await this._refreshSummary(s));
  }
  async _refreshSummary(s) {
    var a;
    if (!this.hass || !this._config)
      return;
    const t = this._config.summary_mode ?? gt, e = this._config.cache_minutes ?? mt, r = ((a = this.hass.locale) == null ? void 0 : a.language) ?? "en", i = this.hass.config.time_zone, n = ne(
      this._weather,
      this._events,
      /* @__PURE__ */ new Date(),
      r,
      i
    ), o = [
      this._config.weather_entity ?? "",
      ...this._config.calendars ?? [],
      t,
      this._config.agent_id ?? ""
    ].join("|");
    !s && this._summary && this._summarySource !== "loading" || (this._summarySource = "loading");
    try {
      const c = await ce({
        hass: this.hass,
        mode: t,
        agentId: this._config.agent_id,
        digest: n,
        cacheKey: o,
        cacheMinutes: e
      });
      this._summary = c.text, this._summarySource = c.source;
    } catch {
      this._summary = n.local, this._summarySource = "local";
    }
  }
  _dayTitle() {
    var e, r, i;
    if (this._config.title)
      return this._config.title;
    const s = ((r = (e = this.hass) == null ? void 0 : e.locale) == null ? void 0 : r.language) ?? "en", t = (i = this.hass) == null ? void 0 : i.config.time_zone;
    return new Intl.DateTimeFormat(s, {
      weekday: "long",
      month: "long",
      day: "numeric",
      timeZone: t
    }).format(/* @__PURE__ */ new Date());
  }
  _forecastLabel(s) {
    var n;
    if (!s.datetime)
      return "";
    const t = ((n = this.hass.locale) == null ? void 0 : n.language) ?? "en", e = this.hass.config.time_zone, r = this._config.forecast_type ?? Z, i = new Date(s.datetime);
    return r === "hourly" ? new Intl.DateTimeFormat(t, {
      hour: "numeric",
      timeZone: e
    }).format(i) : new Intl.DateTimeFormat(t, {
      weekday: "short",
      timeZone: e
    }).format(i);
  }
  render() {
    var r, i, n;
    if (!this._config)
      return u;
    const s = ((i = (r = this.hass) == null ? void 0 : r.locale) == null ? void 0 : i.language) ?? "en", t = ((n = this.hass) == null ? void 0 : n.config.time_zone) ?? "UTC", e = this._weather;
    return p`
      <ha-card>
        <div class="header">
          <p class="eyebrow">Today</p>
          <h2 class="title">${this._dayTitle()}</h2>
        </div>

        <p
          class="brief ${this._summarySource === "loading" ? "loading" : ""}"
          data-source=${this._summarySource}
        >
          ${this._summarySource === "loading" && !this._summary ? "Preparing your day brief…" : this._summary}
        </p>

        ${this._summary && this._summarySource !== "loading" ? p`
              <div class="meta">
                <span
                  class="dot ${this._summarySource === "local" ? "local" : ""}"
                ></span>
                <span
                  >${this._summarySource === "ai" ? "AI brief" : "Local brief"}</span
                >
              </div>
            ` : u}

        <div class="sections">
          <section>
            <h3 class="section-title">Weather</h3>
            ${e ? p`
                  <div class="weather-row">
                    <p class="condition">
                      ${G(e.condition)}
                    </p>
                    <p class="temp">
                      ${K(
      e.temperature,
      e.temperature_unit
    )}
                    </p>
                  </div>
                  <p class="weather-meta">
                    ${e.friendly_name ?? e.entity_id}
                    ${typeof e.humidity == "number" ? p` · ${e.humidity}% humidity` : u}
                  </p>
                  ${this._forecast.length ? p`
                        <div class="forecast">
                          ${this._forecast.map(
      (o) => p`
                              <div class="forecast-item">
                                <span class="forecast-day"
                                  >${this._forecastLabel(o)}</span
                                >
                                <span class="forecast-cond"
                                  >${G(
        o.condition ?? ""
      )}</span
                                >
                                <span class="forecast-temp"
                                  >${K(
        o.temperature,
        e.temperature_unit
      )}</span
                                >
                              </div>
                            `
    )}
                        </div>
                      ` : u}
                ` : p`<p class="empty">Configure a weather entity to begin.</p>`}
          </section>

          <section>
            <h3 class="section-title">Meetings</h3>
            ${this._loadingEvents && this._events.length === 0 ? p`<p class="empty loading">Loading calendars…</p>` : this._events.length === 0 ? p`<p class="empty">No meetings in the next ${this._config.horizon_hours ?? Y} hours.</p>` : p`
                    <ul class="events">
                      ${this._events.map(
      (o) => p`
                          <li class="event">
                            <span class="event-time"
                              >${Xt(
        o,
        s,
        t
      )}</span
                            >
                            <div class="event-body">
                              <p class="event-title">${o.summary}</p>
                              ${o.calendar_name ? p`<p class="event-cal">
                                    ${o.calendar_name}${o.location ? ` · ${o.location}` : ""}
                                  </p>` : u}
                            </div>
                          </li>
                        `
    )}
                    </ul>
                  `}
          </section>
        </div>

        ${this._errors.length ? p`
              <div class="errors">
                ${this._errors.map(
      (o) => p`<span class="error-chip">${o}</span>`
    )}
              </div>
            ` : u}
      </ha-card>
    `;
  }
};
_.styles = le;
m([
  st({ attribute: !1 })
], _.prototype, "hass", 2);
m([
  g()
], _.prototype, "_config", 2);
m([
  g()
], _.prototype, "_weather", 2);
m([
  g()
], _.prototype, "_forecast", 2);
m([
  g()
], _.prototype, "_events", 2);
m([
  g()
], _.prototype, "_summary", 2);
m([
  g()
], _.prototype, "_summarySource", 2);
m([
  g()
], _.prototype, "_errors", 2);
m([
  g()
], _.prototype, "_loadingEvents", 2);
_ = m([
  Et(Ct)
], _);
window.customCards = window.customCards || [];
window.customCards.push({
  type: Ct,
  name: St,
  description: "AI-first day brief with weather, multi-calendar meetings, and a short narrative.",
  preview: !0,
  documentationURL: "https://github.com/jenskock/lovelace-day-brief"
});
console.info(
  `%c ${St} %c ${Kt} `,
  "color:#fff;background:#03a9f4;font-weight:700",
  "color:#03a9f4;background:transparent;font-weight:700"
);
var pe = Object.defineProperty, fe = Object.getOwnPropertyDescriptor, rt = (s, t, e, r) => {
  for (var i = r > 1 ? void 0 : r ? fe(t, e) : t, n = s.length - 1, o; n >= 0; n--)
    (o = s[n]) && (i = (r ? o(t, e, i) : o(i)) || i);
  return r && i && pe(t, e, i), i;
};
const _e = [
  "daily",
  "hourly",
  "twice_daily",
  "none"
], me = ["auto", "ai", "local"];
function ge(s, t) {
  s.dispatchEvent(
    new CustomEvent("config-changed", {
      detail: { config: t },
      bubbles: !0,
      composed: !0
    })
  );
}
let P = class extends S {
  setConfig(s) {
    this._config = { ...s, calendars: [...s.calendars ?? []] };
  }
  _update(s) {
    if (!this._config)
      return;
    const t = {
      ...this._config,
      ...s
    };
    this._config = t, ge(this, t);
  }
  _value(s) {
    return s.target.value;
  }
  _onWeather(s) {
    this._update({ weather_entity: this._value(s) || void 0 });
  }
  _onCalendars(s) {
    const e = this._value(s).split(/[\n,]/).map((r) => r.trim()).filter(Boolean);
    this._update({ calendars: e });
  }
  _onForecast(s) {
    const t = this._value(s);
    this._update({ forecast_type: t });
  }
  _onHorizon(s) {
    const t = Number(this._value(s));
    this._update({
      horizon_hours: Number.isFinite(t) && t > 0 ? t : 24
    });
  }
  _onAgent(s) {
    this._update({ agent_id: this._value(s) || void 0 });
  }
  _onMode(s) {
    this._update({ summary_mode: this._value(s) });
  }
  _onCache(s) {
    const t = Number(this._value(s));
    this._update({
      cache_minutes: Number.isFinite(t) && t > 0 ? t : 30
    });
  }
  _onTitle(s) {
    this._update({ title: this._value(s) || void 0 });
  }
  _weatherEntities() {
    return this.hass ? Object.keys(this.hass.states).filter((s) => s.startsWith("weather.")).sort() : [];
  }
  _calendarEntities() {
    return this.hass ? Object.keys(this.hass.states).filter((s) => s.startsWith("calendar.")).sort() : [];
  }
  _toggleCalendar(s) {
    const t = new Set(this._config.calendars ?? []);
    t.has(s) ? t.delete(s) : t.add(s), this._update({ calendars: [...t].sort() });
  }
  render() {
    if (!this._config)
      return u;
    const s = this._config.calendars ?? [], t = this._weatherEntities(), e = this._calendarEntities();
    return p`
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
            ${t.map(
      (r) => p`<option value=${r} ?selected=${r === this._config.weather_entity}>
                  ${r}
                </option>`
    )}
          </select>
        </label>

        <fieldset>
          <legend>Calendars</legend>
          ${e.length === 0 ? p`
                <textarea
                  rows="3"
                  placeholder="calendar.personal, calendar.work"
                  .value=${s.join(", ")}
                  @change=${this._onCalendars}
                ></textarea>
              ` : p`
                <div class="checks">
                  ${e.map(
      (r) => p`
                      <label class="check">
                        <input
                          type="checkbox"
                          .checked=${s.includes(r)}
                          @change=${() => this._toggleCalendar(r)}
                        />
                        <span>${r}</span>
                      </label>
                    `
    )}
                </div>
              `}
        </fieldset>

        <label>
          Forecast type
          <select
            .value=${this._config.forecast_type ?? "daily"}
            @change=${this._onForecast}
          >
            ${_e.map(
      (r) => p`<option
                  value=${r}
                  ?selected=${(this._config.forecast_type ?? "daily") === r}
                >
                  ${r}
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
            placeholder="conversation.home_assistant"
            @change=${this._onAgent}
          />
        </label>

        <label>
          Summary mode
          <select
            .value=${this._config.summary_mode ?? "auto"}
            @change=${this._onMode}
          >
            ${me.map(
      (r) => p`<option
                  value=${r}
                  ?selected=${(this._config.summary_mode ?? "auto") === r}
                >
                  ${r}
                </option>`
    )}
          </select>
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
P.styles = vt`
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
rt([
  st({ attribute: !1 })
], P.prototype, "hass", 2);
rt([
  g()
], P.prototype, "_config", 2);
P = rt([
  Et(Tt)
], P);
const ye = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get DayBriefCardEditor() {
    return P;
  }
}, Symbol.toStringTag, { value: "Module" }));
export {
  _ as DayBriefCard
};
//# sourceMappingURL=day-brief.js.map
