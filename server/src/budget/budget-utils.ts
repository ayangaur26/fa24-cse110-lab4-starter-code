import { Response } from 'express';

// Function to get the budget
export function getBudget(res: Response, budget: number) {
    res.status(200).send({ "data": budget });
}

// Function to update the budget
export function updateBudget(res: Response, body: any, budget: { amount: number }) {
    // TO DO: Implement updateBudget function
    const { amount } = body;

    // Validate the amount to ensure it's a positive number
    if (typeof amount !== "number" || amount < 0) {
        return res.status(400).send({ error: "Invalid budget amount" });
    }

    // Update the budget
    budget.amount = amount;

    // Send the updated budget back as confirmation
    res.status(200).send({ data: budget.amount });
}