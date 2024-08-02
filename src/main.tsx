import './index.css';

import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import App from './App';
import ReactQueryProvider from './provider/queryProvider';
import { store } from './store';

async function enableMocking(): Promise<void> {
  if (import.meta.env.MODE !== 'development') {
    return;
  }

  const { worker } = await import('./mocks/broswer');

  await worker.start();
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <ReactQueryProvider showDevTools>
      <Provider store={store}>
        <App />
      </Provider>
    </ReactQueryProvider>,
  );
});
