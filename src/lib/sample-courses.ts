export type SampleCourseModule =
  | {
      id: string;
      title: string;
      type: "lecture";
      text: string;
      videoUrl: string;
    }
  | {
      id: string;
      title: string;
      type: "text";
      text: string;
    }
  | {
      id: string;
      title: string;
      type: "test";
      text: string;
      assessmentLabel: string;
    };

export type SampleCourse = {
  code: string;
  title: string;
  instructorName: string;
  semester: string;
  public: boolean;
  slug: string;
  description: string;
  titleImage?: string;
  modules: SampleCourseModule[];
  durationHours: number;
  finalExam: boolean;
};

type SampleCourseInput = Omit<SampleCourse, "slug">;

function createCourseSlug(code: string, semester: string) {
  return `${code.toLowerCase()}-${semester}`;
}

function createCourse(course: SampleCourseInput): SampleCourse {
  return {
    ...course,
    slug: createCourseSlug(course.code, course.semester),
  };
}

export function formatCourseAvailability(isPublic: boolean) {
  return isPublic
    ? "Open to the public"
    : "U of T only";
}

function lectureModule(
  id: string,
  title: string,
  text: string,
  videoUrl: string,
): SampleCourseModule {
  return {
    id,
    title,
    type: "lecture",
    text,
    videoUrl,
  };
}

function textModule(id: string, title: string, text: string): SampleCourseModule {
  return {
    id,
    title,
    type: "text",
    text,
  };
}

function testModule(
  id: string,
  title: string,
  text: string,
  assessmentLabel: string,
): SampleCourseModule {
  return {
    id,
    title,
    type: "test",
    text,
    assessmentLabel,
  };
}

export const sampleCourses: SampleCourse[] = [
  createCourse({
    code: "ECE241",
    title: "Digital Systems",
    instructorName: "Samer A. Fakhfakh",
    semester: "20259",
    public: true,
    titleImage: "https://picsum.photos/seed/ece241/1600/900",
    description: `ECE241 introduces the practical foundations of digital logic and hardware design.

Students move from Boolean algebra to combinational and sequential circuit design, with an emphasis on timing, abstraction, and implementation tradeoffs.

## What you will cover

- logic simplification and representation
- combinational building blocks
- finite-state machines
- register-transfer design
- introductory hardware verification`,
    modules: [
      lectureModule(
        "ece241-1",
        "Binary Representation and Boolean Logic",
        "A walkthrough of binary numbers, Boolean algebra, and logic gates.",
        "https://example.com/ece241/binary-logic",
      ),
      textModule(
        "ece241-2",
        "Combinational Circuits",
        "Reading notes on adders, multiplexers, decoders, and timing assumptions.",
      ),
      lectureModule(
        "ece241-3",
        "State Machines",
        "An introduction to sequential design and state-based thinking.",
        "https://example.com/ece241/state-machines",
      ),
      testModule(
        "ece241-4",
        "Sequential Logic Checkpoint",
        "A short assessment covering flip-flops, registers, and finite-state machines.",
        "Timed quiz",
      ),
    ],
    durationHours: 8,
    finalExam: true,
  }),
  createCourse({
    code: "ECE253",
    title: "Digital and Computer Systems",
    instructorName: "Andreas Moshovos",
    semester: "20251",
    public: false,
    description: `ECE253 connects digital hardware ideas to complete computer systems.

The course focuses on how instructions, datapaths, memory, and I/O interact, and why low-level implementation choices shape system behaviour.

## What you will cover

- datapath composition
- control logic
- pipelined execution
- cache and memory hierarchy
- system-level performance thinking`,
    modules: [
      lectureModule(
        "ece253-1",
        "Instructions, Datapaths, and Control",
        "A lecture on instruction execution and how datapaths are organized.",
        "https://example.com/ece253/datapath-control",
      ),
      lectureModule(
        "ece253-2",
        "Pipelining",
        "Material on hazards, forwarding, and throughput-oriented design.",
        "https://example.com/ece253/pipelining",
      ),
      textModule(
        "ece253-3",
        "Memory Hierarchy Notes",
        "Notes on locality, caches, misses, and the cost of memory access.",
      ),
      testModule(
        "ece253-4",
        "Computer Systems Midpoint Check",
        "A module test covering datapaths, pipelines, and memory hierarchy.",
        "Module test",
      ),
      textModule(
        "ece253-5",
        "I/O and Performance Review",
        "A short review of throughput, latency, and bottleneck analysis.",
      ),
    ],
    durationHours: 10,
    finalExam: true,
  }),
  createCourse({
    code: "ECE344",
    title: "Operating Systems",
    instructorName: "Karen Mazina",
    semester: "20259",
    public: true,
    titleImage: "https://picsum.photos/seed/ece344/1600/900",
    description: `ECE344 studies how operating systems manage processes, memory, files, and concurrency.

The emphasis is on mechanisms and tradeoffs: why the kernel exposes certain abstractions, how those abstractions are implemented, and where systems fail under contention.

## What you will cover

- process and thread lifecycle
- synchronization primitives
- virtual memory
- file systems
- distributed systems fundamentals`,
    modules: [
      lectureModule(
        "ece344-1",
        "Processes and System Calls",
        "Lecture material on processes, kernels, and the system call boundary.",
        "https://example.com/ece344/processes",
      ),
      lectureModule(
        "ece344-2",
        "Concurrency and Locks",
        "An overview of synchronization, race conditions, and locking patterns.",
        "https://example.com/ece344/concurrency",
      ),
      textModule(
        "ece344-3",
        "Memory Management Notes",
        "Reference notes covering paging, segmentation, and memory isolation.",
      ),
      testModule(
        "ece344-4",
        "Synchronization Concepts Test",
        "A short concept check on locks, semaphores, and coordination failures.",
        "Concept check",
      ),
      lectureModule(
        "ece344-5",
        "File Systems and Storage",
        "A lecture on persistence, storage layout, and file-system tradeoffs.",
        "https://example.com/ece344/file-systems",
      ),
      textModule(
        "ece344-6",
        "Distributed Systems Primer",
        "A short reading on coordination, replication, and fault tolerance.",
      ),
    ],
    durationHours: 12,
    finalExam: true,
  }),
  createCourse({
    code: "ECE358",
    title: "Computer Networks",
    instructorName: "Ashvin Goel",
    semester: "20251",
    public: false,
    description: `ECE358 introduces the core protocols and design ideas behind modern computer networks.

Students learn how data moves through layered systems, how reliability is achieved on imperfect links, and how congestion shapes real-world performance.

## What you will cover

- layered network architecture
- transport protocols
- routing and forwarding
- congestion control
- application-layer design`,
    modules: [
      lectureModule(
        "ece358-1",
        "Network Layers and Packet Switching",
        "A lecture on packet switching, layering, and protocol boundaries.",
        "https://example.com/ece358/layers",
      ),
      lectureModule(
        "ece358-2",
        "Reliable Transport",
        "A discussion of acknowledgements, retransmission, and ordering.",
        "https://example.com/ece358/reliable-transport",
      ),
      textModule(
        "ece358-3",
        "Routing Notes",
        "Notes on shortest-path routing, forwarding tables, and inter-network communication.",
      ),
      testModule(
        "ece358-4",
        "Congestion Control Test",
        "A short protocol quiz focused on congestion and transport behaviour.",
        "Protocol quiz",
      ),
    ],
    durationHours: 7,
    finalExam: true,
  }),
  createCourse({
    code: "BME205",
    title: "Biomechanics",
    instructorName: "Craig Simmons",
    semester: "20259",
    public: false,
    titleImage: "https://picsum.photos/seed/bme205/1600/900",
    description: `BME205 applies mechanics to biological systems at multiple scales.

The course connects force balance, material response, and physiological structure so students can reason about how tissues and biological systems deform, move, and fail.

## What you will cover

- stress and strain in biological materials
- fluid flow in physiological systems
- musculoskeletal mechanics
- measurement and modelling assumptions`,
    modules: [
      lectureModule(
        "bme205-1",
        "Mechanical Behaviour of Biological Tissues",
        "An introduction to how biological materials deform and respond to load.",
        "https://example.com/bme205/tissues",
      ),
      textModule(
        "bme205-2",
        "Stress, Strain, and Material Models",
        "Written notes linking continuum mechanics concepts to biological examples.",
      ),
      lectureModule(
        "bme205-3",
        "Fluid Mechanics in Physiology",
        "Lecture content on flow in cardiovascular and physiological systems.",
        "https://example.com/bme205/physiology-fluids",
      ),
      testModule(
        "bme205-4",
        "Biomechanics Skills Check",
        "A short test covering material response and physiological mechanics.",
        "Short test",
      ),
    ],
    durationHours: 8,
    finalExam: true,
  }),
  createCourse({
    code: "BME331",
    title: "Introduction to Biomedical Engineering Design",
    instructorName: "Milica Radisic",
    semester: "20251",
    public: true,
    description: `BME331 focuses on biomedical engineering design in context.

Students work through problem framing, stakeholder needs, prototyping constraints, and validation thinking while considering safety, usability, and clinical impact.

## What you will cover

- design problem framing
- user and stakeholder requirements
- prototyping and iteration
- validation planning
- communication of design decisions`,
    modules: [
      textModule(
        "bme331-1",
        "Design Process Foundations",
        "An overview of design stages, requirement gathering, and concept evaluation.",
      ),
      lectureModule(
        "bme331-2",
        "Clinical Need and User Research",
        "Lecture material on stakeholder interviews and contextual inquiry.",
        "https://example.com/bme331/user-research",
      ),
      testModule(
        "bme331-3",
        "Prototype Review",
        "A design checkpoint focused on tradeoffs, feasibility, and iteration.",
        "Design checkpoint",
      ),
      lectureModule(
        "bme331-4",
        "Validation Planning",
        "A lecture on verification, validation, and evidence for biomedical designs.",
        "https://example.com/bme331/validation",
      ),
    ],
    durationHours: 9,
    finalExam: true,
  }),
  createCourse({
    code: "CHE260",
    title: "Chemical Engineering Thermodynamics",
    instructorName: "Jinwen Chen",
    semester: "20259",
    public: false,
    description: `CHE260 introduces the thermodynamic tools used to analyze chemical processes.

The course develops intuition for energy, entropy, phase behaviour, and equilibrium while keeping a clear engineering focus on modelling assumptions and process implications.

## What you will cover

- first and second law analysis
- property relations
- phase equilibrium
- thermodynamic cycles
- process applications`,
    modules: [
      lectureModule(
        "che260-1",
        "Energy Balances",
        "A lecture on energy accounting in closed and open systems.",
        "https://example.com/che260/energy-balances",
      ),
      lectureModule(
        "che260-2",
        "Entropy and Reversibility",
        "Course material on entropy, reversibility, and the second law.",
        "https://example.com/che260/entropy",
      ),
      textModule(
        "che260-3",
        "Phase Behaviour Notes",
        "Reading on state variables, phase diagrams, and equilibrium interpretation.",
      ),
      testModule(
        "che260-4",
        "Thermodynamics Practice Test",
        "A practice-oriented check on property relations and process analysis.",
        "Problem set check",
      ),
    ],
    durationHours: 8,
    finalExam: true,
  }),
  createCourse({
    code: "APS360",
    title: "Applied Fundamentals of Deep Learning",
    instructorName: "Mark Crowley",
    semester: "20251",
    public: true,
    titleImage: "https://picsum.photos/seed/aps360/1600/900",
    description: `APS360 is an applied introduction to deep learning for engineering students.

It combines model intuition with practical workflow concerns such as data handling, optimization, overfitting, and experiment evaluation.

## What you will cover

- neural network fundamentals
- optimization and training loops
- regularization and evaluation
- convolutional models
- applied model development`,
    modules: [
      lectureModule(
        "aps360-1",
        "Neural Network Basics",
        "A first pass through model structure, activation functions, and learning objectives.",
        "https://example.com/aps360/basics",
      ),
      lectureModule(
        "aps360-2",
        "Training and Optimization",
        "Lecture material on backpropagation, optimizers, and training dynamics.",
        "https://example.com/aps360/training",
      ),
      textModule(
        "aps360-3",
        "Evaluation Notes",
        "A concise note on loss curves, validation sets, and common failure patterns.",
      ),
      testModule(
        "aps360-4",
        "Deep Learning Checkpoint",
        "A short quiz on optimization, generalization, and model assessment.",
        "Module quiz",
      ),
      lectureModule(
        "aps360-5",
        "Convolutional Networks",
        "A lecture on image models and architectural inductive bias.",
        "https://example.com/aps360/cnns",
      ),
    ],
    durationHours: 11,
    finalExam: true,
  }),
  createCourse({
    code: "MIE311",
    title: "Fluid Mechanics",
    instructorName: "Nicolas Champagne",
    semester: "20259",
    public: false,
    description: `MIE311 covers the behaviour of fluids in engineering systems.

Students work from conservation laws to practical analysis of flow, pressure losses, dimensional reasoning, and system behaviour in pipes and external flows.

## What you will cover

- fluid properties and statics
- conservation laws
- internal flow and losses
- dimensional analysis
- boundary layers and external flow`,
    modules: [
      lectureModule(
        "mie311-1",
        "Fluid Properties and Hydrostatics",
        "An introduction to fluid properties, pressure, and hydrostatic effects.",
        "https://example.com/mie311/hydrostatics",
      ),
      lectureModule(
        "mie311-2",
        "Conservation Equations",
        "Lecture material on mass, momentum, and energy conservation.",
        "https://example.com/mie311/conservation",
      ),
      textModule(
        "mie311-3",
        "Dimensional Analysis Notes",
        "An engineering-focused overview of similarity, scaling, and nondimensional groups.",
      ),
      testModule(
        "mie311-4",
        "Internal Flow Test",
        "A concept review focused on pipes, losses, and flow interpretation.",
        "Concept review",
      ),
    ],
    durationHours: 7,
    finalExam: true,
  }),
  createCourse({
    code: "MIE444",
    title: "Mechatronic Systems Engineering",
    instructorName: "Timothy Barfoot",
    semester: "20255",
    public: true,
    titleImage: "https://picsum.photos/seed/mie444/1600/900",
    description: `MIE444 integrates sensing, actuation, control, and embedded implementation in mechatronic systems.

The course emphasizes system-level reasoning: how electromechanical subsystems fit together, how models support design, and how controls interact with real hardware constraints.

## What you will cover

- dynamic system modelling
- sensors and actuators
- feedback control
- embedded implementation
- integrated mechatronic design`,
    modules: [
      lectureModule(
        "mie444-1",
        "System Modelling",
        "A lecture on mathematical models for integrated mechatronic systems.",
        "https://example.com/mie444/modelling",
      ),
      lectureModule(
        "mie444-2",
        "Sensors and Actuators",
        "Material on transducers, interfaces, and electromechanical behaviour.",
        "https://example.com/mie444/sensors",
      ),
      textModule(
        "mie444-3",
        "Control Design Notes",
        "A compact reading on stability, feedback structure, and implementation tradeoffs.",
      ),
      testModule(
        "mie444-4",
        "Integrated Systems Test",
        "A design quiz on modelling, sensing, and closed-loop reasoning.",
        "Design quiz",
      ),
      lectureModule(
        "mie444-5",
        "Embedded Control Integration",
        "Lecture material on how embedded systems constraints shape control implementation.",
        "https://example.com/mie444/embedded-control",
      ),
    ],
    durationHours: 10,
    finalExam: true,
  }),
];

export function getSampleCourseBySlug(slug: string) {
  return sampleCourses.find((course) => course.slug === slug);
}
