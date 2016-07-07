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
/******/ 	__webpack_require__.p = "/static/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(4);


/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	//use browser window.localStorage
	//const store = localStorage
	var store = exports.store = localStorage;

	Storage.prototype.isEmpty = function () {
	  return !store.length;
	};

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = browserSqlAgent;

	var _operator = __webpack_require__(8);

	var _operator2 = _interopRequireDefault(_operator);

	var _store = __webpack_require__(1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function storeIsEmpty() {
	    return _store.store.isEmpty();
	}

	function query(query) {
	    return (0, _operator2.default)(query);
	}

	function clear() {
	    _store.store.clear();
	}

	function browserSqlAgent() {
	    return {
	        storeIsEmpty: storeIsEmpty,
	        query: query,
	        clear: clear
	    };
	}
	module.exports = exports['default'];

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.dejuxtapose = dejuxtapose;
	//separate array into 'every other' or 'white' and 'black' stripes
	function dejuxtapose(array) {
	    var whites = [];
	    for (var i = 1; i < array.length; i += 2) {
	        whites.push(array[i]);
	    }

	    return {
	        whites: whites,
	        blacks: array
	    };
	}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _App = __webpack_require__(5);

	var _App2 = _interopRequireDefault(_App);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _seed = __webpack_require__(11);

	var _seed2 = _interopRequireDefault(_seed);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	(0, _seed2.default)();
	__webpack_require__(12);

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _utils = __webpack_require__(3);

	var _utils2 = _interopRequireDefault(_utils);

	var _store = __webpack_require__(1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var _class = function () {
	    function _class() {
	        _classCallCheck(this, _class);
	    }

	    //implement a 'deferred' methodology where data operations are executed at the very last step
	    //therefore, 'set' your operations(setSource, setJoin, setFilter,....) beforehand


	    _createClass(_class, [{
	        key: 'setSource',
	        value: function setSource(sourceName) {
	            this.source = sourceName;
	        }
	    }, {
	        key: 'setJoin',
	        value: function setJoin(predicate) {
	            this.joinPredicates = this.joinPredicates || [];
	            this.joinPredicates.push(predicate);
	        }
	    }, {
	        key: 'setFilter',
	        value: function setFilter(conditions) {
	            this.conditions = conditions;
	        }

	        //use psuedo private methods via _ for now since there is no official es6 way of doing it

	    }, {
	        key: '_fillTable',
	        value: function _fillTable() {
	            var process = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

	            //defualt to empty array if table is not found since we do not support(yet) CREATE TABLE statements
	            this.table = JSON.parse(_store.store.getItem(this.source)) || [];

	            //process=false indicates that raw, unfiltered table is desired
	            if (process) {
	                this._processTable();
	            }
	        }
	    }, {
	        key: '_processTable',
	        value: function _processTable() {
	            this.joinPredicates && this.joinPredicates.length && this._join();
	            this.conditions && this._filter();
	        }
	    }, {
	        key: '_join',
	        value: function _join() {
	            var _this = this;

	            this.joinPredicates.forEach(function (joinPredicate) {
	                var joinTable = JSON.parse(_store.store.getItem(joinPredicate.source)) || [];

	                _this.table = _this.table.reduce(function (aggregated, current) {
	                    var predicate = joinPredicate.predicate;
	                    var leftColumn = predicate[_this.source],
	                        rightColumn = predicate[joinPredicate.source];

	                    var candidates = joinTable.filter(function (joinRow) {
	                        return current[leftColumn] == joinRow[rightColumn];
	                    }).map(function (joinRow) {
	                        return Object.assign({}, current, joinRow);
	                    });

	                    return aggregated.concat(candidates);
	                }, []);
	            });
	        }
	    }, {
	        key: '_filter',
	        value: function _filter() {
	            var mutateOriginal = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

	            var conditions = this.conditions.conditions;
	            //conditions = conditions.split(/(?<=^([^"]|"[^"]*")*)(and|or)/)
	            conditions = conditions.split(/ and | or /);

	            var logicalOperators = this.conditions.logicalOperators;

	            var filtered = this.table.filter(function (row) {
	                //lets be optimistic initially
	                var passed = true;
	                for (var i = 0; i < conditions.length; i++) {
	                    // x > y => [x, >, y]
	                    var tokenized = conditions[i].split(/<|>|=|!/);

	                    var left = tokenized[0],
	                        right = tokenized[1];
	                    var operator = conditions[i].replace(left, '').replace(right, '');
	                    var currentPassed = conditionMap[operator](row[left], right);

	                    //break early if currentPassed = false and the next logical operator is an 'and'
	                    if (!currentPassed && logicalOperators[i] != 'or') {
	                        passed = false;
	                        break;
	                    }
	                }

	                return passed;
	            });
	            //TODO: please find a solution to this sin
	            if (mutateOriginal) {
	                this.table = filtered;
	            } else {
	                return filtered;
	            }
	        }
	    }, {
	        key: 'select',
	        value: function select(cols) {
	            this._fillTable(true);
	            this.innerResult = this.table.map(function (row) {
	                var selectedRow = cols.reduce(function (selectedRow, current) {
	                    selectedRow[current] = row[current];
	                    return selectedRow;
	                }, {});

	                return selectedRow;
	            });
	        }
	    }, {
	        key: 'uniqueify',
	        value: function uniqueify() {
	            var serialized = this.innerResult.map(function (row) {
	                return JSON.stringify(row);
	            });
	            this.innerResult = serialized.filter(function (serializedRow, index) {
	                return serialized.indexOf(serializedRow) == index;
	            }).map(function (serializedRow) {
	                return JSON.parse(serializedRow);
	            });
	        }
	    }, {
	        key: 'limit',
	        value: function limit(_limit) {
	            var skip = _limit.skip;
	            var take = _limit.take;

	            var targetIndices = [];
	            for (var i = skip; i < skip + take; i++) {
	                targetIndices.push(i);
	            }

	            this.innerResult = this.innerResult.filter(function (row, index) {
	                return ~targetIndices.indexOf(index);
	            });
	        }
	    }, {
	        key: 'orderby',
	        value: function orderby(_orderby) {
	            this.innerResult = this.innerResult.sort(function (a, b) {
	                console.log(_orderby);
	                console.log(a, b);
	                if (a[_orderby] < b[_orderby]) return -1;
	                if (a[_orderby] > b[_orderby]) return 1;

	                return 0;
	            });
	        }
	    }, {
	        key: 'insert',
	        value: function insert(newRows) {
	            this._fillTable();

	            var columns = newRows.columns;
	            var values = newRows.values;var row = {};
	            for (var i = 0; i < columns.length; i++) {
	                row[columns[i]] = values[i];
	            }

	            this.table.push(row);

	            this.commit();

	            this.innerResult = row;
	        }
	    }, {
	        key: 'update',
	        value: function update(units) {
	            this._fillTable();

	            this.joinPredicates && this.joinPredicates.length && this._join();

	            var filtered = this._filter(false);

	            filtered.forEach(function (row) {
	                units.forEach(function (unit) {
	                    var key = Object.keys(unit)[0];
	                    row[key] = unit[key];
	                });
	            });

	            this.commit();

	            this.innerResult = filtered;
	        }

	        //the way this is done disgusts me and makes me want to redo the whole architecture :-(

	    }, {
	        key: 'delete',
	        value: function _delete() {
	            this._fillTable();
	            var filteredSerialized = this._filter(false).map(function (filteredRow) {
	                return JSON.stringify(filteredRow);
	            });

	            this.table = this.table.filter(function (row) {
	                return ! ~filteredSerialized.indexOf(JSON.stringify(row));
	            });

	            this.commit();

	            this.innerResult = true;
	        }
	    }, {
	        key: 'commit',
	        value: function commit() {
	            //this is unoptimized but will not be a bottle-neck for now considering the 5 - 10 MB limit in the first place
	            _store.store.setItem(this.source, JSON.stringify(this.table));
	        }
	    }, {
	        key: 'result',
	        get: function get() {
	            return this.innerResult;
	        }
	    }]);

	    return _class;
	}();

	//just use a map to avoid switch-case


	exports.default = _class;
	var conditionMap = {
	    '>': function _(left, right) {
	        return left > right;
	    },
	    '<': function _(left, right) {
	        return left < right;
	    },
	    '=': function _(left, right) {
	        return left == right;
	    },
	    '!=': function _(left, right) {
	        return left != right;
	    }
	};
	module.exports = exports['default'];

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = evaluate;

	var _implementor = __webpack_require__(6);

	var _implementor2 = _interopRequireDefault(_implementor);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	//evaluate, execute similar terms, yet completely different meanings
	//not going to waste time on naming this one
	function evaluate(asts) {
	    tableAdapter = new _implementor2.default();

	    //do operations successively since our asts are in the correct order
	    var _iteratorNormalCompletion = true;
	    var _didIteratorError = false;
	    var _iteratorError = undefined;

	    try {
	        for (var _iterator = asts[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	            var ast = _step.value;

	            evaluateMap[ast.type](ast);
	        }
	    } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	    } finally {
	        try {
	            if (!_iteratorNormalCompletion && _iterator.return) {
	                _iterator.return();
	            }
	        } finally {
	            if (_didIteratorError) {
	                throw _iteratorError;
	            }
	        }
	    }

	    return tableAdapter.result;
	}

	var tableAdapter = void 0;

	var evaluateMap = {
	    //do both source and source operations in same parent iteration
	    'source': function source(ast) {
	        tableAdapter.setSource(ast.value);
	        ast.operations.forEach(function (operation) {
	            evaluateOperationMap[operation.value](operation);
	        });
	    },
	    'action': function action(ast) {
	        evaluateActionMap[ast.value](ast);
	    },
	    'result-operation': function resultOperation(ast) {
	        evaluateOperationMap[ast.value](ast);
	    }
	};

	var evaluateOperationMap = {
	    'where': function where(ast) {
	        tableAdapter.setFilter(ast.vars);
	    },
	    'join': function join(ast) {
	        tableAdapter.setJoin(ast.vars);
	    },
	    'limit': function limit(ast) {
	        tableAdapter.limit(ast.vars);
	    },
	    'distinct': function distinct(ast) {
	        tableAdapter.uniqueify();
	    },
	    'order by': function orderBy(ast) {
	        tableAdapter.orderby(ast.vars);
	    }
	};

	var evaluateActionMap = {
	    'select': function select(ast) {
	        tableAdapter.select(ast.vars);
	    },
	    'insert into': function insertInto(ast) {
	        tableAdapter.insert(ast.vars);
	    },
	    'update': function update(ast) {
	        tableAdapter.update(ast.vars.units);
	    },
	    'delete': function _delete(ast) {
	        tableAdapter.delete();
	    }

	};
	module.exports = exports['default'];

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = processQuery;

	var _parser = __webpack_require__(10);

	var _parser2 = _interopRequireDefault(_parser);

	var _interpreter = __webpack_require__(7);

	var _interpreter2 = _interopRequireDefault(_interpreter);

	var _store = __webpack_require__(1);

	var _store2 = _interopRequireDefault(_store);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function processQuery(query) {
	    var asts = (0, _parser2.default)(query);
	    return (0, _interpreter2.default)(asts);
	}
	module.exports = exports['default'];

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = tokenize;
	function tokenize(input) {
	    var tokens = [];

	    input = cleanse(input);

	    //first, lets get the data source
	    extractTokens('source', input.match(/(DELETE FROM|FROM|INSERT INTO|UPDATE) ([\w]+)/i), tokens);

	    //check if there are any source operations (where, order by, limit, etc...)
	    var cloned = input;
	    var joinExp = /(JOIN) ([\w]+ ON [.\w]+=[.\w]+)/i;
	    while (joinExp.test(cloned)) {
	        extractTokens('source-operation', cloned.match(joinExp), tokens);
	        cloned = cloned.replace(joinExp, '');
	    }

	    extractTokens('source-operation', input.match(/(WHERE) (([.\w]+(<|>|=|!=|<=|>=)[.\w]+(?: and | or )?)*)/i), tokens);

	    //now do any actions (select, insert, delete, update)
	    extractTokens('action', input.match(actionRegexMap[tokens[0].keyword]), tokens);

	    extractTokens('result-operation', input.match(/(LIMIT) (\d+,\d+)/i), tokens);
	    extractTokens('result-operation', input.match(/SELECT ((DISTINCT)) [\w,]+/i), tokens);
	    extractTokens('result-operation', input.match(/(ORDER BY) ([\w]+)/i), tokens);

	    //return implicitly ordered tokens
	    return tokens;
	}

	//use regex by action to avoid one big /..exp..|..exp..|...../
	var actionRegexMap = {
	    'from': /(SELECT)(?: DISTINCT)? ([\w,]+)/i,
	    'delete from': /(DELETE)/i,
	    'insert into': /(INSERT INTO) [\w]+ (\([, \w]+\) VALUES\(.+\))/i,
	    'update': /(UPDATE) [\w]+(?: JOIN [\w]+ ON [.\w]+=[.\w]+)* SET ([\w]+=\S+)+/i
	};

	//cleanse by performing unobtrusive operations that will make lexing easier
	function cleanse(input) {
	    input = input.replace(/ ?(,|=|>|<|>=|<=|!=) ?/g, '$1').replace(/[ ]+/g, ' ');
	    //.replace(/['"]/g, '')

	    return input;
	}

	//make compound tokens with operator(keyword) -> operand(value) differentiating
	function extractTokens(type, matches, tokens) {
	    matches && tokens.push({ type: type, keyword: matches[1].toLowerCase(), value: matches[2] });
	}
	module.exports = exports['default'];

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = parse;

	var _lexer = __webpack_require__(9);

	var _lexer2 = _interopRequireDefault(_lexer);

	var _utils = __webpack_require__(3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function parse(query) {
	    var tokens = (0, _lexer2.default)(query);

	    //for now, no need to have an overall parent 'prog' type node
	    //make array of asts which compose overall query
	    var asts = [];
	    tokens.forEach(function (token) {
	        typeMap[token.type](token, asts);
	    });

	    return asts;
	}

	//use maps to facilitate data-driven approach and avoid swith-case statements
	var typeMap = {
	    'source': function source(token, asts) {
	        asts.push({
	            type: 'source',
	            value: token.value,
	            operations: []
	        });
	    },
	    'source-operation': function sourceOperation(token, asts) {
	        var ast = asts[asts.length - 1];
	        ast.operations.push({
	            type: token.type,
	            value: token.keyword,
	            vars: varsMap[token.keyword](token)
	        });
	    },
	    'action': function action(token, asts) {
	        asts.push({
	            type: 'action',
	            value: token.keyword,
	            vars: varsMap[token.keyword](token)
	        });
	    },
	    'result-operation': function resultOperation(token, asts) {
	        asts.push({
	            type: token.type,
	            value: token.keyword,
	            vars: varsMap[token.keyword](token)
	        });
	    }
	};

	//simplify by combining both source and action 'vars' map
	var varsMap = {
	    'where': function where(token) {
	        //separate conditions from operands
	        var sifted = (0, _utils.dejuxtapose)(token.value);

	        return {
	            conditions: sifted.blacks,
	            logicalOperators: sifted.whites
	        };
	    },
	    'order by': function orderBy(token) {
	        return token.value;
	    },
	    //do basic joins for now in which the only predicate operator is =
	    //and predicate columns must be 'namespaced'
	    'join': function join(token) {
	        var matches = token.value.match(/([\w]+) ON ([.\w]+)=([.\w]+)/i);
	        var leftPredicate = matches[2].split('.'),
	            rightPredicate = matches[3].split('.');
	        var predicate = [leftPredicate, rightPredicate].reduce(function (predicate, current) {
	            predicate[current[0]] = current[1];
	            return predicate;
	        }, {});

	        return {
	            source: matches[1],
	            predicate: predicate
	        };
	    },
	    'limit': function limit(token) {
	        var splat = token.value.split(',');

	        return {
	            skip: +splat[0],
	            take: +splat[1]
	        };
	    },
	    'select': function select(token) {
	        return token.value.split(',');
	    },
	    'insert into': function insertInto(token) {
	        var columns = token.value.match(/\(([, \w]+)\)/)[1].split(',');
	        var values = token.value.match(/VALUES\((.+)\)/i)[1].split(',');

	        columns = columns.map(function (column) {
	            return column.trim();
	        });
	        //remove quotes for VALUES("jack",...
	        values = values.map(function (value) {
	            return deQuote(value);
	        });

	        return {
	            columns: columns,
	            values: values
	        };
	    },
	    'update': function update(token) {
	        //col1=val1,col2=val2 => [{col1:val1},{col2:val2}]
	        var units = token.value.split(',').map(function (unit) {
	            var keyValuePairParts = unit.split('=');
	            return _defineProperty({}, keyValuePairParts[0], deQuote(keyValuePairParts[1]));
	        });

	        return {
	            units: units
	        };
	    },
	    'delete': function _delete(token) {
	        return null;
	    },
	    'distinct': function distinct(token) {
	        return null;
	    }

	};

	function deQuote(input) {
	    return input.replace(/['"]/g, '');
	}
	module.exports = exports['default'];

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = seed;

	var _agent = __webpack_require__(2);

	var _agent2 = _interopRequireDefault(_agent);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function seed() {

	    var agent = (0, _agent2.default)();
	    if (agent.storeIsEmpty()) {
	        var querys = ['INSERT INTO categories (category_id, category_name) VALUES(1, "Sporting Goods")', 'INSERT INTO categories (category_id, category_name) VALUES(2, "Electronics")', 'INSERT INTO categories (category_id, category_name) VALUES(3, "Food")', 'INSERT INTO brands (brand_id, brand_name) VALUES(1, "Apple")', 'INSERT INTO brands (brand_id, brand_name) VALUES(2, "Google")', 'INSERT INTO brands (brand_id, brand_name) VALUES(3, "Microsoft")', 'INSERT INTO brands (brand_id, brand_name) VALUES(4, "Spalding")', 'INSERT INTO brands (brand_id, brand_name) VALUES(5, "Wilson")', 'INSERT INTO brands (brand_id, brand_name) VALUES(6, "Nestle")', 'INSERT INTO suppliers (supplier_id, supplier_name) VALUES(1, "Best Buy")', 'INSERT INTO suppliers (supplier_id, supplier_name) VALUES(2, "Dicks Sporting Goods")', 'INSERT INTO suppliers (supplier_id, supplier_name) VALUES(3, "Walmart")', 'INSERT INTO products (product_id, category_id, brand_id, supplier_id, name, quantity, price) VALUES(1, 1, 5, 2, "Football", 39, "$49.99")', 'INSERT INTO products (product_id, category_id, brand_id, supplier_id, name, quantity, price) VALUES(2, 1, 4, 2, "BaseBall", 15, "$9.99")', 'INSERT INTO products (product_id, category_id, brand_id, supplier_id, name, quantity, price) VALUES(3, 1, 4, 3, "Basketball", 2, "$29.99")', 'INSERT INTO products (product_id, category_id, brand_id, supplier_id, name, quantity, price) VALUES(4, 2, 1, 1, "iPod Touch", 33, "$99.99")', 'INSERT INTO products (product_id, category_id, brand_id, supplier_id, name, quantity, price) VALUES(5, 2, 1, 1, "iPhone 5", 12, "$399.99")', 'INSERT INTO products (product_id, category_id, brand_id, supplier_id, name, quantity, price) VALUES(6, 2, 2, 3, "Nexus 7", 34, "$199.99")', 'INSERT INTO products (product_id, category_id, brand_id, supplier_id, name, quantity, price) VALUES(7, 2, 1, 1, "iPod Mini", 3, "$99.99")', 'INSERT INTO products (product_id, category_id, brand_id, supplier_id, name, quantity, price) VALUES(8, 2, 1, 3, "iPhone 3", 13, "$299.99")', 'INSERT INTO products (product_id, category_id, brand_id, supplier_id, name, quantity, price) VALUES(9, 1, 4, 2, "Foosball Table", 9, "$449.99")', 'INSERT INTO products (product_id, category_id, brand_id, supplier_id, name, quantity, price) VALUES(10, 1, 4, 2, "Golf Balls", 25, "$29.99")', 'INSERT INTO products (product_id, category_id, brand_id, supplier_id, name, quantity, price) VALUES(11, 1, 4, 3, "Cricket", 2, "$59.99")', 'INSERT INTO products (product_id, category_id, brand_id, supplier_id, name, quantity, price) VALUES(12, 2, 3, 1, "Zune", 24, "$99.99")', 'INSERT INTO products (product_id, category_id, brand_id, supplier_id, name, quantity, price) VALUES(13, 3, 6, 3, "Twix", 49, "$0.99")', 'INSERT INTO products (product_id, category_id, brand_id, supplier_id, name, quantity, price) VALUES(14, 3, 6, 3, "Hersheys", 49, "$0.99")', 'INSERT INTO products (product_id, category_id, brand_id, supplier_id, name, quantity, price) VALUES(15, 1, 5, 2, "Diving Board", 2, "$249.99")', 'INSERT INTO products (product_id, category_id, brand_id, supplier_id, name, quantity, price) VALUES(16, 1, 5, 2, "Bike", 5, "$199.99")', 'INSERT INTO products (product_id, category_id, brand_id, supplier_id, name, quantity, price) VALUES(17, 3, 6, 3, "Oreo", 200, "$1.99")', 'INSERT INTO products (product_id, category_id, brand_id, supplier_id, name, quantity, price) VALUES(18, 2, 1, 1, "iMac", 4, "$999.99")', 'INSERT INTO products (product_id, category_id, brand_id, supplier_id, name, quantity, price) VALUES(19, 1, 4, 2, "Tennis Balls", 5, "$9.99")', 'INSERT INTO products (product_id, category_id, brand_id, supplier_id, name, quantity, price) VALUES(20, 2, 3, 1, "Gateway", 4, "$899.99")', 'INSERT INTO products (product_id, category_id, brand_id, supplier_id, name, quantity, price) VALUES(21, 3, 6, 3, "M&Ms", 100, "$1.59")', 'INSERT INTO products (product_id, category_id, brand_id, supplier_id, name, quantity, price) VALUES(22, 2, 1, 1, "iPad", 15, "$799.99")', 'INSERT INTO products (product_id, category_id, brand_id, supplier_id, name, quantity, price) VALUES(23, 1, 4, 2, "Ping Pong Balls", 55, "$9.99")', 'SELECT DISTINCT category_id, category_name FROM categories JOIN products ON products.category_id = categories.category_id ORDER BY category_name'
	        //'SELECT DISTINCT supplier_id, supplier_name FROM suppliers JOIN products ON suppliers.supplier_id = products.supplier_id WHERE category_id = 3'
	        ];
	        querys.forEach(function (query) {
	            return agent.query(query);
	        });
	    }
	}
	module.exports = exports['default'];

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {module.exports = global["browserSqlAgent"] = __webpack_require__(2);
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }
/******/ ]);