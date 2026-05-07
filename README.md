# Tumaini Foster Care Application Portal

## Project Description

**Tumaini Foster Care** is a web-based application portal designed to streamline the foster care adoption and application process. The platform allows prospective foster parents to register, review terms and conditions, and submit detailed applications to join the Tumaini Children's Home family.

### Problem Solved
Many foster care organizations lack efficient digital systems for managing applications. This portal eliminates the need for paper forms and manual data entry by providing a centralized, user-friendly platform where applicants can:
- Learn about the organization and its mission
- Review comprehensive terms and conditions
- Submit complete applications with required documentation
- Have their information securely stored for future reference

### Purpose
The Tumaini Foster Care Portal serves as the primary intake system for the organization, making the application process transparent, accessible, and efficient while ensuring all applicants meet eligibility requirements before proceeding.

---

## Features

✅ **Multi-Page Navigation** - Intuitive navigation between Home, About, Join, and Terms pages  
✅ **Comprehensive Application Form** - Collects detailed applicant information including personal, residential, and household details  
✅ **Terms & Conditions Management** - Mandatory terms acceptance before form completion  
✅ **Form Validation** - Real-time validation of all required fields with helpful error messages  
✅ **Data Persistence** - Applicant data saved to browser localStorage for seamless multi-page experience  
✅ **Dynamic Content Display** - Shows saved applicant information across pages  
✅ **File Upload Support** - Medical report upload capability for documentation requirements  
✅ **Responsive Design** - Optimized for tablet and desktop viewing  
✅ **Professional UI** - Clean, accessible design with clear visual hierarchy  

---

## Technologies Used

Javascript
CSS
HTML

---

## Getting Started

### Installation
1. Clone or download this repository
2. Ensure all files are in the same directory:
   - `index1.html` (Home page)
   - `index2.html` (About page)
   - `index3.html` (Application form)
   - `index4.html` (Terms & Conditions)
   - `code.js` (JavaScript functionality)
   - `styles.css` (Styling)
   - `README.md` (This file)

### How to Use
1. Open `index1.html` in a web browser
2. Navigate through pages using the top navigation menu
3. Go to **Terms & Conditions** page and click "Accept Terms"
4. Return to **Join** page and complete the application form
5. Fill in all required fields (marked with `*`)
6. Upload a medical report (PDF, JPG, or PNG)
7. Click "Submit" to save your application
8. View your saved information on the **About** page

### Accessing Saved Data
- Your application data is automatically saved to your browser's localStorage
- The same data persists across all pages until cleared
- To view saved data, navigate to the **About** page

---

## Project Structure

```
foster_care/
├── index1.html          # Home page - Introduction and organization overview
├── index2.html          # About page - Organization details and saved applicant data display
├── index3.html          # Join page - Application form for prospective foster parents
├── index4.html          # Terms & Conditions - Legal requirements and applicant agreement
├── code.js              # Core JavaScript - Form handling, validation, and data management
├── styles.css           # Global styling and responsive design
├── README.md            # Project documentation
├── logo1.jpg            # Organization logo
├── the_home.jpg         # Organization facility image
├── kids.jpg             # Children image
├── kids2.jpg            # Children image
└── kids3.jpg            # Children image
```

### Page Descriptions

**index1.html (Home)** - Welcome page with organization introduction and call-to-action links to learn more or join.

**index2.html (About)** - Organization background, mission, founder story, donation information, and displays saved applicant data.

**index3.html (Join)** - Primary application form collecting:
  - Personal details (name, DOB, ID, contact info)
  - Residential information (county, sub-county, address)
  - Household & occupation details
  - Medical documentation
  - Fostering preferences and motivation

**index4.html (Terms & Conditions)** - Legal terms including eligibility requirements, confidentiality agreements, data privacy, and background check procedures.

---



### Core Functions in `code.js`

- **`getSavedApplicant()`** - Retrieves saved applicant data from localStorage
- **`saveApplicant(data)`** - Stores applicant data to localStorage
- **`renderSavedData()`** - Displays saved applicant information on the About page
- **`showMessage(element, text, type)`** - Shows success or error feedback messages
- **`initForm()`** - Initializes the application form with validation logic
- **`initTerms()`** - Manages terms and conditions acceptance flow
- **`initPage()`** - Called on page load to initialize all components

### Data Storage
Application data is stored in browser localStorage under the key: `tumainiFosterCareApplicant`

---

## Known Issues & Limitations

⚠️ **Mobile Responsiveness** - Design is optimized for tablet (768px+) and desktop screens; mobile screens may have layout issues  

⚠️ **File Upload Limitation** - Medical report file names are stored, but file contents are not persisted; actual file storage requires backend implementation  

⚠️ **Single Applicant** - System stores only one applicant at a time; multiple applicants would require backend database  

⚠️ **No Backend Validation** - Email and phone validation is client-side only; backend verification not implemented  

⚠️ **localStorage Limitations** - Data persists only in the same browser; clearing browser cache or using incognito mode will lose data  

⚠️ **No Email Confirmation** - Application submission does not send confirmation emails or store data on a server

---




## How to Delete a Saved Application

If you need to clear your saved application data:

**Method 1: Using Browser DevTools**
1. Open Browser DevTools (F12)
2. Go to **Application** tab → **Local Storage**
3. Find your site and look for key: `tumainiFosterCareApplicant`
4. Click and delete it

**Method 2: Using Browser Console**
1. Open Browser Console (F12 → Console tab)
2. Paste: `localStorage.removeItem("tumainiFosterCareApplicant");`
3. Press Enter

**Method 3: Clear All Data**
- Clear browser cache/cookies (Settings → Privacy/History → Clear Data)
- Note: This will delete all data for the site

---

## Contact & Support

For questions or support regarding the Tumaini Foster Care Portal, please contact:
- **Organization:** Tumaini Children's Home
- **Email:** info@tumaini.org
- **Location:** Kenya
- **Since:** 2005

---

## License

This project is proprietary software for Tumaini Children's Home. All rights reserved.

---

## Acknowledgments

- **PCEA Church** - Founder organization
- **Well-wishers** - Community support
- **Contributors** - Development and design team

---

**Last Updated:** May 7, 2026  
**Version:** 1.0.0
