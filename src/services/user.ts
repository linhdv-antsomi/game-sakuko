// Types
import { CommonResponse } from 'types';

// Schemas
import {
    CDPCustomer,
    CheckCanAllocateVoucher,
    CheckUserResponse,
} from 'schemas';

// Api
import { fetchInstance } from './api';

// Constant
import { APP_CONFIG } from 'constant';
import { SyncCustomerIdentityhArgs } from 'queries/sync-identity';

const { CLIENT_PREFIX } = APP_CONFIG;
const USER_ENDPOINT = `${CLIENT_PREFIX}/user`;

export type CheckUserCanAllocateArgs = {
    endPoint?: string;
};

export type GetCDPCustomerParams = {
    customerId: string;
};

export const userServices = {
    checkUser: async (): Promise<CommonResponse<CheckUserResponse>> => {
        const response = await fetchInstance(`${USER_ENDPOINT}/check`);

        const data = await response.json();

        return data;
    },
    checkUserCanAllocate: async (
        { endPoint }: CheckUserCanAllocateArgs = { endPoint: 'user/check' }
    ): Promise<CommonResponse<CheckCanAllocateVoucher>> => {
        const response = await fetchInstance(`${CLIENT_PREFIX}/${endPoint || 'user/check'}`);

        const data = await response.json();

        return data;
    },
    checkUserCanAllocateV2: async (
        { endPoint }: CheckUserCanAllocateArgs = { endPoint: 'can-allocate' }
    ): Promise<CommonResponse<CheckCanAllocateVoucher>> => {
        console.log('endPoint', `${CLIENT_PREFIX}/${endPoint}`);
        const response = await fetchInstance(`${CLIENT_PREFIX}/${endPoint || 'can-allocate'}`);

        const data = await response.json();

        return data;
    },
    getCDPCustomer: async (
        params: GetCDPCustomerParams
    ): Promise<CommonResponse<CDPCustomer>> => {
        const response = await fetchInstance(
            `${USER_ENDPOINT}/cdp-customer?${new URLSearchParams(
                params
            ).toString()}`
        );

        const data = await response.json();

        return data;
    },
    syncIdentity: async (
        params: SyncCustomerIdentityhArgs
    ): Promise<CommonResponse<any>> => {
        const response = await fetchInstance(
            `${CLIENT_PREFIX}/cdp-user/identity`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(params),
            }
        );
        const data = await response.json();

        return data;
    },
};
