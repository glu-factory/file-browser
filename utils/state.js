import { createContext, useContext, useReducer } from 'react';

import html from './h.js';

export const StateContext = createContext();
export const StateProvider = ({ reducer, initialState, children }) => html`
  <${StateContext.Provider} value=${useReducer(reducer, initialState)}>
    ${children}
  <//>
`;

export const useStateValue = () => useContext(StateContext);
