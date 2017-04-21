/**
 * Created by kadey on 21.04.2017.
 */

function lvl1() {
    this.lvl = [
        new Collision(0,0,1880,110),
        new Collision(0,110,110,1770),
        new Collision(110,1770,1770,110),
        new Collision(1770,110,110,1660),
        new Collision(700,350,30,50)
    ];
    this.width = 1880;
    this.height = 1880;
}