/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const F = globalThis, X = F.ShadowRoot && (F.ShadyCSS === void 0 || F.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, tt = Symbol(), at = /* @__PURE__ */ new WeakMap();
let xt = class {
  constructor(t, e, i) {
    if (this._$cssResult$ = !0, i !== tt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (X && t === void 0) {
      const i = e !== void 0 && e.length === 1;
      i && (t = at.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && at.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Ut = (s) => new xt(typeof s == "string" ? s : s + "", void 0, tt), At = (s, ...t) => {
  const e = s.length === 1 ? s[0] : t.reduce((i, r, o) => i + ((n) => {
    if (n._$cssResult$ === !0) return n.cssText;
    if (typeof n == "number") return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + s[o + 1], s[0]);
  return new xt(e, s, tt);
}, kt = (s, t) => {
  if (X) s.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const i = document.createElement("style"), r = F.litNonce;
    r !== void 0 && i.setAttribute("nonce", r), i.textContent = e.cssText, s.appendChild(i);
  }
}, ct = X ? (s) => s : (s) => s instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules) e += i.cssText;
  return Ut(e);
})(s) : s;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Rt, defineProperty: Ht, getOwnPropertyDescriptor: Ft, getOwnPropertyNames: jt, getOwnPropertySymbols: Lt, getPrototypeOf: It } = Object, v = globalThis, lt = v.trustedTypes, Wt = lt ? lt.emptyScript : "", W = v.reactiveElementPolyfillSupport, z = (s, t) => s, j = { toAttribute(s, t) {
  switch (t) {
    case Boolean:
      s = s ? Wt : null;
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
} }, et = (s, t) => !Rt(s, t), ht = { attribute: !0, type: String, converter: j, reflect: !1, useDefault: !1, hasChanged: et };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), v.litPropertyMetadata ?? (v.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let S = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = ht) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const i = Symbol(), r = this.getPropertyDescriptor(t, i, e);
      r !== void 0 && Ht(this.prototype, t, r);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    const { get: r, set: o } = Ft(this.prototype, t) ?? { get() {
      return this[e];
    }, set(n) {
      this[e] = n;
    } };
    return { get: r, set(n) {
      const c = r == null ? void 0 : r.call(this);
      o == null || o.call(this, n), this.requestUpdate(t, c, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? ht;
  }
  static _$Ei() {
    if (this.hasOwnProperty(z("elementProperties"))) return;
    const t = It(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(z("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(z("properties"))) {
      const e = this.properties, i = [...jt(e), ...Lt(e)];
      for (const r of i) this.createProperty(r, e[r]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [i, r] of e) this.elementProperties.set(i, r);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, i] of this.elementProperties) {
      const r = this._$Eu(e, i);
      r !== void 0 && this._$Eh.set(r, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const i = new Set(t.flat(1 / 0).reverse());
      for (const r of i) e.unshift(ct(r));
    } else t !== void 0 && e.push(ct(t));
    return e;
  }
  static _$Eu(t, e) {
    const i = e.attribute;
    return i === !1 ? void 0 : typeof i == "string" ? i : typeof t == "string" ? t.toLowerCase() : void 0;
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
    for (const i of e.keys()) this.hasOwnProperty(i) && (t.set(i, this[i]), delete this[i]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return kt(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    var t;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$EO) == null || t.forEach((e) => {
      var i;
      return (i = e.hostConnected) == null ? void 0 : i.call(e);
    });
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t;
    (t = this._$EO) == null || t.forEach((e) => {
      var i;
      return (i = e.hostDisconnected) == null ? void 0 : i.call(e);
    });
  }
  attributeChangedCallback(t, e, i) {
    this._$AK(t, i);
  }
  _$ET(t, e) {
    var o;
    const i = this.constructor.elementProperties.get(t), r = this.constructor._$Eu(t, i);
    if (r !== void 0 && i.reflect === !0) {
      const n = (((o = i.converter) == null ? void 0 : o.toAttribute) !== void 0 ? i.converter : j).toAttribute(e, i.type);
      this._$Em = t, n == null ? this.removeAttribute(r) : this.setAttribute(r, n), this._$Em = null;
    }
  }
  _$AK(t, e) {
    var o, n;
    const i = this.constructor, r = i._$Eh.get(t);
    if (r !== void 0 && this._$Em !== r) {
      const c = i.getPropertyOptions(r), a = typeof c.converter == "function" ? { fromAttribute: c.converter } : ((o = c.converter) == null ? void 0 : o.fromAttribute) !== void 0 ? c.converter : j;
      this._$Em = r;
      const l = a.fromAttribute(e, c.type);
      this[r] = l ?? ((n = this._$Ej) == null ? void 0 : n.get(r)) ?? l, this._$Em = null;
    }
  }
  requestUpdate(t, e, i, r = !1, o) {
    var n;
    if (t !== void 0) {
      const c = this.constructor;
      if (r === !1 && (o = this[t]), i ?? (i = c.getPropertyOptions(t)), !((i.hasChanged ?? et)(o, e) || i.useDefault && i.reflect && o === ((n = this._$Ej) == null ? void 0 : n.get(t)) && !this.hasAttribute(c._$Eu(t, i)))) return;
      this.C(t, e, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: i, reflect: r, wrapped: o }, n) {
    i && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, n ?? e ?? this[t]), o !== !0 || n !== void 0) || (this._$AL.has(t) || (this.hasUpdated || i || (e = void 0), this._$AL.set(t, e)), r === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
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
    var i;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [o, n] of this._$Ep) this[o] = n;
        this._$Ep = void 0;
      }
      const r = this.constructor.elementProperties;
      if (r.size > 0) for (const [o, n] of r) {
        const { wrapped: c } = n, a = this[o];
        c !== !0 || this._$AL.has(o) || a === void 0 || this.C(o, void 0, n, a);
      }
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), (i = this._$EO) == null || i.forEach((r) => {
        var o;
        return (o = r.hostUpdate) == null ? void 0 : o.call(r);
      }), this.update(e)) : this._$EM();
    } catch (r) {
      throw t = !1, this._$EM(), r;
    }
    t && this._$AE(e);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var e;
    (e = this._$EO) == null || e.forEach((i) => {
      var r;
      return (r = i.hostUpdated) == null ? void 0 : r.call(i);
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
S.elementStyles = [], S.shadowRootOptions = { mode: "open" }, S[z("elementProperties")] = /* @__PURE__ */ new Map(), S[z("finalized")] = /* @__PURE__ */ new Map(), W == null || W({ ReactiveElement: S }), (v.reactiveElementVersions ?? (v.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const M = globalThis, ut = (s) => s, L = M.trustedTypes, dt = L ? L.createPolicy("lit-html", { createHTML: (s) => s }) : void 0, Et = "$lit$", $ = `lit$${Math.random().toFixed(9).slice(2)}$`, St = "?" + $, Bt = `<${St}>`, A = document, N = () => A.createComment(""), U = (s) => s === null || typeof s != "object" && typeof s != "function", st = Array.isArray, Vt = (s) => st(s) || typeof (s == null ? void 0 : s[Symbol.iterator]) == "function", B = `[ 	
\f\r]`, D = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, pt = /-->/g, ft = />/g, b = RegExp(`>|${B}(?:([^\\s"'>=/]+)(${B}*=${B}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), _t = /'/g, mt = /"/g, Ct = /^(?:script|style|textarea|title)$/i, qt = (s) => (t, ...e) => ({ _$litType$: s, strings: t, values: e }), p = qt(1), P = Symbol.for("lit-noChange"), d = Symbol.for("lit-nothing"), yt = /* @__PURE__ */ new WeakMap(), w = A.createTreeWalker(A, 129);
function Pt(s, t) {
  if (!st(s) || !s.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return dt !== void 0 ? dt.createHTML(t) : t;
}
const Zt = (s, t) => {
  const e = s.length - 1, i = [];
  let r, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", n = D;
  for (let c = 0; c < e; c++) {
    const a = s[c];
    let l, h, u = -1, f = 0;
    for (; f < a.length && (n.lastIndex = f, h = n.exec(a), h !== null); ) f = n.lastIndex, n === D ? h[1] === "!--" ? n = pt : h[1] !== void 0 ? n = ft : h[2] !== void 0 ? (Ct.test(h[2]) && (r = RegExp("</" + h[2], "g")), n = b) : h[3] !== void 0 && (n = b) : n === b ? h[0] === ">" ? (n = r ?? D, u = -1) : h[1] === void 0 ? u = -2 : (u = n.lastIndex - h[2].length, l = h[1], n = h[3] === void 0 ? b : h[3] === '"' ? mt : _t) : n === mt || n === _t ? n = b : n === pt || n === ft ? n = D : (n = b, r = void 0);
    const y = n === b && s[c + 1].startsWith("/>") ? " " : "";
    o += n === D ? a + Bt : u >= 0 ? (i.push(l), a.slice(0, u) + Et + a.slice(u) + $ + y) : a + $ + (u === -2 ? c : y);
  }
  return [Pt(s, o + (s[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class k {
  constructor({ strings: t, _$litType$: e }, i) {
    let r;
    this.parts = [];
    let o = 0, n = 0;
    const c = t.length - 1, a = this.parts, [l, h] = Zt(t, e);
    if (this.el = k.createElement(l, i), w.currentNode = this.el.content, e === 2 || e === 3) {
      const u = this.el.content.firstChild;
      u.replaceWith(...u.childNodes);
    }
    for (; (r = w.nextNode()) !== null && a.length < c; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) for (const u of r.getAttributeNames()) if (u.endsWith(Et)) {
          const f = h[n++], y = r.getAttribute(u).split($), E = /([.?@])?(.*)/.exec(f);
          a.push({ type: 1, index: o, name: E[2], strings: y, ctor: E[1] === "." ? Yt : E[1] === "?" ? Gt : E[1] === "@" ? Jt : I }), r.removeAttribute(u);
        } else u.startsWith($) && (a.push({ type: 6, index: o }), r.removeAttribute(u));
        if (Ct.test(r.tagName)) {
          const u = r.textContent.split($), f = u.length - 1;
          if (f > 0) {
            r.textContent = L ? L.emptyScript : "";
            for (let y = 0; y < f; y++) r.append(u[y], N()), w.nextNode(), a.push({ type: 2, index: ++o });
            r.append(u[f], N());
          }
        }
      } else if (r.nodeType === 8) if (r.data === St) a.push({ type: 2, index: o });
      else {
        let u = -1;
        for (; (u = r.data.indexOf($, u + 1)) !== -1; ) a.push({ type: 7, index: o }), u += $.length - 1;
      }
      o++;
    }
  }
  static createElement(t, e) {
    const i = A.createElement("template");
    return i.innerHTML = t, i;
  }
}
function T(s, t, e = s, i) {
  var n, c;
  if (t === P) return t;
  let r = i !== void 0 ? (n = e._$Co) == null ? void 0 : n[i] : e._$Cl;
  const o = U(t) ? void 0 : t._$litDirective$;
  return (r == null ? void 0 : r.constructor) !== o && ((c = r == null ? void 0 : r._$AO) == null || c.call(r, !1), o === void 0 ? r = void 0 : (r = new o(s), r._$AT(s, e, i)), i !== void 0 ? (e._$Co ?? (e._$Co = []))[i] = r : e._$Cl = r), r !== void 0 && (t = T(s, r._$AS(s, t.values), r, i)), t;
}
class Kt {
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
    const { el: { content: e }, parts: i } = this._$AD, r = ((t == null ? void 0 : t.creationScope) ?? A).importNode(e, !0);
    w.currentNode = r;
    let o = w.nextNode(), n = 0, c = 0, a = i[0];
    for (; a !== void 0; ) {
      if (n === a.index) {
        let l;
        a.type === 2 ? l = new H(o, o.nextSibling, this, t) : a.type === 1 ? l = new a.ctor(o, a.name, a.strings, this, t) : a.type === 6 && (l = new Qt(o, this, t)), this._$AV.push(l), a = i[++c];
      }
      n !== (a == null ? void 0 : a.index) && (o = w.nextNode(), n++);
    }
    return w.currentNode = A, r;
  }
  p(t) {
    let e = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++;
  }
}
class H {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, e, i, r) {
    this.type = 2, this._$AH = d, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = i, this.options = r, this._$Cv = (r == null ? void 0 : r.isConnected) ?? !0;
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
    t = T(this, t, e), U(t) ? t === d || t == null || t === "" ? (this._$AH !== d && this._$AR(), this._$AH = d) : t !== this._$AH && t !== P && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Vt(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== d && U(this._$AH) ? this._$AA.nextSibling.data = t : this.T(A.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var o;
    const { values: e, _$litType$: i } = t, r = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = k.createElement(Pt(i.h, i.h[0]), this.options)), i);
    if (((o = this._$AH) == null ? void 0 : o._$AD) === r) this._$AH.p(e);
    else {
      const n = new Kt(r, this), c = n.u(this.options);
      n.p(e), this.T(c), this._$AH = n;
    }
  }
  _$AC(t) {
    let e = yt.get(t.strings);
    return e === void 0 && yt.set(t.strings, e = new k(t)), e;
  }
  k(t) {
    st(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, r = 0;
    for (const o of t) r === e.length ? e.push(i = new H(this.O(N()), this.O(N()), this, this.options)) : i = e[r], i._$AI(o), r++;
    r < e.length && (this._$AR(i && i._$AB.nextSibling, r), e.length = r);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var i;
    for ((i = this._$AP) == null ? void 0 : i.call(this, !1, !0, e); t !== this._$AB; ) {
      const r = ut(t).nextSibling;
      ut(t).remove(), t = r;
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
  constructor(t, e, i, r, o) {
    this.type = 1, this._$AH = d, this._$AN = void 0, this.element = t, this.name = e, this._$AM = r, this.options = o, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = d;
  }
  _$AI(t, e = this, i, r) {
    const o = this.strings;
    let n = !1;
    if (o === void 0) t = T(this, t, e, 0), n = !U(t) || t !== this._$AH && t !== P, n && (this._$AH = t);
    else {
      const c = t;
      let a, l;
      for (t = o[0], a = 0; a < o.length - 1; a++) l = T(this, c[i + a], e, a), l === P && (l = this._$AH[a]), n || (n = !U(l) || l !== this._$AH[a]), l === d ? t = d : t !== d && (t += (l ?? "") + o[a + 1]), this._$AH[a] = l;
    }
    n && !r && this.j(t);
  }
  j(t) {
    t === d ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Yt extends I {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === d ? void 0 : t;
  }
}
class Gt extends I {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== d);
  }
}
class Jt extends I {
  constructor(t, e, i, r, o) {
    super(t, e, i, r, o), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = T(this, t, e, 0) ?? d) === P) return;
    const i = this._$AH, r = t === d && i !== d || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, o = t !== d && (i === d || r);
    r && this.element.removeEventListener(this.name, this, i), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e;
    typeof this._$AH == "function" ? this._$AH.call(((e = this.options) == null ? void 0 : e.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Qt {
  constructor(t, e, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    T(this, t);
  }
}
const V = M.litHtmlPolyfillSupport;
V == null || V(k, H), (M.litHtmlVersions ?? (M.litHtmlVersions = [])).push("3.3.3");
const Xt = (s, t, e) => {
  const i = (e == null ? void 0 : e.renderBefore) ?? t;
  let r = i._$litPart$;
  if (r === void 0) {
    const o = (e == null ? void 0 : e.renderBefore) ?? null;
    i._$litPart$ = r = new H(t.insertBefore(N(), o), o, void 0, e ?? {});
  }
  return r._$AI(s), r;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const x = globalThis;
class C extends S {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Xt(e, this.renderRoot, this.renderOptions);
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
    return P;
  }
}
var wt;
C._$litElement$ = !0, C.finalized = !0, (wt = x.litElementHydrateSupport) == null || wt.call(x, { LitElement: C });
const q = x.litElementPolyfillSupport;
q == null || q({ LitElement: C });
(x.litElementVersions ?? (x.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Tt = (s) => (t, e) => {
  e !== void 0 ? e.addInitializer(() => {
    customElements.define(s, t);
  }) : customElements.define(s, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const te = { attribute: !0, type: String, converter: j, reflect: !1, hasChanged: et }, ee = (s = te, t, e) => {
  const { kind: i, metadata: r } = e;
  let o = globalThis.litPropertyMetadata.get(r);
  if (o === void 0 && globalThis.litPropertyMetadata.set(r, o = /* @__PURE__ */ new Map()), i === "setter" && ((s = Object.create(s)).wrapped = !0), o.set(e.name, s), i === "accessor") {
    const { name: n } = e;
    return { set(c) {
      const a = t.get.call(this);
      t.set.call(this, c), this.requestUpdate(n, a, s, !0, c);
    }, init(c) {
      return c !== void 0 && this.C(n, void 0, s, c), c;
    } };
  }
  if (i === "setter") {
    const { name: n } = e;
    return function(c) {
      const a = this[n];
      t.call(this, c), this.requestUpdate(n, a, s, !0, c);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function it(s) {
  return (t, e) => typeof e == "object" ? ee(s, t, e) : ((i, r, o) => {
    const n = r.hasOwnProperty(o);
    return r.constructor.createProperty(o, i), n ? Object.getOwnPropertyDescriptor(r, o) : void 0;
  })(s, t, e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function g(s) {
  return it({ ...s, state: !0, attribute: !1 });
}
const se = "1.1.0", Ot = "Day Brief", Dt = "day-brief-card", zt = "day-brief-card-editor", Mt = [
  "Summarize only. Do not control devices, call tools, or ask follow-up questions.",
  "Write 1-3 short sentences for a home dashboard day brief.",
  "Use the date, weather, agenda, and extra entity context below."
].join(`
`);
function gt(s) {
  if (!s)
    return null;
  if (typeof s == "string") {
    const t = /^\d{4}-\d{2}-\d{2}$/.test(s);
    return { iso: s, allDay: t };
  }
  return s.dateTime ? { iso: s.dateTime, allDay: !1 } : s.date ? { iso: s.date, allDay: !0 } : null;
}
function ie(s, t) {
  var e, i, r;
  return ((i = (e = s.entities) == null ? void 0 : e[t]) == null ? void 0 : i.name) ?? (typeof ((r = s.states[t]) == null ? void 0 : r.attributes.friendly_name) == "string" ? s.states[t].attributes.friendly_name : t.replace(/^calendar\./, "").replace(/_/g, " "));
}
async function re(s, t, e) {
  const i = [...new Set(t.filter(Boolean))];
  if (i.length === 0)
    return { events: [], errors: [] };
  const r = [];
  let o = {};
  try {
    const c = await s.callService(
      "calendar",
      "get_events",
      {
        duration: { hours: e }
      },
      { entity_id: i },
      !0,
      !0
    ), a = c && "response" in c ? c.response : void 0;
    a && typeof a == "object" && (o = a);
  } catch (c) {
    return r.push(
      c instanceof Error ? c.message : "Failed to load calendar events"
    ), { events: [], errors: r };
  }
  const n = [];
  for (const c of i) {
    const a = o[c];
    if (!a) {
      r.push(`No response for ${c}`);
      continue;
    }
    if (a.error) {
      r.push(`${c}: ${a.error}`);
      continue;
    }
    const l = ie(s, c);
    for (const h of a.events ?? []) {
      const u = gt(h.start), f = gt(h.end);
      !u || !f || n.push({
        summary: h.summary || "Busy",
        description: h.description,
        location: h.location,
        start: u.iso,
        end: f.iso,
        all_day: u.allDay || f.allDay,
        calendar_id: c,
        calendar_name: l
      });
    }
  }
  return n.sort((c, a) => c.start.localeCompare(a.start)), { events: n, errors: r };
}
function ne(s, t, e) {
  if (s.all_day)
    return "All day";
  const i = new Date(s.start);
  return Number.isNaN(i.getTime()) ? s.start : new Intl.DateTimeFormat(t, {
    hour: "numeric",
    minute: "2-digit",
    timeZone: e
  }).format(i);
}
function oe(s, t) {
  var e, i;
  return ((i = (e = s.entities) == null ? void 0 : e[t.entity_id]) == null ? void 0 : i.name) ?? (typeof t.attributes.friendly_name == "string" ? t.attributes.friendly_name : t.entity_id);
}
function ae(s, t) {
  if (s.formatEntityState)
    try {
      return s.formatEntityState(t);
    } catch {
    }
  const e = typeof t.attributes.unit_of_measurement == "string" ? t.attributes.unit_of_measurement : void 0;
  return e ? `${t.state} ${e}` : t.state;
}
function ce(s, t) {
  const e = [...new Set(t.filter(Boolean))], i = [], r = [];
  for (const o of e) {
    const n = s.states[o];
    if (!n) {
      r.push(o);
      continue;
    }
    i.push({
      entity_id: o,
      name: oe(s, n),
      state: ae(s, n),
      unit: typeof n.attributes.unit_of_measurement == "string" ? n.attributes.unit_of_measurement : void 0,
      domain: o.split(".")[0] ?? "unknown"
    });
  }
  return { entities: i, missing: r };
}
function le(s, t) {
  var o, n, c;
  const e = s.states[t];
  if (!e)
    return null;
  const i = e.attributes, r = ((n = (o = s.entities) == null ? void 0 : o[t]) == null ? void 0 : n.name) ?? (typeof i.friendly_name == "string" ? i.friendly_name : t);
  return {
    entity_id: t,
    condition: e.state,
    temperature: typeof i.temperature == "number" ? i.temperature : void 0,
    temperature_unit: typeof i.temperature_unit == "string" ? i.temperature_unit : (c = s.config.unit_system) == null ? void 0 : c.temperature,
    humidity: typeof i.humidity == "number" ? i.humidity : void 0,
    wind_speed: typeof i.wind_speed == "number" ? i.wind_speed : void 0,
    wind_speed_unit: typeof i.wind_speed_unit == "string" ? i.wind_speed_unit : void 0,
    friendly_name: r,
    forecast: []
  };
}
async function he(s, t, e, i) {
  const r = await s.connection.subscribeMessage(
    (o) => {
      i(Array.isArray(o.forecast) ? o.forecast : []);
    },
    {
      type: "weather/subscribe_forecast",
      entity_id: t,
      forecast_type: e
    }
  );
  return () => {
    r();
  };
}
function J(s) {
  return !s || s === "unknown" || s === "unavailable" ? "Weather unavailable" : s.replace(/_/g, " ");
}
function Q(s, t) {
  if (typeof s != "number" || Number.isNaN(s))
    return "—";
  const e = Number.isInteger(s) ? String(s) : s.toFixed(1);
  if (!t)
    return `${e}°`;
  const i = t.includes("°") ? t : `°${t}`;
  return `${e}${i}`;
}
function $t(s, t) {
  return s === t ? !1 : !s || !t ? !0 : s.state !== t.state || s.last_updated !== t.last_updated || s.attributes.temperature !== t.attributes.temperature || s.attributes.humidity !== t.attributes.humidity;
}
const R = /* @__PURE__ */ new Map();
function ue(s) {
  let t = 0;
  for (let e = 0; e < s.length; e += 1)
    t = (t << 5) - t + s.charCodeAt(e), t |= 0;
  return String(t);
}
function de(s) {
  const t = s.all_day ? "all day" : s.start, e = s.calendar_name ? ` (${s.calendar_name})` : "";
  return `- ${t}: ${s.summary ?? "Busy"}${e}`;
}
function pe(s) {
  return `- ${s.name} (${s.entity_id}): ${s.state}`;
}
function fe(s) {
  var nt;
  const {
    weather: t,
    events: e,
    entities: i,
    now: r,
    locale: o,
    timeZone: n,
    summaryPrompt: c
  } = s, a = new Intl.DateTimeFormat(o, {
    weekday: "long",
    month: "long",
    day: "numeric",
    timeZone: n
  }).format(r), l = t ? `${J(t.condition)}, ${Q(
    t.temperature,
    t.temperature_unit
  )}${typeof t.humidity == "number" ? `, humidity ${t.humidity}%` : ""}` : "Weather unavailable", h = e.length === 0 ? "No meetings scheduled." : e.slice(0, 12).map(de).join(`
`), u = i.length === 0 ? "No extra entities configured." : i.map(pe).join(`
`), f = [
    `Today is ${a}.`,
    `Weather: ${l}.`,
    e.length === 0 ? "Your calendars look clear." : `You have ${e.length} event${e.length === 1 ? "" : "s"} ahead${(nt = e[0]) != null && nt.summary ? `, starting with ${e[0].summary}` : ""}.`
  ];
  i.length > 0 && f.push(
    `Context: ${i.slice(0, 6).map((ot) => `${ot.name} is ${ot.state}`).join("; ")}.`
  );
  const y = (c == null ? void 0 : c.trim()) || Mt, E = [
    y,
    "",
    `Date: ${a}`,
    `Weather: ${l}`,
    "Agenda:",
    h,
    "Extra entities:",
    u
  ].join(`
`);
  return {
    hash: ue(
      `${y}|${a}|${l}|${h}|${u}`
    ),
    prompt: E,
    local: f.join(" ")
  };
}
function Nt(s) {
  if (!s) {
    R.clear();
    return;
  }
  R.delete(s);
}
function _e(s, t) {
  const e = R.get(s);
  return e ? e.hash !== t || e.expiresAt < Date.now() ? (R.delete(s), null) : e : null;
}
function Z(s, t, e, i, r) {
  R.set(s, {
    hash: t,
    text: e,
    source: i,
    expiresAt: Date.now() + Math.max(1, r) * 6e4
  });
}
async function me(s, t, e) {
  var o, n, c, a, l, h;
  const i = await s.callWS({
    type: "conversation/process",
    text: e,
    language: ((o = s.locale) == null ? void 0 : o.language) ?? s.config.language ?? "en",
    agent_id: t
  });
  return ((n = i.response) == null ? void 0 : n.response_type) === "error" ? null : ((h = (l = (a = (c = i.response) == null ? void 0 : c.speech) == null ? void 0 : a.plain) == null ? void 0 : l.speech) == null ? void 0 : h.trim()) || null;
}
async function ye(s) {
  const { hass: t, mode: e, agentId: i, digest: r, cacheKey: o, cacheMinutes: n, force: c } = s;
  if (c)
    Nt(o);
  else {
    const a = _e(o, r.hash);
    if (a)
      return { text: a.text, source: a.source };
  }
  if (e === "local")
    return Z(o, r.hash, r.local, "local", n), { text: r.local, source: "local" };
  try {
    const a = await me(t, i, r.prompt);
    if (a)
      return Z(o, r.hash, a, "ai", n), { text: a, source: "ai" };
  } catch {
  }
  return Z(o, r.hash, r.local, "local", n), { text: r.local, source: "local" };
}
const ge = At`
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

  .entity-list {
    list-style: none;
    margin: 0;
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
var $e = Object.defineProperty, ve = Object.getOwnPropertyDescriptor, m = (s, t, e, i) => {
  for (var r = i > 1 ? void 0 : i ? ve(t, e) : t, o = s.length - 1, n; o >= 0; o--)
    (n = s[o]) && (r = (i ? n(t, e, r) : n(r)) || r);
  return i && r && $e(t, e, r), r;
};
const K = "daily", Y = 24, vt = 30, G = "auto", be = 5 * 6e4;
let _ = class extends C {
  constructor() {
    super(...arguments), this._weather = null, this._forecast = [], this._events = [], this._entities = [], this._summary = "", this._summarySource = "loading", this._errors = [], this._loadingEvents = !1, this._refreshing = !1, this._fetchGeneration = 0, this._onVisibility = () => {
      document.visibilityState === "visible" && this._refreshData(!1);
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
    return await Promise.resolve().then(() => Ce), document.createElement(zt);
  }
  setConfig(s) {
    if (!s)
      throw new Error("Invalid configuration");
    this._config = {
      forecast_type: K,
      horizon_hours: Y,
      summary_mode: G,
      cache_minutes: vt,
      calendars: [],
      entities: [],
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
    !this._config || !this.hass || ((s.has("hass") || s.has("_config")) && (this._syncWeatherFromHass(), this._syncEntitiesFromHass(), this._ensureForecastSubscription()), s.has("_config") && this.isConnected && this._refreshData(!0));
  }
  shouldUpdate(s) {
    var t, e, i, r, o, n, c, a;
    if (s.has("_config") || s.has("_weather") || s.has("_forecast") || s.has("_entities") || s.has("_events") || s.has("_summary") || s.has("_summarySource") || s.has("_errors") || s.has("_loadingEvents") || s.has("_refreshing"))
      return !0;
    if (s.has("hass")) {
      const l = s.get("hass");
      if ((t = this._config) != null && t.weather_entity && $t(
        (e = l == null ? void 0 : l.states) == null ? void 0 : e[this._config.weather_entity],
        (r = (i = this.hass) == null ? void 0 : i.states) == null ? void 0 : r[this._config.weather_entity]
      ))
        return !0;
      for (const h of ((o = this._config) == null ? void 0 : o.entities) ?? [])
        if ($t((n = l == null ? void 0 : l.states) == null ? void 0 : n[h], (a = (c = this.hass) == null ? void 0 : c.states) == null ? void 0 : a[h]))
          return !0;
    }
    return !1;
  }
  _startRefreshLoop() {
    this._stopRefreshLoop(), this._refreshData(!0), this._refreshTimer = window.setInterval(() => {
      this._refreshData(!1);
    }, be);
  }
  _stopRefreshLoop() {
    this._refreshTimer && (window.clearInterval(this._refreshTimer), this._refreshTimer = void 0);
  }
  _cacheKey() {
    return [
      this._config.weather_entity ?? "",
      ...this._config.calendars ?? [],
      ...this._config.entities ?? [],
      this._config.summary_mode ?? G,
      this._config.agent_id ?? "",
      this._config.summary_prompt ?? ""
    ].join("|");
  }
  _syncWeatherFromHass() {
    const s = this._config.weather_entity;
    if (!s) {
      this._weather = null;
      return;
    }
    const t = le(this.hass, s);
    if (!t) {
      this._weather = null, this._pushError(`Weather entity not found: ${s}`);
      return;
    }
    this._weather = { ...t, forecast: this._forecast };
  }
  _syncEntitiesFromHass() {
    const { entities: s, missing: t } = ce(
      this.hass,
      this._config.entities ?? []
    );
    this._entities = s;
    for (const e of t)
      this._pushError(`Entity not found: ${e}`);
  }
  async _ensureForecastSubscription() {
    const s = this._config.weather_entity, t = this._config.forecast_type ?? K;
    if (!(this._unsubForecast && this._lastWeatherEntity === s && this._lastForecastType === t)) {
      if (this._teardownForecast(), this._lastWeatherEntity = s, this._lastForecastType = t, !s || t === "none" || !this.hass) {
        this._forecast = [];
        return;
      }
      try {
        this._unsubForecast = await he(
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
  async _onManualRefresh(s) {
    if (s.stopPropagation(), !this._refreshing) {
      this._refreshing = !0, Nt(this._cacheKey());
      try {
        await this._refreshData(!0, !0);
      } finally {
        this._refreshing = !1;
      }
    }
  }
  async _refreshData(s, t = !1) {
    if (!this.hass || !this._config)
      return;
    const e = ++this._fetchGeneration, i = [];
    this._loadingEvents = !0, this._syncWeatherFromHass(), this._syncEntitiesFromHass();
    const r = this._config.calendars ?? [], o = this._config.horizon_hours ?? Y, { events: n, errors: c } = await re(
      this.hass,
      r,
      o
    );
    if (e === this._fetchGeneration) {
      this._events = n, i.push(...c), this._loadingEvents = !1, this._config.weather_entity ? this.hass.states[this._config.weather_entity] || i.push(`Weather entity not found: ${this._config.weather_entity}`) : i.push("No weather_entity configured");
      for (const a of this._config.entities ?? [])
        this.hass.states[a] || i.push(`Entity not found: ${a}`);
      this._errors = [...new Set(i)].slice(-6), await this._refreshSummary(s, t);
    }
  }
  async _refreshSummary(s, t = !1) {
    var a;
    if (!this.hass || !this._config)
      return;
    const e = this._config.summary_mode ?? G, i = this._config.cache_minutes ?? vt, r = ((a = this.hass.locale) == null ? void 0 : a.language) ?? "en", o = this.hass.config.time_zone, n = fe({
      weather: this._weather,
      events: this._events,
      entities: this._entities,
      now: /* @__PURE__ */ new Date(),
      locale: r,
      timeZone: o,
      summaryPrompt: this._config.summary_prompt
    }), c = this._cacheKey();
    (s || t || !this._summary || this._summarySource === "loading") && (this._summarySource = "loading");
    try {
      const l = await ye({
        hass: this.hass,
        mode: e,
        agentId: this._config.agent_id,
        digest: n,
        cacheKey: c,
        cacheMinutes: i,
        force: t
      });
      this._summary = l.text, this._summarySource = l.source;
    } catch {
      this._summary = n.local, this._summarySource = "local";
    }
  }
  _dayTitle() {
    var e, i, r;
    if (this._config.title)
      return this._config.title;
    const s = ((i = (e = this.hass) == null ? void 0 : e.locale) == null ? void 0 : i.language) ?? "en", t = (r = this.hass) == null ? void 0 : r.config.time_zone;
    return new Intl.DateTimeFormat(s, {
      weekday: "long",
      month: "long",
      day: "numeric",
      timeZone: t
    }).format(/* @__PURE__ */ new Date());
  }
  _forecastLabel(s) {
    var o;
    if (!s.datetime)
      return "";
    const t = ((o = this.hass.locale) == null ? void 0 : o.language) ?? "en", e = this.hass.config.time_zone, i = this._config.forecast_type ?? K, r = new Date(s.datetime);
    return i === "hourly" ? new Intl.DateTimeFormat(t, {
      hour: "numeric",
      timeZone: e
    }).format(r) : new Intl.DateTimeFormat(t, {
      weekday: "short",
      timeZone: e
    }).format(r);
  }
  render() {
    var i, r, o;
    if (!this._config)
      return d;
    const s = ((r = (i = this.hass) == null ? void 0 : i.locale) == null ? void 0 : r.language) ?? "en", t = ((o = this.hass) == null ? void 0 : o.config.time_zone) ?? "UTC", e = this._weather;
    return p`
      <ha-card>
        <div class="header">
          <div class="header-row">
            <div>
              <p class="eyebrow">Today</p>
              <h2 class="title">${this._dayTitle()}</h2>
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

        ${this._summary && this._summarySource !== "loading" ? p`
              <div class="meta">
                <span
                  class="dot ${this._summarySource === "local" ? "local" : ""}"
                ></span>
                <span
                  >${this._summarySource === "ai" ? "AI brief" : "Local brief"}</span
                >
              </div>
            ` : d}

        <div class="sections">
          <section>
            <h3 class="section-title">Weather</h3>
            ${e ? p`
                  <div class="weather-row">
                    <p class="condition">
                      ${J(e.condition)}
                    </p>
                    <p class="temp">
                      ${Q(
      e.temperature,
      e.temperature_unit
    )}
                    </p>
                  </div>
                  <p class="weather-meta">
                    ${e.friendly_name ?? e.entity_id}
                    ${typeof e.humidity == "number" ? p` · ${e.humidity}% humidity` : d}
                  </p>
                  ${this._forecast.length ? p`
                        <div class="forecast">
                          ${this._forecast.map(
      (n) => p`
                              <div class="forecast-item">
                                <span class="forecast-day"
                                  >${this._forecastLabel(n)}</span
                                >
                                <span class="forecast-cond"
                                  >${J(
        n.condition ?? ""
      )}</span
                                >
                                <span class="forecast-temp"
                                  >${Q(
        n.temperature,
        e.temperature_unit
      )}</span
                                >
                              </div>
                            `
    )}
                        </div>
                      ` : d}
                ` : p`<p class="empty">Configure a weather entity to begin.</p>`}
          </section>

          <section>
            <h3 class="section-title">Meetings</h3>
            ${this._loadingEvents && this._events.length === 0 ? p`<p class="empty loading">Loading calendars…</p>` : this._events.length === 0 ? p`<p class="empty">
                    No meetings in the next
                    ${this._config.horizon_hours ?? Y} hours.
                  </p>` : p`
                    <ul class="events">
                      ${this._events.map(
      (n) => p`
                          <li class="event">
                            <span class="event-time"
                              >${ne(
        n,
        s,
        t
      )}</span
                            >
                            <div class="event-body">
                              <p class="event-title">${n.summary}</p>
                              ${n.calendar_name ? p`<p class="event-cal">
                                    ${n.calendar_name}${n.location ? ` · ${n.location}` : ""}
                                  </p>` : d}
                            </div>
                          </li>
                        `
    )}
                    </ul>
                  `}
          </section>

          ${this._entities.length ? p`
                <section>
                  <h3 class="section-title">Context</h3>
                  <ul class="entity-list">
                    ${this._entities.map(
      (n) => p`
                        <li class="entity-row">
                          <span class="entity-name">${n.name}</span>
                          <span class="entity-state">${n.state}</span>
                        </li>
                      `
    )}
                  </ul>
                </section>
              ` : d}
        </div>

        ${this._errors.length ? p`
              <div class="errors">
                ${this._errors.map(
      (n) => p`<span class="error-chip">${n}</span>`
    )}
              </div>
            ` : d}
      </ha-card>
    `;
  }
};
_.styles = ge;
m([
  it({ attribute: !1 })
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
], _.prototype, "_entities", 2);
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
m([
  g()
], _.prototype, "_refreshing", 2);
_ = m([
  Tt(Dt)
], _);
window.customCards = window.customCards || [];
window.customCards.push({
  type: Dt,
  name: Ot,
  description: "AI-first day brief with weather, calendars, extra entities, and a short narrative.",
  preview: !0,
  documentationURL: "https://github.com/jenskock/lovelace-day-brief"
});
console.info(
  `%c ${Ot} %c ${se} `,
  "color:#fff;background:#03a9f4;font-weight:700",
  "color:#03a9f4;background:transparent;font-weight:700"
);
var we = Object.defineProperty, xe = Object.getOwnPropertyDescriptor, rt = (s, t, e, i) => {
  for (var r = i > 1 ? void 0 : i ? xe(t, e) : t, o = s.length - 1, n; o >= 0; o--)
    (n = s[o]) && (r = (i ? n(t, e, r) : n(r)) || r);
  return i && r && we(t, e, r), r;
};
const Ae = [
  "daily",
  "hourly",
  "twice_daily",
  "none"
], Ee = ["auto", "ai", "local"];
function Se(s, t) {
  s.dispatchEvent(
    new CustomEvent("config-changed", {
      detail: { config: t },
      bubbles: !0,
      composed: !0
    })
  );
}
function bt(s) {
  return [
    ...new Set(
      s.split(/[\n,]/).map((t) => t.trim()).filter(Boolean)
    )
  ];
}
let O = class extends C {
  setConfig(s) {
    this._config = {
      ...s,
      calendars: [...s.calendars ?? []],
      entities: [...s.entities ?? []]
    };
  }
  _update(s) {
    if (!this._config)
      return;
    const t = {
      ...this._config,
      ...s
    };
    this._config = t, Se(this, t);
  }
  _value(s) {
    return s.target.value;
  }
  _onWeather(s) {
    this._update({ weather_entity: this._value(s) || void 0 });
  }
  _onCalendars(s) {
    this._update({ calendars: bt(this._value(s)) });
  }
  _onEntities(s) {
    this._update({ entities: bt(this._value(s)) });
  }
  _onForecast(s) {
    this._update({ forecast_type: this._value(s) });
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
  _onPrompt(s) {
    const t = this._value(s).trim();
    this._update({ summary_prompt: t || void 0 });
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
      return d;
    const s = this._config.calendars ?? [], t = this._config.entities ?? [], e = this._weatherEntities(), i = this._calendarEntities();
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
            ${e.map(
      (r) => p`<option
                  value=${r}
                  ?selected=${r === this._config.weather_entity}
                >
                  ${r}
                </option>`
    )}
          </select>
        </label>

        <fieldset>
          <legend>Calendars</legend>
          ${i.length === 0 ? p`
                <textarea
                  rows="3"
                  placeholder="calendar.personal, calendar.work"
                  .value=${s.join(`
`)}
                  @change=${this._onCalendars}
                ></textarea>
              ` : p`
                <div class="checks">
                  ${i.map(
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
          Extra entities
          <textarea
            rows="4"
            placeholder="person.jens_2&#10;sensor.abfallrestmuell&#10;binary_sensor.haustur"
            .value=${t.join(`
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
            ${Ae.map(
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
            ${Ee.map(
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
          System prompt
          <textarea
            rows="5"
            placeholder=${Mt}
            .value=${this._config.summary_prompt ?? ""}
            @change=${this._onPrompt}
          ></textarea>
          <span class="hint"
            >Leave empty for the default. Weather, agenda, and entities are
            appended automatically.</span
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
O.styles = At`
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
rt([
  it({ attribute: !1 })
], O.prototype, "hass", 2);
rt([
  g()
], O.prototype, "_config", 2);
O = rt([
  Tt(zt)
], O);
const Ce = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get DayBriefCardEditor() {
    return O;
  }
}, Symbol.toStringTag, { value: "Module" }));
export {
  _ as DayBriefCard
};
//# sourceMappingURL=day-brief.js.map
