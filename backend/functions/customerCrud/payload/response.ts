export interface CustomerData {
    customerId : string,
    customerName : string,
    groupId : string,
    integratorId : string
}

export interface CustomerDataUpdate {
    customerName ?: string,
    groupId ?: string,
    integratorId ?: string
}

// export interface group {
//     id: string;
//     groupName: string;
// }

// export interface SiteResponse {
//     id: string;
//     siteName: string;
//     isDisabled: boolean;
//   }