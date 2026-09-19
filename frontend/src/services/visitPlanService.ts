import api from "../api/axios";

export interface VisitPlan {
  id: number;

  code: string;

  representative_id: number;

  representative_name: string;

  customer_id: number;

  customer_name: string;

  visit_date: string;

  planned_time: string;

  priority: "Low" | "Medium" | "High";

  status: "Planned" | "Completed" | "Cancelled";

  notes: string;

  created_at: string;

  updated_at: string;
}

export interface VisitPlanPayload {
  code: string;

  representative_id: number | null;

  customer_id: number | null;

  visit_date: string;

  planned_time: string;

  priority: "Low" | "Medium" | "High";

  status: "Planned" | "Completed" | "Cancelled";

  notes: string;
}

const BASE_URL = "visit-plans";

const visitPlanService = {
  async getAll(): Promise<VisitPlan[]> {
    const response = await api.get<VisitPlan[]>(
      BASE_URL
    );

    return response.data;
  },

  async getById(
    id: number
  ): Promise<VisitPlan> {
    const response =
      await api.get<VisitPlan>(
        `${BASE_URL}/${id}`
      );

    return response.data;
  },

  async create(
    data: VisitPlanPayload
  ): Promise<VisitPlan> {
    const response =
      await api.post<VisitPlan>(
        BASE_URL,
        data
      );

    return response.data;
  },

  async update(
    id: number,
    data: VisitPlanPayload
  ): Promise<VisitPlan> {
    const response =
      await api.put<VisitPlan>(
        `${BASE_URL}/${id}`,
        data
      );

    return response.data;
  },

  async delete(
    id: number
  ): Promise<void> {
    await api.delete(
      `${BASE_URL}/${id}`
    );
  },
};

export default visitPlanService;