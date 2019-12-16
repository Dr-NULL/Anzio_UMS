// Interface de Entrada para errores
export interface RespSuccess<T> {
  meta: any;
  data: T;
}

export interface RespFailed {
  meta: any;
  errors: Fail[];
}

export interface Meta {
  company: string;
  country: string;
  authors: string[];
}

export interface Fail {
  title: string;
  source: ApiErrorSource;
  status:
  /* Informational responses */
  '100' | '101' | '102' | '103' |

  /* Successful responses */
  '200' | '201' | '202' | '203' | '204' | '205' | '206' | '207' | '208' | '226' |

  /* Redirection messages */
  '300' | '301' | '302' | '303' | '304' | '306' | '307' | '308' |

  /* Client error response */
  '400' | '401' | '402' | '403' | '404' | '405' | '406' | '407' | '408' | '409' | '410' |
  '411' | '412' | '413' | '414' | '415' | '416' | '417' | '418' | '421' | '422' | '423' |
  '424' | '425' | '426' | '428' | '429' | '431' | '451' |

  /* Server error responses */
  '500' | '501' | '502' | '503' | '504' | '505' | '506' | '507' | '508' | '510' | '511';

  detail: string;
}

interface ApiErrorSource {
    pointer: string;
    parameter: any;
}
