define(["require", "exports", "@syncfusion/ej2-base", "../node_modules/es6-promise/dist/es6-promise"], function (require, exports, ej2_base_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    describe('Showcase sample', function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;
        beforeAll(function (done) {
            var ajax = new ej2_base_1.Ajax('../base/index.html', 'GET', true);
            ajax.send().then(function (value) {
                document.body.innerHTML = document.body.innerHTML + value.toString();
                require(['../dist/common'], function () {
                    done();
                });
            });
        });
        describe('testing -', function () {
            beforeEach(function () {
                window.customError = function () {
                    return false;
                };
                spyOn(window, 'customError');
                window.addEventListener('error', window.customError);
            });
            afterEach(function () {
                window.customError.calls.reset();
            });
            it('Initial rendering console error testing', function (done) {
                expect(window.customError).not.toHaveBeenCalled();
                done();
            });
        });
    });
});
