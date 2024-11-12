import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { updateBudget } from "../../utils/budget-utils";

const Budget = () => {
  const { budget, setBudget } = useContext(AppContext); // Assuming `setBudget` is available in context for updating
  const [newBudget, setNewBudget] = useState("");

  const handleUpdateBudget = async () => {
    try {
        const updatedBudget = await updateBudget(parseFloat(newBudget));
        setBudget(updatedBudget); // Update the budget in the context
        setNewBudget(""); // Clear the input field
    } catch (error) {
        console.error("Failed to update budget:", error);
    }
};

  return (
    <div className="alert alert-secondary p-3 d-flex align-items-center justify-content-between">
      <div>Budget: ${budget}</div>
      <div className="d-flex align-items-center">
        <input
          type="number"
          value={newBudget}
          onChange={(e) => setNewBudget(e.target.value)}
          placeholder="Enter new budget"
          className="form-control me-2"
        />
        <button onClick={handleUpdateBudget} className="btn btn-primary">
          Update Budget
        </button>
      </div>
    </div>
  );
};

export default Budget;