resetRand()

const global = {
    // graphics context
    canvas: null,
    ctx: null,
    
    // relate pixels to virtual units
    canvasOffsetX: 0,
    canvasOffsetY: 0,
    canvasScale: 0,

    // mouse
    canvasMousePos: v(0,0),     //pixels
    mousePos: v(0,0),           //virtual units

    // 
    backgroundColor: 'black',
    scatterInfluenceRadius: .02, // dist from surface to relevant rays (virtual units)
    scatterVisibleRadius: .03, // radius of glowing spots (virtual units)
    nScatterPoints: 100, // number of glowing spots around planet surface
    nSunrays: 200, // number of rays pointing out from sun
    
    //background
    nStars: 1000,
    minStarRad: .001,
    maxStarRad: .001,
    
    // total time elapsed in milliseconds
    t: 0,
    
    //
    earth: null,
    earthRad: .05,
    
    //
    moon: null, 
    moonRad: .02,
    moonOrbitRad: .2, 
    moonOrbitA: rand()*twopi,
    moonOrbitDa: .01, // rads per ms
    
    //
    sunPos: v( .7,.3),
    sunRad: .02,
}