import { ContentStore } from "@openfin/workspace";
import getContentStoreProvider from "./content-store-provider";
import { useState } from "react";

function App() {
    const [ready, setReady] = useState(false);

    const register = async () => {
        await ContentStore.register(getContentStoreProvider());
        setReady(true);
    };
    return (
        <div className="App">
            <button onClick={register}>Register</button>

            <button onClick={ContentStore.show} disabled={!ready}>
                Show
            </button>

            <button onClick={ContentStore.hide} disabled={!ready}>
                Hide
            </button>
        </div>
    );
}

export default App;
