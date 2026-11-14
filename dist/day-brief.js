/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const B = globalThis, ne = B.ShadowRoot && (B.ShadyCSS === void 0 || B.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, re = Symbol(), pe = /* @__PURE__ */ new WeakMap();
let Ne = class {
  constructor(e, s, i) {
    if (this._$cssResult$ = !0, i !== re) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = s;
  }
  get styleSheet() {
    let e = this.o;
    const s = this.t;
    if (ne && e === void 0) {
      const i = s !== void 0 && s.length === 1;
      i && (e = pe.get(s)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), i && pe.set(s, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const Je = (t) => new Ne(typeof t == "string" ? t : t + "", void 0, re), Oe = (t, ...e) => {
  const s = t.length === 1 ? t[0] : e.reduce((i, n, a) => i + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n) + t[a + 1], t[0]);
  return new Ne(s, t, re);
}, Ye = (t, e) => {
  if (ne) t.adoptedStyleSheets = e.map((s) => s instanceof CSSStyleSheet ? s : s.styleSheet);
  else for (const s of e) {
    const i = document.createElement("style"), n = B.litNonce;
    n !== void 0 && i.setAttribute("nonce", n), i.textContent = s.cssText, t.appendChild(i);
  }
}, fe = ne ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let s = "";
  for (const i of e.cssRules) s += i.cssText;
  return Je(s);
})(t) : t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Qe, defineProperty: Xe, getOwnPropertyDescriptor: et, getOwnPropertyNames: tt, getOwnPropertySymbols: st, getPrototypeOf: it } = Object, E = globalThis, me = E.trustedTypes, nt = me ? me.emptyScript : "", J = E.reactiveElementPolyfillSupport, L = (t, e) => t, K = { toAttribute(t, e) {
  switch (e) {
    case Boolean:
      t = t ? nt : null;
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
} }, ae = (t, e) => !Qe(t, e), _e = { attribute: !0, type: String, converter: K, reflect: !1, useDefault: !1, hasChanged: ae };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), E.litPropertyMetadata ?? (E.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let O = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, s = _e) {
    if (s.state && (s.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((s = Object.create(s)).wrapped = !0), this.elementProperties.set(e, s), !s.noAccessor) {
      const i = Symbol(), n = this.getPropertyDescriptor(e, i, s);
      n !== void 0 && Xe(this.prototype, e, n);
    }
  }
  static getPropertyDescriptor(e, s, i) {
    const { get: n, set: a } = et(this.prototype, e) ?? { get() {
      return this[s];
    }, set(r) {
      this[s] = r;
    } };
    return { get: n, set(r) {
      const c = n == null ? void 0 : n.call(this);
      a == null || a.call(this, r), this.requestUpdate(e, c, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? _e;
  }
  static _$Ei() {
    if (this.hasOwnProperty(L("elementProperties"))) return;
    const e = it(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(L("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(L("properties"))) {
      const s = this.properties, i = [...tt(s), ...st(s)];
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
      for (const n of i) s.unshift(fe(n));
    } else e !== void 0 && s.push(fe(e));
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
    return Ye(e, this.constructor.elementStyles), e;
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
      const r = (((a = i.converter) == null ? void 0 : a.toAttribute) !== void 0 ? i.converter : K).toAttribute(s, i.type);
      this._$Em = e, r == null ? this.removeAttribute(n) : this.setAttribute(n, r), this._$Em = null;
    }
  }
  _$AK(e, s) {
    var a, r;
    const i = this.constructor, n = i._$Eh.get(e);
    if (n !== void 0 && this._$Em !== n) {
      const c = i.getPropertyOptions(n), o = typeof c.converter == "function" ? { fromAttribute: c.converter } : ((a = c.converter) == null ? void 0 : a.fromAttribute) !== void 0 ? c.converter : K;
      this._$Em = n;
      const h = o.fromAttribute(s, c.type);
      this[n] = h ?? ((r = this._$Ej) == null ? void 0 : r.get(n)) ?? h, this._$Em = null;
    }
  }
  requestUpdate(e, s, i, n = !1, a) {
    var r;
    if (e !== void 0) {
      const c = this.constructor;
      if (n === !1 && (a = this[e]), i ?? (i = c.getPropertyOptions(e)), !((i.hasChanged ?? ae)(a, s) || i.useDefault && i.reflect && a === ((r = this._$Ej) == null ? void 0 : r.get(e)) && !this.hasAttribute(c._$Eu(e, i)))) return;
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
        const { wrapped: c } = r, o = this[a];
        c !== !0 || this._$AL.has(a) || o === void 0 || this.C(a, void 0, r, o);
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
O.elementStyles = [], O.shadowRootOptions = { mode: "open" }, O[L("elementProperties")] = /* @__PURE__ */ new Map(), O[L("finalized")] = /* @__PURE__ */ new Map(), J == null || J({ ReactiveElement: O }), (E.reactiveElementVersions ?? (E.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const M = globalThis, ge = (t) => t, V = M.trustedTypes, ye = V ? V.createPolicy("lit-html", { createHTML: (t) => t }) : void 0, De = "$lit$", A = `lit$${Math.random().toFixed(9).slice(2)}$`, Pe = "?" + A, rt = `<${Pe}>`, T = document, U = () => T.createComment(""), F = (t) => t === null || typeof t != "object" && typeof t != "function", oe = Array.isArray, at = (t) => oe(t) || typeof (t == null ? void 0 : t[Symbol.iterator]) == "function", Y = `[ 	
\f\r]`, H = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, $e = /-->/g, be = />/g, S = RegExp(`>|${Y}(?:([^\\s"'>=/]+)(${Y}*=${Y}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), ve = /'/g, we = /"/g, ze = /^(?:script|style|textarea|title)$/i, ot = (t) => (e, ...s) => ({ _$litType$: t, strings: e, values: s }), f = ot(1), P = Symbol.for("lit-noChange"), p = Symbol.for("lit-nothing"), xe = /* @__PURE__ */ new WeakMap(), C = T.createTreeWalker(T, 129);
function Re(t, e) {
  if (!oe(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return ye !== void 0 ? ye.createHTML(e) : e;
}
const ct = (t, e) => {
  const s = t.length - 1, i = [];
  let n, a = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", r = H;
  for (let c = 0; c < s; c++) {
    const o = t[c];
    let h, l, u = -1, _ = 0;
    for (; _ < o.length && (r.lastIndex = _, l = r.exec(o), l !== null); ) _ = r.lastIndex, r === H ? l[1] === "!--" ? r = $e : l[1] !== void 0 ? r = be : l[2] !== void 0 ? (ze.test(l[2]) && (n = RegExp("</" + l[2], "g")), r = S) : l[3] !== void 0 && (r = S) : r === S ? l[0] === ">" ? (r = n ?? H, u = -1) : l[1] === void 0 ? u = -2 : (u = r.lastIndex - l[2].length, h = l[1], r = l[3] === void 0 ? S : l[3] === '"' ? we : ve) : r === we || r === ve ? r = S : r === $e || r === be ? r = H : (r = S, n = void 0);
    const d = r === S && t[c + 1].startsWith("/>") ? " " : "";
    a += r === H ? o + rt : u >= 0 ? (i.push(h), o.slice(0, u) + De + o.slice(u) + A + d) : o + A + (u === -2 ? c : d);
  }
  return [Re(t, a + (t[s] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), i];
};
class j {
  constructor({ strings: e, _$litType$: s }, i) {
    let n;
    this.parts = [];
    let a = 0, r = 0;
    const c = e.length - 1, o = this.parts, [h, l] = ct(e, s);
    if (this.el = j.createElement(h, i), C.currentNode = this.el.content, s === 2 || s === 3) {
      const u = this.el.content.firstChild;
      u.replaceWith(...u.childNodes);
    }
    for (; (n = C.nextNode()) !== null && o.length < c; ) {
      if (n.nodeType === 1) {
        if (n.hasAttributes()) for (const u of n.getAttributeNames()) if (u.endsWith(De)) {
          const _ = l[r++], d = n.getAttribute(u).split(A), w = /([.?@])?(.*)/.exec(_);
          o.push({ type: 1, index: a, name: w[2], strings: d, ctor: w[1] === "." ? ht : w[1] === "?" ? ut : w[1] === "@" ? dt : Z }), n.removeAttribute(u);
        } else u.startsWith(A) && (o.push({ type: 6, index: a }), n.removeAttribute(u));
        if (ze.test(n.tagName)) {
          const u = n.textContent.split(A), _ = u.length - 1;
          if (_ > 0) {
            n.textContent = V ? V.emptyScript : "";
            for (let d = 0; d < _; d++) n.append(u[d], U()), C.nextNode(), o.push({ type: 2, index: ++a });
            n.append(u[_], U());
          }
        }
      } else if (n.nodeType === 8) if (n.data === Pe) o.push({ type: 2, index: a });
      else {
        let u = -1;
        for (; (u = n.data.indexOf(A, u + 1)) !== -1; ) o.push({ type: 7, index: a }), u += A.length - 1;
      }
      a++;
    }
  }
  static createElement(e, s) {
    const i = T.createElement("template");
    return i.innerHTML = e, i;
  }
}
function z(t, e, s = t, i) {
  var r, c;
  if (e === P) return e;
  let n = i !== void 0 ? (r = s._$Co) == null ? void 0 : r[i] : s._$Cl;
  const a = F(e) ? void 0 : e._$litDirective$;
  return (n == null ? void 0 : n.constructor) !== a && ((c = n == null ? void 0 : n._$AO) == null || c.call(n, !1), a === void 0 ? n = void 0 : (n = new a(t), n._$AT(t, s, i)), i !== void 0 ? (s._$Co ?? (s._$Co = []))[i] = n : s._$Cl = n), n !== void 0 && (e = z(t, n._$AS(t, e.values), n, i)), e;
}
class lt {
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
    const { el: { content: s }, parts: i } = this._$AD, n = ((e == null ? void 0 : e.creationScope) ?? T).importNode(s, !0);
    C.currentNode = n;
    let a = C.nextNode(), r = 0, c = 0, o = i[0];
    for (; o !== void 0; ) {
      if (r === o.index) {
        let h;
        o.type === 2 ? h = new W(a, a.nextSibling, this, e) : o.type === 1 ? h = new o.ctor(a, o.name, o.strings, this, e) : o.type === 6 && (h = new pt(a, this, e)), this._$AV.push(h), o = i[++c];
      }
      r !== (o == null ? void 0 : o.index) && (a = C.nextNode(), r++);
    }
    return C.currentNode = T, n;
  }
  p(e) {
    let s = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(e, i, s), s += i.strings.length - 2) : i._$AI(e[s])), s++;
  }
}
class W {
  get _$AU() {
    var e;
    return ((e = this._$AM) == null ? void 0 : e._$AU) ?? this._$Cv;
  }
  constructor(e, s, i, n) {
    this.type = 2, this._$AH = p, this._$AN = void 0, this._$AA = e, this._$AB = s, this._$AM = i, this.options = n, this._$Cv = (n == null ? void 0 : n.isConnected) ?? !0;
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
    e = z(this, e, s), F(e) ? e === p || e == null || e === "" ? (this._$AH !== p && this._$AR(), this._$AH = p) : e !== this._$AH && e !== P && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : at(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== p && F(this._$AH) ? this._$AA.nextSibling.data = e : this.T(T.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var a;
    const { values: s, _$litType$: i } = e, n = typeof i == "number" ? this._$AC(e) : (i.el === void 0 && (i.el = j.createElement(Re(i.h, i.h[0]), this.options)), i);
    if (((a = this._$AH) == null ? void 0 : a._$AD) === n) this._$AH.p(s);
    else {
      const r = new lt(n, this), c = r.u(this.options);
      r.p(s), this.T(c), this._$AH = r;
    }
  }
  _$AC(e) {
    let s = xe.get(e.strings);
    return s === void 0 && xe.set(e.strings, s = new j(e)), s;
  }
  k(e) {
    oe(this._$AH) || (this._$AH = [], this._$AR());
    const s = this._$AH;
    let i, n = 0;
    for (const a of e) n === s.length ? s.push(i = new W(this.O(U()), this.O(U()), this, this.options)) : i = s[n], i._$AI(a), n++;
    n < s.length && (this._$AR(i && i._$AB.nextSibling, n), s.length = n);
  }
  _$AR(e = this._$AA.nextSibling, s) {
    var i;
    for ((i = this._$AP) == null ? void 0 : i.call(this, !1, !0, s); e !== this._$AB; ) {
      const n = ge(e).nextSibling;
      ge(e).remove(), e = n;
    }
  }
  setConnected(e) {
    var s;
    this._$AM === void 0 && (this._$Cv = e, (s = this._$AP) == null || s.call(this, e));
  }
}
class Z {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, s, i, n, a) {
    this.type = 1, this._$AH = p, this._$AN = void 0, this.element = e, this.name = s, this._$AM = n, this.options = a, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = p;
  }
  _$AI(e, s = this, i, n) {
    const a = this.strings;
    let r = !1;
    if (a === void 0) e = z(this, e, s, 0), r = !F(e) || e !== this._$AH && e !== P, r && (this._$AH = e);
    else {
      const c = e;
      let o, h;
      for (e = a[0], o = 0; o < a.length - 1; o++) h = z(this, c[i + o], s, o), h === P && (h = this._$AH[o]), r || (r = !F(h) || h !== this._$AH[o]), h === p ? e = p : e !== p && (e += (h ?? "") + a[o + 1]), this._$AH[o] = h;
    }
    r && !n && this.j(e);
  }
  j(e) {
    e === p ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class ht extends Z {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === p ? void 0 : e;
  }
}
class ut extends Z {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== p);
  }
}
class dt extends Z {
  constructor(e, s, i, n, a) {
    super(e, s, i, n, a), this.type = 5;
  }
  _$AI(e, s = this) {
    if ((e = z(this, e, s, 0) ?? p) === P) return;
    const i = this._$AH, n = e === p && i !== p || e.capture !== i.capture || e.once !== i.once || e.passive !== i.passive, a = e !== p && (i === p || n);
    n && this.element.removeEventListener(this.name, this, i), a && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var s;
    typeof this._$AH == "function" ? this._$AH.call(((s = this.options) == null ? void 0 : s.host) ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class pt {
  constructor(e, s, i) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = s, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    z(this, e);
  }
}
const Q = M.litHtmlPolyfillSupport;
Q == null || Q(j, W), (M.litHtmlVersions ?? (M.litHtmlVersions = [])).push("3.3.3");
const ft = (t, e, s) => {
  const i = (s == null ? void 0 : s.renderBefore) ?? e;
  let n = i._$litPart$;
  if (n === void 0) {
    const a = (s == null ? void 0 : s.renderBefore) ?? null;
    i._$litPart$ = n = new W(e.insertBefore(U(), a), a, void 0, s ?? {});
  }
  return n._$AI(t), n;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const k = globalThis;
class D extends O {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = ft(s, this.renderRoot, this.renderOptions);
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
    return P;
  }
}
var Te;
D._$litElement$ = !0, D.finalized = !0, (Te = k.litElementHydrateSupport) == null || Te.call(k, { LitElement: D });
const X = k.litElementPolyfillSupport;
X == null || X({ LitElement: D });
(k.litElementVersions ?? (k.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const He = (t) => (e, s) => {
  s !== void 0 ? s.addInitializer(() => {
    customElements.define(t, e);
  }) : customElements.define(t, e);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const mt = { attribute: !0, type: String, converter: K, reflect: !1, hasChanged: ae }, _t = (t = mt, e, s) => {
  const { kind: i, metadata: n } = s;
  let a = globalThis.litPropertyMetadata.get(n);
  if (a === void 0 && globalThis.litPropertyMetadata.set(n, a = /* @__PURE__ */ new Map()), i === "setter" && ((t = Object.create(t)).wrapped = !0), a.set(s.name, t), i === "accessor") {
    const { name: r } = s;
    return { set(c) {
      const o = e.get.call(this);
      e.set.call(this, c), this.requestUpdate(r, o, t, !0, c);
    }, init(c) {
      return c !== void 0 && this.C(r, void 0, t, c), c;
    } };
  }
  if (i === "setter") {
    const { name: r } = s;
    return function(c) {
      const o = this[r];
      e.call(this, c), this.requestUpdate(r, o, t, !0, c);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function ce(t) {
  return (e, s) => typeof s == "object" ? _t(t, e, s) : ((i, n, a) => {
    const r = n.hasOwnProperty(a);
    return n.constructor.createProperty(a, i), r ? Object.getOwnPropertyDescriptor(n, a) : void 0;
  })(t, e, s);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function $(t) {
  return ce({ ...t, state: !0, attribute: !1 });
}
const gt = "1.2.1", Le = "Day Brief", Me = "day-brief-card", Ue = "day-brief-card-editor", Fe = `
Du bist ein Home-Dashboard-Redakteur für einen Haushalt in Münster.

AUFGABE
Schreibe GENAU 2 bis 4 kurze Sätze auf Deutsch als Tagesbriefing.
Passe Ton und Inhalt an die Tageszeit an (Morgen / Vormittag / Nachmittag / Abend / Nacht).

MUSS enthalten (wenn Daten da sind)
1) Wetter jetzt in Alltagssprache + konkrete Kleidungsempfehlung
2) Regenprognose der nächsten Tage kurz nennen, wenn Regen/Schnee/Gewitter kommt
3) Wichtige Termine heute (Namen/Zeiten) — familiär formulieren, wenn Kontext bekannt
4) Solar kurz (Erzeugung/Verbrauch/Autarkie), falls Werte verfügbar
5) Müll/Abfall nur wenn relevant (Abholung bald/heute)

HAUSHALT
Nutze den Abschnitt [HAUSHALT], falls vorhanden (wer wohnt hier, Haustiere).
Sprich die Familie natürlich an; erfinde keine Extra-Details.

DARF NICHT
- Englisch schreiben
- Geräte steuern, Tools aufrufen, Rückfragen stellen
- Entity-IDs, Rohzustände oder "Nicht verfügbar" wiederholen
- Lange Aufzählungen oder Bulletpoints
- Über Dinge spekulieren, die nicht in den DATEN stehen

STIL
Warm, klar, praktisch. Wie eine kurze Nachricht an die Familie.
`.trim();
function Ae(t) {
  if (!t)
    return null;
  if (typeof t == "string") {
    const e = /^\d{4}-\d{2}-\d{2}$/.test(t);
    return { iso: t, allDay: e };
  }
  return t.dateTime ? { iso: t.dateTime, allDay: !1 } : t.date ? { iso: t.date, allDay: !0 } : null;
}
function yt(t, e) {
  var s, i, n;
  return ((i = (s = t.entities) == null ? void 0 : s[e]) == null ? void 0 : i.name) ?? (typeof ((n = t.states[e]) == null ? void 0 : n.attributes.friendly_name) == "string" ? t.states[e].attributes.friendly_name : e.replace(/^calendar\./, "").replace(/_/g, " "));
}
async function $t(t, e, s) {
  const i = [...new Set(e.filter(Boolean))];
  if (i.length === 0)
    return { events: [], errors: [] };
  const n = [];
  let a = {};
  try {
    const c = await t.callService(
      "calendar",
      "get_events",
      {
        duration: { hours: s }
      },
      { entity_id: i },
      !0,
      !0
    ), o = c && "response" in c ? c.response : void 0;
    o && typeof o == "object" && (a = o);
  } catch (c) {
    return n.push(
      c instanceof Error ? c.message : "Failed to load calendar events"
    ), { events: [], errors: n };
  }
  const r = [];
  for (const c of i) {
    const o = a[c];
    if (!o) {
      n.push(`No response for ${c}`);
      continue;
    }
    if (o.error) {
      n.push(`${c}: ${o.error}`);
      continue;
    }
    const h = yt(t, c);
    for (const l of o.events ?? []) {
      const u = Ae(l.start), _ = Ae(l.end);
      !u || !_ || r.push({
        summary: l.summary || "Busy",
        description: l.description,
        location: l.location,
        start: u.iso,
        end: _.iso,
        all_day: u.allDay || _.allDay,
        calendar_id: c,
        calendar_name: h
      });
    }
  }
  return r.sort((c, o) => c.start.localeCompare(o.start)), { events: r, errors: n };
}
function bt(t, e, s) {
  if (t.all_day)
    return "All day";
  const i = new Date(t.start);
  return Number.isNaN(i.getTime()) ? t.start : new Intl.DateTimeFormat(e, {
    hour: "numeric",
    minute: "2-digit",
    timeZone: s
  }).format(i);
}
function vt(t, e) {
  var s, i;
  return ((i = (s = t.entities) == null ? void 0 : s[e.entity_id]) == null ? void 0 : i.name) ?? (typeof e.attributes.friendly_name == "string" ? e.attributes.friendly_name : e.entity_id);
}
function wt(t, e) {
  if (t.formatEntityState)
    try {
      return t.formatEntityState(e);
    } catch {
    }
  const s = typeof e.attributes.unit_of_measurement == "string" ? e.attributes.unit_of_measurement : void 0;
  return s ? `${e.state} ${s}` : e.state;
}
function xt(t, e) {
  const s = [...new Set(e.filter(Boolean))], i = [], n = [];
  for (const a of s) {
    const r = t.states[a];
    if (!r) {
      n.push(a);
      continue;
    }
    i.push({
      entity_id: a,
      name: vt(t, r),
      state: wt(t, r),
      unit: typeof r.attributes.unit_of_measurement == "string" ? r.attributes.unit_of_measurement : void 0,
      domain: a.split(".")[0] ?? "unknown"
    });
  }
  return { entities: i, missing: n };
}
function At(t, e) {
  var a, r, c;
  const s = t.states[e];
  if (!s)
    return null;
  const i = s.attributes, n = ((r = (a = t.entities) == null ? void 0 : a[e]) == null ? void 0 : r.name) ?? (typeof i.friendly_name == "string" ? i.friendly_name : e);
  return {
    entity_id: e,
    condition: s.state,
    temperature: typeof i.temperature == "number" ? i.temperature : void 0,
    temperature_unit: typeof i.temperature_unit == "string" ? i.temperature_unit : (c = t.config.unit_system) == null ? void 0 : c.temperature,
    humidity: typeof i.humidity == "number" ? i.humidity : void 0,
    wind_speed: typeof i.wind_speed == "number" ? i.wind_speed : void 0,
    wind_speed_unit: typeof i.wind_speed_unit == "string" ? i.wind_speed_unit : void 0,
    friendly_name: n,
    forecast: []
  };
}
async function Et(t, e, s, i) {
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
function Ee(t) {
  return !t || t === "unknown" || t === "unavailable" ? "Weather unavailable" : t.replace(/_/g, " ");
}
function G(t, e) {
  if (typeof t != "number" || Number.isNaN(t))
    return "—";
  const s = Number.isInteger(t) ? String(t) : t.toFixed(1);
  if (!e)
    return `${s}°`;
  const i = e.includes("°") ? e : `°${e}`;
  return `${s}${i}`;
}
function Se(t, e) {
  return t === e ? !1 : !t || !e ? !0 : t.state !== e.state || t.last_updated !== e.last_updated || t.attributes.temperature !== e.attributes.temperature || t.attributes.humidity !== e.attributes.humidity;
}
const je = /* @__PURE__ */ new Set([
  "rainy",
  "pouring",
  "snowy",
  "snowy-rainy",
  "lightning-rainy",
  "hail"
]), I = /* @__PURE__ */ new Map(), St = {
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
function Ct(t) {
  let e = 0;
  for (let s = 0; s < t.length; s += 1)
    e = (e << 5) - e + t.charCodeAt(s), e |= 0;
  return String(e);
}
function kt(t) {
  return t.toLowerCase().startsWith("de");
}
function Tt(t, e) {
  const s = Number(
    new Intl.DateTimeFormat("en-GB", {
      hour: "numeric",
      hour12: !1,
      timeZone: e
    }).format(t)
  );
  return s < 5 ? "nacht" : s < 10 ? "morgen" : s < 12 ? "vormittag" : s < 17 ? "nachmittag" : s < 22 ? "abend" : "nacht";
}
function Nt(t, e) {
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
function Ie(t, e) {
  return !t || t === "unknown" || t === "unavailable" ? e ? "Wetter unklar" : "Weather unavailable" : e ? St[t] ?? t.replace(/_/g, " ") : t.replace(/_/g, " ");
}
function Ot(t, e) {
  if (!t || typeof t.temperature != "number")
    return null;
  const s = t.temperature, i = ["rainy", "pouring", "snowy-rainy", "lightning-rainy"].includes(
    t.condition
  ), n = t.condition === "snowy";
  return e ? n ? "Winterkleidung und feste Schuhe" : s <= 3 ? i ? "dicke Jacke und Regenschutz" : "dicke Jacke" : s <= 10 ? i ? "warme Jacke und Regenschirm" : "warme Jacke" : s <= 16 ? i ? "Übergangsjacke und Schirm" : "Übergangsjacke" : s <= 22 ? i ? "leichte Jacke und Schirm" : "leichte Kleidung" : i ? "luftige Kleidung und Schirm" : "leichte sommerliche Kleidung" : n ? "winter clothes and sturdy shoes" : s <= 3 ? i ? "heavy coat and rain gear" : "heavy coat" : s <= 10 ? i ? "warm jacket and umbrella" : "warm jacket" : s <= 16 ? i ? "light jacket and umbrella" : "light jacket" : s <= 22 ? i ? "light layer and umbrella" : "light clothes" : i ? "summer clothes and umbrella" : "summer clothes";
}
function Dt(t) {
  const e = t.trim().toLowerCase();
  return e === "unavailable" || e === "unknown" || e === "none" || e === "nicht verfügbar" || e === "unbekannt";
}
function Pt(t) {
  const e = [], s = [], i = [], n = [], a = [], r = [];
  for (const c of t) {
    if (Dt(c.state))
      continue;
    const o = c.entity_id.toLowerCase(), h = c.name.toLowerCase();
    c.domain === "person" || o.startsWith("person.") ? e.push(c) : o.includes("abfall") || o.includes("muell") || o.includes("mull") || o.includes("trash") || h.includes("abfall") || h.includes("müll") || h.includes("tonne") ? i.push(c) : o.includes("solar") || o.includes("solaredge") || o.includes("autark") || o.includes("produziert") || o.includes("exportiert") || o.includes("verbrauch") || o.includes("power_production") || h.includes("solar") || h.includes("autark") || h.includes("leistung") ? s.push(c) : o.includes("sun_up") || o.includes("sun_down") || h.includes("sonnenaufgang") || h.includes("sonnenuntergang") ? n.push(c) : o.includes("warn") || h.includes("warn") || h.includes("warnung") ? a.push(c) : r.push(c);
  }
  return { people: e, solar: s, trash: i, sun: n, alerts: a, other: r };
}
function zt(t, e) {
  const s = t.all_day ? e ? "ganztägig" : "all day" : t.start, i = t.calendar_name ? ` (${t.calendar_name})` : "";
  return `- ${s}: ${t.summary ?? (e ? "Belegt" : "Busy")}${i}`;
}
function N(t) {
  return `- ${t.name}: ${t.state}`;
}
function v(t, e, s) {
  return [`[${t}]`, e.length ? e.join(`
`) : s].join(`
`);
}
function We(t, e, s) {
  return t.datetime ? new Intl.DateTimeFormat(e, {
    weekday: "short",
    timeZone: s
  }).format(new Date(t.datetime)) : "?";
}
function Rt(t, e, s, i, n) {
  return t.slice(0, 6).map((a) => {
    const r = We(a, s, i), c = Ie(a.condition ?? "", n), o = G(
      a.temperature,
      e == null ? void 0 : e.temperature_unit
    ), h = a.condition && je.has(a.condition) ? n ? " · nass" : " · wet" : "";
    return `- ${r}: ${c}, ${o}${h}`;
  });
}
function Ht(t, e, s, i) {
  const n = t.slice(0, 6).filter((r) => r.condition && je.has(r.condition));
  if (n.length === 0)
    return null;
  const a = n.map((r) => We(r, e, s)).join(", ");
  return i ? `Regen/Schnee erwartet: ${a}` : `Rain/snow expected: ${a}`;
}
function Lt(t) {
  var w;
  const {
    german: e,
    dayLabel: s,
    partLabel: i,
    weather: n,
    weatherLine: a,
    clothing: r,
    rainLine: c,
    events: o,
    people: h,
    solar: l,
    trash: u,
    alerts: _
  } = t, d = [];
  if (e) {
    if (d.push(`Guten ${i} — ${s}.`), n && d.push(
      r ? `Draußen ${a}. Empfehlung: ${r}.` : `Draußen ${a}.`
    ), c && d.push(`${c}.`), o.length === 0)
      d.push("Heute stehen keine Termine an.");
    else {
      const m = o.slice(0, 3).map((b) => b.summary).filter(Boolean).join(", ");
      d.push(
        o.length === 1 ? `Termin: ${m}.` : `${o.length} Termine, u.a. ${m}.`
      );
    }
    if (l.length && d.push(
      `Solar: ${l.slice(0, 3).map((m) => `${m.name} ${m.state}`).join(", ")}.`
    ), u.length && d.push(
      `Müll: ${u.map((m) => `${m.name} ${m.state}`).join(", ")}.`
    ), _.length) {
      const m = _.filter((b) => b.state !== "0" && b.state !== "ok");
      m.length && d.push(
        `Hinweis: ${m.map((b) => `${b.name} ${b.state}`).join(", ")}.`
      );
    }
    h.length && d.push(
      `Zuhause/Status: ${h.map((m) => `${m.name} ${m.state}`).join(", ")}.`
    );
  } else
    d.push(`Good ${i} — ${s}.`), n && d.push(
      r ? `Outside: ${a}. Wear: ${r}.` : `Outside: ${a}.`
    ), c && d.push(`${c}.`), d.push(
      o.length === 0 ? "No meetings scheduled." : `${o.length} event(s), starting with ${((w = o[0]) == null ? void 0 : w.summary) ?? "Busy"}.`
    ), l.length && d.push(
      `Solar: ${l.slice(0, 3).map((m) => `${m.name} ${m.state}`).join(", ")}.`
    ), u.length && d.push(
      `Trash: ${u.map((m) => `${m.name} ${m.state}`).join(", ")}.`
    );
  return d.join(" ");
}
function Mt(t) {
  const {
    weather: e,
    forecast: s = (e == null ? void 0 : e.forecast) ?? [],
    events: i,
    entities: n,
    now: a,
    locale: r,
    timeZone: c,
    summaryPrompt: o,
    contextNotes: h
  } = t, l = kt(r), u = Tt(a, c), _ = Nt(u, l), d = new Intl.DateTimeFormat(r, {
    weekday: "long",
    month: "long",
    day: "numeric",
    timeZone: c
  }).format(a), w = new Intl.DateTimeFormat(r, {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: c
  }).format(a), m = e ? `${Ie(e.condition, l)}, ${G(
    e.temperature,
    e.temperature_unit
  )}${typeof e.humidity == "number" ? l ? `, Luftfeuchtigkeit ${e.humidity}%` : `, humidity ${e.humidity}%` : ""}` : l ? "Wetter nicht verfügbar" : "Weather unavailable", b = Ot(e, l), x = Pt(n), Ke = Rt(
    s,
    e,
    r,
    c,
    l
  ), he = Ht(s, r, c, l), Ve = i.length === 0 ? [] : i.slice(0, 12).map((q) => zt(q, l)), Ge = (o == null ? void 0 : o.trim()) || Fe, ue = h == null ? void 0 : h.trim(), Ze = [
    v(
      l ? "ZEIT" : "TIME",
      [
        l ? `Datum: ${d}` : `Date: ${d}`,
        l ? `Uhrzeit: ${w}` : `Time: ${w}`,
        l ? `Tageszeit: ${_}` : `Time of day: ${_}`
      ],
      ""
    ),
    ...ue ? [
      v(
        l ? "HAUSHALT" : "HOUSEHOLD",
        ue.split(`
`).map((q) => q.trim()).filter(Boolean),
        ""
      )
    ] : [],
    v(
      l ? "WETTER" : "WEATHER",
      [
        m,
        b ? l ? `Kleidungshinweis: ${b}` : `Clothing hint: ${b}` : "",
        he ?? ""
      ].filter(Boolean),
      l ? "Keine Wetterdaten." : "No weather data."
    ),
    v(
      l ? "VORHERSAGE" : "FORECAST",
      Ke,
      l ? "Keine Vorhersage." : "No forecast."
    ),
    v(
      l ? "TERMINE" : "AGENDA",
      Ve,
      l ? "Keine Termine." : "No meetings."
    ),
    v(
      l ? "PERSONEN" : "PEOPLE",
      x.people.map(N),
      l ? "Keine Personendaten." : "No people data."
    ),
    v(
      "SOLAR",
      x.solar.map(N),
      l ? "Keine Solarwerte (oder nicht verfügbar)." : "No solar data."
    ),
    v(
      l ? "MUELL" : "TRASH",
      x.trash.map(N),
      l ? "Keine Mülldaten." : "No trash data."
    ),
    v(
      l ? "SONNE" : "SUN",
      x.sun.map(N),
      l ? "Keine Sonnenzeiten." : "No sun times."
    ),
    v(
      l ? "WARNUNGEN" : "ALERTS",
      x.alerts.map(N),
      l ? "Keine Warnungen." : "No alerts."
    ),
    v(
      l ? "SONSTIGES" : "OTHER",
      x.other.map(N),
      l ? "Nichts weiteres." : "Nothing else."
    )
  ], de = [
    Ge,
    "",
    l ? "DATEN (nur diese Fakten verwenden; fehlende/ungültige Werte weglassen):" : "DATA (use only these facts; skip missing/invalid values):",
    Ze.join(`

`),
    "",
    l ? "ANTWORT: Nur der fertige deutsche Fließtext, nichts sonst." : "RESPONSE: Only the finished brief text, nothing else."
  ].join(`
`), qe = Lt({
    german: l,
    dayLabel: d,
    partLabel: _,
    weather: e,
    weatherLine: m,
    clothing: b,
    rainLine: he,
    events: i,
    people: x.people,
    solar: x.solar,
    trash: x.trash,
    alerts: x.alerts
  });
  return {
    hash: Ct(de),
    prompt: de,
    local: qe
  };
}
function Be(t) {
  if (!t) {
    I.clear();
    return;
  }
  I.delete(t);
}
function Ut(t, e) {
  const s = I.get(t);
  return s ? s.hash !== e || s.expiresAt < Date.now() ? (I.delete(t), null) : s : null;
}
function ee(t, e, s, i, n) {
  I.set(t, {
    hash: e,
    text: s,
    source: i,
    expiresAt: Date.now() + Math.max(1, n) * 6e4
  });
}
async function Ft(t, e, s) {
  var a, r, c, o, h, l;
  const i = await t.callWS({
    type: "conversation/process",
    text: s,
    language: ((a = t.locale) == null ? void 0 : a.language) ?? t.config.language ?? "en",
    agent_id: e
  });
  return ((r = i.response) == null ? void 0 : r.response_type) === "error" ? null : ((l = (h = (o = (c = i.response) == null ? void 0 : c.speech) == null ? void 0 : o.plain) == null ? void 0 : h.speech) == null ? void 0 : l.trim()) || null;
}
async function jt(t) {
  const { hass: e, mode: s, agentId: i, digest: n, cacheKey: a, cacheMinutes: r, force: c } = t;
  if (c)
    Be(a);
  else {
    const o = Ut(a, n.hash);
    if (o)
      return { text: o.text, source: o.source };
  }
  if (s === "local")
    return ee(a, n.hash, n.local, "local", r), { text: n.local, source: "local" };
  try {
    const o = await Ft(e, i, n.prompt);
    if (o)
      return ee(a, n.hash, o, "ai", r), { text: o, source: "ai" };
  } catch {
  }
  return ee(a, n.hash, n.local, "local", r), { text: n.local, source: "local" };
}
const It = Oe`
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
var Wt = Object.defineProperty, Bt = Object.getOwnPropertyDescriptor, y = (t, e, s, i) => {
  for (var n = i > 1 ? void 0 : i ? Bt(e, s) : e, a = t.length - 1, r; a >= 0; a--)
    (r = t[a]) && (n = (i ? r(e, s, n) : r(n)) || n);
  return i && n && Wt(e, s, n), n;
};
const te = "daily", se = 24, Ce = 15, ie = "auto", Kt = 15 * 6e4;
let g = class extends D {
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
    return await Promise.resolve().then(() => Yt), document.createElement(Ue);
  }
  setConfig(t) {
    if (!t)
      throw new Error("Invalid configuration");
    this._config = {
      forecast_type: te,
      horizon_hours: se,
      summary_mode: ie,
      cache_minutes: Ce,
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
    var e, s, i, n, a, r, c, o;
    if (t.has("_config") || t.has("_weather") || t.has("_forecast") || t.has("_entities") || t.has("_events") || t.has("_summary") || t.has("_summarySource") || t.has("_errors") || t.has("_loadingEvents") || t.has("_refreshing") || t.has("_contextOpen") || t.has("_now"))
      return !0;
    if (t.has("hass")) {
      const h = t.get("hass");
      if ((e = this._config) != null && e.weather_entity && Se(
        (s = h == null ? void 0 : h.states) == null ? void 0 : s[this._config.weather_entity],
        (n = (i = this.hass) == null ? void 0 : i.states) == null ? void 0 : n[this._config.weather_entity]
      ))
        return !0;
      for (const l of ((a = this._config) == null ? void 0 : a.entities) ?? [])
        if (Se((r = h == null ? void 0 : h.states) == null ? void 0 : r[l], (o = (c = this.hass) == null ? void 0 : c.states) == null ? void 0 : o[l]))
          return !0;
    }
    return !1;
  }
  _startRefreshLoop() {
    this._stopRefreshLoop(), this._refreshData(!0), this._refreshTimer = window.setInterval(() => {
      this._refreshData(!1);
    }, Kt);
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
      this._config.summary_mode ?? ie,
      this._config.agent_id ?? "",
      this._config.summary_prompt ?? "",
      this._config.context_notes ?? ""
    ].join("|");
  }
  _syncWeatherFromHass() {
    const t = this._config.weather_entity;
    if (!t) {
      this._weather = null;
      return;
    }
    const e = At(this.hass, t);
    if (!e) {
      this._weather = null, this._pushError(`Weather entity not found: ${t}`);
      return;
    }
    this._weather = { ...e, forecast: this._forecast };
  }
  _syncEntitiesFromHass() {
    const { entities: t, missing: e } = xt(
      this.hass,
      this._config.entities ?? []
    );
    this._entities = t;
    for (const s of e)
      this._pushError(`Entity not found: ${s}`);
  }
  async _ensureForecastSubscription() {
    const t = this._config.weather_entity, e = this._config.forecast_type ?? te;
    if (!(this._unsubForecast && this._lastWeatherEntity === t && this._lastForecastType === e)) {
      if (this._teardownForecast(), this._lastWeatherEntity = t, this._lastForecastType = e, !t || e === "none" || !this.hass) {
        this._forecast = [];
        return;
      }
      try {
        this._unsubForecast = await Et(
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
      this._refreshing = !0, Be(this._cacheKey());
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
    const n = this._config.calendars ?? [], a = this._config.horizon_hours ?? se, { events: r, errors: c } = await $t(
      this.hass,
      n,
      a
    );
    if (s === this._fetchGeneration) {
      this._events = r, i.push(...c), this._loadingEvents = !1, this._config.weather_entity ? this.hass.states[this._config.weather_entity] || i.push(`Weather entity not found: ${this._config.weather_entity}`) : i.push("No weather_entity configured");
      for (const o of this._config.entities ?? [])
        this.hass.states[o] || i.push(`Entity not found: ${o}`);
      this._errors = [...new Set(i)].slice(-6), await this._refreshSummary(t, e);
    }
  }
  async _refreshSummary(t, e = !1) {
    var o;
    if (!this.hass || !this._config)
      return;
    const s = this._config.summary_mode ?? ie, i = this._config.cache_minutes ?? Ce, n = ((o = this.hass.locale) == null ? void 0 : o.language) ?? "en", a = this.hass.config.time_zone, r = Mt({
      weather: this._weather,
      forecast: this._forecast,
      events: this._events,
      entities: this._entities,
      now: /* @__PURE__ */ new Date(),
      locale: n,
      timeZone: a,
      summaryPrompt: this._config.summary_prompt,
      contextNotes: this._config.context_notes
    }), c = this._cacheKey();
    (t || e || !this._summary || this._summarySource === "loading") && (this._summarySource = "loading");
    try {
      const h = await jt({
        hass: this.hass,
        mode: s,
        agentId: this._config.agent_id,
        digest: r,
        cacheKey: c,
        cacheMinutes: i,
        force: e
      });
      this._summary = h.text, this._summarySource = h.source;
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
    const e = ((a = this.hass.locale) == null ? void 0 : a.language) ?? "en", s = this.hass.config.time_zone, i = this._config.forecast_type ?? te, n = new Date(t.datetime);
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
      return p;
    const t = ((n = (i = this.hass) == null ? void 0 : i.locale) == null ? void 0 : n.language) ?? "en", e = ((a = this.hass) == null ? void 0 : a.config.time_zone) ?? "UTC", s = this._weather;
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
            ` : p}

        <div class="sections">
          <section>
            <h3 class="section-title">Weather</h3>
            ${s ? f`
                  <div class="weather-row">
                    <p class="condition">
                      ${Ee(s.condition)}
                    </p>
                    <p class="temp">
                      ${G(
      s.temperature,
      s.temperature_unit
    )}
                    </p>
                  </div>
                  <p class="weather-meta">
                    ${s.friendly_name ?? s.entity_id}
                    ${typeof s.humidity == "number" ? f` · ${s.humidity}% humidity` : p}
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
                                  >${Ee(
        r.condition ?? ""
      )}</span
                                >
                                <span class="forecast-temp"
                                  >${G(
        r.temperature,
        s.temperature_unit
      )}</span
                                >
                              </div>
                            `
    )}
                        </div>
                      ` : p}
                ` : f`<p class="empty">Configure a weather entity to begin.</p>`}
          </section>

          <section>
            <h3 class="section-title">Meetings</h3>
            ${this._loadingEvents && this._events.length === 0 ? f`<p class="empty loading">Loading calendars…</p>` : this._events.length === 0 ? f`<p class="empty">
                    No meetings in the next
                    ${this._config.horizon_hours ?? se} hours.
                  </p>` : f`
                    <ul class="events">
                      ${this._events.map(
      (r) => f`
                          <li class="event">
                            <span class="event-time"
                              >${bt(
        r,
        t,
        e
      )}</span
                            >
                            <div class="event-body">
                              <p class="event-title">${r.summary}</p>
                              ${r.calendar_name ? f`<p class="event-cal">
                                    ${r.calendar_name}${r.location ? ` · ${r.location}` : ""}
                                  </p>` : p}
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
                      ` : p}
                </section>
              ` : p}
        </div>

        ${this._errors.length ? f`
              <div class="errors">
                ${this._errors.map(
      (r) => f`<span class="error-chip">${r}</span>`
    )}
              </div>
            ` : p}
      </ha-card>
    `;
  }
};
g.styles = It;
y([
  ce({ attribute: !1 })
], g.prototype, "hass", 2);
y([
  $()
], g.prototype, "_config", 2);
y([
  $()
], g.prototype, "_weather", 2);
y([
  $()
], g.prototype, "_forecast", 2);
y([
  $()
], g.prototype, "_events", 2);
y([
  $()
], g.prototype, "_entities", 2);
y([
  $()
], g.prototype, "_summary", 2);
y([
  $()
], g.prototype, "_summarySource", 2);
y([
  $()
], g.prototype, "_errors", 2);
y([
  $()
], g.prototype, "_loadingEvents", 2);
y([
  $()
], g.prototype, "_refreshing", 2);
y([
  $()
], g.prototype, "_contextOpen", 2);
y([
  $()
], g.prototype, "_now", 2);
g = y([
  He(Me)
], g);
window.customCards = window.customCards || [];
window.customCards.push({
  type: Me,
  name: Le,
  description: "AI-first day brief with weather, calendars, extra entities, and a short narrative.",
  preview: !0,
  documentationURL: "https://github.com/jenskock/lovelace-day-brief"
});
console.info(
  `%c ${Le} %c ${gt} `,
  "color:#fff;background:#03a9f4;font-weight:700",
  "color:#03a9f4;background:transparent;font-weight:700"
);
var Vt = Object.defineProperty, Gt = Object.getOwnPropertyDescriptor, le = (t, e, s, i) => {
  for (var n = i > 1 ? void 0 : i ? Gt(e, s) : e, a = t.length - 1, r; a >= 0; a--)
    (r = t[a]) && (n = (i ? r(e, s, n) : r(n)) || n);
  return i && n && Vt(e, s, n), n;
};
const Zt = [
  "daily",
  "hourly",
  "twice_daily",
  "none"
], qt = ["auto", "ai", "local"];
function Jt(t, e) {
  t.dispatchEvent(
    new CustomEvent("config-changed", {
      detail: { config: e },
      bubbles: !0,
      composed: !0
    })
  );
}
function ke(t) {
  return [
    ...new Set(
      t.split(/[\n,]/).map((e) => e.trim()).filter(Boolean)
    )
  ];
}
let R = class extends D {
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
    this._config = e, Jt(this, e);
  }
  _value(t) {
    return t.target.value;
  }
  _onWeather(t) {
    this._update({ weather_entity: this._value(t) || void 0 });
  }
  _onCalendars(t) {
    this._update({ calendars: ke(this._value(t)) });
  }
  _onEntities(t) {
    this._update({ entities: ke(this._value(t)) });
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
      return p;
    const t = this._config.calendars ?? [], e = this._config.entities ?? [], s = this._weatherEntities(), i = this._calendarEntities();
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
            ${s.map(
      (n) => f`<option
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
          ${i.length === 0 ? f`
                <textarea
                  rows="3"
                  placeholder="calendar.personal, calendar.work"
                  .value=${t.join(`
`)}
                  @change=${this._onCalendars}
                ></textarea>
              ` : f`
                <div class="checks">
                  ${i.map(
      (n) => f`
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
            ${Zt.map(
      (n) => f`<option
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
            ${qt.map(
      (n) => f`<option
                  value=${n}
                  ?selected=${(this._config.summary_mode ?? "auto") === n}
                >
                  ${n}
                </option>`
    )}
          </select>
        </label>

        <label>
          Household / context notes
          <textarea
            rows="3"
            placeholder="Familie: Jens, Jenny, Ella (Tochter). Hund: Milo."
            .value=${this._config.context_notes ?? ""}
            @change=${this._onContextNotes}
          ></textarea>
        </label>

        <label>
          System prompt
          <textarea
            rows="5"
            placeholder=${Fe}
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
R.styles = Oe`
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
le([
  ce({ attribute: !1 })
], R.prototype, "hass", 2);
le([
  $()
], R.prototype, "_config", 2);
R = le([
  He(Ue)
], R);
const Yt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get DayBriefCardEditor() {
    return R;
  }
}, Symbol.toStringTag, { value: "Module" }));
export {
  g as DayBriefCard
};
//# sourceMappingURL=day-brief.js.map
