export interface TeamMember {
  name: string;
  role: string;
  image: string;
}

export interface Partner {
  name: string;
  logoUrl?: string;
}

export interface Project {
  name: string;
  location: string;
  capacity: string;
  status: 'completed' | 'ongoing' | 'planned';
  panels: string;
  inverters: string;
  description: string;
  image: string;
}

export interface MonthlyRecord {
  month: string;
  generation: number;
  revenue: string;
  payout: string;
  status: string;
}

export interface Translation {
  nav: {
    home: string;
    about: string;
    partners: string;
    howItWorks?: string;
    investors: string;
    clients?: string;
    projects?: string;
    services: string;
    solar3d: string;
    news?: string;
    contact: string;
    investorZone: string;
  };
  hero: {
    badge: string;
    slogan: string;
    subSlogan: string;
    desc: string;
    ctaInvestors: string;
    ctaPartners: string;
    cta3D: string;
    activeProjectTitle: string;
    activeProjectSubtitle: string;
    statCapacityVal: string;
    statCapacityLabel: string;
    statTermVal: string;
    statTermLabel: string;
    statTariffVal: string;
    statTariffLabel: string;
    statCapexVal: string;
    statCapexLabel: string;
    systemStatus: string;
    stableGrid: string;
    statCapacity?: string;
    statExperience?: string;
    statContracts?: string;
    statAnnual?: string;
    ctaClients?: string;
  };
  about: {
    badge: string;
    title: string;
    subTitle: string;
    regionText: string;
    introP1: string;
    introP2: string;
    japanUzPartnerTitle: string;
    japanUzPartnerDesc: string;
    companyDetailsTitle: string;
    companyDetails: { label: string; value: string }[];
    missionTitle: string;
    missionDesc: string;
    visionTitle: string;
    visionDesc: string;
    ppaTitle: string;
    ppaDesc: string;
    ppaBenefits: { title: string; desc: string }[];
    serviceChainTitle: string;
    serviceChainDesc: string;
    serviceChain: string[];
    whyTitle: string;
    whyDesc: string;
    whyPoints: { title: string; desc: string }[];
    valuesTitle: string;
    values: { title: string; desc: string }[];
    currentProjectTitle: string;
    currentProjectBadge: string;
    currentProjectDesc: string;
    currentProjectSpecs: { label: string; value: string }[];
    // legacy compatibility
    historyTitle?: string;
    historyText?: string;
    missionText?: string;
    valuesText?: string;
    teamTitle?: string;
    partnersTitle?: string;
    licenseTitle?: string;
    licenseText?: string;
  };
  partners: {
    badge: string;
    title: string;
    desc: string;
    partnersList: {
      id: string;
      name: string;
      badge: string;
      description: string;
      details: { label: string; value: string }[];
    }[];
    ecosystemTitle: string;
    ecosystemDesc: string;
    ecosystemHeaders: {
      partner: string;
      role: string;
    };
    ecosystemRows: {
      partner: string;
      role: string;
    }[];
    processTitle: string;
    processDesc: string;
    processFlow: string[];
  };
  investors: {
    badge: string;
    title: string;
    whyTitle: string;
    whyPoints: { title: string; desc: string }[];
    sampleBadge: string;
    exampleTitle: string;
    exampleDesc: string;
    sampleCapacityLabel: string;
    sampleCapacityVal: string;
    sampleProductionLabel: string;
    sampleProductionVal: string;
    sampleCapexLabel: string;
    sampleCapexVal: string;
    sampleRevenueLabel: string;
    sampleRevenueVal: string;
    sampleIrrBadge: string;
    protectionTitle: string;
    protectionDesc: string;
    protectionPoints: string[];
    processTitle: string;
    processSteps: { title: string; desc: string }[];
    auditTitle: string;
    auditDesc: string;
    ctaButton: string;
  };
  solar3d: {
    badge: string;
    title: string;
    subtitle: string;
    modeSingle: string;
    modeArray: string;
    modeExploded: string;
    modeTracker: string;
    timeOfDay: string;
    tiltAngle: string;
    optimalTilt: string;
    setOptimal: string;
    optimalBadge: string;
    weatherCondition: string;
    weatherSunny: string;
    weatherCloudy: string;
    weatherSoiled: string;
    cleanPanels: string;
    washingLabel: string;
    cleaningDone: string;
    currentOutput: string;
    irradiance: string;
    efficiency: string;
    cellTemp: string;
    dailyEst: string;
    co2Offset: string;
    resetCamera: string;
    autoRotate: string;
    viewFront: string;
    viewSide: string;
    viewRear: string;
    specsTitle: string;
    moduleAnatomy: string;
    sunriseLabel: string;
    peakLabel: string;
    sunsetLabel: string;
    layerLabels: {
      glass: string;
      evaTop: string;
      cells: string;
      evaBottom: string;
      backsheet: string;
      frame: string;
      jbox: string;
    };
  };
  services: {
    badge: string;
    title: string;
    scopeTitle: string;
    calloutTitle: string;
    calloutDesc: string;
    calloutBtn: string;
    epcTitle: string;
    epcDesc: string;
    epcFeatures: string[];
    omTitle: string;
    omDesc: string;
    omFeatures: string[];
    carportsTitle: string;
    carportsDesc: string;
    carportsFeatures: string[];
  };
  news: {
    badge: string;
    title: string;
    readMore: string;
    items: {
      title: string;
      date: string;
      category: string;
      summary: string;
      image: string;
    }[];
  };
  contact: {
    badge: string;
    title: string;
    subtitle: string;
    deskTitle: string;
    deskDesc: string;
    addressLabel: string;
    addressValue: string;
    phoneLabel: string;
    emailLabel: string;
    tinLabel: string;
    socialLabel: string;
    formHeading: string;
    formName: string;
    formEmail: string;
    formPhone: string;
    formMsg: string;
    formSubmit: string;
    formSuccess: string;
    sendAnother: string;
    interestPrefill: string;
  };
  investorZone: {
    badge: string;
    title: string;
    subtitle: string;
    loginBtn: string;
    logoutBtn: string;
    encryptedTitle: string;
    encryptedDesc: string;
    keyLabel: string;
    passPlaceholder: string;
    hintTitle: string;
    hintText: string;
    wrongPass: string;
    welcome: string;
    portfolioId: string;
    secureActive: string;
    tabLiveTelemetry: string;
    tabDisbursements: string;
    tabDocuments: string;
    currentOutput: string;
    liveGeneration: string;
    activeFacilityNote: string;
    facilityTemp: string;
    gridFrequency: string;
    inverterStatus: string;
    cumulativeTitle: string;
    cumulativeDesc: string;
    totalCo2Savings: string;
    totalCashPaid: string;
    monthlyDist: string;
    auditedBy: string;
    monthCol: string;
    generationCol: string;
    revenueCol: string;
    payoutCol: string;
    statusCol: string;
    verified: string;
    docsTitle: string;
    docs: {
      title: string;
      desc: string;
      btnText: string;
    }[];
  };
  footer: {
    tagline: string;
    legalSummary: string;
    motto: string;
    navTitle: string;
    contactTitle: string;
    allRights: string;
    bottomPpa: string;
  };
  // Optional legacy sections
  howItWorks?: any;
  clients?: any;
  projects?: any;
}
