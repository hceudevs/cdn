videojs.plugin('disablePause', function () {
    console.log("Pausing is disabled for this video");
    var css = document.createElement('link');
    css.setAttribute('type', 'text/css');
    css.setAttribute('rel', 'stylesheet');
    css.setAttribute('href', 'https://rawgit.com/HomeCEU/cdn/feature/brightcove-plugin/brightcove/disable-pause/plugin.css');
    document.body.appendChild(css);
});
