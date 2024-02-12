import { Configuration, OpenAIApi } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";

// Create an OpenAI API client (that's edge friendly!)
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

// Set the runtime to edge for best performance
export const runtime = "edge";

export async function POST(req: Request) {
  //const { vibe, bio } = await req.json();
  const {
    vibe,
    messages,
    wordCount,
    q1,
    q2,
    q3,
    q4,
    q5,
    q6,
    q7,
    q8,
    q9,
    q10,
    q11,
    interest,
    mmmm,
    QbudgetRange,
    qCompNiche,
    QtargetAudience,
    age,
    gender,
    selectedQualification,
    selectedJob,
    EXP,
    q_uniqueSkills,
  } = await req.json();
  const bio = messages.at(-1).content;
  console.log("LOG DATA:");
  console.log("messages:", messages);
  console.log("q1:", q1);
  console.log("q2:", q2);
  console.log("q3:", q3);
  console.log("q4:", q4);
  console.log("q5:", q5);
  console.log("q6:", q6);
  console.log("q7:", q7);
  console.log("q8:", q8);
  console.log("q9:", q9);
  console.log("q10:", q10);
  console.log("q11:", q11);
  console.log("QbudgetRange:", QbudgetRange);
  console.log("Target Users", QtargetAudience);
  console.log("qCompNiche:", qCompNiche);
  console.log("bio:", bio);
  console.log("vibe:", bio);
  console.log("interest:", interest);
  console.log("age:", age);
  console.log("gender:", gender);
  console.log("selectedQualification:", selectedJob);
  console.log("Experience:", EXP);
  console.log("uniqueSkills:", q_uniqueSkills);
  console.log("selectedQualification:", selectedQualification);

  // Ask OpenAI for a streaming completion given the prompt
  const response = await openai.createChatCompletion({
    //model: "gpt-4",
    model: "gpt-3.5-turbo",
    stream: true,
    messages: [
      {
        role: "user",
        content: `I want you to act as Comprehensive Business Idea Generator

        My business requirement is : ${bio}
        Input Summary:
        Personal Information:
      - Age: ${age}
      - Gender: ${gender}
      - Educational Qualification: ${selectedQualification}
      - Experience: ${EXP} (Please mention the field if applicable)
      - Current Job: ${selectedJob} (If not working, mention 'Not Applicable')
      - Special Skills: ${q_uniqueSkills} (Mention any skills that could be relevant to business)

        Business Requirements:
       
        What excites you? ${q1}
        What can you do well? ${q2}
        Where can you start your business? ${q3}
        How much can you invest? ${q4}
        How much time can you dedicate? ${q5}
        What is your risk tolerance? ${q6}
        Who is your target audience? ${q7}
        Preference: Competitive or niche market? ${qCompNiche}
        What is your long-term vision? ${q9}
        Who and what resources are available to you? ${q10}
        Budget Range in INR? ${QbudgetRange}
        Additional Notes: ${q11}
       
        Vibe: ${
          vibe === "Funny"
            ? "Include humor and a light-hearted tone."
            : "Professional and serious tone."
        }
        
        Task:
        First provide the analysis in  of inputs proviuded.  
        Generate 2 Tailored Business Ideas based on the above inputs. Each idea should:
        
        Align with the provided interests, skills, location, investment capacity, time commitment, risk tolerance, target market, competitive landscape, long-term goals, and support network.
        Be clearly labeled as '1:',and '2:'
        Present each idea in concise, structured sentences.
        Integrate the provided context seamlessly into each business idea.
        Add humor and a light-hearted tone if specified, otherwise maintain a professional approach. 

        
      `,
      },
    ],
  });
  console.log("RESPONSE:");
  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);
  // Respond with the stream
  return new StreamingTextResponse(stream);
}

// Task:
// First provide the analysis in  of inputs proviuded.
// Generate 2 Tailored Business Ideas based on the above inputs. Each idea should:

// Align with the provided interests, skills, location, investment capacity, time commitment, risk tolerance, target market, competitive landscape, long-term goals, and support network.
// Be clearly labeled as '1:',and '2:'
// Present each idea in concise, structured sentences.
// Include a detailed estimated budget in INR and a comprehensive analysis.
// Integrate the provided context seamlessly into each business idea.
// Add humor and a light-hearted tone if specified, otherwise maintain a professional approach. Provide budget cost deatis in bullets points to easyly understable as below example fromat:
// `,
// Please adjust the deatils in table format.
// Revenue: $105,000 (Sales: $100,000, Other: $5,000).
// Fixed Costs: $46,800 (Salaries: $40,000, Utilities: $1,200, Insurance: $2,000, Loan: $3,600).
// Variable Costs: $37,000 (Materials: $20,000, Marketing: $10,000, Shipping: $5,000, Operations: $2,000).
// One-Time Costs: $3,500 (Equipment: $3,000, Licensing: $500).
// Emergency Fund: $5,000.
// Profit: $12,700.
// Goals: Increase web traffic, expand product line.
// Review: Monthly and quarterly.
