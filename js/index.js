'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * React Input Component example that 
 * performs a search and subsequently
 * highlightins the corrosponding
 * text upon each keystroke
 * 
 * Author: Joshua Michael Waggoner
 * Email: <rabbitfighter@cryptolab.net>
 * 
 * Usage: Type a search query into
 * the input and see if any text
 * matches the regex pattern. 
 * 
 * Note: Regex has flags set to gloabl 
 * and to ignore case.
 */

/**
 * React self updating search area
 */

var SearchArea = function (_React$Component) {
  _inherits(SearchArea, _React$Component);

  function SearchArea() {
    _classCallCheck(this, SearchArea);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this));

    _this.state = {
      txt: '',
      results: 0
    };
    _this.update = _this.update.bind(_this);
    return _this;
  }

  SearchArea.prototype.update = function update(e) {
    var search = e.target.value;
    var regex = new RegExp(search, "gi");
    var str = $('pre').text();
    var pre = document.querySelector('pre');

    // Highlight
    highlight(str, regex, pre);

    var matches = document.querySelectorAll('#hl').length;
    // Set state accordingly
    this.setState({
      txt: e.target.value,
      results: matches === str.length + 1 ? 0 : matches // Hack
    });
  };
  // Render

  SearchArea.prototype.render = function render() {
    return React.createElement(
      'div',
      null,
      React.createElement(SearchBox, { txt: this.state.txt, update: this.update }),
      React.createElement(SearchResults, { result: this.state.results })
    );
  };

  return SearchArea;
}(React.Component);

/**
 * Search Box component
 */

var SearchBox = function SearchBox(props) {
  return React.createElement(
    'div',
    { id: 'searchbox' },
    React.createElement('input', { type: 'text',
      onChange: props.update })
  );
};

/**
 * Search Box component
 */
var SearchResults = function SearchResults(props) {
  return React.createElement(
    'div',
    { id: 'results' },
    React.createElement(
      'p',
      null,
      props.result,
      ' results found. '
    )
  );
};

/**
 * (ES6) Prints the text and
 * highlights the search query
 * if found. Uses regex.
 */
var highlight = function highlight(str, regex, target) {
  target.innerHTML = str.replace(regex, function (str) {
    return '<span id="hl">' + str + '</span>';
  });
};

/**
 * Render the component
 */
React.render(React.createElement(SearchArea, null), document.getElementById('searcharea'));