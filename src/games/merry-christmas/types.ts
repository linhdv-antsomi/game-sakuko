export interface BaseScreen  {
  onShare?: ({pageType, pageCate}: {pageType?: string, pageCate?: string}) => void;
}