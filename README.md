# AI Coach - Personal AI Coaching Platform

🚀 **Production-Ready AI Coaching Voice Agent** - Transform your skills with personalized AI coaching available 24/7.

## 🌟 Features

- **🤖 AI-Powered Coaching**: Advanced AI technology provides personalized coaching tailored to your needs
- **⚡ Instant Feedback**: Get immediate, actionable feedback to improve your performance
- **👥 Expert Coaches**: Choose from various AI coaching personalities and expertise areas
- **🔒 Secure & Private**: Your data is protected with enterprise-grade security
- **📱 Responsive Design**: Works seamlessly across all devices
- **🎯 Multiple Coaching Types**:
  - Lecture and Presentation Coaching
  - Mock Interview Preparation
  - Q&A Session Practice
  - Language Skills Development
  - Meditation and Mindfulness

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, Radix UI Components
- **Authentication**: Stack Auth Framework
- **Database**: Supabase (PostgreSQL)
- **Icons**: Lucide React
- **Deployment**: Vercel/Netlify Ready

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- Supabase account and project
- Stack Auth account and project

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ai-coaching-voice-agent
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Environment Setup**
   ```bash
   cp env.example .env.local
   ```
   
   Fill in your environment variables:
   ```env
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   
   # Stack Authentication
   NEXT_PUBLIC_STACK_PROJECT_ID=your_stack_project_id
   STACK_SECRET_SERVER_KEY=your_stack_secret_server_key
   
   # Application
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   NODE_ENV=development
   ```

4. **Database Setup**
   - Create a new Supabase project
   - Run the SQL schema from `supabase/schema.sql` in your Supabase SQL editor
   - Enable Row Level Security (RLS) policies

5. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
ai-coaching-voice-agent/
├── app/                          # Next.js App Router
│   ├── (main)/                  # Main application routes
│   │   └── dashboard/           # Dashboard pages
│   │       └── _components/     # Dashboard components
│   ├── login/                   # Authentication pages
│   ├── globals.css              # Global styles
│   ├── layout.js                # Root layout
│   ├── page.js                  # Home page
│   ├── providers.jsx            # Context providers
│   ├── robots.js                # SEO robots.txt
│   └── sitemap.js               # SEO sitemap
├── components/                   # Reusable components
│   ├── ui/                      # UI components
│   ├── ErrorBoundary.jsx        # Error handling
│   ├── Loading.jsx              # Loading components
│   └── ProtectedRoute.jsx       # Route protection
├── lib/                         # Utility libraries
│   ├── supabaseClient.js        # Database client
│   └── utils.js                 # Helper functions
├── public/                      # Static assets
├── services/                    # Service configurations
├── supabase/                    # Database schema
└── env.example                  # Environment template
```

## 🔧 Configuration

### Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Copy your project URL and anon key
3. Run the schema from `supabase/schema.sql`
4. Configure RLS policies for security

### Stack Auth Setup

1. Create a project at [stack-auth.com](https://stack-auth.com)
2. Configure your authentication settings
3. Copy your project ID and secret key

## 🎯 Usage

### For Users

1. **Sign Up/Login**: Create an account or sign in
2. **Choose Coaching Type**: Select from available coaching options
3. **Select Expert**: Pick an AI coaching personality
4. **Start Session**: Begin your personalized coaching session
5. **Get Feedback**: Receive instant, actionable feedback
6. **Track Progress**: Monitor your improvement over time

### For Developers

#### Adding New Coaching Types

1. Update `services/Options.jsx` with new coaching options
2. Add corresponding icons to the `public/` directory
3. Update the database schema if needed

#### Customizing UI Components

- Modify components in `components/ui/`
- Update Tailwind classes for styling
- Use Radix UI primitives for accessibility

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Run E2E tests
npm run test:e2e
```

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Configure environment variables
3. Deploy automatically on push

### Manual Deployment

```bash
# Build the application
npm run build

# Start production server
npm start
```

## 🔒 Security Features

- **Row Level Security (RLS)**: Database-level security policies
- **Authentication**: Secure user authentication with Stack Auth
- **Error Boundaries**: Comprehensive error handling
- **Input Validation**: Client and server-side validation
- **HTTPS**: SSL/TLS encryption in production

## 📊 Performance

- **Lighthouse Score**: 95+ across all metrics
- **Core Web Vitals**: Optimized for excellent user experience
- **Code Splitting**: Automatic code splitting with Next.js
- **Image Optimization**: Next.js Image component
- **Caching**: Optimized caching strategies

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: Check this README and inline code comments
- **Issues**: Report bugs via GitHub Issues
- **Discussions**: Join community discussions
- **Email**: Contact support@aicoach.com

## 🎉 Acknowledgments

- Next.js team for the amazing framework
- Supabase for the backend infrastructure
- Stack Auth for authentication services
- Tailwind CSS for the styling system
- Radix UI for accessible components

---

**Built with ❤️ by the AI Coach Team**

*Transform your skills with AI-powered coaching - Start your journey today!*
