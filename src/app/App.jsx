import 'overlayscrollbars/styles/overlayscrollbars.css';
import './App.css';

import { AppFirebaseContext } from './AppFirebaseContext';
import { AppRouter } from './AppRouter';

function App() {
  return (
    <div className="App">
      <AppFirebaseContext>
        <AppRouter />
      </AppFirebaseContext>
    </div>
  );
}

export default App;
