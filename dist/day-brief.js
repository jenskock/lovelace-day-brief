/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Z = globalThis, pe = Z.ShadowRoot && (Z.ShadyCSS === void 0 || Z.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, me = Symbol(), Ae = /* @__PURE__ */ new WeakMap();
let We = class {
  constructor(e, n, s) {
    if (this._$cssResult$ = !0, s !== me) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = n;
  }
  get styleSheet() {
    let e = this.o;
    const n = this.t;
    if (pe && e === void 0) {
      const s = n !== void 0 && n.length === 1;
      s && (e = Ae.get(n)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), s && Ae.set(n, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const ht = (t) => new We(typeof t == "string" ? t : t + "", void 0, me), Be = (t, ...e) => {
  const n = t.length === 1 ? t[0] : e.reduce((s, i, a) => s + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + t[a + 1], t[0]);
  return new We(n, t, me);
}, ut = (t, e) => {
  if (pe) t.adoptedStyleSheets = e.map((n) => n instanceof CSSStyleSheet ? n : n.styleSheet);
  else for (const n of e) {
    const s = document.createElement("style"), i = Z.litNonce;
    i !== void 0 && s.setAttribute("nonce", i), s.textContent = n.cssText, t.appendChild(s);
  }
}, Se = pe ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let n = "";
  for (const s of e.cssRules) n += s.cssText;
  return ht(n);
})(t) : t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: dt, defineProperty: pt, getOwnPropertyDescriptor: mt, getOwnPropertyNames: ft, getOwnPropertySymbols: gt, getPrototypeOf: _t } = Object, C = globalThis, Ee = C.trustedTypes, yt = Ee ? Ee.emptyScript : "", ne = C.reactiveElementPolyfillSupport, W = (t, e) => t, J = { toAttribute(t, e) {
  switch (e) {
    case Boolean:
      t = t ? yt : null;
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
} }, fe = (t, e) => !dt(t, e), ke = { attribute: !0, type: String, converter: J, reflect: !1, useDefault: !1, hasChanged: fe };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), C.litPropertyMetadata ?? (C.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let U = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, n = ke) {
    if (n.state && (n.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((n = Object.create(n)).wrapped = !0), this.elementProperties.set(e, n), !n.noAccessor) {
      const s = Symbol(), i = this.getPropertyDescriptor(e, s, n);
      i !== void 0 && pt(this.prototype, e, i);
    }
  }
  static getPropertyDescriptor(e, n, s) {
    const { get: i, set: a } = mt(this.prototype, e) ?? { get() {
      return this[n];
    }, set(r) {
      this[n] = r;
    } };
    return { get: i, set(r) {
      const o = i == null ? void 0 : i.call(this);
      a == null || a.call(this, r), this.requestUpdate(e, o, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? ke;
  }
  static _$Ei() {
    if (this.hasOwnProperty(W("elementProperties"))) return;
    const e = _t(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(W("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(W("properties"))) {
      const n = this.properties, s = [...ft(n), ...gt(n)];
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
      for (const i of s) n.unshift(Se(i));
    } else e !== void 0 && n.push(Se(e));
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
    return ut(e, this.constructor.elementStyles), e;
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
      const r = (((a = s.converter) == null ? void 0 : a.toAttribute) !== void 0 ? s.converter : J).toAttribute(n, s.type);
      this._$Em = e, r == null ? this.removeAttribute(i) : this.setAttribute(i, r), this._$Em = null;
    }
  }
  _$AK(e, n) {
    var a, r;
    const s = this.constructor, i = s._$Eh.get(e);
    if (i !== void 0 && this._$Em !== i) {
      const o = s.getPropertyOptions(i), c = typeof o.converter == "function" ? { fromAttribute: o.converter } : ((a = o.converter) == null ? void 0 : a.fromAttribute) !== void 0 ? o.converter : J;
      this._$Em = i;
      const d = c.fromAttribute(n, o.type);
      this[i] = d ?? ((r = this._$Ej) == null ? void 0 : r.get(i)) ?? d, this._$Em = null;
    }
  }
  requestUpdate(e, n, s, i = !1, a) {
    var r;
    if (e !== void 0) {
      const o = this.constructor;
      if (i === !1 && (a = this[e]), s ?? (s = o.getPropertyOptions(e)), !((s.hasChanged ?? fe)(a, n) || s.useDefault && s.reflect && a === ((r = this._$Ej) == null ? void 0 : r.get(e)) && !this.hasAttribute(o._$Eu(e, s)))) return;
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
        const { wrapped: o } = r, c = this[a];
        o !== !0 || this._$AL.has(a) || c === void 0 || this.C(a, void 0, r, c);
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
U.elementStyles = [], U.shadowRootOptions = { mode: "open" }, U[W("elementProperties")] = /* @__PURE__ */ new Map(), U[W("finalized")] = /* @__PURE__ */ new Map(), ne == null || ne({ ReactiveElement: U }), (C.reactiveElementVersions ?? (C.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const B = globalThis, Te = (t) => t, Q = B.trustedTypes, Ce = Q ? Q.createPolicy("lit-html", { createHTML: (t) => t }) : void 0, Ge = "$lit$", k = `lit$${Math.random().toFixed(9).slice(2)}$`, Ke = "?" + k, $t = `<${Ke}>`, z = document, G = () => z.createComment(""), K = (t) => t === null || typeof t != "object" && typeof t != "function", ge = Array.isArray, wt = (t) => ge(t) || typeof (t == null ? void 0 : t[Symbol.iterator]) == "function", se = `[ 	
\f\r]`, I = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Ne = /-->/g, Oe = />/g, D = RegExp(`>|${se}(?:([^\\s"'>=/]+)(${se}*=${se}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), De = /'/g, Pe = /"/g, Ve = /^(?:script|style|textarea|title)$/i, bt = (t) => (e, ...n) => ({ _$litType$: t, strings: e, values: n }), f = bt(1), R = Symbol.for("lit-noChange"), g = Symbol.for("lit-nothing"), Le = /* @__PURE__ */ new WeakMap(), P = z.createTreeWalker(z, 129);
function Ye(t, e) {
  if (!ge(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Ce !== void 0 ? Ce.createHTML(e) : e;
}
const vt = (t, e) => {
  const n = t.length - 1, s = [];
  let i, a = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", r = I;
  for (let o = 0; o < n; o++) {
    const c = t[o];
    let d, h, u = -1, l = 0;
    for (; l < c.length && (r.lastIndex = l, h = r.exec(c), h !== null); ) l = r.lastIndex, r === I ? h[1] === "!--" ? r = Ne : h[1] !== void 0 ? r = Oe : h[2] !== void 0 ? (Ve.test(h[2]) && (i = RegExp("</" + h[2], "g")), r = D) : h[3] !== void 0 && (r = D) : r === D ? h[0] === ">" ? (r = i ?? I, u = -1) : h[1] === void 0 ? u = -2 : (u = r.lastIndex - h[2].length, d = h[1], r = h[3] === void 0 ? D : h[3] === '"' ? Pe : De) : r === Pe || r === De ? r = D : r === Ne || r === Oe ? r = I : (r = D, i = void 0);
    const $ = r === D && t[o + 1].startsWith("/>") ? " " : "";
    a += r === I ? c + $t : u >= 0 ? (s.push(d), c.slice(0, u) + Ge + c.slice(u) + k + $) : c + k + (u === -2 ? o : $);
  }
  return [Ye(t, a + (t[n] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), s];
};
class V {
  constructor({ strings: e, _$litType$: n }, s) {
    let i;
    this.parts = [];
    let a = 0, r = 0;
    const o = e.length - 1, c = this.parts, [d, h] = vt(e, n);
    if (this.el = V.createElement(d, s), P.currentNode = this.el.content, n === 2 || n === 3) {
      const u = this.el.content.firstChild;
      u.replaceWith(...u.childNodes);
    }
    for (; (i = P.nextNode()) !== null && c.length < o; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const u of i.getAttributeNames()) if (u.endsWith(Ge)) {
          const l = h[r++], $ = i.getAttribute(u).split(k), x = /([.?@])?(.*)/.exec(l);
          c.push({ type: 1, index: a, name: x[2], strings: $, ctor: x[1] === "." ? At : x[1] === "?" ? St : x[1] === "@" ? Et : te }), i.removeAttribute(u);
        } else u.startsWith(k) && (c.push({ type: 6, index: a }), i.removeAttribute(u));
        if (Ve.test(i.tagName)) {
          const u = i.textContent.split(k), l = u.length - 1;
          if (l > 0) {
            i.textContent = Q ? Q.emptyScript : "";
            for (let $ = 0; $ < l; $++) i.append(u[$], G()), P.nextNode(), c.push({ type: 2, index: ++a });
            i.append(u[l], G());
          }
        }
      } else if (i.nodeType === 8) if (i.data === Ke) c.push({ type: 2, index: a });
      else {
        let u = -1;
        for (; (u = i.data.indexOf(k, u + 1)) !== -1; ) c.push({ type: 7, index: a }), u += k.length - 1;
      }
      a++;
    }
  }
  static createElement(e, n) {
    const s = z.createElement("template");
    return s.innerHTML = e, s;
  }
}
function M(t, e, n = t, s) {
  var r, o;
  if (e === R) return e;
  let i = s !== void 0 ? (r = n._$Co) == null ? void 0 : r[s] : n._$Cl;
  const a = K(e) ? void 0 : e._$litDirective$;
  return (i == null ? void 0 : i.constructor) !== a && ((o = i == null ? void 0 : i._$AO) == null || o.call(i, !1), a === void 0 ? i = void 0 : (i = new a(t), i._$AT(t, n, s)), s !== void 0 ? (n._$Co ?? (n._$Co = []))[s] = i : n._$Cl = i), i !== void 0 && (e = M(t, i._$AS(t, e.values), i, s)), e;
}
class xt {
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
    P.currentNode = i;
    let a = P.nextNode(), r = 0, o = 0, c = s[0];
    for (; c !== void 0; ) {
      if (r === c.index) {
        let d;
        c.type === 2 ? d = new q(a, a.nextSibling, this, e) : c.type === 1 ? d = new c.ctor(a, c.name, c.strings, this, e) : c.type === 6 && (d = new kt(a, this, e)), this._$AV.push(d), c = s[++o];
      }
      r !== (c == null ? void 0 : c.index) && (a = P.nextNode(), r++);
    }
    return P.currentNode = z, i;
  }
  p(e) {
    let n = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(e, s, n), n += s.strings.length - 2) : s._$AI(e[n])), n++;
  }
}
class q {
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
    e = M(this, e, n), K(e) ? e === g || e == null || e === "" ? (this._$AH !== g && this._$AR(), this._$AH = g) : e !== this._$AH && e !== R && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : wt(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== g && K(this._$AH) ? this._$AA.nextSibling.data = e : this.T(z.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var a;
    const { values: n, _$litType$: s } = e, i = typeof s == "number" ? this._$AC(e) : (s.el === void 0 && (s.el = V.createElement(Ye(s.h, s.h[0]), this.options)), s);
    if (((a = this._$AH) == null ? void 0 : a._$AD) === i) this._$AH.p(n);
    else {
      const r = new xt(i, this), o = r.u(this.options);
      r.p(n), this.T(o), this._$AH = r;
    }
  }
  _$AC(e) {
    let n = Le.get(e.strings);
    return n === void 0 && Le.set(e.strings, n = new V(e)), n;
  }
  k(e) {
    ge(this._$AH) || (this._$AH = [], this._$AR());
    const n = this._$AH;
    let s, i = 0;
    for (const a of e) i === n.length ? n.push(s = new q(this.O(G()), this.O(G()), this, this.options)) : s = n[i], s._$AI(a), i++;
    i < n.length && (this._$AR(s && s._$AB.nextSibling, i), n.length = i);
  }
  _$AR(e = this._$AA.nextSibling, n) {
    var s;
    for ((s = this._$AP) == null ? void 0 : s.call(this, !1, !0, n); e !== this._$AB; ) {
      const i = Te(e).nextSibling;
      Te(e).remove(), e = i;
    }
  }
  setConnected(e) {
    var n;
    this._$AM === void 0 && (this._$Cv = e, (n = this._$AP) == null || n.call(this, e));
  }
}
class te {
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
    if (a === void 0) e = M(this, e, n, 0), r = !K(e) || e !== this._$AH && e !== R, r && (this._$AH = e);
    else {
      const o = e;
      let c, d;
      for (e = a[0], c = 0; c < a.length - 1; c++) d = M(this, o[s + c], n, c), d === R && (d = this._$AH[c]), r || (r = !K(d) || d !== this._$AH[c]), d === g ? e = g : e !== g && (e += (d ?? "") + a[c + 1]), this._$AH[c] = d;
    }
    r && !i && this.j(e);
  }
  j(e) {
    e === g ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class At extends te {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === g ? void 0 : e;
  }
}
class St extends te {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== g);
  }
}
class Et extends te {
  constructor(e, n, s, i, a) {
    super(e, n, s, i, a), this.type = 5;
  }
  _$AI(e, n = this) {
    if ((e = M(this, e, n, 0) ?? g) === R) return;
    const s = this._$AH, i = e === g && s !== g || e.capture !== s.capture || e.once !== s.once || e.passive !== s.passive, a = e !== g && (s === g || i);
    i && this.element.removeEventListener(this.name, this, s), a && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var n;
    typeof this._$AH == "function" ? this._$AH.call(((n = this.options) == null ? void 0 : n.host) ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class kt {
  constructor(e, n, s) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = n, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    M(this, e);
  }
}
const ie = B.litHtmlPolyfillSupport;
ie == null || ie(V, q), (B.litHtmlVersions ?? (B.litHtmlVersions = [])).push("3.3.3");
const Tt = (t, e, n) => {
  const s = (n == null ? void 0 : n.renderBefore) ?? e;
  let i = s._$litPart$;
  if (i === void 0) {
    const a = (n == null ? void 0 : n.renderBefore) ?? null;
    s._$litPart$ = i = new q(e.insertBefore(G(), a), a, void 0, n ?? {});
  }
  return i._$AI(t), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const L = globalThis;
class H extends U {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Tt(n, this.renderRoot, this.renderOptions);
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
    return R;
  }
}
var Ie;
H._$litElement$ = !0, H.finalized = !0, (Ie = L.litElementHydrateSupport) == null || Ie.call(L, { LitElement: H });
const re = L.litElementPolyfillSupport;
re == null || re({ LitElement: H });
(L.litElementVersions ?? (L.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const qe = (t) => (e, n) => {
  n !== void 0 ? n.addInitializer(() => {
    customElements.define(t, e);
  }) : customElements.define(t, e);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ct = { attribute: !0, type: String, converter: J, reflect: !1, hasChanged: fe }, Nt = (t = Ct, e, n) => {
  const { kind: s, metadata: i } = n;
  let a = globalThis.litPropertyMetadata.get(i);
  if (a === void 0 && globalThis.litPropertyMetadata.set(i, a = /* @__PURE__ */ new Map()), s === "setter" && ((t = Object.create(t)).wrapped = !0), a.set(n.name, t), s === "accessor") {
    const { name: r } = n;
    return { set(o) {
      const c = e.get.call(this);
      e.set.call(this, o), this.requestUpdate(r, c, t, !0, o);
    }, init(o) {
      return o !== void 0 && this.C(r, void 0, t, o), o;
    } };
  }
  if (s === "setter") {
    const { name: r } = n;
    return function(o) {
      const c = this[r];
      e.call(this, o), this.requestUpdate(r, c, t, !0, o);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function _e(t) {
  return (e, n) => typeof n == "object" ? Nt(t, e, n) : ((s, i, a) => {
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
  return _e({ ...t, state: !0, attribute: !1 });
}
const Ot = "1.6.4", Ze = "Day Brief", Je = "day-brief-card", Qe = "day-brief-card-editor", Xe = `
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
6) An Schultagen: nutze [STUNDENPLAN] (heutige Fächer, jetzt/als Nächstes), besonders morgens
7) Solar kurz, falls Werte verfügbar
8) Müll nur wenn relevant
9) Offene Fenster bei Kälte kurz erwähnen
10) Heizöl nur wenn der Wert auffällig/niedrig wirkt
11) Staubsauger/Mäher nur wenn Handlungsbedarf (nicht idle/docked)

HAUSHALT
Nutze [HAUSHALT], [GEBURTSTAGE] und [STUNDENPLAN] nur als Faktenquelle.
Erfinde keine Personen, Tiere, Fächer oder Termine.

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
function ze(t) {
  if (!t)
    return null;
  if (typeof t == "string") {
    const e = /^\d{4}-\d{2}-\d{2}$/.test(t);
    return { iso: t, allDay: e };
  }
  return t.dateTime ? { iso: t.dateTime, allDay: !1 } : t.date ? { iso: t.date, allDay: !0 } : null;
}
function Dt(t, e) {
  var n, s, i;
  return ((s = (n = t.entities) == null ? void 0 : n[e]) == null ? void 0 : s.name) ?? (typeof ((i = t.states[e]) == null ? void 0 : i.attributes.friendly_name) == "string" ? t.states[e].attributes.friendly_name : e.replace(/^calendar\./, "").replace(/_/g, " "));
}
async function Pt(t, e, n) {
  const s = [...new Set(e.filter(Boolean))];
  if (s.length === 0)
    return { events: [], errors: [] };
  const i = [];
  let a = {};
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
    c && typeof c == "object" && (a = c);
  } catch (o) {
    return i.push(
      o instanceof Error ? o.message : "Failed to load calendar events"
    ), { events: [], errors: i };
  }
  const r = [];
  for (const o of s) {
    const c = a[o];
    if (!c) {
      i.push(`No response for ${o}`);
      continue;
    }
    if (c.error) {
      i.push(`${o}: ${c.error}`);
      continue;
    }
    const d = Dt(t, o);
    for (const h of c.events ?? []) {
      const u = ze(h.start), l = ze(h.end);
      !u || !l || r.push({
        summary: h.summary || "Busy",
        description: h.description,
        location: h.location,
        start: u.iso,
        end: l.iso,
        all_day: u.allDay || l.allDay,
        calendar_id: o,
        calendar_name: d
      });
    }
  }
  return r.sort((o, c) => o.start.localeCompare(c.start)), { events: r, errors: i };
}
function Lt(t, e, n) {
  if (t.all_day)
    return "All day";
  const s = new Date(t.start);
  return Number.isNaN(s.getTime()) ? t.start : new Intl.DateTimeFormat(e, {
    hour: "numeric",
    minute: "2-digit",
    timeZone: n
  }).format(s);
}
function zt(t, e) {
  var n, s;
  return ((s = (n = t.entities) == null ? void 0 : n[e.entity_id]) == null ? void 0 : s.name) ?? (typeof e.attributes.friendly_name == "string" ? e.attributes.friendly_name : e.entity_id);
}
function Ut(t, e) {
  if (t.formatEntityState)
    try {
      return t.formatEntityState(e);
    } catch {
    }
  const n = typeof e.attributes.unit_of_measurement == "string" ? e.attributes.unit_of_measurement : void 0;
  return n ? `${e.state} ${n}` : e.state;
}
function Ht(t, e) {
  const n = [...new Set(e.filter(Boolean))], s = [], i = [];
  for (const a of n) {
    const r = t.states[a];
    if (!r) {
      i.push(a);
      continue;
    }
    s.push({
      entity_id: a,
      name: zt(t, r),
      state: Ut(t, r),
      unit: typeof r.attributes.unit_of_measurement == "string" ? r.attributes.unit_of_measurement : void 0,
      domain: a.split(".")[0] ?? "unknown"
    });
  }
  return { entities: s, missing: i };
}
const Ue = "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA";
class Rt {
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
      return e.setAttribute("playsinline", "true"), e.loop = !0, e.volume = 0.01, e.src = Ue, e.play(), this.audio = e, this.active = !0, this.timer = window.setInterval(() => {
        this.nudge();
      }, 5e4), !0;
    } catch {
      return this.stop(), !1;
    }
  }
  nudge() {
    if (this.audio)
      try {
        this.audio.src = `${Ue}#${Date.now()}`, this.audio.currentTime = 0, this.audio.play();
      } catch {
      }
  }
  stop() {
    this.timer && (window.clearInterval(this.timer), this.timer = void 0), this.audio && (this.audio.pause(), this.audio.removeAttribute("src"), this.audio.load(), this.audio = void 0), this.active = !1;
  }
}
function Mt(t) {
  const e = /^(\d{4})-(\d{2})-(\d{2})$/.exec(t.trim());
  if (!e)
    return null;
  const n = Number(e[1]), s = Number(e[2]), i = Number(e[3]);
  return !n || s < 1 || s > 12 || i < 1 || i > 31 ? null : { year: n, month: s, day: i };
}
function Ft(t, e) {
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
function ae(t, e, n) {
  return Date.UTC(t, e - 1, n) / 864e5;
}
function jt(t, e, n, s = 14) {
  const i = Ft(e, n), a = ae(i.year, i.month, i.day), r = [];
  for (const o of t) {
    const c = Mt(o.date);
    if (!c || !o.name.trim())
      continue;
    let d = i.year, h = ae(d, c.month, c.day);
    h < a && (d += 1, h = ae(d, c.month, c.day));
    const u = h - a;
    u < 0 || u > s || r.push({
      name: o.name.trim(),
      date: `${String(c.month).padStart(2, "0")}-${String(c.day).padStart(2, "0")}`,
      daysUntil: u,
      ageTurning: d - c.year
    });
  }
  return r.sort((o, c) => o.daysUntil - c.daysUntil);
}
function It(t, e) {
  return e ? t.daysUntil === 0 ? `- ${t.name}: heute (${t.ageTurning})` : t.daysUntil === 1 ? `- ${t.name}: morgen (${t.ageTurning})` : `- ${t.name}: in ${t.daysUntil} Tagen (${t.ageTurning})` : t.daysUntil === 0 ? `- ${t.name}: today (turns ${t.ageTurning})` : t.daysUntil === 1 ? `- ${t.name}: tomorrow (turns ${t.ageTurning})` : `- ${t.name}: in ${t.daysUntil} days (turns ${t.ageTurning})`;
}
function Wt(t) {
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
    const o = ((n = r[1]) == null ? void 0 : n.trim()) ?? "", c = ((s = r[2]) == null ? void 0 : s.trim()) ?? "";
    /^\d{4}-\d{2}-\d{2}$/.test(o) ? e.push({ name: c, date: o }) : e.push({ name: o, date: c });
  }
  return e;
}
function Bt(t) {
  return t.map((e) => `${e.name}: ${e.date}`).join(`
`);
}
const Gt = {
  monday: "Montag",
  tuesday: "Dienstag",
  wednesday: "Mittwoch",
  thursday: "Donnerstag",
  friday: "Freitag",
  saturday: "Samstag",
  sunday: "Sonntag"
};
function Kt(t, e) {
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
function Vt(t, e) {
  var a, r;
  const n = new Intl.DateTimeFormat("en-GB", {
    timeZone: e,
    hour: "2-digit",
    minute: "2-digit",
    hour12: !1
  }).formatToParts(t), s = Number(((a = n.find((o) => o.type === "hour")) == null ? void 0 : a.value) ?? 0), i = Number(
    ((r = n.find((o) => o.type === "minute")) == null ? void 0 : r.value) ?? 0
  );
  return s * 60 + i;
}
function He(t) {
  const e = /^(\d{1,2}):(\d{2})$/.exec(t.trim());
  if (!e)
    return null;
  const n = Number(e[1]), s = Number(e[2]);
  return n > 23 || s > 59 ? null : n * 60 + s;
}
function Yt(t, e, n) {
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
  }).formatToParts(e), a = (c) => {
    var d;
    return Number(((d = i.find((h) => h.type === c)) == null ? void 0 : d.value) ?? 0);
  }, r = a("year") * 1e4 + a("month") * 100 + a("day"), o = Number(s[1]) * 1e4 + Number(s[2]) * 100 + Number(s[3]);
  return r >= o;
}
function qt(t, e, n) {
  const s = Kt(e, n), i = [...t[s] ?? []].sort(
    (a, r) => a.start.localeCompare(r.start)
  );
  return { weekday: s, lessons: i };
}
function Zt(t, e, n) {
  const s = Vt(e, n);
  let i, a;
  for (const r of t) {
    const o = He(r.start), c = He(r.end);
    o === null || c === null || (s >= o && s < c ? i = r : s < o && !a && (a = r));
  }
  return { current: i, next: a };
}
function Jt(t, e, n, s) {
  var a;
  const i = [];
  for (const r of t) {
    if (!((a = r.name) != null && a.trim()) || !Yt(r, e, n))
      continue;
    const { weekday: o, lessons: c } = qt(r, e, n), d = s ? Gt[o] : o;
    if (i.push(
      s ? `Person: ${r.name} · ${d}` : `Person: ${r.name} · ${d}`
    ), r.note && i.push(s ? `Hinweis: ${r.note}` : `Note: ${r.note}`), c.length === 0) {
      i.push(
        s ? "Heute kein Unterricht laut Plan." : "No lessons scheduled today."
      );
      continue;
    }
    const { current: h, next: u } = Zt(c, e, n);
    h && i.push(
      s ? `Jetzt: ${h.start}-${h.end} ${h.subject}` : `Now: ${h.start}-${h.end} ${h.subject}`
    ), u && i.push(
      s ? `Als Nächstes: ${u.start}-${u.end} ${u.subject}` : `Next: ${u.start}-${u.end} ${u.subject}`
    ), i.push(s ? "Heutiger Plan:" : "Today's schedule:");
    for (const l of c)
      i.push(`- ${l.start}-${l.end}: ${l.subject}`);
  }
  return i;
}
function Qt(t, e) {
  var a, r, o;
  const n = t.states[e];
  if (!n)
    return null;
  const s = n.attributes, i = ((r = (a = t.entities) == null ? void 0 : a[e]) == null ? void 0 : r.name) ?? (typeof s.friendly_name == "string" ? s.friendly_name : e);
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
async function Xt(t, e, n, s) {
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
function Re(t) {
  return !t || t === "unknown" || t === "unavailable" ? "Weather unavailable" : t.replace(/_/g, " ");
}
function X(t, e) {
  if (typeof t != "number" || Number.isNaN(t))
    return "—";
  const n = Number.isInteger(t) ? String(t) : t.toFixed(1);
  if (!e)
    return `${n}°`;
  const s = e.includes("°") ? e : `°${e}`;
  return `${n}${s}`;
}
function Me(t, e) {
  return t === e ? !1 : !t || !e ? !0 : t.state !== e.state || t.last_updated !== e.last_updated || t.attributes.temperature !== e.attributes.temperature || t.attributes.humidity !== e.attributes.humidity;
}
const et = /* @__PURE__ */ new Set([
  "rainy",
  "pouring",
  "snowy",
  "snowy-rainy",
  "lightning-rainy",
  "hail"
]), Y = /* @__PURE__ */ new Map(), en = {
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
function tn(t) {
  let e = 0;
  for (let n = 0; n < t.length; n += 1)
    e = (e << 5) - e + t.charCodeAt(n), e |= 0;
  return String(e);
}
function nn(t) {
  return t.toLowerCase().startsWith("de");
}
function sn(t, e) {
  const n = Number(
    new Intl.DateTimeFormat("en-GB", {
      hour: "numeric",
      hour12: !1,
      timeZone: e
    }).format(t)
  );
  return n < 5 ? "nacht" : n < 10 ? "morgen" : n < 12 ? "vormittag" : n < 17 ? "nachmittag" : n < 22 ? "abend" : "nacht";
}
function rn(t, e) {
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
function Fe(t, e) {
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
function tt(t, e) {
  return !t || t === "unknown" || t === "unavailable" ? e ? "Wetter unklar" : "Weather unavailable" : e ? en[t] ?? t.replace(/_/g, " ") : t.replace(/_/g, " ");
}
function an(t, e) {
  if (!t || typeof t.temperature != "number")
    return null;
  const n = t.temperature, s = ["rainy", "pouring", "snowy-rainy", "lightning-rainy"].includes(
    t.condition
  ), i = t.condition === "snowy";
  return e ? i ? "Winterkleidung und feste Schuhe" : n <= 3 ? s ? "dicke Jacke und Regenschutz" : "dicke Jacke" : n <= 10 ? s ? "warme Jacke und Regenschirm" : "warme Jacke" : n <= 16 ? s ? "Übergangsjacke und Schirm" : "Übergangsjacke" : n <= 22 ? s ? "leichte Jacke und Schirm" : "leichte Kleidung" : s ? "luftige Kleidung und Schirm" : "leichte sommerliche Kleidung" : i ? "winter clothes and sturdy shoes" : n <= 3 ? s ? "heavy coat and rain gear" : "heavy coat" : n <= 10 ? s ? "warm jacket and umbrella" : "warm jacket" : n <= 16 ? s ? "light jacket and umbrella" : "light jacket" : n <= 22 ? s ? "light layer and umbrella" : "light clothes" : s ? "summer clothes and umbrella" : "summer clothes";
}
function on(t) {
  const e = t.trim().toLowerCase();
  return e === "unavailable" || e === "unknown" || e === "none" || e === "nicht verfügbar" || e === "unbekannt";
}
function cn(t) {
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
function ln(t) {
  const e = t.state.trim().toLowerCase();
  return e === "on" || e === "open" || e === "opened";
}
function hn(t) {
  const e = [], n = [], s = [], i = [], a = [], r = [], o = [], c = [], d = [];
  for (const h of t) {
    if (on(h.state))
      continue;
    const u = h.entity_id.toLowerCase(), l = h.name.toLowerCase();
    h.domain === "person" || u.startsWith("person.") ? e.push(h) : u.includes("abfall") || u.includes("muell") || u.includes("mull") || u.includes("trash") || l.includes("abfall") || l.includes("müll") || l.includes("tonne") ? s.push(h) : u.includes("solar") || u.includes("solaredge") || u.includes("autark") || u.includes("produziert") || u.includes("exportiert") || u.includes("verbrauch") || u.includes("power_production") || l.includes("solar") || l.includes("autark") || l.includes("leistung") ? n.push(h) : u.includes("sun_up") || u.includes("sun_down") || l.includes("sonnenaufgang") || l.includes("sonnenuntergang") ? i.push(h) : u.includes("warn") || l.includes("warn") || l.includes("warnung") ? a.push(h) : u.includes("fenster") || u.includes("window") || l.includes("fenster") || l.includes("window") ? ln(h) && r.push(h) : u.includes("heizoel") || u.includes("heizöl") || u.includes("oil") || l.includes("heizöl") || l.includes("heizoel") ? o.push(h) : h.domain === "vacuum" || h.domain === "lawn_mower" || u.includes("vacuum") || u.includes("lawn_mower") || l.includes("mäher") || l.includes("maeh") || l.includes("sauger") ? cn(h) && c.push(h) : d.push(h);
  }
  return {
    people: e,
    solar: n,
    trash: s,
    sun: i,
    alerts: a,
    windows: r,
    heating: o,
    appliances: c,
    other: d
  };
}
function un(t, e, n, s) {
  const i = (n ?? "").toLowerCase();
  if (!(i.includes("schule") || i.includes("school") || i.includes("schultag")))
    return !1;
  const r = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    timeZone: e
  }).format(t);
  return !["Sat", "Sun"].includes(r) && (s === "morgen" || s === "vormittag");
}
function dn(t, e) {
  return t.filter((n) => {
    const s = (n.summary ?? "").toLowerCase();
    return s.includes("geburtstag") || s.includes("birthday") || s.includes("bday");
  }).slice(0, 5).map((n) => nt(n, e));
}
function nt(t, e) {
  const n = t.all_day ? e ? "ganztägig" : "all day" : t.start, s = t.calendar_name ? ` (${t.calendar_name})` : "";
  return `- ${n}: ${t.summary ?? (e ? "Belegt" : "Busy")}${s}`;
}
function S(t) {
  return `- ${t.name}: ${t.state}`;
}
function w(t, e, n) {
  return [`[${t}]`, e.length ? e.join(`
`) : n].join(`
`);
}
function st(t, e, n) {
  return t.datetime ? new Intl.DateTimeFormat(e, {
    weekday: "short",
    timeZone: n
  }).format(new Date(t.datetime)) : "?";
}
function pn(t, e, n, s, i) {
  return t.slice(0, 6).map((a) => {
    const r = st(a, n, s), o = tt(a.condition ?? "", i), c = X(
      a.temperature,
      e == null ? void 0 : e.temperature_unit
    ), d = a.condition && et.has(a.condition) ? i ? " · nass" : " · wet" : "";
    return `- ${r}: ${o}, ${c}${d}`;
  });
}
function mn(t, e, n, s) {
  const i = t.slice(0, 6).filter((r) => r.condition && et.has(r.condition));
  if (i.length === 0)
    return null;
  const a = i.map((r) => st(r, e, n)).join(", ");
  return s ? `Regen/Schnee erwartet: ${a}` : `Rain/snow expected: ${a}`;
}
function fn(t) {
  var _;
  const {
    german: e,
    dayLabel: n,
    part: s,
    weather: i,
    weatherLine: a,
    clothing: r,
    rainLine: o,
    schoolDay: c,
    birthdays: d,
    events: h,
    people: u,
    solar: l,
    trash: $,
    alerts: x,
    windows: E,
    heating: N,
    appliances: O
  } = t, m = [];
  if (e) {
    if (m.push(`${Fe(s, !0)} ${n}.`), i && m.push(
      r ? `Draußen ${a}. Empfehlung: ${r}.` : `Draußen ${a}.`
    ), o && m.push(`${o}.`), c && (s === "morgen" || s === "vormittag") && m.push("Schultag — morgens an die Schule denken."), d.length) {
      const p = d[0];
      m.push(
        p.daysUntil === 0 ? `Heute hat ${p.name} Geburtstag (${p.ageTurning})!` : `Bald Geburtstag: ${p.name} in ${p.daysUntil} Tag(en).`
      );
    }
    if (h.length === 0)
      m.push("Heute stehen keine Termine an.");
    else {
      const p = h.slice(0, 3).map((A) => A.summary).filter(Boolean).join(", ");
      m.push(
        h.length === 1 ? `Termin: ${p}.` : `${h.length} Termine, u.a. ${p}.`
      );
    }
    if (l.length && m.push(
      `Solar: ${l.slice(0, 3).map((p) => `${p.name} ${p.state}`).join(", ")}.`
    ), $.length && m.push(
      `Müll: ${$.map((p) => `${p.name} ${p.state}`).join(", ")}.`
    ), E.length && m.push(
      `Fenster offen: ${E.map((p) => p.name).join(", ")}.`
    ), N.length && m.push(
      `Heizöl: ${N.map((p) => `${p.name} ${p.state}`).join(", ")}.`
    ), O.length && m.push(
      `Geräte: ${O.map((p) => `${p.name} ${p.state}`).join(", ")}.`
    ), x.length) {
      const p = x.filter((A) => A.state !== "0" && A.state !== "ok");
      p.length && m.push(
        `Hinweis: ${p.map((A) => `${A.name} ${A.state}`).join(", ")}.`
      );
    }
    u.length && m.push(
      `Zuhause/Status: ${u.map((p) => `${p.name} ${p.state}`).join(", ")}.`
    );
  } else {
    if (m.push(`${Fe(s, !1)} ${n}.`), i && m.push(
      r ? `Outside: ${a}. Wear: ${r}.` : `Outside: ${a}.`
    ), o && m.push(`${o}.`), c && (s === "morgen" || s === "vormittag") && m.push("School day — keep the morning routine in mind."), d.length) {
      const p = d[0];
      m.push(
        p.daysUntil === 0 ? `Today is ${p.name}'s birthday (${p.ageTurning})!` : `Birthday soon: ${p.name} in ${p.daysUntil} day(s).`
      );
    }
    m.push(
      h.length === 0 ? "No meetings scheduled." : `${h.length} event(s), starting with ${((_ = h[0]) == null ? void 0 : _.summary) ?? "Busy"}.`
    ), l.length && m.push(
      `Solar: ${l.slice(0, 3).map((p) => `${p.name} ${p.state}`).join(", ")}.`
    ), $.length && m.push(
      `Trash: ${$.map((p) => `${p.name} ${p.state}`).join(", ")}.`
    ), E.length && m.push(`Open windows: ${E.map((p) => p.name).join(", ")}.`), N.length && m.push(
      `Heating oil: ${N.map((p) => `${p.name} ${p.state}`).join(", ")}.`
    ), O.length && m.push(
      `Devices needing attention: ${O.map((p) => `${p.name} ${p.state}`).join(", ")}.`
    );
  }
  return m.join(" ");
}
function gn(t) {
  const {
    weather: e,
    forecast: n = (e == null ? void 0 : e.forecast) ?? [],
    events: s,
    entities: i,
    birthdays: a = [],
    schedules: r = [],
    now: o,
    locale: c,
    timeZone: d,
    summaryPrompt: h,
    contextNotes: u
  } = t, l = nn(c), $ = sn(o, d), x = rn($, l), E = new Intl.DateTimeFormat(c, {
    weekday: "long",
    month: "long",
    day: "numeric",
    timeZone: d
  }).format(o), N = new Intl.DateTimeFormat(c, {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: d
  }).format(o), O = e ? `${tt(e.condition, l)}, ${X(
    e.temperature,
    e.temperature_unit
  )}${typeof e.humidity == "number" ? l ? `, Luftfeuchtigkeit ${e.humidity}%` : `, humidity ${e.humidity}%` : ""}` : l ? "Wetter nicht verfügbar" : "Weather unavailable", m = an(e, l), _ = hn(i), p = pn(
    n,
    e,
    c,
    d,
    l
  ), A = mn(n, c, d, l), $e = jt(a, o, d, 14), rt = [
    ...$e.map((j) => It(j, l)),
    ...dn(s, l)
  ], we = un(o, d, u, $), be = Jt(
    r,
    o,
    d,
    l
  ), at = s.length === 0 ? [] : s.slice(0, 12).map((j) => nt(j, l)), ot = (h == null ? void 0 : h.trim()) || Xe, ve = u == null ? void 0 : u.trim(), ct = [
    w(
      l ? "ZEIT" : "TIME",
      [
        l ? `Datum: ${E}` : `Date: ${E}`,
        l ? `Uhrzeit: ${N}` : `Time: ${N}`,
        l ? `Tageszeit: ${x}` : `Time of day: ${x}`
      ],
      ""
    ),
    ...ve ? [
      w(
        l ? "HAUSHALT" : "HOUSEHOLD",
        ve.split(`
`).map((j) => j.trim()).filter(Boolean),
        ""
      )
    ] : [],
    w(
      l ? "SCHULTAG" : "SCHOOL_DAY",
      [
        we || be.length ? l ? "ja — Wochentag und/oder Stundenplan vorhanden" : "yes — weekday and/or schedule present" : l ? "nein" : "no"
      ],
      ""
    ),
    w(
      l ? "STUNDENPLAN" : "SCHEDULE",
      be,
      l ? "Kein Stundenplan konfiguriert." : "No schedule configured."
    ),
    w(
      l ? "WETTER" : "WEATHER",
      [
        O,
        m ? l ? `Kleidungshinweis: ${m}` : `Clothing hint: ${m}` : "",
        A ?? ""
      ].filter(Boolean),
      l ? "Keine Wetterdaten." : "No weather data."
    ),
    w(
      l ? "VORHERSAGE" : "FORECAST",
      p,
      l ? "Keine Vorhersage." : "No forecast."
    ),
    w(
      l ? "GEBURTSTAGE" : "BIRTHDAYS",
      rt,
      l ? "Keine Geburtstage in den nächsten 14 Tagen." : "No birthdays in the next 14 days."
    ),
    w(
      l ? "TERMINE" : "AGENDA",
      at,
      l ? "Keine Termine." : "No meetings."
    ),
    w(
      l ? "PERSONEN" : "PEOPLE",
      _.people.map(S),
      l ? "Keine Personendaten." : "No people data."
    ),
    w(
      "SOLAR",
      _.solar.map(S),
      l ? "Keine Solarwerte (oder nicht verfügbar)." : "No solar data."
    ),
    w(
      l ? "MUELL" : "TRASH",
      _.trash.map(S),
      l ? "Keine Mülldaten." : "No trash data."
    ),
    w(
      l ? "SONNE" : "SUN",
      _.sun.map(S),
      l ? "Keine Sonnenzeiten." : "No sun times."
    ),
    w(
      l ? "FENSTER" : "WINDOWS",
      _.windows.map(S),
      l ? "Keine offenen Fenster." : "No open windows."
    ),
    w(
      l ? "HEIZOEL" : "HEATING_OIL",
      _.heating.map(S),
      l ? "Kein Heizöl-Sensor." : "No heating-oil sensor."
    ),
    w(
      l ? "GERAETE" : "APPLIANCES",
      _.appliances.map(S),
      l ? "Keine Geräte mit Handlungsbedarf." : "No appliances needing attention."
    ),
    w(
      l ? "WARNUNGEN" : "ALERTS",
      _.alerts.map(S),
      l ? "Keine Warnungen." : "No alerts."
    ),
    w(
      l ? "SONSTIGES" : "OTHER",
      _.other.map(S),
      l ? "Nichts weiteres." : "Nothing else."
    )
  ], xe = [
    ot,
    "",
    l ? "DATEN (nur diese Fakten verwenden; fehlende/ungültige Werte weglassen):" : "DATA (use only these facts; skip missing/invalid values):",
    ct.join(`

`),
    "",
    l ? "ANTWORT: Nur der fertige deutsche Fließtext, nichts sonst." : "RESPONSE: Only the finished brief text, nothing else."
  ].join(`
`), lt = fn({
    german: l,
    dayLabel: E,
    part: $,
    weather: e,
    weatherLine: O,
    clothing: m,
    rainLine: A,
    schoolDay: we,
    birthdays: $e,
    events: s,
    people: _.people,
    solar: _.solar,
    trash: _.trash,
    alerts: _.alerts,
    windows: _.windows,
    heating: _.heating,
    appliances: _.appliances
  });
  return {
    hash: tn(xe),
    prompt: xe,
    local: lt
  };
}
function it(t) {
  if (!t) {
    Y.clear();
    return;
  }
  Y.delete(t);
}
function _n(t, e) {
  const n = Y.get(t);
  return n ? n.hash !== e || n.expiresAt < Date.now() ? (Y.delete(t), null) : n : null;
}
function oe(t, e, n, s, i) {
  Y.set(t, {
    hash: e,
    text: n,
    source: s,
    expiresAt: Date.now() + Math.max(1, i) * 6e4
  });
}
async function yn(t, e, n) {
  var a, r, o, c, d, h;
  const s = await t.callWS({
    type: "conversation/process",
    text: n,
    language: ((a = t.locale) == null ? void 0 : a.language) ?? t.config.language ?? "en",
    agent_id: e
  });
  return ((r = s.response) == null ? void 0 : r.response_type) === "error" ? null : ((h = (d = (c = (o = s.response) == null ? void 0 : o.speech) == null ? void 0 : c.plain) == null ? void 0 : d.speech) == null ? void 0 : h.trim()) || null;
}
async function $n(t) {
  const { hass: e, mode: n, agentId: s, digest: i, cacheKey: a, cacheMinutes: r, force: o } = t;
  if (o)
    it(a);
  else {
    const c = _n(a, i.hash);
    if (c)
      return { text: c.text, source: c.source };
  }
  if (n === "local")
    return oe(a, i.hash, i.local, "local", r), { text: i.local, source: "local" };
  try {
    const c = await yn(e, s, i.prompt);
    if (c)
      return oe(a, i.hash, c, "ai", r), { text: c, source: "ai" };
  } catch {
  }
  return oe(a, i.hash, i.local, "local", r), { text: i.local, source: "local" };
}
let T = null, ee = null;
function wn() {
  if (!(typeof window > "u"))
    try {
      const t = new Audio();
      ee = t, t.play().catch(() => {
      });
    } catch {
    }
}
function de() {
  typeof window < "u" && "speechSynthesis" in window && window.speechSynthesis.cancel(), T && (T.pause(), T.removeAttribute("src"), T.load(), T = null), ee = null;
}
function bn(t) {
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
async function vn(t) {
  const e = ee ?? new Audio();
  ee = null, T = e, await new Promise((n, s) => {
    const i = () => {
      r(), n();
    }, a = () => {
      r(), s(new Error("audio element failed to load TTS stream"));
    }, r = () => {
      e.removeEventListener("playing", i), e.removeEventListener("error", a);
    };
    e.addEventListener("playing", i), e.addEventListener("error", a), e.src = t, e.play().catch(() => {
    });
  }), await new Promise((n, s) => {
    e.onended = () => n(), e.onerror = () => s(new Error("audio element failed during TTS playback"));
  }), T === e && (T = null);
}
async function xn(t) {
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
      const a = i.startsWith("http://") || i.startsWith("https://") ? (() => {
        try {
          const r = new URL(i);
          return r.pathname.startsWith("/api/tts_proxy/") ? r.pathname + r.search : i;
        } catch {
          return i;
        }
      })() : i;
      await vn(a);
    } catch (s) {
      throw new Error(bn(s));
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
    de();
    const s = new SpeechSynthesisUtterance(e);
    s.lang = n, s.rate = 1, window.speechSynthesis.speak(s);
    return;
  }
  throw new Error("No TTS available");
}
const An = Be`
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
      var(--primary-text-color) 3.5%,
      var(--ha-card-background, var(--card-background-color, #fff))
    );
    border: 1px solid
      color-mix(in srgb, var(--primary-text-color) 10%, transparent);
    box-shadow: inset 0 1px 0
      color-mix(in srgb, var(--primary-text-color) 3%, transparent);
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
    background: color-mix(in srgb, var(--primary-text-color) 8%, transparent);
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
    background: color-mix(in srgb, var(--primary-text-color) 7%, transparent);
    border: 1px solid
      color-mix(in srgb, var(--primary-text-color) 5%, transparent);
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
    max-height: 280px;
    overflow: auto;
  }

  .event {
    display: grid;
    grid-template-columns: 78px minmax(0, 1fr);
    gap: 10px;
    align-items: start;
    padding: 10px 0;
    border-top: 1px solid
      color-mix(in srgb, var(--primary-text-color) 8%, transparent);
  }

  .event:first-child {
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
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 8px;
  }

  @media (max-width: 700px) {
    .camera-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  .camera-tile {
    position: relative;
    display: block;
    margin: 0;
    padding: 0;
    border: none;
    border-radius: 10px;
    overflow: hidden;
    background: color-mix(in srgb, var(--primary-text-color) 8%, transparent);
    cursor: pointer;
    aspect-ratio: 16 / 9;
    max-height: 110px;
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
    font-size: 0.8rem;
    color: var(--secondary-text-color);
  }

  .camera-label {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 6px 8px 4px;
    font-size: 0.7rem;
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
    border: 1px solid color-mix(in srgb, var(--primary-text-color) 12%, transparent);
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
var Sn = Object.defineProperty, En = Object.getOwnPropertyDescriptor, b = (t, e, n, s) => {
  for (var i = s > 1 ? void 0 : s ? En(e, n) : e, a = t.length - 1, r; a >= 0; a--)
    (r = t[a]) && (i = (s ? r(e, n, i) : r(i)) || i);
  return s && i && Sn(e, n, i), i;
};
const ce = "daily", le = 24, je = 15, he = "auto", kn = 15 * 6e4;
let y = class extends H {
  constructor() {
    super(...arguments), this._weather = null, this._forecast = [], this._events = [], this._entities = [], this._summary = "", this._summarySource = "loading", this._errors = [], this._loadingEvents = !1, this._refreshing = !1, this._contextOpen = !1, this._now = /* @__PURE__ */ new Date(), this._speaking = !1, this._keepAwakeOn = !1, this._fetchGeneration = 0, this._keepAwake = new Rt(), this._onVisibility = () => {
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
    return await Promise.resolve().then(() => Pn), document.createElement(Qe);
  }
  setConfig(t) {
    if (!t)
      throw new Error("Invalid configuration");
    this._config = {
      forecast_type: ce,
      horizon_hours: le,
      summary_mode: he,
      cache_minutes: je,
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
    super.disconnectedCallback(), this._stopRefreshLoop(), this._stopClock(), this._teardownForecast(), this._keepAwake.stop(), this._keepAwakeOn = !1, de(), document.removeEventListener("visibilitychange", this._onVisibility);
  }
  updated(t) {
    !this._config || !this.hass || ((t.has("hass") || t.has("_config")) && (this._syncWeatherFromHass(), this._syncEntitiesFromHass(), this._ensureForecastSubscription()), t.has("_config") && this.isConnected && this._refreshData(!0));
  }
  shouldUpdate(t) {
    var e, n, s, i, a, r, o, c;
    if (t.has("_config") || t.has("_weather") || t.has("_forecast") || t.has("_entities") || t.has("_events") || t.has("_summary") || t.has("_summarySource") || t.has("_errors") || t.has("_loadingEvents") || t.has("_refreshing") || t.has("_contextOpen") || t.has("_now") || t.has("_speaking") || t.has("_keepAwakeOn"))
      return !0;
    if (t.has("hass")) {
      const d = t.get("hass");
      if ((e = this._config) != null && e.weather_entity && Me(
        (n = d == null ? void 0 : d.states) == null ? void 0 : n[this._config.weather_entity],
        (i = (s = this.hass) == null ? void 0 : s.states) == null ? void 0 : i[this._config.weather_entity]
      ))
        return !0;
      for (const h of ((a = this._config) == null ? void 0 : a.entities) ?? [])
        if (Me((r = d == null ? void 0 : d.states) == null ? void 0 : r[h], (c = (o = this.hass) == null ? void 0 : o.states) == null ? void 0 : c[h]))
          return !0;
    }
    return !1;
  }
  _startRefreshLoop() {
    this._stopRefreshLoop(), this._refreshData(!0), this._refreshTimer = window.setInterval(() => {
      this._refreshData(!1);
    }, kn);
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
      this._config.summary_mode ?? he,
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
    const e = Qt(this.hass, t);
    if (!e) {
      this._weather = null, this._pushError(`Weather entity not found: ${t}`);
      return;
    }
    this._weather = { ...e, forecast: this._forecast };
  }
  _syncEntitiesFromHass() {
    const { entities: t, missing: e } = Ht(
      this.hass,
      this._config.entities ?? []
    );
    this._entities = t;
    for (const n of e)
      this._pushError(`Entity not found: ${n}`);
  }
  async _ensureForecastSubscription() {
    const t = this._config.weather_entity, e = this._config.forecast_type ?? ce;
    if (!(this._unsubForecast && this._lastWeatherEntity === t && this._lastForecastType === e)) {
      if (this._teardownForecast(), this._lastWeatherEntity = t, this._lastForecastType = e, !t || e === "none" || !this.hass) {
        this._forecast = [];
        return;
      }
      try {
        this._unsubForecast = await Xt(
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
      this._refreshing = !0, it(this._cacheKey());
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
        de(), this._speaking = !1;
        return;
      }
      wn(), this._speaking = !0;
      try {
        await xn({
          hass: this.hass,
          text: this._summary,
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
    const i = this._config.calendars ?? [], a = this._config.horizon_hours ?? le, { events: r, errors: o } = await Pt(
      this.hass,
      i,
      a
    );
    if (n === this._fetchGeneration) {
      this._events = r, s.push(...o), this._loadingEvents = !1, this._config.weather_entity ? this.hass.states[this._config.weather_entity] || s.push(`Weather entity not found: ${this._config.weather_entity}`) : s.push("No weather_entity configured");
      for (const c of this._config.entities ?? [])
        this.hass.states[c] || s.push(`Entity not found: ${c}`);
      this._errors = [...new Set(s)].slice(-6), await this._refreshSummary(t, e);
    }
  }
  async _refreshSummary(t, e = !1) {
    var c;
    if (!this.hass || !this._config)
      return;
    const n = this._config.summary_mode ?? he, s = this._config.cache_minutes ?? je, i = ((c = this.hass.locale) == null ? void 0 : c.language) ?? "en", a = this.hass.config.time_zone, r = gn({
      weather: this._weather,
      forecast: this._forecast,
      events: this._events,
      entities: this._entities,
      birthdays: this._config.birthdays,
      schedules: this._config.schedules,
      now: /* @__PURE__ */ new Date(),
      locale: i,
      timeZone: a,
      summaryPrompt: this._config.summary_prompt,
      contextNotes: this._config.context_notes
    }), o = this._cacheKey();
    (t || e || !this._summary || this._summarySource === "loading") && (this._summarySource = "loading");
    try {
      const d = await $n({
        hass: this.hass,
        mode: n,
        agentId: this._config.agent_id,
        digest: r,
        cacheKey: o,
        cacheMinutes: s,
        force: e
      });
      this._summary = d.text, this._summarySource = d.source;
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
    const e = ((a = this.hass.locale) == null ? void 0 : a.language) ?? "en", n = this.hass.config.time_zone, s = this._config.forecast_type ?? ce, i = new Date(t.datetime);
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

        <p
          class="brief ${this._summarySource === "loading" || this._refreshing ? "loading" : ""}"
        >
          ${this._summarySource === "loading" && !this._summary ? "Preparing your day brief…" : this._summary}
        </p>

        <div class="split">
          <section class="panel">
            <h3 class="section-title">Weather</h3>
            ${n ? f`
                  <div class="weather-hero">
                    <div>
                      <p class="condition">
                        ${Re(n.condition)}
                      </p>
                      <p class="weather-place">
                        ${n.friendly_name ?? n.entity_id}
                      </p>
                    </div>
                    <p class="temp">
                      ${X(
      n.temperature,
      n.temperature_unit
    )}
                    </p>
                  </div>
                  ${typeof n.humidity == "number" || typeof n.wind_speed == "number" ? f`
                        <div class="chips">
                          ${typeof n.humidity == "number" ? f`<span class="chip"
                                >${n.humidity}% humidity</span
                              >` : g}
                          ${typeof n.wind_speed == "number" ? f`<span class="chip"
                                >${n.wind_speed}
                                ${n.wind_speed_unit ?? ""}</span
                              >` : g}
                        </div>
                      ` : g}
                  ${this._forecast.length ? f`
                        <div class="forecast">
                          ${this._forecast.map(
      (r) => f`
                              <div class="forecast-item">
                                <span class="forecast-day"
                                  >${this._forecastLabel(r)}</span
                                >
                                <span class="forecast-temp"
                                  >${X(
        r.temperature,
        n.temperature_unit
      )}</span
                                >
                                <span class="forecast-cond"
                                  >${Re(
        r.condition ?? ""
      )}</span
                                >
                              </div>
                            `
    )}
                        </div>
                      ` : g}
                ` : f`<p class="empty">Configure a weather entity to begin.</p>`}
          </section>

          <section class="panel">
            <h3 class="section-title">Calendar</h3>
            ${this._loadingEvents && this._events.length === 0 ? f`<p class="empty loading">Loading calendars…</p>` : this._events.length === 0 ? f`<p class="empty">
                    Nothing in the next
                    ${this._config.horizon_hours ?? le} hours.
                  </p>` : f`
                    <ul class="events">
                      ${this._events.map(
      (r) => f`
                          <li class="event">
                            <span class="event-time"
                              >${Lt(
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
        </div>

        ${(this._config.cameras ?? []).length ? f`
              <section class="cameras">
                <h3 class="section-title">Cameras</h3>
                <div class="camera-grid">
                  ${(this._config.cameras ?? []).map((r) => {
      const o = this._cameraSrc(r);
      return f`
                      <button
                        class="camera-tile"
                        type="button"
                        @click=${() => this._openMoreInfo(r)}
                      >
                        ${o ? f`<img
                              class="camera-feed"
                              src=${o}
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

        ${this._errors.length ? f`
              <div class="errors">
                ${this._errors.map(
      (r) => f`<span class="error-chip">${r}</span>`
    )}
              </div>
            ` : g}

        ${this._config.keep_awake !== !1 ? f`
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
            ` : g}
      </ha-card>
    `;
  }
};
y.styles = An;
b([
  _e({ attribute: !1 })
], y.prototype, "hass", 2);
b([
  v()
], y.prototype, "_config", 2);
b([
  v()
], y.prototype, "_weather", 2);
b([
  v()
], y.prototype, "_forecast", 2);
b([
  v()
], y.prototype, "_events", 2);
b([
  v()
], y.prototype, "_entities", 2);
b([
  v()
], y.prototype, "_summary", 2);
b([
  v()
], y.prototype, "_summarySource", 2);
b([
  v()
], y.prototype, "_errors", 2);
b([
  v()
], y.prototype, "_loadingEvents", 2);
b([
  v()
], y.prototype, "_refreshing", 2);
b([
  v()
], y.prototype, "_contextOpen", 2);
b([
  v()
], y.prototype, "_now", 2);
b([
  v()
], y.prototype, "_speaking", 2);
b([
  v()
], y.prototype, "_keepAwakeOn", 2);
y = b([
  qe(Je)
], y);
window.customCards = window.customCards || [];
window.customCards.push({
  type: Je,
  name: Ze,
  description: "AI-first day brief with weather, calendars, extra entities, and a short narrative.",
  preview: !0,
  documentationURL: "https://github.com/jenskock/lovelace-day-brief"
});
console.info(
  `%c ${Ze} %c ${Ot} `,
  "color:#fff;background:#03a9f4;font-weight:700",
  "color:#03a9f4;background:transparent;font-weight:700"
);
var Tn = Object.defineProperty, Cn = Object.getOwnPropertyDescriptor, ye = (t, e, n, s) => {
  for (var i = s > 1 ? void 0 : s ? Cn(e, n) : e, a = t.length - 1, r; a >= 0; a--)
    (r = t[a]) && (i = (s ? r(e, n, i) : r(i)) || i);
  return s && i && Tn(e, n, i), i;
};
const Nn = [
  "daily",
  "hourly",
  "twice_daily",
  "none"
], On = ["auto", "ai", "local"];
function Dn(t, e) {
  t.dispatchEvent(
    new CustomEvent("config-changed", {
      detail: { config: e },
      bubbles: !0,
      composed: !0
    })
  );
}
function ue(t) {
  return [
    ...new Set(
      t.split(/[\n,]/).map((e) => e.trim()).filter(Boolean)
    )
  ];
}
let F = class extends H {
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
    this._config = e, Dn(this, e);
  }
  _value(t) {
    return t.target.value;
  }
  _onWeather(t) {
    this._update({ weather_entity: this._value(t) || void 0 });
  }
  _onCalendars(t) {
    this._update({ calendars: ue(this._value(t)) });
  }
  _onEntities(t) {
    this._update({ entities: ue(this._value(t)) });
  }
  _onCameras(t) {
    this._update({ cameras: ue(this._value(t)) });
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
    const e = Wt(this._value(t));
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
            ${Nn.map(
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
            ${On.map(
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
            .value=${Bt(this._config.birthdays ?? [])}
            @change=${this._onBirthdays}
          ></textarea>
          <span class="hint">One per line: Name: YYYY-MM-DD</span>
        </label>

        <label>
          System prompt
          <textarea
            rows="5"
            placeholder=${Xe}
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
F.styles = Be`
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
ye([
  _e({ attribute: !1 })
], F.prototype, "hass", 2);
ye([
  v()
], F.prototype, "_config", 2);
F = ye([
  qe(Qe)
], F);
const Pn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get DayBriefCardEditor() {
    return F;
  }
}, Symbol.toStringTag, { value: "Module" }));
export {
  y as DayBriefCard
};
//# sourceMappingURL=day-brief.js.map
