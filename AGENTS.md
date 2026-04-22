# AGENTS.md - ZGen Master Service Ecosystem

## 1. Project Vision: The "Relay Race" Service Blueprint
ZGen is a multi-archetype platform managing a student's journey from lead to university enrollment. The system follows a strict 1–9 event sequencing flow.

## 2. Archetype Matrix & Data Visibility
| Role | Responsibility | Detailed Profile Access | Summary Card View |
| :--- | :--- | :--- | :--- |
| **Super Admin** | Full System Control | All Segments (Admin View) | Global Status Tracker |
| **Counsellor** | Lead Guidance & Sales | Personal & Payment Tabs | Student Intake Summary |
| **Consultant** | End-to-End Flow Mgmt | Full Profile (Edit Access) | Pipeline Overview |
| **App Associate** | App Audits & Edits | University & Doc Segments | Edit Queue |
| **Content Writer** | SOP, LOR, Essays | Document & Creative Segments | Drafting Status |
| **LRT Team** | Loans, Visa, Transport | Finance & Logistics Segments | Service Milestone Card |
| **Test Prep** | GRE, IELTS, TOEFL | Academic & Score Segments | Progress Tracker |
| **Student** | Self-Management | User Dashboard (Own Data) | Personal Progress Bar |

## 3. The "Detailed Profile" Segregation Logic
The Student Profile is a single page divided into **Active Segments**.
- **Rule:** If a role does not have "Active Access," the segment must be **Hidden** or **Blurred/Locked** to reduce cognitive noise (Designing for Silence).
- **Core Segments:** 1. Personal/Core Data
  2. Academic Records & Test Prep
  3. SOP/LOR/Document Creative
  4. University Application Status
  5. LRT (Finance, Remittance, Visa)

## 4. Design Philosophy: "Designing for Silence"
- **Interaction:** Reduce "Red Dot" anxiety. Use progress indicators over intrusive alerts.
- **Visuals:** Enterprise-style technical architecture with a 3D Matte Plastic aesthetic.
- **Colors:**
  - **Midnight Navy (#2C3E50):** Super Admin Controls.
  - **Deep Purple (#4B0082):** Admin/Operational Interface.
  - **Turquoise (#40E0D0):** Success/Student-facing.
  - **Orange (#FF8C00):** LRT/Urgent Action required.

## 5. Coding Constraints for Jules
- **Object-First:** The 'Student' is the primary object; all segments are attributes of that object.
- **Completeness:** Always output the full, copy-pasteable code block for components.
- **Modular:** Components must be reusable across the Super Admin and Archetype dashboards.