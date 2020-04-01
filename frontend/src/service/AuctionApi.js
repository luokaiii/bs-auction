import AxiosRequest from "./BaseApi";

export const offer = (goodsId, price) => {
  return AxiosRequest.post(`/bs/auction/goods/${goodsId}?price=${price}`);
};

export const getById = id => {
  return AxiosRequest.get(`/bs/auction/${id}`);
};

export const getByPage = params => {
  return AxiosRequest.get("/bs/auction", { params });
};

export const getByList = params => {
  return AxiosRequest.get("/bs/auction/list", { params });
};

export const finish = id => {
  return AxiosRequest.put(`/bs/auction/${id}/finished`);
};
