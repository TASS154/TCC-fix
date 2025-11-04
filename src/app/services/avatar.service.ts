import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class AvatarService {
  private _avatarUrl = new BehaviorSubject<string>('https://iili.io/KjkZqap.md.png');
  private _nickname = new BehaviorSubject<string>('UserNickname');
  avatarUrl$ = this._avatarUrl.asObservable();
  nickname$ = this._nickname.asObservable();
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
    // Load saved avatar URL and nickname
    const savedAvatarUrl = await this._storage.get('avatarUrl');
    const savedNickname = await this._storage.get('nickname');
    if (savedAvatarUrl) {
      this._avatarUrl.next(savedAvatarUrl);
    }
    if (savedNickname) {
      this._nickname.next(savedNickname);
    }
  }

  setAvatarUrl(url: string) {
    this._avatarUrl.next(url);
    this._storage?.set('avatarUrl', url);
  }

  setNickname(nickname: string) {
    this._nickname.next(nickname);
    this._storage?.set('nickname', nickname);
  }
}


