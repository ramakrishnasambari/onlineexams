# Online Exam System

A modern, responsive React-based online examination platform with separate interfaces for administrators and students.

## 🚀 Features

### Admin Features
- **Dashboard Overview**: View statistics, recent tests, and system metrics
- **Test Management**: Create, edit, and manage online tests
- **Test Creation**: Build tests with multiple question types
- **Student Management**: Monitor student performance and results

### Student Features
- **Dashboard**: View available tests, recent results, and performance analytics
- **Test Taking**: Interactive test interface with timer and question navigation
- **Results Viewing**: Access detailed test results and performance history
- **Performance Analytics**: Track progress with visual charts and statistics

### Technical Features
- **Responsive Design**: Mobile-friendly interface that works on all devices
- **Modern UI/UX**: Clean, intuitive design with smooth animations
- **Role-based Access**: Secure authentication with admin/student roles
- **Real-time Timer**: Countdown timer for test duration
- **Question Navigation**: Easy navigation between questions with progress tracking

## 🛠️ Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **Charts**: Chart.js (ready for implementation)

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd onlineexams
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🔐 Demo Credentials

### Admin Login
- **Email**: `admin@example.com`
- **Password**: Any password (demo mode)
- **Role**: Admin

### Student Login
- **Email**: `student@example.com`
- **Password**: Any password (demo mode)
- **Role**: Student

## 📱 Usage

### For Administrators
1. Login with admin credentials
2. Navigate to the "Create Test" tab
3. Fill in test details (title, description, duration, dates)
4. Add questions with different types (multiple choice, true/false, short answer)
5. Save and activate the test
6. Monitor student results from the dashboard

### For Students
1. Login with student credentials
2. View available tests on the dashboard
3. Click "Start Test" to begin an exam
4. Navigate through questions using the sidebar
5. Submit the test when completed
6. View results and performance analytics

## 🎨 Design Features

- **Clean White Background**: As requested, the application uses a white background throughout
- **Modern UI Components**: Cards, buttons, and forms with subtle shadows and rounded corners
- **Responsive Grid Layout**: Adapts to different screen sizes
- **Intuitive Navigation**: Tab-based navigation for easy access to different sections
- **Visual Feedback**: Hover effects, loading states, and progress indicators

## 📊 Question Types Supported

1. **Multiple Choice**: Select one correct answer from multiple options
2. **True/False**: Simple true or false questions
3. **Short Answer**: Text-based responses for detailed answers

## 🔧 Customization

The application is built with modular components and can be easily customized:

- **Styling**: Modify Tailwind CSS classes in components
- **Question Types**: Add new question types in the types definition
- **Authentication**: Replace mock authentication with real backend integration
- **Data Storage**: Connect to a database for persistent data storage

## 🚀 Deployment

To build the application for production:

```bash
npm run build
```

The built files will be in the `build` folder, ready for deployment to any static hosting service.

## 📝 Project Structure

```
src/
├── components/          # React components
│   ├── Login.tsx       # Authentication component
│   ├── AdminDashboard.tsx  # Admin interface
│   ├── StudentDashboard.tsx # Student interface
│   └── TestTaking.tsx  # Test taking interface
├── context/            # React context
│   └── AuthContext.tsx # Authentication context
├── types/              # TypeScript type definitions
│   └── index.ts        # Interface definitions
├── App.tsx             # Main application component
└── index.css           # Global styles
```

## 🎯 Future Enhancements

- [ ] Real backend integration with Node.js/Express
- [ ] Database integration (MongoDB/PostgreSQL)
- [ ] Advanced analytics with Chart.js
- [ ] Email notifications
- [ ] File upload for questions
- [ ] Advanced question types (essay, matching, etc.)
- [ ] Bulk student import
- [ ] Test scheduling and reminders

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is open source and available under the MIT License.

---

**Note**: This is a demo application with mock data. For production use, implement proper backend services and database integration. 