// Intelligent Story & Epic Decomposition Engine

export async function generateBacklogFromPrompt(promptText, onProgress) {
  const steps = [
    'Analyzing product vision & problem space...',
    'Identifying primary user personas and value drivers...',
    'Decomposing domain into architectural Epics...',
    'Drafting Agile User Stories with MoSCoW prioritization...',
    'Formulating Gherkin Acceptance Criteria (Given-When-Then)...',
    'Generating cross-functional technical subtasks (FE, BE, DB)...'
  ];

  for (let i = 0; i < steps.length; i++) {
    if (onProgress) onProgress(steps[i], Math.round(((i + 1) / steps.length) * 100));
    await new Promise(r => setTimeout(r, 260));
  }

  const promptLower = promptText.toLowerCase();

  // Determine domain theme keywords
  const isAI = promptLower.includes('ai') || promptLower.includes('gpt') || promptLower.includes('bot') || promptLower.includes('agent') || promptLower.includes('copilot');
  const isFinance = promptLower.includes('finance') || promptLower.includes('crypto') || promptLower.includes('payment') || promptLower.includes('wallet') || promptLower.includes('invest');
  const isHealth = promptLower.includes('health') || promptLower.includes('fitness') || promptLower.includes('med') || promptLower.includes('wellness') || promptLower.includes('pet');
  const isMarket = promptLower.includes('market') || promptLower.includes('store') || promptLower.includes('shop') || promptLower.includes('order') || promptLower.includes('ecommerce');

  const projectName = promptText.length > 40
    ? promptText.slice(0, 36).trim() + ' MVP'
    : promptText + ' Backlog';

  // Construct dynamic epics and stories based on detected domain
  let epics = [];
  let stories = [];

  const timestamp = Date.now().toString().slice(-4);

  if (isHealth) {
    epics = [
      { id: `epic-${timestamp}-1`, title: 'Patient Triage & Intake Flow', description: 'Symptom logging, medical questionnaire, and urgent escalation routing.', color: 'rose', order: 1 },
      { id: `epic-${timestamp}-2`, title: 'Live Consultation & Video Room', description: 'Secure encrypted WebRTC audio/video consultations and file sharing.', color: 'indigo', order: 2 },
      { id: `epic-${timestamp}-3`, title: 'Prescriptions & Care Follow-up', description: 'Digital prescription issuance, pharmacy dispatch, and check-in timeline.', color: 'emerald', order: 3 }
    ];
    stories = [
      {
        id: `STORY-${timestamp}-01`,
        epicId: `epic-${timestamp}-1`,
        title: 'Interactive Guided Symptom Assessment',
        persona: 'Concerned Patient',
        action: 'answer an adaptive 5-question questionnaire with photo upload of symptoms',
        value: 'I receive an initial urgency triage score before booking an expensive specialist appointment',
        priority: 'must',
        status: 'todo',
        size: 'M',
        points: 5,
        acceptanceCriteria: [
          { id: `ac-${timestamp}-1`, given: 'A patient starts a new consultation request', when: 'They describe their primary symptom and attach 2 clear photos', then: 'Triage classifier calculates risk severity and suggests appropriate care tier.', completed: false },
          { id: `ac-${timestamp}-2`, given: 'Symptoms indicate high medical emergency', when: 'Red-flag keywords are detected', then: 'A warning banner instructs the user to dial emergency services immediately.', completed: false }
        ],
        technicalTasks: [
          { id: `t-${timestamp}-1`, title: 'Design HIPAA-compliant questionnaire modal with photo preview', category: 'Frontend', completed: false },
          { id: `t-${timestamp}-2`, title: 'Build symptom triage rules engine and decision tree service', category: 'Backend', completed: false },
          { id: `t-${timestamp}-3`, title: 'Configure encrypted S3 bucket with client-side KMS keys for medical images', category: 'DevOps', completed: false }
        ]
      },
      {
        id: `STORY-${timestamp}-02`,
        epicId: `epic-${timestamp}-2`,
        title: 'Encrypted Low-Latency Telehealth Video Room',
        persona: 'Licensed Practitioner',
        action: 'join a scheduled video consultation with patient history visible in a side panel',
        value: 'I can deliver clinical care effectively without toggling between multiple browser windows',
        priority: 'must',
        status: 'todo',
        size: 'L',
        points: 8,
        acceptanceCriteria: [
          { id: `ac-${timestamp}-3`, given: 'Both patient and doctor have joined the room', when: 'Call initiates', then: 'End-to-end encrypted WebRTC audio/video streams connect within 2 seconds.', completed: false }
        ],
        technicalTasks: [
          { id: `t-${timestamp}-4`, title: 'Integrate LiveKit / Twilio Video SDK with token exchange', category: 'Frontend', completed: false },
          { id: `t-${timestamp}-5`, title: 'Implement doctor split-screen view with live electronic health record notes', category: 'Frontend', completed: false }
        ]
      },
      {
        id: `STORY-${timestamp}-03`,
        epicId: `epic-${timestamp}-3`,
        title: '1-Click Digital Rx Dispatch to Local Pharmacy',
        persona: 'Treated Patient',
        action: 'select my preferred neighborhood pharmacy for instant e-prescription routing',
        value: 'I can pick up prescribed medications within 1 hour without handling paper scripts',
        priority: 'should',
        status: 'backlog',
        size: 'M',
        points: 5,
        acceptanceCriteria: [
          { id: `ac-${timestamp}-4`, given: 'Doctor signs the e-prescription', when: 'Patient approves pharmacy choice', then: 'NCPDP SCRIPT standard payload is transmitted to pharmacy clearinghouse.', completed: false }
        ],
        technicalTasks: [
          { id: `t-${timestamp}-6`, title: 'Integrate DoseSpot or Surescripts e-prescribing API', category: 'Backend', completed: false },
          { id: `t-${timestamp}-7`, title: 'Create pharmacy search modal by ZIP code and operating hours', category: 'Frontend', completed: false }
        ]
      }
    ];
  } else if (isAI) {
    epics = [
      { id: `epic-${timestamp}-1`, title: 'Knowledge Base & Document Indexing', description: 'Semantic ingestion, chunking, and vector embedding indexing pipeline.', color: 'indigo', order: 1 },
      { id: `epic-${timestamp}-2`, title: 'Agent Reasoning & Contextual Copilot', description: 'Multi-turn chat interface, tool calling, and RAG retrieval synthesis.', color: 'violet', order: 2 },
      { id: `epic-${timestamp}-3`, title: 'Human-in-the-Loop & Evaluation Studio', description: 'Response feedback, confidence threshold gating, and prompt telemetry.', color: 'amber', order: 3 }
    ];
    stories = [
      {
        id: `STORY-${timestamp}-01`,
        epicId: `epic-${timestamp}-1`,
        title: 'Instant Multi-Format Document Ingestion',
        persona: 'Workspace Administrator',
        action: 'drag and drop PDF, Notion, and Markdown documents into the agent workspace',
        value: 'the AI copilot automatically references our internal team knowledge base accurately',
        priority: 'must',
        status: 'todo',
        size: 'M',
        points: 5,
        acceptanceCriteria: [
          { id: `ac-${timestamp}-1`, given: 'An admin uploads a 50-page technical PDF', when: 'File is submitted', then: 'Text is parsed, chunked with 20% overlap, and embedded into vector storage under 15 seconds.', completed: false }
        ],
        technicalTasks: [
          { id: `t-${timestamp}-1`, title: 'Build drag-and-drop document upload zone with parsing status chips', category: 'Frontend', completed: false },
          { id: `t-${timestamp}-2`, title: 'Setup LangChain/LlamaIndex chunking pipeline with text-embedding-3-small', category: 'Backend', completed: false },
          { id: `t-${timestamp}-3`, title: 'Provision Pinecone / pgvector index with cosine similarity metric', category: 'Database', completed: false }
        ]
      },
      {
        id: `STORY-${timestamp}-02`,
        epicId: `epic-${timestamp}-2`,
        title: 'Streaming Multi-Turn Chat with Source Citations',
        persona: 'Support Specialist',
        action: 'ask complex workflow questions and receive real-time streamed responses with clickable source links',
        value: 'I can trust the generated answer by verifying the exact source paragraph',
        priority: 'must',
        status: 'todo',
        size: 'L',
        points: 8,
        acceptanceCriteria: [
          { id: `ac-${timestamp}-2`, given: 'A user query requiring internal knowledge', when: 'AI responds', then: 'Response streams tokens at >40 tokens/sec with superscript numbers linking to source modals.', completed: false }
        ],
        technicalTasks: [
          { id: `t-${timestamp}-4`, title: 'Implement Server-Sent Events (SSE) streaming chat renderer with markdown support', category: 'Frontend', completed: false },
          { id: `t-${timestamp}-5`, title: 'Design prompt template with strict RAG context citations and fallback grounding', category: 'Backend', completed: false }
        ]
      },
      {
        id: `STORY-${timestamp}-03`,
        epicId: `epic-${timestamp}-3`,
        title: 'Low-Confidence Escalation to Human Agent',
        persona: 'Customer Care Lead',
        action: 'have the AI gracefully hand over the conversation to a human teammate when confidence falls below 75%',
        value: 'customers never receive hallucinated misinformation during complex edge cases',
        priority: 'should',
        status: 'backlog',
        size: 'M',
        points: 5,
        acceptanceCriteria: [
          { id: `ac-${timestamp}-3`, given: 'Calculated retrieval similarity score is below 0.75', when: 'User asks a question', then: 'Agent responds politely and rings an on-call team member via WebSocket notification.', completed: false }
        ],
        technicalTasks: [
          { id: `t-${timestamp}-6`, title: 'Create human takeover toggle and agent inbox view', category: 'Frontend', completed: false },
          { id: `t-${timestamp}-7`, title: 'Implement confidence heuristic scoring combining logprobs and cosine distance', category: 'Backend', completed: false }
        ]
      }
    ];
  } else if (isFinance) {
    epics = [
      { id: `epic-${timestamp}-1`, title: 'Account Verification & KYC Compliance', description: 'Identity verification, biometric validation, and regulatory compliance screening.', color: 'indigo', order: 1 },
      { id: `epic-${timestamp}-2`, title: 'Ledger Engine & Instant Transfers', description: 'Double-entry transactional ledger, automated clearing, and fraud detection.', color: 'emerald', order: 2 },
      { id: `epic-${timestamp}-3`, title: 'Real-Time Portfolio & Yield Tracking', description: 'Interactive net worth visualization, dividend alerts, and tax reporting.', color: 'amber', order: 3 }
    ];
    stories = [
      {
        id: `STORY-${timestamp}-01`,
        epicId: `epic-${timestamp}-1`,
        title: '3-Minute Automated ID & Selfie KYC Verification',
        persona: 'Prospective Investor',
        action: 'scan government ID and snap a selfie using my smartphone camera',
        value: 'I get approved to fund my account in minutes instead of waiting 3 business days',
        priority: 'must',
        status: 'todo',
        size: 'M',
        points: 5,
        acceptanceCriteria: [
          { id: `ac-${timestamp}-1`, given: 'A new user on the verification step', when: 'They upload ID front/back and complete liveness check', then: 'Persona/Veriff webhook verifies document authenticity and updates KYC status to approved.', completed: false }
        ],
        technicalTasks: [
          { id: `t-${timestamp}-1`, title: 'Integrate Persona or Plaid IDV embedded SDK', category: 'Frontend', completed: false },
          { id: `t-${timestamp}-2`, title: 'Build webhook receiver with HMAC signature verification', category: 'Backend', completed: false }
        ]
      },
      {
        id: `STORY-${timestamp}-02`,
        epicId: `epic-${timestamp}-2`,
        title: 'Double-Entry Ledger Account Settlement Engine',
        persona: 'Fintech Operations Officer',
        action: 'execute fund transfers with immutable double-entry journal entries',
        value: 'account balances are always mathematically reconciled with zero possibility of phantom funds',
        priority: 'must',
        status: 'todo',
        size: 'L',
        points: 8,
        acceptanceCriteria: [
          { id: `ac-${timestamp}-2`, given: 'A $500 transfer from checking to savings', when: 'Transaction executes', then: 'Debits exactly equal credits across ledger accounts inside an ACID database transaction.', completed: false }
        ],
        technicalTasks: [
          { id: `t-${timestamp}-3`, title: 'Architect double-entry journal table schema with strict check constraints', category: 'Database', completed: false },
          { id: `t-${timestamp}-4`, title: 'Implement idempotent transfer endpoint with unique idempotency keys', category: 'Backend', completed: false }
        ]
      }
    ];
  } else {
    // General high-quality startup product template customized to their prompt
    const cleanPrompt = promptText.length > 50 ? promptText.slice(0, 48) + '...' : promptText;
    epics = [
      {
        id: `epic-${timestamp}-1`,
        title: 'Core Platform & User Onboarding',
        description: `Foundation infrastructure, identity onboarding, and workspace setup for ${cleanPrompt}.`,
        color: 'indigo',
        order: 1
      },
      {
        id: `epic-${timestamp}-2`,
        title: 'Primary Value Proposition & Workflow',
        description: 'Core functional workflow enabling users to achieve their primary desired outcome.',
        color: 'emerald',
        order: 2
      },
      {
        id: `epic-${timestamp}-3`,
        title: 'Analytics, Sharing & Monetization',
        description: 'Team collaboration, metric tracking, and payment monetization tiers.',
        color: 'amber',
        order: 3
      }
    ];

    stories = [
      {
        id: `STORY-${timestamp}-01`,
        epicId: `epic-${timestamp}-1`,
        title: 'Frictionless First-Time Onboarding Experience',
        persona: 'Early Adopter Founder',
        action: 'complete a 3-step setup wizard tailored to our team goals',
        value: 'I can see immediate time-to-value within 90 seconds of registration',
        priority: 'must',
        status: 'todo',
        size: 'M',
        points: 5,
        acceptanceCriteria: [
          {
            id: `ac-${timestamp}-1`,
            given: 'A newly verified user completes sign-up',
            when: 'They navigate the 3-step intake wizard',
            then: 'Their workspace is pre-populated with starter templates matching their industry selection.',
            completed: false
          }
        ],
        technicalTasks: [
          { id: `t-${timestamp}-1`, title: 'Build responsive setup wizard with progress step indicator', category: 'Frontend', completed: false },
          { id: `t-${timestamp}-2`, title: 'Create default template seeding routine on user creation trigger', category: 'Backend', completed: false }
        ],
        notes: 'Track funnel conversion per step to optimize onboarding drop-off.'
      },
      {
        id: `STORY-${timestamp}-02`,
        epicId: `epic-${timestamp}-2`,
        title: 'Interactive Real-Time Workspace Canvas',
        persona: 'Active Product User',
        action: 'collaboratively edit, organize, and execute our core workflow in real-time',
        value: 'my team stays synchronized without having to refresh the page or lose uncommitted edits',
        priority: 'must',
        status: 'todo',
        size: 'L',
        points: 8,
        acceptanceCriteria: [
          {
            id: `ac-${timestamp}-2`,
            given: 'Multiple users collaborate on the same workspace',
            when: 'A user updates an item or status',
            then: 'Changes sync to all active sessions via WebSockets in under 150ms.',
            completed: false
          }
        ],
        technicalTasks: [
          { id: `t-${timestamp}-3`, title: 'Implement optimistic UI updates with automatic conflict resolution', category: 'Frontend', completed: false },
          { id: `t-${timestamp}-4`, title: 'Setup WebSocket broadcast channel with heartbeat reconnects', category: 'Backend', completed: false }
        ]
      },
      {
        id: `STORY-${timestamp}-03`,
        epicId: `epic-${timestamp}-2`,
        title: 'Intelligent Search & Multi-Tag Filtering',
        persona: 'Power User',
        action: 'filter by keyword, status tag, and priority with instant keyboard shortcut (/) navigation',
        value: 'I can locate critical items in seconds as our project backlog scales',
        priority: 'should',
        status: 'backlog',
        size: 'S',
        points: 3,
        acceptanceCriteria: [
          {
            id: `ac-${timestamp}-3`,
            given: 'A backlog with over 100 items',
            when: 'The user presses "/" and types a search keyword',
            then: 'Filtered results update under 16ms using client-side indexing.',
            completed: false
          }
        ],
        technicalTasks: [
          { id: `t-${timestamp}-5`, title: 'Build global command-palette search modal with keyboard navigation', category: 'Frontend', completed: false }
        ]
      },
      {
        id: `STORY-${timestamp}-04`,
        epicId: `epic-${timestamp}-3`,
        title: 'Team Export & Multi-Format Share Studio',
        persona: 'Product Manager',
        action: 'export our backlog to Jira CSV, Markdown, and JSON with 1 click',
        value: 'I can seamlessly bridge high-level product ideation into our engineering sprints',
        priority: 'should',
        status: 'backlog',
        size: 'M',
        points: 5,
        acceptanceCriteria: [
          {
            id: `ac-${timestamp}-4`,
            given: 'A complete product backlog',
            when: 'The user selects "Export to Jira CSV"',
            then: 'A formatted CSV file matching Jira Cloud import specifications is downloaded immediately.',
            completed: false
          }
        ],
        technicalTasks: [
          { id: `t-${timestamp}-6`, title: 'Implement client-side CSV and Markdown serialization engine', category: 'Frontend', completed: false }
        ]
      }
    ];
  }

  return {
    projectName,
    projectDescription: promptText,
    epics,
    stories
  };
}
