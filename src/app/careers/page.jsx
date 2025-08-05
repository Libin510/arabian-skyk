"use client";

import { use, useEffect, useRef, useState } from "react";
import Accordion from "./Accordion";
import JobApplicationModal from "./JobApplicationModal";
import { gsap } from "gsap";
import Footer from "@/Components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import API, { action } from "../Api";

export default function Career() {
  // const accordionData = [
  //   {
  //     id: 1,
  //     title: "Fleet Operations Manager - 1",
  //     location: "Dubai, UAE",
  //     type: "Full Time",
  //     responsibilities: [
  //       "Coordinate Transportation Schedules And Manage Client Relationships",
  //       "Track Shipments And Provide Updates To Clients",
  //       "Collaborate With Drivers And Operations To Ensure Timely Delivery",
  //     ],
  //     requirements: [
  //       "Experience In Logistics Or Supply Chain Management",
  //       "Excellent Organizational And Communication Skills",
  //       "Ability To Work In A Fast-Paced, Deadline-Driven Environment",
  //     ],
  //   },
  //   {
  //     id: 2,
  //     title: "Fleet Operations Manager - 2",
  //     location: "Dubai, UAE",
  //     type: "Full Time",
  //     responsibilities: [
  //       "Coordinate Transportation Schedules And Manage Client Relationships",
  //       "Track Shipments And Provide Updates To Clients",
  //       "Collaborate With Drivers And Operations To Ensure Timely Delivery",
  //     ],
  //     requirements: [
  //       "Experience In Logistics Or Supply Chain Management",
  //       "Excellent Organizational And Communication Skills",
  //       "Ability To Work In A Fast-Paced, Deadline-Driven Environment",
  //     ],
  //   },
  //   {
  //     id: 3,
  //     title: "Fleet Operations Manager - 3",
  //     location: "Dubai, UAE",
  //     type: "Full Time",
  //     responsibilities: [
  //       "Coordinate Transportation Schedules And Manage Client Relationships",
  //       "Track Shipments And Provide Updates To Clients",
  //       "Collaborate With Drivers And Operations To Ensure Timely Delivery",
  //     ],
  //     requirements: [
  //       "Experience In Logistics Or Supply Chain Management",
  //       "Excellent Organizational And Communication Skills",
  //       "Ability To Work In A Fast-Paced, Deadline-Driven Environment",
  //     ],
  //   },
  //   {
  //     id: 4,
  //     title: "Fleet Operations Manager - 4",
  //     location: "Dubai, UAE",
  //     type: "Full Time",
  //     responsibilities: [
  //       "Coordinate Transportation Schedules And Manage Client Relationships",
  //       "Track Shipments And Provide Updates To Clients",
  //       "Collaborate With Drivers And Operations To Ensure Timely Delivery",
  //     ],
  //     requirements: [
  //       "Experience In Logistics Or Supply Chain Management",
  //       "Excellent Organizational And Communication Skills",
  //       "Ability To Work In A Fast-Paced, Deadline-Driven Environment",
  //     ],
  //   },
  // ];

  const reasons = [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="50"
          height="50"
          viewBox="0 0 50 50"
          fill="none"
        >
          <rect width="50" height="50" rx="25" fill="#01016F" />
          <path
            d="M23.9921 27.805C24.9973 27.1358 25.7605 26.1609 26.1687 25.0244C26.577 23.8879 26.6087 22.6502 26.2591 21.4944C25.9095 20.3385 25.1973 19.3258 24.2276 18.6061C23.258 17.8863 22.0825 17.4977 20.8749 17.4977C19.6674 17.4977 18.4918 17.8863 17.5222 18.6061C16.5526 19.3258 15.8403 20.3385 15.4908 21.4944C15.1412 22.6502 15.1729 23.8879 15.5811 25.0244C15.9894 26.1609 16.7525 27.1358 17.7577 27.805C15.9394 28.4751 14.3866 29.7152 13.3309 31.3403C13.2754 31.4227 13.2368 31.5154 13.2175 31.6129C13.1981 31.7104 13.1983 31.8108 13.2181 31.9082C13.2379 32.0056 13.2768 32.0981 13.3327 32.1803C13.3885 32.2625 13.4601 32.3328 13.5434 32.3871C13.6266 32.4414 13.7199 32.4787 13.8176 32.4966C13.9154 32.5146 14.0157 32.5129 14.1128 32.4917C14.21 32.4706 14.3019 32.4303 14.3833 32.3733C14.4647 32.3163 14.534 32.2437 14.5871 32.1597C15.2681 31.1123 16.1999 30.2516 17.298 29.6558C18.3961 29.0599 19.6256 28.7479 20.8749 28.7479C22.1242 28.7479 23.3538 29.0599 24.4518 29.6558C25.5499 30.2516 26.4817 31.1123 27.1627 32.1597C27.2727 32.3231 27.4427 32.4368 27.6358 32.476C27.8289 32.5152 28.0297 32.4768 28.1947 32.3692C28.3598 32.2615 28.4758 32.0932 28.5178 31.9007C28.5598 31.7082 28.5243 31.5068 28.419 31.3403C27.3633 29.7152 25.8104 28.4751 23.9921 27.805ZM16.7499 23.125C16.7499 22.3091 16.9919 21.5116 17.4451 20.8332C17.8984 20.1549 18.5426 19.6262 19.2964 19.314C20.0501 19.0017 20.8795 18.9201 21.6797 19.0792C22.4798 19.2384 23.2148 19.6313 23.7917 20.2081C24.3686 20.785 24.7615 21.52 24.9207 22.3202C25.0798 23.1204 24.9981 23.9498 24.6859 24.7035C24.3737 25.4573 23.845 26.1015 23.1667 26.5548C22.4883 27.008 21.6908 27.25 20.8749 27.25C19.7813 27.2487 18.7328 26.8137 17.9595 26.0404C17.1862 25.2671 16.7512 24.2186 16.7499 23.125ZM36.4506 32.3781C36.284 32.4867 36.081 32.5247 35.8864 32.4838C35.6918 32.4428 35.5214 32.3262 35.4127 32.1597C34.7326 31.1116 33.8008 30.2506 32.7025 29.655C31.6042 29.0594 30.3743 28.7483 29.1249 28.75C28.926 28.75 28.7352 28.6709 28.5946 28.5303C28.4539 28.3896 28.3749 28.1989 28.3749 28C28.3749 27.8011 28.4539 27.6103 28.5946 27.4696C28.7352 27.329 28.926 27.25 29.1249 27.25C29.7324 27.2494 30.3322 27.1147 30.8816 26.8554C31.431 26.5961 31.9163 26.2187 32.3029 25.7501C32.6895 25.2815 32.9678 24.7334 33.118 24.1448C33.2682 23.5561 33.2865 22.9416 33.1716 22.3451C33.0568 21.7486 32.8116 21.1848 32.4536 20.694C32.0956 20.2032 31.6337 19.7976 31.1007 19.5061C30.5678 19.2145 29.977 19.0443 29.3707 19.0075C28.7643 18.9708 28.1573 19.0684 27.5931 19.2934C27.501 19.3332 27.402 19.3541 27.3018 19.3549C27.2016 19.3558 27.1022 19.3365 27.0095 19.2983C26.9169 19.2601 26.8328 19.2037 26.7623 19.1325C26.6918 19.0612 26.6363 18.9766 26.5991 18.8835C26.5619 18.7905 26.5437 18.6909 26.5456 18.5907C26.5475 18.4905 26.5695 18.3916 26.6102 18.3001C26.651 18.2085 26.7097 18.126 26.7828 18.0575C26.856 17.989 26.9421 17.9359 27.0362 17.9012C28.3275 17.3862 29.7639 17.3677 31.0681 17.8492C32.3723 18.3307 33.452 19.2782 34.0989 20.5088C34.7458 21.7394 34.914 23.166 34.5711 24.5133C34.2283 25.8607 33.3986 27.0333 32.2421 27.805C34.0604 28.4751 35.6133 29.7152 36.669 31.3403C36.7776 31.5069 36.8156 31.7098 36.7747 31.9044C36.7337 32.099 36.6171 32.2694 36.4506 32.3781Z"
            fill="white"
          />
        </svg>
      ),
      title: "Dynamic & Collaborative Work Environment",
      description:
        "Be part of a team that values collaboration, innovation, and teamwork.",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="50"
          height="51"
          viewBox="0 0 50 51"
          fill="none"
        >
          <rect y="0.5" width="50" height="50" rx="25" fill="#01016F" />
          <path
            d="M35.4999 18.75V24.75C35.4999 24.9489 35.4209 25.1397 35.2803 25.2803C35.1396 25.421 34.9488 25.5 34.7499 25.5C34.551 25.5 34.3603 25.421 34.2196 25.2803C34.0789 25.1397 33.9999 24.9489 33.9999 24.75V20.5603L26.2806 28.2806C26.2109 28.3504 26.1282 28.4057 26.0371 28.4434C25.9461 28.4812 25.8485 28.5006 25.7499 28.5006C25.6514 28.5006 25.5538 28.4812 25.4627 28.4434C25.3717 28.4057 25.289 28.3504 25.2193 28.2806L21.9999 25.0603L15.7806 31.2806C15.6398 31.4214 15.449 31.5004 15.2499 31.5004C15.0509 31.5004 14.86 31.4214 14.7193 31.2806C14.5786 31.1399 14.4995 30.949 14.4995 30.75C14.4995 30.551 14.5786 30.3601 14.7193 30.2194L21.4693 23.4694C21.539 23.3996 21.6217 23.3443 21.7127 23.3066C21.8038 23.2688 21.9014 23.2494 21.9999 23.2494C22.0985 23.2494 22.1961 23.2688 22.2871 23.3066C22.3782 23.3443 22.4609 23.3996 22.5306 23.4694L25.7499 26.6897L32.9396 19.5H28.7499C28.551 19.5 28.3603 19.421 28.2196 19.2803C28.0789 19.1397 27.9999 18.9489 27.9999 18.75C27.9999 18.5511 28.0789 18.3603 28.2196 18.2197C28.3603 18.079 28.551 18 28.7499 18H34.7499C34.9488 18 35.1396 18.079 35.2803 18.2197C35.4209 18.3603 35.4999 18.5511 35.4999 18.75Z"
            fill="white"
          />
        </svg>
      ),
      title: "Growth Opportunities",
      description:
        "We believe in nurturing talent and providing career advancement opportunities. Access ongoing learning and development programs.",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="50"
          height="51"
          viewBox="0 0 50 51"
          fill="none"
        >
          <rect y="0.5" width="50" height="50" rx="25" fill="#01016F" />
          <path
            d="M33.25 22.5C33.2508 21.1097 32.9003 19.7417 32.2309 18.5232C31.5616 17.3046 30.5951 16.2749 29.4213 15.5299C28.2475 14.7848 26.9044 14.3484 25.5168 14.2613C24.1293 14.1742 22.7422 14.4392 21.4844 15.0317C20.2266 15.6241 19.139 16.5248 18.3225 17.6501C17.506 18.7754 16.9872 20.0888 16.8141 21.4683C16.6411 22.8478 16.8195 24.2487 17.3328 25.5408C17.846 26.8329 18.6775 27.9743 19.75 28.8591V36C19.7499 36.1279 19.7825 36.2537 19.8448 36.3655C19.907 36.4772 19.9968 36.5712 20.1056 36.6385C20.2144 36.7057 20.3386 36.7441 20.4663 36.7498C20.5941 36.7555 20.7212 36.7285 20.8356 36.6713L25 34.5938L29.1653 36.676C29.2697 36.7259 29.3842 36.7513 29.5 36.75C29.6989 36.75 29.8897 36.671 30.0303 36.5303C30.171 36.3897 30.25 36.1989 30.25 36V28.8591C31.1884 28.0862 31.944 27.1152 32.4627 26.0158C32.9814 24.9163 33.2503 23.7157 33.25 22.5ZM18.25 22.5C18.25 21.165 18.6459 19.8599 19.3876 18.7499C20.1293 17.6399 21.1835 16.7747 22.4169 16.2638C23.6503 15.7529 25.0075 15.6193 26.3169 15.8797C27.6262 16.1402 28.829 16.783 29.773 17.727C30.717 18.6711 31.3599 19.8738 31.6203 21.1832C31.8808 22.4925 31.7471 23.8497 31.2362 25.0831C30.7253 26.3165 29.8601 27.3707 28.7501 28.1124C27.6401 28.8541 26.335 29.25 25 29.25C23.2104 29.248 21.4947 28.5362 20.2292 27.2708C18.9638 26.0054 18.252 24.2896 18.25 22.5ZM28.75 34.7869L25.3347 33.0797C25.2305 33.0276 25.1156 33.0004 24.9991 33.0004C24.8825 33.0004 24.7676 33.0276 24.6634 33.0797L21.25 34.7869V29.8472C22.411 30.4406 23.6962 30.75 25 30.75C26.3038 30.75 27.589 30.4406 28.75 29.8472V34.7869ZM25 27.75C26.0384 27.75 27.0534 27.4421 27.9167 26.8652C28.7801 26.2884 29.453 25.4684 29.8504 24.5091C30.2477 23.5498 30.3517 22.4942 30.1491 21.4758C29.9466 20.4574 29.4465 19.5219 28.7123 18.7877C27.9781 18.0535 27.0426 17.5535 26.0242 17.3509C25.0058 17.1483 23.9502 17.2523 22.9909 17.6496C22.0316 18.047 21.2117 18.7199 20.6348 19.5833C20.0579 20.4466 19.75 21.4617 19.75 22.5C19.7515 23.8919 20.3051 25.2264 21.2893 26.2107C22.2736 27.1949 23.6081 27.7485 25 27.75ZM25 18.75C25.7417 18.75 26.4667 18.9699 27.0834 19.382C27.7001 19.7941 28.1807 20.3797 28.4646 21.065C28.7484 21.7502 28.8226 22.5042 28.6779 23.2316C28.5333 23.959 28.1761 24.6272 27.6517 25.1517C27.1272 25.6761 26.459 26.0333 25.7316 26.178C25.0042 26.3227 24.2502 26.2484 23.5649 25.9646C22.8797 25.6807 22.294 25.2001 21.882 24.5834C21.4699 23.9667 21.25 23.2417 21.25 22.5C21.25 21.5055 21.6451 20.5516 22.3484 19.8484C23.0516 19.1451 24.0054 18.75 25 18.75Z"
            fill="white"
          />
        </svg>
      ),
      title: "Competitive Benefits",
      description:
        "Enjoy a competitive salary, health benefits, and performance-based bonuses.",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="50"
          height="51"
          viewBox="0 0 50 51"
          fill="none"
        >
          <rect y="0.5" width="50" height="50" rx="25" fill="#01016F" />
          <path
            d="M25 15.75C23.0716 15.75 21.1866 16.3218 19.5832 17.3932C17.9798 18.4645 16.7301 19.9873 15.9922 21.7688C15.2542 23.5504 15.0611 25.5108 15.4373 27.4021C15.8136 29.2934 16.7422 31.0307 18.1057 32.3943C19.4693 33.7579 21.2066 34.6865 23.0979 35.0627C24.9892 35.4389 26.9496 35.2458 28.7312 34.5078C30.5127 33.7699 32.0355 32.5202 33.1068 30.9168C34.1782 29.3134 34.75 27.4284 34.75 25.5C34.7473 22.915 33.7192 20.4366 31.8913 18.6087C30.0634 16.7808 27.585 15.7527 25 15.75ZM28.675 24.75C28.5784 24.2814 28.3925 23.8358 28.1275 23.4375L31.3366 20.2275C32.4078 21.5102 33.062 23.0893 33.2116 24.7537L28.675 24.75ZM27.25 25.5C27.25 25.945 27.118 26.38 26.8708 26.75C26.6236 27.12 26.2722 27.4084 25.861 27.5787C25.4499 27.749 24.9975 27.7936 24.5611 27.7068C24.1246 27.62 23.7237 27.4057 23.409 27.091C23.0943 26.7763 22.8801 26.3754 22.7932 25.939C22.7064 25.5025 22.751 25.0501 22.9213 24.639C23.0916 24.2278 23.38 23.8764 23.75 23.6292C24.12 23.382 24.555 23.25 25 23.25C25.5967 23.25 26.169 23.4871 26.591 23.909C27.013 24.331 27.25 24.9033 27.25 25.5ZM25 33.75C23.6747 33.7509 22.3686 33.4325 21.1924 32.8217C20.0161 32.2109 19.0044 31.3258 18.2427 30.2411C17.4811 29.1565 16.9919 27.9043 16.8167 26.5906C16.6415 25.2768 16.7854 23.9402 17.2362 22.6939C17.687 21.4476 18.4315 20.3282 19.4065 19.4305C20.3816 18.5328 21.5585 17.8833 22.8378 17.5368C24.1171 17.1904 25.461 17.1573 26.7558 17.4402C28.0506 17.7232 29.2581 18.314 30.2763 19.1625L27.0625 22.3725C26.392 21.9309 25.5975 21.7162 24.7959 21.7598C23.9943 21.8035 23.2278 22.1033 22.6093 22.6151C21.9907 23.1269 21.5528 23.8237 21.3598 24.603C21.1669 25.3823 21.2291 26.2029 21.5374 26.9442C21.8456 27.6855 22.3837 28.3083 23.0723 28.721C23.761 29.1336 24.5639 29.3144 25.3629 29.2367C26.162 29.159 26.915 28.8269 27.5112 28.2892C28.1074 27.7516 28.5154 27.0368 28.675 26.25H33.2153C33.0259 28.2987 32.0788 30.203 30.5594 31.5902C29.0399 32.9773 27.0574 33.7475 25 33.75Z"
            fill="white"
          />
        </svg>
      ),
      title: "Impactful Work",
      description:
        "Your contributions will directly impact the success of projects across the GCC. We believe in making a difference.",
    },
  ];

  const steps = [
    {
      number: "1",
      title: "Review Open Positions",
      description:
        "Browse Through Our Current Job Openings And Find The Position That Suits Your Skills.",
    },
    {
      number: "2",
      title: "Submit Your Application",
      description:
        "Click 'Apply Now', Fill Out The Form, And Attach Your Resume And Cover Letter.",
    },
    {
      number: "3",
      title: "Interview Process",
      description:
        "Our HR Team Will Review And Contact You If You're Shortlisted For An Interview.",
    },
  ];
  const [accordionData, setAccordionData] = useState([]);
  const [selectedId, setSelectedId] =  useState(accordionData[0]?.id);
  const [letterSpans, setLetterSpans] = useState([]);
  const [isClicked, setIsClicked] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJobTitle, setSelectedJobTitle] = useState("");

  const cardRefs = useRef([]);
  const headerRef = useRef();
  const openRef = useRef(null);

  const handleMouseMove = (e, index) => {
    const card = cardRefs.current[index];
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = -(y - centerY) / 10;
    const rotateY = (x - centerX) / 10;

    gsap.to(card, {
      rotationX: rotateX,
      rotationY: rotateY,
      transformPerspective: 800,
      transformOrigin: "center",
      ease: "power2.out",
      duration: 0.4,
    });
  };

  const handleMouseLeave = (index) => {
    gsap.to(cardRefs.current[index], {
      rotationX: 0,
      rotationY: 0,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  useEffect(() => {
    const word1 = "join";
    const word2 = "our";
    const word3 = "team";

    const spanArray = [];

    word1.split("").forEach((char, index) => {
      spanArray.push(
        <span
          key={`join-${index}`}
          className="inline-block text-[#01016F]"
          style={{ display: "inline-block" }}
        >
          {char}
        </span>
      );
    });

    spanArray.push(
      <span key="space" style={{ display: "inline-block", width: "0.5rem" }}>
        {" "}
      </span>
    );

    word2.split("").forEach((char, index) => {
      spanArray.push(
        <span
          key={`our-${index}`}
          className="inline-block text-[#01016F]"
          style={{ display: "inline-block" }}
        >
          {char}
        </span>
      );
    });

    spanArray.push(
      <span key="space-2" style={{ display: "inline-block", width: "0.5rem" }}>
        {" "}
      </span>
    );

    word3.split("").forEach((char, index) => {
      spanArray.push(
        <span
          key={`team-${index}`}
          className="inline-block text-[#EF1E24]"
          style={{ display: "inline-block" }}
        >
          {char}
        </span>
      );
    });

    setLetterSpans(spanArray);
  }, []);

  useEffect(() => {
    if (headerRef.current) {
      gsap.from(headerRef.current.querySelectorAll("span"), {
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.08,
        ease: "power3.out",
      });
    }
  }, [letterSpans]);

  useEffect(() => {
    if (openRef.current && isClicked !== null) {
      openRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [isClicked]);

  console.log(isClicked);

  const handleApplyNow = (jobTitle) => {
    setSelectedJobTitle(jobTitle);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedJobTitle("");
  };

  const fetchCareers = async () => {
    try {
      const result = await action(API.GET_CAREER);
      console.log("Fetched careers:", result);

      if (result?.careers) {
        // Transform API data to match expected format
        const formattedCareers = result.careers.map((career, index) => ({
          id: career._id || index + 1, // Use _id as id, fallback to index
          title: career.post, // Map 'post' to 'title'
          location: career.place, // Map 'place' to 'location'
          type: career.type,
          description: career.description,
          // Split description into responsibilities and requirements
          responsibilities: [
            career.description,
            "Track Shipments And Provide Updates To Clients",
            "Collaborate With Drivers And Operations To Ensure Timely Delivery",
          ],
          requirements: [
            "Experience In Logistics Or Supply Chain Management",
            "Excellent Organizational And Communication Skills",
            "Ability To Work In A Fast-Paced, Deadline-Driven Environment",
          ],
          createdAt: career.createdAt,
          updatedAt: career.updatedAt,
        }));
        
        setAccordionData(formattedCareers);
        // Set the first item as selected by default
        if (formattedCareers.length > 0) {
          setSelectedId(formattedCareers[0].id);
        }
      } else if (Array.isArray(result)) {
        // If result is already an array, format it the same way
        const formattedCareers = result.map((career, index) => ({
          id: career._id || index + 1,
          title: career.post,
          location: career.place,
          type: career.type,
          description: career.description,
          responsibilities: [
            career.description,
            "Track Shipments And Provide Updates To Clients",
            "Collaborate With Drivers And Operations To Ensure Timely Delivery",
          ],
          requirements: [
            "Experience In Logistics Or Supply Chain Management",
            "Excellent Organizational And Communication Skills",
            "Ability To Work In A Fast-Paced, Deadline-Driven Environment",
          ],
          createdAt: career.createdAt,
          updatedAt: career.updatedAt,
        }));
        
        setAccordionData(formattedCareers);
        // Set the first item as selected by default
        if (formattedCareers.length > 0) {
          setSelectedId(formattedCareers[0].id);
        }
      }
    } catch (error) {
      console.error("Error fetching careers:", error);
    }
  };
  useEffect(() => {
    fetchCareers();
  }, []);

  return (
    <div className="max-w-screen-xl mx-auto z-10 px-4 sm:px-6 flex flex-col gap-[32px] mt-38">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-0">
        <h1
          className="text-[45px] lg:text-[75px] text-[#01016F] font-semibold uppercase "
          ref={headerRef}
        >
          {letterSpans}
        </h1>
        <div className="flex flex-col gap-2 w-auto lg:max-w-[600px] ">
          <p className="text-[20px] lg:text-[42px] font-semibold">
            Build a Future with Us
          </p>
          <p className="text-[18px] lg:text-[20px]">
            At Arabian Sky Transport, we believe that our success comes from the
            dedication and expertise of our team. We're always on the lookout
            for talented individuals to join our growing family. If you're
            passionate about logistics, transport, and innovation, we want to
            hear from you!
          </p>
        </div>
      </div>

      <div className="bg-[#BEBDBD] h-[465px] w-auto rounded-[16px]"></div>

      <div className="mt-[40px] lg:mt-[115px]">
        <h1 className="text-[30px] lg:text-[50px] text-[#01016F] text-center uppercase font-semibold ">
          why work with us <span className="text-[#EF1E24]">?</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mt-[40px]">
          {reasons.map((reason, index) => (
            <div
              ref={(el) => (cardRefs.current[index] = el)}
              onMouseMove={(e) => handleMouseMove(e, index)}
              onMouseLeave={() => handleMouseLeave(index)}
              key={index}
              className="flex flex-col gap-4 h-[320px] w-[320px] justify-center items-center mt-[40px] shadow-md border border-gray-200 rounded-[16px] p-4 text-center mx-auto"
            >
              <div className="mb-4">{reason.icon}</div>
              <h2 className="text-[20px] font-semibold text-[#01016F]">
                {reason.title}
              </h2>
              <p className="text-[16px] text-gray-700 text-center">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-[40px] lg:mt-[115px]">
        <h1 className="text-[30px] lg:text-[50px] text-[#01016F] text-center uppercase font-semibold ">
          Open positions
        </h1>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6 w-full md:max-w-[80%] mx-auto">
          <div>
            <AnimatePresence mode="wait">
              {accordionData
                .filter((item) => item.id === selectedId)
                .map((item) => (
                  <motion.div
                    key={item.id}
                    ref={openRef}
                    layout
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Accordion
                      data={item}
                      isExpanded={true}
                      onToggle={() => { }}
                      onApplyNow={handleApplyNow}
                    />
                  </motion.div>
                ))}
            </AnimatePresence>
          </div>

          <div className="flex flex-col gap-6">
            {accordionData
              .filter((item) => item.id !== selectedId)
              .map((item) => (
                <motion.div key={item.id} layout>
                  <Accordion
                    data={item}
                    isExpanded={false}
                    onToggle={() => {
                      setSelectedId(item.id);
                      setIsClicked(!isClicked);
                    }}
                    onApplyNow={handleApplyNow}
                  />
                </motion.div>
              ))}
          </div>
        </div>
      </div>

      <div className="max-w-full md:max-w-[80%] mx-auto px-2 md:px-6 py-16 bg-white">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">
            HOW TO APPLY
          </h1>
          <p className="text-gray-600 text-lg">
            Follow These Simple Steps To Join Our Team.
          </p>
        </div>

        <div className="relative">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex items-start gap-4 md:gap-8 mb-12 md:mb-16 last:mb-0"
            >
              <div className="flex-shrink-0 relative">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-purple-200 rounded-full flex items-center justify-center relative z-10 scale-up">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-900 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm md:text-lg font-bold">
                      {step.number}
                    </span>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className="absolute top-full left-1/2 sm:left-10 transform -translate-x-1/2 sm:translate-x-0 w-0.5 h-[calc(100%+2rem)] bg-gray-600 z-0"></div>
                )}
              </div>

              {/* Step Content */}
              <div className="flex-1 p-2 md:p-4 border border-gray-200 bg-white rounded-lg shadow-md">
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2 md:mb-3">
                  {step.title}
                </h3>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />

      {/* Job Application Modal */}
      <JobApplicationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        jobTitle={selectedJobTitle}
      />
    </div>
  );
}
