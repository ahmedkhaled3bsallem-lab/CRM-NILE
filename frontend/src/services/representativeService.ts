import api from "../api/axios";

export interface Representative {
  id: number;

  code: string;

  name: string;

  phone: string;

  email: string;

  address: string;

  is_active: boolean;

  customers_count?: number;

  created_at: string;

  updated_at: string;
}

export type RepresentativePayload = Omit<
  Representative,
  | "id"
  | "customers_count"
  | "created_at"
  | "updated_at"
>;

class RepresentativeService {
  async getRepresentatives(): Promise<Representative[]> {
    const response = await api.get(
      "/representatives/"
    );

    return response.data;
  }

  async getRepresentative(
    id: number
  ): Promise<Representative> {
    const response = await api.get(
      `/representatives/${id}`
    );

    return response.data;
  }

  async createRepresentative(
    representative: RepresentativePayload
  ): Promise<Representative> {
    const response = await api.post(
      "/representatives/",
      representative
    );

    return response.data;
  }

  async updateRepresentative(
    id: number,
    representative: RepresentativePayload
  ): Promise<Representative> {
    const response = await api.put(
      `/representatives/${id}`,
      representative
    );

    return response.data;
  }

  async deleteRepresentative(
    id: number
  ): Promise<void> {
    await api.delete(
      `/representatives/${id}`
    );
  }
}

const representativeService =
  new RepresentativeService();

export default representativeService;