console.log("package info : Adapter-Specific Errors");

/**
 Should handle how to present errors to users, referencing core and infrastructure-related errors
 without introducing new ones.
 HTTP-Specific Errors: The controller layer can also handle HTTP-related errors,
 such as those arising from client requests. However, these should still reference
 domain or infrastructure-related errors without defining new custom exceptions.
 */