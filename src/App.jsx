import Footer from "./components/Footer";
import Header from "./components/Header";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { useForm } from "react-hook-form";
import sample from "./components/format";

function App() {
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset, watch } = useForm();
  const apiKey = "AIzaSyBFejEagIo2nGWJohlw3TI1Kyci3eBv23Q";

  const onSubmit = async (data) => {
    setLoading(true);

    console.log(data.input);
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" +
        apiKey,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text:
                    "find the right career path for me based on my interests and skills: " +
                    data.input +
                    JSON.stringify(sample) +
                    "format the response in JSON",
                },
              ],
            },
          ],
        }),
      }
    );

    const json = await response.json();
    const responseText = json.candidates[0].content.parts[0].text;
    let cleanerResponse = responseText.replace(/```json/g, "").trim();
    cleanerResponse = cleanerResponse.replace(/```/g, "");
    const parsejson = JSON.parse(cleanerResponse);
    console.log(parsejson);
    setResponse(parsejson);

    setLoading(false);

    reset();
  };
  return (
    <>
      <Header />
      <main>
        <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-md mt-10">
          <h1 className="text-2xl font-bold mb-4 text-center">
            Career Path Advisor
          </h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <textarea
              className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your interests or skills..."
              {...register("input", { required: true })}
            />
            <button className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition">
              {loading ? "Loading..." : "Find the Right Path"}
            </button>
          </form>
        </div>
        {loading && (
          <div className="flex justify-center mt-4">
            <ClipLoader color="#36d7b7" size={50} />
          </div>
        )}
        {!loading && response && (
          <div
            className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-md mt-10 lg:min-w-3xl
          md:min-w-2xl sm:min-w-xl xl:min-w-4xl mb-20"
          >
            <h2 className="text-xl font-bold mb-4">Career Path Suggestions</h2>
            <p className="font-semibold mb-2">
              Based on your inputs I will suggest there carrer paths that align
              with your interests and skills.
            </p>

            <h3 className="text-lg font-bold mt-4">Recommended Careers:</h3>
            <ul className="list-disc list-inside">
              {response.CareerPaths.map((career, index) => (
                <li key={index} className="mb-2">
                  <span className="font-semibold">{career.Title}</span>
                  {":  "}
                  <span className="text-gray-600">{career.Description}</span>
                </li>
              ))}
            </ul>

            <h3 className="text-lg font-bold mt-4 mb-6">Important consederations:</h3>
            <ul className="list-disc list-inside">
              {response.ImportantConsiderations.map((consideration, index) => (
                <li key={index} className="mb-2">
                  {consideration}
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}

export default App;
