import ForOFor from "@/commons/assets/images/404_web.webp";

export const ApiImgUrl = (url: string) => {
  const apiUrl = `${import.meta.env.VITE_API_URL}v1/storage/`;

  if (!url) {
    return ForOFor;
  }

  return `${apiUrl}${url}`;
};
