var bulletTime1 = 0;

var bullet_player1_material = new THREE.MeshLambertMaterial(
    {
        color: 0x00ff00,
        transparent: false
    });

const transformAxes = (x, y) => {
    return {
        x: x + (WIDTH / 2),
        y: y + (HEIGHT / 2)
    }
}

function shoot() {
    if (keyboard.pressed("space") && bulletTime1 + 0.8 < clock.getElapsedTime()) {
        bullet = new THREE.Mesh(
            new THREE.SphereGeometry(2),
            bullet_player1_material);
        scene.add(bullet);
        bullet.position.x = player1.graphic.position.x + 7.5 * Math.cos(player1.direction);
        bullet.position.y = player1.graphic.position.y + 7.5 * Math.sin(player1.direction);
        bullet.angle = player1.direction;
        player1.bullets.push(bullet);
        bulletTime1 = clock.getElapsedTime();
    }

    // move bullets
    var moveDistance = 5;

    for (var i = 0; i < player1.bullets.length; i++) {
        player1.bullets[i].position.x += moveDistance * Math.cos(player1.bullets[i].angle);
        player1.bullets[i].position.y += moveDistance * Math.sin(player1.bullets[i].angle);
    }

}

function collisions() {
    bullet_collision();
    player_collision();
    player_falling();
}

function bullet_collision() {
    //collision between bullet and walls
    for (var i = 0; i < player1.bullets.length; i++) {
        if (Math.abs(player1.bullets[i].position.x) >= WIDTH / 2 ||
            Math.abs(player1.bullets[i].position.y) >= HEIGHT / 2) {
            scene.remove(player1.bullets[i]);
            player1.bullets.splice(i, 1);
            i--;
            continue;
        }

        //collision between bullet and ennemies

        for (const ennemy of ennemies) {
            // ennemy.graphic.position, transformAxes(ennemy.graphic.position.x, ennemy.graphic.position.y),

            if (Math.abs(player1.bullets[i].position.x) == ennemy.graphic.position.x &&
                Math.abs(player1.bullets[i].position.y) == ennemy.graphic.position.y) {
                scene.remove(player1.bullets[i]);
                scene.remove(ennemy);
                player1.bullets.splice(i, 1);
                i--;
                console.log('........................................')
            }
        }
    }


}

function player_collision() {
    //collision between player and walls
    var x = player1.graphic.position.x + WIDTH / 2;
    var y = player1.graphic.position.y + HEIGHT / 2;

    if (x > WIDTH)
        player1.graphic.position.x -= x - WIDTH;
    if (x < 0)
        player1.graphic.position.x -= x;
    if (y < 0)
        player1.graphic.position.y -= y;
    if (y > HEIGHT)
        player1.graphic.position.y -= y - HEIGHT;


    //collision between player and ennemie

    for (const ennemy of ennemies) {
        var xx = ennemy.graphic.position.x + WIDTH / 2;
        var yy = ennemy.graphic.position.y + HEIGHT / 2;
        console.log(x, xx, y, yy)
        if (Math.floor(x) == Math.floor(xx) && Math.floor(y) == Math.floor(yy))
            player1.removeLife()
    }

}

function player_falling() {
    var nb_tile = 10;
    var sizeOfTileX = WIDTH / nb_tile;
    var sizeOfTileY = HEIGHT / nb_tile;
    var x = player1.graphic.position.x | 0;
    var y = player1.graphic.position.y | 0;
    var length = noGround.length;
    var element = null;

    for (var i = 0; i < length; i++) {
        element = noGround[i];

        var tileX = element ? (element[0]) : 0;
        var tileY = element ? (element[1]) : 0;
        var mtileX = (tileX + sizeOfTileX) | 0;
        var mtileY = (tileY + sizeOfTileY) | 0;

        if ((x > tileX)
            && (x < mtileX)
            && (y > tileY)
            && (y < mtileY)) {
            player1.dead();
        }
    }

}
