# jqDim
Provide the traditional dimension methods as jQuery Slim.

It is suggested to use it with [Vanilla JS](http://vanilla-js.com/), [Bliss](https://blissfuljs.com/), or [Cash](https://github.com/fabiospampinato/cash).

Remarks: jQuery's implementation on dimension APIs is very nice!

## Options

### jQuery 3.5.1 (default)
* jqDim.reliableTrDimensionsVer = 1

### jQuery 3.6.0 ~ 3.7.1 (see https://github.com/jquery/jquery/issues/5270)
* jqDim.reliableTrDimensionsVer = 2

## Usage

```html
<script src="https://cdn.jsdelivr.net/gh/cyfung1031/jqDim@3.7.1/release/jqDim-3.7.1.min.js"></script>


<a href="javascript:void(0);" onclick="ShowElementDimensions();">Show element dimensions</a>
<div id="divTestArea1" style="height: 100px; width: 400px; padding: 20px; margin: 3px; border: 1px solid silver; background-color: #eee;"></div>

<script type="text/javascript">
function ShowElementDimensions()
{
  
    let elm = document.querySelector("#divTestArea1")
	var result = "";

    let dim = window.jqDim(elm)
	
	result += "Dimensions of div: " + dim.width() + "x" + dim.height() + "</br>";
	result += "Inner dimensions of div: " + dim.innerWidth() + "x" + dim.innerHeight() + "</br>";	
	result += "Outer dimensions of div: " + dim.outerWidth() + "x" + dim.outerHeight() + "</br>";	
	result += "Outer dimensions of div (with margin): " + dim.outerWidth(true) + "x" + dim.outerHeight(true) + "</br>";	
	
	(elm).innerHTML=result;
    
}
</script>

```

## File Size Reference

| Size               | jDim 3.6.0  | Bliss  | Cash 8.1.0  | jQuery Slim 3.6.0 |
| ------------------ | ----------- | ---------  | ----------  | ----------------- |
| Unminified         | 27.1 KB     | 21.1 KB    | 36.5 KB     | 229 KB            |
| Minified           | 5.97 KB     | 10.7 KB    | 16 KB       | 70.6 KB           |
| Minified & Gzipped | 2.59 KB     | 3 KB       | 6 KB        | 24.4 KB           |

| Size               | jDim + Bliss  | jDim + Cash  | jQuery Slim 3.6.0 |
| ------------------ | ------------- | -----------  | ----------------- |
| Unminified         | 48.2 KB       | 57.6 KB      | 229 KB            |
| Minified           | 16.7 KB       | 22 KB        | 70.6 KB           |
| Minified & Gzipped | 5.59 KB       | 8.59 KB      | 24.4 KB           |

* jqDim is minified by [Andrew Chilton](https://chilts.org/)'s [JavaScript Minifier](https://javascript-minifier.com/)

## jqDim(element)'s methods [GET]
* .offset()
* .position()
* .scrollTop()
* .scrollLeft()
* .width()
* .height()
* .innerWidth()
* .innerHeight()
* .outerWidth()
* .outerHeight()
* .outerWidth(true)
* .outerHeight(true)


## Browser Support

![Edge][edge] | ![Chrome][chrome] | ![Firefox][firefox] | ![IE][ie] | ![Opera][opera] | ![Safari][safari]
--- | --- | --- | --- | --- | --- |
 15+ ✔ | 51+✔ | 45+✔ | ✖ | 38+✔ | 10+ ✔ |

[chrome]:  https://raw.githubusercontent.com/alrra/browser-logos/main/src/chrome/chrome_48x48.png "Chrome"
[firefox]: https://raw.githubusercontent.com/alrra/browser-logos/main/src/firefox/firefox_48x48.png "Firefox"
[edge]:    https://raw.githubusercontent.com/alrra/browser-logos/main/src/edge/edge_48x48.png "Edge"
[ie]:      https://raw.githubusercontent.com/alrra/browser-logos/main/src/archive/internet-explorer_9-11/internet-explorer_9-11_48x48.png "IE"
[opera]:   https://raw.githubusercontent.com/alrra/browser-logos/main/src/opera/opera_48x48.png "Opera"
[safari]:  https://raw.githubusercontent.com/alrra/browser-logos/main/src/safari/safari_48x48.png "Safari"

## Fix for Dimension Calculation in 3.7.1

![Screen Shot 2024-03-25 at 19 24 47](https://github.com/cyfung1031/jqDim/assets/44498510/4d1b70d3-96b2-4d13-a3fe-b8c475f34519)

## License

### This project is released under MIT License
* https://raw.githubusercontent.com/cyfung1031/jqDim/main/LICENSE

### Most source codes come from jQuery Slim v3.7.1

>  
> jQuery JavaScript Library v3.7.1 -ajax,-ajax/jsonp,-ajax/load,-ajax/script,-ajax/var/location,-ajax/var/nonce,-ajax/var/rquery,-ajax/xhr,-manipulation/_evalUrl,-deprecated/ajax-event-alias,-effects,-effects/Tween,-effects/animatedSelector
>
> https://jquery.com/
> 
>
> Copyright OpenJS Foundation and other contributors
> 
> Released under the MIT license
> 
> https://jquery.org/license
>
> Date: 2021-03-02T17:08Z
> 
