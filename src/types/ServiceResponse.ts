type ServiceResponseErrorType =
  | 'NOT_FOUND'
  | 'UNAUTHORIZED'
  | 'BAD_REQUEST'
  | 'INTERNAL_SERVER_ERROR';

type ServiceMessage = {
  mesaage: string;
};

type ServiceResponseError = {
  status: ServiceResponseErrorType;
  data: ServiceMessage;
};

type ServiceResponseSuccess<T> = {
  status: 'SUCCESS' | 'CREATED';
  data: T;
};

type ServiceResponse<T> = ServiceResponseSuccess<T> | ServiceResponseError;

export default ServiceResponse;
