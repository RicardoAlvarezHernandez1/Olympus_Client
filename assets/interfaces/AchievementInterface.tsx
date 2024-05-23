// This is a TypeScript interface that defines the structure for an Achievement object.
export interface AchievementInterface {
  // A unique identifier for the achievement.
  achievementId: number;

  // A description of the achievement.
  achievementDescription: string;

  // A URL to an image representing the achievement.
  achievementUrlImage: string;

  // A boolean indicating whether the achievement has been given.
  gived: boolean;
}
