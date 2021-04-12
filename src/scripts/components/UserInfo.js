export default class UserInfo {
  constructor ({userNameSelector, userAboutSelector, userAvatarSelector}) {
    this._userName = document.querySelector(userNameSelector);
    this._userAbout = document.querySelector(userAboutSelector);
    this._userAvatar = document.querySelector(userAvatarSelector);
  }

  getUserInfo() {
    return {
      userName: this._userName.textContent,
      userAbout: this._userAbout.textContent
    };
  }

  setUserInfo({name, about, _id, avatar}) {
    this._userName.textContent = name;
    this._userAbout.textContent = about;
    this._userAvatar.style.backgroundImage = `url(${avatar})`;
    this.id = _id;

  }

}
