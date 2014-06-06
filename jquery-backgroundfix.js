/**
 * Created by 赤菁风铃 on 14-6-6.
 * author 清月_荷雾(441984145@qq.com)
 *        赤菁风铃(liuxuanzy@qq.com)
 * jquery background fix
 */
(function (jQuery) {
    var div = document.createElement("div"),
        style = div.style,
        backgroundPositionExpand = ["X", "Y"];
    style.cssText = "background-position:1px 1px;";
    jQuery.support.BackgroundPositionXY = style.backgroundPositionX === "1px";

    if (!jQuery.support.BackgroundPositionXY) {
        jQuery.each(backgroundPositionExpand, function (i, direct) {
            jQuery.cssHooks["backgroundPosition" + direct] = {
                get: function (elem, computed) {
                    var style = (computed ? jQuery.css(elem, "background-position") : jQuery.style(elem, "background-position") || "0 0").split(" ");
                    return style[i];
                },
                set: function (elem, value) {
                    if (typeof value === "number" && value !== 0) {
                        value = value + "px";
                    }
                    var style = (jQuery.style(elem, "background-position") || "0 0").split(" ");
                    style[i] = value;
                    jQuery.style(elem, "background-position", style.join(" "));
                    return value;
                }
            };
        });
    }

    jQuery.cssHooks["backgroundPosition"] = {
        expand: function (value) {
            var i = 0,
                expanded = {},
                parts = typeof value === "string" ? value.split(" ") : [ 0, 0 ];
            for (; i < 2; i++) {
                expanded[ "backgroundPosition" + backgroundPositionExpand[i] ] = parts[ i ];
            }
            return expanded;
        }
    };
})(jQuery);
