import AxiosRequest from "./BaseApi";

export const create = data => {
  return AxiosRequest.post("/bs/goods", data);
};

export const getById = id => {
  return AxiosRequest.get(`/bs/goods/${id}`);
};

export const getByPage = params => {
  return AxiosRequest.get("/bs/goods", { params });
};

export const deleteById = id => {
  return AxiosRequest.delete(`/bs/goods/${id}`);
};

export const update = (id, data) => {
  return AxiosRequest.put(`/bs/goods/${id}`, data);
};
