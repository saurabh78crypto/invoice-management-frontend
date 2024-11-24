# Invoice Management System Frontend

This is the frontend of the **Invoice Management System**, built using Next.js. The application provides features for managing invoices, including creating, editing, deleting, and filtering invoices.

## Features

- **Invoice Management**
    - Create, edit, and delete invoices.
    - Filter invoices by status.
    - Search invoices by vendor name or invoice number.

- **Responsive Design**
    - Fully optimized for all screen sizes.

- **User Feedback**
    - Real-time notifications for success and error messages using Notistack.

- **Pagination**
    - Navigate through paginated invoices seamlessly.


## Technologies Used

- **Next.js** - A React framework for server-rendered applications.
- **Tailwind CSS** - Styling framework for responsive UI.
- **Axios** - API integration.
- **Material-UI** - UI components and elements.
- **Notistack** - Notifications.
- **JavaScript (ES6)** - Core programming language.


## Deployed Site
- The application is deployed on Netlify and can be accessed at:
 [Live Demo on Netlify](https://invoice-management-app-main.netlify.app/)

## Installation

Follow the steps below to run the frontend locally:

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Steps

1. **Clone the repository:**
```bash
git clone https://github.com/saurabh78crypto/invoice-management-frontend.git
cd invoice-management-frontend
```

2. **Install dependencies:**
```bash
npm install
# OR
yarn install
```

3. **Create an `.env` file and add the following environment variables:**
```js
NEXT_PUBLIC_API_BASE_URL=<Your API Base URL>
```

4. **Start the development server:**
```bash
npm run dev
# OR
yarn dev
```

5. Open your browser and navigate to `http://localhost:3000`.


### Scripts

- **npm run dev:** Start the development server
- **npm run build:** Build the application for production
- **npm start:** Start the production server
- **npm run lint:** Run linting to check code quality