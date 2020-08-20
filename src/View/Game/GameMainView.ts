/**
 * 游戏场景
 * Created By WangZhiHao
 */
class GameMainView extends egret.Sprite {

	private _mapArr: Grid[][];
	private _canUseMapArr: egret.Point[];

	private _player: egret.Shape;

	private _astar: AStar;

	public constructor() {
		super();
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
	}

	private onAddToStage(e: egret.Event): void {
		this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);

		this.init();


		GameMainManager.instance.addEventListener(GameMainManagerEvent.TOUCH_MAP, this.touchTapHandler, this);
	}

	private onRemoveFromStage(e: egret.Event): void {
		this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
		GameMainManager.instance.removeEventListener(GameMainManagerEvent.TOUCH_MAP, this.touchTapHandler, this);

	}

	private init(): void {

		// this.createBg();

		this.createMap();
		this.createPlayer();

		this._astar = new AStar(this._mapArr);
	}

	private createBg(): void {
		var stage: egret.Stage = egret.MainContext.instance.stage;

		var bg: egret.Shape = new egret.Shape();
		this.addChild(bg);
		bg.graphics.beginFill(0xe5d6b6);
		bg.graphics.drawRect(0, 0, stage.stageWidth, stage.stageHeight);
		bg.graphics.endFill();
	}

	private createMap(): void {
		this._mapArr = [];
		this._canUseMapArr = [];
		for (var i = 0; i < GameMainManager.instance.mapC; i++) {
			this._mapArr[i] = [];
			for (var j = 0; j < GameMainManager.instance.mapR; j++) {
				this._mapArr[i][j] = new Grid(i, j);
				this.addChild(this._mapArr[i][j]);
				if (!this._mapArr[i][j].isObstacle) {
					this._canUseMapArr.push(new egret.Point(i, j));
				}
			}
		}
	}

	private createPlayer(): void {
		this._player = new egret.Shape();
		this.addChild(this._player);
		this._player.graphics.beginFill(0x26d022);
		this._player.graphics.drawCircle(0, 0, 10);
		this._player.graphics.endFill();
		var point: egret.Point = this._canUseMapArr[Math.floor(Math.random() * this._canUseMapArr.length)];
		this._player.x = GameMainManager.instance.mapStartX + (point.y * (GameMainManager.instance.mapWidth + GameMainManager.instance.mapOffsetX));
		this._player.y = GameMainManager.instance.mapStartY + (point.x * (GameMainManager.instance.mapHeight + GameMainManager.instance.mapOffsetY));
		egret.log(point);
		egret.log(this.positionChangeIndex(this._player.x, this._player.y));
	}

	private positionChangeIndex(x: number, y: number): egret.Point {
		var index: egret.Point = new egret.Point(
			Math.floor((y - GameMainManager.instance.mapStartY) / (GameMainManager.instance.mapWidth + GameMainManager.instance.mapOffsetX)),
			Math.floor((x - GameMainManager.instance.mapStartX) / (GameMainManager.instance.mapHeight + GameMainManager.instance.mapOffsetY))
		)
		return index;
	}

	private indexChangePosition(x: number, y: number): egret.Point {
		var index: egret.Point = new egret.Point(
			GameMainManager.instance.mapStartX + (y * (GameMainManager.instance.mapWidth + GameMainManager.instance.mapOffsetX)),
			GameMainManager.instance.mapStartY + (x * (GameMainManager.instance.mapHeight + GameMainManager.instance.mapOffsetY)));
		return index;
	}


	private _time: number = 0;
	private _index: number = 0;
	private _x: number = 0;
	private _y: number = 0;

	private touchTapHandler(e: egret.Event): void {

		this.reset();

		var grid: Grid = e.data;
		if (grid.isObstacle) { return; }
		var playerPoint: egret.Point = this.positionChangeIndex(this._player.x, this._player.y);
		var playerGrid: Grid = this._mapArr[playerPoint.x][playerPoint.y];

		this._astar.find(playerGrid.i, playerGrid.j, grid.i, grid.j);

		if (this._astar.path.length == 0) {
			console.log("No Path");
			return;
		}
		for (var i of this._astar.path) {
			this._mapArr[i.x][i.y].texture = "egret_icon_png";
		}

		this._time = egret.setInterval(() => {
			var point: egret.Point = this.indexChangePosition(this._astar.path[this._index].x, this._astar.path[this._index].y);
			this._x = point.x;
			this._y = point.y;
			egret.Tween.get(this._player).to({ x: this._x, y: this._y }, 100).call(() => {
				this._index++;
				if (!this._astar.path[this._index]) {
					egret.clearInterval(this._time);
					return;
				}
				var point: egret.Point = this.indexChangePosition(this._astar.path[this._index].x, this._astar.path[this._index].y);
				this._x = point.x;
				this._y = point.y;
			}, this);
		}, this, 101);

	}

	private reset(): void {
		egret.Tween.removeTweens(this._player);
		egret.clearInterval(this._time);
		this._index = 0;
		for (var i of this._canUseMapArr) {
			this._mapArr[i.x][i.y].texture = "bg_jpg";
		}
	}


}