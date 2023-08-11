module.exports = function makeUserUpdateAction({ updateUser }) {
  return async function userUpdateAction(req, res) {
    try {
      const id = req.params.id;
      const updateUserData = req.body;
      await updateUser({ updateUserData, id });
      res.status(200).json({
        status: "Success",
        Data: { message: "User Updated Successfully" }
      });
    }
    catch (err) {
      res.status(400).json({
        status: "Fail",
        data: { error: err }
      })
    }
  }
}
