"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ProgressPluginClient = /** @class */ (function () {
    function ProgressPluginClient(iframe, http) {
        var _this = this;
        this.iframe = iframe;
        this.http = http;
        this.hasPinged = false;
        iframe.contentWindow.addEventListener('message', function (event) {
            if (event.data.event === ProgressPluginClient.PONG) {
                console.log('plugin', 'PONGed');
                if (!_this.hasPinged) {
                    _this.hasPinged = true;
                    _this.onReady().then();
                }
            }
            if (event.data.event === ProgressPluginClient.SEND_PROGRESS) {
                _this.http.setProgress(event.data).then();
            }
        });
        this.ping().then();
    }
    ProgressPluginClient.prototype.ping = function () {
        var _this = this;
        return new Promise(function (resolve) {
            if (!_this.hasPinged) {
                _this.iframe.contentWindow.postMessage({
                    event: ProgressPluginClient.PING
                }, '*');
                return new Promise(function (resolve) { return setTimeout(function () { return resolve(); }, 300); })
                    .then(function () { return _this.ping(); });
            }
            resolve();
        });
    };
    ProgressPluginClient.prototype.onReady = function () {
        return this.sendProgress();
    };
    ProgressPluginClient.prototype.sendProgress = function () {
        var _this = this;
        return this.http.getProgress().then(function (result) {
            _this.iframe.contentWindow.postMessage({
                event: ProgressPluginClient.GET_PROGRESS,
                data: result
            }, '*');
        });
    };
    ProgressPluginClient.PING = 'video.progress.ping';
    ProgressPluginClient.PONG = 'video.progress.pong';
    ProgressPluginClient.GET_PROGRESS = 'video.progress.get';
    ProgressPluginClient.SEND_PROGRESS = 'video.progress.set';
    return ProgressPluginClient;
}());
//# sourceMappingURL=client.js.map