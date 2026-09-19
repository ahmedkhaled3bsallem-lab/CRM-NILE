import api from "../api/axios";

export interface Customer {
  id: number;

  code: string;

  name: string;

  customer_type: string;

  status: "Active" | "Inactive";

  phone: string;

  mobile: string;

  email: string;

  address: string;

  governorate: string;

  city: string;

  representative_id: number | null;

  representative_name: string | null;

  latitude: number | null;

  longitude: number | null;

  notes: string;

  created_at: string;

  updated_at: string;
}

export type CustomerPayload = Omit<
  Customer,
  | "id"
  | "created_at"
  | "updated_at"
  | "representative_name"
>;

class CustomerService {
  async getCustomers(): Promise<Customer[]> {
    const response = await api.get("/customers/");
    return response.data;
  }

  async getCustomer(id: number): Promise<Customer> {
    const response = await api.get(`/customers/${id}`);
    return response.data;
  }

  async createCustomer(
    customer: CustomerPayload
  ): Promise<Customer> {
    const response = await api.post(
      "/customers/",
      customer
    );

    return response.data;
  }

  async updateCustomer(
    id: number,
    customer: CustomerPayload
  ): Promise<Customer> {
    const response = await api.put(
      `/customers/${id}`,
      customer
    );

    return response.data;
  }

  async deleteCustomer(id: number): Promise<void> {
    await api.delete(`/customers/${id}`);
  }
}

const customerService = new CustomerService();

export default customerService;