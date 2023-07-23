// "volumetric" sunbeam in 2D
// spanning the area between two rays

class Raynge{
    constructor( a,b ){
        this.a = a
        this.b = b
    }
    
    draw(g){
        
        if( (!this.a.hitPlanet) && (!this.b.hitPlanet) ){
            return
        }
        
        var p = global.earth
        var r = p.rad + global.scatterRadius
        

        var n = Math.max(1,Math.floor(1e2*Math.abs(this.a.acp-this.b.acp)))
        var dr = 1/n
        for( var r1 = 0 ; r1 < 1 ; r1 += dr ){
            this.drawSeg(g,p,r,r1)
        }
    }
    
    // used in draw
    drawSeg(g,p,r,r1){
        var acp1 = avg(this.a.acp,this.b.acp,r1)
        //var acp2 = avg(this.a.acp,this.b.acp,r2)
        var aoi1 = avg(this.a.aoi,this.b.aoi,r1)
        //var aoi2 = avg(this.a.aoi,this.b.aoi,r2)
        
        
        var color = scatterColor(aoi1)
        
        var gradient = g.createRadialGradient(
                            p.pos.x, p.pos.y, p.rad, 
                            p.pos.x, p.pos.y, r);
        gradient.addColorStop(0, color);
        gradient.addColorStop(1, 'black');
        
        g.fillStyle = gradient
        g.beginPath()
        var pos = p.pos.add(vp(acp1,p.rad))
        g.arc( pos.x, pos.y, global.scatterRadius, 0, twopi )
        //shortArch(g, p.pos, r, acp1, acp2, .2 )
        g.fill()
    }
}