/*global
    requirejs
    window
*/
requirejs.config({
    baseUrl: 'src',
    paths: {
        jquery: 'libs/jquery/dist/jquery.min'
    },

    urlArgs: 'd=' + (new Date().getTime())
});

requirejs(['Perceptron', 'Trainer', 'jquery'], function (Perceptron, Trainer, $) {
    'use strict';

    var width = 600,
        height = 600,
        count = 0,
        nbTrainers = 2000;

    var ctx = $('#playground')[0].getContext('2d');
    var training = [];
    var perceptron = new Perceptron(3, 0.00001);

    function line(x) {
        return 2 * x + 1;
    }

    function setup() {
        var i = 0;
        var x = 0;
        var y = 0;
        var answer = 1;
        for (i = 0; i < nbTrainers; i += 1) {
            x = Math.random() * width - width / 2;
            y = Math.random() * height - height / 2;

            if (y < line(x)) {
                answer = -1;
            } else {
                answer = 1;
            }
            training[i] = new Trainer(x, y, answer);
        }
    }

    function drawLines() {
        // Draws the line for clarity
        ctx.beginPath();
        ctx.moveTo(-width / 2, line(-width / 2));
        ctx.lineTo(width / 2, line(width / 2));
        ctx.lineWidth = 4;
        ctx.stroke();
        ctx.closePath();

        // Draws the current guessed line
        var weights = perceptron.weights;
        var x1 = -width / 2;
        var y1 = (-weights[2] - weights[0] * x1) / weights[1];
        var x2 = width / 2;
        var y2 = (-weights[2] - weights[0] * x2) / weights[1];

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.lineWidth = 2;
        ctx.strokeStyle = "rgba(100, 100, 100, 0.5)";
        ctx.stroke();
        ctx.closePath();
    }

    function render() {
        ctx.save();

        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, width, height);
        ctx.translate(width / 2, height / 2);

        drawLines();

        // Trains the perception with one more input
        perceptron.train(training[count].inputs, training[count].answer);

        count = (count + 1) % training.length;

        // Displays the result for all previous inputs
        var inputs, guess, i;
        for (i = 0; i < count; i += 1) {
            inputs = training[i].inputs;
            guess = perceptron.feedForward(inputs);

            ctx.beginPath();
            ctx.arc(inputs[0], inputs[1], 8, 0, 2 * Math.PI, false);

            if (guess > 0) {
                ctx.fillStyle = "#EEE";
            } else {
                ctx.fillStyle = "#111";
            }
            ctx.fill();
            ctx.lineWidth = 1;
            ctx.strokeStyle = '#111';
            ctx.stroke();
            ctx.closePath();
        }
        ctx.restore();
        window.requestAnimationFrame(render);
    }

    setup();
    window.requestAnimationFrame(render);

});