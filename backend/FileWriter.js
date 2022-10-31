const { writeFile } = require("fs/promises");

module.exports = async (filePath, content) => {
  try {
    return await writeFile(filePath, content);
  } catch (error) {
    console.error(`File reading error: ${error.message}`);
  }
};