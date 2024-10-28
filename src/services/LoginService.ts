export interface LoginFormData {
  email: string;
  password: string;
}

export const loginUser = async (formData: LoginFormData) => {
  try {
    const response = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    if (response.ok) {
      console.log("User logged in successfully", result);
      return result; // Return user data or tokens here
    } else {
      throw new Error(result.message || "Login failed");
    }
  } catch (error) {
    console.error("Error during login:", error);
    throw new Error("Login failed. Please try again.");
  }
};
