/*! jqDim v3.6.0 | Copyright (c) 2021 cyfung1031 | https://raw.githubusercontent.com/cyfung1031/jqDim/main/LICENSE */
/*! jQuery v3.6.0 -ajax,-ajax/jsonp,-ajax/load,-ajax/script,-ajax/var/location,-ajax/var/nonce,-ajax/var/rquery,-ajax/xhr,-manipulation/_evalUrl,-deprecated/ajax-event-alias,-effects,-effects/Tween,-effects/animatedSelector | (c) OpenJS Foundation and other contributors | jquery.org/license */
( function( global ) {
    "use strict";
    // Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1

    const window = global;
    const document = window.document;
    const documentElement = document.documentElement;

    const support = {};
    const isWindow = ( obj  => obj != null && obj === obj.window );



    const jEach = ( obj, callback ) => {
        for ( let key in obj ) callback.call( obj[ key ], key, obj[ key ] );
    }
    const jLoop = ( arr, callback ) => {
        for ( const key of arr ) callback.call( arr[ key ], key, arr[ key ] );
    }

    const nodeName = ( elem, name ) => elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();

        
    const cssExpand = [ "Top", "Right", "Bottom", "Left" ];
    const rboxStyle = new RegExp( cssExpand.join( "|" ), "i" );
    const rnumnonpx = /^([+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|))(?!px)[a-z%]+$/i;


    // Support: IE 9 - 11+, Edge 12 - 18+, iOS 10.0 - 10.2 only
    // Check attachment across shadow DOM boundaries when possible (gh-3504)
    // Support: iOS 10.0-10.2 only
    // Early iOS 10 versions support `attachShadow` but not `getRootNode`,
    // leading to errors. We need to check for `getRootNode`.
    const isAttached = documentElement.getRootNode ? 
        ( elem => elem && elem.ownerDocument && (elem.ownerDocument.contains( elem ) || elem.getRootNode( { composed: true } ) === elem.ownerDocument) ):
        ( elem => elem && elem.ownerDocument && (elem.ownerDocument.contains( elem )));
    

    const getStyles = ( elem ) => {

            // Support: IE <=11 only, Firefox <=30 (#15098, #14150)
            // IE throws on elements created in popups
            // FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
            let view = elem.ownerDocument.defaultView;
            return ( ( view && view.opener ) ? view : window ).getComputedStyle( elem );
        };

    const swap = ( elem, options, callback ) => {
        let ret, name,
            old = {};

        // Remember the old values, and insert the new ones
        for ( name in options ) {
            old[ name ] = elem.style[ name ];
            elem.style[ name ] = options[ name ];
        }

        ret = callback.call( elem );

        // Revert the old values
        for ( name in options ) {
            elem.style[ name ] = old[ name ];
        }

        return ret;
    };





    ( function() {

        let pixelPositionVal, boxSizingReliableVal, scrollboxSizeVal, pixelBoxStylesVal,
            reliableTrDimensionsVal, reliableMarginLeftVal,
            container = document.createElement( "div" ),
            div = document.createElement( "div" );

            
        const roundPixelMeasures = ( measure => Math.round( parseFloat( measure ) ) );
        

        // Executing both pixelPosition & boxSizingReliable tests require only one layout
        // so they're executed at the same time to save the second computation.
        function computeStyleTests() {

            // This is a singleton, we need to execute it only once
            if ( !div ) return;

            container.style.cssText = "position:absolute;left:-11111px;width:60px;" +
                "margin-top:1px;padding:0;border:0";
            div.style.cssText =
                "position:relative;display:block;box-sizing:border-box;overflow:scroll;" +
                "margin:auto;border:1px;padding:1px;" +
                "width:60%;top:1%";
            documentElement.appendChild( container ).appendChild( div );

            let divStyle = window.getComputedStyle( div );
            pixelPositionVal = divStyle.top !== "1%";

            // Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
            reliableMarginLeftVal = roundPixelMeasures( divStyle.marginLeft ) === 12;

            // Support: Android 4.0 - 4.3 only, Safari <=9.1 - 10.1, iOS <=7.0 - 9.3
            // Some styles come back with percentage values, even though they shouldn't
            div.style.right = "60%";
            pixelBoxStylesVal = roundPixelMeasures( divStyle.right ) === 36;

            // Support: IE 9 - 11 only
            // Detect misreporting of content dimensions for box-sizing:border-box elements
            boxSizingReliableVal = roundPixelMeasures( divStyle.width ) === 36;

            // Support: IE 9 only
            // Detect overflow:scroll screwiness (gh-3699)
            // Support: Chrome <=64
            // Don't get tricked when zoom affects offsetWidth (gh-4029)
            div.style.position = "absolute";
            scrollboxSizeVal = roundPixelMeasures( div.offsetWidth / 3 ) === 12;

            documentElement.removeChild( container );

            // Nullify the div so it wouldn't be stored in the memory and
            // it will also be a sign that checks already performed
            div.textContent='';
            div = null;
            container.textContent='';
            container = null;
        }

        // Finish early in limited (non-browser) environments
        if ( !div.style ) return;

        Object.assign( support, {
            boxSizingReliable: () => {
                computeStyleTests();
                return boxSizingReliableVal;
            },
            pixelBoxStyles: () => {
                computeStyleTests();
                return pixelBoxStylesVal;
            },
            pixelPosition: () => {
                computeStyleTests();
                return pixelPositionVal;
            },
            reliableMarginLeft: () => {
                computeStyleTests();
                return reliableMarginLeftVal;
            },
            scrollboxSize: () => {
                computeStyleTests();
                return scrollboxSizeVal;
            },

            // Support: IE 9 - 11+, Edge 15 - 18+
            // IE/Edge misreport `getComputedStyle` of table rows with width/height
            // set in CSS while `offset*` properties report correct values.
            // Behavior in IE 9 is more subtle than in newer versions & it passes
            // some versions of this test; make sure not to make it pass there!
            //
            // Support: Firefox 70+
            // Only Firefox includes border widths
            // in computed dimensions. (gh-4529)
            reliableTrDimensions: () => {
                let table, tr, trChild, trStyle;
                if ( reliableTrDimensionsVal == null ) {
                    table = document.createElement( "table" );
                    tr = document.createElement( "tr" );
                    trChild = document.createElement( "div" );

                    table.style.cssText = "position:absolute;left:-11111px;border-collapse:separate";
                    tr.style.cssText = "border:1px solid";

                    // Support: Chrome 86+
                    // Height set through cssText does not get applied.
                    // Computed height then comes back as 0.
                    tr.style.height = "1px";
                    trChild.style.height = "9px";

                    // Support: Android 8 Chrome 86+
                    // In our bodyBackground.html iframe,
                    // display for all div elements is set to "inline",
                    // which causes a problem only in Android 8 Chrome 86.
                    // Ensuring the div is display: block
                    // gets around this issue.
                    trChild.style.display = "block";

                    documentElement
                        .appendChild( table )
                        .appendChild( tr )
                        .appendChild( trChild );

                    trStyle = window.getComputedStyle( tr );
                    reliableTrDimensionsVal = ( parseInt( trStyle.height, 10 ) +
                        parseInt( trStyle.borderTopWidth, 10 ) +
                        parseInt( trStyle.borderBottomWidth, 10 ) ) === tr.offsetHeight;

                    documentElement.removeChild( table );
                }
                return reliableTrDimensionsVal;
            }
        } );
    } )();


    function curCSS( elem, name, computed ) {
        let width, minWidth, maxWidth, ret,

            // Support: Firefox 51+
            // Retrieving style before computed somehow
            // fixes an issue with getting wrong values
            // on detached elements
            style = elem.style;

        computed = computed || getStyles( elem );

        if ( computed ) {
            ret = computed.getPropertyValue( name ) || computed[ name ];

            if ( ret === "" && !isAttached( elem ) ) {
                ret = _style( elem, name );
            }

            // A tribute to the "awesome hack by Dean Edwards"
            // Android Browser returns percentage for some values,
            // but width seems to be reliably pixels.
            // This is against the CSSOM draft spec:
            // https://drafts.csswg.org/cssom/#resolved-values
            if ( !support.pixelBoxStyles() && rnumnonpx.test( ret ) && rboxStyle.test( name ) ) {

                // Remember the original values
                width = style.width;
                minWidth = style.minWidth;
                maxWidth = style.maxWidth;

                // Put in the new values to get a computed value out
                style.minWidth = style.maxWidth = style.width = ret;
                ret = computed.width;

                // Revert the changed values
                style.width = width;
                style.minWidth = minWidth;
                style.maxWidth = maxWidth;
            }
        }

        return ret !== undefined ?

            // Support: IE <=9 - 11 only
            // IE returns zIndex value as an integer.
            ret + "" :
            ret;
    }


    function addGetHookIf( conditionFn, hookFn ) {

        // Define the hook, we'll check on the first run if it's really needed.
        return {
            get: function() {
                if ( conditionFn() ) {

                    // Hook not needed (or it's not possible to use it due
                    // to missing dependency), remove it.
                    delete this.get;
                    return;
                }

                // Hook needed; redefine it so that the support test is not executed again.
                return ( this.get = hookFn ).apply( this, arguments );
            }
        };
    }



    

    function boxModelAdjustment( elem, dimension, box, isBorderBox, styles, computedVal ) {
        
        // dimension: height / width
        // box: padding / content / margin / border 

        let i = dimension === "width" ? 1 : 0,
            extra = 0,
            delta = 0;

        // Adjustment may not be necessary
        if ( box === ( isBorderBox ? "border" : "content" ) ) {
            return 0;
        }

        for ( ; i < 4; i += 2 ) {
            let ce = cssExpand[ i ]

            // Both box models exclude margin
            if ( box === "margin" ) {
                delta += _css( elem, box + ce, true, styles );
            }

            // If we get here with a content-box, we're seeking "padding" or "border" or "margin"
            if ( !isBorderBox ) {

                // Add padding
                delta += _css( elem, "padding" + ce, true, styles );

                // For "border" or "margin", add border
                if ( box !== "padding" ) {
                    delta += _css( elem, "border" + ce + "Width", true, styles );

                // But still keep track of it otherwise
                } else {
                    extra += _css( elem, "border" + ce + "Width", true, styles );
                }

            // If we get here with a border-box (content + padding + border), we're seeking "content" or
            // "padding" or "margin"
            } else {

                // For "content", subtract padding
                if ( box === "content" ) {
                    delta -= _css( elem, "padding" + ce, true, styles );
                }

                // For "content" or "padding", subtract border
                if ( box !== "margin" ) {
                    delta -= _css( elem, "border" + ce + "Width", true, styles );
                }
            }
        }

        // Account for positive content-box scroll gutter when requested by providing computedVal
        if ( !isBorderBox && computedVal >= 0 ) {

            // offsetWidth/offsetHeight is a rounded sum of content, padding, scroll gutter, and border
            // Assuming integer scroll gutter, subtract the rest and round down
            delta += Math.max( 0, Math.ceil(
                elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
                computedVal -
                delta -
                extra -
                0.5

            // If offsetWidth/offsetHeight is unknown, then we can't determine content-box scroll gutter
            // Use an explicit zero to avoid NaN (gh-3964)
            ) ) || 0;
        }

        return delta;
    }

    function getWidthOrHeight( elem, dimension, extra ) {

        // Start with computed style
        let styles = getStyles( elem ),

            // To avoid forcing a reflow, only fetch boxSizing if we need it (gh-4322).
            // Fake content-box until we know it's needed to know the true value.
            isBorderBox = (!support.boxSizingReliable() || extra) && curCSS( elem, "boxSizing", styles ) === "border-box",
            valueIsBorderBox = isBorderBox,

            val = curCSS( elem, dimension, styles ),
            offsetProp = "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 );

        // Support: Firefox <=54
        // Return a confounding non-pixel value or feign ignorance, as appropriate.
        if ( rnumnonpx.test( val ) ) {
            if ( !extra ) return val;
            val = "auto";
        }


        // Support: IE 9 - 11 only
        // Use offsetWidth/offsetHeight for when box sizing is unreliable.
        // In those cases, the computed value can be trusted to be border-box.
        if ( ( !support.boxSizingReliable() && isBorderBox ||

            // Support: IE 10 - 11+, Edge 15 - 18+
            // IE/Edge misreport `getComputedStyle` of table rows with width/height
            // set in CSS while `offset*` properties report correct values.
            // Interestingly, in some cases IE 9 doesn't suffer from this issue.
            !support.reliableTrDimensions() && nodeName( elem, "tr" ) ||

            // Fall back to offsetWidth/offsetHeight when value is "auto"
            // This happens for inline elements with no explicit setting (gh-3571)
            val === "auto" ||

            // Support: Android <=4.1 - 4.3 only
            // Also use offsetWidth/offsetHeight for misreported inline dimensions (gh-3602)
            !parseFloat( val ) && curCSS( elem, "display", styles ) === "inline" ) &&

            // Make sure the element is visible & connected
            elem.getClientRects().length ) {

            isBorderBox = curCSS( elem, "boxSizing", styles ) === "border-box";

            // Where available, offsetWidth/offsetHeight approximate border box dimensions.
            // Where not available (e.g., SVG), assume unreliable box-sizing and interpret the
            // retrieved value as a content box dimension.
            valueIsBorderBox = offsetProp in elem;
            if ( valueIsBorderBox ) {
                val = elem[ offsetProp ];
            }
        }

        // Normalize "" and auto
        val = parseFloat( val ) || 0;

        // Adjust for the element's box model
        return ( val +
            boxModelAdjustment(
                elem,
                dimension, // height / width
                extra || ( isBorderBox ? "border" : "content" ), // extra: padding / content / margin / border 
                valueIsBorderBox,
                styles,

                // Provide the current computed size to request scroll gutter calculation (gh-3589)
                val
            )
        ) + "px";
    }


    // ========================================= cssHooks =================================

    const __cssHooks__ = {}; 

    jLoop( [ "height", "width" ] , cssProp =>{
        __cssHooks__[ cssProp ] = {
            get: function( elem, computed, extra ) {
                if ( computed ) {

                    // Certain elements can have dimension info if we invisibly show them
                    // but it must have a current display style that would benefit
                    return /^(none|table(?!-c[ea]).+)/.test( curCSS( elem, "display" ) ) &&

                        // Support: Safari 8+
                        // Table columns in Safari have non-zero offsetWidth & zero
                        // getBoundingClientRect().width unless display is changed.
                        // Support: IE <=11 only
                        // Running getBoundingClientRect on a disconnected node
                        // in IE throws an error.
                        ( !elem.getClientRects().length || !elem.getBoundingClientRect().width ) ?
                        swap( elem, { position: "absolute", visibility: "hidden", display: "block" }, function() {
                            return getWidthOrHeight( elem, cssProp, extra );
                        } ) :
                        getWidthOrHeight( elem, cssProp, extra );
                }
            }
        };
    });

    __cssHooks__.marginLeft = addGetHookIf( support.reliableMarginLeft,
        function( elem, computed ) {
            if ( computed ) {
                return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
                    elem.getBoundingClientRect().left -
                        swap( elem, { marginLeft: 0 }, function() {
                            return elem.getBoundingClientRect().left;
                        } )
                ) + "px";
            }
        }
    );

    // Support: Safari <=7 - 9.1, Chrome <=37 - 49
    // Add the top/left cssHooks using jElement.prototype.position
    // Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
    // Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
    // getComputedStyle returns percent when specified for top/left/bottom/right;
    // rather than make the css module depend on the offset module, just check for it here
    jLoop([ "top", "left" ], cssProp => {
        __cssHooks__[ cssProp ] = addGetHookIf( support.pixelPosition,
            function( elem, computed ) {
                if ( computed ) {
                    computed = curCSS( elem, cssProp );

                    // If curCSS returns percentage, fallback to offset
                    return rnumnonpx.test( computed ) ?
                        _position( elem )[ cssProp ] + "px" :
                        computed;
                }
            }
        );
    })


    // ========================================= cssHooks =================================



    const _style = function( elem, name ) {
    

        // Don't set styles on text and comment nodes
        if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
            return;
        }

        // Make sure that we're working with the right name
        let ret, hooks,
            style = elem.style;

        
        

        // Gets hook for the prefixed version, then unprefixed version
        hooks = __cssHooks__[ name ] ;
        //name = height / left / marginLeft / top / width

        // Check if we're setting a value
        

        // If a hook was provided get the non-computed value from there
        if ( hooks && "get" in hooks &&
            ( ret = hooks.get( elem, false, undefined ) ) !== undefined ) {

            return ret;
        }

        // Otherwise just get the value from the style object
        return style[ name ];

    }; 
    const _css = function( elem, name, extra, styles ) {
        let val, num, hooks;
        

        // Try prefixed name followed by the unprefixed name
        hooks = __cssHooks__[ name ];
        //name = height / left / marginLeft / top / width

        // If a hook was provided get the computed value from there
        if ( hooks && "get" in hooks ) {
            val = hooks.get( elem, true, extra );
        }

        // Otherwise, if a way to get the computed value exists, use that
        if ( val === undefined ) {
            val = curCSS( elem, name, styles );
        }

        // Make numeric if forced or a qualifier was provided and val looks numeric
        if ( extra === "" || extra ) {
            num = parseFloat( val );
            return extra === true || isFinite( num ) ? num || 0 : val;
        }

        return val;
    }; 


    const _offset = function( elem ) {

        if ( !elem ) return;

        let rect, win;

        // Return zeros for disconnected and hidden (display: none) elements (gh-2310)
        // Support: IE <=11 only
        // Running getBoundingClientRect on a
        // disconnected node in IE throws an error
        if ( !elem.getClientRects().length ) return { top: 0, left: 0 };

        // Get document-relative position by adding viewport scroll to viewport-relative gBCR
        rect = elem.getBoundingClientRect();
        win = elem.ownerDocument.defaultView;
        return {
            top: rect.top + win.pageYOffset,
            left: rect.left + win.pageXOffset
        };
    }

    const _position = function(elem) {

        if ( !elem ) return;

        let offsetParent, offset, doc,
            parentOffset = { top: 0, left: 0 };

        // position:fixed elements are offset from the viewport, which itself always has zero offset
        if ( curCSS( elem, "position" ) === "fixed" ) {

            // Assume position:fixed implies availability of getBoundingClientRect
            offset = elem.getBoundingClientRect();

        } else {
            offset = _offset(elem);

            // Account for the *real* offset parent, which can be the document or its root element
            // when a statically positioned element is identified
            doc = elem.ownerDocument;
            offsetParent = elem.offsetParent || doc.documentElement;
            while ( offsetParent &&
                ( offsetParent === doc.body || offsetParent === doc.documentElement ) &&
                curCSS( offsetParent, "position" ) === "static" ) {

                offsetParent = offsetParent.parentNode;
            }
            if ( offsetParent && offsetParent !== elem && offsetParent.nodeType === 1 ) {

                // Incorporate borders into its offset, since they are outside its content origin
                parentOffset = _offset( offsetParent );
                parentOffset.top += _css( offsetParent, "borderTopWidth", true );
                parentOffset.left += _css( offsetParent, "borderLeftWidth", true );
            }
        }

        // Subtract parent offsets and element margins
        return {
            top: offset.top - parentOffset.top - _css( elem, "marginTop", true ),
            left: offset.left - parentOffset.left - _css( elem, "marginLeft", true )
        };
    }




    
    class jElement{
        constructor(elm){
            this[0]=elm;
            this.length=1;
        }

        // offset() relates an element's border box to the document origin
        offset(){
            return _offset(this[0]);
        }

        // position() relates an element's margin box to its offset parent's padding box
        // This corresponds to the behavior of CSS absolute positioning
        position(){
            return _position(this[0]);
        }

    }

    const jqDim = ( elm => new jElement( elm ) );	

    
    // Create scrollLeft and scrollTop methods
    jEach( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, ( methodName, prop ) => {

        jElement.prototype[ methodName ] = function() {
            
            let elem = this[0]
            
            if(!elem) return;

            // Coalesce documents and windows
            let win;
            if ( isWindow( elem ) ) {
                win = elem;
            } else if ( elem.nodeType === 9 ) {
                win = elem.defaultView;
            }

            return win ? win[ prop ] : elem[ methodName ];

        };
    } );


    // Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
    jEach( { Height: "height", Width: "width" }, ( name, type ) => {
        jEach( {
            padding: "inner" + name,
            content: type,
            "": "outer" + name
        }, ( defaultExtra, methodName ) => {

            // Margin is only for outerHeight, outerWidth
            jElement.prototype[ methodName ] = function( margin, value ) {

                // width()  innerWidth()  outerWidth()  outerWidth(true)

                // width(value)  innerWidth(value)  outerWidth(value) outerWidth(value, true)

                // non-chainable       
                // extra: padding / content / margin / border 

                // let chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" );
                let extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

                
                let elem = this[0];

                if(!elem) return;


                let doc;

                if ( isWindow( elem ) ) {

                    // $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
                    return methodName.indexOf( "outer" ) === 0 ?
                        elem[ "inner" + name ] :
                        elem.document.documentElement[ "client" + name ];
                }

                // Get document width or height
                if ( elem.nodeType === 9 ) {
                    doc = elem.documentElement;

                    // Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
                    // whichever is greatest
                    return Math.max(
                        elem.body[ "scroll" + name ], doc[ "scroll" + name ],
                        elem.body[ "offset" + name ], doc[ "offset" + name ],
                        doc[ "client" + name ]
                    );
                }

                // type: height / width
                // extra: padding / content / margin / border 
                return _css( elem, type, extra );

            };
        } );
    } );
    
 
	window.jqDim = jqDim; 
 
} )(typeof window !== "undefined" ? window : this);