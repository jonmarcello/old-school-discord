class Player {
    private _health: number;
    private alive: boolean;

    constructor() {
        this._health = 100;
        this.alive = true;
    }

    get health(): number {
        return this._health;
    }

    set health(value: number) {
        this._health = value;
        this._checkAliveStatus();
    }

    damage(amount:number) {
        this.health -= amount;
    }

    heal(amount:number) {
        this.health -= amount;
    }

    _checkAliveStatus() {
        const alive:boolean = this.health <= 0;
        this.alive = alive;
        if(!this.alive) {
            console.log('dead')
        }
    }
}