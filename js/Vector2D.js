/**
 * @author stormsen
 */

function Vector2D(x, y) {
    this.x = x || 0;
    this.y = y || 0;
}

Vector2D.prototype = {
    add: function (v) {
        this.x += v.x;
        this.y += v.y;
        return this;
        // return new Vector2D(this.x += v.x, this.y += v.y);
    },

    subtract: function (v) {
        this.x -= v.x;
        this.y -= v.y;
        return this;
    },


    multiply: function (value) {
        this.x *= value;
        this.y *= value;
        return this;
    },

    divide: function (value) {
        this.x /= value;
        this.y /= value;
        return this;
    },

    toPolar: function () {
        var r = Math.sqrt(this.x * this.x + this.y * this.y);
        this.y = Math.atan2(this.y, this.x);
        this.x = r;
        return this;
    },

    rotate: function (theta) {
        var co = Math.cos(theta);
        var si = Math.sin(theta);
        var xx = co * this.x - si * this.y;
        this.y = si * this.x + co * this.y;
        this.x = xx;
        return this;
    },

    toCartesian: function () {
        var xx = (this.x * Math.cos(this.y));
        this.y = (this.x * Math.sin(this.y));
        this.x = xx;
        return this;
    },

    reverse: function () {
        this.x = -this.x;
        this.y = -this.y;
        return this;
    },

    dot: function (v) {
        return this.x * v.x + this.y * v.y;
    },

    cross: function (v) {
        return this.x * v.y - this.y * v.x
    },

    jitter: function (jX, jY) {
        this.x = Math.random() * jX - jX * 0.5;
        this.y = Math.random() * jY - jY * 0.5;
        return this;
    },

    length: function () {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    },

    lengthSquared: function () {
        return this.x * this.x + this.y * this.y;
    },

    normalize: function () {
        // if (l != 0)
        return this.divide(this.length());
    },

    min: function (x, y) {
        return new Vector2D(this.x = Math.max(this.x, x), this.y = Math.max(this.y, y));
    },

    max: function (x, y) {
        return new Vector2D(this.x = Math.min(this.x, x), this.y = Math.min(this.y, y));
    },

    clone: function () {
        return new Vector2D(this.x, this.y);
    },

    set: function (x, y) {
        this.x = x;
        this.y = y;
        return this;
    }
}

/*--------------------------------------------
 ~ static functions Vector2D
 --------------------------------------------*/

Vector2D.getAngleRAD = function (v) {
    return Math.atan2(v.y, v.x);
}

Vector2D.getAngleDEG = function (v) {
    return Math.atan2(v.y, v.x) * 57.296;
}

Vector2D.add = function (v1, v2) {
    return new Vector2D(v1.x + v2.x, v1.y + v2.y);
};

Vector2D.subtract = function (v1, v2) {
    return new Vector2D(v1.x - v2.x, v1.y - v2.y);
};

Vector2D.divide = function (v, d) {
    return new Vector2D(v.x / d, v.y / d);
};

Vector2D.multiply = function (v, m) {
    return new Vector2D(v.x * m, v.y * m);
};

Vector2D.getDistance = function (v1, v2) {
    var dx = v2.x - v1.x;
    var dy = v2.y - v1.y;
    return Math.sqrt(dx * dx + dy * dy);
};

Vector2D.getDistanceSquared = function (v1, v2) {
    var dx = v2.x - v1.x;
    var dy = v2.y - v1.y;
    return dx * dx + dy * dy;
};

Vector2D.getNormalPoint = function (p, a, b) {
    var ap = new Vector2D();
    var ab = new Vector2D();
    var normalPoint = new Vector2D();

    // PVector that points from a to p
    var ap = Vector2D.subtract(p, a);
    // PVector that points from a to b
    var ab = Vector2D.subtract(b, a);

    //[full] Using the dot product for scalar projection
    ab.normalize();
    ab.multiply(ap.dot(ab));
    //[end]
    // Finding the normal point along the line segment
    normalPoint = Vector2D.add(a, ab);

    return normalPoint;
}