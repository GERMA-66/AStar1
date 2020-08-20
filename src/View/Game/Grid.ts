class Grid extends egret.Sprite {

	private _bitmap: egret.Bitmap;

	private _isObstacle: boolean;//是否是障碍物

	private _i: number;
	private _j: number;
	public constructor(i: number, j: number) {
		super();
		this._i = i;
		this._j = j;
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
	}

	private onAddToStage(e: egret.Event): void {
		this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);

		this.init();

		this.touchEnabled = true;
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchTapHandler, this);
	}

	private onRemoveFromStage(e: egret.Event): void {
		this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
		this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchTapHandler, this);

	}

	private init(): void {
		this._bitmap = new egret.Bitmap();
		this.addChild(this._bitmap);
		this._bitmap.width = GameMainManager.instance.mapWidth;
		this._bitmap.height = GameMainManager.instance.mapHeight;
		this._bitmap.anchorOffsetX = this._bitmap.width / 2;
		this._bitmap.anchorOffsetY = this._bitmap.height / 2;
		this._bitmap.x = GameMainManager.instance.mapStartX + (this._j * (GameMainManager.instance.mapWidth + GameMainManager.instance.mapOffsetX));
		this._bitmap.y = GameMainManager.instance.mapStartY + (this._i * (GameMainManager.instance.mapHeight + GameMainManager.instance.mapOffsetY));
		var p: number = Math.random() * 100;
		if (p <= 30) {
			this._isObstacle = true;
			this._bitmap.texture = RES.getRes("checkbox_select_disabled_png");
		} else {
			this._isObstacle = false;
			this._bitmap.texture = RES.getRes("bg_jpg");
		}

	}

	private touchTapHandler(): void {
		GameMainManager.instance.dispatchEventWith(GameMainManagerEvent.TOUCH_MAP, false, this);
	}

	public get isObstacle(): boolean { return this._isObstacle; }

	public set texture(value: string) {
		if (value == "") this._bitmap.texture = RES.getRes("bg_jpg");
		this._bitmap.texture = RES.getRes(value);
	}

	public get i(): number { return this._i; }
	public get j(): number { return this._j; }
}