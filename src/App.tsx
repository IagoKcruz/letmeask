import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";
import { BrowserRouter, Route} from "react-router-dom" 
import { Room } from "./pages/Room";

export function App() {
  return (
    <BrowserRouter forceRefresh>
      <Route path="/" exact component={Home} />
      <Route path="/rooms/new" exact component={NewRoom} />
      <Route path="/rooms/:id" component={Room} />
    </BrowserRouter>
  );
}
