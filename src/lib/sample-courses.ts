export type SampleCourse = {
  code: string;
  title: string;
  instructorName: string;
  semester: string;
  slug: string;
};

function createCourseSlug(code: string, semester: string) {
  return `${code.toLowerCase()}-${semester}`;
}

export const sampleCourses: SampleCourse[] = [
  {
    code: "ECE241",
    title: "Digital Systems",
    instructorName: "Samer A. Fakhfakh",
    semester: "20259",
    slug: createCourseSlug("ECE241", "20259"),
  },
  {
    code: "ECE253",
    title: "Digital and Computer Systems",
    instructorName: "Andreas Moshovos",
    semester: "20251",
    slug: createCourseSlug("ECE253", "20251"),
  },
  {
    code: "ECE344",
    title: "Operating Systems",
    instructorName: "Karen Mazina",
    semester: "20259",
    slug: createCourseSlug("ECE344", "20259"),
  },
  {
    code: "ECE358",
    title: "Computer Networks",
    instructorName: "Ashvin Goel",
    semester: "20251",
    slug: createCourseSlug("ECE358", "20251"),
  },
  {
    code: "BME205",
    title: "Biomechanics",
    instructorName: "Craig Simmons",
    semester: "20259",
    slug: createCourseSlug("BME205", "20259"),
  },
  {
    code: "BME331",
    title: "Introduction to Biomedical Engineering Design",
    instructorName: "Milica Radisic",
    semester: "20251",
    slug: createCourseSlug("BME331", "20251"),
  },
  {
    code: "CHE260",
    title: "Chemical Engineering Thermodynamics",
    instructorName: "Jinwen Chen",
    semester: "20259",
    slug: createCourseSlug("CHE260", "20259"),
  },
  {
    code: "APS360",
    title: "Applied Fundamentals of Deep Learning",
    instructorName: "Mark Crowley",
    semester: "20251",
    slug: createCourseSlug("APS360", "20251"),
  },
  {
    code: "MIE311",
    title: "Fluid Mechanics",
    instructorName: "Nicolas Champagne",
    semester: "20259",
    slug: createCourseSlug("MIE311", "20259"),
  },
  {
    code: "MIE444",
    title: "Mechatronic Systems Engineering",
    instructorName: "Timothy Barfoot",
    semester: "20255",
    slug: createCourseSlug("MIE444", "20255"),
  },
];

export function getSampleCourseBySlug(slug: string) {
  return sampleCourses.find((course) => course.slug === slug);
}
