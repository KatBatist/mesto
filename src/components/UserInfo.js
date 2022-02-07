export class UserInfo {
    constructor({ profileNameSelector, profileJobSelector} ) {
      this._profileNameSelector = profileNameSelector;
      this._profileJobSelector = profileJobSelector;
    }

    getUserInfo() {
        this.name = this._profileNameSelector.textContent;
        this.job = this._profileJobSelector.textContent;
    }
  
    setUserInfo(name, job) {
        this._profileNameSelector.textContent = name;
        this._profileJobSelector.textContent = job;
    }  
}