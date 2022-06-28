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
    status_message: string
}

// Contact
export interface IContactCreateRequest {
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
}

export interface IContactUpdateRequest extends IContactCreateRequest {
    id: string
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
