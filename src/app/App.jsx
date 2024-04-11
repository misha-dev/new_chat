import './App.css';

import { AppFirebaseContext } from './AppFirebaseContext';
import { AppNotificationsProvider } from './AppNotificationsProvider';
import { AppRouter } from './AppRouter';

function App() {
  return (
    <div className="App">
      <AppFirebaseContext>
        <AppNotificationsProvider>
          <AppRouter />
        </AppNotificationsProvider>
      </AppFirebaseContext>
    </div>
  );
}

export default App;
