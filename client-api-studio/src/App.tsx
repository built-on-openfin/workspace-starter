import { Storefront } from "@openfin/workspace";
import getStorefrontProvider from "./storefront-provider";
import { useState } from "react";

function App() {
    const [ready, setReady] = useState(false);

    const register = async () => {
        await Storefront.register(getStorefrontProvider());
        setReady(true);
    };
    return (
        <div className="App">
            <button onClick={register}>Register</button>

            <button onClick={Storefront.show} disabled={!ready}>
                Show
            </button>

            <button onClick={Storefront.hide} disabled={!ready}>
                Hide
            </button>
        </div>
    );
}

export default App;
