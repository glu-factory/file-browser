export const fetchDirectoryContents = () =>
  new Promise((res, rej) => {
    glu(`node functions/dirInfo.js "${decodeURI(window.location.pathname)}"`)
      .then(dir => res(JSON.parse(dir)))
      .catch(err => {
        history.back();
        rej(err);
      });
  });

export const updateDir = path => {
  window.history.pushState({}, '', path);
};
