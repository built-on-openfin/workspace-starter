export interface CustomSettings {
  consumerKey: string;
  icon: string;
  isSandbox: boolean;
  orgUrl: string;
  queryMinLength: number;
  title: string;
  iconMap: {
    [id: string]: string;
  };
}

export interface SalesforceResultData {
  pageUrl: string;
}
