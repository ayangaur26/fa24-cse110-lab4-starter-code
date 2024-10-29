import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";

const Remaining = () => {
  const { expenses, budget } = useContext(AppContext);
  const [showAlert, setShowAlert] = useState(false);

  const totalExpenses = expenses.reduce((total, item) => {
    return (total = total + item.cost);
  }, 0);

  const remainingBalance = budget - totalExpenses;

  const alertType = totalExpenses > budget ? "alert-danger" : "alert-success";

  const alertClass = remainingBalance < 0 ? "alert-danger" : "alert-success";
  // Exercise: Create an alert when Remaining is less than 0.
  useEffect(() => {
    if (remainingBalance < 0) {
      alert("You have exceeded your budget!");
    }
  }, [remainingBalance]);

  return (
    <div>
      <div className={`alert ${alertType} ${alertClass}`}>
        <span>Remaining: ${remainingBalance}</span>
      </div>
    </div>
  );
};

export default Remaining;
