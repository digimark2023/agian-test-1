"use client";
// import "../styles/globals.css";
// //import { sofia_Sans } from "next/font/google";
// import "../styles.css";
import Head from "next/head";
import Image from "next/image";
import { useRef, useState } from "react";
import React, { useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
// import DropDown, { VibeType } from "../components/DropDown";
//import DropDown from "../components/DropDown";
import CategoriesDropDown1 from "../../components/newdd";
import MultiSelectDropDown from "../../components/MultiSelectDropDown";
import CategoriesDropDown from "../../components/CategoriesDropDown";
import Footer from "../../components/Footer";
import Github from "../../components/GitHub";
import Header from "../../components/Header";
import { useChat } from "ai/react";
import categoryData from "../../app/category_data.json";
import businessGoalsData from "../../app/businessgoals.json";
import SupportAndResourcesData from "../../app/SupportAndResources.json";
import DropDown_latest from "../../components/DropDown_latest";
import DropDown, { OptionType } from "../../components/DropDown";
import { ReactNode } from "react";
import Link from "next/link";
import { Roboto_Flex } from "@next/font/google";
import citydata from "../../app/test1.json";
import { XCircleIcon } from "@heroicons/react/20/solid"; // Import XCircleIcon
import qualificationsData from "../../app/qualifications.json"; // Adjust the import path as needed

import budgetRangeOptionsData from "../../app/budgetRange.json";
//import jobOptionsData from "../../app/jobOptions.json";
import CommpNichesData from "../../app/CompettativesNiches.json";
import TargetUsersOptionsData from "../../app/TargetMarketUsers.json";
import jobOptionsData from "../../app/jobOptions.json";
//budgetRangeOptions;

import "../../styles/globals.css";
import "../styles.css";
import MultiSelectDropDownSubCat from "../../components/MultiSelectDropDown_Subcat";
type JobOption = {
  job: string;
  description: string;
};

type IndustryCategory = {
  industryCategory: string;
  description: string;
  jobs: JobOption[];
};
type StateCity = {
  state: string;
  cities: string[];
};

type Selection = {
  country: string;
  state: string;
  city: string;
};

const satisfy = Roboto_Flex({
  subsets: ["latin"],
  weight: "400",
});
type TargetUsersSubCategory = {
  subcategoryName: string;
  Subcategories: string[];
};

type TargetUsers = {
  MainUserCategory: string;
  description: string;
  UserSubCategories: TargetUsersSubCategory[];
};

//export type OptionType = string;

export default function Page() {
  const [q_experience, setQ_experience] = useState(""); // State variable for qualitative experience details
  const [selectedQualification, setSelectedQualification] =
    useState<OptionType>("");

  // Map qualifications data to dropdown options
  const qualificationOptions = qualificationsData.map((q) => q.Qualification);
  const [selectedIndustry, setSelectedIndustry] = useState<OptionType>("");
  const [selectedJob, setSelectedJob] = useState<OptionType>("");
  const [availableJobs, setAvailableJobs] = useState<OptionType[]>([]);

  useEffect(() => {
    // Find the selected industry category in the job options data
    const industry = jobOptionsData.jobOptions.find(
      (industry) => industry.industryCategory === selectedIndustry
    );
    // Set available jobs based on the selected industry
    const jobs = industry?.jobs.map((job) => job.job) || [];
    setAvailableJobs(jobs);
    // Reset selected job when changing industries
    setSelectedJob("");
  }, [selectedIndustry]);
  const [selectedTargetMainCat, setSelectedTargetUsers] =
    useState<TargetUsers | null>(null);
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>(
    []
  );

  // When the selected budget users changes, update the selectedTargetUsers state
  useEffect(() => {
    const TargetUsers = TargetUsersOptionsData.MarketUsers.find(
      (br) => br.MainUserCategory === selectedTargetMainCat?.MainUserCategory
    );
    setSelectedTargetUsers(TargetUsers || null);
  }, [selectedTargetMainCat?.MainUserCategory]);

  const handleTargetUsersSelection = (users: string) => {
    // Find the budget users object and set it
    const TargetUsers = TargetUsersOptionsData.MarketUsers.find(
      (br) => br.MainUserCategory === users
    );
    setSelectedTargetUsers(TargetUsers || null);
  };

  const handleSubcategorySelection_target = (selectedItems: string[]) => {
    setSelectedSubcategories(selectedItems);
    setQtargetAudience(selectedItems.join(", "));
  };

  // Extract subcategories and their items into a flattened array for the dropdown
  const subcategoryOptions_target = selectedTargetMainCat
    ? selectedTargetMainCat.UserSubCategories.flatMap((sub) => [
        sub.subcategoryName,
        ...sub.Subcategories,
      ])
    : [];
  const [selectedCountry, setSelectedCountry] = useState<OptionType>("");
  const [stateCities, setStateCities] = useState<StateCity[]>([]);
  const [selections, setSelections] = useState<Selection[]>([]);
  const [selectionStrings, setSelectionStrings] = useState<string[]>([]);

  const [subcategoryOptions_brange, setSubcategoryOptions_brange] = useState<
    string[]
  >([]);
  //const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState<string[]>([]);

  const [selectedTargetAudSubcategory, setSelectedTargetAudSubcategory] =
    useState<string[]>([]);

  useState<string[]>([]);

  const [subcategoryOptions, setSubcategoryOptions] = useState<string[]>([]);

  const [subcategoryOptionsAud, setsubcategoryOptionsAud] = useState<string[]>(
    []
  );
  const [selectedBudgetRange, setselectedBudgetRange] = useState("");

  useEffect(() => {
    const selectedCategory = budgetRangeOptionsData.budgetRanges.find(
      (option) => option.range === selectedBudgetRange
    );
    if (selectedCategory) {
      setSubcategoryOptions(
        selectedCategory.subcategories.map((sub) => sub.subRange)
      );
      setSelectedSubcategory([]); // Reset with an empty array, not an empty string
    } else {
      setSubcategoryOptions([]);
    }
  }, [selectedBudgetRange, budgetRangeOptionsData.budgetRanges]);

  // For Loading job types

  //ends here

  useEffect(() => {
    const countryData = citydata.find((c) => c.Country === selectedCountry);
    setStateCities(countryData ? countryData.StateCity : []);

    // Clear previous selections from the same country
    setSelections((selections) =>
      selections.filter((s) => s.country !== selectedCountry)
    );
  }, [selectedCountry]);
  useEffect(() => {
    setSelectionStrings(
      selections
        .map((s) => {
          if (s !== null) {
            return `${s.country}: ${s.state} - ${s.city}`;
          }
          return "";
        })
        .filter((str) => str !== "")
    );
  }, [selections]);

  const handleCitySelectionChange = (selectedItems: string[]) => {
    const filteredSelections = selections.filter(
      (s) => s.country !== selectedCountry
    );

    const newSelections: Selection[] = selectedItems
      .map((city) => {
        const stateCity = stateCities.find((sc) => sc.cities.includes(city));
        if (stateCity) {
          return {
            country: selectedCountry,
            state: stateCity.state,
            city: city,
          };
        }
        return null;
      })
      .filter((item): item is Selection => item !== null);

    setSelections([...filteredSelections, ...newSelections]);
  };

  const removeSelection = (indexToRemove: number) => {
    // Create a new array without the selection to remove
    const updatedSelections = selections.filter(
      (_, index) => index !== indexToRemove
    );

    // Update the selections state
    setSelections(updatedSelections);

    // Update the selection strings, asserting non-null
    setSelectionStrings(
      updatedSelections.map((s) => `${s.country}: ${s.state} - ${s.city}`)
    );
  };

  const [bio, setBio] = useState("");
  //const [vibe, setVibe] = useState<VibeType>("Professional");
  const [vibe, setVibe] = useState("Professional");
  const [interest, setInterest] = useState("");
  const [skillsExp, setskillsExp] = useState("");

  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [currentOccupation, setcurrentOccupation] = useState("");
  const [experice, setExperience] = useState("");
  const [EduQulaification, setEduQulaification] = useState("");
  const [uniqueSkills, setuniqueSkills] = useState("");

  const [location, setlocation] = useState("");
  const [comptattiveAnaalysis, setcomptattiveAnaalysis] = useState("");
  const [businessModel, setbusinessModel] = useState("");
  const [legalAndRegulatoryIssues, setlegalAndRegulatoryIssues] = useState("");
  const [longTermVision, setlongTermVision] = useState("");
  const [workLifeBalance, setworkLifeBalance] = useState("");
  const [riskAssessment, setriskAssessment] = useState("");
  const [budgetRange, setbudgetRange] = useState("");

  interface CustomDivProps {
    children: ReactNode;
  }

  const CustomDiv: React.FC<CustomDivProps> = ({ children }) => (
    <div
      className="font-medium flex flex-col mt-5 mb-4 items-start space-y-3 p-5 rounded-lg bg-white text-[#302F84] border-2
     border-blue-200  shadow-blue-500/20 shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)]"
    >
      {/* className="flex flex-col mt-5 mb-4 items-start space-y-3 p-5 rounded-lg bg-white text-[#237040] border-2
     border-green-500  shadow-[5px_5px_rgba(0,_98,_90,_0.4),_10px_10px_rgba(0,_98,_90,_0.3),_15px_15px_rgba(0,_98,_90,_0.2),_20px_20px_rgba(0,_98,_90,_0.1),_25px_25px_rgba(0,_98,_90,_0.05)]" */}
      {children}
    </div>
  );

  //export default CustomDiv;

  const [budget, setbudget] = useState("");
  const interestOptions = [
    "Agricultural Products and Services (organic farming, agri-tech solutions)",
    "Alternative Medicine (holistic health centers, alternative therapies)",
    "Art and Culture (art galleries, cultural festivals)",
    "Art and Culture (art galleries, cultural festivals)",
    "Artificial Intelligence (AI research, machine learning applications)",
    "Automated Manufacturing (automation in manufacturing, industrial robotics)",
    "Automated Robotics (robotics manufacturing, automation solutions)",
    "Automotive Industry (auto dealerships, car maintenance services)",
    "Aviation and Aerospace (aviation companies, aerospace innovation)",
    "Biodegradable Products (eco-friendly packaging, biodegradable materials)",
    "Biological Conservation (ecological restoration, biodiversity preservation)",
    "Biotechnology and Pharmaceuticals (biotech companies, drug development)",
    "Blockchain and Cryptocurrency (blockchain startups, crypto exchanges)",
    "Carbon Offset and Reduction (carbon offset programs, carbon reduction solutions)",
    "Clean Energy Solutions (clean energy startups, energy-efficient technologies)",
    "Community Development (neighborhood revitalization, community outreach)",
    "Cultural Experiences (cultural exchange programs, heritage tours)",
    "Cybersecurity (cybersecurity firms, threat detection)",
    "Data Science and Analytics (data analytics firms, data-driven insights)",
    "Digital Art and NFTs (digital art creation, NFT platforms)",
    "Digital Marketing (digital marketing agencies, SEO services)",
    "E-commerce (online retail, niche product sales)",
    "Eco-Tourism (eco-friendly travel destinations, eco-tours)",
    "Education Technology (edtech startups, online learning platforms)",
    "Education and Training Services (coaching centers, online courses)",
    "Emerging Tech Startups (emerging technology startups, tech incubators)",
    "Entertainment and Media (production companies, digital content creation)",
    "Environmental Conservation (wildlife preservation, conservation nonprofits)",
    "Environmental Engineering (environmental impact assessment, water management)",
    "Ethical Consumerism (ethical consumer products, sustainable shopping)",
    "Fashion and Textiles (boutique stores, online fashion retail)",
    "Fashion Technology (wearable tech, smart textiles)",
    "Financial Services (investment firms, wealth management)",
    "Fitness Tech (fitness wearables, health tracking apps)",
    "Fitness and Wellness (gyms, wellness coaching)",
    "Food and Beverage (regional cuisine restaurants, food delivery services)",
    "Gaming and Esports (gaming studios, esports tournaments)",
    "Green Building and Architecture (sustainable architecture, LEED certification)",
    "Green Technology (eco-friendly products, sustainable technology)",
    "Healthcare Services (clinics, telemedicine)",
    "Hospitality and Catering (hotels, event catering)",
    "Human Resources and Recruitment (HR consulting, talent acquisition)",
    "Humanitarian Aid and Relief (humanitarian organizations, disaster relief)",
    "Inclusive Design and Accessibility (accessible design, inclusive products)",
    "Influencer Marketing (influencer partnerships, social media influencers)",
    "Innovative Education (innovative teaching methods, online education platforms)",
    "Innovative Transportation (electric vehicles, transportation technology)",
    "International Trade and Import/Export (import/export companies, trade logistics)",
    "Luxury Goods and Services (luxury brands, upscale experiences)",
    "Luxury Travel and Experiences (luxury travel agencies, exclusive vacations)",
    "Manufacturing and Industrial (manufacturing plants, industrial equipment)",
    "Marine and Ocean Exploration (oceanography research, marine conservation)",
    "Mental Health and Wellness (mental health clinics, therapy services)",
    "Mobile App Development (mobile app design, app development agencies)",
    "Music and Entertainment Events (concert promotion, entertainment venues)",
    "Nonprofit Organizations (charities, humanitarian organizations)",
    "Political Consulting (political campaign management, public affairs)",
    "Product Design and Innovation (product development, design thinking)",
    "Product Marketing (product launch strategy, marketing campaigns)",
    "Real Estate and Property Development (real estate agencies, property investment)",
    "Renewable Energy (solar energy products, energy consulting)",
    "Renewable Energy Consulting (green energy consulting, renewable projects)",
    "Renovation and Home Improvement (home renovation services, interior design)",
    "Social Entrepreneurship (social enterprises, impact investing)",
    "Social Media Management (social media marketing, content strategy)",
    "Space Exploration (space agencies, space technology)",
    "Space Medicine and Health (space medicine research, astronaut health)",
    "Space Tourism (commercial space travel, space tourism companies)",
    "Sustainable Agriculture (organic farming, farm-to-table products)",
    "Sustainable Fashion (sustainable clothing brands, eco-friendly fashion)",
    "Sustainable Tourism (eco-friendly travel, sustainable tourism initiatives)",
    "Sustainable Transportation (electric vehicles, sustainable transportation)",
    "Technology and IT Services (e.g., app development, IT consulting)",
    "Travel and Tourism (travel agencies, cultural tours)",
    "Virtual Reality (VR experiences, VR gaming)",
    "Wildlife Photography (wildlife photography tours, nature conservation)",
    "Wine and Vineyards (wineries, wine production)",
  ];

  const skillsOptions = [
    "Aerospace Engineering (aircraft design, aerospace technology)",
    "Architecture and Urban Planning (architectural design, urban development)",
    "Artificial Intelligence and Machine Learning (AI research, machine learning algorithms)",
    "Astronomy and Planetary Science (astronomical research, planetary exploration)",
    "Biohacking and Longevity Science (biohacking practices, longevity research)",
    "Bioinformatics and Computational Biology (genomic analysis, computational modeling)",
    "Biological Conservation and Sustainability (conservation planning, sustainable practices)",
    "Biomedical Science (medical research, laboratory techniques)",
    "Blockchain Art and NFTs (blockchain-based art, NFT creation)",
    "Blockchain and Cryptocurrency (blockchain development, crypto trading)",
    "Business and Management (strategic planning, operations management)",
    "Cognitive Behavioral Therapy (CBT, mental health counseling)",
    "Communication and Public Relations (public speaking, media relations)",
    "Construction and Engineering (civil engineering, architectural design)",
    "Cryptocurrency and Blockchain Technology (blockchain development, crypto trading)",
    "Data Analysis and Analytics (data mining, data visualization)",
    "Decentralized Finance (DeFi, decentralized financial services)",
    "Disaster Management and Emergency Response (disaster preparedness, crisis response)",
    "Diversity, Equity, and Inclusion Consulting (DEI consulting, inclusive workplace practices)",
    "Drone Technology and Aerial Surveying (drone operations, aerial mapping)",
    "E-commerce and Online Retail (e-commerce strategy, online store management)",
    "Epidemiology and Disease Modeling (disease surveillance, epidemiological studies)",
    "Entrepreneurship and Startups (business development, startup consulting)",
    "Environmental Conservation and Sustainability (conservation planning, sustainable practices)",
    "Environmental Engineering (environmental impact assessment, water management)",
    "Environmental Sustainability (sustainable practices, conservation)",
    "Event Coordination and Wedding Planning (event planning, wedding coordination)",
    "Event Planning and Management (event coordination, logistics)",
    "Fashion Design and Apparel Production (fashion design, garment manufacturing)",
    "Financial Services (investment firms, wealth management)",
    "Fitness and Personal Training (personal training, fitness coaching)",
    "Forensic Science and Crime Scene Investigation (forensic analysis, crime scene reconstruction)",
    "Forestry and Timber Management (forestry practices, timber harvesting)",
    "Graphic Design and Branding (brand identity, logo design)",
    "Graphic Design and Multimedia (graphic design, video editing)",
    "Healthcare Administration and Hospital Management (hospital administration, healthcare policy)",
    "Healthcare (nursing, healthcare management)",
    "Human Resources (recruitment, training and development)",
    "Humanitarian Aid and Disaster Relief (emergency response, relief coordination)",
    "Immersive Theater Production (immersive theater experiences, interactive storytelling)",
    "Indigenous Knowledge and Cultural Preservation (indigenous studies, cultural heritage preservation)",
    "Information Technology (network administration, cybersecurity)",
    "Interior Design (space planning, interior decoration)",
    "International Relations and Diplomacy (foreign policy analysis, diplomatic negotiations)",
    "Investment Banking and Financial Analysis (investment banking, financial analysis)",
    "Legal (legal consulting, compliance services)",
    "Market Research and Consumer Behavior Analysis (market research, consumer insights)",
    "Mobile App Development and UX/UI Design (app development, user interface design)",
    "Music and Performing Arts (music composition, theater production)",
    "Music Production and Audio Engineering (music production, sound engineering)",
    "Neuroscience and Brain Research (neurological studies, brain imaging)",
    "Nonprofit and NGO Management (nonprofit organization management, fundraising)",
    "Oceanography and Marine Biology (ocean exploration, marine ecosystem studies)",
    "Pharmacy and Pharmaceutical Sciences (pharmacy services, drug research)",
    "Photography and Videography (photography, video production)",
    "Political Science and Policy Analysis (policy research, political analysis)",
    "Project Management (project planning, resource allocation)",
    "Psychology and Counseling (therapy, counseling services)",
    "Public Health (epidemiology, health policy)",
    "Public Relations and Crisis Management (PR strategy, crisis communication)",
    "Quality Assurance and Testing (software testing, quality control)",
    "Real Estate and Property Management (real estate sales, property management)",
    "Renewable Agriculture and Permaculture (sustainable farming, permaculture design)",
    "Renewable Energy Innovation (alternative energy solutions, green tech development)",
    "Renewable Energy and Sustainability Consulting (renewable energy solutions, sustainability consulting)",
    "Research and Development (product research, innovation)",
    "Robotics and Automation (robotics engineering, automation systems)",
    "Skills Options Placeholder",
    "Social Media and Community Management (social media marketing, community engagement)",
    "Social Work and Counseling (counseling, social services)",
    "Space Exploration and Astrophysics (space research, astrophysical studies)",
    "Space Medicine and Astronaut Training (space medicine research, astronaut training)",
    "Sustainable Architecture (green building design, sustainable construction)",
    "Sustainable Fashion and Textile Design (sustainable fashion, eco-friendly textiles)",
    "Synthetic Biology and Genetic Engineering (synthetic biology research, genetic modification)",
    "Technical (software development, engineering)",
    "Technology and IT Services (e.g., app development, IT consulting)",
    "Transhumanism and Bioengineering (transhumanist research, bioengineering)",
    "Translation and Interpretation Services (language translation, interpretation)",
    "Virtual Reality and Augmented Reality (VR/AR development, immersive experiences)",
    "Wearable Technology and IoT (wearable device development, IoT solutions)",
    "Wildlife Conservation and Ecology (wildlife preservation, ecosystem analysis)",
    "Writing and Content Development (copywriting, content strategy)",
  ];

  const ageOptions = [
    "Below 16 years",
    "16 yrs - 24 yrs",
    "25 yrs - 32 yrs",
    "33 yrs - 40 yrs",
    "41 yrs - 48 yrs",
    "49 yrs - 54 yrs",
    "55 yrs - 62 yrs",
    "Above 63years",
  ];

  const genderOptions = ["Male", "Female", "Not to say"];

  const locationOptions = [
    "Major Cities (Delhi, Mumbai, Bangalore, etc.)",
    "Tier-II Cities (Pune, Jaipur, Lucknow, etc.)",
    "Rural Areas",
    "Online Platforms",
    "Traveling or Mobile Services",
    "Home-based Business",
  ];

  const competitiveAnalysisOptions = [
    "High competition, need unique selling proposition",
    "Moderate competition, room for growth",
    "Low competition, emerging market",
  ];

  const businessModelOptions = [
    "Direct Sales",
    "Service Provider",
    "Manufacturing and Production",
    "Franchise Ownership",
    "Dropshipping and Reselling",
    "Affiliate Marketing",
    "Subscription Services",
    "Consultancy",
    "B2B Solutions",
    "Community Cooperative",
  ];

  const legalAndRegulatoryIssuesOptions = [
    "Well-informed about regulations",
    "Some understanding, require further details",
    "Limited knowledge, need comprehensive advice",
  ];

  const longTermVisionOptions = [
    "Build a national brand",
    "Focus on sustainable, local growth",
    "Expand internationally",
    "Maintain a lifestyle business",
    "Innovate and disrupt existing markets",
  ];

  const workLifeBalanceOptions = [
    "Full-time dedication",
    "Balancing with current employment",
    "Seasonal or part-time commitment",
  ];

  const riskAssessmentOptions = [
    "Willing to take high risks for high returns",
    "Prefer moderate risk with stable growth",
    "Looking for low-risk, steady business options",
  ];

  // const budgetRangeOptions = ["0-1L", "1L-10L", "10L-1C"];

  const categoriesWithOptions = [
    {
      main: "Technology and Innovation",
      sub: ["Competitive: Mobile Apps", "Niche: AR/VR Software Development"],
    },
    {
      main: "E-Commerce",
      sub: [
        "Competitive: Consumer Goods and Fashion",
        "Niche: Eco-friendly and Handcrafted Products",
      ],
    },
    {
      main: "Health and Wellness",
      sub: [
        "Competitive: Fitness Centers and Yoga Studios",
        "Niche: Specialized Wellness Programs",
      ],
    },
    {
      main: "Food and Beverage",
      sub: [
        "Competitive: Fast-Casual Dining",
        "Niche: Specialized Dietary Options",
      ],
    },
    {
      main: "Education and Training",
      sub: ["Competitive: Online Tutoring", "Niche: Emerging Skills Courses"],
    },
    {
      main: "Sustainability and Environment",
      sub: [
        "Competitive: Recycling and Waste Management",
        "Niche: Sustainable Business Consulting",
      ],
    },
    {
      main: "Entertainment and Media",
      sub: [
        "Competitive: Video Production",
        "Niche: Special Interest Podcasts/Blogs",
      ],
    },
    {
      main: "Real Estate and Housing",
      sub: [
        "Competitive: Residential Real Estate",
        "Niche: Sustainable Housing",
      ],
    },
    {
      main: "Professional Services",
      sub: [
        "Competitive: Legal and Accounting Services",
        "Niche: Industry-Specific Consulting",
      ],
    },
    {
      main: "Retail",
      sub: [
        "Competitive: General Merchandise Stores",
        "Niche: Specialty Lifestyle Stores",
      ],
    },
    {
      main: "Digital Marketing and SEO",
      sub: [
        "Competitive: Social Media Management",
        "Niche: SEO for Specific Industries (e.g., Healthcare, Legal)",
      ],
    },
    {
      main: "Home Improvement and Construction",
      sub: [
        "Competitive: General Contracting Services",
        "Niche: Eco-Friendly Building Materials",
      ],
    },
    {
      main: "Beauty and Personal Care",
      sub: [
        "Competitive: Beauty Salons and Spas",
        "Niche: Organic and Natural Beauty Products",
      ],
    },
    {
      main: "Automotive and Transportation",
      sub: [
        "Competitive: Car Dealerships",
        "Niche: Electric Vehicle (EV) Charging Solutions",
      ],
    },
    {
      main: "Arts and Crafts",
      sub: [
        "Competitive: Art Supplies Retail",
        "Niche: Custom Artwork and Commissioned Pieces",
      ],
    },
    {
      main: "Fitness and Sports",
      sub: [
        "Competitive: Sports Equipment Retail",
        "Niche: Personalized Fitness Training Programs",
      ],
    },
    {
      main: "Pet Care and Products",
      sub: [
        "Competitive: Pet Food and Supplies",
        "Niche: Organic and Special Diet Pet Foods",
      ],
    },
    {
      main: "Travel and Tourism",
      sub: [
        "Competitive: Travel Agencies",
        "Niche: Eco-Tourism and Adventure Travel",
      ],
    },
    {
      main: "Financial Services",
      sub: [
        "Competitive: Personal and Business Banking",
        "Niche: Financial Planning for Specific Life Stages (e.g., Retirement, College)",
      ],
    },
    {
      main: "Gaming and Entertainment",
      sub: ["Competitive: Video Game Retail", "Niche: Indie Game Development"],
    },
    {
      main: "Healthcare Services",
      sub: [
        "Competitive: General Clinics",
        "Niche: Telemedicine for Specialized Care (e.g., Mental Health, Chronic Diseases)",
      ],
    },
    {
      main: "Agriculture and Farming",
      sub: [
        "Competitive: Farm Equipment and Supplies",
        "Niche: Organic and Urban Farming Solutions",
      ],
    },
    {
      main: "Hospitality",
      sub: [
        "Competitive: Hotels and Accommodations",
        "Niche: Boutique Hotels with Unique Themes",
      ],
    },
    {
      main: "Education Technology (EdTech)",
      sub: [
        "Competitive: E-Learning Platforms",
        "Niche: Educational Tools for Special Needs",
      ],
    },
    {
      main: "Renewable Energy",
      sub: [
        "Competitive: Solar Panel Installation",
        "Niche: Custom Renewable Energy Solutions for Businesses",
      ],
    },
    {
      main: "Fashion and Apparel",
      sub: [
        "Competitive: Clothing Retail",
        "Niche: Sustainable and Ethical Fashion Brands",
      ],
    },
    {
      main: "Event Planning and Services",
      sub: ["Competitive: Wedding Planning", "Niche: Corporate Event Planning"],
    },
    {
      main: "Music and Audio",
      sub: [
        "Competitive: Musical Instrument Retail",
        "Niche: Custom Audio Production Services",
      ],
    },
    {
      main: "Publishing and Media",
      sub: [
        "Competitive: Online News and Media Platforms",
        "Niche: Niche Magazine Publications",
      ],
    },
    {
      main: "Craft Beverages",
      sub: [
        "Competitive: Craft Beer Brewing",
        "Niche: Artisanal Non-Alcoholic Beverages",
      ],
    },
  ];

  const categories = {
    "Luxury Market": [
      "High-end Fashion and Jewelry",
      "Luxury Travel and Concierge Services",
    ],
    "Budget-Conscious Consumers": [
      "Affordable Consumer Goods",
      "Discount and Bulk Purchase Stores",
    ],
    // Add more categories and options as needed
  };
  const budgetOptions = [
    {
      category: "Low Budget (Minimal Investment) - Under ₹75,000",
      options: [
        "Dropshipping: Start an e-commerce business without holding inventory",
        "Affiliate Marketing: Promote products or services and earn commissions",
        "Podcasting: Create and monetize your podcast on popular platforms",
        "Content Creation: Start a YouTube channel, blog, or social media presence",
        "Remote Freelancing: Offer services like graphic design, writing, or programming",
      ],
    },
    {
      category: "Moderate Budget (Medium Investment) - ₹75,000 - ₹7,50,000",
      options: [
        "E-commerce Store: Sell niche products or handmade items online",
        "Subscription Box Service: Curate and sell subscription boxes for specific niches",
        "Health and Wellness Center: Offer fitness classes, nutrition coaching, or wellness services",
        "Mobile App Development: Create and launch a mobile app or software",
        "Digital Marketing Agency: Provide online marketing services to businesses",
      ],
    },
    {
      category:
        "High Budget (Significant Investment) - ₹7,50,000 - ₹75,00,000+",
      options: [
        "SaaS (Software as a Service) Startup: Develop and market a software platform",
        "Real Estate Investment: Purchase and rent out properties or invest in real estate development",
        "Healthcare Facility: Open a medical clinic, dental practice, or specialized healthcare center",
        "Renewable Energy Projects: Invest in solar or wind energy projects",
        "Tech Scale-up: Expand an existing tech startup with substantial funding",
      ],
    },
    {
      category: "Variable Budget (Flexible Investment) - Varies",
      options: [
        "E-commerce Expansion: Grow an existing online store and diversify product offerings",
        "Consulting Firm: Offer specialized consulting services to businesses",
        "Remote Work Solutions: Develop and market tools for remote work efficiency",
        "Green and Sustainable Businesses: Start eco-friendly ventures such as eco-products or services",
        "Online Education Platform: Create and sell online courses or tutoring services",
      ],
    },
  ];

  type OptionType = string;

  type Subcategory = {
    name: string;
    items: OptionType[];
  };

  // type Category = {
  //   category: string;
  //   subcategories: Subcategory[];
  // };

  const [selectedGoal, setSelectedGoal] = useState("");
  const [selectedCompNiche, setselectedCompNiche] = useState("");
  const [selectedSupport, setselectedSupport] = useState("");

  const [qCompNiche, setqCompNiche] = useState("");

  const [q9, setQ9] = useState("");
  const [q10, setQ10] = useState("");

  const handleQ2Selection = (selectedOption: OptionType) => {
    setskillsExp(selectedOption);
    //setInterest(selectedOption); // Update the interest state
    setQ2(selectedOption); // Also update q1 with the selected option
  };

  const handleq_ageSelection = (selectedOption: OptionType) => {
    setAge(selectedOption);
    //setInterest(selectedOption); // Update the interest state
    setq_age(selectedOption); // Also update q1 with the selected option
  };

  const handlegenderselction = (selectedOption: OptionType) => {
    setGender(selectedOption);
    //setInterest(selectedOption); // Update the interest state
    setq_gender(selectedOption); // Also update q1 with the selected option
  };

  const handleOccupationSelection = (selectedOption: OptionType) => {
    setcurrentOccupation(selectedOption);
    //setInterest(selectedOption); // Update the interest state
    setq_occupation(selectedOption); // Also update q1 with the selected option
  };

  // const handleexpseelction = (selectedOption: OptionType) => {
  //   setExperience(selectedOption);
  //   //setInterest(selectedOption); // Update the interest state
  //   setq_experience(selectedOption); // Also update q1 with the selected option
  // };
  const handlequaliifationSelection = (selectedOption: OptionType) => {
    setEduQulaification(selectedOption);
    //setInterest(selectedOption); // Update the interest state
    setq_ednQualification(selectedOption); // Also update q1 with the selected option
  };

  const handleQ1Selection = (selectedOption: OptionType) => {
    setInterest(selectedOption); // Update the interest state
    setQ1(selectedOption); // Also update q1 with the selected option
  };
  const hanldeuniqueskills = (selectedOption: OptionType) => {
    setuniqueSkills(selectedOption);
    //setInterest(selectedOption); // Update the interest state
    setq_uniqueSkills(selectedOption); // Also update q1 with the selected option
  };
  const handleQ3Selection = (selectedOption: OptionType) => {
    setlocation(selectedOption);
    setQ3(selectedOption); // Also update q1 with the selected option
  };
  const handleQ4Selection = (selectedOption: OptionType) => {
    //setInterest(selectedOption); // Update the interest state
    setbudget(selectedOption);
    setQ4(selectedOption); // Also update q1 with the selected option
  };
  const handleQ5Selection = (selectedOption: OptionType) => {
    setworkLifeBalance(selectedOption);
    setQ5(selectedOption); // Also update q1 with the selected option
  };
  const handleQ6Selection = (selectedOption: OptionType) => {
    setriskAssessment(selectedOption);
    setQ6(selectedOption); // Also update q1 with the selected option
  };
  // const handleBudgetRangeSelection = (selectedOption: OptionType) => {
  //   setbudgetRange(selectedOption);
  //   setQ6(selectedOption); // Also update q1 with the selected option
  // };
  // const [q7, setQ7] = useState<string[]>([]);

  // // const handleQ7Selection = (selectedItems: string[]) => {
  // //   setQ7(selectedItems);
  // // };
  // // const handleQ7Selection = (selectedItems: string[]) => {
  // //   setQ7(selectedItems); // selectedItems should be an array of strings
  // // };
  // const handleQ7Selection = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
  //   const values = e.target.value.split(","); // Split by comma, or choose another delimiter
  //   setQ7(values);
  // };
  //const [q7, setQ7] = useState(""); // q7 is a string

  // const handleQ7Selection = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
  //   setQ7(e.target.value);
  // };

  // const handleQ7Selection = (selectedOption: OptionType) => {
  //   setQ7(selectedOption); // Also update q1 with the selected option
  // };
  const handleQ8Selection = (selectedOption: OptionType) => {
    setSelectedCategory_1(selectedOption);
    setQ8(selectedOption); // Also update q1 with the selected option
  };
  const handleQ9Selection = (selectedOption: OptionType) => {
    setSelectedGoal(selectedOption);
    setQ9(selectedOption); // Also update q1 with the selected option
  };

  const handleBudgetRangeSelection = (selectedOption: OptionType) => {
    setselectedBudgetRange(selectedOption); // Update the selected budget range

    // Find the corresponding subcategory options
    const selectedCategory = budgetRangeOptionsData.budgetRanges.find(
      (b_range) => b_range.range === selectedOption
    );

    // Update the subcategory options
    if (selectedCategory) {
      setSubcategoryOptions(
        selectedCategory.subcategories.map((sub) => sub.subRange)
      );
    } else {
      setSubcategoryOptions([]);
    }
  };

  const handleSubcategorySelection = (options: string[]) => {
    setSelectedSubcategory(options); // This is correct since selectedSubcategory is a string array
    setQbudgetRange(options.join(", ")); // Join the array into a string separated by commas and set it
  };

  const handleTargetAudSubcategorySelection = (options: string[]) => {
    setSelectedTargetAudSubcategory(options); // This is correct since selectedSubcategory is a string array
    setQtargetAudience(options.join(", ")); // Join the array into a string separated by commas and set it
  };
  const handleSupportSelection = (selectedOption: OptionType) => {
    setselectedSupport(selectedOption); // Update the selected goal

    // Find the goal in the businessGoalsData with the selected title
    const selectedSupport = SupportAndResourcesData.SupportAndResources.find(
      (support) => support.title === selectedOption
    );

    // If found, update the textarea content (q9) with descriptions
    if (selectedSupport) {
      setQ10(
        `${selectedSupport.description1}\n${selectedSupport.description2}`
      );
    } else {
      setQ10(""); // Clear the textarea if no goal is found
    }
  };

  const [selectedSupportDescriptions, setselectedSupportDescriptions] =
    useState({
      description1: "",
      description2: "",
    });

  const [selectedGoalDescriptions, setSelectedGoalDescriptions] = useState({
    description1: "",
    description2: "",
  });

  const [selectedCategoryName, setSelectedCategoryName] =
    useState<OptionType>("");
  const [selectedCategory_1, setSelectedCategory_1] = useState("");
  // Initialize subcategories with the correct type
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [resetSubcategorySelection, setResetSubcategorySelection] =
    useState(false);

  const handleGoalSelection = (selectedOption: OptionType) => {
    setSelectedGoal(selectedOption); // Update the selected goal

    // Find the goal in the businessGoalsData with the selected title
    const selectedBusinessGoal = businessGoalsData.businessGoals.find(
      (goal) => goal.title === selectedOption
    );

    // If found, update the textarea content (q9) with descriptions
    if (selectedBusinessGoal) {
      setQ9(
        `${selectedBusinessGoal.description1}\n${selectedBusinessGoal.description2}`
      );
    } else {
      setQ9(""); // Clear the textarea if no goal is found
    }
  };

  const handleCompNichelSelection = (selectedOption: OptionType) => {
    setselectedCompNiche(selectedOption); // Update the selected goal

    // Find the goal in the businessGoalsData with the selected title
    const selectedCompNiche = CommpNichesData.categories.find(
      (compNiche) => compNiche.main === selectedOption
    );

    // If found, update the textarea content (q9) with descriptions
    if (selectedCompNiche) {
      setqCompNiche(
        `Competative Market:${selectedCompNiche.Competitive}\nNiche:${selectedCompNiche.Niche}`
      );
    } else {
      setqCompNiche(""); // Clear the textarea if no goal is found
    }
  };
  // When subcategories are updated, reset the resetSelection flag
  useEffect(() => {
    if (resetSubcategorySelection) {
      setResetSubcategorySelection(true);
    }
  }, [subcategories]);

  useEffect(() => {
    // Find the selected category and update the subcategories state
    const category = categoryData.find(
      (cat) => cat.category === selectedCategoryName
    );
    if (category) {
      setSubcategories(category.subcategories);
    } else {
      setSubcategories([]);
    }
  }, [selectedCategoryName]);

  const audienceCategories = [
    { label: "1. Demographic-Based Audience" },
    { label: "2. Location-Based Audience" },
    { label: "3. Lifestyle or Interest-Based Audience" },
    { label: "4. Industry-Specific Audience" },
    { label: "5. Income or Economic Status-Based Audience" },
    { label: "6. Special Needs or Niche Audience" },
  ];

  //const [selectedCountry, setSelectedCountry] = useState("");
  //const [cities, setCities] = useState([]);
  const [cities, setCities] = useState<string[]>([]);
  function handleCountryChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedCountry(e.target.value);
    setCities(countries[e.target.value]); // ok now!
  }
  const bioRef = useRef<null | HTMLDivElement>(null);

  const handleQ9Change = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQ9(e.target.value); // Update the q9 state with the new value
  };

  const handleQCompNicheChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    //setQ9(e.target.value); // Update the q9 state with the new value
    setqCompNiche(e.target.value);
  };
  const handleQ10Change = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQ10(e.target.value); // Update the q9 state with the new value
  };

  const [q1, setQ1] = useState("");
  const [q2, setQ2] = useState("");
  const [q3, setQ3] = useState("");
  const [q4, setQ4] = useState("");
  const [q5, setQ5] = useState("");
  const [q6, setQ6] = useState("");
  const [QbudgetRange, setQbudgetRange] = useState("");
  const [QtargetAudience, setQtargetAudience] = useState("");
  const [q8, setQ8] = useState("");
  const [q11, setQ11] = useState("");
  const [EXP, setEXP] = useState("");
  const [q_expDetails, setq_expDetails] = useState("");
  const [q_age, setq_age] = useState("");
  const [q_gender, setq_gender] = useState("");
  const [q_occupation, setq_occupation] = useState("");
  // const [q_experience, setq_experience] = useState("");
  const [q_ednQualification, setq_ednQualification] = useState("");
  const [q_uniqueSkills, setq_uniqueSkills] = useState("");

  const scrollToBios = () => {
    if (bioRef.current !== null) {
      bioRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  const [q7, setQ7] = useState("");

  const {
    input,
    handleInputChange: originalHandleInputChange,
    handleSubmit,
    isLoading,
    messages,
  } = useChat({
    body: {
      vibe,
      bio,
      q1,
      q2,
      q3,
      q4,
      q5,
      q6,
      q7,
      q8,
      q9,
      q10,
      q11,
      interest,
      QbudgetRange,
      qCompNiche,
      QtargetAudience,
      age,
      gender,
      selectedQualification,
      selectedJob,
      EXP,
      q_uniqueSkills,
    },
    onResponse() {
      scrollToBios();
    },
  });
  // const input =
  //   originalInput ||
  //   "Formulate business strategies based on the outlined criteria:";
  const handleInputChangeWrapper = (e: any) => {
    originalHandleInputChange(e); // Call the original handleInputChange from useChat
    if (error) {
      setError(false); // Reset the error state when user starts typing
    }
  };
  const handleQ1Change = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQ1(e.target.value);
  };
  const handleQ2Change = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQ2(e.target.value);
  };
  const handleQ3Change = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQ3(e.target.value);
  };
  const handleQ4Change = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQ4(e.target.value);
  };
  const handleQ5Change = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQ5(e.target.value);
  };
  const handleQ6Change = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQ6(e.target.value);
  };

  const handleQ7Selection = (selectedItems: string[]) => {
    // Join the array into a string and update the state
    setQ7(selectedItems.join(", "));
  };

  const handleQ8Change = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQ8(e.target.value);
  };

  const handleQ11Change = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQ11(e.target.value);
  };

  const handleEXPChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEXP(e.target.value);
  };

  // const handleq_expDetailsChange = (
  //   e: React.ChangeEvent<HTMLTextAreaElement>
  // ) => {
  //   setq_experience(e.target.value);
  // };

  const handleq_uniqueSkillsChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setq_uniqueSkills(e.target.value);
  };

  setq_uniqueSkills;

  const countries: {
    [country: string]: string[];
  } = {
    India: ["Delhi", "Mumbai"],
    US: ["Seattle", "New York"],
    Japan: ["Tokyo", "Osaka"],
    Russia: ["Moscow", "Saint Petersburg"],
    Canada: ["Toronto", "Vancouver"],
  };
  const [error, setError] = useState(false);
  useEffect(() => {
    if (error) {
      // Scroll to the top of the page
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [error]); // This effect runs whenever the 'error' state changes

  // const onSubmit = (e: any) => {
  //   e.preventDefault(); // Prevent default form submission behavior
  //   setBio(input);
  //   //setQ1(input);
  //   // setQ2(q2);
  //   console.log("input:", input);
  //   console.log("q1:", q1);
  //   console.log("q2:", q2);
  //   console.log("bio:", bio);
  //   console.log("vibe:", vibe);

  //   handleSubmit(e);
  // };
  const copyTextToClipboard = async (text: any) => {
    try {
      await navigator.clipboard.writeText(text);
      //  alert("Text copied to clipboard"); // You can replace this with a more subtle notification
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };
  const onSubmit = (e: any) => {
    e.preventDefault(); // Prevent default form submission behavior

    if (!input.trim()) {
      setError(true);
    } else {
      setError(false); // Clear any existing error
      setBio(input); // Update the bio state with the input value
      console.log("input:", input);
      console.log("bio:", bio);
      console.log("heloo");

      // Call the handleSubmit function which seems to be your business logic handler
      handleSubmit(e);
    }
  };
  // const CustomDiv = ({ children }) => (
  //   <div className="flex flex-col mt-5 mb-4 items-start space-y-3 p-5 rounded-lg bg-white text-[#237040] border-2 border-green-500 shadow-lg shadow-indigo-500/50">
  //     {children}
  //   </div>
  // );

  const lastMessage = messages[messages.length - 1];
  const generatedBios =
    lastMessage?.role === "assistant" ? lastMessage.content : null;

  const commonStyles = {
    backgroundColor: "#e3e3e3",
    color: "#00291C",
    borderBottom: "3px solid #337B68",
  };

  const commonTextStyles = "font-semibold text-md text-left mb-2";
  const ageInputId = "";

  return (
    //<div className="flex max-w-6xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
    // <div className={satisfy.className}>
    <div className="flex w-3/4   mx-auto flex-col items-center justify-center py-2 min-h-screen  ">
      <div className={satisfy.className}>
        {/* <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Satisfy&display=swap"
            rel="stylesheet"
          />
        </Head> */}
        {/* <head /> */}
        <Header />
        <main className=" w-fit  bg-[#5253A7] flex flex-1 flex-col items-center justify-center text-center rounded-lg mt-2   text-white font-Satisfy">
          <Link href="/details" passHref>
            {/* <a className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300">
            Go to Details
          </a> */}
          </Link>
          <form
            // bg-gradient-to-r from-blue-600 to-indigo-900 bg-[#266443]
            //max-w-4xl w-4/5
            className=" font-thin    mb-4 items-start space-y-3 p-5 rounded-lg  text-[#237040] border-2
             border-blue-100  shadow-blue-500/30 shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)]"
            onSubmit={onSubmit}
          >
            {/* <CustomDiv>Hello</CustomDiv> */}
            <div
              className="relative font-medium flex flex-col mt-5 mb-4 items-start space-y-3 p-5 rounded-lg bg-white 
              text-[#302F84] border-2 border-blue-100 shadow-blue-500/20 shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)]"
            >
              <span className="absolute top-0 right-0 text-sm italic text-red-500 pt-3 pr-5">
                * Mandatory
              </span>

              <p
                className="font-bold text-2xl mb-2"
                // style={{ borderBottom: "3px solid #337B68" }}
              >
                1.Write few words about yourself:{" "}
              </p>
              <div className="flex items-center w-full space-x-2">
                {" "}
                {/* Add some space between the textarea and button */}
                <textarea
                  id="bio"
                  value={input}
                  onChange={handleInputChangeWrapper}
                  rows={1}
                  className={`flex-1 text-black rounded-md border ${
                    error ? "border-red-500" : "border-green-500"
                  } shadow-sm focus:border-black focus:ring focus:ring-green-500 focus:ring-opacity-50`}
                  placeholder="Write few words about yourself..."
                  style={{ width: "90%" }} // Assign 80% width
                />
                <button
                  onClick={(event) => {
                    event.preventDefault(); // Prevent default form submission behavior
                    copyTextToClipboard(
                      "Formulate business strategies based on the outlined criteria:"
                    );
                  }}
                  className="p-2 bg-[#5253A7] text-white rounded-md"
                  style={{ width: "10%" }} // Assign 20% width
                >
                  Copy
                </button>
              </div>

              {/* <button
                onClick={() =>
                  copyTextToClipboard(
                    "Formulate business strategies based on the outlined criteria:"
                  )
                }
                className="p-2 bg-blue-500 text-white rounded-md"
              >
                Copy
              </button> */}

              {error && (
                <p className="text-red-500 text-sm mt-2">
                  Writing a few words about yourself is mandatory.
                </p>
              )}
            </div>{" "}
            *
            <div className="w-full">
              {/* Use grid to create equal width columns and gap-4 for spacing */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Add a custom class or TailwindCSS utility for min-height */}
                <div className="flex flex-col p-4 bg-white rounded-lg shadow-md">
                  <CustomDiv>
                    <p
                      className="font-semibold text-2xl "
                      // style={{ borderBottom: "3px solid #337B68" }}
                    >
                      2.Age
                    </p>
                    {/* <div style={{ color: "#025645" }} className="font-medium">
                      <p className="text-md text-left ">
                        Wil be used to get precise business advices based on
                        your age
                      </p>
                    </div> */}
                    <DropDown
                      selectedOption={age}
                      setOption={handleq_ageSelection}
                      options={ageOptions}
                    />
                  </CustomDiv>
                </div>
                <div className="flex flex-col p-4 bg-white rounded-lg shadow-md">
                  <CustomDiv>
                    <p
                      className="font-semibold text-2xl "
                      // style={{ borderBottom: "3px solid #337B68" }}
                    >
                      3.Gender
                    </p>
                    {/* <div style={{ color: "#025645" }} className="font-medium">
                      <p className="text-md text-left ">
                        Wil be used to get precise business advices based on
                        your gender
                      </p>
                    </div> */}
                    <DropDown
                      selectedOption={gender}
                      //setOption={setskillsExp}
                      setOption={handlegenderselction}
                      options={genderOptions}
                    />
                  </CustomDiv>
                </div>
                <div
                  className="flex flex-col p-4 bg-white rounded-lg shadow-md"
                  // style={{ minHeight: "350px" }}
                >
                  <CustomDiv>
                    <p
                      className="font-semibold text-2xl "
                      // style={{ borderBottom: "3px solid #337B68" }}
                    >
                      4.Qualification
                    </p>
                    {/* <div style={{ color: "#025645" }} className="font-medium">
                      <p className="text-md text-left ">
                        Wil be used to get precise business advices based on
                        your qualifications
                      </p>
                    </div> */}
                    {/* <DropDown
                      selectedOption={skillsExp}
                      //setOption={setskillsExp}
                      setOption={handleQ2Selection}
                      options={skillsOptions}
                    /> */}
                    <DropDown
                      selectedOption={selectedQualification}
                      setOption={setSelectedQualification}
                      options={qualificationOptions}
                    />
                  </CustomDiv>
                </div>
              </div>

              {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div className="flex flex-col p-4 bg-white rounded-lg shadow-md"></div>
                <div className="flex flex-col p-4 bg-white rounded-lg shadow-md"></div>
                <div className="flex flex-col p-4 bg-white rounded-lg shadow-md"></div>
              </div> */}
            </div>
            {/* TTTT */}
            <CustomDiv>
              <p
                className="font-semibold text-2xl "
                // style={{ borderBottom: "3px solid #337B68" }}
              >
                5.Current Occupation
              </p>
              <div style={{ color: "#025645" }} className="font-medium">
                <p className="text-md text-left ">Select your current job</p>
              </div>
              {/* <DropDown
                      selectedOption={skillsExp}
                      //setOption={setskillsExp}
                      setOption={handleQ2Selection}
                      options={skillsOptions}
                    />
                    <DropDown
                      selectedOption={skillsExp}
                      //setOption={setskillsExp}
                      setOption={handleQ2Selection}
                      options={skillsOptions}
                    /> */}

              <div className="flex flex-row w-full">
                {" "}
                {/* Ensure the container takes up full width */}
                <div className="w-1/2 pr-2">
                  {" "}
                  {/* Use w-1/2 for 50% width and pr-2 for some padding between the dropdowns */}
                  <DropDown
                    selectedOption={selectedIndustry}
                    setOption={setSelectedIndustry}
                    options={jobOptionsData.jobOptions.map(
                      (option) => option.industryCategory
                    )}
                  />
                </div>
                {/* Conditionally render the second dropdown if an industry is selected */}
                {selectedIndustry && (
                  <div className="w-1/2 pl-2">
                    {" "}
                    {/* Use w-1/2 for 50% width and pl-2 for some padding between the dropdowns */}
                    <DropDown
                      selectedOption={selectedJob}
                      setOption={setSelectedJob}
                      options={availableJobs}
                    />
                  </div>
                )}
              </div>
            </CustomDiv>
            <div
              className="font-medium flex flex-col mt-5 mb-4 items-start space-y-3 p-5 rounded-lg bg-white text-[#237040] border-2
             border-blue-100  shadow-blue-500/20 shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)]"
            >
              {" "}
              <p
                className="font-bold text-2xl text-[#302F84] "
                //           style={{ borderBottom: "3px solid #337B68" }}
              >
                6.Experience (Please mention if any)
              </p>
              <textarea
                onChange={handleEXPChange}
                value={EXP}
                rows={1}
                className="w-full rounded-md text-black  border-green-300 shadow-sm focus:border-black focus:ring-black my-5"
                placeholder={
                  "Example: 3 years of experiece in hotel management"
                }
              />
            </div>
            <div
              className="font-medium flex flex-col mt-5 mb-4 items-start space-y-3 p-5 rounded-lg bg-white text-[#237040] border-2
             border-blue-100  shadow-blue-500/20 shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)]"
            >
              {" "}
              <p
                className="font-bold text-2xl text-[#302F84]"
                //           style={{ borderBottom: "3px solid #337B68" }}
              >
                7.Special Skills (Please mention if any)
              </p>
              <textarea
                onChange={handleq_uniqueSkillsChange}
                value={q_uniqueSkills}
                rows={1}
                className="w-full rounded-md text-black  border-green-300 shadow-sm focus:border-black focus:ring-black my-5"
                placeholder={"Example:Fluency in Multiple Languages"}
              />
            </div>
            {/* ends  */}
            <CustomDiv>
              <p
                className="font-semibold text-2xl "
                // style={{ borderBottom: "3px solid #337B68" }}
              >
                8. What excites you? (Interests and Passions):
              </p>
              <div style={{ color: "#025645" }} className="font-medium">
                <p className="text-md text-left ">
                  What activities or sectors do you feel passionate about?
                </p>
                <p className="text-md text-left">
                  This helps identify a business area you will enjoy and be
                  committed to.
                </p>
              </div>
              <DropDown
                selectedOption={skillsExp}
                //setOption={setskillsExp}
                setOption={handleQ2Selection}
                options={skillsOptions}
              />
            </CustomDiv>
            {/* <div className="w-full">
              <div className=" justify-between w-full flex space-x-4">
                <div className="flex-grow">
                  <CustomDiv>
                    <p
                      className="font-semibold text-2xl "
                      // style={{ borderBottom: "3px solid #337B68" }}
                    >
                      Age
                    </p>
                    <div style={{ color: "#025645" }} className="font-medium">
                      <p className="text-md text-left ">
                        Wil be used to get precise business advices based on
                        your age
                      </p>
                    </div>
                    <DropDown
                      selectedOption={skillsExp}
                      //setOption={setskillsExp}
                      setOption={handleQ2Selection}
                      options={skillsOptions}
                    />
                  </CustomDiv>
                </div>
                <div className="flex-grow">
                  <CustomDiv>
                    <p
                      className="font-semibold text-2xl "
                      // style={{ borderBottom: "3px solid #337B68" }}
                    >
                      Gneder
                    </p>
                    <div style={{ color: "#025645" }} className="font-medium">
                      <p className="text-md text-left ">
                        Wil be used to get precise business advices based on
                        your gender
                      </p>
                    </div>
                    <DropDown
                      selectedOption={skillsExp}
                      //setOption={setskillsExp}
                      setOption={handleQ2Selection}
                      options={skillsOptions}
                    />
                  </CustomDiv>
                </div>
                <div className="flex-grow">
                  <CustomDiv>
                    <p
                      className="font-semibold text-2xl "
                      // style={{ borderBottom: "3px solid #337B68" }}
                    >
                      Current Occupation
                    </p>
                    <div style={{ color: "#025645" }} className="font-medium">
                      <p className="text-md text-left ">
                        Wil be used to get precise business advices based on
                        your current experience
                      </p>
                    </div>
                    <DropDown
                      selectedOption={skillsExp}
                      //setOption={setskillsExp}
                      setOption={handleQ2Selection}
                      options={skillsOptions}
                    />
                  </CustomDiv>
                </div>
              </div>
              <div className=" justify-between w-full flex space-x-4">
                <div className="flex-grow">
                  <CustomDiv>
                    <p
                      className="font-semibold text-2xl "
                      // style={{ borderBottom: "3px solid #337B68" }}
                    >
                      Experience (if any, specify)
                    </p>
                    <div style={{ color: "#025645" }} className="font-medium">
                      <p className="text-md text-left ">
                        Wil be used to get precise business advices based on
                        your experice
                      </p>
                    </div>
                    <DropDown
                      selectedOption={skillsExp}
                      //setOption={setskillsExp}
                      setOption={handleQ2Selection}
                      options={skillsOptions}
                    />
                  </CustomDiv>
                </div>
                <div className="flex-grow">
                  <CustomDiv>
                    <p
                      className="font-semibold text-2xl "
                      // style={{ borderBottom: "3px solid #337B68" }}
                    >
                      Educational Qualification
                    </p>
                    <div style={{ color: "#025645" }} className="font-medium">
                      <p className="text-md text-left ">
                        Wil be used to get precise business advices based on
                        your educational qualifications
                      </p>
                    </div>
                    <DropDown
                      selectedOption={skillsExp}
                      //setOption={setskillsExp}
                      setOption={handleQ2Selection}
                      options={skillsOptions}
                    />
                  </CustomDiv>
                </div>
                <div className="flex-grow">
                  <CustomDiv>
                    <p
                      className="font-semibold text-2xl "
                      // style={{ borderBottom: "3px solid #337B68" }}
                    >
                      Any unique skill(please specify)
                    </p>
                    <div style={{ color: "#025645" }} className="font-medium">
                      <p className="text-md text-left ">
                        Wil be used to get precise business advices based on
                        your unique skills
                      </p>
                    </div>
                    <DropDown
                      selectedOption={skillsExp}
                      //setOption={setskillsExp}
                      setOption={handleQ2Selection}
                      options={skillsOptions}
                    />
                  </CustomDiv>
                </div>
              </div>
            </div> */}
            <CustomDiv>
              <p
                className="font-bold text-2xl "
                // style={{ borderBottom: "3px solid #337B68" }}
              >
                9. What can you do well? (Skills and Experience):
              </p>
              <div style={{ color: "#025645" }} className="font-medium">
                <p className="text-md text-left ">
                  What are your key skills or areas of expertise?
                </p>
                <p className="text-md text-left">
                  Understanding your strengths can help in choosing a business
                  that leverages your abilities.
                </p>
              </div>
              <div className="w-full">
                <DropDown
                  selectedOption={interest}
                  setOption={handleQ1Selection}
                  options={interestOptions}
                />
              </div>
            </CustomDiv>
            {/* <div
            className="flex flex-col mt-5 mb-4 items-start space-y-3 p-5 rounded-lg shadow-lg"
            style={{ backgroundColor: "#e3e3e3", color: "#00291C" }}
          ></div> */}
            <CustomDiv>
              <p
                className="font-bold text-2xl "
                // style={{ borderBottom: "3px solid #337B68" }}
              >
                10.Where can you start your business? (Location):
              </p>
              <div style={{ color: "#025645" }} className="font-medium">
                <p className="text-md text-left ">
                  Are there geographical constraints or preferences for your
                  business?
                </p>
                <p className="text-md text-left">
                  This could influence the type of business you start,
                  especially if it's location-dependent.
                </p>
              </div>
              <DropDown
                selectedOption={location}
                //setOption={setlocation}
                setOption={handleQ3Selection}
                options={locationOptions}
              />
            </CustomDiv>
            <CustomDiv>
              <p
                className="font-bold text-2xl "
                // style={{ borderBottom: "3px solid #337B68" }}
              >
                11.How much can you invest? (Budget):
              </p>
              <div style={{ color: "#025645" }} className="font-medium">
                <p className="text-md text-left ">
                  What is your financial limit for starting a business?
                </p>
                <p className="text-md text-left">
                  Knowing your budget helps in selecting a business idea that’s
                  financially feasible for you.
                </p>
              </div>
              <CategoriesDropDown
                selectedOption={budget}
                setOption={handleQ4Selection}
                //setOption={setbudget}
                options={budgetOptions}
              />
            </CustomDiv>
            <CustomDiv>
              <p
                className="font-bold text-2xl "
                // style={{ borderBottom: "3px solid #337B68" }}
              >
                12.How much time can you give? (Time Commitment):
              </p>
              <div style={{ color: "#025645" }} className="font-medium">
                <p className="text-md text-left ">
                  Can you dedicate full-time hours, or are you looking for
                  something part-time?
                </p>
                <p className="text-md text-left">
                  This affects the scope and nature of the business ventures we
                  consider.
                </p>
              </div>
              <DropDown
                selectedOption={workLifeBalance}
                //setOption={setworkLifeBalance}
                setOption={handleQ5Selection}
                options={workLifeBalanceOptions}
              />
            </CustomDiv>
            {/* <textarea
            onChange={handleQ5Change}
            value={q5}
            rows={4}
            className="w-full text-black rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black my-5"
            placeholder={""}
          /> */}
            <CustomDiv>
              <p
                className="font-bold text-2xl "
                // style={{ borderBottom: "3px solid #337B68" }}
              >
                13.How much risk can you handle? (Risk Tolerance):
              </p>
              <div style={{ color: "#025645" }} className="font-medium">
                <p className="text-md text-left ">
                  Are you open to taking big risks for potentially high rewards,
                  or do you prefer a more stable, low-risk business?
                </p>
                <p className="text-md text-left">
                  This will guide the selection of business ideas that match
                  your comfort level with risk.
                </p>
              </div>
              <DropDown
                selectedOption={riskAssessment}
                //setOption={setriskAssessment}
                setOption={handleQ6Selection}
                options={riskAssessmentOptions}
              />
            </CustomDiv>{" "}
            <CustomDiv>
              <p className="font-bold text-2xl ">14.Budget Range</p>
              <div style={{ color: "#025645" }} className="font-medium">
                <p className="text-md text-left ">Select budget range below:</p>
                <p className="text-md text-left">
                  This will guide the selection of business ideas that match
                  your comfort level with budget.
                </p>
              </div>
              {/* <DropDown
                selectedOption={selectedBudgetRange}
                setOption={handleBudgetRangeSelection}
                options={budgetRangeOptionsData.budgetRanges.map(
                  (b_range) => b_range.range
                )}
              />

              <MultiSelectDropDown
                selectedOptions={selectedSubcategory}
                setOptions={handleSubcategorySelection} // Use the correct handler here
                options={subcategoryOptions}
              /> */}
              <DropDown
                selectedOption={selectedBudgetRange}
                setOption={handleBudgetRangeSelection}
                options={budgetRangeOptionsData.budgetRanges.map(
                  (b_range) => b_range.range
                )}
              />

              {selectedBudgetRange && (
                <MultiSelectDropDown
                  selectedOptions={selectedSubcategory}
                  setOptions={handleSubcategorySelection}
                  options={subcategoryOptions}
                />
              )}

              {/* <div className="mt-2">
                {selectedSubcategory && (
                  <p>Selected Subcategory: {selectedSubcategory.join(", ")}</p> // Join the array into a string to display
                )}
              </div> */}
            </CustomDiv>
            {/* <CustomDiv>
              <p
                className="font-bold text-2xl "
                // style={{ borderBottom: "3px solid #337B68" }}
              >
                8.Who do you want to serve? (Market Understanding)::
              </p>
              <div style={{ color: "#025645" }} className="font-medium">
                <p className="text-md text-left ">
                  Do you have a specific target audience or market in mind?
                </p>
                <p className="text-md text-left">
                  Understanding this helps in tailoring a business that meets
                  the needs of a particular group or market niche.
                </p>
              </div>
              <DropDown
                selectedOption={selectedCategoryName}
                setOption={setSelectedCategoryName}
                options={categoryData.map((cat) => cat.category)}
              />{" "}
              {subcategories.length > 0 && (
                // <CategoriesDropDown1
                //   subcategories={subcategories}
                //   resetSelection={resetSubcategorySelection}
                //   //setOption={handleQ7Selection} // Use this handler for the dropdown
                // />
                <CategoriesDropDown1
                  subcategories={subcategories}
                  resetSelection={resetSubcategorySelection}
                  onSelectionChange={handleQ7Selection}
                />
              )}
            </CustomDiv> */}
            <CustomDiv>
              <p
                className="font-bold text-2xl "
                // style={{ borderBottom: "3px solid #337B68" }}
              >
                15.Who do you want to serve? (Market Understanding):
              </p>
              <div style={{ color: "#025645" }} className="font-medium">
                <p className="text-md text-left ">
                  Do you have a specific target audience or market in mind?
                </p>
                <p className="text-md text-left">
                  Understanding this helps in tailoring a business that meets
                  the needs of a particular group or market niche.
                </p>
              </div>
              {/* <DropDown
                selectedOption={selectedCategoryName}
                setOption={setSelectedCategoryName}
                options={categoryData.map((cat) => cat.category)}
              />{" "}
              {subcategories.length > 0 && (
                // <CategoriesDropDown1
                //   subcategories={subcategories}
                //   resetSelection={resetSubcategorySelection}
                //   //setOption={handleQ7Selection} // Use this handler for the dropdown
                // />
                // <CategoriesDropDown1
                //   subcategories={subcategories}
                //   resetSelection={resetSubcategorySelection}
                //   onSelectionChange={handleQ7Selection}
                // />
                <MultiSelectDropDownSubCat
                  selectedOptions={selectedTargetAudSubcategory}
                  setOptions={handleTargetAudSubcategorySelection}
                  options={subcategoryOptionsAud}
                />
              )} */}

              {/* Dropdown for selecting the budget users */}
              <DropDown
                selectedOption={selectedTargetMainCat?.MainUserCategory || ""}
                setOption={handleTargetUsersSelection}
                options={TargetUsersOptionsData.MarketUsers.map(
                  (br) => br.MainUserCategory
                )}
              />

              {/* Dropdown for selecting subcategories and items */}
              {selectedTargetMainCat && (
                <MultiSelectDropDown
                  selectedOptions={selectedSubcategories}
                  setOptions={handleSubcategorySelection_target}
                  options={subcategoryOptions_target}
                />
              )}
            </CustomDiv>
            <div className="flex space-x-4">
              {" "}
              {/* Adjust spacing as needed */}
            </div>
            {/* <div
              className="font-medium flex flex-col mt-5 mb-4 items-start space-y-3 p-5 rounded-lg bg-white text-[#302F84] border-2
                 border-blue-100  shadow-blue-500/20 shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)]"
            >
              {" "}
              <p
                className="font-bold text-2xl "
                // style={{ borderBottom: "3px solid #337B68" }}
              >
                8.Competitive or niche market? (Competitive Landscape):
              </p>
              <div style={{ color: "#025645" }} className="font-medium">
                <p className="text-md text-left ">
                  Would you prefer entering a market with lots of competitors or
                  a more specialized niche with fewer competitors?
                </p>
                <p className="text-md text-left">
                  This influences the type of market strategy you'll need.
                </p>
              </div>
              <DropDown_latest
                selectedOption={selectedCategory_1}
                //setOption={setSelectedCategory_1}
                setOption={handleQ8Selection}
                categoriesWithOptions={categoriesWithOptions}
              />
            </div> */}
            {/* <textarea
            onChange={handleQ8Change}
            value={q8}
            rows={4}
            className="w-full text-black rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black my-5"
            placeholder={""}
          /> */}
            <CustomDiv>
              <p
                className="font-bold text-2xl "
                //   style={{ borderBottom: "3px solid #337B68" }}
              >
                16.Competitive or niche market? (Competitive Landscape):
              </p>
              <div style={{ color: "#025645" }} className="font-medium">
                <p className="text-md text-left ">
                  Would you prefer entering a market with lots of competitors or
                  a more specialized niche with fewer competitors? This
                  influences the type of market strategy you'll need.
                </p>
                <p className="text-md text-left">
                  Your long-term objectives will shape the business planning.
                </p>
              </div>
              <DropDown
                selectedOption={selectedCompNiche}
                setOption={handleCompNichelSelection}
                //setOption={handleGoalSelection} // Pass the handleGoalSelection function to handle dropdown selections
                // options={businessGoalsData.businessGoals.map(
                //   (goal) => goal.title
                // )}
                options={CommpNichesData.categories.map(
                  (compniche) => compniche.main
                )}
              />
              <textarea
                disabled
                onChange={handleQCompNicheChange} // Handle changes in the textarea
                value={qCompNiche} // Display the content of q9
                rows={2}
                className="w-full bg-blue-100 text-blue-600 rounded-md border-gray-300 shadow-md focus:border-black focus:ring-black my-5"
                placeholder=""
              />
            </CustomDiv>
            <CustomDiv>
              <p
                className="font-bold text-2xl "
                //   style={{ borderBottom: "3px solid #337B68" }}
              >
                17.What's your long-term dream? (Long-Term Goals):
              </p>
              <div style={{ color: "#025645" }} className="font-medium">
                <p className="text-md text-left ">
                  Are you looking to build a long-term business, create
                  something for short-term profit, or something else?
                </p>
                <p className="text-md text-left">
                  Your long-term objectives will shape the business planning.
                </p>
              </div>
              <DropDown
                selectedOption={selectedGoal}
                setOption={handleGoalSelection}
                //setOption={handleGoalSelection} // Pass the handleGoalSelection function to handle dropdown selections
                options={businessGoalsData.businessGoals.map(
                  (goal) => goal.title
                )}
              />
              <textarea
                disabled
                onChange={handleQ9Change} // Handle changes in the textarea
                value={q9} // Display the content of q9
                rows={2}
                className="w-full bg-blue-100 text-blue-600 rounded-md border-gray-300 shadow-md focus:border-black focus:ring-black my-5"
                placeholder=""
              />
            </CustomDiv>
            {/* <DropDown
            selectedOption={selectedGoal}
            setOption={setSelectedGoal}
            options={businessGoalsData.businessGoals.map((goal) => goal.title)}
          />
          <textarea
            onChange={handleQ9Change}
            value={q9}
            rows={4}
            className="w-full text-black rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black my-5"
            placeholder={""}
          /> */}
            <CustomDiv>
              {" "}
              <p
                className="font-bold text-2xl "
                // style={{ borderBottom: "3px solid #337B68" }}
              >
                18.Who and what can help you? (Support and Resources):
              </p>
              <div style={{ color: "#025645" }} className="font-medium">
                <p className="text-md text-left ">
                  Do you have any existing support networks, mentors, industry
                  contacts, or resources that could assist in your business
                  venture?
                </p>
                <p className="text-md text-left">
                  Your long-term objectives will shape the business planning.
                </p>
              </div>
              <DropDown
                selectedOption={selectedSupport}
                setOption={handleSupportSelection} // Pass the handleGoalSelection function to handle dropdown selections
                options={SupportAndResourcesData.SupportAndResources.map(
                  (support) => support.title
                )}
              />
              <textarea
                disabled
                onChange={handleQ10Change} // Handle changes in the textarea
                value={q10} // Display the content of q9
                rows={2}
                className="w-full bg-blue-100 text-blue-600 rounded-md border-gray-300 shadow-md focus:border-black focus:ring-black my-5"
                placeholder=""
              />
            </CustomDiv>
            {/* <DropDown
              selectedOption={selectedCountry}
              setOption={setSelectedCountry}
              options={citydata.map((c) => c.Country)}
            />
          
            {stateCities.length > 0 && (
              <CategoriesDropDown1
                subcategories={stateCities.map((sc) => ({
                  name: sc.state,
                  items: sc.cities,
                }))}
                onSelectionChange={handleCitySelectionChange}
              />
            )}
          
            <div className="selected-cities">
              {selections.map((selection, index) => (
                <div key={index} className="flex items-center mb-2">
                  <span className="mr-2">{`${selection.country}: ${selection.state} - ${selection.city}`}</span>
                  <button
                    onClick={() => removeSelection(index)}
                    className="p-1"
                  >
                    <XCircleIcon className="h-5 w-5 text-gray-700 hover:text-gray-900" />
                  </button>
                </div>
              ))}
            </div>
           
            <div className="selection-strings">
              <p>All Selections:</p>
              {selectionStrings.map((str, index) => (
                <div key={index}>{str}</div>
              ))}
            </div> */}
            {/* <textarea
            onChange={handleQ10Change}
            value={q10}
            rows={4}
            className="w-full text-black rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black my-5"
            placeholder={""}
          /> */}
            <div
              className="font-medium flex flex-col mt-5 mb-4 items-start space-y-3 p-5 rounded-lg bg-white text-[#237040] border-2
             border-blue-100  shadow-blue-500/20 shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)]"
            >
              {" "}
              <p
                className="font-bold text-2xl "
                //           style={{ borderBottom: "3px solid #337B68" }}
              >
                19.Want to provide more informaion?
              </p>
              <textarea
                onChange={handleQ11Change}
                value={q11}
                rows={1}
                className="w-full rounded-md text-black  border-green-300 shadow-sm focus:border-black focus:ring-black my-5"
                placeholder={""}
              />
            </div>
            {/* <div className="flex mb-5 items-center space-x-3">
              <Image src="/2-black.png" width={30} height={30} alt="1 icon" />
              <p className="text-left font-medium">Select your vibe.</p>
            </div> */}
            {/* <div className="block">
            <DropDown vibe={vibe} setVibe={(newVibe) => setVibe(newVibe)} />
          </div> */}
            {!isLoading && (
              <button
                className="bg-[#E6B437] rounded-xl text-[#025645] font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-[#E6B437] w-full text-lg "
                type="submit"
              >
                Generate your business ideas &rarr;
              </button>
            )}
            {isLoading && (
              <button
                className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full"
                disabled
              >
                <span className="loading">
                  <span style={{ backgroundColor: "white" }} />
                  <span style={{ backgroundColor: "white" }} />
                  <span style={{ backgroundColor: "white" }} />
                </span>
              </button>
            )}
          </form>

          <Toaster
            position="top-center"
            reverseOrder={false}
            toastOptions={{ duration: 2000 }}
          />
          <hr className="h-px bg-gray-700 border-1 dark:bg-gray-700" />
          <output className="space-y-10 my-10">
            {generatedBios && (
              <>
                <div>
                  <h2
                    className="sm:text-4xl text-3xl font-bold text-white mx-auto"
                    ref={bioRef}
                  >
                    Your generated business ideas
                  </h2>
                </div>
                <div className="  space-y-8 flex flex-col items-center justify-center max-w-4xl mx-auto ">
                  {generatedBios
                    //.split(/(?=1\.|2\.|3\.|4\.|5\.|5\.)/)
                    // .split(
                    //   /(?=#1:)|(?=#2:)|(?=#3:)|(?=#4:)|(?=#5:)|(?=#6:)|(?=#7:)|(?=#8:)|(?=#9:)|(?=#10:)/
                    // )
                    //.split(/(?=#1:)|(?=#2:)|(?=#3:)|(?=#4:)|(?=#5:)/)
                    // .split(/(?=Idea\s[1-9]:|Idea\s10:)/)
                    // .split(/(?=Idea\s[1-9]:|Idea\s10:)/)
                    // .split(/(?=Idea\s[1-9]:|Idea\s10:)/)
                    //                  .split(/(?=Idea\s[1-9]:)|(?=Idea\s10:)/)
                    //.split(/(?=Idea\s\d+:)/)
                    .split(/(?=1:)|(?=2:)|(?=3:)|(?=4:)|(?=5:)/)

                    .map((generatedBio, index) => {
                      return (
                        <div
                          className="rounded-lg shadow hover:shadow-lg p-6 hover:bg-[#025645] hover:text-white transition duration-300 cursor-pointer border border-gray-200 bg-[#337B68] "
                          onClick={() => {
                            navigator.clipboard.writeText(generatedBio.trim());
                            toast("Business idea copied to clipboard", {
                              icon: "✂️",
                            });
                          }}
                          key={index}
                        >
                          <p className="text-white text-lg leading-relaxed">
                            {generatedBio.trim()}
                          </p>
                        </div>
                      );
                    })}
                </div>
              </>
            )}
          </output>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-5 right-5 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-full p-2 flex items-center justify-center"
            style={{ width: "3rem", height: "3rem" }} // Adjust the size as needed
            title="Back to top"
            aria-label="Back to top"
          >
            <svg
              className="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 8"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 7 7.674 1.3a.91.91 0 0 0-1.348 0L1 7"
              />
            </svg>
          </button>

          {/* <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-5 right-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          title="Back to top"
          aria-label="Back to top"
        >
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 8"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 7 7.674 1.3a.91.91 0 0 0-1.348 0L1 7"
            />
          </svg>
        </button> */}
        </main>
        <Footer />
      </div>{" "}
    </div>
  );
}
