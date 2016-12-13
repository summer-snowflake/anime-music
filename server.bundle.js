/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _express = __webpack_require__(1);

	var _express2 = _interopRequireDefault(_express);

	var _path = __webpack_require__(2);

	var _path2 = _interopRequireDefault(_path);

	var _compression = __webpack_require__(3);

	var _compression2 = _interopRequireDefault(_compression);

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _server = __webpack_require__(5);

	var _reactRouter = __webpack_require__(6);

	var _routes = __webpack_require__(7);

	var _routes2 = _interopRequireDefault(_routes);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	//import routes from './modules/routes'

	var app = (0, _express2.default)();

	app.use((0, _compression2.default)());

	// serve our static stuff like index.css
	app.use(_express2.default.static(_path2.default.join(__dirname, 'serve'), { index: false }));

	// send all requests to index.html so browserHistory works
	app.get('*', function (req, res) {
	  (0, _reactRouter.match)({ routes: _routes2.default, location: req.url }, function (err, redirect, props) {
	    console.log(req.url);
	    if (err) {
	      res.status(500).send(err.message);
	    } else if (redirect) {
	      res.redirect(redirect.pathname + redirect.search);
	    } else if (props) {
	      // hey we made it!
	      var appHtml = (0, _server.renderToString)(_react2.default.createElement(_reactRouter.RouterContext, props));
	      console.log('renderToString...');
	      res.send(renderPage(appHtml));
	    } else {
	      res.status(404).send('Not Found');
	    }
	  });
	});

	function renderPage(appHtml) {
	  return '\n    <!doctype html public="storage">\n    <html>\n    <meta charset=utf-8/>\n    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>\n    <title>My First React Router App</title>\n    <link rel=stylesheet href=/index.css>\n    <div id=content></div>\n    <script src="/bundle.js"></script>\n   ';
	}

	var PORT = process.env.PORT || 8080;
	app.listen(PORT, function () {
	  console.log('Production Express server running at localhost:' + PORT);
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("compression");

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("react");

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("react-dom/server");

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("react-router");

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(8);

	var _reactRouter = __webpack_require__(6);

	var _app = __webpack_require__(9);

	var _app2 = _interopRequireDefault(_app);

	var _welcome = __webpack_require__(11);

	var _welcome2 = _interopRequireDefault(_welcome);

	var _admin = __webpack_require__(15);

	var _admin2 = _interopRequireDefault(_admin);

	var _admin_top_page = __webpack_require__(17);

	var _admin_top_page2 = _interopRequireDefault(_admin_top_page);

	var _admin_animes_page = __webpack_require__(18);

	var _admin_animes_page2 = _interopRequireDefault(_admin_animes_page);

	var _admin_animes = __webpack_require__(19);

	var _admin_animes2 = _interopRequireDefault(_admin_animes);

	var _admin_anime = __webpack_require__(22);

	var _admin_anime2 = _interopRequireDefault(_admin_anime);

	var _admin_actors_page = __webpack_require__(24);

	var _admin_actors_page2 = _interopRequireDefault(_admin_actors_page);

	var _admin_actors = __webpack_require__(25);

	var _admin_actors2 = _interopRequireDefault(_admin_actors);

	var _admin_actor = __webpack_require__(28);

	var _admin_actor2 = _interopRequireDefault(_admin_actor);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	module.exports = _react2.default.createElement(
	  _reactRouter.Route,
	  { component: _app2.default, path: '/' },
	  _react2.default.createElement(_reactRouter.IndexRoute, { component: _welcome2.default }),
	  _react2.default.createElement(
	    _reactRouter.Route,
	    { component: _admin2.default, path: '/admin' },
	    _react2.default.createElement(_reactRouter.IndexRoute, { component: _admin_top_page2.default }),
	    _react2.default.createElement(
	      _reactRouter.Route,
	      { component: _admin_animes_page2.default, path: '/admin/animes' },
	      _react2.default.createElement(_reactRouter.IndexRoute, { component: _admin_animes2.default }),
	      _react2.default.createElement(_reactRouter.Route, { component: _admin_anime2.default, path: '/admin/animes/:animeId' })
	    ),
	    _react2.default.createElement(
	      _reactRouter.Route,
	      { component: _admin_actors_page2.default, path: '/admin/actors' },
	      _react2.default.createElement(_reactRouter.IndexRoute, { component: _admin_actors2.default }),
	      _react2.default.createElement(_reactRouter.Route, { component: _admin_actor2.default, path: '/admin/actors/:actorId' })
	    )
	  )
	);

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = require("react-dom");

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _navbar = __webpack_require__(10);

	var _navbar2 = _interopRequireDefault(_navbar);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var App = function (_Component) {
	  _inherits(App, _Component);

	  function App() {
	    _classCallCheck(this, App);

	    return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).apply(this, arguments));
	  }

	  _createClass(App, [{
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement(_navbar2.default, null),
	        this.props.children
	      );
	    }
	  }]);

	  return App;
	}(_react.Component);

	exports.default = App;


	App.propTypes = {
	  children: _react.PropTypes.any.isRequired
	};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(6);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Navbar = function (_Component) {
	  _inherits(Navbar, _Component);

	  function Navbar() {
	    _classCallCheck(this, Navbar);

	    return _possibleConstructorReturn(this, (Navbar.__proto__ || Object.getPrototypeOf(Navbar)).apply(this, arguments));
	  }

	  _createClass(Navbar, [{
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement(
	          'ul',
	          null,
	          _react2.default.createElement(
	            'li',
	            null,
	            _react2.default.createElement(
	              _reactRouter.Link,
	              { activeClassName: 'active', onlyActiveOnIndex: true, to: '/' },
	              'TOP'
	            )
	          )
	        )
	      );
	    }
	  }]);

	  return Navbar;
	}(_react.Component);

	exports.default = Navbar;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _anime_list = __webpack_require__(12);

	var _anime_list2 = _interopRequireDefault(_anime_list);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Welcome = function (_Component) {
	  _inherits(Welcome, _Component);

	  function Welcome() {
	    _classCallCheck(this, Welcome);

	    return _possibleConstructorReturn(this, (Welcome.__proto__ || Object.getPrototypeOf(Welcome)).apply(this, arguments));
	  }

	  _createClass(Welcome, [{
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement(_anime_list2.default, { url: '/api/animes' })
	      );
	    }
	  }]);

	  return Welcome;
	}(_react.Component);

	exports.default = Welcome;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _anime = __webpack_require__(13);

	var _anime2 = _interopRequireDefault(_anime);

	var _domain = __webpack_require__(14);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var AnimeList = function (_Component) {
	  _inherits(AnimeList, _Component);

	  function AnimeList(props) {
	    _classCallCheck(this, AnimeList);

	    var _this = _possibleConstructorReturn(this, (AnimeList.__proto__ || Object.getPrototypeOf(AnimeList)).call(this, props));

	    _this.state = {
	      animes: []
	    };
	    return _this;
	  }

	  _createClass(AnimeList, [{
	    key: 'componentWillMount',
	    value: function componentWillMount() {
	      this.loadAnimesFromServer();
	    }
	  }, {
	    key: 'loadAnimesFromServer',
	    value: function loadAnimesFromServer() {
	      var _this2 = this;

	      $.ajax({
	        url: _domain.domain + this.props.url,
	        dataType: 'json',
	        success: function success(res) {
	          _this2.setState({ animes: res.animes });
	        },
	        error: function error(xhr, status, err) {
	          console.error(_this2.props.url, status, err.toString());
	        }
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        { className: 'anime-list' },
	        this.state.animes.map(function (anime) {
	          return _react2.default.createElement(_anime2.default, { anime: anime, key: anime.id });
	        })
	      );
	    }
	  }]);

	  return AnimeList;
	}(_react.Component);

	exports.default = AnimeList;


	AnimeList.propTypes = {
	  url: _react.PropTypes.string.isRequired
	};

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Anime = function (_Component) {
	  _inherits(Anime, _Component);

	  function Anime() {
	    _classCallCheck(this, Anime);

	    return _possibleConstructorReturn(this, (Anime.__proto__ || Object.getPrototypeOf(Anime)).apply(this, arguments));
	  }

	  _createClass(Anime, [{
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        { className: 'panel panel-default anime-title' },
	        _react2.default.createElement(
	          'div',
	          { className: 'panel-body' },
	          this.props.anime.title
	        )
	      );
	    }
	  }]);

	  return Anime;
	}(_react.Component);

	exports.default = Anime;


	Anime.propTypes = {
	  anime: _react.PropTypes.object.isRequired
	};

/***/ },
/* 14 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var domain = exports.domain = 'http://localhost:3000';

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _admin_menu = __webpack_require__(16);

	var _admin_menu2 = _interopRequireDefault(_admin_menu);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Admin = function (_Component) {
	  _inherits(Admin, _Component);

	  function Admin() {
	    _classCallCheck(this, Admin);

	    return _possibleConstructorReturn(this, (Admin.__proto__ || Object.getPrototypeOf(Admin)).apply(this, arguments));
	  }

	  _createClass(Admin, [{
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement(_admin_menu2.default, null),
	        this.props.children
	      );
	    }
	  }]);

	  return Admin;
	}(_react.Component);

	exports.default = Admin;


	Admin.propTypes = {
	  children: _react.PropTypes.any.isRequired
	};

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(6);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var AdminMenu = function (_Component) {
	  _inherits(AdminMenu, _Component);

	  function AdminMenu() {
	    _classCallCheck(this, AdminMenu);

	    return _possibleConstructorReturn(this, (AdminMenu.__proto__ || Object.getPrototypeOf(AdminMenu)).apply(this, arguments));
	  }

	  _createClass(AdminMenu, [{
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement(
	          'ul',
	          { role: 'nav' },
	          _react2.default.createElement(
	            'li',
	            null,
	            _react2.default.createElement(
	              _reactRouter.Link,
	              { activeClassName: 'active', onlyActiveOnIndex: true, to: '/admin' },
	              '管理TOP'
	            )
	          ),
	          _react2.default.createElement(
	            'li',
	            null,
	            _react2.default.createElement(
	              _reactRouter.Link,
	              { activeClassName: 'active', to: '/admin/animes' },
	              'アニメ'
	            )
	          ),
	          _react2.default.createElement(
	            'li',
	            null,
	            _react2.default.createElement(
	              _reactRouter.Link,
	              { activeClassName: 'active', to: '/admin/actors' },
	              '声優'
	            )
	          )
	        )
	      );
	    }
	  }]);

	  return AdminMenu;
	}(_react.Component);

	exports.default = AdminMenu;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var AdminTopPage = function (_Component) {
	  _inherits(AdminTopPage, _Component);

	  function AdminTopPage() {
	    _classCallCheck(this, AdminTopPage);

	    return _possibleConstructorReturn(this, (AdminTopPage.__proto__ || Object.getPrototypeOf(AdminTopPage)).apply(this, arguments));
	  }

	  _createClass(AdminTopPage, [{
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement('div', null);
	    }
	  }]);

	  return AdminTopPage;
	}(_react.Component);

	exports.default = AdminTopPage;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var AdminAnimesPage = function (_Component) {
	  _inherits(AdminAnimesPage, _Component);

	  function AdminAnimesPage() {
	    _classCallCheck(this, AdminAnimesPage);

	    return _possibleConstructorReturn(this, (AdminAnimesPage.__proto__ || Object.getPrototypeOf(AdminAnimesPage)).apply(this, arguments));
	  }

	  _createClass(AdminAnimesPage, [{
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        null,
	        this.props.children
	      );
	    }
	  }]);

	  return AdminAnimesPage;
	}(_react.Component);

	exports.default = AdminAnimesPage;


	AdminAnimesPage.propTypes = {
	  children: _react.PropTypes.any.isRequired
	};

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _admin_animes_table = __webpack_require__(20);

	var _admin_animes_table2 = _interopRequireDefault(_admin_animes_table);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var AdminAnimes = function (_Component) {
	  _inherits(AdminAnimes, _Component);

	  function AdminAnimes() {
	    _classCallCheck(this, AdminAnimes);

	    return _possibleConstructorReturn(this, (AdminAnimes.__proto__ || Object.getPrototypeOf(AdminAnimes)).apply(this, arguments));
	  }

	  _createClass(AdminAnimes, [{
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement(_admin_animes_table2.default, { url: '/api/admin/animes' })
	      );
	    }
	  }]);

	  return AdminAnimes;
	}(_react.Component);

	exports.default = AdminAnimes;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _admin_anime_row = __webpack_require__(21);

	var _admin_anime_row2 = _interopRequireDefault(_admin_anime_row);

	var _domain = __webpack_require__(14);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var AdminAnimesTable = function (_Component) {
	  _inherits(AdminAnimesTable, _Component);

	  function AdminAnimesTable(props) {
	    _classCallCheck(this, AdminAnimesTable);

	    var _this = _possibleConstructorReturn(this, (AdminAnimesTable.__proto__ || Object.getPrototypeOf(AdminAnimesTable)).call(this, props));

	    _this.state = {
	      animes: []
	    };
	    return _this;
	  }

	  _createClass(AdminAnimesTable, [{
	    key: 'componentWillMount',
	    value: function componentWillMount() {
	      this.loadAnimesFromServer();
	    }
	  }, {
	    key: 'loadAnimesFromServer',
	    value: function loadAnimesFromServer() {
	      var _this2 = this;

	      $.ajax({
	        url: _domain.domain + this.props.url,
	        dataType: 'json',
	        success: function success(res) {
	          _this2.setState({ animes: res.animes });
	        },
	        error: function error(xhr, status, err) {
	          console.error(_this2.props.url, status, err.toString());
	        }
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement(
	          'table',
	          { className: 'table' },
	          _react2.default.createElement(
	            'tbody',
	            null,
	            this.state.animes.map(function (anime) {
	              return _react2.default.createElement(_admin_anime_row2.default, { anime: anime, key: anime.id });
	            })
	          )
	        )
	      );
	    }
	  }]);

	  return AdminAnimesTable;
	}(_react.Component);

	exports.default = AdminAnimesTable;


	AdminAnimesTable.propTypes = {
	  url: _react.PropTypes.string.isRequired
	};

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(6);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var AdminAnimeRow = function (_Component) {
	  _inherits(AdminAnimeRow, _Component);

	  function AdminAnimeRow() {
	    _classCallCheck(this, AdminAnimeRow);

	    return _possibleConstructorReturn(this, (AdminAnimeRow.__proto__ || Object.getPrototypeOf(AdminAnimeRow)).apply(this, arguments));
	  }

	  _createClass(AdminAnimeRow, [{
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'tr',
	        { id: 'anime-' + this.props.anime.id },
	        _react2.default.createElement(
	          'td',
	          null,
	          _react2.default.createElement(
	            _reactRouter.Link,
	            { to: '/admin/animes/' + this.props.anime.id },
	            this.props.anime.title
	          )
	        ),
	        _react2.default.createElement(
	          'td',
	          null,
	          this.props.anime.summary
	        ),
	        _react2.default.createElement(
	          'td',
	          null,
	          this.props.anime.wiki_url
	        ),
	        _react2.default.createElement(
	          'td',
	          null,
	          this.props.anime.picture
	        )
	      );
	    }
	  }]);

	  return AdminAnimeRow;
	}(_react.Component);

	exports.default = AdminAnimeRow;


	AdminAnimeRow.propTypes = {
	  anime: _react.PropTypes.object.isRequired
	};

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _admin_anime_detail = __webpack_require__(23);

	var _admin_anime_detail2 = _interopRequireDefault(_admin_anime_detail);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var AdminAnime = function (_Component) {
	  _inherits(AdminAnime, _Component);

	  function AdminAnime() {
	    _classCallCheck(this, AdminAnime);

	    return _possibleConstructorReturn(this, (AdminAnime.__proto__ || Object.getPrototypeOf(AdminAnime)).apply(this, arguments));
	  }

	  _createClass(AdminAnime, [{
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement(_admin_anime_detail2.default, { url: '/api/admin/animes/' + this.props.params.animeId })
	      );
	    }
	  }]);

	  return AdminAnime;
	}(_react.Component);

	exports.default = AdminAnime;


	AdminAnime.propTypes = {
	  params: _react.PropTypes.object.isRequired
	};

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _domain = __webpack_require__(14);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var AdminAnimeDetail = function (_Component) {
	  _inherits(AdminAnimeDetail, _Component);

	  function AdminAnimeDetail(props) {
	    _classCallCheck(this, AdminAnimeDetail);

	    var _this = _possibleConstructorReturn(this, (AdminAnimeDetail.__proto__ || Object.getPrototypeOf(AdminAnimeDetail)).call(this, props));

	    _this.state = {
	      anime: {}
	    };
	    return _this;
	  }

	  _createClass(AdminAnimeDetail, [{
	    key: 'componentWillMount',
	    value: function componentWillMount() {
	      this.loadAnimesFromServer();
	    }
	  }, {
	    key: 'loadAnimesFromServer',
	    value: function loadAnimesFromServer() {
	      var _this2 = this;

	      $.ajax({
	        url: _domain.domain + this.props.url,
	        dataType: 'json',
	        success: function success(res) {
	          _this2.setState({ anime: res });
	        },
	        error: function error(xhr, status, err) {
	          console.error(_this2.props.url, status, err.toString());
	        }
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        { className: 'panel panel-default' },
	        _react2.default.createElement(
	          'div',
	          { className: 'panel-heading' },
	          this.state.anime.title
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'panel-body' },
	          this.state.anime.summary
	        )
	      );
	    }
	  }]);

	  return AdminAnimeDetail;
	}(_react.Component);

	exports.default = AdminAnimeDetail;


	AdminAnimeDetail.propTypes = {
	  url: _react.PropTypes.string.isRequired
	};

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var AdminActorsPage = function (_Component) {
	  _inherits(AdminActorsPage, _Component);

	  function AdminActorsPage() {
	    _classCallCheck(this, AdminActorsPage);

	    return _possibleConstructorReturn(this, (AdminActorsPage.__proto__ || Object.getPrototypeOf(AdminActorsPage)).apply(this, arguments));
	  }

	  _createClass(AdminActorsPage, [{
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        null,
	        this.props.children
	      );
	    }
	  }]);

	  return AdminActorsPage;
	}(_react.Component);

	exports.default = AdminActorsPage;


	AdminActorsPage.propTypes = {
	  children: _react.PropTypes.any.isRequired
	};

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _admin_actors_table = __webpack_require__(26);

	var _admin_actors_table2 = _interopRequireDefault(_admin_actors_table);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var AdminActors = function (_Component) {
	  _inherits(AdminActors, _Component);

	  function AdminActors() {
	    _classCallCheck(this, AdminActors);

	    return _possibleConstructorReturn(this, (AdminActors.__proto__ || Object.getPrototypeOf(AdminActors)).apply(this, arguments));
	  }

	  _createClass(AdminActors, [{
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement(_admin_actors_table2.default, { url: '/api/admin/actors' })
	      );
	    }
	  }]);

	  return AdminActors;
	}(_react.Component);

	exports.default = AdminActors;

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _admin_actor_row = __webpack_require__(27);

	var _admin_actor_row2 = _interopRequireDefault(_admin_actor_row);

	var _domain = __webpack_require__(14);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var AdminActorsTable = function (_Component) {
	  _inherits(AdminActorsTable, _Component);

	  function AdminActorsTable(props) {
	    _classCallCheck(this, AdminActorsTable);

	    var _this = _possibleConstructorReturn(this, (AdminActorsTable.__proto__ || Object.getPrototypeOf(AdminActorsTable)).call(this, props));

	    _this.state = {
	      actors: []
	    };
	    return _this;
	  }

	  _createClass(AdminActorsTable, [{
	    key: 'componentWillMount',
	    value: function componentWillMount() {
	      this.loadActorsFromServer();
	    }
	  }, {
	    key: 'loadActorsFromServer',
	    value: function loadActorsFromServer() {
	      var _this2 = this;

	      $.ajax({
	        url: _domain.domain + this.props.url,
	        dataType: 'json',
	        success: function success(res) {
	          _this2.setState({ actors: res.actors });
	        },
	        error: function error(xhr, status, err) {
	          console.error(_this2.props.url, status, err.toString());
	        }
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'table',
	        { className: 'table' },
	        _react2.default.createElement(
	          'tbody',
	          null,
	          this.state.actors.map(function (actor) {
	            return _react2.default.createElement(_admin_actor_row2.default, { actor: actor, key: actor.id });
	          })
	        )
	      );
	    }
	  }]);

	  return AdminActorsTable;
	}(_react.Component);

	exports.default = AdminActorsTable;


	AdminActorsTable.propTypes = {
	  url: _react.PropTypes.string.isRequired
	};

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(6);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var AdminActorRow = function (_Component) {
	  _inherits(AdminActorRow, _Component);

	  function AdminActorRow() {
	    _classCallCheck(this, AdminActorRow);

	    return _possibleConstructorReturn(this, (AdminActorRow.__proto__ || Object.getPrototypeOf(AdminActorRow)).apply(this, arguments));
	  }

	  _createClass(AdminActorRow, [{
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'tr',
	        { id: 'actor-' + this.props.actor.id },
	        _react2.default.createElement(
	          'td',
	          null,
	          _react2.default.createElement(
	            _reactRouter.Link,
	            { to: '/admin/actors/' + this.props.actor.id },
	            this.props.actor.name
	          )
	        )
	      );
	    }
	  }]);

	  return AdminActorRow;
	}(_react.Component);

	exports.default = AdminActorRow;


	AdminActorRow.propTypes = {
	  actor: _react.PropTypes.object.isRequired
	};

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _admin_actor_detail = __webpack_require__(29);

	var _admin_actor_detail2 = _interopRequireDefault(_admin_actor_detail);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var AdminActor = function (_Component) {
	  _inherits(AdminActor, _Component);

	  function AdminActor() {
	    _classCallCheck(this, AdminActor);

	    return _possibleConstructorReturn(this, (AdminActor.__proto__ || Object.getPrototypeOf(AdminActor)).apply(this, arguments));
	  }

	  _createClass(AdminActor, [{
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement(_admin_actor_detail2.default, { url: '/api/admin/actors/' + this.props.params.actorId })
	      );
	    }
	  }]);

	  return AdminActor;
	}(_react.Component);

	exports.default = AdminActor;


	AdminActor.propTypes = {
	  params: _react.PropTypes.object.isRequired
	};

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _domain = __webpack_require__(14);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var AdminActorDetail = function (_Component) {
	  _inherits(AdminActorDetail, _Component);

	  function AdminActorDetail(props) {
	    _classCallCheck(this, AdminActorDetail);

	    var _this = _possibleConstructorReturn(this, (AdminActorDetail.__proto__ || Object.getPrototypeOf(AdminActorDetail)).call(this, props));

	    _this.state = {
	      actor: {}
	    };
	    return _this;
	  }

	  _createClass(AdminActorDetail, [{
	    key: 'componentWillMount',
	    value: function componentWillMount() {
	      this.loadActorsFromServer();
	    }
	  }, {
	    key: 'loadActorsFromServer',
	    value: function loadActorsFromServer() {
	      var _this2 = this;

	      $.ajax({
	        url: _domain.domain + this.props.url,
	        dataType: 'json',
	        success: function success(res) {
	          _this2.setState({ actor: res });
	        },
	        error: function error(xhr, status, err) {
	          console.error(_this2.props.url, status, err.toString());
	        }
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        { className: 'panel panel-default' },
	        _react2.default.createElement(
	          'div',
	          { className: 'panel-heading' },
	          this.state.actor.name
	        ),
	        _react2.default.createElement('div', { className: 'panel-body' })
	      );
	    }
	  }]);

	  return AdminActorDetail;
	}(_react.Component);

	exports.default = AdminActorDetail;


	AdminActorDetail.propTypes = {
	  url: _react.PropTypes.string.isRequired
	};

/***/ }
/******/ ]);