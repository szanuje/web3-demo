import { Store } from "./components/store";
import { Header } from "./components/header";
import { Toaster } from "react-hot-toast";
import { Provider, createClient } from "wagmi";

const client = createClient({
  autoConnect: true,
});

function App() {
  return (
    <div>
      <header>
        <title>Web3 Application</title>
        <meta name="Demo app" content="..." />
        <link rel="shortcut icon" href="/favicon.ico" />
      </header>

      <Provider client={client}>
        <Header />
        <div className="fixed w-full top-48">
          <div className="w-full md:max-w-3xl mx-auto flex flex-wrap items-center justify-between mt-0 py-3">
            <div className="w-full flex justify-center space-y-6 table-column">
              <Store />
            </div>
          </div>
        </div>
        <Toaster position="top-center" />
      </Provider>
    </div>
  );
}

export default App;
