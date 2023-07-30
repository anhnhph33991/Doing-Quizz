import { React, useState } from "react";

const Message = () => {
  const [state, setState] = useState({
    name: "LuxChill",
    address: "Hoai Duc",
    age: 19,
  });

  const handleState = () => {
    const name = document.querySelector('input[name="username"]').value;
    const address = document.querySelector('input[name="address"]').value;
    setState((state) => ({ ...state, name, address }));

    document.querySelector('input[name="username"]').value = "";
    document.querySelector('input[name="address"]').value = "";
  };

  return (
    <div>
      <h4>
        This my name: {state.name} and Address: {state.address}
      </h4>
      <label>Name: </label>
      <input type="text" name="username" />
      <label>Address: </label>
      <input type="text" name="address" />
      <button onClick={handleState}>Save</button>
    </div>
  );
};

export default Message;
