import express from "express";
const app = express();

import employees from "./db/employees.js";
app.use(express.json());

export default app;

app.route("/").get((req, res) => {
  res.send("Hello employees!");
});

app.route("/employees").get((req, res) => {
  res.send(employees);
});

app.route("/employees").post((req, res) => {
  if (!req.body) {
    return res.status(400).send("Request body is required.");
  }

  const { name } = req.body;

  if (!name || name.trim() === "") {
    return res.status(400).send("Name is required and cannot be empty.");
  }

  const maxId =
    employees.length > 0 ? Math.max(...employees.map((emp) => emp.id)) : 0;
  const newEmployee = {
    id: maxId + 1,
    name: name.trim(),
  };

  employees.push(newEmployee);
  res.status(201).send(newEmployee);
});

// Note: this middleware has to come first! Otherwise, Express will treat
// "random" as the argument to the `id` parameter of /employees/:id.
app.route("/employees/random").get((req, res) => {
  const randomIndex = Math.floor(Math.random() * employees.length);
  res.send(employees[randomIndex]);
});

app.route("/employees/:id").get((req, res) => {
  const { id } = req.params;

  // req.params are always strings, so we need to convert `id` into a number
  // before we can use it to find the employee
  const employee = employees.find((e) => e.id === +id);

  if (!employee) {
    return res.status(404).send("Employee not found");
  }

  res.send(employee);
});
