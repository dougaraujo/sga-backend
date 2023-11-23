export default function mapStatusHTTP(status: string): number {
  switch (status) {
    case 'SUCCESS':
      return 200;
    case 'CREATED':
      return 201;
    case 'NOT_FOUND':
      return 404;
    case 'UNAUTHORIZED':
      return 401;
    case 'BAD_REQUEST':
      return 400;
    case 'INTERNAL_SERVER_ERROR':
      return 500;
    case 'FORBIDDEN':
      return 403;
    default:
      return 500;
  }
}
