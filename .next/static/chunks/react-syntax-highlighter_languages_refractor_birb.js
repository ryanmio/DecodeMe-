"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([["react-syntax-highlighter_languages_refractor_birb"],{

/***/ "./node_modules/refractor/lang/birb.js":
/*!*********************************************!*\
  !*** ./node_modules/refractor/lang/birb.js ***!
  \*********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval(__webpack_require__.ts("\n\nmodule.exports = birb\nbirb.displayName = 'birb'\nbirb.aliases = []\nfunction birb(Prism) {\n  Prism.languages.birb = Prism.languages.extend('clike', {\n    string: {\n      pattern: /r?(\"|')(?:\\\\.|(?!\\1)[^\\\\])*\\1/,\n      greedy: true\n    },\n    'class-name': [\n      /\\b[A-Z](?:[\\d_]*[a-zA-Z]\\w*)?\\b/, // matches variable and function return types (parameters as well).\n      /\\b(?:[A-Z]\\w*|(?!(?:var|void)\\b)[a-z]\\w*)(?=\\s+\\w+\\s*[;,=()])/\n    ],\n    keyword:\n      /\\b(?:assert|break|case|class|const|default|else|enum|final|follows|for|grab|if|nest|new|next|noSeeb|return|static|switch|throw|var|void|while)\\b/,\n    operator: /\\+\\+|--|&&|\\|\\||<<=?|>>=?|~(?:\\/=?)?|[+\\-*\\/%&^|=!<>]=?|\\?|:/,\n    variable: /\\b[a-z_]\\w*\\b/\n  })\n  Prism.languages.insertBefore('birb', 'function', {\n    metadata: {\n      pattern: /<\\w+>/,\n      greedy: true,\n      alias: 'symbol'\n    }\n  })\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvcmVmcmFjdG9yL2xhbmcvYmlyYi5qcyIsIm1hcHBpbmdzIjoiQUFBWTs7QUFFWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSw4REFBOEQ7QUFDOUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0giLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vbm9kZV9tb2R1bGVzL3JlZnJhY3Rvci9sYW5nL2JpcmIuanM/NDgyNyJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCdcblxubW9kdWxlLmV4cG9ydHMgPSBiaXJiXG5iaXJiLmRpc3BsYXlOYW1lID0gJ2JpcmInXG5iaXJiLmFsaWFzZXMgPSBbXVxuZnVuY3Rpb24gYmlyYihQcmlzbSkge1xuICBQcmlzbS5sYW5ndWFnZXMuYmlyYiA9IFByaXNtLmxhbmd1YWdlcy5leHRlbmQoJ2NsaWtlJywge1xuICAgIHN0cmluZzoge1xuICAgICAgcGF0dGVybjogL3I/KFwifCcpKD86XFxcXC58KD8hXFwxKVteXFxcXF0pKlxcMS8sXG4gICAgICBncmVlZHk6IHRydWVcbiAgICB9LFxuICAgICdjbGFzcy1uYW1lJzogW1xuICAgICAgL1xcYltBLVpdKD86W1xcZF9dKlthLXpBLVpdXFx3Kik/XFxiLywgLy8gbWF0Y2hlcyB2YXJpYWJsZSBhbmQgZnVuY3Rpb24gcmV0dXJuIHR5cGVzIChwYXJhbWV0ZXJzIGFzIHdlbGwpLlxuICAgICAgL1xcYig/OltBLVpdXFx3KnwoPyEoPzp2YXJ8dm9pZClcXGIpW2Etel1cXHcqKSg/PVxccytcXHcrXFxzKls7LD0oKV0pL1xuICAgIF0sXG4gICAga2V5d29yZDpcbiAgICAgIC9cXGIoPzphc3NlcnR8YnJlYWt8Y2FzZXxjbGFzc3xjb25zdHxkZWZhdWx0fGVsc2V8ZW51bXxmaW5hbHxmb2xsb3dzfGZvcnxncmFifGlmfG5lc3R8bmV3fG5leHR8bm9TZWVifHJldHVybnxzdGF0aWN8c3dpdGNofHRocm93fHZhcnx2b2lkfHdoaWxlKVxcYi8sXG4gICAgb3BlcmF0b3I6IC9cXCtcXCt8LS18JiZ8XFx8XFx8fDw8PT98Pj49P3x+KD86XFwvPT8pP3xbK1xcLSpcXC8lJl58PSE8Pl09P3xcXD98Oi8sXG4gICAgdmFyaWFibGU6IC9cXGJbYS16X11cXHcqXFxiL1xuICB9KVxuICBQcmlzbS5sYW5ndWFnZXMuaW5zZXJ0QmVmb3JlKCdiaXJiJywgJ2Z1bmN0aW9uJywge1xuICAgIG1ldGFkYXRhOiB7XG4gICAgICBwYXR0ZXJuOiAvPFxcdys+LyxcbiAgICAgIGdyZWVkeTogdHJ1ZSxcbiAgICAgIGFsaWFzOiAnc3ltYm9sJ1xuICAgIH1cbiAgfSlcbn1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./node_modules/refractor/lang/birb.js\n"));

/***/ })

}]);