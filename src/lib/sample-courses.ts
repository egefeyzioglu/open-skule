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
        `## Core idea

Binary is the language of the machine, but it still has structure.

- represent values with bits
- combine values with Boolean operators
- map algebra to gates and circuits

> A useful design check: if you cannot explain a truth table in one minute, the abstraction is probably too dense.

### Quick sanity check

| Value | Binary | Notes |
| --- | --- | --- |
| 0 | \`0000\` | all bits low |
| 1 | \`0001\` | least significant bit |
| 7 | \`0111\` | small unsigned value |

\`AND\`, \`OR\`, and \`XOR\` appear everywhere, so this module leans on them heavily.`,
        "https://example.com/ece241/binary-logic",
      ),
      textModule(
        "ece241-2",
        "Combinational Circuits",
        `### Reading notes

Combinational logic has no memory: outputs depend only on current inputs.

1. Build a small block.
2. Compose it into a larger block.
3. Check that the composed block still matches the intended table.

#### Topics

- adders and carry propagation
- multiplexers and selectors
- decoders and enable signals
- timing assumptions like propagation delay and fan-out

The renderer should handle **bold text**, _italic text_, and inline code such as \`mux(sel, a, b)\`.`,
      ),
      lectureModule(
        "ece241-3",
        "State Machines",
        `## Sequential thinking

State machines add memory to the story.

### What to watch for

- current state
- transition condition
- output convention
- reset behaviour

> If the state diagram is ambiguous, the implementation will be worse.

#### Example sketch

\`IDLE -> LOAD -> EXECUTE -> DONE\`

The real goal is to make transitions explicit rather than implied.`,
        "https://example.com/ece241/state-machines",
      ),
      testModule(
        "ece241-4",
        "Sequential Logic Checkpoint",
        `## Checkpoint

This assessment covers:

- flip-flops
- registers
- finite-state machines
- timing and reset

### Practice prompt

> Explain the difference between a level-sensitive latch and an edge-triggered flip-flop.

Use short answers, diagrams, or both. The renderer should survive nested markdown and blockquotes.`,
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
        `## Instruction flow

This lecture connects the instruction stream to datapath structure.

- fetch
- decode
- execute
- memory
- writeback

### Notes

The same hardware can support multiple instructions when control signals are precise.

\`PC\`, \`IR\`, and \`ALU\` are the recurring characters here.`,
        "https://example.com/ece253/datapath-control",
      ),
      lectureModule(
        "ece253-2",
        "Pipelining",
        `## Pipelined execution

Pipelining increases throughput by overlapping stages, but it also introduces hazards.

### Hazard types

1. Structural hazards
2. Data hazards
3. Control hazards

#### Common fixups

- forwarding paths
- stalling
- branch prediction

> Fast hardware is useful only when it is also correct.`,
        "https://example.com/ece253/pipelining",
      ),
      textModule(
        "ece253-3",
        "Memory Hierarchy Notes",
        `### Memory hierarchy

The hierarchy exists because not all storage is equally fast.

| Level | Speed | Capacity |
| --- | --- | --- |
| Registers | fastest | tiny |
| Cache | very fast | small |
| DRAM | slower | large |
| Disk | slowest | huge |

Key terms: \`locality\`, \`miss rate\`, \`latency\`, and \`bandwidth\`.`,
      ),
      testModule(
        "ece253-4",
        "Computer Systems Midpoint Check",
        `## Midpoint check

Bring together the major themes:

- datapath control
- pipeline scheduling
- cache behaviour
- memory access cost

### Mini prompt

Describe one case where a design is **correct** but still performs poorly.

The answer should render cleanly even with lists, emphasis, and inline code.`,
        "Module test",
      ),
      textModule(
        "ece253-5",
        "I/O and Performance Review",
        `## Review sheet

I/O devices are often the bottleneck, not the CPU.

### Questions to ask

- Is the workload latency-sensitive?
- Is the workload throughput-sensitive?
- Where is buffering helping?
- Where is backpressure happening?

> Measure before optimizing.

This note intentionally mixes prose, bullets, and a quoted callout.`,
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
        `## Processes

The kernel mediates access to hardware through system calls.

### Mental model

1. A process owns resources.
2. The kernel enforces isolation.
3. System calls cross the boundary.

#### Useful terms

- \`pid\`
- \`fork\`
- \`exec\`
- \`wait\`

> The process abstraction exists to make concurrency easier to reason about, not to hide complexity entirely.`,
        "https://example.com/ece344/processes",
      ),
      lectureModule(
        "ece344-2",
        "Concurrency and Locks",
        `## Concurrency

Concurrency creates shared-state problems unless access is coordinated.

- race conditions
- critical sections
- lock granularity
- deadlock avoidance

### Locking example

\`lock -> read -> modify -> unlock\`

When the renderer sees lists, code spans, and short sequences, it should still stay stable.`,
        "https://example.com/ece344/concurrency",
      ),
      textModule(
        "ece344-3",
        "Memory Management Notes",
        `### Virtual memory notes

Memory management is about isolation, convenience, and efficiency.

| Concept | Why it matters |
| --- | --- |
| Paging | fixed-size allocation and translation |
| Segmentation | logical regions and protection |
| Swapping | moving cold pages out of the way |

> Page tables are just data structures, but they are deeply performance-sensitive.`,
      ),
      testModule(
        "ece344-4",
        "Synchronization Concepts Test",
        `## Concept check

This module asks you to identify common coordination failures.

### Examples

- missed wakeup
- deadlock
- livelock
- starvation

#### Short prompt

Explain why a semaphore is not the same thing as a mutex.`,
        "Concept check",
      ),
      lectureModule(
        "ece344-5",
        "File Systems and Storage",
        `## File systems

Persistence is a promise, not magic.

### Topics

- naming and directories
- metadata vs file contents
- journaling and recovery
- consistency tradeoffs

> A filesystem is where software meets failure modes.

The markdown here intentionally includes paragraphs, bullets, and a quoted note.`,
        "https://example.com/ece344/file-systems",
      ),
      textModule(
        "ece344-6",
        "Distributed Systems Primer",
        `### Distributed systems primer

Multiple machines mean multiple failure modes.

1. Messages can be delayed.
2. Nodes can crash.
3. State can diverge.

#### Key ideas

- replication
- coordination
- fault tolerance
- partial failure

The goal is not perfect agreement; it is predictable behaviour under uncertainty.`,
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
        `## Layering

Networking works because protocols are divided into layers.

- application
- transport
- network
- link

### Packet switching

Packets are forwarded hop by hop, so each layer has different responsibilities.

> Clean boundaries simplify reasoning, but they never eliminate tradeoffs.`,
        "https://example.com/ece358/layers",
      ),
      lectureModule(
        "ece358-2",
        "Reliable Transport",
        `## Reliability

Reliability is built from weak components.

### Mechanisms

1. sequence numbers
2. acknowledgements
3. retransmission
4. ordering rules

#### Common failure cases

- duplication
- loss
- reordering
- timeout ambiguity

This note is designed to expose the renderer to nested numbering and bullet lists.`,
        "https://example.com/ece358/reliable-transport",
      ),
      textModule(
        "ece358-3",
        "Routing Notes",
        `### Routing notes

Routing chooses paths, forwarding executes them.

| Term | Meaning |
| --- | --- |
| Route | the chosen path |
| Forwarding table | the local decision map |
| Metric | the cost function |

> The shortest path on paper may not be the best path in practice.`,
      ),
      testModule(
        "ece358-4",
        "Congestion Control Test",
        `## Protocol quiz

Topics to review:

- congestion collapse
- sender adaptation
- fairness
- throughput vs latency

### Practice question

Explain why a network can be both "fast" and still feel slow.

This content should stress emphasis, quotation marks, and line breaks.`,
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
        `## Tissue mechanics

Biological tissue is not an idealized engineering material, but the same core ideas still apply.

- load
- deformation
- stiffness
- failure

### Observation

> Small strains can still have big physiological consequences.

The renderer should be exercised with prose, bullets, and a quote block in one module.`,
        "https://example.com/bme205/tissues",
      ),
      textModule(
        "bme205-2",
        "Stress, Strain, and Material Models",
        `### Material models

This reading connects continuum mechanics to real tissue behaviour.

| Quantity | Role |
| --- | --- |
| Stress | internal force per area |
| Strain | relative deformation |
| Modulus | stiffness measure |

Use \`stress = force / area\` as a lightweight reminder, not a full derivation.`,
      ),
      lectureModule(
        "bme205-3",
        "Fluid Mechanics in Physiology",
        `## Physiological flow

Fluid mechanics appears in blood flow, respiration, and transport.

1. identify geometry
2. estimate flow regime
3. apply conservation ideas

#### Notes

- pressure gradients drive motion
- resistance depends on geometry
- assumptions matter

> Biological systems are constrained by anatomy and function at the same time.`,
        "https://example.com/bme205/physiology-fluids",
      ),
      testModule(
        "bme205-4",
        "Biomechanics Skills Check",
        `## Skills check

Review the relationships among:

- force
- stress
- strain
- deformation

### Prompt

Explain one way a measurement assumption can bias a biomechanics result.

The module includes headings, bullets, and a short reflective prompt.`,
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
        `## Design process

Good design starts with framing the problem correctly.

### Stages

1. define the need
2. gather requirements
3. generate concepts
4. compare tradeoffs
5. iterate

> A polished prototype built on the wrong problem is still the wrong solution.`,
      ),
      lectureModule(
        "bme331-2",
        "Clinical Need and User Research",
        `## Stakeholder work

User research is about understanding context, not just collecting opinions.

- interviews
- observation
- requirements synthesis
- constraints analysis

### Example note

\`clinical need -> user need -> design requirement\`

The renderer should tolerate arrows, emphasis, and inline code together.`,
        "https://example.com/bme331/user-research",
      ),
      testModule(
        "bme331-3",
        "Prototype Review",
        `## Review checkpoint

This assessment checks whether the design is plausible, testable, and responsive to feedback.

#### Consider

- feasibility
- safety
- usability
- iteration cost

> Prototype reviews should reveal uncertainty, not hide it.`,
        "Design checkpoint",
      ),
      lectureModule(
        "bme331-4",
        "Validation Planning",
        `## Validation planning

Verification asks, "Did we build it right?"
Validation asks, "Did we build the right thing?"

### Evidence types

- bench testing
- usability testing
- clinical relevance
- statistical support

| Step | Output |
| --- | --- |
| Plan | test protocol |
| Run | measurements |
| Review | evidence summary |

This gives the renderer a mix of prose, definitions, and a table.`,
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
        `## Energy accounting

Thermodynamics starts with careful bookkeeping.

- closed systems
- open systems
- work terms
- heat terms

### Reminder

> Conservation is simple to state and difficult to apply cleanly.

Use the same notation consistently: \`Q\`, \`W\`, and \`ΔU\`.`,
        "https://example.com/che260/energy-balances",
      ),
      lectureModule(
        "che260-2",
        "Entropy and Reversibility",
        `## Entropy

Entropy is a bookkeeping quantity with deep implications.

1. identify the process
2. determine what is reversible
3. compare actual behaviour to the ideal

#### Themes

- irreversibility
- directionality
- equilibrium limits

The text should also render simple formulas like \`Tds\` and \`dS\` without issue.`,
        "https://example.com/che260/entropy",
      ),
      textModule(
        "che260-3",
        "Phase Behaviour Notes",
        `### Phase behaviour

Phase diagrams are maps, not just pictures.

| Region | Interpretation |
| --- | --- |
| Single phase | one stable state |
| Two phase | coexistence |
| Critical point | boundary disappears |

> Equilibrium is the condition, not the intuition.`,
      ),
      testModule(
        "che260-4",
        "Thermodynamics Practice Test",
        `## Practice test

Work through a few representative tasks:

- property lookup
- balance setup
- process comparison
- sign convention discipline

### Short prompt

Why do thermodynamics problems often begin with a diagram before any equations?

The goal is to make sure display formatting stays correct under pressure.`,
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
        `## Model basics

Neural networks are stacked functions trained to minimize a loss.

- layers
- activations
- parameters
- loss functions

### Small checklist

1. define inputs
2. choose an architecture
3. pick an objective
4. evaluate the output

> The network is not the model alone; the training setup matters too.`,
        "https://example.com/aps360/basics",
      ),
      lectureModule(
        "aps360-2",
        "Training and Optimization",
        `## Training loop

Optimization is iterative and sensitive to setup.

### Topics

- gradients
- backpropagation
- optimizers
- learning rates
- batch size

#### Diagnostic note

\`loss down\` does not always mean \`generalization up\`.

The renderer should handle inline code, emphasis, and multi-level headings.`,
        "https://example.com/aps360/training",
      ),
      textModule(
        "aps360-3",
        "Evaluation Notes",
        `### Evaluation

Evaluate with more than a single number when possible.

| Artifact | Purpose |
| --- | --- |
| Training loss | fit to seen data |
| Validation loss | generalization proxy |
| Confusion matrix | class-level detail |

> A model that memorizes the training set can still fail the deployment test.`,
      ),
      testModule(
        "aps360-4",
        "Deep Learning Checkpoint",
        `## Checkpoint

Assess your understanding of:

- optimization dynamics
- overfitting
- regularization
- evaluation strategy

### Prompt

Describe one reason a model with lower training loss might perform worse in practice.

This is intentionally markdown-heavy to stress the renderer.`,
        "Module quiz",
      ),
      lectureModule(
        "aps360-5",
        "Convolutional Networks",
        `## Convolutions

Convolutional networks exploit spatial structure.

### Concepts

- local receptive fields
- parameter sharing
- translation-aware features
- pooling and downsampling

> Architecture encodes assumptions before learning even begins.

The content includes headings, bullets, and a quote block for coverage.`,
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
        `## Fluid properties

Fluid mechanics begins with basic material properties and static pressure.

- density
- viscosity
- pressure variation
- buoyancy

### Hydrostatics note

\`p = p_0 + ρgh\`

> Static pressure grows with depth, even when the fluid is not moving.`,
        "https://example.com/mie311/hydrostatics",
      ),
      lectureModule(
        "mie311-2",
        "Conservation Equations",
        `## Conservation laws

The conservation equations are the backbone of analysis.

1. mass
2. momentum
3. energy

#### Discussion

- choose a control volume
- account for inlets and outlets
- keep units consistent

The renderer should handle the ordered list plus bullet nesting style cleanly.`,
        "https://example.com/mie311/conservation",
      ),
      textModule(
        "mie311-3",
        "Dimensional Analysis Notes",
        `### Dimensional analysis

Scaling arguments help reduce complexity.

| Symbol | Meaning |
| --- | --- |
| Re | Reynolds number |
| Fr | Froude number |
| Nu | Nusselt number |

> Nondimensional groups turn messy problems into comparable cases.`,
      ),
      testModule(
        "mie311-4",
        "Internal Flow Test",
        `## Internal flow review

Topics to check:

- pressure losses
- pipe friction
- flow regime
- energy interpretation

### Prompt

Explain how a small change in diameter can have a large impact on flow.

The text intentionally mixes sections, lists, and a question prompt.`,
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
        `## Modelling

Mechatronic systems start with a model that captures the dominant behaviour.

- dynamics
- inputs
- outputs
- disturbances

### Working assumption

> A model is useful when it is simple enough to use and detailed enough to trust.

Keep \`state\`, \`input\`, and \`output\` clear throughout.`,
        "https://example.com/mie444/modelling",
      ),
      lectureModule(
        "mie444-2",
        "Sensors and Actuators",
        `## Sensors and actuators

Sensors observe, actuators influence.

### Examples

- encoders
- accelerometers
- motors
- solenoids

| Component | Role |
| --- | --- |
| Sensor | measures the world |
| Actuator | changes the world |

This gives the renderer a table plus a short explanatory list.`,
        "https://example.com/mie444/sensors",
      ),
      textModule(
        "mie444-3",
        "Control Design Notes",
        `### Control notes

Control design balances stability and responsiveness.

1. define the plant
2. choose feedback structure
3. check robustness
4. implement carefully

> A controller that is elegant in simulation can still fail on hardware.

The note includes ordered steps, a quote, and direct language about tradeoffs.`,
      ),
      testModule(
        "mie444-4",
        "Integrated Systems Test",
        `## Design quiz

Review the interactions among:

- modelling
- sensing
- actuation
- feedback

### Short prompt

Describe one tradeoff between fast response and noisy measurements.

The module is intentionally rich in markdown formatting.`,
        "Design quiz",
      ),
      lectureModule(
        "mie444-5",
        "Embedded Control Integration",
        `## Embedded integration

Real-time implementation adds constraints that pure control theory can ignore.

- sampling
- quantization
- latency
- memory limits

> The best controller is the one that still runs on the target board.

This section should stress line wrapping, emphasis, and list rendering.`,
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
