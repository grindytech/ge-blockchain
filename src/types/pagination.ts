import { Page, Size } from "./types";

export type GEPagination<T> = {
  currentPage: Page;
  hasNext: boolean;
  hasPrevious: boolean;
  pages: Page;
  size: Size;
  total: number;
  items?: T[];
};
