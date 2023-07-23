class Moon extends Planet {
    
    constructor(){
        super(...arguments)
        
        
        // number of glowing spots around planet surface
        this.nScatterPoints = 20 
        this.scr = twopi/this.nScatterPoints
        
        // dist from surface to relevant rays
        this.scatterInfluenceRadius = .004
        
        // radius of glowing spots
        this.scatterVisibleRadius = .004
    }
    
    // propogate scattering effect across atmosphere
    // used in planet.js
    adjustAoi(oldv,v,i,count){
        return (count<5) && (oldv>v) && v+.2
    }
    
    // propogate intensity effect across atmosphere
    // used in planet.js
    adjustInt(oldv,v,i,count){
        return (count<5) && (oldv<v) && v-.05
    }
    
    draw(g){
        
        // draw scattered light around surface
        for( var i = 0 ; i < this.nScatterPoints ; i++ ){
            this.drawScatterPoint(g,i)
        }
        
        // draw landmass
        var sund = this.pos.sub(global.sunPos)
        var colAmt = .01*sund.getMagnitude()
        var innerD = .045-colAmt
        var innerR = 0+colAmt
        var outerD = 0-colAmt
        var outerR = .045+colAmt
        var angle = sund.getAngle()
        var innerC = this.pos.add(vp(angle,innerD))
        var outerC = this.pos.add(vp(angle,outerD))
        var gradient = g.createRadialGradient(
            innerC.x, innerC.y, innerR, 
            outerC.x, outerC.y, outerR)
            
        var colorSpecs = [
        [0,'rgb(0,0,0)'],
        [.1,'rgb(0,0,0)'],
        [.4,'rgb(50,50,50)'],
        [.5,'rgba(100,100,100,.8)'],
        [.6,'rgba(155,155,155,.5)']]
        var prev = null
        colorSpecs.forEach(p => {
            if( prev != null ){
                gradient.addColorStop(p[0]-.001, prev[1]);
            }
            gradient.addColorStop(p[0], p[1]);
            prev = p
        })
        gradient.addColorStop(1, prev[1]);
        g.fillStyle = gradient
        g.beginPath()
        g.arc( this.pos.x, this.pos.y, this.rad, 0, twopi )
        g.fill()
        
    }
    
    // used in draw
    drawScatterPoint(g,i){
        
        if( this.surfaceAois[i] == 10 ){
            return
        }
        
        var acp1 = i*this.scr-global.planetSpinAngle
        var aoi1 = this.surfaceAois[i]
        var int1 = this.surfaceInts[i]
        
        var color = this.getScatterColor(aoi1,int1)
        
        var gradient = g.createRadialGradient(
                            this.pos.x, this.pos.y, this.rad, 
                            this.pos.x, this.pos.y, this.rad + this.scatterVisibleRadius);
        gradient.addColorStop(0, color);
        gradient.addColorStop(1, 'rgba(0,0,0,0)');
        
        g.fillStyle = gradient
        g.beginPath()
        var pos = this.pos.add(vp(acp1,this.rad))
        //shortArch()
        //g.arc( pos.x, pos.y, global.scatterVisibleRadius, 0, twopi )
        shortArch(g, this.pos, this.rad + this.scatterVisibleRadius, 
                    acp1-this.scr, acp1+this.scr )
        g.fill()
    }

    // given angle of incidence with atmosphere, 
    // get color of scattered light
    getScatterColor(angle,intensity){
        var ang = Math.abs(cleanAngle(angle))
        var frac = Math.pow(ang/pio2,.7)
        
        
        
        var re = 100*frac
        var r = 255*(1.0-.7*frac) 
        var g = 255*(1.0-.7*frac) 
        var b = 255*(1.0-.7*frac) 
        
        r = avg(r,re,.3)
        
        r *= intensity
        g *= intensity
        b *= intensity
        var a = r//(intensity>1) ? 1 : Math.max(r,g,b)/255
        return `rgba(${r},${g},${b},${a})`
    }
    
}