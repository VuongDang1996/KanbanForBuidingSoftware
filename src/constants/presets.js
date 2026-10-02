// Preset startup templates for instant backlog generation & testing

export const BACKLOG_PRESETS = [
  {
    id: 'coffee-sub',
    name: 'Artisanal Coffee Subscription',
    badge: 'D2C E-Commerce',
    icon: 'Coffee',
    description: 'Direct-to-consumer recurring coffee beans subscription with personalized taste quiz and roast tracking.',
    prompt: 'A personalized direct-to-consumer coffee bean subscription with a taste quiz, flexible interval deliveries, Stripe billing, and live roast date tracking.',
    epics: [
      {
        id: 'epic-auth',
        title: 'Authentication & Member Profiles',
        description: 'Customer onboarding, taste quiz preference profiling, and seamless authentication.',
        color: 'indigo',
        order: 1
      },
      {
        id: 'epic-sub',
        title: 'Subscription & Checkout',
        description: 'Flexible recurring delivery frequency, pouch sizing, Stripe billing, and pause controls.',
        color: 'emerald',
        order: 2
      },
      {
        id: 'epic-order',
        title: 'Order Management & Roast Tracking',
        description: 'Batch roasting status, dispatch notifications, QR origin tracing, and live tracking.',
        color: 'amber',
        order: 3
      }
    ],
    stories: [
      {
        id: 'STORY-101',
        epicId: 'epic-auth',
        title: 'Personalized Coffee Taste Quiz',
        persona: 'Specialty Coffee Enthusiast',
        action: 'take an interactive 4-step flavor profile quiz upon signing up',
        value: 'I receive tailored bean recommendations matching my roast preference and brew method',
        priority: 'must',
        status: 'done',
        size: 'M',
        points: 5,
        acceptanceCriteria: [
          {
            id: 'ac-1',
            given: 'A new user lands on onboarding',
            when: 'They complete the 4 steps (roast darkness, brew apparatus, tasting notes, frequency)',
            then: 'Their flavor vector is stored and top 3 matched single-origins are displayed.',
            completed: true
          }
        ],
        technicalTasks: [
          { id: 't-1', title: 'Build multi-step interactive quiz modal with smooth step transitions', category: 'Frontend', completed: true },
          { id: 't-2', title: 'Implement scoring heuristic matching user answers against roaster tasting profile database', category: 'Backend', completed: true },
          { id: 't-3', title: 'Create user_preferences schema in PostgreSQL with JSONB flavor vector', category: 'Database', completed: true }
        ],
        notes: 'Algorithm will compute weighted Euclidean distance against active single-origin inventory.'
      },
      {
        id: 'STORY-102',
        epicId: 'epic-auth',
        title: 'Passwordless Magic Link Sign-In',
        persona: 'Returning Customer',
        action: 'authenticate with a passwordless magic email link or Google One-Tap',
        value: 'I can quickly access my subscription portal without remembering complex passwords',
        priority: 'must',
        status: 'in-progress',
        size: 'S',
        points: 3,
        acceptanceCriteria: [
          {
            id: 'ac-2',
            given: 'A customer enters their registered email address',
            when: 'They submit the sign-in form',
            then: 'A cryptographically signed magic link is dispatched within 3 seconds, valid for 15 minutes.',
            completed: true
          }
        ],
        technicalTasks: [
          { id: 't-4', title: 'Configure transactional magic link template with signed JWT payload', category: 'Backend', completed: true },
          { id: 't-5', title: 'Build OTP / Magic link waiting screen with automatic tab polling', category: 'Frontend', completed: false }
        ],
        notes: 'Ensure deep linking works on mobile email apps.'
      },
      {
        id: 'STORY-201',
        epicId: 'epic-sub',
        title: 'Flexible Delivery Frequency Selector',
        persona: 'Daily Espresso Drinker',
        action: 'configure delivery frequency (every 1, 2, 3, or 4 weeks) and bag quantity',
        value: 'I never run out of freshly roasted beans or end up with stale surplus inventory',
        priority: 'must',
        status: 'in-progress',
        size: 'M',
        points: 5,
        acceptanceCriteria: [
          {
            id: 'ac-3',
            given: 'A customer configuring their subscription tier',
            when: 'They toggle between weekly, bi-weekly, or monthly intervals',
            then: 'The unit pricing, bundle discount, and projected next 3 roast dates update synchronously.',
            completed: true
          }
        ],
        technicalTasks: [
          { id: 't-6', title: 'Build interactive cadence slider and upcoming roast schedule calendar preview', category: 'Frontend', completed: true },
          { id: 't-7', title: 'Integrate Stripe Billing Subscription Schedules API with anchor dates', category: 'Backend', completed: false }
        ],
        notes: 'Anchor subscription billing 48 hours prior to the Tuesday morning small-batch roast cycle.'
      },
      {
        id: 'STORY-202',
        epicId: 'epic-sub',
        title: '1-Click Subscription Pause & Skip Cycle',
        persona: 'Traveling Member',
        action: 'skip my upcoming coffee delivery or pause subscription for up to 60 days',
        value: 'I can manage my coffee supply around travel without having to cancel my membership',
        priority: 'should',
        status: 'todo',
        size: 'S',
        points: 2,
        acceptanceCriteria: [
          {
            id: 'ac-4',
            given: 'A subscriber with an active renewal scheduled within 5 days',
            when: 'They click "Skip Next Dispatch" on their customer dashboard',
            then: 'The upcoming shipment is canceled with zero charge, and the renewal date advances.',
            completed: false
          }
        ],
        technicalTasks: [
          { id: 't-8', title: 'Create dashboard quick-action card with pause duration date-picker modal', category: 'Frontend', completed: false },
          { id: 't-9', title: 'Build atomic POST /api/subscriptions/:id/skip endpoint with rollback safeguards', category: 'Backend', completed: false }
        ],
        notes: 'Prevent skips when roaster batch is in "Roasting Today" status.'
      },
      {
        id: 'STORY-301',
        epicId: 'epic-order',
        title: 'Live Roast-to-Cup Roast Date Tracker',
        persona: 'Quality-Focused Consumer',
        action: 'track the exact roast date, roaster notes, and degassing status of my order',
        value: 'I know the optimal peak flavor window (day 7 to 21 post-roast) to begin brewing',
        priority: 'should',
        status: 'todo',
        size: 'L',
        points: 8,
        acceptanceCriteria: [
          {
            id: 'ac-5',
            given: 'An order has been packaged and roasted',
            when: 'The member views their order status page or scans pouch QR',
            then: 'A live timeline shows: Green Bean Sourcing -> Roasted (with date) -> Degassing -> Dispatched -> Out for Delivery.',
            completed: false
          }
        ],
        technicalTasks: [
          { id: 't-10', title: 'Implement animated timeline SVG component with degassing phase indicators', category: 'Frontend', completed: false },
          { id: 't-11', title: 'Create webhook ingestion endpoint for roastery ERP barcode scanner events', category: 'Backend', completed: false }
        ],
        notes: 'Ensure public provenance URL renders seamlessly without requiring login.'
      }
    ]
  },
  {
    id: 'saas-analytics',
    name: 'SaaS B2B Analytics Dashboard',
    badge: 'Enterprise B2B',
    icon: 'BarChart3',
    description: 'Multi-tenant telemetry, event stream ingestion, real-time conversion funnels, and alert notifications.',
    prompt: 'A modern B2B analytics platform for SaaS teams featuring event tracking SDK, customizable conversion funnels, role-based access control, and anomaly alert webhooks.',
    epics: [
      {
        id: 'epic-ingest',
        title: 'Data Ingestion & SDK Integration',
        description: 'Client-side event capture SDK, batched ingestion pipeline, and schema validation.',
        color: 'indigo',
        order: 1
      },
      {
        id: 'epic-viz',
        title: 'Funnel & Retention Analytics Studio',
        description: 'Interactive funnel visualizer, cohort retention heatmaps, and customizable dashboards.',
        color: 'cyan',
        order: 2
      },
      {
        id: 'epic-alerts',
        title: 'Anomaly Alerts & Slack/Webhook Dispatch',
        description: 'Automated statistical threshold alerts, webhook routing, and team notification channels.',
        color: 'violet',
        order: 3
      }
    ],
    stories: [
      {
        id: 'STORY-AN-1',
        epicId: 'epic-ingest',
        title: 'Lightweight Event Tracking Web SDK',
        persona: 'Frontend Engineer',
        action: 'drop a 4kb JavaScript snippet into our web application to track custom user events',
        value: 'our product team can capture page views and user interactions with zero noticeable latency hit',
        priority: 'must',
        status: 'done',
        size: 'M',
        points: 5,
        acceptanceCriteria: [
          {
            id: 'ac-an-1',
            given: 'The SDK script is loaded asynchronously on a host site',
            when: 'window.analytics.track("Signup Clicked", { plan: "Pro" }) is invoked',
            then: 'The event payload is compressed and queued in IndexedDB, then flushed in batched HTTP/2 POSTs.',
            completed: true
          }
        ],
        technicalTasks: [
          { id: 'tan-1', title: 'Bundle zero-dependency browser SDK with rollup (<5kb gzipped)', category: 'Frontend', completed: true },
          { id: 'tan-2', title: 'Build fast edge ingest gateway with Cloudflare Workers', category: 'Backend', completed: true }
        ],
        notes: 'Benchmark latency overhead to remain under 8ms.'
      },
      {
        id: 'STORY-AN-2',
        epicId: 'epic-ingest',
        title: 'Automatic Event Deduplication & Dead-Letter Queue',
        persona: 'Data Platform Engineer',
        action: 'ingest telemetry data through a Kafka stream with automated deduplication by event_id',
        value: 'our downstream dashboards show exact metrics even during network retries or client duplicates',
        priority: 'must',
        status: 'in-progress',
        size: 'L',
        points: 8,
        acceptanceCriteria: [
          {
            id: 'ac-an-2',
            given: 'A burst of 10,000 duplicate client events within 60 seconds',
            when: 'The ingestion processor consumes from Kafka',
            then: 'Redis Bloom filter catches duplicates and drops them without writing to ClickHouse.',
            completed: true
          }
        ],
        technicalTasks: [
          { id: 'tan-3', title: 'Implement Redis Bloom filter check in Kafka consumer worker', category: 'Backend', completed: true },
          { id: 'tan-4', title: 'Provision ClickHouse columnar table with ReplacingMergeTree engine', category: 'Database', completed: false }
        ],
        notes: 'Bloom filter sizing tuned for 50 million events with 0.1% false positive rate.'
      },
      {
        id: 'STORY-AN-3',
        epicId: 'epic-viz',
        title: 'Interactive Multi-Step Conversion Funnel Builder',
        persona: 'Growth Product Manager',
        action: 'construct a 5-step conversion funnel and segment drop-offs by device and campaign source',
        value: 'I can identify the highest friction point in our checkout flow and prioritize engineering fixes',
        priority: 'must',
        status: 'todo',
        size: 'L',
        points: 8,
        acceptanceCriteria: [
          {
            id: 'ac-an-3',
            given: 'A user creates a funnel with steps: Visited Pricing -> Clicked Free Trial -> Completed Registration',
            when: 'They click "Calculate Conversion"',
            then: 'ClickHouse windowFunnel query completes under 1.2s and renders an interactive sankey funnel chart.',
            completed: false
          }
        ],
        technicalTasks: [
          { id: 'tan-5', title: 'Develop responsive drag-and-drop funnel step reordering UI', category: 'Frontend', completed: false },
          { id: 'tan-6', title: 'Formulate vectorized ClickHouse SQL query using windowFunnel() function', category: 'Database', completed: false }
        ],
        notes: 'Include step-over time window slider (1 hour to 30 days).'
      },
      {
        id: 'STORY-AN-4',
        epicId: 'epic-alerts',
        title: 'Real-Time Anomaly Alert Webhooks & Slack Dispatch',
        persona: 'Head of Engineering',
        action: 'receive immediate Slack notifications when critical conversion rates drop below 3 standard deviations',
        value: 'we catch production payment breakages within 5 minutes instead of learning via customer support tickets',
        priority: 'should',
        status: 'backlog',
        size: 'M',
        points: 5,
        acceptanceCriteria: [
          {
            id: 'ac-an-4',
            given: 'Hourly conversion rate falls below 3-sigma anomaly threshold',
            when: 'Cron evaluator executes hourly rollups',
            then: 'A formatted Slack Block Kit alert is posted to #incident-room with direct funnel deep link.',
            completed: false
          }
        ],
        technicalTasks: [
          { id: 'tan-7', title: 'Build Slack OAuth 2.0 app installation and webhook test dispatcher', category: 'Backend', completed: false },
          { id: 'tan-8', title: 'Implement rolling z-score outlier detection algorithm in time-series worker', category: 'Backend', completed: false }
        ],
        notes: 'Rate limit alerts to max 1 notification per 30 minutes for the same metric.'
      }
    ]
  },
  {
    id: 'marketplace',
    name: 'Hyperlocal E-commerce Marketplace',
    badge: 'Multi-sided Market',
    icon: 'ShoppingBag',
    description: 'Local merchant storefronts, dynamic inventory sync, courier dispatch, and customer reviews.',
    prompt: 'A hyperlocal marketplace connecting neighborhood artisan merchants with local buyers, offering 2-hour courier dispatch, escrow payments, and live delivery GPS tracking.',
    epics: [
      {
        id: 'epic-merchant',
        title: 'Merchant Storefront & Catalog Sync',
        description: 'Vendor onboarding, fast product catalog management, and stock inventory alerts.',
        color: 'emerald',
        order: 1
      },
      {
        id: 'epic-checkout',
        title: 'Escrow Checkout & Split Payments',
        description: 'Multi-vendor shopping basket, Stripe Connect split payouts, and escrow release rules.',
        color: 'indigo',
        order: 2
      },
      {
        id: 'epic-dispatch',
        title: 'Local Courier Dispatch & Live GPS Tracker',
        description: 'Automated 2-hour delivery routing, courier driver app integration, and live map view.',
        color: 'amber',
        order: 3
      }
    ],
    stories: [
      {
        id: 'STORY-MK-1',
        epicId: 'epic-merchant',
        title: 'Mobile-Optimized Fast Item Listing Flow',
        persona: 'Local Bakery Owner',
        action: 'snap a photo on my phone and list a daily special item with price and stock in under 60 seconds',
        value: 'I can sell out morning pastries quickly without sitting at a desktop computer',
        priority: 'must',
        status: 'done',
        size: 'M',
        points: 5,
        acceptanceCriteria: [
          {
            id: 'ac-mk-1',
            given: 'A verified merchant on mobile web',
            when: 'They upload an item photo, set title "$6 Sourdough Loaf", and qty "20"',
            then: 'The item goes live immediately on neighborhood buyers feeds within 5km radius.',
            completed: true
          }
        ],
        technicalTasks: [
          { id: 'tmk-1', title: 'Build camera-first responsive upload widget with client image compression', category: 'Frontend', completed: true },
          { id: 'tmk-2', title: 'Store processed thumbnails on S3 with CloudFront CDN distribution', category: 'DevOps', completed: true }
        ],
        notes: 'Compress images to WebP format under 200KB before uploading.'
      },
      {
        id: 'STORY-MK-2',
        epicId: 'epic-checkout',
        title: 'Multi-Vendor Split Payment with Stripe Connect',
        persona: 'Shopper Buying from Multiple Merchants',
        action: 'check out items from 2 different neighborhood shops in a single payment transaction',
        value: 'I don’t have to enter my credit card twice or pay double transaction processing fees',
        priority: 'must',
        status: 'in-progress',
        size: 'L',
        points: 8,
        acceptanceCriteria: [
          {
            id: 'ac-mk-2',
            given: 'A customer cart containing items from Merchant A ($30) and Merchant B ($20)',
            when: 'The customer submits Apple Pay or Credit Card payment',
            then: 'Stripe Connect creates separate transfers to Merchant A and B minus platform commission (10%).',
            completed: false
          }
        ],
        technicalTasks: [
          { id: 'tmk-3', title: 'Implement Stripe Connect destination charges with platform fee split', category: 'Backend', completed: true },
          { id: 'tmk-4', title: 'Build multi-merchant item grouping summary in checkout modal', category: 'Frontend', completed: false }
        ],
        notes: 'Hold courier payout until proof-of-delivery signature is recorded.'
      },
      {
        id: 'STORY-MK-3',
        epicId: 'epic-dispatch',
        title: 'Live Courier Route Map & ETA Countdown',
        persona: 'Eager Customer Waiting for Goods',
        action: 'watch the courier vehicle location on an interactive map with live remaining minutes countdown',
        value: 'I know exactly when to step outside my building door to meet the delivery courier',
        priority: 'should',
        status: 'todo',
        size: 'M',
        points: 5,
        acceptanceCriteria: [
          {
            id: 'ac-mk-3',
            given: 'An order has been picked up by a courier',
            when: 'The customer opens their live tracking link',
            then: 'A Mapbox map updates vehicle coordinates every 10 seconds via WebSockets with dynamic polyline route.',
            completed: false
          }
        ],
        technicalTasks: [
          { id: 'tmk-5', title: 'Build Mapbox GL JS map component with custom vehicle marker and route polyline', category: 'Frontend', completed: false },
          { id: 'tmk-6', title: 'Setup WebSocket server on AWS API Gateway for low-latency coordinate pub/sub', category: 'DevOps', completed: false }
        ],
        notes: 'Throttle client coordinate broadcasting to preserve driver battery life.'
      }
    ]
  },
  {
    id: 'habit-tracker',
    name: 'Mobile Habit & Wellness Tracker',
    badge: 'Consumer Mobile/PWA',
    icon: 'Sparkles',
    description: 'Micro-journaling, streak accountability, gamified milestones, and wearable health metrics.',
    prompt: 'A sleek, gamified habit formation PWA with daily micro-checkins, streak milestone badges, social accountability circles, and dark-mode mindfulness statistics.',
    epics: [
      {
        id: 'epic-habits',
        title: 'Daily Habit Architecture & Streaks',
        description: 'Custom habit schedules, atomic micro-checkins, and streak multiplier calculations.',
        color: 'rose',
        order: 1
      },
      {
        id: 'epic-gamify',
        title: 'Milestone Badges & Gamified Rewards',
        description: 'Achievement unlocks, streak freeze items, and celebratory particle animations.',
        color: 'violet',
        order: 2
      },
      {
        id: 'epic-circles',
        title: 'Accountability Squads & Social Feeds',
        description: 'Private 5-person peer circles, gentle nudges, and shared group habit goals.',
        color: 'emerald',
        order: 3
      }
    ],
    stories: [
      {
        id: 'STORY-HB-1',
        epicId: 'epic-habits',
        title: '1-Tap Daily Habit Micro-Checkin Card',
        persona: 'Busy Daily Meditator',
        action: 'check off my morning 10-minute meditation with a single tap on my lockscreen or home dashboard',
        value: 'I maintain my daily routine effortlessly without getting distracted by complex menus',
        priority: 'must',
        status: 'done',
        size: 'S',
        points: 2,
        acceptanceCriteria: [
          {
            id: 'ac-hb-1',
            given: 'A habit scheduled for today',
            when: 'The user taps the circular checkbox',
            then: 'Haptic feedback vibrates, streak count increments by 1, and an optimistic UI checkmark triggers.',
            completed: true
          }
        ],
        technicalTasks: [
          { id: 'thb-1', title: 'Build animated habit checkbox with canvas confetti burst and Web Audio API chime', category: 'Frontend', completed: true },
          { id: 'thb-2', title: 'Implement offline-first sync engine with Dexie.js / IndexedDB', category: 'Frontend', completed: true }
        ],
        notes: 'Ensure 60fps micro-interaction on mid-range Android devices.'
      },
      {
        id: 'STORY-HB-2',
        epicId: 'epic-gamify',
        title: 'Streak Freeze Shield Protection Item',
        persona: 'Streak Protector',
        action: 'activate a "Streak Freeze" token if I miss a workout due to unexpected illness',
        value: 'my 45-day hard-earned streak does not reset to zero, keeping my motivation intact',
        priority: 'should',
        status: 'in-progress',
        size: 'M',
        points: 5,
        acceptanceCriteria: [
          {
            id: 'ac-hb-2',
            given: 'A user with a valid streak freeze token',
            when: 'A day lapses without any recorded habit completion',
            then: 'The system automatically consumes 1 freeze token and preserves the streak continuity.',
            completed: true
          }
        ],
        technicalTasks: [
          { id: 'thb-3', title: 'Build streak recovery calculation algorithm considering timezone boundaries', category: 'Backend', completed: true },
          { id: 'thb-4', title: 'Design celebratory milestone unlock modal with 3D canvas badge rendering', category: 'Frontend', completed: false }
        ],
        notes: 'Cap free users to 1 streak freeze per month.'
      },
      {
        id: 'STORY-HB-3',
        epicId: 'epic-circles',
        title: '5-Person Accountability Squad Pulse',
        persona: 'Social Habit Builder',
        action: 'join a private 5-person squad and see real-time check-in pulses from my teammates',
        value: 'peer accountability keeps me consistent when personal willpower is low',
        priority: 'could',
        status: 'todo',
        size: 'L',
        points: 8,
        acceptanceCriteria: [
          {
            id: 'ac-hb-3',
            given: 'A member of a 5-person squad',
            when: 'Another squad member completes their morning habit',
            then: 'A subtle avatar glow pulses on the dashboard with a 1-tap "High Five" reaction button.',
            completed: false
          }
        ],
        technicalTasks: [
          { id: 'thb-5', title: 'Setup Supabase Realtime channel for squad presence and emoji reactions', category: 'Backend', completed: false },
          { id: 'thb-6', title: 'Build squad member avatar strip with completion progress rings', category: 'Frontend', completed: false }
        ],
        notes: 'Keep squad size strictly capped at 5 for maximum psychological intimacy.'
      }
    ]
  },
  {
    id: 'pronunciation-coach',
    name: 'AI Speech & Pronunciation Coach',
    badge: 'EdTech & AI Speech',
    icon: 'Mic',
    description: 'Real-time phoneme-level GOP scoring, pitch contour overlays, minimal pair audio drills, and interactive mouth placement guides.',
    prompt: 'A real-time AI speech and pronunciation website featuring phoneme-level GOP assessment, interactive mouth & tongue placement cross-sections, minimal pair listening/speaking drills, pitch contour visualizers, and SM-2 spaced repetition mistake review.',
    epics: [
      {
        id: 'epic-speech-engine',
        title: 'Speech Ingestion & Phoneme Assessment (GOP)',
        description: 'High-fidelity audio streaming, client-side noise cancellation, and phoneme-level Goodness of Pronunciation (GOP) scoring.',
        color: 'indigo',
        order: 1
      },
      {
        id: 'epic-articulation',
        title: 'IPA Articulation & Minimal Pair Training',
        description: 'Interactive International Phonetic Alphabet soundboard, 3D anatomical tongue placement, and minimal pair contrast drills.',
        color: 'emerald',
        order: 2
      },
      {
        id: 'epic-prosody',
        title: 'Pitch Contour & Native Waveform Shadowing',
        description: 'Visual pitch intonation overlay, syllable stress cadence detector, and dual audio comparison.',
        color: 'amber',
        order: 3
      },
      {
        id: 'epic-spaced-rep',
        title: 'Smart Mistake Bank & Spaced Repetition Review',
        description: 'Automated error collection, personalized SM-2 flashcard drills, and dialect/accent target switcher.',
        color: 'violet',
        order: 4
      }
    ],
    stories: [
      {
        id: 'PRON-101',
        epicId: 'epic-speech-engine',
        title: 'Phoneme-Level Scoring & Color-Coded Error Highlighting',
        persona: 'Non-Native English Learner',
        action: 'read a target sentence aloud and see my pronunciation scored sound-by-sound with colored phoneme highlights',
        value: 'I know exactly which consonant or vowel sound I mispronounced instead of guessing from a generic score',
        priority: 'must',
        status: 'done',
        size: 'L',
        points: 8,
        acceptanceCriteria: [
          {
            id: 'ac-pron-1',
            given: 'A user records audio for the sentence "The weather is extraordinary"',
            when: 'Speech is processed by the GOP acoustic model',
            then: 'Each word breaks down into phonemes colored Green (score >= 85), Yellow (60-84), or Red (< 60).',
            completed: true
          },
          {
            id: 'ac-pron-2',
            given: 'A mispronounced phoneme badge',
            when: 'The user taps that red phoneme badge',
            then: 'A tooltip reveals the detected substitution (e.g. "Heard /d/ instead of /ð/") with a native audio sample.',
            completed: true
          }
        ],
        technicalTasks: [
          { id: 't-pron-1', title: 'Build interactive sentence token component with phoneme hover tooltips and color heatmaps', category: 'Frontend', completed: true },
          { id: 't-pron-2', title: 'Integrate Azure Speech Assessment / Kaldi Wav2Vec2 GOP phoneme alignment API', category: 'Backend', completed: true },
          { id: 't-pron-3', title: 'Store phoneme score distribution vectors in user_speech_records table', category: 'Database', completed: true }
        ],
        notes: 'Target latency under 800ms for sentences up to 12 words.'
      },
      {
        id: 'PRON-102',
        epicId: 'epic-speech-engine',
        title: 'Client-Side Noise Cancellation & AudioWorklet Ingestion',
        persona: 'Learner in a Noisy Room / Coffee Shop',
        action: 'record speech with real-time background noise suppression and automatic voice activity detection (VAD)',
        value: 'ambient background noise does not corrupt my phoneme accuracy score',
        priority: 'must',
        status: 'done',
        size: 'M',
        points: 5,
        acceptanceCriteria: [
          {
            id: 'ac-pron-3',
            given: 'User speaks into microphone with up to 55dB ambient background noise',
            when: 'Web Audio API RNNoise / WebRTC AGC filters input',
            then: 'Background hiss is suppressed and volume is normalized to -16 LUFS.',
            completed: true
          },
          {
            id: 'ac-pron-4',
            given: 'The speaker pauses for 1.5 seconds',
            when: 'Silence threshold is exceeded',
            then: 'The recorder automatically cuts and dispatches the audio buffer.',
            completed: true
          }
        ],
        technicalTasks: [
          { id: 't-pron-4', title: 'Implement AudioWorkletProcessor streaming 16kHz mono linear PCM', category: 'Frontend', completed: true },
          { id: 't-pron-5', title: 'Integrate WebAssembly Silero VAD for instant voice boundary detection', category: 'Frontend', completed: true }
        ],
        notes: 'Validate cross-browser microphone permissions and latency on Safari iOS and Chrome Android.'
      },
      {
        id: 'PRON-201',
        epicId: 'epic-articulation',
        title: 'Interactive 3D/SVG Mouth & Tongue Placement Visualizer',
        persona: 'Visual Learner Struggling with Hard Consonants',
        action: 'view an animated cross-section diagram of the mouth showing tongue, palate, and vocal cord vibration for any phonetic sound',
        value: 'I understand the physical mechanics required to produce unfamiliar sounds like the American /r/ or voiced /th/',
        priority: 'should',
        status: 'in-progress',
        size: 'L',
        points: 8,
        acceptanceCriteria: [
          {
            id: 'ac-pron-5',
            given: 'A user selects any phoneme from the IPA soundboard (e.g. /θ/)',
            when: 'The articulation drawer opens',
            then: 'An interactive SVG cross-section animates tongue tip placement between teeth, airflow arrows, and unvoiced vocal cord indicator.',
            completed: true
          },
          {
            id: 'ac-pron-6',
            given: 'Step-by-step guidance mode',
            when: 'User clicks "How to position"',
            then: '3 clear bullet points explain lip shape, tongue height, and breath release.',
            completed: false
          }
        ],
        technicalTasks: [
          { id: 't-pron-6', title: 'Create responsive SVG mouth cross-section animation library with slider scrubbing', category: 'Frontend', completed: true },
          { id: 't-pron-7', title: 'Compile IPA phoneme metadata map (manner of articulation, place, voicing)', category: 'Frontend', completed: true },
          { id: 't-pron-8', title: 'Serve high-bitrate studio reference audio files for all 44 English phonemes', category: 'Backend', completed: false }
        ],
        notes: 'Include slow-motion (0.5x) animation toggle for complex diphthongs.'
      },
      {
        id: 'PRON-202',
        epicId: 'epic-articulation',
        title: 'Dynamic Minimal Pairs Listening & Speaking Challenge',
        persona: 'ESL Student Confusing Similar Sounds',
        action: 'practice minimal pair listening contrasts (e.g. "sheep" vs "ship", "think" vs "sink") and record both to verify separation',
        value: 'I train my ear and vocal muscles to distinguish subtle phonemic contrasts that change word meaning',
        priority: 'must',
        status: 'in-progress',
        size: 'M',
        points: 5,
        acceptanceCriteria: [
          {
            id: 'ac-pron-7',
            given: 'A minimal pair drill (/iː/ vs /ɪ/)',
            when: 'The system plays a random audio clip',
            then: 'The user selects which word they heard, receiving instant auditory feedback.',
            completed: true
          },
          {
            id: 'ac-pron-8',
            given: 'The speaking round',
            when: 'The user pronounces both target words',
            then: 'The acoustic model computes phonetic distance and verifies whether vowel formant frequencies (F1/F2) are properly differentiated.',
            completed: false
          }
        ],
        technicalTasks: [
          { id: 't-pron-9', title: 'Build gamified 2-choice rapid listening card with audio waveform preview', category: 'Frontend', completed: true },
          { id: 't-pron-10', title: 'Create phonetic vowel formant comparison service calculating F1/F2 Euclidean delta', category: 'Backend', completed: false },
          { id: 't-pron-11', title: 'Seed relational table minimal_pairs with 200 high-frequency confusion pairs', category: 'Database', completed: false }
        ],
        notes: 'Prioritize pairs most commonly confused by native speakers of Spanish, Mandarin, Japanese, and Vietnamese.'
      },
      {
        id: 'PRON-301',
        epicId: 'epic-prosody',
        title: 'Dual Pitch Contour & Native Waveform Overlay Visualizer',
        persona: 'Advanced Speaker with Flat Intonation',
        action: 'see my voice pitch curve (F0 frequency) overlaid directly on top of the native speaker pitch contour line',
        value: 'I can see where my sentence intonation rises, falls, or sounds monotone compared to native English cadence',
        priority: 'must',
        status: 'todo',
        size: 'L',
        points: 8,
        acceptanceCriteria: [
          {
            id: 'ac-pron-9',
            given: 'A shadowing practice sentence',
            when: 'The user completes their recording',
            then: 'A synchronized dual Canvas chart renders Native Pitch (blue line) and Learner Pitch (gold line) aligned via Dynamic Time Warping (DTW).',
            completed: false
          },
          {
            id: 'ac-pron-10',
            given: 'A question with rising terminal intonation',
            when: 'The user ends with flat or falling pitch',
            then: 'An intonation alert badge highlights "Try rising pitch at the sentence end".',
            completed: false
          }
        ],
        technicalTasks: [
          { id: 't-pron-12', title: 'Build HTML5 Canvas Dynamic Time Warping pitch visualizer component', category: 'Frontend', completed: false },
          { id: 't-pron-13', title: 'Implement CREPE / YIN pitch tracking algorithm extracting fundamental frequency (F0) frames', category: 'Backend', completed: false },
          { id: 't-pron-14', title: 'Optimize pitch extraction worker to complete within 350ms of audio arrival', category: 'DevOps', completed: false }
        ],
        notes: 'Normalize pitch curves to semitones relative to each speaker median F0 to account for gender pitch differences.'
      },
      {
        id: 'PRON-302',
        epicId: 'epic-prosody',
        title: 'Syllable Stress & Rhythm Cadence Evaluator',
        persona: 'Professional Preparing for Global Presentations',
        action: 'receive instant feedback on whether I stressed the correct syllables in multi-syllabic business words (e.g. pho-TO-gra-phy vs PHO-to-graph)',
        value: 'I avoid sounding unnatural or being misunderstood during international executive meetings',
        priority: 'should',
        status: 'todo',
        size: 'M',
        points: 5,
        acceptanceCriteria: [
          {
            id: 'ac-pron-11',
            given: 'The word "PHO-TO-GRA-PHY"',
            when: 'The user speaks',
            then: 'The system measures relative loudness (intensity in dB) and duration (ms) of each syllable.',
            completed: false
          },
          {
            id: 'ac-pron-12',
            given: 'The user places primary stress on the 1st syllable instead of the 2nd',
            when: 'Evaluated',
            then: 'The incorrect syllable is flagged with an auditory replay of the correct stress pattern.',
            completed: false
          }
        ],
        technicalTasks: [
          { id: 't-pron-15', title: 'Syllable pulse visualizer showing relative height and duration bars', category: 'Frontend', completed: false },
          { id: 't-pron-16', title: 'CMU Pronouncing Dictionary lookup for primary (1), secondary (2), and unstressed (0) patterns', category: 'Backend', completed: false }
        ],
        notes: 'Include audio speed control (0.75x slow motion playback).'
      },
      {
        id: 'PRON-401',
        epicId: 'epic-spaced-rep',
        title: 'Smart Mistake Bank with SM-2 Spaced Repetition Review',
        persona: 'Dedicated Daily Learner',
        action: 'have my recurring pronunciation errors automatically saved to a personalized review queue that schedules review based on memory retention',
        value: 'I spend practice time only on the specific sounds I struggle with instead of re-practicing sounds I have already mastered',
        priority: 'should',
        status: 'backlog',
        size: 'M',
        points: 5,
        acceptanceCriteria: [
          {
            id: 'ac-pron-13',
            given: 'Any user session where a phoneme scores below 65%',
            when: 'The session ends',
            then: 'That phoneme and sentence context are added to the user active Mistake Bank.',
            completed: false
          },
          {
            id: 'ac-pron-14',
            given: 'The daily dashboard with due review cards',
            when: 'User launches "Daily 5-Minute Fix"',
            then: 'A queue is generated using SuperMemo SM-2 intervals (1 day, 3 days, 7 days, 16 days).',
            completed: false
          }
        ],
        technicalTasks: [
          { id: 't-pron-17', title: 'Implement SM-2 spaced repetition scheduler service calculating interval and ease factor', category: 'Backend', completed: false },
          { id: 't-pron-18', title: 'Build rapid swipe review modal with record & instant retry buttons', category: 'Frontend', completed: false },
          { id: 't-pron-19', title: 'Create table mistake_bank_items with score history and next_review_at indices', category: 'Database', completed: false }
        ],
        notes: 'Auto-graduate phonemes that maintain score >= 85% across 3 consecutive reviews.'
      },
      {
        id: 'PRON-402',
        epicId: 'epic-spaced-rep',
        title: 'CEFR Dialect & Accent Target Switcher (US / UK / AUS)',
        persona: 'Immigrant Relocating to the United Kingdom',
        action: 'switch my target accent profile between General American (GA), British Received Pronunciation (RP), and Australian (AU)',
        value: 'I receive phoneme assessment calibrated specifically to the regional dialect of the country I am moving to',
        priority: 'could',
        status: 'backlog',
        size: 'S',
        points: 3,
        acceptanceCriteria: [
          {
            id: 'ac-pron-15',
            given: 'A user changes Target Dialect to British RP',
            when: 'They practice words with non-rhoticity (e.g. "car", "water")',
            then: 'Non-rhotic vowel elongation is scored as correct and American rhotic /r/ is not penalized.',
            completed: false
          },
          {
            id: 'ac-pron-16',
            given: 'Accent switch',
            when: 'Sample audio plays',
            then: 'Native British audio models and phonetic transcriptions are loaded.',
            completed: false
          }
        ],
        technicalTasks: [
          { id: 't-pron-20', title: 'Profile dialect toggle pill with flag indicators in account settings', category: 'Frontend', completed: false },
          { id: 't-pron-21', title: 'Dynamic acoustic dictionary lookup routing to dialect-specific phonetic models', category: 'Backend', completed: false }
        ],
        notes: 'Include IPA transcript comparison between General American vs British RP.'
      }
    ]
  }
];
