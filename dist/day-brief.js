/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const X = globalThis, _e = X.ShadowRoot && (X.ShadyCSS === void 0 || X.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, $e = Symbol(), ke = /* @__PURE__ */ new WeakMap();
let Je = class {
  constructor(e, n, s) {
    if (this._$cssResult$ = !0, s !== $e) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = n;
  }
  get styleSheet() {
    let e = this.o;
    const n = this.t;
    if (_e && e === void 0) {
      const s = n !== void 0 && n.length === 1;
      s && (e = ke.get(n)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), s && ke.set(n, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const bt = (t) => new Je(typeof t == "string" ? t : t + "", void 0, $e), qe = (t, ...e) => {
  const n = t.length === 1 ? t[0] : e.reduce((s, i, r) => s + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + t[r + 1], t[0]);
  return new Je(n, t, $e);
}, wt = (t, e) => {
  if (_e) t.adoptedStyleSheets = e.map((n) => n instanceof CSSStyleSheet ? n : n.styleSheet);
  else for (const n of e) {
    const s = document.createElement("style"), i = X.litNonce;
    i !== void 0 && s.setAttribute("nonce", i), s.textContent = n.cssText, t.appendChild(s);
  }
}, Te = _e ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let n = "";
  for (const s of e.cssRules) n += s.cssText;
  return bt(n);
})(t) : t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: vt, defineProperty: xt, getOwnPropertyDescriptor: At, getOwnPropertyNames: Et, getOwnPropertySymbols: St, getPrototypeOf: kt } = Object, L = globalThis, Ne = L.trustedTypes, Tt = Ne ? Ne.emptyScript : "", ae = L.reactiveElementPolyfillSupport, G = (t, e) => t, ee = { toAttribute(t, e) {
  switch (e) {
    case Boolean:
      t = t ? Tt : null;
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
} }, be = (t, e) => !vt(t, e), Ce = { attribute: !0, type: String, converter: ee, reflect: !1, useDefault: !1, hasChanged: be };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), L.litPropertyMetadata ?? (L.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let R = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, n = Ce) {
    if (n.state && (n.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((n = Object.create(n)).wrapped = !0), this.elementProperties.set(e, n), !n.noAccessor) {
      const s = Symbol(), i = this.getPropertyDescriptor(e, s, n);
      i !== void 0 && xt(this.prototype, e, i);
    }
  }
  static getPropertyDescriptor(e, n, s) {
    const { get: i, set: r } = At(this.prototype, e) ?? { get() {
      return this[n];
    }, set(a) {
      this[n] = a;
    } };
    return { get: i, set(a) {
      const o = i == null ? void 0 : i.call(this);
      r == null || r.call(this, a), this.requestUpdate(e, o, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? Ce;
  }
  static _$Ei() {
    if (this.hasOwnProperty(G("elementProperties"))) return;
    const e = kt(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(G("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(G("properties"))) {
      const n = this.properties, s = [...Et(n), ...St(n)];
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
      for (const i of s) n.unshift(Te(i));
    } else e !== void 0 && n.push(Te(e));
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
    return wt(e, this.constructor.elementStyles), e;
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
    var r;
    const s = this.constructor.elementProperties.get(e), i = this.constructor._$Eu(e, s);
    if (i !== void 0 && s.reflect === !0) {
      const a = (((r = s.converter) == null ? void 0 : r.toAttribute) !== void 0 ? s.converter : ee).toAttribute(n, s.type);
      this._$Em = e, a == null ? this.removeAttribute(i) : this.setAttribute(i, a), this._$Em = null;
    }
  }
  _$AK(e, n) {
    var r, a;
    const s = this.constructor, i = s._$Eh.get(e);
    if (i !== void 0 && this._$Em !== i) {
      const o = s.getPropertyOptions(i), c = typeof o.converter == "function" ? { fromAttribute: o.converter } : ((r = o.converter) == null ? void 0 : r.fromAttribute) !== void 0 ? o.converter : ee;
      this._$Em = i;
      const h = c.fromAttribute(n, o.type);
      this[i] = h ?? ((a = this._$Ej) == null ? void 0 : a.get(i)) ?? h, this._$Em = null;
    }
  }
  requestUpdate(e, n, s, i = !1, r) {
    var a;
    if (e !== void 0) {
      const o = this.constructor;
      if (i === !1 && (r = this[e]), s ?? (s = o.getPropertyOptions(e)), !((s.hasChanged ?? be)(r, n) || s.useDefault && s.reflect && r === ((a = this._$Ej) == null ? void 0 : a.get(e)) && !this.hasAttribute(o._$Eu(e, s)))) return;
      this.C(e, n, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, n, { useDefault: s, reflect: i, wrapped: r }, a) {
    s && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(e) && (this._$Ej.set(e, a ?? n ?? this[e]), r !== !0 || a !== void 0) || (this._$AL.has(e) || (this.hasUpdated || s || (n = void 0), this._$AL.set(e, n)), i === !0 && this._$Em !== e && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(e));
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
        for (const [r, a] of this._$Ep) this[r] = a;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [r, a] of i) {
        const { wrapped: o } = a, c = this[r];
        o !== !0 || this._$AL.has(r) || c === void 0 || this.C(r, void 0, a, c);
      }
    }
    let e = !1;
    const n = this._$AL;
    try {
      e = this.shouldUpdate(n), e ? (this.willUpdate(n), (s = this._$EO) == null || s.forEach((i) => {
        var r;
        return (r = i.hostUpdate) == null ? void 0 : r.call(i);
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
R.elementStyles = [], R.shadowRootOptions = { mode: "open" }, R[G("elementProperties")] = /* @__PURE__ */ new Map(), R[G("finalized")] = /* @__PURE__ */ new Map(), ae == null || ae({ ReactiveElement: R }), (L.reactiveElementVersions ?? (L.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Y = globalThis, De = (t) => t, te = Y.trustedTypes, Oe = te ? te.createPolicy("lit-html", { createHTML: (t) => t }) : void 0, Ze = "$lit$", D = `lit$${Math.random().toFixed(9).slice(2)}$`, Qe = "?" + D, Nt = `<${Qe}>`, H = document, V = () => H.createComment(""), J = (t) => t === null || typeof t != "object" && typeof t != "function", we = Array.isArray, Ct = (t) => we(t) || typeof (t == null ? void 0 : t[Symbol.iterator]) == "function", oe = `[ 	
\f\r]`, K = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Le = /-->/g, Ue = />/g, U = RegExp(`>|${oe}(?:([^\\s"'>=/]+)(${oe}*=${oe}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Pe = /'/g, ze = /"/g, Xe = /^(?:script|style|textarea|title)$/i, Dt = (t) => (e, ...n) => ({ _$litType$: t, strings: e, values: n }), m = Dt(1), I = Symbol.for("lit-noChange"), f = Symbol.for("lit-nothing"), He = /* @__PURE__ */ new WeakMap(), P = H.createTreeWalker(H, 129);
function et(t, e) {
  if (!we(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Oe !== void 0 ? Oe.createHTML(e) : e;
}
const Ot = (t, e) => {
  const n = t.length - 1, s = [];
  let i, r = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", a = K;
  for (let o = 0; o < n; o++) {
    const c = t[o];
    let h, d, u = -1, l = 0;
    for (; l < c.length && (a.lastIndex = l, d = a.exec(c), d !== null); ) l = a.lastIndex, a === K ? d[1] === "!--" ? a = Le : d[1] !== void 0 ? a = Ue : d[2] !== void 0 ? (Xe.test(d[2]) && (i = RegExp("</" + d[2], "g")), a = U) : d[3] !== void 0 && (a = U) : a === U ? d[0] === ">" ? (a = i ?? K, u = -1) : d[1] === void 0 ? u = -2 : (u = a.lastIndex - d[2].length, h = d[1], a = d[3] === void 0 ? U : d[3] === '"' ? ze : Pe) : a === ze || a === Pe ? a = U : a === Le || a === Ue ? a = K : (a = U, i = void 0);
    const $ = a === U && t[o + 1].startsWith("/>") ? " " : "";
    r += a === K ? c + Nt : u >= 0 ? (s.push(h), c.slice(0, u) + Ze + c.slice(u) + D + $) : c + D + (u === -2 ? o : $);
  }
  return [et(t, r + (t[n] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), s];
};
class q {
  constructor({ strings: e, _$litType$: n }, s) {
    let i;
    this.parts = [];
    let r = 0, a = 0;
    const o = e.length - 1, c = this.parts, [h, d] = Ot(e, n);
    if (this.el = q.createElement(h, s), P.currentNode = this.el.content, n === 2 || n === 3) {
      const u = this.el.content.firstChild;
      u.replaceWith(...u.childNodes);
    }
    for (; (i = P.nextNode()) !== null && c.length < o; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const u of i.getAttributeNames()) if (u.endsWith(Ze)) {
          const l = d[a++], $ = i.getAttribute(u).split(D), y = /([.?@])?(.*)/.exec(l);
          c.push({ type: 1, index: r, name: y[2], strings: $, ctor: y[1] === "." ? Ut : y[1] === "?" ? Pt : y[1] === "@" ? zt : re }), i.removeAttribute(u);
        } else u.startsWith(D) && (c.push({ type: 6, index: r }), i.removeAttribute(u));
        if (Xe.test(i.tagName)) {
          const u = i.textContent.split(D), l = u.length - 1;
          if (l > 0) {
            i.textContent = te ? te.emptyScript : "";
            for (let $ = 0; $ < l; $++) i.append(u[$], V()), P.nextNode(), c.push({ type: 2, index: ++r });
            i.append(u[l], V());
          }
        }
      } else if (i.nodeType === 8) if (i.data === Qe) c.push({ type: 2, index: r });
      else {
        let u = -1;
        for (; (u = i.data.indexOf(D, u + 1)) !== -1; ) c.push({ type: 7, index: r }), u += D.length - 1;
      }
      r++;
    }
  }
  static createElement(e, n) {
    const s = H.createElement("template");
    return s.innerHTML = e, s;
  }
}
function F(t, e, n = t, s) {
  var a, o;
  if (e === I) return e;
  let i = s !== void 0 ? (a = n._$Co) == null ? void 0 : a[s] : n._$Cl;
  const r = J(e) ? void 0 : e._$litDirective$;
  return (i == null ? void 0 : i.constructor) !== r && ((o = i == null ? void 0 : i._$AO) == null || o.call(i, !1), r === void 0 ? i = void 0 : (i = new r(t), i._$AT(t, n, s)), s !== void 0 ? (n._$Co ?? (n._$Co = []))[s] = i : n._$Cl = i), i !== void 0 && (e = F(t, i._$AS(t, e.values), i, s)), e;
}
class Lt {
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
    const { el: { content: n }, parts: s } = this._$AD, i = ((e == null ? void 0 : e.creationScope) ?? H).importNode(n, !0);
    P.currentNode = i;
    let r = P.nextNode(), a = 0, o = 0, c = s[0];
    for (; c !== void 0; ) {
      if (a === c.index) {
        let h;
        c.type === 2 ? h = new Q(r, r.nextSibling, this, e) : c.type === 1 ? h = new c.ctor(r, c.name, c.strings, this, e) : c.type === 6 && (h = new Ht(r, this, e)), this._$AV.push(h), c = s[++o];
      }
      a !== (c == null ? void 0 : c.index) && (r = P.nextNode(), a++);
    }
    return P.currentNode = H, i;
  }
  p(e) {
    let n = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(e, s, n), n += s.strings.length - 2) : s._$AI(e[n])), n++;
  }
}
class Q {
  get _$AU() {
    var e;
    return ((e = this._$AM) == null ? void 0 : e._$AU) ?? this._$Cv;
  }
  constructor(e, n, s, i) {
    this.type = 2, this._$AH = f, this._$AN = void 0, this._$AA = e, this._$AB = n, this._$AM = s, this.options = i, this._$Cv = (i == null ? void 0 : i.isConnected) ?? !0;
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
    e = F(this, e, n), J(e) ? e === f || e == null || e === "" ? (this._$AH !== f && this._$AR(), this._$AH = f) : e !== this._$AH && e !== I && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : Ct(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== f && J(this._$AH) ? this._$AA.nextSibling.data = e : this.T(H.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var r;
    const { values: n, _$litType$: s } = e, i = typeof s == "number" ? this._$AC(e) : (s.el === void 0 && (s.el = q.createElement(et(s.h, s.h[0]), this.options)), s);
    if (((r = this._$AH) == null ? void 0 : r._$AD) === i) this._$AH.p(n);
    else {
      const a = new Lt(i, this), o = a.u(this.options);
      a.p(n), this.T(o), this._$AH = a;
    }
  }
  _$AC(e) {
    let n = He.get(e.strings);
    return n === void 0 && He.set(e.strings, n = new q(e)), n;
  }
  k(e) {
    we(this._$AH) || (this._$AH = [], this._$AR());
    const n = this._$AH;
    let s, i = 0;
    for (const r of e) i === n.length ? n.push(s = new Q(this.O(V()), this.O(V()), this, this.options)) : s = n[i], s._$AI(r), i++;
    i < n.length && (this._$AR(s && s._$AB.nextSibling, i), n.length = i);
  }
  _$AR(e = this._$AA.nextSibling, n) {
    var s;
    for ((s = this._$AP) == null ? void 0 : s.call(this, !1, !0, n); e !== this._$AB; ) {
      const i = De(e).nextSibling;
      De(e).remove(), e = i;
    }
  }
  setConnected(e) {
    var n;
    this._$AM === void 0 && (this._$Cv = e, (n = this._$AP) == null || n.call(this, e));
  }
}
class re {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, n, s, i, r) {
    this.type = 1, this._$AH = f, this._$AN = void 0, this.element = e, this.name = n, this._$AM = i, this.options = r, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = f;
  }
  _$AI(e, n = this, s, i) {
    const r = this.strings;
    let a = !1;
    if (r === void 0) e = F(this, e, n, 0), a = !J(e) || e !== this._$AH && e !== I, a && (this._$AH = e);
    else {
      const o = e;
      let c, h;
      for (e = r[0], c = 0; c < r.length - 1; c++) h = F(this, o[s + c], n, c), h === I && (h = this._$AH[c]), a || (a = !J(h) || h !== this._$AH[c]), h === f ? e = f : e !== f && (e += (h ?? "") + r[c + 1]), this._$AH[c] = h;
    }
    a && !i && this.j(e);
  }
  j(e) {
    e === f ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class Ut extends re {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === f ? void 0 : e;
  }
}
class Pt extends re {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== f);
  }
}
class zt extends re {
  constructor(e, n, s, i, r) {
    super(e, n, s, i, r), this.type = 5;
  }
  _$AI(e, n = this) {
    if ((e = F(this, e, n, 0) ?? f) === I) return;
    const s = this._$AH, i = e === f && s !== f || e.capture !== s.capture || e.once !== s.once || e.passive !== s.passive, r = e !== f && (s === f || i);
    i && this.element.removeEventListener(this.name, this, s), r && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var n;
    typeof this._$AH == "function" ? this._$AH.call(((n = this.options) == null ? void 0 : n.host) ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class Ht {
  constructor(e, n, s) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = n, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    F(this, e);
  }
}
const ce = Y.litHtmlPolyfillSupport;
ce == null || ce(q, Q), (Y.litHtmlVersions ?? (Y.litHtmlVersions = [])).push("3.3.3");
const Rt = (t, e, n) => {
  const s = (n == null ? void 0 : n.renderBefore) ?? e;
  let i = s._$litPart$;
  if (i === void 0) {
    const r = (n == null ? void 0 : n.renderBefore) ?? null;
    s._$litPart$ = i = new Q(e.insertBefore(V(), r), r, void 0, n ?? {});
  }
  return i._$AI(t), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const z = globalThis;
class M extends R {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Rt(n, this.renderRoot, this.renderOptions);
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
    return I;
  }
}
var Ve;
M._$litElement$ = !0, M.finalized = !0, (Ve = z.litElementHydrateSupport) == null || Ve.call(z, { LitElement: M });
const le = z.litElementPolyfillSupport;
le == null || le({ LitElement: M });
(z.litElementVersions ?? (z.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const tt = (t) => (e, n) => {
  n !== void 0 ? n.addInitializer(() => {
    customElements.define(t, e);
  }) : customElements.define(t, e);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Mt = { attribute: !0, type: String, converter: ee, reflect: !1, hasChanged: be }, It = (t = Mt, e, n) => {
  const { kind: s, metadata: i } = n;
  let r = globalThis.litPropertyMetadata.get(i);
  if (r === void 0 && globalThis.litPropertyMetadata.set(i, r = /* @__PURE__ */ new Map()), s === "setter" && ((t = Object.create(t)).wrapped = !0), r.set(n.name, t), s === "accessor") {
    const { name: a } = n;
    return { set(o) {
      const c = e.get.call(this);
      e.set.call(this, o), this.requestUpdate(a, c, t, !0, o);
    }, init(o) {
      return o !== void 0 && this.C(a, void 0, t, o), o;
    } };
  }
  if (s === "setter") {
    const { name: a } = n;
    return function(o) {
      const c = this[a];
      e.call(this, o), this.requestUpdate(a, c, t, !0, o);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function ve(t) {
  return (e, n) => typeof n == "object" ? It(t, e, n) : ((s, i, r) => {
    const a = i.hasOwnProperty(r);
    return i.constructor.createProperty(r, s), a ? Object.getOwnPropertyDescriptor(i, r) : void 0;
  })(t, e, n);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function A(t) {
  return ve({ ...t, state: !0, attribute: !1 });
}
const Ft = "1.6.8", nt = "Day Brief", st = "day-brief-card", it = "day-brief-card-editor", rt = `
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
function Re(t) {
  if (!t)
    return null;
  if (typeof t == "string") {
    const e = /^\d{4}-\d{2}-\d{2}$/.test(t);
    return { iso: t, allDay: e };
  }
  return t.dateTime ? { iso: t.dateTime, allDay: !1 } : t.date ? { iso: t.date, allDay: !0 } : null;
}
function Wt(t, e) {
  var n, s, i;
  return ((s = (n = t.entities) == null ? void 0 : n[e]) == null ? void 0 : s.name) ?? (typeof ((i = t.states[e]) == null ? void 0 : i.attributes.friendly_name) == "string" ? t.states[e].attributes.friendly_name : e.replace(/^calendar\./, "").replace(/_/g, " "));
}
async function jt(t, e, n) {
  const s = [...new Set(e.filter(Boolean))];
  if (s.length === 0)
    return { events: [], errors: [] };
  const i = [];
  let r = {};
  try {
    const o = await t.callService(
      "calendar",
      "get_events",
      {
        duration: { hours: n }
      },
      { entity_id: s },
      !0,
      !0
    ), c = o && "response" in o ? o.response : void 0;
    c && typeof c == "object" && (r = c);
  } catch (o) {
    return i.push(
      o instanceof Error ? o.message : "Failed to load calendar events"
    ), { events: [], errors: i };
  }
  const a = [];
  for (const o of s) {
    const c = r[o];
    if (!c) {
      i.push(`No response for ${o}`);
      continue;
    }
    if (c.error) {
      i.push(`${o}: ${c.error}`);
      continue;
    }
    const h = Wt(t, o);
    for (const d of c.events ?? []) {
      const u = Re(d.start), l = Re(d.end);
      !u || !l || a.push({
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
  return a.sort((o, c) => o.start.localeCompare(c.start)), { events: a, errors: i };
}
function ne(t, e) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: e,
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(t);
}
function at(t, e) {
  if (t.all_day) {
    const s = /^(\d{4}-\d{2}-\d{2})/.exec(t.start);
    if (s)
      return s[1];
  }
  const n = new Date(t.start);
  return Number.isNaN(n.getTime()) ? t.start.slice(0, 10) : ne(n, e);
}
function Bt(t, e, n) {
  const s = ne(e, n);
  return t.filter((i) => at(i, n) === s);
}
function Kt(t, e, n, s) {
  const i = ne(s, n), r = new Date(s.getTime() + 2160 * 60 * 1e3), a = ne(r, n);
  if (t === i)
    return e.toLowerCase().startsWith("de") ? "Heute" : "Today";
  if (t === a)
    return e.toLowerCase().startsWith("de") ? "Morgen" : "Tomorrow";
  const o = /* @__PURE__ */ new Date(`${t}T12:00:00`);
  return Number.isNaN(o.getTime()) ? t : new Intl.DateTimeFormat(e, {
    weekday: "long",
    day: "numeric",
    month: "short",
    timeZone: n
  }).format(o);
}
function Gt(t, e, n, s) {
  const i = /* @__PURE__ */ new Map();
  for (const r of t) {
    const a = at(r, n), o = i.get(a);
    o ? o.push(r) : i.set(a, [r]);
  }
  return [...i.entries()].sort(([r], [a]) => r.localeCompare(a)).map(([r, a]) => ({
    key: r,
    label: Kt(r, e, n, s),
    events: a
  }));
}
function Yt(t, e, n) {
  if (t.all_day)
    return e.toLowerCase().startsWith("de") ? "Ganztägig" : "All day";
  const s = new Date(t.start);
  return Number.isNaN(s.getTime()) ? t.start : new Intl.DateTimeFormat(e, {
    hour: "numeric",
    minute: "2-digit",
    timeZone: n
  }).format(s);
}
function Vt(t, e) {
  var n, s;
  return ((s = (n = t.entities) == null ? void 0 : n[e.entity_id]) == null ? void 0 : s.name) ?? (typeof e.attributes.friendly_name == "string" ? e.attributes.friendly_name : e.entity_id);
}
function Jt(t, e) {
  if (t.formatEntityState)
    try {
      return t.formatEntityState(e);
    } catch {
    }
  const n = typeof e.attributes.unit_of_measurement == "string" ? e.attributes.unit_of_measurement : void 0;
  return n ? `${e.state} ${n}` : e.state;
}
function qt(t, e) {
  const n = [...new Set(e.filter(Boolean))], s = [], i = [];
  for (const r of n) {
    const a = t.states[r];
    if (!a) {
      i.push(r);
      continue;
    }
    s.push({
      entity_id: r,
      name: Vt(t, a),
      state: Jt(t, a),
      unit: typeof a.attributes.unit_of_measurement == "string" ? a.attributes.unit_of_measurement : void 0,
      domain: r.split(".")[0] ?? "unknown"
    });
  }
  return { entities: s, missing: i };
}
const Me = "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA";
class Zt {
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
      return e.setAttribute("playsinline", "true"), e.loop = !0, e.volume = 0.01, e.src = Me, e.play(), this.audio = e, this.active = !0, this.timer = window.setInterval(() => {
        this.nudge();
      }, 5e4), !0;
    } catch {
      return this.stop(), !1;
    }
  }
  nudge() {
    if (this.audio)
      try {
        this.audio.src = `${Me}#${Date.now()}`, this.audio.currentTime = 0, this.audio.play();
      } catch {
      }
  }
  stop() {
    this.timer && (window.clearInterval(this.timer), this.timer = void 0), this.audio && (this.audio.pause(), this.audio.removeAttribute("src"), this.audio.load(), this.audio = void 0), this.active = !1;
  }
}
function Qt(t) {
  return t.replace(/\*\*([^*]+)\*\*/g, "$1").replace(/\*([^*]+)\*/g, "$1");
}
function Xt(t) {
  const e = t.trim();
  if (!e)
    return f;
  const n = e.split(/\n{2,}/);
  return m`${n.map((s, i) => {
    const r = en(s.trim().replace(/\n/g, " "));
    return m`${i > 0 ? m`<br /><br />` : f}${r}`;
  })}`;
}
function en(t) {
  const e = [], n = /\*\*([^*]+)\*\*/g;
  let s = 0, i;
  for (; (i = n.exec(t)) !== null; )
    i.index > s && e.push(t.slice(s, i.index)), e.push(m`<strong>${i[1]}</strong>`), s = i.index + i[0].length;
  return s < t.length && e.push(t.slice(s)), m`${e}`;
}
function tn(t) {
  const e = /^(\d{4})-(\d{2})-(\d{2})$/.exec(t.trim());
  if (!e)
    return null;
  const n = Number(e[1]), s = Number(e[2]), i = Number(e[3]);
  return !n || s < 1 || s > 12 || i < 1 || i > 31 ? null : { year: n, month: s, day: i };
}
function nn(t, e) {
  const n = new Intl.DateTimeFormat("en-CA", {
    timeZone: e,
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).formatToParts(t), s = (i) => {
    var r;
    return Number(((r = n.find((a) => a.type === i)) == null ? void 0 : r.value) ?? 0);
  };
  return { year: s("year"), month: s("month"), day: s("day") };
}
function he(t, e, n) {
  return Date.UTC(t, e - 1, n) / 864e5;
}
function sn(t, e, n, s = 14) {
  const i = nn(e, n), r = he(i.year, i.month, i.day), a = [];
  for (const o of t) {
    const c = tn(o.date);
    if (!c || !o.name.trim())
      continue;
    let h = i.year, d = he(h, c.month, c.day);
    d < r && (h += 1, d = he(h, c.month, c.day));
    const u = d - r;
    u < 0 || u > s || a.push({
      name: o.name.trim(),
      date: `${String(c.month).padStart(2, "0")}-${String(c.day).padStart(2, "0")}`,
      daysUntil: u,
      ageTurning: h - c.year
    });
  }
  return a.sort((o, c) => o.daysUntil - c.daysUntil);
}
function rn(t, e) {
  return e ? t.daysUntil === 0 ? `- ${t.name}: heute (${t.ageTurning})` : t.daysUntil === 1 ? `- ${t.name}: morgen (${t.ageTurning})` : `- ${t.name}: in ${t.daysUntil} Tagen (${t.ageTurning})` : t.daysUntil === 0 ? `- ${t.name}: today (turns ${t.ageTurning})` : t.daysUntil === 1 ? `- ${t.name}: tomorrow (turns ${t.ageTurning})` : `- ${t.name}: in ${t.daysUntil} days (turns ${t.ageTurning})`;
}
function an(t) {
  var n, s;
  const e = [];
  for (const i of t.split(`
`)) {
    const r = i.trim();
    if (!r)
      continue;
    const a = /^(.+?)[\s,|:;-]+(\d{4}-\d{2}-\d{2})$/.exec(r) ?? /^(\d{4}-\d{2}-\d{2})[\s,|:;-]+(.+)$/.exec(r);
    if (!a)
      continue;
    const o = ((n = a[1]) == null ? void 0 : n.trim()) ?? "", c = ((s = a[2]) == null ? void 0 : s.trim()) ?? "";
    /^\d{4}-\d{2}-\d{2}$/.test(o) ? e.push({ name: c, date: o }) : e.push({ name: o, date: c });
  }
  return e;
}
function on(t) {
  return t.map((e) => `${e.name}: ${e.date}`).join(`
`);
}
const Ie = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday"
], Fe = {
  monday: "Montag",
  tuesday: "Dienstag",
  wednesday: "Mittwoch",
  thursday: "Donnerstag",
  friday: "Freitag",
  saturday: "Samstag",
  sunday: "Sonntag"
}, cn = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday"
];
function ln(t, e) {
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
function hn(t, e) {
  var r, a;
  const n = new Intl.DateTimeFormat("en-GB", {
    timeZone: e,
    hour: "2-digit",
    minute: "2-digit",
    hour12: !1
  }).formatToParts(t), s = Number(((r = n.find((o) => o.type === "hour")) == null ? void 0 : r.value) ?? 0), i = Number(
    ((a = n.find((o) => o.type === "minute")) == null ? void 0 : a.value) ?? 0
  );
  return s * 60 + i;
}
function We(t) {
  const e = /^(\d{1,2}):(\d{2})$/.exec(t.trim());
  if (!e)
    return null;
  const n = Number(e[1]), s = Number(e[2]);
  return n > 23 || s > 59 ? null : n * 60 + s;
}
function un(t, e, n) {
  if (!t.valid_from)
    return !0;
  const s = /^(\d{4})-(\d{2})-(\d{2})$/.exec(t.valid_from.trim());
  if (!s)
    return !0;
  const i = new Intl.DateTimeFormat("en-CA", {
    timeZone: n,
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).formatToParts(e), r = (c) => {
    var h;
    return Number(((h = i.find((d) => d.type === c)) == null ? void 0 : h.value) ?? 0);
  }, a = r("year") * 1e4 + r("month") * 100 + r("day"), o = Number(s[1]) * 1e4 + Number(s[2]) * 100 + Number(s[3]);
  return a >= o;
}
function dn(t, e, n) {
  const s = ln(e, n), i = [...t[s] ?? []].sort(
    (r, a) => r.start.localeCompare(a.start)
  );
  return { weekday: s, lessons: i };
}
function pn(t, e, n) {
  const s = hn(e, n);
  let i, r;
  for (const a of t) {
    const o = We(a.start), c = We(a.end);
    o === null || c === null || (s >= o && s < c ? i = a : s < o && !r && (r = a));
  }
  return { current: i, next: r };
}
function mn(t, e) {
  const n = Ie.indexOf(e);
  for (let s = 1; s <= 7; s += 1) {
    const i = Ie[(n + s) % 7];
    if (!cn.includes(i))
      continue;
    const r = [...t[i] ?? []].sort(
      (a, o) => a.start.localeCompare(o.start)
    );
    if (r.length)
      return { weekday: i, lessons: r };
  }
  return null;
}
function je(t) {
  var n;
  if (!t.length)
    return null;
  const e = [...t].sort((s, i) => s.end.localeCompare(i.end));
  return ((n = e[e.length - 1]) == null ? void 0 : n.end) ?? null;
}
function fn(t, e, n, s) {
  var a;
  const i = [];
  let r = !1;
  for (const o of t) {
    if (!((a = o.name) != null && a.trim()) || !un(o, e, n))
      continue;
    const { weekday: c, lessons: h } = dn(o, e, n), d = s ? Fe[c] : c;
    if (i.push(
      s ? `Schüler/in: ${o.name} · heute ${d}` : `Student: ${o.name} · today ${d}`
    ), o.note && i.push(s ? `Hinweis: ${o.note}` : `Note: ${o.note}`), h.length === 0) {
      i.push(
        s ? `Heute kein Unterricht für ${o.name}.` : `No lessons today for ${o.name}.`
      );
      const y = mn(o, c);
      if (y) {
        const E = s ? Fe[y.weekday] : y.weekday, k = je(y.lessons);
        i.push(
          s ? `Nächster Schultag: ${E} für ${o.name}${k ? ` (bis ${k})` : ""}.` : `Next school day: ${E} for ${o.name}${k ? ` (until ${k})` : ""}.`
        ), i.push(
          s ? `Plan ${E}:` : `${E} plan:`
        );
        for (const S of y.lessons.slice(0, 8))
          i.push(`- ${S.start}-${S.end}: ${S.subject}`);
      }
      continue;
    }
    r = !0;
    const { current: u, next: l } = pn(h, e, n), $ = je(h);
    $ && i.push(
      s ? `Schule heute bis ${$} (${o.name}).` : `School today until ${$} (${o.name}).`
    ), u && i.push(
      s ? `Jetzt: ${u.start}-${u.end} ${u.subject}` : `Now: ${u.start}-${u.end} ${u.subject}`
    ), l && i.push(
      s ? `Als Nächstes: ${l.start}-${l.end} ${l.subject}` : `Next: ${l.start}-${l.end} ${l.subject}`
    ), i.push(s ? "Heutiger Plan:" : "Today's schedule:");
    for (const y of h)
      i.push(`- ${y.start}-${y.end}: ${y.subject}`);
  }
  return { lines: i, hasLessonsToday: r };
}
function gn(t, e) {
  var r, a, o;
  const n = t.states[e];
  if (!n)
    return null;
  const s = n.attributes, i = ((a = (r = t.entities) == null ? void 0 : r[e]) == null ? void 0 : a.name) ?? (typeof s.friendly_name == "string" ? s.friendly_name : e);
  return {
    entity_id: e,
    condition: n.state,
    temperature: typeof s.temperature == "number" ? s.temperature : void 0,
    temperature_unit: typeof s.temperature_unit == "string" ? s.temperature_unit : (o = t.config.unit_system) == null ? void 0 : o.temperature,
    humidity: typeof s.humidity == "number" ? s.humidity : void 0,
    wind_speed: typeof s.wind_speed == "number" ? s.wind_speed : void 0,
    wind_speed_unit: typeof s.wind_speed_unit == "string" ? s.wind_speed_unit : void 0,
    friendly_name: i,
    forecast: []
  };
}
async function yn(t, e, n, s) {
  const i = await t.connection.subscribeMessage(
    (r) => {
      s(Array.isArray(r.forecast) ? r.forecast : []);
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
function Be(t) {
  return !t || t === "unknown" || t === "unavailable" ? "Weather unavailable" : t.replace(/_/g, " ");
}
function se(t, e) {
  if (typeof t != "number" || Number.isNaN(t))
    return "—";
  const n = Number.isInteger(t) ? String(t) : t.toFixed(1);
  if (!e)
    return `${n}°`;
  const s = e.includes("°") ? e : `°${e}`;
  return `${n}${s}`;
}
function Ke(t, e) {
  return t === e ? !1 : !t || !e ? !0 : t.state !== e.state || t.last_updated !== e.last_updated || t.attributes.temperature !== e.attributes.temperature || t.attributes.humidity !== e.attributes.humidity;
}
const ot = /* @__PURE__ */ new Set([
  "rainy",
  "pouring",
  "snowy",
  "snowy-rainy",
  "lightning-rainy",
  "hail"
]), Z = /* @__PURE__ */ new Map(), _n = {
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
function $n(t) {
  let e = 0;
  for (let n = 0; n < t.length; n += 1)
    e = (e << 5) - e + t.charCodeAt(n), e |= 0;
  return String(e);
}
function bn(t) {
  return t.toLowerCase().startsWith("de");
}
function wn(t, e) {
  const n = Number(
    new Intl.DateTimeFormat("en-GB", {
      hour: "numeric",
      hour12: !1,
      timeZone: e
    }).format(t)
  );
  return n < 5 ? "nacht" : n < 10 ? "morgen" : n < 12 ? "vormittag" : n < 17 ? "nachmittag" : n < 22 ? "abend" : "nacht";
}
function vn(t, e) {
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
function Ge(t, e) {
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
function ct(t, e) {
  return !t || t === "unknown" || t === "unavailable" ? e ? "Wetter unklar" : "Weather unavailable" : e ? _n[t] ?? t.replace(/_/g, " ") : t.replace(/_/g, " ");
}
function xn(t, e) {
  if (!t || typeof t.temperature != "number")
    return null;
  const n = t.temperature, s = ["rainy", "pouring", "snowy-rainy", "lightning-rainy"].includes(
    t.condition
  ), i = t.condition === "snowy";
  return e ? i ? "Winterkleidung und feste Schuhe" : n <= 3 ? s ? "dicke Jacke und Regenschutz" : "dicke Jacke" : n <= 10 ? s ? "warme Jacke und Regenschirm" : "warme Jacke" : n <= 16 ? s ? "Übergangsjacke und Schirm" : "Übergangsjacke" : n <= 22 ? s ? "leichte Jacke und Schirm" : "leichte Kleidung" : s ? "luftige Kleidung und Schirm" : "leichte sommerliche Kleidung" : i ? "winter clothes and sturdy shoes" : n <= 3 ? s ? "heavy coat and rain gear" : "heavy coat" : n <= 10 ? s ? "warm jacket and umbrella" : "warm jacket" : n <= 16 ? s ? "light jacket and umbrella" : "light jacket" : n <= 22 ? s ? "light layer and umbrella" : "light clothes" : s ? "summer clothes and umbrella" : "summer clothes";
}
function lt(t) {
  const e = t.trim().toLowerCase();
  return e === "unavailable" || e === "unknown" || e === "none" || e === "nicht verfügbar" || e === "unbekannt";
}
function An(t) {
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
function En(t) {
  const e = t.state.trim().toLowerCase();
  return e === "on" || e === "open" || e === "opened";
}
function Sn(t) {
  const e = [], n = [], s = [], i = [], r = [], a = [], o = [], c = [], h = [];
  for (const d of t) {
    if (lt(d.state))
      continue;
    const u = d.entity_id.toLowerCase(), l = d.name.toLowerCase();
    d.domain === "person" || u.startsWith("person.") ? e.push(d) : u.includes("abfall") || u.includes("muell") || u.includes("mull") || u.includes("trash") || l.includes("abfall") || l.includes("müll") || l.includes("tonne") ? s.push(d) : u.includes("solar") || u.includes("solaredge") || u.includes("autark") || u.includes("produziert") || u.includes("exportiert") || u.includes("verbrauch") || u.includes("power_production") || l.includes("solar") || l.includes("autark") || l.includes("leistung") ? n.push(d) : u.includes("sun_up") || u.includes("sun_down") || l.includes("sonnenaufgang") || l.includes("sonnenuntergang") ? i.push(d) : u.includes("warn") || l.includes("warn") || l.includes("warnung") ? r.push(d) : u.includes("fenster") || u.includes("window") || l.includes("fenster") || l.includes("window") ? En(d) && a.push(d) : u.includes("heizoel") || u.includes("heizöl") || u.includes("oil") || l.includes("heizöl") || l.includes("heizoel") ? o.push(d) : d.domain === "vacuum" || d.domain === "lawn_mower" || u.includes("vacuum") || u.includes("lawn_mower") || l.includes("mäher") || l.includes("maeh") || l.includes("sauger") ? An(d) && c.push(d) : h.push(d);
  }
  return {
    people: e,
    solar: n,
    trash: s,
    sun: i,
    alerts: r,
    windows: a,
    heating: o,
    appliances: c,
    other: h
  };
}
function kn(t, e, n, s) {
  const i = (n ?? "").toLowerCase();
  if (!(i.includes("schule") || i.includes("school") || i.includes("schultag")))
    return !1;
  const a = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    timeZone: e
  }).format(t);
  return !["Sat", "Sun"].includes(a) && (s === "morgen" || s === "vormittag");
}
function Tn(t, e) {
  return t.filter((n) => {
    const s = (n.summary ?? "").toLowerCase();
    return s.includes("geburtstag") || s.includes("birthday") || s.includes("bday");
  }).slice(0, 5).map((n) => ht(n, e));
}
function Nn(t) {
  const e = (t ?? "").toLowerCase();
  return e.includes("schule") || e.includes("unterricht") || e.includes("school") || /\bganztag\b/.test(e);
}
function ht(t, e) {
  const n = t.all_day ? e ? "ganztägig" : "all day" : t.start, s = t.calendar_name ? ` (${t.calendar_name})` : "", i = t.summary ?? (e ? "Belegt" : "Busy");
  return Nn(t.summary) ? e ? `- ${n}: ${i}${s} — Schultitel; Schüler/in NUR aus [STUNDENPLAN], nicht aus Kalendername` : `- ${n}: ${i}${s} — school title; student ONLY from [SCHEDULE], not calendar name` : `- ${n}: ${i}${s}`;
}
function C(t) {
  return `- ${t.name}: ${t.state}`;
}
function Cn(t, e, n) {
  const s = t.trim().toLowerCase();
  if (!s || lt(s))
    return null;
  if (/^(heute|today|0)$/.test(s))
    return 0;
  if (/^(morgen|tomorrow)$/.test(s) || /\bin 1 day\b/.test(s))
    return 1;
  const i = s.match(/\b(?:in\s+)?(\d+)\s*(?:tag|tage|days?)\b/);
  if (i)
    return Number(i[1]);
  if (/^\d+(\.\d+)?$/.test(s))
    return Math.round(Number(s));
  const r = Date.parse(t.trim());
  if (!Number.isNaN(r)) {
    const a = new Date(r), o = new Intl.DateTimeFormat("en-CA", {
      timeZone: n,
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    }).format(e), c = new Intl.DateTimeFormat("en-CA", {
      timeZone: n,
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    }).format(a), h = Date.parse(`${o}T00:00:00Z`), d = Date.parse(`${c}T00:00:00Z`);
    return Math.round((d - h) / 864e5);
  }
  return null;
}
function ge(t, e, n, s) {
  const i = [];
  for (const r of t) {
    const a = Cn(r.state, e, n);
    a !== null && (a === 0 ? i.push(
      s ? `AKTION HEUTE: ${r.name} — Abholung heute → Tonne muss draußen sein.` : `ACTION TODAY: ${r.name} — pickup today → bin must be out.`
    ) : a === 1 && i.push(
      s ? `AKTION HEUTE ABEND: ${r.name} — Abholung morgen → HEUTE RAUSSTELLEN.` : `ACTION TONIGHT: ${r.name} — pickup tomorrow → PUT OUT TODAY.`
    ));
  }
  return !i.length && t.length && i.push(
    s ? "Keine Abholung heute/morgen erkannt — Müll im Brief weglassen." : "No pickup today/tomorrow detected — omit trash from the brief."
  ), i;
}
function b(t, e, n) {
  return [`[${t}]`, e.length ? e.join(`
`) : n].join(`
`);
}
function ut(t, e, n) {
  return t.datetime ? new Intl.DateTimeFormat(e, {
    weekday: "short",
    timeZone: n
  }).format(new Date(t.datetime)) : "?";
}
function Dn(t, e, n, s, i) {
  return t.slice(0, 6).map((r) => {
    const a = ut(r, n, s), o = ct(r.condition ?? "", i), c = se(
      r.temperature,
      e == null ? void 0 : e.temperature_unit
    ), h = r.condition && ot.has(r.condition) ? i ? " · nass" : " · wet" : "";
    return `- ${a}: ${o}, ${c}${h}`;
  });
}
function On(t, e, n, s) {
  const i = t.slice(0, 6).filter((a) => a.condition && ot.has(a.condition));
  if (i.length === 0)
    return null;
  const r = i.map((a) => ut(a, e, n)).join(", ");
  return s ? `Regen/Schnee erwartet: ${r}` : `Rain/snow expected: ${r}`;
}
function Ln(t) {
  var j;
  const {
    german: e,
    dayLabel: n,
    part: s,
    now: i,
    timeZone: r,
    weather: a,
    weatherLine: o,
    clothing: c,
    rainLine: h,
    schoolDay: d,
    birthdays: u,
    events: l,
    people: $,
    solar: y,
    trash: E,
    alerts: k,
    windows: S,
    heating: T,
    appliances: _
  } = t, g = [];
  if (e) {
    if (g.push(`${Ge(s, !0)} ${n}.`), a && g.push(
      c ? `Draußen ${o}. Empfehlung: ${c}.` : `Draußen ${o}.`
    ), h && g.push(`${h}.`), d && (s === "morgen" || s === "vormittag") && g.push("Schultag — morgens an die Schule denken."), u.length) {
      const p = u[0];
      g.push(
        p.daysUntil === 0 ? `Heute hat ${p.name} Geburtstag (${p.ageTurning})!` : `Bald Geburtstag: ${p.name} in ${p.daysUntil} Tag(en).`
      );
    }
    if (l.length === 0)
      g.push("Heute stehen keine Termine an.");
    else {
      const p = l.slice(0, 3).map((v) => v.summary).filter(Boolean).join(", ");
      g.push(
        l.length === 1 ? `Termin: ${p}.` : `${l.length} Termine, u.a. ${p}.`
      );
    }
    y.length && g.push(
      `Solar: ${y.slice(0, 3).map((p) => `${p.name} ${p.state}`).join(", ")}.`
    );
    {
      const v = ge(E, i, r, !0).filter((N) => N.startsWith("AKTION"));
      v.length && g.push(
        v.map((N) => N.replace(/^AKTION (HEUTE(?: ABEND)?: )/, "")).join(" ")
      );
    }
    if (S.length && g.push(
      `Fenster offen: ${S.map((p) => p.name).join(", ")}.`
    ), T.length && g.push(
      `Heizöl: ${T.map((p) => `${p.name} ${p.state}`).join(", ")}.`
    ), _.length && g.push(
      `Geräte: ${_.map((p) => `${p.name} ${p.state}`).join(", ")}.`
    ), k.length) {
      const p = k.filter((v) => v.state !== "0" && v.state !== "ok");
      p.length && g.push(
        `Hinweis: ${p.map((v) => `${v.name} ${v.state}`).join(", ")}.`
      );
    }
    $.length && g.push(
      `Zuhause/Status: ${$.map((p) => `${p.name} ${p.state}`).join(", ")}.`
    );
  } else {
    if (g.push(`${Ge(s, !1)} ${n}.`), a && g.push(
      c ? `Outside: ${o}. Wear: ${c}.` : `Outside: ${o}.`
    ), h && g.push(`${h}.`), d && (s === "morgen" || s === "vormittag") && g.push("School day — keep the morning routine in mind."), u.length) {
      const p = u[0];
      g.push(
        p.daysUntil === 0 ? `Today is ${p.name}'s birthday (${p.ageTurning})!` : `Birthday soon: ${p.name} in ${p.daysUntil} day(s).`
      );
    }
    g.push(
      l.length === 0 ? "No meetings scheduled." : `${l.length} event(s), starting with ${((j = l[0]) == null ? void 0 : j.summary) ?? "Busy"}.`
    ), y.length && g.push(
      `Solar: ${y.slice(0, 3).map((p) => `${p.name} ${p.state}`).join(", ")}.`
    );
    {
      const v = ge(E, i, r, !1).filter((N) => N.startsWith("ACTION"));
      v.length && g.push(
        v.map(
          (N) => N.replace(/^ACTION (TODAY|TONIGHT): /, "")
        ).join(" ")
      );
    }
    S.length && g.push(`Open windows: ${S.map((p) => p.name).join(", ")}.`), T.length && g.push(
      `Heating oil: ${T.map((p) => `${p.name} ${p.state}`).join(", ")}.`
    ), _.length && g.push(
      `Devices needing attention: ${_.map((p) => `${p.name} ${p.state}`).join(", ")}.`
    );
  }
  return g.join(" ");
}
function Un(t) {
  const {
    weather: e,
    forecast: n = (e == null ? void 0 : e.forecast) ?? [],
    events: s,
    entities: i,
    birthdays: r = [],
    schedules: a = [],
    now: o,
    locale: c,
    timeZone: h,
    summaryPrompt: d,
    contextNotes: u
  } = t, l = bn(c), $ = wn(o, h), y = vn($, l), E = new Intl.DateTimeFormat(c, {
    weekday: "long",
    month: "long",
    day: "numeric",
    timeZone: h
  }).format(o), k = new Intl.DateTimeFormat(c, {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: h
  }).format(o), S = e ? `${ct(e.condition, l)}, ${se(
    e.temperature,
    e.temperature_unit
  )}${typeof e.humidity == "number" ? l ? `, Luftfeuchtigkeit ${e.humidity}%` : `, humidity ${e.humidity}%` : ""}` : l ? "Wetter nicht verfügbar" : "Weather unavailable", T = xn(e, l), _ = Sn(i), g = Dn(
    n,
    e,
    c,
    h,
    l
  ), j = On(n, c, h, l), p = sn(r, o, h, 14), v = Bt(s, o, h), N = [
    ...p.map((B) => rn(B, l)),
    ...Tn(s, l)
  ], pt = kn(o, h, u, $), { lines: mt, hasLessonsToday: ft } = fn(
    a,
    o,
    h,
    l
  ), Ae = pt || ft, gt = v.length === 0 ? [] : v.slice(0, 12).map((B) => ht(B, l)), yt = (d == null ? void 0 : d.trim()) || rt, Ee = u == null ? void 0 : u.trim(), _t = [
    b(
      l ? "ZEIT" : "TIME",
      [
        l ? `Datum: ${E}` : `Date: ${E}`,
        l ? `Uhrzeit: ${k}` : `Time: ${k}`,
        l ? `Tageszeit: ${y}` : `Time of day: ${y}`
      ],
      ""
    ),
    ...Ee ? [
      b(
        l ? "HAUSHALT" : "HOUSEHOLD",
        Ee.split(`
`).map((B) => B.trim()).filter(Boolean),
        ""
      )
    ] : [],
    b(
      l ? "SCHULTAG" : "SCHOOL_DAY",
      [
        Ae ? l ? "ja — heute Unterricht laut Stundenplan" : "yes — lessons today per schedule" : l ? "nein — heute kein Unterricht (Wochenende oder kein Plan)" : "no — no lessons today (weekend or empty plan)"
      ],
      ""
    ),
    b(
      l ? "STUNDENPLAN" : "SCHEDULE",
      mt,
      l ? "Kein Stundenplan konfiguriert." : "No schedule configured."
    ),
    b(
      l ? "WETTER" : "WEATHER",
      [
        S,
        T ? l ? `Kleidungshinweis: ${T}` : `Clothing hint: ${T}` : "",
        j ?? ""
      ].filter(Boolean),
      l ? "Keine Wetterdaten." : "No weather data."
    ),
    b(
      l ? "VORHERSAGE" : "FORECAST",
      g,
      l ? "Keine Vorhersage." : "No forecast."
    ),
    b(
      l ? "GEBURTSTAGE" : "BIRTHDAYS",
      N,
      l ? "Keine Geburtstage in den nächsten 14 Tagen." : "No birthdays in the next 14 days."
    ),
    b(
      l ? "TERMINE" : "AGENDA",
      gt,
      l ? "Keine Termine heute (nur heutiger Kalendertag, nicht die nächsten 24h)." : "No events today (calendar day only, not the next 24h)."
    ),
    b(
      l ? "PERSONEN" : "PEOPLE",
      _.people.map(C),
      l ? "Keine Personendaten." : "No people data."
    ),
    b(
      "SOLAR",
      _.solar.map(C),
      l ? "Keine Solarwerte (oder nicht verfügbar)." : "No solar data."
    ),
    b(
      l ? "MUELL" : "TRASH",
      _.trash.map(C),
      l ? "Keine Mülldaten." : "No trash data."
    ),
    b(
      l ? "MUELL-AKTION" : "TRASH-ACTION",
      ge(_.trash, o, h, l),
      l ? "Keine Müll-Aktion heute/morgen." : "No trash action today/tomorrow."
    ),
    b(
      l ? "SONNE" : "SUN",
      _.sun.map(C),
      l ? "Keine Sonnenzeiten." : "No sun times."
    ),
    b(
      l ? "FENSTER" : "WINDOWS",
      _.windows.map(C),
      l ? "Keine offenen Fenster." : "No open windows."
    ),
    b(
      l ? "HEIZOEL" : "HEATING_OIL",
      _.heating.map(C),
      l ? "Kein Heizöl-Sensor." : "No heating-oil sensor."
    ),
    b(
      l ? "GERAETE" : "APPLIANCES",
      _.appliances.map(C),
      l ? "Keine Geräte mit Handlungsbedarf." : "No appliances needing attention."
    ),
    b(
      l ? "WARNUNGEN" : "ALERTS",
      _.alerts.map(C),
      l ? "Keine Warnungen." : "No alerts."
    ),
    b(
      l ? "SONSTIGES" : "OTHER",
      _.other.map(C),
      l ? "Nichts weiteres." : "Nothing else."
    )
  ], Se = [
    yt,
    "",
    l ? "DATEN (nur diese Fakten verwenden; fehlende/ungültige Werte weglassen):" : "DATA (use only these facts; skip missing/invalid values):",
    _t.join(`

`),
    "",
    l ? "ANTWORT: Nur der fertige deutsche Fließtext (Markdown **fett** erlaubt), nichts sonst." : "RESPONSE: Only the finished brief text (Markdown **bold** allowed), nothing else."
  ].join(`
`), $t = Ln({
    german: l,
    dayLabel: E,
    part: $,
    now: o,
    timeZone: h,
    weather: e,
    weatherLine: S,
    clothing: T,
    rainLine: j,
    schoolDay: Ae,
    birthdays: p,
    events: v,
    people: _.people,
    solar: _.solar,
    trash: _.trash,
    alerts: _.alerts,
    windows: _.windows,
    heating: _.heating,
    appliances: _.appliances
  });
  return {
    hash: $n(Se),
    prompt: Se,
    local: $t
  };
}
function dt(t) {
  if (!t) {
    Z.clear();
    return;
  }
  Z.delete(t);
}
function Pn(t, e) {
  const n = Z.get(t);
  return n ? n.hash !== e || n.expiresAt < Date.now() ? (Z.delete(t), null) : n : null;
}
function ue(t, e, n, s, i) {
  Z.set(t, {
    hash: e,
    text: n,
    source: s,
    expiresAt: Date.now() + Math.max(1, i) * 6e4
  });
}
async function zn(t, e, n) {
  var r, a, o, c, h, d;
  const s = await t.callWS({
    type: "conversation/process",
    text: n,
    language: ((r = t.locale) == null ? void 0 : r.language) ?? t.config.language ?? "en",
    agent_id: e
  });
  return ((a = s.response) == null ? void 0 : a.response_type) === "error" ? null : ((d = (h = (c = (o = s.response) == null ? void 0 : o.speech) == null ? void 0 : c.plain) == null ? void 0 : h.speech) == null ? void 0 : d.trim()) || null;
}
async function Hn(t) {
  const { hass: e, mode: n, agentId: s, digest: i, cacheKey: r, cacheMinutes: a, force: o } = t;
  if (o)
    dt(r);
  else {
    const c = Pn(r, i.hash);
    if (c)
      return { text: c.text, source: c.source };
  }
  if (n === "local")
    return ue(r, i.hash, i.local, "local", a), { text: i.local, source: "local" };
  try {
    const c = await zn(e, s, i.prompt);
    if (c)
      return ue(r, i.hash, c, "ai", a), { text: c, source: "ai" };
  } catch {
  }
  return ue(r, i.hash, i.local, "local", a), { text: i.local, source: "local" };
}
let O = null, ie = null;
function Rn() {
  if (!(typeof window > "u"))
    try {
      const t = new Audio();
      ie = t, t.play().catch(() => {
      });
    } catch {
    }
}
function ye() {
  typeof window < "u" && "speechSynthesis" in window && window.speechSynthesis.cancel(), O && (O.pause(), O.removeAttribute("src"), O.load(), O = null), ie = null;
}
function Mn(t) {
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
async function In(t) {
  const e = ie ?? new Audio();
  ie = null, O = e, await new Promise((n, s) => {
    const i = () => {
      a(), n();
    }, r = () => {
      a(), s(new Error("audio element failed to load TTS stream"));
    }, a = () => {
      e.removeEventListener("playing", i), e.removeEventListener("error", r);
    };
    e.addEventListener("playing", i), e.addEventListener("error", r), e.src = t, e.play().catch(() => {
    });
  }), await new Promise((n, s) => {
    e.onended = () => n(), e.onerror = () => s(new Error("audio element failed during TTS playback"));
  }), O === e && (O = null);
}
async function Fn(t) {
  const e = t.text.trim();
  if (!e)
    return;
  const n = t.language ?? "en";
  if (t.ttsEntity) {
    try {
      if (typeof t.hass.callApi != "function")
        throw new Error("hass.callApi is unavailable");
      const s = await t.hass.callApi(
        "POST",
        "tts_get_url",
        {
          engine_id: t.ttsEntity,
          message: e,
          language: n,
          cache: !0
        }
      ), i = s.path || s.url;
      if (!i)
        throw new Error("tts_get_url returned no path");
      const r = i.startsWith("http://") || i.startsWith("https://") ? (() => {
        try {
          const a = new URL(i);
          return a.pathname.startsWith("/api/tts_proxy/") ? a.pathname + a.search : i;
        } catch {
          return i;
        }
      })() : i;
      await In(r);
    } catch (s) {
      throw new Error(Mn(s));
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
    ye();
    const s = new SpeechSynthesisUtterance(e);
    s.lang = n, s.rate = 1, window.speechSynthesis.speak(s);
    return;
  }
  throw new Error("No TTS available");
}
const Wn = qe`
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
var jn = Object.defineProperty, Bn = Object.getOwnPropertyDescriptor, x = (t, e, n, s) => {
  for (var i = s > 1 ? void 0 : s ? Bn(e, n) : e, r = t.length - 1, a; r >= 0; r--)
    (a = t[r]) && (i = (s ? a(e, n, i) : a(i)) || i);
  return s && i && jn(e, n, i), i;
};
const de = "daily", pe = 24, Ye = 15, me = "auto", Kn = 15 * 6e4;
let w = class extends M {
  constructor() {
    super(...arguments), this._weather = null, this._forecast = [], this._events = [], this._entities = [], this._summary = "", this._summarySource = "loading", this._errors = [], this._loadingEvents = !1, this._refreshing = !1, this._contextOpen = !1, this._now = /* @__PURE__ */ new Date(), this._speaking = !1, this._keepAwakeOn = !1, this._fetchGeneration = 0, this._keepAwake = new Zt(), this._onVisibility = () => {
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
    return await Promise.resolve().then(() => Zn), document.createElement(it);
  }
  setConfig(t) {
    if (!t)
      throw new Error("Invalid configuration");
    this._config = {
      forecast_type: de,
      horizon_hours: pe,
      summary_mode: me,
      cache_minutes: Ye,
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
    super.connectedCallback(), this._startRefreshLoop(), this._startClock(), document.addEventListener("visibilitychange", this._onVisibility);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._stopRefreshLoop(), this._stopClock(), this._teardownForecast(), this._keepAwake.stop(), this._keepAwakeOn = !1, ye(), document.removeEventListener("visibilitychange", this._onVisibility);
  }
  updated(t) {
    !this._config || !this.hass || ((t.has("hass") || t.has("_config")) && (this._syncWeatherFromHass(), this._syncEntitiesFromHass(), this._ensureForecastSubscription()), t.has("_config") && this.isConnected && this._refreshData(!0));
  }
  shouldUpdate(t) {
    var e, n, s, i, r, a, o, c;
    if (t.has("_config") || t.has("_weather") || t.has("_forecast") || t.has("_entities") || t.has("_events") || t.has("_summary") || t.has("_summarySource") || t.has("_errors") || t.has("_loadingEvents") || t.has("_refreshing") || t.has("_contextOpen") || t.has("_now") || t.has("_speaking") || t.has("_keepAwakeOn"))
      return !0;
    if (t.has("hass")) {
      const h = t.get("hass");
      if ((e = this._config) != null && e.weather_entity && Ke(
        (n = h == null ? void 0 : h.states) == null ? void 0 : n[this._config.weather_entity],
        (i = (s = this.hass) == null ? void 0 : s.states) == null ? void 0 : i[this._config.weather_entity]
      ))
        return !0;
      for (const d of ((r = this._config) == null ? void 0 : r.entities) ?? [])
        if (Ke((a = h == null ? void 0 : h.states) == null ? void 0 : a[d], (c = (o = this.hass) == null ? void 0 : o.states) == null ? void 0 : c[d]))
          return !0;
    }
    return !1;
  }
  _startRefreshLoop() {
    this._stopRefreshLoop(), this._refreshData(!0), this._refreshTimer = window.setInterval(() => {
      this._refreshData(!1);
    }, Kn);
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
    var n, s, i, r;
    const e = (n = this.hass) == null ? void 0 : n.states[t];
    return ((r = (i = (s = this.hass) == null ? void 0 : s.entities) == null ? void 0 : i[t]) == null ? void 0 : r.name) ?? (typeof (e == null ? void 0 : e.attributes.friendly_name) == "string" ? e.attributes.friendly_name : t.replace(/^camera\./, "").replace(/_/g, " "));
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
      this._config.summary_mode ?? me,
      this._config.agent_id ?? "",
      this._config.summary_prompt ?? "",
      this._config.context_notes ?? "",
      JSON.stringify(this._config.birthdays ?? []),
      JSON.stringify(this._config.schedules ?? [])
    ].join("|");
  }
  _syncWeatherFromHass() {
    const t = this._config.weather_entity;
    if (!t) {
      this._weather = null;
      return;
    }
    const e = gn(this.hass, t);
    if (!e) {
      this._weather = null, this._pushError(`Weather entity not found: ${t}`);
      return;
    }
    this._weather = { ...e, forecast: this._forecast };
  }
  _syncEntitiesFromHass() {
    const { entities: t, missing: e } = qt(
      this.hass,
      this._config.entities ?? []
    );
    this._entities = t;
    for (const n of e)
      this._pushError(`Entity not found: ${n}`);
  }
  async _ensureForecastSubscription() {
    const t = this._config.weather_entity, e = this._config.forecast_type ?? de;
    if (!(this._unsubForecast && this._lastWeatherEntity === t && this._lastForecastType === e)) {
      if (this._teardownForecast(), this._lastWeatherEntity = t, this._lastForecastType = e, !t || e === "none" || !this.hass) {
        this._forecast = [];
        return;
      }
      try {
        this._unsubForecast = await yn(
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
      this._refreshing = !0, dt(this._cacheKey());
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
        ye(), this._speaking = !1;
        return;
      }
      Rn(), this._speaking = !0;
      try {
        await Fn({
          hass: this.hass,
          text: Qt(this._summary),
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
    if (!this.hass || !this._config)
      return;
    const n = ++this._fetchGeneration, s = [];
    this._loadingEvents = !0, this._syncWeatherFromHass(), this._syncEntitiesFromHass();
    const i = this._config.calendars ?? [], r = this._config.horizon_hours ?? pe, { events: a, errors: o } = await jt(
      this.hass,
      i,
      r
    );
    if (n === this._fetchGeneration) {
      this._events = a, s.push(...o), this._loadingEvents = !1, this._config.weather_entity ? this.hass.states[this._config.weather_entity] || s.push(`Weather entity not found: ${this._config.weather_entity}`) : s.push("No weather_entity configured");
      for (const c of this._config.entities ?? [])
        this.hass.states[c] || s.push(`Entity not found: ${c}`);
      this._errors = [...new Set(s)].slice(-6), await this._refreshSummary(t, e);
    }
  }
  async _refreshSummary(t, e = !1) {
    var c;
    if (!this.hass || !this._config)
      return;
    const n = this._config.summary_mode ?? me, s = this._config.cache_minutes ?? Ye, i = ((c = this.hass.locale) == null ? void 0 : c.language) ?? "en", r = this.hass.config.time_zone, a = Un({
      weather: this._weather,
      forecast: this._forecast,
      events: this._events,
      entities: this._entities,
      birthdays: this._config.birthdays,
      schedules: this._config.schedules,
      now: /* @__PURE__ */ new Date(),
      locale: i,
      timeZone: r,
      summaryPrompt: this._config.summary_prompt,
      contextNotes: this._config.context_notes
    }), o = this._cacheKey();
    (t || e || !this._summary || this._summarySource === "loading") && (this._summarySource = "loading");
    try {
      const h = await Hn({
        hass: this.hass,
        mode: n,
        agentId: this._config.agent_id,
        digest: a,
        cacheKey: o,
        cacheMinutes: s,
        force: e
      });
      this._summary = h.text, this._summarySource = h.source;
    } catch {
      this._summary = a.local, this._summarySource = "local";
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
    var r;
    if (!t.datetime)
      return "";
    const e = ((r = this.hass.locale) == null ? void 0 : r.language) ?? "en", n = this.hass.config.time_zone, s = this._config.forecast_type ?? de, i = new Date(t.datetime);
    return s === "hourly" ? new Intl.DateTimeFormat(e, {
      hour: "numeric",
      timeZone: n
    }).format(i) : new Intl.DateTimeFormat(e, {
      weekday: "short",
      timeZone: n
    }).format(i);
  }
  render() {
    var s, i, r;
    if (!this._config)
      return f;
    const t = ((i = (s = this.hass) == null ? void 0 : s.locale) == null ? void 0 : i.language) ?? "en", e = ((r = this.hass) == null ? void 0 : r.config.time_zone) ?? "UTC", n = this._weather;
    return m`
      <ha-card>
        <div class="header">
          <div class="header-row">
            <div>
              <p class="eyebrow">Today</p>
              <h2 class="title">${this._dayTitle()}</h2>
              <p class="clock" aria-live="polite">${this._clockLabel()}</p>
            </div>
            <div class="header-actions">
              <button
                class="icon-btn"
                type="button"
                title="Refresh brief"
                aria-label="Refresh brief"
                ?disabled=${this._refreshing}
                @click=${this._onManualRefresh}
              >
                <span class=${this._refreshing ? "spin" : ""}>↻</span>
              </button>
              <button
                class="icon-btn ${this._speaking ? "active" : ""}"
                type="button"
                title="Read summary aloud"
                aria-label="Read summary aloud"
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
          ${this._summarySource === "loading" && !this._summary ? "Preparing your day brief…" : Xt(this._summary)}
        </div>

        <div class="split">
          <section class="panel">
            <h3 class="section-title">Weather</h3>
            ${n ? m`
                  <div class="weather-hero">
                    <div>
                      <p class="condition">
                        ${Be(n.condition)}
                      </p>
                      <p class="weather-place">
                        ${n.friendly_name ?? n.entity_id}
                      </p>
                    </div>
                    <p class="temp">
                      ${se(
      n.temperature,
      n.temperature_unit
    )}
                    </p>
                  </div>
                  ${typeof n.humidity == "number" || typeof n.wind_speed == "number" ? m`
                        <div class="chips">
                          ${typeof n.humidity == "number" ? m`<span class="chip"
                                >${n.humidity}% humidity</span
                              >` : f}
                          ${typeof n.wind_speed == "number" ? m`<span class="chip"
                                >${n.wind_speed}
                                ${n.wind_speed_unit ?? ""}</span
                              >` : f}
                        </div>
                      ` : f}
                  ${this._forecast.length ? m`
                        <div class="forecast">
                          ${this._forecast.map(
      (a) => m`
                              <div class="forecast-item">
                                <span class="forecast-day"
                                  >${this._forecastLabel(a)}</span
                                >
                                <span class="forecast-temp"
                                  >${se(
        a.temperature,
        n.temperature_unit
      )}</span
                                >
                                <span class="forecast-cond"
                                  >${Be(
        a.condition ?? ""
      )}</span
                                >
                              </div>
                            `
    )}
                        </div>
                      ` : f}
                ` : m`<p class="empty">Configure a weather entity to begin.</p>`}
          </section>

          <section class="panel">
            <h3 class="section-title">Calendar</h3>
            ${this._loadingEvents && this._events.length === 0 ? m`<p class="empty loading">Loading calendars…</p>` : this._events.length === 0 ? m`<p class="empty">
                    Nothing in the next
                    ${this._config.horizon_hours ?? pe} hours.
                  </p>` : m`
                    <ul class="events">
                      ${Gt(
      this._events,
      t,
      e,
      /* @__PURE__ */ new Date()
    ).map(
      (a) => m`
                          <li class="event-day" aria-label=${a.label}>
                            <p class="event-day-label">${a.label}</p>
                            <ul class="event-day-list">
                              ${a.events.map(
        (o) => m`
                                  <li class="event">
                                    <span class="event-time"
                                      >${Yt(
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
                                          </p>` : f}
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
                <h3 class="section-title">Cameras</h3>
                <div class="camera-grid">
                  ${(this._config.cameras ?? []).map((a) => {
      const o = this._cameraSrc(a);
      return m`
                      <button
                        class="camera-tile"
                        type="button"
                        @click=${() => this._openMoreInfo(a)}
                      >
                        ${o ? m`<img
                              class="camera-feed"
                              src=${o}
                              alt=${this._cameraName(a)}
                            />` : m`<div class="camera-missing">No feed</div>`}
                        <span class="camera-label"
                          >${this._cameraName(a)}</span
                        >
                      </button>
                    `;
    })}
                </div>
              </section>
            ` : f}

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
      (a) => m`
                            <li class="entity-row">
                              <span class="entity-name">${a.name}</span>
                              <span class="entity-state">${a.state}</span>
                            </li>
                          `
    )}
                      </ul>
                    ` : f}
              </section>
            ` : f}

        ${this._errors.length ? m`
              <div class="errors">
                ${this._errors.map(
      (a) => m`<span class="error-chip">${a}</span>`
    )}
              </div>
            ` : f}

        ${this._config.keep_awake !== !1 ? m`
              <div class="footer-bar">
                <button
                  class="keep-awake ${this._keepAwakeOn ? "on" : ""}"
                  type="button"
                  title=${this._keepAwakeOn ? "Keep-awake active (tap to stop)" : "Tap once to keep Echo Show / Silk open"}
                  @click=${this._onKeepAwake}
                >
                  <span class="keep-dot"></span>
                  <span>${this._keepAwakeOn ? "Awake" : "Keep awake"}</span>
                </button>
              </div>
            ` : f}
      </ha-card>
    `;
  }
};
w.styles = Wn;
x([
  ve({ attribute: !1 })
], w.prototype, "hass", 2);
x([
  A()
], w.prototype, "_config", 2);
x([
  A()
], w.prototype, "_weather", 2);
x([
  A()
], w.prototype, "_forecast", 2);
x([
  A()
], w.prototype, "_events", 2);
x([
  A()
], w.prototype, "_entities", 2);
x([
  A()
], w.prototype, "_summary", 2);
x([
  A()
], w.prototype, "_summarySource", 2);
x([
  A()
], w.prototype, "_errors", 2);
x([
  A()
], w.prototype, "_loadingEvents", 2);
x([
  A()
], w.prototype, "_refreshing", 2);
x([
  A()
], w.prototype, "_contextOpen", 2);
x([
  A()
], w.prototype, "_now", 2);
x([
  A()
], w.prototype, "_speaking", 2);
x([
  A()
], w.prototype, "_keepAwakeOn", 2);
w = x([
  tt(st)
], w);
window.customCards = window.customCards || [];
window.customCards.push({
  type: st,
  name: nt,
  description: "AI-first day brief with weather, calendars, extra entities, and a short narrative.",
  preview: !0,
  documentationURL: "https://github.com/jenskock/lovelace-day-brief"
});
console.info(
  `%c ${nt} %c ${Ft} `,
  "color:#fff;background:#03a9f4;font-weight:700",
  "color:#03a9f4;background:transparent;font-weight:700"
);
var Gn = Object.defineProperty, Yn = Object.getOwnPropertyDescriptor, xe = (t, e, n, s) => {
  for (var i = s > 1 ? void 0 : s ? Yn(e, n) : e, r = t.length - 1, a; r >= 0; r--)
    (a = t[r]) && (i = (s ? a(e, n, i) : a(i)) || i);
  return s && i && Gn(e, n, i), i;
};
const Vn = [
  "daily",
  "hourly",
  "twice_daily",
  "none"
], Jn = ["auto", "ai", "local"];
function qn(t, e) {
  t.dispatchEvent(
    new CustomEvent("config-changed", {
      detail: { config: e },
      bubbles: !0,
      composed: !0
    })
  );
}
function fe(t) {
  return [
    ...new Set(
      t.split(/[\n,]/).map((e) => e.trim()).filter(Boolean)
    )
  ];
}
let W = class extends M {
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
    this._config = e, qn(this, e);
  }
  _value(t) {
    return t.target.value;
  }
  _onWeather(t) {
    this._update({ weather_entity: this._value(t) || void 0 });
  }
  _onCalendars(t) {
    this._update({ calendars: fe(this._value(t)) });
  }
  _onEntities(t) {
    this._update({ entities: fe(this._value(t)) });
  }
  _onCameras(t) {
    this._update({ cameras: fe(this._value(t)) });
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
    const e = an(this._value(t));
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
    const t = this._config.calendars ?? [], e = this._config.entities ?? [], n = this._weatherEntities(), s = this._calendarEntities();
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
      (i) => m`<option
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
          ${s.length === 0 ? m`
                <textarea
                  rows="3"
                  placeholder="calendar.personal, calendar.work"
                  .value=${t.join(`
`)}
                  @change=${this._onCalendars}
                ></textarea>
              ` : m`
                <div class="checks">
                  ${s.map(
      (i) => m`
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
            ${Vn.map(
      (i) => m`<option
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
            ${Jn.map(
      (i) => m`<option
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
            .value=${on(this._config.birthdays ?? [])}
            @change=${this._onBirthdays}
          ></textarea>
          <span class="hint">One per line: Name: YYYY-MM-DD</span>
        </label>

        <label>
          System prompt
          <textarea
            rows="5"
            placeholder=${rt}
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
      </div>
    `;
  }
};
W.styles = qe`
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
xe([
  ve({ attribute: !1 })
], W.prototype, "hass", 2);
xe([
  A()
], W.prototype, "_config", 2);
W = xe([
  tt(it)
], W);
const Zn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get DayBriefCardEditor() {
    return W;
  }
}, Symbol.toStringTag, { value: "Module" }));
export {
  w as DayBriefCard
};
//# sourceMappingURL=day-brief.js.map
