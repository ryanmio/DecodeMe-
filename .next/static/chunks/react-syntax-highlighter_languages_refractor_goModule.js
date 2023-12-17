"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([["react-syntax-highlighter_languages_refractor_goModule"],{

/***/ "./node_modules/refractor/lang/go-module.js":
/*!**************************************************!*\
  !*** ./node_modules/refractor/lang/go-module.js ***!
  \**************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval(__webpack_require__.ts("\n\nmodule.exports = goModule\ngoModule.displayName = 'goModule'\ngoModule.aliases = []\nfunction goModule(Prism) {\n  // https://go.dev/ref/mod#go-mod-file-module\n  Prism.languages['go-mod'] = Prism.languages['go-module'] = {\n    comment: {\n      pattern: /\\/\\/.*/,\n      greedy: true\n    },\n    version: {\n      pattern: /(^|[\\s()[\\],])v\\d+\\.\\d+\\.\\d+(?:[+-][-+.\\w]*)?(?![^\\s()[\\],])/,\n      lookbehind: true,\n      alias: 'number'\n    },\n    'go-version': {\n      pattern: /((?:^|\\s)go\\s+)\\d+(?:\\.\\d+){1,2}/,\n      lookbehind: true,\n      alias: 'number'\n    },\n    keyword: {\n      pattern: /^([ \\t]*)(?:exclude|go|module|replace|require|retract)\\b/m,\n      lookbehind: true\n    },\n    operator: /=>/,\n    punctuation: /[()[\\],]/\n  }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvcmVmcmFjdG9yL2xhbmcvZ28tbW9kdWxlLmpzIiwibWFwcGluZ3MiOiJBQUFZOztBQUVaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLDRDQUE0QyxJQUFJO0FBQ2hEO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL25vZGVfbW9kdWxlcy9yZWZyYWN0b3IvbGFuZy9nby1tb2R1bGUuanM/MzVlNiJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCdcblxubW9kdWxlLmV4cG9ydHMgPSBnb01vZHVsZVxuZ29Nb2R1bGUuZGlzcGxheU5hbWUgPSAnZ29Nb2R1bGUnXG5nb01vZHVsZS5hbGlhc2VzID0gW11cbmZ1bmN0aW9uIGdvTW9kdWxlKFByaXNtKSB7XG4gIC8vIGh0dHBzOi8vZ28uZGV2L3JlZi9tb2QjZ28tbW9kLWZpbGUtbW9kdWxlXG4gIFByaXNtLmxhbmd1YWdlc1snZ28tbW9kJ10gPSBQcmlzbS5sYW5ndWFnZXNbJ2dvLW1vZHVsZSddID0ge1xuICAgIGNvbW1lbnQ6IHtcbiAgICAgIHBhdHRlcm46IC9cXC9cXC8uKi8sXG4gICAgICBncmVlZHk6IHRydWVcbiAgICB9LFxuICAgIHZlcnNpb246IHtcbiAgICAgIHBhdHRlcm46IC8oXnxbXFxzKClbXFxdLF0pdlxcZCtcXC5cXGQrXFwuXFxkKyg/OlsrLV1bLSsuXFx3XSopPyg/IVteXFxzKClbXFxdLF0pLyxcbiAgICAgIGxvb2tiZWhpbmQ6IHRydWUsXG4gICAgICBhbGlhczogJ251bWJlcidcbiAgICB9LFxuICAgICdnby12ZXJzaW9uJzoge1xuICAgICAgcGF0dGVybjogLygoPzpefFxccylnb1xccyspXFxkKyg/OlxcLlxcZCspezEsMn0vLFxuICAgICAgbG9va2JlaGluZDogdHJ1ZSxcbiAgICAgIGFsaWFzOiAnbnVtYmVyJ1xuICAgIH0sXG4gICAga2V5d29yZDoge1xuICAgICAgcGF0dGVybjogL14oWyBcXHRdKikoPzpleGNsdWRlfGdvfG1vZHVsZXxyZXBsYWNlfHJlcXVpcmV8cmV0cmFjdClcXGIvbSxcbiAgICAgIGxvb2tiZWhpbmQ6IHRydWVcbiAgICB9LFxuICAgIG9wZXJhdG9yOiAvPT4vLFxuICAgIHB1bmN0dWF0aW9uOiAvWygpW1xcXSxdL1xuICB9XG59XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./node_modules/refractor/lang/go-module.js\n"));

/***/ })

}]);