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
    await axios.patch(`/barters/${id}`, { status, user_id });
  },
};
