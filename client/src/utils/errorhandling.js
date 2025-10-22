export const handleApiError = (err) => {
    console.error("API Error:", err);
  
    if (err.response) {
      // Server responded with status code outside 2xx
      switch(err.response.status){
        case 401: return "Invalid username or password.";
        case 404: return "Requested resource not found.";
        case 500: return "Server is unavailable. Try later.";
        default: return `Unexpected server error: ${err.response.status}`;
      }
    } else if (err.request) {
      // Request was made but no response
      return "Network issue. Check your connection.";
    } else {
      // Something else
      return "Something went wrong. Please try again.";
    }
  };