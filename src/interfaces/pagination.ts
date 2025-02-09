export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  meta: {
      current_page: number;
      from: number;
      last_page: number;
      per_page: number;
      to: number;
      total: number;
  };
  links: {
      first: string;
      last: string;
      prev: string | null;
      next: string | null;
  };
}