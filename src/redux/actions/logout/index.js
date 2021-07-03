import API from "@utils/axios";

export const Logout = async () => {
  try {
    await API.get("auth/logout");
    await localStorage.clear();
  } catch (error) {}
};
