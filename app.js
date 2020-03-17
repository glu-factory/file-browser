import React from 'react';
import { render } from 'react-dom';
import css from 'csz';

import { useStateValue } from './utils/state.js';
import { fetchDirectoryContents } from './utils/dir.js';
import html from './utils/h.js';

import Toolbar from './components/Toolbar.js';
import Entry from './components/Entry.js';
import TitleRow from './components/TitleRow.js';

const App = () => {
  const [state, dispatch] = useStateValue();
  const {
    directoryPath,
    currentDirectory,
    mode,
    highlightedEntry,
    searchValue
  } = state;

  const updateDirectory = async () => {
    try {
      dispatch({
        type: 'setCurrentDirectory',
        payload: await fetchDirectoryContents()
      });
    } catch (err) {
      if (err.includes('EACCES')) {
        return alert('You do not have permission to open this directory');
      }
      console.error(err);
    }
  };

  React.useEffect(() => {
    window.addEventListener('popstate', updateDirectory);
    const pushState = window.history.pushState;
    window.history.pushState = function() {
      pushState.apply(history, arguments);
      updateDirectory();
    };
  }, []);

  React.useEffect(() => {
    document.title =
      directoryPath !== '/'
        ? decodeURI(directoryPath.split('/').pop())
        : directoryPath;
  }, [directoryPath]);

  return html`
    <div className=${styles.app}>
      <${Toolbar} />
      <div className=${styles.main}>
        ${mode === 'row' &&
          html`
            <${TitleRow} />
          `}
        <div
          className=${mode === 'thumbnail' ? styles.thumbnails : styles.list}
        >
          ${currentDirectory
            .filter(
              meta =>
                meta.path !== directoryPath &&
                meta.path
                  .split('/')
                  .pop()
                  .toLowerCase()
                  .match(searchValue.toLowerCase())
            )
            .map(
              meta =>
                html`
                  <${Entry}
                    key=${meta.path}
                    meta=${meta}
                    highlighted=${highlightedEntry === meta.path}
                    mode=${mode}
                  />
                `
            )}
          <div></div>
        </div>
      </div>
    </div>
  `;
};

const styles = {
  main: css`
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  `,
  app: css`
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    background: #2d2a2a;
  `,
  thumbnails: css`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 0.5rem;
    overflow: auto;
  `,
  list: css`
    flex: 1;
    overflow: auto;
  `
};

export default App;
