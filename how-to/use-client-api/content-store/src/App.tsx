import { ContentStore } from "@openfin/workspace";
import contentStoreProvider from "./content-store-provider";

function App() {
    return (
        <div className="App">
            <button onClick={() => ContentStore.register(contentStoreProvider)}>
                Register
            </button>
            <button onClick={ContentStore.show}>Show</button>
            <button onClick={ContentStore.hide}>Hide</button>
        </div>
    );
}

export default App;
