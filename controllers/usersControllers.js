const pool = require("../db.config");

module.exports = {
  deleteById: async (req, res) => {
    const { id } = req.params;

    try {
      const queryString = 'DELETE FROM "users" WHERE id=$1';
      await pool.query(queryString, [id]);
      res.json({
        code: 200,
        message: "deleted user correctly with id " + id,
      });
    } catch (e) {
      console.error(Error(e));
      res.status(500).json({
        code: 500,
        message: "Error trying to delete a user with id " + id,
      });
    }
  },
  updateById: async (req, res) => {
    const { id } = req.params;
    const { first_name, last_name, age } = req.body;
    // validation

    try {
      const queryString =
        'UPDATE "users" SET first_name=$1, last_name=$2, age=$3 WHERE id=$4;';
      await pool.query(queryString, [first_name, last_name, age, id]);
      res.json({
        code: 200,
        message: "updated user correctly with id " + id,
      });
    } catch (e) {
      res.status(500).json({
        code: 500,
        message: "Error trying to update user with id " + id,
      });
    }
  },
  create: async (req, res) => {
    const { first_name, last_name, age } = req.body;
    // validation on the fields
    // if statement to check that all 3 exist, that they are not empty
    if (!first_name.trim().length || !last_name.trim().length || !age) {
      res.status(400).json({
        error: "Fields are invalid",
        code: 400,
      });
      return;
    }
    try {
      const queryString =
        'INSERT INTO "users" (first_name, last_name, age) VALUES ($1, $2, $3) RETURNING *;';
      const dbResponse = await pool.query(queryString, [
        first_name,
        last_name,
        age,
      ]);
      res.json({
        code: 200,
        message: "Inserted user correctly",
        data: dbResponse.rows[0],
      });
    } catch (e) {
      res.status(500).json({
        code: 500,
        message: "Error trying to insert a new user",
      });
    }
  },
  getById: async (req, res) => {
    const { id } = req.params;
    try {
      const dbResponse = await pool.query("SELECT * FROM users WHERE id=$1", [
        id,
      ]);
      if (typeof "aria" == "string") {
        throw { code: 404 };
      }
      if (!Number.isInteger(id)) {
        throw { code: 400 };
      }
      res.json({
        message: "Successfully found user with id " + id,
        code: 200,
        description: "User with id " + id,
        data: dbResponse.rows[0],
      });
    } catch (e) {
      console.error(Error(e));
      res.sendStatus(e.code);
    }
  },
  getAll: async (_, res) => {
    try {
      const dbResponse = await pool.query("SELECT * FROM users");
      res.json({
        message: "Successfully found all users",
        code: 200,
        description: "Array of all users in db",
        data: dbResponse.rows,
      });
    } catch (e) {
      console.error(Error(e));
      res.sendStatus(500);
    }
  },
};
