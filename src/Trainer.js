/**
 * @author Anthony Pigeot / http://github.com/Malharhak
 */

(function (root, factory) {
    'use strict';
    if (typeof root.define === 'function' && root.define.amd) {
        root.define(function () {
            root.Trainer = factory();
            return root.Trainer;
        });
    } else if (typeof root.module === 'object' && root.module.exports) {
        root.module.exports = factory();
    } else {
        root.Trainer = factory();
    }
}(this, function () {
    'use strict';

    var Trainer = function (x, y, answer) {
        this.inputs = [];
        this.inputs[0] = x;
        this.inputs[1] = y;
        this.inputs[2] = 1;
        this.answer = answer;
    };

    return Trainer;
}));