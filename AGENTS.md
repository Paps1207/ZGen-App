# AGENTS.md - ZGen Multi-Archetype System Bible

## 1. Project Vision: The Service Relay Race
[cite_start]ZGen is an object-oriented ecosystem designed to manage a student's educational journey from lead intake to university enrollment[cite: 1, 80, 245]. [cite_start]The system utilizes a "Relay Race" model where a central Student Object is handed off between specialized archetypes across a defined lifecycle[cite: 15, 103, 208, 305].

## 2. Core Objects (The Nouns)
[cite_start]These are the stable pillars of the system that every archetype interacts with[cite: 4, 37, 83, 136, 194, 248, 295].

### A. Student (Lead)
- [cite_start]**Metadata:** Name, Contact Info, Nationality, Profile Photo[cite: 6, 86].
- [cite_start]**Academic Profile:** Current Education, Test Scores (GRE, IELTS, TOEFL), Work Experience[cite: 87, 138, 162].
- [cite_start]**Preferences:** Target Locations, Budget, Preferred Programs, Intake Preferences[cite: 88].

### B. Inquiry / Application
- [cite_start]**Metadata:** Unique ID, Target Program, Stage Progress (1-9), Submission Date[cite: 5, 92, 181, 250].
- [cite_start]**Status:** New, Doc Verification, Application Execution, Enrollment Ready[cite: 5, 30, 33, 182].

### C. Document (Smart Object)
- [cite_start]**Metadata:** Type (Passport, SOP, Marksheet), Upload Date, Expiry, File Reference[cite: 7, 44, 96, 178, 233, 255].
- [cite_start]**Status:** Pending, Verified, Rejected (Awaiting Re-upload)[cite: 7, 25, 44, 179, 233, 255].

### D. Allied Service (Satellites)
- [cite_start]**Types:** Education Loan, Visa Processing, Accommodation, Travel[cite: 7, 45, 99, 141, 199, 257].
- [cite_start]**Metadata:** Provider, Status (In-Progress, Approved), Integration/Sync State[cite: 7, 45, 235, 258].

## 3. Role-Based Access Control (RBAC) & Action Matrix
[cite_start]The system is segregated into specific "Verbs" (Actions) assigned to each archetype[cite: 16, 58, 109, 159, 214, 269, 316].

| Archetype | Primary Visibility | Key Verbs (Actions) |
| :--- | :--- | :--- |
| **Super Admin** | Global Reports, Role Management | [cite_start]Create/Assign Roles, Audit History, Re-assign Students[cite: 319, 322, 326, 332]. |
| **counsellor** | Lead Funnel & Academic Profile | [cite_start]Manage Leads, Verify Identity, Flag Issues, Push to Consultant[cite: 111, 112, 113]. |
| **Consultant** | Full Student Journey & Verification | [cite_start]Assess Fitment, Trigger Services, Request Manager Sponsorship[cite: 167, 171, 173]. |
| **App Associate** | Application Stages & Checklists | [cite_start]Update Stage, Assign Associate, Override Status, Move to Done[cite: 23, 25, 26]. |
| **Content Writer** | SOP/LOR & Portfolio Segments | [cite_start]Update Profile, Upload/Edit Drafts, Complete Training[cite: 60, 61, 64]. |
| **LRT Specialist** | Allied Service Milestones | [cite_start]Track Milestone Progress, Verify Financial Docs, Sync with CRM[cite: 220, 225, 229]. |
| **Student** | Personal Progress & Task Lists | [cite_start]Start/Resume App, Upload Docs, Select Universities, Pay Fees[cite: 18, 19, 20, 271, 276]. |

## 4. Automation Logic & System Triggers
- [cite_start]**Doc-to-Stage:** If all documents in the Checklist are "Verified," automatically update status to "Application Execution"[cite: 30, 288].
- [cite_start]**Auto-Rejection:** If a Document is "Rejected," the system must automatically generate a "Re-upload" task for the Student[cite: 77, 242].
- [cite_start]**Service-to-Enrollment:** When a Visa Service is "Approved," update the Inquiry status to "Enrollment Ready"[cite: 33, 289].
- [cite_start]**Deadline Monitoring:** Trigger alerts to the assigned Associate if an Inquiry is "Overdue"[cite: 32, 121, 228].

## 5. Design Philosophy: "Designing for Silence"
- [cite_start]**Segregation:** Each archetype dashboard must only render the data segments and actions authorized in the RBAC matrix to reduce cognitive noise[cite: 34, 47, 135].
- **Branding:** Use Deep Purple (#4B0082) for Admin, Turquoise (#40E0D0) for Success, and Orange (#FF8C00) for LRT/Urgent actions.
- **Aesthetic:** Clean, enterprise technical architecture with 3D matte plastic status icons.