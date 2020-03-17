import { render } from 'react-dom';

import { StateProvider } from './utils/state.js';
import { fetchDirectoryContents } from './utils/dir.js';
import html from './utils/h.js';

import App from './app.js';

(async () => {
  const initialState = {
    highlightedEntry: null,
    directoryPath: '/',
    currentDirectory: await fetchDirectoryContents(),
    mode: 'row',
    searchValue: ''
  };

  function reducer(state, action) {
    switch (action.type) {
      case 'setHighlightedEntry':
        return { ...state, highlightedEntry: action.payload };
      case 'setDirectoryPath':
        return { ...state, directoryPath: action.payload };
      case 'setCurrentDirectory':
        return {
          ...state,
          currentDirectory: action.payload,
          directoryPath: window.location.pathname,
          highlightedEntry: null
        };
      case 'setMode':
        return { ...state, mode: action.payload };
      case 'setSearchValue':
        return { ...state, searchValue: action.payload };
      default:
        return { ...state };
    }
  }

  render(
    html`
      <${StateProvider} initialState=${initialState} reducer=${reducer}>
        <${App} />
      <//>
    `,
    document.getElementById('root')
  );
})();
