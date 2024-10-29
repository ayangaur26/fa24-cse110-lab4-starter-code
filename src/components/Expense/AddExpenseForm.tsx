import React, { useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";
const AddExpenseForm = () => {
  // Exercise: Consume the AppContext here
  const { expenses, setExpenses } = useContext(AppContext); // Accessing the context
  const [name, setName] = useState(""); // State for expense name
  const [cost, setCost] = useState(""); // State for expense cost

  // Exercise: Create name and cost to state variables

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newExpense = {
      id: Math.random().toString(36).substr(2, 9), // Unique id generation
      name: name,
      cost: parseFloat(cost),
    };

    // Add the new expense to the existing expenses array
    setExpenses([...expenses, newExpense]);

    // Reset form inputs
    setName("");
    setCost("");

    // Exercise: Add add new expense to expenses context array
  };

  return (
    <form onSubmit={(event) => onSubmit(event)}>
      <div className="row">
        <div className="col-sm">
          <label htmlFor="name">Name</label>
          <input
            required
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>
        </div>
        <div className="col-sm">
          <label htmlFor="cost">Cost</label>
          <input
            required
            type="text"
            className="form-control"
            id="cost"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
          ></input>
        </div>
        <div className="col-sm">
          <button type="submit" className="btn btn-primary mt-3">
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddExpenseForm;
