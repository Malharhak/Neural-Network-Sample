/**
 * @author Anthony Pigeot / http://github.com/Malharhak
 */

(function (root, factory) {
    'use strict';
    if (typeof root.define === 'function' && root.define.amd) {
        root.define(function () {
            root.Perceptron = factory();
            return root.Perceptron;
        });
    } else if (typeof root.module === 'object' && root.module.exports) {
        root.module.exports = factory();
    } else {
        root.FMath = factory();
    }
}(this, function () {
    'use strict';
    var Perceptron = function (weightsCount, learningConstant) {
        this.weightsCount = weightsCount;
        this.weights = [];
        var i = 0;
        for (i = 0; i < weightsCount; i += 1) {
            this.weights[i] = Math.random() * 2 - 1; // Weight is in [-1; 1]
        }
        this.learningConstant = learningConstant || 0.01;
    };

    Perceptron.prototype.feedForward = function (inputs) {
        var sum = 0;
        var i = 0;
        for (i = 0; i < this.weightsCount; i += 1) {
            sum += inputs[i] * this.weights[i];
        }

        return this.activate(sum);
    };

    Perceptron.prototype.activate = function (sum) {
        if (sum > 0) {
            return true;
        } else {
            return false;
        }
    };

    Perceptron.prototype.train = function (inputs, desired) {
        var guess = this.feedForward(inputs);
        var error = desired - guess;
        var i = 0;
        for (i = 0; i < this.weightsCount; i += 1) {
            this.weights[i] += this.learningConstant * error * inputs[i];
        }
    };

    return Perceptron;
}));
