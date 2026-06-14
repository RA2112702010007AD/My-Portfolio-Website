export interface Project {
  title: string;
  subtitle: string;
  sourceUrl?: string;
  technologies: string[];
  highlights: string[];
}

export interface Experience {
  role: string;
  company: string;
  location?: string;
  period: string;
  highlights: string[];
}

export interface Education {
  institution: string;
  location: string;
  degree: string;
  period: string;
  cgpaSchema: string;
}

export interface Certification {
  name: string;
  issuer?: string;
}

export interface Achievement {
  name: string;
}

export interface ResumeData {
  personalInfo: {
    fullName: string;
    location: string;
    phone: string;
    email: string;
    linkedin: string;
    github: string;
    hackerRank: string;
  };
  professionalSummary: string;
  education: Education[];
  skills: {
    programming: string[];
    aiMl: string[];
    dataScience: string[];
    frameworksTools: string[];
    cloud: string[];
    databases: string[];
    coreCS: string[];
  };
  experience: Experience[];
  projects: Project[];
  publications: {
    title: string;
    publisher: string;
    highlights: string[];
  }[];
  certifications: Certification[];
  achievements: Achievement[];
  additionalInfo: {
    languages: string[];
    areasOfInterest: string[];
  };
}

export const resumeData: ResumeData = {
  personalInfo: {
    fullName: "Anurag Das",
    location: "Chennai, Tamil Nadu, India",
    phone: "+91 7200417473",
    email: "anuragdas.87542026@outlook.com",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    hackerRank: "https://hackerrank.com"
  },
  professionalSummary: "Integrated M.Tech student in Computer Science and Engineering (Cognitive Computing) with experience in Artificial Intelligence, Machine Learning, Generative AI, Natural Language Processing, Retrieval-Augmented Generation (RAG), and Software Development. Skilled in developing AI proof-of-concepts, scalable applications, predictive analytics solutions, intelligent automation systems, and cloud-enabled AI workflows. Strong foundation in Python, Machine Learning, FastAPI, SQL, cloud technologies, and software engineering principles with demonstrated success through internships, research publications, and industry projects.",
  education: [
    {
      institution: "SRM Institute of Science and Technology",
      degree: "Integrated M.Tech, Computer Science and Engineering (Cognitive Computing)",
      location: "Kattankulathur, Chennai",
      period: "2021 – 2026",
      cgpaSchema: "CGPA: 8.78 / 10"
    },
    {
      institution: "SBOA School and Junior College",
      degree: "Class XII (CBSE) - 95.2%",
      location: "Chennai, India",
      period: "2020 – 2021",
      cgpaSchema: "Percentage: 95.2%"
    },
    {
      institution: "SBOA School and Junior College",
      degree: "Class X (CBSE) - 91.6%",
      location: "Chennai, India",
      period: "2018 – 2019",
      cgpaSchema: "Percentage: 91.6%"
    }
  ],
  skills: {
    programming: ["Python", "C", "SQL", "Java"],
    aiMl: [
      "Machine Learning", 
      "Deep Learning", 
      "Generative AI", 
      "Large Language Models (LLMs)", 
      "Natural Language Processing (NLP)", 
      "Prompt Engineering", 
      "Retrieval-Augmented Generation (RAG)", 
      "LangChain", 
      "Agentic AI", 
      "AI Reliability", 
      "LLM Evaluation", 
      "Vector Databases (FAISS)", 
      "Scikit-learn", 
      "PyTorch", 
      "Machine Learning Operations (MLOps)"
    ],
    dataScience: [
      "Data Analysis", 
      "Data Visualization", 
      "Exploratory Data Analysis (EDA)", 
      "Feature Engineering", 
      "Statistical Analysis", 
      "Predictive Analytics", 
      "ETL", 
      "Data Pipelines", 
      "Pandas", 
      "NumPy", 
      "Power BI"
    ],
    frameworksTools: [
      "FastAPI", 
      "Flask", 
      "Streamlit", 
      "REST APIs", 
      "Git", 
      "GitHub", 
      "Docker", 
      "Cursor IDE", 
      "Visual Studio Code", 
      "Jupyter Notebook", 
      "Google Colab", 
      "React", 
      "Node.js"
    ],
    cloud: ["Oracle Cloud Infrastructure", "Cloud AI Services"],
    databases: ["MySQL", "SQL"],
    coreCS: [
      "Data Structures and Algorithms", 
      "Object-Oriented Programming", 
      "Database Management Systems (DBMS)", 
      "Operating Systems", 
      "Computer Networks", 
      "Software Engineering Principles", 
      "Concurrency", 
      "Multithreading"
    ]
  },
  experience: [
    {
      role: "AI/ML Intern",
      company: "Denvik Technology Pvt. Ltd.",
      period: "Feb 2025 – Aug 2025",
      highlights: [
        "Developed predictive analytics solutions for poultry health monitoring using environmental sensor data.",
        "Built Random Forest and Gradient Boosting models achieving 91% classification accuracy for disease risk assessment.",
        "Designed real-time Streamlit dashboards for monitoring environmental conditions and prediction outputs.",
        "Improved model performance through feature engineering, preprocessing, validation, and hyperparameter optimization.",
        "Collaborated with academic and industry stakeholders to deliver AI-driven decision-support solutions."
      ]
    },
    {
      role: "Machine Learning & Full Stack Developer Intern",
      company: "Slash Mark IT Solutions",
      period: "Mar 2024 – Aug 2024",
      highlights: [
        "Developed backend APIs and integrated machine learning components into full-stack applications using Python-based technologies.",
        "Developed machine learning prototypes for predictive business analytics applications.",
        "Built responsive web applications with frontend-backend integration and scalable architecture.",
        "Collaborated within agile development teams to deliver production-ready software solutions.",
        "Performed feature engineering, model optimization, and deployment preparation activities."
      ]
    },
    {
      role: "Virtual Software Development Experience",
      company: "Citi (Forage)",
      period: "Mar 2026 – Apr 2026",
      highlights: [
        "Completed a software development job simulation focused on improving loan management systems and stock market risk reporting processes.",
        "Designed and documented loan management workflows using Unified Modeling Language (UML) state diagrams.",
        "Researched machine learning approaches for credit risk assessment and provided technical recommendations.",
        "Developed a Java-based internal tool for real-time visualization of stock market risk metrics.",
        "Applied software engineering, analytical thinking, and problem-solving skills in a simulated enterprise banking environment."
      ]
    }
  ],
  projects: [
    {
      title: "Reflective RAG: Self-Correcting AI Research Assistant",
      subtitle: "Research Publication in IEEE ICT 2026",
      sourceUrl: "https://github.com",
      technologies: ["Python", "LangChain", "OpenAI API", "FastAPI", "FAISS", "Streamlit", "NLP"],
      highlights: [
        "Designed and developed a Retrieval-Augmented Generation (RAG) framework to improve factual accuracy and reduce hallucinations in AI-generated responses.",
        "Designed agentic AI workflows for iterative reasoning, evidence validation, and self-correcting response generation using LangChain-based orchestration.",
        "Implemented reflective reasoning, evidence validation, and iterative self-correction workflows for trustworthy AI outputs.",
        "Designed scalable REST APIs using FastAPI for model inference and enterprise integration.",
        "Integrated vector-based document retrieval using FAISS to enhance contextual response generation.",
        "Published research findings in IEEE ICICT 2026, demonstrating improved reliability of AI-assisted research workflows."
      ]
    },
    {
      title: "Smart Poultry Health Management: AI-Powered Disease Detection",
      subtitle: "Full-Stack Predictive System",
      sourceUrl: "https://github.com",
      technologies: ["Python", "Machine Learning", "Random Forest", "Gradient Boosting", "Streamlit", "SQL"],
      highlights: [
        "Developed an AI-powered disease prediction system using environmental sensor data including temperature, humidity, Carbon Dioxide, and ammonia levels.",
        "Trained and evaluated Random Forest and Gradient Boosting models for early disease risk assessment.",
        "Built an interactive Streamlit dashboard for real-time monitoring and decision support.",
        "Applied feature engineering, pre-processing, and model optimization techniques to improve prediction performance.",
        "Translated agricultural monitoring challenges into a deployable AI-driven solution for poultry farm management."
      ]
    },
    {
      title: "Social Media Analytics to Strengthen Global Collaboration",
      subtitle: "NLP and Sentiment Mining Model",
      sourceUrl: "https://github.com",
      technologies: ["Python", "NLP", "TF-IDF", "Machine Learning", "Data Visualization"],
      highlights: [
        "Developed NLP-based analytics using Cursor IDE with Claude assistance using prompt engineering to analyze large-scale social media conversations.",
        "Applied TF-IDF vectorization and machine learning techniques for sentiment classification and trend identification.",
        "Performed exploratory data analysis and visualization to uncover collaboration and engagement patterns.",
        "Generated actionable insights to support data-driven decision-making and partnership strategies."
      ]
    }
  ],
  publications: [
    {
      title: "Reflective RAG: A Self-Correcting Cognitive Framework for Reducing Hallucinations in AI Research Assistants",
      publisher: "Published in IEEE Xplore (ICICT 2026)",
      highlights: [
        "Proposed a reflective Retrieval-Augmented Generation framework for improving factual accuracy and reliability.",
        "Integrated retrieval validation, iterative reasoning, and evidence-grounded response generation.",
        "Demonstrated significant reduction in hallucination rates through benchmark evaluations."
      ]
    }
  ],
  certifications: [
    { name: "Oracle Cloud Infrastructure 2025 Certified Generative AI Professional" },
    { name: "Oracle Cloud Infrastructure 2025 Certified Data Science Professional" },
    { name: "AI for Medical Diagnosis – DeepLearning.AI" },
    { name: "Geodata Processing using Python and Machine Learning – IIRS-ISRO" },
    { name: "Introduction to Industry 4.0 and Industrial Internet of Things (NPTEL-SWAYAM), Elite Certification" },
    { name: "Career Edge – Young Professional (TCS iON)" },
    { name: "Programming with Python (Internshala Training)" }
  ],
  achievements: [
    { name: "Top Performer Recognition – Indian Institute of Remote Sensing (IIRS-ISRO)" },
    { name: "Performance-Based Scholarship – SRM Institute of Science and Technology" },
    { name: "AINCAT’26 Rank 151" }
  ],
  additionalInfo: {
    languages: ["English", "Bengali", "Hindi", "Tamil"],
    areasOfInterest: [
      "Software Engineering", "Data Analytics", "Business Analytics", "Artificial Intelligence", "Machine Learning",
      "Deep Learning", "Generative AI", "Large Language Models (LLMs)", "Natural Language Processing (NLP)",
      "Retrieval-Augmented Generation (RAG)", "Data Science", "Explainable AI (XAI)", "Intelligent Automation",
      "Cloud AI Solutions", "Computational Linguistics Backend Engineering", "Frontend Engineering"
    ]
  }
};
