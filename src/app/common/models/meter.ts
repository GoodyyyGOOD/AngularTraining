export interface Meter {
    customerId: number;
    meterNumber: string;
    installationDate: string;
}

export interface Meter {
    data?: Meter[];
    failed?: boolean;
    hasNextPage?: boolean;
    hasPreviousPage?: boolean;
    message?: string;
    page?: number;
    succeeded?: boolean;
    totalCount?: number;
    totalPage?: number; 
  }
