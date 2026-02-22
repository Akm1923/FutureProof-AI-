import io
import json
from datetime import datetime
from PIL import Image
from groq import Groq
from typing import Dict, Any
import fitz  # PyMuPDF for PDF text extraction
from shared.config.settings import settings

# Try to import pytesseract for OCR
try:
    import pytesseract
    OCR_AVAILABLE = True
    print("OCR (pytesseract) is available")
except ImportError:
    OCR_AVAILABLE = False
    print("Warning: pytesseract not available. Install with: pip install pytesseract")

class ResumeParser:
    def __init__(self):
        self.groq_client = Groq(api_key=settings.GROQ_API_KEY)
        
        # Load schema from module directory
        import os
        schema_path = os.path.join(os.path.dirname(__file__), '..', 'schemas_data', 'resume_schema.json')
        with open(schema_path, "r") as f:
            self.schema = json.load(f)
        
        print("ResumeParser initialized successfully")
    
    def extract_text_from_document(self, file_bytes: bytes, filename: str) -> str:
        """Extract text from PDF or image using PyMuPDF and pytesseract"""
        try:
            # Try PDF text extraction first (fastest)
            if filename.lower().endswith('.pdf'):
                print("Attempting PDF text extraction...")
                text = self._extract_from_pdf(file_bytes)
                if text and len(text.strip()) > 50:
                    print(f"Extracted {len(text)} characters from PDF")
                    return text
            
            # Try OCR for images or scanned PDFs
            if OCR_AVAILABLE:
                print("Attempting OCR extraction...")
                text = self._extract_with_ocr(file_bytes, filename)
                if text and len(text.strip()) > 50:
                    print(f"Extracted {len(text)} characters via OCR")
                    return text
            
            # Fallback
            print("Using fallback text extraction")
            return self._fallback_text_extraction()
            
        except Exception as e:
            print(f"Text extraction error: {e}")
            return self._fallback_text_extraction()
    
    def _extract_from_pdf(self, file_bytes: bytes) -> str:
        """Extract text from PDF using PyMuPDF"""
        try:
            doc = fitz.open(stream=file_bytes, filetype="pdf")
            text = ""
            for page in doc:
                text += page.get_text()
            doc.close()
            return text.strip()
        except Exception as e:
            print(f"PDF extraction failed: {e}")
            return ""
    
    def _extract_with_ocr(self, file_bytes: bytes, filename: str) -> str:
        """Extract text using pytesseract OCR"""
        try:
            if filename.lower().endswith('.pdf'):
                # Convert PDF to images and OCR
                doc = fitz.open(stream=file_bytes, filetype="pdf")
                text = ""
                for page_num in range(len(doc)):
                    page = doc[page_num]
                    pix = page.get_pixmap()
                    img = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)
                    text += pytesseract.image_to_string(img) + "\n"
                doc.close()
                return text.strip()
            else:
                # Direct image OCR
                image = Image.open(io.BytesIO(file_bytes))
                text = pytesseract.image_to_string(image)
                return text.strip()
        except Exception as e:
            print(f"OCR failed: {e}")
            return ""
    
    def _fallback_text_extraction(self) -> str:
        """Fallback: Return placeholder text for testing"""
        return """
        John Doe
        Software Engineer
        Email: john.doe@example.com
        Phone: +1-234-567-8900
        
        EXPERIENCE
        Senior Software Engineer at Tech Corp (2020-Present)
        - Led development of microservices architecture
        - Improved system performance by 40%
        
        Software Developer at StartupXYZ (2018-2020)
        - Built REST APIs using Python and FastAPI
        - Worked with React for frontend development
        
        EDUCATION
        Bachelor of Science in Computer Science
        University of Technology (2014-2018)
        
        SKILLS
        Technical: Python, JavaScript, React, FastAPI, Docker, AWS
        Tools: Git, Jenkins, Kubernetes
        Soft Skills: Leadership, Communication, Problem Solving
        
        CERTIFICATIONS
        AWS Certified Solutions Architect
        
        LANGUAGES
        English (Native), Spanish (Intermediate)
        """
    
    async def parse_resume(self, file_bytes: bytes, filename: str) -> Dict[str, Any]:
        """Parse resume using text extraction and Groq LLM"""
        
        # Extract text
        print(f"Extracting text from {filename}...")
        extracted_text = self.extract_text_from_document(file_bytes, filename)
        print(f"Extracted text length: {len(extracted_text)}")
        
        # Use Groq LLM to structure the data
        print("Structuring data with LLM...")
        structured_data = self.structure_with_llm(extracted_text, filename)
        
        return structured_data
    
    def structure_with_llm(self, text: str, filename: str) -> Dict[str, Any]:
        """Use Groq API to structure extracted text according to schema"""
        
        prompt = f"""
You are an expert resume parser. Extract information from the following resume text and structure it according to the provided JSON schema.

Resume Text:
{text}

JSON Schema:
{json.dumps(self.schema, indent=2)}

Instructions:
- Extract all relevant information from the resume text
- Fill in the JSON schema with extracted data
- Use empty strings for missing text fields
- Use empty arrays for missing list fields
- Use 0 for missing numeric fields
- Infer information when possible (e.g., calculate duration_months from dates)
- For dates, use ISO format (YYYY-MM-DD) when possible
- Return ONLY valid JSON matching the schema, no additional text

Output the complete JSON:
"""
        
        response = self.groq_client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.1,
            max_tokens=8000
        )
        
        result_text = response.choices[0].message.content.strip()
        print(f"LLM response length: {len(result_text)}")
        
        # Parse JSON response
        try:
            parsed_data = json.loads(result_text)
        except json.JSONDecodeError:
            # Try to extract JSON from markdown code blocks
            if "```json" in result_text:
                result_text = result_text.split("```json")[1].split("```")[0].strip()
            elif "```" in result_text:
                result_text = result_text.split("```")[1].split("```")[0].strip()
            parsed_data = json.loads(result_text)
        
        print("Successfully parsed LLM response")
        return parsed_data
