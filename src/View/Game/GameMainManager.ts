/**
 * 游戏数据
 * Created By WangZhiHao
 */
class GameMainManager extends egret.EventDispatcher {

	private static _instance: GameMainManager;

	public static get instance(): GameMainManager {
		if (!this._instance) {
			this._instance = new GameMainManager();
		}
		return this._instance;
	}

	private _mapC: number = 20;//行
	private _mapR: number = 20;//列

	private _mapWidth: number = 45;//格子宽度
	private _mapHeight: number = 45;//格子高度
	private _mapOffsetX: number = 10;//x的偏移量
	private _mapOffsetY: number = 10;//y的偏移量


	private _mapStartX: number = 50;//地图起点X坐标
	private _mapStartY: number = 50;//地图起点Y坐标

	/**行 */
	public get mapC(): number { return this._mapC; }
	/**列 */
	public get mapR(): number { return this._mapR; }

	public get mapWidth(): number { return this._mapWidth; }
	public get mapHeight(): number { return this._mapHeight; }
	public get mapOffsetX(): number { return this._mapOffsetX; }
	public get mapOffsetY(): number { return this._mapOffsetY; }

	public get mapStartX(): number { return this._mapStartX; }
	public get mapStartY(): number { return this._mapStartY; }
}

class GameMainManagerEvent {
	public static readonly TOUCH_MAP: string = "TOUCH_MAP";
}