"use client";
import { useEffect, useState } from "react";
import {
  Send,
  ChevronDown,
  ChevronUp,
  Briefcase,
  Code,
  Mail,
  Github,
  Linkedin,
  Twitter,
  ArrowUpRight,
  Calendar,
  Monitor,
  Moon,
  Sun,
} from "lucide-react";
import { useForm, ValidationError } from "@formspree/react";
import Image from "next/image";
import Link from "next/link";

const projects = [
  {
    name: "Washed-up",
    shortDescription:
      "Laundry automation web app for hostels, campuses and hotels",
    longDescription: [
      "User authentication using firebase",
      "Campus/Hostel selection by user. Based on the selection, users are displayed various machines which they can book from the web app",
      "Washing machine reservation and whatsapp notification",
      "Payments using razorpay custom flow and webhooks",
      "Complete record of user payments and washes",
    ],
    tech: [
      "React",
      "Node.js",
      "Express",
      "Firebase Auth",
      "Postgres",
      "Prisma ORM",
      "Socket.io",
      "CronJob",
      "Jest",
    ],
    image:
      "https://firebasestorage.googleapis.com/v0/b/portfolio-76b39.appspot.com/o/project-assets%2Fwashedup.png?alt=media&token=bd44b3f6-3fcb-40b0-bc6b-a009bf131a7c",
  },
  {
    name: "Hover Mobility",
    shortDescription:
      "E-bike rental service with in-house developed IOT technology",
    longDescription: [
      "User authentication using firebase",
      "User can scan the QR code on vehicle from any station. Bluetooth checks are done and user is prompted if bluetooth is turned off",
      "User can start, pause, resume and end ride. If user ends the ride within 1 min, they are not charged",
      "Plan and membership based rides are also available",
      "Vehicles can be reserved for 10 mins, 20 mins , 30 mins",
      "Payments using razorpay custom flow and webhooks",
      "Complete record of user payments, ride and reservations",
    ],
    tech: [
      "React Native",
      "Node.js",
      "Express",
      "Bluetooth",
      "Firebase Phone Auth",
      "Postgres",
      "Prisma ORM",
      "Socket.io",
      "CronJob",
      "Jest",
      "Google Maps API",
    ],
    image:
      "https://firebasestorage.googleapis.com/v0/b/portfolio-76b39.appspot.com/o/project-assets%2Fhover.png?alt=media&token=1ab584f8-5768-49f8-a700-26302e4bd67c",
  },
  {
    name: "Grin Mobility",
    shortDescription: "Sustainable urban two-wheeler transportation solution",
    longDescription: [
      "User authentication using firebase",
      "User can scan the QR code on vehicle from any station or select any vehicle from display",
      "User can start, pause, resume and end ride. Vehicles are controlled from backend via MQTT protocol",
      "Plan and membership based rides are also available",
      "Vehicles can be reserved for 10 mins, 20 mins , 30 mins",
      "Payments using stripe custom flow and webhooks",
      "Complete record of user payments, ride and reservations",
    ],
    tech: [
      "React",
      "Node.js",
      "Express",
      "MQTT",
      "Firebase Phone Auth",
      "Postgres",
      "Prisma ORM",
      "Socket.io",
      "CronJob",
      "Jest",
      "Google Maps API",
    ],
    image:
      "https://firebasestorage.googleapis.com/v0/b/portfolio-76b39.appspot.com/o/project-assets%2Fgrin.png?alt=media&token=784265cd-4e47-4b2a-983c-45a9ecad71d8",
  },
  {
    name: "Jet-Admin",
    shortDescription: "Powerful admin panel for postgres based backend",
    longDescription: [
      "Powered by Node.js, Express & Prisma ORM, handling all database operations and serving API endpoints",
      "Create, read, update, and delete operations on all PostgreSQL tables",
      "Visualize database statistics and query results effectively using tables",
      "RBAC: Fine-grained access control at both row and column levels, enhancing security and customization",
      "Custom Dashboards: Create personalized drag and drop dashboards by integrating your custom graphs and table widgets for comprehensive data monitoring",
      "Custom Graphs: Generate custom graphs using queries as data sources for insightful data visualization",
      "Advanced Query Builder: Easily construct, test, and preview PostgreSQL queries",
      "App Constants: Define and manage constants",
      "Scheduled Jobs for query object: Run Cron based scheduled query object runners",
      "Support for App Constants in Queries: Seamlessly incorporate app constants directly within Query objects",
      "Resizable and Custom Placement for Dashboard Widgets: Customize the size and position of dashboard widgets to suit preferences and needs",
    ],
    tech: [
      "React",
      "Express",
      "SQLite",
      "PG",
      "Prisma ORM",
      "Node.js",
      "Charts.js",
    ],
    image:
      "https://firebasestorage.googleapis.com/v0/b/portfolio-76b39.appspot.com/o/project-assets%2Fjetadmin.png?alt=media&token=3c4cc810-c221-42df-babd-9aafbced2f31",
  },
  {
    name: "FilmArtsy Landing Page",
    shortDescription: "Captivating landing page for a film production company",
    longDescription: [
      "Designed an immersive, visually striking landing page to showcase the company's portfolio",
      "Implemented smooth scrolling and parallax effects for an engaging user experience",
      "Demo video section",
      "Complex animations triggered on scrolling",
      "Integrated a contact form with serverless function for lead capture",
    ],
    tech: ["React", "Strapi", "Firebase hosting"],
    image: null,
    video:
      "https://firebasestorage.googleapis.com/v0/b/portfolio-76b39.appspot.com/o/project-assets%2FFilmartsy.mp4?alt=media&token=e2c7c51d-d5c2-4059-ba4c-3208cb740710",
  },
];

const skills = [
  "React JS",
  "React Native",
  "Node JS",
  "Express JS",
  "MQTT",
  "Socket.io",
  "SQLite",
  "Postgres SQL",
  "Prisma ORM",
  "Redux",
  "Docker",
  "AWS EC2",
  "Stripe",
  "Razorpay",
  "Webhooks",
  "AWS WAF",
  "AWS lambda",
  "GCP function",
  "Microservices",
];

const SkillBadge = ({ skill }) => (
  <span className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900 dark:to-indigo-900 text-indigo-700 dark:text-indigo-200 text-xs font-medium px-3 py-1.5 rounded-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-sm border border-blue-100 dark:border-blue-800 shadow-sm">
    {skill}
  </span>
);

const TechBadge = ({ tech }) => (
  <span className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900 dark:to-purple-900 text-indigo-700 dark:text-indigo-200 text-xs font-medium px-3 py-1.5 rounded-lg transition-all duration-300 hover:scale-[1.02] border border-indigo-100 dark:border-indigo-800 shadow-sm">
    {tech}
  </span>
);

const ProjectCard = ({ project, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showFullImage, setShowFullImage] = useState(false);
  const animation =
    index % 2 === 0 ? "animate-fadeInRight" : "animate-fadeInLeft";

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setShowFullImage(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div
      className={`group relative rounded-2xl overflow-hidden bg-white dark:bg-gray-800 shadow-xl dark:shadow-gray-700 hover:shadow-2xl dark:hover:shadow-gray-600 transition-all duration-500 ${animation}`}
    >
      {showFullImage && project.image && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 cursor-zoom-out"
          onClick={() => setShowFullImage(false)}
        >
          <div className="relative w-full h-full max-w-6xl max-h-[90vh]">
            <Image
              src={project.image}
              alt={project.name}
              fill
              className="object-contain p-4"
              quality={100}
              priority
            />
            <button
              className="absolute top-4 right-4 text-white hover:text-indigo-300 transition-colors"
              aria-label="Close fullscreen"
            >
              <ArrowUpRight className="w-8 h-8 rotate-45" />
            </button>
          </div>
        </div>
      )}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>

        <div
          className="relative h-56 cursor-zoom-in"
          onClick={() => project.image && setShowFullImage(true)}
        >
          {project.image ? (
            <Image
              src={project.image}
              alt={project.name}
              fill
              className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <video
              autoPlay
              loop
              muted
              className="object-cover w-full h-full"
              controls
              preload="none"
            >
              <source src={project.video} type="video/mp4" />
            </video>
          )}
        </div>

        <div className="absolute top-4 left-4 flex gap-2">
          <div className="bg-white/90 dark:bg-gray-700/90 backdrop-blur-sm py-1 px-3 rounded-full text-xs font-medium text-indigo-800 dark:text-indigo-200 shadow-sm">
            {project.tech[0]}
          </div>
          {project.tech.length > 1 && (
            <div className="bg-white/90 dark:bg-gray-700/90 backdrop-blur-sm py-1 px-3 rounded-full text-xs font-medium text-gray-600 dark:text-gray-300 shadow-sm">
              +{project.tech.length - 1}
            </div>
          )}
        </div>
      </div>

      <div className="p-6 bg-gradient-to-b from-white to-indigo-50/30 dark:from-gray-800 dark:to-indigo-900/30">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3 relative">
          {project.name}
          <span className="absolute -bottom-1 left-0 w-12 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></span>
        </h3>

        <p className="text-gray-700 dark:text-gray-300 mb-5 text-lg leading-relaxed">
          {project.shortDescription}
        </p>

        <div className="mb-5 space-y-1 text-gray-600 dark:text-gray-400">
          <div
            className={`transition-all duration-500 overflow-hidden ${
              isExpanded ? "max-h-96" : "max-h-0"
            }`}
          >
            <ul className="space-y-3 pt-2">
              {project.longDescription.map((point, idx) => (
                <li className="text-sm flex items-start" key={idx}>
                  <span className="shrink-0 inline-block w-2 h-2 rounded-full bg-indigo-400 mt-1.5 mr-3"></span>
                  <span className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-200 font-medium flex items-center mt-3 group"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="w-5 h-5 mr-1.5 transition-transform group-hover:-translate-y-0.5" />
                Collapse Details
              </>
            ) : (
              <>
                <ChevronDown className="w-5 h-5 mr-1.5 transition-transform group-hover:translate-y-0.5" />
                Expand Details
              </>
            )}
          </button>
        </div>

        <div className="pt-5 border-t border-gray-200/50 dark:border-gray-700/50">
          <div className="flex flex-wrap gap-2">
            {project.tech.slice(0, 5).map((tech, index) => (
              <TechBadge key={index} tech={tech} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const ContactForm = () => {
  const [state, handleSubmit] = useForm("mjvjpjqy");

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full">
      <div className="relative">
        <input
          type="email"
          id="email"
          name="email"
          className="peer h-12 w-full border-b-2 border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-200 placeholder-transparent focus:outline-none focus:border-indigo-600 bg-transparent dark:bg-transparent"
          placeholder=" "
          required
        />
        <label
          htmlFor="email"
          className="absolute left-0 -top-3.5 text-gray-600 dark:text-gray-400 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 dark:peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-indigo-600 dark:peer-focus:text-indigo-400"
        >
          Email address
        </label>
        <ValidationError prefix="Email" field="email" errors={state.errors} />
      </div>

      <div className="relative pt-4">
        <textarea
          id="message"
          name="message"
          rows="3"
          className="peer h-32 w-full border-b-2 border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-200 placeholder-transparent focus:outline-none focus:border-indigo-600 bg-transparent dark:bg-transparent resize-none"
          placeholder=" "
          required
        ></textarea>
        <label
          htmlFor="message"
          className="absolute left-0 -top-3.5 text-gray-600 dark:text-gray-400 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 dark:peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-indigo-600 dark:peer-focus:text-indigo-400"
        >
          Your message
        </label>
        <ValidationError
          prefix="Message"
          field="message"
          errors={state.errors}
        />
      </div>

      <button
        type="submit"
        disabled={state.submitting}
        className="w-full relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 bg-size-200 bg-pos-0 hover:bg-pos-100 transition-all duration-500 shadow-lg hover:shadow-xl group"
      >
        <span className="relative px-6 py-3 transition-all ease-in duration-300 flex items-center justify-center w-full bg-white/5 dark:bg-gray-800/5 backdrop-blur-sm group-hover:bg-white/10 dark:group-hover:bg-gray-800/10">
          {state.submitting ? (
            "Sending..."
          ) : (
            <>
              Send Message
              <Send className="ml-3 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </span>
      </button>

      {state.succeeded && (
        <div className="mt-4 p-4 bg-green-50/90 dark:bg-green-900/90 backdrop-blur-sm text-green-800 dark:text-green-200 rounded-xl border border-green-200 dark:border-green-700 shadow-sm">
          🎉 Thanks for reaching out! I'll respond within 24 hours.
        </div>
      )}
    </form>
  );
};

const customStyles = `
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-8px); }
  }

  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes fadeInRight {
    from { opacity: 0; transform: translateX(-20px); }
    to { opacity: 1; transform: translateX(0); }
  }

  @keyframes fadeInLeft {
    from { opacity: 0; transform: translateX(20px); }
    to { opacity: 1; transform: translateX(0); }
  }

  .animate-float {
    animation: float 4s ease-in-out infinite;
  }

  .animate-fadeInUp {
    animation: fadeInUp 0.6s ease-out forwards;
  }

  .animate-fadeInRight {
    animation: fadeInRight 0.6s ease-out forwards;
  }

  .animate-fadeInLeft {
    animation: fadeInLeft 0.6s ease-out forwards;
  }

  .hover-tilt {
    transition: transform 0.3s ease;
  }
  
  .hover-tilt:hover {
    transform: perspective(1000px) rotateX(2deg) rotateY(2deg) scale(1.02);
  }

  .glass-morphism {
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.18);
  }

  .dark .glass-morphism {
    background: rgba(31, 41, 55, 0.8); /* Dark mode glass color */
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
`;

const Home = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDarkMode(false);
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
    } else {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900/30">
      <style>{customStyles}</style>

      <div className="container mx-auto px-4 py-16 lg:py-20 flex flex-col lg:flex-row gap-12 lg:gap-16">
        <header className="lg:sticky lg:top-16 h-fit glass-morphism rounded-3xl shadow-2xl p-8 lg:w-1/3 hover-tilt">
          <div className="absolute top-4 right-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all duration-300"
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5 text-yellow-500" />
              ) : (
                <Moon className="h-5 w-5 text-gray-800" />
              )}
            </button>
          </div>
          <div className="mb-8">
            <div className="mb-6 inline-block bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 rounded-xl p-[2px] shadow-lg">
              <div className="bg-white dark:bg-gray-800 rounded-lg px-4 py-2">
                <span className="text-sm font-medium bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Full Stack Developer
                </span>
              </div>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-4 text-gray-900 dark:text-gray-100">
              Hello, I'm{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Raghav
              </span>
            </h1>
            <div className="h-1 w-24 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full mb-6"></div>
            <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
              🚀 Passionate about crafting full-cycle solutions from concept to
              deployment
            </p>
          </div>

          <div className="mb-10">
            <h2 className="text-lg font-bold mb-5 text-gray-900 dark:text-gray-100 flex items-center">
              <Code className="mr-3 text-indigo-600 animate-float" size={20} />
              Core Technologies
            </h2>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill) => (
                <SkillBadge key={skill} skill={skill} />
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-bold mb-5 text-gray-900 dark:text-gray-100 flex items-center">
              <Mail className="mr-3 text-indigo-600 animate-float" size={20} />
              Let's Collaborate
            </h2>
            <div className="flex gap-4 mb-8">
              <Link
                href="https://github.com/ragsav"
                className="p-2.5 rounded-xl bg-white dark:bg-gray-800 shadow-sm hover:bg-indigo-50 dark:hover:bg-gray-700 hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-700"
              >
                <Github className="h-6 w-6 text-gray-800 dark:text-gray-200" />
              </Link>
              <Link
                href="https://www.linkedin.com/in/raghav-nagpure-079118170"
                className="p-2.5 rounded-xl bg-white dark:bg-gray-800 shadow-sm hover:bg-blue-50 dark:hover:bg-blue-700 hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-700"
              >
                <Linkedin className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </Link>
              <Link
                href="https://x.com/Raghav42813010"
                className="p-2.5 rounded-xl bg-white dark:bg-gray-800 shadow-sm hover:bg-indigo-50 dark:hover:bg-indigo-700 hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-700"
              >
                <Twitter className="h-6 w-6 text-gray-800 dark:text-gray-200" />
              </Link>
            </div>
            <ContactForm />
          </div>
        </header>

        <section className="flex-1">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 flex items-center">
              <Briefcase
                className="mr-3 text-indigo-600 animate-float"
                size={28}
              />
              Featured Work
            </h2>
          </div>

          <div className="grid gap-8 lg:gap-10">
            {projects.map((project, index) => (
              <ProjectCard key={index} project={project} index={index} />
            ))}
          </div>
        </section>
      </div>

      <footer className="mt-24 py-8 bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-900 text-indigo-100 dark:bg-gradient-to-r dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <p className="text-lg font-medium mb-2">Raghav Nagpure</p>
              <p className="text-sm opacity-80">
                Turning complex problems into elegant solutions
              </p>
            </div>
            
          </div>
          <div className="mt-8 text-center text-xs opacity-70">
            © {new Date().getFullYear()} All rights reserved
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
