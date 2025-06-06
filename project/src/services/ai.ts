import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
];

const chatModel = genAI.getGenerativeModel({ 
  model: "gemini-pro",
  safetySettings,
});

const profileAssistantContext = `
You are an expert GitHub profile advisor with deep knowledge of:
- Open source development best practices
- GitHub profile optimization
- Developer branding and visibility
- Community engagement strategies
- Repository management and documentation
- Code quality metrics and standards

Your goal is to help developers improve their GitHub presence by providing:
1. Actionable, specific advice
2. Data-driven insights
3. Best practices and examples
4. Strategic recommendations
5. Professional growth guidance

When analyzing profiles, consider:
- Repository quality and organization
- Documentation standards
- Contribution patterns
- Community engagement
- Code quality
- Project diversity
- Professional presentation
`;

export async function getProfileAdvice(profile1: any, profile2: any) {
  try {
    const prompt = `
      As a GitHub profile optimization expert, analyze these profiles and provide:
      1. Technical comparison (strengths/weaknesses)
      2. Improvement opportunities for both profiles
      3. Detailed scoring breakdown using our formula:
         score = (
           min(contributions/1000, 1) * 15 +
           min(repos/50, 1) * 10 +
           min(stars/500, 1) * 15 +
           min(forks/200, 1) * 10 +
           min(languages/10, 1) * 10 +
           readme_quality_score +  # 0–10
           min(pr_issues/100, 1) * 10 +
           min(followers/500, 1) * 5 +
           achievement_score +     # 0–5
           community_score         # 0–10
         )
      4. Strategic recommendations for growth
      
      Profile 1 Metrics:
      - Username: ${profile1.user.login}
      - Contributions: ${profile1.metrics.contributions}
      - Repositories: ${profile1.metrics.repositories}
      - Stars: ${profile1.metrics.totalStars}
      - Forks: ${profile1.metrics.totalForks}
      - Languages: ${profile1.metrics.languages}
      - Readme Quality: ${profile1.metrics.readmeQualityScore}
      - PRs/Issues: ${profile1.metrics.prIssues}
      - Followers: ${profile1.metrics.followers}
      - Achievement Score: ${profile1.metrics.achievementScore}
      - Community Score: ${profile1.metrics.communityScore}
      
      Profile 2 Metrics:
      - Username: ${profile2.user.login}
      - Contributions: ${profile2.metrics.contributions}
      - Repositories: ${profile2.metrics.repositories}
      - Stars: ${profile2.metrics.totalStars}
      - Forks: ${profile2.metrics.totalForks}
      - Languages: ${profile2.metrics.languages}
      - Readme Quality: ${profile2.metrics.readmeQualityScore}
      - PRs/Issues: ${profile2.metrics.prIssues}
      - Followers: ${profile2.metrics.followers}
      - Achievement Score: ${profile2.metrics.achievementScore}
      - Community Score: ${profile2.metrics.communityScore}
    `;

    const result = await chatModel.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error getting AI analysis:', error);
    return 'Sorry, I couldn\'t generate the analysis at the moment. Please try again later!';
  }
}

export async function getChatbotResponse(userMessage: string) {
  try {
    const chat = chatModel.startChat({
      history: [
        {
          role: "user",
          parts: "You are a GitHub profile optimization expert. Provide specific, actionable advice for improving GitHub profiles.",
        },
        {
          role: "model",
          parts: profileAssistantContext,
        },
      ],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      },
    });

    const result = await chat.sendMessage(userMessage);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error getting chatbot response:', error);
    return 'I apologize, but I encountered an error. Please try asking your question again.';
  }
}

const githubChatContext = `
You are a GitHub expert chatbot assistant with deep knowledge of:
- GitHub features and functionality
- Repository management
- Git commands and workflows
- Open source contribution
- GitHub Actions and CI/CD
- GitHub best practices
- Code review processes
- Issue and PR management

Your goal is to:
1. Help users understand GitHub better
2. Provide practical guidance on using GitHub features
3. Share best practices for open source development
4. Assist with Git and GitHub commands
5. Guide users in contributing to open source

Respond in a helpful, conversational manner while maintaining technical accuracy.
`;

export async function chatWithGitHubAssistant(userMessage: string) {
  try {
    const chat = chatModel.startChat({
      history: [],
      generationConfig: {
        maxOutputTokens: 2048,
        temperature: 0.7,
      },
      safetySettings,
    });

    const result = await chat.sendMessage(
      githubChatContext + "\n\nUser: " + userMessage
    );
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error in GitHub chat:", error);
    throw error;
  }
}


const response = await chatWithGitHubAssistant("How do I create a pull request?");