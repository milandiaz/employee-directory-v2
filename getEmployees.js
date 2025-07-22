// Import the express library
import express from "express";

// Create a router
const router = express.Router();

// Export the router
export default router;

// import functions from ../db/numbers.js
import { getEmployees, addEmployee } from "./employees.js";

// Express v5 will implicitly add the try/catch to this route
// Multiple methods for the same route -> chain the middleware functions together... get and post
router
  .route("/")
  .get((req, res) => {
    const employees = getEmployees();
    res.send(employees);
  })
  .post((req, res) => {
    if (!req.body) return res.status(400).send("Request body is required");
    // Use regex (regular expressions) to check if the number is all digits
    if (!req.body || !req.body.name) {
      return res.status(400).send("Name is not correctly provided.");
    }

    const newEmployee = addEmployee(req.body.name);
    res.status(201).send(employee);
  });
