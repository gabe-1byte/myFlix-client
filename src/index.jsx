import { createRoot } from 'react-dom/client';
import { MainView } from "./components/main-view/main-view";
import Container from 'react-bootstrap/Container';

// Import statement to indicate that you need to bundle `./index.scss`
import "./index.scss";
import { store } from './redux/store';
import { Provider } from 'react-redux';
import { setUser } from './redux/reducers/user/user';

const savedUser = localStorage.getItem("user");
const savedToken = localStorage.getItem("token");
if (savedUser && savedToken) {
  store.dispatch(setUser(JSON.parse(savedUser)));
  // If you have a setToken action, dispatch it here as well
}

// Main component (will eventually use all the others)
const MyFlixApplication = () => {
  return (
    <Provider store={store}>
      <Container>
        <MainView />
      </Container>
    </Provider>
  );
};

// Finds the root of your app
const container = document.querySelector("#root");
const root = createRoot(container);

// Tells React to render your app in the root DOM element
root.render(<MyFlixApplication />);