export interface ProjectReview {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar?: string;
  rating: number;
  date: string;
  comment: string;
}

export interface ProjectSpecification {
  label: string;
  value: string;
  badge?: string;
}

export interface ProjectListingItem {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: "Engineering" | "FinTech" | "Cloud/DevOps" | "Product";
  price: string;
  date: string;
  rating: number;
  reviewsCount: number;
  location: string;
  teamSize: string;
  sprintVelocity: string;
  image: string;
  galleryImages: {
    url: string;
    caption: string;
  }[];
  specifications: ProjectSpecification[];
  deliverables: string[];
  techStack: string[];
  reviews: ProjectReview[];
  relatedProjectIds: string[];
}

export const projectsData: ProjectListingItem[] = [
  {
    id: "sf-p1",
    title: "Enterprise Microservices v2",
    shortDescription:
      "Distributed event-driven architecture migration with Kafka pipelines and zero downtime.",
    fullDescription:
      "A complete modernization of monolithic enterprise backend systems into highly scalable, distributed microservices. Features Apache Kafka event streaming, Docker containerized service boundaries, and Kubernetes orchestration across multi-region AWS infrastructure. Built with automated zero-downtime database migration scripts, circuit breakers, and end-to-end distributed tracing.",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&auto=format&fit=crop&q=80",
    category: "Engineering",
    price: "$38,000",
    date: "Dec 15, 2026",
    rating: 4.9,
    reviewsCount: 52,
    location: "San Francisco, CA (Remote)",
    teamSize: "8 Engineers (3 Backend, 2 Platform, 2 QA, 1 PM)",
    sprintVelocity: "56 SP / 2-week sprint",
    galleryImages: [
      {
        url: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&auto=format&fit=crop&q=80",
        caption: "Distributed Architecture Infrastructure Cluster",
      },
      {
        url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80",
        caption: "Real-time Telemetry & Service Health Dashboard",
      },
      {
        url: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=1200&auto=format&fit=crop&q=80",
        caption: "Cross-Squad Sprint Planning & Task Dependency Graph",
      },
      {
        url: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=1200&auto=format&fit=crop&q=80",
        caption: "GitOps CI/CD Automated Canary Deployment Pipeline",
      },
    ],
    specifications: [
      {
        label: "Total Sprint Budget",
        value: "$38,000 USD",
        badge: "Fixed Milestone",
      },
      {
        label: "Target Release Date",
        value: "Dec 15, 2026",
        badge: "On Track",
      },
      { label: "Primary Architecture", value: "Event-Driven Microservices" },
      { label: "Cloud Provider", value: "AWS EKS (Multi-AZ)" },
      { label: "Message Broker", value: "Apache Kafka v3.6" },
      { label: "Database Layer", value: "PostgreSQL 16 + Redis Cluster" },
      { label: "Code Test Coverage", value: "96.4% Unit & Integration" },
      { label: "Security Standard", value: "SOC2 Type II & ISO 27001" },
    ],
    deliverables: [
      "Zero-downtime database cutover with dual-write synchronization",
      "Event bus streaming cluster with automated partition balancing",
      "API gateway reverse proxy with rate limiting and JWT auth",
      "Prometheus & Grafana distributed observability stack",
      "Automated load testing harness certifying 25,000 req/sec",
    ],
    techStack: [
      "TypeScript",
      "Node.js",
      "Kafka",
      "PostgreSQL",
      "Docker",
      "Kubernetes",
      "Redis",
      "AWS",
    ],
    reviews: [
      {
        id: "rev-101",
        name: "David Kim",
        role: "VP of Engineering",
        company: "OmniTech Solutions",
        rating: 5,
        date: "Oct 14, 2026",
        comment:
          "The migration was executed without a single second of unexpected downtime. SprintFlow's sprint tracking kept all 8 engineers perfectly aligned across time zones.",
      },
      {
        id: "rev-102",
        name: "Elena Rostova",
        role: "Principal Architect",
        company: "ScaleGrid Cloud",
        rating: 5,
        date: "Sep 29, 2026",
        comment:
          "Clear specifications and impeccable Kafka streaming pipelines. The telemetry monitoring and burndown charts were game changers.",
      },
      {
        id: "rev-103",
        name: "Marcus Vance",
        role: "DevOps Director",
        company: "Apex Global",
        rating: 4.8,
        date: "Sep 12, 2026",
        comment:
          "High code quality, comprehensive documentation, and proactive blocker alerts. Highly recommend this workspace template.",
      },
    ],
    relatedProjectIds: ["sf-p3", "sf-p5", "sf-p8"],
  },
  {
    id: "sf-p2",
    title: "NextGen Mobile Banking App",
    shortDescription:
      "Biometric authentication, multi-currency wallets, and instant Stripe payment orchestration.",
    fullDescription:
      "A hyper-secure, native-speed financial mobile application supporting multi-currency digital accounts, biometric verification, instant peer-to-peer transfers, and credit scoring algorithms. Features real-time push notifications, end-to-end payload encryption, and automated fraud heuristic detection.",
    image:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&auto=format&fit=crop&q=80",
    category: "FinTech",
    price: "$45,000",
    date: "Nov 30, 2026",
    rating: 5.0,
    reviewsCount: 68,
    location: "New York, NY",
    teamSize: "6 Engineers · 2 UI Designers",
    sprintVelocity: "48 SP / sprint",
    galleryImages: [
      {
        url: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&auto=format&fit=crop&q=80",
        caption: "Mobile Banking Dashboard & Wallet Interface",
      },
      {
        url: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=1200&auto=format&fit=crop&q=80",
        caption: "Stripe Billing & Transaction Ledger Analytics",
      },
      {
        url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80",
        caption: "Real-time Fraud Detection & Risk Scoring Feed",
      },
    ],
    specifications: [
      {
        label: "Total Sprint Budget",
        value: "$45,000 USD",
        badge: "Milestone Contract",
      },
      {
        label: "Target Release Date",
        value: "Nov 30, 2026",
        badge: "In Review",
      },
      { label: "Platform Compatibility", value: "iOS, Android & Mobile Web" },
      { label: "Security Clearance", value: "PCI-DSS Level 1 & SOC2" },
      { label: "Payment Gateway", value: "Stripe Custom Connect" },
      {
        label: "Ledger Database",
        value: "PostgreSQL with Immutable Audit Logs",
      },
      { label: "Biometric Standard", value: "FaceID & WebAuthn / FIDO2" },
      { label: "Test Coverage", value: "98.2% Comprehensive Suite" },
    ],
    deliverables: [
      "Stripe payment gateway integration with 3D Secure 2.0",
      "PCI-DSS compliance verified architecture & security review",
      "Multi-currency conversion engine with live forex webhooks",
      "Automated biometric sign-in flow with hardware enclave tokens",
      "End-to-end Cypress & Detox mobile automation test suite",
    ],
    techStack: [
      "React Native",
      "TypeScript",
      "Node.js",
      "Stripe",
      "PostgreSQL",
      "Tailwind CSS",
    ],
    reviews: [
      {
        id: "rev-201",
        name: "Sarah Jenkins",
        role: "Chief Product Officer",
        company: "PayStream Financial",
        rating: 5,
        date: "Oct 16, 2026",
        comment:
          "Incredible attention to financial security and UX responsiveness. The sprint burndown charts kept executive stakeholders calm throughout.",
      },
      {
        id: "rev-202",
        name: "Carlos Gomez",
        role: "Head of Mobile",
        company: "NeoBank International",
        rating: 5,
        date: "Oct 02, 2026",
        comment:
          "The Stripe integration and biometric flows are ultra smooth. 10/10 execution quality.",
      },
    ],
    relatedProjectIds: ["sf-p6", "sf-p1", "sf-p7"],
  },
  {
    id: "sf-p3",
    title: "AI Real-Time Analytics Pipeline",
    shortDescription:
      "Streaming telemetry analysis, automated anomaly detection, and interactive Recharts dashboard.",
    fullDescription:
      "A modern streaming telemetry engine built for high-throughput sensor and web traffic analytics. Combines Kafka message streams, Apache Flink real-time transformation, vector embedding models for anomaly detection, and Next.js 16 interactive dashboards powered by Recharts.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80",
    category: "Cloud/DevOps",
    price: "$29,000",
    date: "Jan 12, 2027",
    rating: 4.8,
    reviewsCount: 39,
    location: "Austin, TX (Hybrid)",
    teamSize: "5 Data Engineers",
    sprintVelocity: "42 SP / sprint",
    galleryImages: [
      {
        url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80",
        caption: "Live Real-Time Telemetry & Heatmap Dashboard",
      },
      {
        url: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&auto=format&fit=crop&q=80",
        caption: "Cluster Node Ingestion & Buffer Queue",
      },
      {
        url: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=1200&auto=format&fit=crop&q=80",
        caption: "Cloud Deployment Infrastructure & Auto-Scaler",
      },
    ],
    specifications: [
      {
        label: "Total Sprint Budget",
        value: "$29,000 USD",
        badge: "Fixed Scope",
      },
      {
        label: "Target Release Date",
        value: "Jan 12, 2027",
        badge: "Active Sprint",
      },
      { label: "Streaming Framework", value: "Apache Flink + Kafka" },
      { label: "AI Anomaly Model", value: "Isolation Forest + Embeddings" },
      {
        label: "Frontend Visualization",
        value: "Next.js 16 + Recharts + Tailwind",
      },
      { label: "Throughput Capacity", value: "100,000 events / second" },
      { label: "Storage Engine", value: "ClickHouse + TimescaleDB" },
      { label: "Uptime SLA", value: "99.99% Guaranteed" },
    ],
    deliverables: [
      "Real-time streaming ingestion pipeline with dynamic backpressure",
      "Automated alerting webhook dispatch linking Slack & PagerDuty",
      "Interactive analytics web dashboards with custom time-bucket queries",
      "ClickHouse OLAP storage cluster setup with data retention policies",
    ],
    techStack: [
      "Python",
      "Apache Flink",
      "ClickHouse",
      "Next.js",
      "Recharts",
      "Kafka",
    ],
    reviews: [
      {
        id: "rev-301",
        name: "Arjun Nair",
        role: "Data Engineering Lead",
        company: "StreamSphere",
        rating: 5,
        date: "Oct 05, 2026",
        comment:
          "The ClickHouse query latencies dropped from 2 seconds to under 80 milliseconds. Brilliant engineering architecture.",
      },
    ],
    relatedProjectIds: ["sf-p1", "sf-p5", "sf-p8"],
  },
  {
    id: "sf-p4",
    title: "HIPAA Compliant Health Portal",
    shortDescription:
      "Patient records encryption, telehealth video rooms, and role-guarded physician consoles.",
    fullDescription:
      "A comprehensive digital health and clinical workspace built to exceed strict HIPAA and HITECH privacy standards. Enables secure doctor-patient messaging, WebRTC encrypted video consults, electronic health record (EHR) synchronization, and e-prescription fulfillment.",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&auto=format&fit=crop&q=80",
    category: "Product",
    price: "$52,000",
    date: "Dec 08, 2026",
    rating: 4.9,
    reviewsCount: 44,
    location: "Boston, MA",
    teamSize: "9 Fullstack Devs",
    sprintVelocity: "60 SP / sprint",
    galleryImages: [
      {
        url: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&auto=format&fit=crop&q=80",
        caption: "Physician Clinical Portal & Patient Health Record",
      },
      {
        url: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1200&auto=format&fit=crop&q=80",
        caption: "Telehealth WebRTC Encrypted Consultation Room",
      },
    ],
    specifications: [
      {
        label: "Total Sprint Budget",
        value: "$52,000 USD",
        badge: "Enterprise Plan",
      },
      {
        label: "Target Release Date",
        value: "Dec 08, 2026",
        badge: "Milestone 4",
      },
      { label: "Compliance Mandate", value: "HIPAA, HITECH, FDA SaMD" },
      { label: "Video Protocol", value: "WebRTC with AES-256 GCM" },
      { label: "EHR Interoperability", value: "HL7 / FHIR API Standards" },
      { label: "Audit Records", value: "Write-Once Read-Many (WORM)" },
    ],
    deliverables: [
      "Encrypted patient records vault compliant with HIPAA Security Rule",
      "WebRTC high-definition video consultation interface",
      "Automated audit trail logging for all physician chart accesses",
      "Role-based access control protecting clinical vs billing data",
    ],
    techStack: [
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "WebRTC",
      "Docker",
      "Tailwind CSS",
    ],
    reviews: [
      {
        id: "rev-401",
        name: "Dr. Rachel Sterling",
        role: "Chief Medical Information Officer",
        company: "Boston Health Network",
        rating: 5,
        date: "Oct 11, 2026",
        comment:
          "Passed our third-party HIPAA penetration audit on the first review. Doctors love the intuitive UI.",
      },
    ],
    relatedProjectIds: ["sf-p1", "sf-p2", "sf-p7"],
  },
  {
    id: "sf-p5",
    title: "Kubernetes Multi-Cluster Mesh",
    shortDescription:
      "Automated GitOps deployments, Istio service mesh routing, and Terraform provisioning.",
    fullDescription:
      "Enterprise Kubernetes infrastructure across AWS and GCP hybrid clouds. Employs Istio service mesh for mutual TLS (mTLS), ArgoCD for declarative GitOps delivery, and Terraform for reproducible infrastructure-as-code.",
    image:
      "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=1200&auto=format&fit=crop&q=80",
    category: "Cloud/DevOps",
    price: "$34,000",
    date: "Nov 22, 2026",
    rating: 4.9,
    reviewsCount: 31,
    location: "Seattle, WA (Remote)",
    teamSize: "4 DevOps Engineers",
    sprintVelocity: "38 SP / sprint",
    galleryImages: [
      {
        url: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=1200&auto=format&fit=crop&q=80",
        caption: "Kubernetes Multi-Cluster Traffic Routing Topology",
      },
      {
        url: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&auto=format&fit=crop&q=80",
        caption: "Istio Service Mesh mTLS Enforcement Status",
      },
    ],
    specifications: [
      {
        label: "Total Sprint Budget",
        value: "$34,000 USD",
        badge: "DevOps Sprint",
      },
      {
        label: "Target Release Date",
        value: "Nov 22, 2026",
        badge: "Deploy Ready",
      },
      {
        label: "Container Orchestrator",
        value: "Kubernetes v1.30 (EKS & GKE)",
      },
      { label: "Service Mesh", value: "Istio Ambient Mesh" },
      { label: "GitOps Engine", value: "ArgoCD v2.11" },
      { label: "IaC Automation", value: "Terraform + Terragrunt" },
    ],
    deliverables: [
      "Multi-region failover mesh with automatic DNS failover",
      "GitOps CI/CD with automated canary release verification",
      "Full mTLS zero-trust communication across all microservice pods",
    ],
    techStack: [
      "Kubernetes",
      "Istio",
      "Terraform",
      "ArgoCD",
      "Helm",
      "Go",
      "AWS",
      "GCP",
    ],
    reviews: [
      {
        id: "rev-501",
        name: "Liam O'Connor",
        role: "Staff Infrastructure Engineer",
        company: "CloudNative Labs",
        rating: 5,
        date: "Oct 08, 2026",
        comment:
          "The cleanest Istio ambient mesh setup we have witnessed. ArgoCD syncs are fast, secure, and bulletproof.",
      },
    ],
    relatedProjectIds: ["sf-p1", "sf-p3", "sf-p8"],
  },
  {
    id: "sf-p6",
    title: "SaaS Multi-Tenant Billing Hub",
    shortDescription:
      "Tiered subscription tiers, usage metering, automated invoices, and Stripe webhook sync.",
    fullDescription:
      "A complete monetization core for B2B SaaS applications. Features Stripe billing integration, metered API usage tracking, seat-based allocation, tax rate calculations, enterprise custom quotes, and automated invoice PDF generation.",
    image:
      "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=1200&auto=format&fit=crop&q=80",
    category: "FinTech",
    price: "$27,500",
    date: "Dec 20, 2026",
    rating: 4.8,
    reviewsCount: 57,
    location: "London, UK",
    teamSize: "5 Engineers",
    sprintVelocity: "44 SP / sprint",
    galleryImages: [
      {
        url: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=1200&auto=format&fit=crop&q=80",
        caption: "Billing Overview, Subscription Tiers & Revenue Growth",
      },
      {
        url: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&auto=format&fit=crop&q=80",
        caption: "Stripe Checkout & Customer Portal Management",
      },
    ],
    specifications: [
      { label: "Total Sprint Budget", value: "$27,500 USD", badge: "B2B SaaS" },
      {
        label: "Target Release Date",
        value: "Dec 20, 2026",
        badge: "In Progress",
      },
      { label: "Billing Engine", value: "Stripe Billing + Webhooks" },
      { label: "Tax Calculation", value: "Stripe Tax & VAT Automation" },
      { label: "Multi-Tenancy", value: "Row-Level Security (PostgreSQL RLS)" },
    ],
    deliverables: [
      "Tier-based quota management with automated seat upgrade prompts",
      "Stripe customer portal embed with self-service plan switching",
      "Automated tax, invoice dispatch, and dunning retry workflows",
    ],
    techStack: [
      "Next.js",
      "Stripe",
      "PostgreSQL",
      "Tailwind CSS",
      "Zod",
      "TypeScript",
    ],
    reviews: [
      {
        id: "rev-601",
        name: "Chloe Bennett",
        role: "Founder & CEO",
        company: "SaaSify Cloud",
        rating: 5,
        date: "Sep 25, 2026",
        comment:
          "Saves us over 40 engineering hours a month in manual invoice reconciliations. Stripe webhooks work reliably.",
      },
    ],
    relatedProjectIds: ["sf-p2", "sf-p1", "sf-p7"],
  },
  {
    id: "sf-p7",
    title: "Cross-Platform Design System 3.0",
    shortDescription:
      "Unified React, Tailwind, and React Native component tokens with full accessibility compliance.",
    fullDescription:
      "A world-class design system bridging design and engineering. Features design tokens synced from Figma, 60+ accessible headless components, dark/light theme tokens, and cross-platform support for web and mobile.",
    image:
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1200&auto=format&fit=crop&q=80",
    category: "Product",
    price: "$22,000",
    date: "Jan 05, 2027",
    rating: 5.0,
    reviewsCount: 63,
    location: "Toronto, Canada",
    teamSize: "4 Designers · 3 Devs",
    sprintVelocity: "35 SP / sprint",
    galleryImages: [
      {
        url: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1200&auto=format&fit=crop&q=80",
        caption: "Component Library Tokens & Typography Hierarchy",
      },
      {
        url: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=1200&auto=format&fit=crop&q=80",
        caption: "Interactive Storybook Component Showcase",
      },
    ],
    specifications: [
      {
        label: "Total Sprint Budget",
        value: "$22,000 USD",
        badge: "Design System",
      },
      {
        label: "Target Release Date",
        value: "Jan 05, 2027",
        badge: "Sprint 3",
      },
      { label: "Accessibility Level", value: "WCAG 2.1 AAA Compliant" },
      { label: "Documentation", value: "Storybook v8 + Zeroheight" },
      { label: "Platform Target", value: "React Web & React Native" },
    ],
    deliverables: [
      "Figma to code token sync pipeline via GitHub Actions",
      "WCAG 2.1 AAA accessibility audit certification",
      "Automated visual regression tests across 4 viewports",
    ],
    techStack: [
      "React",
      "Tailwind CSS",
      "Storybook",
      "TypeScript",
      "Radix UI",
      "Figma",
    ],
    reviews: [
      {
        id: "rev-701",
        name: "Kenji Sato",
        role: "Head of Design",
        company: "Studio Craft",
        rating: 5,
        date: "Oct 01, 2026",
        comment:
          "Reduced our product squad's frontend feature velocity time from 3 weeks to 4 days. Absolutely gorgeous tokens.",
      },
    ],
    relatedProjectIds: ["sf-p2", "sf-p4", "sf-p8"],
  },
  {
    id: "sf-p8",
    title: "Real-Time Collaborative Canvas",
    shortDescription:
      "WebSocket sync, conflict-free replicated data types (CRDTs), and multi-cursor presence.",
    fullDescription:
      "A multi-user collaborative canvas engine supporting sub-50ms cursor synchronization, real-time board manipulation, live chat, audio rooms, and conflict-free offline document merging using Yjs CRDT algorithms.",
    image:
      "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=1200&auto=format&fit=crop&q=80",
    category: "Engineering",
    price: "$41,000",
    date: "Dec 02, 2026",
    rating: 4.9,
    reviewsCount: 47,
    location: "Berlin, Germany (Remote)",
    teamSize: "7 Engineers",
    sprintVelocity: "52 SP / sprint",
    galleryImages: [
      {
        url: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=1200&auto=format&fit=crop&q=80",
        caption: "Real-Time Collaborative Multi-Cursor Canvas",
      },
      {
        url: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&auto=format&fit=crop&q=80",
        caption: "WebSocket Connection State & Memory Profiler",
      },
    ],
    specifications: [
      {
        label: "Total Sprint Budget",
        value: "$41,000 USD",
        badge: "Real-time",
      },
      {
        label: "Target Release Date",
        value: "Dec 02, 2026",
        badge: "Milestone 5",
      },
      { label: "CRDT Algorithm", value: "Yjs + Lib0" },
      { label: "Network Protocol", value: "WebSockets + WebRTC Fallback" },
      { label: "Broadcast Latency", value: "< 45ms P99 Worldwide" },
    ],
    deliverables: [
      "Sub-50ms multiplayer cursor broadcast with interpolation smoothing",
      "Offline sync with IndexedDB local persistence",
      "History undo/redo CRDT algorithm ensuring zero merge conflicts",
    ],
    techStack: ["TypeScript", "WebSockets", "Yjs", "React", "Node.js", "Redis"],
    reviews: [
      {
        id: "rev-801",
        name: "Lukas Weber",
        role: "CTO",
        company: "CollabSync GmbH",
        rating: 5,
        date: "Oct 15, 2026",
        comment:
          "The multi-cursor sync feels as instantaneous as Figma. Exceptional engineering under heavy network throttling.",
      },
    ],
    relatedProjectIds: ["sf-p1", "sf-p3", "sf-p7"],
  },
  {
    id: "sf-p9",
    title: "AI Vector Search & RAG Engine",
    shortDescription:
      "Enterprise knowledge base retriever with hybrid dense-sparse embeddings and sub-100ms vector index.",
    fullDescription:
      "High-throughput vector search pipeline integrating Qdrant, OpenAI and local Llama-3 embedding models. Features semantic reranking, hybrid BM25 lexical search, real-time chunking webhooks, and enterprise permission-scoped vector queries.",
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80",
    category: "Cloud/DevOps",
    price: "$36,000",
    date: "Dec 28, 2026",
    rating: 4.9,
    reviewsCount: 38,
    location: "San Francisco, CA (Remote)",
    teamSize: "5 ML Engineers · 2 Backend",
    sprintVelocity: "46 SP / sprint",
    galleryImages: [
      {
        url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80",
        caption: "Vector Similarity Latency & Reranking Distribution",
      },
      {
        url: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&auto=format&fit=crop&q=80",
        caption: "Embedding Chunking Pipeline & Qdrant Cluster",
      },
    ],
    specifications: [
      { label: "Total Sprint Budget", value: "$36,000 USD", badge: "AI Core" },
      {
        label: "Target Release Date",
        value: "Dec 28, 2026",
        badge: "Sprint 4",
      },
      { label: "Vector Database", value: "Qdrant Distributed" },
      { label: "Search Index", value: "HNSW + BM25 Hybrid" },
      { label: "Query Latency", value: "< 75ms P95 Worldwide" },
    ],
    deliverables: [
      "Sub-75ms vector similarity retrieval across 10 million documents",
      "Dynamic document ingestion pipeline with chunking and token budgeting",
      "Role-based vector access filtering honoring enterprise tenant boundaries",
    ],
    techStack: [
      "Python",
      "Qdrant",
      "FastAPI",
      "TypeScript",
      "Next.js",
      "Docker",
    ],
    reviews: [
      {
        id: "rev-901",
        name: "Siddharth Rao",
        role: "Head of AI Architecture",
        company: "Synthetix Labs",
        rating: 5,
        date: "Oct 12, 2026",
        comment:
          "The hybrid search recall benchmark jumped from 71% to 94.6%. The cleanest RAG workspace we have evaluated.",
      },
    ],
    relatedProjectIds: ["sf-p3", "sf-p1", "sf-p8"],
  },
  {
    id: "sf-p10",
    title: "Global Logistics & Route Dispatcher",
    shortDescription:
      "Automated fleet tracking, dynamic route re-calculation, and driver mobile dispatch app.",
    fullDescription:
      "Turnkey fleet orchestration and route optimization platform. Uses genetic pathfinding algorithms and live traffic APIs to cut delivery times by 28%. Features driver mobile app, automated dispatch triggers, and electronic bill of lading.",
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&auto=format&fit=crop&q=80",
    category: "Product",
    price: "$44,000",
    date: "Jan 18, 2027",
    rating: 4.8,
    reviewsCount: 29,
    location: "Chicago, IL",
    teamSize: "7 Engineers",
    sprintVelocity: "50 SP / sprint",
    galleryImages: [
      {
        url: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&auto=format&fit=crop&q=80",
        caption: "Fleet GPS Routing & Real-time ETA Telematics",
      },
    ],
    specifications: [
      {
        label: "Total Sprint Budget",
        value: "$44,000 USD",
        badge: "Enterprise Fleet",
      },
      {
        label: "Target Release Date",
        value: "Jan 18, 2027",
        badge: "Milestone 2",
      },
      { label: "Mapping Engine", value: "Mapbox GL + OSRM Routing" },
      { label: "Driver Mobile App", value: "React Native + Offline Storage" },
      { label: "ETA Accuracy", value: "97.4% Within 5-Minute Window" },
    ],
    deliverables: [
      "Dynamic routing engine re-optimizing live traffic deviations in under 2 seconds",
      "Offline-first driver mobile app with digital signature capture",
      "Dispatcher command console with real-time fleet map overlay",
    ],
    techStack: [
      "React Native",
      "Mapbox",
      "Go",
      "PostgreSQL",
      "Next.js",
      "Redis",
    ],
    reviews: [
      {
        id: "rev-1001",
        name: "Tyler Morrison",
        role: "VP of Logistics",
        company: "TransGlobal Freight",
        rating: 4.8,
        date: "Oct 09, 2026",
        comment:
          "Reduced our daily route fuel expenses by 18% in the first pilot week. Intuitive dispatcher UI.",
      },
    ],
    relatedProjectIds: ["sf-p1", "sf-p2", "sf-p7"],
  },
  {
    id: "sf-p11",
    title: "DeFi Liquidity & Staking Protocol",
    shortDescription:
      "Automated market maker smart contracts, gas-optimized vault yield aggregator, and real-time ledger.",
    fullDescription:
      "Decentralized liquidity pool and yield routing protocol written in Solidity and Vyper. Formally verified smart contracts with zero critical vulnerabilities in Trail of Bits audit. Features instant flash loan arbitrage protection and slippage mitigation.",
    image:
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1200&auto=format&fit=crop&q=80",
    category: "FinTech",
    price: "$49,000",
    date: "Dec 10, 2026",
    rating: 5.0,
    reviewsCount: 71,
    location: "Zurich, Switzerland (Remote)",
    teamSize: "4 Protocol Devs · 2 Security Auditors",
    sprintVelocity: "36 SP / sprint",
    galleryImages: [
      {
        url: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1200&auto=format&fit=crop&q=80",
        caption: "Smart Contract Gas Profiling & Liquidity Depth Chart",
      },
    ],
    specifications: [
      {
        label: "Total Sprint Budget",
        value: "$49,000 USD",
        badge: "Audited Vault",
      },
      {
        label: "Target Release Date",
        value: "Dec 10, 2026",
        badge: "Mainnet Staging",
      },
      { label: "Smart Contracts", value: "Solidity 0.8.24 + Foundry" },
      {
        label: "Audit Certification",
        value: "Formally Verified by Trail of Bits",
      },
      { label: "Supported Chains", value: "Ethereum, Arbitrum, Base" },
    ],
    deliverables: [
      "Gas-optimized AMM contract suite certified with 100% test branch coverage",
      "Interactive analytics dApp dashboard with wallet connection and live TVL",
      "Automated multisig emergency pause and timelock governance modules",
    ],
    techStack: [
      "Solidity",
      "Foundry",
      "TypeScript",
      "Next.js",
      "Wagmi",
      "Tailwind CSS",
    ],
    reviews: [
      {
        id: "rev-1101",
        name: "Christian Müller",
        role: "Lead Blockchain Architect",
        company: "Helvetia Digital Assets",
        rating: 5,
        date: "Oct 17, 2026",
        comment:
          "Zero vulnerabilities reported during audit. Gas optimization is among the best in the industry.",
      },
    ],
    relatedProjectIds: ["sf-p2", "sf-p6", "sf-p1"],
  },
  {
    id: "sf-p12",
    title: "IoT Edge Telemetry Gateway",
    shortDescription:
      "Embedded MQTT sensor broker, offline local buffering, and TLS 1.3 edge-to-cloud synchronization.",
    fullDescription:
      "Industrial internet-of-things (IoT) gateway firmware and cloud collector. Deployed on lightweight ARM64 edge gateways, ingesting Modbus, CAN-bus, and OPC-UA industrial sensors. Buffers data offline during factory disconnects and backfills with zero packet loss.",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop&q=80",
    category: "Engineering",
    price: "$31,500",
    date: "Jan 25, 2027",
    rating: 4.9,
    reviewsCount: 34,
    location: "Tokyo, Japan",
    teamSize: "5 Embedded Devs",
    sprintVelocity: "40 SP / sprint",
    galleryImages: [
      {
        url: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop&q=80",
        caption: "Industrial Sensor Stream & Factory Floor Telemetry",
      },
    ],
    specifications: [
      {
        label: "Total Sprint Budget",
        value: "$31,500 USD",
        badge: "Industrial IoT",
      },
      {
        label: "Target Release Date",
        value: "Jan 25, 2027",
        badge: "Pilot Testing",
      },
      { label: "Firmware Runtime", value: "Rust + Tokio Async Engine" },
      { label: "Industrial Protocols", value: "MQTT, Modbus TCP, OPC-UA" },
      { label: "Local Buffer", value: "SQLite Offline Queue (Up to 30 Days)" },
    ],
    deliverables: [
      "Ultra-low memory footprint (< 35MB RAM) gateway daemon running on Linux ARM64",
      "Automatic store-and-forward local buffering ensuring zero telemetry data drop",
      "Cloud ingestion endpoints scaling to 250,000 concurrent edge connections",
    ],
    techStack: [
      "Rust",
      "MQTT",
      "Docker",
      "TypeScript",
      "Next.js",
      "TimescaleDB",
    ],
    reviews: [
      {
        id: "rev-1201",
        name: "Kenzo Tanaka",
        role: "Director of Smart Manufacturing",
        company: "Nippon Automation Systems",
        rating: 5,
        date: "Oct 06, 2026",
        comment:
          "Flawless reliability across our 4 automotive assembly factories. The Rust daemon never crashed once.",
      },
    ],
    relatedProjectIds: ["sf-p1", "sf-p3", "sf-p5"],
  },
];

export function getProjectById(id: string): ProjectListingItem | undefined {
  return projectsData.find((p) => p.id === id);
}

export function getRelatedProjects(
  project: ProjectListingItem,
): ProjectListingItem[] {
  return projectsData.filter((p) => project.relatedProjectIds.includes(p.id));
}
