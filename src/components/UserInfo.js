export class UserInfo {
    constructor({ profileNameSelector, profileJobSelector, profileAvatarSelector} ) {
      this._profileNameSelector = profileNameSelector;
      this._profileJobSelector = profileJobSelector;
      this._profileAvatarSelector = profileAvatarSelector;
    }

    getUserInfo() {
        this.name = this._profileNameSelector.textContent;
        this.job = this._profileJobSelector.textContent;
        this.avatar = this._profileAvatarSelector.src;
    }
  
    setUserInfo(name, job) {
        this._profileNameSelector.textContent = name;
        this._profileJobSelector.textContent = job;
    }  

    setAvatar(avatar) {
        this._profileAvatarSelector.src = avatar;
    }  
}