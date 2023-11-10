import { axios } from "@/lib";
import { BarterOffer } from "@/types";

export const barters = {
  sendProposal: (proposal: BarterOffer): Promise<{ proposal_id: number }> => {
    return axios.post("/barters/add", proposal);
  },
};
