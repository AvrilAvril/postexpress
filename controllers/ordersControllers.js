const pool = require("../dbconfig");

module.exports = {
  deleteById: async (req, res) => {
    const { id } = req.params;

    try {
      const queryString = 'DELETE FROM "orders" WHERE id=$1';
      await pool.query(queryString, [id]);
      res.json({
        code: 200,
        message: "deleted order correctly with id " + id,
      });
    } catch (e) {
      console.error(Error(e));
      res.status(500).json({
        code: 500,
        message: "Error trying to delete a order with id " + id,
      });
    }
  },
  updateById: async (req, res) => {
    const { id } = req.params;
    const { price, user_id } = req.body;
    // validation

    try {
      const queryString =
        'UPDATE "orders" SET price=$1, user_id=$2 WHERE id=$3;';
      await pool.query(queryString, [price, user_id, id]);
      res.json({
        code: 200,
        message: "updated order correctly with id " + id,
      });
    } catch (e) {
      res.status(500).json({
        code: 500,
        message: "Error trying to update order with id " + id,
      });
    }
  },
  create: async (req, res) => {
    const { user_id, price } = req.body;
    // validation on the fields
    // if statement to check that all 3 exist, that they are not empty
    try {
      const queryString =
        'INSERT INTO "orders" (user_id, price) VALUES ($1, $2) RETURNING *;';
      const dbResponse = await pool.query(queryString, [user_id, price]);
      res.json({
        code: 200,
        message: "Inserted order correctly",
        data: dbResponse.rows[0],
      });
    } catch (e) {
      res.status(500).json({
        code: 500,
        message: "Error trying to insert a new order",
      });
    }
  },
  /*deleteByUserId: async (req, res, next) => {
    const { id } = req.params;
    try {
      const queryString = 'DELETE FROM "orders" WHERE user_id = $1;';
      const dbResponse = await pool.query(queryString, [id]);
      next();
    } catch (e) {
      console.error(Error(e));
      res.status(500).json({
        error: "Could not delete orders for user of id " + id,
        code: 500,
      });
    }
  },*/
  getById: async (req, res) => {
    const { id } = req.params;
    try {
      const dbResponse = await pool.query(
        "SELECT * FROM orders JOIN users ON users.id = orders.user_id  WHERE orders.id=$1",
        [id]
      );
      res.json({
        message: "Successfully found order with id " + id,
        code: 200,
        description: "Order with id " + id,
        data: dbResponse.rows[0],
      });
    } catch (e) {
      console.error(Error(e));
      res.sendStatus(e.code);
    }
  },
  getAll: async (_, res) => {
    try {
      const dbResponse = await pool.query(
        "SELECT * FROM orders JOIN users ON users.id = orders.user_id"
      );
      res.json({
        message: "Successfully found all orders",
        code: 200,
        description: "Array of all orders in db",
        data: dbResponse.rows,
      });
    } catch (e) {
      console.error(Error(e));
      res.sendStatus(500);
    }
  },
};
