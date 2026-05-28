import mammoth from "mammoth";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";

export async function extractResumeText(file) {
  if (!file) {
    throw new Error("No file provided");
  }

  const extension = file.originalname.split(".").pop()?.toLowerCase();

  // PDF Parsing
  if (extension === "pdf") {
    try {
      const uint8Array = new Uint8Array(file.buffer);

      const pdf = await pdfjsLib.getDocument({
        data: uint8Array,
      }).promise;

      let text = "";

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);

        const content = await page.getTextContent();

        const strings = content.items.map((item) => item.str);

        text += strings.join(" ");
      }

      if (!text.trim()) {
        throw new Error("Could not extract text from PDF");
      }

      return text;
    } catch (error) {
      console.error("PDF Parse Error:", error);
      throw new Error("Failed to parse PDF file");
    }
  }

  // DOCX Parsing
  if (extension === "docx") {
    try {
      const result = await mammoth.extractRawText({
        buffer: file.buffer,
      });

      if (!result.value?.trim()) {
        throw new Error("Could not extract text from DOCX");
      }

      return result.value;
    } catch (error) {
      console.error("DOCX Parse Error:", error);
      throw new Error("Failed to parse DOCX file");
    }
  }

  throw new Error("Unsupported file format. Upload PDF or DOCX.");
}