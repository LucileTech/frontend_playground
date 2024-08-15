const sanitizeInput = (input) => {
    let sanitizedInput = input.trim().toLowerCase(); // Sanitize input without changing the original state
    return sanitizedInput;
};

export {sanitizeInput}