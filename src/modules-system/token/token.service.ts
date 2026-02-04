import { Injectable } from '@nestjs/common';
import * as jsonwebtoken from 'jsonwebtoken';
import {
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
} from 'src/common/contant/app.contant';

@Injectable()
export class TokenService {
  createTokens(userId) {
    const accessToken: string = jsonwebtoken.sign(
      { userId: userId as string },
      ACCESS_TOKEN_SECRET,
      { expiresIn: '1h' },
    );
    const refreshToken = jsonwebtoken.sign(
      { userId: userId as string },
      REFRESH_TOKEN_SECRET,
      { expiresIn: '1d' },
    );

    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }

  verifyAccessToken(accessToken: string, options?: jsonwebtoken.VerifyOptions) {
    const decode = jsonwebtoken.verify(
      accessToken,
      ACCESS_TOKEN_SECRET,
      options,
    );
    return decode;
  }

  verifyRefreshToken(refreshToken) {
    const decode = jsonwebtoken.verify(refreshToken, REFRESH_TOKEN_SECRET);
    return decode;
  }
}
