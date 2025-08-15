import AppProvider from "./provider";
import AppRouter  from "./router";

const App = () => (
  <AppProvider>
    <AppRouter />
  </AppProvider>
);

export default App;
