define(function() {

    return function (name) {
        var res = ['<', name];
        var l = arguments.length;

        var hasBody = false;
        var hasAttrs = false;

        if (l > 1) {
            if (l % 2 == 0) {
                hasAttrs = l != 2;
                hasBody = true;
            } else {
                hasAttrs = true;
            }
        }

        if (hasAttrs) {
            for (var i = 1; i <= l - (hasBody ? 2 : 1); i++) {
                if (i % 2 == 1) {
                    res.push(' ', arguments[i]);
                } else {
                    res.push('="', arguments[i], '"');
                }
            }
        }

        if (hasBody) {
            var body = arguments[l - 1];
            res.push('>', Array.isArray(body) ? body.join('') : body, '</', name, '>');
        } else {
            res.push('/>');
        }

        return res.join('');
    };

});
