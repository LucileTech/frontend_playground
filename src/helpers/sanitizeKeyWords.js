//Function Composition  involves combining multiple functions to create a new function
const sanitizeInput = (input) => {
    let sanitizedInput = input.toLowerCase(); // Sanitize input without changing the original state
    return sanitizedInput;
};

export {sanitizeInput}