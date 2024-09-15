"use client";
import { useState } from "react";
import {
  Send,
  ChevronDown,
  ChevronUp,
  User,
  Briefcase,
  Code,
  Mail,
  Github,
  Linkedin,
  Twitter,
} from "lucide-react";
import { useForm, ValidationError } from "@formspree/react";
import Image from "next/image";
import Link from "next/link";

const projects = [
  {
    name: "Washed-up",
    shortDescription:
      "Laundary automation web app for hostels, campuses and hotels",
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
    name: "Hover mobility",
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
    name: "Grin mobility",
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
    name: "Jet-admin",
    shortDescription: "Powerfull admin panel for postgres based backend",
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
  // {
  //   name: "Jet-invoice",
  //   shortDescription: "Automated invoicing system for jet rentals",
  //   longDescription: [
  //     "Built a sophisticated invoicing system tailored for the private jet industry",
  //     "Implemented automatic generation of itemized invoices based on flight data",
  //     "Created a customizable template system for branded invoice generation",
  //     "Integrated with popular payment gateways for seamless online payments",
  //     "Developed a reporting module for financial analysis and tax preparation",
  //   ],
  //   tech: ["Next.js", "NestJS", "MongoDB", "Stripe API", "PDF.js"],
  //   image: null,
  // },
  {
    name: "FilmArsty landing page",
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

const Card = ({ children, className = "" }) => (
  <div
    className={`bg-white border-gray-400 border rounded-lg overflow-hidden ${className}`}
  >
    {children}
  </div>
);

const CardHeader = ({ children, className = "" }) => (
  <div
    className={`px-6 py-2 border-t text-slate-50 bg-gray-900 border-gray-900 font-extrabold ${className}`}
  >
    {children}
  </div>
);

const CardContent = ({ children, className = "" }) => (
  <div className={`px-6 py-4 ${className}`}>{children}</div>
);

const Button = ({ children, className = "", ...props }) => (
  <button
    className={`px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
    {...props}
  >
    {children}
  </button>
);

const ProjectCard = ({ project }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className="overflow-hidden flex flex-col bg-blue-100">
      {project.image && (
        <Image
          src={project.image}
          alt={project.name}
          width={"1000"}
          height={"400"}
          className=" object-fill"
        />
      )}
      {project.video && (
        <video
          autoPlay={true}
          loop={true}
          width={"1000"}
          height={"400"}
          controls
          preload="none"
        >
          <source src={project.video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
      <CardHeader className="text-xl font-semibold text-gray-900">
        {project.name}
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-between bg-slate-100">
        <div>
          <p className="mb-2 text-gray-800 font-semibold">
            {project.shortDescription}
          </p>
          <ul className="list-disc pl-5 mb-4 space-y-1 text-gray-800">
            {project.longDescription.map((point, index) => (
              <li className="text-sm font-normal text-gray-700" key={index}>
                {point}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tech.map((tech, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const ContactForm = () => {
  const [state, handleSubmit] = useForm("mjvjpjqy");
  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-1 flex flex-col justify-start items-start w-full"
    >
      <label
        htmlFor="email"
        className="block text-sm font-medium text-gray-900 "
      >
        Email
      </label>
      <input
        type="text"
        id="email"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
        placeholder="John"
        required
      />
      <ValidationError prefix="Email" field="email" errors={state.errors} />
      <label
        htmlFor="message"
        className="block text-sm font-medium text-gray-900 !mt-6"
      >
        Your message
      </label>
      <textarea
        id="message"
        rows="4"
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
        placeholder="Write your thoughts here..."
      ></textarea>
      <ValidationError prefix="Message" field="message" errors={state.errors} />

      <button
        type="submit"
        disabled={state.submitting}
        className="!mt-6 w-full relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
      >
        <span className="w-full relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
          Get in touch
        </span>
      </button>
    </form>
  );
};

const Home = () => {
  return (
    <div className="bg-white flex md:flex-row md:justify-evenly md:items-start  flex-col justify-start items-stretch md:overflow-hidden">
      <header className="text-center justify-start flex flex-col items-center md:h-[100vh] bg-white overflow-hidden p-5 w-full md:w-1/3 lg:w-1/3">
        <h1 className="text-4xl font-bold mb-2 text-slate-700">
          Hello, I am Raghav
        </h1>
        <p className="text-xl text-slate-600 mb-4 font-extralight ">
          🚀 Enthusiastic Full-Stack Developer | Passionate about Crafting
          Impactful Web and Mobile Solutions
        </p>
        <p className="text-sm text-gray-600 mb-4 font-bold">🔑 Key Skills</p>
        <div className="flex flex-wrap gap-2 mb-4 justify-center max-w-lg">
          {[
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
            "Payment Gateway Integrations",
            "Webhooks",
            "Mongoose ORM",
            "AWS WAF",
            "AWS EC2",
            "AWS lambda",
            "GCP function",
            "Microservices",
          ].map((tech, index) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="flex justify-center space-x-4">
          <Link href="https://x.com/Raghav42813010" variant="ghost" size="icon">
            <Github className="h-5 w-5 text-slate-900" />
          </Link>
          <Link href="https://github.com/ragsav" variant="ghost" size="icon">
            <Linkedin className="h-5 w-5 text-blue-600" />
          </Link>
          <Link
            href="www.linkedin.com/in/raghav-nagpure-079118170"
            variant="ghost"
            size="icon"
          >
            <Twitter className="h-5 w-5 text-slate-900" />
          </Link>
        </div>
        <ContactForm />
      </header>

      <section className="md:h-[100vh] md:overflow-y-scroll bg-white p-5 w-full md:w-2/3 lg:w-2/3">
        <h2 className="text-base font-bold mb-6 flex items-center text-gray-800">
          <Briefcase className="mr-2" size={20} />
          Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
