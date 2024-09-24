var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/events/events.js
var require_events = __commonJS({
  "node_modules/events/events.js"(exports, module) {
    "use strict";
    var R = typeof Reflect === "object" ? Reflect : null;
    var ReflectApply = R && typeof R.apply === "function" ? R.apply : function ReflectApply2(target, receiver, args) {
      return Function.prototype.apply.call(target, receiver, args);
    };
    var ReflectOwnKeys;
    if (R && typeof R.ownKeys === "function") {
      ReflectOwnKeys = R.ownKeys;
    } else if (Object.getOwnPropertySymbols) {
      ReflectOwnKeys = function ReflectOwnKeys2(target) {
        return Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target));
      };
    } else {
      ReflectOwnKeys = function ReflectOwnKeys2(target) {
        return Object.getOwnPropertyNames(target);
      };
    }
    function ProcessEmitWarning(warning) {
      if (console && console.warn) console.warn(warning);
    }
    var NumberIsNaN = Number.isNaN || function NumberIsNaN2(value) {
      return value !== value;
    };
    function EventEmitter2() {
      EventEmitter2.init.call(this);
    }
    module.exports = EventEmitter2;
    module.exports.once = once;
    EventEmitter2.EventEmitter = EventEmitter2;
    EventEmitter2.prototype._events = void 0;
    EventEmitter2.prototype._eventsCount = 0;
    EventEmitter2.prototype._maxListeners = void 0;
    var defaultMaxListeners = 10;
    function checkListener(listener) {
      if (typeof listener !== "function") {
        throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
      }
    }
    Object.defineProperty(EventEmitter2, "defaultMaxListeners", {
      enumerable: true,
      get: function() {
        return defaultMaxListeners;
      },
      set: function(arg) {
        if (typeof arg !== "number" || arg < 0 || NumberIsNaN(arg)) {
          throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + ".");
        }
        defaultMaxListeners = arg;
      }
    });
    EventEmitter2.init = function() {
      if (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) {
        this._events = /* @__PURE__ */ Object.create(null);
        this._eventsCount = 0;
      }
      this._maxListeners = this._maxListeners || void 0;
    };
    EventEmitter2.prototype.setMaxListeners = function setMaxListeners(n) {
      if (typeof n !== "number" || n < 0 || NumberIsNaN(n)) {
        throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + ".");
      }
      this._maxListeners = n;
      return this;
    };
    function _getMaxListeners(that) {
      if (that._maxListeners === void 0)
        return EventEmitter2.defaultMaxListeners;
      return that._maxListeners;
    }
    EventEmitter2.prototype.getMaxListeners = function getMaxListeners() {
      return _getMaxListeners(this);
    };
    EventEmitter2.prototype.emit = function emit(type) {
      var args = [];
      for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
      var doError = type === "error";
      var events = this._events;
      if (events !== void 0)
        doError = doError && events.error === void 0;
      else if (!doError)
        return false;
      if (doError) {
        var er;
        if (args.length > 0)
          er = args[0];
        if (er instanceof Error) {
          throw er;
        }
        var err = new Error("Unhandled error." + (er ? " (" + er.message + ")" : ""));
        err.context = er;
        throw err;
      }
      var handler = events[type];
      if (handler === void 0)
        return false;
      if (typeof handler === "function") {
        ReflectApply(handler, this, args);
      } else {
        var len = handler.length;
        var listeners = arrayClone(handler, len);
        for (var i = 0; i < len; ++i)
          ReflectApply(listeners[i], this, args);
      }
      return true;
    };
    function _addListener(target, type, listener, prepend) {
      var m;
      var events;
      var existing;
      checkListener(listener);
      events = target._events;
      if (events === void 0) {
        events = target._events = /* @__PURE__ */ Object.create(null);
        target._eventsCount = 0;
      } else {
        if (events.newListener !== void 0) {
          target.emit(
            "newListener",
            type,
            listener.listener ? listener.listener : listener
          );
          events = target._events;
        }
        existing = events[type];
      }
      if (existing === void 0) {
        existing = events[type] = listener;
        ++target._eventsCount;
      } else {
        if (typeof existing === "function") {
          existing = events[type] = prepend ? [listener, existing] : [existing, listener];
        } else if (prepend) {
          existing.unshift(listener);
        } else {
          existing.push(listener);
        }
        m = _getMaxListeners(target);
        if (m > 0 && existing.length > m && !existing.warned) {
          existing.warned = true;
          var w = new Error("Possible EventEmitter memory leak detected. " + existing.length + " " + String(type) + " listeners added. Use emitter.setMaxListeners() to increase limit");
          w.name = "MaxListenersExceededWarning";
          w.emitter = target;
          w.type = type;
          w.count = existing.length;
          ProcessEmitWarning(w);
        }
      }
      return target;
    }
    EventEmitter2.prototype.addListener = function addListener(type, listener) {
      return _addListener(this, type, listener, false);
    };
    EventEmitter2.prototype.on = EventEmitter2.prototype.addListener;
    EventEmitter2.prototype.prependListener = function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };
    function onceWrapper() {
      if (!this.fired) {
        this.target.removeListener(this.type, this.wrapFn);
        this.fired = true;
        if (arguments.length === 0)
          return this.listener.call(this.target);
        return this.listener.apply(this.target, arguments);
      }
    }
    function _onceWrap(target, type, listener) {
      var state = { fired: false, wrapFn: void 0, target, type, listener };
      var wrapped = onceWrapper.bind(state);
      wrapped.listener = listener;
      state.wrapFn = wrapped;
      return wrapped;
    }
    EventEmitter2.prototype.once = function once2(type, listener) {
      checkListener(listener);
      this.on(type, _onceWrap(this, type, listener));
      return this;
    };
    EventEmitter2.prototype.prependOnceListener = function prependOnceListener(type, listener) {
      checkListener(listener);
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };
    EventEmitter2.prototype.removeListener = function removeListener(type, listener) {
      var list, events, position, i, originalListener;
      checkListener(listener);
      events = this._events;
      if (events === void 0)
        return this;
      list = events[type];
      if (list === void 0)
        return this;
      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = /* @__PURE__ */ Object.create(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit("removeListener", type, list.listener || listener);
        }
      } else if (typeof list !== "function") {
        position = -1;
        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }
        if (position < 0)
          return this;
        if (position === 0)
          list.shift();
        else {
          spliceOne(list, position);
        }
        if (list.length === 1)
          events[type] = list[0];
        if (events.removeListener !== void 0)
          this.emit("removeListener", type, originalListener || listener);
      }
      return this;
    };
    EventEmitter2.prototype.off = EventEmitter2.prototype.removeListener;
    EventEmitter2.prototype.removeAllListeners = function removeAllListeners(type) {
      var listeners, events, i;
      events = this._events;
      if (events === void 0)
        return this;
      if (events.removeListener === void 0) {
        if (arguments.length === 0) {
          this._events = /* @__PURE__ */ Object.create(null);
          this._eventsCount = 0;
        } else if (events[type] !== void 0) {
          if (--this._eventsCount === 0)
            this._events = /* @__PURE__ */ Object.create(null);
          else
            delete events[type];
        }
        return this;
      }
      if (arguments.length === 0) {
        var keys = Object.keys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === "removeListener") continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners("removeListener");
        this._events = /* @__PURE__ */ Object.create(null);
        this._eventsCount = 0;
        return this;
      }
      listeners = events[type];
      if (typeof listeners === "function") {
        this.removeListener(type, listeners);
      } else if (listeners !== void 0) {
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }
      return this;
    };
    function _listeners(target, type, unwrap) {
      var events = target._events;
      if (events === void 0)
        return [];
      var evlistener = events[type];
      if (evlistener === void 0)
        return [];
      if (typeof evlistener === "function")
        return unwrap ? [evlistener.listener || evlistener] : [evlistener];
      return unwrap ? unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
    }
    EventEmitter2.prototype.listeners = function listeners(type) {
      return _listeners(this, type, true);
    };
    EventEmitter2.prototype.rawListeners = function rawListeners(type) {
      return _listeners(this, type, false);
    };
    EventEmitter2.listenerCount = function(emitter, type) {
      if (typeof emitter.listenerCount === "function") {
        return emitter.listenerCount(type);
      } else {
        return listenerCount.call(emitter, type);
      }
    };
    EventEmitter2.prototype.listenerCount = listenerCount;
    function listenerCount(type) {
      var events = this._events;
      if (events !== void 0) {
        var evlistener = events[type];
        if (typeof evlistener === "function") {
          return 1;
        } else if (evlistener !== void 0) {
          return evlistener.length;
        }
      }
      return 0;
    }
    EventEmitter2.prototype.eventNames = function eventNames() {
      return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
    };
    function arrayClone(arr, n) {
      var copy = new Array(n);
      for (var i = 0; i < n; ++i)
        copy[i] = arr[i];
      return copy;
    }
    function spliceOne(list, index) {
      for (; index + 1 < list.length; index++)
        list[index] = list[index + 1];
      list.pop();
    }
    function unwrapListeners(arr) {
      var ret = new Array(arr.length);
      for (var i = 0; i < ret.length; ++i) {
        ret[i] = arr[i].listener || arr[i];
      }
      return ret;
    }
    function once(emitter, name) {
      return new Promise(function(resolve, reject) {
        function errorListener(err) {
          emitter.removeListener(name, resolver);
          reject(err);
        }
        function resolver() {
          if (typeof emitter.removeListener === "function") {
            emitter.removeListener("error", errorListener);
          }
          resolve([].slice.call(arguments));
        }
        ;
        eventTargetAgnosticAddListener(emitter, name, resolver, { once: true });
        if (name !== "error") {
          addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });
        }
      });
    }
    function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
      if (typeof emitter.on === "function") {
        eventTargetAgnosticAddListener(emitter, "error", handler, flags);
      }
    }
    function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
      if (typeof emitter.on === "function") {
        if (flags.once) {
          emitter.once(name, listener);
        } else {
          emitter.on(name, listener);
        }
      } else if (typeof emitter.addEventListener === "function") {
        emitter.addEventListener(name, function wrapListener(arg) {
          if (flags.once) {
            emitter.removeEventListener(name, wrapListener);
          }
          listener(arg);
        });
      } else {
        throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
      }
    }
  }
});

// src/lib/coercion.ts
function coerceActor(arg) {
  if (arg instanceof Actor) return arg;
  if (arg instanceof Token) return arg.actor;
  if (typeof arg === "string") {
    let actor = game.actors?.get(arg);
    if (actor) return actor;
    actor = game.actors?.getName(arg);
    if (actor) return actor;
  }
}
function coercePlaylist(arg) {
  if (arg instanceof Playlist) return arg;
  if (typeof arg === "string") {
    let playlist = game.playlists?.get(arg);
    if (playlist) return playlist;
    playlist = game.playlists?.getName(arg);
    if (playlist) return playlist;
  }
}
function coerceSound(arg, playlist) {
  if (arg instanceof PlaylistSound) return arg;
  const actualPlaylist = coercePlaylist(playlist);
  if (actualPlaylist && typeof arg === "string") {
    let sound = actualPlaylist.sounds.get(arg);
    if (sound instanceof PlaylistSound) return sound;
    sound = actualPlaylist.sounds.getName(arg);
    if (sound instanceof PlaylistSound) return sound;
  }
}

// src/lib/constants.ts
var TWEEN_WAIT_TIME = 1500;
var NARRATOR_WAIT_TIME = 500;
var FLYIN_NAMES = ["typewriter", "fadein", "slidein", "scalein", "fallin", "spin", "spinscale", "outlaw", "vortex", "assemble"];

// src/lib/misc.ts
async function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
function sendChatMessage(alias, message) {
  const chatMessage = createChatMessage(alias, message);
  Hooks.callAll("createChatMessage", chatMessage, { modifiedTime: Date.now(), parent: null, render: true, renderSheet: false }, game.user?.id);
}
function createChatMessage(alias, message) {
  return {
    content: message,
    style: 2,
    author: game.user?.id,
    _id: foundry.utils.randomID(),
    type: "base",
    system: {},
    timestamp: Date.now(),
    flavor: "",
    speaker: {
      scene: null,
      actor: null,
      token: null,
      alias
    },
    whisper: [],
    blind: false,
    rolls: [],
    sound: null,
    emote: false,
    flags: {
      theatre: {
        theatreMessage: true
      }
    },
    _stats: {
      compendiumSource: null,
      duplicateSource: null,
      coreVersion: game.release?.version,
      systemId: game.system?.id,
      systemVersion: game.system?.version,
      createdTime: Date.now(),
      modifiedTime: Date.now(),
      lastModifiedBy: game.user?.id
    }
  };
}

// src/lib/staging.ts
function isActorStaged(arg) {
  const actor = coerceActor(arg);
  if (!(actor instanceof Actor)) throw new Error(game.i18n?.localize("THEATREAUTOMATION.ERRORS.INVALIDACTOR"));
  return !!theatre.getNavItemById(`theatre-${actor.id}`);
}
function stageActor(arg) {
  const actor = coerceActor(arg);
  if (!(actor instanceof Actor)) throw new Error(game.i18n?.localize("THEATREAUTOMATION.ERRORS.INVALIDACTOR"));
  if (!isActorStaged(actor))
    Theatre.addToNavBar(actor);
}
function unstageActor(arg) {
  const actor = coerceActor(arg);
  if (!(actor instanceof Actor)) throw new Error(game.i18n?.localize("THEATREAUTOMATION.ERRORS.INVALIDACTOR"));
  if (isActorStaged(actor)) {
    theatre.handleNavItemMouseUp({
      currentTarget: theatre.getNavItemById(`theatre-${actor.id}`),
      button: 2,
      ctrlKey: true
    });
  }
}

// src/lib/activation.ts
function activateActor(arg) {
  const actor = coerceActor(arg);
  if (!(actor instanceof Actor)) throw new Error(game.i18n?.localize("THEATREAUTOMATION.ERRORS.INVALIDACTOR"));
  if (!isActorStaged(actor)) stageActor(actor);
  theatre.handleNavItemMouseUp({
    currentTarget: theatre.getNavItemById(`theatre-${actor.id}`),
    button: 2
  });
  return wait(TWEEN_WAIT_TIME);
}
function deactivateActor(arg, unstage) {
  const actor = coerceActor(arg);
  if (!(actor instanceof Actor)) throw new Error(game.i18n?.localize("THEATREAUTOMATION.ERRORS.INVALIDACTOR"));
  theatre.removeInsertById(`theatre-${actor.id}`, false);
  if (unstage) {
    theatre.handleNavItemMouseUp({
      currentTarget: theatre.getNavItemById(`theatre-${actor.id}`),
      button: 2,
      ctrlKey: true
    });
  }
  return wait(TWEEN_WAIT_TIME);
}
function isActorActive(arg) {
  const actor = coerceActor(arg);
  if (!(actor instanceof Actor)) throw new Error(game.i18n?.localize("THEATREAUTOMATION.ERRORS.INVALIDACTOR"));
  const navItem = theatre.getNavItemById(`theatre-${actor.id}`);
  if (!navItem) return false;
  return navItem.classList.contains("theatre-control-nav-bar-item-active");
}
function currentlySpeaking() {
  if (theatre.speakingAs) {
    const [, id] = theatre.speakingAs.split("-");
    const actor = coerceActor(id);
    return actor ?? null;
  } else {
    return null;
  }
}
function currentlyActive() {
  const activeNavItems = $(".theatre-control-nav-bar img.theatre-control-nav-bar-item-active").map(function() {
    return this.getAttribute("imgid");
  }).toArray();
  return activeNavItems.map((elemId) => {
    const [, id] = elemId.split("-");
    return game.actors.get(id);
  }).filter((elem) => !!elem);
}

// src/lib/narration.ts
function isNarratorBarActive() {
  return $(".theatre-control-btn .theatre-icon-narrator").parent().hasClass("theatre-control-nav-bar-item-speakingas");
}
async function activateNarratorBar() {
  theatre.toggleNarratorBar(true, false);
  await wait(NARRATOR_WAIT_TIME);
}
async function deactivateNarratorBar() {
  theatre.toggleNarratorBar(false, false);
  await wait(NARRATOR_WAIT_TIME);
}
async function sendNarration(message) {
  if (!isNarratorBarActive()) await activateNarratorBar();
  sendChatMessage("narrator", message);
}

// src/lib/emotes.ts
function setEmote(arg, emote) {
  const actor = coerceActor(arg);
  if (!(actor instanceof Actor)) throw new Error(game.i18n?.localize("THEATREAUTOMATION.ERRORS.INVALIDACTOR"));
  return doSetEmote(actor, emote);
}
async function doSetEmote(actor, emote) {
  if (!isActorActive(actor)) await activateActor(actor);
  theatre.setUserEmote(
    game.user?.id,
    `theatre-${actor.id}`,
    "emote",
    emote,
    false
  );
}
function clearEmote(arg) {
  const actor = coerceActor(arg);
  if (!(actor instanceof Actor)) throw new Error(game.i18n?.localize("THEATREAUTOMATION.ERRORS.INVALIDACTOR"));
  theatre.setUserEmote(game.user?.id, `theatre-${actor.id}`, "emote", "", false);
}
function setTextFlyin(flyin, arg) {
  if (!FLYIN_NAMES.includes(flyin)) throw new Error(game.i18n?.format("THEATREAUTOMATION.ERRORS.INVALIDFLYIN", { flyin }));
  if (arg === "narrator") {
    theatre.theatreNarrator.setAttribute("textflyin", flyin);
  } else if (arg) {
    const actor = coerceActor(arg);
    if (!(actor instanceof Actor)) throw new Error(game.i18n?.localize("THEATREAUTOMATION.ERRORS.INVALIDACTOR"));
    if (!isActorActive(actor)) throw new Error(game.i18n?.localize("THEATREAUTOMATION.ERRORS.INVALIDACTOR"));
    theatre.setUserEmote(game.user?.id, `theatre-${actor.id}`, "textflyin", flyin, false);
  } else {
    theatre.setUserEmote(game.user?.id, theatre.speakingAs, "textflyin", flyin, false);
  }
}
function getTextFlyin(arg) {
  if (arg === "narrator") {
    return theatre.theatreNarrator.getAttribute("textflyin") ?? FLYIN_NAMES[0];
  } else if (arg) {
    const actor = coerceActor(arg);
    if (!(actor instanceof Actor)) throw new Error(game.i18n?.localize("THEATREAUTOMATION.ERRORS.INVALIDACTOR"));
    return theatre.getInsertById(`theatre-${actor.id}`).textFlyin;
  } else if (isNarratorBarActive()) {
    return theatre.theatreNarrator.getAttribute("textflyin");
  } else if (theatre.speakingAs) {
    return theatre.getInsertById(theatre.speakingAs).textFlyin ?? FLYIN_NAMES[0];
  } else {
    throw new Error(game.i18n?.localize("THEATREAUTOMATION.ERRORS.INVALIDACTOR"));
  }
}

// src/lib/log.ts
var LOG_ICON = "\u{1F3AD}";
var LOG_PREFIX = `${LOG_ICON} ${"Theatre Inserts Automation"}`;
var log = wrappedConsoleFunc(console.log);
var warn = wrappedConsoleFunc(console.warn);
var error = wrappedConsoleFunc(console.error);
var info = wrappedConsoleFunc(console.info);
function wrappedConsoleFunc(original) {
  return function(...args) {
    const shouldLog = true ? true : typeof args[0] === "boolean" ? args[0] : false;
    const actualArgs = args;
    if (shouldLog)
      original(LOG_PREFIX, "|", ...actualArgs);
  };
}

// src/lib/applications/IntroductionApplication.ts
var import_events = __toESM(require_events());

// src/lib/dynamicSelect.js
var DynamicSelect = class {
  constructor(element, options = {}) {
    let defaults = {
      placeholder: "Select an option",
      columns: 1,
      name: "",
      width: "",
      height: "",
      data: [],
      onChange: function() {
      }
    };
    this.options = Object.assign(defaults, options);
    this.selectElement = typeof element === "string" ? document.querySelector(element) : element;
    for (const prop in this.selectElement.dataset) {
      if (this.options[prop] !== void 0) {
        this.options[prop] = this.selectElement.dataset[prop];
      }
    }
    this.name = this.selectElement.getAttribute("name") ? this.selectElement.getAttribute("name") : "dynamic-select-" + Math.floor(Math.random() * 1e6);
    if (!this.options.data.length) {
      let options2 = this.selectElement.querySelectorAll("option");
      for (let i = 0; i < options2.length; i++) {
        this.options.data.push({
          value: options2[i].value,
          text: options2[i].innerHTML,
          img: options2[i].getAttribute("data-img"),
          selected: options2[i].selected,
          html: options2[i].getAttribute("data-html"),
          imgWidth: options2[i].getAttribute("data-img-width"),
          imgHeight: options2[i].getAttribute("data-img-height")
        });
      }
    }
    this.element = this._template();
    this.selectElement.replaceWith(this.element);
    this._updateSelected();
    this._eventHandlers();
  }
  _template() {
    let optionsHTML = "";
    for (let i = 0; i < this.data.length; i++) {
      let optionWidth = 100 / this.columns;
      let optionContent = "";
      if (this.data[i].html) {
        optionContent = this.data[i].html;
      } else {
        optionContent = `
                    ${this.data[i].img ? `<img src="${this.data[i].img}" alt="${this.data[i].text}" class="${this.data[i].imgWidth && this.data[i].imgHeight ? "dynamic-size" : ""}" style="${this.data[i].imgWidth ? "width:" + this.data[i].imgWidth + ";" : ""}${this.data[i].imgHeight ? "height:" + this.data[i].imgHeight + ";" : ""}">` : ""}
                    ${this.data[i].text ? '<span class="dynamic-select-option-text">' + this.data[i].text + "</span>" : ""}
                `;
      }
      optionsHTML += `
                <div class="dynamic-select-option${this.data[i].value == this.selectedValue ? " dynamic-select-selected" : ""}${this.data[i].text || this.data[i].html ? "" : " dynamic-select-no-text"}" data-value="${this.data[i].value}" style="width:${optionWidth}%;${this.height ? "height:" + this.height + ";" : ""}">
                    ${optionContent}
                </div>
            `;
    }
    let template = `
            <div class="dynamic-select ${this.name}"${this.selectElement.id ? ' id="' + this.selectElement.id + '"' : ""} style="${this.width ? "width:" + this.width + ";" : ""}${this.height ? "height:" + this.height + ";" : ""}">
                <input type="hidden" name="${this.name}" value="${this.selectedValue}">
                <div class="dynamic-select-header" style="${this.width ? "width:" + this.width + ";" : ""}${this.height ? "height:" + this.height + ";" : ""}"><span class="dynamic-select-header-placeholder">${this.placeholder}</span></div>
                <div class="dynamic-select-options" style="${this.options.dropdownWidth ? "width:" + this.options.dropdownWidth + ";" : ""}${this.options.dropdownHeight ? "height:" + this.options.dropdownHeight + ";" : ""}">${optionsHTML}</div>
            </div>
        `;
    let element = document.createElement("div");
    element.innerHTML = template;
    return element;
  }
  _eventHandlers() {
    this.element.querySelectorAll(".dynamic-select-option").forEach((option) => {
      option.onclick = () => {
        this.element.querySelectorAll(".dynamic-select-selected").forEach(
          (selected) => selected.classList.remove("dynamic-select-selected")
        );
        option.classList.add("dynamic-select-selected");
        this.element.querySelector(".dynamic-select-header").innerHTML = option.innerHTML;
        this.element.querySelector("input").value = option.getAttribute("data-value");
        this.data.forEach((data) => data.selected = false);
        this.data.filter(
          (data) => data.value == option.getAttribute("data-value")
        )[0].selected = true;
        this.element.querySelector(".dynamic-select-header").classList.remove("dynamic-select-header-active");
        this.options.onChange(
          option.getAttribute("data-value"),
          option.querySelector(".dynamic-select-option-text") ? option.querySelector(".dynamic-select-option-text").innerHTML : "",
          option
        );
      };
    });
    this.element.querySelector(".dynamic-select-header").onclick = () => {
      this.element.querySelector(".dynamic-select-header").classList.toggle("dynamic-select-header-active");
    };
    if (this.selectElement.id && document.querySelector('label[for="' + this.selectElement.id + '"]')) {
      document.querySelector(
        'label[for="' + this.selectElement.id + '"]'
      ).onclick = () => {
        this.element.querySelector(".dynamic-select-header").classList.toggle("dynamic-select-header-active");
      };
    }
    document.addEventListener("click", (event) => {
      if (!event.target.closest("." + this.name) && !event.target.closest('label[for="' + this.selectElement.id + '"]')) {
        this.element.querySelector(".dynamic-select-header").classList.remove("dynamic-select-header-active");
      }
    });
  }
  _updateSelected() {
    if (this.selectedValue) {
      this.element.querySelector(".dynamic-select-header").innerHTML = this.element.querySelector(".dynamic-select-selected").innerHTML;
    }
  }
  get selectedValue() {
    let selected = this.data.filter((option) => option.selected);
    selected = selected.length ? selected[0].value : "";
    return selected;
  }
  set data(value) {
    this.options.data = value;
  }
  get data() {
    return this.options.data;
  }
  set selectElement(value) {
    this.options.selectElement = value;
  }
  get selectElement() {
    return this.options.selectElement;
  }
  set element(value) {
    this.options.element = value;
  }
  get element() {
    return this.options.element;
  }
  set placeholder(value) {
    this.options.placeholder = value;
  }
  get placeholder() {
    return this.options.placeholder;
  }
  set columns(value) {
    this.options.columns = value;
  }
  get columns() {
    return this.options.columns;
  }
  set name(value) {
    this.options.name = value;
  }
  get name() {
    return this.options.name;
  }
  set width(value) {
    this.options.width = value;
  }
  get width() {
    return this.options.width;
  }
  set height(value) {
    this.options.height = value;
  }
  get height() {
    return this.options.height;
  }
};
document.querySelectorAll("[data-dynamic-select]").forEach((select) => new DynamicSelect(select));

// src/lib/applications/sharedFunctionality.ts
function getActorContext(actor) {
  const castActor = actor;
  return {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    id: castActor.id,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    name: castActor.name,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    img: castActor.img,
    selected: false
  };
}
function getPlaylistContext(playlist) {
  return {
    id: playlist.id ?? "",
    name: playlist.name,
    sounds: playlist.sounds.map((sound) => getSoundContext(sound))
  };
}
function getSoundContext(sound) {
  return {
    id: sound.id ?? "",
    name: sound.name,
    duration: sound.sound?.duration || 0,
    selected: false
  };
}

// src/lib/applications/IntroductionApplication.ts
var IntroductionApplication = class extends FormApplication {
  constructor(object, options) {
    const mergedObject = foundry.utils.mergeObject(
      {
        musicWait: 0,
        portraitWait: 0,
        closeWait: 0,
        selectedActor: null,
        selectedSound: null
      },
      object
    );
    super(mergedObject, options);
    this.events = new import_events.default();
    log("Options:", this.options);
  }
  _updateObject(_event, formData) {
    log("updateObject:", formData);
    if (formData) {
      const actor = formData.actorSelect ? coerceActor(formData.actorSelect) : null;
      if (!(actor instanceof Actor)) throw new Error("THEATREAUTOMATION.ERRORS.INVALIDACTOR");
      let playlist;
      let sound;
      if (formData.soundSelect) {
        const [playlistId, soundId] = formData.soundSelect.split("-");
        playlist = coercePlaylist(playlistId);
        if (playlist instanceof Playlist) sound = coerceSound(soundId, playlist);
      }
      this.object = {
        selectedActor: actor,
        selectedSound: sound,
        musicWait: formData.musicWait ?? 0,
        portraitWait: formData.portraitWait ?? 0,
        introMessage: formData.introMessage ?? "",
        closeWait: formData.closeWait ?? 0
      };
    }
    return Promise.resolve();
  }
  _render(force, options) {
    return super._render(force, options).then(() => {
      this.emit("render");
    });
  }
  async close(options) {
    await super.close(options);
    if (options?.submit) this.emit("submit", this.object);
    else this.emit("cancel");
    this.emit("close");
  }
  getData(options) {
    const playlists = game.playlists.contents.map((playlist) => getPlaylistContext(playlist));
    const actors = game.actors.contents.map((actor) => ({
      ...getActorContext(actor),
      ...this.object?.selectedActor?.id === actor.id ? { selected: true } : { selected: false }
    }));
    const localContext = {
      actors,
      playlists,
      introMessage: this.object.introMessage
    };
    const parentContext = super.getData(options);
    if (typeof parentContext.then === "function") {
      return parentContext.then((data) => foundry.utils.mergeObject(data, localContext));
    } else {
      return foundry.utils.mergeObject(parentContext, localContext);
    }
  }
  static get defaultOptions() {
    return foundry.utils.mergeObject(
      super.defaultOptions,
      {
        title: game.i18n?.localize("THEATREAUTOMATION.DIALOGS.INTRO.TITLE") || "",
        template: `/modules/${"theatre-inserts-automation"}/templates/intro/application.hbs`,
        closeOnSubmit: true,
        submitOnClose: false,
        submitOnChange: false
      }
    );
  }
  activateListeners(html) {
    super.activateListeners(html);
    new DynamicSelect("#actorSelect", {
      name: "actorSelect",
      onChange: (value, text, option) => {
        log("Dynamic select:", value, text, option);
      }
    });
    html.find("input[type='number']").on("focus", function() {
      $(this).trigger("select");
    });
    html.find("[data-action='submit']").on("click", (e) => {
      this.close({ submit: true });
      e.preventDefault();
    });
    html.find("[data-action='cancel']").on("click", (e) => {
      this.close({ submit: false });
      e.preventDefault();
    });
  }
  // #region EventEmitter Implementation
  // [EventEmitter.captureRejectionSymbol]?<K>(error: Error, event: keyof EventMap | K, ...args: K extends keyof EventMap ? EventMap[K] : never): void {
  //   throw new Error("Method not implemented.");
  // }
  addListener(eventName, listener) {
    this.events.addListener(eventName, listener);
    return this;
  }
  on(eventName, listener) {
    this.events.on(eventName, listener);
    return this;
  }
  once(eventName, listener) {
    this.events.once(eventName, listener);
    return this;
  }
  removeListener(eventName, listener) {
    this.events.removeListener(eventName, listener);
    return this;
  }
  off(eventName, listener) {
    this.events.off(eventName, listener);
    return this;
  }
  removeAllListeners(eventName) {
    this.events.removeAllListeners(eventName);
    return this;
  }
  setMaxListeners(n) {
    this.events.setMaxListeners(n);
    return this;
  }
  getMaxListeners() {
    return this.events.getMaxListeners();
  }
  listeners(eventName) {
    return this.events.listeners(eventName);
  }
  rawListeners(eventName) {
    return this.events.rawListeners(eventName);
  }
  emit(eventName, ...args) {
    return this.events.emit(eventName, ...args);
  }
  listenerCount(eventName, listener) {
    return this.events.listenerCount(eventName, listener);
  }
  prependListener(eventName, listener) {
    this.events.prependListener(eventName, listener);
    return this;
  }
  prependOnceListener(eventName, listener) {
    this.events.prependOnceListener(eventName, listener);
    return this;
  }
  eventNames() {
    return this.events.eventNames();
  }
  // #endregion
};

// src/lib/messaging.ts
function sendMessage(arg, message, flyin = "typewriter") {
  const actor = coerceActor(arg);
  if (!(actor instanceof Actor)) throw new Error(game.i18n?.localize("THEATREAUTOMATION.ERRORS.INVALIDACTOR"));
  if (!isActorStaged(actor)) stageActor(actor);
  return (isActorActive(actor) ? Promise.resolve() : activateActor(actor)).then(() => {
    if (!isActorSpeaking(actor)) setSpeakingAs(actor);
    const oldFlyin = getTextFlyin();
    setTextFlyin(flyin);
    sendChatMessage(actor.name, message);
    setTextFlyin(oldFlyin);
  });
}
function setSpeakingAs(actor) {
  if (!isActorStaged(actor)) throw new Error(game.i18n?.localize("THEATREAUTOMATION.ERRORS.ACTORNOTSTAGED"));
  if (!isActorActive(actor)) throw new Error(game.i18n?.localize("THEATREAUTOMATION.ERRORS.ACTORNOTACTIVE"));
  const navItem = theatre.getNavItemById(`theatre-${actor.id}`);
  if (!navItem.classList.contains("theatre-control-nav-bar-item-speakingas")) {
    theatre.handleNavItemMouseUp({
      currentTarget: navItem,
      button: 0
    });
  }
}
function isActorSpeaking(arg) {
  const actor = coerceActor(arg);
  if (!(actor instanceof Actor)) throw new Error(game.i18n?.localize("THEATREAUTOMATION.ERRORS.INVALIDACTOR"));
  const navItem = theatre.getNavItemById(`theatre-${actor.id}`);
  return navItem.classList.contains("theatre-control-nav-bar-item-speakingas");
}

// src/lib/sounds.ts
function playSound(sound) {
  sound?.parent?.playSound(sound);
}

// src/lib/introduction.ts
async function getActorIntroData(selectedActor) {
  return new Promise((resolve, reject) => {
    const actor = coerceActor(selectedActor);
    if (selectedActor !== void 0 && !(actor instanceof Actor)) reject(new Error(game.i18n?.localize("THEATREAUTOMATION.ERRORS.INVALIDACTOR")));
    new IntroductionApplication({
      ...actor ? { selectedActor: actor } : {}
    }).once("submit", resolve).once("cancel", () => {
      resolve(void 0);
    }).render(true);
  });
}
async function introduceActor(actor, message, portraitWait = 0, musicWait = 0, sound, closeWait = 0) {
  const actualActor = coerceActor(actor);
  if (!(actualActor instanceof Actor)) throw new Error(game.i18n?.localize("THEATREAUTOMATION.ERRORS.INVALIDACTOR"));
  const promises = [];
  if (sound instanceof PlaylistSound)
    promises.push(wait(musicWait).then(() => playSound(sound)));
  promises.push(wait(portraitWait).then(() => {
    if (message) return sendMessage(actualActor, message).then(() => {
      if (closeWait) return wait(closeWait).then(() => {
        deactivateActor(actualActor);
      });
    });
    else return activateActor(actualActor).then(() => {
      if (closeWait) return wait(closeWait).then(() => {
        deactivateActor(actualActor);
      });
    });
  }));
  await Promise.all(promises);
}

// src/lib/standing.ts
function getStandingAnimations() {
  return Object.keys(Theatre.STANDING_ANIMS);
}
function setTextStanding(standing, arg) {
  if (arg === "narrator") {
    theatre.theatreNarrator.setAttribute("textstanding", standing);
  } else if (arg) {
    const actor = coerceActor(arg);
    if (!(actor instanceof Actor)) throw new Error(game.i18n?.localize("THEATREAUTOMATION.ERRORS.INVALIDACTOR"));
    if (!isActorActive(actor)) throw new Error(game.i18n?.localize("THEATREAUTOMATION.ERRORS.INVALIDACTOR"));
    theatre.setUserEmote(game.user?.id, `theatre-${actor.id}`, "textstanding", standing, false);
  } else if (theatre.speakingAs) {
    theatre.setUserEmote(game.user?.id, theatre.speakingAs, "textstanding", standing, false);
  } else if (isNarratorBarActive()) {
    theatre.theatreNarrator.setAttribute("textstanding", standing);
  } else {
    throw new Error(game.i18n?.localize("THEATREAUTOMATION.ERRORS.INVALIDACTOR"));
  }
}
function getTextStanding(arg) {
  if (arg === "narrator") {
    return theatre.theatreNarrator.getAttribute("textstanding");
  } else if (arg) {
    const actor = coerceActor(arg);
    if (!(actor instanceof Actor)) throw new Error(game.i18n?.localize("THEATREAUTOMATION.ERRORS.INVALIDACTOR"));
    return theatre.getInsertById(`theatre-${actor.id}`).textStanding;
  } else if (isNarratorBarActive()) {
    return theatre.theatreNarrator.getAttribute("textstanding");
  } else {
    const actor = currentlySpeaking();
    if (actor instanceof Actor) return theatre.getInsertById(`theatre-${actor.id}`).textStanding;
    throw new Error(game.i18n?.localize("THEATREAUTOMATION.ERRORS.INVALIDACTOR"));
  }
}

// src/lib/api.ts
var api_default = {
  wait,
  activateActor,
  deactivateActor,
  isActorActive,
  isActorStaged,
  stageActor,
  unstageActor,
  sendMessage,
  setEmote,
  clearEmote,
  getActorIntroData,
  introduceActor,
  isNarratorBarActive,
  activateNarratorBar,
  deactivateNarratorBar,
  sendNarration,
  setTextFlyin,
  getTextFlyin,
  FLYIN_NAMES,
  getTextStanding,
  setTextStanding,
  currentlySpeaking,
  currentlyActive
};

// src/module.ts
Hooks.once("ready", async () => {
  if (game instanceof Game && !game.modules.get("theatre")?.active) {
    ui.notifications?.error(game.i18n?.format("THEATREAUTOMATION.ERRORS.THEATREINSERTSNOTFOUND", { MODULENAME: "Theatre Inserts Automation" }));
  } else {
    window.TheatreAutomation = api_default;
    await loadTemplates([
      `/modules/${"theatre-inserts-automation"}/templates/intro/application.hbs`
    ]);
    window.TheatreAutomation.STANDING_NAMES = getStandingAnimations();
  }
});
//# sourceMappingURL=module.js.map
