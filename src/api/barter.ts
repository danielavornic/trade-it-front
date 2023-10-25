import { axios } from "@/lib";
import { BarterAdd } from "@/types";

export const barters = {
  sendProposal: (proposal: BarterAdd): Promise<{ proposal_id: number }> => {
    return axios.post("/api/barters", proposal, {
      // headers: {
      //   Authorization: `Bearer ${product.token}`,
      // },
    });
  },
};
