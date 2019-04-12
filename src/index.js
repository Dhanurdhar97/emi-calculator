define(["require", "exports", "crossroads", "@syncfusion/ej2-base", "hasher"], function (require, exports, crossroads_1, ej2_base_1, hasher) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    routeDefault();
    crossroads_1.addRoute('/about', function () {
        var ajaxHTML = new ej2_base_1.Ajax('src/about/about.html', 'GET', true);
        ajaxHTML.send().then(function (value) {
            document.getElementById('content').innerHTML = value.toString();
            if (window.destroy) {
                window.destroy();
            }
        });
    });
    crossroads_1.addRoute('/default', function () {
        var ajaxHTML = new ej2_base_1.Ajax('src/default/default.html', 'GET', true);
        ajaxHTML.send().then(function (value) {
            document.getElementById('content').innerHTML = value.toString();
            window.default();
        });
    });
    hasher.initialized.add(function (h) {
        crossroads_1.parse(h);
    });
    hasher.changed.add(function (h) {
        crossroads_1.parse(h);
    });
    hasher.init();
    function routeDefault() {
        crossroads_1.addRoute('', function () {
            window.location.href = '#/default';
        });
    }
});
