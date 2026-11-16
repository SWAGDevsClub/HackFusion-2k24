HACKFUSION 4.0 — SYNTHETIC DATASET PACK
District-level Maharashtra demo scenario (illustrative Nanded district geography)

IMPORTANT
All records in these files are synthetic and generated for hackathon prototyping and testing.
They are NOT official government records, NOT sourced from government grievance systems, and
NOT verified descriptions of actual incidents, departments, SLAs, contacts, or jurisdiction rules.
Do not contact the placeholder email addresses or webhook IDs. They are intentionally non-operational.

FILES
1. grievance_category_master.csv
   30 category/subcategory rows. Includes responsible department, default demo assignee,
   SLA days, sensitive and identity_hiding policy flags, priority, and auto-resolution eligibility.

2. mock_grievance_history.csv
   800 synthetic anonymised-style grievance examples. Includes complaint text, category,
   department, broad taluka/locality, dates, status, resolution, feedback, policy flags,
   and resolution_actor / ai_auto_closed fields for policy testing.

3. department_directory.csv
   20 synthetic department routing entries with broad sample jurisdiction mapping and
   placeholder contact channels / mock webhook IDs.

SCHEMA / POLICY NOTES
- Join mock_grievance_history.category_id to grievance_category_master.category_id.
- Join mock_grievance_history.department_id to department_directory.department_id.
- Join grievance_category_master.responsible_department_id to department_directory.department_id.
- sensitive=true categories are marked auto_resolution_allowed=false.
- In the generated history, sensitive cases are never marked ai_auto_closed=true.
  Resolved/closed sensitive cases use resolution_actor=HUMAN_OFFICER.
- Department names, taluka/locality examples, SLAs, routing and contact channels are
  illustrative placeholders for a demo. Organisers should label these as synthetic.
- The HackFusion PS says the category master is the source of truth. Teams should read
  its Sensitive and Identity-Hiding flags rather than hard-code policy.
- Use a real approved/anonymised dataset instead if the problem-statement provider later
  supplies one and authorises its use.

RECOMMENDED DEMO SAFETY
Sensitive or identity-hiding cases should always be routed to human review and never
auto-closed. Treat retrieved historical cases as supporting evidence, not as the final decision.
