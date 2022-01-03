let service = require("../service/userService");

class Usercontrol {
  async Register(req, res) {
    await service.registerUserService(req.body)
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  }
  async loginUser(req, res) {
    await service.loginService(req.body)
      .then((loginData) => {
        res.status(200).send(loginData);
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  }
}

module.exports = new Usercontrol();
