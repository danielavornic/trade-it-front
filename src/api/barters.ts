import { axios } from "@/lib";
import { Barter, BarterOffer } from "@/types";

export const barters = {
  sendProposal: async (proposal: BarterOffer): Promise<{ proposal_id: number }> => {
    return await axios.post("/barters/add", proposal);
  },
  getById: async (id: number): Promise<Barter> => {
    const { data } = await axios.get(`/barters/${id}`);
    return data;
  },
  updateStatus: async (id: number, status: string, user_id: number): Promise<void> => {
    return await axios.patch(
      `/barters/${id}`,
      { status },
      {
        headers: {
          user_id,
        },
      },
    );
  },
  getByUserId: async (id: number): Promise<Barter[]> => {
    const { data } = await axios.get(`/users/${id}/barters`);
    return data;
  },
};
