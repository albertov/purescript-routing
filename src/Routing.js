// module Routing

exports.hashChanged = function(handler) {
    return function() {
        var getHash = function() {
            return document.location.href.split('#').splice(1).join('#');
        };
        var oldHash = '';
        handler('')(getHash())();
        function hashChange (ev) {
            var newHash = getHash();
            handler(oldHash)(newHash)();
            oldHash = newHash;
        }
        window.addEventListener('hashchange', hashChange);
        return function () {
          return function () {
            window.removeEventListener('hashchange', hashChange);
          }
        }
    };
};

exports.decodeURIComponent = function(str) {
    if (typeof window !== "undefined") {
        return window.decodeURIComponent(str);
    } else {
        return global.decodeURIComponent(str);
    }
};
