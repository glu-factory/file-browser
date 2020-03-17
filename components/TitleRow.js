import css from 'csz';

import html from '../utils/h.js';

const TitleRow = () => html`
  <div className=${styles.row}>
    <div className=${styles.titleCell}>Name</div>
    <div className=${styles.titleCell}>Date Modified</div>
    <div className=${styles.titleCell}>Size</div>
    <div className=${styles.titleCell}>Kind</div>
  </div>
`;

const styles = {
  row: css`
    display: grid;
    grid-template-columns: 40% 30% 20% 10%;
    cursor: auto;
    user-select: none;
  `,
  titleCell: css`
    position: relative;
    padding: 0.5rem;
    color: #d8d8d8;
    background: #3e3a3a;
    border-bottom: 1px solid #5d5959;
    font-size: 0.8rem;

    &:not(:last-of-type) {
      &:after {
        display: block;
        content: '';
        position: absolute;
        height: calc(100% - 10px);
        top: 5px;
        right: 0;
        border-right: 1px solid #5d5959;
      }
    }
  `
};

export default TitleRow;
