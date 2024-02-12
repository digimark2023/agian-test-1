export const sendContactForm = async (data) => {
  try {
    const response = await fetch("/api/nodeemail", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    // Attempt to parse the response as JSON
    const responseData = await response.json();

    if (!response.ok) {
      console.log("LOG:" + response.text);
      throw new Error(
        responseData.message || "An error occurred while sending the form."
      );
    }

    return responseData;
  } catch (error) {
    // Handle errors, including parsing errors due to invalid JSON
    console.error("Error occurred:", error);
    throw new Error("Failed to send message. Please try again.");
  }
};
