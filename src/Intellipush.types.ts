export interface RequestOptions {
    headers?: Record<string, any>
    method?: 'post' | 'get' | 'update' | 'delete' | 'options'
    body?: any
    params?: Record<string, any>
}

export interface ClientConfig {
    clientId: string
    clientSecret: string
}

export interface APIResponseFormat {
    success: boolean
    data: Record<string, any>
    errorcode?: number
    status_message: string
}

// Contact
export type IContactSexType = 'male' | 'female';

export interface IContactCreateRequest {
    name: string
    countrycode: string
    phonenumber: string
    email?: string
    company?: string
    country?: string
    sex?: IContactSexType
    zipcode?: number
    param1?: string
    param2?: string
    param3?: string
}

export interface IContactUpdateRequest extends IContactCreateRequest {
    id?: string
}

export interface IContactsGetParams {
    items?: number
    page?: number
    query: string
}

export interface IContactResponse extends APIResponseFormat {
    data: {
        id: string,
        name: string
        countrycode: string
        phonenumber: string
        email: string
        company: string
        country: string
        sex: string
        zipcode: number
        param1: string
        param2: string
        param3: string
        dob: string
        facebook: string
        twitter: string
    }
}

export interface IContactsResponse extends APIResponseFormat {
    data: Pick<IContactResponse, 'data'>[]
}

// Contact List
export interface IContactListCreateRequest {
    name: string
}

export interface IContactListsGetParams extends IContactsGetParams {
    id?: string
}

export interface IContactListUpdateRequest extends IContactListCreateRequest {
    id: string
}

export interface IContactListResponse extends APIResponseFormat {
    data: {
        id: string
        contactlist_name?: string
        list_name: string
        read_only?: string
        contacts?: string
    }
}

export interface IContactListsResponse extends APIResponseFormat {
    data: Pick<IContactListResponse, 'data'>[]
}

export interface IContactsInListResponse extends IContactsResponse {}

// SMS
export interface ISMSCreateRequest {
    message: string
    countrycode: string
    phonenumber: string
    date?: string
    time?: string
    contactId?: string
    contactlistId?: string
}

export interface ISMSUpdateRequest extends ISMSCreateRequest {
    id?: string
}

export interface ISMSCreateBatchRequest {
    batch: ISMSCreateRequest[]
}

export interface ISMSResponse extends APIResponseFormat {
    data: {
        text_message: string
        html_message: string
        date: string
        time: string
        method: string
        repeat: string
        single_target_countrycode: string
        single_target: string
        contact_id: string
        contactlist_id: string
        contactlist_filter: string
        use_sendername: boolean
        two_way_session: string
        id: string
        credits_amount: number
        timetosend: string
        epochtimetosend: number
    }
}

export interface ISMSGetParams {
    items?: number
    page?: number
}

export interface ISMSGetReceivedParams extends ISMSGetParams {
    keyword?: string
}

export interface ISMSListResponse extends APIResponseFormat {
    data: Pick<ISMSResponse, 'data'>[]
}

export type StringBoolean = '1' | '0' | 0 | 1;

export interface ISMSStatusObject {
    id: string
    sendt: StringBoolean
    failed: StringBoolean
    tries: string
    deleted: StringBoolean
    timesendt: Date
}

export interface ISMSStatusResponse extends APIResponseFormat {
    data: {
        [key: string]: ISMSStatusObject
    }
}

// Two Factor
export interface ITwoFactorGenerateResponse extends APIResponseFormat {
    data: {
        id: string
        timetosend: string
        priority: string
        internal_id: string
        external_id: string
        in_progress: string
        text_message: string
        method: string
        single_target_countrycode: string
        single_target: string
        use_sendername: string
    }
}

export interface ITwoFactorValidateResponse extends APIResponseFormat {
    data: {
        access: boolean
    }
}

export interface ITwoFactorGenerateRequest {
    countrycode: string
    phonenumber: string
    message_pre_code: string
    message_post_code: string
}

export interface ITwoFactorValidateRequest {
    countrycode: string
    phonenumber: string
    code: string
}

// Url
export interface IUrlResponse extends APIResponseFormat {
    data: {
        id: string
        long_url: string
        short_url: string
        created: string
    }
}

export interface IUrlDetailsResponse extends APIResponseFormat {
    data: {
        id: string
        long_url: string
        short_url: string
        created: string
        parent_url_id: string
        visited: string
        visits: string
        unique_visits: string
        child_urls: string
        last_visited_time: string
        target_countrycode: string
        target_phonenumber: string
        target_email: string
        target_contact_id: string
        sendt: string
    }
}

export interface IUrlChildTarget {
    contact_id: number
    email: string
    countrycode: string
    phonenumber: string
}

export interface IUrlChildRequest {
    id: string
    target: IUrlChildTarget
}

// User
export interface IUserResponse extends APIResponseFormat {
    data: {
        uid: string
        prepay_customer: string
        dst: string
        timezonename: string
        smssendername: string
        senderemail: string
        senderemailname: string
        smsprice: string
        name: string
        centicredits: string
    }
}
