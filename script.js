// Author: Bahadır Doğru bahadirdogru.com
// https://github.com/bahadirdogru


// Windows screen object.   
var win;
// Canvas element
var canvas = null;
// default color
var hexcolor = "#FF0000";
var color = 'rgba(255, 0, 0, 1)';
// default thickness
var thickness = 7;
// default opacity
var opacity = 1
var opacityEl = null;
// avaible height and width
var height = 0;
var width = 0;

// zoom feature thanks "SWAGAT PARIDA" for Example: https://github.com/swagatblog/FabricJS_Drawing/blob/master/core.js
var canvasScale = 1;
var SCALE_FACTOR = 1.1;


function vindow() {
    console.log("vindow()");
    // vanilla JS window width and height
    // https://gist.github.com/joshcarr/2f861bd37c3d0df40b30
    var w = window;
    var d = document;
    var e = d.documentElement;
    var g = d.getElementsByTagName('body')[0];
    var x = w.innerWidth || e.clientWidth || g.clientWidth;
    var y = w.innerHeight || e.clientHeight || g.clientHeight;
    win = {
        "document": d,
        "documentElement": e,
        "body": g,
        "width": x,
        "height": y
    };
}

function setVindow() {
    console.log("setVindow()");
    vindow();
    height = win.height;
    width = win.width;
    if (height > 32767) {
        //https://stackoverflow.com/a/11585939/3878620
        alert("Unfortunately due to chrome browser limits,  chrome does not support pages with a height greater than 32,767 pixels.");
    }
}


function createCanvas() {
    console.log("createCanvas()");

    setVindow();
    if (canvas == null) {
        canvas = document.createElement("canvas");
        canvas.id = "c";

        canvas.width = width;
        canvas.height = height;
        ctx = canvas.getContext("2d");
        document.body.appendChild(canvas);
        document.onkeydown = function(e) {
        keydown(e);
        }
    }

    // create a wrapper around native canvas element (with id="c")
    canvas = new fabric.Canvas('c');
    canvas.selection = true;
    window.canvas = canvas;
    opacityEl = document.querySelector('#opacity');
}

function addRect() {
    console.log("addRect()");
    // create a rectangle object
    var rect = new fabric.Rect({
        left: 10,
        top: 10,
        width: 100,
        height: 100,
        fill: 'transparent',
        stroke: color, //'black'
        strokeWidth: thickness
    });

    // "add" rectangle onto canvas
    canvas.add(rect);
}

function addCircle() {
    console.log("addCircle()");
    var circle = new fabric.Circle({
        left: 10,
        top:10,
        radius: 75,
        fill: 'transparent',
        stroke: color, //'black'
        strokeWidth: thickness
    });
    canvas.add(circle);
}

function addTriangle() {
    console.log("addTriangle()");
    var triangle = new fabric.Triangle({
        top: 10,
        left: 10,
        width: 100,
        height: 100,
        fill: 'transparent',
        stroke: color, //'black'
        strokeWidth: thickness
      });
      canvas.add(triangle);
}

function addGroup() {
    console.log("addGroup()");
    var circle = new fabric.Circle({
        radius: 100,
        fill: '#eef',
        scaleY: 0.5,
        originX: 'center',
        originY: 'center'
    });

    var text = new fabric.Text('hello world', {
        fontSize: 30,
        originX: 'center',
        originY: 'center'
    });

    var group = new fabric.Group([circle, text], {
        left: 150,
        top: 100,
        angle: -10
    });

    canvas.add(group);
}

function addPath() {
    console.log("addPath()");
    // Star path
    var path = new fabric.Path('M207.07,40.67l47.85,96.95l4.19,8.49l9.36,1.36l106.99,15.55l-77.42,75.46l-6.78,6.61l1.6,9.33l18.28,106.56l-95.69-50.31 l-8.38-4.4l-8.38,4.4L103,360.96l18.28-106.56l1.6-9.33l-6.78-6.61l-77.42-75.46l106.99-15.55l9.36-1.36l4.19-8.49L207.07,40.67 M207.07,0l-63.99,129.65L0,150.44l103.53,100.92l-24.44,142.5l127.98-67.28l127.98,67.28l-24.44-142.5l103.53-100.92 l-143.08-20.79L207.07,0L207.07,0z');
    path.set({
        left: 10,
        top: 10,
        fill: color,
        opacity: opacity,
        scaleY: 0.5,
        scaleX: 0.5
    });
    canvas.add(path);
}

function addText() {
    console.log("addText()");
    var text = new fabric.IText('This is a \nHello\nWorld\nText yuppi!', {
        left: 10,
        top: 10,
        fontFamily: 'Tahoma',
        fontSize: thickness*5,
        // fontWeight: 'bold',
        // fontStyle: 'italic',
        // textAlign: 'right',
        // underline: true,
        // textBackgroundColor: 'rgb(0,200,0)',
        // shadow: 'rgba(0,0,0,0.3) 5px 5px 5px',
        fill: color,
        opacity: opacity,
        UUID: generateUUID()
    });
    canvas.add(text);
}

function cleanCanvas(){
    console.log("cleanCanvas()");
    canvas.clear()
    addImage();
}

function hexToRgbA(hex,opacity) {
    console.log("hexToRgbA()");
    //https://stackoverflow.com/a/21648508
    //If you write your own code, remember hex color shortcuts (eg., #fff, #000)
    var c;
    if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
        c= hex.substring(1).split('');
        if(c.length== 3){
            c= [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c= '0x'+c.join('');
        return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+`,${opacity})`;
    }
    throw new Error('Bad Hex');
    /* 
    hexToRgbA('#fbafff')
    returned value: (String)
    rgba(251,175,255,1)
    */
}

function changeColor(hexcode) {
    console.log("changeColor()");
    hexcolor = hexcode;
    color = hexToRgbA(hexcode,opacity);
}

function changeThickness(value) {
    console.log("changeThickness()");
    // must be integer: https://github.com/fabricjs/fabric.js/issues/3220#issuecomment-244009263
    thickness = parseInt(value);
    if (canvas.freeDrawingBrush) {canvas.freeDrawingBrush.width = thickness}
}

function changeOpacity(value){
    console.log("changeOpacity()");
    opacity = (value / 100) ;
    changeColor(hexcolor,opacity);

    if (canvas.freeDrawingBrush) {canvas.freeDrawingBrush.color = color;}
    opacityEl.value = opacity * 100;
}

function sendToBack(){
    console.log("sendToBack()");
    canvas.sendToBack(canvas.getActiveObject());
}

function bringToFront(){
    console.log("bringToFront()");
    canvas.bringToFront(canvas.getActiveObject());
}

function sendBackwards(){
    console.log("sendBackwards()");
    canvas.sendBackwards(canvas.getActiveObject());
}

function bringForward(){
    console.log("bringForward()");
    canvas.bringForward(canvas.getActiveObject());
}

function removeActiveObject(){
    console.log("removeActiveObject()");
    canvas.remove(canvas.getActiveObject());
}

function removeActiveGroup(){
    console.log("removeActiveGroup()");
    canvas.getActiveObject().forEachObject(function(o){
        canvas.remove(o);
    }).then(function(){
        canvas.discardActiveObject();
    }).then(function(){
        canvas.renderAll();
    })
}


function makeGroup() {
    console.log("makeGroup()");
    // from http://jsfiddle.net/softvar/NuE78/1/
    // from = http://fabricjs.com/manage-selection
    if (!canvas.getActiveObject()) {
        return;
      }
      if (canvas.getActiveObject().type !== 'activeSelection') {
        return;
      }
      canvas.getActiveObject().toGroup();
      canvas.requestRenderAll();
}

function makeUngroup() {
    console.log("makeUngroup()");
    //from http://jsfiddle.net/softvar/NuE78/1/
    if (!canvas.getActiveObject()) {
        return;
      }
      if (canvas.getActiveObject().type !== 'group') {
        return;
      }
      canvas.getActiveObject().toActiveSelection();
      canvas.requestRenderAll();
}

function selectAll() {
    console.log("selectAll()");
    canvas.discardActiveObject();
    var sel = new fabric.ActiveSelection(canvas.getObjects(), {
      canvas: canvas,
    });
    canvas.setActiveObject(sel);
    canvas.requestRenderAll();
}

function unSelectAll() {
    console.log("unSelectAll()");
    canvas.discardActiveObject();
    canvas.requestRenderAll();
}

function saveCanvas(){
    console.log("saveCanvas()");
    canvas.backgroundColor = '#ffffff';
    canvas.renderAll();
    var dataURL = canvas.toDataURL({
        format: 'jpeg',
        quality: 0.8
    });
    var link = document.createElement('a');
    link.href = dataURL;
    link.download = 'calisma.jpg';
    link.click();
}

function addImage(){
    console.log("addImage()");
    var imgUrl = 'image.png';
    var img = new Image();
    img.onload = function() {
        var image = new fabric.Image(img, {
            left: 10,
            top: 10,
            angle: 0,
            opacity: opacity,
            // scaleX: 0.5,
            // scaleY: 0.5,
            // originX: 'center',
            // originY: 'center',
            UUID: generateUUID()
        });
        console.log(image);
        canvas.add(image);
    }
    img.src = 'image.png';
}

function selectObjectByUUID(UUID){
    console.log("selectObjectByUUID()");
    canvas.getObjects().forEach(function(o){
        if (o.UUID == UUID) {
            canvas.setActiveObject(o);
        }
})}


function deleteCanvas() {
    console.log("deleteCanvas()");
    canvas.clear();
    canvas.dispose();
    var e = document.querySelector('.canvas-container');
    e.parentElement.removeChild(e);
}

function pen() {
    console.log("pen()");
    canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
    canvas.freeDrawingBrush.width = thickness;
    canvas.freeDrawingBrush.color = color;
    canvas.isDrawingMode = true;
}

function highlighter(){
    console.log("highlighter()");
    changeOpacity(30);
    pen();
}

function eraser() {
    console.log("eraser()");
    canvas.freeDrawingBrush = new fabric.EraserBrush(canvas);
    canvas.freeDrawingBrush.width = thickness;
    canvas.isDrawingMode = true;
}

function selection(){
    console.log("selection()");
    canvas.isDrawingMode = false;
    canvas.selection = true;
    selectAll();
}

function zoomIn () {
    // TODO limit the max canvas zoom in

    canvasScale = canvasScale * SCALE_FACTOR;

    canvas.setHeight(canvas.getHeight() * SCALE_FACTOR);
    canvas.setWidth(canvas.getWidth() * SCALE_FACTOR);

    var objects = canvas.getObjects();
    for (var i in objects) {
        var scaleX = objects[i].scaleX;
        var scaleY = objects[i].scaleY;
        var left = objects[i].left;
        var top = objects[i].top;

        var tempScaleX = scaleX * SCALE_FACTOR;
        var tempScaleY = scaleY * SCALE_FACTOR;
        var tempLeft = left * SCALE_FACTOR;
        var tempTop = top * SCALE_FACTOR;

        objects[i].scaleX = tempScaleX;
        objects[i].scaleY = tempScaleY;
        objects[i].left = tempLeft;
        objects[i].top = tempTop;

        objects[i].setCoords();
    }

    canvas.requestrenderAll();
}

function zoomOut() {
    canvasScale = canvasScale / SCALE_FACTOR;

    canvas.setHeight(canvas.getHeight() * (1 / SCALE_FACTOR));
    canvas.setWidth(canvas.getWidth() * (1 / SCALE_FACTOR));

    var objects = canvas.getObjects();
    for (var i in objects) {
        var scaleX = objects[i].scaleX;
        var scaleY = objects[i].scaleY;
        var left = objects[i].left;
        var top = objects[i].top;

        var tempScaleX = scaleX * (1 / SCALE_FACTOR);
        var tempScaleY = scaleY * (1 / SCALE_FACTOR);
        var tempLeft = left * (1 / SCALE_FACTOR);
        var tempTop = top * (1 / SCALE_FACTOR);

        objects[i].scaleX = tempScaleX;
        objects[i].scaleY = tempScaleY;
        objects[i].left = tempLeft;
        objects[i].top = tempTop;

        objects[i].setCoords();
    }

    canvas.renderAll();
}

function zoomReset() {

    canvas.setHeight(canvas.getHeight() * (1 / canvasScale));
    canvas.setWidth(canvas.getWidth() * (1 / canvasScale));

    var objects = canvas.getObjects();
    for (var i in objects) {
        var scaleX = objects[i].scaleX;
        var scaleY = objects[i].scaleY;
        var left = objects[i].left;
        var top = objects[i].top;

        var tempScaleX = scaleX * (1 / canvasScale);
        var tempScaleY = scaleY * (1 / canvasScale);
        var tempLeft = left * (1 / canvasScale);
        var tempTop = top * (1 / canvasScale);

        objects[i].scaleX = tempScaleX;
        objects[i].scaleY = tempScaleY;
        objects[i].left = tempLeft;
        objects[i].top = tempTop;

        objects[i].setCoords();
    }

    canvas.renderAll();

    canvasScale = 1;
}

function keydown(e) {
    console.log("keydown()");
        console.log(`keykode: ${e.which}, type: ${e.type}, key:${e.key}`);
        switch (e.which) {
            case 8: // backspace
                // canvas.getActiveObjects().forEach((obj) => {
                //     canvas.remove(obj)
                // });
                // canvas.discardActiveObject().renderAll()
                break;
            case 46: // delete
                canvas.getActiveObjects().forEach((obj) => {
                    canvas.remove(obj)
                });
                canvas.discardActiveObject().renderAll()
                break;
            case 27: // escape
                this.exit();
                break;
        }
}

function generateUUID(){
    var d = new Date().getTime();
    if(window.performance && typeof window.performance.now === "function"){
        d += performance.now(); //use high-precision timer if available
    }
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
}


function openImage(e) {
    // from https://codepen.io/G470/pen/PLbMLL
    console.log("openImage()");
    var inputforupload = e;
    var readerobj = new FileReader();

    readerobj.onload = function () {
        var imgElement = document.createElement('img');
        imgElement.src = readerobj.result;

        imgElement.onload = function () {

            console.log(imgElement.width);
            console.log(imgElement.height);

            var imageinstance = new fabric.Image(imgElement, {
                left: 10,
                top: 10,
                angle: 0,
                opacity: opacity,
                UUID: generateUUID()
            });

            canvas.add(imageinstance);
            //canvas.centerObject(imageinstance);

        };

    };
    console.log(inputforupload.files[0]);
    readerobj.readAsDataURL(inputforupload.files[0]);
};