/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const X = globalThis, _e = X.ShadowRoot && (X.ShadyCSS === void 0 || X.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, ye = Symbol(), ke = /* @__PURE__ */ new WeakMap();
let Ke = class {
  constructor(e, n, s) {
    if (this._$cssResult$ = !0, s !== ye) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
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
const dt = (t) => new Ke(typeof t == "string" ? t : t + "", void 0, ye), Ge = (t, ...e) => {
  const n = t.length === 1 ? t[0] : e.reduce((s, i, a) => s + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + t[a + 1], t[0]);
  return new Ke(n, t, ye);
}, pt = (t, e) => {
  if (_e) t.adoptedStyleSheets = e.map((n) => n instanceof CSSStyleSheet ? n : n.styleSheet);
  else for (const n of e) {
    const s = document.createElement("style"), i = X.litNonce;
    i !== void 0 && s.setAttribute("nonce", i), s.textContent = n.cssText, t.appendChild(s);
  }
}, Se = _e ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let n = "";
  for (const s of e.cssRules) n += s.cssText;
  return dt(n);
})(t) : t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: mt, defineProperty: ft, getOwnPropertyDescriptor: gt, getOwnPropertyNames: _t, getOwnPropertySymbols: yt, getPrototypeOf: $t } = Object, C = globalThis, Te = C.trustedTypes, bt = Te ? Te.emptyScript : "", re = C.reactiveElementPolyfillSupport, G = (t, e) => t, ee = { toAttribute(t, e) {
  switch (e) {
    case Boolean:
      t = t ? bt : null;
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
} }, $e = (t, e) => !mt(t, e), Ne = { attribute: !0, type: String, converter: ee, reflect: !1, useDefault: !1, hasChanged: $e };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), C.litPropertyMetadata ?? (C.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let z = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, n = Ne) {
    if (n.state && (n.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((n = Object.create(n)).wrapped = !0), this.elementProperties.set(e, n), !n.noAccessor) {
      const s = Symbol(), i = this.getPropertyDescriptor(e, s, n);
      i !== void 0 && ft(this.prototype, e, i);
    }
  }
  static getPropertyDescriptor(e, n, s) {
    const { get: i, set: a } = gt(this.prototype, e) ?? { get() {
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
    return this.elementProperties.get(e) ?? Ne;
  }
  static _$Ei() {
    if (this.hasOwnProperty(G("elementProperties"))) return;
    const e = $t(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(G("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(G("properties"))) {
      const n = this.properties, s = [..._t(n), ...yt(n)];
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
    return pt(e, this.constructor.elementStyles), e;
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
      const r = (((a = s.converter) == null ? void 0 : a.toAttribute) !== void 0 ? s.converter : ee).toAttribute(n, s.type);
      this._$Em = e, r == null ? this.removeAttribute(i) : this.setAttribute(i, r), this._$Em = null;
    }
  }
  _$AK(e, n) {
    var a, r;
    const s = this.constructor, i = s._$Eh.get(e);
    if (i !== void 0 && this._$Em !== i) {
      const o = s.getPropertyOptions(i), c = typeof o.converter == "function" ? { fromAttribute: o.converter } : ((a = o.converter) == null ? void 0 : a.fromAttribute) !== void 0 ? o.converter : ee;
      this._$Em = i;
      const u = c.fromAttribute(n, o.type);
      this[i] = u ?? ((r = this._$Ej) == null ? void 0 : r.get(i)) ?? u, this._$Em = null;
    }
  }
  requestUpdate(e, n, s, i = !1, a) {
    var r;
    if (e !== void 0) {
      const o = this.constructor;
      if (i === !1 && (a = this[e]), s ?? (s = o.getPropertyOptions(e)), !((s.hasChanged ?? $e)(a, n) || s.useDefault && s.reflect && a === ((r = this._$Ej) == null ? void 0 : r.get(e)) && !this.hasAttribute(o._$Eu(e, s)))) return;
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
z.elementStyles = [], z.shadowRootOptions = { mode: "open" }, z[G("elementProperties")] = /* @__PURE__ */ new Map(), z[G("finalized")] = /* @__PURE__ */ new Map(), re == null || re({ ReactiveElement: z }), (C.reactiveElementVersions ?? (C.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const V = globalThis, Ce = (t) => t, te = V.trustedTypes, Oe = te ? te.createPolicy("lit-html", { createHTML: (t) => t }) : void 0, Ve = "$lit$", T = `lit$${Math.random().toFixed(9).slice(2)}$`, Ye = "?" + T, wt = `<${Ye}>`, U = document, Y = () => U.createComment(""), Z = (t) => t === null || typeof t != "object" && typeof t != "function", be = Array.isArray, vt = (t) => be(t) || typeof (t == null ? void 0 : t[Symbol.iterator]) == "function", ae = `[ 	
\f\r]`, K = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, De = /-->/g, Le = />/g, D = RegExp(`>|${ae}(?:([^\\s"'>=/]+)(${ae}*=${ae}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Pe = /'/g, Ue = /"/g, Ze = /^(?:script|style|textarea|title)$/i, xt = (t) => (e, ...n) => ({ _$litType$: t, strings: e, values: n }), m = xt(1), H = Symbol.for("lit-noChange"), f = Symbol.for("lit-nothing"), Re = /* @__PURE__ */ new WeakMap(), L = U.createTreeWalker(U, 129);
function qe(t, e) {
  if (!be(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Oe !== void 0 ? Oe.createHTML(e) : e;
}
const At = (t, e) => {
  const n = t.length - 1, s = [];
  let i, a = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", r = K;
  for (let o = 0; o < n; o++) {
    const c = t[o];
    let u, d, h = -1, l = 0;
    for (; l < c.length && (r.lastIndex = l, d = r.exec(c), d !== null); ) l = r.lastIndex, r === K ? d[1] === "!--" ? r = De : d[1] !== void 0 ? r = Le : d[2] !== void 0 ? (Ze.test(d[2]) && (i = RegExp("</" + d[2], "g")), r = D) : d[3] !== void 0 && (r = D) : r === D ? d[0] === ">" ? (r = i ?? K, h = -1) : d[1] === void 0 ? h = -2 : (h = r.lastIndex - d[2].length, u = d[1], r = d[3] === void 0 ? D : d[3] === '"' ? Ue : Pe) : r === Ue || r === Pe ? r = D : r === De || r === Le ? r = K : (r = D, i = void 0);
    const w = r === D && t[o + 1].startsWith("/>") ? " " : "";
    a += r === K ? c + wt : h >= 0 ? (s.push(u), c.slice(0, h) + Ve + c.slice(h) + T + w) : c + T + (h === -2 ? o : w);
  }
  return [qe(t, a + (t[n] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), s];
};
class q {
  constructor({ strings: e, _$litType$: n }, s) {
    let i;
    this.parts = [];
    let a = 0, r = 0;
    const o = e.length - 1, c = this.parts, [u, d] = At(e, n);
    if (this.el = q.createElement(u, s), L.currentNode = this.el.content, n === 2 || n === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (i = L.nextNode()) !== null && c.length < o; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const h of i.getAttributeNames()) if (h.endsWith(Ve)) {
          const l = d[r++], w = i.getAttribute(h).split(T), A = /([.?@])?(.*)/.exec(l);
          c.push({ type: 1, index: a, name: A[2], strings: w, ctor: A[1] === "." ? kt : A[1] === "?" ? St : A[1] === "@" ? Tt : ie }), i.removeAttribute(h);
        } else h.startsWith(T) && (c.push({ type: 6, index: a }), i.removeAttribute(h));
        if (Ze.test(i.tagName)) {
          const h = i.textContent.split(T), l = h.length - 1;
          if (l > 0) {
            i.textContent = te ? te.emptyScript : "";
            for (let w = 0; w < l; w++) i.append(h[w], Y()), L.nextNode(), c.push({ type: 2, index: ++a });
            i.append(h[l], Y());
          }
        }
      } else if (i.nodeType === 8) if (i.data === Ye) c.push({ type: 2, index: a });
      else {
        let h = -1;
        for (; (h = i.data.indexOf(T, h + 1)) !== -1; ) c.push({ type: 7, index: a }), h += T.length - 1;
      }
      a++;
    }
  }
  static createElement(e, n) {
    const s = U.createElement("template");
    return s.innerHTML = e, s;
  }
}
function I(t, e, n = t, s) {
  var r, o;
  if (e === H) return e;
  let i = s !== void 0 ? (r = n._$Co) == null ? void 0 : r[s] : n._$Cl;
  const a = Z(e) ? void 0 : e._$litDirective$;
  return (i == null ? void 0 : i.constructor) !== a && ((o = i == null ? void 0 : i._$AO) == null || o.call(i, !1), a === void 0 ? i = void 0 : (i = new a(t), i._$AT(t, n, s)), s !== void 0 ? (n._$Co ?? (n._$Co = []))[s] = i : n._$Cl = i), i !== void 0 && (e = I(t, i._$AS(t, e.values), i, s)), e;
}
class Et {
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
    const { el: { content: n }, parts: s } = this._$AD, i = ((e == null ? void 0 : e.creationScope) ?? U).importNode(n, !0);
    L.currentNode = i;
    let a = L.nextNode(), r = 0, o = 0, c = s[0];
    for (; c !== void 0; ) {
      if (r === c.index) {
        let u;
        c.type === 2 ? u = new Q(a, a.nextSibling, this, e) : c.type === 1 ? u = new c.ctor(a, c.name, c.strings, this, e) : c.type === 6 && (u = new Nt(a, this, e)), this._$AV.push(u), c = s[++o];
      }
      r !== (c == null ? void 0 : c.index) && (a = L.nextNode(), r++);
    }
    return L.currentNode = U, i;
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
    e = I(this, e, n), Z(e) ? e === f || e == null || e === "" ? (this._$AH !== f && this._$AR(), this._$AH = f) : e !== this._$AH && e !== H && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : vt(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== f && Z(this._$AH) ? this._$AA.nextSibling.data = e : this.T(U.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var a;
    const { values: n, _$litType$: s } = e, i = typeof s == "number" ? this._$AC(e) : (s.el === void 0 && (s.el = q.createElement(qe(s.h, s.h[0]), this.options)), s);
    if (((a = this._$AH) == null ? void 0 : a._$AD) === i) this._$AH.p(n);
    else {
      const r = new Et(i, this), o = r.u(this.options);
      r.p(n), this.T(o), this._$AH = r;
    }
  }
  _$AC(e) {
    let n = Re.get(e.strings);
    return n === void 0 && Re.set(e.strings, n = new q(e)), n;
  }
  k(e) {
    be(this._$AH) || (this._$AH = [], this._$AR());
    const n = this._$AH;
    let s, i = 0;
    for (const a of e) i === n.length ? n.push(s = new Q(this.O(Y()), this.O(Y()), this, this.options)) : s = n[i], s._$AI(a), i++;
    i < n.length && (this._$AR(s && s._$AB.nextSibling, i), n.length = i);
  }
  _$AR(e = this._$AA.nextSibling, n) {
    var s;
    for ((s = this._$AP) == null ? void 0 : s.call(this, !1, !0, n); e !== this._$AB; ) {
      const i = Ce(e).nextSibling;
      Ce(e).remove(), e = i;
    }
  }
  setConnected(e) {
    var n;
    this._$AM === void 0 && (this._$Cv = e, (n = this._$AP) == null || n.call(this, e));
  }
}
class ie {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, n, s, i, a) {
    this.type = 1, this._$AH = f, this._$AN = void 0, this.element = e, this.name = n, this._$AM = i, this.options = a, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = f;
  }
  _$AI(e, n = this, s, i) {
    const a = this.strings;
    let r = !1;
    if (a === void 0) e = I(this, e, n, 0), r = !Z(e) || e !== this._$AH && e !== H, r && (this._$AH = e);
    else {
      const o = e;
      let c, u;
      for (e = a[0], c = 0; c < a.length - 1; c++) u = I(this, o[s + c], n, c), u === H && (u = this._$AH[c]), r || (r = !Z(u) || u !== this._$AH[c]), u === f ? e = f : e !== f && (e += (u ?? "") + a[c + 1]), this._$AH[c] = u;
    }
    r && !i && this.j(e);
  }
  j(e) {
    e === f ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class kt extends ie {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === f ? void 0 : e;
  }
}
class St extends ie {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== f);
  }
}
class Tt extends ie {
  constructor(e, n, s, i, a) {
    super(e, n, s, i, a), this.type = 5;
  }
  _$AI(e, n = this) {
    if ((e = I(this, e, n, 0) ?? f) === H) return;
    const s = this._$AH, i = e === f && s !== f || e.capture !== s.capture || e.once !== s.once || e.passive !== s.passive, a = e !== f && (s === f || i);
    i && this.element.removeEventListener(this.name, this, s), a && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var n;
    typeof this._$AH == "function" ? this._$AH.call(((n = this.options) == null ? void 0 : n.host) ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class Nt {
  constructor(e, n, s) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = n, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    I(this, e);
  }
}
const oe = V.litHtmlPolyfillSupport;
oe == null || oe(q, Q), (V.litHtmlVersions ?? (V.litHtmlVersions = [])).push("3.3.3");
const Ct = (t, e, n) => {
  const s = (n == null ? void 0 : n.renderBefore) ?? e;
  let i = s._$litPart$;
  if (i === void 0) {
    const a = (n == null ? void 0 : n.renderBefore) ?? null;
    s._$litPart$ = i = new Q(e.insertBefore(Y(), a), a, void 0, n ?? {});
  }
  return i._$AI(t), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const P = globalThis;
class M extends z {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Ct(n, this.renderRoot, this.renderOptions);
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
    return H;
  }
}
var Be;
M._$litElement$ = !0, M.finalized = !0, (Be = P.litElementHydrateSupport) == null || Be.call(P, { LitElement: M });
const ce = P.litElementPolyfillSupport;
ce == null || ce({ LitElement: M });
(P.litElementVersions ?? (P.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Je = (t) => (e, n) => {
  n !== void 0 ? n.addInitializer(() => {
    customElements.define(t, e);
  }) : customElements.define(t, e);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ot = { attribute: !0, type: String, converter: ee, reflect: !1, hasChanged: $e }, Dt = (t = Ot, e, n) => {
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
function we(t) {
  return (e, n) => typeof n == "object" ? Dt(t, e, n) : ((s, i, a) => {
    const r = i.hasOwnProperty(a);
    return i.constructor.createProperty(a, s), r ? Object.getOwnPropertyDescriptor(i, a) : void 0;
  })(t, e, n);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function x(t) {
  return we({ ...t, state: !0, attribute: !1 });
}
const Lt = "1.6.5", Qe = "Day Brief", Xe = "day-brief-card", et = "day-brief-card-editor", tt = `
Du bist ein Home-Dashboard-Redakteur für eine Familien-Tageskarte.

ZIEL
Schreibe GENAU 3 kurze Sätze auf Deutsch. Immer dieselbe Reihenfolge. Wenig Variation.

FESTE STRUKTUR (immer so)
Satz 1: Begrüßung passend zur Tageszeit + Wetter jetzt mit Temperatur + kurze Kleidungsempfehlung.
Satz 2: Nur das Wichtigste für HEUTE: Termine und/oder Müll-Aktion (siehe Regel unten). Wenn beides fehlt: Morgenwetter kurz (nur wenn nass/schneit).
Satz 3: Ein warmer Abschluss. Haustier aus [HAUSHALT] höchstens einmal kurz erwähnen, sonst ein kurzer Familienwunsch.

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
- Heutige Termine aus [TERMINE]
- Geburtstage in den nächsten 14 Tagen aus [GEBURTSTAGE] (Alter nennen wenn bekannt)
- Morgens an Schultagen: kurz [STUNDENPLAN] (jetzt / als Nächstes)
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
- Jeden Tag komplett andere Formulierungsmuster

STIL
Warm, ruhig, praktisch. Wie eine kurze feste Morgen-/Abendnotiz an die Familie — nicht wie freies Storytelling.
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
function Pt(t, e) {
  var n, s, i;
  return ((s = (n = t.entities) == null ? void 0 : n[e]) == null ? void 0 : s.name) ?? (typeof ((i = t.states[e]) == null ? void 0 : i.attributes.friendly_name) == "string" ? t.states[e].attributes.friendly_name : e.replace(/^calendar\./, "").replace(/_/g, " "));
}
async function Ut(t, e, n) {
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
    const u = Pt(t, o);
    for (const d of c.events ?? []) {
      const h = ze(d.start), l = ze(d.end);
      !h || !l || r.push({
        summary: d.summary || "Busy",
        description: d.description,
        location: d.location,
        start: h.iso,
        end: l.iso,
        all_day: h.allDay || l.allDay,
        calendar_id: o,
        calendar_name: u
      });
    }
  }
  return r.sort((o, c) => o.start.localeCompare(c.start)), { events: r, errors: i };
}
function Rt(t, e, n) {
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
function Mt(t, e) {
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
      state: Mt(t, r),
      unit: typeof r.attributes.unit_of_measurement == "string" ? r.attributes.unit_of_measurement : void 0,
      domain: a.split(".")[0] ?? "unknown"
    });
  }
  return { entities: s, missing: i };
}
const Me = "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA";
class It {
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
function Ft(t) {
  return t.replace(/\*\*([^*]+)\*\*/g, "$1").replace(/\*([^*]+)\*/g, "$1");
}
function jt(t) {
  const e = t.trim();
  if (!e)
    return f;
  const n = e.split(/\n{2,}/);
  return m`${n.map((s, i) => {
    const a = Wt(s.trim().replace(/\n/g, " "));
    return m`${i > 0 ? m`<br /><br />` : f}${a}`;
  })}`;
}
function Wt(t) {
  const e = [], n = /\*\*([^*]+)\*\*/g;
  let s = 0, i;
  for (; (i = n.exec(t)) !== null; )
    i.index > s && e.push(t.slice(s, i.index)), e.push(m`<strong>${i[1]}</strong>`), s = i.index + i[0].length;
  return s < t.length && e.push(t.slice(s)), m`${e}`;
}
function Bt(t) {
  const e = /^(\d{4})-(\d{2})-(\d{2})$/.exec(t.trim());
  if (!e)
    return null;
  const n = Number(e[1]), s = Number(e[2]), i = Number(e[3]);
  return !n || s < 1 || s > 12 || i < 1 || i > 31 ? null : { year: n, month: s, day: i };
}
function Kt(t, e) {
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
function le(t, e, n) {
  return Date.UTC(t, e - 1, n) / 864e5;
}
function Gt(t, e, n, s = 14) {
  const i = Kt(e, n), a = le(i.year, i.month, i.day), r = [];
  for (const o of t) {
    const c = Bt(o.date);
    if (!c || !o.name.trim())
      continue;
    let u = i.year, d = le(u, c.month, c.day);
    d < a && (u += 1, d = le(u, c.month, c.day));
    const h = d - a;
    h < 0 || h > s || r.push({
      name: o.name.trim(),
      date: `${String(c.month).padStart(2, "0")}-${String(c.day).padStart(2, "0")}`,
      daysUntil: h,
      ageTurning: u - c.year
    });
  }
  return r.sort((o, c) => o.daysUntil - c.daysUntil);
}
function Vt(t, e) {
  return e ? t.daysUntil === 0 ? `- ${t.name}: heute (${t.ageTurning})` : t.daysUntil === 1 ? `- ${t.name}: morgen (${t.ageTurning})` : `- ${t.name}: in ${t.daysUntil} Tagen (${t.ageTurning})` : t.daysUntil === 0 ? `- ${t.name}: today (turns ${t.ageTurning})` : t.daysUntil === 1 ? `- ${t.name}: tomorrow (turns ${t.ageTurning})` : `- ${t.name}: in ${t.daysUntil} days (turns ${t.ageTurning})`;
}
function Yt(t) {
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
function Zt(t) {
  return t.map((e) => `${e.name}: ${e.date}`).join(`
`);
}
const qt = {
  monday: "Montag",
  tuesday: "Dienstag",
  wednesday: "Mittwoch",
  thursday: "Donnerstag",
  friday: "Freitag",
  saturday: "Samstag",
  sunday: "Sonntag"
};
function Jt(t, e) {
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
function Qt(t, e) {
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
function Xt(t, e, n) {
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
    var u;
    return Number(((u = i.find((d) => d.type === c)) == null ? void 0 : u.value) ?? 0);
  }, r = a("year") * 1e4 + a("month") * 100 + a("day"), o = Number(s[1]) * 1e4 + Number(s[2]) * 100 + Number(s[3]);
  return r >= o;
}
function en(t, e, n) {
  const s = Jt(e, n), i = [...t[s] ?? []].sort(
    (a, r) => a.start.localeCompare(r.start)
  );
  return { weekday: s, lessons: i };
}
function tn(t, e, n) {
  const s = Qt(e, n);
  let i, a;
  for (const r of t) {
    const o = He(r.start), c = He(r.end);
    o === null || c === null || (s >= o && s < c ? i = r : s < o && !a && (a = r));
  }
  return { current: i, next: a };
}
function nn(t, e, n, s) {
  var a;
  const i = [];
  for (const r of t) {
    if (!((a = r.name) != null && a.trim()) || !Xt(r, e, n))
      continue;
    const { weekday: o, lessons: c } = en(r, e, n), u = s ? qt[o] : o;
    if (i.push(
      s ? `Person: ${r.name} · ${u}` : `Person: ${r.name} · ${u}`
    ), r.note && i.push(s ? `Hinweis: ${r.note}` : `Note: ${r.note}`), c.length === 0) {
      i.push(
        s ? "Heute kein Unterricht laut Plan." : "No lessons scheduled today."
      );
      continue;
    }
    const { current: d, next: h } = tn(c, e, n);
    d && i.push(
      s ? `Jetzt: ${d.start}-${d.end} ${d.subject}` : `Now: ${d.start}-${d.end} ${d.subject}`
    ), h && i.push(
      s ? `Als Nächstes: ${h.start}-${h.end} ${h.subject}` : `Next: ${h.start}-${h.end} ${h.subject}`
    ), i.push(s ? "Heutiger Plan:" : "Today's schedule:");
    for (const l of c)
      i.push(`- ${l.start}-${l.end}: ${l.subject}`);
  }
  return i;
}
function sn(t, e) {
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
async function rn(t, e, n, s) {
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
function Ie(t) {
  return !t || t === "unknown" || t === "unavailable" ? "Weather unavailable" : t.replace(/_/g, " ");
}
function ne(t, e) {
  if (typeof t != "number" || Number.isNaN(t))
    return "—";
  const n = Number.isInteger(t) ? String(t) : t.toFixed(1);
  if (!e)
    return `${n}°`;
  const s = e.includes("°") ? e : `°${e}`;
  return `${n}${s}`;
}
function Fe(t, e) {
  return t === e ? !1 : !t || !e ? !0 : t.state !== e.state || t.last_updated !== e.last_updated || t.attributes.temperature !== e.attributes.temperature || t.attributes.humidity !== e.attributes.humidity;
}
const nt = /* @__PURE__ */ new Set([
  "rainy",
  "pouring",
  "snowy",
  "snowy-rainy",
  "lightning-rainy",
  "hail"
]), J = /* @__PURE__ */ new Map(), an = {
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
function on(t) {
  let e = 0;
  for (let n = 0; n < t.length; n += 1)
    e = (e << 5) - e + t.charCodeAt(n), e |= 0;
  return String(e);
}
function cn(t) {
  return t.toLowerCase().startsWith("de");
}
function ln(t, e) {
  const n = Number(
    new Intl.DateTimeFormat("en-GB", {
      hour: "numeric",
      hour12: !1,
      timeZone: e
    }).format(t)
  );
  return n < 5 ? "nacht" : n < 10 ? "morgen" : n < 12 ? "vormittag" : n < 17 ? "nachmittag" : n < 22 ? "abend" : "nacht";
}
function hn(t, e) {
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
function je(t, e) {
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
function st(t, e) {
  return !t || t === "unknown" || t === "unavailable" ? e ? "Wetter unklar" : "Weather unavailable" : e ? an[t] ?? t.replace(/_/g, " ") : t.replace(/_/g, " ");
}
function un(t, e) {
  if (!t || typeof t.temperature != "number")
    return null;
  const n = t.temperature, s = ["rainy", "pouring", "snowy-rainy", "lightning-rainy"].includes(
    t.condition
  ), i = t.condition === "snowy";
  return e ? i ? "Winterkleidung und feste Schuhe" : n <= 3 ? s ? "dicke Jacke und Regenschutz" : "dicke Jacke" : n <= 10 ? s ? "warme Jacke und Regenschirm" : "warme Jacke" : n <= 16 ? s ? "Übergangsjacke und Schirm" : "Übergangsjacke" : n <= 22 ? s ? "leichte Jacke und Schirm" : "leichte Kleidung" : s ? "luftige Kleidung und Schirm" : "leichte sommerliche Kleidung" : i ? "winter clothes and sturdy shoes" : n <= 3 ? s ? "heavy coat and rain gear" : "heavy coat" : n <= 10 ? s ? "warm jacket and umbrella" : "warm jacket" : n <= 16 ? s ? "light jacket and umbrella" : "light jacket" : n <= 22 ? s ? "light layer and umbrella" : "light clothes" : s ? "summer clothes and umbrella" : "summer clothes";
}
function it(t) {
  const e = t.trim().toLowerCase();
  return e === "unavailable" || e === "unknown" || e === "none" || e === "nicht verfügbar" || e === "unbekannt";
}
function dn(t) {
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
function pn(t) {
  const e = t.state.trim().toLowerCase();
  return e === "on" || e === "open" || e === "opened";
}
function mn(t) {
  const e = [], n = [], s = [], i = [], a = [], r = [], o = [], c = [], u = [];
  for (const d of t) {
    if (it(d.state))
      continue;
    const h = d.entity_id.toLowerCase(), l = d.name.toLowerCase();
    d.domain === "person" || h.startsWith("person.") ? e.push(d) : h.includes("abfall") || h.includes("muell") || h.includes("mull") || h.includes("trash") || l.includes("abfall") || l.includes("müll") || l.includes("tonne") ? s.push(d) : h.includes("solar") || h.includes("solaredge") || h.includes("autark") || h.includes("produziert") || h.includes("exportiert") || h.includes("verbrauch") || h.includes("power_production") || l.includes("solar") || l.includes("autark") || l.includes("leistung") ? n.push(d) : h.includes("sun_up") || h.includes("sun_down") || l.includes("sonnenaufgang") || l.includes("sonnenuntergang") ? i.push(d) : h.includes("warn") || l.includes("warn") || l.includes("warnung") ? a.push(d) : h.includes("fenster") || h.includes("window") || l.includes("fenster") || l.includes("window") ? pn(d) && r.push(d) : h.includes("heizoel") || h.includes("heizöl") || h.includes("oil") || l.includes("heizöl") || l.includes("heizoel") ? o.push(d) : d.domain === "vacuum" || d.domain === "lawn_mower" || h.includes("vacuum") || h.includes("lawn_mower") || l.includes("mäher") || l.includes("maeh") || l.includes("sauger") ? dn(d) && c.push(d) : u.push(d);
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
    other: u
  };
}
function fn(t, e, n, s) {
  const i = (n ?? "").toLowerCase();
  if (!(i.includes("schule") || i.includes("school") || i.includes("schultag")))
    return !1;
  const r = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    timeZone: e
  }).format(t);
  return !["Sat", "Sun"].includes(r) && (s === "morgen" || s === "vormittag");
}
function gn(t, e) {
  return t.filter((n) => {
    const s = (n.summary ?? "").toLowerCase();
    return s.includes("geburtstag") || s.includes("birthday") || s.includes("bday");
  }).slice(0, 5).map((n) => rt(n, e));
}
function rt(t, e) {
  const n = t.all_day ? e ? "ganztägig" : "all day" : t.start, s = t.calendar_name ? ` (${t.calendar_name})` : "";
  return `- ${n}: ${t.summary ?? (e ? "Belegt" : "Busy")}${s}`;
}
function S(t) {
  return `- ${t.name}: ${t.state}`;
}
function _n(t, e, n) {
  const s = t.trim().toLowerCase();
  if (!s || it(s))
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
    }).format(r), u = Date.parse(`${o}T00:00:00Z`), d = Date.parse(`${c}T00:00:00Z`);
    return Math.round((d - u) / 864e5);
  }
  return null;
}
function fe(t, e, n, s) {
  const i = [];
  for (const a of t) {
    const r = _n(a.state, e, n);
    r !== null && (r === 0 ? i.push(
      s ? `AKTION HEUTE: ${a.name} — Abholung heute → Tonne muss draußen sein.` : `ACTION TODAY: ${a.name} — pickup today → bin must be out.`
    ) : r === 1 && i.push(
      s ? `AKTION HEUTE ABEND: ${a.name} — Abholung morgen → HEUTE RAUSSTELLEN.` : `ACTION TONIGHT: ${a.name} — pickup tomorrow → PUT OUT TODAY.`
    ));
  }
  return !i.length && t.length && i.push(
    s ? "Keine Abholung heute/morgen erkannt — Müll im Brief weglassen." : "No pickup today/tomorrow detected — omit trash from the brief."
  ), i;
}
function y(t, e, n) {
  return [`[${t}]`, e.length ? e.join(`
`) : n].join(`
`);
}
function at(t, e, n) {
  return t.datetime ? new Intl.DateTimeFormat(e, {
    weekday: "short",
    timeZone: n
  }).format(new Date(t.datetime)) : "?";
}
function yn(t, e, n, s, i) {
  return t.slice(0, 6).map((a) => {
    const r = at(a, n, s), o = st(a.condition ?? "", i), c = ne(
      a.temperature,
      e == null ? void 0 : e.temperature_unit
    ), u = a.condition && nt.has(a.condition) ? i ? " · nass" : " · wet" : "";
    return `- ${r}: ${o}, ${c}${u}`;
  });
}
function $n(t, e, n, s) {
  const i = t.slice(0, 6).filter((r) => r.condition && nt.has(r.condition));
  if (i.length === 0)
    return null;
  const a = i.map((r) => at(r, e, n)).join(", ");
  return s ? `Regen/Schnee erwartet: ${a}` : `Rain/snow expected: ${a}`;
}
function bn(t) {
  var W;
  const {
    german: e,
    dayLabel: n,
    part: s,
    now: i,
    timeZone: a,
    weather: r,
    weatherLine: o,
    clothing: c,
    rainLine: u,
    schoolDay: d,
    birthdays: h,
    events: l,
    people: w,
    solar: A,
    trash: R,
    alerts: j,
    windows: O,
    heating: k,
    appliances: _
  } = t, g = [];
  if (e) {
    if (g.push(`${je(s, !0)} ${n}.`), r && g.push(
      c ? `Draußen ${o}. Empfehlung: ${c}.` : `Draußen ${o}.`
    ), u && g.push(`${u}.`), d && (s === "morgen" || s === "vormittag") && g.push("Schultag — morgens an die Schule denken."), h.length) {
      const p = h[0];
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
    A.length && g.push(
      `Solar: ${A.slice(0, 3).map((p) => `${p.name} ${p.state}`).join(", ")}.`
    );
    {
      const v = fe(R, i, a, !0).filter((E) => E.startsWith("AKTION"));
      v.length && g.push(
        v.map((E) => E.replace(/^AKTION (HEUTE(?: ABEND)?: )/, "")).join(" ")
      );
    }
    if (O.length && g.push(
      `Fenster offen: ${O.map((p) => p.name).join(", ")}.`
    ), k.length && g.push(
      `Heizöl: ${k.map((p) => `${p.name} ${p.state}`).join(", ")}.`
    ), _.length && g.push(
      `Geräte: ${_.map((p) => `${p.name} ${p.state}`).join(", ")}.`
    ), j.length) {
      const p = j.filter((v) => v.state !== "0" && v.state !== "ok");
      p.length && g.push(
        `Hinweis: ${p.map((v) => `${v.name} ${v.state}`).join(", ")}.`
      );
    }
    w.length && g.push(
      `Zuhause/Status: ${w.map((p) => `${p.name} ${p.state}`).join(", ")}.`
    );
  } else {
    if (g.push(`${je(s, !1)} ${n}.`), r && g.push(
      c ? `Outside: ${o}. Wear: ${c}.` : `Outside: ${o}.`
    ), u && g.push(`${u}.`), d && (s === "morgen" || s === "vormittag") && g.push("School day — keep the morning routine in mind."), h.length) {
      const p = h[0];
      g.push(
        p.daysUntil === 0 ? `Today is ${p.name}'s birthday (${p.ageTurning})!` : `Birthday soon: ${p.name} in ${p.daysUntil} day(s).`
      );
    }
    g.push(
      l.length === 0 ? "No meetings scheduled." : `${l.length} event(s), starting with ${((W = l[0]) == null ? void 0 : W.summary) ?? "Busy"}.`
    ), A.length && g.push(
      `Solar: ${A.slice(0, 3).map((p) => `${p.name} ${p.state}`).join(", ")}.`
    );
    {
      const v = fe(R, i, a, !1).filter((E) => E.startsWith("ACTION"));
      v.length && g.push(
        v.map(
          (E) => E.replace(/^ACTION (TODAY|TONIGHT): /, "")
        ).join(" ")
      );
    }
    O.length && g.push(`Open windows: ${O.map((p) => p.name).join(", ")}.`), k.length && g.push(
      `Heating oil: ${k.map((p) => `${p.name} ${p.state}`).join(", ")}.`
    ), _.length && g.push(
      `Devices needing attention: ${_.map((p) => `${p.name} ${p.state}`).join(", ")}.`
    );
  }
  return g.join(" ");
}
function wn(t) {
  const {
    weather: e,
    forecast: n = (e == null ? void 0 : e.forecast) ?? [],
    events: s,
    entities: i,
    birthdays: a = [],
    schedules: r = [],
    now: o,
    locale: c,
    timeZone: u,
    summaryPrompt: d,
    contextNotes: h
  } = t, l = cn(c), w = ln(o, u), A = hn(w, l), R = new Intl.DateTimeFormat(c, {
    weekday: "long",
    month: "long",
    day: "numeric",
    timeZone: u
  }).format(o), j = new Intl.DateTimeFormat(c, {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: u
  }).format(o), O = e ? `${st(e.condition, l)}, ${ne(
    e.temperature,
    e.temperature_unit
  )}${typeof e.humidity == "number" ? l ? `, Luftfeuchtigkeit ${e.humidity}%` : `, humidity ${e.humidity}%` : ""}` : l ? "Wetter nicht verfügbar" : "Weather unavailable", k = un(e, l), _ = mn(i), g = yn(
    n,
    e,
    c,
    u,
    l
  ), W = $n(n, c, u, l), p = Gt(a, o, u, 14), v = [
    ...p.map((B) => Vt(B, l)),
    ...gn(s, l)
  ], E = fn(o, u, h, w), xe = nn(
    r,
    o,
    u,
    l
  ), ct = s.length === 0 ? [] : s.slice(0, 12).map((B) => rt(B, l)), lt = (d == null ? void 0 : d.trim()) || tt, Ae = h == null ? void 0 : h.trim(), ht = [
    y(
      l ? "ZEIT" : "TIME",
      [
        l ? `Datum: ${R}` : `Date: ${R}`,
        l ? `Uhrzeit: ${j}` : `Time: ${j}`,
        l ? `Tageszeit: ${A}` : `Time of day: ${A}`
      ],
      ""
    ),
    ...Ae ? [
      y(
        l ? "HAUSHALT" : "HOUSEHOLD",
        Ae.split(`
`).map((B) => B.trim()).filter(Boolean),
        ""
      )
    ] : [],
    y(
      l ? "SCHULTAG" : "SCHOOL_DAY",
      [
        E || xe.length ? l ? "ja — Wochentag und/oder Stundenplan vorhanden" : "yes — weekday and/or schedule present" : l ? "nein" : "no"
      ],
      ""
    ),
    y(
      l ? "STUNDENPLAN" : "SCHEDULE",
      xe,
      l ? "Kein Stundenplan konfiguriert." : "No schedule configured."
    ),
    y(
      l ? "WETTER" : "WEATHER",
      [
        O,
        k ? l ? `Kleidungshinweis: ${k}` : `Clothing hint: ${k}` : "",
        W ?? ""
      ].filter(Boolean),
      l ? "Keine Wetterdaten." : "No weather data."
    ),
    y(
      l ? "VORHERSAGE" : "FORECAST",
      g,
      l ? "Keine Vorhersage." : "No forecast."
    ),
    y(
      l ? "GEBURTSTAGE" : "BIRTHDAYS",
      v,
      l ? "Keine Geburtstage in den nächsten 14 Tagen." : "No birthdays in the next 14 days."
    ),
    y(
      l ? "TERMINE" : "AGENDA",
      ct,
      l ? "Keine Termine." : "No meetings."
    ),
    y(
      l ? "PERSONEN" : "PEOPLE",
      _.people.map(S),
      l ? "Keine Personendaten." : "No people data."
    ),
    y(
      "SOLAR",
      _.solar.map(S),
      l ? "Keine Solarwerte (oder nicht verfügbar)." : "No solar data."
    ),
    y(
      l ? "MUELL" : "TRASH",
      _.trash.map(S),
      l ? "Keine Mülldaten." : "No trash data."
    ),
    y(
      l ? "MUELL-AKTION" : "TRASH-ACTION",
      fe(_.trash, o, u, l),
      l ? "Keine Müll-Aktion heute/morgen." : "No trash action today/tomorrow."
    ),
    y(
      l ? "SONNE" : "SUN",
      _.sun.map(S),
      l ? "Keine Sonnenzeiten." : "No sun times."
    ),
    y(
      l ? "FENSTER" : "WINDOWS",
      _.windows.map(S),
      l ? "Keine offenen Fenster." : "No open windows."
    ),
    y(
      l ? "HEIZOEL" : "HEATING_OIL",
      _.heating.map(S),
      l ? "Kein Heizöl-Sensor." : "No heating-oil sensor."
    ),
    y(
      l ? "GERAETE" : "APPLIANCES",
      _.appliances.map(S),
      l ? "Keine Geräte mit Handlungsbedarf." : "No appliances needing attention."
    ),
    y(
      l ? "WARNUNGEN" : "ALERTS",
      _.alerts.map(S),
      l ? "Keine Warnungen." : "No alerts."
    ),
    y(
      l ? "SONSTIGES" : "OTHER",
      _.other.map(S),
      l ? "Nichts weiteres." : "Nothing else."
    )
  ], Ee = [
    lt,
    "",
    l ? "DATEN (nur diese Fakten verwenden; fehlende/ungültige Werte weglassen):" : "DATA (use only these facts; skip missing/invalid values):",
    ht.join(`

`),
    "",
    l ? "ANTWORT: Nur der fertige deutsche Fließtext (Markdown **fett** erlaubt), nichts sonst." : "RESPONSE: Only the finished brief text (Markdown **bold** allowed), nothing else."
  ].join(`
`), ut = bn({
    german: l,
    dayLabel: R,
    part: w,
    now: o,
    timeZone: u,
    weather: e,
    weatherLine: O,
    clothing: k,
    rainLine: W,
    schoolDay: E,
    birthdays: p,
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
    hash: on(Ee),
    prompt: Ee,
    local: ut
  };
}
function ot(t) {
  if (!t) {
    J.clear();
    return;
  }
  J.delete(t);
}
function vn(t, e) {
  const n = J.get(t);
  return n ? n.hash !== e || n.expiresAt < Date.now() ? (J.delete(t), null) : n : null;
}
function he(t, e, n, s, i) {
  J.set(t, {
    hash: e,
    text: n,
    source: s,
    expiresAt: Date.now() + Math.max(1, i) * 6e4
  });
}
async function xn(t, e, n) {
  var a, r, o, c, u, d;
  const s = await t.callWS({
    type: "conversation/process",
    text: n,
    language: ((a = t.locale) == null ? void 0 : a.language) ?? t.config.language ?? "en",
    agent_id: e
  });
  return ((r = s.response) == null ? void 0 : r.response_type) === "error" ? null : ((d = (u = (c = (o = s.response) == null ? void 0 : o.speech) == null ? void 0 : c.plain) == null ? void 0 : u.speech) == null ? void 0 : d.trim()) || null;
}
async function An(t) {
  const { hass: e, mode: n, agentId: s, digest: i, cacheKey: a, cacheMinutes: r, force: o } = t;
  if (o)
    ot(a);
  else {
    const c = vn(a, i.hash);
    if (c)
      return { text: c.text, source: c.source };
  }
  if (n === "local")
    return he(a, i.hash, i.local, "local", r), { text: i.local, source: "local" };
  try {
    const c = await xn(e, s, i.prompt);
    if (c)
      return he(a, i.hash, c, "ai", r), { text: c, source: "ai" };
  } catch {
  }
  return he(a, i.hash, i.local, "local", r), { text: i.local, source: "local" };
}
let N = null, se = null;
function En() {
  if (!(typeof window > "u"))
    try {
      const t = new Audio();
      se = t, t.play().catch(() => {
      });
    } catch {
    }
}
function ge() {
  typeof window < "u" && "speechSynthesis" in window && window.speechSynthesis.cancel(), N && (N.pause(), N.removeAttribute("src"), N.load(), N = null), se = null;
}
function kn(t) {
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
async function Sn(t) {
  const e = se ?? new Audio();
  se = null, N = e, await new Promise((n, s) => {
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
  }), N === e && (N = null);
}
async function Tn(t) {
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
      await Sn(a);
    } catch (s) {
      throw new Error(kn(s));
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
    ge();
    const s = new SpeechSynthesisUtterance(e);
    s.lang = n, s.rate = 1, window.speechSynthesis.speak(s);
    return;
  }
  throw new Error("No TTS available");
}
const Nn = Ge`
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
      color-mix(in srgb, var(--primary-text-color) 4%, transparent);
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
var Cn = Object.defineProperty, On = Object.getOwnPropertyDescriptor, b = (t, e, n, s) => {
  for (var i = s > 1 ? void 0 : s ? On(e, n) : e, a = t.length - 1, r; a >= 0; a--)
    (r = t[a]) && (i = (s ? r(e, n, i) : r(i)) || i);
  return s && i && Cn(e, n, i), i;
};
const ue = "daily", de = 24, We = 15, pe = "auto", Dn = 15 * 6e4;
let $ = class extends M {
  constructor() {
    super(...arguments), this._weather = null, this._forecast = [], this._events = [], this._entities = [], this._summary = "", this._summarySource = "loading", this._errors = [], this._loadingEvents = !1, this._refreshing = !1, this._contextOpen = !1, this._now = /* @__PURE__ */ new Date(), this._speaking = !1, this._keepAwakeOn = !1, this._fetchGeneration = 0, this._keepAwake = new It(), this._onVisibility = () => {
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
    return await Promise.resolve().then(() => Mn), document.createElement(et);
  }
  setConfig(t) {
    if (!t)
      throw new Error("Invalid configuration");
    this._config = {
      forecast_type: ue,
      horizon_hours: de,
      summary_mode: pe,
      cache_minutes: We,
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
    super.disconnectedCallback(), this._stopRefreshLoop(), this._stopClock(), this._teardownForecast(), this._keepAwake.stop(), this._keepAwakeOn = !1, ge(), document.removeEventListener("visibilitychange", this._onVisibility);
  }
  updated(t) {
    !this._config || !this.hass || ((t.has("hass") || t.has("_config")) && (this._syncWeatherFromHass(), this._syncEntitiesFromHass(), this._ensureForecastSubscription()), t.has("_config") && this.isConnected && this._refreshData(!0));
  }
  shouldUpdate(t) {
    var e, n, s, i, a, r, o, c;
    if (t.has("_config") || t.has("_weather") || t.has("_forecast") || t.has("_entities") || t.has("_events") || t.has("_summary") || t.has("_summarySource") || t.has("_errors") || t.has("_loadingEvents") || t.has("_refreshing") || t.has("_contextOpen") || t.has("_now") || t.has("_speaking") || t.has("_keepAwakeOn"))
      return !0;
    if (t.has("hass")) {
      const u = t.get("hass");
      if ((e = this._config) != null && e.weather_entity && Fe(
        (n = u == null ? void 0 : u.states) == null ? void 0 : n[this._config.weather_entity],
        (i = (s = this.hass) == null ? void 0 : s.states) == null ? void 0 : i[this._config.weather_entity]
      ))
        return !0;
      for (const d of ((a = this._config) == null ? void 0 : a.entities) ?? [])
        if (Fe((r = u == null ? void 0 : u.states) == null ? void 0 : r[d], (c = (o = this.hass) == null ? void 0 : o.states) == null ? void 0 : c[d]))
          return !0;
    }
    return !1;
  }
  _startRefreshLoop() {
    this._stopRefreshLoop(), this._refreshData(!0), this._refreshTimer = window.setInterval(() => {
      this._refreshData(!1);
    }, Dn);
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
      this._config.summary_mode ?? pe,
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
    const e = sn(this.hass, t);
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
    const t = this._config.weather_entity, e = this._config.forecast_type ?? ue;
    if (!(this._unsubForecast && this._lastWeatherEntity === t && this._lastForecastType === e)) {
      if (this._teardownForecast(), this._lastWeatherEntity = t, this._lastForecastType = e, !t || e === "none" || !this.hass) {
        this._forecast = [];
        return;
      }
      try {
        this._unsubForecast = await rn(
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
      this._refreshing = !0, ot(this._cacheKey());
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
        ge(), this._speaking = !1;
        return;
      }
      En(), this._speaking = !0;
      try {
        await Tn({
          hass: this.hass,
          text: Ft(this._summary),
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
    const i = this._config.calendars ?? [], a = this._config.horizon_hours ?? de, { events: r, errors: o } = await Ut(
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
    const n = this._config.summary_mode ?? pe, s = this._config.cache_minutes ?? We, i = ((c = this.hass.locale) == null ? void 0 : c.language) ?? "en", a = this.hass.config.time_zone, r = wn({
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
      const u = await An({
        hass: this.hass,
        mode: n,
        agentId: this._config.agent_id,
        digest: r,
        cacheKey: o,
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
    const e = ((a = this.hass.locale) == null ? void 0 : a.language) ?? "en", n = this.hass.config.time_zone, s = this._config.forecast_type ?? ue, i = new Date(t.datetime);
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
      return f;
    const t = ((i = (s = this.hass) == null ? void 0 : s.locale) == null ? void 0 : i.language) ?? "en", e = ((a = this.hass) == null ? void 0 : a.config.time_zone) ?? "UTC", n = this._weather;
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
          ${this._summarySource === "loading" && !this._summary ? "Preparing your day brief…" : jt(this._summary)}
        </div>

        <div class="split">
          <section class="panel">
            <h3 class="section-title">Weather</h3>
            ${n ? m`
                  <div class="weather-hero">
                    <div>
                      <p class="condition">
                        ${Ie(n.condition)}
                      </p>
                      <p class="weather-place">
                        ${n.friendly_name ?? n.entity_id}
                      </p>
                    </div>
                    <p class="temp">
                      ${ne(
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
      (r) => m`
                              <div class="forecast-item">
                                <span class="forecast-day"
                                  >${this._forecastLabel(r)}</span
                                >
                                <span class="forecast-temp"
                                  >${ne(
        r.temperature,
        n.temperature_unit
      )}</span
                                >
                                <span class="forecast-cond"
                                  >${Ie(
        r.condition ?? ""
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
                    ${this._config.horizon_hours ?? de} hours.
                  </p>` : m`
                    <ul class="events">
                      ${this._events.map(
      (r) => m`
                          <li class="event">
                            <span class="event-time"
                              >${Rt(
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
        </div>

        ${(this._config.cameras ?? []).length ? m`
              <section class="cameras">
                <h3 class="section-title">Cameras</h3>
                <div class="camera-grid">
                  ${(this._config.cameras ?? []).map((r) => {
      const o = this._cameraSrc(r);
      return m`
                      <button
                        class="camera-tile"
                        type="button"
                        @click=${() => this._openMoreInfo(r)}
                      >
                        ${o ? m`<img
                              class="camera-feed"
                              src=${o}
                              alt=${this._cameraName(r)}
                            />` : m`<div class="camera-missing">No feed</div>`}
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
                  <span>${this._keepAwakeOn ? "Awake" : "Keep awake"}</span>
                </button>
              </div>
            ` : f}
      </ha-card>
    `;
  }
};
$.styles = Nn;
b([
  we({ attribute: !1 })
], $.prototype, "hass", 2);
b([
  x()
], $.prototype, "_config", 2);
b([
  x()
], $.prototype, "_weather", 2);
b([
  x()
], $.prototype, "_forecast", 2);
b([
  x()
], $.prototype, "_events", 2);
b([
  x()
], $.prototype, "_entities", 2);
b([
  x()
], $.prototype, "_summary", 2);
b([
  x()
], $.prototype, "_summarySource", 2);
b([
  x()
], $.prototype, "_errors", 2);
b([
  x()
], $.prototype, "_loadingEvents", 2);
b([
  x()
], $.prototype, "_refreshing", 2);
b([
  x()
], $.prototype, "_contextOpen", 2);
b([
  x()
], $.prototype, "_now", 2);
b([
  x()
], $.prototype, "_speaking", 2);
b([
  x()
], $.prototype, "_keepAwakeOn", 2);
$ = b([
  Je(Xe)
], $);
window.customCards = window.customCards || [];
window.customCards.push({
  type: Xe,
  name: Qe,
  description: "AI-first day brief with weather, calendars, extra entities, and a short narrative.",
  preview: !0,
  documentationURL: "https://github.com/jenskock/lovelace-day-brief"
});
console.info(
  `%c ${Qe} %c ${Lt} `,
  "color:#fff;background:#03a9f4;font-weight:700",
  "color:#03a9f4;background:transparent;font-weight:700"
);
var Ln = Object.defineProperty, Pn = Object.getOwnPropertyDescriptor, ve = (t, e, n, s) => {
  for (var i = s > 1 ? void 0 : s ? Pn(e, n) : e, a = t.length - 1, r; a >= 0; a--)
    (r = t[a]) && (i = (s ? r(e, n, i) : r(i)) || i);
  return s && i && Ln(e, n, i), i;
};
const Un = [
  "daily",
  "hourly",
  "twice_daily",
  "none"
], Rn = ["auto", "ai", "local"];
function zn(t, e) {
  t.dispatchEvent(
    new CustomEvent("config-changed", {
      detail: { config: e },
      bubbles: !0,
      composed: !0
    })
  );
}
function me(t) {
  return [
    ...new Set(
      t.split(/[\n,]/).map((e) => e.trim()).filter(Boolean)
    )
  ];
}
let F = class extends M {
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
    this._config = e, zn(this, e);
  }
  _value(t) {
    return t.target.value;
  }
  _onWeather(t) {
    this._update({ weather_entity: this._value(t) || void 0 });
  }
  _onCalendars(t) {
    this._update({ calendars: me(this._value(t)) });
  }
  _onEntities(t) {
    this._update({ entities: me(this._value(t)) });
  }
  _onCameras(t) {
    this._update({ cameras: me(this._value(t)) });
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
    const e = Yt(this._value(t));
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
            ${Un.map(
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
            ${Rn.map(
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
            .value=${Zt(this._config.birthdays ?? [])}
            @change=${this._onBirthdays}
          ></textarea>
          <span class="hint">One per line: Name: YYYY-MM-DD</span>
        </label>

        <label>
          System prompt
          <textarea
            rows="5"
            placeholder=${tt}
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
F.styles = Ge`
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
ve([
  we({ attribute: !1 })
], F.prototype, "hass", 2);
ve([
  x()
], F.prototype, "_config", 2);
F = ve([
  Je(et)
], F);
const Mn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get DayBriefCardEditor() {
    return F;
  }
}, Symbol.toStringTag, { value: "Module" }));
export {
  $ as DayBriefCard
};
//# sourceMappingURL=day-brief.js.map
