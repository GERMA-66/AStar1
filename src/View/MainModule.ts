/**
 * 界面
 * Created By WangZhiHao
 */
class MainModule extends egret.Sprite {

	private _view: egret.Sprite;
	public constructor() {
		super();
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
	}

	private onAddToStage(e: egret.Event): void {
		this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);

		this.init();
	}

	private onRemoveFromStage(e: egret.Event): void {
		this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);

	}

	private init(): void {

		this._view = new egret.Sprite();
		this.addChild(this._view);

		this._view.addChild(new GameMainView());
	}
}