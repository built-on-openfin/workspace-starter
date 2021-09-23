import React from "react";
import { ContentStore } from "@openfin/workspace";

function App() {
    return (
        <div className="App">
            <button onClick={ContentStore.show}>Show</button>
            <button onClick={ContentStore.hide}>Hide</button>
        </div>
    );
}

export default App;
