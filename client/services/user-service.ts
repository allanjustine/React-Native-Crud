import api from "@/lib/api";
import { UserFormInputType } from "@/types/form-input-type";

export const getAllUsers = async () => {
  return await api.get("/users");
};

export const storeUser = async (data: UserFormInputType) => {
  return await api.post("/users", data);
};

export const deleteUser = async (id: number) => {
  return await api.delete(`/users/${id}`);
};

export const updateUser = async (id: number, data: any) => {
  return await api.put(`/users/${id}`, data);
};
