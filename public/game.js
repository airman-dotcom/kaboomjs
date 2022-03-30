kaboom({
    global: true,
    fullscreen: true,
    scale: 1,
    debug: true,
    clearColor: [0, 0, 1, 1]
})

const player_speed = 120;
const enemy_speed = 100;
const dict = {"left": -player_speed, "right": player_speed, "up": -player_speed, "down": player_speed}
let touching = false;
let dir;
loadSprite("link", "link.png")
loadSprite("wall", "wall.png");
loadSprite("enemy", "enemy.png")

scene("game", () => {
    layers(["bg", "obj", "ui"], "obj");

    const map = [
        "HHHHHHHHHH",
        "H        H",
        "H        H",
        "H        H",
        "H        H",
        "H        H",
        "H        H",
        "HHHHHHHHHH"
    ];

    const tile_settings = {
        width: 48,
        height: 48,
        H: () => [sprite("wall"), solid(), area(), "wall"]
    };

    addLevel(map, tile_settings);

    const player = add([
        sprite("link"),
        pos(192, 145),
        {
            dir: vec2(1, 0)
        },
        area(),
        "link"
    ]);

    onKeyDown("left", () => {
        if (!touching){
        dir = "left";
        if (isKeyDown("down") ||isKeyDown("right") || isKeyDown("up")){
            
            player.move(0, 0)
        } else {
            player.move(dict.left, 0)
        }
    }
    })

    onKeyDown("right", () => {
        if (!touching){
            dir = "right";
        if (isKeyDown("down") ||isKeyDown("up") || isKeyDown("left")){
            player.move(0, 0)
        } else {
            player.move(dict.right, 0)
        }
    } else {
        player.move(-20, 0)
        touching = false;
    }
    })

    onKeyDown("up", () => {
        if (!touching){
            dir = "up";
        if (isKeyDown("down") ||isKeyDown("right") || isKeyDown("left")){
            player.move(0, 0)
        } else {
            player.move(0, dict.up)
        }
    } else {
        player.move(0, -20)
        touching = false;
    }
    })
    onKeyDown("down", () => {
        if (!touching){
            dir = "down";
        if (isKeyDown("up") ||isKeyDown("right") || isKeyDown("left")){
            player.move(0, 0)
        } else {
            player.move(0, dict.down)
        }
    } else {
        player.move(0, 20)
        touching = false;
    }
    })
    
    onCollide("wall", "link", (wall, link) => {
        if (dir == "left"){
            link.move(120, 0)
        } else if (dir == "right"){
            link.move(-120, 0)
        } else if (dir == "up"){
            link.move(0, 120)
        } else if (dir == "down"){
            link.move(0, -120)
        }
    }) 
    
})
go("game")