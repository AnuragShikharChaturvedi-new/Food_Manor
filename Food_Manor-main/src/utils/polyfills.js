// Comprehensive polyfills for browser compatibility

// Object.assign polyfill
if (!Object.assign) {
  Object.assign = function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
}

// Array.from polyfill
if (!Array.from) {
  Array.from = function(arrayLike) {
    return Array.prototype.slice.call(arrayLike);
  };
}

// Promise polyfill
if (!window.Promise) {
  window.Promise = function(executor) {
    var self = this;
    self.state = 'pending';
    self.value = undefined;
    self.handlers = [];
    
    function resolve(result) {
      if (self.state === 'pending') {
        self.state = 'fulfilled';
        self.value = result;
        self.handlers.forEach(handle);
        self.handlers = null;
      }
    }
    
    function reject(error) {
      if (self.state === 'pending') {
        self.state = 'rejected';
        self.value = error;
        self.handlers.forEach(handle);
        self.handlers = null;
      }
    }
    
    function handle(handler) {
      if (self.state === 'pending') {
        self.handlers.push(handler);
      } else {
        if (self.state === 'fulfilled' && typeof handler.onFulfilled === 'function') {
          handler.onFulfilled(self.value);
        }
        if (self.state === 'rejected' && typeof handler.onRejected === 'function') {
          handler.onRejected(self.value);
        }
      }
    }
    
    this.then = function(onFulfilled, onRejected) {
      return new Promise(function(resolve, reject) {
        handle({
          onFulfilled: function(result) {
            try {
              resolve(onFulfilled ? onFulfilled(result) : result);
            } catch (ex) {
              reject(ex);
            }
          },
          onRejected: function(error) {
            try {
              resolve(onRejected ? onRejected(error) : Promise.reject(error));
            } catch (ex) {
              reject(ex);
            }
          }
        });
      });
    };
    
    executor(resolve, reject);
  };
  
  Promise.resolve = function(value) {
    return new Promise(function(resolve) {
      resolve(value);
    });
  };
  
  Promise.reject = function(reason) {
    return new Promise(function(resolve, reject) {
      reject(reason);
    });
  };
  
  Promise.race = function(promises) {
    return new Promise(function(resolve, reject) {
      promises.forEach(function(promise) {
        Promise.resolve(promise).then(resolve, reject);
      });
    });
  };
}

// Fetch polyfill for older browsers
if (!window.fetch) {
  window.fetch = function(url, options) {
    options = options || {};
    return new Promise(function(resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.open(options.method || 'GET', url);
      
      if (options.headers) {
        Object.keys(options.headers).forEach(function(key) {
          xhr.setRequestHeader(key, options.headers[key]);
        });
      }
      
      xhr.onload = function() {
        resolve({
          ok: xhr.status >= 200 && xhr.status < 300,
          status: xhr.status,
          statusText: xhr.statusText,
          json: function() {
            return Promise.resolve(JSON.parse(xhr.responseText));
          },
          text: function() {
            return Promise.resolve(xhr.responseText);
          }
        });
      };
      
      xhr.onerror = function() {
        reject(new Error('Network error'));
      };
      
      xhr.ontimeout = function() {
        reject(new Error('Request timeout'));
      };
      
      xhr.send(options.body);
    });
  };
}