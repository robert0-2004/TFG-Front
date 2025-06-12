import { EventEmitter, Injectable } from '@angular/core';
import { User } from '../models/user';
import { Terreno } from '../models/terreno';

@Injectable({
  providedIn: 'root'
})
export class SharingDataService {

  private _newUserEventEmitter: EventEmitter<User> = new EventEmitter();

  private _idUserEventEmitter = new EventEmitter();

  private _findUserByIdEventEmitter = new EventEmitter();

  private _selectUserEventEmitter = new EventEmitter();

  private _errorsUserFormEventEmitter = new EventEmitter();

  private _pageUserEventEmitter = new EventEmitter();

  private _updateUserListEventEmitter = new EventEmitter();

  constructor() { }

  get pageUserEventEmitter(){
    return this._pageUserEventEmitter;
  }

  get errorsUserFormEventEmitter(){
    return this._errorsUserFormEventEmitter;
  }

  get selectUserEventEmitter() {
    return this._selectUserEventEmitter;
  }
  
  get findUserByIdEventEmitter() {
    return this._findUserByIdEventEmitter
  }

  get newUserEventEmitter(): EventEmitter<User> {
    return this._newUserEventEmitter;
  }

  get idUserEventEmitter(): EventEmitter<number>{
    return this._idUserEventEmitter;
  }

    get updateUserListEventEmitter(){
    return this._updateUserListEventEmitter;
    }


  //#region Terreno

  private _idTerrenoEventEmitter = new EventEmitter();

  private _newTerrenoEventEmitter: EventEmitter<Terreno> = new EventEmitter();

  private _errorsTerrenoFormEventEmitter = new EventEmitter();

  private _selectTerrenoEventEmitter = new EventEmitter();

  private _findTerrenoByIdEventEmitter = new EventEmitter();

  private _updateTerrenosListEventEmitter = new EventEmitter();

  get idTerrenoEventEmitter(){
    return this._idTerrenoEventEmitter;
  }

  get newTerrenoEventEmitter(){
    return this._newTerrenoEventEmitter;
  }

  get errorsTerrenoFormEventEmitter(){
    return this._errorsTerrenoFormEventEmitter;
  }

  get selectTerrenoEventEmitter() {
    return this._selectTerrenoEventEmitter;
  }

  get findTerrenoByIdEventEmitter() {
    return this._findTerrenoByIdEventEmitter
  }

  get updateTerrenosListEventEmitter(){
    return this._updateTerrenosListEventEmitter;
  }
}
