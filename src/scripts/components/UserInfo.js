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

  setUserInfo({name, about, _id}) {
    this._userName.textContent = name;
    this._userAbout.textContent = about;
    this.id = _id;
  }

  setUserAvatar({avatar}) {
    this._userAvatar.src = avatar;
  }
}
