import { GitHubUser, GitHubRepo, ComparisonMetrics, ProfileWithMetrics } from '../types';

const API_BASE_URL = 'https://api.github.com';

export async function fetchUser(username: string): Promise<GitHubUser> {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${username}`);
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`User ${username} not found`);
      }
      throw new Error(`GitHub API error: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
}

export async function fetchUserRepos(username: string): Promise<GitHubRepo[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${username}/repos?per_page=100&sort=updated`);
    
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching user repos:', error);
    throw error;
  }
}

async function fetchUserContributions(username: string): Promise<number> {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${username}/events`);
    if (!response.ok) {
      return 0;
    }
    const events = await response.json();
    return events.length;
  } catch {
    return 0;
  }
}

async function fetchUserLanguages(repos: GitHubRepo[]): Promise<number> {
  const languages = new Set();
  for (const repo of repos) {
    if (repo.language) {
      languages.add(repo.language);
    }
  }
  return languages.size;
}

function calculateReadmeQuality(repos: GitHubRepo[]): number {
  let score = 0;
  const hasReadme = repos.filter(repo => !repo.fork).some(repo => repo.description?.toLowerCase().includes('readme'));
  if (hasReadme) score += 5;
  const hasDetailedDescriptions = repos.filter(repo => repo.description && repo.description.length > 50).length;
  score += Math.min(hasDetailedDescriptions / 5, 5);
  return score;
}

async function calculatePRsAndIssues(username: string): Promise<number> {
  try {
    const [prsResponse, issuesResponse] = await Promise.all([
      fetch(`${API_BASE_URL}/search/issues?q=author:${username}+type:pr`),
      fetch(`${API_BASE_URL}/search/issues?q=author:${username}+type:issue`)
    ]);
    
    const [prs, issues] = await Promise.all([
      prsResponse.json(),
      issuesResponse.json()
    ]);
    
    return (prs.total_count || 0) + (issues.total_count || 0);
  } catch {
    return 0;
  }
}

function calculateAchievementScore(user: GitHubUser): number {
  let score = 0;
  if (user.public_repos > 10) score++;
  if (user.followers > 50) score++;
  if (user.public_gists > 5) score++;
  if (user.bio) score++;
  if (user.blog) score++;
  return score;
}

function calculateCommunityScore(repos: GitHubRepo[]): number {
  let score = 0;
  const contributedRepos = repos.filter(repo => repo.fork).length;
  score += Math.min(contributedRepos / 10, 5);
  
  const popularRepos = repos.filter(repo => repo.stargazers_count > 10).length;
  score += Math.min(popularRepos / 5, 5);
  
  return score;
}

export async function calculateProfileMetrics(user: GitHubUser, repos: GitHubRepo[]): Promise<ComparisonMetrics> {
  const contributions = await fetchUserContributions(user.login);
  const languages = await fetchUserLanguages(repos);
  const readmeQualityScore = calculateReadmeQuality(repos);
  const prIssues = await calculatePRsAndIssues(user.login);
  const achievementScore = calculateAchievementScore(user);
  const communityScore = calculateCommunityScore(repos);
  
  const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
  const totalForks = repos.reduce((sum, repo) => sum + repo.forks_count, 0);
  
  const score = (
    Math.min(contributions / 1000, 1) * 15 +
    Math.min(user.public_repos / 50, 1) * 10 +
    Math.min(totalStars / 500, 1) * 15 +
    Math.min(totalForks / 200, 1) * 10 +
    Math.min(languages / 10, 1) * 10 +
    readmeQualityScore +
    Math.min(prIssues / 100, 1) * 10 +
    Math.min(user.followers / 500, 1) * 5 +
    achievementScore +
    communityScore
  );

  return {
    totalStars,
    totalForks,
    followers: user.followers,
    following: user.following,
    repositories: user.public_repos,
    languages,
    contributions,
    readmeQualityScore,
    prIssues,
    achievementScore,
    communityScore,
    profileAge: calculateProfileAgeInDays(user.created_at),
    totalScore: score
  };
}

function calculateProfileAgeInDays(createdAt: string): number {
  const created = new Date(createdAt);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - created.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

export async function fetchCompleteProfile(username: string): Promise<ProfileWithMetrics> {
  const user = await fetchUser(username);
  const repos = await fetchUserRepos(username);
  const metrics = await calculateProfileMetrics(user, repos);
  
  return {
    user,
    repos,
    metrics
  };
}