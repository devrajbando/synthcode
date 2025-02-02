const BASE_URL = "https://emkc.org/api/v2/piston";

// Fetch available language versions
const getLanguageVersions = async () => {
  try {
    const response = await fetch(`${BASE_URL}/runtimes`);
    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const runtimes = await response.json();
    const versions = {};

    // Map language versions
    runtimes.forEach(({ language, version }) => {
      versions[language] = version;
    });

    return versions;
  } catch (error) {
    console.error("Failed to fetch language versions:", error);
    return null;
  }
};

// Execute code with correct version
export const executeCode = async (language, sourceCode) => {
  try {
    // Fetch the latest language versions dynamically
    const versions = await getLanguageVersions();
    if (!versions || !versions[language]) {
      throw new Error(`Unsupported language or version not found: ${language}`);
    }

    const response = await fetch(`${BASE_URL}/execute`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        language: language,
        version: versions[language], // Correct version from API
        files: [{ content: sourceCode }],
      }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error("Execution Error:", error);
    throw error;
  }
};
