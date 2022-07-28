import React from "react";
import { isMobile } from "react-device-detect";

import Board from "./components/Board/Board";

function App() {
  return <Board isMobile={isMobile} />;
}

export default App;
