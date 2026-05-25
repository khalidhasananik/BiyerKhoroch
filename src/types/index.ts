export type SubmissionStatus = "pending" | "approved" | "rejected";

export interface CostBreakdown {
  venue: number;
  catering: number;
  photography: number;
  clothing: number;
  jewelry: number;
  decoration: number;
  makeup: number;
  gateDhora: number;
  miscellaneous: number;
}

export interface Submission {
  _id: string;
  slug: string;
  city: string;
  guestCount: number;
  venueName: string;
  photographyCompany: string;
  costs: CostBreakdown;
  totalCost: number;
  totalCostOverride?: number;
  story: string;
  status: SubmissionStatus;
  createdAt: string;
  updatedAt: string;
  images?: string[];
}

export interface SubmissionFormData {
  city: string;
  guestCount: number;
  venueName: string;
  photographyCompany: string;
  costs: CostBreakdown;
  totalCostOverride?: number;
  story: string;
  honeypot?: string;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

export interface SearchParams {
  city?: string;
  venueName?: string;
  photographyCompany?: string;
  minCost?: number;
  maxCost?: number;
  minGuests?: number;
  maxGuests?: number;
  q?: string;
  sort?: "latest" | "oldest" | "highest" | "lowest" | "funniest";
  page?: number;
}
