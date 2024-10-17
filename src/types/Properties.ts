// types/Property.ts
export interface Property {
    id: number;
    community_rut: number;
    community_dv: string;
    community_name: string;
    type: string;
    region: string;
    municipality: string;
    address: string;
    tower: string;
    department: string;
    rol: string;
    owner: string;
    aditional_info: string | null;
    status: string;
    last_process_status: string;
    last_process_date: string;
    created: string;
    modified: string;
    client_id: number;
  }
  