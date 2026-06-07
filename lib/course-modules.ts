export type ModuleType = "assignment" | "review" | "exam";

export interface CourseModule {
  week: number;
  slug: string;
  folder: string;
  title: string;
  summary: string;
  type: ModuleType;
}

export const courseModules: CourseModule[] = [
  {
    week: 1,
    slug: "week-1-onboarding-setup",
    folder: "assignment0",
    title: "Onboarding & Setup",
    summary: "Fork, connect integrations, and validate your starter workflow.",
    type: "assignment",
  },
  {
    week: 2,
    slug: "week-2-relational-model",
    folder: "assignment1",
    title: "Relational Model",
    summary: "Define TypeScript interfaces for enterprise tables.",
    type: "assignment",
  },
  {
    week: 3,
    slug: "week-3-erd-design",
    folder: "assignment2",
    title: "ERD Design",
    summary: "Model entity relationships as a schema object.",
    type: "assignment",
  },
  {
    week: 4,
    slug: "week-4-review-1",
    folder: "review1",
    title: "Review 1",
    summary: "Practice relational and ERD concepts before assessment.",
    type: "review",
  },
  {
    week: 5,
    slug: "week-5-exam-1",
    folder: "exam1",
    title: "Exam 1 Practice",
    summary: "Foundation practice test for data modeling concepts.",
    type: "exam",
  },
  {
    week: 6,
    slug: "week-6-ddl",
    folder: "assignment3",
    title: "DDL Programming",
    summary: "Generate CREATE TABLE and ALTER TABLE SQL safely.",
    type: "assignment",
  },
  {
    week: 7,
    slug: "week-7-dml",
    folder: "assignment4",
    title: "DML CRUD",
    summary: "Implement insert, update, select, and delete operation builders.",
    type: "assignment",
  },
  {
    week: 8,
    slug: "week-8-advanced-queries",
    folder: "assignment5",
    title: "Advanced Queries",
    summary: "Build joins, filters, and aggregation query specifications.",
    type: "assignment",
  },
  {
    week: 9,
    slug: "week-9-review-2",
    folder: "review2",
    title: "Review 2",
    summary: "SQL programming drills for joins, grouping, and conditions.",
    type: "review",
  },
  {
    week: 10,
    slug: "week-10-exam-2",
    folder: "exam2",
    title: "Exam 2 Practice",
    summary: "Timed SQL programming practice aligned to course outcomes.",
    type: "exam",
  },
  {
    week: 11,
    slug: "week-11-normalization",
    folder: "assignment6",
    title: "Normalization",
    summary: "Validate constraints and dependency rules for table designs.",
    type: "assignment",
  },
  {
    week: 12,
    slug: "week-12-indexing",
    folder: "assignment7",
    title: "Indexing",
    summary: "Recommend indexes and performance hints for slow query paths.",
    type: "assignment",
  },
  {
    week: 13,
    slug: "week-13-transactions",
    folder: "assignment8",
    title: "Transactions",
    summary: "Model multi-step asynchronous transactions with rollback safety.",
    type: "assignment",
  },
  {
    week: 14,
    slug: "week-14-security",
    folder: "assignment9",
    title: "Security Policies",
    summary: "Define row-level security and access control policy objects.",
    type: "assignment",
  },
  {
    week: 15,
    slug: "week-15-review-3",
    folder: "review3",
    title: "Final Review",
    summary: "Comprehensive readiness checks across all major modules.",
    type: "review",
  },
  {
    week: 16,
    slug: "week-16-exam-3",
    folder: "exam3",
    title: "Final Practice Exam",
    summary: "Capstone practice exam covering design, SQL, and operations.",
    type: "exam",
  },
];

export const assignmentFolders = [
  ...Array.from({ length: 15 }, (_, index) => `assignment${index}`),
  "review1",
  "exam1",
  "review2",
  "exam2",
  "review3",
  "exam3",
] as const;

export type AssignmentFolder = (typeof assignmentFolders)[number];
