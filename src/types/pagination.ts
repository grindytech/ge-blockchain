import { Page, Size } from "./types";
import { GEAccountGQL } from "./account";
import { GEBlockGQL } from "./block";
import { GETransactionGQL } from "./transaction";
export type Item = GEAccountGQL | GETransactionGQL | GEBlockGQL;

export type GEPagination = {
  currentPage: Page;
  hasNext: boolean;
  hasPrevious: boolean;
  pages: Page;
  size: Size;
  total: number;
  items?: Item[];
};
