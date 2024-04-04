import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h3 className="bg-white text-black">Hola soy el primer h3</h3>
    </>
  );
}

export default App;
