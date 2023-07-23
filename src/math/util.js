// shorthands
var pi = Math.PI
var pio2 = Math.PI/2
var twopi = 2*Math.PI
function v(){return new Vector(...arguments)}
function vp(){return Vector.polar(...arguments)}


function randRange(min,max){
    return min + rand()*(max-min)
}


// used in segment.js
//
// given two points, get slope and intercept
function getMb(a,b){
    var m = (b.y-a.y)/(b.x-a.x)
    var b = a.y - m*a.x
    return {m:m,b:b}
}

function nnmod(a,b){
    var r = a%b
    return (r>=0) ? r : r+b
}
    
// draw arc the short way (not looping all the around backwards)
function shortArch(g,c,r,a1,a2){
    
    var a1 = cleanAngle(a1)
    var a2 = cleanAngle(a2)
    var a = cleanAngle(a2 - a1)
    
    if( a < 0 ){
        var t = a2
        a2 = a1
        a1 = t
    }
    
    var p1 = c.add(vp(a1,r))
    var p2 = c.add(vp(a2,r)) 
    
    g.moveTo(c.x,c.y)
    g.lineTo(p1.x,p1.y)
    g.lineTo(p2.x,p2.y)
    g.lineTo(c.x,c.y)
}

function cleanAngle(a){
    if( a > pi ){
        a -= twopi
    }
    if( a < -pi ){
        a += twopi
    }
    return a        
}

// weighted avg
function avg(a,b,r=.5){
    return (a*(1.0-r)) + (b*r)
}