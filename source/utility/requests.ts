import axios, {
	AxiosRequestConfig,
	AxiosResponse,
	AxiosError,
	AxiosInstance,
	AxiosAdapter,
	Cancel,
	CancelToken,
	CancelTokenSource,
	Canceler, Method, AxiosTransformer, AxiosBasicCredentials, ResponseType, AxiosProxyConfig
} from "axios";

export class Response{

	public data: any;

	constructor( data: number ){
		this.data = data;
	};

};

export class RequestInit{
	url?: string;
	method?: Method;
	baseURL?: string;
	headers?: any;
	cancelTokenSource?: CancelTokenSource;
	cancelToken?: CancelToken;
	params?: any;
	paramsSerializer?: (params: any) => string;
	data?: any;
	timeout?: number;
	withCredentials?: boolean;
	responseType?: ResponseType;
	xsrfCookieName?: string;
	xsrfHeaderName?: string;
	maxContentLength?: number;
	validateStatus?: (status: number) => boolean;
	maxRedirects?: number;
	socketPath?: string | null;
	httpAgent?: any;
	httpsAgent?: any;
	auto?: boolean;
};


class RequestSource{

	public config: AxiosRequestConfig = {
		method: "GET",
		timeout: 10000,
		withCredentials: true,
		responseType: "json",
		xsrfCookieName: "XSRF-TOKEN",
		xsrfHeaderName: "XSRF-TOKEN",
		validateStatus: (status: number) => status >= 200 && status < 300,
		maxRedirects: 5
	};

	constructor(){};

	public cancel() : CancelTokenSource{
		return axios.CancelToken.source();
	};
	public isCancel( e: Error ) : boolean{
		return axios.isCancel( e );
	};
	private fetchInternal( config: RequestInit ): Promise<Response>{

		if( config.cancelTokenSource )
			config.cancelToken = config.cancelTokenSource.token;

		let promise: Promise<Response> = new Promise(( resolve, reject ) => {

			axios( config ).then( response => {
				resolve(new Response(
					response.data
				));
			}).catch( error => {
				reject( error );
			});

		});

		return promise;
	};
	public fetch( input: RequestInit ): Promise<Response>{
		let config: any = { ... this.config, ...input };
		return this.fetchInternal( config );
	};
	public get( input: RequestInit | string ): Promise<Response>{

		let config: any = typeof input == "string" ? { ... this.config } : { ... this.config, ...input };
		config.method = "GET";

		if( typeof input == "string" ){
			config.url = input;
		};

		return this.fetchInternal( config );
	};
	public post( input: RequestInit | string ): Promise<Response>{

		let config: any = typeof input == "string" ? { ... this.config } : { ... this.config, ...input };
		config.method = "POST";

		if( typeof input == "string" ){
			config.url = input;
		};

		return this.fetchInternal( config );
	};

};

export const Request = new RequestSource();