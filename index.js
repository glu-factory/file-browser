import { React, ReactDOM } from 'https://unpkg.com/es-react@16.8.30';
import css from 'https://unpkg.com/csz';

import htm from 'https://unpkg.com/htm?module';
const html = htm.bind(React.createElement);

const File = ({ path }) => html`
  <div className=${styles.content}>
    <div>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60">
        <path
          d="M42.5 22h-25c-.552 0-1 .447-1 1s.448 1 1 1h25c.552 0 1-.447 1-1s-.448-1-1-1zM17.5 16h10c.552 0 1-.447 1-1s-.448-1-1-1h-10c-.552 0-1 .447-1 1s.448 1 1 1zM42.5 30h-25c-.552 0-1 .447-1 1s.448 1 1 1h25c.552 0 1-.447 1-1s-.448-1-1-1zM42.5 38h-25c-.552 0-1 .447-1 1s.448 1 1 1h25c.552 0 1-.447 1-1s-.448-1-1-1zM42.5 46h-25c-.552 0-1 .447-1 1s.448 1 1 1h25c.552 0 1-.447 1-1s-.448-1-1-1z"
        ></path>
        <path
          d="M38.914 0H6.5v60h47V14.586L38.914 0zm.586 3.414L50.086 14H39.5V3.414zM8.5 58V2h29v14h14v42h-43z"
        ></path>
      </svg>
      ${path.split('/').pop()}
    </div>
  </div>
`;

const Directory = ({ onClick, expanded, path }) => html`
  <button className=${styles.content} onClick=${onClick}>
    <span className=${`${styles.chevron} ${expanded ? styles.active : ''}`}
      >►</span
    >
    <div>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60">
        <path
          d="M57.49 27H54v-6.268C54 19.226 52.774 18 51.268 18H48v-2.414l-.495-.495c-.001 0-.001-.001-.001-.002l-7.296-7.296L32.414 0H8v11H2.732C1.226 11 0 12.226 0 13.732v43.687h.006c-.005.563.17 1.114.522 1.575.49.64 1.232 1.006 2.037 1.006h44.759c1.156 0 2.174-.779 2.45-1.813L60 30.149v-.177C60 28.25 58.944 27 57.49 27zm-6.222-7c.403 0 .732.328.732.732V27h-4v-7h3.268zM33 3.415L44.586 15H33V3.415zM10 2h21v15h15v10H12.731c-.143 0-.284.012-.422.035-.974.162-1.786.872-2.028 1.778l-.281.772V2zM2 13.732c0-.404.329-.732.732-.732H8v22.035L2 51.399V13.732zm45.869 43.851c-.066.245-.29.417-.545.417H2.565c-.243 0-.385-.139-.448-.222-.063-.082-.16-.256-.123-.408L8 40.898v.005l4.16-11.404.026-.082c.066-.245.291-.417.545-.417H57.49c.38 0 .477.546.502.819L47.869 57.583z"
        ></path>
        <path
          d="M16 17h10c.552 0 1-.447 1-1s-.448-1-1-1H16c-.552 0-1 .447-1 1s.448 1 1 1zM16 10h10c.552 0 1-.447 1-1s-.448-1-1-1H16c-.552 0-1 .447-1 1s.448 1 1 1zM16 24h24c.552 0 1-.447 1-1s-.448-1-1-1H16c-.552 0-1 .447-1 1s.448 1 1 1z"
        ></path>
      </svg>
      <span>${path.split('/').pop()}</span>
    </div>
  </button>
`;

const TreeItem = ({ path, root }) => {
  const [expanded, setExpanded] = React.useState(root);
  const [directory, setDirectory] = React.useState([]);

  const map = items => type =>
    items
      .split('\n')
      .filter(Boolean)
      .map(item => ({ type, path: item }));

  React.useEffect(() => {
    if (!expanded) {
      return;
    }

    const files = glu(`find "${path}" -maxdepth 1 -type f`);
    const dirs = glu(`find "${path}" -maxdepth 1 -type d`);

    Promise.all([files, dirs])
      .then(([f, d]) => {
        setDirectory(
          [...map(f)('file'), ...map(d)('directory')].sort((a, b) =>
            a.path > b.path ? 1 : -1
          )
        );
      })
      .catch(stderr => {
        setExpanded(false);
        alert('Permission Denied');
      });
  }, [expanded]);

  return html`
    <${React.Fragment} key=${path}>
      ${!root &&
        html`
          <${Directory}
            onClick=${() => setExpanded(!expanded)}
            path=${path}
            expanded=${expanded}
          />
        `}
      ${
        expanded && directory.length > 0
          ? html`
              <ul>
                ${directory.map(
                  entry =>
                    entry.path !== path &&
                    html`
                      <li
                        key=${entry.path}
                        className=${entry.type === 'directory'
                          ? styles.branch
                          : styles.leaf}
                      >
                        ${entry.type === 'directory'
                          ? html`
                              <${TreeItem} path=${entry.path} root=${false} />
                            `
                          : html`
                              <${File} path=${entry.path} />
                            `}
                      </li>
                    `
                )}
              </ul>
            `
          : null
      }
    </${React.Fragment}>
  `;
};

const TreeView = () => {
  return html`
    <${TreeItem} path="/" root=${true} />
  `;
};

const styles = {
  leaf: css`
    position: relative;
    margin-left: 1.5rem;
    &:before,
    &:after {
      display: block;
      content: '';
      position: absolute;
      left: 0;
      border-color: ;
    }
    &:after {
      top: 50%;
      width: 1rem;
      border-bottom: 2px solid #4b4b4e;
    }
    &:before {
      top: 0;
      height: 100%;
      border-left: 2px solid #4b4b4e;
    }
    &:last-child {
      &:before {
        height: 50%;
      }
    }
  `,
  branch: css`
    position: relative;
    word-break: break-word;
    margin-left: 1.5rem;
    &:before {
      display: block;
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      border-right: 2px dotted #4b4b4e;
    }
  `,
  content: css`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    position: relative;
    padding: 1rem;
    font-size: 1rem;
    line-height: 1.38;
    color: rgba(255, 255, 255, 0.8);
    background: none;
    border: none;

    div {
      display: flex;
      flex-direction: row;
      align-items: center;
    }
    svg {
      flex: none;
      width: 1.2rem;
      height: 1.2rem;
      fill: rgba(255, 255, 255, 0.38);
      margin: 0 0.62rem 0 0.2rem;
    }
  `,
  chevron: css`
    position: absolute;
    top: 0;
    left: 2px;
    top: 50%;
    font-size: 0.8rem;
    padding: 0.2rem;
    z-index: 2;
    color: #9c9c9c;
    transform: translate(-50%, -50%);
  `,
  active: css`
    transform: rotate(90deg) translate(-50%, 40%);
  `
};

ReactDOM.render(
  html`
    <${TreeView} />
  `,
  document.getElementById('root')
);
