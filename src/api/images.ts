import { axios } from "@/lib";

export const images = {
  add: async ({ image, product_id }: { image: File; product_id: number }) => {
    const formData = new FormData();
    formData.append("image", image);
    formData.append("product_id", product_id.toString());

    const { data } = await axios.post("/images/add", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  },
};
