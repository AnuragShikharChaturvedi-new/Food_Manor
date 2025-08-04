// Polyfills for mobile browser compatibility

// Fetch polyfill for older browsers
if (!window.fetch) {
  window.fetch = function(url, options = {}) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(options.method || 'GET', url);
      
      xhr.onload = () => {
        resolve({
          ok: xhr.status >= 200 && xhr.status < 300,
          status: xhr.status,
          json: () => Promise.resolve(JSON.parse(xhr.responseText)),
          text: () => Promise.resolve(xhr.responseText)
        });
      };
      
      xhr.onerror = () => reject(new Error('Network error'));
      xhr.send(options.body);
    });
  };
}

// Promise.race polyfill
if (!Promise.race) {
  Promise.race = function(promises) {
    return new Promise((resolve, reject) => {
      promises.forEach(promise => {
        Promise.resolve(promise).then(resolve, reject);
      });
    });
  };
}