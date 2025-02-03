export class RiskAnalysis {
  private _name: string;
  private _probability: number;
  private _grades: number[];
  private _weightedGrades: number[];

  constructor(name: string) {
    this._name = name;
    this._probability = 1;
    this._grades = [];
    this._weightedGrades = [];
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

  public set probability(probability: number) {
    this._probability = probability;
  }

  public get grades(): number[] {
    return this._grades;
  }

  public set grades(grades: number[]) {
    this._grades = grades;
  }

  public get weightedGrades(): number[] {
    return this._weightedGrades;
  }

  public set weightedGrades(weightedGrades: number[]) {
    this._weightedGrades = weightedGrades;
  }
}
