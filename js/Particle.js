/*--------------------------------------------
 ~ particle
 --------------------------------------------*/

function Particle(x, y) {
    this.location = new Vector2D(x, y);
    this.velocity = new Vector2D(0.00000, 0.00000);
    this.acceleration = new Vector2D();
    this.friction = new Vector2D();
    this.wander = new Vector2D();
    this.mass = 10;

    this.bounds = null;
}


Particle.prototype = {

    init: function () {

    },

    jitter: function (jX, jY) {

        this.x += Math.random() * jX - jX * 0.5;
        this.y += Math.random() * jY - jY * 0.5;

    },

    /*------------------------------------------------
     apply force (wind, gravity...)
     -------------------------------------------------*/

    applyForce: function (vForce) {
        f = Vector2D.divide(vForce, this.mass)
        this.acceleration.add(f);
    },


    update: function () {

        this.friction.set(this.velocity.x, this.velocity.y);
        this.friction.multiply(-1);
        this.friction.normalize();
        this.friction.multiply(.05);
        this.applyForce(this.friction);

        this.wander.jitter(.3, .3);
        this.velocity.add(this.wander);
        this.velocity.add(this.acceleration);
        this.velocity.max(10, 10);

        this.location.add(this.velocity);

        this.checkBorders();

        this.acceleration.multiply(0);

    },

    draw: function (ctx) {

        ctx.beginPath();
        ctx.arc(this.location.x, this.location.y, .1, 0, TWO_PI);
        ctx.fillStyle = "rgba(0,0,255,0)";
        ctx.fill();

    },

    checkBorders: function () {

        /*===wrap===*/

        if (this.location.x < this.bounds.x1) {
            this.location.x = this.bounds.x2;
        } else if (this.location.x > this.bounds.x2) {
            this.location.x = this.bounds.x1;
        }
        if (this.location.y < this.bounds.y1) {
            this.location.y = this.bounds.y2;
        } else if (this.location.y > this.bounds.y2) {
            this.location.y = this.bounds.y1;
        }
    }


};



function Bounds(_x1, _y1, _x2, _y2) {
    this.x1 = _x1;
    this.x2 = _x2;
    this.y1 = _y1;
    this.y2 = _y2;
}