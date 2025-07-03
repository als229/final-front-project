import axios from "axios";

const apiUrl = window.ENV?.API_URL;
const api = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

let authToken = null; 

// 외부(React 컴포넌트)에서 호출하여 인증 토큰을 설정하는 함수
export const setAuthToken = (token) => {
  authToken = token;
};

// Axios 요청 인터셉터: 모든 API 요청 시 자동으로 Authorization 헤더 추가
api.interceptors.request.use(
  (config) => {
    if (authToken) { 
      config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
  },
  (error) => { return Promise.reject(error); }
);

// Axios 응답 인터셉터 (선택 사항: 인증 실패 등 공통 에러 처리)
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error('인증 실패: 토큰이 유효하지 않거나 만료되었습니다.');
    }
    return Promise.reject(error);
  }
);


// --- 각 API 호출 함수들 (위에서 설정한 'api' 인스턴스 사용) ---

export const fetchProvinces = () => api.get('/provinces').then(response => response.data);
export const createProvince = (name) => api.post('/provinces', { name }).then(response => response.data);
export const updateProvince = (id, name) => api.put(`/provinces/${id}`, { name }).then(response => response.data);
export const deleteProvince = (id) => api.delete(`/provinces/${id}`);

export const fetchCities = (provinceId) => api.get(`/cities?provinceId=${provinceId}`).then(response => response.data);
export const createCity = (name, provinceId) => api.post('/cities', { name, provinceId }).then(response => response.data);
export const updateCity = (id, name) => api.put(`/cities/${id}`, { name }).then(response => response.data);
export const deleteCity = (id) => api.delete(`/cities/${id}`);

export const fetchNeighborhoods = (cityId) => api.get(`/neighborhoods?cityId=${cityId}`).then(response => response.data);
export const createNeighborhood = (name, cityId) => api.post('/neighborhoods', { name, cityId }).then(response => response.data);
export const updateNeighborhood = (id, name) => api.put(`/neighborhoods/${id}`, { name }).then(response => response.data);
export const deleteNeighborhood = (id) => api.delete(`/neighborhoods/${id}`);

export const fetchDetails = (neighborhoodId) => api.get(`/details?neighborhoodId=${neighborhoodId}`).then(response => response.data);
export const createDetail = (name, neighborhoodId) => api.post('/details', { name, neighborhoodId }).then(response => response.data);
export const updateDetail = (id, name) => api.put(`/details/${id}`, { name }).then(response => response.data);
export const deleteDetail = (id) => api.delete(`/details/${id}`);
