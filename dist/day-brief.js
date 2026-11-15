/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const te = globalThis, ve = te.ShadowRoot && (te.ShadyCSS === void 0 || te.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, xe = Symbol(), Oe = /* @__PURE__ */ new WeakMap();
let Qe = class {
  constructor(e, n, i) {
    if (this._$cssResult$ = !0, i !== xe) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = n;
  }
  get styleSheet() {
    let e = this.o;
    const n = this.t;
    if (ve && e === void 0) {
      const i = n !== void 0 && n.length === 1;
      i && (e = Oe.get(n)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), i && Oe.set(n, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const At = (t) => new Qe(typeof t == "string" ? t : t + "", void 0, xe), Xe = (t, ...e) => {
  const n = t.length === 1 ? t[0] : e.reduce((i, s, a) => i + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + t[a + 1], t[0]);
  return new Qe(n, t, xe);
}, St = (t, e) => {
  if (ve) t.adoptedStyleSheets = e.map((n) => n instanceof CSSStyleSheet ? n : n.styleSheet);
  else for (const n of e) {
    const i = document.createElement("style"), s = te.litNonce;
    s !== void 0 && i.setAttribute("nonce", s), i.textContent = n.cssText, t.appendChild(i);
  }
}, De = ve ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let n = "";
  for (const i of e.cssRules) n += i.cssText;
  return At(n);
})(t) : t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: kt, defineProperty: Et, getOwnPropertyDescriptor: Tt, getOwnPropertyNames: Nt, getOwnPropertySymbols: Ct, getPrototypeOf: Ot } = Object, U = globalThis, Le = U.trustedTypes, Dt = Le ? Le.emptyScript : "", le = U.reactiveElementPolyfillSupport, Y = (t, e) => t, ne = { toAttribute(t, e) {
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
} }, Ae = (t, e) => !kt(t, e), Ue = { attribute: !0, type: String, converter: ne, reflect: !1, useDefault: !1, hasChanged: Ae };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), U.litPropertyMetadata ?? (U.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let M = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, n = Ue) {
    if (n.state && (n.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((n = Object.create(n)).wrapped = !0), this.elementProperties.set(e, n), !n.noAccessor) {
      const i = Symbol(), s = this.getPropertyDescriptor(e, i, n);
      s !== void 0 && Et(this.prototype, e, s);
    }
  }
  static getPropertyDescriptor(e, n, i) {
    const { get: s, set: a } = Tt(this.prototype, e) ?? { get() {
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
    return this.elementProperties.get(e) ?? Ue;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Y("elementProperties"))) return;
    const e = Ot(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Y("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Y("properties"))) {
      const n = this.properties, i = [...Nt(n), ...Ct(n)];
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
      const r = (((a = i.converter) == null ? void 0 : a.toAttribute) !== void 0 ? i.converter : ne).toAttribute(n, i.type);
      this._$Em = e, r == null ? this.removeAttribute(s) : this.setAttribute(s, r), this._$Em = null;
    }
  }
  _$AK(e, n) {
    var a, r;
    const i = this.constructor, s = i._$Eh.get(e);
    if (s !== void 0 && this._$Em !== s) {
      const o = i.getPropertyOptions(s), c = typeof o.converter == "function" ? { fromAttribute: o.converter } : ((a = o.converter) == null ? void 0 : a.fromAttribute) !== void 0 ? o.converter : ne;
      this._$Em = s;
      const h = c.fromAttribute(n, o.type);
      this[s] = h ?? ((r = this._$Ej) == null ? void 0 : r.get(s)) ?? h, this._$Em = null;
    }
  }
  requestUpdate(e, n, i, s = !1, a) {
    var r;
    if (e !== void 0) {
      const o = this.constructor;
      if (s === !1 && (a = this[e]), i ?? (i = o.getPropertyOptions(e)), !((i.hasChanged ?? Ae)(a, n) || i.useDefault && i.reflect && a === ((r = this._$Ej) == null ? void 0 : r.get(e)) && !this.hasAttribute(o._$Eu(e, i)))) return;
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
M.elementStyles = [], M.shadowRootOptions = { mode: "open" }, M[Y("elementProperties")] = /* @__PURE__ */ new Map(), M[Y("finalized")] = /* @__PURE__ */ new Map(), le == null || le({ ReactiveElement: M }), (U.reactiveElementVersions ?? (U.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const J = globalThis, He = (t) => t, ie = J.trustedTypes, Pe = ie ? ie.createPolicy("lit-html", { createHTML: (t) => t }) : void 0, et = "$lit$", D = `lit$${Math.random().toFixed(9).slice(2)}$`, tt = "?" + D, Lt = `<${tt}>`, z = document, Z = () => z.createComment(""), q = (t) => t === null || typeof t != "object" && typeof t != "function", Se = Array.isArray, Ut = (t) => Se(t) || typeof (t == null ? void 0 : t[Symbol.iterator]) == "function", he = `[ 	
\f\r]`, V = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Re = /-->/g, ze = />/g, H = RegExp(`>|${he}(?:([^\\s"'>=/]+)(${he}*=${he}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Me = /'/g, Ie = /"/g, nt = /^(?:script|style|textarea|title)$/i, Ht = (t) => (e, ...n) => ({ _$litType$: t, strings: e, values: n }), m = Ht(1), W = Symbol.for("lit-noChange"), f = Symbol.for("lit-nothing"), We = /* @__PURE__ */ new WeakMap(), P = z.createTreeWalker(z, 129);
function it(t, e) {
  if (!Se(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Pe !== void 0 ? Pe.createHTML(e) : e;
}
const Pt = (t, e) => {
  const n = t.length - 1, i = [];
  let s, a = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", r = V;
  for (let o = 0; o < n; o++) {
    const c = t[o];
    let h, d, u = -1, l = 0;
    for (; l < c.length && (r.lastIndex = l, d = r.exec(c), d !== null); ) l = r.lastIndex, r === V ? d[1] === "!--" ? r = Re : d[1] !== void 0 ? r = ze : d[2] !== void 0 ? (nt.test(d[2]) && (s = RegExp("</" + d[2], "g")), r = H) : d[3] !== void 0 && (r = H) : r === H ? d[0] === ">" ? (r = s ?? V, u = -1) : d[1] === void 0 ? u = -2 : (u = r.lastIndex - d[2].length, h = d[1], r = d[3] === void 0 ? H : d[3] === '"' ? Ie : Me) : r === Ie || r === Me ? r = H : r === Re || r === ze ? r = V : (r = H, s = void 0);
    const g = r === H && t[o + 1].startsWith("/>") ? " " : "";
    a += r === V ? c + Lt : u >= 0 ? (i.push(h), c.slice(0, u) + et + c.slice(u) + D + g) : c + D + (u === -2 ? o : g);
  }
  return [it(t, a + (t[n] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), i];
};
class Q {
  constructor({ strings: e, _$litType$: n }, i) {
    let s;
    this.parts = [];
    let a = 0, r = 0;
    const o = e.length - 1, c = this.parts, [h, d] = Pt(e, n);
    if (this.el = Q.createElement(h, i), P.currentNode = this.el.content, n === 2 || n === 3) {
      const u = this.el.content.firstChild;
      u.replaceWith(...u.childNodes);
    }
    for (; (s = P.nextNode()) !== null && c.length < o; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const u of s.getAttributeNames()) if (u.endsWith(et)) {
          const l = d[r++], g = s.getAttribute(u).split(D), _ = /([.?@])?(.*)/.exec(l);
          c.push({ type: 1, index: a, name: _[2], strings: g, ctor: _[1] === "." ? zt : _[1] === "?" ? Mt : _[1] === "@" ? It : ce }), s.removeAttribute(u);
        } else u.startsWith(D) && (c.push({ type: 6, index: a }), s.removeAttribute(u));
        if (nt.test(s.tagName)) {
          const u = s.textContent.split(D), l = u.length - 1;
          if (l > 0) {
            s.textContent = ie ? ie.emptyScript : "";
            for (let g = 0; g < l; g++) s.append(u[g], Z()), P.nextNode(), c.push({ type: 2, index: ++a });
            s.append(u[l], Z());
          }
        }
      } else if (s.nodeType === 8) if (s.data === tt) c.push({ type: 2, index: a });
      else {
        let u = -1;
        for (; (u = s.data.indexOf(D, u + 1)) !== -1; ) c.push({ type: 7, index: a }), u += D.length - 1;
      }
      a++;
    }
  }
  static createElement(e, n) {
    const i = z.createElement("template");
    return i.innerHTML = e, i;
  }
}
function F(t, e, n = t, i) {
  var r, o;
  if (e === W) return e;
  let s = i !== void 0 ? (r = n._$Co) == null ? void 0 : r[i] : n._$Cl;
  const a = q(e) ? void 0 : e._$litDirective$;
  return (s == null ? void 0 : s.constructor) !== a && ((o = s == null ? void 0 : s._$AO) == null || o.call(s, !1), a === void 0 ? s = void 0 : (s = new a(t), s._$AT(t, n, i)), i !== void 0 ? (n._$Co ?? (n._$Co = []))[i] = s : n._$Cl = s), s !== void 0 && (e = F(t, s._$AS(t, e.values), s, i)), e;
}
class Rt {
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
    const { el: { content: n }, parts: i } = this._$AD, s = ((e == null ? void 0 : e.creationScope) ?? z).importNode(n, !0);
    P.currentNode = s;
    let a = P.nextNode(), r = 0, o = 0, c = i[0];
    for (; c !== void 0; ) {
      if (r === c.index) {
        let h;
        c.type === 2 ? h = new ee(a, a.nextSibling, this, e) : c.type === 1 ? h = new c.ctor(a, c.name, c.strings, this, e) : c.type === 6 && (h = new Wt(a, this, e)), this._$AV.push(h), c = i[++o];
      }
      r !== (c == null ? void 0 : c.index) && (a = P.nextNode(), r++);
    }
    return P.currentNode = z, s;
  }
  p(e) {
    let n = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(e, i, n), n += i.strings.length - 2) : i._$AI(e[n])), n++;
  }
}
class ee {
  get _$AU() {
    var e;
    return ((e = this._$AM) == null ? void 0 : e._$AU) ?? this._$Cv;
  }
  constructor(e, n, i, s) {
    this.type = 2, this._$AH = f, this._$AN = void 0, this._$AA = e, this._$AB = n, this._$AM = i, this.options = s, this._$Cv = (s == null ? void 0 : s.isConnected) ?? !0;
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
    e = F(this, e, n), q(e) ? e === f || e == null || e === "" ? (this._$AH !== f && this._$AR(), this._$AH = f) : e !== this._$AH && e !== W && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : Ut(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== f && q(this._$AH) ? this._$AA.nextSibling.data = e : this.T(z.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var a;
    const { values: n, _$litType$: i } = e, s = typeof i == "number" ? this._$AC(e) : (i.el === void 0 && (i.el = Q.createElement(it(i.h, i.h[0]), this.options)), i);
    if (((a = this._$AH) == null ? void 0 : a._$AD) === s) this._$AH.p(n);
    else {
      const r = new Rt(s, this), o = r.u(this.options);
      r.p(n), this.T(o), this._$AH = r;
    }
  }
  _$AC(e) {
    let n = We.get(e.strings);
    return n === void 0 && We.set(e.strings, n = new Q(e)), n;
  }
  k(e) {
    Se(this._$AH) || (this._$AH = [], this._$AR());
    const n = this._$AH;
    let i, s = 0;
    for (const a of e) s === n.length ? n.push(i = new ee(this.O(Z()), this.O(Z()), this, this.options)) : i = n[s], i._$AI(a), s++;
    s < n.length && (this._$AR(i && i._$AB.nextSibling, s), n.length = s);
  }
  _$AR(e = this._$AA.nextSibling, n) {
    var i;
    for ((i = this._$AP) == null ? void 0 : i.call(this, !1, !0, n); e !== this._$AB; ) {
      const s = He(e).nextSibling;
      He(e).remove(), e = s;
    }
  }
  setConnected(e) {
    var n;
    this._$AM === void 0 && (this._$Cv = e, (n = this._$AP) == null || n.call(this, e));
  }
}
class ce {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, n, i, s, a) {
    this.type = 1, this._$AH = f, this._$AN = void 0, this.element = e, this.name = n, this._$AM = s, this.options = a, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = f;
  }
  _$AI(e, n = this, i, s) {
    const a = this.strings;
    let r = !1;
    if (a === void 0) e = F(this, e, n, 0), r = !q(e) || e !== this._$AH && e !== W, r && (this._$AH = e);
    else {
      const o = e;
      let c, h;
      for (e = a[0], c = 0; c < a.length - 1; c++) h = F(this, o[i + c], n, c), h === W && (h = this._$AH[c]), r || (r = !q(h) || h !== this._$AH[c]), h === f ? e = f : e !== f && (e += (h ?? "") + a[c + 1]), this._$AH[c] = h;
    }
    r && !s && this.j(e);
  }
  j(e) {
    e === f ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class zt extends ce {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === f ? void 0 : e;
  }
}
class Mt extends ce {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== f);
  }
}
class It extends ce {
  constructor(e, n, i, s, a) {
    super(e, n, i, s, a), this.type = 5;
  }
  _$AI(e, n = this) {
    if ((e = F(this, e, n, 0) ?? f) === W) return;
    const i = this._$AH, s = e === f && i !== f || e.capture !== i.capture || e.once !== i.once || e.passive !== i.passive, a = e !== f && (i === f || s);
    s && this.element.removeEventListener(this.name, this, i), a && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var n;
    typeof this._$AH == "function" ? this._$AH.call(((n = this.options) == null ? void 0 : n.host) ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class Wt {
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
const ue = J.litHtmlPolyfillSupport;
ue == null || ue(Q, ee), (J.litHtmlVersions ?? (J.litHtmlVersions = [])).push("3.3.3");
const Ft = (t, e, n) => {
  const i = (n == null ? void 0 : n.renderBefore) ?? e;
  let s = i._$litPart$;
  if (s === void 0) {
    const a = (n == null ? void 0 : n.renderBefore) ?? null;
    i._$litPart$ = s = new ee(e.insertBefore(Z(), a), a, void 0, n ?? {});
  }
  return s._$AI(t), s;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const R = globalThis;
class I extends M {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Ft(n, this.renderRoot, this.renderOptions);
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
var qe;
I._$litElement$ = !0, I.finalized = !0, (qe = R.litElementHydrateSupport) == null || qe.call(R, { LitElement: I });
const de = R.litElementPolyfillSupport;
de == null || de({ LitElement: I });
(R.litElementVersions ?? (R.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const st = (t) => (e, n) => {
  n !== void 0 ? n.addInitializer(() => {
    customElements.define(t, e);
  }) : customElements.define(t, e);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const jt = { attribute: !0, type: String, converter: ne, reflect: !1, hasChanged: Ae }, Bt = (t = jt, e, n) => {
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
function ke(t) {
  return (e, n) => typeof n == "object" ? Bt(t, e, n) : ((i, s, a) => {
    const r = s.hasOwnProperty(a);
    return s.constructor.createProperty(a, i), r ? Object.getOwnPropertyDescriptor(s, a) : void 0;
  })(t, e, n);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function A(t) {
  return ke({ ...t, state: !0, attribute: !1 });
}
const Kt = "1.7.6", rt = "Day Brief", at = "day-brief-card", ot = "day-brief-card-editor", ct = `
Du bist ein Home-Dashboard-Redakteur für eine Familien-Tageskarte.

ZIEL
Schreibe 3 bis 6 kurze Sätze auf Deutsch als natürlichen Tagesbrief.
Keine Aufzählungen, kein Schema-Geplapper. Variiere Aufbau und Einstieg — nicht jeden Tag dieselbe Reihenfolge.

ABLAUF (variabel, nicht starr)
- Beginne mit einer Begrüßung passend zur Tageszeit — aber nicht immer mit Wetter/Kleidung danach.
- Wähle die Reihenfolge nach dem, was JETZT am wichtigsten ist (Tageszeit + Daten).
- Wetter und Kleidung gehören oft rein, müssen aber nicht Satz 1 sein und nicht jeden Brief dominieren.
- Wenn wenig los ist: kürzer bleiben. Wenn viel relevant ist: bis zu 6 Sätze, weiterhin knapp.
- Schließe warm ab (Familie / Haustier aus [HAUSHALT] höchstens einmal kurz) — der Abschluss darf auch mitten im Brief stehen, wenn der Schluss lieber eine Aktion ist.

PRIORITÄT DER INHALTE (was rein muss, nicht in welcher Satznummer)
1) Müll-Aktion (siehe unten) — wenn relevant, MUSS vorkommen und darf früh stehen
2) Heutige Termine aus [TERMINE]
3) Schule nur nach SCHULE-Regeln
4) Geburtstage in den nächsten 14 Tagen
5) Wetter jetzt (+ Kleidung wenn sinnvoll); nasses Morgenwetter nur wenn nass/schneit
6) Offene Fenster bei Kälte, Geräte bei Handlungsbedarf, Solar/Heizöl nur wenn auffällig

SCHULE — KRITISCH
- Schule gilt NUR für Personen aus [STUNDENPLAN] (Namen dort). Nie für Erwachsene oder Kalendernamen.
- [SCHULTAG]=nein oder „Heute kein Unterricht“ → HEUTE keine Schule erwähnen.
- Am Wochenende: keine Schule für heute. Nächsten Schultag nur nennen, wenn [STUNDENPLAN] ihn explizit nennt — mit dem richtigen Namen.
- Kalender-Titel wie „Schule bis …“ sind NUR Termintitel. Den Kalendernamen NICHT als Schüler/in verwenden.

MÜLL — HÖCHSTE PRIORITÄT
- Lies [MUELL] und [MUELL-AKTION] genau.
- Abholung MORGEN („in 1 Tag“ / days=1): Du MUSST heute zum Rausstellen auffordern (abends besonders klar).
- Abholung HEUTE (days=0): Tonne(n) müssen draußen sein / schon raus sollten.
- Nenne die konkreten Tonnen aus den Daten (Restmüll, Bio, Papier, Wertstoff …).
- Die Müll-Aktion MUSS fett markiert sein (ASCII-Sterne, keine Leerzeichen innen), z.B. **Bio heute Abend rausstellen**
- Müll ohne baldige Abholung (ab 2+ Tagen) weglassen.

MARKDOWN (PFLICHT wenn Aktion/Warnung)
- Nur **fett** mit doppelten Asterisken: **so**.
- Fett NUR für: Müll-Aktion, kritische Warnung, Geburtstag heute.
- VERBOTEN: __Unterstriche__, *einfache Sterne*, HTML-Tags, Links, Listen, Überschriften, Code.

Fakten nur aus den Datenblöcken. Keine erfundenen Personen, Tiere, Fächer oder Termine.

VERBOTEN
- Englisch
- Tools, Geräte steuern, Rückfragen
- Entity-IDs oder „Nicht verfügbar“
- Bulletpoints oder lange Aufzählungen
- Jeden Brief identisch aufbauen (Wetter → Kleidung → Termine → Schluss)
- Erwachsene zur Schule schicken
- Am Wochenende behaupten, heute sei Schultag

STIL
Warm, ruhig, praktisch — wie eine lebendige Notiz an die Familie, nicht wie ein Formular.
`.trim();
function Fe(t) {
  if (!t)
    return null;
  if (typeof t == "string") {
    const e = /^\d{4}-\d{2}-\d{2}$/.test(t);
    return { iso: t, allDay: e };
  }
  return t.dateTime ? { iso: t.dateTime, allDay: !1 } : t.date ? { iso: t.date, allDay: !0 } : null;
}
function Gt(t, e) {
  var n, i, s;
  return ((i = (n = t.entities) == null ? void 0 : n[e]) == null ? void 0 : i.name) ?? (typeof ((s = t.states[e]) == null ? void 0 : s.attributes.friendly_name) == "string" ? t.states[e].attributes.friendly_name : e.replace(/^calendar\./, "").replace(/_/g, " "));
}
async function Vt(t, e, n) {
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
    const h = Gt(t, o);
    for (const d of c.events ?? []) {
      const u = Fe(d.start), l = Fe(d.end);
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
function se(t, e) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: e,
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(t);
}
function lt(t, e) {
  if (t.all_day) {
    const i = /^(\d{4}-\d{2}-\d{2})/.exec(t.start);
    if (i)
      return i[1];
  }
  const n = new Date(t.start);
  return Number.isNaN(n.getTime()) ? t.start.slice(0, 10) : se(n, e);
}
function Yt(t, e, n) {
  const i = se(e, n);
  return t.filter((s) => lt(s, n) === i);
}
function Jt(t, e, n, i) {
  const s = se(i, n), a = new Date(i.getTime() + 2160 * 60 * 1e3), r = se(a, n);
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
function Zt(t, e, n, i) {
  const s = /* @__PURE__ */ new Map();
  for (const a of t) {
    const r = lt(a, n), o = s.get(r);
    o ? o.push(a) : s.set(r, [a]);
  }
  return [...s.entries()].sort(([a], [r]) => a.localeCompare(r)).map(([a, r]) => ({
    key: a,
    label: Jt(a, e, n, i),
    events: r
  }));
}
function qt(t, e, n) {
  if (t.all_day)
    return e.toLowerCase().startsWith("de") ? "Ganztägig" : "All day";
  const i = new Date(t.start);
  return Number.isNaN(i.getTime()) ? t.start : new Intl.DateTimeFormat(e, {
    hour: "numeric",
    minute: "2-digit",
    timeZone: n
  }).format(i);
}
function Qt(t, e) {
  var n, i;
  return ((i = (n = t.entities) == null ? void 0 : n[e.entity_id]) == null ? void 0 : i.name) ?? (typeof e.attributes.friendly_name == "string" ? e.attributes.friendly_name : e.entity_id);
}
function Xt(t, e) {
  if (t.formatEntityState)
    try {
      return t.formatEntityState(e);
    } catch {
    }
  const n = typeof e.attributes.unit_of_measurement == "string" ? e.attributes.unit_of_measurement : void 0;
  return n ? `${e.state} ${n}` : e.state;
}
function en(t, e) {
  const n = [...new Set(e.filter(Boolean))], i = [], s = [];
  for (const a of n) {
    const r = t.states[a];
    if (!r) {
      s.push(a);
      continue;
    }
    i.push({
      entity_id: a,
      name: Qt(t, r),
      state: Xt(t, r),
      unit: typeof r.attributes.unit_of_measurement == "string" ? r.attributes.unit_of_measurement : void 0,
      domain: a.split(".")[0] ?? "unknown"
    });
  }
  return { entities: i, missing: s };
}
const je = "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA";
class tn {
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
      return e.setAttribute("playsinline", "true"), e.loop = !0, e.volume = 0.01, e.src = je, e.play(), this.audio = e, this.active = !0, this.timer = window.setInterval(() => {
        this.nudge();
      }, 5e4), !0;
    } catch {
      return this.stop(), !1;
    }
  }
  nudge() {
    if (this.audio)
      try {
        this.audio.src = `${je}#${Date.now()}`, this.audio.currentTime = 0, this.audio.play();
      } catch {
      }
  }
  stop() {
    this.timer && (window.clearInterval(this.timer), this.timer = void 0), this.audio && (this.audio.pause(), this.audio.removeAttribute("src"), this.audio.load(), this.audio = void 0), this.active = !1;
  }
}
function ht(t) {
  return t.replace(/\\([*_])/g, "$1").replace(/＊/g, "*").replace(/＿/g, "_").replace(/<(?:b|strong)>(.*?)<\/(?:b|strong)>/gi, "**$1**").replace(/__([^_\n]+?)__/g, "**$1**").replace(/\*{3,}/g, "**");
}
function nn(t) {
  return ht(t).replace(/\*\*([^*]+)\*\*/g, "$1").replace(/\*([^*]+)\*/g, "$1");
}
function sn(t) {
  const e = ht(t).trim();
  if (!e)
    return f;
  const n = e.split(/\n{2,}/);
  return m`${n.map((i, s) => {
    const a = rn(i.trim().replace(/\n/g, " "));
    return m`${s > 0 ? m`<br /><br />` : f}${a}`;
  })}`;
}
function rn(t) {
  const e = [], n = /\*\*([^*]+?)\*\*/g;
  let i = 0, s;
  for (; (s = n.exec(t)) !== null; ) {
    s.index > i && e.push(t.slice(i, s.index));
    const a = s[1].trim();
    a && e.push(m`<strong>${a}</strong>`), i = s.index + s[0].length;
  }
  return i < t.length && e.push(t.slice(i)), m`${e}`;
}
function re(t) {
  return (t ?? "en").toLowerCase().startsWith("de");
}
const ut = {
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
function Be(t, e) {
  return !t || t === "unknown" || t === "unavailable" ? re(e) ? "Wetter unklar" : "Weather unavailable" : (re(e) ? ut : an)[t] ?? t.replace(/_/g, " ");
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
  camera_snapshot: "Snapshot"
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
  camera_snapshot: "Snapshot"
};
function $(t, e, n) {
  let s = (re(t) ? on : cn)[e];
  if (n)
    for (const [a, r] of Object.entries(n))
      s = s.split(`{${a}}`).join(String(r));
  return s;
}
const ln = ut;
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
function pe(t, e, n) {
  return Date.UTC(t, e - 1, n) / 864e5;
}
function dn(t, e, n, i = 14) {
  const s = un(e, n), a = pe(s.year, s.month, s.day), r = [];
  for (const o of t) {
    const c = hn(o.date);
    if (!c || !o.name.trim())
      continue;
    let h = s.year, d = pe(h, c.month, c.day);
    d < a && (h += 1, d = pe(h, c.month, c.day));
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
const Ke = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday"
], Ge = {
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
function Ve(t) {
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
    const o = Ve(r.start), c = Ve(r.end);
    o === null || c === null || (i >= o && i < c ? s = r : i < o && !a && (a = r));
  }
  return { current: s, next: a };
}
function vn(t, e) {
  const n = Ke.indexOf(e);
  for (let i = 1; i <= 7; i += 1) {
    const s = Ke[(n + i) % 7];
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
    const { weekday: c, lessons: h } = wn(o, e, n), d = i ? Ge[c] : c;
    if (s.push(
      i ? `Schüler/in: ${o.name} · heute ${d}` : `Student: ${o.name} · today ${d}`
    ), o.note && s.push(i ? `Hinweis: ${o.note}` : `Note: ${o.note}`), h.length === 0) {
      s.push(
        i ? `Heute kein Unterricht für ${o.name}.` : `No lessons today for ${o.name}.`
      );
      const _ = vn(o, c);
      if (_) {
        const k = i ? Ge[_.weekday] : _.weekday, T = Ye(_.lessons);
        s.push(
          i ? `Nächster Schultag: ${k} für ${o.name}${T ? ` (bis ${T})` : ""}.` : `Next school day: ${k} for ${o.name}${T ? ` (until ${T})` : ""}.`
        ), s.push(
          i ? `Plan ${k}:` : `${k} plan:`
        );
        for (const E of _.lessons.slice(0, 8))
          s.push(`- ${E.start}-${E.end}: ${E.subject}`);
      }
      continue;
    }
    a = !0;
    const { current: u, next: l } = bn(h, e, n), g = Ye(h);
    g && s.push(
      i ? `Schule heute bis ${g} (${o.name}).` : `School today until ${g} (${o.name}).`
    ), u && s.push(
      i ? `Jetzt: ${u.start}-${u.end} ${u.subject}` : `Now: ${u.start}-${u.end} ${u.subject}`
    ), l && s.push(
      i ? `Als Nächstes: ${l.start}-${l.end} ${l.subject}` : `Next: ${l.start}-${l.end} ${l.subject}`
    ), s.push(i ? "Heutiger Plan:" : "Today's schedule:");
    for (const _ of h)
      s.push(`- ${_.start}-${_.end}: ${_.subject}`);
  }
  return { lines: s, hasLessonsToday: a };
}
function An(t, e) {
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
async function Sn(t, e, n, i) {
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
function ae(t, e) {
  if (typeof t != "number" || Number.isNaN(t))
    return "—";
  const n = Number.isInteger(t) ? String(t) : t.toFixed(1);
  if (!e)
    return `${n}°`;
  const i = e.includes("°") ? e : `°${e}`;
  return `${n}${i}`;
}
function me(t, e) {
  return t === e ? !1 : !t || !e ? !0 : t.state !== e.state || t.last_updated !== e.last_updated || t.attributes.temperature !== e.attributes.temperature || t.attributes.humidity !== e.attributes.humidity;
}
const dt = /* @__PURE__ */ new Set([
  "rainy",
  "pouring",
  "snowy",
  "snowy-rainy",
  "lightning-rainy",
  "hail"
]), X = /* @__PURE__ */ new Map();
function kn(t) {
  let e = 0;
  for (let n = 0; n < t.length; n += 1)
    e = (e << 5) - e + t.charCodeAt(n), e |= 0;
  return String(e);
}
function En(t) {
  return re(t);
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
function Je(t, e) {
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
function pt(t, e) {
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
function mt(t) {
  const e = t.trim().toLowerCase();
  return e === "unavailable" || e === "unknown" || e === "none" || e === "nicht verfügbar" || e === "unbekannt";
}
function On(t) {
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
function Dn(t) {
  const e = t.state.trim().toLowerCase();
  return e === "on" || e === "open" || e === "opened";
}
function Ln(t) {
  const e = [], n = [], i = [], s = [], a = [], r = [], o = [], c = [], h = [];
  for (const d of t) {
    if (mt(d.state))
      continue;
    const u = d.entity_id.toLowerCase(), l = d.name.toLowerCase();
    d.domain === "person" || u.startsWith("person.") ? e.push(d) : u.includes("abfall") || u.includes("muell") || u.includes("mull") || u.includes("trash") || l.includes("abfall") || l.includes("müll") || l.includes("tonne") ? i.push(d) : u.includes("solar") || u.includes("solaredge") || u.includes("autark") || u.includes("produziert") || u.includes("exportiert") || u.includes("verbrauch") || u.includes("power_production") || l.includes("solar") || l.includes("autark") || l.includes("leistung") ? n.push(d) : u.includes("sun_up") || u.includes("sun_down") || l.includes("sonnenaufgang") || l.includes("sonnenuntergang") ? s.push(d) : u.includes("warn") || l.includes("warn") || l.includes("warnung") ? a.push(d) : u.includes("fenster") || u.includes("window") || l.includes("fenster") || l.includes("window") ? Dn(d) && r.push(d) : u.includes("heizoel") || u.includes("heizöl") || u.includes("oil") || l.includes("heizöl") || l.includes("heizoel") ? o.push(d) : d.domain === "vacuum" || d.domain === "lawn_mower" || u.includes("vacuum") || u.includes("lawn_mower") || l.includes("mäher") || l.includes("maeh") || l.includes("sauger") ? On(d) && c.push(d) : h.push(d);
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
function Un(t, e, n, i) {
  const s = (n ?? "").toLowerCase();
  if (!(s.includes("schule") || s.includes("school") || s.includes("schultag")))
    return !1;
  const r = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    timeZone: e
  }).format(t);
  return !["Sat", "Sun"].includes(r) && (i === "morgen" || i === "vormittag");
}
function Hn(t, e) {
  return t.filter((n) => {
    const i = (n.summary ?? "").toLowerCase();
    return i.includes("geburtstag") || i.includes("birthday") || i.includes("bday");
  }).slice(0, 5).map((n) => ft(n, e));
}
function Pn(t) {
  const e = (t ?? "").toLowerCase();
  return e.includes("schule") || e.includes("unterricht") || e.includes("school") || /\bganztag\b/.test(e);
}
function ft(t, e) {
  const n = t.all_day ? e ? "ganztägig" : "all day" : t.start, i = t.calendar_name ? ` (${t.calendar_name})` : "", s = t.summary ?? (e ? "Belegt" : "Busy");
  return Pn(t.summary) ? e ? `- ${n}: ${s}${i} — Schultitel; Schüler/in NUR aus [STUNDENPLAN], nicht aus Kalendername` : `- ${n}: ${s}${i} — school title; student ONLY from [SCHEDULE], not calendar name` : `- ${n}: ${s}${i}`;
}
function O(t) {
  return `- ${t.name}: ${t.state}`;
}
function Rn(t, e, n) {
  const i = t.trim().toLowerCase();
  if (!i || mt(i))
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
function we(t, e, n, i) {
  const s = [];
  for (const a of t) {
    const r = Rn(a.state, e, n);
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
function x(t, e, n) {
  return [`[${t}]`, e.length ? e.join(`
`) : n].join(`
`);
}
function gt(t, e, n) {
  return t.datetime ? new Intl.DateTimeFormat(e, {
    weekday: "short",
    timeZone: n
  }).format(new Date(t.datetime)) : "?";
}
function zn(t, e, n, i, s) {
  return t.slice(0, 6).map((a) => {
    const r = gt(a, n, i), o = pt(a.condition ?? "", s), c = ae(
      a.temperature,
      e == null ? void 0 : e.temperature_unit
    ), h = a.condition && dt.has(a.condition) ? s ? " · nass" : " · wet" : "";
    return `- ${r}: ${o}, ${c}${h}`;
  });
}
function Mn(t, e, n, i) {
  const s = t.slice(0, 6).filter((r) => r.condition && dt.has(r.condition));
  if (s.length === 0)
    return null;
  const a = s.map((r) => gt(r, e, n)).join(", ");
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
    people: g,
    solar: _,
    trash: k,
    alerts: T,
    windows: E,
    heating: N,
    appliances: w
  } = t, y = [];
  if (e) {
    if (y.push(`${Je(i, !0)} ${n}.`), r && y.push(
      c ? `Draußen ${o}. Empfehlung: ${c}.` : `Draußen ${o}.`
    ), h && y.push(`${h}.`), d && (i === "morgen" || i === "vormittag") && y.push("Schultag — morgens an die Schule denken."), u.length) {
      const p = u[0];
      y.push(
        p.daysUntil === 0 ? `**Heute hat ${p.name} Geburtstag (${p.ageTurning})!**` : `Bald Geburtstag: ${p.name} in ${p.daysUntil} Tag(en).`
      );
    }
    if (l.length === 0)
      y.push("Heute stehen keine Termine an.");
    else {
      const p = l.slice(0, 3).map((S) => S.summary).filter(Boolean).join(", ");
      y.push(
        l.length === 1 ? `Termin: ${p}.` : `${l.length} Termine, u.a. ${p}.`
      );
    }
    _.length && y.push(
      `Solar: ${_.slice(0, 3).map((p) => `${p.name} ${p.state}`).join(", ")}.`
    );
    {
      const S = we(k, s, a, !0).filter((C) => C.startsWith("AKTION"));
      if (S.length) {
        const C = S.map((K) => K.replace(/^AKTION (HEUTE(?: ABEND)?: )/, "")).join(" ");
        y.push(`**${C}**`);
      }
    }
    if (E.length && y.push(
      `Fenster offen: ${E.map((p) => p.name).join(", ")}.`
    ), N.length && y.push(
      `Heizöl: ${N.map((p) => `${p.name} ${p.state}`).join(", ")}.`
    ), w.length && y.push(
      `Geräte: ${w.map((p) => `${p.name} ${p.state}`).join(", ")}.`
    ), T.length) {
      const p = T.filter((S) => S.state !== "0" && S.state !== "ok");
      p.length && y.push(
        `Hinweis: ${p.map((S) => `${S.name} ${S.state}`).join(", ")}.`
      );
    }
    g.length && y.push(
      `Zuhause/Status: ${g.map((p) => `${p.name} ${p.state}`).join(", ")}.`
    );
  } else {
    if (y.push(`${Je(i, !1)} ${n}.`), r && y.push(
      c ? `Outside: ${o}. Wear: ${c}.` : `Outside: ${o}.`
    ), h && y.push(`${h}.`), d && (i === "morgen" || i === "vormittag") && y.push("School day — keep the morning routine in mind."), u.length) {
      const p = u[0];
      y.push(
        p.daysUntil === 0 ? `**Today is ${p.name}'s birthday (${p.ageTurning})!**` : `Birthday soon: ${p.name} in ${p.daysUntil} day(s).`
      );
    }
    y.push(
      l.length === 0 ? "No meetings scheduled." : `${l.length} event(s), starting with ${((B = l[0]) == null ? void 0 : B.summary) ?? "Busy"}.`
    ), _.length && y.push(
      `Solar: ${_.slice(0, 3).map((p) => `${p.name} ${p.state}`).join(", ")}.`
    );
    {
      const S = we(k, s, a, !1).filter((C) => C.startsWith("ACTION"));
      if (S.length) {
        const C = S.map((K) => K.replace(/^ACTION (TODAY|TONIGHT): /, "")).join(" ");
        y.push(`**${C}**`);
      }
    }
    E.length && y.push(`Open windows: ${E.map((p) => p.name).join(", ")}.`), N.length && y.push(
      `Heating oil: ${N.map((p) => `${p.name} ${p.state}`).join(", ")}.`
    ), w.length && y.push(
      `Devices needing attention: ${w.map((p) => `${p.name} ${p.state}`).join(", ")}.`
    );
  }
  return y.join(" ");
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
  } = t, l = En(c), g = Tn(o, h), _ = Nn(g, l), k = new Intl.DateTimeFormat(c, {
    weekday: "long",
    month: "long",
    day: "numeric",
    timeZone: h
  }).format(o), T = new Intl.DateTimeFormat(c, {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: h
  }).format(o), E = e ? `${pt(e.condition, l)}, ${ae(
    e.temperature,
    e.temperature_unit
  )}${typeof e.humidity == "number" ? l ? `, Luftfeuchtigkeit ${e.humidity}%` : `, humidity ${e.humidity}%` : ""}` : l ? "Wetter nicht verfügbar" : "Weather unavailable", N = Cn(e, l), w = Ln(s), y = zn(
    n,
    e,
    c,
    h,
    l
  ), B = Mn(n, c, h, l), p = dn(a, o, h, 14), S = Yt(i, o, h), C = [
    ...p.map((G) => pn(G, l)),
    ...Hn(i, l)
  ], K = Un(o, h, u, g), { lines: yt, hasLessonsToday: $t } = xn(
    r,
    o,
    h,
    l
  ), Te = K || $t, wt = S.length === 0 ? [] : S.slice(0, 12).map((G) => ft(G, l)), bt = (d == null ? void 0 : d.trim()) || ct, Ne = u == null ? void 0 : u.trim(), vt = [
    x(
      l ? "ZEIT" : "TIME",
      [
        l ? `Datum: ${k}` : `Date: ${k}`,
        l ? `Uhrzeit: ${T}` : `Time: ${T}`,
        l ? `Tageszeit: ${_}` : `Time of day: ${_}`
      ],
      ""
    ),
    ...Ne ? [
      x(
        l ? "HAUSHALT" : "HOUSEHOLD",
        Ne.split(`
`).map((G) => G.trim()).filter(Boolean),
        ""
      )
    ] : [],
    x(
      l ? "SCHULTAG" : "SCHOOL_DAY",
      [
        Te ? l ? "ja — heute Unterricht laut Stundenplan" : "yes — lessons today per schedule" : l ? "nein — heute kein Unterricht (Wochenende oder kein Plan)" : "no — no lessons today (weekend or empty plan)"
      ],
      ""
    ),
    x(
      l ? "STUNDENPLAN" : "SCHEDULE",
      yt,
      l ? "Kein Stundenplan konfiguriert." : "No schedule configured."
    ),
    x(
      l ? "WETTER" : "WEATHER",
      [
        E,
        N ? l ? `Kleidungshinweis: ${N}` : `Clothing hint: ${N}` : "",
        B ?? ""
      ].filter(Boolean),
      l ? "Keine Wetterdaten." : "No weather data."
    ),
    x(
      l ? "VORHERSAGE" : "FORECAST",
      y,
      l ? "Keine Vorhersage." : "No forecast."
    ),
    x(
      l ? "GEBURTSTAGE" : "BIRTHDAYS",
      C,
      l ? "Keine Geburtstage in den nächsten 14 Tagen." : "No birthdays in the next 14 days."
    ),
    x(
      l ? "TERMINE" : "AGENDA",
      wt,
      l ? "Keine Termine heute (nur heutiger Kalendertag, nicht die nächsten 24h)." : "No events today (calendar day only, not the next 24h)."
    ),
    x(
      l ? "PERSONEN" : "PEOPLE",
      w.people.map(O),
      l ? "Keine Personendaten." : "No people data."
    ),
    x(
      "SOLAR",
      w.solar.map(O),
      l ? "Keine Solarwerte (oder nicht verfügbar)." : "No solar data."
    ),
    x(
      l ? "MUELL" : "TRASH",
      w.trash.map(O),
      l ? "Keine Mülldaten." : "No trash data."
    ),
    x(
      l ? "MUELL-AKTION" : "TRASH-ACTION",
      we(w.trash, o, h, l),
      l ? "Keine Müll-Aktion heute/morgen." : "No trash action today/tomorrow."
    ),
    x(
      l ? "SONNE" : "SUN",
      w.sun.map(O),
      l ? "Keine Sonnenzeiten." : "No sun times."
    ),
    x(
      l ? "FENSTER" : "WINDOWS",
      w.windows.map(O),
      l ? "Keine offenen Fenster." : "No open windows."
    ),
    x(
      l ? "HEIZOEL" : "HEATING_OIL",
      w.heating.map(O),
      l ? "Kein Heizöl-Sensor." : "No heating-oil sensor."
    ),
    x(
      l ? "GERAETE" : "APPLIANCES",
      w.appliances.map(O),
      l ? "Keine Geräte mit Handlungsbedarf." : "No appliances needing attention."
    ),
    x(
      l ? "WARNUNGEN" : "ALERTS",
      w.alerts.map(O),
      l ? "Keine Warnungen." : "No alerts."
    ),
    x(
      l ? "SONSTIGES" : "OTHER",
      w.other.map(O),
      l ? "Nichts weiteres." : "Nothing else."
    )
  ], Ce = [
    bt,
    "",
    l ? "DATEN (nur diese Fakten verwenden; fehlende/ungültige Werte weglassen):" : "DATA (use only these facts; skip missing/invalid values):",
    vt.join(`

`),
    "",
    l ? "ANTWORT: Nur der fertige deutsche Fließtext. Wichtige Aktion mit **doppelten ASCII-Sternen** fett markieren, nichts sonst." : "RESPONSE: Only the finished brief text. Mark important actions with **double ASCII asterisks**, nothing else."
  ].join(`
`), xt = In({
    german: l,
    dayLabel: k,
    part: g,
    now: o,
    timeZone: h,
    weather: e,
    weatherLine: E,
    clothing: N,
    rainLine: B,
    schoolDay: Te,
    birthdays: p,
    events: S,
    people: w.people,
    solar: w.solar,
    trash: w.trash,
    alerts: w.alerts,
    windows: w.windows,
    heating: w.heating,
    appliances: w.appliances
  });
  return {
    hash: kn(Ce),
    prompt: Ce,
    local: xt
  };
}
function _t(t) {
  if (!t) {
    X.clear();
    return;
  }
  X.delete(t);
}
function Fn(t, e) {
  const n = X.get(t);
  return n ? n.hash !== e || n.expiresAt < Date.now() ? (X.delete(t), null) : n : null;
}
function fe(t, e, n, i, s) {
  X.set(t, {
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
    _t(a);
  else {
    const c = Fn(a, s.hash);
    if (c)
      return { text: c.text, source: c.source };
  }
  if (n === "local")
    return fe(a, s.hash, s.local, "local", r), { text: s.local, source: "local" };
  try {
    const c = await jn(e, i, s.prompt);
    if (c)
      return fe(a, s.hash, c, "ai", r), { text: c, source: "ai" };
  } catch {
  }
  return fe(a, s.hash, s.local, "local", r), { text: s.local, source: "local" };
}
let L = null, oe = null;
function Kn() {
  if (!(typeof window > "u"))
    try {
      const t = new Audio();
      oe = t, t.play().catch(() => {
      });
    } catch {
    }
}
function be() {
  typeof window < "u" && "speechSynthesis" in window && window.speechSynthesis.cancel(), L && (L.pause(), L.removeAttribute("src"), L.load(), L = null), oe = null;
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
async function Vn(t) {
  const e = oe ?? new Audio();
  oe = null, L = e, await new Promise((n, i) => {
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
  }), L === e && (L = null);
}
async function Yn(t) {
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
      await Vn(a);
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
    be();
    const i = new SpeechSynthesisUtterance(e);
    i.lang = n, i.rate = 1, window.speechSynthesis.speak(i);
    return;
  }
  throw new Error("No TTS available");
}
const Jn = Xe`
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
    gap: 20px;
  }

  .header-time {
    flex: 0 0 auto;
    text-align: right;
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
    flex: 1 1 auto;
    min-width: 0;
    margin: 0;
    font-size: 1.35rem;
    line-height: 1.45;
    color: var(--primary-text-color);
  }

  .brief strong {
    font-weight: 750;
    color: var(--primary-color, #03a9f4);
  }

  .split {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    gap: 14px;
    align-items: stretch;
  }

  @media (max-width: 720px) {
    .header-row {
      flex-wrap: wrap;
    }

    .brief {
      flex: 1 1 100%;
      order: 1;
    }

    .header-time {
      flex: 1 1 auto;
      text-align: left;
      order: 0;
    }

    .header-actions {
      order: 0;
    }

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

  .camera-offline {
    position: absolute;
    inset: 0;
    display: grid;
    place-items: center;
    padding: 8px;
    font-size: 0.85rem;
    text-align: center;
    color: #fff;
    background: color-mix(in srgb, #000 60%, transparent);
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
var Zn = Object.defineProperty, qn = Object.getOwnPropertyDescriptor, v = (t, e, n, i) => {
  for (var s = i > 1 ? void 0 : i ? qn(e, n) : e, a = t.length - 1, r; a >= 0; a--)
    (r = t[a]) && (s = (i ? r(e, n, s) : r(s)) || s);
  return i && s && Zn(e, n, s), s;
};
const ge = "daily", _e = 24, Ze = 15, ye = "auto", Qn = 15 * 6e4;
let b = class extends I {
  constructor() {
    super(...arguments), this._weather = null, this._forecast = [], this._events = [], this._entities = [], this._summary = "", this._summarySource = "loading", this._errors = [], this._loadingEvents = !1, this._refreshing = !1, this._contextOpen = !1, this._now = /* @__PURE__ */ new Date(), this._speaking = !1, this._keepAwakeOn = !1, this._cameraMode = {}, this._cameraOffline = {}, this._cameraTick = 0, this._fetchGeneration = 0, this._keepAwake = new tn(), this._onVisibility = () => {
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
    return await Promise.resolve().then(() => si), document.createElement(ot);
  }
  setConfig(t) {
    if (!t)
      throw new Error("Invalid configuration");
    this._config = {
      forecast_type: ge,
      horizon_hours: _e,
      summary_mode: ye,
      cache_minutes: Ze,
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
    super.disconnectedCallback(), this._stopRefreshLoop(), this._stopClock(), this._stopCameraStillLoop(), this._teardownForecast(), this._keepAwake.stop(), this._keepAwakeOn = !1, be(), document.removeEventListener("visibilitychange", this._onVisibility);
  }
  updated(t) {
    !this._config || !this.hass || ((t.has("hass") || t.has("_config")) && (this._syncWeatherFromHass(), this._syncEntitiesFromHass(), this._ensureForecastSubscription()), t.has("_config") && this.isConnected && this._refreshData(!0));
  }
  shouldUpdate(t) {
    var e, n, i, s, a, r, o, c, h, d, u, l;
    if (t.has("_config") || t.has("_weather") || t.has("_forecast") || t.has("_entities") || t.has("_events") || t.has("_summary") || t.has("_summarySource") || t.has("_errors") || t.has("_loadingEvents") || t.has("_refreshing") || t.has("_contextOpen") || t.has("_now") || t.has("_speaking") || t.has("_keepAwakeOn") || t.has("_cameraMode") || t.has("_cameraOffline") || t.has("_cameraTick"))
      return !0;
    if (t.has("hass")) {
      const g = t.get("hass");
      if ((e = this._config) != null && e.weather_entity && me(
        (n = g == null ? void 0 : g.states) == null ? void 0 : n[this._config.weather_entity],
        (s = (i = this.hass) == null ? void 0 : i.states) == null ? void 0 : s[this._config.weather_entity]
      ))
        return !0;
      for (const _ of ((a = this._config) == null ? void 0 : a.entities) ?? [])
        if (me((r = g == null ? void 0 : g.states) == null ? void 0 : r[_], (c = (o = this.hass) == null ? void 0 : o.states) == null ? void 0 : c[_]))
          return !0;
      for (const _ of ((h = this._config) == null ? void 0 : h.cameras) ?? [])
        if (me((d = g == null ? void 0 : g.states) == null ? void 0 : d[_], (l = (u = this.hass) == null ? void 0 : u.states) == null ? void 0 : l[_]))
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
    (this._cameraMode[t] ?? "stream") === "stream" ? this._cameraMode = { ...this._cameraMode, [t]: "still" } : this._cameraOffline = { ...this._cameraOffline, [t]: !0 };
  }
  _onCameraLoad(t) {
    this._cameraOffline[t] && (this._cameraOffline = { ...this._cameraOffline, [t]: !1 });
  }
  _startCameraStillLoop() {
    this._stopCameraStillLoop(), this._cameraStillTimer = window.setInterval(() => {
      Object.values(this._cameraMode).includes("still") && (this._cameraTick = this._cameraTick + 1);
    }, 5e3);
  }
  _stopCameraStillLoop() {
    this._cameraStillTimer && (window.clearInterval(this._cameraStillTimer), this._cameraStillTimer = void 0);
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
      this._config.summary_mode ?? ye,
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
    const e = An(this.hass, t);
    if (!e) {
      this._weather = null, this._pushError(
        $((i = (n = this.hass) == null ? void 0 : n.locale) == null ? void 0 : i.language, "weather_missing", { id: t })
      );
      return;
    }
    this._weather = { ...e, forecast: this._forecast };
  }
  _syncEntitiesFromHass() {
    var n, i;
    const { entities: t, missing: e } = en(
      this.hass,
      this._config.entities ?? []
    );
    this._entities = t;
    for (const s of e)
      this._pushError(
        $((i = (n = this.hass) == null ? void 0 : n.locale) == null ? void 0 : i.language, "entity_missing", { id: s })
      );
  }
  async _ensureForecastSubscription() {
    const t = this._config.weather_entity, e = this._config.forecast_type ?? ge;
    if (!(this._unsubForecast && this._lastWeatherEntity === t && this._lastForecastType === e)) {
      if (this._teardownForecast(), this._lastWeatherEntity = t, this._lastForecastType = e, !t || e === "none" || !this.hass) {
        this._forecast = [];
        return;
      }
      try {
        this._unsubForecast = await Sn(
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
      this._refreshing = !0, _t(this._cacheKey());
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
        be(), this._speaking = !1;
        return;
      }
      Kn(), this._speaking = !0;
      try {
        await Yn({
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
    const s = this._config.calendars ?? [], a = this._config.horizon_hours ?? _e, { events: r, errors: o } = await Vt(
      this.hass,
      s,
      a
    );
    if (n === this._fetchGeneration) {
      this._events = r, i.push(...o), this._loadingEvents = !1, this._config.weather_entity ? this.hass.states[this._config.weather_entity] || i.push(
        $((c = this.hass.locale) == null ? void 0 : c.language, "weather_missing", {
          id: this._config.weather_entity
        })
      ) : i.push("No weather_entity configured");
      for (const d of this._config.entities ?? [])
        this.hass.states[d] || i.push(
          $((h = this.hass.locale) == null ? void 0 : h.language, "entity_missing", { id: d })
        );
      this._errors = [...new Set(i)].slice(-6), await this._refreshSummary(t, e);
    }
  }
  async _refreshSummary(t, e = !1) {
    var c;
    if (!this.hass || !this._config)
      return;
    const n = this._config.summary_mode ?? ye, i = this._config.cache_minutes ?? Ze, s = ((c = this.hass.locale) == null ? void 0 : c.language) ?? "en", a = this.hass.config.time_zone, r = Wn({
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
    const e = ((a = this.hass.locale) == null ? void 0 : a.language) ?? "en", n = this.hass.config.time_zone, i = this._config.forecast_type ?? ge, s = new Date(t.datetime);
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
      return f;
    const t = ((s = (i = this.hass) == null ? void 0 : i.locale) == null ? void 0 : s.language) ?? "en", e = ((a = this.hass) == null ? void 0 : a.config.time_zone) ?? "UTC", n = this._weather;
    return m`
      <ha-card>
        <div class="header">
          <div class="header-row">
            <div
              class="brief ${this._summarySource === "loading" || this._refreshing ? "loading" : ""}"
            >
              ${this._summarySource === "loading" && !this._summary ? $(t, "preparing") : sn(this._summary)}
            </div>
            <div class="header-time">
              <p class="eyebrow">${$(t, "today")}</p>
              <h2 class="title">${this._dayTitle()}</h2>
              <p class="clock" aria-live="polite">${this._clockLabel()}</p>
            </div>
            <div class="header-actions">
              <button
                class="icon-btn"
                type="button"
                title=${$(t, "refresh")}
                aria-label=${$(t, "refresh")}
                ?disabled=${this._refreshing}
                @click=${this._onManualRefresh}
              >
                <span class=${this._refreshing ? "spin" : ""}>↻</span>
              </button>
              <button
                class="icon-btn ${this._speaking ? "active" : ""}"
                type="button"
                title=${$(t, "speak")}
                aria-label=${$(t, "speak")}
                ?disabled=${!this._summary || this._summarySource === "loading"}
                @click=${this._onSpeak}
              >
                ♪
              </button>
            </div>
          </div>
        </div>

        <div class="split">
          <section class="panel">
            <h3 class="section-title">${$(t, "weather")}</h3>
            ${n ? m`
                  <div class="weather-hero">
                    <div>
                      <p class="condition">
                        ${Be(n.condition, t)}
                      </p>
                      <p class="weather-place">
                        ${n.friendly_name ?? n.entity_id}
                      </p>
                    </div>
                    <p class="temp">
                      ${ae(
      n.temperature,
      n.temperature_unit
    )}
                    </p>
                  </div>
                  ${typeof n.humidity == "number" || typeof n.wind_speed == "number" ? m`
                        <div class="chips">
                          ${typeof n.humidity == "number" ? m`<span class="chip"
                                >${n.humidity}%
                                ${$(t, "humidity")}</span
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
      (r) => m`
                              <div class="forecast-item">
                                <span class="forecast-day"
                                  >${this._forecastLabel(r)}</span
                                >
                                <span class="forecast-temp"
                                  >${ae(
        r.temperature,
        n.temperature_unit
      )}</span
                                >
                                <span class="forecast-cond"
                                  >${Be(
        r.condition ?? "",
        t
      )}</span
                                >
                              </div>
                            `
    )}
                        </div>
                      ` : f}
                ` : m`<p class="empty">${$(t, "configure_weather")}</p>`}
          </section>

          <section class="panel">
            <h3 class="section-title">${$(t, "calendar")}</h3>
            ${this._loadingEvents && this._events.length === 0 ? m`<p class="empty loading">${$(t, "loading_calendars")}</p>` : this._events.length === 0 ? m`<p class="empty">
                    ${$(t, "no_events", {
      hours: this._config.horizon_hours ?? _e
    })}
                  </p>` : m`
                    <ul class="events">
                      ${Zt(
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
                                      >${qt(
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
                <h3 class="section-title">${$(t, "cameras")}</h3>
                <div class="camera-grid">
                  ${(this._config.cameras ?? []).map((r) => {
      var u;
      const o = this._cameraMode[r] ?? "stream", c = this._cameraOffline[r] === !0, h = (u = this.hass) == null ? void 0 : u.states[r], d = o === "still" ? this._cameraStillSrc(r) : this._cameraStreamSrc(r);
      return m`
                      <button
                        class="camera-tile"
                        type="button"
                        @click=${() => this._openMoreInfo(r)}
                      >
                        ${d ? m`
                              <img
                                class="camera-feed"
                                src=${d}
                                alt=${this._cameraName(r)}
                                @error=${() => this._onCameraError(r)}
                                @load=${() => this._onCameraLoad(r)}
                              />
                              ${c ? m`<div class="camera-offline">
                                    ${$(t, "no_feed")}${h != null && h.state ? ` · ${h.state}` : ""}
                                  </div>` : f}
                              <span class="camera-badge"
                                >${o === "still" ? $(t, "camera_snapshot") : $(t, "camera_live")}</span
                              >
                            ` : m`<div class="camera-missing">
                              ${$(t, "no_feed")}${h != null && h.state ? ` · ${h.state}` : ""}
                            </div>`}
                        <span class="camera-label"
                          >${this._cameraName(r)}</span
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
                  <span class="section-title">${$(t, "context")}</span>
                  <span class="context-meta"
                    >${this._entities.length}
                    ${this._entities.length === 1 ? $(t, "entity") : $(t, "entities")}</span
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

        ${this._errors.length ? m`
              <div class="errors">
                ${this._errors.map(
      (r) => m`<span class="error-chip">${r}</span>`
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
                  <span
                    >${this._keepAwakeOn ? $(t, "keep_awake_on") : $(t, "keep_awake")}</span
                  >
                </button>
              </div>
            ` : f}
      </ha-card>
    `;
  }
};
b.styles = Jn;
v([
  ke({ attribute: !1 })
], b.prototype, "hass", 2);
v([
  A()
], b.prototype, "_config", 2);
v([
  A()
], b.prototype, "_weather", 2);
v([
  A()
], b.prototype, "_forecast", 2);
v([
  A()
], b.prototype, "_events", 2);
v([
  A()
], b.prototype, "_entities", 2);
v([
  A()
], b.prototype, "_summary", 2);
v([
  A()
], b.prototype, "_summarySource", 2);
v([
  A()
], b.prototype, "_errors", 2);
v([
  A()
], b.prototype, "_loadingEvents", 2);
v([
  A()
], b.prototype, "_refreshing", 2);
v([
  A()
], b.prototype, "_contextOpen", 2);
v([
  A()
], b.prototype, "_now", 2);
v([
  A()
], b.prototype, "_speaking", 2);
v([
  A()
], b.prototype, "_keepAwakeOn", 2);
v([
  A()
], b.prototype, "_cameraMode", 2);
v([
  A()
], b.prototype, "_cameraOffline", 2);
v([
  A()
], b.prototype, "_cameraTick", 2);
b = v([
  st(at)
], b);
window.customCards = window.customCards || [];
window.customCards.push({
  type: at,
  name: rt,
  description: "AI-first day brief with weather, calendars, extra entities, and a short narrative.",
  preview: !0,
  documentationURL: "https://github.com/jenskock/lovelace-day-brief"
});
console.info(
  `%c ${rt} %c ${Kt} `,
  "color:#fff;background:#03a9f4;font-weight:700",
  "color:#03a9f4;background:transparent;font-weight:700"
);
var Xn = Object.defineProperty, ei = Object.getOwnPropertyDescriptor, Ee = (t, e, n, i) => {
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
function $e(t) {
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
    this._update({ calendars: $e(this._value(t)) });
  }
  _onEntities(t) {
    this._update({ entities: $e(this._value(t)) });
  }
  _onCameras(t) {
    this._update({ cameras: $e(this._value(t)) });
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
            placeholder=${ct}
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
j.styles = Xe`
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
Ee([
  ke({ attribute: !1 })
], j.prototype, "hass", 2);
Ee([
  A()
], j.prototype, "_config", 2);
j = Ee([
  st(ot)
], j);
const si = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get DayBriefCardEditor() {
    return j;
  }
}, Symbol.toStringTag, { value: "Module" }));
export {
  b as DayBriefCard
};
//# sourceMappingURL=day-brief.js.map
