import dbConnect from "@/lib/mongodb";
import Project from "@/models/Project";
import Skill from "@/models/Skill";
import Knowledge from "@/models/Knowledge";
import DevOpsMilestone from "@/models/DevOpsMilestone";
import ExperienceModel from "@/models/Experience";
import Achievement from "@/models/Achievement";
import Profile from "@/models/Profile";
import {
  fallbackAchievements,
  fallbackDevOpsJourney,
  fallbackExperience,
  fallbackKnowledge,
  fallbackProfile,
  fallbackProjects,
  fallbackSkills,
  type PortfolioAchievement,
  type PortfolioDevOpsMilestone,
  type PortfolioExperience,
  type PortfolioKnowledge,
  type PortfolioProfile,
  type PortfolioProject,
  type PortfolioSkill,
} from "@/lib/portfolio-data";

export interface PortfolioData {
  projects: PortfolioProject[];
  skills: PortfolioSkill[];
  knowledge: PortfolioKnowledge[];
  devOpsJourney: PortfolioDevOpsMilestone[];
  experience: PortfolioExperience[];
  achievements: PortfolioAchievement[];
  profile: PortfolioProfile;
}

const fallbackData: PortfolioData = {
  projects: fallbackProjects,
  skills: fallbackSkills,
  knowledge: fallbackKnowledge,
  devOpsJourney: fallbackDevOpsJourney,
  experience: fallbackExperience,
  achievements: fallbackAchievements,
  profile: fallbackProfile,
};

function serialize(doc: unknown) {
  const record = doc as Record<string, unknown>;

  return {
    ...record,
    _id:
      typeof record._id === "object" &&
      record._id !== null &&
      "toString" in record._id
        ? record._id.toString()
        : String(record._id),
    createdAt:
      record.createdAt instanceof Date
        ? record.createdAt.toISOString()
        : undefined,
    updatedAt:
      record.updatedAt instanceof Date
        ? record.updatedAt.toISOString()
        : undefined,
    date: record.date instanceof Date ? record.date.toISOString() : undefined,
  };
}

async function getLiveData(): Promise<PortfolioData> {
  await dbConnect();

  const projects = await Project.find({}).sort({ createdAt: -1 }).lean();
  const skills = await Skill.find({}).sort({ category: 1, name: 1 }).lean();
  const knowledge = await Knowledge.find({})
    .sort({ featured: -1, category: 1, createdAt: -1 })
    .lean();
  const devOpsJourney = await DevOpsMilestone.find({})
    .sort({ order: 1, createdAt: 1 })
    .lean();
  const experience = await ExperienceModel.find({}).lean();
  const achievements = await Achievement.find({}).lean();
  const profile = await Profile.findOne({}).lean();

  return {
    projects: projects.map(serialize) as unknown as PortfolioProject[],
    skills: skills.map(serialize) as unknown as PortfolioSkill[],
    knowledge: knowledge.map(serialize) as unknown as PortfolioKnowledge[],
    devOpsJourney:
      devOpsJourney.map(serialize) as unknown as PortfolioDevOpsMilestone[],
    experience: experience.map(serialize) as unknown as PortfolioExperience[],
    achievements:
      achievements.map(serialize) as unknown as PortfolioAchievement[],
    profile: profile
      ? (serialize(profile) as unknown as PortfolioProfile)
      : fallbackProfile,
  };
}

export async function getPortfolioData() {
  let usingFallback = false;
  let data = fallbackData;

  try {
    const liveData = await getLiveData();
    data = {
      projects: liveData.projects.length ? liveData.projects : fallbackProjects,
      skills: liveData.skills.length ? liveData.skills : fallbackSkills,
      knowledge: liveData.knowledge.length
        ? liveData.knowledge
        : fallbackKnowledge,
      devOpsJourney: liveData.devOpsJourney.length
        ? liveData.devOpsJourney
        : fallbackDevOpsJourney,
      experience: liveData.experience.length
        ? liveData.experience
        : fallbackExperience,
      achievements: liveData.achievements.length
        ? liveData.achievements
        : fallbackAchievements,
      profile: liveData.profile || fallbackProfile,
    };
  } catch (err) {
    console.error("Portfolio data error:", err);
    usingFallback = true;
  }

  return { data, usingFallback };
}
