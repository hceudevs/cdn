var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var ProgressPlugin = /** @class */ (function () {
    function ProgressPlugin(player) {
        var _this = this;
        this.player = player;
        this.progress = 0;
        player.on("loadedmetadata", function () { return __awaiter(_this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.getProgress()];
                    case 1:
                        _a.progress = _b.sent();
                        console.log('Resume: ', this.progress);
                        // If video position is greater than zero, than start playback at that point.
                        if (this.progress > 0) {
                            console.log('Setting Time');
                            player.currentTime(this.progress);
                            player.play();
                        }
                        return [2 /*return*/];
                }
            });
        }); });
        // +++ Increment the cookie +++
        // Listen for when the current playback position has changed. This should be every 15-250 milliseconds.
        player.on("timeupdate", function () {
            var progress = player.currentTime();
            // When the integer value changes, then update the cookie
            if (Math.round(progress) > _this.progress) {
                _this.progress = Math.round(progress) - 2;
                _this.trackProgress();
            }
        });
        // +++ Reset the cookie +++
        // When video playback reaches the end, then reset the cookie value to zero
        player.on("ended", function () {
            _this.progress = 100;
            _this.trackProgress();
            console.log('Video Ended');
        });
    }
    ProgressPlugin.prototype.trackProgress = function () {
        console.log('Updating Progress', this.progress);
        window.top.postMessage({
            event: ProgressPlugin.SEND_PROGRESS,
            data: this.progress
        }, '*');
    };
    ProgressPlugin.prototype.getProgress = function () {
        window.top.postMessage({
            event: ProgressPlugin.GET_PROGRESS
        }, '*');
        return new Promise(function (resolve) {
            var listener = function (event) {
                if (event.data.event === ProgressPlugin.GET_PROGRESS) {
                    resolve(Number(event.data.data));
                    window.removeEventListener('message', listener);
                }
            };
            window.addEventListener('message', listener);
        });
    };
    ProgressPlugin.GET_PROGRESS = 'video.progress.get';
    ProgressPlugin.SEND_PROGRESS = 'video.progress.set';
    return ProgressPlugin;
}());
videojs.registerPlugin('tracker', function (options) {
    var pluginHandler = new ProgressPlugin(this);
});
//# sourceMappingURL=plugin.js.map