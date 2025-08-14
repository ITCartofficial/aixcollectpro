# AiXCollectPro

AiXCollectPro is a modern, role-based collection and recovery management platform in the financial or debt recovery sector.  
It features secure login with multi-step authentication, real-time task management, reporting and a modular UI built with React and TypeScript.

---

## Features

- **Role-Based Access Control:** Global Admin, Super Admin, and Supervisor dashboards and permissions.
- **Secure Multi-Step Authentication:** Supports OTP, email, and authenticator app flows.
- **Task & Team Management:** Real-time monitoring, assignment and progress tracking.
- **Real-Time Agent Tracking:** Monitor agent locations and performance live for maximum operational control.
- **Collection Metrics & Analytics:** Visualize recovery rates, agent performance and operational KPIs through robust dashboards.
- **Leave & Attendance Management:** Integrated module for agent leave requests and attendance tracking.
- **Automated Reporting:** Scheduled and backup report delivery via email.
- **Agent Profile Management:** Centralized system for agent onboarding, documentation and performance history.
- **Customizable Two-Factor Authentication:** User-selectable 2FA method (email or authenticator app).
- **Responsive Design:** Intuitive UI for desktop and mobile devices.
- **Reusable Components:** Modals, buttons, forms and more for easy maintenance.

---

## Tech Stack

- **Frontend Framework:** [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Language:** TypeScript
- **Routing:** React Router
- **Styling:** Tailwind CSS
- **Icons:** React Icons
- **Authentication:** Custom (OTP, email, authenticator app)
- **State Management:** React hooks/context (no Redux)
- **Testing:** _Not yet integrated_

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

```bash
git clone https://github.com/ITCartofficial/aixcollectpro.git
cd aixcollectpro
npm install
```

### Running Locally

```bash
npm run dev
```
Visit [http://localhost:5173](http://localhost:5173) (default Vite port).

### Building for Production

```bash
npm run build
```

---

## Folder Structure

The application is organized for scalability and maintainability:

```
aixcollectpro/
├── public/
├── src/
│   ├── api/
│   ├── assets/
│   │   ├── images/
│   │   └── icons/
│   ├── components/
│   │   ├── ui/
│   │   ├── common/
│   │   ├── forms/
│   ├── config/
│   ├── hooks/
│   ├── layouts/
│   ├── pages/
│   ├── routes/
│   ├── utils/
│   ├── routes/
│   ├── styles/
├── App.tsx
├── index.css
├── main.tsx
├── vite-env.d.ts
├── .env
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── README.md
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.json
```

---

## Authentication Flow

1. **Login:** Fill Employee ID & Phone Number, click Continue.
2. **OTP Verification:** Enter OTP (sent via SMS/email).
3. **Two-Factor Authentication:**
   - **Email:** Confirm email (pre-filled), then verify OTP sent to email.
   - **Authenticator App:** Enter 6-digit code from authenticator app.
   - **None:** Directly access dashboard after OTP verification.
4. **Dashboard:** Access role-based dashboard and features.

---

## Customization

- **UI Components:** Modify or extend components in `src/components/ui/` and `src/components/common/`.
- **Authentication Logic:** Adjust flows in `src/pages/Login.tsx` and related auth components.

---

## Contributing

Contributions are welcome!  
Feel free to open issues or submit pull requests.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature-name`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature-name`)
5. Open a pull request

---

## License

[MIT](LICENSE)

---

## Maintainers

- [ITCartofficial](https://github.com/ITCartofficial)

---

> **AiXCollectPro** empowers supervisors and admins with secure, efficient, and scalable collection management.  
> For support or inquiries, please contact the maintainer via GitHub Issues.
