export class Risk {
  private _name: string;
  private _probability: number;

  constructor(name: string) {
    this._name = name;
    this._probability = 0;
  }

  public get name(): string {
    return this._name;
  }

  public set name(name: string) {
    this._name = name;
  }

  public get probability(): number {
    return this._probability;
  }

  public set probability(grade: number) {
    this._probability = grade;
  }
}
