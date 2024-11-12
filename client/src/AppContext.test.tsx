import React, { useContext } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { AppProvider, AppContext } from "./context/AppContext";
import AddExpenseForm from "./components/Expense/AddExpenseForm";
import Remaining from "./components/Remaining";
import ExpenseTotal from "./components/Expense/ExpenseTotal";
import ExpenseItem from "./components/Expense/ExpenseItem";
import { JSX } from "react/jsx-runtime";
import App from "./App";
import { Button } from "react-bootstrap";
import Budget from "./components/Budget/Budget";
  
describe("Budget Tracking App", () => {
  test("1. Create Expense", () => {
    render(
        <App />
    );

    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: "Groceries" },
    });
    fireEvent.change(screen.getByLabelText(/cost/i), {
      target: { value: "50" },
    });
    fireEvent.click(screen.getByText(/Save/i));

    expect(screen.getByText("Groceries")).toBeInTheDocument();
    expect(screen.getByText("$50")).toBeInTheDocument();
    expect(screen.getByText(/Spent so far: \$50/)).toBeInTheDocument();
    expect(screen.getByText(/Remaining: \$950/)).toBeInTheDocument();
  });

  test("2. Delete Expense", () => {
    render(
        <App />
    );

    fireEvent.change(screen.getByLabelText(/name/i), {
        target: { value: "Groceries" },
      });
      fireEvent.change(screen.getByLabelText(/cost/i), {
        target: { value: "50" },
      });
      fireEvent.click(screen.getByText(/Save/i));

    fireEvent.click(screen.getByRole('button', {name: /x/i}));

    expect(screen.queryByText("Groceries")).not.toBeInTheDocument();
    expect(screen.getByText(/Spent so far: \$0/)).toBeInTheDocument();
    expect(screen.getByText(/Remaining: \$100/)).toBeInTheDocument();
  });

  test("3. Budget Balance Verification", () => {
    render(
        <App />
    );

    const budget = 1000
    let totalExpenses = 0;
    let remaining = 1000;

    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: "Groceries" },
    });
    fireEvent.change(screen.getByLabelText(/cost/i), {
      target: { value: "50" },
    });
    fireEvent.click(screen.getByText(/Save/i));

    fireEvent.change(screen.getByLabelText(/name/i), {
        target: { value: "Rent" },
      });
    fireEvent.change(screen.getByLabelText(/cost/i), {
        target: { value: "200" },
      });
    fireEvent.click(screen.getByText(/Save/i));

    expect(screen.getByText(/Spent so far: \$250/)).toBeInTheDocument();
    expect(screen.getByText(/Remaining: \$750/)).toBeInTheDocument();

    totalExpenses = 250;
    remaining = 750;

    const calculatedBudget1 = totalExpenses + remaining;
    expect(calculatedBudget1).toBe(budget);

    const deleteButtons = screen.getAllByRole('button', {name: /x/i});
    fireEvent.click(deleteButtons[0]);

    expect(screen.queryByText("Groceries")).not.toBeInTheDocument();
    expect(screen.getByText(/Spent so far: \$200/)).toBeInTheDocument();
    expect(screen.getByText(/Remaining: \$800/)).toBeInTheDocument();
    
    totalExpenses = 200;
    remaining = 800;
    const calculatedBudget2 = totalExpenses + remaining;
    expect(calculatedBudget2).toBe(budget);
  });
});