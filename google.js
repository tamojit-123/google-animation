/* Moving parts*/
var $circles = $('.circle'),
    $dots = $('.dot'),
    $dotBlue = $('.dotBlue'),
    $dotRed = $('.dotRed'),
    $dotYellow = $('.dotYellow'),
    $dotGreen = $('.dotGreen'),
    $gBlue = $('#blueG'),
    $gRed = $('#redG'),
    $gRedb = $('#redGb'),
    $gYellow = $('#yellowG'),
    $gGreen = $('#greenG'),
    $gLine = $('#gLine'),
    $gLineAnim = $('#gLineAnim'),
    $gLineMask = $('#gLineMask'),
    $gMask = $('#gMask'),
    $bcg = $('.logoBcg'),
    pathRed = [{x: 0, y: -1},{x: 31, y: -51},{x: 74, y: -1}],
    pathYellow = [{x: -41, y: 46},{x: -76, y: 0},{x: -35, y: -46},{x: 14, y: 1}],
    pathGreen = [{x: -67, y: 82},{x: -145, y: 0},{x: -100, y: -46},{x: -43, y: 3}],
    pathBlueBack = [{x: 51, y: 53}, {x: 15, y: 25},{x: 0, y: 0}],
    pathRedBack = [{x: 60, y: -37}, {x: 50, y: 40},{x: 0, y: 0}],
    pathYellowBack = [{x: -5, y: -44}, {x: 3, y: -24},{x: 0, y: 0}],
    pathGreenBack = [{x: -108, y: -56}, {x: -27, y: -47},{x: 0, y: 0}],
    tl = new TimelineMax({onUpdate: updateSlider, repeat: 1});

/* Init */
function init(){
    TweenLite.set([$gLine,$circles], {autoAlpha: 0});
    TweenLite.set($gBlue, {drawSVG:"61% 78%"}); /* start at 71% 78% */
    TweenLite.set($gGreen, {drawSVG:"36% 61%"});
    TweenLite.set($gYellow, {drawSVG:"17% 36%"});
    TweenLite.set($gRed, {drawSVG:"0% 26%"});
    TweenLite.set($gRedb, {drawSVG:"78% 100%", transformOrigin: 'center center'});
    TweenLite.set($gLineAnim, {autoAlpha: 0});
}
init();

/* Dots wave */
function getDotsWaveTl(){
    var dotsWaveTl = new TimelineMax();

    $dots.each(function(index, element){

        var dotWaveTl = new TimelineMax(),
            delay = 0.15;

        dotWaveTl
            .to(element, 0.4, {y: -7, ease:Power1.easeOut})
            .to(element, 0.8, {y: 7, ease:Power1.easeInOut})
            .to(element, 0.4, {y: 0, ease:Power1.easeIn})
            .to(element, 0.4, {y: -7, ease:Power1.easeOut})
            .to(element, 0.8, {y: 7, ease:Power1.easeInOut})
            .to(element, 0.4, {y: 0, ease:Power1.easeIn});

        dotsWaveTl.add(dotWaveTl, delay*index);

    });

    return dotsWaveTl;
}

/* Dots rotation */
function getDotsRotateTl(){
    var dotsRotateTl = new TimelineMax();

    dotsRotateTl
        .to($dotRed, 0.9, {bezier:{curviness: 1.5, values: pathRed, ease:Power2.easeInOut}}, 'move')
        .to($dotYellow, 1.2, {bezier:{curviness: 1, values: pathYellow, ease:Power2.easeInOut}}, 'move')
        .to($dotGreen, 1.5, {bezier:{curviness: 1, values: pathGreen, ease:Power2.easeInOut}}, 'move');

    return dotsRotateTl;
}

/* Draw G */
function getDrawGTl(){
    var drawGTl = new TimelineMax();

    drawGTl
        .to($dotBlue, 0.6, {x: 47, ease:Power2.easeIn})
        .set($gLineAnim, {autoAlpha: 1, immediateRender: false})
        .set($dotBlue, {autoAlpha: 0, immediateRender: false}, '+=0.1')
        .from($gLineAnim, 0.8, {x: -120, ease:Power2.easeOut}, '-=0.2')
        /* draw red part */
        .add('startDrawingG', 1)
        .set($gRed, {autoAlpha: 1, immediateRender: false}, 'startDrawingG')
        .fromTo($gRed, 0.5, {drawSVG:"71% 88%"}, {drawSVG:"0% 26%", ease:Power1.easeOut}, '-=0.2')
        .set($dotRed, {autoAlpha: 0, immediateRender: false}, 'startDrawingG')
        /* draw yellow part */
        .set($gYellow, {autoAlpha: 1, immediateRender: false}, 'startDrawingG+=0.1')
        .fromTo($gYellow, 0.6, {drawSVG:"71% 88%"}, {drawSVG:"17% 36%", ease:Power2.easeOut}, '-=0.45')
        .set($dotYellow, {autoAlpha: 0, immediateRender: false}, 'startDrawingG+=0.1')
        /* draw green part */
        .set($gGreen, {autoAlpha: 1, immediateRender: false}, 'startDrawingG+=0.1')
        .fromTo($gGreen, 0.55, {drawSVG:"71% 88%"}, {drawSVG:"36% 61%", ease:Power2.easeOut}, '-=0.6')
        .set($dotGreen, {autoAlpha: 0, immediateRender: false}, 'startDrawingG+=0.4')
        /* draw blue part */
        .set($gLineAnim, {autoAlpha: 0, immediateRender: false}, 'startDrawingG+=0.3')
        .set($gLine, {autoAlpha: 1, immediateRender: false}, 'startDrawingG+=0.3')
        .set($gBlue, {autoAlpha: 1, immediateRender: false}, 'startDrawingG+=0.3')
        .fromTo($gBlue, 0.55, {drawSVG:"71% 88%"}, {drawSVG:"61% 78%", ease:Power2.easeOut}, '-=0.55')
        /* draw ending red part */
        .set($gRedb, {autoAlpha: 1, immediateRender: false}, 'startDrawingG+=0.25')
        .fromTo($gRedb, 0.7, {rotation: '-10', drawSVG:"100% 100%"}, {rotation: '0',drawSVG:"80% 100%", ease:Power2.easeOut}, '-=0.22');

    return drawGTl;
}

/* Back to dots */
function getBackToDotsTl(){
    var backToDotsTl = new TimelineMax();

    backToDotsTl
        /* blue straight line out */
        .to($gLineMask, 0.3, {attr: {x: 365}, transformOrigin: 'right center', ease:Power0.easeNone})
        .set([$gLineMask, $gLine], {autoAlpha: 0})

        /* start moving colored segments (circles) */
        .add('rotateG')
        .to($gBlue, 0.3, {drawSVG:"56% 78%", ease:Power0.easeNone}, 'rotateG-=0.3')
        .to($gGreen, 0.3, {drawSVG:"31% 56%", ease:Power0.easeNone}, 'rotateG-=0.3')
        .to($gYellow, 0.3, {drawSVG:"12% 31%", ease:Power0.easeNone}, 'rotateG-=0.3')
        .to($gRed, 0.3, {drawSVG:"0% 21%", ease:Power0.easeNone}, 'rotateG-=0.3')

        /* start rotating colored segments (circles) */
        .add('rotateCircles')
        .to([$gBlue, $gRed, $gGreen], 0.4, {rotation:"+=50", transformOrigin: 'center center', ease:Power0.easeNone}, 'rotateCircles')

        .to($gGreen, 0.4, {drawSVG:"10% 20%", ease:Power0.easeNone}, 'rotateCircles')
        .to($gYellow, 0.4, {rotation:"+=40", transformOrigin: 'center center', drawSVG:"0% 10%", ease:Power0.easeNone}, 'rotateCircles')
        .to($gBlue, 0.4, {drawSVG:"50% 60%", ease:Power0.easeNone}, 'rotateCircles')
        .to($gRed, 0.1, {drawSVG:"0% 0%", ease:Power0.easeNone}, 'rotateCircles')
        .to($gRedb, 0.3, {rotation:"+=50", drawSVG:"80% 90%", ease:Power2.easeInOut}, 'rotateCircles')

        /* show red dot */
        .set($dotRed, {autoAlpha: 1, x: 60, y: -37}, 'rotateCircles+=0.1')
        .set($gRedb, {autoAlpha: 0}, 'rotateCircles+=0.1')
        .to($dotRed, 0.9, {bezier:{curviness: 1.5, values: pathRedBack, ease:Power2.easeOut}}, 'rotateCircles+=0.1')

        /* show blue dot */
        .set($dotBlue, {autoAlpha: 1, x: 51, y: 53}, 'rotateCircles+=0.3')
        .set($gBlue, {autoAlpha: 0}, 'rotateCircles+=0.3')
        .to($dotBlue, 0.6, {bezier:{curviness: 1.5, values: pathBlueBack, ease:Power2.easeOut}}, 'rotateCircles+=0.3')

        /* show yellow dot */
        .set($dotYellow, {autoAlpha: 1, x: -5, y: -44}, 'rotateCircles+=0.4')
        .set($gYellow, {autoAlpha: 0}, 'rotateCircles+=0.4')
        .to($dotYellow, 0.7, {bezier:{curviness: 1.5, values: pathYellowBack, ease:Power2.easeOut}}, 'rotateCircles+=0.4')

        /* show green dot */
        .set($dotGreen, {autoAlpha: 1, x: -108, y: -56}, 'rotateCircles+=0.4')
        .set($gGreen, {autoAlpha: 0}, 'rotateCircles+=0.4')
        .to($dotGreen, 0.6, {bezier:{curviness: 1.5, values: pathGreenBack, ease:Power2.easeOut}}, 'rotateCircles+=0.4')

        .to($gMask, 0.3, {rotation:"+=60", transformOrigin: '-9 58', ease:Power2.easeInOut}, 'rotateCircles');

    return backToDotsTl;
}

/* Main timeline */
tl.add(getDotsWaveTl())
    .add(getDotsRotateTl(), '-=0.35')
    .add(getDrawGTl(), '-=1.6')
    .add(getBackToDotsTl(), '+=2');

tl.timeScale(1.8);

$("#slider").slider({
    range: false,
    min: 0,
    max: 100,
    step:.1,
    slide: function ( event, ui ) {
        tl.pause();
        //adjust the timeline’s progress() based on slider value
        tl.progress( ui.value/100 );
    }
});

function updateSlider() {
    $("#slider").slider("value", tl.progress() *100);
}