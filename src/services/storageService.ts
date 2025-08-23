import AsyncStorage from "@react-native-async-storage/async-storage";

export interface Draft {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  files: string[];
  status: "draft" | "in_progress" | "completed";
}

export interface RecentActivity {
  id: string;
  type:
    | "audit_started"
    | "audit_completed"
    | "draft_saved"
    | "draft_deleted"
    | "report_viewed";
  title: string;
  description: string;
  timestamp: Date;
  metadata?: any;
}

const DRAFTS_KEY = "audit_demo:drafts";
const ACTIVITIES_KEY = "audit_demo:activities";

class StorageService {
  // Drafts Management
  async getDrafts(): Promise<Draft[]> {
    try {
      const draftsJson = await AsyncStorage.getItem(DRAFTS_KEY);
      if (draftsJson) {
        const drafts = JSON.parse(draftsJson);
        return drafts.map((draft: any) => ({
          ...draft,
          createdAt: new Date(draft.createdAt),
          updatedAt: new Date(draft.updatedAt),
        }));
      }
      return [];
    } catch (error) {
      console.error("Error loading drafts:", error);
      return [];
    }
  }

  async saveDraft(
    draft: Omit<Draft, "id" | "createdAt" | "updatedAt">
  ): Promise<Draft> {
    try {
      const drafts = await this.getDrafts();
      const newDraft: Draft = {
        ...draft,
        id: Date.now().toString(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      drafts.push(newDraft);
      await AsyncStorage.setItem(DRAFTS_KEY, JSON.stringify(drafts));

      // Add activity
      await this.addActivity({
        type: "draft_saved",
        title: "Draft Saved",
        description: `Draft "${draft.title}" saved successfully`,
        metadata: { draftId: newDraft.id },
      });

      return newDraft;
    } catch (error) {
      console.error("Error saving draft:", error);
      throw error;
    }
  }

  async updateDraft(
    id: string,
    updates: Partial<Draft>
  ): Promise<Draft | null> {
    try {
      const drafts = await this.getDrafts();
      const index = drafts.findIndex((draft) => draft.id === id);

      if (index === -1) return null;

      drafts[index] = {
        ...drafts[index],
        ...updates,
        updatedAt: new Date(),
      };

      await AsyncStorage.setItem(DRAFTS_KEY, JSON.stringify(drafts));
      return drafts[index];
    } catch (error) {
      console.error("Error updating draft:", error);
      throw error;
    }
  }

  async deleteDraft(id: string): Promise<boolean> {
    try {
      const drafts = await this.getDrafts();
      const draftToDelete = drafts.find((draft) => draft.id === id);
      const filteredDrafts = drafts.filter((draft) => draft.id !== id);

      await AsyncStorage.setItem(DRAFTS_KEY, JSON.stringify(filteredDrafts));

      // Add activity
      if (draftToDelete) {
        await this.addActivity({
          type: "draft_deleted",
          title: "Draft Deleted",
          description: `Draft "${draftToDelete.title}" deleted`,
          metadata: { draftId: id },
        });
      }

      return true;
    } catch (error) {
      console.error("Error deleting draft:", error);
      return false;
    }
  }

  // Recent Activities Management
  async getRecentActivities(): Promise<RecentActivity[]> {
    try {
      const activitiesJson = await AsyncStorage.getItem(ACTIVITIES_KEY);
      if (activitiesJson) {
        const activities = JSON.parse(activitiesJson);
        return activities.map((activity: any) => ({
          ...activity,
          timestamp: new Date(activity.timestamp),
        }));
      }
      return [];
    } catch (error) {
      console.error("Error loading activities:", error);
      return [];
    }
  }

  async addActivity(
    activity: Omit<RecentActivity, "id" | "timestamp">
  ): Promise<RecentActivity> {
    try {
      const activities = await this.getRecentActivities();
      const newActivity: RecentActivity = {
        ...activity,
        id: Date.now().toString(),
        timestamp: new Date(),
      };

      activities.unshift(newActivity); // Add to beginning

      // Keep only last 50 activities
      const limitedActivities = activities.slice(0, 50);

      await AsyncStorage.setItem(
        ACTIVITIES_KEY,
        JSON.stringify(limitedActivities)
      );
      return newActivity;
    } catch (error) {
      console.error("Error adding activity:", error);
      throw error;
    }
  }

  async clearActivities(): Promise<void> {
    try {
      await AsyncStorage.removeItem(ACTIVITIES_KEY);
    } catch (error) {
      console.error("Error clearing activities:", error);
    }
  }

  // Audit Report Management
  async getAuditReports(): Promise<any[]> {
    try {
      const reportsJson = await AsyncStorage.getItem("audit_demo:reports");
      if (reportsJson) {
        return JSON.parse(reportsJson);
      }
      return [];
    } catch (error) {
      console.error("Error loading reports:", error);
      return [];
    }
  }

  async saveAuditReport(report: any): Promise<void> {
    try {
      const reports = await this.getAuditReports();
      reports.push({
        ...report,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      });
      await AsyncStorage.setItem("audit_demo:reports", JSON.stringify(reports));
    } catch (error) {
      console.error("Error saving report:", error);
    }
  }
}

export const storageService = new StorageService();
