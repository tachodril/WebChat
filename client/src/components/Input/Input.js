import React from "react";

import "./Input.css";

const Input = () => (
  <form>
    <input
      className="input"
      type="text"
      placeholder="Type a message..."
      value={message}
      onChange={(event) => setMessaeg}
    />
  </form>
);

export default Input;
