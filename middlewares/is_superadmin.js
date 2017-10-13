// import httpStatus from 'http-status'
// import jwt from 'jsonwebtoken'
//
// import {APIError} from '../../helpers/errors'
//
// export default function (req, res, next) {
//
//   let token = '';
//   if (req.headers && req.headers.authorization) {
//     const parts = req.headers.authorization.split(' ');
//     if (parts.length === 2) {
//       const scheme = parts[0];
//       const credentials = parts[1];
//
//       if (/^Bearer$/i.test(scheme)) {
//         token = credentials
//       }
//     }
//     else {
//       next(new APIError('Format is Authorization: Bearer [token]', httpStatus.UNAUTHORIZED))
//     }
//   }
//   else {
//     next(new APIError('No Authorization header was found', httpStatus.UNAUTHORIZED))
//   }
//   const user = jwt.decode(token);
//
//   if (!user || user.role != 'superadmin') {
//     next(new APIError('Unauthorized action', httpStatus.UNAUTHORIZED))
//   }
//
//   req.user = user;
//   next();
// }
