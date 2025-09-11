import { Scheme } from '@/types/scheme';

export const sampleSchemes: Scheme[] = [
  {
    id: '1',
    title: 'PM Scholarship Scheme 2024',
    description: 'Financial assistance for meritorious students pursuing higher education. Covers tuition fees and living expenses for undergraduate and postgraduate courses.',
    category: 'education',
    eligibility: [
      'Indian citizen with valid domicile',
      'Minimum 85% marks in 12th standard',
      'Family income below ₹8 lakh per annum',
      'Age between 18-25 years'
    ],
    applicationDeadline: new Date('2024-03-31'),
    launchDate: new Date('2024-01-15'),
    status: 'active',
    documents: [
      { id: 'd1', name: 'Application Guidelines', url: '#', type: 'pdf' },
      { id: 'd2', name: 'Eligibility Criteria', url: '#', type: 'pdf' }
    ],
    applyLink: 'https://scholarships.gov.in',
    isVerified: true,
    aiVerificationScore: 98,
    location: ['All India'],
    beneficiaryCount: 50000,
    tags: ['education', 'scholarship', 'merit-based', 'higher-education']
  },
  {
    id: '2',
    title: 'Ayushman Bharat - PM-JAY',
    description: 'Free medical coverage up to ₹5 lakh per family per year for secondary and tertiary care hospitalization.',
    category: 'health',
    eligibility: [
      'Families identified in SECC-2011 database',
      'Rural families with specific deprivation criteria',
      'Urban occupational category families',
      'No age limit'
    ],
    applicationDeadline: new Date('2024-12-31'),
    launchDate: new Date('2018-09-23'),
    status: 'active',
    documents: [
      { id: 'd3', name: 'Beneficiary Guidelines', url: '#', type: 'pdf' },
      { id: 'd4', name: 'Hospital List', url: '#', type: 'pdf' }
    ],
    applyLink: 'https://pmjay.gov.in',
    isVerified: true,
    aiVerificationScore: 99,
    location: ['All India'],
    beneficiaryCount: 12000000,
    tags: ['health', 'insurance', 'free-treatment', 'universal-healthcare']
  },
  {
    id: '3',
    title: 'PM Kisan Samman Nidhi Yojana',
    description: 'Direct income support of ₹6,000 per year to all landholding farmer families through Direct Benefit Transfer (DBT).',
    category: 'agriculture',
    eligibility: [
      'All landholding farmer families',
      'Valid land ownership documents',
      'Aadhaar card mandatory',
      'Bank account linked with Aadhaar'
    ],
    applicationDeadline: new Date('2024-06-30'),
    launchDate: new Date('2019-02-24'),
    status: 'active',
    documents: [
      { id: 'd5', name: 'Application Form', url: '#', type: 'pdf' },
      { id: 'd6', name: 'Land Verification Process', url: '#', type: 'pdf' }
    ],
    applyLink: 'https://pmkisan.gov.in',
    isVerified: true,
    aiVerificationScore: 97,
    location: ['All India'],
    beneficiaryCount: 11000000,
    tags: ['agriculture', 'farmer', 'income-support', 'direct-benefit']
  },
  {
    id: '4',
    title: 'Pradhan Mantri Awas Yojana - Urban',
    description: 'Affordable housing scheme for urban poor with interest subsidy and direct assistance for house construction.',
    category: 'housing',
    eligibility: [
      'EWS, LIG, and MIG categories',
      'No pucca house owned by family',
      'Annual income criteria specified',
      'Urban area resident'
    ],
    applicationDeadline: new Date('2024-05-15'),
    launchDate: new Date('2015-06-25'),
    status: 'active',
    documents: [
      { id: 'd7', name: 'Income Certificate Format', url: '#', type: 'pdf' },
      { id: 'd8', name: 'Property Documents Required', url: '#', type: 'pdf' }
    ],
    applyLink: 'https://pmaymis.gov.in',
    isVerified: true,
    aiVerificationScore: 96,
    location: ['Urban Areas'],
    beneficiaryCount: 1200000,
    tags: ['housing', 'urban', 'subsidy', 'affordable-housing']
  },
  {
    id: '5',
    title: 'Beti Bachao Beti Padhao',
    description: 'Initiative to address the declining child sex ratio and promote education and empowerment of girl child.',
    category: 'women-empowerment',
    eligibility: [
      'Girl child born after implementation',
      'Parents with valid identity proof',
      'Regular school enrollment',
      'Vaccination compliance'
    ],
    applicationDeadline: new Date('2024-04-30'),
    launchDate: new Date('2015-01-22'),
    status: 'active',
    documents: [
      { id: 'd9', name: 'Birth Certificate', url: '#', type: 'pdf' },
      { id: 'd10', name: 'School Enrollment Proof', url: '#', type: 'pdf' }
    ],
    applyLink: 'https://wcd.nic.in',
    isVerified: true,
    aiVerificationScore: 95,
    location: ['All India'],
    beneficiaryCount: 640000,
    tags: ['women-empowerment', 'girl-child', 'education', 'awareness']
  },
  {
    id: '6',
    title: 'Skill India Mission - PMKVY 4.0',
    description: 'Skill development program with training, certification, and placement assistance for youth.',
    category: 'skill-development',
    eligibility: [
      'Age between 18-35 years',
      'Indian citizen',
      'Minimum 10th standard education',
      'Unemployed or seeking employment'
    ],
    applicationDeadline: new Date('2024-07-31'),
    launchDate: new Date('2024-01-01'),
    status: 'upcoming',
    documents: [
      { id: 'd11', name: 'Training Centers List', url: '#', type: 'pdf' },
      { id: 'd12', name: 'Course Catalog', url: '#', type: 'pdf' }
    ],
    applyLink: 'https://skillindia.gov.in',
    isVerified: true,
    aiVerificationScore: 94,
    location: ['All India'],
    beneficiaryCount: 1000000,
    tags: ['skill-development', 'employment', 'youth', 'certification']
  },
  {
    id: '7',
    title: 'Pradhan Mantri Ujjwala Yojana 2.0',
    description: 'Free LPG connections to women from Below Poverty Line (BPL) households for clean cooking fuel.',
    category: 'rural-development',
    eligibility: [
      'BPL family certificate',
      'Women applicant (18+ years)',
      'Valid Aadhaar card',
      'Bank account with Aadhaar linking'
    ],
    applicationDeadline: new Date('2023-12-31'),
    launchDate: new Date('2016-05-01'),
    status: 'expired',
    documents: [
      { id: 'd13', name: 'BPL Certificate Format', url: '#', type: 'pdf' },
      { id: 'd14', name: 'Connection Process', url: '#', type: 'pdf' }
    ],
    applyLink: 'https://pmuy.gov.in',
    isVerified: true,
    aiVerificationScore: 98,
    location: ['Rural Areas'],
    beneficiaryCount: 9600000,
    tags: ['rural-development', 'clean-energy', 'women', 'lpg']
  },
  {
    id: '8',
    title: 'Pradhan Mantri Vaya Vandana Yojana',
    description: 'Pension scheme for senior citizens providing assured returns and regular income post-retirement.',
    category: 'senior-citizen',
    eligibility: [
      'Age 60 years and above',
      'Indian citizen or NRI',
      'Minimum investment ₹1.5 lakh',
      'Maximum investment ₱15 lakh'
    ],
    applicationDeadline: new Date('2024-03-31'),
    launchDate: new Date('2017-05-04'),
    status: 'active',
    documents: [
      { id: 'd15', name: 'Policy Document', url: '#', type: 'pdf' },
      { id: 'd16', name: 'Premium Calculator', url: '#', type: 'pdf' }
    ],
    applyLink: 'https://licindia.in',
    isVerified: true,
    aiVerificationScore: 93,
    location: ['All India'],
    beneficiaryCount: 450000,
    tags: ['senior-citizen', 'pension', 'investment', 'assured-returns']
  }
];

export const getCategorySchemes = (category: string) => {
  return sampleSchemes.filter(scheme => scheme.category === category);
};

export const getSchemesByStatus = (status: string) => {
  return sampleSchemes.filter(scheme => scheme.status === status);
};

export const searchSchemes = (query: string) => {
  const searchTerm = query.toLowerCase();
  return sampleSchemes.filter(scheme =>
    scheme.title.toLowerCase().includes(searchTerm) ||
    scheme.description.toLowerCase().includes(searchTerm) ||
    scheme.tags.some(tag => tag.toLowerCase().includes(searchTerm))
  );
};