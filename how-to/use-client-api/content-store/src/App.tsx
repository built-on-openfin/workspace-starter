import { ContentStore } from "@openfin/workspace";
import contentStoreProvider from "./content-store-provider";
import { useState } from "react";

function App() {
    const [ready, setReady] = useState(false);

    const register = async () => {
        await ContentStore.register(contentStoreProvider);
        setReady(true);
    };
    return (
        <div className="App">
            <button onClick={register}>Register</button>
            {ready && <button onClick={ContentStore.show}>Show</button>}
            {ready && <button onClick={ContentStore.hide}>Hide</button>}
        </div>
    );
}

export default App;
