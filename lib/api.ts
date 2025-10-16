

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

// Types matching the API structure
export interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  companyName: string;
  jobTitle: string;
  assessmentDate: string;
}

export interface AssessmentAnswer {
  questionId: string;
  question: string;
  answer: "yes" | "partial" | "no";
  comment?: string;
  category: string;
  score: number;
}

export interface CategoryScore {
  name: string;
  total: number;
  max: number;
  questions: number;
  percentage: number;
}

export interface OverallScore {
  totalScore: number;
  maxPossibleScore: number;
  overallPercentage: number;
  maturityLevel: string;
}

export interface AssessmentMetadata {
  assessmentVersion: string;
  generatedAt: string;
  totalQuestions: number;
  answeredQuestions: number;
  completionPercentage: number;
}

export interface AssessmentData {
  personalInfo: PersonalInfo;
  assessmentAnswers: AssessmentAnswer[];
  scoring: {
    categoryScores: Record<string, CategoryScore>;
    overallScore: OverallScore;
  };
  metadata: AssessmentMetadata;
}

export interface AssessmentQuestion {
  id: string;
  category: string;
  categoryName: string;
  subcategory: string;
  question: string;
}

// Mock questions data (in a real app, this would come from the API)
const mockQuestions: AssessmentQuestion[] = [
  // Cyber Governance - Risk Management
  {
    id: "cg-rm-1",
    category: "CG",
    categoryName: "Cyber Governance",
    subcategory: "Risk Management",
    question: "Does your organization aggregate and manage cybersecurity risks alongside other enterprise risks (e.g., compliance, financial, operational, regulatory, reputational, safety)?",
  },
  {
    id: "cg-rm-2",
    category: "CG",
    categoryName: "Cyber Governance",
    subcategory: "Risk Management",
    question: "Do all departments across the organization - such as management, operations, internal auditors, legal, acquisition, physical security, and HR - communicate with each other about cybersecurity risks and its management?",
  },
  {
    id: "cg-rm-3",
    category: "CG",
    categoryName: "Cyber Governance",
    subcategory: "Risk Management",
    question: "How does your organization document cybersecurity risk information (e.g., risk description, score, exposure, treatment, and ownership) and controls?",
  },
  // Cyber Governance - Roles and Responsibilities
  {
    id: "cg-rr-1",
    category: "CG",
    categoryName: "Cyber Governance",
    subcategory: "Roles and Responsibilities",
    question: "Are all roles, responsibilities, and authorities related to cybersecurity risk management established, communicated, understood, and enforced in your organization?",
  },
  // Cyber Governance - Policy
  {
    id: "cg-p-1",
    category: "CG",
    categoryName: "Cyber Governance",
    subcategory: "Policy",
    question: "Does your organization have established cybersecurity policies which are periodically reviewed, updated, communicated, and enforced to reflect changes in requirements, threats, technology, and organizational mission?",
  },
  {
    id: "cg-p-2",
    category: "CG",
    categoryName: "Cyber Governance",
    subcategory: "Policy",
    question: "From the list below, please select the cybersecurity policies documented and enforced in your organization?",
  },
  // Cyber Governance - Cybersecurity Supply Chain Risk Management
  {
    id: "cg-scrm-1",
    category: "CG",
    categoryName: "Cyber Governance",
    subcategory: "Cybersecurity Supply Chain Risk Management",
    question: "Is there an established cybersecurity supply chain risk management program in your organization, including a plan (with milestones), policies, and procedures that guide implementation and improvement of the program?",
  },
  {
    id: "cg-scrm-2",
    category: "CG",
    categoryName: "Cyber Governance",
    subcategory: "Cybersecurity Supply Chain Risk Management",
    question: "Does your organization maintain a record of all suppliers, prioritized based on criticality related to for example, the sensitivity of data processed or degree of access to your organization's systems?",
  },
  {
    id: "cg-scrm-3",
    category: "CG",
    categoryName: "Cyber Governance",
    subcategory: "Cybersecurity Supply Chain Risk Management",
    question: "Does your organization conduct security risk assessments for new and periodically for existing suppliers?",
  },
  // Cyber Governance - Regulatory Landscape
  {
    id: "cg-rl-1",
    category: "CG",
    categoryName: "Cyber Governance",
    subcategory: "Regulatory Landscape",
    question: "Legal, regulatory, and contractual requirements regarding cybersecurity - including privacy and civil liberties obligations - are understood and managed?",
  },
  // Cyber Governance - Cyber Metrics
  {
    id: "cg-cm-1",
    category: "CG",
    categoryName: "Cyber Governance",
    subcategory: "Cyber Metrics",
    question: "Has your organization established cybersecurity risk metrics which is being tracked and reported on a periodic basis?",
  },
  // Identify - Asset Management
  {
    id: "id-am-1",
    category: "ID",
    categoryName: "Identify",
    subcategory: "Asset Management",
    question: "Does your organization maintain and manage inventories of all hardware (like servers, network devices, laptops), software (custom applications, APIs) and services (like cloud hosting, application testing)?",
  },
  {
    id: "id-am-2",
    category: "ID",
    categoryName: "Identify",
    subcategory: "Asset Management",
    question: "How does your organization document and manage this inventory?",
  },
  // Identify - Risk Assessment
  {
    id: "id-ra-1",
    category: "ID",
    categoryName: "Identify",
    subcategory: "Risk Assessment",
    question: "Does your organization use vulnerability management technologies to identify unpatched and misconfigured software?",
  },
  {
    id: "id-ra-2",
    category: "ID",
    categoryName: "Identify",
    subcategory: "Risk Assessment",
    question: "Threats, vulnerabilities, likelihoods, and impacts are used to understand inherent risk and inform risk response prioritization, and risk responses are chosen, prioritized, planned, tracked, and communicated?",
  },
  {
    id: "id-ra-3",
    category: "ID",
    categoryName: "Identify",
    subcategory: "Risk Assessment",
    question: "Do all changes and exceptions are managed, assessed for risk impact, recorded, and tracked?",
  },
  // Identify - Cyber PT
  {
    id: "id-cpt-1",
    category: "ID",
    categoryName: "Identify",
    subcategory: "Cyber PT",
    question: "Does your organization conduct penetration testing to identify opportunities to improve the security posture of selected high-risk systems?",
  },
  // Identify - Improvement
  {
    id: "id-i-1",
    category: "ID",
    categoryName: "Identify",
    subcategory: "Improvement",
    question: "Are improvements identified for future business continuity, DR and incident response activities based on tabletop exercise, simulations, drills and tests conducted?",
  },
  {
    id: "id-i-2",
    category: "ID",
    categoryName: "Identify",
    subcategory: "Improvement",
    question: "Are contingency plans (e.g., incident response, business continuity, disaster recovery) established for responding to and recovering from adverse events?",
  },
  // Identify - Privacy
  {
    id: "id-p-1",
    category: "ID",
    categoryName: "Identify",
    subcategory: "Privacy",
    question: "Has your organization created a map / database of Personally Identifiable Information (PII) lifecycle, capturing the privacy risk and controls for each such data flow?",
  },
  // Protect - IAM
  {
    id: "pr-iam-1",
    category: "PR",
    categoryName: "Protect",
    subcategory: "IAM",
    question: "Identities and credentials for authorized users, services, and hardware are managed by the organization?",
  },
  {
    id: "pr-iam-2",
    category: "PR",
    categoryName: "Protect",
    subcategory: "IAM",
    question: "Does your organization authenticate all users and services (using passwords, multi-factor authentication)?",
  },
  {
    id: "pr-iam-3",
    category: "PR",
    categoryName: "Protect",
    subcategory: "IAM",
    question: "Does your organization review logical and physical access privileges periodically and ad-hoc basis?",
  },
  {
    id: "pr-iam-4",
    category: "PR",
    categoryName: "Protect",
    subcategory: "IAM",
    question: "How does your organization promptly rescind privileges that are no longer needed?",
  },
  // Protect - Awareness and Training
  {
    id: "pr-at-1",
    category: "PR",
    categoryName: "Protect",
    subcategory: "Awareness and Training",
    question: "Employees are provided with awareness and training so that they possess the knowledge and skills to perform general tasks with cybersecurity risks in mind?",
  },
  {
    id: "pr-at-2",
    category: "PR",
    categoryName: "Protect",
    subcategory: "Awareness and Training",
    question: "What is the frequency of such trainings?",
  },
  {
    id: "pr-at-3",
    category: "PR",
    categoryName: "Protect",
    subcategory: "Awareness and Training",
    question: "Are the trainings provided by any service provider?",
  },
  {
    id: "pr-at-4",
    category: "PR",
    categoryName: "Protect",
    subcategory: "Awareness and Training",
    question: "Is a platform / tool is used for such training and awareness programs?",
  },
  {
    id: "pr-at-5",
    category: "PR",
    categoryName: "Protect",
    subcategory: "Awareness and Training",
    question: "Are role based security training conducted?",
  },
  {
    id: "pr-at-6",
    category: "PR",
    categoryName: "Protect",
    subcategory: "Awareness and Training",
    question: "Are phishing simulation exercises conducted with continuous measures to improve the risk score?",
  },
  // Protect - Data Security
  {
    id: "pr-ds-1",
    category: "PR",
    categoryName: "Protect",
    subcategory: "Data Security",
    question: "Encryption, digital signatures, and cryptographic hashes used to protect the confidentiality and integrity of stored data in files, databases, virtual machine disk images, container images, and other resources?",
  },
  {
    id: "pr-ds-2",
    category: "PR",
    categoryName: "Protect",
    subcategory: "Data Security",
    question: "Do outbound emails and other communications that contain sensitive data blocked or encrypted, depending on the data classification?",
  },
  {
    id: "pr-ds-3",
    category: "PR",
    categoryName: "Protect",
    subcategory: "Data Security",
    question: "Backups of data are created, protected, maintained, and tested?",
  },
  // Protect - Platform Security
  {
    id: "pr-ps-1",
    category: "PR",
    categoryName: "Protect",
    subcategory: "Platform Security",
    question: "Are hardened baselines established, tested, deployed, and maintained to enforce the organization's cybersecurity policies and provide only essential capabilities (i.e., principle of least functionality)?",
  },
  {
    id: "pr-ps-2",
    category: "PR",
    categoryName: "Protect",
    subcategory: "Platform Security",
    question: "Are routine and emergency patching performed within the timeframes specified in the vulnerability management plan?",
  },
  // Protect - Technology Infrastructure Resilience
  {
    id: "pr-tir-1",
    category: "PR",
    categoryName: "Protect",
    subcategory: "Technology Infrastructure Resilience",
    question: "Are organization networks and cloud-based platforms logically segmented according to trust boundaries and platform types (e.g., IT, IoT, OT, mobile, guests) to permit only the necessary communications?",
  },
  // Protect - Capacity Management
  {
    id: "pr-cm-1",
    category: "PR",
    categoryName: "Protect",
    subcategory: "Capacity Management",
    question: "Is the usage of storage, power, compute, network bandwidth, and other resources monitored to ensure adequate resource capacity?",
  },
  // Detect - Continuous Monitoring
  {
    id: "de-cm-1",
    category: "DE",
    categoryName: "Detect",
    subcategory: "Continuous Monitoring",
    question: "Networks and network services are monitored to find potentially adverse events?",
  },
  {
    id: "de-cm-2",
    category: "DE",
    categoryName: "Detect",
    subcategory: "Continuous Monitoring",
    question: "Logs are monitored from physical access control systems (e.g., badge readers) to find unusual access patterns (e.g., deviations from the norm) and failed access attempts?",
  },
  {
    id: "de-cm-3",
    category: "DE",
    categoryName: "Detect",
    subcategory: "Continuous Monitoring",
    question: "Behavior analytics software is used to detect anomalous user activity to mitigate insider threats?",
  },
  {
    id: "de-cm-4",
    category: "DE",
    categoryName: "Detect",
    subcategory: "Continuous Monitoring",
    question: "Logs from logical access control systems are monitored to find unusual access patterns and failed access attempts?",
  },
  {
    id: "de-cm-5",
    category: "DE",
    categoryName: "Detect",
    subcategory: "Continuous Monitoring",
    question: "External service provider activities and services are monitored to find potentially adverse events?",
  },
  {
    id: "de-cm-6",
    category: "DE",
    categoryName: "Detect",
    subcategory: "Continuous Monitoring",
    question: "Does your organization monitor email, web, file sharing, collaboration services, and other common attack vectors to detect malware, phishing, data leaks and exfiltration, and other adverse events?",
  },
  {
    id: "de-cm-7",
    category: "DE",
    categoryName: "Detect",
    subcategory: "Continuous Monitoring",
    question: "Does your organization use technologies with a presence on endpoints to detect cyber health issues (e.g., missing patches, malware infections, unauthorized software)?",
  },
  {
    id: "de-cm-8",
    category: "DE",
    categoryName: "Detect",
    subcategory: "Continuous Monitoring",
    question: "Does your organization use security information and event management (SIEM) or other tools to continuously monitor log events for known malicious and suspicious activity?",
  },
  // Detect - Adverse Event Analysis
  {
    id: "de-aea-1",
    category: "DE",
    categoryName: "Detect",
    subcategory: "Adverse Event Analysis",
    question: "Is security information and event management (SIEM) or other tools deployed to continuously monitor log events for known malicious and suspicious activity?",
  },
  {
    id: "de-aea-2",
    category: "DE",
    categoryName: "Detect",
    subcategory: "Adverse Event Analysis",
    question: "Cyber threat intelligence feeds are provided to detection technologies, processes, and personnel?",
  },
  // Respond - Incident Management
  {
    id: "rs-im-1",
    category: "RS",
    categoryName: "Respond",
    subcategory: "Incident Management",
    question: "The incident response plan is executed in coordination with relevant third parties once an incident is declared?",
  },
  {
    id: "rs-im-2",
    category: "RS",
    categoryName: "Respond",
    subcategory: "Incident Management",
    question: "Incidents are categorized based on type (e.g., data breach, ransomware, DDoS, account compromise) and prioritized based on their scope, likely impact, and time-critical nature?",
  },
  {
    id: "rs-im-3",
    category: "RS",
    categoryName: "Respond",
    subcategory: "Incident Management",
    question: "Analysis is performed to establish what has taken place during an incident and the root cause of the incident?",
  },
  // Respond - Breach Notification
  {
    id: "rs-bn-1",
    category: "RS",
    categoryName: "Respond",
    subcategory: "Breach Notification",
    question: "Does the organization have a breach notification procedure in place?",
  },
  // Respond - Incident Containment
  {
    id: "rs-ic-1",
    category: "RS",
    categoryName: "Respond",
    subcategory: "Incident Containment",
    question: "Does the organization have cybersecurity technologies (e.g., antivirus software), cybersecurity features of other technologies (e.g., operating systems, network infrastructure devices) or a service provider to automatically perform incident containment actions?",
  },
  // Recover - Incident Recovery
  {
    id: "rc-ir-1",
    category: "RC",
    categoryName: "Recover",
    subcategory: "Incident Recovery",
    question: "Periodically tests and exercises are performed to assess all individuals with recovery responsibilities are aware of the plans for recovery, and the authorizations required to implement each aspect of the plans?",
  },
  {
    id: "rc-ir-2",
    category: "RC",
    categoryName: "Recover",
    subcategory: "Incident Recovery",
    question: "Periodically tests are performed to verify the integrity of backups and other restoration assets before using them for restoration?",
  },
  {
    id: "rc-ir-3",
    category: "RC",
    categoryName: "Recover",
    subcategory: "Incident Recovery",
    question: "Periodically tests are performed to verify the integrity of restored assets, restoration of the systems and services, and confirmation of normal operating status?",
  },
  {
    id: "rc-ir-4",
    category: "RC",
    categoryName: "Recover",
    subcategory: "Incident Recovery",
    question: "Report of the test or exercise conducted is prepared documenting the incident, the response and recovery actions taken, and lessons learned?",
  },
  {
    id: "rc-ir-5",
    category: "RC",
    categoryName: "Recover",
    subcategory: "Incident Recovery",
    question: "Are business continuity tests performed to validate that essential services are restored in the appropriate order as per the business impact and system categorization records (including service delivery objectives)?",
  },
];

// API Functions
export async function fetchAssessmentQuestions(): Promise<AssessmentQuestion[]> {
  try {
    // In a real implementation, this would fetch from the API
    // For now, we'll return the mock data
    return mockQuestions;
  } catch (error) {
    console.error('Error fetching assessment questions:', error);
    throw new Error('Failed to fetch assessment questions');
  }
}

export async function submitAssessment(assessmentData: AssessmentData): Promise<{ success: boolean; data?: any; error?: string }> {
  try {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(assessmentData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Check if response has content
    const contentType = response.headers.get('content-type');
    console.log('Response Content-Type:', contentType);
    console.log('Response Status:', response.status);
    console.log('Response Headers:', Object.fromEntries(response.headers.entries()));
    
    if (contentType && contentType.includes('application/json')) {
      try {
        const result = await response.json();
        console.log('JSON Response:', result);
        return { success: true, data: result };
      } catch (jsonError) {
        console.warn('Response is not valid JSON, treating as success');
        console.warn('JSON Parse Error:', jsonError);
        return { success: true, data: { message: 'Assessment submitted successfully' } };
      }
    } else {
      // If response is not JSON, just check if it was successful
      const text = await response.text();
      console.log('API Response (non-JSON):', text);
      console.log('Response length:', text.length);
      return { success: true, data: { message: 'Assessment submitted successfully', response: text } };
    }
  } catch (error) {
    console.error('Error submitting assessment:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to submit assessment' 
    };
  }
}

// Utility function to calculate scores
export function calculateScores(answers: Omit<AssessmentAnswer, 'score'>[]): {
  categoryScores: Record<string, CategoryScore>;
  overallScore: OverallScore;
} {
  const scoreMap = { yes: 5, partial: 2.5, no: 0 };
  const categoryScores: Record<string, CategoryScore> = {
    CG: { name: "Cyber Governance", total: 0, max: 0, questions: 0, percentage: 0 },
    ID: { name: "Identify", total: 0, max: 0, questions: 0, percentage: 0 },
    PR: { name: "Protect", total: 0, max: 0, questions: 0, percentage: 0 },
    DE: { name: "Detect", total: 0, max: 0, questions: 0, percentage: 0 },
    RS: { name: "Respond", total: 0, max: 0, questions: 0, percentage: 0 },
    RC: { name: "Recover", total: 0, max: 0, questions: 0, percentage: 0 },
  };

  let totalScore = 0;
  let maxPossibleScore = 0;

  answers.forEach((answer) => {
    const category = answer.questionId.split("-")[0].toUpperCase();
    if (categoryScores[category]) {
      const score = scoreMap[answer.answer];
      categoryScores[category].total += score;
      categoryScores[category].max += 5;
      categoryScores[category].questions += 1;
      totalScore += score;
      maxPossibleScore += 5;
    }
  });

  // Calculate percentages
  Object.values(categoryScores).forEach(category => {
    category.percentage = category.max > 0 ? (category.total / category.max) * 100 : 0;
  });

  const overallPercentage = maxPossibleScore > 0 ? (totalScore / maxPossibleScore) * 100 : 0;
  
  const getMaturityLevel = (percentage: number) => {
    if (percentage >= 80) return "Advanced";
    if (percentage >= 60) return "Intermediate";
    if (percentage >= 40) return "Basic";
    return "Initial";
  };

  const overallScore: OverallScore = {
    totalScore,
    maxPossibleScore,
    overallPercentage,
    maturityLevel: getMaturityLevel(overallPercentage),
  };

  return { categoryScores, overallScore };
}
