"use strict";

//RebindNode React class.  Represents one entry in the drop-down list for rebinding keys.
var RebindNode = React.createClass({
  displayName: "RebindNode",

  //this is the function that actually changes the binding of the key.
  updateKeyBinding: function updateKeyBinding(event) {
    var code = this.props.targetKey.charCodeAt();
    var path = "/soundfiles/" + this.props.targetSong;

    this.props.bindings.forEach(function (ele, idx) {
      if (ele.key === code) {
        this.props.bindings[idx].path = path;
      }
    }, this);
  },
  //method for previewing sound before binding it.
  playSample: function playSample() {
    var soundExample = window.location.href + "soundFiles/" + this.props.targetSong;
    var $soundNode = document.getElementById('secretSound');

    $soundNode.pause();
    $soundNode.src = soundExample;
    $soundNode.currentTime = 0;
    $soundNode.play();
  },
  render: function render() {
    return React.createElement(
      "div",
      { className: "rebindNode", onClick: this.updateKeyBinding },
      React.createElement(
        "p",
        { className: "rebindSong", onClick: this.props.reRender },
        " ",
        this.props.targetSong.slice(0, -4).split("-").join(" "),
        " "
      ),
      React.createElement("img", { className: "rebindIcon", src: "assets/listen.png", onClick: this.playSample })
    );
  }
});
//

//this is actually not needed. Just remember that you might need to do this someday.
window.RebindNode = RebindNode;