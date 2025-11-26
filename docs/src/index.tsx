import {
  LocationProvider,
  Router,
  Route,
  hydrate,
  prerender as ssr,
} from "preact-iso";

import { Header } from "./components/Header.js";
import { Home } from "./pages/Home/index.js";
import { NotFound } from "./pages/_404.js";
import "./style.css";

export function App() {
  return (
    <LocationProvider>
      <div class="h-screen w-screen overflow-hidden">
        <Header />
        <Router>
          <Route path="/" component={Home} />
          <Route default component={NotFound} />
        </Router>
      </div>
    </LocationProvider>
  );
}

if (typeof window !== "undefined") {
  hydrate(<App />, document.getElementById("app"));
}

export async function prerender(data) {
  return await ssr(<App {...data} />);
}
