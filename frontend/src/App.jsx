import React, { useState, useEffect, useRef } from 'react';
import { 
  ShieldAlert, 
  MapPin, 
  Compass, 
  Activity, 
  FileText, 
  Users, 
  PhoneCall, 
  Send, 
  Radio, 
  AlertTriangle, 
  CheckSquare, 
  Navigation,
  CheckCircle,
  HelpCircle,
  Search,
  Check,
  Plus,
  RefreshCw,
  Info,
  Lock,
  Layers,
  ArrowRight,
  Download,
  Copy,
  TrendingUp,
  Sliders,
  AlertOctagon
} from 'lucide-react';
import './App.css';

// Multilingual translations dictionary
const TRANSLATIONS = {
  en: {
    dashboard: "Dashboard",
    liveMap: "Live Disaster Map",
    aiAgent: "LifeBridge AI Agent",
    shelters: "Shelters & Roads",
    supplyHub: "Supply Matching Hub",
    safetyRegistry: "Safety Registry",
    volunteer: "Volunteer Tasks",
    triggerSos: "TRIGGER SOS",
    threatLevel: "Threat Level",
    sheltersActive: "Active Shelters",
    roadBlocks: "Closed/Blocked Roads",
    matchedOffers: "Matched Supply Offers",
    tideAdvisory: "Local High-Tide Coastal Flooding Advisory",
    riverAdvisory: "Brahmaputra Hydrological Flood Monitor",
    safetyRadar: "SAFETY RADAR",
    time: "Time",
    height: "Height / Level",
    hazard: "Danger Level",
    lowBandwidth: "Low Bandwidth",
    lowBandwidthWarning: "Low Bandwidth Mode Active: High-resolution street assets and heavy maps are disabled to conserve network data and battery.",
    copyKit: "Copy Offline Kit",
    downloadTxt: "Download .txt",
    zoneMap: "Disaster Zone Map",
    liveBeacon: "LIVE BEACON COORDINATES LOCKED",
    allHazards: "All Hazards",
    activeShelters: "Active Shelters",
    roadBlockages: "Road Blockages",
    medicalHelp: "Medical Help",
    sosDistresses: "SOS Distresses",
    registryTitle: "Indian Civil Safety Registry",
    registryDesc: "Register yourself as \"Safe\" or \"Stranded\" so family members know where you are, or search for a relative.",
    registerTitle: "Register Safety Status",
    fullName: "Full Name *",
    mobileNumber: "Mobile Number *",
    currentLocation: "Current Location / Landmark *",
    status: "Status *",
    safe: "Safe & Secure",
    stranded: "Stranded / Needs Rescue",
    notes: "Survival Notes / Emergency Needs",
    submitRegistry: "SUBMIT TO CIVIL DIRECTORY",
    searchRegistry: "Search Registry Status",
    searchPlaceholder: "Search loved ones by Name, Phone or Location...",
    lastUpdated: "Last updated",
    signalNdrf: "Signal NDRF Rescue Team",
    supplyTitle: "Supply Matching & Resource Hub",
    supplyDesc: "Prevent relief bottlenecks by listing specific resource requests and donation offers. The engine automatically matches needs with nearby inventory.",
    reqSupplies: "Request Supplies (Need Resources)",
    offSupplies: "Offer Supplies (Donate Inventory)",
    itemType: "Item Type",
    qty: "Qty",
    unit: "Unit",
    deliveryLoc: "Delivery Location (City/Camp Area) *",
    pickupLoc: "Pickup Location (City/Area) *",
    contactPerson: "Contact Person & Phone *",
    donorName: "Donor Name *",
    donorContact: "Donor Contact Info *",
    postReq: "Post Supply Requirement",
    postOff: "Register Donation Offer",
    autoMatchedTitle: "Auto-Matched Relief Logistics",
    allRecords: "All Records",
    pendingRequests: "Pending Requests",
    availableOffers: "Available Offers",
    confirmDelivery: "Confirm Delivery & Archive Match",
    donorInventory: "DONOR INVENTORY",
    recipientNeed: "RECIPIENT NEED",
    volunteerTitle: "Indian Civil Volunteer Tasks",
    volunteerDesc: "Crisis coordinators require citizen volunteers to help distribute supplies, pack food packets, and assist at emergency clinics. Join active operations below.",
    registered: "Registered",
    joinOperation: "Join Operation",
    urgent: "URGENT",
    sosTitle: "TRIGGER NDRF SOS SIGNAL",
    sosDesc: "This will simulate broadcasting a critical distress signal with your coordinates directly to the Indian Disaster Response Control Room (NDRF).",
    coordsLabel: "Current Coordinates / landmark (India) *",
    cancel: "Cancel",
    dispatch: "DISPATCH SIGNAL",
    chatTitle: "LifeBridge AI Assistant",
    chatPlaceholder: "Ask anything... e.g. Where is the nearest shelter?",
    suggestions: "Suggestions",
    online: "ONLINE",
    howToUse: "How to use LifeBridge:",
    step1: "1. Check Map for flooded and blocked road areas.",
    step2: "2. Register safety status so family can find you.",
    step3: "3. Chat with Agent for shelters, first aid, or numbers.",
    quickDial: "Quick Helplines",
    nationalEmergency: "National Emergency",
    ndrfRescue: "NDRF Control Room",
    police: "Police Control",
    ambulance: "Ambulance Dept",
    fire: "Fire Brigade",
    disasterManagement: "State Disaster Dept",
    mapHelper: "🖱️ Drag map to move | Use slider or buttons to zoom",
    floodZone: "FLOOD RISK ZONE"
  },
  hi: {
    dashboard: "डैशबोर्ड",
    liveMap: "लाइव आपदा मानचित्र",
    aiAgent: "लाइफब्रिज एआई एजेंट",
    shelters: "आश्रय और सड़कें",
    supplyHub: "आपूर्ति मिलान केंद्र",
    safetyRegistry: "सुरक्षा रजिस्ट्री",
    volunteer: "स्वयंसेवक कार्य",
    triggerSos: "आपातकालीन संकेत (SOS)",
    threatLevel: "खतरे का स्तर",
    sheltersActive: "सक्रिय आश्रय",
    roadBlocks: "अवरुद्ध सड़कें",
    matchedOffers: "मिलाए गए राहत प्रस्ताव",
    tideAdvisory: "तटीय ज्वार-भाटा बाढ़ चेतावनी",
    riverAdvisory: "ब्रह्मपुत्र नदी जल स्तर मॉनिटर",
    safetyRadar: "सुरक्षा रडार",
    time: "समय",
    height: "जल स्तर / ऊंचाई",
    hazard: "खतरे का स्तर",
    lowBandwidth: "कम इंटरनेट मोड",
    lowBandwidthWarning: "कम इंटरनेट मोड चालू है: डेटा बचाने के लिए नक्शे की तस्वीरें बंद हैं।",
    copyKit: "जानकारी कॉपी करें",
    downloadTxt: "डाउनलोड .txt",
    zoneMap: "आपदा क्षेत्र मानचित्र",
    liveBeacon: "लाइव आपातकालीन स्थान लॉक",
    allHazards: "सभी खतरे",
    activeShelters: "सक्रिय आश्रय",
    roadBlockages: "सड़क मार्ग रुकावटें",
    medicalHelp: "चिकित्सा शिविर",
    sosDistresses: "फंसे हुए लोग (SOS)",
    registryTitle: "नागरिक सुरक्षा रजिस्ट्री",
    registryDesc: "अपने आप को 'सुरक्षित' या 'फंसे हुए' के रूप में दर्ज करें ताकि परिवार को पता चल सके, या किसी रिश्तेदार को खोजें।",
    registerTitle: "सुरक्षा स्थिति दर्ज करें",
    fullName: "आपका पूरा नाम *",
    mobileNumber: "मोबाइल नंबर *",
    currentLocation: "वर्तमान पता / लैंडमार्क *",
    status: "आपकी स्थिति *",
    safe: "सुरक्षित और ठीक हूँ",
    stranded: "फंसा हुआ हूँ / मदद चाहिए",
    notes: "आवश्यकता (जैसे: भोजन, पानी, दवा)",
    submitRegistry: "सुरक्षा स्थिति दर्ज करें",
    searchRegistry: "किसी रिश्तेदार को खोजें",
    searchPlaceholder: "सुरक्षा जांचने के लिए नाम या फोन दर्ज करें...",
    lastUpdated: "अंतिम अपडेट",
    signalNdrf: "NDRF को रिपोर्ट करें",
    supplyTitle: "राहत सामग्री मिलान केंद्र",
    supplyDesc: "मदद की जरूरत है? सूची दर्ज करें। राहत सामग्री दान करना चाहते हैं? सूची दर्ज करें। ऐप दोनों को मिला देगा।",
    reqSupplies: "सामग्री की आवश्यकता (मदद चाहिए)",
    offSupplies: "सामग्री दान करें (मदद करें)",
    itemType: "सामग्री का प्रकार",
    qty: "मात्रा",
    unit: "इकाई",
    deliveryLoc: "वितरण स्थान (शहर/शिविर) *",
    pickupLoc: "पिकअप स्थान (शहर/क्षेत्र) *",
    contactPerson: "संपर्क व्यक्ति और फोन *",
    donorName: "दाता का नाम *",
    donorContact: "दाता का संपर्क फोन *",
    postReq: "जरूरत पोस्ट करें",
    postOff: "दान पोस्ट करें",
    autoMatchedTitle: "राहत सामग्री मिलान",
    allRecords: "सभी वस्तुएं",
    pendingRequests: "आवश्यकताएं",
    availableOffers: "दान प्रस्ताव",
    confirmDelivery: "वितरण की पुष्टि करें",
    donorInventory: "NGO / दानदाता",
    recipientNeed: "प्राप्तकर्ता आवश्यकता",
    volunteerTitle: "स्वयंसेवक अवसर",
    volunteerDesc: "राहत शिविरों में भोजन-पानी पैक करने के लिए नागरिकों की जरूरत है। नीचे पंजीकरण करें।",
    registered: "पंजीकृत!",
    joinOperation: "कार्य में शामिल हों",
    urgent: "अति आवश्यक",
    sosTitle: "आपातकालीन संकेत भेजें (SOS)",
    sosDesc: "यह आपकी स्थिति और फोन नंबर को सीधे बचाव दल (NDRF) के पास भेज देगा।",
    coordsLabel: "आपका स्थान / लैंडमार्क (जैसे: छत पर, रेलवे स्टेशन के पास) *",
    cancel: "रद्द करें",
    dispatch: "संकेत भेजें",
    chatTitle: "लाइफब्रिज एआई सहायक",
    chatPlaceholder: "कुछ भी पूछें... जैसे: निकटतम आश्रय कहां है?",
    suggestions: "सुझाव",
    online: "सक्रिय",
    howToUse: "लाइफब्रिज का उपयोग कैसे करें:",
    step1: "1. बंद और पानी से भरी सड़कों को देखने के लिए मानचित्र देखें।",
    step2: "2. सुरक्षा स्थिति दर्ज करें ताकि परिवार वाले ढूंढ सकें।",
    step3: "3. आपातकालीन नंबर, आश्रय या प्राथमिक चिकित्सा के लिए चैट करें।",
    quickDial: "त्वरित हेल्पलाइन",
    nationalEmergency: "राष्ट्रीय आपातकाल",
    ndrfRescue: "NDRF कंट्रोल रूम",
    police: "पुलिस कंट्रोल",
    ambulance: "एम्बुलेंस विभाग",
    fire: "दमकल विभाग",
    disasterManagement: "आपदा विभाग",
    mapHelper: "🖱️ स्थानांतरित करने के लिए खींचें | ज़ूम के लिए स्लाइडर का उपयोग करें",
    floodZone: "बाढ़ खतरा क्षेत्र"
  },
  mr: {
    dashboard: "डॅशबोर्ड",
    liveMap: "थेट आपत्ती नकाशा",
    aiAgent: "लाइफब्रिज एआय एजंट",
    shelters: "आश्रय आणि रस्ते",
    supplyHub: "साहित्य जुळवणी केंद्र",
    safetyRegistry: "सुरक्षा नोंदणी",
    volunteer: "स्वयंसेवक कार्ये",
    triggerSos: "आणीबाणी संकेत (SOS)",
    threatLevel: "धोक्याची पातळी",
    sheltersActive: "सक्रिय आश्रय",
    roadBlocks: "बंद रस्ते",
    matchedOffers: "जुळलेले मदत प्रस्ताव",
    tideAdvisory: "भरती-ओहोटी पूर चेतावणी",
    riverAdvisory: "ब्रह्मपुत्र नदी जल पातळी मॉनिटर",
    safetyRadar: "सुरक्षा रडार",
    time: "वेळ",
    height: "जल पातळी / उंची",
    hazard: "धोक्याची पातळी",
    lowBandwidth: "कमी इंटरनेट मोड",
    lowBandwidthWarning: "कमी इंटरनेट मोड चालू: डेटा वाचवण्यासाठी नकाशा प्रतिमा बंद आहेत.",
    copyKit: "माहिती कॉपी करा",
    downloadTxt: "डाउनलोड .txt",
    zoneMap: "आपत्ती क्षेत्र नकाशा",
    liveBeacon: "थेट आपत्कालीन स्थान लॉक",
    allHazards: "सर्व धोके",
    activeShelters: "सक्रिय आश्रय",
    roadBlockages: "रस्ता अडथळे",
    medicalHelp: "वैद्यकीय शिबिर",
    sosDistresses: "फसलेले लोक (SOS)",
    registryTitle: "नागरिक सुरक्षा नोंदणी",
    registryDesc: "स्वतःला 'सुरक्षित' किंवा 'फसलेले' म्हणून नोंदवा जेणेकरून कुटुंबीयांना समजेल, किंवा नातेवाईक शोधा.",
    registerTitle: "तुमची सुरक्षा नोंदवा",
    fullName: "तुमचे पूर्ण नाव *",
    mobileNumber: "मोबाईल नंबर *",
    currentLocation: "सध्याचे ठिकाण / लँडमार्क *",
    status: "तुमची स्थिती *",
    safe: "सुरक्षित आणि व्यवस्थित",
    stranded: "फसलो आहे / मदत हवी",
    notes: "मदत हवी (उदा: अन्न, पाणी, औषध)",
    submitRegistry: "सुरक्षा नोंदणी सबमिट करा",
    searchRegistry: "नातेवाईक शोधा",
    searchPlaceholder: "सुरक्षा तपासण्यासाठी नाव किंवा फोन टाका...",
    lastUpdated: "शेवटचे अपडेट",
    signalNdrf: "NDRF ला कळवा",
    supplyTitle: "मदत साहित्य जुळवणी केंद्र",
    supplyDesc: "मदत हवी आहे? पोस्ट करा. मदत साहित्य दान करायचे आहे? पोस्ट करा. ॲप जुळवून देईल.",
    reqSupplies: "मदत हवी आहे (मागणी)",
    offSupplies: "मदत दान करा (प्रस्ताव)",
    itemType: "साहित्याचा प्रकार",
    qty: "प्रमाण",
    unit: "एकक",
    deliveryLoc: "वितरण ठिकाण (शहर/शिबिर) *",
    pickupLoc: "पिकअप ठिकाण (शहर/क्षेत्र) *",
    contactPerson: "संपर्क व्यक्ती आणि फोन *",
    donorName: "दात्याचे नाव *",
    donorContact: "दात्याचा संपर्क फोन *",
    postReq: "मागणी सबमिट करा",
    postOff: "दान सबमिट करा",
    autoMatchedTitle: "मदत साहित्य जुळवणी",
    allRecords: "सर्व नोंदी",
    pendingRequests: "मागण्या",
    availableOffers: "दान प्रस्ताव",
    confirmDelivery: "वितरण निश्चित करा",
    donorInventory: "NGO / दानशूर",
    recipientNeed: "लाभार्थी गरज",
    volunteerTitle: "स्वयंसेवक संधी",
    volunteerDesc: "राहत शिबिरांमध्ये अन्न-पाणी पॅक करण्यासाठी नागरिकांची गरज आहे. खाली नोंदणी करा.",
    registered: "नोंदणी झाली!",
    joinOperation: "कार्यात सामील व्हा",
    urgent: "तातडीचे",
    sosTitle: "आणीबाणी संकेत पाठवा (SOS)",
    sosDesc: "हे आपले ठिकाण आणि फोन नंबर थेट बचाव पथकाकडे (NDRF) पाठवेल.",
    coordsLabel: "तुमचे ठिकाण / लँडमार्क (उदा: रेल्वे स्टेशन जवळ, गच्चीवर) *",
    cancel: "रद्द करा",
    dispatch: "संकेत पाठवा",
    chatTitle: "लाइफब्रिज एआय सहाय्यक",
    chatPlaceholder: "काहीही विचारा... उदा: जवळचा निवारा कुठे आहे?",
    suggestions: "सुझाव",
    online: "सक्रिय",
    howToUse: "लाइफब्रिजचा वापर कसा करावा:",
    step1: "1. बंद किंवा पाणी साचलेले रस्ते पाहण्यासाठी नकाशा पहा.",
    step2: "2. स्वतःची सुरक्षा नोंदवा जेणेकरून कुटुंब शोधू शकेल.",
    step3: "3. मदत क्रमांक, निवारा किंवा प्रथमोपचारासाठी चॅट वापरा.",
    quickDial: "त्वरित हेल्पलाइन",
    nationalEmergency: "राष्ट्रीय आपत्कालीन सेवा",
    ndrfRescue: "NDRF बचाव कक्ष",
    police: "पोलीस नियंत्रण",
    ambulance: "रुग्णवाहिका विभाग",
    fire: "अग्निशामक दल",
    disasterManagement: "आपत्ती व्यवस्थापन",
    mapHelper: "🖱️ नकाशा हलवण्यासाठी ड्रॅग करा | झूम करण्यासाठी स्लाइडर वापरा",
    floodZone: "पूर धोका क्षेत्र"
  },
  ta: {
    dashboard: "முகப்பு பலகை",
    liveMap: "நேரடி வரைபடம்",
    aiAgent: "லைப்பிரிட்ஜ் ஏஐ முகவர்",
    shelters: "காப்பகம் & சாலைகள்",
    supplyHub: "உதவிப் பொருட்கள் பொருத்தம்",
    safetyRegistry: "பாதுகாப்பு பதிவேடு",
    volunteer: "தன்னார்வலர் பணிகள்",
    triggerSos: "அவசர உதவி (SOS)",
    threatLevel: "ஆபத்து நிலை",
    sheltersActive: "காப்பகங்கள் செயல்",
    roadBlocks: "மறிக்கப்பட்ட சாலைகள்",
    matchedOffers: "பொருத்தப்பட்ட உதவிகள்",
    tideAdvisory: "அலை வெள்ள எச்சரிக்கை",
    riverAdvisory: "பிரம்மபுத்திரா நதி நீர் கண்காணிப்பு",
    safetyRadar: "பாதுகாப்பு ரேடார்",
    time: "நேரம்",
    height: "அளவு / உயரம்",
    hazard: "அபாய நிலை",
    lowBandwidth: "குறைந்த இணையம்",
    lowBandwidthWarning: "குறைந்த இணைய பயன்முறையில் வரைபடங்கள் முடக்கப்பட்டுள்ளன.",
    copyKit: "நகலெடு",
    downloadTxt: "பதிவிறக்கம்",
    zoneMap: "பேரிடர் பகுதி வரைபடம்",
    liveBeacon: "நேரடி மீட்பு தளம் लॉक",
    allHazards: "அனைத்து அபாயங்கள்",
    activeShelters: "திறந்த காப்பகங்கள்",
    roadBlockages: "சாலை தடைகள்",
    medicalHelp: "மருத்துவ முகாம்",
    sosDistresses: "மீட்பு கோரிக்கைகள்",
    registryTitle: "பாதுகாப்பு பதிவேடு",
    registryDesc: "நீங்கள் பத்திரமாக இருக்கிறீர்களா அல்லது சிக்கி உள்ளீர்களா என பதிவு செய்யவும், உறவினர்களைத் தேடவும்.",
    registerTitle: "பாதுகாப்பை பதிவு செய்",
    fullName: "முழு பெயர் *",
    mobileNumber: "கைபேசி எண் *",
    currentLocation: "தற்போதைய இடம் / அடையாளம் *",
    status: "உங்களது நிலை *",
    safe: "பத்திரமாக உள்ளேன்",
    stranded: "சிக்கி உள்ளேன் / உதவி வேண்டும்",
    notes: "தேவைகள் (உணவு, தண்ணீர், மருந்து)",
    submitRegistry: "பதிவு செய்",
    searchRegistry: "உறவினர்களைத் தேடு",
    searchPlaceholder: "தேட பெயர் அல்லது எண்களை உள்ளிடவும்...",
    lastUpdated: "கடைசி புதுப்பிப்பு",
    signalNdrf: "NDRF-க்கு மீட்பு கோரிக்கை",
    supplyTitle: "பொருட்கள் பொருத்தும் மையம்",
    supplyDesc: "உதவிப் பொருட்கள் தேவையா? அல்லது வழங்க விரும்புகிறீர்களா? இங்கு பதிவு செய்யவும், பொருத்தப்படும்.",
    reqSupplies: "உதவி தேவை (கோரிக்கை)",
    offSupplies: "உதவி வழங்கல் (தானம்)",
    itemType: "பொருள் வகை",
    qty: "அளவு",
    unit: "அலகு",
    deliveryLoc: "வழங்கும் இடம் (நகரம்/முகாம்) *",
    pickupLoc: "பெறும் இடம் (நகரம்/பகுதி) *",
    contactPerson: "தொடர்பு விபரம் *",
    donorName: "வழங்குபவர் பெயர் *",
    donorContact: "வழங்குபவர் கைபேசி *",
    postReq: "கோரிக்கை சமர்ப்பி",
    postOff: "தானம் சமர்ப்பி",
    autoMatchedTitle: "பொருத்தப்பட்ட உதவிகள்",
    allRecords: "அனைத்து விபரங்கள்",
    pendingRequests: "தேவைகள்",
    availableOffers: "வழங்கல்கள்",
    confirmDelivery: "வழங்கப்பட்டதை உறுதி செய்",
    donorInventory: "தன்னார்வ வழங்கல்",
    recipientNeed: "தேவையுள்ளவர் விபரம்",
    volunteerTitle: "தன்னார்வலர் வாய்ப்புகள்",
    volunteerDesc: "உணவுப் பொட்டலங்கள் தயாரிக்க தன்னார்வலர்கள் தேவை. இங்கு இணையுங்கள்.",
    registered: "இணைந்துவிட்டேன்!",
    joinOperation: "பணியில் சேர்",
    urgent: "அவசரம்",
    sosTitle: "அவசர மீட்பு சமிக்ஞை (SOS)",
    sosDesc: "இ效து உங்கள் கைபேசி எண்ணையும் இடத்தையும் நேரடியாக மீட்புக் குழுவிற்கு (NDRF) அனுப்பும்.",
    coordsLabel: "இருப்பிடம் / அடையாளம் (எ.கா: மாடியில், நிலையத்திற்கு அருகில்) *",
    cancel: "திரும்பிச் செல்",
    dispatch: "சமிக்ஞை அனுப்பு",
    chatTitle: "லைப்பிரிட்ஜ் உதவி முகவர்",
    chatPlaceholder: "ஏதாவது கேட்கவும்... எ.கா: காப்பகம் எங்கே உள்ளது?",
    suggestions: "பரிந்துரைகள்",
    online: "செயலில்",
    howToUse: "லைப்பிரிட்ஜ் பயன்படுத்துவது எப்படி:",
    step1: "1. சாலை தடைகளை அறிய வரைபடத்தை சரிபார்க்கவும்.",
    step2: "2. உறவினர்கள் உங்களைக் கண்டறிய உங்களது நிலையைப் பதிவு செய்யவும்.",
    step3: "3. அவசர எண்கள் மற்றும் முதலுதவிக்கு ஏஐ அரட்டையை பயன்படுத்தவும்.",
    quickDial: "அவசர உதவி எண்கள்",
    nationalEmergency: "தேசிய அவசர எண்",
    ndrfRescue: "NDRF மீட்புக் கட்டுப்பாடு",
    police: "காவல்துறை",
    ambulance: "ஆம்புலன்ஸ்",
    fire: "தீயணைப்புத் துறை",
    disasterManagement: "பேரிடர் மேలాண்மை",
    mapHelper: "🖱️ நகர்த்த வரைபடத்தை இழுக்கவும் | பெரிதாக்க ஸ்லைடரைப் பயன்படுத்தவும்",
    floodZone: "வெள்ள அபாய பகுதி"
  },
  bn: {
    dashboard: "ড্যাশবোর্ড",
    liveMap: "লাইভ দুর্যোগ মানচিত্র",
    aiAgent: "লাইফব্রিজ এআই এজেন্ট",
    shelters: "আশ্রয় ও রাস্তাঘাট",
    supplyHub: "সরবরাহ মেলানোর কেন্দ্র",
    safetyRegistry: "সুরক্ষা রেজিস্ট্রি",
    volunteer: "স্বেচ্ছাসেবক কাজ",
    triggerSos: "জরুরি সংকেত (SOS)",
    threatLevel: "ঝুঁকির মাত্রা",
    sheltersActive: "সক্রিয় আশ্রয়কেন্দ্র",
    roadBlocks: "বন্ধ রাস্তাঘাট",
    matchedOffers: "মেলানো ত্রাণ প্রস্তাব",
    tideAdvisory: "উপকূলীয় জোয়ারের বন্যা সতর্কবার্তা",
    riverAdvisory: "ব্রহ্মপুত্র নদীর জলস্তর মনিটর",
    safetyRadar: "সুরক্ষা রাডার",
    time: "সময়",
    height: "জলস্তর / উচ্চতা",
    hazard: "বিপদের মাত্রা",
    lowBandwidth: "কম ডেটা মোড",
    lowBandwidthWarning: "কম ডেটা মোড চালু: ডেটা বাঁচাতে মানচিত্রের ছবি বন্ধ রয়েছে।",
    copyKit: "তথ্য কপি করুন",
    downloadTxt: "ডাউনলোড .txt",
    zoneMap: "দুর্যোগ এলাকার মানচিত্র",
    liveBeacon: "লাইভ জরুরি লোকেশন লক",
    allHazards: "সব বিপদ",
    activeShelters: "সক্রিয় আশ্রয়কেন্দ্র",
    roadBlockages: "রাস্তার প্রতিবন্ধকতা",
    medicalHelp: "চিকিৎসা শিবির",
    sosDistresses: "আটকে পড়া মানুষ (SOS)",
    registryTitle: "নাগরিক সুরক্ষা রেজিস্ট্রি",
    registryDesc: "নিজেকে 'নিরাপদ' বা 'আটকে পড়া' হিসেবে নথিভুক্ত করুন যাতে পরিবার জানতে পারে, অথবা কোনো আত্মীয়কে খুঁজুন।",
    registerTitle: "সুরক্ষা স্ট্যাটাস নথিভুক্ত করুন",
    fullName: "আপনার পুরো নাম *",
    mobileNumber: "মোবাইল নম্বর *",
    currentLocation: "বর্তমান অবস্থান / ল্যান্ডমার্ক *",
    status: "আপনার স্ট্যাটাস *",
    safe: "নিরাপদ ও সুস্থ আছি",
    stranded: "আটকে আছি / সাহায্য চাই",
    notes: "প্রয়োজনীয়তা (যেমন: খাবার, জল, ওষুধ)",
    submitRegistry: "সুরক্ষা স্ট্যাটাস जमा দিন",
    searchRegistry: "আত্মীয়কে খুঁজুন",
    searchPlaceholder: "সুরক্ষা যাচাই করতে নাম বা ফোন নম্বর লিখুন...",
    lastUpdated: "শেষ আপডেট",
    signalNdrf: "NDRF-কে রিপোর্ট করুন",
    supplyTitle: "ত্রাণ সামগ্রী মেলানোর কেন্দ্র",
    supplyDesc: "সাহায্য চাই? তালিকা দিন। ত্রাণ সামগ্রী দান করতে চান? তালিকা দিন। অ্যাপ দুটিকে মিলিয়ে দেবে।",
    reqSupplies: "সাহায্যের প্রয়োজন (সামগ্রী চাই)",
    offSupplies: "ত্রাণ দান করুন (সাহায্য করুন)",
    itemType: "সামগ্রীর প্রকার",
    qty: "পরিমাণ",
    unit: "একক",
    deliveryLoc: "ডেলিভারি স্থান (শহর/শিবির) *",
    pickupLoc: "পিকআপ স্থান (শহর/এলাকা) *",
    contactPerson: "যোগাযোগের ব্যক্তি ও ফোন *",
    donorName: "দাতার নাম *",
    donorContact: "দাতার ফোন নম্বর *",
    postReq: "চাহিদা পোস্ট করুন",
    postOff: "দান পোস্ট করুন",
    autoMatchedTitle: "ত্রাণ সামগ্রী মেলানো",
    allRecords: "সব রেকর্ড",
    pendingRequests: "চাহিদা সমূহ",
    availableOffers: "দান সমূহ",
    confirmDelivery: "ডেলিভারি নিশ্চিত করুন",
    donorInventory: "NGO / ত্রাণদাতা",
    recipientNeed: "গ্রহীতার চাহিদা",
    volunteerTitle: "স্বেচ্ছাসেবক সুযোগ",
    volunteerDesc: "ত্রাণ শিবিরে খাবার-জল প্যাক করার জন্য নাগরিক প্রয়োজন। নিচে নাম লিখুন।",
    registered: "নিবন্ধিত!",
    joinOperation: "কাজে যোগ দিন",
    urgent: "জরুরি",
    sosTitle: "জরুরি সংকেত পাঠান (SOS)",
    sosDesc: "এটি আপনার অবস্থান ও ফোন নম্বর সরাসরি উদ্ধারকারী দল (NDRF) এর কাছে পাঠাবে।",
    coordsLabel: "আপনার অবস্থান / ল্যান্ডমার্ক (যেমন: ছাদে, স্টেশনের কাছে) *",
    cancel: "বাতিল করুন",
    dispatch: "সংকেত পাঠান",
    chatTitle: "লাইফব্রিজ এআই সহকারী",
    chatPlaceholder: "যা কিছু জিজ্ঞেস করুন... যেমন: কাছের আশ্রয় কোথায়?",
    suggestions: "পরামর্শ",
    online: "সক্রিয়",
    howToUse: "লাইফব্রিজ কীভাবে ব্যবহার করবেন:",
    step1: "1. বন্ধ ও জলমগ্ন রাস্তা দেখতে মানচিত্র দেখুন।",
    step2: "2. সুরক্ষা স্ট্যাটাস দিন যাতে পরিবার আপনাকে খুঁজে পায়।",
    step3: "3. জরুরি নম্বর বা আশ্রয়ের জন্য চ্যাটের সাহায্য নিন।",
    quickDial: "জরুরি হেল্পলাইন",
    nationalEmergency: "জাতীয় জরুরি নম্বর",
    ndrfRescue: "NDRF কন্ট্রোল রুম",
    police: "পুলিশ কন্ট্রোল",
    ambulance: "অ্যাম্বুলেন্স বিভাগ",
    fire: "দমকল বিভাগ",
    disasterManagement: "দুর্যোগ ব্যবস্থাপনা",
    mapHelper: "🖱️ মানচিত্র সরাতে ড্র্যাগ করুন | জুম করতে স্লাইডার ব্যবহার করুন",
    floodZone: "বন্যা ঝুঁকি এলাকা"
  },
  as: {
    dashboard: "ডেচবৰ্ড",
    liveMap: "লাইভ দুৰ্যোগ মানচিত্ৰ",
    aiAgent: "লাইফব্ৰীজ এআই এজেণ্ট",
    shelters: "আশ্ৰয় আৰু ৰাস্তা",
    supplyHub: "योगान मेचিং কেন্দ্ৰ",
    safetyRegistry: "সুৰক্ষা পঞ্জীয়ন",
    volunteer: "স্বেচ্ছাসেৱকৰ কাম",
    triggerSos: "জৰুৰী সংকেত (SOS)",
    threatLevel: "বিপদৰ মাত্ৰা",
    sheltersActive: "সক্ৰিয় আশ্ৰয়কেন্দ্ৰ",
    roadBlocks: "বন্ধ বাট-পথ",
    matchedOffers: "মেলোৱা সাহায্য প্ৰস্তাৱ",
    tideAdvisory: "উপকূলীয় জোৱাৰৰ বান সতৰ্কতা",
    riverAdvisory: "ব্ৰহ্মপুত্ৰ নদীৰ জলস্তৰ নিৰীক্ষক",
    safetyRadar: "সুৰক্ষা ৰাডাৰ",
    time: "সময়",
    height: "জলস্তৰ / উচ্চতা",
    hazard: "বিপদৰ মাত্ৰা",
    lowBandwidth: "কম ডেটা মোড",
    lowBandwidthWarning: "কম ডেটা মোড সক্ৰিয়: ডেটা বচাবলৈ মানচিত্ৰৰ ছবি বন্ধ কৰা হৈছে।",
    copyKit: "তথ্য কপি কৰক",
    downloadTxt: "ডাউনলোড .txt",
    zoneMap: "দুৰ্যোগ এলেকাৰ মানচিত্ৰ",
    liveBeacon: "লাইভ জৰুৰী অৱস্থান লক",
    allHazards: "সকলো বিপদ",
    activeShelters: "সক্ৰিয় আশ্ৰয়কেন္ৰ",
    roadBlockages: "ৰাস্তাৰ বাধা",
    medicalHelp: "চিকিৎসা শিবিৰ",
    sosDistresses: "আৱদ্ধ লোক (SOS)",
    registryTitle: "নাগৰিক সুৰক্ষা পঞ্জীয়ন",
    registryDesc: "নিজক 'সুৰক্ষিত' বা 'আৱদ্ধ' হিচাপে পঞ্জীয়ন কৰক যাতে পৰিয়ালে গম পায়, বা আত্মীয়ক বিচাৰক।",
    registerTitle: "সুৰক্ষা স্থিতি পঞ্জীয়ন কৰক",
    fullName: "আপোনাৰ সম্পূৰ্ণ নাম *",
    mobileNumber: "মোবাইল নম্বৰ *",
    currentLocation: "বৰ্তমান অৱস্থান / লেণ্ডমাৰ্ক *",
    status: "আপোনাৰ স্থিতি *",
    safe: "সুৰক্ষিত আৰু ভালে আছোঁ",
    stranded: "আৱদ্ধ হৈ আছোঁ / সহায় লাগে",
    notes: "প্ৰয়োজনীয়তা (যেনে: খাদ্য, পানী, ঔষধ)",
    submitRegistry: "সুৰক্ষা স্থিতি জমা দিয়क",
    searchRegistry: "আত্মীয়ক বিচাৰক",
    searchPlaceholder: "সুৰক্ষা পৰীক্ষা কৰিবলৈ নাম বা ফোন নম্বৰ লিখক...",
    lastUpdated: "শেষ আপডেট",
    signalNdrf: "NDRF ক ৰিপৰ্ট কৰক",
    supplyTitle: "সাহায্য সামগ্ৰী মেচিং কেন্দ্ৰ",
    supplyDesc: "সহায় লাগেনে? can। সাহায্য সামগ্ৰী দান কৰিব বিচাৰে? তালিকা দিয়ক। এপে দুয়োটাকে মিলাই দিব।",
    reqSupplies: "সহায়ৰ প্ৰয়োজন (সামগ্ৰী লাগে)",
    offSupplies: "সাহায্য দান কৰক (সহায় কৰক)",
    itemType: "সামগ্ৰীৰ প্ৰকাৰ",
    qty: "পৰিমাণ",
    unit: "একক",
    deliveryLoc: "ডেলিভাৰী স্থান (চহৰ/শিবিৰ) *",
    pickupLoc: "পিকআপ স্থান (চহৰ/এলেকা) *",
    contactPerson: "যোগাযোগৰ ব্যক্তি আৰু ফোন *",
    donorName: "দাতাৰ নাম *",
    donorContact: "দাতাৰ ফোন নম্বৰ *",
    postReq: "চাহিদা প’ষ্ট কৰক",
    postOff: "দান প’ষ্ট কৰক",
    autoMatchedTitle: "সাহায্য সামগ্ৰী মেলোৱা",
    allRecords: "সকলো ৰেকৰ্ড",
    pendingRequests: "চাহিদা সমূহ",
    availableOffers: "দান সমূহ",
    confirmDelivery: "ডেলিভাৰী নিশ্চিত কৰক",
    donorInventory: "NGO / সাহায্যদাতা",
    recipientNeed: "গ্ৰহীতাৰ চাহিদা",
    volunteerTitle: "স্বেচ্ছাসেৱকৰ সুযোগ",
    volunteerDesc: "সাহায্য শিবিৰত খাদ্য-পানী পেক কৰিবলৈ নাগৰিকৰ প্ৰয়োজন। তলত নাম পঞ্জীয়ন কৰক।",
    registered: "পঞ্জীয়নভুক্ত!",
    joinOperation: "কাম কৰিবলৈ যোগ দিয়ক",
    urgent: "জৰুৰী",
    sosTitle: "জৰুৰী সংকেত পঠিয়াওক (SOS)",
    sosDesc: "ই আপোনাৰ অৱস্থান আৰু ফোন নম্বৰ পোনপটীয়াকৈ উদ্ধাৰকাৰী দললৈ (NDRF) পঠিয়াব।",
    coordsLabel: "আপোনাৰ অৱস্থান / লেণ্ডমাৰ্ক (যেনে: চালৰ ওপৰত, ষ্টেচনৰ ওচৰত) *",
    cancel: "বাতিল কৰক",
    dispatch: "সংকেত পঠিয়াওক",
    chatTitle: "লাইফব্ৰীজ এআই সহায়ক",
    chatPlaceholder: "যিকোনো কথা সোধক... যেনে: ওচৰৰ আশ্ৰয় ক’ত?",
    suggestions: "পৰামৰ্শ",
    online: "সক্ৰিয়",
    howToUse: "লাইফব্ৰীজ কেনেকৈ ব্যৱহাৰ কৰিব:",
    step1: "1. বন্ধ আৰু জলমগ্ন ৰাস্তা চাবলৈ মানচিত্ৰখন চাওক।",
    step2: "2. নিজৰ সুৰক্ষা স্থিতি দিয়ক যাতে পৰিয়ালে আপোনাক বিচাৰি পায়।",
    step3: "3. জৰুৰী নম্বৰ বা আশ্ৰয়ৰ বাবে চ্যাটৰ সহায় লওক।",
    quickDial: "জৰুৰী হেল্পলাইন",
    nationalEmergency: "জাতীয় জৰুৰী নম্বৰ",
    ndrfRescue: "NDRF কণ্ট্ৰ’ল ৰুম",
    police: "আৰক্ষী কণ্ট্ৰ’ল",
    ambulance: "এম্বুলেন্স বিভাগ",
    fire: "অগ্নিনিৰ্বাপক বাহিনী",
    disasterManagement: "দুৰ্যোগ ব্যৱস্থাপনা",
    mapHelper: "🖱️ মানচিত্ৰ লৰাবলৈ ড্ৰেগ কৰক | জুম কৰিবলৈ স্লাইডাৰ ব্যৱহাৰ কৰক",
    floodZone: "বানপানী বিপদ এলেকা"
  },
  or: {
    dashboard: "ଡ୍ୟାସବୋର୍ଡ",
    liveMap: "ଲାଇଭ୍ ବିପର୍ଯ୍ୟୟ ମାନଚିତ୍ର",
    aiAgent: "ଲାଇଫବ୍ରିଜ୍ ଏଆଇ ଏଜେଣ୍ଟ",
    shelters: "ଆଶ୍ରୟ ଓ ସଡକ",
    supplyHub: "ଯୋଗାଣ ମେଳଣ କେନ୍ଦ୍ର",
    safetyRegistry: "ସୁରକ୍ଷା ପଞ୍ଜିକରଣ",
    volunteer: "ସ୍ୱେଚ୍ଛାସେବୀ କାର୍ଯ୍ୟ",
    triggerSos: "ଆପାତକାଳୀନ ସଂକେତ (SOS)",
    threatLevel: "ବିପଦ ସ୍ତର",
    sheltersActive: "ସକ୍ରିୟ ଆଶ୍ରୟସ୍ଥଳୀ",
    roadBlocks: "ଅବରୁଦ୍ଧ ସଡକ",
    matchedOffers: "ମେଳ ଖାଉଥିବା ସାହାଯ୍ୟ ପ୍ରସ୍ତାବ",
    tideAdvisory: "ଉପକୂଳ ଜୁଆର ବନ୍ୟା ସତର୍କତା",
    riverAdvisory: "ବ୍ରହ୍ମପୁତ୍ର ନଦୀ ଜଳସ୍ତର ମନିଟର",
    safetyRadar: "ସୁରକ୍ଷା ରାଡାର",
    time: "ସମୟ",
    height: "ଜଳସ୍ତର / ଉଚ୍ଚତା",
    hazard: "ବିପଦର ସ୍ତର",
    lowBandwidth: "କମ୍ ଡାଟା ମୋଡ୍",
    lowBandwidthWarning: "କମ୍ ଡାଟା ମୋଡ୍ ସକ୍ରିୟ: ମାନଚିତ୍ର ଚିତ୍ର ବନ୍ଦ କରାଯାଇଛି।",
    copyKit: "ତଥ୍ୟ କପି କରନ୍ତୁ",
    downloadTxt: "ଡାଉନଲୋଡ୍ .txt",
    zoneMap: "ବିପର୍ଯ୍ୟୟ ପ୍ରଭାବିତ ଅଞ୍ଚଳ ମାନଚିତ୍ର",
    liveBeacon: "ସିଧାସଳଖ ଜରୁରୀକାଳୀନ ସ୍ଥାନ ଲକ୍",
    allHazards: "ସମସ୍ତ ବିପଦ",
    activeShelters: "ସକ୍ରିୟ ଆଶ୍ରୟସ୍ଥଳୀ",
    roadBlockages: "ରାସ୍ତା ଅବରୋଧ",
    medicalHelp: "ଚିକିତ୍ସା ଶିବିର",
    sosDistresses: "ଫସି ରହିଥିବା ଲୋକ (SOS)",
    registryTitle: "ନାଗରିକ ସୁରକ୍ଷା ପଞ୍ଜିକରଣ",
    registryDesc: "ନିଜକୁ 'ସୁରକ୍ଷିତ' କିମ୍ବା 'ଫସି ରହିଥିବା' ଭାବରେ ପଞ୍ଜିକରଣ କରନ୍ତୁ ଯେପରି ପରିବାର ଲୋକ ଜାଣିପାରିବେ, କିମ୍ବା କୌଣସି ସମ୍ପର୍କୀୟଙ୍କୁ ଖୋଜନ୍ତୁ।",
    registerTitle: "ସୁରକ୍ଷା ସ୍ଥିତି ପଞ୍ଜିକରଣ କରନ୍ତୁ",
    fullName: "ଆପଣଙ୍କର ପୂରା ନାମ *",
    mobileNumber: "ମୋବାଇଲ୍ ନମ୍ବର *",
    currentLocation: "ବର୍ତ୍ତମାନର ସ୍ଥାନ / ଚିହ୍ନଟ ସ୍ଥଳ *",
    status: "ଆପଣଙ୍କର ସ୍ଥିତି *",
    safe: "ସୁରକ୍ଷିତ ଓ ଭଲରେ ଅଛି",
    stranded: "ଫସି ରହିଛି / ସାହାଯ୍ୟ ଦରକାର",
    notes: "ଆବଶ୍ୟକତା (ଯେପରିକି: ଖାଦ୍ୟ, ପାଣି, ଔଷଧ)",
    submitRegistry: "ସୁରକ୍ଷା ସ୍ଥିତି ଦାଖଲ କରନ୍ତୁ",
    searchRegistry: "ସମ୍ପର୍କୀୟଙ୍କୁ ଖୋଜନ୍ତୁ",
    searchPlaceholder: "ସୁରକ୍ଷା ଯାଞ୍ଚ କରିବା ପାଇଁ ନାମ କିମ୍ବା ଫୋନ୍ ନମ୍ବର ଲେଖନ୍ତୁ...",
    lastUpdated: "ଶେଷ ଅପଡେଟ୍",
    signalNdrf: "NDRF କୁ ଖବର ଦିଅନ୍ତୁ",
    supplyTitle: "ସାହାଯ୍ୟ ସାମଗ୍ରୀ ମେଳଣ କେନ୍ଦ୍ର",
    supplyDesc: "ସାହାଯ୍ୟ ଦରକାର କି? ତାଲିକା ଦିଅନ୍ତୁ। ସାମଗ୍ରୀ ଦାନ କରିବାକୁ ଚାହାଁନ୍ତି କି? ତାଲିକା ଦିଅନ୍ତୁ। ଆପ୍ ଦୁଇଟିକୁ ମିଶାଇ ଦେବ।",
    reqSupplies: "ସାହାଯ୍ୟର ଆବଶ୍ୟକତା (ସାମଗ୍ରୀ ଦରକାର)",
    offSupplies: "ସାମଗ୍ରୀ ଦାନ କରନ୍ତୁ (ସାହାଯ୍ୟ କରନ୍ତୁ)",
    itemType: "ସାମଗ୍ରୀର ପ୍ରକାର",
    qty: "ପରିମାଣ",
    unit: "ଏକକ",
    deliveryLoc: "ବିତରଣ ସ୍ଥାନ (ସହର/ଶିବିର) *",
    pickupLoc: "ସଂଗ୍ରହ ସ୍ଥାନ (ସହର/ଅଞ୍ଚଳ) *",
    contactPerson: "ଯୋଗାଯୋଗ ବ୍ୟକ୍ତି ଓ ଫୋନ୍ *",
    donorName: "ଦାତାଙ୍କ ନାମ *",
    donorContact: "ଦାତାଙ୍କ ଫୋନ୍ ନମ୍ବର *",
    postReq: "ଆବଶ୍ୟକତା ପୋଷ୍ଟ କରନ୍ତୁ",
    postOff: "ଦାନ ପୋଷ୍ଟ କରନ୍ତୁ",
    autoMatchedTitle: "ସାହାଯ୍ୟ ସାମଗ୍ରୀ ମେଳଣ",
    allRecords: "ସମସ୍ତ ରେକର୍ଡ",
    pendingRequests: "ଆବଶ୍ୟକତା ସମୂହ",
    availableOffers: "ଦାନ ସମୂହ",
    confirmDelivery: "ବିତରଣ ନିଶ୍ଚିତ କରନ୍ତୁ",
    donorInventory: "NGO / ଦାତା",
    recipientNeed: "ଗ୍ରହୀତାଙ୍କ ଆବଶ୍ୟକତା",
    volunteerTitle: "ସ୍ୱେଚ୍ଛାସେବୀ ସୁଯୋଗ",
    volunteerDesc: "ତ୍ରାଣ ଶିବିରରେ ଖାଦ୍ୟ-ପାଣି ପ୍ୟାକ୍ କରିବା ପାଇଁ ନାଗରିକଙ୍କ ଆବଶ୍ୟକତା ଅଛି। ତଳେ ନାମ ପଞ୍ଜିକୃତ କରନ୍ତୁ।",
    registered: "ପଞ୍ଜିକୃତ!",
    joinOperation: "କାର୍ଯ୍ୟରେ ଯୋਗ ଦିଅନ୍ତୁ",
    urgent: "ଜରୁରୀ",
    sosTitle: "ଜରୁରୀ ସଂକେତ ପଠାନ୍ତୁ (SOS)",
    sosDesc: "ଏହା ଆପଣଙ୍କର ସ୍ଥାନ ଏବଂ ଫୋନ୍ ନମ୍ବର ସିଧାସଳଖ ଉଦ୍ଧାରକାରୀ ଦଳ (NDRF) କୁ ପଠାଇବ।",
    coordsLabel: "ଆପଣଙ୍କର ସ୍ଥାନ / ଚିହ୍ନଟ ସ୍ଥଳ (ଯେପରିକି: ଛାତ ଉପରେ, ଷ୍ଟେସନ ନିକଟରେ) *",
    cancel: "ବାତିଲ କରନ୍ତୁ",
    dispatch: "ସଂକେତ ପଠାନ୍ତୁ",
    chatTitle: "ଲାଇଫବ୍ରିଜ୍ ଏଆଇ ସହାୟକ",
    chatPlaceholder: "ଯାହା କିଛି ପଚାରନ୍ତୁ... ଯେପରିକି: ନିକଟସ୍ଥ ଆଶ୍ରୟସ୍ଥଳୀ କେଉଁଠି?",
    suggestions: "ପରାମର୍ଶ",
    online: "ସକ୍ରିୟ",
    howToUse: "ଲାଇଫବ୍ରିଜ୍ କିପରି ବ୍ୟବହାର କରିବେ:",
    step1: "1. ବନ୍ଦ ଏବଂ ଜଳମଗ୍ନ ରାସ୍ତା ଦେଖିବା ପାଇଁ ମାନଚିତ୍ର ଦେଖନ୍ତୁ।",
    step2: "2. ସୁରક્ષା ସ୍ଥିତି ଦିଅନ୍ତୁ ଯେପରି ପରିବାର ଆପଣଙ୍କୁ ଖୋଜି ପାଇବ।",
    step3: "3. ଜରୁରୀ ନମ୍ବର କିମ୍ବା ଆଶ୍ରୟ ପାଇଁ ଚାଟ୍ ର ସାହାଯ្យ ନିଅନ୍ତୁ।",
    quickDial: "ଜରୁରୀ ହେଲ୍ପଲାଇନ",
    nationalEmergency: "ଜାତୀୟ ଜରୁରୀ ନମ୍ବର",
    ndrfRescue: "NDRF କଣ୍ଟ୍ରୋଲ୍ ରୁମ୍",
    police: "ପୋଲିସ୍ କଣ୍ଟ୍ରୋଲ୍",
    ambulance: "ଆମ୍ବୁଲାନ୍ସ ବିଭାଗ",
    fire: "ଅଗ୍ନିଶମ ବାହିନୀ",
    disasterManagement: "ବିପର୍ଯ୍ୟୟ ପରିଚାଳନା",
    mapHelper: "🖱️ ମାନଚିତ୍ର ଘୁଞ୍ଚାଇବାକୁ ଟାଣନ୍ତୁ | ଜୁମ୍ କରିବାକୁ ସ୍ଲାଇଡର୍ ବ୍ୟବହାର କରନ୍ତୁ",
    floodZone: "ବନ୍ୟା ବିପଦ ପ୍ରବଣ ଅଞ୍ଚଳ"
  },
  te: {
    dashboard: "డ్యాష్‌బోర్డ్",
    liveMap: "లైవ్ విపత్తు మ్యాప్",
    aiAgent: "లైఫ్‌బ్రిడ్జ్ AI ఏజెంట్",
    shelters: "ఆశ్రయాలు & రోడ్లు",
    supplyHub: "సరఫరా సరిపోలిక కేంద్రం",
    safetyRegistry: "భద్రతా రిజిస్ట్రీ",
    volunteer: "స్వచ్ఛంద పనులు",
    triggerSos: "అత్యవసర సిగ్నల్ (SOS)",
    threatLevel: "ప్రమాద స్థాయి",
    sheltersActive: "యాక్టివ్ ఆశ్రయాలు",
    roadBlocks: "మూసివేసిన రోడ్లు",
    matchedOffers: "సరిపోలిన సహాయ ప్రతిపాదనలు",
    tideAdvisory: "తీరప్రాంత గరిష్ట అలల వరద హెచ్చరిక",
    riverAdvisory: "బ్రహ్మపుత్ర నది నీటి మట్టాల పర్యవేక్షణ",
    safetyRadar: "భద్రతా రాడార్",
    time: "సమయం",
    height: "నీటి మట్టం / ఎత్తు",
    hazard: "ప్రమాద తీవ్రత",
    lowBandwidth: "తక్కువ ఇంటర్నెట్ మోడ్",
    lowBandwidthWarning: "తక్కువ ఇంటర్నెట్ మోడ్ యాక్టివ్‌గా ఉంది: మ్యాప్ చిత్రాలు నిలిపివేయబడ్డాయి.",
    copyKit: "సమాచారాన్ని కాపీ చేయి",
    downloadTxt: "డౌన్‌లోడ్ .txt",
    zoneMap: "విపత్తు ప్రాంత మ్యాప్",
    liveBeacon: "లైవ్ అత్యవసర స్థాన లాక్",
    allHazards: "అన్ని ప్రమాదాలు",
    activeShelters: "యాక్టివ్ ఆశ్రయాలు",
    roadBlockages: "రోడ్డు అడ్డంకులు",
    medicalHelp: "వైద్య శిబిరాలు",
    sosDistresses: "సహాయం కోరేవారు (SOS)",
    registryTitle: "పౌర భద్రతా రిజిస్ట్రీ",
    registryDesc: "మీరు సురక్షితంగా ఉన్నారా లేదా చిక్కుకుపోయారా అనేది నమోదు చేయండి, తద్వారా కుటుంబ సభ్యులకు సమాచారం అందుతుంది.",
    registerTitle: "భద్రతా స్థితిని నమోదు చేయండి",
    fullName: "మీ పూర్తి పేరు *",
    mobileNumber: "మొబైల్ సంఖ్య *",
    currentLocation: "ప్రస్తుత నివాసం / ల్యాండ్‌మార్క్ *",
    status: "మీ స్థితి *",
    safe: "సురక్షితంగా ఉన్నాను",
    stranded: "చిక్కుకుపోయాను / సహాయం కావాలి",
    notes: "అవసరాలు (ఉదా: ఆహారం, నీరు, మందులు)",
    submitRegistry: "భద్రతా స్థితిని సమర్పించు",
    searchRegistry: "బంధువులను వెతకండి",
    searchPlaceholder: "భద్రతను తనిఖీ చేయడానికి పేరు లేదా నంబర్ టైప్ చేయండి...",
    lastUpdated: "చివరి అప్‌డేట్",
    signalNdrf: "NDRF కి నివేదించండి",
    supplyTitle: "సహాయక సామాగ్రి సరిపోలిక కేంద్రం",
    supplyDesc: "సహాయం కావాలా? లిస్ట్ చేయండి. దానం చేయాలనుకుంటున్నారా? నమోదు చేయండి. యాప్ రెండింటినీ సరిపోల్చుతుంది.",
    reqSupplies: "సామాగ్రి అవసరం (సహాయం కావాలి)",
    offSupplies: "సామాగ్రి విరాళం (సహాయం చేయండి)",
    itemType: "సామాగ్రి రకం",
    qty: "పరిమాణం",
    unit: "యూనిట్",
    deliveryLoc: "డెలివరీ స్థలం (నగరం/శిబిరం) *",
    pickupLoc: "పికప్ స్థలం (నగరం/ప్రాంతం) *",
    contactPerson: "సంప్రదించవలసిన వ్యక్తి & ఫోన్ *",
    donorName: "దాత పేరు *",
    donorContact: "దాత ఫోన్ నంబర్ *",
    postReq: "అవసరాన్ని సమర్పించు",
    postOff: "విరాళాన్ని సమర్పించు",
    autoMatchedTitle: "సహాయక సామాగ్రి సరిపోలిక",
    allRecords: "అన్ని రికార్డులు",
    pendingRequests: "అవసరాలు",
    availableOffers: "విరాళాలు",
    confirmDelivery: "డెలివరీని ధృవీకరించు",
    donorInventory: "NGO / దాత",
    recipientNeed: "గ్రహీత అవసరం",
    volunteerTitle: "స్వచ్ఛంద అవకాశాలు",
    volunteerDesc: "సహాయక శిబిరాల్లో ఆహారం-నీరు ప్యాక్ చేయడానికి పౌరులు అవసరం. క్రింద నమోదు చేసుకోండి.",
    registered: "నమోదైంది!",
    joinOperation: "పనిలో చేరండి",
    urgent: "అత్యవసరం",
    sosTitle: "అత్యవసర సంకేతాన్ని పంపండి (SOS)",
    sosDesc: "ఇది మీ స్థానాన్ని మరియు ఫోన్ నంబర్‌ను నేరుగా రెస్క్యూ టీమ్ (NDRF) కు పంపుతుంది.",
    coordsLabel: "మీ స్థానం / ల్యాండ్‌మార్క్ (ఉదా: భవనం పైన, స్టేషన్ సమీపంలో) *",
    cancel: "రద్దు చేయి",
    dispatch: "సిగ్నల్ పంపండి",
    chatTitle: "లైఫ్‌బ్రిడ్జ్ AI సహాయకుడు",
    chatPlaceholder: "ఏదైనా అడగండి... ఉదా: దగ్గరలోని ఆశ్రయం ఎక్కడ ఉంది?",
    suggestions: "సూచనలు",
    online: "యాక్టివ్",
    howToUse: "లైఫ్‌బ్రిడ్జ్‌ని ఎలా ఉపయోగించాలి:",
    step1: "1. మూసివేసిన మరియు వరదలతో ఉన్న రోడ్లను చూడటానికి మ్యాప్ చూడండి.",
    step2: "2. మీ భద్రతా స్థితిని నమోదు చేయండి తద్వారా కుటుంబ సభ్యులు మిమ్మల్ని కనుగొనగలరు.",
    step3: "3. అత్యవసర నంబర్లు, ఆశ్రయం కోసం చాట్ సహాయం తీసుకోండి.",
    quickDial: "త్వరిత హెల్ప్‌లైన్",
    nationalEmergency: "జాతీయ అత్యవసర సంఖ్య",
    ndrfRescue: "NDRF కంట్రోల్ రూమ్",
    police: "పోలీస్ కంట్రోల్",
    ambulance: "అంబులెన్స్ విభాగం",
    fire: "అగ్నిమాపక కేంద్రం",
    disasterManagement: "విపత్తు నిర్వహణ",
    mapHelper: "🖱️ మ్యాప్‌ను జరపడానికి లాగండి | జూమ్ చేయడానికి స్లైడర్‌ను ఉపయోగించండి",
    floodZone: "వరద ప్రమాద ప్రాంతం"
  },
  gu: {
    dashboard: "ડેસ્કબોર્ડ",
    liveMap: "જીવંત આપત્તિ નકશો",
    aiAgent: "લાઇફબ્રિજ AI એજન્ટ",
    shelters: "આશ્રય અને રસ્તાઓ",
    supplyHub: "મદદ સામગ્રી મેળવણી કેન્દ્ર",
    safetyRegistry: "સુરક્ષા રજિસ્ટ્રી",
    volunteer: "સ્વયંસેવક કાર્યો",
    triggerSos: "કટોકટી સંકેત (SOS)",
    threatLevel: "જોખમનું સ્તર",
    sheltersActive: "સક્રિય આશ્રયસ્થાનો",
    roadBlocks: "બંધ રસ્તાઓ",
    matchedOffers: "મેળવેલ સહાય દરખાસ્તો",
    tideAdvisory: "દરિયાઈ ભરતી પૂર ચેતવણી",
    riverAdvisory: "બ્રહ્મપુત્રા નદી જળ સ્તર મોનિટર",
    safetyRadar: "સુરક્ષા રડાર",
    time: "સમય",
    height: "જળ સ્તર / ઊંચાઈ",
    hazard: "જોખમ સ્તર",
    lowBandwidth: "ઓછા ઇન્ટરનેટ મોડ",
    lowBandwidthWarning: "ઓછા ઇન્ટરનેટ મોડ સક્રિય છે: નકશાના ચિત્રો બંધ કરવામાં આવ્યા છે.",
    copyKit: "માહિતી કોપી કરો",
    downloadTxt: "ડાઉનલોડ .txt",
    zoneMap: "આપત્તિ પ્રભાવિત વિસ્તાર નકશો",
    liveBeacon: "જીવંત ઇમરજન્સી લોકેશન લોક",
    allHazards: "તમામ જોખમો",
    activeShelters: "સક્રિય આશ્રયસ્થાનો",
    roadBlockages: "રસ્તાની અડચણો",
    medicalHelp: "તબીબી શિબિર",
    sosDistresses: "ફસાયેલા લોકો (SOS)",
    registryTitle: "નાગરિક સુરક્ષા રજિસ્ટ્રી",
    registryDesc: "તમારી જાતને 'સુરક્ષિત' અથવા 'ફસાયેલા' તરીકે રજીસ્ટર કરો જેથી પરિવારને ખબર પડે, અથવા કોઈ સંબંધીને શોધો.",
    registerTitle: "સુરક્ષા સ્થિતિ રજીસ્ટર કરો",
    fullName: "તમારું પૂરું નામ *",
    mobileNumber: "મોબાઈલ નંબર *",
    currentLocation: "વર્તમાન સરનામું / લેન્ડમાર્ક *",
    status: "તમારી સ્થિતિ *",
    safe: "સુરક્ષિત અને કુશળ છું",
    stranded: "ફસાયેલો છું / મદદની જરૂર છે",
    notes: "જરૂરિયાત (જેમ કે: ખોરાક, પાણી, દવા)",
    submitRegistry: "સુરક્ષા સ્થિતિ સબમિટ કરો",
    searchRegistry: "સંબંધીને શોધો",
    searchPlaceholder: "સુરક્ષા તપાસવા માટે નામ અથવા ફોન દાખલ કરો...",
    lastUpdated: "છેલ્લું અપડેટ",
    signalNdrf: "NDRF ને જાણ કરો",
    supplyTitle: "સહાય સામગ્રી મેળવણી કેન્દ્ર",
    supplyDesc: "મદદ જોઈએ છે? યાદી આપો. સામગ્રી દાન કરવા માંગો છો? નોંધણી કરો. એપ બંનેને મેળવી આપશે.",
    reqSupplies: "સામગ્રીની જરૂરિયાત (મદદ જોઈએ છે)",
    offSupplies: "સામગ્રી દાન કરો (મદદ કરો)",
    itemType: "સામગ્રીનો પ્રકાર",
    qty: "જથ્થો",
    unit: "એકમ",
    deliveryLoc: "ડિલિવરી સ્થળ (શહેર/શિબિર) *",
    pickupLoc: "પિકઅપ સ્થળ (શહેર/વિસ્તાર) *",
    contactPerson: "સંપર્ક વ્યક્તિ અને ફોન *",
    donorName: "દાતાનું નામ *",
    donorContact: "દાતાનો સંપર્ક ફોન *",
    postReq: "જરૂરિયાત સબમિટ કરો",
    postOff: "દાન સબમિટ કરો",
    autoMatchedTitle: "સહાય સામગ્રી મેળવણી",
    allRecords: "તમામ રેકોર્ડ",
    pendingRequests: "જરૂરિયાતો",
    availableOffers: "દાન દરખાસ્તો",
    confirmDelivery: "ડિલિવરીની ખાતરી કરો",
    donorInventory: "NGO / દાતા",
    recipientNeed: "ગ્રાહકની જરૂરિયાત",
    volunteerTitle: "Swયંસેવક તકો",
    volunteerDesc: "રાહત શિબિરોમાં ભોજન-પાણી પેક કરવા માટે નાગરિકોની જરૂર છે. નીચે નોંધણી કરો.",
    registered: "નોંધાયેલ!",
    joinOperation: "કાર્યમાં જોડાઓ",
    urgent: "અતિ આવશ્યક",
    sosTitle: "કટોકટી સંકેત મોકલો (SOS)",
    sosDesc: "આ તમારી સ્થિતિ અને ફોન નંબર સીધા બચાવ દળ (NDRF) ને મોકલશે.",
    coordsLabel: "તમારું સ્થાન / લેન્ડમાર્ક (જેમ કે: છત પર, સ્ટેશન નજીક) *",
    cancel: "રદ કરો",
    dispatch: "સંકેત મોકલો",
    chatTitle: "લાઇફબ્રિજ AI સહાયક",
    chatPlaceholder: "કંઈપણ પૂછો... જેમ કે: નજીકનું આશ્રયસ્થાન ક્યાં છે?",
    suggestions: "સૂચનો",
    online: "સક્રિય",
    howToUse: "લાઇફબ્રિજનો ઉપયોગ કેવી રીતે કરવો:",
    step1: "1. બંધ અને પાણી ભરાયેલા રસ્તાઓ જોવા માટે નકશો જુઓ.",
    step2: "2. સુરક્ષા સ્થિતિ રજીસ્ટર કરો જેથી પરિવાર તમને શોધી શકે.",
    step3: "3. કટોકટી નંબર અથવા આશ્રય માટે ચેટ મદદ લો.",
    quickDial: "ઇમરજન્સી હેલ્પલાઇન",
    nationalEmergency: "રાષ્ટ્રીય કટોકટી નંબર",
    ndrfRescue: "NDRF કંટ્રોલ રૂમ",
    police: "પોલીસ કંટ્રોલ",
    ambulance: "એમ્બ્યુલન્સ વિભાગ",
    fire: "અગ્નિશામક દળ",
    disasterManagement: "આપત્તિ વ્યવસ્થાપન",
    mapHelper: "🖱️ નકશો ખસેડવા માટે ખેંચો | ઝૂમ કરવા માટે સ્લાઇડરનો ઉપયોગ કરો",
    floodZone: "પૂર જોખમ વિસ્તાર"
  },
  kn: {
    dashboard: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
    liveMap: "ಲೈವ್ ವಿಪತ್ತು ನಕ್ಷೆ",
    aiAgent: "ಲೈಫ್‌ಬ್ರಿಡ್ಜ್ AI ಏಜೆಂಟ್",
    shelters: "ಆಶ್ರಯ ಮತ್ತು ರಸ್ತೆಗಳು",
    supplyHub: "ಸರಬರಾಜು ಹೊಂದಾಣಿಕೆ ಕೇಂದ್ರ",
    safetyRegistry: "ಸುರಕ್ಷತಾ ನೋಂದಣಿ",
    volunteer: "ಸ್ವಯಂಸೇವಕ ಕಾರ್ಯಗಳು",
    triggerSos: "ತುರ್ತು ಸಂಕೇತ (SOS)",
    threatLevel: "ಅಪಾಯದ ಮಟ್ಟ",
    sheltersActive: "ಸಕ್ರಿಯ ಆಶ್ರಯಗಳು",
    roadBlocks: "ಮುಚ್ಚಿದ ರಸ್ತೆಗಳು",
    matchedOffers: "ಹೊಂದಾಣಿಕೆಯಾದ ಸಹಾಯ ಪ್ರಸ್ತಾಪಗಳು",
    tideAdvisory: "ಕರಾವಳಿ ಉಬ್ಬರವಿಳಿತ ಪ್ರವಾಹ ಮುನ್ನೆಚ್ಚರಿಕೆ",
    riverAdvisory: "ಬ್ರಹ್ಮಪುತ್ರ ನದಿ ನೀರಿನ ಮಟ್ಟ ಮೇಲ್ವಿಚಾರಣೆ",
    safetyRadar: "ಸುರಕ್ಷತಾ ರೇಡಾರ್",
    time: "ಸಮಯ",
    height: "ನೀರಿನ ಮಟ್ಟ / ಎತ್ತರ",
    hazard: "ಅಪಾಯದ ತೀವ್ರತೆ",
    lowBandwidth: "ಕಡಿಮೆ ಇಂಟರ್ನೆಟ್ ಮೋಡ್",
    lowBandwidthWarning: "ಕಡಿಮೆ ಇಂಟರ್ನೆಟ್ ಮೋಡ್ ಸಕ್ರಿಯವಾಗಿದೆ: ನಕ್ಷೆ ಚಿತ್ರಗಳನ್ನು ನಿಷ್ಕ್ರಿಯಗೊಳಿಸಲಾಗಿದೆ.",
    copyKit: "ಮಾಹಿತಿಯನ್ನು ನಕಲಿಸಿ",
    downloadTxt: "ಡೌನ್‌ಲೋಡ್ .txt",
    zoneMap: "ವಿಪತ್ತು ಪ್ರದೇಶದ ನಕ್ಷೆ",
    liveBeacon: "ಲೈವ್ ತುರ್ತು ಸ್ಥಳ ಲಾಕ್",
    allHazards: "ಎಲ್ಲಾ ಅಪಾಯಗಳು",
    activeShelters: "ಸಕ್ರಿಯ ಆಶ್ರಯಗಳು",
    roadBlockages: "ರಸ್ತೆ ತಡೆಗಳು",
    medicalHelp: "ವೈದ್ಯಕೀಯ ಶಿಬಿರಗಳು",
    sosDistresses: "ಸಹಾಯ ಕೋರುವವರು (SOS)",
    registryTitle: "ನಾಗರಿಕ ಸುರಕ್ಷತಾ ನೋಂದಣಿ",
    registryDesc: "ನೀವು ಸುರಕ್ಷಿತವಾಗಿದ್ದೀರಾ ಅಥವಾ ಸಿಲುಕಿಕೊಂಡಿದ್ದೀರಾ ಎಂದು ನೋಂದಾಯಿಸಿ, ಇದರಿಂದ ಕುಟುಂಬದವರಿಗೆ ಮಾಹಿತಿ ಸಿಗುತ್ತದೆ.",
    registerTitle: "ಸುರಕ್ಷತಾ ಸ್ಥಿತಿಯನ್ನು ನೋಂದಾಯಿಸಿ",
    fullName: "ನಿಮ್ಮ ಪೂರ್ಣ ಹೆಸರು *",
    mobileNumber: "ಮೊಬೈಲ್ ಸಂಖ್ಯೆ *",
    currentLocation: "ಪ್ರಸ್ತುತ ವಾಸಸ್ಥಳ / ಲ್ಯಾಂಡ್‌ಮಾರ್ಕ್ *",
    status: "ನಿಮ್ಮ ಸ್ಥಿತಿ *",
    safe: "ಸುರಕ್ಷಿತವಾಗಿದ್ದೇನೆ",
    stranded: "ಸಿಲುಕಿಕೊಂಡಿದ್ದೇನೆ / ಸಹಾಯ ಬೇಕು",
    notes: "ಅಗತ್ಯಗಳು (ಉದಾ: ಆಹಾರ, ನೀರು, ಔಷಧಿಗಳು)",
    submitRegistry: "ಸುರಕ್ಷತಾ ಸ್ಥಿತಿಯನ್ನು ಸಲ್ಲಿಸಿ",
    searchRegistry: "ಬಂಧುಗಳನ್ನು ಹುಡುಕಿ",
    searchPlaceholder: "ಸುರಕ್ಷತೆಯನ್ನು ಪರಿಶೀಲಿಸಲು ಹೆಸರು ಅಥವಾ ಸಂಖ್ಯೆ ಟೈಪ್ ಮಾಡಿ...",
    lastUpdated: "ಕೊನೆಯ ಅಪ್ಡೇಟ್",
    signalNdrf: "NDRF ಗೆ ವರದಿ ಮಾಡಿ",
    supplyTitle: "ಸಹಾಯ ಸಾಮಗ್ರಿ ಹೊಂದಾಣಿಕೆ ಕೇಂದ್ರ",
    supplyDesc: "ಸಹಾಯ ಬೇಕೇ? ಪಟ್ಟಿ ಮಾಡಿ. ದಾನ ಮಾಡಲು ಬಯಸುವಿರಾ? ನೋಂದಾಯಿಸಿ. ಆಪ್ ಎರಡನ್ನೂ ಹೊಂದಿಸುತ್ತದೆ.",
    reqSupplies: "ಸಾಮಗ್ರಿಗಳ ಅಗತ್ಯವಿದೆ (ಸಹಾಯ ಬೇಕು)",
    offSupplies: "ಸಾಮಗ್ರಿ ಕೊಡುಗೆ (ಸಹಾಯ ಮಾಡಿ)",
    itemType: "ಸಾಮಗ್ರಿ ವಿಧ",
    qty: "ಪ್ರಮಾಣ",
    unit: "ಘಟಕ",
    deliveryLoc: "ವಿತರಣಾ ಸ್ಥಳ (ನಗರ/ಶಿಬಿರ) *",
    pickupLoc: "ಪಿಕಪ್ ಸ್ಥಳ (ನಗರ/ಪ್ರದೇಶ) *",
    contactPerson: "ಸಂಪರ್ಕಿಸುವ ವ್ಯಕ್ತಿ ಮತ್ತು ಫೋನ್ *",
    donorName: "ದಾತರ ಹೆಸರು *",
    donorContact: "ದಾತರ ಫೋನ್ ಸಂಖ್ಯೆ *",
    postReq: "ಅಗತ್ಯವನ್ನು ಸಲ್ಲಿಸಿ",
    postOff: "ಕೊಡುಗೆಯನ್ನು ಸಲ್ಲಿಸಿ",
    autoMatchedTitle: "ಸಹಾಯ ಸಾಮಗ್ರಿ ಹೊಂದಾಣಿಕೆ",
    allRecords: "ಎಲ್ಲಾ ದಾಖಲೆಗಳು",
    pendingRequests: "ಅಗತ್ಯಗಳು",
    availableOffers: "ಕೊಡುಗೆಗಳು",
    confirmDelivery: "ವಿತರಣೆಯನ್ನು ಖಚಿತಪಡಿಸಿ",
    donorInventory: "NGO / ದಾತರು",
    recipientNeed: "ಸ್ವೀಕರಿಸುವವರ ಅಗತ್ಯ",
    volunteerTitle: "ಸ್ವಯಂಸೇವಕ ಅವಕಾಶಗಳು",
    volunteerDesc: "ಸಹಾಯ ಶಿಬಿರಗಳಲ್ಲಿ ಆಹಾರ-ನೀರು ಪ್ಯಾಕ್ ಮಾಡಲು ನಾಗರಿಕರು ಅಗತ್ಯವಿದ್ದಾರೆ. ಕೆಳಗೆ ನೋಂದಾಯಿಸಿ.",
    registered: "ನೋಂದಾಯಿಸಲಾಗಿದೆ!",
    joinOperation: "ಕೆಲಸಕ್ಕೆ ಸೇರಿಕೊಳ್ಳಿ",
    urgent: "ತುರ್ತು",
    sosTitle: "ತುರ್ತು ಸಂಕೇತವನ್ನು ಕಳುಹಿಸಿ (SOS)",
    sosDesc: "ಇದು ನಿಮ್ಮ ಸ್ಥಳ ಮತ್ತು ಫೋನ್ ಸಂಖ್ಯೆಯನ್ನು ನೇರವಾಗಿ ರಕ್ಷಾಣಾ ತಂಡಕ್ಕೆ (NDRF) ಕಳುಹಿಸುತ್ತದೆ.",
    coordsLabel: "ನಿಮ್ಮ ಸ್ಥಳ / ಲ್ಯಾಂಡ್‌ಮಾರ್ಕ್ (ಉದಾ: ಕಟ್ಟಡದ ಮೇಲೆ, ನಿಲ್ದಾಣದ ಹತ್ತಿರ) *",
    cancel: "ರದ್ದುಮಾಡಿ",
    dispatch: "ಸಂಕೇತ ಕಳುಹಿಸಿ",
    chatTitle: "ಲೈಫ್‌ಬ್ರಿಡ್ಜ್ AI ಸಹಾಯಕ",
    chatPlaceholder: "ಏನನ್ನಾದರೂ ಕೇಳಿ... ಉದಾ: ಹತ್ತಿರದ ಆಶ್ರಯ ಎಲ್ಲಿದೆ?",
    suggestions: "ಸಲಹೆಗಳು",
    online: "ಸಕ್ರಿಯ",
    howToUse: "ಲೈಫ್‌ಬ್ರಿಡ್ಜ್ ಅನ್ನು ಹೇಗೆ ಬಳಸುವುದು:",
    step1: "1. ಮುಚ್ಚಿದ ಮತ್ತು ಪ್ರವಾಹ ಪೀಡಿತ ರಸ್ತೆಗಳನ್ನು ನೋಡಲು ನಕ್ಷೆ ನೋಡಿ.",
    step2: "2. ನಿಮ್ಮ ಸುರಕ್ಷತಾ ಸ್ಥಿತಿಯನ್ನು ನೋಂದಾಯಿಸಿ ಇದರಿಂದ ಕುಟುಂಬದವರು ನಿಮ್ಮನ್ನು ಕಂಡುಕೊಳ್ಳಬಹುದು.",
    step3: "3. ತುರ್ತು ಸಂಖ್ಯೆಗಳು, ಆಶ್ರಯಕ್ಕಾಗಿ ಚಾಟ್ ಸಹಾಯ ಪಡೆಯಿರಿ.",
    quickDial: "ತುರ್ತು ಸಹಾಯವಾಣಿ",
    nationalEmergency: "ರಾಷ್ಟ್ರೀಯ ತುರ್ತು ಸಂಖ್ಯೆ",
    ndrfRescue: "NDRF ನಿಯಂತ್ರಣ ಕೊಠಡಿ",
    police: "ಪೊಲೀಸ್ ನಿಯಂತ್ರಣ",
    ambulance: "ಆಂಬ್ಯುಲೆನ್ಸ್ ವಿಭಾಗ",
    fire: "ಅಗ್ನಿಶಾಮಕ ದಳ",
    disasterManagement: "ವಿಪತ್ತು ನಿರ್ವಹಣೆ",
    mapHelper: "🖱️ ನಕ್ಷೆಯನ್ನು ಸರಿಸಲು ಎಳೆಯಿರಿ | ಝೂಮ್ ಮಾಡಲು ಸ್ಲೈಡರ್ ಬಳಸಿ",
    floodZone: "ಪ್ರವಾಹ ಅಪಾಯದ ಪ್ರದೇಶ"
  },
  ml: {
    dashboard: "ഡാഷ്‌ബോർഡ്",
    liveMap: "തത്സമയ ദുരന്ത ഭൂപടം",
    aiAgent: "ലൈഫ്ബ്രിഡ്ജ് AI ഏജന്റ്",
    shelters: "ആശ്രയങ്ങളും റോഡുകളും",
    supplyHub: "വിതരണ പൊരുത്തപ്പെടുത്തൽ കേന്ദ്രം",
    safetyRegistry: "സുരക്ഷാ രജിസ്ട്രി",
    volunteer: "വോളണ്ടിയർ ജോലികൾ",
    triggerSos: "അടിയന്തിര സിഗ്നൽ (SOS)",
    threatLevel: "അപകട നില",
    sheltersActive: "സജീവ ആശ്രയങ്ങൾ",
    roadBlocks: "തടസ്സപ്പെട്ട റോഡുകൾ",
    matchedOffers: "പൊരുത്തപ്പെട്ട സഹായ വാഗ്ദാനങ്ങൾ",
    tideAdvisory: "തീരദേശ വേലിയേറ്റ വെള്ളപ്പൊക്ക മുന്നറിയിപ്പ്",
    riverAdvisory: "ബ്രഹ്മപുത്ര നദിയിലെ ജലനിരപ്പ് നിരീക്ഷണം",
    safetyRadar: "സുരക്ഷാ റഡാർ",
    time: "സമയം",
    height: "ജലനിരപ്പ് / ഉയരം",
    hazard: "അപകട തീവ്രത",
    lowBandwidth: "കുറഞ്ഞ ഇന്റർനെറ്റ് മോഡ്",
    lowBandwidthWarning: "കുറഞ്ഞ ഇന്റർനെറ്റ് മോഡ് സജീവമാണ്: ഭൂപട ചിത്രങ്ങൾ ഒഴിവാക്കിയിരിക്കുന്നു.",
    copyKit: "വിവരങ്ങൾ പകർപ്പിലാക്കുക",
    downloadTxt: "ഡൗൺലോഡ് ചെയ്യുക .txt",
    zoneMap: "ദുരന്ത ബാധിത പ്രദേശ ഭൂപടം",
    liveBeacon: "ലൈവ് എമർജൻസി ലൊക്കേഷൻ ലോക്ക്",
    allHazards: "എല്ലാ അപകടങ്ങളും",
    activeShelters: "സജീവ ആശ്രയങ്ങൾ",
    roadBlockages: "റോഡ് തടസ്സങ്ങൾ",
    medicalHelp: "മെഡിക്കൽ ക്യാമ്പുകൾ",
    sosDistresses: "സഹായം തേടുന്നവർ (SOS)",
    registryTitle: "പൗര സുരക്ഷാ രജിസ്ട്രി",
    registryDesc: "നിങ്ങൾ സുരക്ഷിതനാണോ അതോ കുടുങ്ങിക്കിടക്കുകയാണോ എന്ന് രജിസ്റ്റർ ചെയ്യുക, കുടുംബാംഗങ്ങൾക്ക് വിവരങ്ങൾ ലഭ്യമാകും.",
    registerTitle: "സുരക്ഷാ നില രജിസ്റ്റർ ചെയ്യുക",
    fullName: "നിങ്ങളുടെ പൂർണ്ണനാമം *",
    mobileNumber: "മൊബൈൽ നമ്പർ *",
    currentLocation: "നിലവിലെ സ്ഥലം / ലാൻഡ്‌മാർക്ക് *",
    status: "നിങ്ങളുടെ നില *",
    safe: "സുരക്ഷിതനാണ്",
    stranded: "കുടുങ്ങിക്കിടക്കുന്നു / സഹായം വേണം",
    notes: "ആവശ്യങ്ങൾ (ഉദാഹരണത്തിന്: ഭക്ഷണം, വെള്ളം, മരുന്നുകൾ)",
    submitRegistry: "സുരക്ഷാ നില സമർപ്പിക്കുക",
    searchRegistry: "ബന്ധുക്കളെ തിരയുക",
    searchPlaceholder: "സുരക്ഷ പരിശോധിക്കാൻ പേരോ ഫോൺ നമ്പറോ ടൈപ്പ് ചെയ്യുക...",
    lastUpdated: "അവസാന അപ്ഡേറ്റ്",
    signalNdrf: "NDRF ന് റിപ്പോർട്ട് ചെയ്യുക",
    supplyTitle: "സഹായ സാമഗ്രി പൊരുത്തപ്പെടുത്തൽ കേന്ദ്രം",
    supplyDesc: "സഹായം വേണോ? ലിസ്റ്റ് ചെയ്യുക. സംഭാവന ചെയ്യാൻ ആഗ്രഹിക്കുന്നുവോ? രജിസ്റ്റർ ചെയ്യുക. ആപ്പ് രണ്ടും പൊരുത്തപ്പെടുത്തും.",
    reqSupplies: "സാമഗ്രികൾ ആവശ്യമുണ്ട് (സഹായം വേണം)",
    offSupplies: "സാമഗ്രി സംഭാവന (സഹായം ചെയ്യുക)",
    itemType: "സാമഗ്രിയുടെ തരം",
    qty: "അളവ്",
    unit: "യൂണിറ്റ്",
    deliveryLoc: "ഡെലിവറി സ്ഥലം (നഗരം/ക്യാമ്പ്) *",
    pickupLoc: "പിക്ക്അപ്പ് സ്ഥലം (നഗരം/പ്രദേശം) *",
    contactPerson: "ബന്ധപ്പെടേണ്ട വ്യക്തിയും ഫോണും *",
    donorName: "ദാതാവിന്റെ പേര് *",
    donorContact: "ദാതാവിന്റെ ഫോൺ നമ്പർ *",
    postReq: "ആവശ്യം സമർപ്പിക്കുക",
    postOff: "സംഭാവന സമർപ്പിക്കുക",
    autoMatchedTitle: "സഹായ സാമഗ്രി പൊരുത്തപ്പെടുത്തൽ",
    allRecords: "എല്ലാ റെക്കോർഡുകളും",
    pendingRequests: "ആവശ്യങ്ങൾ",
    availableOffers: "സംഭാവനകൾ",
    confirmDelivery: "ഡെലിവറി സ്ഥിരീകരിക്കുക",
    donorInventory: "NGO / ദാതാവ്",
    recipientNeed: "സ്വീകർത്താവിന്റെ ആവശ്യം",
    volunteerTitle: "വോളണ്ടിയർ അവസരങ്ങൾ",
    volunteerDesc: "സഹായ ക്യാമ്പുകളിൽ ഭക്ഷണവും വെള്ളവും പാക്ക് ചെയ്യാൻ പൗരന്മാരെ ആവശ്യമുണ്ട്. താഴെ രജിസ്റ്റർ ചെയ്യുക.",
    registered: "രജിസ്റ്റർ ചെയ്തു!",
    joinOperation: "ജോലിയിൽ പങ്കുചേരുക",
    urgent: "അടിയന്തിരം",
    sosTitle: "അടിയന്തിര സന്ദേശം അയക്കുക (SOS)",
    sosDesc: "ഇത് നിങ്ങളുടെ സ്ഥലവും ഫോൺ സന്ദേശം നേരിട്ട് രക്ഷാപ്രവർത്തന സംഘത്തിന് (NDRF) അയക്കും.",
    coordsLabel: "നിങ്ങളുടെ സ്ഥലം / ലാൻഡ്‌മാർക്ക് (ഉദാ: കെട്ടിടത്തിന് മുകളിൽ, സ്റ്റേഷന് സമീപം) *",
    cancel: "റദ്ദാക്കുക",
    dispatch: "സിഗ്നൽ അയക്കുക",
    chatTitle: "ലൈഫ്ബ്രിഡ്ജ് AI സഹായി",
    chatPlaceholder: "എന്തും ചോദിക്കുക... ഉദാഹരണത്തിന്: അടുത്തുള്ള ആശ്രയം എവിടെയാണ്?",
    suggestions: "നിർദ്ദേശങ്ങൾ",
    online: "സജീവം",
    howToUse: "ലൈഫ്ബ്രിഡ്ജ് എങ്ങനെ ഉപയോഗിക്കാം:",
    step1: "1. തടസ്സപ്പെട്ടതും വെള്ളപ്പൊക്ക ബാധിതവുമായ റോഡുകൾ കാണാൻ ഭൂപടം നോക്കുക.",
    step2: "2. നിങ്ങളുടെ സുരക്ഷാ നില രജിസ്റ്റർ ചെയ്യുക, കുടുംബാംഗങ്ങൾക്ക് നിങ്ങളെ കണ്ടെത്താനാകും.",
    step3: "3. അടിയന്തിര നമ്പറുകൾക്കും ആശ്രയത്തിനുമായി ചാറ്റ് സഹായം തേടുക.",
    quickDial: "ദ്രുത ഹെൽപ്പ്‌ലൈൻ",
    nationalEmergency: "ദേശീയ അടിയന്തിര നമ്പർ",
    ndrfRescue: "NDRF കൺട്രോൾ റൂം",
    police: "പോലീസ് കൺട്രോൾ",
    ambulance: "ആംബുലൻസ് വിഭാഗം",
    fire: "ഫയർ ഫോഴ്സ്",
    disasterManagement: "ദുരന്ത നിവാരണം",
    mapHelper: "🖱️ ഭൂപടം നീക്കാൻ വലിക്കുക | സൂം ചെയ്യാൻ സ്ലൈഡർ ഉപയോഗിക്കുക",
    floodZone: "വെള്ളപ്പൊക്ക അപകട മേഖല"
  }
};

const sheltersData = {
  mumbai: [
    { name: "St. Xavier's School Hall", address: "Mahapalika Marg, Dhobi Talao", capacity: "150/200", status: "Open", resources: ["Food", "Clean Water", "First Aid"], phone: "+91-22-2415-0501" },
    { name: "Dharavi Community Center", address: "Sion-Bandra Link Rd", capacity: "80/300", status: "Open", resources: ["Food", "Clean Water", "Basic Medical Camp"], phone: "+91-22-2640-1200" },
    { name: "Andheri Sports Complex", address: "Veera Desai Road", capacity: "500/500", status: "Full", resources: ["Food", "Water", "Doctor on site"], phone: "+91-22-2623-9520" }
  ],
  chennai: [
    { name: "Nehru Indoor Stadium", address: "Periamet, Chennai", capacity: "450/1500", status: "Open", resources: ["Cots", "Hot meals", "Water", "Medical station"], phone: "+91-44-2538-3400" },
    { name: "Tambaram Community Hall", address: "Tambaram, Chennai", capacity: "150/200", status: "Open", resources: ["Food", "Water", "First Aid"], phone: "+91-44-2226-1122" }
  ],
  guwahati: [
    { name: "Guwahati University Hall", address: "Jalukbari, Guwahati", capacity: "120/500", status: "Open", resources: ["Food", "Drinking Water", "First Aid"], phone: "+91-361-257-0415" },
    { name: "Dispur Relief Camp", address: "Dispur, Guwahati", capacity: "300/300", status: "Full", resources: ["Food", "Water"], phone: "+91-361-226-0033" }
  ],
  puri: [
    { name: "Cyclone Shelter - Puri Beach", address: "Sea Drive Road, Puri", capacity: "600/1000", status: "Open", resources: ["High-energy rations", "Water purifiers", "Emergency medical wing"], phone: "+91-6752-223400" }
  ]
};

const LOCAL_ROADS = {
  mumbai: { route: "Mumbai to Thane", status: "Hazardous", reason: "Severe waterlogging on Eastern Express Highway near Kurla. Traffic is halted.", alternative: "Use LBS Road or SCLR, but drive slowly due to heavy rainfall." },
  chennai: { route: "Chennai to Tambaram", status: "Closed", reason: "Heavy water stagnation near Tambaram underpass due to monsoon rains.", alternative: "Use Outer Ring Road (ORR) for transit." },
  guwahati: { route: "Guwahati to Dispur", status: "Closed", reason: "Landslide on GS Road blocking both lanes.", alternative: "Take VIP Road detour. Slow moving traffic." },
  puri: { route: "Puri to Bhubaneswar", status: "Closed", reason: "National Highway 316 blocked by uprooted trees from the cyclone.", alternative: "No safe alternative route currently. Cyclone landfall in progress. Stay sheltered." }
};

const LOCAL_MEDICAL = {
  mumbai: [
    { name: "KEM Hospital", address: "Acharya Donde Marg, Parel", contact: "+91-22-2410-7000", status: "Emergency Room Open", notes: "High patient volume, triage active." },
    { name: "Lilavati Hospital", address: "A.K. Road, Bandra West", contact: "+91-22-2675-1000", status: "Emergency Room Open", notes: "Fully functional, ambulance service available." }
  ],
  chennai: [
    { name: "Rajiv Gandhi Govt General Hospital", address: "EVR Periyar Salai, Park Town", contact: "+91-44-2530-5000", status: "Open", notes: "Disaster emergency wing fully active." },
    { name: "Apollo Hospitals Greams Road", address: "21, Greams Lane", contact: "+91-44-2829-0200", status: "Open", notes: "Ambulances on standby for rescue calls." }
  ],
  guwahati: [
    { name: "Gauhati Medical College & Hospital", address: "Bhangagarh, Guwahati", contact: "+91-361-213-0200", status: "Open", notes: "Special flood-injury wing running." }
  ],
  puri: [
    { name: "District Headquarters Hospital", address: "Puri Town", contact: "+91-6752-223062", status: "Emergency Wing Active", notes: "Backup generators online, doctors available 24/7." }
  ]
};

const HIGH_TIDES = {
  mumbai: [
    { date: "June 20, 2026", time: "15:30", height: "4.85m", hazard: "CRITICAL DANGER", notes: "Coinciding with heavy rains. Severe flooding expected in Dadar, Kurla." },
    { date: "June 20, 2026", time: "22:15", height: "4.12m", hazard: "MODERATE RISK", notes: "Normal monsoon drainage strain." },
    { date: "June 21, 2026", time: "16:15", height: "4.92m", hazard: "EXTREME DANGER", notes: "Highest high tide of the season. Avoid beaches completely." }
  ],
  chennai: [
    { date: "June 20, 2026", time: "14:10", height: "1.45m", hazard: "LOW RISK", notes: "Minor coastal swell." },
    { date: "June 21, 2026", time: "14:55", height: "1.65m", hazard: "MODERATE RISK", notes: "Advisory to fisherfolk to stay onshore." }
  ],
  guwahati: [
    { date: "June 20, 2026", time: "08:00", height: "49.80m", hazard: "CRITICAL DANGER", notes: "Brahmaputra level: 0.8m above Danger Level (49.0m)." },
    { date: "June 21, 2026", time: "08:00", height: "50.15m", hazard: "EXTREME DANGER", notes: "Brahmaputra level: 1.15m above Danger Level. Embankment threat." }
  ],
  puri: [
    { date: "June 20, 2026", time: "12:30", height: "2.85m", hazard: "HIGH DANGER", notes: "Storm surge warning: Sea level rise up to 2m expected." },
    { date: "June 21, 2026", time: "13:10", height: "3.20m", hazard: "EXTREME DANGER", notes: "Cyclone landfall peak storm surge. Evacuate 5km radius." }
  ]
};

const clientMockResponse = (message, location, disasterType) => {
  const msg = message.toLowerCase();
  
  if (msg.includes("helpline") || msg.includes("directory") || msg.includes("phone") || msg.includes("contact") || msg.includes("number")) {
    return `📞 **Official Indian Emergency Helpline Numbers:**\n\n` +
           `• **National Emergency Number:** 112\n` +
           `• **Police:** 100\n` +
           `• **Ambulance / Medical:** 108 / 102\n` +
           `• **Fire Dept:** 101\n` +
           `• **NDRF (Disaster Response):** 1078\n` +
           `• **State Disaster Authority:** 1070\n\n` +
           `*Please call 112 or 1078 immediately if you require physical rescue.*`;
  }
  
  if (msg.includes("sos") || msg.includes("broadcast") || msg.includes("stranded") || msg.includes("rescue") || msg.includes("help")) {
    return `🚨 **SOS Alert Dispatched to NDRF Control Room!**\n\n` +
           `We have logged a simulated distress beacon with local district authorities:\n` +
           `• **Status:** DISPATCHED\n` +
           `• **Incident:** ${location.toUpperCase()} Crisis Team notified.\n\n` +
           `**⚠️ Safety Advice:** Stay on high ground. Conserve phone battery. If you are stranded, try to make yourself visible from above using brightly colored sheets. Call **112 / 1078** directly if possible.`;
  }
  
  if (msg.includes("shelter") || msg.includes("accommodation") || msg.includes("stay") || msg.includes("refuge")) {
    const list = sheltersData[location] || [];
    if (list.length === 0) return `No active shelters registered in ${location.toUpperCase()} at this moment. Seek higher ground or contact state helpline.`;
    
    let text = `🏫 **Open emergency shelters in ${location.toUpperCase()}:**\n\n`;
    list.forEach(s => {
      const icon = s.status === "Open" ? "🟢" : "🔴";
      text += `### ${s.name} (${icon} ${s.status})\n` +
              `• **Address:** ${s.address}\n` +
              `• **Capacity:** ${s.capacity}\n` +
              `• **Resources:** ${s.resources.join(", ")}\n` +
              `• **Contact:** ${s.phone}\n\n`;
    });
    return text;
  }
  
  if (msg.includes("road") || msg.includes("route") || msg.includes("closed") || msg.includes("highway") || msg.includes("block") || msg.includes("safe")) {
    const road = LOCAL_ROADS[location];
    if (!road) return `No road blockages reported in this area. Drive with extreme caution.`;
    
    return `🛣️ **Route Check: ${road.route}**\n\n` +
           `• **Status:** ${road.status}\n` +
           `• **Reason:** ${road.reason}\n` +
           `• **Alternative Detour:** ${road.alternative}`;
  }
  
  if (msg.includes("medical") || msg.includes("hospital") || msg.includes("clinic") || msg.includes("doctor") || msg.includes("medicine")) {
    const list = LOCAL_MEDICAL[location] || [];
    if (list.length === 0) return `No special emergency camps reported. Please go to the nearest general public hospital or call 108.`;
    
    let text = `🏥 **Emergency Medical Assistance in ${location.toUpperCase()}:**\n\n`;
    list.forEach(h => {
      text += `### ${h.name}\n` +
              `• **Address:** ${h.address}\n` +
              `• **Contact:** ${h.contact}\n` +
              `• **Notes:** ${h.notes}\n\n`;
    });
    return text;
  }
  
  if (msg.includes("first aid") || msg.includes("cpr") || msg.includes("bite") || msg.includes("bleeding") || msg.includes("wound") || msg.includes("choking")) {
    if (msg.includes("bite")) {
      return `🩺 **First Aid: SNAKE BITE Instructions (India)**:\n\n` +
             `1. Stay calm and move out of the snake's striking distance.\n` +
             `2. Note the snake's appearance (color, pattern) for medical staff, but DO NOT try to catch it.\n` +
             `3. Keep the bitten limb completely still and positioned at or below the heart.\n` +
             `4. Remove tight clothing, bangles, or rings near the bite before swelling starts.\n` +
             `5. Clean the wound gently with water, and cover with a clean dressing.\n` +
             `⚠️ **CRITICAL WARNING:** DO NOT cut the wound, DO NOT try to suck out the venom, and DO NOT apply ice or tight tourniquets. Go to a hospital with Anti-Snake Venom (ASV) immediately.`;
    }
    if (msg.includes("bleed") || msg.includes("wound") || msg.includes("blood")) {
      return `🩺 **First Aid: HEAVY BLEEDING Instructions**:\n\n` +
             `1. Put on clean gloves if available.\n` +
             `2. Apply direct, firm pressure on the wound with a clean cloth or bandage.\n` +
             `3. Elevate the injured limb above heart level.\n` +
             `4. Do not remove the first bandage if blood seeps through; apply a second layer on top.\n` +
             `5. Seek medical assistance immediately.`;
    }
    return `🩺 **First Aid: CPR Instructions**:\n\n` +
           `1. Ensure the scene is safe, then check responsiveness (tap and shout).\n` +
           `2. If unresponsive and not breathing, call **112 / 108** immediately.\n` +
           `3. Give **30 chest compressions**: Center of the chest, push hard and fast (100-120 compressions per minute).\n` +
           `4. Give **2 rescue breaths** (tilt head back, pinch nose, blow into mouth).\n` +
           `5. Repeat cycles of 30 compressions and 2 breaths until medical help arrives.`;
  }
  
  if (msg.includes("checklist") || msg.includes("supply") || msg.includes("supplies") || msg.includes("pack") || msg.includes("prepare")) {
    if (disasterType === "flood") {
      return `📦 **Emergency Checklist (Floods):**\n\n` +
             `⬜ Clean drinking water (min 3 liters per person per day)\n` +
             `⬜ Non-perishable food (biscuits, dates, chana, dry snacks)\n` +
             `⬜ Waterproof flashlight with extra batteries\n` +
             `⬜ First aid kit and personal prescription medications\n` +
             `⬜ Whistle to signal for help\n` +
             `⬜ Aadhaar card, bank documents, and deeds in a sealed plastic ziploc bag`;
    }
    return `📦 **Emergency Checklist (Cyclones):**\n\n` +
           `⬜ Fully charged phone power bank\n` +
           `⬜ Heavy-duty flashlight/lantern with spare batteries\n` +
           `⬜ Battery-powered AM/FM radio for emergency warnings\n` +
           `⬜ First aid kit & medications\n` +
           `⬜ 3-day supply of dry food and bottled water\n` +
           `⬜ Warm clothes, sturdy shoes, and cash (ATMs may fail)`;
  }
  
  return `Hello! I am LifeBridge AI, your emergency disaster assistant.\n\n` +
         `I can help you with shelters, road safety, first aid steps, or checklists for **${location.toUpperCase()}**.\n\n` +
         `What would you like to check?`;
};

const MARKERS_DATA = {
  mumbai_flood: [
    { id: 1, type: "shelter", name: "St. Xavier's School Hall", desc: "Open, capacity 150/200. Food, water, and first aid.", x: 25, y: 80 },
    { id: 2, type: "shelter", name: "Dharavi Community Center", desc: "Open, capacity 80/300. Medical camp active.", x: 45, y: 60 },
    { id: 3, type: "shelter", name: "Andheri Sports Complex", desc: "FULL. Capacity 500/500.", x: 35, y: 25 },
    { id: 4, type: "road", name: "EE Highway (Kurla)", desc: "HAZARDOUS. Severe waterlogging. Traffic halted.", x: 65, y: 55 },
    { id: 5, type: "medical", name: "KEM Hospital Camp", desc: "Open. Trauma unit operational, emergency triage active.", x: 35, y: 70 },
    { id: 100, type: "sos", name: "ACTIVE DISTRESS: BKC Metro Site", desc: "Emergency beacon signal reported. Rescue dispatch coordinates locked.", x: 50, y: 50 }
  ],
  chennai_flood: [
    { id: 1, type: "shelter", name: "Nehru Indoor Stadium", desc: "Open, 450/1500 capacity. Cots, hot meals, medical ward.", x: 40, y: 30 },
    { id: 2, type: "shelter", name: "Tambaram Community Hall", desc: "Open, 150/200 capacity.", x: 60, y: 55 },
    { id: 3, type: "road", name: "Tambaram Subway Underpass", desc: "CLOSED. Heavy water accumulation.", x: 55, y: 70 },
    { id: 4, type: "medical", name: "RG General Hospital camp", desc: "Open. Mobile medical vans operating.", x: 32, y: 68 },
    { id: 5, type: "sos", name: "SOS Stranded Group", desc: "Stranded on rooftop near Velachery. Rescue requested.", x: 42, y: 32 }
  ],
  assam_flood: [
    { id: 1, type: "shelter", name: "Guwahati University Hall", desc: "Open, 120/500 capacity. High ground relief camp.", x: 35, y: 40 },
    { id: 2, type: "shelter", name: "Dispur Relief Camp", desc: "FULL. Capacity 300/300.", x: 72, y: 55 },
    { id: 3, type: "road", name: "GS Road Landslide Spot", desc: "CLOSED. Landslide blocking both lanes.", x: 55, y: 48 },
    { id: 4, type: "medical", name: "Gauhati Medical College", desc: "Open. Flood-injury specialty active.", x: 32, y: 68 },
    { id: 5, type: "sos", name: "Village SOS Beacon", desc: "Kaziranga periphery village flooded. Food supplies requested.", x: 42, y: 32 }
  ],
  odisha_cyclone: [
    { id: 1, type: "shelter", name: "Cyclone Shelter - Puri Beach", desc: "Open, 600/1000 capacity. Rations, water purifiers.", x: 30, y: 65 },
    { id: 2, type: "road", name: "NH-316 (Puri Road)", desc: "CLOSED. Blocked by uprooted trees.", x: 50, y: 85 }
  ]
};

const STATS_DATA = {
  mumbai_flood: { threat: "SEVERE", shelters: "2 Active", roads: "1 Blocked", resources: "12", locationName: "mumbai", typeName: "flood", title: "Mumbai Monsoons (Flood)" },
  chennai_flood: { threat: "CRITICAL", shelters: "2 Active", roads: "1 Blocked", resources: "18", locationName: "chennai", typeName: "flood", title: "Chennai Floods (Monsoon)" },
  assam_flood: { threat: "EXTREME", shelters: "1 Active", roads: "1 Blocked", resources: "15", locationName: "guwahati", typeName: "flood", title: "Assam Brahmaputra Floods" },
  odisha_cyclone: { threat: "EXTREME", shelters: "1 Active", roads: "1 Blocked", resources: "24", locationName: "puri", typeName: "cyclone", title: "Odisha Coast Cyclone 'Dana'" }
};

function App() {
  const [disasterMode, setDisasterMode] = useState("mumbai_flood");
  const [lowBandwidth, setLowBandwidth] = useState(false);
  const [mapFilter, setMapFilter] = useState("all");
  const [inputMessage, setInputMessage] = useState("");
  const [sosModalOpen, setSosModalOpen] = useState(false);
  const [sosCoords, setSosCoords] = useState("");
  const [sosContact, setSosContact] = useState("");
  const [isSending, setIsSending] = useState(false);
  
  // Navigation Tabs State
  const [currentTab, setCurrentTab] = useState("dashboard"); // dashboard, map, agent, shelters, volunteer, supply_hub, safety_registry

  // Search States
  const [shelterSearch, setShelterSearch] = useState("");

  // Language state (Default to English)
  const [lang, setLang] = useState("en");

  const t = (key) => {
    return TRANSLATIONS[lang]?.[key] || TRANSLATIONS['en']?.[key] || key;
  };

  // Volunteer Tasks State
  const [volunteerTasks, setVolunteerTasks] = useState([
    { id: 1, title: "Relief Food Bag Packaging", location: "Dadar Hall, Mumbai", urgent: true, signedUp: 6, capacity: 10, userRegistered: false },
    { id: 2, title: "Drinking Water Distribution", location: "Kurla East Relief Hub, Mumbai", urgent: true, signedUp: 11, capacity: 15, userRegistered: false },
    { id: 3, title: "Medical Camp Triage Support", location: "Nehru Stadium, Chennai", urgent: false, signedUp: 2, capacity: 5, userRegistered: false },
    { id: 4, title: "Assam Flood Rescue Boat Support", location: "Jalukbari Outpost, Guwahati", urgent: true, signedUp: 5, capacity: 8, userRegistered: false },
    { id: 5, title: "Cyclone Shelter Rations Loading", location: "Sea Drive Shelter, Puri", urgent: false, signedUp: 4, capacity: 10, userRegistered: false }
  ]);

  // Safety Registry States
  const [safetyRegistry, setSafetyRegistry] = useState([
    { id: 1, name: "Aarav Mehta", phone: "9876543210", status: "Safe", location: "Dadar West, Mumbai", details: "Staying at relative's home. Safe and sound.", timestamp: "10 mins ago" },
    { id: 2, name: "Priya Sharma", phone: "8123456789", status: "Stranded", location: "Kurla East, Mumbai", details: "Water entered ground floor. Moved to first floor. Need water & battery.", timestamp: "2 mins ago" },
    { id: 3, name: "Rohan Patel", phone: "9012345678", status: "Safe", location: "Andheri East, Mumbai", details: "Relocated to Andheri Sports Complex shelter.", timestamp: "1 hour ago" },
    { id: 4, name: "Ananya Das", phone: "9988776655", status: "Stranded", location: "Velachery, Chennai", details: "Power cut, heavy water logging outside. Staying on 2nd floor.", timestamp: "30 mins ago" }
  ]);

  const [registrySearch, setRegistrySearch] = useState("");
  const [regName, setRegName] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regLocation, setRegLocation] = useState("");
  const [regStatus, setRegStatus] = useState("Safe");
  const [regDetails, setRegDetails] = useState("");
  const [registryMessage, setRegistryMessage] = useState("");

  // Supply Matching Hub States
  const [supplyRequests, setSupplyRequests] = useState([
    { id: 1, item: "Drinking Water", qty: 50, unit: "bottles", location: "Kurla East Relief Hub", contact: "Rajesh Kumar (9823456789)", matched: true, offerId: 101 },
    { id: 2, item: "Dry Food Packets", qty: 100, unit: "packets", location: "Dharavi Community Center", contact: "Suresh Patil (9811122233)", matched: true, offerId: 102 },
    { id: 3, item: "First Aid Kits", qty: 15, unit: "kits", location: "Andheri Sports Complex", contact: "Dr. Anjali Sen (9000011111)", matched: false, offerId: null },
    { id: 4, item: "Blankets", qty: 30, unit: "pcs", location: "Tambaram Community Hall", contact: "M. K. Stalin (9444012345)", matched: false, offerId: null },
    { id: 5, item: "Drinking Water", qty: 200, unit: "bottles", location: "Sion Relief Camp", contact: "K. R. Nair (9819999999)", matched: false, offerId: null }
  ]);

  const [supplyOffers, setSupplyOffers] = useState([
    { id: 101, item: "Drinking Water", qty: 100, unit: "bottles", location: "Kurla East Relief Hub", donor: "Tata Trust Volunteer Wing", contact: "Arjun (9920111111)", matched: true, requestId: 1 },
    { id: 102, item: "Dry Food Packets", qty: 150, unit: "packets", location: "Dharavi Community Center", donor: "Rotary Club Mumbai", contact: "Nikhil (9820555555)", matched: true, requestId: 2 },
    { id: 103, item: "Blankets", qty: 50, unit: "pcs", location: "Dadar West", donor: "Bandra Citizens Group", contact: "Sarah (9820098200)", matched: false, requestId: null },
    { id: 104, item: "First Aid Kits", qty: 20, unit: "kits", location: "Andheri Sports Complex", donor: "Red Cross Local Branch", contact: "Dev (9819998888)", matched: false, requestId: null }
  ]);

  const [reqItem, setReqItem] = useState("Drinking Water");
  const [reqQty, setReqQty] = useState(10);
  const [reqUnit, setReqUnit] = useState("bottles");
  const [reqLocation, setReqLocation] = useState("");
  const [reqContact, setReqContact] = useState("");

  const [offItem, setOffItem] = useState("Drinking Water");
  const [offQty, setOffQty] = useState(10);
  const [offUnit, setOffUnit] = useState("bottles");
  const [offLocation, setOffLocation] = useState("");
  const [offDonor, setOffDonor] = useState("");
  const [offContact, setOffContact] = useState("");

  const [supplyTab, setSupplyTab] = useState("all"); // all, requests, offers, matches
  const [matchedCount, setMatchedCount] = useState(2);

  // Map drag and zoom state
  const [zoom, setZoom] = useState(1.1);
  const [pan, setPan] = useState({ x: -20, y: -20 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Dynamic Markers state
  const [dynamicMarkers, setDynamicMarkers] = useState(MARKERS_DATA);

  const [messages, setMessages] = useState([
    {
      role: 'agent',
      text: "Hello! I am LifeBridge AI, your emergency coordination assistant. I have loaded real-time details for the **Mumbai Monsoons (Flood)** incident.\n\nHow can I assist you right now? Ask about:\n• Active shelter availability\n• Current road blockages or safe detours\n• Urgent first aid instructions",
      timestamp: "Just Now"
    }
  ]);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const currentStats = STATS_DATA[disasterMode];
  const currentMarkers = dynamicMarkers[disasterMode] || [];

  // Update welcome message when disaster mode changes
  useEffect(() => {
    setMessages([
      {
        role: 'agent',
        text: `Hello! I am LifeBridge AI, your emergency coordination assistant. I have loaded real-time details for the **${currentStats.title}** incident.\n\nHow can I assist you right now? Ask about:\n• Active shelter availability\n• Current road blockages or safe detours\n• Urgent first aid instructions`,
        timestamp: "Just Now"
      }
    ]);
  }, [disasterMode]);

  // Auto-switch language based on selected active disaster zone
  useEffect(() => {
    let suggestedLang = 'en';
    if (disasterMode === 'mumbai_flood') {
      suggestedLang = 'mr'; // मराठी
    } else if (disasterMode === 'chennai_flood') {
      suggestedLang = 'ta'; // தமிழ்
    } else if (disasterMode === 'assam_flood') {
      suggestedLang = 'as'; // অসমীয়া
    } else if (disasterMode === 'odisha_cyclone') {
      suggestedLang = 'or'; // ଓଡ଼ିଆ
    }
    setLang(suggestedLang);
  }, [disasterMode]);

  const handleSendMessage = async (customText = "") => {
    const textToSend = customText || inputMessage;
    if (!textToSend.trim()) return;

    // Switch to agent tab if we query the agent from another screen to see full chat
    if (currentTab !== "dashboard" && currentTab !== "agent") {
      setCurrentTab("agent");
    }

    // Add user message
    const userMsg = {
      role: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, userMsg]);
    setInputMessage("");
    setIsSending(true);

    // Call API
    try {
      const response = await fetch('http://127.0.0.1:8080/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: textToSend,
          location: currentStats.locationName,
          disaster_type: currentStats.typeName
        })
      });

      if (response.ok) {
        const data = await response.json();
        setMessages(prev => [...prev, {
          role: 'agent',
          text: data.response,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }]);
      } else {
        throw new Error("HTTP error");
      }
    } catch (e) {
      // Fallback local response
      console.log("Failed to fetch from server, calling local mock generator...", e);
      const localResponseText = clientMockResponse(textToSend, currentStats.locationName, currentStats.typeName);
      
      // Simulate typing delay
      setTimeout(() => {
        setMessages(prev => [...prev, {
          role: 'agent',
          text: localResponseText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }]);
      }, 600);
    } finally {
      setIsSending(false);
    }
  };

  const handleSOSConfirm = () => {
    if (!sosCoords || !sosContact) return;
    setSosModalOpen(false);
    handleSendMessage(`SOS ALERT: Stranded at ${sosCoords}. Contact: ${sosContact}. Please dispatch rescue immediately.`);
    
    // Dynamically insert an SOS marker to the map
    const newMarkerId = Date.now();
    const newMarker = {
      id: newMarkerId,
      type: "sos",
      name: `SOS: Stranded Citizen`,
      desc: `Stranded at ${sosCoords}. Contact: ${sosContact}. Rescue active.`,
      x: 35 + Math.random() * 30,
      y: 40 + Math.random() * 30
    };
    setDynamicMarkers(prev => ({
      ...prev,
      [disasterMode]: [...(prev[disasterMode] || []), newMarker]
    }));

    setSosCoords("");
    setSosContact("");
  };

  const handleVolunteerSignup = (taskId) => {
    setVolunteerTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        const isRegistered = !t.userRegistered;
        return {
          ...t,
          userRegistered: isRegistered,
          signedUp: isRegistered ? t.signedUp + 1 : t.signedUp - 1
        };
      }
      return t;
    }));
  };

  // Safety Registry Handlers
  const handleRegisterStatus = (e) => {
    e.preventDefault();
    if (!regName.trim() || !regPhone.trim() || !regLocation.trim()) {
      setRegistryMessage("❌ " + (lang === 'hi' ? 'कृपया सभी फ़ील्ड भरें।' : 'Please fill in all required fields.'));
      return;
    }

    const newId = Date.now();
    const newEntry = {
      id: newId,
      name: regName.trim(),
      phone: regPhone.trim(),
      status: regStatus,
      location: regLocation.trim(),
      details: regDetails.trim() || "No further details provided.",
      timestamp: "Just Now"
    };

    setSafetyRegistry(prev => [newEntry, ...prev]);

    // If stranded, add a marker on the map automatically!
    if (regStatus === "Stranded") {
      const newMarker = {
        id: newId,
        type: "sos",
        name: `Stranded: ${regName}`,
        desc: `${regDetails || "Rescue requested."} Location: ${regLocation}. Contact: ${regPhone}`,
        x: 30 + Math.random() * 40,
        y: 35 + Math.random() * 40
      };
      setDynamicMarkers(prev => ({
        ...prev,
        [disasterMode]: [...(prev[disasterMode] || []), newMarker]
      }));
    }

    setRegistryMessage(lang === 'hi' ? '🟢 सुरक्षा स्थिति सफलतापूर्वक दर्ज हो गई है!' : "🟢 Status successfully registered in the Indian Civil Registry!");
    setRegName("");
    setRegPhone("");
    setRegLocation("");
    setRegDetails("");
    
    // Clear message after 4s
    setTimeout(() => setRegistryMessage(""), 4000);
  };

  // Mask Phone for privacy: e.g. 9876543210 -> 98765*****
  const maskPhone = (phone) => {
    if (!phone) return "";
    if (phone.length <= 5) return phone;
    return phone.substring(0, 5) + "*****";
  };

  const filteredRegistry = safetyRegistry.filter(entry => 
    entry.name.toLowerCase().includes(registrySearch.toLowerCase()) ||
    entry.phone.includes(registrySearch) ||
    entry.location.toLowerCase().includes(registrySearch.toLowerCase())
  );

  // Supply Matching Handlers
  const handleAddRequest = (e) => {
    e.preventDefault();
    if (!reqLocation.trim() || !reqContact.trim() || reqQty <= 0) return;

    const newReqId = Date.now();
    const newReq = {
      id: newReqId,
      item: reqItem,
      qty: reqQty,
      unit: reqUnit,
      location: reqLocation.trim(),
      contact: reqContact.trim(),
      matched: false,
      offerId: null
    };

    // Auto-matching logic
    const matchingOffer = supplyOffers.find(off => 
      !off.matched && 
      off.item.toLowerCase() === reqItem.toLowerCase() && 
      off.location.toLowerCase().replace(/\s+/g, '').includes(reqLocation.trim().toLowerCase().replace(/\s+/g, ''))
    );

    if (matchingOffer) {
      newReq.matched = true;
      newReq.offerId = matchingOffer.id;
      
      // Update matching offer status
      setSupplyOffers(prev => prev.map(off => 
        off.id === matchingOffer.id ? { ...off, matched: true, requestId: newReqId } : off
      ));
      
      setMatchedCount(prev => prev + 1);
    }

    setSupplyRequests(prev => [newReq, ...prev]);
    setReqLocation("");
    setReqContact("");
  };

  const handleAddOffer = (e) => {
    e.preventDefault();
    if (!offLocation.trim() || !offDonor.trim() || !offContact.trim() || offQty <= 0) return;

    const newOffId = Date.now();
    const newOff = {
      id: newOffId,
      item: offItem,
      qty: offQty,
      unit: offUnit,
      location: offLocation.trim(),
      donor: offDonor.trim(),
      contact: offContact.trim(),
      matched: false,
      requestId: null
    };

    // Auto-matching logic
    const matchingReq = supplyRequests.find(req => 
      !req.matched && 
      req.item.toLowerCase() === offItem.toLowerCase() && 
      req.location.toLowerCase().replace(/\s+/g, '').includes(offLocation.trim().toLowerCase().replace(/\s+/g, ''))
    );

    if (matchingReq) {
      newOff.matched = true;
      newOff.requestId = matchingReq.id;
      
      // Update matching request status
      setSupplyRequests(prev => prev.map(req => 
        req.id === matchingReq.id ? { ...req, matched: true, offerId: newOffId } : req
      ));

      setMatchedCount(prev => prev + 1);
    }

    setSupplyOffers(prev => [newOff, ...prev]);
    setOffLocation("");
    setOffDonor("");
    setOffContact("");
  };

  const handleMarkDelivered = (reqId, offId) => {
    // Delete them or mark them completed
    setSupplyRequests(prev => prev.filter(req => req.id !== reqId));
    setSupplyOffers(prev => prev.filter(off => off.id !== offId));
    setMatchedCount(prev => Math.max(0, prev - 1));
  };

  // Map drag event handlers
  const handleMouseDown = (e) => {
    if (e.button !== 0) return; // only left click
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleZoomIn = () => setZoom(z => Math.min(z + 0.25, 3));
  const handleZoomOut = () => setZoom(z => Math.max(z - 0.25, 0.75));
  const handleResetZoom = () => { setZoom(1.1); setPan({ x: -20, y: -20 }); };

  // Copy offline kit to clipboard
  const generateOfflineKitText = () => {
    const list = sheltersData[currentStats.locationName] || [];
    let shelterText = "";
    list.forEach(s => {
      shelterText += `- ${s.name}: ${s.address}. (Capacity: ${s.capacity}, Phone: ${s.phone})\n`;
    });

    const road = LOCAL_ROADS[currentStats.locationName];
    const roadText = road ? `${road.route}: ${road.status} due to ${road.reason}. Alternative Detour: ${road.alternative}` : "No road status recorded.";

    return `========================================\n` +
           `LIFEBRIDGE AI OFFLINE EMERGENCY CRISIS KIT\n` +
           `Selected City: ${currentStats.locationName.toUpperCase()} | Generated Local Time\n` +
           `========================================\n\n` +
           `1. EMERGENCY SERVICES DIRECTORIES (INDIA):\n` +
           `- National Emergency Line: 112\n` +
           `- Police response: 100\n` +
           `- Disaster Management Force (NDRF): 1078\n` +
           `- Ambulance medical: 108 / 102\n` +
           `- Fire service control: 101\n\n` +
           `2. ACTIVE EMERGENCY SHELTERS:\n` +
           `${shelterText || "No active shelters recorded in database."}\n` +
           `3. LOCAL ROAD CONDITIONS:\n` +
           `${roadText}\n\n` +
           `4. CRITICAL FIRST AID PROTOCOLS:\n\n` +
           `[SNAKE BITE FIRST AID]\n` +
           `- Keep the bitten limb completely still, positioned below the heart level.\n` +
           `- Remove tight rings/clothing before swelling starts.\n` +
           `- Wash bite site gently with clean water and cover.\n` +
           `- CRITICAL: DO NOT cut the wound, try to suck out venom, or tie tight strings. Seek ASV antidote at nearest public hospital.\n\n` +
           `[HEAVY BLEEDING]\n` +
           `- Apply direct pressure on wound using a clean cloth/dressing.\n` +
           `- Elevate the limb above heart level.\n` +
           `- Do not remove saturated layers; apply new bandages directly on top.\n\n` +
           `[CPR PROTOCOL]\n` +
           `- Check response. If unconscious, call 112 / 108 immediately.\n` +
           `- Deliver 30 fast, deep compressions in center of chest, then 2 rescue breaths.\n` +
           `- Repeat compressions (100-120/min) continuously.\n\n` +
           `========================================\n` +
           `Keep phone in battery-saving mode. Conserve water.`;
  };

  const handleCopyOfflineKit = () => {
    const text = generateOfflineKitText();
    navigator.clipboard.writeText(text);
    alert(lang === 'hi' ? "🟢 ऑफ़लाइन सुरक्षा जानकारी कॉपी हो गई है! अब आप इसे बिना इंटरनेट के एसएमएस या व्हाट्सएप पर भेज सकते हैं।" : "🟢 Offline Crisis Survival Kit copied to clipboard! You can now send this via SMS, WhatsApp, or keep it in a text note.");
  };

  const handleDownloadOfflineKit = () => {
    const text = generateOfflineKitText();
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `LifeBridge_Offline_Kit_${currentStats.locationName}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const filteredMarkers = currentMarkers.filter(m => {
    if (mapFilter === "all") return true;
    return m.type === mapFilter;
  });

  const getDisasterHeaderInfo = () => {
    switch (disasterMode) {
      case "chennai_flood":
        return "CHENNAI FLOODS : 82°F | Extreme Rain/Waterlogging Risk";
      case "assam_flood":
        return "ASSAM BRAHMAPUTRA FLOOD : 75°F | River Overflowing, Wildlife Embankment alert";
      case "odisha_cyclone":
        return "ODISHA CYCLONE STATUS : 80°F | Wind 120kmph, Rain, Storm Surge alert";
      case "mumbai_flood":
      default:
        return "MUMBAI MONSOONS : 78°F | Heavy Rain, Coastal High Tide warning";
    }
  };

  const formatText = (text) => {
    return text.split('\n').map((line, index) => {
      let content = line;
      let isHeading = false;
      let headingLevel = 3;

      if (content.startsWith('### ')) {
        content = content.replace('### ', '');
        isHeading = true;
        headingLevel = 3;
      } else if (content.startsWith('## ')) {
        content = content.replace('## ', '');
        isHeading = true;
        headingLevel = 2;
      } else if (content.startsWith('# ')) {
        content = content.replace('# ', '');
        isHeading = true;
        headingLevel = 1;
      }

      content = content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      let isBullet = false;
      if (content.startsWith('• ') || content.startsWith('* ')) {
        content = content.substring(2);
        isBullet = true;
      }

      if (isHeading) {
        const Tag = `h${headingLevel}`;
        return <Tag key={index} dangerouslySetInnerHTML={{ __html: content }} />;
      }
      if (isBullet) {
        return <li key={index} dangerouslySetInnerHTML={{ __html: content }} style={{marginLeft: '15px'}} />;
      }
      return <p key={index} dangerouslySetInnerHTML={{ __html: content }} style={{margin: '4px 0'}} />;
    });
  };

  // Group all shelters for Shelters view
  const allSheltersList = Object.entries(sheltersData).flatMap(([city, list]) => 
    list.map(s => ({ ...s, city }))
  );

  const searchedShelters = allSheltersList.filter(s => 
    s.name.toLowerCase().includes(shelterSearch.toLowerCase()) ||
    s.city.toLowerCase().includes(shelterSearch.toLowerCase()) ||
    s.address.toLowerCase().includes(shelterSearch.toLowerCase())
  );

  // High Tide Data for Current Zone
  const currentZoneTides = HIGH_TIDES[currentStats.locationName] || [];

  return (
    <div className="app-container">
      {/* Header */}
      <header className="header">
        <div className="logo-section">
          <div className="logo-icon">
            <ShieldAlert size={20} color="#ffffff" className="pulse-sos" />
          </div>
          <span className="logo-text">LifeBridge AI</span>
          <span className="logo-badge agent-system">INDIA CRISIS NETWORK</span>
          <span className="logo-badge">LIVE COORDS ACTIVE</span>
        </div>

        <div className="header-status-ticker">
          <div className="ticker-dot pulse-online"></div>
          <span>{getDisasterHeaderInfo()}</span>
        </div>

        <div className="header-controls">
          {/* Language Selector Dropdown */}
          <div className="dropdown-container">
            <span className="dropdown-label" style={{ color: 'var(--accent-purple)' }}>Language / भाषा</span>
            <select 
              className="dropdown-select" 
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              style={{ borderColor: 'var(--accent-purple)' }}
            >
              <option value="en">English</option>
              <option value="hi">हिंदी (Hindi)</option>
              <option value="mr">मराठी (Marathi)</option>
              <option value="ta">தமிழ் (Tamil)</option>
              <option value="bn">বাংলা (Bengali)</option>
              <option value="as">অસમীয়া (Assamese)</option>
              <option value="or">ଓଡ଼ିଆ (Odia)</option>
              <option value="te">తెలుగు (Telugu)</option>
              <option value="gu">ગુજરાતી (Gujarati)</option>
              <option value="kn">ಕನ್ನಡ (Kannada)</option>
              <option value="ml">മലയാളം (Malayalam)</option>
            </select>
          </div>

          <div className="dropdown-container">
            <span className="dropdown-label">{t('zoneMap')}</span>
            <select 
              className="dropdown-select" 
              value={disasterMode}
              onChange={(e) => setDisasterMode(e.target.value)}
            >
              <option value="mumbai_flood">Mumbai (Monsoon Flood)</option>
              <option value="chennai_flood">Chennai (Floods)</option>
              <option value="assam_flood">Guwahati (Assam Flood)</option>
              <option value="odisha_cyclone">Odisha Coast (Cyclone)</option>
            </select>
          </div>

          <div className="toggle-container">
            <Sliders size={14} style={{ color: 'var(--accent-purple)' }} />
            <span>{t('lowBandwidth')}</span>
            <label className="switch">
              <input 
                type="checkbox" 
                checked={lowBandwidth}
                onChange={(e) => setLowBandwidth(e.target.checked)}
              />
              <span className="slider"></span>
            </label>
          </div>
        </div>
      </header>

      {/* Main Workspace */}
      <div className="workspace">
        {/* Sidebar */}
        <aside className="sidebar">
          <div className="sidebar-nav">
            <div className={`nav-item ${currentTab === "dashboard" ? "active" : ""}`} onClick={() => setCurrentTab("dashboard")}>
              <Compass className="nav-item-icon" />
              <span>{t('dashboard')}</span>
            </div>
            <div className={`nav-item ${currentTab === "map" ? "active" : ""}`} onClick={() => setCurrentTab("map")}>
              <Radio className="nav-item-icon" />
              <span>{t('liveMap')}</span>
            </div>
            <div className={`nav-item ${currentTab === "agent" ? "active" : ""}`} onClick={() => setCurrentTab("agent")}>
              <Activity className="nav-item-icon" />
              <span>{t('aiAgent')}</span>
            </div>
            <div className={`nav-item ${currentTab === "shelters" ? "active" : ""}`} onClick={() => setCurrentTab("shelters")}>
              <MapPin className="nav-item-icon" />
              <span>{t('shelters')}</span>
            </div>
            <div className={`nav-item ${currentTab === "supply_hub" ? "active" : ""}`} onClick={() => setCurrentTab("supply_hub")}>
              <CheckSquare className="nav-item-icon" />
              <span>{t('supplyHub')}</span>
              {matchedCount > 0 && <span className="tab-pill success">{matchedCount}</span>}
            </div>
            <div className={`nav-item ${currentTab === "safety_registry" ? "active" : ""}`} onClick={() => setCurrentTab("safety_registry")}>
              <Users className="nav-item-icon" />
              <span>{t('safetyRegistry')}</span>
            </div>
            <div className={`nav-item ${currentTab === "volunteer" ? "active" : ""}`} onClick={() => setCurrentTab("volunteer")}>
              <FileText className="nav-item-icon" />
              <span>{t('volunteer')}</span>
            </div>
          </div>

          <div className="sidebar-footer">
            <button className="btn-sos pulse-sos" onClick={() => setSosModalOpen(true)}>
              <AlertTriangle size={18} />
              <span>{t('triggerSos')}</span>
            </button>
          </div>
        </aside>

        {/* Dashboard Tab Content */}
        {currentTab === "dashboard" && (
          <main className="dashboard-panel">
            {/* Low Bandwidth Warning Banner */}
            {lowBandwidth && (
              <div className="low-bandwidth-banner">
                <AlertOctagon size={20} className="pulse-sos" />
                <div className="banner-content">
                  <strong>{t('lowBandwidth')}:</strong> {t('lowBandwidthWarning')}
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button className="btn-small-action" onClick={handleCopyOfflineKit}><Copy size={12} /> {t('copyKit')}</button>
                  <button className="btn-small-action" onClick={handleDownloadOfflineKit}><Download size={12} /> {t('downloadTxt')}</button>
                </div>
              </div>
            )}

            {/* Stats Grid */}
            <div className="stats-grid">
              <div className="stat-card threat">
                <span className="stat-title">{t('threatLevel')}</span>
                <div className="stat-value danger">{currentStats.threat}</div>
                <span className="stat-desc">Emergency coordination active.</span>
              </div>
              <div className="stat-card shelters">
                <span className="stat-title">{t('sheltersActive')}</span>
                <div className="stat-value success">{currentStats.shelters}</div>
                <span className="stat-desc">Relief centers open in zone.</span>
              </div>
              <div className="stat-card roads">
                <span className="stat-title">{t('roadBlocks')}</span>
                <div className="stat-value warning">{currentStats.roads}</div>
                <span className="stat-desc">Waterlogged / closed routes.</span>
              </div>
              <div className="stat-card resources">
                <span className="stat-title">{t('matchedOffers')}</span>
                <div className="stat-value info">{matchedCount} {t('activeMatches')}</div>
                <span className="stat-desc">Citizen supplies synchronized.</span>
              </div>
            </div>

            {/* User Friendly Quick Start Guide & Quick-Dial Helper Panel */}
            <div className="quick-help-section">
              <div className="quick-start-card">
                <h4 style={{ margin: '0 0 10px 0', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-purple)', fontFamily: 'Space Grotesk', fontWeight: 'bold' }}>
                  <HelpCircle size={18} />
                  <span>{t('howToUse')}</span>
                </h4>
                <div className="quick-steps">
                  <div className="step-item">{t('step1')}</div>
                  <div className="step-item">{t('step2')}</div>
                  <div className="step-item">{t('step3')}</div>
                </div>
              </div>

              <div className="quick-dial-card">
                <h4 style={{ margin: '0 0 10px 0', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-danger)', fontFamily: 'Space Grotesk', fontWeight: 'bold' }}>
                  <PhoneCall size={18} />
                  <span>{t('quickDial')}</span>
                </h4>
                <div className="quick-numbers">
                  <a href="tel:112" className="dial-btn urgent">
                    <span className="dial-label">{t('nationalEmergency')}</span>
                    <span className="dial-val">112</span>
                  </a>
                  <a href="tel:1078" className="dial-btn">
                    <span className="dial-label">{t('ndrfRescue')}</span>
                    <span className="dial-val">1078</span>
                  </a>
                  <a href="tel:100" className="dial-btn">
                    <span className="dial-label">{t('police')}</span>
                    <span className="dial-val">100</span>
                  </a>
                  <a href="tel:108" className="dial-btn">
                    <span className="dial-label">{t('ambulance')}</span>
                    <span className="dial-val">108</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Dynamic Local High Tide / Water Levels Calendar Widget */}
            <div className="high-tide-widget">
              <div className="widget-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <TrendingUp size={18} className="danger" />
                  <h3 style={{ margin: 0, fontFamily: 'Space Grotesk' }}>
                    {currentStats.locationName === 'guwahati' ? t('riverAdvisory') : t('tideAdvisory')}
                  </h3>
                </div>
                <span className="logo-badge">{t('safetyRadar')}</span>
              </div>
              
              <div className="tide-cards-grid">
                {currentZoneTides.map((tide, i) => (
                  <div key={i} className={`tide-card ${tide.hazard.includes('DANGER') ? 'severe' : 'moderate'}`}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span className="tide-date">{tide.date}</span>
                      <span className={`tide-badge ${tide.hazard.includes('DANGER') ? 'severe' : 'moderate'}`}>{tide.hazard}</span>
                    </div>
                    <div className="tide-stats">
                      <div>
                        <span className="tide-label">{t('time')}</span>
                        <div className="tide-val">{tide.time} hrs</div>
                      </div>
                      <div>
                        <span className="tide-label">{t('height')}</span>
                        <div className="tide-val text-glow">{tide.height}</div>
                      </div>
                    </div>
                    <p className="tide-notes"><Info size={12} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />{tide.notes}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Split Dashboard (Map + Chat) */}
            <div className="split-workspace">
              {/* Map Panel with Drag and Zoom */}
              <section className="map-card">
                <div className="map-view-container-header">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Layers size={16} />
                    <span>{t('zoneMap')} ({currentStats.locationName.toUpperCase()})</span>
                  </div>
                  <span className="map-header-status text-glow">● {t('liveBeacon')}</span>
                </div>
                
                <div 
                  className={`map-view-container ${lowBandwidth ? 'low-bandwidth' : ''}`}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                  style={{ overflow: 'hidden', position: 'relative' }}
                >
                  {/* Zoom Controls */}
                  <div className="map-zoom-controls">
                    <button className="zoom-btn" onClick={handleZoomIn} title="Zoom In">+</button>
                    
                    {/* Vertical Zoom Slider */}
                    <div className="zoom-slider-container">
                      <input 
                        type="range" 
                        min="0.75" 
                        max="3.0" 
                        step="0.1" 
                        value={zoom}
                        onChange={(e) => setZoom(parseFloat(e.target.value))}
                        className="zoom-slider"
                      />
                    </div>

                    <button className="zoom-btn" onClick={handleZoomOut} title="Zoom Out">-</button>
                    <button className="zoom-btn reset" onClick={handleResetZoom} title="Reset Map">Reset</button>
                  </div>

                  {/* Filter Chips inside Map */}
                  <div className="map-overlay-filters-legend">
                    <div className={`legend-item ${mapFilter === 'all' ? 'active' : ''}`} onClick={(e) => { e.stopPropagation(); setMapFilter("all"); }}>
                      <span className="legend-dot grey"></span> {t('allHazards')}
                    </div>
                    <div className={`legend-item ${mapFilter === 'shelter' ? 'active' : ''}`} onClick={(e) => { e.stopPropagation(); setMapFilter("shelter"); }}>
                      <span className="legend-dot green"></span> {t('activeShelters')}
                    </div>
                    <div className={`legend-item ${mapFilter === 'road' ? 'active' : ''}`} onClick={(e) => { e.stopPropagation(); setMapFilter("road"); }}>
                      <span className="legend-dot yellow"></span> {t('roadBlockages')}
                    </div>
                    <div className={`legend-item ${mapFilter === 'medical' ? 'active' : ''}`} onClick={(e) => { e.stopPropagation(); setMapFilter("medical"); }}>
                      <span className="legend-dot blue"></span> {t('medicalHelp')}
                    </div>
                    <div className={`legend-item ${mapFilter === 'sos' ? 'active' : ''}`} onClick={(e) => { e.stopPropagation(); setMapFilter("sos"); }}>
                      <span className="legend-dot red"></span> {t('sosDistresses')}
                    </div>
                  </div>

                  {/* Map Navigation Helper Bar */}
                  <div className="map-nav-helper-bar">
                    <span>{t('mapHelper')}</span>
                  </div>

                  {/* Inner Map Drag Layer */}
                  <div 
                    className="map-transform-wrapper"
                    style={{
                      width: '100%',
                      height: '100%',
                      transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                      transformOrigin: 'center center',
                      transition: isDragging ? 'none' : 'transform 0.15s ease-out',
                      cursor: isDragging ? 'grabbing' : 'grab',
                      position: 'absolute',
                      top: 0,
                      left: 0
                    }}
                  >
                    {/* Background street map layer (hidden in low bandwidth) */}
                    <div className="map-bg-image-layer" style={{
                      backgroundImage: lowBandwidth ? 'none' : "url('/mumbai_street_map.png')",
                      backgroundColor: '#10141e',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      width: '100%',
                      height: '100%',
                      position: 'absolute'
                    }} />

                    {/* SVG paths representing waterways / grid */}
                    <svg className="simulated-map" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0, pointerEvents: 'none' }}>
                      <defs>
                        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="1" />
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#grid)" />
                      <path d="M 0 120 Q 300 220, 450 180 T 800 210" fill="none" stroke="rgba(59, 130, 246, 0.2)" strokeWidth="4" />
                    </svg>

                    {/* Danger Zone Highlights on Map Grid */}
                    {disasterMode === 'mumbai_flood' && (
                      <>
                        <div className="map-danger-zone-circle" style={{ left: '50%', top: '55%', width: '15%', height: '15%' }}>
                          <span className="danger-zone-text">{t('floodZone')}</span>
                        </div>
                        <div className="map-danger-zone-circle" style={{ left: '65%', top: '55%', width: '12%', height: '12%' }}>
                          <span className="danger-zone-text">{t('floodZone')}</span>
                        </div>
                      </>
                    )}
                    {disasterMode === 'chennai_flood' && (
                      <div className="map-danger-zone-circle" style={{ left: '42%', top: '32%', width: '15%', height: '15%' }}>
                        <span className="danger-zone-text">{t('floodZone')}</span>
                      </div>
                    )}
                    {disasterMode === 'assam_flood' && (
                      <div className="map-danger-zone-circle" style={{ left: '55%', top: '48%', width: '16%', height: '16%' }}>
                        <span className="danger-zone-text">{t('floodZone')}</span>
                      </div>
                    )}
                    {disasterMode === 'odisha_cyclone' && (
                      <div className="map-danger-zone-circle" style={{ left: '45%', top: '68%', width: '22%', height: '22%' }}>
                        <span className="danger-zone-text">{t('floodZone')}</span>
                      </div>
                    )}

                    {/* Dynamic Markers */}
                    {filteredMarkers.map(marker => (
                      <div 
                        key={marker.id} 
                        className="map-marker"
                        style={{ left: `${marker.x}%`, top: `${marker.y}%` }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSendMessage(`Tell me details about ${marker.name}`);
                        }}
                      >
                        <div className={`marker-pulse ${marker.type}`}></div>
                        <div className={`marker-icon ${marker.type}`}>
                          {marker.type === 'shelter' && <MapPin size={12} />}
                          {marker.type === 'road' && <AlertTriangle size={12} />}
                          {marker.type === 'medical' && <Activity size={12} />}
                          {marker.type === 'sos' && <ShieldAlert size={12} />}
                        </div>

                        {/* Inline Text Label next to Pin */}
                        <div className={`map-marker-label-container ${marker.type}`}>
                          <span className="marker-label-name">{marker.name}</span>
                          <span className="marker-label-status">
                            {marker.type === 'shelter' && (marker.desc.includes('FULL') ? 'Full' : 'Open')}
                            {marker.type === 'road' && 'Block'}
                            {marker.type === 'medical' && 'Camp'}
                            {marker.type === 'sos' && 'Distress'}
                          </span>
                        </div>
                        
                        {/* Persistent distress popup exactly matching layout */}
                        {marker.type === 'sos' && marker.id === 100 && (
                          <div className="active-distress-popup">
                            <div className="popup-header">
                              <span className="popup-sos-icon">🚨</span>
                              <span className="popup-title">ACTIVE DISTRESS</span>
                            </div>
                            <p className="popup-desc">
                              Emergency beacon signal reported. Rescue dispatch coordinates locked.
                            </p>
                            <div className="popup-arrow"></div>
                          </div>
                        )}

                        <div className="marker-tooltip">
                          <div className="tooltip-title">{marker.name}</div>
                          <div className="tooltip-desc">{marker.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Chat Assistant card */}
              <section className="chat-card">
                <div className="chat-header">
                  <div className="chat-title-group">
                    <div className="chat-dot pulse-online"></div>
                    <span className="chat-title">{t('chatTitle')}</span>
                  </div>
                  <span className="chat-badge">{t('online')}</span>
                </div>

                <div className="chat-messages">
                  {messages.map((msg, i) => (
                    <div key={i} className={`chat-message ${msg.role}`}>
                      <span className="message-meta">
                        {msg.role === 'user' ? 'You' : 'LifeBridge Core Agent'} • {msg.timestamp}
                      </span>
                      <div className="message-bubble chat-md-response">
                        {formatText(msg.text)}
                      </div>
                    </div>
                  ))}
                  {isSending && (
                    <div className="chat-message agent">
                      <span className="message-meta">LifeBridge Agent • Generating...</span>
                      <div className="message-bubble" style={{display: 'flex', gap: '4px'}}>
                        <span className="pulse-online">●</span>
                        <span className="pulse-online" style={{animationDelay: '0.2s'}}>●</span>
                        <span className="pulse-online" style={{animationDelay: '0.4s'}}>●</span>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                <div className="suggestion-container">
                  <div className="suggestion-chips">
                    <div className="suggestion-chip" onClick={() => handleSendMessage("Where is the nearest shelter?")}>
                      Where is the nearest shelter?
                    </div>
                    <div className="suggestion-chip" onClick={() => handleSendMessage("Is the EE Highway safe?")}>
                      Is the EE Highway safe?
                    </div>
                    <div className="suggestion-chip" onClick={() => handleSendMessage("Snake bite first aid")}>
                      Snake bite first aid
                    </div>
                    <div className="suggestion-chip" onClick={() => handleSendMessage("Show me flood checklist")}>
                      Show me flood checklist
                    </div>
                  </div>
                </div>

                <div className="chat-input-area">
                  <input 
                    type="text" 
                    className="chat-input"
                    placeholder={t('chatPlaceholder')}
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleSendMessage();
                    }}
                    disabled={isSending}
                  />
                  <button className="btn-send" onClick={() => handleSendMessage()} disabled={isSending}>
                    <Send size={16} />
                  </button>
                </div>
              </section>
            </div>
          </main>
        )}

        {/* Live Disaster Map full screen view */}
        {currentTab === "map" && (
          <main className="dashboard-panel" style={{height: '100%'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <h2 style={{fontFamily: 'Space Grotesk', margin: 0}}>{t('liveMap')}</h2>
              <span className="logo-badge">LIVE CYCLONE & FLOOD RADAR</span>
            </div>
            
            <div className="map-card" style={{flex: 1, minHeight: '400px'}}>
              <div 
                className={`map-view-container ${lowBandwidth ? 'low-bandwidth' : ''}`}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                style={{ overflow: 'hidden', position: 'relative' }}
              >
                {/* Zoom Controls */}
                <div className="map-zoom-controls">
                  <button className="zoom-btn" onClick={handleZoomIn} title="Zoom In">+</button>
                  
                  {/* Vertical Zoom Slider */}
                  <div className="zoom-slider-container">
                    <input 
                      type="range" 
                      min="0.75" 
                      max="3.0" 
                      step="0.1" 
                      value={zoom}
                      onChange={(e) => setZoom(parseFloat(e.target.value))}
                      className="zoom-slider"
                    />
                  </div>

                  <button className="zoom-btn" onClick={handleZoomOut} title="Zoom Out">-</button>
                  <button className="zoom-btn reset" onClick={handleResetZoom} title="Reset Map">Reset</button>
                </div>

                {/* Legend Filters */}
                <div className="map-overlay-filters-legend">
                  <div className={`legend-item ${mapFilter === 'all' ? 'active' : ''}`} onClick={(e) => { e.stopPropagation(); setMapFilter("all"); }}>
                    <span className="legend-dot grey"></span> {t('allHazards')}
                  </div>
                  <div className={`legend-item ${mapFilter === 'shelter' ? 'active' : ''}`} onClick={(e) => { e.stopPropagation(); setMapFilter("shelter"); }}>
                    <span className="legend-dot green"></span> {t('activeShelters')}
                  </div>
                  <div className={`legend-item ${mapFilter === 'road' ? 'active' : ''}`} onClick={(e) => { e.stopPropagation(); setMapFilter("road"); }}>
                    <span className="legend-dot yellow"></span> {t('roadBlockages')}
                  </div>
                  <div className={`legend-item ${mapFilter === 'medical' ? 'active' : ''}`} onClick={(e) => { e.stopPropagation(); setMapFilter("medical"); }}>
                    <span className="legend-dot blue"></span> {t('medicalHelp')}
                  </div>
                  <div className={`legend-item ${mapFilter === 'sos' ? 'active' : ''}`} onClick={(e) => { e.stopPropagation(); setMapFilter("sos"); }}>
                    <span className="legend-dot red"></span> {t('sosDistresses')}
                  </div>
                </div>

                {/* Map Navigation Helper Bar */}
                <div className="map-nav-helper-bar">
                  <span>{t('mapHelper')}</span>
                </div>

                <div 
                  className="map-transform-wrapper"
                  style={{
                    width: '100%',
                    height: '100%',
                    transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                    transformOrigin: 'center center',
                    transition: isDragging ? 'none' : 'transform 0.15s ease-out',
                    cursor: isDragging ? 'grabbing' : 'grab',
                    position: 'absolute',
                    top: 0,
                    left: 0
                  }}
                >
                  <div className="map-bg-image-layer" style={{
                    backgroundImage: lowBandwidth ? 'none' : "url('/mumbai_street_map.png')",
                    backgroundColor: '#10141e',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    width: '100%',
                    height: '100%',
                    position: 'absolute'
                  }} />

                  <svg className="simulated-map" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0, pointerEvents: 'none' }}>
                    <pattern id="grid-large" width="80" height="80" patternUnits="userSpaceOnUse">
                      <path d="M 80 0 L 0 0 0 80" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                    </pattern>
                    <rect width="100%" height="100%" fill="url(#grid-large)" />
                    
                    {/* Cyclone radar projection overlay line */}
                    {disasterMode === "odisha_cyclone" && (
                      <path d="M 650 450 Q 550 300, 450 180" fill="none" stroke="#ef4444" strokeWidth="2" strokeDasharray="6,4" />
                    )}
                  </svg>

                  {/* Danger Zone Highlights on Map Grid */}
                  {disasterMode === 'mumbai_flood' && (
                    <>
                      <div className="map-danger-zone-circle" style={{ left: '50%', top: '55%', width: '15%', height: '15%' }}>
                        <span className="danger-zone-text">{t('floodZone')}</span>
                      </div>
                      <div className="map-danger-zone-circle" style={{ left: '65%', top: '55%', width: '12%', height: '12%' }}>
                        <span className="danger-zone-text">{t('floodZone')}</span>
                      </div>
                    </>
                  )}
                  {disasterMode === 'chennai_flood' && (
                    <div className="map-danger-zone-circle" style={{ left: '42%', top: '32%', width: '15%', height: '15%' }}>
                      <span className="danger-zone-text">{t('floodZone')}</span>
                    </div>
                  )}
                  {disasterMode === 'assam_flood' && (
                    <div className="map-danger-zone-circle" style={{ left: '55%', top: '48%', width: '16%', height: '16%' }}>
                      <span className="danger-zone-text">{t('floodZone')}</span>
                    </div>
                  )}
                  {disasterMode === 'odisha_cyclone' && (
                    <div className="map-danger-zone-circle" style={{ left: '45%', top: '68%', width: '22%', height: '22%' }}>
                      <span className="danger-zone-text">{t('floodZone')}</span>
                    </div>
                  )}

                  {filteredMarkers.map(marker => (
                    <div 
                      key={marker.id} 
                      className="map-marker"
                      style={{ left: `${marker.x}%`, top: `${marker.y}%` }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSendMessage(`Tell me details about ${marker.name}`);
                      }}
                    >
                      <div className={`marker-pulse ${marker.type}`}></div>
                      <div className={`marker-icon ${marker.type}`}>
                        {marker.type === 'shelter' && <MapPin size={12} />}
                        {marker.type === 'road' && <AlertTriangle size={12} />}
                        {marker.type === 'medical' && <Activity size={12} />}
                        {marker.type === 'sos' && <ShieldAlert size={12} />}
                      </div>

                      {/* Inline Text Label next to Pin */}
                      <div className={`map-marker-label-container ${marker.type}`}>
                        <span className="marker-label-name">{marker.name}</span>
                        <span className="marker-label-status">
                          {marker.type === 'shelter' && (marker.desc.includes('FULL') ? 'Full' : 'Open')}
                          {marker.type === 'road' && 'Block'}
                          {marker.type === 'medical' && 'Camp'}
                          {marker.type === 'sos' && 'Distress'}
                        </span>
                      </div>
                      
                      {marker.type === 'sos' && marker.id === 100 && (
                        <div className="active-distress-popup">
                          <div className="popup-header">
                            <span className="popup-sos-icon">🚨</span>
                            <span className="popup-title">ACTIVE DISTRESS</span>
                          </div>
                          <p className="popup-desc">
                            Emergency beacon signal reported. Rescue dispatch coordinates locked.
                          </p>
                          <div className="popup-arrow"></div>
                        </div>
                      )}

                      <div className="marker-tooltip">
                        <div className="tooltip-title">{marker.name}</div>
                        <div className="tooltip-desc">{marker.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </main>
        )}

        {/* LifeBridge AI Agent Dedicated Full Chat Screen */}
        {currentTab === "agent" && (
          <main className="dashboard-panel" style={{ height: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontFamily: 'Space Grotesk', margin: 0 }}>{t('aiAgent')}</h2>
              <span className="logo-badge success">SECURE PROTOCOL ACTIVE</span>
            </div>
            <div className="chat-card" style={{ flex: 1, maxHeight: 'none' }}>
              <div className="chat-header">
                <div className="chat-title-group">
                  <div className="chat-dot pulse-online"></div>
                  <span className="chat-title">Active Dialogue Terminal</span>
                </div>
                <span className="chat-badge">{t('online')}</span>
              </div>

              <div className="chat-messages" style={{ maxHeight: 'none', flexGrow: 1 }}>
                {messages.map((msg, i) => (
                  <div key={i} className={`chat-message ${msg.role}`} style={{ maxWidth: '75%' }}>
                    <span className="message-meta">
                      {msg.role === 'user' ? 'You' : 'LifeBridge Core Agent'} • {msg.timestamp}
                    </span>
                    <div className="message-bubble chat-md-response">
                      {formatText(msg.text)}
                    </div>
                  </div>
                ))}
                {isSending && (
                  <div className="chat-message agent">
                    <span className="message-meta">LifeBridge Agent • Generating...</span>
                    <div className="message-bubble" style={{display: 'flex', gap: '4px'}}>
                      <span className="pulse-online">●</span>
                      <span className="pulse-online" style={{animationDelay: '0.2s'}}>●</span>
                      <span className="pulse-online" style={{animationDelay: '0.4s'}}>●</span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <div className="suggestion-container">
                <div className="suggestion-chips">
                  <button className="suggestion-chip" onClick={() => handleSendMessage("Show helpline directory")}>Helpline Directory</button>
                  <button className="suggestion-chip" onClick={() => handleSendMessage("Guwahati shelters")}>Guwahati shelters</button>
                  <button className="suggestion-chip" onClick={() => handleSendMessage("Snake bite first aid guidance")}>Snake bite guide</button>
                  <button className="suggestion-chip" onClick={() => handleSendMessage("Is Puri highway safe?")}>NH-316 Puri Highway</button>
                </div>
              </div>

              <div className="chat-input-area">
                <input 
                  type="text" 
                  className="chat-input"
                  placeholder={t('chatPlaceholder')}
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSendMessage();
                  }}
                  disabled={isSending}
                />
                <button className="btn-send" onClick={() => handleSendMessage()} disabled={isSending}>
                  <Send size={16} />
                </button>
              </div>
            </div>
          </main>
        )}

        {/* Shelters & Roads list */}
        {currentTab === "shelters" && (
          <main className="dashboard-panel">
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px'}}>
              <h2 style={{fontFamily: 'Space Grotesk', margin: 0}}>{t('shelters')}</h2>
              <div style={{position: 'relative', display: 'flex', alignItems: 'center'}}>
                <Search size={16} style={{position: 'absolute', left: '10px', color: 'var(--text-muted)'}} />
                <input 
                  type="text" 
                  className="chat-input"
                  style={{paddingLeft: '32px', width: '220px'}}
                  placeholder="Search city, shelter name..."
                  value={shelterSearch}
                  onChange={(e) => setShelterSearch(e.target.value)}
                />
              </div>
            </div>

            <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px'}}>
              {/* Shelters List */}
              <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
                <h3 style={{fontFamily: 'Space Grotesk', margin: '10px 0'}}>{t('activeShelters')}</h3>
                
                {searchedShelters.length === 0 ? (
                  <div style={{padding: '20px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '8px', color: 'var(--text-muted)'}}>
                    No shelters match your search query.
                  </div>
                ) : searchedShelters.map((s, idx) => (
                  <div key={idx} style={{background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
                    <div>
                      <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                        <span style={{background: 'var(--bg-tertiary)', fontSize: '0.7rem', padding: '2px 8px', borderRadius: '4px', textTransform: 'uppercase', color: 'var(--accent-purple)', fontWeight: 'bold'}}>{s.city}</span>
                        <span style={{fontSize: '0.8rem', color: s.status === 'Open' ? 'var(--color-success)' : 'var(--color-danger)', fontWeight: 'bold'}}>{s.status === 'Open' ? '● Open' : '● Full'}</span>
                      </div>
                      <h4 style={{margin: '8px 0 4px 0', fontFamily: 'Space Grotesk'}}>{s.name}</h4>
                      <p style={{fontSize: '0.8rem', color: 'var(--text-secondary)', margin: '0 0 8px 0'}}>{s.address}</p>
                      <p style={{fontSize: '0.8rem', color: 'var(--text-muted)', margin: '0'}}>Helpline: **{s.phone}**</p>
                      <div style={{display: 'flex', gap: '6px', marginTop: '10px'}}>
                        {s.resources.map((r, i) => (
                          <span key={i} style={{fontSize: '0.65rem', background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', padding: '2px 6px', borderRadius: '4px', color: 'var(--text-secondary)'}}>{r}</span>
                        ))}
                      </div>
                    </div>
                    <div style={{textAlign: 'right', fontSize: '0.8rem'}}>
                      <div style={{color: 'var(--text-muted)'}}>Occupancy</div>
                      <div style={{fontWeight: 'bold', fontSize: '1rem', color: s.status === 'Open' ? 'var(--text-primary)' : 'var(--color-danger)'}}>{s.capacity}</div>
                      <button 
                        className="btn-send" 
                        style={{marginTop: '12px', width: 'auto', padding: '0 12px', fontSize: '0.75rem', height: '30px'}}
                        onClick={() => handleSendMessage(`Query details of shelter ${s.name} in ${s.city}`)}
                      >
                        Request Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Road Closures */}
              <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
                <h3 style={{fontFamily: 'Space Grotesk', margin: '10px 0'}}>{t('roadBlockages')}</h3>
                
                {Object.entries(LOCAL_ROADS).map(([city, r], i) => (
                  <div key={i} style={{background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '16px'}}>
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                      <span style={{background: 'var(--bg-tertiary)', fontSize: '0.7rem', padding: '2px 8px', borderRadius: '4px', textTransform: 'uppercase', color: 'var(--accent-purple)', fontWeight: 'bold'}}>{city}</span>
                      <span style={{fontSize: '0.8rem', color: r.status === 'Closed' ? 'var(--color-danger)' : 'var(--color-warning)', fontWeight: 'bold', textTransform: 'uppercase'}}>{r.status}</span>
                    </div>
                    <h4 style={{margin: '8px 0 4px 0', fontFamily: 'Space Grotesk'}}>{r.route}</h4>
                    <p style={{fontSize: '0.8rem', color: 'var(--text-secondary)', margin: '4px 0'}}><strong style={{color: 'var(--text-primary)'}}>Hazard:</strong> {r.reason}</p>
                    <p style={{fontSize: '0.8rem', color: 'var(--color-success)', margin: '4px 0'}}><strong style={{color: 'var(--text-primary)'}}>Recommended Detour:</strong> {r.alternative}</p>
                  </div>
                ))}
              </div>
            </div>
          </main>
        )}

        {/* Safety Registry View */}
        {currentTab === "safety_registry" && (
          <main className="dashboard-panel">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontFamily: 'Space Grotesk', margin: 0 }}>{t('registryTitle')}</h2>
              <span className="logo-badge success">SECURE PROTOCOL DETECTED</span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', margin: 0 }}>
              {t('registryDesc')}
            </p>

            {registryMessage && (
              <div style={{ 
                padding: '12px 16px', 
                background: registryMessage.startsWith('❌') ? 'var(--color-danger-glow)' : 'var(--color-success-glow)', 
                border: `1px solid ${registryMessage.startsWith('❌') ? 'var(--color-danger)' : 'var(--color-success)'}`, 
                borderRadius: '8px', 
                fontSize: '0.9rem',
                fontWeight: 'bold' 
              }}>
                {registryMessage}
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '24px', marginTop: '10px' }}>
              {/* Register Status Form */}
              <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <h3 style={{ fontFamily: 'Space Grotesk', margin: 0, fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Plus size={18} style={{ color: 'var(--accent-purple)' }} />
                  <span>{t('registerTitle')}</span>
                </h3>
                
                <form onSubmit={handleRegisterStatus} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div className="form-group">
                    <label className="form-label">{t('fullName')}</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="e.g. Vikram Singh"
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">{t('mobileNumber')}</label>
                    <input 
                      type="tel" 
                      className="form-input" 
                      placeholder="10-digit Indian Mobile Number"
                      value={regPhone}
                      onChange={(e) => setRegPhone(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">{t('currentLocation')}</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="e.g. Dadar West, Mumbai"
                      value={regLocation}
                      onChange={(e) => setRegLocation(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">{t('status')}</label>
                    <select 
                      className="dropdown-select"
                      style={{ padding: '10px' }}
                      value={regStatus}
                      onChange={(e) => setRegStatus(e.target.value)}
                    >
                      <option value="Safe">🟢 {t('safe')}</option>
                      <option value="Stranded">🔴 {t('stranded')}</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">{t('notes')}</label>
                    <textarea 
                      className="form-input" 
                      rows="3" 
                      placeholder="Any notes (e.g. staying on 3rd floor, needs dry food/water)"
                      value={regDetails}
                      onChange={(e) => setRegDetails(e.target.value)}
                      style={{ resize: 'none', fontFamily: 'inherit' }}
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="btn-sos"
                    style={{ 
                      background: regStatus === 'Safe' ? 'var(--color-success)' : 'var(--color-danger)',
                      fontSize: '0.9rem',
                      height: '42px',
                      marginTop: '8px'
                    }}
                  >
                    {t('submitRegistry')}
                  </button>
                </form>
              </div>

              {/* Search Registry */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '20px' }}>
                  <h3 style={{ fontFamily: 'Space Grotesk', margin: '0 0 12px 0', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Search size={18} style={{ color: 'var(--color-info)' }} />
                    <span>{t('searchRegistry')}</span>
                  </h3>
                  <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                    <Search size={16} style={{ position: 'absolute', left: '12px', color: 'var(--text-muted)' }} />
                    <input 
                      type="text" 
                      className="chat-input"
                      style={{ paddingLeft: '36px', width: '100%', height: '42px' }}
                      placeholder={t('searchPlaceholder')}
                      value={registrySearch}
                      onChange={(e) => setRegistrySearch(e.target.value)}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', overflowY: 'auto', maxHeight: '420px', paddingRight: '4px' }}>
                  {filteredRegistry.length === 0 ? (
                    <div style={{ padding: '24px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '12px', textAlign: 'center', color: 'var(--text-muted)' }}>
                      No matching records found.
                    </div>
                  ) : filteredRegistry.map(entry => (
                    <div key={entry.id} className="float-card" style={{ 
                      background: 'var(--bg-card)', 
                      border: `1px solid ${entry.status === 'Safe' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)'}`, 
                      borderRadius: '12px', 
                      padding: '16px', 
                      position: 'relative'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                          <h4 style={{ margin: '0 0 4px 0', fontFamily: 'Space Grotesk', fontSize: '1.1rem' }}>{entry.name}</h4>
                          <div style={{ display: 'flex', gap: '8px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                            <span>📞 {maskPhone(entry.phone)}</span>
                            <span>📍 {entry.location}</span>
                          </div>
                        </div>
                        <span className={`status-pill ${entry.status === 'Safe' ? 'success' : 'danger'}`} style={{
                          background: entry.status === 'Safe' ? 'var(--color-success-glow)' : 'var(--color-danger-glow)',
                          color: entry.status === 'Safe' ? 'var(--color-success)' : 'var(--color-danger)',
                          border: `1px solid ${entry.status === 'Safe' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
                          padding: '2px 10px',
                          borderRadius: '12px',
                          fontSize: '0.75rem',
                          fontWeight: 'bold'
                        }}>
                          {entry.status === 'Safe' ? t('safe').toUpperCase() : t('stranded').toUpperCase()}
                        </span>
                      </div>
                      <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: '12px 0 8px 0', background: 'var(--bg-tertiary)', padding: '8px 12px', borderRadius: '6px' }}>
                        {entry.details}
                      </p>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                        <span>{t('lastUpdated')}: {entry.timestamp}</span>
                        {entry.status === 'Stranded' && (
                          <button 
                            className="btn-small-action" 
                            style={{ background: 'var(--color-danger-glow)', color: 'var(--color-danger)', border: '1px solid var(--color-danger)' }}
                            onClick={() => handleSendMessage(`Report rescue coordinate update request for ${entry.name}`)}
                          >
                            {t('signalNdrf')}
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </main>
        )}

        {/* Supply Matching Hub View */}
        {currentTab === "supply_hub" && (
          <main className="dashboard-panel">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontFamily: 'Space Grotesk', margin: 0 }}>{t('supplyTitle')}</h2>
              <span className="logo-badge success">{matchedCount} {t('autoMatchedTitle').toUpperCase()}</span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', margin: 0 }}>
              {t('supplyDesc')}
            </p>

            {/* Input Forms */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', marginTop: '10px' }}>
              {/* Request Supplies Card */}
              <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '20px' }}>
                <h3 style={{ fontFamily: 'Space Grotesk', margin: '0 0 16px 0', fontSize: '1.1rem', color: 'var(--color-danger)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <AlertTriangle size={16} />
                  <span>{t('reqSupplies')}</span>
                </h3>
                
                <form onSubmit={handleAddRequest} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '8px' }}>
                    <div className="form-group">
                      <label className="form-label">{t('itemType')}</label>
                      <select className="dropdown-select" value={reqItem} onChange={(e) => setReqItem(e.target.value)}>
                        <option value="Drinking Water">Drinking Water</option>
                        <option value="Dry Food Packets">Dry Food Packets</option>
                        <option value="First Aid Kits">First Aid Kits</option>
                        <option value="Blankets">Blankets</option>
                        <option value="Inflatable Boats">Inflatable Boats</option>
                        <option value="Flashlights">Flashlights</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">{t('qty')}</label>
                      <input type="number" className="form-input" value={reqQty} onChange={(e) => setReqQty(parseInt(e.target.value) || 0)} required />
                    </div>
                    <div className="form-group">
                      <label className="form-label">{t('unit')}</label>
                      <select className="dropdown-select" value={reqUnit} onChange={(e) => setReqUnit(e.target.value)}>
                        <option value="bottles">bottles</option>
                        <option value="packets">packets</option>
                        <option value="kits">kits</option>
                        <option value="pcs">pcs</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">{t('deliveryLoc')}</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="e.g. Kurla East Relief Hub"
                      value={reqLocation} 
                      onChange={(e) => setReqLocation(e.target.value)} 
                      required 
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">{t('contactPerson')}</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="e.g. Rajesh (9823456789)"
                      value={reqContact} 
                      onChange={(e) => setReqContact(e.target.value)} 
                      required 
                    />
                  </div>

                  <button type="submit" className="btn-send" style={{ width: '100%', height: '36px', fontSize: '0.85rem' }}>
                    {t('postReq')}
                  </button>
                </form>
              </div>

              {/* Offer Supplies Card */}
              <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '20px' }}>
                <h3 style={{ fontFamily: 'Space Grotesk', margin: '0 0 16px 0', fontSize: '1.1rem', color: 'var(--color-success)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle size={16} />
                  <span>{t('offSupplies')}</span>
                </h3>
                
                <form onSubmit={handleAddOffer} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '8px' }}>
                    <div className="form-group">
                      <label className="form-label">{t('itemType')}</label>
                      <select className="dropdown-select" value={offItem} onChange={(e) => setOffItem(e.target.value)}>
                        <option value="Drinking Water">Drinking Water</option>
                        <option value="Dry Food Packets">Dry Food Packets</option>
                        <option value="First Aid Kits">First Aid Kits</option>
                        <option value="Blankets">Blankets</option>
                        <option value="Inflatable Boats">Inflatable Boats</option>
                        <option value="Flashlights">Flashlights</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">{t('qty')}</label>
                      <input type="number" className="form-input" value={offQty} onChange={(e) => setOffQty(parseInt(e.target.value) || 0)} required />
                    </div>
                    <div className="form-group">
                      <label className="form-label">{t('unit')}</label>
                      <select className="dropdown-select" value={offUnit} onChange={(e) => setOffUnit(e.target.value)}>
                        <option value="bottles">bottles</option>
                        <option value="packets">packets</option>
                        <option value="kits">kits</option>
                        <option value="pcs">pcs</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">{t('pickupLoc')}</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="e.g. Kurla East Relief Hub"
                      value={offLocation} 
                      onChange={(e) => setOffLocation(e.target.value)} 
                      required 
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                    <div className="form-group">
                      <label className="form-label">{t('donorName')}</label>
                      <input 
                        type="text" 
                        className="form-input" 
                        placeholder="NGO / Individual"
                        value={offDonor} 
                        onChange={(e) => setOffDonor(e.target.value)} 
                        required 
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">{t('donorContact')}</label>
                      <input 
                        type="text" 
                        className="form-input" 
                        placeholder="Phone number"
                        value={offContact} 
                        onChange={(e) => setOffContact(e.target.value)} 
                        required 
                      />
                    </div>
                  </div>

                  <button type="submit" className="btn-send" style={{ width: '100%', height: '36px', fontSize: '0.85rem', background: 'var(--color-success)' }}>
                    {t('postOff')}
                  </button>
                </form>
              </div>
            </div>

            {/* Matching Directory Grid */}
            <div style={{ marginTop: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
                <h3 style={{ fontFamily: 'Space Grotesk', margin: 0 }}>{t('autoMatchedTitle')}</h3>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button className={`btn-small-action ${supplyTab === 'all' ? 'active' : ''}`} onClick={() => setSupplyTab("all")}>{t('allRecords')}</button>
                  <button className={`btn-small-action ${supplyTab === 'matches' ? 'active' : ''}`} onClick={() => setSupplyTab("matches")}>{t('activeMatches')} ({matchedCount})</button>
                  <button className={`btn-small-action ${supplyTab === 'requests' ? 'active' : ''}`} onClick={() => setSupplyTab("requests")}>{t('pendingRequests')}</button>
                  <button className={`btn-small-action ${supplyTab === 'offers' ? 'active' : ''}`} onClick={() => setSupplyTab("offers")}>{t('availableOffers')}</button>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '12px', marginTop: '12px', maxHeight: '350px', overflowY: 'auto' }}>
                {/* Render Matches */}
                {(supplyTab === 'all' || supplyTab === 'matches') && 
                  supplyRequests.filter(r => r.matched).map(req => {
                    const offer = supplyOffers.find(o => o.id === req.offerId);
                    if (!offer) return null;
                    return (
                      <div key={`match-${req.id}`} className="match-card">
                        <div className="match-header">
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span className="logo-badge success">MATCHED</span>
                            <strong style={{ fontFamily: 'Space Grotesk', color: '#ffffff' }}>{req.item} ({req.qty} {req.unit})</strong>
                          </div>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Auto-aligned by Location: **{req.location}**</span>
                        </div>
                        <div className="match-flow">
                          <div className="match-participant donor">
                            <span className="participant-role">{t('donorInventory')}</span>
                            <div className="participant-name">{offer.donor}</div>
                            <div className="participant-contact">📞 {offer.contact}</div>
                          </div>
                          
                          <div className="match-connector">
                            <div className="connector-line"></div>
                            <ArrowRight size={16} className="connector-arrow text-glow" />
                          </div>

                          <div className="match-participant recipient">
                            <span className="participant-role">{t('recipientNeed')}</span>
                            <div className="participant-name">{req.contact}</div>
                            <div className="participant-contact">📍 Location: {req.location}</div>
                          </div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '10px 16px', background: 'rgba(16,185,129,0.05)', borderTop: '1px solid var(--border-color)' }}>
                          <button 
                            className="btn-small-action" 
                            style={{ background: 'var(--color-success-glow)', color: 'var(--color-success)', border: '1px solid var(--color-success)' }}
                            onClick={() => handleMarkDelivered(req.id, offer.id)}
                          >
                            {t('confirmDelivery')}
                          </button>
                        </div>
                      </div>
                    );
                  })
                }

                {/* Render Unmatched Requests */}
                {(supplyTab === 'all' || supplyTab === 'requests') && 
                  supplyRequests.filter(r => !r.matched).map(req => (
                    <div key={`req-${req.id}`} className="supply-item-card request">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <span className="status-pill danger">PENDING MATCH</span>
                          <h4 style={{ margin: '6px 0 2px 0', fontFamily: 'Space Grotesk' }}>Need: {req.qty} {req.unit} of {req.item}</h4>
                          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>📍 Delivery: {req.location} | Contact: {req.contact}</span>
                        </div>
                        <button className="btn-small-action" onClick={() => handleSendMessage(`I want to match request for ${req.item} at ${req.location}`)}>
                          Manual Match
                        </button>
                      </div>
                    </div>
                  ))
                }

                {/* Render Unmatched Offers */}
                {(supplyTab === 'all' || supplyTab === 'offers') && 
                  supplyOffers.filter(o => !o.matched).map(off => (
                    <div key={`off-${off.id}`} className="supply-item-card offer">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <span className="status-pill info">AVAILABLE INVENTORY</span>
                          <h4 style={{ margin: '6px 0 2px 0', fontFamily: 'Space Grotesk' }}>Offer: {off.qty} {off.unit} of {off.item}</h4>
                          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>📍 Location: {off.location} | Donor: {off.donor} ({off.contact})</span>
                        </div>
                        <button className="btn-small-action" style={{ border: '1px solid var(--color-success)', color: 'var(--color-success)' }} onClick={() => handleSendMessage(`I want to match offer for ${off.item} at ${off.location}`)}>
                          Claim Resources
                        </button>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
          </main>
        )}

        {/* Volunteer Tasks View */}
        {currentTab === "volunteer" && (
          <main className="dashboard-panel">
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <h2 style={{fontFamily: 'Space Grotesk', margin: 0}}>{t('volunteerTitle')}</h2>
              <span className="logo-badge agent-system">VOLUNTEER SERVICES PORTAL</span>
            </div>
            <p style={{color: 'var(--text-secondary)', fontSize: '0.88rem', margin: 0}}>
              {t('volunteerDesc')}
            </p>

            <div style={{display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '10px'}}>
              {volunteerTasks.map(task => (
                <div key={task.id} style={{background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                  <div>
                    <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                      {task.urgent && <span style={{background: 'rgba(239, 68, 68, 0.15)', color: 'var(--color-danger)', fontSize: '0.65rem', padding: '2px 8px', borderRadius: '4px', fontWeight: 'bold'}}>{t('urgent')}</span>}
                      <span style={{fontSize: '0.75rem', color: 'var(--text-muted)'}}><MapPin size={10} style={{verticalAlign: 'middle', marginRight: '2px'}} /> {task.location}</span>
                    </div>
                    <h3 style={{margin: '8px 0 4px 0', fontFamily: 'Space Grotesk', fontSize: '1.15rem'}}>{task.title}</h3>
                    <p style={{fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0}}>Signed up: **{task.signedUp}** of **{task.capacity}** volunteers needed</p>
                  </div>
                  <div>
                    <button 
                      onClick={() => handleVolunteerSignup(task.id)}
                      className="btn-send"
                      style={{
                        background: task.userRegistered ? 'var(--color-success-glow)' : 'var(--accent-purple)',
                        border: task.userRegistered ? '1px solid var(--color-success)' : 'none',
                        color: task.userRegistered ? 'var(--color-success)' : '#ffffff',
                        width: 'auto',
                        padding: '0 20px',
                        height: '40px',
                        fontWeight: 'bold',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      {task.userRegistered ? (
                        <>
                          <Check size={16} />
                          <span>{t('registered')}</span>
                        </>
                      ) : (
                        <>
                          <Plus size={16} />
                          <span>{t('joinOperation')}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </main>
        )}
      </div>

      {/* SOS Modal */}
      {sosModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <AlertTriangle size={24} className="pulse-sos" />
              <h2>{t('sosTitle')}</h2>
            </div>
            <p className="modal-desc">
              {t('sosDesc')}
            </p>
            
            <div className="form-group">
              <span className="form-label">{t('coordsLabel')}</span>
              <input 
                type="text" 
                className="form-input" 
                placeholder="e.g. stranded on roof in Kurla East, Mumbai"
                value={sosCoords}
                onChange={(e) => setSosCoords(e.target.value)}
              />
            </div>

            <div className="form-group">
              <span className="form-label">{t('mobileNumber')}</span>
              <input 
                type="text" 
                className="form-input" 
                placeholder="e.g. 9876543210"
                value={sosContact}
                onChange={(e) => setSosContact(e.target.value)}
              />
            </div>

            <div className="modal-actions">
              <button className="btn-cancel" onClick={() => setSosModalOpen(false)}>{t('cancel')}</button>
              <button 
                className="btn-confirm-sos" 
                onClick={handleSOSConfirm}
                disabled={!sosCoords || !sosContact}
              >
                {t('dispatch')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const getDisasterHeaderInfo = () => {
  return "LIFEBRIDGE INDIA CRISIS DISPATCH NETWORK";
};

export default App;
