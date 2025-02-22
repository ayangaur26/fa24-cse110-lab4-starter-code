import { API_BASE_URL } from "../constants/constants";

// Function to get budget from the backend. Method: GET
export const fetchBudget = async (): Promise<number> => {
    const response = await fetch(`${API_BASE_URL}/budget`);
    if (!response.ok) {
        throw new Error("Failed to fetch budget");
    }
    const data = await response.json();
    return data.amount;
};

export const updateBudget = async (amount: number): Promise<number> => {
	const response = await fetch(`${API_BASE_URL}/budget`, {
    	method: "PUT",
    	headers: {
        	"Content-Type": "application/json",
    	},
    	body: JSON.stringify({ amount }),
	});

	if (!response.ok) {
    	throw new Error("Failed to update budget");
	}

	// Return the updated budget amount
	const data = await response.json();
	return data.data; // Assume "data" field holds the updated budget
};