import React from "react";
import { useState, useRef } from "react";
function ref() {
  const [name, setName] = useState("");
  const inputRef = useRef();

  function focus() {
    inputRef.current.focus();
  }
  return (
    <>
      <input ref={inputRef} onChange={(e) => setName(e.target.value)} />
      <div>My name is {name} </div>
      <button onClick={focus}>Focus</button>
    </>
  );
}

export default ref;
