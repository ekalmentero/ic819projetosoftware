import {
  ClickOutside,
  Intersect,
  Ripple,
  Touch
} from "./chunk-LB4TAYYL.js";
import "./chunk-IG3VJWUU.js";
import "./chunk-OWZKEKZD.js";

// node_modules/vuetify/lib/directives/mutate/index.mjs
function mounted(el, binding) {
  const modifiers = binding.modifiers || {};
  const value = binding.value;
  const {
    once,
    immediate,
    ...modifierKeys
  } = modifiers;
  const defaultValue = !Object.keys(modifierKeys).length;
  const {
    handler,
    options
  } = typeof value === "object" ? value : {
    handler: value,
    options: {
      attributes: (modifierKeys == null ? void 0 : modifierKeys.attr) ?? defaultValue,
      characterData: (modifierKeys == null ? void 0 : modifierKeys.char) ?? defaultValue,
      childList: (modifierKeys == null ? void 0 : modifierKeys.child) ?? defaultValue,
      subtree: (modifierKeys == null ? void 0 : modifierKeys.sub) ?? defaultValue
    }
  };
  const observer = new MutationObserver(function() {
    let mutations = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
    let observer2 = arguments.length > 1 ? arguments[1] : void 0;
    handler == null ? void 0 : handler(mutations, observer2);
    if (once)
      unmounted(el, binding);
  });
  if (immediate)
    handler == null ? void 0 : handler([], observer);
  el._mutate = Object(el._mutate);
  el._mutate[binding.instance.$.uid] = {
    observer
  };
  observer.observe(el, options);
}
function unmounted(el, binding) {
  var _a;
  if (!((_a = el._mutate) == null ? void 0 : _a[binding.instance.$.uid]))
    return;
  el._mutate[binding.instance.$.uid].observer.disconnect();
  delete el._mutate[binding.instance.$.uid];
}
var Mutate = {
  mounted,
  unmounted
};

// node_modules/vuetify/lib/directives/resize/index.mjs
function mounted2(el, binding) {
  var _a, _b;
  const handler = binding.value;
  const options = {
    passive: !((_a = binding.modifiers) == null ? void 0 : _a.active)
  };
  window.addEventListener("resize", handler, options);
  el._onResize = Object(el._onResize);
  el._onResize[binding.instance.$.uid] = {
    handler,
    options
  };
  if (!((_b = binding.modifiers) == null ? void 0 : _b.quiet)) {
    handler();
  }
}
function unmounted2(el, binding) {
  var _a;
  if (!((_a = el._onResize) == null ? void 0 : _a[binding.instance.$.uid]))
    return;
  const {
    handler,
    options
  } = el._onResize[binding.instance.$.uid];
  window.removeEventListener("resize", handler, options);
  delete el._onResize[binding.instance.$.uid];
}
var Resize = {
  mounted: mounted2,
  unmounted: unmounted2
};

// node_modules/vuetify/lib/directives/scroll/index.mjs
function mounted3(el, binding) {
  const {
    self = false
  } = binding.modifiers ?? {};
  const value = binding.value;
  const options = typeof value === "object" && value.options || {
    passive: true
  };
  const handler = typeof value === "function" || "handleEvent" in value ? value : value.handler;
  const target = self ? el : binding.arg ? document.querySelector(binding.arg) : window;
  if (!target)
    return;
  target.addEventListener("scroll", handler, options);
  el._onScroll = Object(el._onScroll);
  el._onScroll[binding.instance.$.uid] = {
    handler,
    options,
    // Don't reference self
    target: self ? void 0 : target
  };
}
function unmounted3(el, binding) {
  var _a;
  if (!((_a = el._onScroll) == null ? void 0 : _a[binding.instance.$.uid]))
    return;
  const {
    handler,
    options,
    target = el
  } = el._onScroll[binding.instance.$.uid];
  target.removeEventListener("scroll", handler, options);
  delete el._onScroll[binding.instance.$.uid];
}
function updated(el, binding) {
  if (binding.value === binding.oldValue)
    return;
  unmounted3(el, binding);
  mounted3(el, binding);
}
var Scroll = {
  mounted: mounted3,
  unmounted: unmounted3,
  updated
};
export {
  ClickOutside,
  Intersect,
  Mutate,
  Resize,
  Ripple,
  Scroll,
  Touch
};
//# sourceMappingURL=vuetify_directives.js.map
