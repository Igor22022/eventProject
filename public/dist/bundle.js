(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
 *  add new event to database
*/

var AddEvent = function () {
  function AddEvent(type, name, date, city, price) {
    _classCallCheck(this, AddEvent);

    this.type = type;
    this.name = name;
    this.date = date;
    this.city = city;
    this.price = price;
  }

  _createClass(AddEvent, [{
    key: 'addEvent',
    value: function addEvent() {
      $.ajax('http://localhost:3000/events', {
        method: 'POST',
        data: {
          type: this.type,
          name: this.name,
          date: this.date,
          city: this.city,
          price: this.price
        }
      });
    }
  }]);

  return AddEvent;
}();

exports.default = AddEvent;

},{}],2:[function(require,module,exports){
"use strict";

var _createUser = require("./createUser");

var _createUser2 = _interopRequireDefault(_createUser);

var _getEventsData = require("./getEventsData");

var _getEventsData2 = _interopRequireDefault(_getEventsData);

var _showEventsData = require("./showEventsData");

var _showEventsData2 = _interopRequireDefault(_showEventsData);

var _maxMinPrice = require("./maxMinPrice");

var _maxMinPrice2 = _interopRequireDefault(_maxMinPrice);

var _addEvent = require("./addEvent");

var _addEvent2 = _interopRequireDefault(_addEvent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import deleteEventFromList from "./deleteEvent";
// import selectEvent from "./favoriteEvent";


//При першому відкритті створюємо юзера і зберегаємо в локалсторедж
function createUserToLocalStorage() {
  var instance = _createUser2.default.getInstance();
}

window.onload = createUserToLocalStorage();

/**
 * getting data about events from database and save it
 * @param {array} data - save all events from database
 */
function getData() {
  (0, _getEventsData2.default)({ url: "http://localhost:3000/events" }).then(function (data) {
    var allEvents = JSON.parse(data);
    (0, _showEventsData2.default)(allEvents); // show events on webpage
  }).catch(function (error) {
    console.log(error);
  });
}

getData(); // show data
/*-----------------------------------------------*/

/**
 * delete Event from list
 */

$('#list').on('click', '#deleteItem', function () {

  var eventId = $(this).attr("data-id");
  var http = 'http://localhost:3000/events/' + eventId;
  $.ajax(http, {
    method: 'DELETE'
  });
  getData(); // show new data
});

/*-------------------------------------------*/

// select an Event to favorite
$('#list').on('click', '#selectedEvent', function () {
  $(this).parent().css("background-color", "#FFE4B5");
});

/*-------------------------------------------*/

/*--- show/hide Modal Wrapper to add new event ---*/
$('body').on('click', '#addEvent', function (e) {
  e.preventDefault();
  $('.modal_wrapper').show(600);
});

$('.modal_wrapper').on('click', '.close_icon, #overlay, #addNewEvent, #newEvent', function () {
  $('.modal_wrapper').hide(600);
});

// prevent default for form
// $("#addForm").submit(function(e){
//   e.preventDefault();
// });


/*--- The most expensive event ---*/
$('body').on('click', '#maxPrice', function (e) {
  (0, _getEventsData2.default)({ url: "http://localhost:3000/events" }).then(function (data) {
    var allEvents = JSON.parse(data);

    //    Найдорожчий квиток
    var max = new _maxMinPrice2.default();
    max.showPrice(max.maxPrice(allEvents));
  }).catch(function (error) {
    console.log(error);
  });
});

/*--- The cheapest event ---*/
$('body').on('click', '#minPrice', function (e) {
  (0, _getEventsData2.default)({ url: "http://localhost:3000/events" }).then(function (data) {
    var allEvents = JSON.parse(data);

    //    Найдешевший квиток
    var min = new _maxMinPrice2.default();
    min.showPrice(min.minPrice(allEvents));
  }).catch(function (error) {
    console.log(error);
  });
});

/*----------------------------------*/

//add new event to database(events.json)
$('body').on('click', '#newEvent', function (e) {
  var type = document.getElementById('type').value;
  var name = document.getElementById('name').value;
  var date = document.getElementById('date').value;
  var city = document.getElementById('city').value;
  var price = document.getElementById('price').value;

  var newEvent = new _addEvent2.default(type, name, date, city, price);
  newEvent.addEvent();

  getData(); //show updated data
  $('.modal_wrapper').hide(600);
});

/*----------------------------------*/

//Show all events by pressing button
$('body').on('click', '#allDataEvents', function (e) {
  getData();
});

},{"./addEvent":1,"./createUser":3,"./getEventsData":4,"./maxMinPrice":5,"./showEventsData":6}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

//При першому відкритті створюємо юзера і зберегаємо в локалсторедж

var User = function () {
    var instance;

    function createInstance() {
        var object = new Object();
        return object;
    }

    return {
        getInstance: function getInstance() {
            if (!instance) {
                instance = createInstance();
                if (!localStorage.getItem('User')) {
                    localStorage.setItem('User', "visited");
                }
            }
            return instance;
        }
    };
}();

exports.default = User;

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * getting data about events from database and save it
 * @param {array} data - save all events from database
 */

var request = function request(obj) {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open(obj.method || "GET", obj.url);
    if (obj.headers) {
      Object.keys(obj.headers).forEach(function (key) {
        xhr.setRequestHeader(key, obj.headers[key]);
      });
    }
    xhr.onload = function () {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(xhr.response);
      } else {
        reject(xhr.statusText);
      }
    };
    xhr.onerror = function () {
      return reject(xhr.statusText);
    };
    xhr.send(obj.body);
  });
};

exports.default = request;

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
 * 
 * @param {object} maxPriceEvent - save the most expensive ticket
 *
*/

var PriceOfEvent = function () {
  function PriceOfEvent() {
    _classCallCheck(this, PriceOfEvent);
  }

  _createClass(PriceOfEvent, [{
    key: "maxPrice",
    value: function maxPrice(data) {
      var maxPriceEvent = {};
      var maxPrice = 0;
      data.map(function (event) {
        if (event.price > maxPrice) {
          maxPrice = event.price;
          maxPriceEvent = event;
        }
      });
      return maxPriceEvent;
    }
  }, {
    key: "minPrice",
    value: function minPrice(data) {
      var minPriceEvent = {};
      var minPrice = 100000000000;
      data.map(function (event) {
        if (event.price < minPrice) {
          minPrice = event.price;
          minPriceEvent = event;
        }
      });
      return minPriceEvent;
    }

    // show event with max price on webpage

  }, {
    key: "showPrice",
    value: function showPrice(event) {
      var html = "";

      switch (event.type) {
        case "football":
          {
            event.type = "футбол";break;
          }
        case "film":
          {
            event.type = "кіно";break;
          }
        case "performance":
          {
            event.type = "театральна вистава";break;
          }
      };
      html += "\n      <div>\n        <div class=\"show_event\">\n          <p>" + event.type + ":  " + event.name + " </p>\n          <p> \u0414\u0430\u0442\u0430: " + event.date + " </p>\n          <p>\u041C\u0456\u0441\u0442\u043E: " + event.city + " </p>\n          <p>\u0426\u0456\u043D\u0430 \u043A\u0432\u0438\u0442\u043A\u0430: " + event.price + "</p> \n          <button id=\"selectedEvent\" >\u0414\u043E\u0434\u0430\u0442\u0438 \u0432 \u043E\u0431\u0440\u0430\u043D\u0456</button>\n          <button id=\"deleteItem\" data-id=\"" + event.id + "\">\u0412\u0438\u0434\u0430\u043B\u0438\u0442\u0438 \u043F\u043E\u0434\u0456\u044E</button>\n          <hr/>\n        </div>\n      </div>";

      document.getElementById("list").innerHTML = html;
    }
  }]);

  return PriceOfEvent;
}();

exports.default = PriceOfEvent;

},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

// show events on webpage
function renderData(data) {
  var html = "";

  data.forEach(function (event) {
    switch (event.type) {
      case "football":
        {
          event.type = "футбол";break;
        }
      case "film":
        {
          event.type = "кіно";break;
        }
      case "performance":
        {
          event.type = "театральна вистава";break;
        }
    };
    html += "\n      <div>\n        <div class=\"show_event\">\n          <p>" + event.type + ":  " + event.name + " </p>\n          <p> \u0414\u0430\u0442\u0430: " + event.date + " </p>\n          <p>\u041C\u0456\u0441\u0442\u043E: " + event.city + " </p>\n          <p>\u0426\u0456\u043D\u0430 \u043A\u0432\u0438\u0442\u043A\u0430: " + event.price + "</p> \n          <button id=\"selectedEvent\" >\u0414\u043E\u0434\u0430\u0442\u0438 \u0432 \u043E\u0431\u0440\u0430\u043D\u0456</button>\n          <button id=\"deleteItem\" data-id=\"" + event.id + "\">\u0412\u0438\u0434\u0430\u043B\u0438\u0442\u0438 \u043F\u043E\u0434\u0456\u044E</button>\n          <hr/>\n        </div>\n      </div>";
  });
  document.getElementById("list").innerHTML = html;
}

exports.default = renderData;

},{}]},{},[2]);
