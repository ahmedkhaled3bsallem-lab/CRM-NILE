import api from "../api/axios";

export type VisitStatus =
  | "Pending"
  | "Completed"
  | "Cancelled";

export type PaymentMethod =
  | "Cash"
  | "Cheque"
  | "Transfer";

export interface Visit {
  id: number;

  code: string;

  visit_plan_id: number | null;

  representative_id: number | null;

  representative_name: string | null;

  customer_id: number | null;

  customer_name: string | null;

  visit_date: string;

  check_in_time: string | null;

  check_out_time: string | null;

  latitude: number | null;

  longitude: number | null;

  visit_status: VisitStatus;

  visit_result: string | null;

  notes: string;

  order_exists: boolean;

  order_amount: number | null;

  order_notes: string | null;

  collection_exists: boolean;

  collection_amount: number | null;

  payment_method: PaymentMethod | null;

  collection_notes: string | null;

  need_follow_up: boolean;

  next_visit_date: string | null;

  created_at: string;

  updated_at: string;
}

export interface VisitPayload {
  code: string;

  visit_plan_id: number | null;

  representative_id: number | null;

  customer_id: number | null;

  visit_date: string;

  check_in_time: string | null;

  check_out_time: string | null;

  latitude: number | null;

  longitude: number | null;

  visit_status: VisitStatus;

  visit_result: string | null;

  notes: string;

  order_exists: boolean;

  order_amount: number | null;

  order_notes: string | null;

  collection_exists: boolean;

  collection_amount: number | null;

  payment_method: PaymentMethod | null;

  collection_notes: string | null;

  need_follow_up: boolean;

  next_visit_date: string | null;
}

const BASE_URL = "/visits";

const visitService = {
  async getAll(): Promise<Visit[]> {
    const response =
      await api.get<Visit[]>(BASE_URL);

    return response.data;
  },

  async getById(
    id: number
  ): Promise<Visit> {
    const response =
      await api.get<Visit>(
        `${BASE_URL}/${id}`
      );

    return response.data;
  },

  async create(
    data: VisitPayload
  ): Promise<Visit> {
    const response =
      await api.post<Visit>(
        BASE_URL,
        data
      );

    return response.data;
  },

  async update(
    id: number,
    data: VisitPayload
  ): Promise<Visit> {
    const response =
      await api.put<Visit>(
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

export default visitService;