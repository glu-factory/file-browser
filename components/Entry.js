import React from 'react';
import css from 'csz';

import { useStateValue } from '../utils/state.js';
import { updateDir } from '../utils/dir.js';
import html from '../utils/h.js';

const Entry = ({ meta, highlighted, mode }) => {
  const [, dispatch] = useStateValue();
  const entryEl = React.useRef(null);

  const handleDocumentClick = e => {
    if (!entryEl.current.contains(e.target)) {
      dispatch({ type: 'setHighlightedEntry', payload: null });
    }
  };

  const handleClick = () =>
    requestAnimationFrame(() =>
      dispatch({ type: 'setHighlightedEntry', payload: meta.path })
    );

  const handleDoubleClick = () =>
    meta.type === 'Directory'
      ? updateDir(meta.path)
      : glu(`open "${meta.path}"`);

  React.useEffect(() => {
    highlighted && document.addEventListener('mousedown', handleDocumentClick);
    return () => document.removeEventListener('mousedown', handleDocumentClick);
  }, [highlighted]);

  const calcModifiedString = () => {
    const mDate = new Date(meta.mtime);
    const dateOptions = { day: 'numeric', month: 'short', year: 'numeric' };
    const timeOptions = { hour12: false, hour: '2-digit', minute: '2-digit' };
    return `${mDate.toLocaleDateString(
      'en',
      dateOptions
    )} at ${mDate.toLocaleTimeString('en', timeOptions)}`;
  };

  const calcSize = () => {
    if (meta.type !== 'File') return '--';
    if (meta.size <= 1) return 'Zero bytes';
    if (meta.size <= 1024) return `${meta.size} bytes`;
    const kb = (meta.size / 1024).toFixed(2);
    if (kb < 1024) return `${kb} KB`;
    const mb = (kb / 1024).toFixed(2);
    if (mb < 1024) return `${mb} MB`;
    return `${(mb / 1024).toFixed(2)} GB`;
  };

  const itemName = meta.path.split('/').pop();
  return mode === 'row'
    ? html`
        <div
          className=${`${styles.row} ${highlighted ? 'active' : ''} ${
            itemName.startsWith('.') ? styles.hidden : ''
          }`}
          onDoubleClick=${handleDoubleClick}
          onMouseDown=${handleClick}
          ref=${entryEl}
        >
          <div>
            <div className=${styles.imgWrapper}>
              <img
                src=${meta.type === 'Directory'
                  ? '/imgs/folder.png'
                  : '/imgs/file.png'}
              />
            </div>
            <span>
              ${itemName}
            </span>
          </div>
          <div>
            <span>
              ${calcModifiedString()}
            </span>
          </div>
          <div><span>${calcSize()}</span></div>
          <div><span>${meta.type}</span></div>
        </div>
      `
    : html`
        <div
          className=${`${styles.thumbnail} ${
            itemName.startsWith('.') ? styles.hidden : ''
          } ${highlighted ? 'active' : ''}`}
          onDoubleClick=${handleDoubleClick}
          onMouseDown=${handleClick}
          ref=${entryEl}
        >
          <div>
            <img
              src=${meta.type === 'Directory'
                ? '/imgs/folder.png'
                : '/imgs/file.png'}
            />
          </div>
          <div><span>${itemName}</span></div>
        </div>
      `;
};

const styles = {
  thumbnail: css`
    margin: 0.5rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    width: 7rem;
    color: #dcdcdc;

    > div:nth-child(1) {
      padding: 0.5rem;
      border-radius: 4px;
      margin: auto 0;

      > img {
        max-width: 4rem;
        max-height: 5rem;
      }
    }
    > div:nth-child(2) {
      margin-top: 0.5rem;
      height: 2.5rem;
      overflow: hidden;

      > span {
        text-align: center;
        word-break: break-all;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        padding: 3px;
      }
    }
    
    &.active {
      > div:nth-child(1) {
        background: rgba(255, 255, 255, 0.11);
      }
      > div:nth-child(2) {
        > span {
          background #004fc4;
          border-radius: 4px;
        }
      }
    }
  `,
  row: css`
    display: grid;
    grid-template-columns: 40% 30% 20% 10%;
    cursor: auto;
    user-select: none;

    &:nth-child(odd) {
      background: #373434;
    }
    &:nth-child(even) {
      backround: #2d2a2a;
    }
    color: #c1c1c1;
    font-size: 1rem;

    > div {
      display: flex;
      align-items: center;
      padding: 0 0.5rem;

      > span { 
        line-height: 1.5rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }

    &.active {
      background #004fc4;
    }
  `,
  imgWrapper: css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 1rem;
    margin-right: 0.5rem;
    > img {
      max-height: 1rem;
      max-width: 1rem;
    }
  `,
  hidden: css`
    color: #888787;
  `
};

export default Entry;
