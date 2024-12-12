import BMW from "../assets/BMW.png";
import civic from "../assets/civic.png";
import Eclass from "../assets/E-Class.png";
import Fortuner from "../assets/Fortuner.png";
import Virtus from "../assets/virtus.png";
import Audi1 from "../assets/audia1.jpg";

import { BsFillGiftFill } from "react-icons/bs";
import { BiSolidOffer } from "react-icons/bi";


export const navigation = [
  {
    id: "0",
    title: "Home",
    url: "",
  },
  {
    id: "1",
    title: "About",
    url: "about",
  },
  {
    id: "2",
    title: "Services",
    url: "services",
  },
  {
    id: "3",
    title: "Reviews",
    url: "reviews",
  },
  {
    id: "4",
    title: "New account",
    url: "signup",
    onlyMobile: true,
  },
  {
    id: "5",
    title: "Sign in",
    url: "signin",
    onlyMobile: true,
  },
];

export const offers = [
  {
    id: "0",
    text1: "Get 10% off up to ₹ 300",
    text2: "Use code NEW@123",
    icon: BiSolidOffer,
  },
  {
    id: "1",
    text1: "Get free surprice for ₹ 1000",
    text2: "Use Code SURPRICE#52",
    icon: BsFillGiftFill,
  },
  {
    id: "2",
    text1: "Get 15% off up to ₹ 500",
    text2: "Use code STMB@12B",
    icon: BiSolidOffer,
  },
  // {
  //   id: "3",
  //   text1: "Get 20% off up to ₹1000",
  //   text2: "Use code JWTA&12",
  //   icon: "BiSolidOffer",
  // },
  {
    id: "4",
    text1: "Get free surprice for ₹ 1000",
    text2: "Use Code SURPRICE#52",
    icon: BsFillGiftFill,
  },

];

export const locations = [
  { id: 0, place: "New Delhi" },
  { id: 1, place: "Central Delhi" },
  { id: 2, place: "East Delhi" },
  { id: 3, place: "North Delhi" },
  { id: 4, place: "North East Delhi" },
  { id: 5, place: "North West Delhi" },
  { id: 6, place: "Shahdara" },
  { id: 7, place: "South Delhi" },
  { id: 8, place: "South East Delhi" },
  { id: 9, place: "South West Delhi" },
  { id: 10, place: "West Delhi" },
  { id: 11, place: "Mumbai" },
  { id: 12, place: "Mumbai Suburban" },
  { id: 13, place: "Thane" },
  { id: 14, place: "Pune" },
  { id: 15, place: "Nashik" },
  { id: 16, place: "Nagpur" },
  { id: 17, place: "Aurangabad" },
  { id: 18, place: "Bangalore Urban" },
  { id: 19, place: "Bangalore Rural" },
  { id: 20, place: "Mysore" },
  { id: 21, place: "Mangalore" },
  { id: 22, place: "Hubli" },
  { id: 23, place: "North 24 Parganas" },
  { id: 24, place: "South 24 Parganas" },
  { id: 25, place: "Howrah" },
  { id: 26, place: "Hooghly" },
  { id: 27, place: "Darjeeling" },
  { id: 28, place: "Kolkata" },
  { id: 29, place: "Chennai" },
  { id: 30, place: "Coimbatore" },
  { id: 31, place: "Madurai" },
  { id: 32, place: "Tiruchirappalli" },
  { id: 33, place: "Salem" },
  { id: 34, place: "Hyderabad" },
  { id: 35, place: "Rangareddy" },
  { id: 36, place: "Medchal" },
  { id: 37, place: "Sangareddy" },
  { id: 38, place: "Nizamabad" },
  { id: 39, place: "Jaipur" },
  { id: 40, place: "Jodhpur" },
  { id: 41, place: "Udaipur" },
  { id: 42, place: "Ajmer" },
  { id: 43, place: "Alwar" },
  { id: 44, place: "Kota" },
  { id: 45, place: "Lucknow" },
  { id: 46, place: "Kanpur" },
  { id: 47, place: "Ghaziabad" },
  { id: 48, place: "Agra" },
  { id: 49, place: "Meerut" },
  { id: 50, place: "Varanasi" },
  { id: 51, place: "Noida" },
  { id: 52, place: "Patna" },
  { id: 53, place: "Gaya" },
  { id: 54, place: "Bhagalpur" },
  { id: 55, place: "Muzaffarpur" },
  { id: 56, place: "Darbhanga" },
  { id: 57, place: "Ranchi" },
  { id: 58, place: "Jamshedpur" },
  { id: 59, place: "Dhanbad" },
  { id: 60, place: "Deoghar" },
  { id: 61, place: "Hazaribagh" },
  { id: 62, place: "Guwahati" },
  { id: 63, place: "Dibrugarh" },
  { id: 64, place: "Silchar" },
  { id: 65, place: "Tezpur" },
  { id: 66, place: "Jorhat" },
  { id: 67, place: "Shillong" },
  { id: 68, place: "Imphal" },
  { id: 69, place: "Aizawl" },
  { id: 70, place: "Kohima" },
  { id: 71, place: "Gangtok" },
  { id: 72, place: "Agartala" },
  { id: 73, place: "Bhopal" },
  { id: 74, place: "Indore" },
  { id: 75, place: "Jabalpur" },
  { id: 76, place: "Gwalior" },
  { id: 77, place: "Ujjain" },
  { id: 78, place: "Raipur" },
  { id: 79, place: "Bhilai" },
  { id: 80, place: "Bilaspur" },
  { id: 81, place: "Durg" },
  { id: 82, place: "Korba" },
  { id: 83, place: "Bhubaneswar" },
  { id: 84, place: "Cuttack" },
  { id: 85, place: "Rourkela" },
  { id: 86, place: "Brahmapur" },
  { id: 87, place: "Sambalpur" },
  { id: 88, place: "Puri" },
  { id: 89, place: "Kozhikode" },
  { id: 90, place: "Thiruvananthapuram" },
  { id: 91, place: "Ernakulam" },
  { id: 92, place: "Kochi" },
  { id: 93, place: "Thrissur" },
  { id: 94, place: "Kollam" },
  { id: 95, place: "Gandhinagar" },
  { id: 96, place: "Surat" },
  { id: 97, place: "Rajkot" },
  { id: 98, place: "Vadodara" },
  { id: 99, place: "Bhavnagar" },
];



export const carImage = [
  {
    id: "0",
    title: "Honda Civic Type-R",
    url: "../assets/hondaR.png",
  },
  {
    id: "1",
    title: "Mercedes AMG",
    url: "../assets/mercedes.png",
  },
  {
    id: "2",
    title: "And Many More Like These...",
    url: "../assets/cars.png",
  },
];

export const bookData = [
  {
    id: "0",
    text: "Select Your Car Type",
    icon: "IconCar",
    options: [
      { text: "Select your car type", value: "" },
      { text: "BMW 2 F23", value: "BMW 2 F23",img: BMW},
      { text: "Honda Civic", value: "Honda Civic",img:civic },
      { text: "Mercedes Benz E-class", value: "Mercedes Benz E-class",img:Eclass },
      { text: "Toyota Fortuner", value: "Toyota Fortuner",img:Fortuner },
      { text: "VW Virtus", value: "VW Virtus",img:Virtus },
      { text: "Audi A1 S-Line", value: "Audi A1 S-Line",img:Audi1 }
    ]
  },
  {
    id: "1",
    text: "Pick-up",
    icon: "IconMapPinFilled",
    options: [
      { text: "Select your up location", value: "" },
      { text: "Delhi", value: "Delhi" },
      { text: "Mumbai", value: "Mumbai" },
      { text: "Chennai", value: "Chennai" },
      { text: "Lucknow", value: "Lucknow" }
    ]
  },
  {
    id: "2",
    text: "Drop-off",
    icon: "IconMapPinFilled",
    options: [
      { text: "Select your drop-off location", value: "" },
      { text: "Delhi", value: "Delhi" },
      { text: "Mumbai", value: "Mumbai" },
      { text: "Chennai", value: "Chennai" },
      { text: "Lucknow", value: "Lucknow" }
    ]
  },
  {
    id: "3",
    text: "Pick-up",
    icon: "IconCalendarEvent",
  },
  {
    id: "4",
    text: "Drop-off",
    icon: "IconCalendarEvent",
  }
];


export const CAR_DATA = [
  [
    {
      name: "BMW 2 F23",
      price: "37",
      img: BMW,
      model: "2 Series F23",
      mark: "BMW",
      year: "2021",
      seats: "5",
      air: "Yes",
      transmission: "Manual",
      fuel: "Diesel",
    },
  ],
  [
    {
      name: "Honda Civic",
      price: "45",
      img: civic,
      model: "ZX CVT",
      mark: "Honda",
      year: "2020",
      seats: "5",
      air: "Yes",
      transmission: "Automatic",
      fuel: "Petrol",
    },
  ],
  [
    {
      name: "Mercedes Benz E-class",
      price: "30",
      img: Eclass,
      model: "E AMG 63",
      mark: "AMG",
      year: "2010",
      seats: "5",
      air: "Yes",
      transmission: "Automatic",
      fuel: "Petrol",
    },
  ],
  [
    {
      name: "Toyota Fortuner",
      price: "30",
      img: Fortuner,
      model: "Fortuner",
      mark: "Toyota",
      year: "2016",
      seats: "7",
      air: "Yes",
      transmission: "Manual",
      fuel: "Diesel",
    },
  ],
  [
    {
      name: "VW Virtus",
      price: "50",
      img: Virtus,
      model: "GT Plus Edge",
      mark: "Volkswagen",
      year: "2021",
      seats: "5",
      air: "Yes",
      transmission: "Automatic",
      fuel: "Diesel",
    },
  ],
  [
    {
      name: "Audi A1 S-Line",
      price: "45",
      img: Audi1,
      model: "Audi",
      mark: "A1",
      year: "2012",
      seats: "4",
      air: "Yes",
      transmission: "Automatic",
      fuel: "Petrol",
    },
  ],
];



