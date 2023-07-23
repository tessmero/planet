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
    nSunrays: 200, // number of rays pointing out from sun
    
    //background
    nStars: 2000,
    minStarRad: .001,
    maxStarRad: .001,
    
    // total time elapsed in milliseconds
    t: 0,
    allPlanets: [],
    
    //
    planetSpinDa: 2e-4 * (rand()>.5? 1 : -1), //rads per ms
    planetSpinAngle: 0,
    
    //
    earth: null,
    earthRad: .05,
    
    //
    moon: null, 
    moonRad: .01,
    moonOrbitRx: .2, 
    moonOrbitRy: .1, 
    moonOrbitDa: .0001, // rads per ms
    moonOrbitOa: rand()*twopi, // rads offset
    
    //
    sunPos: v( .7,.3),
    sunRad: .02,
    sunSpinDa: 2e-5*randRange(.5,1) * (rand()>.5? 1 : -1), //rads per ms
    sunOrbitC: v(.5,.3),
    sunOrbitRx: .4,
    sunOrbitRy: .02,
    sunOrbitDa: 2e-5*randRange(.5,1),//rads per ms
    sunOrbitOa: pio2+randRange(-.5,.5), // rads offset
    
    sunTargetPos: null, // set value only when user clicks to direct sun
    sunTargetVel: v(0,0),
    sunTargetAccel: 5e-7, // dist per ms per ms
    sunTargetFriction: 3e-3, // fraction of speed lost per ms
    sunTargetMargin: 2e-2, // "close enough" distance to target
}