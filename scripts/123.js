function pegasus(t, e) {
  return e = new XMLHttpRequest(), e.open('GET', t), t = [], e.onreadystatechange = e.then = function (n, r, o, i) {
    if (n && n.call && (t = [, n, r]), e.readyState == 4 && (o = t[0 | e.status / 200])) {
      try {
        i = JSON.parse(e.responseText);
      } catch (t) {
        i = null;
      }
      o(i, e);
    }
  }, e.send(), e;
}

function getNewUser() {
  function t(t, e) {
    const n = Array.prototype.slice.call(document.getElementsByTagName('li'));
    n.find(e => e.getAttribute('data-label') === t).setAttribute('data-value', e);
  }

  let e = '';
  document.body.classList.contains('lego') && (e = '&lego');
  const n = pegasus(`https://randomuser.me/api/0.4/?randomapi${e}`);
  n.then((e) => {
    if (!e.error) {
      const n = e.results[0].user;
      n.picture = n.picture.replace('http://api.', 'https://'), n.picture = n.picture.replace('.me/', '.me/api/'), document.getElementById('user_photo').getElementsByTagName('img')[0].src = n.picture, t('name', `${n.name.first} ${n.name.last}`), document.getElementById('user_value').innerHTML = `${n.name.first} ${n.name.last}`, t('email', n.email);
      const r = new Date(1e3 * n.dob);
      t('birthday', `${r.getMonth() + 1}/${r.getDay() + 1}/19${r.getYear()}`), t('location', n.location.street), t('phone', n.cell), t('pass', n.password);
    }
  });
}

!(function (t, e) {
  typeof module !== 'undefined' ? module.exports = e() : typeof define === 'function' && typeof define.amd === 'object' ? define(e) : this[t] = e();
}('domready', () => {
  let t,
    e = [],
    n = document,
    r = n.documentElement.doScroll,
    o = 'DOMContentLoaded',
    i = (r ? /^loaded|^c/ : /^loaded|^i|^c/).test(n.readyState);
  return i || n.addEventListener(o, t = function () {
    for (n.removeEventListener(o, t), i = 1; t = e.shift();) t();
  }), function (t) {
    i ? setTimeout(t, 0) : e.push(t);
  };
})), (function () {
  if (document.title.indexOf('home') !== -1) {
    const t = pegasus('https://randomuser.me/api/?randomapi');
    t.then((t) => {
      e(t);
    }, (t) => {
      e(t);
    });
    var e = function (t) {
      if (t.error) {
        const e = document.createElement('div');
        e.className = 'alert', e.innerHTML = 'API Status: OFFLINE. Please tweet us <a href="https://twitter.com/randomapi">@randomapi</a> if you are seeing this message.';
        const n = document.getElementsByTagName('body')[0];
        n.insertBefore(e, n.firstChild);
      }
    };
  }
}()), (function () {
  domready(() => {
    if (window.location.href.indexOf('stats') !== -1) {
      const t = pegasus('getStats/charts');
      t.then((t) => {
        let e = t.map(t => t.date),
          n = t.map(t => Number(t.total)),
          r = t.map(t => Math.round(t.bandwidth / 1024 / 1024 * 100) / 100);
        Highcharts.setOptions({ lang: { thousandsSep: ',' } }), new Highcharts.Chart({
          chart: { renderTo: document.getElementById('charts') },
          title: { text: '' },
          xAxis: { title: { text: 'Date' }, categories: e },
          yAxis: [{
            minPadding: 0.2,
            maxPadding: 0.2,
            labels: { style: { color: '#93B1C6' } },
            title: { text: 'Users' },
            opposite: !0,
          }, { labels: { format: '{value} MB', style: { color: '#FF7148' } }, title: { text: 'Bandwidth' } }],
          series: [{
            name: 'Bandwidth', yAxis: 1, color: '#FF7148', data: r,
          }, {
            name: 'Users',
            data: n,
            color: '#93B1C6',
          }],
          tooltip: { shared: !0 },
        });
      });
    }
  });
}()), (function () {
  domready(() => {
    if (document.title.indexOf('Home') !== -1) {
      getNewUser();
      const t = Array.prototype.slice.call(document.getElementById('values_list').getElementsByTagName('li'));
      t.forEach((e) => {
        e.addEventListener('mouseover', function () {
          t.forEach((t) => {
            t.className = t.className.replace(/\bactive\b/, '');
          });
          const e = this;
          e.className += ' active', document.getElementById('user_title').innerHTML = e.getAttribute('data-title'), document.getElementById('user_value').innerHTML = e.getAttribute('data-value'), e.getAttribute('data-caps') ? document.getElementById('user_value').style.textTransform = 'lowercase' : document.getElementById('user_value').style.textTransform = 'capitalize';
        });
      });
    }
  });
}()), (function () {
  if (document.title.indexOf('Home') !== -1) {
    let t = [],
      e = '38,38,40,40,37,39,37,39,66,65';
    document.addEventListener('keydown', (n) => {
      t.push(n.keyCode), t.toString().indexOf(e) >= 0 && (t = [], document.getElementsByTagName('header')[0].getElementsByTagName('h1')[0].innerHTML = 'Random Lego Generator', document.getElementsByTagName('body')[0].className += ' lego', window.scrollTo(0, 0), getNewUser());
    });
  }
}()), (function () {
  function t(t, e, n) {
    for (let r = e.split(' '), o = 0, i = r.length; o < i; o++) t.addEventListener(r[o], n, !1);
  }

  domready(() => {
    t(document.getElementsByClassName('nav_toggle')[0], 'touchstart click', () => {
      document.getElementsByTagName('body')[0].classList.toggle('active');
    }), window.addEventListener('resize', () => {
      document.body.clientWidth > 1145 && (document.getElementsByTagName('body')[0].className = document.getElementsByTagName('body')[0].className.replace(/\bactive\b/, ''));
    });
  });
}()), (function () {
  function t(t) {
    t.style.opacity = 1, (function e() {
      (t.style.opacity -= 0.1) < 0 ? t.style.display = 'none' : requestAnimationFrame(e);
    }());
  }

  function e(t, e) {
    t.style.opacity = 0, t.style.display = e || 'block', (function e() {
      let n = parseFloat(t.style.opacity);
      (n += 0.1) > 1 || (t.style.opacity = n, requestAnimationFrame(e));
    }());
  }

  function n(t) {
    function e(t) {
      for (var e, n, r = t.length; r;) n = Math.floor(Math.random() * r--), e = t[r], t[r] = t[n], t[n] = e;
      return t;
    }

    return e(new Array(t).fill(0).map((t, e) => e));
  }

  window.location.href.match(/photos$/) && domready(() => {
    for (var r = function (t, e) {
        const n = document.createElement('img');
        n.src = `https://randomuser.me/api/portraits/${e}/${t}.jpg`, n.setAttribute('data-int', t), n.setAttribute('data-gender', e), console.log(e), document.getElementById(`photos_${e}`).appendChild(n);
      }, o = n(95), i = n(95), s = n(9), a = 0; a <= 99; a++) r(o[a], 'men');
    for (var a = 0; a <= 95; a++) r(i[a], 'women');
    for (var a = 0; a <= 9; a++) r(s[a], 'lego');
    Array.prototype.slice.call(document.getElementsByTagName('img')).forEach((t) => {
      t.addEventListener('load', function () {
        this.className += ' come_in', t.removeEventListener('load', () => {
        });
      }), t.addEventListener('click', function () {
        document.getElementById('large_img').setAttribute('src', `https://randomuser.me/api/portraits/${this.getAttribute('data-gender')}/${this.getAttribute('data-int')}.jpg`), e(document.getElementsByClassName('modal_mask')[0]), console.log('fadein');
      });
    }), document.getElementsByClassName('modal_mask')[0].addEventListener('click', () => {
      document.getElementsByClassName('modal_mask')[0], t(document.getElementsByClassName('modal_mask')[0]);
    });
  });
}()), !(function (t) {
  if (typeof exports === 'object' && typeof module !== 'undefined') module.exports = t(); else if (typeof define === 'function' && define.amd) define([], t); else {
    let e;
    e = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : this, e.io = t();
  }
}(() => {
  let t;
  return (function t(e, n, r) {
    function o(s, a) {
      if (!n[s]) {
        if (!e[s]) {
          const c = typeof require === 'function' && require;
          if (!a && c) return c(s, !0);
          if (i) return i(s, !0);
          const u = new Error(`Cannot find module '${s}'`);
          throw u.code = 'MODULE_NOT_FOUND', u;
        }
        const f = n[s] = { exports: {} };
        e[s][0].call(f.exports, (t) => {
          const n = e[s][1][t];
          return o(n || t);
        }, f, f.exports, t, e, n, r);
      }
      return n[s].exports;
    }

    for (var i = typeof require === 'function' && require, s = 0; s < r.length; s++) o(r[s]);
    return o;
  }({
    1: [function (t, e, n) {
      function r(t, e) {
        typeof t === 'object' && (e = t, t = void 0), e = e || {};
        let n,
          r = o(t),
          i = r.source,
          u = r.id,
          f = r.path,
          l = c[u] && f in c[u].nsps,
          p = e.forceNew || e['force new connection'] || !1 === e.multiplex || l;
        return p ? (a('ignoring socket cache for %s', i), n = s(i, e)) : (c[u] || (a('new io instance for %s', i), c[u] = s(i, e)), n = c[u]), n.socket(r.path);
      }

      var o = t('./url'),
        i = t('socket.io-parser'),
        s = t('./manager'),
        a = t('debug')('socket.io-client');
      e.exports = n = r;
      var c = n.managers = {};
      n.protocol = i.protocol, n.connect = r, n.Manager = t('./manager'), n.Socket = t('./socket');
    }, {
      './manager': 2, './socket': 4, './url': 5, debug: 14, 'socket.io-parser': 40,
    }],
    2: [function (t, e, n) {
      function r(t, e) {
        return this instanceof r ? (t && typeof t === 'object' && (e = t, t = void 0), e = e || {}, e.path = e.path || '/socket.io', this.nsps = {}, this.subs = [], this.opts = e, this.reconnection(e.reconnection !== !1), this.reconnectionAttempts(e.reconnectionAttempts || 1 / 0), this.reconnectionDelay(e.reconnectionDelay || 1e3), this.reconnectionDelayMax(e.reconnectionDelayMax || 5e3), this.randomizationFactor(e.randomizationFactor || 0.5), this.backoff = new p({
          min: this.reconnectionDelay(),
          max: this.reconnectionDelayMax(),
          jitter: this.randomizationFactor(),
        }), this.timeout(e.timeout == null ? 2e4 : e.timeout), this.readyState = 'closed', this.uri = t, this.connecting = [], this.lastPing = null, this.encoding = !1, this.packetBuffer = [], this.encoder = new a.Encoder(), this.decoder = new a.Decoder(), this.autoConnect = e.autoConnect !== !1, void (this.autoConnect && this.open())) : new r(t, e);
      }

      var o = t('engine.io-client'),
        i = t('./socket'),
        s = t('component-emitter'),
        a = t('socket.io-parser'),
        c = t('./on'),
        u = t('component-bind'),
        f = t('debug')('socket.io-client:manager'),
        l = t('indexof'),
        p = t('backo2'),
        h = Object.prototype.hasOwnProperty;
      e.exports = r, r.prototype.emitAll = function () {
        this.emit.apply(this, arguments);
        for (const t in this.nsps) h.call(this.nsps, t) && this.nsps[t].emit.apply(this.nsps[t], arguments);
      }, r.prototype.updateSocketIds = function () {
        for (const t in this.nsps) h.call(this.nsps, t) && (this.nsps[t].id = this.engine.id);
      }, s(r.prototype), r.prototype.reconnection = function (t) {
        return arguments.length ? (this._reconnection = !!t, this) : this._reconnection;
      }, r.prototype.reconnectionAttempts = function (t) {
        return arguments.length ? (this._reconnectionAttempts = t, this) : this._reconnectionAttempts;
      }, r.prototype.reconnectionDelay = function (t) {
        return arguments.length ? (this._reconnectionDelay = t, this.backoff && this.backoff.setMin(t), this) : this._reconnectionDelay;
      }, r.prototype.randomizationFactor = function (t) {
        return arguments.length ? (this._randomizationFactor = t, this.backoff && this.backoff.setJitter(t), this) : this._randomizationFactor;
      }, r.prototype.reconnectionDelayMax = function (t) {
        return arguments.length ? (this._reconnectionDelayMax = t, this.backoff && this.backoff.setMax(t), this) : this._reconnectionDelayMax;
      }, r.prototype.timeout = function (t) {
        return arguments.length ? (this._timeout = t, this) : this._timeout;
      }, r.prototype.maybeReconnectOnOpen = function () {
        !this.reconnecting && this._reconnection && this.backoff.attempts === 0 && this.reconnect();
      }, r.prototype.open = r.prototype.connect = function (t) {
        if (f('readyState %s', this.readyState), ~this.readyState.indexOf('open')) return this;
        f('opening %s', this.uri), this.engine = o(this.uri, this.opts);
        let e = this.engine,
          n = this;
        this.readyState = 'opening', this.skipReconnect = !1;
        let r = c(e, 'open', () => {
            n.onopen(), t && t();
          }),
          i = c(e, 'error', (e) => {
            if (f('connect_error'), n.cleanup(), n.readyState = 'closed', n.emitAll('connect_error', e), t) {
              const r = new Error('Connection error');
              r.data = e, t(r);
            } else n.maybeReconnectOnOpen();
          });
        if (!1 !== this._timeout) {
          const s = this._timeout;
          f('connect attempt will timeout after %d', s);
          const a = setTimeout(() => {
            f('connect attempt timed out after %d', s), r.destroy(), e.close(), e.emit('error', 'timeout'), n.emitAll('connect_timeout', s);
          }, s);
          this.subs.push({
            destroy() {
              clearTimeout(a);
            },
          });
        }
        return this.subs.push(r), this.subs.push(i), this;
      }, r.prototype.onopen = function () {
        f('open'), this.cleanup(), this.readyState = 'open', this.emit('open');
        const t = this.engine;
        this.subs.push(c(t, 'data', u(this, 'ondata'))), this.subs.push(c(t, 'ping', u(this, 'onping'))), this.subs.push(c(t, 'pong', u(this, 'onpong'))), this.subs.push(c(t, 'error', u(this, 'onerror'))), this.subs.push(c(t, 'close', u(this, 'onclose'))), this.subs.push(c(this.decoder, 'decoded', u(this, 'ondecoded')));
      }, r.prototype.onping = function () {
        this.lastPing = new Date(), this.emitAll('ping');
      }, r.prototype.onpong = function () {
        this.emitAll('pong', new Date() - this.lastPing);
      }, r.prototype.ondata = function (t) {
        this.decoder.add(t);
      }, r.prototype.ondecoded = function (t) {
        this.emit('packet', t);
      }, r.prototype.onerror = function (t) {
        f('error', t), this.emitAll('error', t);
      }, r.prototype.socket = function (t) {
        function e() {
          ~l(r.connecting, n) || r.connecting.push(n);
        }

        var n = this.nsps[t];
        if (!n) {
          n = new i(this, t), this.nsps[t] = n;
          var r = this;
          n.on('connecting', e), n.on('connect', () => {
            n.id = r.engine.id;
          }), this.autoConnect && e();
        }
        return n;
      }, r.prototype.destroy = function (t) {
        const e = l(this.connecting, t);
        ~e && this.connecting.splice(e, 1), this.connecting.length || this.close();
      }, r.prototype.packet = function (t) {
        f('writing packet %j', t);
        const e = this;
        e.encoding ? e.packetBuffer.push(t) : (e.encoding = !0, this.encoder.encode(t, (n) => {
          for (let r = 0; r < n.length; r++) e.engine.write(n[r], t.options);
          e.encoding = !1, e.processPacketQueue();
        }));
      }, r.prototype.processPacketQueue = function () {
        if (this.packetBuffer.length > 0 && !this.encoding) {
          const t = this.packetBuffer.shift();
          this.packet(t);
        }
      }, r.prototype.cleanup = function () {
        f('cleanup');
        for (var t; t = this.subs.shift();) t.destroy();
        this.packetBuffer = [], this.encoding = !1, this.lastPing = null, this.decoder.destroy();
      }, r.prototype.close = r.prototype.disconnect = function () {
        f('disconnect'), this.skipReconnect = !0, this.reconnecting = !1, this.readyState == 'opening' && this.cleanup(), this.backoff.reset(), this.readyState = 'closed', this.engine && this.engine.close();
      }, r.prototype.onclose = function (t) {
        f('onclose'), this.cleanup(), this.backoff.reset(), this.readyState = 'closed', this.emit('close', t), this._reconnection && !this.skipReconnect && this.reconnect();
      }, r.prototype.reconnect = function () {
        if (this.reconnecting || this.skipReconnect) return this;
        const t = this;
        if (this.backoff.attempts >= this._reconnectionAttempts) f('reconnect failed'), this.backoff.reset(), this.emitAll('reconnect_failed'), this.reconnecting = !1; else {
          const e = this.backoff.duration();
          f('will wait %dms before reconnect attempt', e), this.reconnecting = !0;
          const n = setTimeout(() => {
            t.skipReconnect || (f('attempting reconnect'), t.emitAll('reconnect_attempt', t.backoff.attempts), t.emitAll('reconnecting', t.backoff.attempts), t.skipReconnect || t.open((e) => {
              e ? (f('reconnect attempt error'), t.reconnecting = !1, t.reconnect(), t.emitAll('reconnect_error', e.data)) : (f('reconnect success'), t.onreconnect());
            }));
          }, e);
          this.subs.push({
            destroy() {
              clearTimeout(n);
            },
          });
        }
      }, r.prototype.onreconnect = function () {
        const t = this.backoff.attempts;
        this.reconnecting = !1, this.backoff.reset(), this.updateSocketIds(), this.emitAll('reconnect', t);
      };
    }, {
      './on': 3,
      './socket': 4,
      backo2: 8,
      'component-bind': 11,
      'component-emitter': 12,
      debug: 14,
      'engine.io-client': 16,
      indexof: 32,
      'socket.io-parser': 40,
    }],
    3: [function (t, e, n) {
      function r(t, e, n) {
        return t.on(e, n), {
          destroy() {
            t.removeListener(e, n);
          },
        };
      }

      e.exports = r;
    }, {}],
    4: [function (t, e, n) {
      function r(t, e) {
        this.io = t, this.nsp = e, this.json = this, this.ids = 0, this.acks = {}, this.receiveBuffer = [], this.sendBuffer = [], this.connected = !1, this.disconnected = !0, this.io.autoConnect && this.open();
      }

      let o = t('socket.io-parser'),
        i = t('component-emitter'),
        s = t('to-array'),
        a = t('./on'),
        c = t('component-bind'),
        u = t('debug')('socket.io-client:socket'),
        f = t('has-binary');
      e.exports = n = r;
      let l = {
          connect: 1,
          connect_error: 1,
          connect_timeout: 1,
          connecting: 1,
          disconnect: 1,
          error: 1,
          reconnect: 1,
          reconnect_attempt: 1,
          reconnect_failed: 1,
          reconnect_error: 1,
          reconnecting: 1,
          ping: 1,
          pong: 1,
        },
        p = i.prototype.emit;
      i(r.prototype), r.prototype.subEvents = function () {
        if (!this.subs) {
          const t = this.io;
          this.subs = [a(t, 'open', c(this, 'onopen')), a(t, 'packet', c(this, 'onpacket')), a(t, 'close', c(this, 'onclose'))];
        }
      }, r.prototype.open = r.prototype.connect = function () {
        return this.connected ? this : (this.subEvents(), this.io.open(), this.io.readyState == 'open' && this.onopen(), this.emit('connecting'), this);
      }, r.prototype.send = function () {
        const t = s(arguments);
        return t.unshift('message'), this.emit.apply(this, t), this;
      }, r.prototype.emit = function (t) {
        if (l.hasOwnProperty(t)) return p.apply(this, arguments), this;
        let e = s(arguments),
          n = o.EVENT;
        f(e) && (n = o.BINARY_EVENT);
        const r = { type: n, data: e };
        return r.options = {}, r.options.compress = !this.flags || !1 !== this.flags.compress, typeof e[e.length - 1] === 'function' && (u('emitting packet with ack id %d', this.ids), this.acks[this.ids] = e.pop(), r.id = this.ids++), this.connected ? this.packet(r) : this.sendBuffer.push(r), delete this.flags, this;
      }, r.prototype.packet = function (t) {
        t.nsp = this.nsp, this.io.packet(t);
      }, r.prototype.onopen = function () {
        u('transport is open - connecting'), this.nsp != '/' && this.packet({ type: o.CONNECT });
      }, r.prototype.onclose = function (t) {
        u('close (%s)', t), this.connected = !1, this.disconnected = !0, delete this.id, this.emit('disconnect', t);
      }, r.prototype.onpacket = function (t) {
        if (t.nsp == this.nsp) {
          switch (t.type) {
            case o.CONNECT:
              this.onconnect();
              break;
            case o.EVENT:
              this.onevent(t);
              break;
            case o.BINARY_EVENT:
              this.onevent(t);
              break;
            case o.ACK:
              this.onack(t);
              break;
            case o.BINARY_ACK:
              this.onack(t);
              break;
            case o.DISCONNECT:
              this.ondisconnect();
              break;
            case o.ERROR:
              this.emit('error', t.data);
          }
        }
      }, r.prototype.onevent = function (t) {
        const e = t.data || [];
        u('emitting event %j', e), t.id != null && (u('attaching ack callback to event'), e.push(this.ack(t.id))), this.connected ? p.apply(this, e) : this.receiveBuffer.push(e);
      }, r.prototype.ack = function (t) {
        let e = this,
          n = !1;
        return function () {
          if (!n) {
            n = !0;
            const r = s(arguments);
            u('sending ack %j', r);
            const i = f(r) ? o.BINARY_ACK : o.ACK;
            e.packet({ type: i, id: t, data: r });
          }
        };
      }, r.prototype.onack = function (t) {
        const e = this.acks[t.id];
        typeof e === 'function' ? (u('calling ack %s with %j', t.id, t.data), e.apply(this, t.data), delete this.acks[t.id]) : u('bad ack %s', t.id);
      }, r.prototype.onconnect = function () {
        this.connected = !0, this.disconnected = !1, this.emit('connect'), this.emitBuffered();
      }, r.prototype.emitBuffered = function () {
        let t;
        for (t = 0; t < this.receiveBuffer.length; t++) p.apply(this, this.receiveBuffer[t]);
        for (this.receiveBuffer = [], t = 0; t < this.sendBuffer.length; t++) this.packet(this.sendBuffer[t]);
        this.sendBuffer = [];
      }, r.prototype.ondisconnect = function () {
        u('server disconnect (%s)', this.nsp), this.destroy(), this.onclose('io server disconnect');
      }, r.prototype.destroy = function () {
        if (this.subs) {
          for (let t = 0; t < this.subs.length; t++) this.subs[t].destroy();
          this.subs = null;
        }
        this.io.destroy(this);
      }, r.prototype.close = r.prototype.disconnect = function () {
        return this.connected && (u('performing disconnect (%s)', this.nsp), this.packet({ type: o.DISCONNECT })), this.destroy(), this.connected && this.onclose('io client disconnect'), this;
      }, r.prototype.compress = function (t) {
        return this.flags = this.flags || {}, this.flags.compress = t, this;
      };
    }, {
      './on': 3,
      'component-bind': 11,
      'component-emitter': 12,
      debug: 14,
      'has-binary': 30,
      'socket.io-parser': 40,
      'to-array': 43,
    }],
    5: [function (t, e, n) {
      (function (n) {
        function r(t, e) {
          var r = t,
            e = e || n.location;
          t == null && (t = `${e.protocol}//${e.host}`), typeof t === 'string' && (t.charAt(0) == '/' && (t = t.charAt(1) == '/' ? e.protocol + t : e.host + t), /^(https?|wss?):\/\//.test(t) || (i('protocol-less url %s', t), t = typeof e !== 'undefined' ? `${e.protocol}//${t}` : `https://${t}`), i('parse %s', t), r = o(t)), r.port || (/^(http|ws)$/.test(r.protocol) ? r.port = '80' : /^(http|ws)s$/.test(r.protocol) && (r.port = '443')), r.path = r.path || '/';
          let s = r.host.indexOf(':') !== -1,
            a = s ? `[${r.host}]` : r.host;
          return r.id = `${r.protocol}://${a}:${r.port}`, r.href = `${r.protocol}://${a}${e && e.port == r.port ? '' : `:${r.port}`}`, r;
        }

        var o = t('parseuri'),
          i = t('debug')('socket.io-client:url');
        e.exports = r;
      }).call(this, typeof self !== 'undefined' ? self : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : {});
    }, { debug: 14, parseuri: 38 }],
    6: [function (t, e, n) {
      function r(t, e, n) {
        function r(t, o) {
          if (r.count <= 0) throw new Error('after called too many times');
          --r.count, t ? (i = !0, e(t), e = n) : r.count !== 0 || i || e(null, o);
        }

        var i = !1;
        return n = n || o, r.count = t, t === 0 ? e() : r;
      }

      function o() {
      }

      e.exports = r;
    }, {}],
    7: [function (t, e, n) {
      e.exports = function (t, e, n) {
        const r = t.byteLength;
        if (e = e || 0, n = n || r, t.slice) return t.slice(e, n);
        if (e < 0 && (e += r), n < 0 && (n += r), n > r && (n = r), e >= r || e >= n || r === 0) return new ArrayBuffer(0);
        for (var o = new Uint8Array(t), i = new Uint8Array(n - e), s = e, a = 0; n > s; s++, a++) i[a] = o[s];
        return i.buffer;
      };
    }, {}],
    8: [function (t, e, n) {
      function r(t) {
        t = t || {}, this.ms = t.min || 100, this.max = t.max || 1e4, this.factor = t.factor || 2, this.jitter = t.jitter > 0 && t.jitter <= 1 ? t.jitter : 0, this.attempts = 0;
      }

      e.exports = r, r.prototype.duration = function () {
        let t = this.ms * Math.pow(this.factor, this.attempts++);
        if (this.jitter) {
          let e = Math.random(),
            n = Math.floor(e * this.jitter * t);
          t = (1 & Math.floor(10 * e)) == 0 ? t - n : t + n;
        }
        return 0 | Math.min(t, this.max);
      }, r.prototype.reset = function () {
        this.attempts = 0;
      }, r.prototype.setMin = function (t) {
        this.ms = t;
      }, r.prototype.setMax = function (t) {
        this.max = t;
      }, r.prototype.setJitter = function (t) {
        this.jitter = t;
      };
    }, {}],
    9: [function (t, e, n) {
      !(function () {
        for (var t = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/', e = new Uint8Array(256), r = 0; r < t.length; r++) e[t.charCodeAt(r)] = r;
        n.encode = function (e) {
          let n,
            r = new Uint8Array(e),
            o = r.length,
            i = '';
          for (n = 0; o > n; n += 3) i += t[r[n] >> 2], i += t[(3 & r[n]) << 4 | r[n + 1] >> 4], i += t[(15 & r[n + 1]) << 2 | r[n + 2] >> 6], i += t[63 & r[n + 2]];
          return o % 3 === 2 ? i = `${i.substring(0, i.length - 1)}=` : o % 3 === 1 && (i = `${i.substring(0, i.length - 2)}==`), i;
        }, n.decode = function (t) {
          let n,
            r,
            o,
            i,
            s,
            a = 0.75 * t.length,
            c = t.length,
            u = 0;
          t[t.length - 1] === '=' && (a--, t[t.length - 2] === '=' && a--);
          let f = new ArrayBuffer(a),
            l = new Uint8Array(f);
          for (n = 0; c > n; n += 4) r = e[t.charCodeAt(n)], o = e[t.charCodeAt(n + 1)], i = e[t.charCodeAt(n + 2)], s = e[t.charCodeAt(n + 3)], l[u++] = r << 2 | o >> 4, l[u++] = (15 & o) << 4 | i >> 2, l[u++] = (3 & i) << 6 | 63 & s;
          return f;
        };
      }());
    }, {}],
    10: [function (t, e, n) {
      (function (t) {
        function n(t) {
          for (let e = 0; e < t.length; e++) {
            const n = t[e];
            if (n.buffer instanceof ArrayBuffer) {
              let r = n.buffer;
              if (n.byteLength !== r.byteLength) {
                const o = new Uint8Array(n.byteLength);
                o.set(new Uint8Array(r, n.byteOffset, n.byteLength)), r = o.buffer;
              }
              t[e] = r;
            }
          }
        }

        function r(t, e) {
          e = e || {};
          const r = new i();
          n(t);
          for (let o = 0; o < t.length; o++) r.append(t[o]);
          return e.type ? r.getBlob(e.type) : r.getBlob();
        }

        function o(t, e) {
          return n(t), new Blob(t, e || {});
        }

        var i = t.BlobBuilder || t.WebKitBlobBuilder || t.MSBlobBuilder || t.MozBlobBuilder,
          s = (function () {
            try {
              const t = new Blob(['hi']);
              return t.size === 2;
            } catch (t) {
              return !1;
            }
          }()),
          a = s && (function () {
            try {
              const t = new Blob([new Uint8Array([1, 2])]);
              return t.size === 2;
            } catch (t) {
              return !1;
            }
          }()),
          c = i && i.prototype.append && i.prototype.getBlob;
        e.exports = (function () {
          return s ? a ? t.Blob : o : c ? r : void 0;
        }());
      }).call(this, typeof self !== 'undefined' ? self : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : {});
    }, {}],
    11: [function (t, e, n) {
      const r = [].slice;
      e.exports = function (t, e) {
        if (typeof e === 'string' && (e = t[e]), typeof e !== 'function') throw new Error('bind() requires a function');
        const n = r.call(arguments, 2);
        return function () {
          return e.apply(t, n.concat(r.call(arguments)));
        };
      };
    }, {}],
    12: [function (t, e, n) {
      function r(t) {
        return t ? o(t) : void 0;
      }

      function o(t) {
        for (const e in r.prototype) t[e] = r.prototype[e];
        return t;
      }

      e.exports = r, r.prototype.on = r.prototype.addEventListener = function (t, e) {
        return this._callbacks = this._callbacks || {}, (this._callbacks[`$${t}`] = this._callbacks[`$${t}`] || []).push(e), this;
      }, r.prototype.once = function (t, e) {
        function n() {
          this.off(t, n), e.apply(this, arguments);
        }

        return n.fn = e, this.on(t, n), this;
      }, r.prototype.off = r.prototype.removeListener = r.prototype.removeAllListeners = r.prototype.removeEventListener = function (t, e) {
        if (this._callbacks = this._callbacks || {}, arguments.length == 0) return this._callbacks = {}, this;
        const n = this._callbacks[`$${t}`];
        if (!n) return this;
        if (arguments.length == 1) return delete this._callbacks[`$${t}`], this;
        for (var r, o = 0; o < n.length; o++) {
          if (r = n[o], r === e || r.fn === e) {
            n.splice(o, 1);
            break;
          }
        }
        return this;
      }, r.prototype.emit = function (t) {
        this._callbacks = this._callbacks || {};
        let e = [].slice.call(arguments, 1),
          n = this._callbacks[`$${t}`];
        if (n) {
          n = n.slice(0);
          for (let r = 0, o = n.length; o > r; ++r) n[r].apply(this, e);
        }
        return this;
      }, r.prototype.listeners = function (t) {
        return this._callbacks = this._callbacks || {}, this._callbacks[`$${t}`] || [];
      }, r.prototype.hasListeners = function (t) {
        return !!this.listeners(t).length;
      };
    }, {}],
    13: [function (t, e, n) {
      e.exports = function (t, e) {
        const n = function () {
        };
        n.prototype = e.prototype, t.prototype = new n(), t.prototype.constructor = t;
      };
    }, {}],
    14: [function (t, e, n) {
      function r() {
        return 'WebkitAppearance' in document.documentElement.style || window.console && (console.firebug || console.exception && console.table) || navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31;
      }

      function o() {
        let t = arguments,
          e = this.useColors;
        if (t[0] = `${(e ? '%c' : '') + this.namespace + (e ? ' %c' : ' ') + t[0] + (e ? '%c ' : ' ')}+${n.humanize(this.diff)}`, !e) return t;
        const r = `color: ${this.color}`;
        t = [t[0], r, 'color: inherit'].concat(Array.prototype.slice.call(t, 1));
        let o = 0,
          i = 0;
        return t[0].replace(/%[a-z%]/g, (t) => {
          t !== '%%' && (o++, t === '%c' && (i = o));
        }), t.splice(i, 0, r), t;
      }

      function i() {
        return typeof console === 'object' && console.log && Function.prototype.apply.call(console.log, console, arguments);
      }

      function s(t) {
        try {
          t == null ? n.storage.removeItem('debug') : n.storage.debug = t;
        } catch (t) {
        }
      }

      function a() {
        let t;
        try {
          t = n.storage.debug;
        } catch (t) {
        }
        return t;
      }

      function c() {
        try {
          return window.localStorage;
        } catch (t) {
        }
      }

      n = e.exports = t('./debug'), n.log = i, n.formatArgs = o, n.save = s, n.load = a, n.useColors = r, n.storage = typeof chrome !== 'undefined' && typeof chrome.storage !== 'undefined' ? chrome.storage.local : c(), n.colors = ['lightseagreen', 'forestgreen', 'goldenrod', 'dodgerblue', 'darkorchid', 'crimson'], n.formatters.j = function (t) {
        return JSON.stringify(t);
      }, n.enable(a());
    }, { './debug': 15 }],
    15: [function (t, e, n) {
      function r() {
        return n.colors[f++ % n.colors.length];
      }

      function o(t) {
        function e() {
        }

        function o() {
          let t = o,
            e = +new Date(),
            i = e - (u || e);
          t.diff = i, t.prev = u, t.curr = e, u = e, t.useColors == null && (t.useColors = n.useColors()), t.color == null && t.useColors && (t.color = r());
          let s = Array.prototype.slice.call(arguments);
          s[0] = n.coerce(s[0]), typeof s[0] !== 'string' && (s = ['%o'].concat(s));
          let a = 0;
          s[0] = s[0].replace(/%([a-z%])/g, (e, r) => {
            if (e === '%%') return e;
            a++;
            const o = n.formatters[r];
            if (typeof o === 'function') {
              const i = s[a];
              e = o.call(t, i), s.splice(a, 1), a--;
            }
            return e;
          }), typeof n.formatArgs === 'function' && (s = n.formatArgs.apply(t, s));
          const c = o.log || n.log || console.log.bind(console);
          c.apply(t, s);
        }

        e.enabled = !1, o.enabled = !0;
        const i = n.enabled(t) ? o : e;
        return i.namespace = t, i;
      }

      function i(t) {
        n.save(t);
        for (let e = (t || '').split(/[\s,]+/), r = e.length, o = 0; r > o; o++) e[o] && (t = e[o].replace(/\*/g, '.*?'), t[0] === '-' ? n.skips.push(new RegExp(`^${t.substr(1)}$`)) : n.names.push(new RegExp(`^${t}$`)));
      }

      function s() {
        n.enable('');
      }

      function a(t) {
        let e,
          r;
        for (e = 0, r = n.skips.length; r > e; e++) if (n.skips[e].test(t)) return !1;
        for (e = 0, r = n.names.length; r > e; e++) if (n.names[e].test(t)) return !0;
        return !1;
      }

      function c(t) {
        return t instanceof Error ? t.stack || t.message : t;
      }

      n = e.exports = o, n.coerce = c, n.disable = s, n.enable = i, n.enabled = a, n.humanize = t('ms'), n.names = [], n.skips = [], n.formatters = {};
      var u,
        f = 0;
    }, { ms: 35 }],
    16: [function (t, e, n) {
      e.exports = t('./lib/');
    }, { './lib/': 17 }],
    17: [function (t, e, n) {
      e.exports = t('./socket'), e.exports.parser = t('engine.io-parser');
    }, { './socket': 18, 'engine.io-parser': 27 }],
    18: [function (t, e, n) {
      (function (n) {
        function r(t, e) {
          if (!(this instanceof r)) return new r(t, e);
          e = e || {}, t && typeof t === 'object' && (e = t, t = null), t ? (t = f(t), e.hostname = t.host, e.secure = t.protocol == 'https' || t.protocol == 'wss', e.port = t.port, t.query && (e.query = t.query)) : e.host && (e.hostname = f(e.host).host), this.secure = e.secure != null ? e.secure : n.location && location.protocol == 'https:', e.hostname && !e.port && (e.port = this.secure ? '443' : '80'), this.agent = e.agent || !1, this.hostname = e.hostname || (n.location ? location.hostname : 'localhost'), this.port = e.port || (n.location && location.port ? location.port : this.secure ? 443 : 80), this.query = e.query || {}, typeof this.query === 'string' && (this.query = p.decode(this.query)), this.upgrade = !1 !== e.upgrade, this.path = `${(e.path || '/engine.io').replace(/\/$/, '')}/`, this.forceJSONP = !!e.forceJSONP, this.jsonp = !1 !== e.jsonp, this.forceBase64 = !!e.forceBase64, this.enablesXDR = !!e.enablesXDR, this.timestampParam = e.timestampParam || 't', this.timestampRequests = e.timestampRequests, this.transports = e.transports || ['polling', 'websocket'], this.readyState = '', this.writeBuffer = [], this.policyPort = e.policyPort || 843, this.rememberUpgrade = e.rememberUpgrade || !1, this.binaryType = null, this.onlyBinaryUpgrades = e.onlyBinaryUpgrades, this.perMessageDeflate = !1 !== e.perMessageDeflate && (e.perMessageDeflate || {}), !0 === this.perMessageDeflate && (this.perMessageDeflate = {}), this.perMessageDeflate && this.perMessageDeflate.threshold == null && (this.perMessageDeflate.threshold = 1024), this.pfx = e.pfx || null, this.key = e.key || null, this.passphrase = e.passphrase || null, this.cert = e.cert || null, this.ca = e.ca || null, this.ciphers = e.ciphers || null, this.rejectUnauthorized = void 0 === e.rejectUnauthorized || e.rejectUnauthorized;
          const o = typeof n === 'object' && n;
          o.global === o && e.extraHeaders && Object.keys(e.extraHeaders).length > 0 && (this.extraHeaders = e.extraHeaders), this.open();
        }

        function o(t) {
          const e = {};
          for (const n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
          return e;
        }

        var i = t('./transports'),
          s = t('component-emitter'),
          a = t('debug')('engine.io-client:socket'),
          c = t('indexof'),
          u = t('engine.io-parser'),
          f = t('parseuri'),
          l = t('parsejson'),
          p = t('parseqs');
        e.exports = r, r.priorWebsocketSuccess = !1, s(r.prototype), r.protocol = u.protocol, r.Socket = r, r.Transport = t('./transport'), r.transports = t('./transports'), r.parser = t('engine.io-parser'), r.prototype.createTransport = function (t) {
          a('creating transport "%s"', t);
          const e = o(this.query);
          e.EIO = u.protocol, e.transport = t, this.id && (e.sid = this.id);
          const n = new i[t]({
            agent: this.agent,
            hostname: this.hostname,
            port: this.port,
            secure: this.secure,
            path: this.path,
            query: e,
            forceJSONP: this.forceJSONP,
            jsonp: this.jsonp,
            forceBase64: this.forceBase64,
            enablesXDR: this.enablesXDR,
            timestampRequests: this.timestampRequests,
            timestampParam: this.timestampParam,
            policyPort: this.policyPort,
            socket: this,
            pfx: this.pfx,
            key: this.key,
            passphrase: this.passphrase,
            cert: this.cert,
            ca: this.ca,
            ciphers: this.ciphers,
            rejectUnauthorized: this.rejectUnauthorized,
            perMessageDeflate: this.perMessageDeflate,
            extraHeaders: this.extraHeaders,
          });
          return n;
        }, r.prototype.open = function () {
          let t;
          if (this.rememberUpgrade && r.priorWebsocketSuccess && this.transports.indexOf('websocket') != -1) t = 'websocket'; else {
            if (this.transports.length === 0) {
              const e = this;
              return void setTimeout(() => {
                e.emit('error', 'No transports available');
              }, 0);
            }
            t = this.transports[0];
          }
          this.readyState = 'opening';
          try {
            t = this.createTransport(t);
          } catch (t) {
            return this.transports.shift(), void this.open();
          }
          t.open(), this.setTransport(t);
        }, r.prototype.setTransport = function (t) {
          a('setting transport %s', t.name);
          const e = this;
          this.transport && (a('clearing existing transport %s', this.transport.name), this.transport.removeAllListeners()), this.transport = t, t.on('drain', () => {
            e.onDrain();
          }).on('packet', (t) => {
            e.onPacket(t);
          }).on('error', (t) => {
            e.onError(t);
          }).on('close', () => {
            e.onClose('transport close');
          });
        }, r.prototype.probe = function (t) {
          function e() {
            if (p.onlyBinaryUpgrades) {
              const e = !this.supportsBinary && p.transport.supportsBinary;
              l = l || e;
            }
            l || (a('probe transport "%s" opened', t), f.send([{
              type: 'ping',
              data: 'probe',
            }]), f.once('packet', (e) => {
              if (!l) {
                if (e.type == 'pong' && e.data == 'probe') {
                  if (a('probe transport "%s" pong', t), p.upgrading = !0, p.emit('upgrading', f), !f) return;
                  r.priorWebsocketSuccess = f.name == 'websocket', a('pausing current transport "%s"', p.transport.name), p.transport.pause(() => {
                    l || p.readyState != 'closed' && (a('changing transport and sending upgrade packet'), u(), p.setTransport(f), f.send([{ type: 'upgrade' }]), p.emit('upgrade', f), f = null, p.upgrading = !1, p.flush());
                  });
                } else {
                  a('probe transport "%s" failed', t);
                  const n = new Error('probe error');
                  n.transport = f.name, p.emit('upgradeError', n);
                }
              }
            }));
          }

          function n() {
            l || (l = !0, u(), f.close(), f = null);
          }

          function o(e) {
            const r = new Error(`probe error: ${e}`);
            r.transport = f.name, n(), a('probe transport "%s" failed because of error: %s', t, e), p.emit('upgradeError', r);
          }

          function i() {
            o('transport closed');
          }

          function s() {
            o('socket closed');
          }

          function c(t) {
            f && t.name != f.name && (a('"%s" works - aborting "%s"', t.name, f.name), n());
          }

          function u() {
            f.removeListener('open', e), f.removeListener('error', o), f.removeListener('close', i), p.removeListener('close', s), p.removeListener('upgrading', c);
          }

          a('probing transport "%s"', t);
          var f = this.createTransport(t, { probe: 1 }),
            l = !1,
            p = this;
          r.priorWebsocketSuccess = !1, f.once('open', e), f.once('error', o), f.once('close', i), this.once('close', s), this.once('upgrading', c), f.open();
        }, r.prototype.onOpen = function () {
          if (a('socket open'), this.readyState = 'open', r.priorWebsocketSuccess = this.transport.name == 'websocket', this.emit('open'), this.flush(), this.readyState == 'open' && this.upgrade && this.transport.pause) {
            a('starting upgrade probes');
            for (let t = 0, e = this.upgrades.length; e > t; t++) this.probe(this.upgrades[t]);
          }
        }, r.prototype.onPacket = function (t) {
          if (this.readyState == 'opening' || this.readyState == 'open') {
            switch (a('socket receive: type "%s", data "%s"', t.type, t.data), this.emit('packet', t), this.emit('heartbeat'), t.type) {
              case 'open':
                this.onHandshake(l(t.data));
                break;
              case 'pong':
                this.setPing(), this.emit('pong');
                break;
              case 'error':
                var e = new Error('server error');
                e.code = t.data, this.onError(e);
                break;
              case 'message':
                this.emit('data', t.data), this.emit('message', t.data);
            }
          } else a('packet received with socket readyState "%s"', this.readyState);
        }, r.prototype.onHandshake = function (t) {
          this.emit('handshake', t), this.id = t.sid, this.transport.query.sid = t.sid, this.upgrades = this.filterUpgrades(t.upgrades), this.pingInterval = t.pingInterval, this.pingTimeout = t.pingTimeout, this.onOpen(), this.readyState != 'closed' && (this.setPing(), this.removeListener('heartbeat', this.onHeartbeat), this.on('heartbeat', this.onHeartbeat));
        }, r.prototype.onHeartbeat = function (t) {
          clearTimeout(this.pingTimeoutTimer);
          const e = this;
          e.pingTimeoutTimer = setTimeout(() => {
            e.readyState != 'closed' && e.onClose('ping timeout');
          }, t || e.pingInterval + e.pingTimeout);
        }, r.prototype.setPing = function () {
          const t = this;
          clearTimeout(t.pingIntervalTimer), t.pingIntervalTimer = setTimeout(() => {
            a('writing ping packet - expecting pong within %sms', t.pingTimeout), t.ping(), t.onHeartbeat(t.pingTimeout);
          }, t.pingInterval);
        }, r.prototype.ping = function () {
          const t = this;
          this.sendPacket('ping', () => {
            t.emit('ping');
          });
        }, r.prototype.onDrain = function () {
          this.writeBuffer.splice(0, this.prevBufferLen), this.prevBufferLen = 0, this.writeBuffer.length === 0 ? this.emit('drain') : this.flush();
        }, r.prototype.flush = function () {
          this.readyState != 'closed' && this.transport.writable && !this.upgrading && this.writeBuffer.length && (a('flushing %d packets in socket', this.writeBuffer.length), this.transport.send(this.writeBuffer), this.prevBufferLen = this.writeBuffer.length, this.emit('flush'));
        }, r.prototype.write = r.prototype.send = function (t, e, n) {
          return this.sendPacket('message', t, e, n), this;
        }, r.prototype.sendPacket = function (t, e, n, r) {
          if (typeof e === 'function' && (r = e, e = void 0), typeof n === 'function' && (r = n, n = null), this.readyState != 'closing' && this.readyState != 'closed') {
            n = n || {}, n.compress = !1 !== n.compress;
            const o = { type: t, data: e, options: n };
            this.emit('packetCreate', o), this.writeBuffer.push(o), r && this.once('flush', r), this.flush();
          }
        }, r.prototype.close = function () {
          function t() {
            r.onClose('forced close'), a('socket closing - telling transport to close'), r.transport.close();
          }

          function e() {
            r.removeListener('upgrade', e), r.removeListener('upgradeError', e), t();
          }

          function n() {
            r.once('upgrade', e), r.once('upgradeError', e);
          }

          if (this.readyState == 'opening' || this.readyState == 'open') {
            this.readyState = 'closing';
            var r = this;
            this.writeBuffer.length ? this.once('drain', function () {
              this.upgrading ? n() : t();
            }) : this.upgrading ? n() : t();
          }
          return this;
        }, r.prototype.onError = function (t) {
          a('socket error %j', t), r.priorWebsocketSuccess = !1, this.emit('error', t), this.onClose('transport error', t);
        }, r.prototype.onClose = function (t, e) {
          if (this.readyState == 'opening' || this.readyState == 'open' || this.readyState == 'closing') {
            a('socket close with reason: "%s"', t);
            const n = this;
            clearTimeout(this.pingIntervalTimer), clearTimeout(this.pingTimeoutTimer), this.transport.removeAllListeners('close'), this.transport.close(), this.transport.removeAllListeners(), this.readyState = 'closed', this.id = null, this.emit('close', t, e), n.writeBuffer = [], n.prevBufferLen = 0;
          }
        }, r.prototype.filterUpgrades = function (t) {
          for (var e = [], n = 0, r = t.length; r > n; n++) ~c(this.transports, t[n]) && e.push(t[n]);
          return e;
        };
      }).call(this, typeof self !== 'undefined' ? self : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : {});
    }, {
      './transport': 19,
      './transports': 20,
      'component-emitter': 26,
      debug: 14,
      'engine.io-parser': 27,
      indexof: 32,
      parsejson: 36,
      parseqs: 37,
      parseuri: 38,
    }],
    19: [function (t, e, n) {
      function r(t) {
        this.path = t.path, this.hostname = t.hostname, this.port = t.port, this.secure = t.secure, this.query = t.query, this.timestampParam = t.timestampParam, this.timestampRequests = t.timestampRequests, this.readyState = '', this.agent = t.agent || !1, this.socket = t.socket, this.enablesXDR = t.enablesXDR, this.pfx = t.pfx, this.key = t.key, this.passphrase = t.passphrase, this.cert = t.cert, this.ca = t.ca, this.ciphers = t.ciphers, this.rejectUnauthorized = t.rejectUnauthorized, this.extraHeaders = t.extraHeaders;
      }

      let o = t('engine.io-parser'),
        i = t('component-emitter');
      e.exports = r, i(r.prototype), r.prototype.onError = function (t, e) {
        const n = new Error(t);
        return n.type = 'TransportError', n.description = e, this.emit('error', n), this;
      }, r.prototype.open = function () {
        return this.readyState != 'closed' && this.readyState != '' || (this.readyState = 'opening', this.doOpen()), this;
      }, r.prototype.close = function () {
        return this.readyState != 'opening' && this.readyState != 'open' || (this.doClose(), this.onClose()), this;
      }, r.prototype.send = function (t) {
        if (this.readyState != 'open') throw new Error('Transport not open');
        this.write(t);
      }, r.prototype.onOpen = function () {
        this.readyState = 'open', this.writable = !0, this.emit('open');
      }, r.prototype.onData = function (t) {
        const e = o.decodePacket(t, this.socket.binaryType);
        this.onPacket(e);
      }, r.prototype.onPacket = function (t) {
        this.emit('packet', t);
      }, r.prototype.onClose = function () {
        this.readyState = 'closed', this.emit('close');
      };
    }, { 'component-emitter': 26, 'engine.io-parser': 27 }],
    20: [function (t, e, n) {
      (function (e) {
        function r(t) {
          let n,
            r = !1,
            a = !1,
            c = !1 !== t.jsonp;
          if (e.location) {
            let u = location.protocol == 'https:',
              f = location.port;
            f || (f = u ? 443 : 80), r = t.hostname != location.hostname || f != t.port, a = t.secure != u;
          }
          if (t.xdomain = r, t.xscheme = a, n = new o(t), 'open' in n && !t.forceJSONP) return new i(t);
          if (!c) throw new Error('JSONP disabled');
          return new s(t);
        }

        var o = t('xmlhttprequest-ssl'),
          i = t('./polling-xhr'),
          s = t('./polling-jsonp'),
          a = t('./websocket');
        n.polling = r, n.websocket = a;
      }).call(this, typeof self !== 'undefined' ? self : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : {});
    }, {
      './polling-jsonp': 21, './polling-xhr': 22, './websocket': 24, 'xmlhttprequest-ssl': 25,
    }],
    21: [function (t, e, n) {
      (function (n) {
        function r() {
        }

        function o(t) {
          i.call(this, t), this.query = this.query || {}, a || (n.___eio || (n.___eio = []), a = n.___eio), this.index = a.length;
          const e = this;
          a.push((t) => {
            e.onData(t);
          }), this.query.j = this.index, n.document && n.addEventListener && n.addEventListener('beforeunload', () => {
            e.script && (e.script.onerror = r);
          }, !1);
        }

        var i = t('./polling'),
          s = t('component-inherit');
        e.exports = o;
        let a,
          c = /\n/g,
          u = /\\n/g;
        s(o, i), o.prototype.supportsBinary = !1, o.prototype.doClose = function () {
          this.script && (this.script.parentNode.removeChild(this.script), this.script = null), this.form && (this.form.parentNode.removeChild(this.form), this.form = null, this.iframe = null), i.prototype.doClose.call(this);
        }, o.prototype.doPoll = function () {
          let t = this,
            e = document.createElement('script');
          this.script && (this.script.parentNode.removeChild(this.script), this.script = null), e.async = !0, e.src = this.uri(), e.onerror = function (e) {
            t.onError('jsonp poll error', e);
          };
          const n = document.getElementsByTagName('script')[0];
          n ? n.parentNode.insertBefore(e, n) : (document.head || document.body).appendChild(e), this.script = e;
          const r = typeof navigator !== 'undefined' && /gecko/i.test(navigator.userAgent);
          r && setTimeout(() => {
            const t = document.createElement('iframe');
            document.body.appendChild(t), document.body.removeChild(t);
          }, 100);
        }, o.prototype.doWrite = function (t, e) {
          function n() {
            r(), e();
          }

          function r() {
            if (o.iframe) {
              try {
                o.form.removeChild(o.iframe);
              } catch (t) {
                o.onError('jsonp polling iframe removal error', t);
              }
            }
            try {
              const t = `<iframe src="javascript:0" name="${o.iframeId}">`;
              i = document.createElement(t);
            } catch (t) {
              i = document.createElement('iframe'), i.name = o.iframeId, i.src = 'javascript:0';
            }
            i.id = o.iframeId, o.form.appendChild(i), o.iframe = i;
          }

          var o = this;
          if (!this.form) {
            var i,
              s = document.createElement('form'),
              a = document.createElement('textarea'),
              f = this.iframeId = `eio_iframe_${this.index}`;
            s.className = 'socketio', s.style.position = 'absolute', s.style.top = '-1000px', s.style.left = '-1000px', s.target = f, s.method = 'POST', s.setAttribute('accept-charset', 'utf-8'), a.name = 'd', s.appendChild(a), document.body.appendChild(s), this.form = s, this.area = a;
          }
          this.form.action = this.uri(), r(), t = t.replace(u, '\\\n'), this.area.value = t.replace(c, '\\n');
          try {
            this.form.submit();
          } catch (t) {
          }
          this.iframe.attachEvent ? this.iframe.onreadystatechange = function () {
            o.iframe.readyState == 'complete' && n();
          } : this.iframe.onload = n;
        };
      }).call(this, typeof self !== 'undefined' ? self : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : {});
    }, { './polling': 23, 'component-inherit': 13 }],
    22: [function (t, e, n) {
      (function (n) {
        function r() {
        }

        function o(t) {
          if (c.call(this, t), n.location) {
            let e = location.protocol == 'https:',
              r = location.port;
            r || (r = e ? 443 : 80), this.xd = t.hostname != n.location.hostname || r != t.port, this.xs = t.secure != e;
          } else this.extraHeaders = t.extraHeaders;
        }

        function i(t) {
          this.method = t.method || 'GET', this.uri = t.uri, this.xd = !!t.xd, this.xs = !!t.xs, this.async = !1 !== t.async, this.data = void 0 != t.data ? t.data : null, this.agent = t.agent, this.isBinary = t.isBinary, this.supportsBinary = t.supportsBinary, this.enablesXDR = t.enablesXDR, this.pfx = t.pfx, this.key = t.key, this.passphrase = t.passphrase, this.cert = t.cert, this.ca = t.ca, this.ciphers = t.ciphers, this.rejectUnauthorized = t.rejectUnauthorized, this.extraHeaders = t.extraHeaders, this.create();
        }

        function s() {
          for (const t in i.requests) i.requests.hasOwnProperty(t) && i.requests[t].abort();
        }

        var a = t('xmlhttprequest-ssl'),
          c = t('./polling'),
          u = t('component-emitter'),
          f = t('component-inherit'),
          l = t('debug')('engine.io-client:polling-xhr');
        e.exports = o, e.exports.Request = i, f(o, c), o.prototype.supportsBinary = !0, o.prototype.request = function (t) {
          return t = t || {}, t.uri = this.uri(), t.xd = this.xd, t.xs = this.xs, t.agent = this.agent || !1, t.supportsBinary = this.supportsBinary, t.enablesXDR = this.enablesXDR, t.pfx = this.pfx, t.key = this.key, t.passphrase = this.passphrase, t.cert = this.cert, t.ca = this.ca, t.ciphers = this.ciphers, t.rejectUnauthorized = this.rejectUnauthorized, t.extraHeaders = this.extraHeaders, new i(t);
        }, o.prototype.doWrite = function (t, e) {
          let n = typeof t !== 'string' && void 0 !== t,
            r = this.request({ method: 'POST', data: t, isBinary: n }),
            o = this;
          r.on('success', e), r.on('error', (t) => {
            o.onError('xhr post error', t);
          }), this.sendXhr = r;
        }, o.prototype.doPoll = function () {
          l('xhr poll');
          let t = this.request(),
            e = this;
          t.on('data', (t) => {
            e.onData(t);
          }), t.on('error', (t) => {
            e.onError('xhr poll error', t);
          }), this.pollXhr = t;
        }, u(i.prototype), i.prototype.create = function () {
          const t = {
            agent: this.agent, xdomain: this.xd, xscheme: this.xs, enablesXDR: this.enablesXDR,
          };
          t.pfx = this.pfx, t.key = this.key, t.passphrase = this.passphrase, t.cert = this.cert, t.ca = this.ca, t.ciphers = this.ciphers, t.rejectUnauthorized = this.rejectUnauthorized;
          let e = this.xhr = new a(t),
            r = this;
          try {
            l('xhr open %s: %s', this.method, this.uri), e.open(this.method, this.uri, this.async);
            try {
              if (this.extraHeaders) {
                e.setDisableHeaderCheck(!0);
                for (const o in this.extraHeaders) this.extraHeaders.hasOwnProperty(o) && e.setRequestHeader(o, this.extraHeaders[o]);
              }
            } catch (t) {
            }
            if (this.supportsBinary && (e.responseType = 'arraybuffer'), this.method == 'POST') {
              try {
                this.isBinary ? e.setRequestHeader('Content-type', 'application/octet-stream') : e.setRequestHeader('Content-type', 'text/plain;charset=UTF-8');
              } catch (t) {
              }
            }
            'withCredentials' in e && (e.withCredentials = !0), this.hasXDR() ? (e.onload = function () {
              r.onLoad();
            }, e.onerror = function () {
              r.onError(e.responseText);
            }) : e.onreadystatechange = function () {
              e.readyState == 4 && (e.status == 200 || e.status == 1223 ? r.onLoad() : setTimeout(() => {
                r.onError(e.status);
              }, 0));
            }, l('xhr data %s', this.data), e.send(this.data);
          } catch (t) {
            return void setTimeout(() => {
              r.onError(t);
            }, 0);
          }
          n.document && (this.index = i.requestsCount++, i.requests[this.index] = this);
        }, i.prototype.onSuccess = function () {
          this.emit('success'), this.cleanup();
        }, i.prototype.onData = function (t) {
          this.emit('data', t), this.onSuccess();
        }, i.prototype.onError = function (t) {
          this.emit('error', t), this.cleanup(!0);
        }, i.prototype.cleanup = function (t) {
          if (typeof this.xhr !== 'undefined' && this.xhr !== null) {
            if (this.hasXDR() ? this.xhr.onload = this.xhr.onerror = r : this.xhr.onreadystatechange = r, t) {
              try {
                this.xhr.abort();
              } catch (t) {
              }
            }
            n.document && delete i.requests[this.index], this.xhr = null;
          }
        }, i.prototype.onLoad = function () {
          let t;
          try {
            let e;
            try {
              e = this.xhr.getResponseHeader('Content-Type').split(';')[0];
            } catch (t) {
            }
            if (e === 'application/octet-stream') t = this.xhr.response; else if (this.supportsBinary) {
              try {
                t = String.fromCharCode.apply(null, new Uint8Array(this.xhr.response));
              } catch (e) {
                for (var n = new Uint8Array(this.xhr.response), r = [], o = 0, i = n.length; i > o; o++) r.push(n[o]);
                t = String.fromCharCode.apply(null, r);
              }
            } else t = this.xhr.responseText;
          } catch (t) {
            this.onError(t);
          }
          t != null && this.onData(t);
        }, i.prototype.hasXDR = function () {
          return typeof n.XDomainRequest !== 'undefined' && !this.xs && this.enablesXDR;
        }, i.prototype.abort = function () {
          this.cleanup();
        }, n.document && (i.requestsCount = 0, i.requests = {}, n.attachEvent ? n.attachEvent('onunload', s) : n.addEventListener && n.addEventListener('beforeunload', s, !1));
      }).call(this, typeof self !== 'undefined' ? self : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : {});
    }, {
      './polling': 23, 'component-emitter': 26, 'component-inherit': 13, debug: 14, 'xmlhttprequest-ssl': 25,
    }],
    23: [function (t, e, n) {
      function r(t) {
        const e = t && t.forceBase64;
        f && !e || (this.supportsBinary = !1), o.call(this, t);
      }

      var o = t('../transport'),
        i = t('parseqs'),
        s = t('engine.io-parser'),
        a = t('component-inherit'),
        c = t('yeast'),
        u = t('debug')('engine.io-client:polling');
      e.exports = r;
      var f = (function () {
        let e = t('xmlhttprequest-ssl'),
          n = new e({ xdomain: !1 });
        return n.responseType != null;
      }());
      a(r, o), r.prototype.name = 'polling', r.prototype.doOpen = function () {
        this.poll();
      }, r.prototype.pause = function (t) {
        function e() {
          u('paused'), n.readyState = 'paused', t();
        }

        var n = this;
        if (this.readyState = 'pausing', this.polling || !this.writable) {
          let r = 0;
          this.polling && (u('we are currently polling - waiting to pause'), r++, this.once('pollComplete', () => {
            u('pre-pause polling complete'), --r || e();
          })), this.writable || (u('we are currently writing - waiting to pause'), r++, this.once('drain', () => {
            u('pre-pause writing complete'), --r || e();
          }));
        } else e();
      }, r.prototype.poll = function () {
        u('polling'), this.polling = !0, this.doPoll(), this.emit('poll');
      }, r.prototype.onData = function (t) {
        const e = this;
        u('polling got data %s', t);
        const n = function (t, n, r) {
          return e.readyState == 'opening' && e.onOpen(), t.type == 'close' ? (e.onClose(), !1) : void e.onPacket(t);
        };
        s.decodePayload(t, this.socket.binaryType, n), this.readyState != 'closed' && (this.polling = !1, this.emit('pollComplete'), this.readyState == 'open' ? this.poll() : u('ignoring poll - transport state "%s"', this.readyState));
      }, r.prototype.doClose = function () {
        function t() {
          u('writing close packet'), e.write([{ type: 'close' }]);
        }

        var e = this;
        this.readyState == 'open' ? (u('transport open - closing'), t()) : (u('transport not open - deferring close'), this.once('open', t));
      }, r.prototype.write = function (t) {
        var e = this;
        this.writable = !1;
        var n = function () {
            e.writable = !0, e.emit('drain');
          },
          e = this;
        s.encodePayload(t, this.supportsBinary, (t) => {
          e.doWrite(t, n);
        });
      }, r.prototype.uri = function () {
        let t = this.query || {},
          e = this.secure ? 'https' : 'http',
          n = '';
        !1 !== this.timestampRequests && (t[this.timestampParam] = c()), this.supportsBinary || t.sid || (t.b64 = 1), t = i.encode(t), this.port && (e == 'https' && this.port != 443 || e == 'http' && this.port != 80) && (n = `:${this.port}`), t.length && (t = `?${t}`);
        const r = this.hostname.indexOf(':') !== -1;
        return `${e}://${r ? `[${this.hostname}]` : this.hostname}${n}${this.path}${t}`;
      };
    }, {
      '../transport': 19,
      'component-inherit': 13,
      debug: 14,
      'engine.io-parser': 27,
      parseqs: 37,
      'xmlhttprequest-ssl': 25,
      yeast: 45,
    }],
    24: [function (t, e, n) {
      (function (n) {
        function r(t) {
          const e = t && t.forceBase64;
          e && (this.supportsBinary = !1), this.perMessageDeflate = t.perMessageDeflate, o.call(this, t);
        }

        var o = t('../transport'),
          i = t('engine.io-parser'),
          s = t('parseqs'),
          a = t('component-inherit'),
          c = t('yeast'),
          u = t('debug')('engine.io-client:websocket'),
          f = n.WebSocket || n.MozWebSocket,
          l = f;
        if (!l && typeof window === 'undefined') {
          try {
            l = t('ws');
          } catch (t) {
          }
        }
        e.exports = r, a(r, o), r.prototype.name = 'websocket', r.prototype.supportsBinary = !0, r.prototype.doOpen = function () {
          if (this.check()) {
            let t = this.uri(),
              e = void 0,
              n = { agent: this.agent, perMessageDeflate: this.perMessageDeflate };
            n.pfx = this.pfx, n.key = this.key, n.passphrase = this.passphrase, n.cert = this.cert, n.ca = this.ca, n.ciphers = this.ciphers, n.rejectUnauthorized = this.rejectUnauthorized, this.extraHeaders && (n.headers = this.extraHeaders), this.ws = f ? new l(t) : new l(t, e, n), void 0 === this.ws.binaryType && (this.supportsBinary = !1), this.ws.supports && this.ws.supports.binary ? (this.supportsBinary = !0, this.ws.binaryType = 'buffer') : this.ws.binaryType = 'arraybuffer', this.addEventListeners();
          }
        }, r.prototype.addEventListeners = function () {
          const t = this;
          this.ws.onopen = function () {
            t.onOpen();
          }, this.ws.onclose = function () {
            t.onClose();
          }, this.ws.onmessage = function (e) {
            t.onData(e.data);
          }, this.ws.onerror = function (e) {
            t.onError('websocket error', e);
          };
        }, typeof navigator !== 'undefined' && /iPad|iPhone|iPod/i.test(navigator.userAgent) && (r.prototype.onData = function (t) {
          const e = this;
          setTimeout(() => {
            o.prototype.onData.call(e, t);
          }, 0);
        }), r.prototype.write = function (t) {
          function e() {
            r.emit('flush'), setTimeout(() => {
              r.writable = !0, r.emit('drain');
            }, 0);
          }

          var r = this;
          this.writable = !1;
          for (var o = t.length, s = 0, a = o; a > s; s++) {
            !(function (t) {
              i.encodePacket(t, r.supportsBinary, (i) => {
                if (!f) {
                  var s = {};
                  if (t.options && (s.compress = t.options.compress), r.perMessageDeflate) {
                    const a = typeof i === 'string' ? n.Buffer.byteLength(i) : i.length;
                    a < r.perMessageDeflate.threshold && (s.compress = !1);
                  }
                }
                try {
                  f ? r.ws.send(i) : r.ws.send(i, s);
                } catch (t) {
                  u('websocket closed before onclose event');
                }
                --o || e();
              });
            }(t[s]));
          }
        }, r.prototype.onClose = function () {
          o.prototype.onClose.call(this);
        }, r.prototype.doClose = function () {
          typeof this.ws !== 'undefined' && this.ws.close();
        }, r.prototype.uri = function () {
          let t = this.query || {},
            e = this.secure ? 'wss' : 'ws',
            n = '';
          this.port && (e == 'wss' && this.port != 443 || e == 'ws' && this.port != 80) && (n = `:${this.port}`), this.timestampRequests && (t[this.timestampParam] = c()), this.supportsBinary || (t.b64 = 1), t = s.encode(t), t.length && (t = `?${t}`);
          const r = this.hostname.indexOf(':') !== -1;
          return `${e}://${r ? `[${this.hostname}]` : this.hostname}${n}${this.path}${t}`;
        }, r.prototype.check = function () {
          return !(!l || '__initialize' in l && this.name === r.prototype.name);
        };
      }).call(this, typeof self !== 'undefined' ? self : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : {});
    }, {
      '../transport': 19,
      'component-inherit': 13,
      debug: 14,
      'engine.io-parser': 27,
      parseqs: 37,
      ws: void 0,
      yeast: 45,
    }],
    25: [function (t, e, n) {
      const r = t('has-cors');
      e.exports = function (t) {
        let e = t.xdomain,
          n = t.xscheme,
          o = t.enablesXDR;
        try {
          if (typeof XMLHttpRequest !== 'undefined' && (!e || r)) return new XMLHttpRequest();
        } catch (t) {
        }
        try {
          if (typeof XDomainRequest !== 'undefined' && !n && o) return new XDomainRequest();
        } catch (t) {
        }
        if (!e) {
          try {
            return new ActiveXObject('Microsoft.XMLHTTP');
          } catch (t) {
          }
        }
      };
    }, { 'has-cors': 31 }],
    26: [function (t, e, n) {
      function r(t) {
        return t ? o(t) : void 0;
      }

      function o(t) {
        for (const e in r.prototype) t[e] = r.prototype[e];
        return t;
      }

      e.exports = r, r.prototype.on = r.prototype.addEventListener = function (t, e) {
        return this._callbacks = this._callbacks || {}, (this._callbacks[t] = this._callbacks[t] || []).push(e), this;
      }, r.prototype.once = function (t, e) {
        function n() {
          r.off(t, n), e.apply(this, arguments);
        }

        var r = this;
        return this._callbacks = this._callbacks || {}, n.fn = e, this.on(t, n), this;
      }, r.prototype.off = r.prototype.removeListener = r.prototype.removeAllListeners = r.prototype.removeEventListener = function (t, e) {
        if (this._callbacks = this._callbacks || {}, arguments.length == 0) return this._callbacks = {}, this;
        const n = this._callbacks[t];
        if (!n) return this;
        if (arguments.length == 1) return delete this._callbacks[t], this;
        for (var r, o = 0; o < n.length; o++) {
          if (r = n[o], r === e || r.fn === e) {
            n.splice(o, 1);
            break;
          }
        }
        return this;
      }, r.prototype.emit = function (t) {
        this._callbacks = this._callbacks || {};
        let e = [].slice.call(arguments, 1),
          n = this._callbacks[t];
        if (n) {
          n = n.slice(0);
          for (let r = 0, o = n.length; o > r; ++r) n[r].apply(this, e);
        }
        return this;
      }, r.prototype.listeners = function (t) {
        return this._callbacks = this._callbacks || {}, this._callbacks[t] || [];
      }, r.prototype.hasListeners = function (t) {
        return !!this.listeners(t).length;
      };
    }, {}],
    27: [function (t, e, n) {
      (function (e) {
        function r(t, e) {
          const r = `b${n.packets[t.type]}${t.data.data}`;
          return e(r);
        }

        function o(t, e, r) {
          if (!e) return n.encodeBase64Packet(t, r);
          let o = t.data,
            i = new Uint8Array(o),
            s = new Uint8Array(1 + o.byteLength);
          s[0] = g[t.type];
          for (let a = 0; a < i.length; a++) s[a + 1] = i[a];
          return r(s.buffer);
        }

        function i(t, e, r) {
          if (!e) return n.encodeBase64Packet(t, r);
          const o = new FileReader();
          return o.onload = function () {
            t.data = o.result, n.encodePacket(t, e, !0, r);
          }, o.readAsArrayBuffer(t.data);
        }

        function s(t, e, r) {
          if (!e) return n.encodeBase64Packet(t, r);
          if (m) return i(t, e, r);
          const o = new Uint8Array(1);
          o[0] = g[t.type];
          const s = new w([o.buffer, t.data]);
          return r(s);
        }

        function a(t, e, n) {
          for (var r = new Array(t.length), o = p(t.length, n), i = function (t, n, o) {
              e(n, (e, n) => {
                r[t] = n, o(e, r);
              });
            }, s = 0; s < t.length; s++) i(s, t[s], o);
        }

        var c = t('./keys'),
          u = t('has-binary'),
          f = t('arraybuffer.slice'),
          l = t('base64-arraybuffer'),
          p = t('after'),
          h = t('utf8'),
          d = navigator.userAgent.match(/Android/i),
          y = /PhantomJS/i.test(navigator.userAgent),
          m = d || y;
        n.protocol = 3;
        var g = n.packets = {
            open: 0, close: 1, ping: 2, pong: 3, message: 4, upgrade: 5, noop: 6,
          },
          v = c(g),
          b = { type: 'error', data: 'parser error' },
          w = t('blob');
        n.encodePacket = function (t, n, i, a) {
          typeof n === 'function' && (a = n, n = !1), typeof i === 'function' && (a = i, i = null);
          const c = void 0 === t.data ? void 0 : t.data.buffer || t.data;
          if (e.ArrayBuffer && c instanceof ArrayBuffer) return o(t, n, a);
          if (w && c instanceof e.Blob) return s(t, n, a);
          if (c && c.base64) return r(t, a);
          let u = g[t.type];
          return void 0 !== t.data && (u += i ? h.encode(String(t.data)) : String(t.data)), a(`${u}`);
        }, n.encodeBase64Packet = function (t, r) {
          let o = `b${n.packets[t.type]}`;
          if (w && t.data instanceof e.Blob) {
            const i = new FileReader();
            return i.onload = function () {
              const t = i.result.split(',')[1];
              r(o + t);
            }, i.readAsDataURL(t.data);
          }
          let s;
          try {
            s = String.fromCharCode.apply(null, new Uint8Array(t.data));
          } catch (e) {
            for (var a = new Uint8Array(t.data), c = new Array(a.length), u = 0; u < a.length; u++) c[u] = a[u];
            s = String.fromCharCode.apply(null, c);
          }
          return o += e.btoa(s), r(o);
        }, n.decodePacket = function (t, e, r) {
          if (typeof t === 'string' || void 0 === t) {
            if (t.charAt(0) == 'b') return n.decodeBase64Packet(t.substr(1), e);
            if (r) {
              try {
                t = h.decode(t);
              } catch (t) {
                return b;
              }
            }
            var o = t.charAt(0);
            return Number(o) == o && v[o] ? t.length > 1 ? { type: v[o], data: t.substring(1) } : { type: v[o] } : b;
          }
          var i = new Uint8Array(t),
            o = i[0],
            s = f(t, 1);
          return w && e === 'blob' && (s = new w([s])), { type: v[o], data: s };
        }, n.decodeBase64Packet = function (t, n) {
          const r = v[t.charAt(0)];
          if (!e.ArrayBuffer) return { type: r, data: { base64: !0, data: t.substr(1) } };
          let o = l.decode(t.substr(1));
          return n === 'blob' && w && (o = new w([o])), { type: r, data: o };
        }, n.encodePayload = function (t, e, r) {
          function o(t) {
            return `${t.length}:${t}`;
          }

          function i(t, r) {
            n.encodePacket(t, !!s && e, !0, (t) => {
              r(null, o(t));
            });
          }

          typeof e === 'function' && (r = e, e = null);
          var s = u(t);
          return e && s ? w && !m ? n.encodePayloadAsBlob(t, r) : n.encodePayloadAsArrayBuffer(t, r) : t.length ? void a(t, i, (t, e) => r(e.join(''))) : r('0:');
        }, n.decodePayload = function (t, e, r) {
          if (typeof t !== 'string') return n.decodePayloadAsBinary(t, e, r);
          typeof e === 'function' && (r = e, e = null);
          let o;
          if (t == '') return r(b, 0, 1);
          for (var i, s, a = '', c = 0, u = t.length; u > c; c++) {
            const f = t.charAt(c);
            if (f != ':') a += f; else {
              if (a == '' || a != (i = Number(a))) return r(b, 0, 1);
              if (s = t.substr(c + 1, i), a != s.length) return r(b, 0, 1);
              if (s.length) {
                if (o = n.decodePacket(s, e, !0), b.type == o.type && b.data == o.data) return r(b, 0, 1);
                const l = r(o, c + i, u);
                if (!1 === l) return;
              }
              c += i, a = '';
            }
          }
          return a != '' ? r(b, 0, 1) : void 0;
        }, n.encodePayloadAsArrayBuffer = function (t, e) {
          function r(t, e) {
            n.encodePacket(t, !0, !0, t => e(null, t));
          }

          return t.length ? void a(t, r, (t, n) => {
            let r = n.reduce((t, e) => {
                let n;
                return n = typeof e === 'string' ? e.length : e.byteLength, t + n.toString().length + n + 2;
              }, 0),
              o = new Uint8Array(r),
              i = 0;
            return n.forEach((t) => {
              let e = typeof t === 'string',
                n = t;
              if (e) {
                for (var r = new Uint8Array(t.length), s = 0; s < t.length; s++) r[s] = t.charCodeAt(s);
                n = r.buffer;
              }
              e ? o[i++] = 0 : o[i++] = 1;
              for (var a = n.byteLength.toString(), s = 0; s < a.length; s++) o[i++] = parseInt(a[s]);
              o[i++] = 255;
              for (var r = new Uint8Array(n), s = 0; s < r.length; s++) o[i++] = r[s];
            }), e(o.buffer);
          }) : e(new ArrayBuffer(0));
        }, n.encodePayloadAsBlob = function (t, e) {
          function r(t, e) {
            n.encodePacket(t, !0, !0, (t) => {
              const n = new Uint8Array(1);
              if (n[0] = 1, typeof t === 'string') {
                for (var r = new Uint8Array(t.length), o = 0; o < t.length; o++) r[o] = t.charCodeAt(o);
                t = r.buffer, n[0] = 0;
              }
              for (var i = t instanceof ArrayBuffer ? t.byteLength : t.size, s = i.toString(), a = new Uint8Array(s.length + 1), o = 0; o < s.length; o++) a[o] = parseInt(s[o]);
              if (a[s.length] = 255, w) {
                const c = new w([n.buffer, a.buffer, t]);
                e(null, c);
              }
            });
          }

          a(t, r, (t, n) => e(new w(n)));
        }, n.decodePayloadAsBinary = function (t, e, r) {
          typeof e === 'function' && (r = e, e = null);
          for (var o = t, i = [], s = !1; o.byteLength > 0;) {
            for (var a = new Uint8Array(o), c = a[0] === 0, u = '', l = 1; a[l] != 255; l++) {
              if (u.length > 310) {
                s = !0;
                break;
              }
              u += a[l];
            }
            if (s) return r(b, 0, 1);
            o = f(o, 2 + u.length), u = parseInt(u);
            let p = f(o, 0, u);
            if (c) {
              try {
                p = String.fromCharCode.apply(null, new Uint8Array(p));
              } catch (t) {
                const h = new Uint8Array(p);
                p = '';
                for (var l = 0; l < h.length; l++) p += String.fromCharCode(h[l]);
              }
            }
            i.push(p), o = f(o, u);
          }
          const d = i.length;
          i.forEach((t, o) => {
            r(n.decodePacket(t, e, !0), o, d);
          });
        };
      }).call(this, typeof self !== 'undefined' ? self : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : {});
    }, {
      './keys': 28, after: 6, 'arraybuffer.slice': 7, 'base64-arraybuffer': 9, blob: 10, 'has-binary': 29, utf8: 44,
    }],
    28: [function (t, e, n) {
      e.exports = Object.keys || function (t) {
        let e = [],
          n = Object.prototype.hasOwnProperty;
        for (const r in t) n.call(t, r) && e.push(r);
        return e;
      };
    }, {}],
    29: [function (t, e, n) {
      (function (n) {
        function r(t) {
          function e(t) {
            if (!t) return !1;
            if (n.Buffer && n.Buffer.isBuffer(t) || n.ArrayBuffer && t instanceof ArrayBuffer || n.Blob && t instanceof Blob || n.File && t instanceof File) return !0;
            if (o(t)) {
              for (let r = 0; r < t.length; r++) if (e(t[r])) return !0;
            } else if (t && typeof t === 'object') {
              t.toJSON && (t = t.toJSON());
              for (const i in t) if (Object.prototype.hasOwnProperty.call(t, i) && e(t[i])) return !0;
            }
            return !1;
          }

          return e(t);
        }

        var o = t('isarray');
        e.exports = r;
      }).call(this, typeof self !== 'undefined' ? self : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : {});
    }, { isarray: 33 }],
    30: [function (t, e, n) {
      (function (n) {
        function r(t) {
          function e(t) {
            if (!t) return !1;
            if (n.Buffer && n.Buffer.isBuffer && n.Buffer.isBuffer(t) || n.ArrayBuffer && t instanceof ArrayBuffer || n.Blob && t instanceof Blob || n.File && t instanceof File) return !0;
            if (o(t)) {
              for (let r = 0; r < t.length; r++) if (e(t[r])) return !0;
            } else if (t && typeof t === 'object') {
              t.toJSON && typeof t.toJSON === 'function' && (t = t.toJSON());
              for (const i in t) if (Object.prototype.hasOwnProperty.call(t, i) && e(t[i])) return !0;
            }
            return !1;
          }

          return e(t);
        }

        var o = t('isarray');
        e.exports = r;
      }).call(this, typeof self !== 'undefined' ? self : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : {});
    }, { isarray: 33 }],
    31: [function (t, e, n) {
      try {
        e.exports = typeof XMLHttpRequest !== 'undefined' && 'withCredentials' in new XMLHttpRequest();
      } catch (t) {
        e.exports = !1;
      }
    }, {}],
    32: [function (t, e, n) {
      const r = [].indexOf;
      e.exports = function (t, e) {
        if (r) return t.indexOf(e);
        for (let n = 0; n < t.length; ++n) if (t[n] === e) return n;
        return -1;
      };
    }, {}],
    33: [function (t, e, n) {
      e.exports = Array.isArray || function (t) {
        return Object.prototype.toString.call(t) == '[object Array]';
      };
    }, {}],
    34: [function (e, n, r) {
      (function (e) {
        (function () {
          function o(t, e) {
            function n(t) {
              if (n[t] !== m) return n[t];
              let o;
              if (t == 'bug-string-char-index') o = 'a'[0] != 'a'; else if (t == 'json') o = n('json-stringify') && n('json-parse'); else {
                let s,
                  a = '{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}';
                if (t == 'json-stringify') {
                  let c = e.stringify,
                    f = typeof c === 'function' && b;
                  if (f) {
                    (s = function () {
                      return 1;
                    }).toJSON = s;
                    try {
                      f = c(0) === '0' && c(new r()) === '0' && c(new i()) == '""' && c(v) === m && c(m) === m && c() === m && c(s) === '1' && c([s]) == '[1]' && c([m]) == '[null]' && c(null) == 'null' && c([m, v, null]) == '[null,null,null]' && c({ a: [s, !0, !1, null, '\0\b\n\f\r\t'] }) == a && c(null, s) === '1' && c([1, 2], null, 1) == '[\n 1,\n 2\n]' && c(new u(-864e13)) == '"-271821-04-20T00:00:00.000Z"' && c(new u(864e13)) == '"+275760-09-13T00:00:00.000Z"' && c(new u(-621987552e5)) == '"-000001-01-01T00:00:00.000Z"' && c(new u(-1)) == '"1969-12-31T23:59:59.999Z"';
                    } catch (t) {
                      f = !1;
                    }
                  }
                  o = f;
                }
                if (t == 'json-parse') {
                  const l = e.parse;
                  if (typeof l === 'function') {
                    try {
                      if (l('0') === 0 && !l(!1)) {
                        s = l(a);
                        var p = s.a.length == 5 && s.a[0] === 1;
                        if (p) {
                          try {
                            p = !l('"\t"');
                          } catch (t) {
                          }
                          if (p) {
                            try {
                              p = l('01') !== 1;
                            } catch (t) {
                            }
                          }
                          if (p) {
                            try {
                              p = l('1.') !== 1;
                            } catch (t) {
                            }
                          }
                        }
                      }
                    } catch (t) {
                      p = !1;
                    }
                  }
                  o = p;
                }
              }
              return n[t] = !!o;
            }

            t || (t = c.Object()), e || (e = c.Object());
            var r = t.Number || c.Number,
              i = t.String || c.String,
              a = t.Object || c.Object,
              u = t.Date || c.Date,
              f = t.SyntaxError || c.SyntaxError,
              l = t.TypeError || c.TypeError,
              p = t.Math || c.Math,
              h = t.JSON || c.JSON;
            typeof h === 'object' && h && (e.stringify = h.stringify, e.parse = h.parse);
            var d,
              y,
              m,
              g = a.prototype,
              v = g.toString,
              b = new u(-0xc782b5b800cec);
            try {
              b = b.getUTCFullYear() == -109252 && b.getUTCMonth() === 0 && b.getUTCDate() === 1 && b.getUTCHours() == 10 && b.getUTCMinutes() == 37 && b.getUTCSeconds() == 6 && b.getUTCMilliseconds() == 708;
            } catch (t) {
            }
            if (!n('json')) {
              let w = '[object Function]',
                x = '[object Date]',
                k = '[object Number]',
                E = '[object String]',
                A = '[object Array]',
                C = '[object Boolean]',
                B = n('bug-string-char-index');
              if (!b) {
                var S = p.floor,
                  T = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334],
                  N = function (t, e) {
                    return T[e] + 365 * (t - 1970) + S((t - 1969 + (e = +(e > 1))) / 4) - S((t - 1901 + e) / 100) + S((t - 1601 + e) / 400);
                  };
              }
              if ((d = g.hasOwnProperty) || (d = function (t) {
                let e,
                  n = {};
                return (n.__proto__ = null, n.__proto__ = { toString: 1 }, n).toString != v ? d = function (t) {
                  let e = this.__proto__,
                    n = t in (this.__proto__ = null, this);
                  return this.__proto__ = e, n;
                } : (e = n.constructor, d = function (t) {
                  const n = (this.constructor || e).prototype;
                  return t in this && !(t in n && this[t] === n[t]);
                }), n = null, d.call(this, t);
              }), y = function (t, e) {
                let n,
                  r,
                  o,
                  i = 0;
                (n = function () {
                  this.valueOf = 0;
                }).prototype.valueOf = 0, r = new n();
                for (o in r) d.call(r, o) && i++;
                return n = r = null, i ? y = i == 2 ? function (t, e) {
                  let n,
                    r = {},
                    o = v.call(t) == w;
                  for (n in t) o && n == 'prototype' || d.call(r, n) || !(r[n] = 1) || !d.call(t, n) || e(n);
                } : function (t, e) {
                  let n,
                    r,
                    o = v.call(t) == w;
                  for (n in t) o && n == 'prototype' || !d.call(t, n) || (r = n === 'constructor') || e(n);
                  (r || d.call(t, n = 'constructor')) && e(n);
                } : (r = ['valueOf', 'toString', 'toLocaleString', 'propertyIsEnumerable', 'isPrototypeOf', 'hasOwnProperty', 'constructor'], y = function (t, e) {
                  let n,
                    o,
                    i = v.call(t) == w,
                    a = !i && typeof t.constructor !== 'function' && s[typeof t.hasOwnProperty] && t.hasOwnProperty || d;
                  for (n in t) i && n == 'prototype' || !a.call(t, n) || e(n);
                  for (o = r.length; n = r[--o]; a.call(t, n) && e(n)) ;
                }), y(t, e);
              }, !n('json-stringify')) {
                var j = {
                    92: '\\\\', 34: '\\"', 8: '\\b', 12: '\\f', 10: '\\n', 13: '\\r', 9: '\\t',
                  },
                  _ = '000000',
                  O = function (t, e) {
                    return (_ + (e || 0)).slice(-t);
                  },
                  P = '\\u00',
                  D = function (t) {
                    for (var e = '"', n = 0, r = t.length, o = !B || r > 10, i = o && (B ? t.split('') : t); r > n; n++) {
                      const s = t.charCodeAt(n);
                      switch (s) {
                        case 8:
                        case 9:
                        case 10:
                        case 12:
                        case 13:
                        case 34:
                        case 92:
                          e += j[s];
                          break;
                        default:
                          if (s < 32) {
                            e += P + O(2, s.toString(16));
                            break;
                          }
                          e += o ? i[n] : t.charAt(n);
                      }
                    }
                    return `${e}"`;
                  },
                  L = function (t, e, n, r, o, i, s) {
                    let a,
                      c,
                      u,
                      f,
                      p,
                      h,
                      g,
                      b,
                      w,
                      B,
                      T,
                      j,
                      _,
                      P,
                      R,
                      M;
                    try {
                      a = e[t];
                    } catch (t) {
                    }
                    if (typeof a === 'object' && a) {
                      if (c = v.call(a), c != x || d.call(a, 'toJSON')) typeof a.toJSON === 'function' && (c != k && c != E && c != A || d.call(a, 'toJSON')) && (a = a.toJSON(t)); else if (a > -1 / 0 && 1 / 0 > a) {
                        if (N) {
                          for (p = S(a / 864e5), u = S(p / 365.2425) + 1970 - 1; N(u + 1, 0) <= p; u++) ;
                          for (f = S((p - N(u, 0)) / 30.42); N(u, f + 1) <= p; f++) ;
                          p = 1 + p - N(u, f), h = (a % 864e5 + 864e5) % 864e5, g = S(h / 36e5) % 24, b = S(h / 6e4) % 60, w = S(h / 1e3) % 60, B = h % 1e3;
                        } else u = a.getUTCFullYear(), f = a.getUTCMonth(), p = a.getUTCDate(), g = a.getUTCHours(), b = a.getUTCMinutes(), w = a.getUTCSeconds(), B = a.getUTCMilliseconds();
                        a = `${u <= 0 || u >= 1e4 ? (u < 0 ? '-' : '+') + O(6, u < 0 ? -u : u) : O(4, u)}-${O(2, f + 1)}-${O(2, p)}T${O(2, g)}:${O(2, b)}:${O(2, w)}.${O(3, B)}Z`;
                      } else a = null;
                    }
                    if (n && (a = n.call(e, t, a)), a === null) return 'null';
                    if (c = v.call(a), c == C) return `${a}`;
                    if (c == k) return a > -1 / 0 && 1 / 0 > a ? `${a}` : 'null';
                    if (c == E) return D(`${a}`);
                    if (typeof a === 'object') {
                      for (P = s.length; P--;) if (s[P] === a) throw l();
                      if (s.push(a), T = [], R = i, i += o, c == A) {
                        for (_ = 0, P = a.length; P > _; _++) j = L(_, a, n, r, o, i, s), T.push(j === m ? 'null' : j);
                        M = T.length ? o ? `[\n${i}${T.join(`,\n${i}`)}\n${R}]` : `[${T.join(',')}]` : '[]';
                      } else {
                        y(r || a, (t) => {
                          const e = L(t, a, n, r, o, i, s);
                          e !== m && T.push(`${D(t)}:${o ? ' ' : ''}${e}`);
                        }), M = T.length ? o ? `{\n${i}${T.join(`,\n${i}`)}\n${R}}` : `{${T.join(',')}}` : '{}';
                      }
                      return s.pop(), M;
                    }
                  };
                e.stringify = function (t, e, n) {
                  let r,
                    o,
                    i,
                    a;
                  if (s[typeof e] && e) {
                    if ((a = v.call(e)) == w) o = e; else if (a == A) {
                      i = {};
                      for (var c, u = 0, f = e.length; f > u; c = e[u++], a = v.call(c), (a == E || a == k) && (i[c] = 1)) ;
                    }
                  }
                  if (n) {
                    if ((a = v.call(n)) == k) {
                      if ((n -= n % 1) > 0) for (r = '', n > 10 && (n = 10); r.length < n; r += ' ') ;
                    } else a == E && (r = n.length <= 10 ? n : n.slice(0, 10));
                  }
                  return L('', (c = {}, c[''] = t, c), o, i, r, '', []);
                };
              }
              if (!n('json-parse')) {
                var R,
                  M,
                  U = i.fromCharCode,
                  q = {
                    92: '\\', 34: '"', 47: '/', 98: '\b', 116: '\t', 110: '\n', 102: '\f', 114: '\r',
                  },
                  I = function () {
                    throw R = M = null, f();
                  },
                  H = function () {
                    for (var t, e, n, r, o, i = M, s = i.length; s > R;) {
                      switch (o = i.charCodeAt(R)) {
                        case 9:
                        case 10:
                        case 13:
                        case 32:
                          R++;
                          break;
                        case 123:
                        case 125:
                        case 91:
                        case 93:
                        case 58:
                        case 44:
                          return t = B ? i.charAt(R) : i[R], R++, t;
                        case 34:
                          for (t = '@', R++; s > R;) {
                            if (o = i.charCodeAt(R), o < 32) I(); else if (o == 92) {
                              switch (o = i.charCodeAt(++R)) {
                                case 92:
                                case 34:
                                case 47:
                                case 98:
                                case 116:
                                case 110:
                                case 102:
                                case 114:
                                  t += q[o], R++;
                                  break;
                                case 117:
                                  for (e = ++R, n = R + 4; n > R; R++) o = i.charCodeAt(R), o >= 48 && o <= 57 || o >= 97 && o <= 102 || o >= 65 && o <= 70 || I();
                                  t += U(`0x${i.slice(e, R)}`);
                                  break;
                                default:
                                  I();
                              }
                            } else {
                              if (o == 34) break;
                              for (o = i.charCodeAt(R), e = R; o >= 32 && o != 92 && o != 34;) o = i.charCodeAt(++R);
                              t += i.slice(e, R);
                            }
                          }
                          if (i.charCodeAt(R) == 34) return R++, t;
                          I();
                        default:
                          if (e = R, o == 45 && (r = !0, o = i.charCodeAt(++R)), o >= 48 && o <= 57) {
                            for (o == 48 && (o = i.charCodeAt(R + 1), o >= 48 && o <= 57) && I(), r = !1; s > R && (o = i.charCodeAt(R), o >= 48 && o <= 57); R++) ;
                            if (i.charCodeAt(R) == 46) {
                              for (n = ++R; s > n && (o = i.charCodeAt(n), o >= 48 && o <= 57); n++) ;
                              n == R && I(), R = n;
                            }
                            if (o = i.charCodeAt(R), o == 101 || o == 69) {
                              for (o = i.charCodeAt(++R), o != 43 && o != 45 || R++, n = R; s > n && (o = i.charCodeAt(n), o >= 48 && o <= 57); n++) ;
                              n == R && I(), R = n;
                            }
                            return +i.slice(e, R);
                          }
                          if (r && I(), i.slice(R, R + 4) == 'true') return R += 4, !0;
                          if (i.slice(R, R + 5) == 'false') return R += 5, !1;
                          if (i.slice(R, R + 4) == 'null') return R += 4, null;
                          I();
                      }
                    }
                    return '$';
                  },
                  F = function (t) {
                    let e,
                      n;
                    if (t == '$' && I(), typeof t === 'string') {
                      if ((B ? t.charAt(0) : t[0]) == '@') return t.slice(1);
                      if (t == '[') {
                        for (e = []; t = H(), t != ']'; n || (n = !0)) n && (t == ',' ? (t = H(), t == ']' && I()) : I()), t == ',' && I(), e.push(F(t));
                        return e;
                      }
                      if (t == '{') {
                        for (e = {}; t = H(), t != '}'; n || (n = !0)) n && (t == ',' ? (t = H(), t == '}' && I()) : I()), t != ',' && typeof t === 'string' && (B ? t.charAt(0) : t[0]) == '@' && H() == ':' || I(), e[t.slice(1)] = F(H());
                        return e;
                      }
                      I();
                    }
                    return t;
                  },
                  z = function (t, e, n) {
                    const r = $(t, e, n);
                    r === m ? delete t[e] : t[e] = r;
                  },
                  $ = function (t, e, n) {
                    let r,
                      o = t[e];
                    if (typeof o === 'object' && o) {
                      if (v.call(o) == A) for (r = o.length; r--;) z(o, r, n); else {
                        y(o, (t) => {
                          z(o, t, n);
                        });
                      }
                    }
                    return n.call(t, e, o);
                  };
                e.parse = function (t, e) {
                  let n,
                    r;
                  return R = 0, M = `${t}`, n = F(H()), H() != '$' && I(), R = M = null, e && v.call(e) == w ? $((r = {}, r[''] = n, r), '', e) : n;
                };
              }
            }
            return e.runInContext = o, e;
          }

          var i = typeof t === 'function' && t.amd,
            s = { function: !0, object: !0 },
            a = s[typeof r] && r && !r.nodeType && r,
            c = s[typeof window] && window || this,
            u = a && s[typeof n] && n && !n.nodeType && typeof e === 'object' && e;
          if (!u || u.global !== u && u.window !== u && u.self !== u || (c = u), a && !i) o(c, a); else {
            var f = c.JSON,
              l = c.JSON3,
              p = !1,
              h = o(c, c.JSON3 = {
                noConflict() {
                  return p || (p = !0, c.JSON = f, c.JSON3 = l, f = l = null), h;
                },
              });
            c.JSON = { parse: h.parse, stringify: h.stringify };
          }
          i && t(() => h);
        }).call(this);
      }).call(this, typeof self !== 'undefined' ? self : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : {});
    }, {}],
    35: [function (t, e, n) {
      function r(t) {
        if (t = `${t}`, !(t.length > 1e4)) {
          const e = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(t);
          if (e) {
            let n = parseFloat(e[1]),
              r = (e[2] || 'ms').toLowerCase();
            switch (r) {
              case 'years':
              case 'year':
              case 'yrs':
              case 'yr':
              case 'y':
                return n * l;
              case 'days':
              case 'day':
              case 'd':
                return n * f;
              case 'hours':
              case 'hour':
              case 'hrs':
              case 'hr':
              case 'h':
                return n * u;
              case 'minutes':
              case 'minute':
              case 'mins':
              case 'min':
              case 'm':
                return n * c;
              case 'seconds':
              case 'second':
              case 'secs':
              case 'sec':
              case 's':
                return n * a;
              case 'milliseconds':
              case 'millisecond':
              case 'msecs':
              case 'msec':
              case 'ms':
                return n;
            }
          }
        }
      }

      function o(t) {
        return t >= f ? `${Math.round(t / f)}d` : t >= u ? `${Math.round(t / u)}h` : t >= c ? `${Math.round(t / c)}m` : t >= a ? `${Math.round(t / a)}s` : `${t}ms`;
      }

      function i(t) {
        return s(t, f, 'day') || s(t, u, 'hour') || s(t, c, 'minute') || s(t, a, 'second') || `${t} ms`;
      }

      function s(t, e, n) {
        return e > t ? void 0 : 1.5 * e > t ? `${Math.floor(t / e)} ${n}` : `${Math.ceil(t / e)} ${n}s`;
      }

      var a = 1e3,
        c = 60 * a,
        u = 60 * c,
        f = 24 * u,
        l = 365.25 * f;
      e.exports = function (t, e) {
        return e = e || {}, typeof t === 'string' ? r(t) : e.long ? i(t) : o(t);
      };
    }, {}],
    36: [function (t, e, n) {
      (function (t) {
        let n = /^[\],:{}\s]*$/,
          r = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
          o = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
          i = /(?:^|:|,)(?:\s*\[)+/g,
          s = /^\s+/,
          a = /\s+$/;
        e.exports = function (e) {
          return typeof e === 'string' && e ? (e = e.replace(s, '').replace(a, ''), t.JSON && JSON.parse ? JSON.parse(e) : n.test(e.replace(r, '@').replace(o, ']').replace(i, '')) ? new Function(`return ${e}`)() : void 0) : null;
        };
      }).call(this, typeof self !== 'undefined' ? self : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : {});
    }, {}],
    37: [function (t, e, n) {
      n.encode = function (t) {
        let e = '';
        for (const n in t) t.hasOwnProperty(n) && (e.length && (e += '&'), e += `${encodeURIComponent(n)}=${encodeURIComponent(t[n])}`);
        return e;
      }, n.decode = function (t) {
        for (var e = {}, n = t.split('&'), r = 0, o = n.length; o > r; r++) {
          const i = n[r].split('=');
          e[decodeURIComponent(i[0])] = decodeURIComponent(i[1]);
        }
        return e;
      };
    }, {}],
    38: [function (t, e, n) {
      let r = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,
        o = ['source', 'protocol', 'authority', 'userInfo', 'user', 'password', 'host', 'port', 'relative', 'path', 'directory', 'file', 'query', 'anchor'];
      e.exports = function (t) {
        let e = t,
          n = t.indexOf('['),
          i = t.indexOf(']');
        n != -1 && i != -1 && (t = t.substring(0, n) + t.substring(n, i).replace(/:/g, ';') + t.substring(i, t.length));
        for (var s = r.exec(t || ''), a = {}, c = 14; c--;) a[o[c]] = s[c] || '';
        return n != -1 && i != -1 && (a.source = e, a.host = a.host.substring(1, a.host.length - 1).replace(/;/g, ':'), a.authority = a.authority.replace('[', '').replace(']', '').replace(/;/g, ':'), a.ipv6uri = !0), a;
      };
    }, {}],
    39: [function (t, e, n) {
      (function (e) {
        let r = t('isarray'),
          o = t('./is-buffer');
        n.deconstructPacket = function (t) {
          function e(t) {
            if (!t) return t;
            if (o(t)) {
              const i = { _placeholder: !0, num: n.length };
              return n.push(t), i;
            }
            if (r(t)) {
              for (var s = new Array(t.length), a = 0; a < t.length; a++) s[a] = e(t[a]);
              return s;
            }
            if (typeof t === 'object' && !(t instanceof Date)) {
              var s = {};
              for (const c in t) s[c] = e(t[c]);
              return s;
            }
            return t;
          }

          var n = [],
            i = t.data,
            s = t;
          return s.data = e(i), s.attachments = n.length, { packet: s, buffers: n };
        }, n.reconstructPacket = function (t, e) {
          function n(t) {
            if (t && t._placeholder) {
              const o = e[t.num];
              return o;
            }
            if (r(t)) {
              for (let i = 0; i < t.length; i++) t[i] = n(t[i]);
              return t;
            }
            if (t && typeof t === 'object') {
              for (const s in t) t[s] = n(t[s]);
              return t;
            }
            return t;
          }

          return t.data = n(t.data), t.attachments = void 0, t;
        }, n.removeBlobs = function (t, n) {
          function i(t, c, u) {
            if (!t) return t;
            if (e.Blob && t instanceof Blob || e.File && t instanceof File) {
              s++;
              const f = new FileReader();
              f.onload = function () {
                u ? u[c] = this.result : a = this.result, --s || n(a);
              }, f.readAsArrayBuffer(t);
            } else if (r(t)) for (let l = 0; l < t.length; l++) i(t[l], l, t); else if (t && typeof t === 'object' && !o(t)) for (const p in t) i(t[p], p, t);
          }

          var s = 0,
            a = t;
          i(a), s || n(a);
        };
      }).call(this, typeof self !== 'undefined' ? self : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : {});
    }, { './is-buffer': 41, isarray: 33 }],
    40: [function (t, e, n) {
      function r() {
      }

      function o(t) {
        let e = '',
          r = !1;
        return e += t.type, n.BINARY_EVENT != t.type && n.BINARY_ACK != t.type || (e += t.attachments, e += '-'), t.nsp && t.nsp != '/' && (r = !0, e += t.nsp), t.id != null && (r && (e += ',', r = !1), e += t.id), t.data != null && (r && (e += ','), e += l.stringify(t.data)), f('encoded %j as %s', t, e), e;
      }

      function i(t, e) {
        function n(t) {
          let n = h.deconstructPacket(t),
            r = o(n.packet),
            i = n.buffers;
          i.unshift(r), e(i);
        }

        h.removeBlobs(t, n);
      }

      function s() {
        this.reconstructor = null;
      }

      function a(t) {
        let e = {},
          r = 0;
        if (e.type = Number(t.charAt(0)), n.types[e.type] == null) return u();
        if (n.BINARY_EVENT == e.type || n.BINARY_ACK == e.type) {
          for (var o = ''; t.charAt(++r) != '-' && (o += t.charAt(r), r != t.length);) ;
          if (o != Number(o) || t.charAt(r) != '-') throw new Error('Illegal attachments');
          e.attachments = Number(o);
        }
        if (t.charAt(r + 1) == '/') {
          for (e.nsp = ''; ++r;) {
            var i = t.charAt(r);
            if (i == ',') break;
            if (e.nsp += i, r == t.length) break;
          }
        } else e.nsp = '/';
        const s = t.charAt(r + 1);
        if (s !== '' && Number(s) == s) {
          for (e.id = ''; ++r;) {
            var i = t.charAt(r);
            if (i == null || Number(i) != i) {
              --r;
              break;
            }
            if (e.id += t.charAt(r), r == t.length) break;
          }
          e.id = Number(e.id);
        }
        if (t.charAt(++r)) {
          try {
            e.data = l.parse(t.substr(r));
          } catch (t) {
            return u();
          }
        }
        return f('decoded %s as %j', t, e), e;
      }

      function c(t) {
        this.reconPack = t, this.buffers = [];
      }

      function u(t) {
        return { type: n.ERROR, data: 'parser error' };
      }

      var f = t('debug')('socket.io-parser'),
        l = t('json3'),
        p = (t('isarray'), t('component-emitter')),
        h = t('./binary'),
        d = t('./is-buffer');
      n.protocol = 4, n.types = ['CONNECT', 'DISCONNECT', 'EVENT', 'ACK', 'ERROR', 'BINARY_EVENT', 'BINARY_ACK'], n.CONNECT = 0, n.DISCONNECT = 1, n.EVENT = 2, n.ACK = 3, n.ERROR = 4, n.BINARY_EVENT = 5, n.BINARY_ACK = 6, n.Encoder = r, n.Decoder = s, r.prototype.encode = function (t, e) {
        if (f('encoding packet %j', t), n.BINARY_EVENT == t.type || n.BINARY_ACK == t.type) i(t, e); else {
          const r = o(t);
          e([r]);
        }
      }, p(s.prototype), s.prototype.add = function (t) {
        let e;
        if (typeof t === 'string') e = a(t), n.BINARY_EVENT == e.type || n.BINARY_ACK == e.type ? (this.reconstructor = new c(e), this.reconstructor.reconPack.attachments === 0 && this.emit('decoded', e)) : this.emit('decoded', e); else {
          if (!d(t) && !t.base64) throw new Error(`Unknown type: ${t}`);
          if (!this.reconstructor) throw new Error('got binary data when not reconstructing a packet');
          e = this.reconstructor.takeBinaryData(t), e && (this.reconstructor = null, this.emit('decoded', e));
        }
      }, s.prototype.destroy = function () {
        this.reconstructor && this.reconstructor.finishedReconstruction();
      }, c.prototype.takeBinaryData = function (t) {
        if (this.buffers.push(t), this.buffers.length == this.reconPack.attachments) {
          const e = h.reconstructPacket(this.reconPack, this.buffers);
          return this.finishedReconstruction(), e;
        }
        return null;
      }, c.prototype.finishedReconstruction = function () {
        this.reconPack = null, this.buffers = [];
      };
    }, {
      './binary': 39, './is-buffer': 41, 'component-emitter': 42, debug: 14, isarray: 33, json3: 34,
    }],
    41: [function (t, e, n) {
      (function (t) {
        function n(e) {
          return t.Buffer && t.Buffer.isBuffer(e) || t.ArrayBuffer && e instanceof ArrayBuffer;
        }

        e.exports = n;
      }).call(this, typeof self !== 'undefined' ? self : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : {});
    }, {}],
    42: [function (t, e, n) {
      arguments[4][26][0].apply(n, arguments);
    }, { dup: 26 }],
    43: [function (t, e, n) {
      function r(t, e) {
        const n = [];
        e = e || 0;
        for (let r = e || 0; r < t.length; r++) n[r - e] = t[r];
        return n;
      }

      e.exports = r;
    }, {}],
    44: [function (e, n, r) {
      (function (e) {
        !(function (o) {
          function i(t) {
            for (var e, n, r = [], o = 0, i = t.length; i > o;) e = t.charCodeAt(o++), e >= 55296 && e <= 56319 && i > o ? (n = t.charCodeAt(o++), (64512 & n) == 56320 ? r.push(((1023 & e) << 10) + (1023 & n) + 65536) : (r.push(e), o--)) : r.push(e);
            return r;
          }

          function s(t) {
            for (var e, n = t.length, r = -1, o = ''; ++r < n;) e = t[r], e > 65535 && (e -= 65536, o += w(e >>> 10 & 1023 | 55296), e = 56320 | 1023 & e), o += w(e);
            return o;
          }

          function a(t) {
            if (t >= 55296 && t <= 57343) throw Error(`Lone surrogate U+${t.toString(16).toUpperCase()} is not a scalar value`);
          }

          function c(t, e) {
            return w(t >> e & 63 | 128);
          }

          function u(t) {
            if ((4294967168 & t) == 0) return w(t);
            let e = '';
            return (4294965248 & t) == 0 ? e = w(t >> 6 & 31 | 192) : (4294901760 & t) == 0 ? (a(t), e = w(t >> 12 & 15 | 224), e += c(t, 6)) : (4292870144 & t) == 0 && (e = w(t >> 18 & 7 | 240), e += c(t, 12), e += c(t, 6)), e += w(63 & t | 128);
          }

          function f(t) {
            for (var e, n = i(t), r = n.length, o = -1, s = ''; ++o < r;) e = n[o], s += u(e);
            return s;
          }

          function l() {
            if (b >= v) throw Error('Invalid byte index');
            const t = 255 & g[b];
            if (b++, (192 & t) == 128) return 63 & t;
            throw Error('Invalid continuation byte');
          }

          function p() {
            var t,
              e,
              n,
              r,
              o;
            if (b > v) throw Error('Invalid byte index');
            if (b == v) return !1;
            if (t = 255 & g[b], b++, (128 & t) == 0) return t;
            if ((224 & t) == 192) {
              var e = l();
              if (o = (31 & t) << 6 | e, o >= 128) return o;
              throw Error('Invalid continuation byte');
            }
            if ((240 & t) == 224) {
              if (e = l(), n = l(), o = (15 & t) << 12 | e << 6 | n, o >= 2048) return a(o), o;
              throw Error('Invalid continuation byte');
            }
            if ((248 & t) == 240 && (e = l(), n = l(), r = l(), o = (15 & t) << 18 | e << 12 | n << 6 | r, o >= 65536 && o <= 1114111)) return o;
            throw Error('Invalid UTF-8 detected');
          }

          function h(t) {
            g = i(t), v = g.length, b = 0;
            for (var e, n = []; (e = p()) !== !1;) n.push(e);
            return s(n);
          }

          let d = typeof r === 'object' && r,
            y = typeof n === 'object' && n && n.exports == d && n,
            m = typeof e === 'object' && e;
          m.global !== m && m.window !== m || (o = m);
          var g,
            v,
            b,
            w = String.fromCharCode,
            x = { version: '2.0.0', encode: f, decode: h };
          if (typeof t === 'function' && typeof t.amd === 'object' && t.amd) {
            t(() => x);
          } else if (d && !d.nodeType) {
            if (y) y.exports = x; else {
              let k = {},
                E = k.hasOwnProperty;
              for (const A in x) E.call(x, A) && (d[A] = x[A]);
            }
          } else o.utf8 = x;
        }(this));
      }).call(this, typeof self !== 'undefined' ? self : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : {});
    }, {}],
    45: [function (t, e, n) {
      function r(t) {
        let e = '';
        do e = a[t % c] + e, t = Math.floor(t / c); while (t > 0);
        return e;
      }

      function o(t) {
        let e = 0;
        for (l = 0; l < t.length; l++) e = e * c + u[t.charAt(l)];
        return e;
      }

      function i() {
        const t = r(+new Date());
        return t !== s ? (f = 0, s = t) : `${t}.${r(f++)}`;
      }

      for (var s, a = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_'.split(''), c = 64, u = {}, f = 0, l = 0; c > l; l++) u[a[l]] = l;
      i.encode = r, i.decode = o, e.exports = i;
    }, {}],
  }, {}, [1]))(1);
})), (function () {
  domready(() => {
    socket = io(document.getElementsByTagName('server')[0].innerHTML), socket.on('statsResults', (t) => {
      document.getElementById('stat_total_users').innerHTML = t.all.total, document.getElementById('stat_total_bandwidth').innerHTML = t.all.bandwidth, document.getElementById('stat_today').innerHTML = t.today.total, document.getElementById('stat_thirty_avg').innerHTML = t[30].total, document.getElementById('stat_today_bandwidth').innerHTML = t.today.bandwidth, document.getElementById('stat_loadavg').innerHTML = t.load;
    }), window.location.href.indexOf('stats') !== -1 && (socket.emit('stats'), setInterval(() => {
      socket.emit('stats');
    }, 1e3));
  });
}()), !(function (t, e) {
  typeof define === 'function' && define.amd ? define(() => e(t)) : e(t);
}(this, (t) => {
  const e = (function () {
    function e(t) {
      return t == null ? String(t) : Z[W.call(t)] || 'object';
    }

    function n(t) {
      return e(t) == 'function';
    }

    function r(t) {
      return t != null && t == t.window;
    }

    function o(t) {
      return t != null && t.nodeType == t.DOCUMENT_NODE;
    }

    function i(t) {
      return e(t) == 'object';
    }

    function s(t) {
      return i(t) && !r(t) && Object.getPrototypeOf(t) == Object.prototype;
    }

    function a(t) {
      let e = !!t && 'length' in t && t.length,
        n = C.type(t);
      return n != 'function' && !r(t) && (n == 'array' || e === 0 || typeof e === 'number' && e > 0 && e - 1 in t);
    }

    function c(t) {
      return _.call(t, t => t != null);
    }

    function u(t) {
      return t.length > 0 ? C.fn.concat.apply([], t) : t;
    }

    function f(t) {
      return t.replace(/::/g, '/').replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2').replace(/([a-z\d])([A-Z])/g, '$1_$2').replace(/_/g, '-')
        .toLowerCase();
    }

    function l(t) {
      return t in L ? L[t] : L[t] = new RegExp(`(^|\\s)${t}(\\s|$)`);
    }

    function p(t, e) {
      return typeof e !== 'number' || R[f(t)] ? e : `${e}px`;
    }

    function h(t) {
      let e,
        n;
      return D[t] || (e = P.createElement(t), P.body.appendChild(e), n = getComputedStyle(e, '').getPropertyValue('display'), e.parentNode.removeChild(e), n == 'none' && (n = 'block'), D[t] = n), D[t];
    }

    function d(t) {
      return 'children' in t ? O.call(t.children) : C.map(t.childNodes, t => (t.nodeType == 1 ? t : void 0));
    }

    function y(t, e) {
      let n,
        r = t ? t.length : 0;
      for (n = 0; r > n; n++) this[n] = t[n];
      this.length = r, this.selector = e || '';
    }

    function m(t, e, n) {
      for (A in e) n && (s(e[A]) || tt(e[A])) ? (s(e[A]) && !s(t[A]) && (t[A] = {}), tt(e[A]) && !tt(t[A]) && (t[A] = []), m(t[A], e[A], n)) : e[A] !== E && (t[A] = e[A]);
    }

    function g(t, e) {
      return e == null ? C(t) : C(t).filter(e);
    }

    function v(t, e, r, o) {
      return n(e) ? e.call(t, r, o) : e;
    }

    function b(t, e, n) {
      n == null ? t.removeAttribute(e) : t.setAttribute(e, n);
    }

    function w(t, e) {
      let n = t.className || '',
        r = n && n.baseVal !== E;
      return e === E ? r ? n.baseVal : n : void (r ? n.baseVal = e : t.className = e);
    }

    function x(t) {
      try {
        return t ? t == 'true' || t != 'false' && (t == 'null' ? null : `${+t}` == t ? +t : /^[\[\{]/.test(t) ? C.parseJSON(t) : t) : t;
      } catch (e) {
        return t;
      }
    }

    function k(t, e) {
      e(t);
      for (let n = 0, r = t.childNodes.length; r > n; n++) k(t.childNodes[n], e);
    }

    var E,
      A,
      C,
      B,
      S,
      T,
      N = [],
      j = N.concat,
      _ = N.filter,
      O = N.slice,
      P = t.document,
      D = {},
      L = {},
      R = {
        'column-count': 1, columns: 1, 'font-weight': 1, 'line-height': 1, opacity: 1, 'z-index': 1, zoom: 1,
      },
      M = /^\s*<(\w+|!)[^>]*>/,
      U = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
      q = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
      I = /^(?:body|html)$/i,
      H = /([A-Z])/g,
      F = ['val', 'css', 'html', 'text', 'data', 'width', 'height', 'offset'],
      z = ['after', 'prepend', 'before', 'append'],
      $ = P.createElement('table'),
      J = P.createElement('tr'),
      X = {
        tr: P.createElement('tbody'), tbody: $, thead: $, tfoot: $, td: J, th: J, '*': P.createElement('div'),
      },
      V = /complete|loaded|interactive/,
      Y = /^[\w-]*$/,
      Z = {},
      W = Z.toString,
      K = {},
      G = P.createElement('div'),
      Q = {
        tabindex: 'tabIndex',
        readonly: 'readOnly',
        for: 'htmlFor',
        class: 'className',
        maxlength: 'maxLength',
        cellspacing: 'cellSpacing',
        cellpadding: 'cellPadding',
        rowspan: 'rowSpan',
        colspan: 'colSpan',
        usemap: 'useMap',
        frameborder: 'frameBorder',
        contenteditable: 'contentEditable',
      },
      tt = Array.isArray || function (t) {
        return t instanceof Array;
      };
    return K.matches = function (t, e) {
      if (!e || !t || t.nodeType !== 1) return !1;
      const n = t.matches || t.webkitMatchesSelector || t.mozMatchesSelector || t.oMatchesSelector || t.matchesSelector;
      if (n) return n.call(t, e);
      let r,
        o = t.parentNode,
        i = !o;
      return i && (o = G).appendChild(t), r = ~K.qsa(o, e).indexOf(t), i && G.removeChild(t), r;
    }, S = function (t) {
      return t.replace(/-+(.)?/g, (t, e) => (e ? e.toUpperCase() : ''));
    }, T = function (t) {
      return _.call(t, (e, n) => t.indexOf(e) == n);
    }, K.fragment = function (t, e, n) {
      let r,
        o,
        i;
      return U.test(t) && (r = C(P.createElement(RegExp.$1))), r || (t.replace && (t = t.replace(q, '<$1></$2>')), e === E && (e = M.test(t) && RegExp.$1), e in X || (e = '*'), i = X[e], i.innerHTML = `${t}`, r = C.each(O.call(i.childNodes), function () {
        i.removeChild(this);
      })), s(n) && (o = C(r), C.each(n, (t, e) => {
        F.indexOf(t) > -1 ? o[t](e) : o.attr(t, e);
      })), r;
    }, K.Z = function (t, e) {
      return new y(t, e);
    }, K.isZ = function (t) {
      return t instanceof K.Z;
    }, K.init = function (t, e) {
      let r;
      if (!t) return K.Z();
      if (typeof t === 'string') {
        if (t = t.trim(), t[0] == '<' && M.test(t)) r = K.fragment(t, RegExp.$1, e), t = null; else {
          if (e !== E) return C(e).find(t);
          r = K.qsa(P, t);
        }
      } else {
        if (n(t)) return C(P).ready(t);
        if (K.isZ(t)) return t;
        if (tt(t)) r = c(t); else if (i(t)) r = [t], t = null; else if (M.test(t)) r = K.fragment(t.trim(), RegExp.$1, e), t = null; else {
          if (e !== E) return C(e).find(t);
          r = K.qsa(P, t);
        }
      }
      return K.Z(r, t);
    }, C = function (t, e) {
      return K.init(t, e);
    }, C.extend = function (t) {
      let e,
        n = O.call(arguments, 1);
      return typeof t === 'boolean' && (e = t, t = n.shift()), n.forEach((n) => {
        m(t, n, e);
      }), t;
    }, K.qsa = function (t, e) {
      let n,
        r = e[0] == '#',
        o = !r && e[0] == '.',
        i = r || o ? e.slice(1) : e,
        s = Y.test(i);
      return t.getElementById && s && r ? (n = t.getElementById(i)) ? [n] : [] : t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11 ? [] : O.call(s && !r && t.getElementsByClassName ? o ? t.getElementsByClassName(i) : t.getElementsByTagName(e) : t.querySelectorAll(e));
    }, C.contains = P.documentElement.contains ? function (t, e) {
      return t !== e && t.contains(e);
    } : function (t, e) {
      for (; e && (e = e.parentNode);) if (e === t) return !0;
      return !1;
    }, C.type = e, C.isFunction = n, C.isWindow = r, C.isArray = tt, C.isPlainObject = s, C.isEmptyObject = function (t) {
      let e;
      for (e in t) return !1;
      return !0;
    }, C.isNumeric = function (t) {
      let e = Number(t),
        n = typeof t;
      return t != null && n != 'boolean' && (n != 'string' || t.length) && !isNaN(e) && isFinite(e) || !1;
    }, C.inArray = function (t, e, n) {
      return N.indexOf.call(e, t, n);
    }, C.camelCase = S, C.trim = function (t) {
      return t == null ? '' : String.prototype.trim.call(t);
    }, C.uuid = 0, C.support = {}, C.expr = {}, C.noop = function () {
    }, C.map = function (t, e) {
      let n,
        r,
        o,
        i = [];
      if (a(t)) for (r = 0; r < t.length; r++) n = e(t[r], r), n != null && i.push(n); else for (o in t) n = e(t[o], o), n != null && i.push(n);
      return u(i);
    }, C.each = function (t, e) {
      let n,
        r;
      if (a(t)) {
        for (n = 0; n < t.length; n++) if (e.call(t[n], n, t[n]) === !1) return t;
      } else for (r in t) if (e.call(t[r], r, t[r]) === !1) return t;
      return t;
    }, C.grep = function (t, e) {
      return _.call(t, e);
    }, t.JSON && (C.parseJSON = JSON.parse), C.each('Boolean Number String Function Array Date RegExp Object Error'.split(' '), (t, e) => {
      Z[`[object ${e}]`] = e.toLowerCase();
    }), C.fn = {
      constructor: K.Z,
      length: 0,
      forEach: N.forEach,
      reduce: N.reduce,
      push: N.push,
      sort: N.sort,
      splice: N.splice,
      indexOf: N.indexOf,
      concat() {
        let t,
          e,
          n = [];
        for (t = 0; t < arguments.length; t++) e = arguments[t], n[t] = K.isZ(e) ? e.toArray() : e;
        return j.apply(K.isZ(this) ? this.toArray() : this, n);
      },
      map(t) {
        return C(C.map(this, (e, n) => t.call(e, n, e)));
      },
      slice() {
        return C(O.apply(this, arguments));
      },
      ready(t) {
        return V.test(P.readyState) && P.body ? t(C) : P.addEventListener('DOMContentLoaded', () => {
          t(C);
        }, !1), this;
      },
      get(t) {
        return t === E ? O.call(this) : this[t >= 0 ? t : t + this.length];
      },
      toArray() {
        return this.get();
      },
      size() {
        return this.length;
      },
      remove() {
        return this.each(function () {
          this.parentNode != null && this.parentNode.removeChild(this);
        });
      },
      each(t) {
        return N.every.call(this, (e, n) => t.call(e, n, e) !== !1), this;
      },
      filter(t) {
        return n(t) ? this.not(this.not(t)) : C(_.call(this, e => K.matches(e, t)));
      },
      add(t, e) {
        return C(T(this.concat(C(t, e))));
      },
      is(t) {
        return this.length > 0 && K.matches(this[0], t);
      },
      not(t) {
        const e = [];
        if (n(t) && t.call !== E) {
          this.each(function (n) {
            t.call(this, n) || e.push(this);
          });
        } else {
          const r = typeof t === 'string' ? this.filter(t) : a(t) && n(t.item) ? O.call(t) : C(t);
          this.forEach((t) => {
            r.indexOf(t) < 0 && e.push(t);
          });
        }
        return C(e);
      },
      has(t) {
        return this.filter(function () {
          return i(t) ? C.contains(this, t) : C(this).find(t).size();
        });
      },
      eq(t) {
        return t === -1 ? this.slice(t) : this.slice(t, +t + 1);
      },
      first() {
        const t = this[0];
        return t && !i(t) ? t : C(t);
      },
      last() {
        const t = this[this.length - 1];
        return t && !i(t) ? t : C(t);
      },
      find(t) {
        let e,
          n = this;
        return e = t ? typeof t === 'object' ? C(t).filter(function () {
          const t = this;
          return N.some.call(n, e => C.contains(e, t));
        }) : this.length == 1 ? C(K.qsa(this[0], t)) : this.map(function () {
          return K.qsa(this, t);
        }) : C();
      },
      closest(t, e) {
        let n = [],
          r = typeof t === 'object' && C(t);
        return this.each((i, s) => {
          for (; s && !(r ? r.indexOf(s) >= 0 : K.matches(s, t));) s = s !== e && !o(s) && s.parentNode;
          s && n.indexOf(s) < 0 && n.push(s);
        }), C(n);
      },
      parents(t) {
        for (var e = [], n = this; n.length > 0;) {
          n = C.map(n, t => ((t = t.parentNode) && !o(t) && e.indexOf(t) < 0 ? (e.push(t), t) : void 0));
        }
        return g(e, t);
      },
      parent(t) {
        return g(T(this.pluck('parentNode')), t);
      },
      children(t) {
        return g(this.map(function () {
          return d(this);
        }), t);
      },
      contents() {
        return this.map(function () {
          return this.contentDocument || O.call(this.childNodes);
        });
      },
      siblings(t) {
        return g(this.map((t, e) => _.call(d(e.parentNode), t => t !== e)), t);
      },
      empty() {
        return this.each(function () {
          this.innerHTML = '';
        });
      },
      pluck(t) {
        return C.map(this, e => e[t]);
      },
      show() {
        return this.each(function () {
          this.style.display == 'none' && (this.style.display = ''), getComputedStyle(this, '').getPropertyValue('display') == 'none' && (this.style.display = h(this.nodeName));
        });
      },
      replaceWith(t) {
        return this.before(t).remove();
      },
      wrap(t) {
        const e = n(t);
        if (this[0] && !e) {
          var r = C(t).get(0),
            o = r.parentNode || this.length > 1;
        }
        return this.each(function (n) {
          C(this).wrapAll(e ? t.call(this, n) : o ? r.cloneNode(!0) : r);
        });
      },
      wrapAll(t) {
        if (this[0]) {
          C(this[0]).before(t = C(t));
          for (var e; (e = t.children()).length;) t = e.first();
          C(t).append(this);
        }
        return this;
      },
      wrapInner(t) {
        const e = n(t);
        return this.each(function (n) {
          let r = C(this),
            o = r.contents(),
            i = e ? t.call(this, n) : t;
          o.length ? o.wrapAll(i) : r.append(i);
        });
      },
      unwrap() {
        return this.parent().each(function () {
          C(this).replaceWith(C(this).children());
        }), this;
      },
      clone() {
        return this.map(function () {
          return this.cloneNode(!0);
        });
      },
      hide() {
        return this.css('display', 'none');
      },
      toggle(t) {
        return this.each(function () {
          const e = C(this);
          (t === E ? e.css('display') == 'none' : t) ? e.show() : e.hide();
        });
      },
      prev(t) {
        return C(this.pluck('previousElementSibling')).filter(t || '*');
      },
      next(t) {
        return C(this.pluck('nextElementSibling')).filter(t || '*');
      },
      html(t) {
        return 0 in arguments ? this.each(function (e) {
          const n = this.innerHTML;
          C(this).empty().append(v(this, t, e, n));
        }) : 0 in this ? this[0].innerHTML : null;
      },
      text(t) {
        return 0 in arguments ? this.each(function (e) {
          const n = v(this, t, e, this.textContent);
          this.textContent = n == null ? '' : `${n}`;
        }) : 0 in this ? this.pluck('textContent').join('') : null;
      },
      attr(t, e) {
        let n;
        return typeof t !== 'string' || 1 in arguments ? this.each(function (n) {
          if (this.nodeType === 1) if (i(t)) for (A in t) b(this, A, t[A]); else b(this, t, v(this, e, n, this.getAttribute(t)));
        }) : 0 in this && this[0].nodeType == 1 && (n = this[0].getAttribute(t)) != null ? n : E;
      },
      removeAttr(t) {
        return this.each(function () {
          this.nodeType === 1 && t.split(' ').forEach(function (t) {
            b(this, t);
          }, this);
        });
      },
      prop(t, e) {
        return t = Q[t] || t, 1 in arguments ? this.each(function (n) {
          this[t] = v(this, e, n, this[t]);
        }) : this[0] && this[0][t];
      },
      removeProp(t) {
        return t = Q[t] || t, this.each(function () {
          delete this[t];
        });
      },
      data(t, e) {
        let n = `data-${t.replace(H, '-$1').toLowerCase()}`,
          r = 1 in arguments ? this.attr(n, e) : this.attr(n);
        return r !== null ? x(r) : E;
      },
      val(t) {
        return 0 in arguments ? (t == null && (t = ''), this.each(function (e) {
          this.value = v(this, t, e, this.value);
        })) : this[0] && (this[0].multiple ? C(this[0]).find('option').filter(function () {
          return this.selected;
        }).pluck('value') : this[0].value);
      },
      offset(e) {
        if (e) {
          return this.each(function (t) {
            let n = C(this),
              r = v(this, e, t, n.offset()),
              o = n.offsetParent().offset(),
              i = { top: r.top - o.top, left: r.left - o.left };
            n.css('position') == 'static' && (i.position = 'relative'), n.css(i);
          });
        }
        if (!this.length) return null;
        if (P.documentElement !== this[0] && !C.contains(P.documentElement, this[0])) return { top: 0, left: 0 };
        const n = this[0].getBoundingClientRect();
        return {
          left: n.left + t.pageXOffset,
          top: n.top + t.pageYOffset,
          width: Math.round(n.width),
          height: Math.round(n.height),
        };
      },
      css(t, n) {
        if (arguments.length < 2) {
          const r = this[0];
          if (typeof t === 'string') {
            if (!r) return;
            return r.style[S(t)] || getComputedStyle(r, '').getPropertyValue(t);
          }
          if (tt(t)) {
            if (!r) return;
            let o = {},
              i = getComputedStyle(r, '');
            return C.each(t, (t, e) => {
              o[e] = r.style[S(e)] || i.getPropertyValue(e);
            }), o;
          }
        }
        let s = '';
        if (e(t) == 'string') {
          n || n === 0 ? s = `${f(t)}:${p(t, n)}` : this.each(function () {
            this.style.removeProperty(f(t));
          });
        } else {
          for (A in t) {
            t[A] || t[A] === 0 ? s += `${f(A)}:${p(A, t[A])};` : this.each(function () {
              this.style.removeProperty(f(A));
            });
          }
        }
        return this.each(function () {
          this.style.cssText += `;${s}`;
        });
      },
      index(t) {
        return t ? this.indexOf(C(t)[0]) : this.parent().children().indexOf(this[0]);
      },
      hasClass(t) {
        return !!t && N.some.call(this, function (t) {
          return this.test(w(t));
        }, l(t));
      },
      addClass(t) {
        return t ? this.each(function (e) {
          if ('className' in this) {
            B = [];
            let n = w(this),
              r = v(this, t, e, n);
            r.split(/\s+/g).forEach(function (t) {
              C(this).hasClass(t) || B.push(t);
            }, this), B.length && w(this, n + (n ? ' ' : '') + B.join(' '));
          }
        }) : this;
      },
      removeClass(t) {
        return this.each(function (e) {
          if ('className' in this) {
            if (t === E) return w(this, '');
            B = w(this), v(this, t, e, B).split(/\s+/g).forEach((t) => {
              B = B.replace(l(t), ' ');
            }), w(this, B.trim());
          }
        });
      },
      toggleClass(t, e) {
        return t ? this.each(function (n) {
          let r = C(this),
            o = v(this, t, n, w(this));
          o.split(/\s+/g).forEach((t) => {
            (e === E ? !r.hasClass(t) : e) ? r.addClass(t) : r.removeClass(t);
          });
        }) : this;
      },
      scrollTop(t) {
        if (this.length) {
          const e = 'scrollTop' in this[0];
          return t === E ? e ? this[0].scrollTop : this[0].pageYOffset : this.each(e ? function () {
            this.scrollTop = t;
          } : function () {
            this.scrollTo(this.scrollX, t);
          });
        }
      },
      scrollLeft(t) {
        if (this.length) {
          const e = 'scrollLeft' in this[0];
          return t === E ? e ? this[0].scrollLeft : this[0].pageXOffset : this.each(e ? function () {
            this.scrollLeft = t;
          } : function () {
            this.scrollTo(t, this.scrollY);
          });
        }
      },
      position() {
        if (this.length) {
          let t = this[0],
            e = this.offsetParent(),
            n = this.offset(),
            r = I.test(e[0].nodeName) ? { top: 0, left: 0 } : e.offset();
          return n.top -= parseFloat(C(t).css('margin-top')) || 0, n.left -= parseFloat(C(t).css('margin-left')) || 0, r.top += parseFloat(C(e[0]).css('border-top-width')) || 0, r.left += parseFloat(C(e[0]).css('border-left-width')) || 0, {
            top: n.top - r.top,
            left: n.left - r.left,
          };
        }
      },
      offsetParent() {
        return this.map(function () {
          for (var t = this.offsetParent || P.body; t && !I.test(t.nodeName) && C(t).css('position') == 'static';) t = t.offsetParent;
          return t;
        });
      },
    }, C.fn.detach = C.fn.remove, ['width', 'height'].forEach((t) => {
      const e = t.replace(/./, t => t[0].toUpperCase());
      C.fn[t] = function (n) {
        let i,
          s = this[0];
        return n === E ? r(s) ? s[`inner${e}`] : o(s) ? s.documentElement[`scroll${e}`] : (i = this.offset()) && i[t] : this.each(function (e) {
          s = C(this), s.css(t, v(this, n, e, s[t]()));
        });
      };
    }), z.forEach((n, r) => {
      const o = r % 2;
      C.fn[n] = function () {
        let n,
          i,
          s = C.map(arguments, (t) => {
            let r = [];
            return n = e(t), n == 'array' ? (t.forEach(t => (t.nodeType !== E ? r.push(t) : C.zepto.isZ(t) ? r = r.concat(t.get()) : void (r = r.concat(K.fragment(t))))), r) : n == 'object' || t == null ? t : K.fragment(t);
          }),
          a = this.length > 1;
        return s.length < 1 ? this : this.each((e, n) => {
          i = o ? n : n.parentNode, n = r == 0 ? n.nextSibling : r == 1 ? n.firstChild : r == 2 ? n : null;
          const c = C.contains(P.documentElement, i);
          s.forEach((e) => {
            if (a) e = e.cloneNode(!0); else if (!i) return C(e).remove();
            i.insertBefore(e, n), c && k(e, (e) => {
              if (!(e.nodeName == null || e.nodeName.toUpperCase() !== 'SCRIPT' || e.type && e.type !== 'text/javascript' || e.src)) {
                const n = e.ownerDocument ? e.ownerDocument.defaultView : t;
                n.eval.call(n, e.innerHTML);
              }
            });
          });
        });
      }, C.fn[o ? `${n}To` : `insert${r ? 'Before' : 'After'}`] = function (t) {
        return C(t)[n](this), this;
      };
    }), K.Z.prototype = y.prototype = C.fn, K.uniq = T, K.deserializeValue = x, C.zepto = K, C;
  }());
  return t.Zepto = e, void 0 === t.$ && (t.$ = e), (function (e) {
    function n(t) {
      return t._zid || (t._zid = h++);
    }

    function r(t, e, r, s) {
      if (e = o(e), e.ns) var a = i(e.ns);
      return (g[n(t)] || []).filter(t => t && (!e.e || t.e == e.e) && (!e.ns || a.test(t.ns)) && (!r || n(t.fn) === n(r)) && (!s || t.sel == s));
    }

    function o(t) {
      const e = (`${t}`).split('.');
      return { e: e[0], ns: e.slice(1).sort().join(' ') };
    }

    function i(t) {
      return new RegExp(`(?:^| )${t.replace(' ', ' .* ?')}(?: |$)`);
    }

    function s(t, e) {
      return t.del && !b && t.e in w || !!e;
    }

    function a(t) {
      return x[t] || b && w[t] || t;
    }

    function c(t, r, i, c, u, l, h) {
      let d = n(t),
        y = g[d] || (g[d] = []);
      r.split(/\s/).forEach((n) => {
        if (n == 'ready') return e(document).ready(i);
        const r = o(n);
        r.fn = i, r.sel = u, r.e in x && (i = function (t) {
          const n = t.relatedTarget;
          return !n || n !== this && !e.contains(this, n) ? r.fn.apply(this, arguments) : void 0;
        }), r.del = l;
        const d = l || i;
        r.proxy = function (e) {
          if (e = f(e), !e.isImmediatePropagationStopped()) {
            e.data = c;
            const n = d.apply(t, e._args == p ? [e] : [e].concat(e._args));
            return n === !1 && (e.preventDefault(), e.stopPropagation()), n;
          }
        }, r.i = y.length, y.push(r), 'addEventListener' in t && t.addEventListener(a(r.e), r.proxy, s(r, h));
      });
    }

    function u(t, e, o, i, c) {
      const u = n(t);
      (e || '').split(/\s/).forEach((e) => {
        r(t, e, o, i).forEach((e) => {
          delete g[u][e.i], 'removeEventListener' in t && t.removeEventListener(a(e.e), e.proxy, s(e, c));
        });
      });
    }

    function f(t, n) {
      return (n || !t.isDefaultPrevented) && (n || (n = t), e.each(C, (e, r) => {
        const o = n[e];
        t[e] = function () {
          return this[r] = k, o && o.apply(n, arguments);
        }, t[r] = E;
      }), t.timeStamp || (t.timeStamp = Date.now()), (n.defaultPrevented !== p ? n.defaultPrevented : 'returnValue' in n ? n.returnValue === !1 : n.getPreventDefault && n.getPreventDefault()) && (t.isDefaultPrevented = k)), t;
    }

    function l(t) {
      let e,
        n = { originalEvent: t };
      for (e in t) A.test(e) || t[e] === p || (n[e] = t[e]);
      return f(n, t);
    }

    var p,
      h = 1,
      d = Array.prototype.slice,
      y = e.isFunction,
      m = function (t) {
        return typeof t === 'string';
      },
      g = {},
      v = {},
      b = 'onfocusin' in t,
      w = { focus: 'focusin', blur: 'focusout' },
      x = { mouseenter: 'mouseover', mouseleave: 'mouseout' };
    v.click = v.mousedown = v.mouseup = v.mousemove = 'MouseEvents', e.event = {
      add: c,
      remove: u,
    }, e.proxy = function (t, r) {
      const o = 2 in arguments && d.call(arguments, 2);
      if (y(t)) {
        const i = function () {
          return t.apply(r, o ? o.concat(d.call(arguments)) : arguments);
        };
        return i._zid = n(t), i;
      }
      if (m(r)) return o ? (o.unshift(t[r], t), e.proxy.apply(null, o)) : e.proxy(t[r], t);
      throw new TypeError('expected function');
    }, e.fn.bind = function (t, e, n) {
      return this.on(t, e, n);
    }, e.fn.unbind = function (t, e) {
      return this.off(t, e);
    }, e.fn.one = function (t, e, n, r) {
      return this.on(t, e, n, r, 1);
    };
    var k = function () {
        return !0;
      },
      E = function () {
        return !1;
      },
      A = /^([A-Z]|returnValue$|layer[XY]$|webkitMovement[XY]$)/,
      C = {
        preventDefault: 'isDefaultPrevented',
        stopImmediatePropagation: 'isImmediatePropagationStopped',
        stopPropagation: 'isPropagationStopped',
      };
    e.fn.delegate = function (t, e, n) {
      return this.on(e, t, n);
    }, e.fn.undelegate = function (t, e, n) {
      return this.off(e, t, n);
    }, e.fn.live = function (t, n) {
      return e(document.body).delegate(this.selector, t, n), this;
    }, e.fn.die = function (t, n) {
      return e(document.body).undelegate(this.selector, t, n), this;
    }, e.fn.on = function (t, n, r, o, i) {
      let s,
        a,
        f = this;
      return t && !m(t) ? (e.each(t, (t, e) => {
        f.on(t, n, r, e, i);
      }), f) : (m(n) || y(o) || o === !1 || (o = r, r = n, n = p), (o === p || r === !1) && (o = r, r = p), o === !1 && (o = E), f.each((f, p) => {
        i && (s = function (t) {
          return u(p, t.type, o), o.apply(this, arguments);
        }), n && (a = function (t) {
          let r,
            i = e(t.target).closest(n, p).get(0);
          return i && i !== p ? (r = e.extend(l(t), {
            currentTarget: i,
            liveFired: p,
          }), (s || o).apply(i, [r].concat(d.call(arguments, 1)))) : void 0;
        }), c(p, t, o, r, n, a || s);
      }));
    }, e.fn.off = function (t, n, r) {
      const o = this;
      return t && !m(t) ? (e.each(t, (t, e) => {
        o.off(t, n, e);
      }), o) : (m(n) || y(r) || r === !1 || (r = n, n = p), r === !1 && (r = E), o.each(function () {
        u(this, t, r, n);
      }));
    }, e.fn.trigger = function (t, n) {
      return t = m(t) || e.isPlainObject(t) ? e.Event(t) : f(t), t._args = n, this.each(function () {
        t.type in w && typeof this[t.type] === 'function' ? this[t.type]() : 'dispatchEvent' in this ? this.dispatchEvent(t) : e(this).triggerHandler(t, n);
      });
    }, e.fn.triggerHandler = function (t, n) {
      let o,
        i;
      return this.each((s, a) => {
        o = l(m(t) ? e.Event(t) : t), o._args = n, o.target = a, e.each(r(a, t.type || t), (t, e) => i = e.proxy(o), !o.isImmediatePropagationStopped() && void 0);
      }), i;
    }, 'focusin focusout focus blur load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error'.split(' ').forEach((t) => {
      e.fn[t] = function (e) {
        return 0 in arguments ? this.bind(t, e) : this.trigger(t);
      };
    }), e.Event = function (t, e) {
      m(t) || (e = t, t = e.type);
      let n = document.createEvent(v[t] || 'Events'),
        r = !0;
      if (e) for (const o in e) o == 'bubbles' ? r = !!e[o] : n[o] = e[o];
      return n.initEvent(t, r, !0), f(n);
    };
  }(e)), (function (e) {
    function n(t, n, r) {
      const o = e.Event(n);
      return e(t).trigger(o, r), !o.isDefaultPrevented();
    }

    function r(t, e, r, o) {
      return t.global ? n(e || w, r, o) : void 0;
    }

    function o(t) {
      t.global && e.active++ === 0 && r(t, null, 'ajaxStart');
    }

    function i(t) {
      t.global && !--e.active && r(t, null, 'ajaxStop');
    }

    function s(t, e) {
      const n = e.context;
      return e.beforeSend.call(n, t, e) !== !1 && r(e, n, 'ajaxBeforeSend', [t, e]) !== !1 && void r(e, n, 'ajaxSend', [t, e]);
    }

    function a(t, e, n, o) {
      let i = n.context,
        s = 'success';
      n.success.call(i, t, s, e), o && o.resolveWith(i, [t, s, e]), r(n, i, 'ajaxSuccess', [e, n, t]), u(s, e, n);
    }

    function c(t, e, n, o, i) {
      const s = o.context;
      o.error.call(s, n, e, t), i && i.rejectWith(s, [n, e, t]), r(o, s, 'ajaxError', [n, o, t || e]), u(e, n, o);
    }

    function u(t, e, n) {
      const o = n.context;
      n.complete.call(o, e, t), r(n, o, 'ajaxComplete', [e, n]), i(n);
    }

    function f(t, e, n) {
      if (n.dataFilter == l) return t;
      const r = n.context;
      return n.dataFilter.call(r, t, e);
    }

    function l() {
    }

    function p(t) {
      return t && (t = t.split(';', 2)[0]), t && (t == C ? 'html' : t == A ? 'json' : k.test(t) ? 'script' : E.test(t) && 'xml') || 'text';
    }

    function h(t, e) {
      return e == '' ? t : (`${t}&${e}`).replace(/[&?]{1,2}/, '?');
    }

    function d(t) {
      t.processData && t.data && e.type(t.data) != 'string' && (t.data = e.param(t.data, t.traditional)), !t.data || t.type && t.type.toUpperCase() != 'GET' && t.dataType != 'jsonp' || (t.url = h(t.url, t.data), t.data = void 0);
    }

    function y(t, n, r, o) {
      return e.isFunction(n) && (o = r, r = n, n = void 0), e.isFunction(r) || (o = r, r = void 0), {
        url: t,
        data: n,
        success: r,
        dataType: o,
      };
    }

    function m(t, n, r, o) {
      let i,
        s = e.isArray(n),
        a = e.isPlainObject(n);
      e.each(n, (n, c) => {
        i = e.type(c), o && (n = r ? o : `${o}[${a || i == 'object' || i == 'array' ? n : ''}]`), !o && s ? t.add(c.name, c.value) : i == 'array' || !r && i == 'object' ? m(t, c, r, n) : t.add(n, c);
      });
    }

    var g,
      v,
      b = +new Date(),
      w = t.document,
      x = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
      k = /^(?:text|application)\/javascript/i,
      E = /^(?:text|application)\/xml/i,
      A = 'application/json',
      C = 'text/html',
      B = /^\s*$/,
      S = w.createElement('a');
    S.href = t.location.href, e.active = 0, e.ajaxJSONP = function (n, r) {
      if (!('type' in n)) return e.ajax(n);
      let o,
        i,
        u = n.jsonpCallback,
        f = (e.isFunction(u) ? u() : u) || `Zepto${b++}`,
        l = w.createElement('script'),
        p = t[f],
        h = function (t) {
          e(l).triggerHandler('error', t || 'abort');
        },
        d = { abort: h };
      return r && r.promise(d), e(l).on('load error', (s, u) => {
        clearTimeout(i), e(l).off().remove(), s.type != 'error' && o ? a(o[0], d, n, r) : c(null, u || 'error', d, n, r), t[f] = p, o && e.isFunction(p) && p(o[0]), p = o = void 0;
      }), s(d, n) === !1 ? (h('abort'), d) : (t[f] = function () {
        o = arguments;
      }, l.src = n.url.replace(/\?(.+)=\?/, `?$1=${f}`), w.head.appendChild(l), n.timeout > 0 && (i = setTimeout(() => {
        h('timeout');
      }, n.timeout)), d);
    }, e.ajaxSettings = {
      type: 'GET',
      beforeSend: l,
      success: l,
      error: l,
      complete: l,
      context: null,
      global: !0,
      xhr() {
        return new t.XMLHttpRequest();
      },
      accepts: {
        script: 'text/javascript, application/javascript, application/x-javascript',
        json: A,
        xml: 'application/xml, text/xml',
        html: C,
        text: 'text/plain',
      },
      crossDomain: !1,
      timeout: 0,
      processData: !0,
      cache: !0,
      dataFilter: l,
    }, e.ajax = function (n) {
      let r,
        i,
        u = e.extend({}, n || {}),
        y = e.Deferred && e.Deferred();
      for (g in e.ajaxSettings) void 0 === u[g] && (u[g] = e.ajaxSettings[g]);
      o(u), u.crossDomain || (r = w.createElement('a'), r.href = u.url, r.href = r.href, u.crossDomain = `${S.protocol}//${S.host}` != `${r.protocol}//${r.host}`), u.url || (u.url = t.location.toString()), (i = u.url.indexOf('#')) > -1 && (u.url = u.url.slice(0, i)), d(u);
      let m = u.dataType,
        b = /\?.+=\?/.test(u.url);
      if (b && (m = 'jsonp'), u.cache !== !1 && (n && n.cache === !0 || m != 'script' && m != 'jsonp') || (u.url = h(u.url, `_=${Date.now()}`)), m == 'jsonp') return b || (u.url = h(u.url, u.jsonp ? `${u.jsonp}=?` : u.jsonp === !1 ? '' : 'callback=?')), e.ajaxJSONP(u, y);
      let x,
        k = u.accepts[m],
        E = {},
        A = function (t, e) {
          E[t.toLowerCase()] = [t, e];
        },
        C = /^([\w-]+:)\/\//.test(u.url) ? RegExp.$1 : t.location.protocol,
        T = u.xhr(),
        N = T.setRequestHeader;
      if (y && y.promise(T), u.crossDomain || A('X-Requested-With', 'XMLHttpRequest'), A('Accept', k || '*/*'), (k = u.mimeType || k) && (k.indexOf(',') > -1 && (k = k.split(',', 2)[0]), T.overrideMimeType && T.overrideMimeType(k)), (u.contentType || u.contentType !== !1 && u.data && u.type.toUpperCase() != 'GET') && A('Content-Type', u.contentType || 'application/x-www-form-urlencoded'), u.headers) for (v in u.headers) A(v, u.headers[v]);
      if (T.setRequestHeader = A, T.onreadystatechange = function () {
        if (T.readyState == 4) {
          T.onreadystatechange = l, clearTimeout(x);
          let t,
            n = !1;
          if (T.status >= 200 && T.status < 300 || T.status == 304 || T.status == 0 && C == 'file:') {
            if (m = m || p(u.mimeType || T.getResponseHeader('content-type')), T.responseType == 'arraybuffer' || T.responseType == 'blob') t = T.response; else {
              t = T.responseText;
              try {
                t = f(t, m, u), m == 'script' ? (0, eval)(t) : m == 'xml' ? t = T.responseXML : m == 'json' && (t = B.test(t) ? null : e.parseJSON(t));
              } catch (t) {
                n = t;
              }
              if (n) return c(n, 'parsererror', T, u, y);
            }
            a(t, T, u, y);
          } else c(T.statusText || null, T.status ? 'error' : 'abort', T, u, y);
        }
      }, s(T, u) === !1) return T.abort(), c(null, 'abort', T, u, y), T;
      const j = !('async' in u) || u.async;
      if (T.open(u.type, u.url, j, u.username, u.password), u.xhrFields) for (v in u.xhrFields) T[v] = u.xhrFields[v];
      for (v in E) N.apply(T, E[v]);
      return u.timeout > 0 && (x = setTimeout(() => {
        T.onreadystatechange = l, T.abort(), c(null, 'timeout', T, u, y);
      }, u.timeout)), T.send(u.data ? u.data : null), T;
    }, e.get = function () {
      return e.ajax(y(...arguments));
    }, e.post = function () {
      const t = y(...arguments);
      return t.type = 'POST', e.ajax(t);
    }, e.getJSON = function () {
      const t = y(...arguments);
      return t.dataType = 'json', e.ajax(t);
    }, e.fn.load = function (t, n, r) {
      if (!this.length) return this;
      let o,
        i = this,
        s = t.split(/\s/),
        a = y(t, n, r),
        c = a.success;
      return s.length > 1 && (a.url = s[0], o = s[1]), a.success = function (t) {
        i.html(o ? e('<div>').html(t.replace(x, '')).find(o) : t), c && c.apply(i, arguments);
      }, e.ajax(a), this;
    };
    const T = encodeURIComponent;
    e.param = function (t, n) {
      const r = [];
      return r.add = function (t, n) {
        e.isFunction(n) && (n = n()), n == null && (n = ''), this.push(`${T(t)}=${T(n)}`);
      }, m(r, t, n), r.join('&').replace(/%20/g, '+');
    };
  }(e)), (function (t) {
    t.fn.serializeArray = function () {
      var e,
        n,
        r = [],
        o = function (t) {
          return t.forEach ? t.forEach(o) : void r.push({ name: e, value: t });
        };
      return this[0] && t.each(this[0].elements, (r, i) => {
        n = i.type, e = i.name, e && i.nodeName.toLowerCase() != 'fieldset' && !i.disabled && n != 'submit' && n != 'reset' && n != 'button' && n != 'file' && (n != 'radio' && n != 'checkbox' || i.checked) && o(t(i).val());
      }), r;
    }, t.fn.serialize = function () {
      const t = [];
      return this.serializeArray().forEach((e) => {
        t.push(`${encodeURIComponent(e.name)}=${encodeURIComponent(e.value)}`);
      }), t.join('&');
    }, t.fn.submit = function (e) {
      if (0 in arguments) this.bind('submit', e); else if (this.length) {
        const n = t.Event('submit');
        this.eq(0).trigger(n), n.isDefaultPrevented() || this.get(0).submit();
      }
      return this;
    };
  }(e)), (function () {
    try {
      getComputedStyle(void 0);
    } catch (n) {
      const e = getComputedStyle;
      t.getComputedStyle = function (t, n) {
        try {
          return e(t, n);
        } catch (t) {
          return null;
        }
      };
    }
  }()), e;
}));
