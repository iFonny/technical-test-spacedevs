import api from 'api';

// -------- Types

export interface LaunchMission {
  id: number;
  name: string;
  launch_designator: string;
  type: string;
  description?: string;
}

export interface LaunchStatus {
  id: number;
  name: string;
  abbrev: string;
  description: string;
}

export interface Launch {
  id: string;
  url: string;
  slug: string;
  name: string;
  image?: string;
  net: string;
  status: LaunchStatus;
  mission?: LaunchMission;
  launch_service_provider?: {
    id: number;
    name: string;
  };
  pad?: {
    id: number;
    name: string;
  };
}

export interface Launches {
  count: number;
  next?: string;
  previous?: string;
  results: Launch[];
}

export interface LaunchesRequestFilters {
  search?: string;
  ordering?: 'id' | '-id' | 'net' | '-net' | 'name' | '-name';
  net__gte?: string;
  net__lte?: string;
}

// -------- Methods

export const getLaunchById = async (launchId: string): Promise<Launch> => {
  return await api.get(`launch/${launchId}`).then((response) => response?.data);
};

export const getLaunches = async (params?: LaunchesRequestFilters, next?: string): Promise<Launches> => {
  if (params) {
    if (next) return await api.get(next).then((response) => response?.data);
    return await api.get(`launch`, { params }).then((response) => response?.data);
  }
};
