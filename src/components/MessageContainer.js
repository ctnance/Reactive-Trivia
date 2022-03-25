import React from "react";

export default function MessageContainer(props) {
  return (
    <div style={props.styles} className="message-container">
      <h2>{props.message}</h2>
    </div>
  );
}
