export default class ProjectError extends Error {
  private _status = 0;
  private _data: object | [] = {};

  get statusCode(): number {
    return this._status;
  }
  set statusCode(code: number) {
    this._status = code;
  }

  get data(): object {
    return this._data;
  }
  set data(errorData: object) {
    this._data = errorData;
  }
}
