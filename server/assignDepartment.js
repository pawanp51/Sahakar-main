const { HfInference } = require("@huggingface/inference");
const axios = require("axios");

const hf = new HfInference("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");

const BASE_URL = "http://localhost:3000/api";

async function classifyDepartment(description) {
  const prompt = `You are an AI system that categorizes complaints into one of these government departments:\n
    - Electricity\n
    - Gas Supply Department\n
    - Civil Department\n
    - Public Works Department\n
    - Urban Planning Department\n
    - Emergency Services\n\n
    If none of these departments are suitable, respond with 'Uncategorized' only.\n\n
    Complaint: ${description}\n
    Department:`;

  try {
    const response = await hf.textGeneration({
      model: "meta-llama/Llama-3.2-1B",
      inputs: prompt,
      parameters: { max_new_tokens: 30, return_full_text: false },
    });

    if (response && response.generated_text) {
      let generatedText = response.generated_text.trim();
      console.log("Raw generated text:", generatedText);

      const match = generatedText.match(
        /^(Electricity|Gas Supply Department|Civil Department|Public Works Department|Urban Planning Department|Emergency Services|Uncategorized)/i
      );

      if (match) {
        return match[0];
      } else {
        console.warn("Invalid department in response. Defaulting to 'Uncategorized'.");
        return "Uncategorized";
      }
    }
  } catch (error) {
    console.error("Error in classifyDepartment:", error);
    return "Uncategorized";
  }
}


async function processComplaints() {
  try {
    console.log("Fetching complaints...");
    const { data: complaints } = await axios.get(`${BASE_URL}/complaints`);

    const unclassifiedComplaints = complaints.filter(
      (complaint) => !complaint.department
    );

    for (const complaint of unclassifiedComplaints) {
      const { _id, description } = complaint;

      console.log("Processing complaint:", description);
      const department = await classifyDepartment(description);

      console.log(`Assigned '${description}' to department: '${department}'`);

      await axios.put(`${BASE_URL}/complaints/${_id}`, { department });
    }
  } catch (error) {
    console.error("Error processing complaints:", error.message);
  }
}

processComplaints()