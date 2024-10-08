const { verifySignUp, authJwt } = require("../middleware");
const controller = require("../controllers/auth.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token ,Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted,
    ],
    controller.signup
  );

  app.post("/api/auth/signin", controller.signin);

  app.post("/api/auth/signout", controller.signout);

  app.post(
    "/api/auth/appointment/add",
    [authJwt.verifyToken],
    controller.appointmentAdd
  );

  app.get(
    "/api/auth/appointment/get",
    [authJwt.verifyToken],
    controller.getAppointments
  );

  app.get(
    "/api/auth/appointment/getAll",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.getAllAppointments
  );

  app.delete(
    "/api/auth/appointment/delete",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.appointmentDelete
  );

  app.put(
    "/api/auth/appointment/updateStatus",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.updateAppointmentStatus
  );
};
