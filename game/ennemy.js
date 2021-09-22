var Ennemy = function (name, color, position, direction, axe) {
    console.log(axe)
    this.name = name;
    this.position = position;
    this.life = 1;
    this.bullets = new Array();
    this.direction = direction;
    this.speed = 1;
    this.axe = axe;

    this.material = new THREE.MeshLambertMaterial({
        color: color,
    });

    var singleGeometry = new THREE.Geometry();

    vehiculeMesh = new THREE.ConeGeometry(5, 20, 32);
    this.graphic = new THREE.Mesh(vehiculeMesh, this.material);
    this.graphic.position.z = 6;

    this.graphic.rotateOnAxis(new THREE.Vector3(0, 0, 1), this.direction + (3 * Math.PI / 2));
};

Ennemy.prototype.dead = function () {

}


Ennemy.prototype.displayInfo = function () {
    jQuery('#' + this.name + ' >.life').text(this.life);
}

Ennemy.prototype.turnRight = function (angle) {
    this.direction += angle;
    this.graphic.rotateOnAxis(new THREE.Vector3(0, 0, 1), +angle);
};

Ennemy.prototype.turnLeft = function (angle) {
    this.direction += angle;
    this.graphic.rotateOnAxis(new THREE.Vector3(0, 0, 1), angle);
};

Ennemy.prototype.move = function () {

    var moveTo = new THREE.Vector3(
        this.axe == 0 ? this.speed * Math.cos(this.direction) + this.position.x : this.position.x,
        this.axe == 1 ? this.speed * Math.cos(this.direction) + this.position.y : this.position.y,
        this.graphic.position.z
    );

    this.position = moveTo;
    console.log(player1.position.x, this.position.x)
    if (this.axe == 0) {
        if (this.position.x > player1.position.x) {
            this.speed -=  0.05; // * this.speed 
        }
        else if (this.position.x < player1.position.x) {
            this.speed +=  0.05; // * this.speed 
        }
    }
    else {
        if (this.position.y > player1.position.y) {
            this.speed -=  0.01; // * this.speed 
        }
        else if (this.position.y < player1.position.y) {
            this.speed +=  0.01; // * this.speed 
        }
    }


    this.graphic.position.x = this.position.x;
    this.graphic.position.y = this.position.y;

    light1.position.x = this.position.x;
    light1.position.y = this.position.y;
    //light1.position.z = this.graphic.position.z + 500;
};
