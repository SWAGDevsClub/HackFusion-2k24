export const problemStatementsData = [
  {
    id: 'web3',
    trackName: 'WEB3',
    title: 'DECENTRALIZED REALM GOVERNANCE',
    shortDescription: 'Construct a trustless voting and treasury protocol for on-chain guilds. Enable transparent ballot execution, cryptographic token staking, and fraud-proof community-driven decision pipelines.',
    fullContext: [
      'Decentralized Autonomous Organizations and on-chain guilds struggle with voter apathy, plutocratic token-weighted governance, and vulnerable treasury management protocols. In open virtual metaverses, decisions require both democratic consensus and automated cryptographic enforcement to protect community assets from rogue manipulation.',
      'Hackfusion participants are tasked with architecting a verifiable, tamper-resistant realm governance protocol. The system must coordinate quadratic voting mechanisms, time-locked multi-sig escrow vaults, and verifiable on-chain proposal execution for multi-tiered autonomous organizations.'
    ],
    requirements: [
      'Smart contracts implementing sybil-resistant quadratic voting ballots',
      'Time-locked treasury execution vault requiring multi-signature threshold authorization',
      'On-chain delegation framework with liquid voting power mechanics',
      'Interactive frontend portal showing active ballots, quorum progress, and treasury balances',
      'Verifiable audit trail logging proposal status and cryptographic execution proofs'
    ],
    techStack: [
      'Solidity',
      'Ethereum / Polygon',
      'Ethers.js / Viem',
      'IPFS / Arweave',
      'The Graph',
      'OpenZeppelin'
    ],
    evaluationRubric: [
      { label: 'Innovation & Mechanism Design', percentage: '30%' },
      { label: 'Technical Execution & Smart Contract Security', percentage: '30%' },
      { label: 'Feasibility & Architecture Scalability', percentage: '20%' },
      { label: 'UI/UX & Presentation Quality', percentage: '20%' }
    ],
    image: (
      <svg width="80" height="80" viewBox="0 0 16 16" shapeRendering="crispEdges">
        <rect x="6" y="2" width="4" height="1" fill="#FFFFFF" />
        <rect x="4" y="3" width="2" height="1" fill="#FFFFFF" />
        <rect x="6" y="3" width="4" height="1" fill="#55FFFF" />
        <rect x="10" y="3" width="2" height="1" fill="#00AAAA" />
        <rect x="3" y="4" width="1" height="2" fill="#FFFFFF" />
        <rect x="4" y="4" width="2" height="2" fill="#55FFFF" />
        <rect x="6" y="4" width="4" height="2" fill="#00AAAA" />
        <rect x="10" y="4" width="2" height="2" fill="#00AAAA" />
        <rect x="12" y="4" width="1" height="2" fill="#005555" />
        <rect x="2" y="6" width="1" height="2" fill="#FFFFFF" />
        <rect x="3" y="6" width="2" height="2" fill="#55FFFF" />
        <rect x="5" y="6" width="6" height="2" fill="#00AAAA" />
        <rect x="11" y="6" width="2" height="2" fill="#005555" />
        <rect x="13" y="6" width="1" height="2" fill="#000000" />
        <rect x="3" y="8" width="2" height="2" fill="#00AAAA" />
        <rect x="5" y="8" width="6" height="2" fill="#00AAAA" />
        <rect x="11" y="8" width="2" height="2" fill="#005555" />
        <rect x="4" y="10" width="2" height="2" fill="#00AAAA" />
        <rect x="6" y="10" width="4" height="2" fill="#005555" />
        <rect x="10" y="10" width="2" height="2" fill="#005555" />
        <rect x="5" y="12" width="2" height="2" fill="#005555" />
        <rect x="7" y="12" width="2" height="2" fill="#003333" />
        <rect x="9" y="12" width="2" height="2" fill="#003333" />
        <rect x="7" y="14" width="2" height="1" fill="#000000" />
      </svg>
    )
  },
  {
    id: 'ai-agents',
    trackName: 'AI & AGENTS',
    title: 'AUTONOMOUS NPC ECOSYSTEM',
    shortDescription: 'Develop multi-agent autonomous swarms capable of dynamic resource trading, environment adaptation, and decentralized goal resolution across simulated virtual worlds.',
    fullContext: [
      'Virtual sandbox environments often suffer from scripted, predictable non-player characters that fail to realistically adapt to player behaviors, market shocks, and evolving world conditions. Traditional state-machine AI lacks persistent episodic memory and contextual goal planning.',
      'Your objective is to construct an autonomous swarm ecosystem of cognitive AI agents operating within an open simulated economy. Agents must perceive spatial stimuli, negotiate resource exchanges, maintain dynamic social relationships, and collaborate or compete to fulfill self-generated long-term goals.'
    ],
    requirements: [
      'Multi-agent cognitive decision pipeline with long-term vector memory retrieval',
      'Autonomous barter and market pricing negotiation engine driven by resource supply/demand',
      'Real-time LLM inference coordinator optimizing token efficiency and agent latency',
      'Interactive agent monitoring dashboard visualising spatial paths, thoughts, and dialogues',
      'Emergent behavior stress test evaluating agent survival and coordination under scarcity'
    ],
    techStack: [
      'Python',
      'FastAPI',
      'LangChain / LlamaIndex',
      'ChromaDB / Pinecone',
      'WebSockets',
      'OpenAI / Anthropic APIs'
    ],
    evaluationRubric: [
      { label: 'Autonomy & Cognitive Depth', percentage: '30%' },
      { label: 'Technical Execution & Latency Management', percentage: '30%' },
      { label: 'Economic Model & Swarm Feasibility', percentage: '20%' },
      { label: 'Visual Dashboard & Live Demo', percentage: '20%' }
    ],
    image: (
      <svg width="80" height="80" viewBox="0 0 16 16" shapeRendering="crispEdges">
        <rect x="3" y="3" width="10" height="10" fill="#2B0A0A" />
        <rect x="4" y="4" width="8" height="8" fill="#7A0000" />
        <rect x="5" y="5" width="6" height="6" fill="#C40000" />
        <rect x="6" y="6" width="4" height="4" fill="#FF2222" />
        <rect x="7" y="7" width="2" height="2" fill="#FFAAAA" />
        <rect x="7" y="1" width="2" height="2" fill="#FF3333" />
        <rect x="7" y="13" width="2" height="2" fill="#FF3333" />
        <rect x="1" y="7" width="2" height="2" fill="#FF3333" />
        <rect x="13" y="7" width="2" height="2" fill="#FF3333" />
      </svg>
    )
  },
  {
    id: 'cybersecurity',
    trackName: 'CYBERSECURITY',
    title: 'REDSTONE CIPHER VAULT',
    shortDescription: 'Engineer a zero-knowledge intrusion detection system protecting distributed networks against adversarial packet manipulation and state exploit injections.',
    fullContext: [
      'Distributed peer-to-peer infrastructure is increasingly vulnerable to sophisticated man-in-the-middle exploits, state tampering, and adversarial packet injection. Centralized intrusion prevention systems introduce single points of failure and privacy leaks when inspecting sensitive network telemetry.',
      'Build a decentralized Zero-Knowledge intrusion detection and automated mitigation vault. The solution must cryptographically verify incoming node transactions, generate succinct zero-knowledge proofs for security compliance, and isolate anomalous peer nodes without revealing confidential payload data.'
    ],
    requirements: [
      'Zero-knowledge proof generator for private payload anomaly verification',
      'Real-time peer-to-peer packet sniffing and heuristic intrusion classification engine',
      'Automated quarantine and consensus-driven blacklist synchronization network',
      'Cryptographic verification bench validating zero-knowledge proof validity under 200ms',
      'Security incident response dashboard featuring active threat telemetry and mitigation logs'
    ],
    techStack: [
      'Rust',
      'Circom / SnarkJS',
      'libp2p',
      'WebAssembly',
      'TypeScript',
      'Docker'
    ],
    evaluationRubric: [
      { label: 'Cryptographic Rigor & Zero-Knowledge Validity', percentage: '30%' },
      { label: 'Technical Execution & Performance Overhead', percentage: '30%' },
      { label: 'Resilience & Adversarial Robustness', percentage: '20%' },
      { label: 'Documentation & Threat Model Analysis', percentage: '20%' }
    ],
    image: (
      <svg width="80" height="80" viewBox="0 0 16 16" shapeRendering="crispEdges">
        <rect x="3" y="2" width="10" height="2" fill="#CCCCCC" />
        <rect x="2" y="4" width="12" height="6" fill="#888888" />
        <rect x="3" y="10" width="10" height="2" fill="#888888" />
        <rect x="4" y="12" width="8" height="2" fill="#555555" />
        <rect x="6" y="14" width="4" height="1" fill="#222222" />
        <rect x="7" y="5" width="2" height="2" fill="#FFFF55" />
        <rect x="6" y="7" width="4" height="4" fill="#FFFF55" />
        <rect x="7" y="8" width="2" height="2" fill="#333333" />
      </svg>
    )
  }
];
