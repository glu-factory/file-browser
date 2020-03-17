import css from 'csz';

import html from '../utils/h.js';
import { useStateValue } from '../utils/state.js';

const Toolbar = () => {
  const [state, dispatch] = useStateValue();
  const { searchValue } = state;

  const setMode = mode => dispatch({ type: 'setMode', payload: mode });

  return html`
    <div className=${styles.toolbar}>
      <div className=${styles.navigation}>
        <button onClick=${() => history.back()}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
            <path d="M0 0h24v24H0z" fill="none" />
          </svg>
        </button>
        <button onClick=${() => history.forward()}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
            <path d="M0 0h24v24H0z" fill="none" />
          </svg>
        </button>
      </div>
      <div className=${styles.layout}>
        <button onClick=${() => setMode('row')}>
          <svg
            viewBox="0 0 24 23"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="24" height="2" />
            <rect y="7" width="24" height="2" />
            <rect y="21" width="24" height="2" />
            <path d="M0 14H24V16H0V14Z" />
          </svg>
        </button>

        <button onClick=${() => setMode('thumbnail')}>
          <svg
            viewBox="0 0 22 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="6" height="6" rx="1" />
            <rect x="8" width="6" height="6" rx="1" />
            <rect x="16" y="10" width="6" height="6" rx="1" />
            <rect x="8" y="10" width="6" height="6" rx="1" />
            <rect x="16" width="6" height="6" rx="1" />
            <rect y="10" width="6" height="6" rx="1" />
          </svg>
        </button>
      </div>
      <div className=${styles.search}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path
            d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 10-.7.7l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0a4.5 4.5 0 11-.01-8.99A4.5 4.5 0 019.5 14z"
          />
        </svg>
        <input
          className=${styles.search}
          placeholder="Search"
          value=${searchValue}
          onChange=${e =>
            dispatch({ type: 'setSearchValue', payload: e.target.value })}
        />
      </div>
    </div>
  `;
};

const styles = {
  toolbar: css`
    padding: 0.5rem;
    background: linear-gradient(to bottom, #414141, #363636);
    border-bottom: 1px solid #1d1d1d;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  `,
  navigation: css`
    display: flex;
    flex-direction: row;

    button {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 1.68rem;
      width: 1.68rem;
      border-radius: 4px;
      background: #5a5a5a;
      border: none;
      margin: 0 1px;
      box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2);

      > svg {
        fill: white;
        height: 1.5rem;
      }
      &:nth-child(2) {
        > svg {
          transform: rotate(180deg);
        }
      }
      &:active {
        background: #6d6d6d;
      }
    }
  `,
  layout: css`
    display: flex;
    flex-direction: row;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2);

    button {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 1.68rem;
      width: 1.68rem;
      background: #5a5a5a;
      border: none;

      > svg {
        fill: #d8d6d6;

        height: 0.75rem;
      }
      &:first-child {
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
      }
      &:last-child {
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
      }
      &:not(:last-child) {
        border-right: 1px solid #484848;
      }
      &:active {
        background: #6d6d6d;
      }
    }
  `,
  search: css`
    width: 30%;
    position: relative;

    svg {
      fill: white;
      position: absolute;
      top: 0;
      left: 0.5rem;
      width: 1rem;
      height: 100%;
      z-index: 1;
    }
    input {
      width: 100%;
      color: #d8d6d6;
      background: #5a5a5a;
      border-radius: 4px;
      box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2);
      border: none;
      margin: 0;
      padding: 0.25rem 0.25rem 0.25rem 2rem;
    }
  `
};

export default Toolbar;
