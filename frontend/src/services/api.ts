import apiClient from './apiClient';

// Journey/Assignments API
export const journeyService = {
  async getAssignments() {
    const { data } = await apiClient.get('/journey/assignments');
    return data;
  },

  async getStats() {
    const { data } = await apiClient.get('/journey/stats');
    return data;
  },

  async createAssignment(assignment: {
    title: string;
    description: string;
    element?: string;
    artifactType?: string;
  }) {
    const { data } = await apiClient.post('/journey/assignments', assignment);
    return data;
  },
};

// Dashboard API
export const dashboardService = {
  async getDashboards() {
    const { data } = await apiClient.get('/dashboards');
    return data;
  },
};

// AI Chat API
export const aiService = {
  async chat(message: string) {
    const { data } = await apiClient.post('/ai/chat', { message });
    return data;
  },

  async getHistory() {
    const { data } = await apiClient.get('/ai/history');
    return data;
  },
};
