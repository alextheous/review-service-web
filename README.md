# Review Service Web Application

A modern review service platform built with **Next.js 14**, **React 18**, and **TypeScript**.

## Features

- 🌟 **Modern UI**: Clean, responsive design with Tailwind CSS
- ⚡ **Fast Performance**: Built with Next.js App Router
- 📝 **Review System**: Submit and browse reviews
- 🎨 **Styled Components**: Custom CSS classes and Tailwind utilities
- 📱 **Responsive Design**: Works on all devices
- 🔍 **Search Functionality**: Find reviews easily
- ⭐ **Star Ratings**: Visual rating system

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/alextheous/review-service-web.git
cd review-service-web
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
npm run start
```

## Project Structure

```
review-service-web/
├── app/
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Homepage
│   ├── reviews/
│   │   └── page.tsx         # Reviews listing
│   └── submit/
│       └── page.tsx         # Submit review form
├── public/                  # Static assets
├── package.json            # Dependencies
├── tailwind.config.js      # Tailwind CSS config
├── tsconfig.json           # TypeScript config
└── next.config.js          # Next.js config
```

## Technologies Used

- **Next.js 14** - React framework with App Router
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **PostCSS** - CSS processing

## Deployment

This project is ready to deploy on:

- **Netlify** (Recommended for this setup)
- **Vercel**
- **GitHub Pages**
- Any static hosting service

### Netlify Deployment

1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `out` (for static export) or `.next` (for full Next.js)
4. Deploy!

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
