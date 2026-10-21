# ⛏️ Minecraft-Themed Hackathon Website — Project Specification

## 1. Project Overview

Build a polished, interactive website for our hackathon using a Minecraft-inspired visual theme.

The website should feel like a Minecraft world, incorporating block-based environments, pixel art, biomes, structures, portals, and game-inspired UI elements.

**IMPORTANT:** This document is the single source of truth for the website's design and behavior. Follow it strictly for every implementation, update, redesign, and bug fix.

Do not introduce a new visual style or make unrequested design changes.

---

## 2. Mandatory Design Rules

### Theme
- Use a consistent Minecraft-inspired world throughout the website.
- Use a pixel-art, voxel, and block-based visual aesthetic.
- Use Minecraft-inspired environmental details, including grass blocks, stone, dirt, wood, ores, lanterns, and foliage.
- Use game-inspired typography and pixel-style headings.
- Use consistent block textures, borders, spacing, and button styles.
- Maintain a polished, modern, readable interface while preserving the Minecraft atmosphere.

### Color Palette

Use these colors consistently:

- Grass Green: `#5E9C45`
- Dark Forest Green: `#263D2A`
- Dirt Brown: `#795438`
- Wood Brown: `#A47748`
- Stone Gray: `#777777`
- Sky Blue: `#79C9F2`
- Portal Purple: `#7847AB`
- Gold Accent: `#F2C14E`
- Main Background: `#151A17`
- Card Background: `#242B25`
- Primary Text: `#F5F2E8`
- Secondary Text: `#C5C9BE`

Do not introduce unrelated accent colors unless explicitly requested.

### Typography
- Use a pixel-style font such as Press Start 2P for selected headings.
- Use a readable sans-serif font for body text.
- Use pixel fonts sparingly to preserve readability.
- Keep heading sizes, weights, and hierarchy consistent.

### Buttons and Cards
- Use block-style buttons with clear hover and active states.
- Use consistent card padding, borders, shadows, and corner treatments.
- Prefer square or subtly pixelated corners over excessive rounded corners.
- Use consistent interaction feedback across all pages.
- Ensure text contrast is accessible.

---

## 3. Website Structure

Use the following structure unless the existing project specifies otherwise.

### A. Navigation Bar
- Minecraft-inspired logo or pixel-art emblem.
- Navigation links to the main sections.
- Clearly visible registration or primary action button.
- Consistent styling across pages.
- Responsive mobile navigation.

### B. Hero Section
- Large Minecraft-inspired background scene.
- Pixel-art landscape, block terrain, or an appropriate Minecraft-style environment.
- Prominent hackathon title.
- Short event description.
- Primary call-to-action button.
- Secondary button for event details.
- Optional countdown timer if the event date is configured.
- Strong visual hierarchy and readable text.

### C. Event Information
- Event date and time.
- Venue or online participation details.
- Event duration.
- Participation requirements.
- Registration instructions.

Display only confirmed information. Never invent event details.

### D. Timeline
- Present the hackathon schedule as a Minecraft-inspired journey or progression.
- Use block-based milestone cards.
- Use connected paths, checkpoints, or signposts.
- Include each confirmed event stage and its actual time.
- Keep the timeline visually consistent with the rest of the site.

### E. Venue Section
- Represent the venue as a Minecraft-inspired location or structure.
- Use relevant block-world imagery and location details.
- Display the actual venue information provided by the organizers.
- Do not invent an address.

### F. Additional Sections
Include only sections relevant to the actual event, such as:
- About the hackathon.
- Themes or problem statements.
- Rules and eligibility.
- Prizes.
- Sponsors.
- Frequently asked questions.
- Contact information.

Do not invent sponsors, prizes, speakers, or partnerships.

### G. Footer
- Consistent dark, block-inspired design.
- Relevant navigation links.
- Organizer contact and social links, when provided.
- Copyright information.

---

## 4. Minecraft Visual Asset Rules

- Use Minecraft-inspired block landscapes, forests, caves, portals, villages, and structures where appropriate.
- Use relevant visual references for specific sections.
- Keep image aspect ratios and cropping consistent.
- Avoid stretching images.
- Do not use unrelated stock photos or generic corporate illustrations.
- Do not substitute unrelated game environments for Minecraft-inspired scenes.
- Keep text readable over background images by using suitable overlays.
- Reuse existing project assets when they fit the specification.
- Do not replace approved assets without a clear requirement.

Examples of appropriate visual concepts:
- Cherry blossom biome for a peaceful hero or background.
- Pillager outpost for a challenge or mission section.
- Woodland mansion for a special event or feature.
- Nether portal for transitions, registration, or calls to action.
- Village or crafting table for teamwork and collaboration.
- Overworld paths and signposts for the event timeline.

Use these concepts only where they fit the actual content. Avoid filling every section with unrelated structures.

---

## 5. Functional Requirements

- All navigation links must work.
- All buttons must perform their stated actions.
- Registration must connect to the configured registration destination.
- Forms must validate user input.
- Countdown timers must use the configured event date and time.
- Mobile navigation must open and close correctly.
- Interactive components must provide clear feedback.
- Links must not lead to placeholder or nonexistent pages.
- Do not display fake success messages.
- Do not use fabricated event information.
- Do not add unnecessary animations that interfere with usability.

If a destination, API, event date, or other configuration is missing, identify it as a required configuration rather than inventing a value.

---

## 6. Responsive Design

The website must work on:
- Desktop computers.
- Laptops.
- Tablets.
- Mobile phones.

Requirements:
- No horizontal overflow.
- Responsive images and layouts.
- Readable text at all screen sizes.
- Buttons with comfortable touch targets.
- Mobile-friendly navigation.
- Consistent visual identity across screen sizes.

Do not create a separate, unrelated design for mobile. Adapt the same design system.

---

## 7. Technical Rules

1. Inspect the existing repository before making changes.
2. Preserve the current framework, project structure, and package manager.
3. Reuse existing components and dependencies wherever practical.
4. Do not rewrite the entire application when a targeted change is sufficient.
5. Keep components reusable and maintainable.
6. Avoid unnecessary dependencies.
7. Do not remove existing working functionality.
8. Do not hardcode secrets, API keys, or private credentials.
9. Use semantic HTML and accessible interaction patterns.
10. Test important pages and interactions after making changes.

If the repository has not yet been created, ask for the preferred framework before generating the initial application.

---

## 8. Strict AI Instructions

Whenever an AI tool reads this document, it must follow these rules:

1. Treat this README as the authoritative design specification.
2. Preserve the defined color palette, typography, visual language, and component styles.
3. Maintain consistency with the existing implementation and approved screenshots.
4. Do not redesign the website unless explicitly instructed.
5. Do not introduce new themes, colors, fonts, or UI patterns without approval.
6. Do not remove existing sections or functionality without approval.
7. Do not change unrelated files when implementing a requested feature.
8. Make the smallest necessary changes to satisfy the task.
9. Preserve all unrelated working features.
10. If a requested change conflicts with this specification, explain the conflict and ask for clarification rather than silently changing the design.
11. If information is missing, ask a focused question or identify the missing configuration.
12. Verify the changes and report what was actually tested.

### Before Every Change

The AI must:
- Read this README.
- Inspect the relevant existing components and styles.
- Identify the exact requested change.
- Preserve all unrelated implementation details.
- Verify that the final result follows this specification.

---

## 9. Definition of Done

A change is complete only when:
- The requested functionality works.
- The established Minecraft theme is preserved.
- The website remains responsive.
- Existing working features continue to function.
- No unrelated redesign has occurred.
- Relevant errors and broken links have been checked.
- Any unconfigured functionality is clearly documented.

---

**Rule:** Never invent event details. If any value is unknown, leave the placeholder unchanged until the organizer provides the correct information.

### C. Technical Configuration

- **Frontend Framework:** React, tailwind
- **Programming Languages:** HTML, CSS, JavaScript, and any languages required by the selected framework.
- **Styling:** CSS & tailwind
- **Package Manager:** [npm, pnpm, yarn, or existing package manager]
- **Build Tool:** [Existing Build Tool]

**Technical rules:**
1. Inspect the existing project before selecting or changing technologies.
2. Preserve the existing framework and package manager.
3. Do not add dependencies without a clear requirement.
4. Never replace working application code with a fresh implementation unnecessarily.
5. Document any required environment variables without exposing secrets.

### D. Official Design Configuration

**Theme:** Minecraft-inspired block world

**Color Palette:**
- Primary Green: `#5E9C45`
- Dark Forest: `#263D2A`
- Dirt Brown: `#795438`
- Wood Brown: `#A47748`
- Stone Gray: `#777777`
- Sky Blue: `#79C9F2`
- Portal Purple: `#7847AB`
- Gold Accent: `#F2C14E`
- Main Background: `#151A17`
- Card Background: `#242B25`
- Primary Text: `#F5F2E8`
- Secondary Text: `#C5C9BE`

**Typography:**
- Headings: Press Start 2P or the already approved pixel font.
- Body: The approved readable sans-serif font.
- Maintain consistent font sizes and hierarchy.

**Visual Style:**
- Block-based cards and buttons.
- Pixel-art or voxel-inspired environmental imagery.
- Minecraft-inspired biomes, structures, portals, and terrain.
- Consistent spacing, borders, shadows, and hover effects.
- Responsive desktop and mobile layouts.

**Design Lock:** The AI must not change the color palette, typography, layout, approved assets, or component styles without explicit permission.

1. Read this README before making changes.
2. Inspect the existing files and relevant components.
3. Identify exactly which functionality or section needs modification.
4. Preserve the existing design and unrelated functionality.
5. Reuse existing components, assets, and design tokens.
6. Avoid unnecessary file changes and dependency installations.
7. Ask for clarification when requirements conflict with this configuration.
8. Run relevant checks after implementation.
9. Report modified files, completed changes, and any remaining issues.

### I. Configuration Change Policy

Only the project owner may approve changes to the official design or configuration.

A change is authorized when the user explicitly requests it, such as:
- Change the website's primary color.
- Replace the hero background.
- Add a new section.
- Change the registration flow.
- Update the event schedule.

All unrelated settings must remain unchanged.

### J. Final Configuration Rule

This section, together with the approved design references and existing source code, defines the intended website.

**The goal is not to generate a new design every time. The goal is to maintain one consistent website and modify only the parts explicitly requested by the user.**