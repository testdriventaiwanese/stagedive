"use strict";

//sample input:
//This example would bind the 'a' key to the "example.wav" file.
//{
//  65: '/path/to/example'
//}

//For a comprehensive list of keycode bindings, see "keycode.js"
//in this same directory.

// App React class.  Contains a number of methods which control the audio, as well as rendering pretty much the whole damn app.
var App = React.createClass({
  displayName: "App",

  //declaring some states.
  getInitialState: function getInitialState() {
    return {
      bindings: [],
      soundList: [],
      changeKey: ""
    };
  },
  //once the component mounts, we set those states equal to the correct data.  We also hide the binding window using JQuery until it is required.
  componentDidMount: function componentDidMount() {
    $('#bindingWindow').hide();
    this.serverRequest = $.get(window.location.href + "sounds", function (result) {
      this.setState({
        soundList: result,
        bindings: qwertyMap.map(function (key) {
          return key !== 0 ? { key: key, path: defaultData[key], loop: false, playing: false } : 0;
        })
      });
    }.bind(this));
    //OSX and MAC reserve functionality of either the alt or ctrl key, this checks the OS
    // and sets the rebind-key trigger to be that specific keypress
    navigator.appVersion.includes("Windows") ? this.setState({ bindTrigger: "altKey" }) : this.setState({ bindTrigger: "ctrlKey" });

    //one event listener for all keypresses.
    window.addEventListener('keypress', this.handleKeyPress);
  },

  //I'm not sure why this is important but online resources say put it in and it doesn't break anything.
  componentWillUnmount: function componentWillUnmount() {
    this.serverRequest.abort();
  },

  //this is our keyhandler function.  It handles all keypress events on the DOM.  Plays/stops the appropriate sound file,
  //as well as changing the styling on the appropriate hey.
  handleKeyPress: function handleKeyPress(event) {
    //store all our relevent DOM elements as variables so that we can reference them easily later.
    var key = event.code.toLowerCase()[3],
        keyNumber = key.charCodeAt(),
        $audio = document.getElementById(keyNumber),
        $vKey = $('#' + keyNumber).parent();

    // handles the ctrl+key menu drop.
    // originally checked boolean value [ event.ctrlKey ] to check to see if ctrl was
    // held down or not. Now this.state.bindTrigger is declared upon component mount to
    // be ctrlKey for mac OSX and altKey for windows.
    if (event[this.state.bindTrigger] && $('#keyboardWindow').is(':visible')) {
      if (keyNumber < 123 && keyNumber > 96) {
        this.setState({ changeKey: key });
        this.handleCtrlKey();
      }
    } else if (event.shiftKey) {
      //handles the shift+key loop functionality
      $vKey.addClass('red pressed');
      this.handleShiftKey($audio, event);
    } else {
      //handles a bare keypress.
      this.triggerKey($vKey, $audio);
    }
  },

  //All this does is change the styling of a key as appropriate, and plays/pauses the audio element as appropriate.
  triggerKey: function triggerKey($vKey, $audio) {
    $vKey.addClass('green pressed');
    $audio.currentTime = 0;

    if ($audio.paused) {
      $audio.play();
    } else {
      $audio.pause();
      $vKey.removeClass('green red pressed');
    }
    event.preventDefault();
  },
  //Hides and shows the rebinding menu using jQuery.
  handleCtrlKey: function handleCtrlKey() {
    $('#bindingWindow').animate({ height: 'toggle' }, 350);
    $('#keyboardWindow').animate({ width: 'toggle' }, 350);
  },

  //Sets the specified audio element to loop, then plays/pauses and styles as appropriate.
  handleShiftKey: function handleShiftKey($audio, event) {
    var key = event.code.toLowerCase()[3],
        keyNumber = key.charCodeAt(),
        $vKey = $('#' + keyNumber).parent();
    $audio.loop = !$audio.loop;
    $audio.currentTime = 0;
    if ($audio.paused) {
      $audio.play();
    } else {
      $audio.pause();
      $vKey.removeClass('green red pressed');
    }
  },

  //useful helper for re-rendering DOM when a new binding is assigned.
  reRender: function reRender() {
    $('#bindingWindow').animate({ height: 'toggle' }, 350);
    $('#keyboardWindow').animate({ width: 'toggle' }, 350);
    ReactDOM.render(React.createElement(
      "div",
      null,
      React.createElement(App, null)
    ), document.getElementById('app'));
  },

  render: function render() {
    var _this = this;

    return React.createElement(
      "div",
      { id: "appWindow" },
      React.createElement(
        "div",
        { id: "bindingWindow" },
        React.createElement(
          "h3",
          null,
          "Click on a file to change the binding of ",
          this.state.changeKey.toUpperCase(),
          " to"
        ),
        React.createElement(
          "ul",
          { id: "binding" },
          this.state.soundList.map(function (sound, idx) {
            return (//es6 again
              React.createElement(RebindNode, { key: idx, targetSong: sound, targetKey: _this.state.changeKey, bindings: _this.state.bindings, reRender: _this.reRender })
            );
          }, this)
        )
      ),
      React.createElement(
        "div",
        { id: "keyboardWindow", className: "keyboard" },
        this.state.bindings.map(function (keyBinding, idx) {
          return (//yay es6
            keyBinding === 0 ? React.createElement("br", { key: idx }) : React.createElement(VKey, { key: idx, keyId: keyBinding.key, path: keyBinding.path })
          );
        })
      )
    );
  }
});

//This simulates a loading page. In all of our tests the server loaded the sound
//files instantly but by the time we noticed this we already had an awesome
//loading page up and running. This timeout feature honors that hard work
setTimeout(function () {
  document.getElementById('secretSound').pause();
  ReactDOM.render(React.createElement(
    "div",
    null,
    React.createElement(App, null)
  ), document.getElementById('app'));
}, 4000);