module.exports = function makeUserUpdateAction({ updateUser }) {
    return async function userUpdateAction(req, res) {
      try {
        const id = req.params.id;
        const updateUserData = req.body;
        await updateUser({ updateUserData, id });
        res.status(201).json({
          status: "Success",
          data: `User Data is Updated for id = ${id}`
        });
      } catch (err) {
        res.status(404).json({
          status: "Fail",
          data: "Failed to update user data"
        });
      }
    };
  };
  