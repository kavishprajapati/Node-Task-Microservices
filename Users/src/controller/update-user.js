module.exports = function makeUserUpdateAction({ updateUser }) {
    return async function userUpdateAction(req, res) {
      try {
        const id = req.params.id;
        const updateUserData = req.body;
        await updateUser({ updateUserData, id });
        res.status(200).json({
          status: "Success",
          data: `User Data is Updated for id = ${id}`
        });
      } catch (err) {
        res.status(400).json({
          status: "Fail",
          data: "Failed to update user data"
        });
      }
    };
  };
  