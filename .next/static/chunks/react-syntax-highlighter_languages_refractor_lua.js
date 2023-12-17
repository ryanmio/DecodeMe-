"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([["react-syntax-highlighter_languages_refractor_lua"],{

/***/ "./node_modules/refractor/lang/lua.js":
/*!********************************************!*\
  !*** ./node_modules/refractor/lang/lua.js ***!
  \********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval(__webpack_require__.ts("\n\nmodule.exports = lua\nlua.displayName = 'lua'\nlua.aliases = []\nfunction lua(Prism) {\n  Prism.languages.lua = {\n    comment: /^#!.+|--(?:\\[(=*)\\[[\\s\\S]*?\\]\\1\\]|.*)/m,\n    // \\z may be used to skip the following space\n    string: {\n      pattern:\n        /([\"'])(?:(?!\\1)[^\\\\\\r\\n]|\\\\z(?:\\r\\n|\\s)|\\\\(?:\\r\\n|[^z]))*\\1|\\[(=*)\\[[\\s\\S]*?\\]\\2\\]/,\n      greedy: true\n    },\n    number:\n      /\\b0x[a-f\\d]+(?:\\.[a-f\\d]*)?(?:p[+-]?\\d+)?\\b|\\b\\d+(?:\\.\\B|(?:\\.\\d*)?(?:e[+-]?\\d+)?\\b)|\\B\\.\\d+(?:e[+-]?\\d+)?\\b/i,\n    keyword:\n      /\\b(?:and|break|do|else|elseif|end|false|for|function|goto|if|in|local|nil|not|or|repeat|return|then|true|until|while)\\b/,\n    function: /(?!\\d)\\w+(?=\\s*(?:[({]))/,\n    operator: [\n      /[-+*%^&|#]|\\/\\/?|<[<=]?|>[>=]?|[=~]=?/,\n      {\n        // Match \"..\" but don't break \"...\"\n        pattern: /(^|[^.])\\.\\.(?!\\.)/,\n        lookbehind: true\n      }\n    ],\n    punctuation: /[\\[\\](){},;]|\\.+|:+/\n  }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvcmVmcmFjdG9yL2xhbmcvbHVhLmpzIiwibWFwcGluZ3MiOiJBQUFZOztBQUVaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0M7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQixFQUFFO0FBQzdCO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vbm9kZV9tb2R1bGVzL3JlZnJhY3Rvci9sYW5nL2x1YS5qcz82NzAwIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0J1xuXG5tb2R1bGUuZXhwb3J0cyA9IGx1YVxubHVhLmRpc3BsYXlOYW1lID0gJ2x1YSdcbmx1YS5hbGlhc2VzID0gW11cbmZ1bmN0aW9uIGx1YShQcmlzbSkge1xuICBQcmlzbS5sYW5ndWFnZXMubHVhID0ge1xuICAgIGNvbW1lbnQ6IC9eIyEuK3wtLSg/OlxcWyg9KilcXFtbXFxzXFxTXSo/XFxdXFwxXFxdfC4qKS9tLFxuICAgIC8vIFxceiBtYXkgYmUgdXNlZCB0byBza2lwIHRoZSBmb2xsb3dpbmcgc3BhY2VcbiAgICBzdHJpbmc6IHtcbiAgICAgIHBhdHRlcm46XG4gICAgICAgIC8oW1wiJ10pKD86KD8hXFwxKVteXFxcXFxcclxcbl18XFxcXHooPzpcXHJcXG58XFxzKXxcXFxcKD86XFxyXFxufFteel0pKSpcXDF8XFxbKD0qKVxcW1tcXHNcXFNdKj9cXF1cXDJcXF0vLFxuICAgICAgZ3JlZWR5OiB0cnVlXG4gICAgfSxcbiAgICBudW1iZXI6XG4gICAgICAvXFxiMHhbYS1mXFxkXSsoPzpcXC5bYS1mXFxkXSopPyg/OnBbKy1dP1xcZCspP1xcYnxcXGJcXGQrKD86XFwuXFxCfCg/OlxcLlxcZCopPyg/OmVbKy1dP1xcZCspP1xcYil8XFxCXFwuXFxkKyg/OmVbKy1dP1xcZCspP1xcYi9pLFxuICAgIGtleXdvcmQ6XG4gICAgICAvXFxiKD86YW5kfGJyZWFrfGRvfGVsc2V8ZWxzZWlmfGVuZHxmYWxzZXxmb3J8ZnVuY3Rpb258Z290b3xpZnxpbnxsb2NhbHxuaWx8bm90fG9yfHJlcGVhdHxyZXR1cm58dGhlbnx0cnVlfHVudGlsfHdoaWxlKVxcYi8sXG4gICAgZnVuY3Rpb246IC8oPyFcXGQpXFx3Kyg/PVxccyooPzpbKHtdKSkvLFxuICAgIG9wZXJhdG9yOiBbXG4gICAgICAvWy0rKiVeJnwjXXxcXC9cXC8/fDxbPD1dP3w+Wz49XT98Wz1+XT0/LyxcbiAgICAgIHtcbiAgICAgICAgLy8gTWF0Y2ggXCIuLlwiIGJ1dCBkb24ndCBicmVhayBcIi4uLlwiXG4gICAgICAgIHBhdHRlcm46IC8oXnxbXi5dKVxcLlxcLig/IVxcLikvLFxuICAgICAgICBsb29rYmVoaW5kOiB0cnVlXG4gICAgICB9XG4gICAgXSxcbiAgICBwdW5jdHVhdGlvbjogL1tcXFtcXF0oKXt9LDtdfFxcLit8OisvXG4gIH1cbn1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./node_modules/refractor/lang/lua.js\n"));

/***/ })

}]);