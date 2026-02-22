You are a Senior Software Architect and Technical Documentation Expert.

Your task is to analyze my entire project and generate a COMPLETE but BRIEF architecture document suitable for:
- developers onboarding the project
- future scaling
- technical reviews
- hackathon or startup documentation

The output should be structured as a professional ARCHITECTURE.md file.

IMPORTANT:
Do NOT write generic explanations.
Base everything strictly on the actual project structure and code.

--------------------------------------------------

DOCUMENT GOALS
Create a clear, concise, engineering-level architecture overview explaining:

1. System structure
2. Component responsibilities
3. User flow
4. Data flow
5. Module interaction
6. Scalability design
7. Extensibility approach

Keep explanations brief but technically meaningful.

--------------------------------------------------

SECTIONS TO INCLUDE

# 1. Project Overview
- Purpose of the system
- Problem it solves
- High-level system description

# 2. High-Level Architecture
- Frontend + Backend overview
- Major subsystems
- Communication pattern (API, events, etc.)

Include ASCII architecture diagram like:

        +-----------+
        |  Frontend |
        +-----+-----+
              |
              v
        +-----------+
        |  Backend  |
        +-----+-----+
              |
              v
          Database

--------------------------------------------------

# 3. Folder Structure
Provide actual project tree:

frontend/
backend/
shared/

Explain responsibility of each major folder briefly.

--------------------------------------------------

# 4. Component Architecture
For EACH major feature/module:

Explain:
- responsibility
- inputs
- outputs
- dependencies
- internal layers

Also include ASCII diagram per component.

Example:

Auth Module
------------
+-----------+
|  Routes   |
+-----+-----+
      |
      v
+-----------+
| Service   |
+-----+-----+
      |
      v
+-----------+
| Database  |
+-----------+

--------------------------------------------------

# 5. Frontend Architecture
Explain:
- routing
- state management
- API communication
- reusable components
- feature modularization

Include diagram showing component hierarchy.

--------------------------------------------------

# 6. Backend Architecture
Explain:
- controllers
- services
- models
- middleware
- database interaction

Include request lifecycle ASCII diagram.

--------------------------------------------------

# 7. User Flow
Describe step-by-step journey of a user.

Example:
User → Login → Dashboard → Feature → API → Response

Include ASCII flow diagram.

--------------------------------------------------

# 8. Data Flow
Explain how data moves through system:
- client → API → processing → storage → response

Add ASCII sequence-style diagram.

--------------------------------------------------

# 9. API Communication Model
- request lifecycle
- validation
- error handling
- response structure

--------------------------------------------------

# 10. Configuration & Environment
- env variables
- configs
- runtime setup

--------------------------------------------------

# 11. Scalability & Modularity Design
Explain:
- how new features can be added
- module isolation
- extensibility strategy

--------------------------------------------------

# 12. Technology Stack
Table format:

Layer | Technology | Purpose

--------------------------------------------------

# 13. Future Improvements (Optional)
Short engineering-focused suggestions.

--------------------------------------------------

OUTPUT FORMAT RULES:
- Markdown file only (ARCHITECTURE.md)
- Use headings properly
- Use ASCII diagrams (no images)
- Keep concise but professional
- Avoid fluff text
- Prefer structured bullets

--------------------------------------------------

INPUT:
I will provide the project folder/code next.
Wait for it before generating the architecture.