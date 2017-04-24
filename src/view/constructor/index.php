<!doctype html>
<html ng-app="app">
<head>
    <script src="https://code.angularjs.org/1.6.4/angular.min.js"></script>
    <script src="https://code.angularjs.org/1.6.4/angular-mocks.js"></script>
    <script src="/public/libs/js/jquery.js"></script>
    <link rel="stylesheet" href="/public/css/constructor.css">
    <script src="/public/js/constructor/constructor.js"></script>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Constructor</title>
</head>
<body ng-controller="constr" ng-keydown="keyDown($event)" ng-keyup="keyUp()" >
<input type="button" id="update" ng-show="false" ng-click="keyUp()"/>
<div class="poppup pop-crtLvl" ng-show="newLvl">
    <div>
        <input type="text" id="projName" placeholder="Name"/>
        <input type="number" id="projWidth" placeholder="Width (px)"/>
        <input type="number" id="projHeight" placeholder="Height (px)"/>
        <input type="button" ng-click="createNewLvl()" value="Создать"/>
    </div>
</div>
<div class="poppup-back" ng-show="showPoppup"></div>
<div class="container">
    <div id="top-panel">
        <div id="makeLevel">
            <button title="Стандартный курсор" style="background-image: url('/public/img/panel-icons/standart.png');" ng-click="remakeLvl=''"></button>
            <button title="Добавить коллизию"  style="background-image: url('/public/img/panel-icons/collision.png');" ng-click="remakeLvl='addColl'"></button>
        </div>
        <button ng-click="showPoppup = true;newLvl = true;" id="creatNewLvl">Создать новый уровень</button>
    </div>
    <div id="display" >
        <div id="game" class="{{remakeLvl}}" style="width:{{map.width}};height:{{map.height}};">
<!--            <div id="player" class="{{player.rot}}" style="width:{{player.width}};height:{{player.height}};top:{{player.posY + player.gap}};left:{{player.posX + player.gap}};">-->
<!--                <img id="go" ng-show="go" src="/public/img/player/go.gif" alt="">-->
<!--                <img id="stop" ng-show="!go" src="/public/img/player/stop.png" alt="">-->
<!--            </div>-->
            <div ng-repeat="col in map.collision track by $index" class="in_lvl" id="col-{{$index}}" style="top:{{col.posY}};left:{{col.posX}};width:{{col.width}};height:{{col.height}};">{{$index+1}}</div>
        </div>
    </div>
    <div id="right-panel">
        <select ng-model="changelvl">
            <option ng-repeat="lvl in lvls.lvls track by $index" value="{{$index}}">{{lvl.name}}</option>
        </select>
        <div class="colision-table">
            <table id="colision-table" >
                <thead>
                    <tr>
                        <th>№</th>
                        <th>x</th>
                        <th>y</th>
                        <th>width</th>
                        <th>height</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="col-{{$index}}" ng-repeat="col in map.collision track by $index" ng-click="showEditMenu($index);">
                        <td>{{$index+1}}</td>
                        <td id="posX-{{$index}}">{{col.posX}}</td>
                        <td id="posY-{{$index}}">{{col.posY}}</td>
                        <td id="width-{{$index}}">{{col.width}}</td>
                        <td id="height-{{$index}}">{{col.height}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="editColl">
            <p>№ : {{editcollisionind+1}}</p>
            <div>X : </div><input type="number" placeholder="posX" ng-model="editcollision.posX"/>
            <div>Y : </div><input type="number" placeholder="posY" ng-model="editcollision.posY"/>
            <div>width : </div><input type="number" placeholder="width" ng-model="editcollision.width"/>
            <div>height : </div><input type="number" placeholder="height" ng-model="editcollision.height"/>
            <button ng-click="delCol(editcollisionind)">Удалить</button>
        </div>
        <input type="button" id="save" ng-click="saveAll()" value="Сохранить"/>
    </div>
</div>
</body>
</html>